//todo global
// @global
var empty_callback3 = function () {}
    


var User = function() {
    this.data = null;
    this.uid = null;
};


User.prototype.load = function(callback) {
    this.uid = get_cookie("quiz_uid");
    console.log("LOG: user uid:", this.uid);
    
    this.check_login_status();
    
    
    //this should load the user's data
    //firstly in regular mode and else in anonymous mode, initializes it as nothing
    if (this.uid != null) {
        var self = this;
        //2 layers of functions
        //i.e. a function calls another function
        //function 1: function(data){ self.user.....}     called asynchronously b/c it's in persist.get which is asynchronous
        //function 2: a function called callback          not necessarily asynchronous
        
        //data here (the argument of function) is automatically passed by firebase into the callback
        Persist.get(["users", this.uid], function (data) {
            self.user_data_loaded(data, callback);
        });
        
        return true;
    } else {
        console.log("PROBLEM: no user id");
        //TODO make into a separate function
        console.log("PROBLEM: initial data for anonymous user about to be set");
        //todo history: false changed to history : {}  a bit hacky 
        //todo is the following worth doing???
        // this.uid = "anonymous";
        this.data = {
            profile : {
                name : "anonymous",
                class_number : "anonymous",
                class_number: "anonymous",
                grade: "anonymous",
                school: "anonymous"
            }, 
            history : {}
        }; 
        console.log("PROBLEM in user.proto.load anonymous this.data = ", this.data);
        return false;
    }

};


//parameters:
//data = passed to it automatically by firebase
//callback is the function
User.prototype.user_data_loaded = function (data, callback) {
    try {
        //gets the data from firebase
        this.data = data.val();
        //when first starting, the history = false in firebase, so we replace it with an empty dictionary
        if (!this.data.history) {
            this.data.history = {};
        }
        back.log("user data:", this.data);
        console.log("BEEHACK 123 user data:", this.data);
        
        // todo add functionality
        // first time users (2nd and 4th graders) should have a special set of modules
        // if user is 1st time, set_module_regime(arg) etc.
        
        
        // some users use mf (Moreland & Fleischer) textbook
        // if so we need to give them specific module
        if (this.is_mf()) {
            back.log("change to mf  regime");
            set_module_regime(MF_MODULES);
        }
        
        if (callback) {callback()};
    } catch (e) {
        log_error(e, "user_data_loaded");
    }
};

//todo new version here - make sure it works before deleting old version
//makes a local copy of whatever is on firebase and persists it to firebase
User.set_initial_data = function (uid, name, school, grade, class_number, email, callback) {
    var data = {
        profile: {
            name: name, 
            class_number: class_number,
            grade: grade,
            school: school,
            email: email
        },
        history: {
            sentence_logs: {}
        }
    };
    Persist.set(["users", uid], data, callback);
};

User.prototype.logout = function () {
    this.set_login_status(null);
    Persist.logout_user();
    delete_cookie("quiz_uid", "/", null);
};


// there might be multiple ways to start a module
// e.g. from profile, hitting advance or other

// issue: when a module is started in quiz, the sequence of events
// needs to be thus:
// 0: quiz sets self up
// 1: quiz creates user
// 2: user sets self up / gets data
// (through firebase connection)
// 3: user sends data to quiz
// 4: quiz decides whether to continue based on data
// 5: if so, user marks module as started
// This function used to be called in 2/3 position,
// but it really does 5. So it is now called appropriately.
// Also, it used to have a lot of useless commented parts, whitespace,
// and logging statements. The old version is in obsolete.

