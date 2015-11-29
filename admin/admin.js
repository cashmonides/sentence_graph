window.onload = start;

var user = new User();

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
    
    var e = el("score_report");
    // make({tag:"tr", children: [{tag: "td"}]}, e);
    for (var key in users) {
        make({
            tag:"ul",
            children: [
                {tag: "li", text: "name = " + users[key].profile.name},
                {tag: "li", text: "max module = " + max_module(users[key])},
                {tag: "li", text: report_accuracy(users[key])},
                {tag: "li", text: "aggregate accuracy = " +  "PLACEHOLDER"}
            ]
        }, e)
    }
}

function get_aggregate_accuracy(user) {
    
}


//todo rename to report all accuracy
function report_accuracy(user) {
    var stats_map = {};
    for (var key in user.history) {
        // console.log("DEBUG key = ", key);
        // console.log("DEBUG output = ", get_current_stats2(user, key));
        stats_map[key] = get_current_stats2(user,key);
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
    for (var key in user.history) {
        if (user.history[key].iteration > 0) {
            c.push(key);
        }
    }
    //spread operator
    c = Math.max(...c);
    console.log("LOG: max_module = ", JSON.stringify(c));
    return JSON.stringify(c);
}


//todo make this a general function
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
    console.log("entering get_current_stats2");
    console.log("DEBUG module_id = ", module_id);
    //module_id  is an integer
    
    //universal module
    var order = get_module_order();
    console.log("DEBUG order = ", order);
    var UNIVERSAL_MODULE = ALL_MODULES[module_id];
    console.log("DEBUG UNIVERSAL_MODULE", UNIVERSAL_MODULE);
    
    //personal module
    var mod = user.history[module_id];
    
    if (!mod) {return ''}
    
    

    console.log("module_id", module_id);
    console.log("mod.iteration", mod.iteration);
    console.log("mod.in_progress", mod.in_progress);
    
    
    
    
    var get_accuracy = function (iteration) {
        return Math.floor(100 * mod.metrics[iteration][0]
        / Object.keys(mod.metrics[iteration]).
        map(function (x) {return mod.metrics[iteration][x]}).
        reduce(function (a, b) {return a + b}))
    }
    
    



    var linebreak = document.createElement("br");
    var threshold = UNIVERSAL_MODULE.threshold;
    console.log("DEBUG threshold = ", threshold);
    var aggregate_accuracy_list = [];
    
    
    if (mod.in_progress == true && mod.iteration == 0) {
        // advance
        return mod.progress + '/' + threshold;// + UNIVERSAL_MODULE.threshold
    } else if (mod.in_progress == true && mod.iteration > 0) {
        // improve
        return "module: " + mod.id + "status = improving";
        // return 'advancing ' + get_accuracy(mod.iteration) + '% previous best ' +
        // Math.max.apply(null, Object.keys(mod.metrics).filter(
        // function (x) {return x != mod.iteration}).map(get_percentage))
    } else if (mod.in_progress == false && mod.iteration > 0) {
        // completed, not in progress
        //return highest accuracy
        var accuracy = Math.max.apply(null,
        Object.keys(mod.metrics).map(get_accuracy));
        
        aggregate_accuracy_list.push(accuracy);
        
        
         function add(a, b) {
            return a + b;
        }
        
        var aggregate_accuracy = aggregate_accuracy_list.reduce(add, 0);

       
        
        
        
        var output = "accuracy = " + accuracy + "%" + "aggregare_accuracy_list" + aggregate_accuracy_list + "aggregate_accuracy = " + aggregate_accuracy + "%" ;
        return JSON.stringify(output);
    } else if (mod.in_progress == false && mod.iteration == 0) {
        return ""
    } else {
        throw new Error('No case successfully caught.')
    }
    // else if (mod.in_progress == "false" && mod.iteration == 0) {
    //     return ""
    // }
}


function get_aggregate_accuray2 (user) {
    
    for (key in user.history) {
    
        var get_accuracy = function (iteration) {
            return Math.floor(100 * mod.metrics[iteration][0]
            / Object.keys(mod.metrics[iteration]).
            map(function (x) {return mod.metrics[iteration][x]}).
            reduce(function (a, b) {return a + b}))
        }
    
   aggregate_accuracy_list.push(accuracy);
        
    }
    
    function add(a, b) {
        return a + b;
    }
    
    var aggregate_accuracy = aggregate_accuracy_list.reduce(add, 0);
    
    return aggregate_accuracy;

    
    
    
    
    
    
    
    



    var linebreak = document.createElement("br");
    var threshold = UNIVERSAL_MODULE.threshold;
    console.log("DEBUG threshold = ", threshold);
    var aggregate_accuracy_list = [];
    
    
    if (mod.in_progress == true && mod.iteration == 0) {
        // advance
        return mod.progress + '/' + threshold;// + UNIVERSAL_MODULE.threshold
    } else if (mod.in_progress == true && mod.iteration > 0) {
        // improve
        return "module: " + mod.id + "status = improving";
        // return 'advancing ' + get_accuracy(mod.iteration) + '% previous best ' +
        // Math.max.apply(null, Object.keys(mod.metrics).filter(
        // function (x) {return x != mod.iteration}).map(get_percentage))
    } else if (mod.in_progress == false && mod.iteration > 0) {
        // completed, not in progress
        //return highest accuracy
        var accuracy = Math.max.apply(null,
        Object.keys(mod.metrics).map(get_accuracy));
        
        

       
        
        
        
        var output = "accuracy = " + accuracy + "%" + "aggregare_accuracy_list" + aggregate_accuracy_list + "aggregate_accuracy = " + aggregate_accuracy + "%" ;
        return JSON.stringify(output);
    } else if (mod.in_progress == false && mod.iteration == 0) {
        return ""
    } else {
        throw new Error('No case successfully caught.')
    }
    // else if (mod.in_progress == "false" && mod.iteration == 0) {
    //     return ""
    // }
}