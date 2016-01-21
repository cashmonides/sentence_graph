//console.log"DEBUG 10-29 USER OBJECT TRIGGERED+++++++");

var User = function() {
    this.data = null;
    this.uid = null;
};


User.prototype.load = function(callback) {
    this.uid = get_cookie("quiz_uid");
    console.log("DEBUG 11-23 user uid:", this.uid);
    
    
    //this should load the user's data
    //firstly in regular mode and else in anonymous mode, initializes it as nothing
    if (this.uid != null) {
        var self = this;
        //2 layers of functions
        //i.e. a function calls another function
        //function 1: function(data){ self.user.....}     called asynchronously b/c it's in persist.get which is asynchronous
        //function 2: a function called callback          not necessarily asynchronous
        
        //data here (the argument of function) is automatically passed by firebase into the callback
        Persist.get(["users", this.uid], function(data){ self.user_data_loaded(data, callback); });
        
        return true;
    } else {
        //console.log"error: no user id");
        //TODO make into a separate function
        console.log("DEBUG 11-24 initial data for anonymous user about to be set");
        //todo history: false changed to history : {}  a bit hacky 
        //todo is the following worth doing???
        // this.uid = "anonymous";
        this.data = {
            profile : {
                name : "anonymous",
                class_number : "anonymous"
            }, 
            history : {}
        }; 
        console.log("DEBUG 11-24 in user.proto.load anonymous this.data = ", this.data);
        return false;
    }

};

//parameters:
//data = passed to it automatically by firebase
//callback is the function
User.prototype.user_data_loaded = function(data, callback){
    try {
        //gets the data from firebase
        this.data = data.val();
        //when first starting, the history = false in firebase, so we replace it with an empty dictionary
        if (!this.data.history) {
            this.data.history = {};
        }
        console.log("LOG user data:", this.data);
        callback();
    } catch (e) {
        log_error(e, "user_data_loaded");
    }
};

//makes a local copy of whatever is on firebase
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
    
    //todo Dan's addition
    //we initiate our metrics
    console.log('mod =', this.data.history[id]);
    this.init_metrics(this.data.history[id]);
    
    //todo Akiva's addition
    //we set our time stamp of the beginning of the module
    // this.log_module_start_time(id);
    
    
    
    //we need to set our level
    // this.quiz.game.set_level(ALL_MODULES[id].level)
    
    //we need to update history with a few crucial facts
        //in_progress is true
        //it exists
    this.persist(["history", id], this.data.history[id]);
};


User.prototype.create_module = function(mod_id){
    
    this.data.history[mod_id] = {
        id: mod_id,
        iteration: 0,   //count
        //todo should this be set to true since it always starts as true?
        in_progress: false,
        progress: 0,
        metrics: false,    //dictionary
        progress_bars: false  // New.
    };
    
    //todo since we write to firebase in the wrapping function start_module 
    // - shouldn't we skip the following line and just persist there?
    this.persist(["history", mod_id], this.data.history[mod_id])
};

// todo akiva look at this
User.prototype.add_progress_bar = function (progress_bar, mod_id) {
    if (!this.data.history[mod_id].progress_bars) {
        this.data.history[mod_id].progress_bars = {}}
    var progress = this.data.history[mod_id].progress;
    var progress_bars = this.data.history[mod_id].progress_bars;
    if (!(progress in progress_bars)) {
       progress_bars[progress] = []
    }
    progress_bars[progress].push(progress_bar);
    console.log('progress_bars = ' + progress_bars);
};


// persist only sets
User.prototype.persist = function (path, value, callback) {
    if (this.uid != null) {
       Persist.set(["users", this.uid].concat(path), value, callback); 
    } else {
        console.log('this.uid == null!!!')
    }
};

/*
User.prototype.persist_general = function (path, value, action, callback) {
    if (this.uid != null) {
        console.log(action);
        console.log(action in Persist)
        Persist[action](["users", this.uid].concat(path), value, callback); 
    } else {
        console.log('this.uid == null!!!')
    }
};
*/


//returns int (or null if they've run out of modules)
//gets the advancing module (i.e. the frontier)
User.prototype.get_current_module = function(){
    var sorted = get_module_order();
    
    for(var i = 0; i < sorted.length; i++){
        var mod_id = sorted[i];
        // if(this.classify_module(mod_id) === 'frontier'){
        //     console.log("LOG current_module = ", mod_id);
        //     return mod_id;   
        // }
        
    
        if(mod_id in this.data.history){
            if(this.data.history[mod_id].iteration == 0){
                return mod_id;   
            }
        } else {
            return mod_id;   
        }
    }
    console.log("LOG no current module detected");
    return null;            // they've completed everything
};

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