User.prototype.start_module = function (id) {
    // We do what I think is the crucial security check.
    //this is a function currently in user_login_status.js
    //runs a callback in case of two problems
    // not logged in || on two computers simultaneously
    this.important_event_check_string();
    
    //the module may not exist in their history, if so we create it
    if (!(id in this.data.history || this.is_mf())) {
        this.create_module(id);

        var history_here = this.data.history[id];
    
        //we need to set our in_progress
        history_here.in_progress = true;
        
        //todo Dan's addition
        //we initiate our metrics
        this.init_metrics(history_here);
        
        //we need to update history with a few crucial facts
            //in_progress is true
            //it exists
        // If module id is 0.25 or 0.5, we are in a module without history
        // and thus shoudl not persist
        if (id !== 0.25 && id !== 0.5) {
            this.persist(["history", id], history_here);
        }
    };
    
    //AKIVA DAMAGE CONTROL
    // on 11-19 akiva added the following (which seems to work)
    //seemed like we somehow we weren't setting in-progress to be true for improving modules
    
    // If module id is 0.25 or 0.5, we are in a module without history
    // and thus shoudl not persist
    if (id !== 0.25 && id !== 0.5) {
        this.persist(["history", id, 'in_progress'], 'true');
    }
};

User.prototype.create_module = function (mod_id) {
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
    
    
    //todo 2-6 akiva's additions, make sure nothing got broken
    
    // If module id is 0.25 or 0.5, we are in a module without history
    // and thus shoudl not persist
    if (this.uid != null && mod_id !== 0.25 && mod_id !== 0.5) {
        this.persist(["history", mod_id], this.data.history[mod_id])
    }
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
        console.log('this.uid == null!!!');
    }
};


//returns int (or null if they've run out of modules)
//gets the advancing module (i.e. the frontier)
User.prototype.get_current_module = function() {
    if (this.data === null) {
        throw 'this.data should not be null in ' +
        'getting the current module';
    }
    var sorted = get_module_order();
    
    for(var i = 0; i < sorted.length; i++){
        var mod_id = sorted[i];
        // if(this.classify_module(mod_id) === 'frontier'){
        //     console.log("LOG current_module = ", mod_id);
        //     return mod_id;   
        // }
        
    
        if (mod_id in this.data.history) {
            if (this.data.history[mod_id].iteration === 0) {
                return mod_id;   
            }
        } else {
            return mod_id;   
        }
    }
    bug.log("PROBLEM no current module detected");
    return null;            // they've completed everything
};

User.prototype.get_improving_module = function() {
    var sorted = get_module_order();
    for(var i = 0; i < sorted.length; i++){
        var mod_id = sorted[i]
        if(this.classify_module(mod_id) === 'improving'){
            return mod_id;   
        }
    }
    console.log("LOG: in user.js no improving module detected");
    return null;            // they have no improving module
}

// todo obviously this is super hacky
// some users don't have spelling bee levels in their user profile
User.prototype.intialize_spelling_bee_counter_if_it_does_not_already_exist = function () {
    this.persist(["spelling_level"], 0);
}



User.prototype.get_spelling_bee_level_old = function() {
    // console.log("BEEHACK123 entering user.get_spelling_bee_level")
    // console.log("BEEHACK123 callback = ", callback);
    // var path = ["users", this.uid, "spelling_bee_level"];
    var path = ["users", this.uid, "spelling_level"];
    // Persist.get(path, callback);
    
    
    
    Persist.get(path, function(x){ 
        set_persistent_spelling_bee_level(x);
    });
    
};



User.prototype.get_spelling_bee_level = function() {
    console.log("BEEHACK123 this.data.spelling_level = ", this.data.spelling_level);
    return this.data.spelling_level;
};

User.prototype.get_initial_spelling_bee_counter = function () {
    console.log("BEEHACK123 this.data.spelling_level = ", this.data.spelling_level);
    // todo @999 a hacky short term fix
    // long term initialize when user is created
    if (this.data.spelling_level === undefined || this.data.spelling_level === null) {
        Persist.set(["users", this.uid, "spelling_level"], 0, function (x) {
            console.log("BEEHACK999 user spelling level set to 0");
        });
        // also set spelling level to 0
        this.data.spelling_level = 0;
    }
    
    return this.data.spelling_level;
};


User.prototype.persist_spelling_bee_counter = function (level) {
    console.log("BEEHACK707 entering user.persist_spelling_bee_counter about to persist with counter = ", level);
    
    
    Persist.set(["users", this.uid, "spelling_level"], level, function () {
        console.log('BEEHACK707 empty callback triggered');
    });
    
    // this.persist(["spelling_level"], level, function (x) {
    //     console.log('BEEHACK707 empty callback triggered', x);
    // });
}





