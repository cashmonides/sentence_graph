//console.log"DEBUG 10-29 USER OBJECT TRIGGERED+++++++");

var User = function() {
    this.data = null;
    this.uid = null;
};


User.prototype.load = function(callback) {
    this.uid = get_cookie("quiz_uid");
    // console.log("user uid:", this.uid);
    
    if (this.uid != null) {
        var self = this;
        Persist.get(["users", this.uid], function(data){ self.user_data_loaded(data, callback); });
        return true;
    } else {
        //console.log"error: no user id");
        //TODO make anonymous mode
        return false;
    }

};

User.prototype.user_data_loaded = function(data, callback){
    this.data = data.val();
    if (!this.data.history) {
        this.data.history = {};
    }
    console.log("LOG user data:", this.data);
    callback();
};

User.set_initial_data = function (uid, name, class_number, callback) {
    var data = {
        profile: {
            name: name, 
            class_number: class_number
        },
        history: false
    };
    Persist.set(["users", uid], data, callback);
};



User.prototype.logout = function () {
    Persist.logout_user();
    delete_cookie("quiz_uid", "/", null);
};


//there might be multiple to starting a module
    //e.g. from profile, hitting advance or other
User.prototype.start_module = function (id) {
    console.log("DEBUG 11-7 entering user.start_module");
    console.log("DEBUG 11-16 argument id = ", id);
    
    
    //the module may not exist in their history, so we create it if so
    console.log("DEBUG 11-16 user.submodule_complete is true");
    if (!(id in this.data.history)) {
        console.log("DEBUG 11-16 creating module with id = ", id);
        this.create_module(id);
    }
    
    console.log("DEBUG 11-16 this.data.history[id] = ", this.data.history[id]);
    
    //we need to set our in_progress
    this.data.history[id].in_progress = true;
    
    //we need to set our level
    // this.quiz.game.set_level(ALL_MODULES[id].level)
    
    //we need to update history with a few crucial facts
        //in_progress is true
        //it exists
    Persist.set(["users", this.uid, "history", id], this.data.history[id]);
};


User.prototype.create_module = function(mod_id){
    
    this.data.history[mod_id] = {
        id: mod_id,
        iteration: 0,   //count
        //todo should this be set to true since it always starts as true?
        in_progress: false,
        progress: 0,
        metrics: false    //dictionary
    };
    
    //todo since we write to firebase in the wrapping function start_module 
    // - shouldn't we skip the following line and just persist there?
    Persist.set(["users", this.uid, "history", mod_id], this.data.history[mod_id]); 
};



//returns int (or null if they've run out of modules)
User.prototype.get_current_module = function(){
    var sorted = get_module_order();
    
    for(var i = 0; i < sorted.length; i++){
        var mod_id = sorted[i];
        if(this.classify_module(mod_id) === 'frontier'){
            console.log("LOG current_module = ", mod_id);
            return mod_id;   
        }
        /*old code
        if(mod_id in this.data.history){
            if(this.data.history[mod_id].iteration == 0){
                return mod_id;   
            }
        } else {
            return mod_id;   
        }*/
    }
    console.log("LOG no current module detected");
    return null;            // they've completed everything
};







User.prototype.submodule_complete = function (module_id) {
    var mod = this.data.history[module_id];
    mod.progress++;
    var rollover = mod.progress >= ALL_MODULES[module_id].threshold;
    
    console.log("DEBUG 11-16 entering rollover mod = ", mod);
    console.log("DEBUG 11-16 entering rollover mod.progress = ", mod.progress);
    console.log("DEBUG 11-16 entering problem area, rollover");
    console.log("DEBUG 11-16 rollover is", rollover);
    //a module has been completed (e.g. 5/5)
    if (rollover) {
        
        mod.iteration++;
        mod.progress = 0;
        mod.in_progress = false;
        console.log("DEBUG 11-8 inside rollover mod = ", mod);
        console.log("DEBUG 11-8 inside rollover mod.progress = ", mod.progress);
        console.log("DEBUG 11-16 in progress", mod.in_progress);
        
        //todo change below to get current module
        this.start_module(module_id + 1);
        
    }
    
    console.log("DEBUG 11-15 leaving problem area, rollover");
   

    Persist.set(["users", this.uid, "history", module_id], mod);  
    
    console.log("DEBUG 11-15 leaving problem area, persist.set");
    return rollover;
};



