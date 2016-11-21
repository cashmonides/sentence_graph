window.onload = start;

var user = new User(false); // Not anonomous.


function start() {
    //console.log"start triggered");
    if (!user.load(callback)) {
        alert("Not logged in!");
    } 
}


function callback() {
    //console.log"callback triggered");
    Persist.get(["users"], callback2);
}

function callback2(data) {
    //console.log"callback2 triggered");
    var users = data.val();
    
    // Create a sick and non-sick users dictionary.
    var sick_users = {};
    var non_sick_users = {};
    
    // For each key (a uid) in users...
    for (var uid in users) {
        // Get the user that is the corresponding value.
        var user = users[uid];
        var sick = detect_sick_user(user, uid);
        // If the user is sick...
        if (sick) {
            // Add the user to the sick users.
            sick_users[uid] = {'user': user, 'why_sick': sick};
        } else {
            // Otherwise add the user to the non-sick users dictionary
            // (with the key of uid).
            non_sick_users[uid] = user;
        }
    }
    
     
    var e = el("score_report");
    // make({tag:"tr", children: [{tag: "td"}]}, e);
    
    for (var uid in non_sick_users) {
        var user = non_sick_users[uid];
        // console.log('10/16 user =', user);
        // console.log("DEBUG 3-16 logging begin");
        // console.log("NAME users[key].profile.name", users[key].profile.name);
        // console.log("MAX MODULE max_module(users[key])", max_module(users[key]));
        // console.log("REPORT ACCURACY?? report_accuracy(users[key])", max_module(users[key]));
        // console.log("DEBUG 3-16 logging end");
        
        //DEFENSIVE BLOCK
        
        
        make({
            tag:"ul",
            children: [
                {tag: "li", text: "name = " + user.profile.name},
                {tag: "li", text: "uid = " + uid},
                {tag: "li", text: "grade = " + user.profile.grade},
                {tag: "li", text: "school = " + user.profile.school},
                {tag: "li", text: "max module = " + max_module(user)},
                {tag: "li", text: report_accuracy(user)},
                {tag: "li", text: "aggregate accuracy = " +
                get_aggregate_accuracy(user)}
            ]
        }, e);
    }
    
    for (var uid in sick_users) {
        var user = sick_users[uid].user;
        var why_sick = sick_users[uid].why_sick;
        if (user.profile && user.profile.name) {
            var name = user.profile.name;
        } else {
            var name = 'no name found';
        }
        make({
            tag:"ul",
            children: [
                {tag: "li", text: "sick user"},
                {tag: "li", text: "name = " + name},
                {tag: "li", text: "uid = " + uid},
                {tag: "li", text: "reason = " + why_sick}
            ]
        }, e)
    }
    
    get_module_order().map(function (x) {return ALL_MODULES[x]}).forEach(function (mod) {
        make({
            tag:"ul",
            children: [
                {tag: "li", text: "name = " + mod.icon_name},
                {tag: "li", text: "average initial accuracy = "
                + get_avg_initial_accuracy(mod, non_sick_users)}
            ]
        }, e)
    })
    
}


function detect_sick_user (user, uid) {
    console.log("USER in detect_sick_user");
    if (!user.profile) {
        return 'no profile';
    } else if (!user.profile.name) {
        return 'no name'; // No users are like this.
    } else if (!user.profile.email) {
        return 'no email';
    } else if (ends_with(user.profile.email, 'test.mf')) {
        return 'is mf user';
    } else if (!user.history) {
        return 'no history';
    } else if ('sentence_logs' in user.history) {
        return 'sentence_logs in history';
    } else {
        return false;
    }
}

