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





window.onload = start;

function start() {
    
}


var random_spelling_bee_number1;
var random_spelling_bee_number2;
var random_spelling_bee_number3;


var make_spelling_match1 = function () {
    var level = el("spelling_match_level1").value;
    var time_limit = el("spelling_match_time_limit1").value;
    
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
    random_spelling_bee_number1 = pin;
    
    
    
    var level_as_num = Number(level);
    var time_limit_as_num = Number(time_limit);
    
    var stopping_time = create_stopping_time(time_limit_as_num);
    
    if (pin != random_spelling_bee_number2 && pin != random_spelling_bee_number3) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level_as_num, stopping_time, 1);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }
    
    
    start_home_timer(1, stopping_time);
    
    
}

var make_spelling_match2 = function () {
    var level = el("spelling_match_level2").value;
    var time_limit = el("spelling_match_time_limit2").value;
    
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
    random_spelling_bee_number2 = pin;
    
    var level_as_num = Number(level);
    var time_limit_as_num = Number(time_limit);
    
    var stopping_time = create_stopping_time(time_limit_as_num);
    
    if (pin != random_spelling_bee_number1 && pin != random_spelling_bee_number3) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level_as_num, stopping_time, 2);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }
    
    start_home_timer(2, stopping_time);
    
}

var make_spelling_match3 = function () {
    var level = el("spelling_match_level3").value;
    var time_limit = el("spelling_match_time_limit3").value;
    
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
    random_spelling_bee_number3 = pin;
    
    var level_as_num = Number(level);
    var time_limit_as_num = Number(time_limit);
    
    var stopping_time = create_stopping_time(time_limit_as_num);
    
    if (pin != random_spelling_bee_number1 && pin != random_spelling_bee_number2) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level_as_num, stopping_time, 3);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }

    
    start_home_timer(3, stopping_time);
    
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
    
    // option 0
    Persist.set(path, data, final_callback(pin, column));
    // Persist.set(path, data, final_callback);
    
}



var show_spelling_match_results1 = function () {
    console.log("DEBUGGING show_spelling_match_results1 entered");
    // we use a global to access the pin since we can't access it via quiz.pin
    var pin = random_spelling_bee_number1;
    console.log("DEBUGGING pin to get from firebase = ", pin);
    var map_of_scores = Persist.get(["test", pin, "scores"], function (x) {
        var val = x.val();
        console.log("DEBUGGING val = ", val);
        console.log("DEBUGGING val stringified = ", JSON.stringify(val));
        sort_and_display_match_results1(val)
    });
}



// sometimes we'll only want to display the top n finishers
// to avoid bruising egos
// var cut_off_all_but_top = false;
var cut_off_all_but_top = 3;

var sort_and_display_match_results1 = function (data) {
    var element = el("spelling_match_score_results1");
    
    // turn it into a sorted list (with higher values first)
    var sorted_data = sort_map_by_values(data);
    console.log("sorted_data = ", sorted_data);
    // element.innerHTML = JSON.stringify(sorted_data);
    
    for (var i = 0; i < sorted_data.length; i++) {
        
        
        if (cut_off_all_but_top) {
            if (i+1>cut_off_all_but_top) {
                break;
            }
        }
        
        var score_display = process_score_for_display(sorted_data[i]);
        // var ranking = i + 1;
        var ranking = generate_ranking_from_int(i+1);
        element.innerHTML += ranking + " " + "score: " + score_display;
    }
    
    
    move_game_to_completed1;
}

var generate_ranking_from_int = function (int) {
    var suffix;
    
    if (int === 1) {
        suffix = "st";
    } else if (int === 2) {
        suffix = "nd";
    } else if (int === 3) {
        suffix = "rd";
    } else {
        suffix = "th";
    }
    
    return int + suffix;
}

var process_score_for_display = function (list_item) {
    var name = list_item[0];
    name = name.replace("\"", "");
    var score = list_item[1];
    return score + " " + name + "<br />";
}

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


var final_callback = function (pin, column) {
    display_spelling_match_pin(pin, column);
    // display_countdown(time_limit);
}



var move_game_to_completed1 = function () {
    var pin = random_spelling_bee_number1;
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
        
        
        
        var scores_map = data.scores
        sort_and_display_match_results1(scores_map);
        
        Persist.set(new_path, data);
        
        
        Persist.remove_node(old_path, function () {
            console.log("NODE REMOVED")
        });
        
        
        // Persist.clear_node(old_path, function () {
        //     console.log("NODE CLEARED")
        // });
        
    }); 
}


var autogenerate_spelling_match_pin = function () {
    var max = 999999;
    var min = 000001;
    
    var output = Math.random() * (max - min) + min;
    return Math.round(output);
}

// BEGIN dan

var dan_autogenerate_spelling_match_pin = function () {
    return dan_get_n_random_digits(6);
}

var dan_get_n_random_digits = function (n) {
    var list_of_digits = [];
    for (var i = 0; i < n; i++) {
        list_of_digits.push(dan_random_digit());
    }
    return list_of_digits;
}

var dan_random_digit = function () {
    return random_choice('0123456789');
}

// END dan

var display_spelling_match_pin = function (pin, column) {
    //stringify pin if necessary
    var element;
    if (column === 1) {
       element = el("spelling_match_pin_cell1"); 
    } else if (column === 2) {
       element = el("spelling_match_pin_cell2"); 
    } else if (column === 3) {
       element = el("spelling_match_pin_cell3"); 
    }
    element.innerHTML = pin;
}

// checks if user-inputted string is valid
    // is an integer between 1 and 1000
var input_is_valid = function (string) {
    var number = Number(string);
    if (!Number.isInteger(number)) {
        return false;
    };
    if (number < 1) {
        return false;
    }
    if (number > 1000) {
        return false;
    }
    return true;
}

// begin dan
var dan_input_is_valid = function (string) {
    var number = Number(string);
    return Number.isInteger(number) && 1 <= number && number <= 1000;
}
// end dan

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