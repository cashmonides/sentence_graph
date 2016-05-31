/*
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
*/



/*
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
*/




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




//quiz has this.submodule.score which will be our submodule_number
// 


// stuff which kept creating bogus search results
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



/*
User.prototype.start_module = function (id) {
    this.important_event_check_string();
    console.log("DEBUG 11-7 entering user.start_module");
    console.log("DEBUG 11-16 argument id = ", id);
    
    
    
    console.log("DEBUG 2-6 entering problem area");
    // todo 2-6 the following is a failed attempt to give anonymous users a rollover, try to make it work - the point is to just roll the anonymous user to the next module
    // if (this.uid === null) {
    //     console.log("DEBUG 2-6 this.uid == null triggered");
    //     if (!(id in this.data.history)) {
    //         console.log("DEBUG 2-6 anonymous mode: creating module with id = ", id);
    //         this.create_module(id);
    //     }
    //     this.data.history[id].in_progress = true;
    //     return;
    // }
    
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
    
    
    
    
    
    //we need to set our level
    // this.quiz.game.set_level(ALL_MODULES[id].level)
    
    //we need to update history with a few crucial facts
        //in_progress is true
        //it exists
    this.persist(["history", id], this.data.history[id]);
};
*/

/*
// This stuff from use ris currently unused and seemed very long.
User.prototype.log_module_start_time = function (module_id) {
    var mod = this.data.history[module_id];
    
    var start_time = current_time();
    
    
    var empty_callback4 = function(error) {
        console.log("empty_callback4 triggered");
        if (error != null) {
            console.log("error in empty_callback4", error);
        }
    };
    
    var map = {'start_time' : start_time};
    
    Persist.push(["users", this.uid, "history", module_id], map, empty_callback4);
    
    
    
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
*/

/*
We basically know about callbacks now.
// General rule: Callback data cannot be returned.
// That makes this function impossible.
User.prototype.get_sentence_logs = function () {
    // temporary
    return {};
}

// obsolete
//makes a local copy of whatever is on firebase and persists it to firebse
// User.set_initial_data = function (uid, name, class_number, callback) {
//     var data = {
//         profile: {
//             name: name, 
//             class_number: class_number
//         },
//         history: false
//     };
//     Persist.set(["users", uid], data, callback);
// };
*/

/*
User.prototype.get_personal_data = function (quiz) {
    var types_of_data = ["school", "grade", "class_number", "name", "email"];
    var found = 0;
    for (var i = 0; i < types_of_data.length; i++) {
        var x = types_of_data[i];
        var path = ["users", this.uid, 'profile', x];
        console.log(i, path);
        Persist.get(path, (function (i) {
            return function (data) {
                var real_data = data.val();
                console.log(i, real_data, quiz.time_data);
                quiz.time_data[i + 1] = real_data;
                found++;
                if (found === types_of_data.length) {
                    quiz.initialize_time_metrics();
                }
            }
        })(i));
    };
}
*/


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

/*
subsumed
if (Object.keys(this.data.history).length === 0 && mod_id == 1) {
    console.log("DEBUG 11-22 frontier triggered because history is empty");
    return "frontier";
}
*/