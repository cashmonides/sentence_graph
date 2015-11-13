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
    // console.log("DEBUG 11-7 entering user.start_module");
    // console.log("DEBUG 11-7 user.start_module - id = ", id);
    // console.log("DEBUG 11-7 user.start_module - this.data.history = ", this.data.history);
    
    //the module may not exist in their history
    if (!(id in this.data.history)) {
        this.create_module(id);
    }
    this.data.history[id].in_progress = true;
    Persist.set(["users", this.uid, "history", id], this.data.history[id]);
};


User.prototype.create_module = function(mod_id){
    // console.log("CREATE MODULE TRIGGERED", mod_id);
    this.data.history[mod_id] = {
        id: mod_id,
        iteration: 0,   //count
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
        var mod_id = sorted[i]
        if(mod_id in this.data.history){
            if(this.data.history[mod_id].iteration == 0){
                return mod_id;   
            }
        } else {
            return mod_id;   
        }
    }
    return null;            // they've completed everything
};





User.prototype.submodule_complete = function (module_id) {
    var mod = this.data.history[module_id];
    mod.progress++;
    var rollover = mod.progress >= ALL_MODULES[module_id].threshold;
    
    console.log("DEBUG 11-8 entering rollover mod = ", mod);
    console.log("DEBUG 11-8 entering rollover mod.progress = ", mod.progress);
    
    
    //a module has been completed (e.g. 5/5)
    if (rollover) {
        
        mod.iteration++;
        mod.progress = 0;
        mod.in_progress = false;
        console.log("DEBUG 11-8 inside rollover mod = ", mod);
        console.log("DEBUG 11-8 inside rollover mod.progress = ", mod.progress);
        
        //todo change below to get current module
        this.start_module(module_id + 1);
        
    }
   

    Persist.set(["users", this.uid, "history", module_id], mod);    
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


User.prototype.get_current_stats = function (module_id) {
    
    //module_id  is an integer
    
    //universal module
    var order = get_module_order();
    var UNIVERSAL_MODULE = ALL_MODULES[order[module_id - 1]];
    
    //personal module
    var mod = this.data.history[module_id];
    
    if (!mod) {return ''}
    
    
    
    
    console.log("entering get_current_stats");
    // console.log("module_id", mod_id);
    // console.log("mod.iteration", mod.iteration);
    console.log("mod.in_progress", mod.in_progress);
    
    
    var get_accuracy = function (iteration) {
        return Math.floor(100 * mod.metrics[iteration][0]
        / Object.keys(mod.metrics[iteration]).
        map(function (x) {return mod.metrics[iteration][x]}).
        reduce(function (a, b) {return a + b}))
    }

    
    
    
    if (mod.in_progress == true && mod.iteration == 0) {
        // advance
        return mod.progress + '/' + UNIVERSAL_MODULE.threshold
    } else if (mod.in_progress == true && mod.iteration > 0) {
        // improve
        return 'advancing ' + get_accuracy(mod.iteration) + '% previous best ' +
        Math.max.apply(null, Object.keys(mod.metrics).filter(
        function (x) {return x != mod.iteration}).map(get_percentage))
    } else if (mod.in_progress == false && mod.iteration > 0) {
        // completed, not in progress
        //return highest accuracy
        return 'accuracy = ' + Math.max.apply(null,
        Object.keys(mod.metrics).map(get_accuracy)) + "%"
    } else if (mod.in_progress == false && mod.iteration == 0) {
        return ""
    } else {
        throw new Error('No case successfully caught.')
    }
    // else if (mod.in_progress == "false" && mod.iteration == 0) {
    //     return ""
    // }
}


User.prototype.fill_lightbox = function(text) {
    var name = this.data.profile.name;
    el("pop_up_div").innerHTML = "CONGRATULATIONS " + name + "!<br>" + text;
};

User.prototype.is_valid = function (mod_id) {
    return this.data.history[mod_id] && this.data.history[mod_id].iteration > 0;
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