//todo rename to report all accuracy
function report_accuracy(user) {
    var stats_map = {};
    for (var key in user.history) {
        if (!(key in ALL_MODULES)) {
            console.log('10/16 bad module key in history', key);
        }
        stats_map[key] = get_current_stats2(user, key); 
        
        // console.log("DEBUG key = ", key);
        // console.log("DEBUG output = ", get_current_stats2(user, key));
        // stats_map[key] = get_current_stats2(user, key);
    }
    
    
    
    
    var map = JSON.stringify(stats_map);
    
    // var breakline = "<br />";
    // var breakline = "\n";
    var breakline = "________";
    // var map_with_breaks = map.split(",").join("<br />");
    // var map_with_breaks = map.replace(/(?:\r\n|\r|\n)/g, '<br />');
    
    var map_with_breaks = map.replace(/(,)+/g, '\'<br />\'');
    var map_with_breaks = map.replace(/(,)+/g, breakline);
    
    
    return map_with_breaks;
}




function max_module(user) {
    var c = [];
    // console.log("LOG in max_module user.history = ", user.history);
    for (var key in user.history) {
        if (user.history[key].iteration > 0) {
            c.push(key);
        } 
    }
    //alternative to spread operator
    c = Math.max.apply(null, c);
    
    //spread operator
    // c = Math.max(...c);
    
    
    // console.log("LOG: max_module = ", JSON.stringify(c));
    return JSON.stringify(c);
}


//todo make this a general function (i.e. abstract it from get_current_stats)
function get_max_accuracy (user, module_id, iteration) {
   var order = get_module_order();
   var UNIVERSAL_MODULE = ALL_MODULES[module_id];
   var mod = user.history[module_id];
   if (!mod) {return ''}
   
   var correct = mod.metrics[iteration][0];
   
   var total = Object.keys(mod.metrics[iteration]).
        map(function (x) {return mod.metrics[iteration][x]}).
        reduce(function (a, b) {return a + b});
        
    return Math.floor (correct/total);
}

function get_current_stats2 (user, module_id) {
    
    
    // console.log("entering get_current_stats2");
    // console.log("DEBUG module_id = ", module_id);
    //module_id  is an integer
    
    //universal module
    var order = get_module_order();
    // console.log("DEBUG order = ", order);
    var UNIVERSAL_MODULE = ALL_MODULES[module_id];
    // console.log("DEBUG UNIVERSAL_MODULE", UNIVERSAL_MODULE);
    
    //personal module
    var mod = user.history[module_id];
    
    if (!mod) {return ''}
    
    

    // console.log("module_id", module_id);
    // console.log("mod.iteration", mod.iteration);
    // console.log("mod.in_progress", mod.in_progress);
    
    
    
    
    var get_accuracy = function (iteration) {
        return Math.floor(100 * mod.metrics[iteration][0]
        / Object.keys(mod.metrics[iteration]).
        map(function (x) {return mod.metrics[iteration][x]}).
        reduce(function (a, b) {return a + b}))
    }
    
    



    var linebreak = document.createElement("br");
    var threshold = UNIVERSAL_MODULE.threshold;
    // console.log("DEBUG threshold = ", threshold);
    var aggregate_accuracy_list = [];
    
    
    if (mod.in_progress == true && mod.iteration == 0) {
        // advance
        return mod.progress + '/' + threshold;// + UNIVERSAL_MODULE.threshold
    } else if (mod.in_progress == true && mod.iteration > 0) {
        // improve
        return mod.id + "= improving";
        // return 'advancing ' + get_accuracy(mod.iteration) + '% previous best ' +
        // Math.max.apply(null, Object.keys(mod.metrics).filter(
        // function (x) {return x != mod.iteration}).map(get_percentage))
    } else if (mod.in_progress == false && mod.iteration > 0) {
        // completed, not in progress
        //return highest accuracy
        var accuracy = Math.max.apply(null,
        Object.keys(mod.metrics).map(get_accuracy));
        
        aggregate_accuracy_list.push(accuracy);
        
        var aggregate_accuracy = aggregate_accuracy_list.reduce(add, 0);

        var output = accuracy + "%";
        return JSON.stringify(output);
    } else if (mod.in_progress == false && mod.iteration == 0) {
        return "";
    } else {
        //
        return "BREITBART";
        //BREITBART FIX
        // throw new Error('No case successfully caught.')
    }
    // else if (mod.in_progress == "false" && mod.iteration == 0) {
    //     return ""
    // }
}

