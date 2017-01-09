window.onload = start;

function start() {
    
}


var random_spelling_bee_numbers = {};


var make_spelling_match = function (n) {
    var level = el("spelling_match_level" + n).value;
    var time_limit = el("spelling_match_time_limit" + n).value;
    
        // todo debugging
    console.log("LEVEL = ", level);
    console.log("time_limit = ", time_limit);
    console.log("typeof LEVEL = ", typeof level);
    console.log("typeof time_limit = ", typeof time_limit);
    console.log("level is valid = ", input_is_valid(level));
    console.log("time_limit is valid = ", input_is_valid(time_limit));
    
    if (!input_is_valid(level) || !input_is_valid(time_limit)) {
        alert("missing level and/or time_limit");
        return;
    }
    var pin = autogenerate_spelling_match_pin();
    
    
    
    var level_as_num = Number(level);
    var time_limit_as_num = Number(time_limit);
    
    var stopping_time = create_stopping_time(time_limit_as_num);
    
    if (!pin) {
        alert("pin " + pin + " is bad (undefined, null, or maybe 0, which are not good pins)");
    } else if (values(random_spelling_bee_numbers).indexOf(pin) !== -1) {
        // pin is already in the random spelling bee numbers
        alert("IDENTICAL PIN. REGENERATE");
    } else {
        // pin is not in the random spelling bee numbers
        // it seemed to make sense to not put this in an else
        // in case it got longer.
        console.log("NON-IDENTICAL PIN")
        random_spelling_bee_numbers[n] = pin;
        send_spelling_match_to_firebase(pin, level_as_num, stopping_time, n);
        start_home_timer(n, stopping_time);
    }
}


var send_spelling_match_to_firebase = function (pin, level, stopping_time, column) {
    console.log("PIN = ", pin);
    console.log("LEVEL = ", level);
    console.log("stopping_time = ", stopping_time);
    
    
    // var data = {
    //     "level": level,
    //     "time_limit": time_limit,
    // }
    
    var data = {
        "level": level,
        "stopping_time": stopping_time
    }
    
    
    
    // path will be ["spelling_matches", pin]
    // e.g. ["spelling_matches", 1456323]
    
    // callback will be something like a combo of
        // display_spelling_match_pin
        // begin countdown
    
    // var path = ["test", "spelling_matches"];
    
    var path = ["test", pin]
    
    
    // final_callback basically just has display_spelling_match_pin(pin, column)

    Persist.set(path, data, final_callback(pin, column));
    
}


// callback of the persist statement called by send_spelling_match_to_firebase
var final_callback = function (pin, column) {
    display_spelling_match_pin(pin, column);
    // display_countdown(time_limit);
}


// called ny the final callback
var display_spelling_match_pin = function (pin, column) {
    
    var element = el('spelling_match_pin_cell' + column);
    element.innerHTML = pin;
    
}







/////////ending the game,displaying resultsandmovinggame in firebase
// sometimes we'll only want to display the top n finishers
// to avoid bruising egos
// var cut_off_all_but_top = false;
// var cut_off_all_but_top = 3;


// this is the 2nd master function
// it does a few important things
    // removes pin
    // gets the data from the game that just finished with three functions in the callback
        // sort_and_display_match_results  on the home page
        // sets the data in "completed_games"
        // deletes the old node 
