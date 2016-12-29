


// This file contains general and generalizable clock utils.

var standard_time_format = {
    'hour': {
        'length': 3600,
        'digits': null
    },
    'minute': {
        'length': 60,
        'digits': 2
    },
    'second': {
        'length': 1,
        'digits': 2
    },
    'represent': '$hour:$minute:$second'
};

var time_units_by_length = function (format) {
    // Get all the keys representing time units
    // (all the keys but 'represent')
    var keys = Object.keys(format).filter(function (x) {
        return x !== 'represent';
    });
    return keys.sort(function (a, b) {
        return format[a].length - format[b].length;
    });
}

var pad_num = function (num, how_many_digits) {
    var length = num.toString().length;
    if (length >= how_many_digits) {
        return num.toString();
    } else {
        return new Array(how_many_digits - length + 1).join('0') + num.toString();
    }
}

var get_unit_representation_at_time = function (format, time, unit, next_unit) {
    var how_many_of_unit;
    if (!next_unit) {
        how_many_of_unit = Math.floor(
            time / format[unit].length);
    } else {
        how_many_of_unit = Math.floor(
            (time % format[next_unit].length) / format[unit].length);
    }
    var representation;
    if (format[unit].digits === null) {
        representation = how_many_of_unit;
    } else {
        representation = pad_num(how_many_of_unit, format[unit].digits);
    }
    return representation;
}

var represent_time_in = function (format, time) {
    var lengths = time_units_by_length(format);
    var represent_unit_value = {};
    for (var i = 0; i < lengths.length; i++) {
        var unit = lengths[i];
        var next_unit = lengths[i + 1];
        represent_unit_value[unit] = get_unit_representation_at_time(
            format, time, unit, next_unit);
    }
    return format.represent.replace(/\$[a-z]+/g, function (match) {
        return represent_unit_value[match.slice(1)];
    });
}

var start_timer = function (
    html_element_name, refresh_how_often, end_function, end_time) {
    // Check for a nonexistant element.
    if (el(html_element_name) === null) {
        throw 'Element ' + html_element_name + ' does not exist!';
    }
    // refresh_countdown_to_end_time is a function that, when called,
    // refreshes the countdown to the amount of time remaining
    // until the end time.
    // e.g. (if refresh_how_often is 50),
    // clock displays 1000 milliseconds remaining
    // refresh_countdown_to_end_time happens and 
    // clock display is reset to 950
    var refresh_countdown_to_end_time = refresh_clock(
        html_element_name, end_time);
    // We refresh the clock every 50 milliseconds.
    // clock_refresh_id is an integer id (not a function),
    // which we can pass to clearInterval to stop the function
    // from continuing to run. We want to do this at the end of the game.
    var clock_refresh_id = setInterval(
        refresh_countdown_to_end_time, refresh_how_often);
    setTimeout(function () {
        // Stop the timer.
        // This line cancels the function that runs regularly
        // with id clock_refresh_id.
        // That function is the clock refreshing.
        // We do this since we don't want the clock to continue
        // to refresh after the end of the game.
        clearInterval(clock_refresh_id);
        // Clear the timer (the div with the clock).
        el(html_element_name).innerHTML = '';
        // End the game.
        end_function()
    }, end_time - Date.now());
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
// not as a number of milliseconds.

// Why might we not want to refresh only every second?
// Since sometimes functions might run and so the gap between refreshes
// might be more than a second, causing the clock to skip a second.
// If we refresh every 50 milliseconds (which we often do),
// the clock will instead sometimes stay on a second
// for only 950 milliseconds, which is hard to detect.
var refresh_clock = function (html_element_name, end_time) {
    return function () {
        var seconds_left = (end_time - Date.now()) / 1000;
        // Resets the timer.
        set_timer(html_element_name, seconds_left);
    }
}








// Just set the HTML of the element where the timer is
// to the formatted time left.
var set_timer = function (html_element_name, seconds_left) {
    el(html_element_name).innerHTML = represent_time_in(
        standard_time_format, seconds_left);
}







///////////////testing functions below


// @668
// var start_timer3 = function (
//     html_element_name, refresh_how_often, end_function, end_time, argument_to_pass_into_end_function1, argument_to_pass_into_end_function2) {
//     // Check for a nonexistant element.
//     if (el(html_element_name) === null) {
//         throw 'Element ' + html_element_name + ' does not exist!';
//     }
//     // refresh_countdown_to_end_time is a function that, when called,
//     // refreshes the countdown to the amount of time remaining
//     // until the end time.
//     // e.g. (if refresh_how_often is 50),
//     // clock displays 1000 milliseconds remaining
//     // refresh_countdown_to_end_time happens and 
//     // clock display is reset to 950
//     var refresh_countdown_to_end_time = refresh_clock(
//         html_element_name, end_time);
//     // We refresh the clock every 50 milliseconds.
//     // clock_refresh_id is an integer id (not a function),
//     // which we can pass to clearInterval to stop the function
//     // from continuing to run. We want to do this at the end of the game.
//     var clock_refresh_id = setInterval(
//         refresh_countdown_to_end_time, refresh_how_often);
//     setTimeout(function () {
//         // Stop the timer.
//         // This line cancels the function that runs regularly
//         // with id clock_refresh_id.
//         // That function is the clock refreshing.
//         // We do this since we don't want the clock to continue
//         // to refresh after the end of the game.
//         clearInterval(clock_refresh_id);
//         // Clear the timer (the div with the clock).
//         el(html_element_name).innerHTML = '';
//         // End the game.
//         end_function(argument_to_pass_into_end_function1, argument_to_pass_into_end_function2)
//     }, end_time - Date.now());
// }




// // @667
// var start_timer2 = function (
//     html_element_name, refresh_how_often, end_function, end_time, argument_to_pass_into_end_function) {
//     // Check for a nonexistant element.
//     if (el(html_element_name) === null) {
//         throw 'Element ' + html_element_name + ' does not exist!';
//     }
//     // refresh_countdown_to_end_time is a function that, when called,
//     // refreshes the countdown to the amount of time remaining
//     // until the end time.
//     // e.g. (if refresh_how_often is 50),
//     // clock displays 1000 milliseconds remaining
//     // refresh_countdown_to_end_time happens and 
//     // clock display is reset to 950
//     var refresh_countdown_to_end_time = refresh_clock(
//         html_element_name, end_time);
//     // We refresh the clock every 50 milliseconds.
//     // clock_refresh_id is an integer id (not a function),
//     // which we can pass to clearInterval to stop the function
//     // from continuing to run. We want to do this at the end of the game.
//     var clock_refresh_id = setInterval(
//         refresh_countdown_to_end_time, refresh_how_often);
//     setTimeout(function () {
//         // Stop the timer.
//         // This line cancels the function that runs regularly
//         // with id clock_refresh_id.
//         // That function is the clock refreshing.
//         // We do this since we don't want the clock to continue
//         // to refresh after the end of the game.
//         clearInterval(clock_refresh_id);
//         // Clear the timer (the div with the clock).
//         el(html_element_name).innerHTML = '';
//         // End the game.
//         end_function(argument_to_pass_into_end_function)
//     }, end_time - Date.now());
// }





// @667
// var end_drone_game2 = function (pin, user_name) {
//     // Tell the user that the game is over.
//     // alert('game over!!!');
//     console.log("667 pin passed into end_function");
//     //persist match score (callback should be display match score)
//     // Persist.set("test")
//     // Tell the user what their score was.
//     // display_match_score();
// }