User.prototype.get_module = function(id){
    return this.data.history[id];
};




//incorrect = # of incorrect before termination of question (i.e. streak of incorrects)
User.prototype.update_question_metrics = function(incorrect, module_id) {
    var mod = this.data.history[module_id];
    // console.log("DEBUG 11-7 mod = ", mod);
    if (!mod.metrics) {
        mod.metrics = {};    
    }
    
    
    //just did 1st question on a new iteration of the module
    if (!(mod.iteration in mod.metrics)) {
        mod.metrics[mod.iteration] = {};            //creates key and value
    } 
    
    var map = mod.metrics[mod.iteration];
    
    
    map[incorrect] = incorrect in map ? map[incorrect] + 1 : 1;
    // console.log("DEBUG user module", mod);
    
    Persist.set(["users", this.uid, "history", module_id, "metrics"], mod.metrics);
};




//this is now obsolete
User.prototype.get_current_stats = function (module_id) {
    console.log("entering get_current_stats");
    
    //universal module
    var order = get_module_order();
    var UNIVERSAL_MODULE = ALL_MODULES[order[module_id]];
    
    //personal module
    var mod = this.data.history[module_id];
    
    //the case of uncompleted module
    if (!mod) {return null;}
    
    
    // console.log("module_id", module_id);
    // console.log("mod.iteration", mod.iteration);
    // console.log("mod.in_progress", mod.in_progress);

    //return a tagged union, i.e. a tuple with tuple[0] being the tag (fractio or a number)
    if (mod.in_progress) {
        if (mod.iteration == 0) {
            // furthest frontier
            // 1/5
            return [1, mod.progress, UNIVERSAL_MODULE.threshold];
        } else if (mod.iteration > 0) {
            //completed one that's improving
            //current accuracy = 87% 
            //todo add previous accuracy = 76% later
            return  [2, get_accuracy2(mod.metrics[mod.iteration])];
        } 
    } else {
        if (mod.iteration > 0) {
            //completed, not improving   
            // accuracy = 56%
            var accuracy_list = Object.keys(mod.metrics).map(function (key) {
                return get_accuracy2 (mod.metrics[key]);
            });
            return [2, Math.max.apply(null, accuracy_list)];
        } else if (mod.iteration == 0) {
            return null;
        }
    }
    throw "no statistics generated";
}


User.prototype.fill_lightbox = function(text) {
    var name = this.data.profile.name;
    el("pop_up_div").innerHTML = "CONGRATULATIONS " + name + "!<br>" + text;
};

User.prototype.is_valid = function (mod_id) {
    return this.data.history[mod_id] && this.data.history[mod_id].iteration > 0;
}




//should be a util
//takes an object and an iteration 
// User.get_accuracy = function (mod, iteration) {
//     return Math.floor(100 * mod.metrics[iteration][0]
//     / Object.keys(mod.metrics[iteration]).
//     map(function (x) {return mod.metrics[iteration][x]}).
//     reduce(function (a, b) {return a + b}))
// }


//this should be a util since it doesn't reference this.
// User.prototype.get_accuracy3 = function (iteration) {
//     return Math.floor(100 * iteration[0]
//     / Object.keys(iteration).
//     map(function (x) {return iteration[x]}).
//     reduce(function (a, b) {return a + b}))
// };



User.prototype.classify_module = function (mod_id) {
    console.log("DEBUGGING 11-22 classify_module entered");
    // console.log("DEBUGGING 11-20 classify_module mod_id = ", mod_id);
    // console.log("DEBUGGING 11-20 classify_module mod = ", mod);
    console.log("DEBUG 11-22 mod_id =", mod_id);
    console.log("DEBUGGING 11-20 this.data.history = ", this.data.history);
    console.log("DEBUGGING 11-20 this.data.history number of keys ", Object.keys(this.data.history).length);
    if (Object.keys(this.data.history).length === 0 && mod_id == 1) {
        console.log("DEBUG 11-22 frontier triggered because history is empty");
        return "frontier";
    }
    
    console.log("DEBUG 11-22 before problem area");
    var mod = this.data.history[mod_id];
    console.log("DEBUG 11-22 mod = ", mod);
    
    if (!mod) {
        console.log("DEBUG 11-20 !mod triggered, therefore incomplete");
        return "uncompleted";
    } else {
        if (mod.in_progress) {
            if (mod.iteration == 0) {
                return "frontier";
            } else if (mod.iteration > 0) {
                return "improving";
            }
        } else {
            if (mod.iteration == 0) {
                return "uncompleted";
            } else if (mod.iteration > 0) {
                return "completed";
            }
        }
        throw "no module type detected";
    }
}


