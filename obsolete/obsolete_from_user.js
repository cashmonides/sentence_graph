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