User.prototype.get_spelling_training_module = function() {
    return 0.5;
};

User.prototype.get_spelling_match_module = function() {
    return 0.25;
};


User.prototype.is_mf = function () {
    return ends_with(this.data.profile.email, '.mf');
}

User.prototype.check_not_mf = function () {
    if (this.is_mf()) {
        throw 'current operation makes no sense, and should not be occuring, ' + 
        'for an mf user!';
    }
}

User.prototype.get_module_being_played = function () {
    this.check_not_mf();
    if (this.quiz.advance_improve_status === "advancing") {
        return this.get_current_module();
    } else if (this.quiz.advance_improve_status === "improving") {
        return this.get_improving_module();
    }
}



User.prototype.submodule_complete = function (module_id) {
    
    
    
    
    
    
    console.log("[user.submodule_complete] entering submodule_complete");
    // It is very important to check the user here.
    this.important_event_check_string();
    var self = this;
    var mod = this.data.history[module_id];
    console.log("[user.submodule_complete] entering problem area");
    console.log("[user.submodule_complete] mod = ", mod);
    console.log("[user.submodule_complete] mod.progress before increment = ", mod.progress);
    mod.progress++;
    console.log("[user.submodule_complete] mod.progress after increment", mod.progress);
    //todo this is what akiva fiddled with 1-26
    // this.persist(["history", module_id], mod);
    //rollover is a boolean
    var rollover = (mod.progress >= ALL_MODULES[module_id].threshold);
    
    console.log("[user.submodule_complete] entering rollover mod = ", mod);
    console.log("[user.submodule_complete] entering rollover mod.progress, "
    + "ALL_MODULES[module_id].threshold = ", mod.progress,
    ALL_MODULES[module_id].threshold);
    console.log("[user.submodule_complete] entering problem area, rollover");
    console.log("[user.submodule_complete] rollover is", rollover);
    //a module has been completed (e.g. 5/5)
    var result = null;
    if (rollover) {
        console.log("[user.submodule_complete] rollover if block entered");
        result = function () {
            var mod = self.data.history[module_id];
            mod.iteration++;
            mod.progress = 0;
            mod.in_progress = false;
            console.log("[user.submodule_complete] inside rollover mod = ", mod);
            console.log("[user.submodule_complete] inside rollover mod.progress = ", mod.progress);
            console.log("[user.submodule_complete] in progress", mod.in_progress);
            
            
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
            
            
            
            if (self.quiz.advance_improve_status === "improving") {
                console.log("[user.submodule_complete] return to homebase triggered");
                
                alert("CONGRATULATIONS! You've finished improving at this level. "
                + "Your previous accuracy was " + previous_max_accuracy + "% "
                + "Your new accuracy is " + new_accuracy + "% "
                + improvement_comparison_feedback);
            
                
            }
            /* else {
                // this.start_module(module_id + 1);
            }*/
            //todo this is what akiva fiddle with on 1-26
            self.persist(["history", module_id], mod); 
            
            
            document.location = "../profile/"
            
            //todo the following is a failed attempt to give anonymous users a rollover to next module
            // if (this.uid != null) {
            //     document.location = "../profile/"
            // }
            // else {
            //     console.log("DEBUG 2-6 anonymous rollover triggered");
            //     console.log("DEBUG 2-6 module_id = ", module_id);
            //     console.log("DEBUG 2-6 module_id + 1 = ", module_id + 1);
            //     self.start_module(module_id + 1);
            // }
        };
    } else {
        this.persist(["history", module_id], mod);
    }
    console.log("[user.submodule_complete] result = ", result);
    return result;
};

User.prototype.get_personal_data = function (data_to_get) {
    var profile = this.data.profile;
    if (data_to_get !== undefined) {
        // Take just one piece of data.
        return profile[data_to_get];
    } else {
        // Take the data. Take all the data.
        return ["school", "grade", "class_number", "name", "email"].map(function (x) {
            return profile[x];
        });
    }
}