User.prototype.submodule_complete = function (module_id) {
    var self = this;
    var mod = this.data.history[module_id];
    console.log("12-30 mod = ", mod);
    console.log("12-30 mod.progress = ", mod.progress);
    mod.progress++;
    //rollover is a boolean
    var rollover = mod.progress >= ALL_MODULES[module_id].threshold;
    
    console.log("DEBUG 11-16 entering rollover mod = ", mod);
    console.log("DEBUG 11-16 entering rollover mod.progress = ", mod.progress);
    console.log("DEBUG 11-16 entering problem area, rollover");
    console.log("DEBUG 11-16 rollover is", rollover);
    //a module has been completed (e.g. 5/5)
    var result = null;
    if (rollover) {
        result = function () {
            var mod = self.data.history[module_id];
            //todo Akiva's additions 12-27-15
            //we log our stop time
            // this.log_module_stop_time(module_id);
            mod.iteration++;
            mod.progress = 0;
            mod.in_progress = false;
            console.log("DEBUG 11-8 inside rollover mod = ", mod);
            console.log("DEBUG 11-8 inside rollover mod.progress = ", mod.progress);
            console.log("DEBUG 11-16 in progress", mod.in_progress);
            
            
            var previous_max_accuracy = self.get_previous_max_accuracy(module_id, 2);
            var new_accuracy = self.get_penultimate_accuracy(module_id);
            
            
            
            var improvement_comparison_feedback;
            var yes_improvement_feedback = "That's an improvement. Great job! Keep advancing."
            var no_improvement_feedback = "That's not an improvement. Try again later."
            
            if (previous_max_accuracy >= new_accuracy) {
                improvement_comparison_feedback = no_improvement_feedback;
            } else {
                improvement_comparison_feedback = yes_improvement_feedback;
            }
            
            // var dummy_improvement_comparison_feedback = "That's an improvement. Good job!//That's not an improvement. Try again later."
            
            
            if (self.quiz.advance_improve_status === "improving") {
                console.log("DEBUG 1-15 return to homebase triggered");
                
                alert("CONGRATULATIONS! You've finished improving at this level. "
                + "Your previous accuracy was " + previous_max_accuracy + "% "
                + "Your new accuracy is " + new_accuracy + "% "
                + improvement_comparison_feedback);
            
                
            }
            /* else {
                // this.start_module(module_id + 1);
            }*/
            self.persist(["history", module_id], mod); 
            document.location = "../profile/"
        };
    }
    
    console.log("DEBUG 11-15 leaving problem area, rollover");

    
    console.log("DEBUG 11-15 leaving problem area, persist.set");
    return result;
};


User.prototype.get_module = function(id){
    console.log("DEBUG 12-27 entering user.get_module");
    console.log("DEBUG 12-27 id = ", id);
    console.log("DEBUG 12-27 this.data.history", this.data.history);
    console.log("DEBUG 12-27 this.data.history[id]", this.data.history[id]);
    return this.data.history[id];
};