User.prototype.get_improving_module = function() {
    var sorted = get_module_order();
    for(var i = 0; i < sorted.length; i++){
        var mod_id = sorted[i]
        if(this.classify_module(mod_id) === 'improving'){
            console.log("DEBUG 11-20 get_improving_module improving module detected = ", mod_id);
            return mod_id;   
        }
    }
    console.log("DEBUG 11-20 get_improving_module no improving module detected");
    return null;            // they have no improving module
}

//accuracy list
//max of that list - > max
//[-1] item in that list -> current accuracy in improving
// max of popped list -> max previous accuracy
User.prototype.get_accuracy_list = function (module_id) {
    //we access the metrics object
    console.log("DEBUG 11-20 get_accuracy list module_id = ", module_id);
    console.log("DEBUG 11-20 in get_display_caption this.data.history[module_id] = ", this.data.history[module_id]);
    var metrics = this.data.history[module_id].metrics;
    console.log("DEBUG 11-20 in get_accuracy_list metrics = ", metrics);
    //we summarize
    var accuracy_list = Object.keys(metrics).map(function (key) {
    return get_accuracy3 (metrics[key]);
    });
    return accuracy_list;
}


User.prototype.get_max_accuracy = function (module_id) {
    console.log("DEBUG 11-20 get_max_accuracy list module_id = ", module_id);

    //we get the accuracy on all of the iterations of the metrics objecgt
    var accuracy_list = this.get_accuracy_list(module_id);
    var result = Math.max.apply(null, accuracy_list);
    if (!isFinite(result)) {return 0} else {return result}
}

User.prototype.get_current_accuracy = function (module_id) {
    var accuracy_list = this.get_accuracy_list(module_id);
    return accuracy_list[accuracy_list.length - 1]
}

User.prototype.get_previous_max_accuracy = function (module_id) {
    var accuracy_list = this.get_accuracy_list(module_id)
    var result = Math.max.apply(null, accuracy_list.slice(0, -1))
    if (!isFinite(result)) {return 0} else {return result}
}


//todo should we make a get progress function
//argument = integer
//return = [numerator, denominator]
User.prototype.get_progress = function (module_id) {
    console.log("entering get_progress");
    console.log("DEBUG 11-22 this.data.history[module_id]", this.data.history[module_id]);
    // var progress = this.data.history[module_id].progress;
    // console.log("DEBUG 11-22 progress = ", progress);
    
    //todo below is hacky, fix it
    var numerator;
    if (!this.data.history[module_id]) {
        console.log("DEBUG 11-22 undefined mod progress detected");
        numerator = 0;
    } else {
        console.log("DEBUG 11-22 undefined mod progress detected");
        numerator = this.data.history[module_id].progress;
    }
    
    console.log("DEBUG 11-20 numerator = ", numerator);
    
    var denominator = ALL_MODULES[module_id].threshold;
    console.log("DEBUG 11-20 denominator = ", denominator);
    
    return [numerator, denominator];
    
}


User.set_cookie = function(uid){
    set_cookie("quiz_uid", uid, "/");
};

User.remove_cookie = function(){
    delete_cookie("quiz_uid", "/", null);
};





//we're never gonna set module progress ourselves only increment it
// User.prototype.set_module_progress = function (module_id, progress, callback) {
//     Persist.set(["users", this.uid, "history", module_id, "progress"], progress, callback);
// };


//field 1 = they got it right
//field 1 = they got it right
// User.prototype.update_question_metrics = function(field, module_id){
//      var mod = this.data.history[module_id];
//      var key = ["correct", "incorrect", "max_streak"][field-1];
     
//      mod[key]++;
     
//      Persist.set(["users", this.uid, "history", module_id, key], mod[key]);
// };