User.prototype.get_module = function(id){
    return this.data.history[id];
};


User.prototype.getting_firebase_data = function(data, callback){
    try {
        var test_output2 = data.val();
        
        console.log("DEBUG 12-30 test_output2", test_output2);
        
        callback();
    } catch (e) {
        log_error(e, "getting_firebase_data");
    }
};



User.prototype.request_data = function (path, callback) {
    //this is modeled on the get in user data loaded but it needs a callback to be passed in
    Persist.get(path, function(data){ 
        console.log("DEBUG 12-30 inside function");
        self.getting_firebase_data(data, callback); });
}

User.prototype.log_module_start_time = function (module_id) {
    var mod = this.data.history[module_id];
    var start_time = current_time();
    var map = {'start_time' : start_time};
    Persist.push(["users", this.uid, "history", module_id], map, pass);
}


User.prototype.log_module_stop_time = function (module_id) {
    var mod = this.data.history[module_id];
    var stop_time = current_time();
    var map = {'stop_time': stop_time};
    Persist.push(["users", this.uid, "history", module_id], map, pass);
}

//incorrect = # of incorrect before termination of question (i.e. streak of incorrects)
User.prototype.update_question_metrics = function(incorrect, module_id) {
    
    // @999 todo ultra hacky, figure out what's really going on
    if (module_id === 0.5 || module_id === 0.25 || !module_id) {
        console.log("TODO short term solution to the missing mod in spelling_bee_trainer");
        return;
    }
    
    back.log("[user.update_question_metrics] entering user.update_question_metrics");
    back.log("[user.update_question_metrics] incorrect = ", incorrect);
    back.log("[user.update_question_metrics] module_id = ", module_id);
    
    // This is called when going into a module.
    var mod = this.data.history[module_id];
    back.log("[user.update_question_metrics] mod from history = ", mod);
    
    // In the future this may not be needed.
    this.init_metrics(mod)
    
    var map = mod.metrics[mod.iteration];
    
    
    map[incorrect] = incorrect in map ? map[incorrect] + 1 : 1;
    // console.log("DEBUG user module", mod);
    
    
    
    this.persist(["history", module_id, "metrics"], mod.metrics);
};

//todo Dan's addition below, check if ok
User.prototype.init_metrics = function (mod) {
    // @999 todo ultra hacky, figure out what's really going on
    console.log("DEBUGGING 999 mod = ", mod);
    if (mod === 0.5 || mod === 0.25 || !mod) {
        console.log("TODO short term solution to the missing mod in spelling_bee_trainer");
        return;
    }
    
    back.log("[user.update_question_metrics] entering init_metrics");
    if (!mod.metrics) {
        back.log("[user.update_question_metrics] !mod.metrics so initializing an empty map");
        mod.metrics = {};    
    }
    
    //just did 1st question on a new iteration of the module
    if (!(mod.iteration in mod.metrics)) {
        back.log("[user.update_question_metrics] !mod.iteration so initializing an empty map");
        mod.metrics[mod.iteration] = {};            //creates key and value
    }
    back.log("[user.update_question_metrics] leaving init_metrics");
}

/*
chapter = int
sentence_number = int
status = str   "completed" || "skipped"
chapter is like mod (or mod_id, or module_id,
or any of our other names for it)
sentence logs = { 1: {completed: [1,2,3,5,6], skipped: [4,7], frontier:7}}

new "getting" function gets data and passes it to second argument
a asynchronous programming workaround
*/
User.prototype.log_sentences = getting(["history", "sentence_logs"],
function (sentence_logs, path, status, mode, callback) {
    back.log("sentence_logs, path, status =",
    sentence_logs, path, status);
    
    if (!sentence_logs) {
        sentence_logs = {};
    }
    
    
    sentence_logs[path_to_list(path).join(' ') + ' ' + mode] = status;
    
    // needs to write to firebase
    // Issue: this will not do well with any other user information.
    this.persist(["history", "sentence_logs"], sentence_logs);
    
    callback();
});

User.prototype.get_skipped_sentences = function () {
    return "no skipped sentence display function implemented yet";
}