//quiz has this.submodule.score which will be our submodule_number
User.prototype.log_submodule_start_time = function (module_id, submodule_number) {
    console.log("DEBUG 12-28 module_id, submodule_number = ", module_id, submodule_number);
    
    var mod = this.data.history[module_id];
    
    //we need to initialize the firebase node if it doesn't exist already
    if (!mod.submodule_time_metrics) {
        mod.submodule_time_metrics = {};    
    }

    //if the node is empty we need to initialize it with a list (maybe firebase can't initialize with a list, maybe it has to be a dictionary)
    if (!(mod.submodule_number in mod.submodule_time_metrics)) {
        mod.submodule_time_metrics[submodule_number] = {};            
    }
    
    //we set the start_time
    var start_time; 
    
    if (!Date.now) {
        start_time = (new Date()).getTime();
        /* Below doesn't seem right.
        I think you took the Date.now shim and called it start_time,
        but start_time is a time, not a function.
        If we want to use the shim, we should put it somewhere else.
        start_time = function now() {
        return new Date().getTime();
        }*/
    } else {
        start_time = Date.now();
    };
    
    console.log('DEBUG 10-29 start time = ', start_time);
    /*
    the get strategy:
    the following block should work if persist.get pulls the right thing:
    
    var module_history = Persist.get([-----proper path here----]);
    
    
    //module history was coming back undefined for unknown reasons
    
    console.log('module_history = ', module_history);
    if (!('submodule_time_metrics' in module_history)) {
        module_history.submodule_time_metrics = {};
        module_history.submodule_time_metrics[submodule_number] = [[start_time]];
    } else {
        module_history.submodule_time_metrics[submodule_number].push([start_time]);
    }
    
    this.persist(["history", module_id], module_history);
    
    */
    
    
    
    
    //Dan's version below, commented out for testing
    //the no-get strategy
    
    // if (mod.iteration === 0) {
    //     var x = {};
    //     x[submodule_number] = [[start_time]];
    //     this.persist(["history", module_id, "submodule_time_metrics"], x);
    // } else {
    //     this.persist(["history", module_id, "submodule_time_metrics",
    //     submodule_number, mod.iteration], [start_time]);
    // };
    
    
    
    /*
    //the get strategy
    
    //we get the old list
    var old_list = Persist.get(["users", this.uid, "history", module_id, "submodule_time_metrics", submodule_number]);
    console.log("DEBUG 12-30 old_list_during_start = ", old_list);
    
    
    //we push our new value
    // var new_list;
    // if (old_list) {
    //     new_list = old_list.push(start_time);
    // } else {
    //     new_list = [start_time];
    // }

    
    //we persist the new list (for now we don't involve iteration, we'll add that later)
    this.persist(["history", module_id, "submodule_time_metrics",
    submodule_number], new_list);
    
    */
    
    //the map version
     var map = mod.submodule_time_metrics[submodule_number];
    
    var key_string = 'start_time' + start_time;
    
    map[key_string] = start_time;

    this.persist(["history", module_id, "submodule_time_metrics", submodule_number], mod.submodule_time_metrics);

    
}

User.prototype.log_submodule_stop_time = function (module_id, submodule_number) {
    console.log("DEBUG 12-30 submodule_number in argument = ", submodule_number);
    console.log("DEBUG 12-30 module_id in argument = ", module_id);
    var mod = this.data.history[module_id];
    console.log("DEBUG 12-30 mod = ", mod);
    
    // we presumably don't need any of this because if any of these if-conditions are met there has been a terrible error
    // if (!mod.submodule_time_metrics) {
    //     console.log("DEBUG 12-27 shouldn't be triggered!!!!");
    //     mod.submodule_time_metrics = {};    
    // }

    
    
    var stop_time; 
    
    if (!Date.now) {
        stop_time = (new Date()).getTime();
        // stop_time = function now() {
        // return new Date().getTime();
        // } 
    } else {
        stop_time = Date.now();
    };
    
    
    /*
    //another push strategy
    // var map = mod.submodule_time_metrics[submodule_number];
    /// map['stop_time'] = stop_time;
    // Issue: No built-in "peek" in Firebase.
    // peek(mod.submodule_time_metrics[submodule_number]).push(stop_time);
    
    var start_time_list = Persist.get(["users", this.uid, "history", module_id,
    "submodule_time_metrics", submodule_number, mod.iteration]);
    
    start_time_list.push(stop_time);
    
    Persist.set(["history", module_id, "submodule_time_metrics",
    submodule_number, mod.iteration], start_time_list);
    */
    
    
    /*
    //the get strategy
    //we get the old list
    var old_list = Persist.get(["users", this.uid, "history", module_id, "submodule_time_metrics", submodule_number]);
    console.log("DEBUG 12-30 old_list = ", old_list);
    
    //we push our new value
    var new_list = old_list.push(stop_time);

    
    //we persist the new list (for now we don't involve iteration, we'll add that later)
    this.persist(["history", module_id, "submodule_time_metrics",
    submodule_number], new_list);
    */
    
   
    //the map version (doesn't work because it replaces, we want to push)
     var map = mod.submodule_time_metrics[submodule_number];
    
    var key_string = 'stop_time' + stop_time;
    
    map[key_string] = stop_time;

    this.persist(["history", module_id, "submodule_time_metrics", submodule_number], mod.submodule_time_metrics);

}

//below doesn't work (error: Uncaught TypeError: b.replace is not a function)
// User.prototype.get_data = function (path) {
    
//     function callback_new() {
//         console.log("DEBUG 12-30 callback_new triggered");
//         Persist.get([path], callback_new2);
//     }
    
//     function callback_new2(data) {
//         console.log("DEBUG 12-30 callback_new2 triggered");
//         var x = data.val();
//         console.log("DEBUG 12-30 target_data = ", x);
//         return x;
//     }
 
//     console.log("DEBUG 12-30 about to invoke double callback");
//     callback_new();
// }


