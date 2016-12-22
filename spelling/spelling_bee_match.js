// todo
// todo on HEAD COMPUTER
// add countdown timer to head computer page
// when timer ends, it displays results in head computer
// generate deterministic questions, not just an etym level


// todo on DRONE COMPUTERS
// display countdown
// when countdown ends, do something
    // stop quiz
    // give an alert
    // display all right and wrong answers
// write accuracy dictionary to firebase
    // correct, incorrect, grand total
    // score = # (correct)
    // accuracy = percentage (correct/incorrect + correct)
    // i.e. a fast person might have a higher score but a lower accuracy
// (ideally: write all right and wrong answers to firebase)
// read level from firebase





window.onload = start;

function start() {
    
}


var random_spelling_bee_number1;
var random_spelling_bee_number2;
var random_spelling_bee_number3;


var make_spelling_match1 = function () {
    var level = el("spelling_match_level1").value;
    var time_limit = el("spelling_match_time_limit1").value;
    if (typeof level != "number" || typeof time_limit != "number") {
        alert("missing level and/or time_limit");
        return;
    }
    var pin = autogenerate_spelling_match_pin();
    random_spelling_bee_number1 = pin;
    if (pin != random_spelling_bee_number2 && pin != random_spelling_bee_number3) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level, time_limit, 1);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }
}

var make_spelling_match2 = function () {
    var level = el("spelling_match_level2").value;
    var time_limit = el("spelling_match_time_limit2").value;
    if (typeof level != "number" || typeof time_limit != "number") {
        alert("missing level and/or time_limit");
        return;
    }
    var pin = autogenerate_spelling_match_pin();
    random_spelling_bee_number2 = pin;
    
    if (pin != random_spelling_bee_number1 && pin != random_spelling_bee_number3) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level, time_limit, 2);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }
    
}

var make_spelling_match3 = function () {
    var level = el("spelling_match_level3").value;
    var time_limit = el("spelling_match_time_limit3").value;
    if (typeof level != "number" || typeof time_limit != "number") {
        alert("missing level and/or time_limit");
        return;
    }
    var pin = autogenerate_spelling_match_pin();
    random_spelling_bee_number3 = pin;
    
    if (pin != random_spelling_bee_number1 && pin != random_spelling_bee_number2) {
        console.log("NON-IDENTICAL PIN")
        send_spelling_match_to_firebase(pin, level, time_limit, 3);
    } else {
        alert("IDENTICAL PIN. REGENERATE");
    }
    
}


var send_spelling_match_to_firebase = function (pin, level, time_limit, column) {
    console.log("PIN = ", pin);
    console.log("LEVEL = ", level);
    console.log("TIME_LIMIT = ", time_limit);
    
    
    // var data = {
    //     "level": level,
    //     "time_limit": time_limit,
    // }
    
    var data = {
        "level": level,
        "time_limit": time_limit,
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