var move_game_to_completed = function (n) {
    // This happens if the game has already been removed.
    if (!(n in random_spelling_bee_numbers)) {
        alert('Game already removed.');
        return;
    }
    
    var pin = random_spelling_bee_numbers[n];
    
    // Remove all reference of the game's existence.
    delete random_spelling_bee_numbers[n];
    
    var old_path = ["test", pin];
    
    var date_id = Date.now();
    
    // we can't merely push the pin to firebase 
    // or we will end up with non-unique reference ids
    // so we make a unique id
    var unique_id = pin + "@" + date_id;
    
    var new_path = ["test", "completed_games", unique_id];
    
    // callback is optional in set
    Persist.get(old_path, function (x) {
        var data = x.val();
        console.log("VAL from get = ", data);
        console.log("stringified VAL from get = ", JSON.stringify(data));
        
        
        
        var scores_map = data.scores;
        console.log("SCORES_MAP = ", scores_map);
        
        /*
        // Some debugging commented out.
        var sorted_scores = sort_map_by_values(scores_map, true);
        console.log("SORTED SCORES = ", sorted_scores);
        
        // WEEZER123 
        //here we should add the place (1st, 2nd, 3rd) to the data so we can persist
        // to user account (i.e. you have won 1st place 30 times, 2nd place 40 times, etc.)
        
        
        var sorted_data = sort_map_by_values(data, true);
        var sorted_data = sort_map_by_values(scores_map, true);
        console.log("WEEZER123 sorted_data = ", sorted_data);
        */
        
        
        // for (var i = 0; i < sorted_data.length; i++) {
        //     var score_display = process_score_for_display(sorted_data[i]);
        //     var ranking = generate_ranking_from_int(i+1);
        //     var test_output = sorted_data[i] + ":" + ranking;
        //     console.log("WEEZER123 test_output = ", test_output);
        //     return test_output;
        // }
        
        // END WEEZER123
        
        
        
        
        
        
        // Very small bug: we might be doing this for the second time.
        sort_and_display_match_results(scores_map, n);
        
        Persist.set(new_path, data);
        
        
        Persist.remove_node(old_path, function () {
            console.log("NODE REMOVED")
        });
        
        
        // Persist.clear_node(old_path, function () {
        //     console.log("NODE CLEARED")
        // });
        
    }); 
}




var sort_and_display_match_results_old = function (data, n) {
    var element = el("spelling_match_score_results" + n);
    
    // turn it into a sorted list (with higher values first)
    // true here signifies reversal
    var sorted_data = sort_map_by_values(data, true);
    console.log("sorted_data = ", sorted_data);
    console.log("sorted_data stringified = ", JSON.stringify(sorted_data));
    // element.innerHTML = JSON.stringify(sorted_data);
    
    var ranked_with_ties = group_ties_in_ranked_list(sorted_data);
    console.log("RANKED_WITH_TIES = ", ranked_with_ties);
    
    
    var how_many_items_to_take = sorted_data.length;
    
    
    for (var i = 0; i < sorted_data.length; i++) {
        var score_display = process_score_for_display(sorted_data[i]);
        // var ranking = i + 1;
        var ranking = generate_ranking_from_int(i+1);
        console.log("SCORE_DISPLAY = ", score_display);
        console.log("ranking = ", ranking);
        var output = ranking + ": " + score_display;
        console.log("OUTPUT = ", output);
        element.innerHTML += output;
    }
}




// this version didn't quite succeed with ties
var sort_and_display_match_results = function (data, n) {
    var element = el("spelling_match_score_results" + n);
    
    // turn it into a sorted list (with higher values first)
    // true here signifies reversal
    var sorted_data = sort_map_by_values(data, true);
    console.log("sorted_data = ", sorted_data);
    console.log("sorted_data stringified = ", JSON.stringify(sorted_data));
    // element.innerHTML = JSON.stringify(sorted_data);


    
    var list_with_ties = group_ties_in_ranked_list(sorted_data);
    console.log("LIST_WITH_TIES = ", list_with_ties);
    
    
    
    for (var i = 0; i < list_with_ties.length; i++) {
        
        // var ranking = i + 1;
        var ranking = generate_ranking_from_int(i+1);
        var sub_list = list_with_ties[i];
        console.log("sub_list = ", sub_list);
        // another for loop
        for (var j = 0; j < sub_list.length; j++) {
            console.log("sub_list[j] = ", sub_list[j]);
            var score_display = process_score_for_display(sub_list[j]);
            console.log("SCORE_DISPLAY = ", score_display);
            console.log("ranking = ", ranking);
            var output = ranking + ": " + score_display;
            console.log("OUTPUT = ", output);
            element.innerHTML += output;
        }
    }
}