User.prototype.getting_firebase_data = function(data, callback){
    try {
        var test_output2 = data.val();
        
        console.log("DEBUG 12-30 test_output2", test_output2);
        
        callback();
    } catch (e) {
        log_error(e, "getting_firebase_data");
    }
};

var empty_callback3 = function () {
        return;
    }
    
User.prototype.request_data = function (path, callback) {
    //this is modeled on the get in user data loaded but it needs a callback to be passed in
    Persist.get(path, function(data){ 
        console.log("DEBUG 12-30 inside function");
        self.getting_firebase_data(data, callback); });
}

User.prototype.log_module_start_time = function (module_id) {
    var mod = this.data.history[module_id];
    
    // var empty_callback2 = function () {
    //     return;
    // }
    
    //this is modeled on the get in user data loaded
    // var test_output = this.request_data(["users", this.uid, "profile", "name"], empty_callback3);
    
    
    
    //below didn't seem to work without a callback (said invalid path)
    // var test_output = Persist.get(["users", this.uid, "profile", "name"]);
    
    //below (adding an empty callback) doesn't give an error but doesn't seem to work either
    // var empty_callback2 = function () {
    //     return;
    // }
    // var test_output = Persist.get(["users", this.uid, "profile", "name"], empty_callback2);
    
    //the radical move of imitating the get procedure in admin doesn't work either
    //error = Uncaught TypeError: b.replace is not a function
    // var test_output = this.get_data(["users", this.uid, "profile", "name"]);
    
    // console.log("DEBUG 12-30 test_output = ", test_output);
    
    
    
    
    
    
    // if (!mod.time_metrics) {
    //     mod.time_metrics = {};    
    // }
    
    // //just did 1st question on a new iteration of the module
    // if (!(mod.iteration in mod.time_metrics)) {
    //     mod.time_metrics[mod.iteration] = {};            //creates key (int) and value (empty map)
    // } 
    
    // var map = mod.time_metrics[mod.iteration];
    
    

    // if (!map['start_time']) {
    //     map['start_time'] = [];
    // }
    // map['start_time'].push(start_time);
    
    // map['start_time'] = start_time;

    // this.persist(["history", module_id, "time_metrics"], mod.time_metrics);
    
    var start_time = Date.now ? Date.now() : new Date().getTime();
    
    
    var empty_callback4 = function(error) {
        console.log("empty_callback4 triggered");
        if (error != null) {
            console.log("error in empty_callback4", error);
        }
    };
    
    var map = {'start_time' : start_time};
    
    Persist.push(["users", this.uid, "history", module_id], map, empty_callback4);
    
    
    /*
    THE LIST OF LISTS APPROACH
    get current list
    if it's a start time you push a start time 
    if it's a stop time you 
    time_metrics: [[1232123132321], [123232132132132213], [13231231312321, 12312312312321]]
    */
    
    
    /*
    PUSHING TO A DICTIONARY APPROACH
    push a map 
    {
    start: 112432123312312,
    stop: null
    }
    or if they do stop
    {stop: 12312312132231}
    
    0:
    {
        start: 112432123312312,
    }
    1 {
        start: 112432123312312,
    }
    2:
        start: 1124321233121331,
        stop: 112432123312312,
    }
    
    
    
    
    */
    
    
    
    /*
    THE GET AND SET APPROACH
    var old_list = persist.get(list_of_start_time)    //list_of_start_time = a single integer 0909809809
    var new_list = old_list.push(new_start_time)      //new_list = 
    
    */
    
}


User.prototype.log_module_stop_time = function (module_id) {
    var mod = this.data.history[module_id];
    
    // we presumably don't need any of this because if any of these if-conditions are met there has been a terrible erro
    // if (!mod.time_metrics) {
    //     console.log("DEBUG 12-27 shouldn't be triggered!!!!");
    //     mod.time_metrics = {};    
    // }
    
    // //just did 1st question on a new iteration of the module
    // if (!(mod.iteration in mod.time_metrics)) {
    //     console.log("DEBUG 12-27 shouldn't be triggered!!!!");
    //     mod.time_metrics[mod.iteration] = {};            //creates key and value
    // } 
    
    
    
    
    
    var stop_time; 
    
    if (!Date.now) {
        stop_time = function now() {
        return new Date().getTime();
        } 
    } else {
        stop_time = Date.now();
    };


    var map;
    
    map['stop_time'] = stop_time;
    
    Persist.push(["users", this.uid, "history", module_id], map, empty_callback4);
    
    

}