function add(a, b) {return a + b}

function get_all_accuracies(user, mod) {
    
    
    if (mod.metrics == null) {
        console.log("DEBUG 10-16 mod.metrics doesn't exist - return triggered", mod);
        return;
    }
    
    // console.log("DEBUG 3-16 user = ", user);
    // console.log("DEBUG 3-16 mod = ", mod);
    
    
    var output = Object.keys(mod.metrics).map(
        function (iteration) {
            var correct = mod.metrics[iteration][0];
            // console.log("DEBUG 3-16 correct = ", correct);
            var total = Object.keys(mod.metrics[iteration]).
            map(function (x) {return mod.metrics[iteration][x]}).
            reduce(add);
            // console.log("DEBUG 3-16 total = ", total);
            return Number.isFinite(correct / total) ? (correct / total): 0;
    })
    
    // console.log("DEBUG 3-16 output = ", output);
    
    
    return Object.keys(mod.metrics).map(
        function (iteration) {
            var correct = mod.metrics[iteration][0];
            // console.log("DEBUG 3-16 correct = ", correct);
            var total = Object.keys(mod.metrics[iteration]).
            map(function (x) {return mod.metrics[iteration][x]}).
            reduce(add);
            // console.log("DEBUG 3-16 total = ", total);
            return Number.isFinite(correct / total) ? (correct / total): 0;
    });
    
    /*var get_accuracy = function (iteration) {
        return Math.floor(100 * mod.metrics[iteration][0]
        / Object.keys(mod.metrics[iteration]).
        map(function (x) {return mod.metrics[iteration][x]}).
        reduce(function (a, b) {return a + b}))
    }*/
    
    // Otherwise the user has never played.
}

function get_best_accuracy(user, mod) {
    // c = Math.max.apply(null, c);
    
    //alternative to spread operator
    // console.log("DEBUG 3-16 GET ALL ACCURACIES = ", get_all_accuracies(user, mod));
    return Math.max.apply(null, get_all_accuracies(user, mod));
    
    //spread operator
    // return Math.max(...get_all_accuracies(user, mod))
}

function get_first_accuracy(user, mod) {
    // console.log("DEBUG 3-16 GET FIRST ACCURACY = ", get_all_accuracies(user, mod)[0]);
    return get_all_accuracies(user, mod)[0];
}

function get_aggregate_accuracy (user) {
    
    
    var aggregate_accuracy_list = []
    
    for (var key in user.history) {
    
        
        var order = get_module_order();
        var mod = user.history[key];
        // Skip modules without metrics.
        if (!mod || !mod.metrics) {continue}
        var accuracy = get_best_accuracy(user, mod);
        if (accuracy !== -Infinity) {aggregate_accuracy_list.push(accuracy)};
    }
    
    var aggregate_accuracy = aggregate_accuracy_list.reduce(add, 0);
    
    if (aggregate_accuracy_list.length === 0) {return 'has never played'}
    
    return Math.floor(aggregate_accuracy * 100 / aggregate_accuracy_list.length);
}

var get_avg_initial_accuracy = function (mod, users) {
    var accuracy_list = [];
    
    for (var key in users) {
        // Require the module to exist and have metrics.
        if (users[key].history && mod.id in users[key].history
        && users[key].history[mod.id].metrics) {
            var accuracy = get_first_accuracy(
                users[key], users[key].history[mod.id])
            if (accuracy !== undefined) {accuracy_list.push(accuracy)};
        }
    }
    
    var average_accuracy = accuracy_list.reduce(add, 0);
    
    if (accuracy_list.length === 0) {return 'has never been played'}
    
    return Math.floor(average_accuracy * 100 / accuracy_list.length);
}