// the newest version attempts to display ties
var sort_and_display_match_results_newest = function (data, n) {
    var element = el("spelling_match_score_results" + n);
    
    // turn it into a sorted list (with higher values first)
    // true here signifies reversal
    var sorted_list = sort_map_by_values(data, true);
    console.log("sorted_data = ", sorted_list);
    console.log("sorted_data stringified = ", JSON.stringify(sorted_list));
    


    // we create a list of lists with each sublist grouping together those who have a tied score
    // three arguments:
    // the list we process
    // the comparison function (compare list or compare tuple or whatever)
    // what index we compare (e.g. we want index 1 in ["John Doe", 4])
    var list_with_ties = tie_detector(sorted_list, compare_nth_item_of_list, 1);
    console.log("LIST_WITH_TIES = ", list_with_ties);
    
    
    
    for (var i = 0; i < list_with_ties.length; i++) {
        
        // var ranking = i + 1;
        var ranking = generate_ranking_from_int(i+1);
        var sub_list = list_with_ties[i];
        console.log("sub_list = ", sub_list);
        // another for loop
        for (var j = 0; j < sub_list.length; j++) {
            console.log("sub_list[j] = ", sub_list[j]);
            var score_display = process_score_for_display(sub_list[j]);
            console.log("SCORE_DISPLAY = ", score_display);
            console.log("ranking = ", ranking);
            var output = ranking + ": " + score_display;
            console.log("OUTPUT = ", output);
            element.innerHTML += output;
        }
    }
}




var remove_uid_suffix = function (string) {
    console.log("input of remove uid = ", string);
    var output = string.split('=')[0];
    console.log("output of remove uid = ", output);
    return output;
}


var process_score_for_display = function (list_item) {
    console.log('process_score_for_display, list_item =', list_item);
    var name = list_item[0];
    name = name.replace('"', '');
    name = remove_uid_suffix(name);
    var score = list_item[1];
    // console.log()
    var output = score + " points - " + name + "<br />";
    console.log("process_score_for_display, output = ", output);
    return output;
}

// var sort_and_display_match_results_old = function (data, n) {
//     var element = el("spelling_match_score_results" + n);
    
    
    
//     // turn it into a sorted list (with higher values first)
//     // true here signifies reversal
//     var sorted_data = sort_map_by_values(data, true);
//     console.log("sorted_data = ", sorted_data);
//     // element.innerHTML = JSON.stringify(sorted_data);
    
//     var how_many_items_to_take = sorted_data.length;
//     // if (cut_off_all_but_top) {
//     //     // Minimum of how many there are and how many we show at most.
//     // } else {
//     //     how_many_items_to_take = sorted_data.length;
//     // }
    
//     for (var i = 0; i < how_many_items_to_take; i++) {
//         var score_display = process_score_for_display(sorted_data[i]);
//         // var ranking = i + 1;
//         var ranking = generate_ranking_from_int(i+1);
//         console.log("SCORE_DISPLAY = ", score_display);
//         console.log("ranking = ", ranking);
//         var output = ranking + " " + "score: " + score_display;
//         element.innerHTML += output;
//     }
// }




// otiose I think
// var show_spelling_match_results = function (n) {
//     console.log("DEBUGGING show_spelling_match_results entered");
//     if (!(n in random_spelling_bee_numbers)) {
//         alert('Game already removed so results cannot be shown.');
//         return;
//     }
//     // we use a global to access the pin since we can't access it via quiz.pin
//     var pin = random_spelling_bee_numbers[n];
//     // Note: This means pin cannot be the number 0. But under my system
//     // pin is always six digits and a string, so this is not a problem
//     // unless we revert.
//     if (!pin) {
//         throw 'Serious coding mistake: pin is not what it should be. It is ' + pin;
//     }
//     console.log("DEBUGGING pin to get from firebase = ", pin);
//     var map_of_scores = Persist.get(["test", pin, "scores"], function (x) {
//         var val = x.val();
//         console.log("DEBUGGING val = ", val);
//         console.log("DEBUGGING val stringified = ", JSON.stringify(val));
//         sort_and_display_match_results(val, n);
//     });
// }









var generate_ordinal_suffix = function (int) {
    if ([11, 12, 13].indexOf(int % 100) !== -1) {
        // 11, 12, 13 all take suffix th; 11th, 12th, 13th, 112th
        return "th";
    } else if (int % 10 === 1) {
        // 1st, 21st
        return "st";
    } else if (int % 10 === 2) {
        // 2nd, 22nd, 42nd
        return "nd";
    } else if (int % 10 === 3) {
        // 3rd, 153rd
        return "rd";
    } else {
        // 4th, 17th, 9th
        return "th";
    }
}

var generate_ranking_from_int = function (int) {
    return int + generate_ordinal_suffix(int);
}




var autogenerate_spelling_match_pin = function () {
    return get_n_random_digits(6);
}