//incorrect = # of incorrect before termination of question (i.e. streak of incorrects)
User.prototype.update_question_metrics = function(incorrect, module_id) {
    // This is called when going into a module.
    var mod = this.data.history[module_id];
    
    // In the future this may not be needed.
    this.init_metrics(mod)
    
    var map = mod.metrics[mod.iteration];
    
    
    map[incorrect] = incorrect in map ? map[incorrect] + 1 : 1;
    // console.log("DEBUG user module", mod);
    
    
    
    this.persist(["history", module_id, "metrics"], mod.metrics);
};

//todo Dan's addition below, check if ok
User.prototype.init_metrics = function (mod) {
    if (!mod.metrics) {
        mod.metrics = {};    
    }
    
    //just did 1st question on a new iteration of the module
    if (!(mod.iteration in mod.metrics)) {
        mod.metrics[mod.iteration] = {};            //creates key and value
    }
}

//todo Akiva's addition below, check if ok
User.prototype.record_event = function(time_stamp, correct, module_id, mode, level) {
    var mod = this.data.history[module_id];
    
    if (!mod.events) {
        mod.events = {};    
    }
    
    //just did 1st question on a new iteration of the module
    if (!(mod.event in mod.events)) {
        mod.events[mod.event] = {};            //creates key and value
    } 
    
    var map = mod.events[mod.event];
    
    
    map[time] = time_stamp;
    
    map[answer] = correct;
    // console.log("DEBUG user module", mod);
    
    this.persist(["history", module_id, "metrics"], mod.metrics);
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
    // console.log("DEBUGGING 11-22 classify_module entered");
    // // console.log("DEBUGGING 11-20 classify_module mod_id = ", mod_id);
    // // console.log("DEBUGGING 11-20 classify_module mod = ", mod);
    // console.log("DEBUG 11-22 mod_id =", mod_id);
    // console.log("DEBUGGING 11-20 this.data.history = ", this.data.history);
    // console.log("DEBUGGING 11-20 this.data.history number of keys ", Object.keys(this.data.history).length);
    /*
    subsumed
    if (Object.keys(this.data.history).length === 0 && mod_id == 1) {
        console.log("DEBUG 11-22 frontier triggered because history is empty");
        return "frontier";
    }
    */
    
    console.log('this.data ==', this.data);
    var mod = this.data.history[mod_id];
    var previous = this.data.history[mod_id - 1];
    console.log("DEBUG 11-22 mod = ", mod);
    
    // If the previous module hasn't even been started, or its iteration is 0
    // if (mod_id && (!previous || !previous.iteration)) {
    if (!mod) {
        console.log("DEBUG 11-20 !mod triggered, therefore...");
        if ((mod_id === 1) || (previous && (previous.iteration > 0))) {
            return "frontier";
        } else {
            return "uncompleted";
        }
    } else {
        if (mod.in_progress) {
            console.log('mod.iteration, mod.metrics.length =',
            mod.iteration, Object.keys(mod.metrics || {}).length,
            mod.iteration === Object.keys(mod.metrics || {}).length)
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


User.prototype.classify_module_plus = function (mod_id) {
    // This returns different results depending on whether
    // there is an improving module, which is useful for
    // clickability testing.
    var g = this.classify_module(mod_id);
    if (g !== 'completed') {
        console.log('classify module plus 1 says', g, mod_id)
        return g
    } else if (this.get_improving_module() === null) {
        console.log('classify module plus 2 says', mod_id)
        return 'completed_no_improving'
    } else {
        console.log('classify module plus 3 says', mod_id)
        return 'completed_improving_exists'
    }
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
    // This is a little hacky but it works.
    var iteration = this.get_iteration(module_id);
    var accuracy_list = [];
    for (var i = 0; i <= iteration; i++) {
        accuracy_list.push(metrics[i] ? get_accuracy3(metrics[i]) : 0);
    };
    console.log('accuracy_list =', accuracy_list);
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

User.prototype.get_penultimate_accuracy = function (module_id) {
    // When a module was just completed for not the first time.
    var accuracy_list = this.get_accuracy_list(module_id);
    return accuracy_list[accuracy_list.length - 2]
}

User.prototype.get_previous_max_accuracy = function (module_id, n) {
    if (!n) {n = 1};
    var accuracy_list = this.get_accuracy_list(module_id)
    var result = Math.max.apply(null, accuracy_list.slice(0, -n))
    if (!isFinite(result)) {return 0} else {return result}
}

User.prototype.get_iteration = function (module_id) {
    if (this.data.history[module_id]) {
        return this.data.history[module_id].iteration
    } else {
        return 0
    }
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