User.prototype.fill_lightbox = function(text) {
    var name = this.data.profile.name;
    el("pop_up_div").innerHTML = "CONGRATULATIONS " + name + "!<br>" + text;
};

User.prototype.is_valid = function (mod_id) {
    return this.data.history[mod_id] && this.data.history[mod_id].iteration > 0;
}

User.prototype.classify_module = function (mod_id) {
    
    
    
    var mod = this.data.history[mod_id];
    var previous = this.data.history[mod_id - 1];
    
    // If the previous module hasn't even been started, or its iteration is 0
    // if (mod_id && (!previous || !previous.iteration)) {
    if (!mod) {
        if ((mod_id === 1) || (previous && (previous.iteration > 0))) {
            return "frontier";
        } else {
            return "uncompleted";
        }
    } else {
        if (mod.in_progress) {
            // console.log('mod.iteration, mod.metrics.length =',
            // mod.iteration, Object.keys(mod.metrics || {}).length,
            // mod.iteration === Object.keys(mod.metrics || {}).length)
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
        // console.log('classify module plus 1 says', g, mod_id)
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
    back.log("[user.get_accuracy_list] entering user.get_accuracy_list")
    back.log("[user.get_accuracy_list] module_id = ", module_id);
    // console.log("DEBUG 11-20 in get_display_caption this.data.history[module_id] = ", this.data.history[module_id]);
    var metrics = this.data.history[module_id].metrics;
    back.log("[user.get_accuracy_list] metrics = ", metrics);
    
    // This is a little hacky but it works.
    var iteration = this.get_iteration(module_id);
    var accuracy_list = [];
    for (var i = 0; i <= iteration; i++) {
        accuracy_list.push(metrics[i] ? get_accuracy3(metrics[i]) : 0);
    };
    back.log("[user.get_accuracy_list] accuracy_list =", accuracy_list);
    return accuracy_list;
}


User.prototype.get_max_accuracy = function (module_id) {
    back.log("[user.get_max_accuracy] module_id = ", module_id);

    //we get the accuracy on all of the iterations of the metrics objecgt
    var accuracy_list = this.get_accuracy_list(module_id);
    var result = Math.max.apply(null, accuracy_list);
    if (!isFinite(result)) {return 0} else {return result}
}

var get_accuracy_back = function (n) {
    return function (module_id) {
        var accuracy_list = this.get_accuracy_list(module_id);
        return accuracy_list[accuracy_list.length - n];
    }
}

User.prototype.get_current_accuracy = get_accuracy_back(1);

// When a module was just completed for not the first time.
User.prototype.get_penultimate_accuracy = get_accuracy_back(2);

User.prototype.get_previous_max_accuracy = function (module_id, n) {
    if (!n) {n = 1};
    var accuracy_list = this.get_accuracy_list(module_id)
    var result = Math.max.apply(null, accuracy_list.slice(0, -n))
    if (!isFinite(result)) {return 0} else {return result}
}

User.prototype.get_iteration = function (module_id) {
    if (this.data.history[module_id]) {
        return this.data.history[module_id].iteration;
    } else {
        return 0;
    }
}


//todo should we make a get progress function
//argument = integer
//return = [numerator, denominator]
User.prototype.get_progress = function (module_id) {
    // console.log("entering get_progress");
    // console.log("DEBUG 11-22 this.data.history[module_id]", this.data.history[module_id]);
    // var progress = this.data.history[module_id].progress;
    // console.log("DEBUG 11-22 progress = ", progress);
    
    //todo below is hacky, fix it
    var numerator;
    if (!this.data.history[module_id]) {
        numerator = 0;
    } else {
        numerator = this.data.history[module_id].progress;
    }
    
    // console.log("DEBUG 11-20 numerator = ", numerator);
    
    var denominator = ALL_MODULES[module_id].threshold;
    // console.log("DEBUG 11-20 denominator = ", denominator);
    
    return [numerator, denominator];
}


User.set_cookie = function(uid){
    set_cookie("quiz_uid", uid, "/");
};

User.remove_cookie = function(){
    delete_cookie("quiz_uid", "/", null);
};