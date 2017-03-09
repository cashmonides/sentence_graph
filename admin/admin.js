window.onload = start;

var user = new User(false); // Not anonymous.

// var email_termination_to_include = "tag.play";
// var email_termination_to_include = "test.team";
// var email_termination_to_include = "lls.team";
// var email_termination_to_include = "lls.solo";
// var email_termination_to_include = "lls.play";
// var email_termination_to_include = "default";


var min_spelling_level_to_include = 10;


var email_termination_list_to_include = ['lls.solo', 'lls.play'];

function custom_validate_email (email, valid_email_list) {
    for (var i; i < valid_email_list.length; i++) {
        return ends_with(email, valid_email_list[i]);
    }
};


function start() {
    //console.log"start triggered");
    if (!user.load(callback)) {
        alert("Not logged in!");
    } 
}


function produce_spelling_bee_results (email_filter) {
    if (email_filter) {
      email_termination_to_include = email_filter;  
    };
    Persist.get(["users"], callback3);
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
    var old_users = {};
    var old_users2 = {};
    var non_sick_users = {};
    
    
    
    var spelling_rankings_list = [];
    var sorted_spelling_rankings_list = [];
    
    // For each key (a uid) in users...
    for (var uid in users) {
        // Get the user that is the corresponding value.
        var user = users[uid];
        var sick = detect_sick_user(user, uid);
        var old = detect_old_user(user, uid, email_termination_to_include);
        // If the user is sick...
        if (sick) {
            // Add the user to the sick users.
            sick_users[uid] = {'user': user, 'why_sick': sick};
        } else if (old) {
            // add the user to the old users
            old_users[uid] = {'user': user, 'why_old': old};
        } else {
            // Otherwise add the user to the non-sick users dictionary
            // (with the key of uid).
            non_sick_users[uid] = user;
        }
    }
    
     
    var e = el("score_report");
    // make({tag:"tr", children: [{tag: "td"}]}, e);
    
    for (var uid in non_sick_users) {
        
        
        
        //end short term spelling level display
        
        var user = non_sick_users[uid];
        // console.log('10/16 user =', user);
        // console.log("DEBUG 3-16 logging begin");
        // console.log("NAME users[key].profile.name", users[key].profile.name);
        // console.log("MAX MODULE max_module(users[key])", max_module(users[key]));
        // console.log("REPORT ACCURACY?? report_accuracy(users[key])", max_module(users[key]));
        // console.log("DEBUG 3-16 logging end");
        
        
        // filtering out to include only high spelling scores
        
        if (!user.spelling_level) {
            continue;
        }
        
        if (user.spelling_level < min_spelling_level_to_include) {
            continue;
        }
        
        
        // todo
        // short term spelling level display
        var user_name = user.profile.name;
        var avatar = user.profile.avatar;
        var spelling_score = user.spelling_level;
        var tuple = [];
        tuple.push(spelling_score);
        tuple.push(user_name);
        tuple.push(avatar);
        tuple.push("grade: " + user.profile.grade);
        tuple.push('$');
        
        spelling_rankings_list.push(tuple);
        console.log("SPELLING_RANKINGS_LIST = ", spelling_rankings_list);
        console.log("SPELLING_RANKINGS_LIST stringified = ", JSON.stringify(spelling_rankings_list));
        
        
        // sorted_spelling_rankings_list = spelling_rankings_list.sort(compare_by_first_element());
        var sorted_spelling_rankings_list = spelling_rankings_list.sort(function(a,b){return b[0] - a[0]});
        
        
        
        var final_output = sort_and_display_match_results_presorted(sorted_spelling_rankings_list, 0);
        console.log("FINAL OUTPUT = ", final_output);
        
        
          
        
        // to sort in sublime text: replace $ with \n
        // then enable regex and replace \\n with \n
        
        //DEFENSIVE BLOCK
        
        
        make({
            tag:"ul",
            children: [
                {tag: "li", text: "name = " + user.profile.name},
                // {tag: "li", text: "user name = " + user.profile.email},
                // {tag: "li", text: "uid = " + uid},
                // {tag: "li", text: "grade = " + user.profile.grade},
                // {tag: "li", text: "school = " + user.profile.school},
                // {tag: "li", text: "max module = " + max_module(user)},
                {tag: "li", text: "spelling level = " + get_spelling_level(user)},
                // {tag: "li", text: report_accuracy(user)},
                // {tag: "li", text: "aggregate accuracy = " + get_aggregate_accuracy(user)},
                {tag: "li", text: "unsorted = " + spelling_rankings_list},
                {tag: "li", text: "sorted = " + sorted_spelling_rankings_list}
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



function callback3(data) {
    console.log("callback3 triggered");
    var users = data.val();
    
    // Create a sick and non-sick users dictionary.
    var sick_users = {};
    var old_users = {};
    var old_users2 = {};
    var non_sick_users = {};
    
    
    
    var spelling_rankings_list = [];
    var sorted_spelling_rankings_list = [];
    
    // For each key (a uid) in users...
    for (var uid in users) {
        // Get the user that is the corresponding value.
        var user = users[uid];
        var sick = detect_sick_user(user, uid);
        var old = detect_old_user(user, uid, email_termination_to_include);
        // If the user is sick...
        if (sick) {
            // Add the user to the sick users.
            sick_users[uid] = {'user': user, 'why_sick': sick};
        } else if (old) {
            // add the user to the old users
            old_users[uid] = {'user': user, 'why_old': old};
        } else {
            // Otherwise add the user to the non-sick users dictionary
            // (with the key of uid).
            non_sick_users[uid] = user;
        }
    }
    
    // this will be a div where we keep all the scored 
    var e = el("spelling_bee_leaderboard");
    // make({tag:"tr", children: [{tag: "td"}]}, e);
    
    for (var uid in non_sick_users) {
        
        
        
        
        
        var user = non_sick_users[uid];
        
        
        
        
        
        if (!user.spelling_level) {
            continue;
        }
        // filtering out to include only high spelling scores
        if (user.spelling_level < min_spelling_level_to_include) {
            continue;
        }
        
        
        // todo
        // short term spelling level display
        var user_name = user.profile.name;
        var avatar = user.profile.avatar;
        var spelling_score = user.spelling_level;
        var tuple = [];
        tuple.push(spelling_score);
        tuple.push(user_name);
        tuple.push(avatar);
        tuple.push("grade: " + user.profile.grade);
        tuple.push('$');
        
        spelling_rankings_list.push(tuple);
        // console.log("SPELLING_RANKINGS_LIST = ", spelling_rankings_list);
        // console.log("SPELLING_RANKINGS_LIST stringified = ", JSON.stringify(spelling_rankings_list));
        
        
        // sorted_spelling_rankings_list = spelling_rankings_list.sort(compare_by_first_element());
        var sorted_spelling_rankings_list = spelling_rankings_list.sort(function(a,b){return b[0] - a[0]});
        
        
        
        var final_output = sort_and_display_match_results_presorted(sorted_spelling_rankings_list, 0);
        console.log("FINAL OUTPUT = ", final_output);
    
        // to sort in sublime text: replace $ with \n
        // then enable regex and replace \\n with \n
    }
    e.innerHTML = final_output;
}

// function detect_old_user (user, uid) {
//     if (!ends_with(user.profile.email, "test.team")) {
//         return 'old user';
//     }
// }


// function detect_old_user2 (user, uid) {
//     if (!ends_with(user.profile.email, "lls.team")) {
//         return 'old user';
//     }
// }



function detect_old_user (user, uid, email_termination) {
    
    // todo below is short term debugging
    if (!user) {
        console.log("NO USER DETECTED, returning");
        return 'old user';
    }
    
    if (!user.profile) {
        console.log("NO PROFILE DETECTED, returning");
        return 'old user';
    }
    
    if (!user.profile.email) {
        console.log("NO EMAIL DETECTED, returning uid = ", uid);
        return 'old user';
    };
    // todo
    //end short term debugging
    if (ends_with(user.profile.email, email_termination)) {
        return false;
    } else {
        return 'old user';
    }
}



// function detect_old_user (user, uid) {
//     if ((!ends_with(user.profile.email, "test.team")) || (!ends_with(user.profile.email, "lls.team"))) {
//         return 'old user';
//     }
// }


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
    } else if (!user.history && !user.spelling_level) {
        return 'no history or spelling_level';
    }
    // todo short term fix: we want to catch those who have spelling level but no history
    // else if ('sentence_logs' in user.history && !user.spelling_level) {
    //     return 'sentence_logs in history';
    // } 
    else {
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



function get_spelling_level(user) {
    return user.spelling_level;
};



//// a short term sorting util for spelling levels

function compare_by_first_element(a, b) {
    
    
    // console.log("a in sort = ", a);
    // console.log("b in sort = ", b);
    
    // console.log('b[0] = ', b[0]);
    // console.log('a[0] = ', a[0]);
    
    // console.log('b[1] = ', b[1]);
    // console.log('a[1] = ', a[1]);
    
    
    
    
    if (!a || !b) {
        return 0;
    }
    
    console.log("COMPARE CALLED");
    
    
    
    console.log('check b[0] = ', b[0]);
    console.log('a[0] = ', a[0]);
    
    console.log('b[1] = ', b[1]);
    console.log('a[1] = ', a[1]);
    
    return b[1] - a[1];
    
    // ascending
    // if (a[1] < b[1]) return -1;
    // if (a[1] > b[1]) return 1;
    
    // descending - works but puts 101 first as if its 1 
    // if (a[1] > b[1]) return -1;
    // if (a[1] < b[1]) return 1;
    
    // return 0;
 }




function compare_by_first_element2(a, b) {
    
    
    
    
    console.log("COMPARE CALLED");
    
    
    
    console.log('check b[0] = ', b[0]);
    console.log('a[0] = ', a[0]);
    
    console.log('b[1] = ', b[1]);
    console.log('a[1] = ', a[1]);
    
    return b[1] - a[1];
    
    // ascending
    // if (a[1] < b[1]) return -1;
    // if (a[1] > b[1]) return 1;
    
    // descending - works but puts 101 first as if its 1 
    // if (a[1] > b[1]) return -1;
    // if (a[1] < b[1]) return 1;
    
    // return 0;
 }




/// dragged over from sorting_utils.js

var group_ties_in_ranked_list_item_1 = function (list) {
    
    var master_list = [];
    for (var i = 0; i < list.length; i++) {
        
        var sub_list = [];
        
        // test whether the current item is tied with the previous item
        // if so we push both items to a sublist and push that sublist to the master list
        if (i != 0 && list[i][1] === list[i-1][1]) {
            console.log("TIE FOUND, GROUPING INTO SUBLIST");
            
            sub_list.push(list[i-1]);
            sub_list.push(list[i]);
            master_list.push(sub_list);
            
            // remove the tied item
            var index_of_item_to_remove = master_list.indexOf(list[i-1]);
            if (index_of_item_to_remove > -1) {
                master_list.splice(index_of_item_to_remove, 1);
            }
            
        } else {
            master_list.push([list[i]]);
        }
        
        // remove duplicates from sub_list
        
    }
    
    
    console.log("LIST WITH TIES = ", master_list)
    return master_list;
    
}


/// dragged over from sorting_utils.js

var process_score_for_display = function (list_item) {
    // console.log('process_score_for_display, list_item =', list_item);
    var name = list_item[1];
    name = name.replace('"', '');
    name = name.replace('\'', '');
    
    name = replace_all_substrings(name, '\'', '');
    name = replace_all_substrings(name, '"', '');
    var initials = create_initials(name);
    var avatar = list_item[2].toUpperCase();
    var score = list_item[0];
    // console.log()
    var output = score + " points - " + avatar + " (" + initials + ")" + '\'<br />\'';
    // console.log("process_score_for_display, output = ", output);
    return output;
}



var create_initials = function (name) {
    var list_of_words = name.split(' ');
    // console.log("@ list_of_words = ", list_of_words);
    var first_initial = list_of_words[0].charAt(0);
    first_initial = first_initial.toLowerCase();
    // console.log("@ first_initial = ", first_initial);
    var second_initial = list_of_words[1].charAt(0);
    second_initial = second_initial.toLowerCase();
    // console.log("@ second_initial = ", second_initial);
    return first_initial + '.' + second_initial + '.';
};

/// dragged over from sorting_utils.js

var generate_ranking_from_int = function (int) {
    return int + generate_ordinal_suffix(int);
}


/// dragged over from sorting_utils.js

var sort_and_display_match_results_presorted = function (sorted_list, n) {
    
    // console.log("sorted_data = ", sorted_list);
    // console.log("sorted_data stringified = ", JSON.stringify(sorted_list));
    


    // we create a list of lists with each sublist grouping together those who have a tied score
    // three arguments:
    // the list we process
    // the comparison function (compare list or compare tuple or whatever)
    // what index we compare (e.g. we want index 1 in ["John Doe", 4])
    var list_with_ties = tie_detector(sorted_list, compare_nth_item_of_list, 0);
    // console.log("LIST_WITH_TIES = ", list_with_ties);
    
    var ranked_list_with_ties = [];
    
    for (var i = 0; i < list_with_ties.length; i++) {
        
        // var ranking = i + 1;
        var ranking = generate_ranking_from_int(i+1);
        var sub_list = list_with_ties[i];
        // console.log("sub_list = ", sub_list);
        // another for loop
        for (var j = 0; j < sub_list.length; j++) {
            // console.log("sub_list[j] = ", sub_list[j]);
            var score_display = process_score_for_display(sub_list[j]);
            // console.log("SCORE_DISPLAY = ", score_display);
            // perhaps turning off ranking until fixed
            // console.log("skipping ranking for now");
            // console.log("ranking = ", ranking);
            var output = ranking + ": " + score_display;
            // console.log("FINAL OUTPUT 123 = ", output);
            
            ranked_list_with_ties.push(output);
            
            // element.innerHTML += output;
        }
    }
    
    
    // console.log("FINAL FINAL RANKED LIST = ", ranked_list_with_ties);
    // console.log("FINAL FINAL RANKED LIST STRINGIFIED = ", JSON.stringify(ranked_list_with_ties));
    
    return ranked_list_with_ties;
}




var tie_detector = function (master_list, comparison_function, n) {
    // iterate through master_list
    // at each step we 
        // set current item (i)
        // set previous item (i-1)
        // set populated sublist
        // compare
            // is current tied with previous item (master_list index i-1)?
        // push
            // if no tie detected
                // push populated sublist to master_list
                // push current item to a new empty sublist
            // if tie detected
                // push current item to a populated sublist (if tie detected)
        // clean-up
            // if tie detected on final item, need to push final populated sublist to master_list 
    var previous_item;
    var current_item;
    var sublist = [];
    var ranked_list = [];
    for (var i = 0; i < master_list.length; i++) {
        
        current_item = master_list[i];
        
        // the first item has no previous item to compare to
        // so we push it to a list
        if (i === 0) {
            sublist.push(current_item);
            continue;
        }
        
        previous_item = master_list[i-1];
        
        // tie detection
        if (comparison_function(previous_item, current_item, n)) {
            // a tie has been detected
            // so we push current item to sublist
            sublist.push(current_item);
        } else {
            // no tie has been detected
            // so we push our sublist to master_list
            ranked_list.push(sublist);
            // and we reset the sublist to empty
            sublist = [];
            // and push our current item to that
            sublist.push(current_item);
        }
    }
    
    // clean-up
    // push our last sub_list
    ranked_list.push(sublist);

    return ranked_list;
}