var input_is_valid = function (string) {
    var number = Number(string);
    return Number.isInteger(number) && 1 <= number && number <= 1000;
}

var create_stopping_time = function (offset) {
    var current_time = Date.now();
    console.log("current_time = ", current_time);
    var stopping_time = current_time + offset*1000*60;
    console.log("stopping_time = ", stopping_time)
    return stopping_time;
}












//////////////////////
// BELOW WORKS WITH ONLY ONE COLUMN

// window.onload = start;

// function start() {
    
// }

// var make_spelling_match = function () {
//     var level = el("spelling_match_level").value;
//     var time_limit = el("spelling_match_time_limit").value;
    
//     var pin = autogenerate_spelling_match_pin()
    
//     send_spelling_match_to_firebase(pin, level, time_limit);
// }   


// var send_spelling_match_to_firebase = function (pin, level, time_limit) {
    
    
    
//     // persist - make the object
//     // path will be something like ["spelling_matches"]
//     // callback will be something like fill_spelling_match_with_data
//     // var path = ["spelling_matches"];
//     // var path = ["test", "spelling_matches"];
    
    
    
//     // option 0, just a proof of concept, with no callback
//     // Persist.push(path, pin);
    
//     // option 1
//     // var callback = fill_spelling_match_with_data;
//     // Persist.push(path, pin, callback(pin, level, time_limit));
    
    
//     // // option 2
//     // var callback = fill_spelling_match_with_data(pin, level, time_limit);
//     // Persist.push(path, pin, callback);
    
//     console.log("PIN = ", pin);
//     console.log("LEVEL = ", level);
//     console.log("TIME_LIMIT = ", time_limit);
    
    
//     // var data = {
//     //     "level": level,
//     //     "time_limit": time_limit,
//     // }
    
//     var data = {
//         "level": level,
//         "time_limit": time_limit,
//     }
    
    
    
//     // path will be ["spelling_matches", pin]
//     // e.g. ["spelling_matches", 1456323]
    
//     // callback will be something like a combo of
//         // display_spelling_match_pin
//         // begin countdown
    
//     // var path = ["test", "spelling_matches"];
    
//     var path = ["test", pin]
    
//     // option 0
//     Persist.set(path, data, final_callback(pin));
//     // Persist.set(path, data, final_callback);
    
// }

// // var fill_spelling_match_with_data = function (pin, level, time_limit) {
    
// //     // persist - push map to the pin
// //     var data = {
// //         "level": level,
// //         "time_limit": time_limit,
// //     }
    
// //     // path will be ["spelling_matches", pin]
// //     // e.g. ["spelling_matches", 1456323]
    
// //     // callback will be something like a combo of
// //         // display_spelling_match_pin
// //         // begin countdown
    
// //     var path = ["test", "spelling_matches", pin];
    
    
    
// //     // option 0
// //     Persist.set(path, data);
    
// //     // option 1
// //     // var callback = final_callback;
// //     // Persist.set(path, data, final_callback(pin, level, time_limit));
    
// //     // // option 2
// //     // var callback = final_callback(pin, level, time_limit);
// //     // Persist.set(path, data, final_callback);
// // }


// var final_callback = function (pin) {
//     display_spelling_match_pin(pin);
//     // display_countdown(time_limit);
// }


// var autogenerate_spelling_match_pin = function () {
//     return 66666666;
// }

// var display_spelling_match_pin = function (pin) {
//     //stringify pin if necessary
//     var element = el("spelling_match_pin_cell");
//     element.innerHTML = pin;
// }








