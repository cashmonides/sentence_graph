// todo on HEAD COMPUTER//////////////
// the persist on the home computer should be done to a folder called games "in_progress"
// add countdown timer to head computer page
// when timer ends, it displays results in head computer
// when timer ends, it copies the firebase match object to another folder called "finished"
    //or maybe just rewrite the id as finished + pin
// generate deterministic questions, not just an etym level


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
// implement hint-penalty
// implement stepwise hint
    // bold words
    // etym cheatsheet
    // bold the roots in etym cheatsheet
    // underscore


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
    
    var stopping_time = create_stopping_time(time_limit);
    
    if (pin != random_spelling_bee_number2 && pin != random_spelling_bee_number3) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level, stopping_time, 1);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }
    
    
    
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
    
    var stopping_time = create_stopping_time(time_limit);
    
    if (pin != random_spelling_bee_number1 && pin != random_spelling_bee_number3) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level, stopping_time, 2);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }
    
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
    
    var stopping_time = create_stopping_time(time_limit);
    
    if (pin != random_spelling_bee_number1 && pin != random_spelling_bee_number2) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level, stopping_time, 3);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
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
        "stopping_time": stopping_time,
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


var autogenerate_spelling_match_pin = function () {
    var max = 999999;
    var min = 000001;
    
    var output = Math.random() * (max - min) + min;
    return Math.round(output);
}

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