/*
- refactor to arbitrary number of games
- build spelling match mode
    - read level from firebase
    - set countdown
- build countdown clock
    - read from firebase in milliseconds stop time
    - set timeout that triggers 
        - alert
        - function

var main = function () {
    read_firebase('endtime', start_timer);
}

var start_timer = function (end_time) {
    // refresh_countdown_to_end_time is a function that, when called,
    // refreshes the countdown to the amount of time remaining
    // until the end time.
    // e.g. 
    // clock displays 1000 milliseconds remaining
    // refresh_countdown_to_end_time happens and 
    // clock display is reset to 950
    var refresh_countdown_to_end_time = refresh_clock(end_time);
    // We refresh the clock every 50 milliseconds.
    // clock_refresh_id is an integer id (not a function),
    // which we can pass to clearInterval to stop the function
    // from continuing to run. We want to do this at the end of the game.
    var clock_refresh_id = setInterval(refresh_countdown_to_end_time, 50);
    setTimeout(end_game(clock_refresh_id), end_time - Date.now());
}

// refresh_clock is a function that takes a number (the time that
// the countdown ends) and returns a function that, when called,
// sets the countdown appropriately.
// So (using clock times instead of numbers of milliseconds
// in these examples), if the time is 9:00, then refresh_clock(9:10)()
// will set the countdown to 10 minutes. After another minute,
// the time is 9:01 and refresh_clock(9:10)()
// will set the countdown to 9 minutes. refresh_clock(9:15)()
// will set the countdown to 14 minutes at this time.

// Note that the clock display is in a traditional time format,
// not as a number of milliseconds. Why don't we refresh only every second?
// Since sometimes functions might run and so the gap between refreshes
// might be more than a second, causing the clock to skip a second.
// Since we refresh every 50 milliseconds, the clock will instead
// sometimes stay on a second for only 950 milliseconds,
// which is hard to detect.
var refresh_clock = function (end_time) {
    return function () {
        var seconds_left = (end_time - Date.now()) / 1000);
        // Resets the timer.
        set_timer(seconds_left);
    }
}

var end_game = function (clock_refresh_id_to_cancel) {
    // This line cancels the function that runs regularly
    // with id clock_refresh_id_to_cancel.
    // That function is the clock refreshing.
    // We do this since we don't want the clock to continue
    // to refresh after the end of the game.
    clearInterval(clock_refresh_id_to_cancel);
    // Clear the div with the clock.
    clear_clock_div();
    // Do other end-game cleanup (e.g., remove current question,
    // stop new questions from coming up).
    stop_game();
    // Tell the user that the game is over.
    alert('game over!!!');
    // Tell the user what their score was.
    display_match_score();
}

- read firebase
    - setInterval (1) every 50 milliseconds
        - reset the timer to the floor of the difference between current time and end,
            divided by 1000
    - set timeout (2)
       - cancels setinterval (1)
        - alert
        - stops game

*/




// todo on HEAD COMPUTER//////////////
// the persist on the home computer should be done to a folder called games "in_progress"
// add countdown timer to head computer page
// when timer ends, it displays results in head computer
// when timer ends, it copies the firebase match object to another folder called "finished"
    //or maybe just rewrite the id as finished + pin
// generate deterministic questions, not just an etym level
// refactor to give arbitrary number of games

// todo on DRONE COMPUTERS//////////////////
// new mode spelling_match_mode
// read level from firebase
    // ideally: load list of deterministic questions
// read stop time from firebase
// display countdown

// when countdown ends, do something
    // stop quiz
    // give an alert
    // display all right and wrong answers for review
        //e.g. arthropod -- arthopod
// write accuracy dictionary to firebase
    // correct, incorrect, grand total
    // score = # (correct)
    // accuracy = percentage (correct/incorrect + correct)
    // i.e. a fast person might have a higher score but a lower accuracy
// (ideally: write a list of all right and wrong answers to firebase)
    //e.g. arthropod -- arthopod



// todo on SPELLING DATA///////////////////
// set level for words
// remove gynophobia, diarhea etc.
// add synonym functionality
// add bold words or span







// var fill_spelling_match_with_data = function (pin, level, time_limit) {
    
//     // persist - push map to the pin
//     var data = {
//         "level": level,
//         "time_limit": time_limit,
//     }
    
//     // path will be ["spelling_matches", pin]
//     // e.g. ["spelling_matches", 1456323]
    
//     // callback will be something like a combo of
//         // display_spelling_match_pin
//         // begin countdown
    
//     var path = ["test", "spelling_matches", pin];
    
    
    
//     // option 0
//     Persist.set(path, data);
    
//     // option 1
//     // var callback = final_callback;
//     // Persist.set(path, data, final_callback(pin, level, time_limit));
    
//     // // option 2
//     // var callback = final_callback(pin, level, time_limit);
//     // Persist.set(path, data, final_callback);
// }








/*
var akiva_autogenerate_spelling_match_pin = function () {
    var max = 999999;
    var min = 000001;
    
    var output = Math.random() * (max - min) + min;
    return Math.round(output);
}
*/

// BEGIN dan