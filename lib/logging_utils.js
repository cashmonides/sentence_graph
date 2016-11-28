// an attempt to distinguish between the different kinds of logging
//      console.log = used for on-the-spot short term debugging,
//                 should be cleared at the end of each development cycle
// backlog = used to track the main steps in the sequence,
//             displays crucial backstage information
//             including stuff that we don't want the students to see such as correct answer
// buglog = displays problems, even during release, so that we can catch them
//             hides crucial info such as correct answer


// the basic problem:
// these logs when transferred to a logging_util lose their original line reference
// so we lose the information that it's at e.g. quiz.js line 581
// instead we only see that it's at logging_utils line 23 (which isn't that useful)
// so unless we can solve this problem, these logs are of limited utility
// i.e. they can be used but only if they contain enough information to backtrack to them
// e.g. "BACKLOG: quiz.next_question this.correct = ", xyz
// so these might work for the basic milestones of our operations
// maybe a dozen well marked places per mode

////BACKLOG
//we want some kind of backstage log that will show our basic progress through each step
// but will disappear when we toggle the development status from: development to release
// this will be used for things like correct_answer, question_type and such
// i.e. things that we don't want displayed in release or testing
//args:
// a = message (must be a string)
// b = variable to display after string (optional)
var backlog = function (a, b) {
    if (typeof a !== 'string') {
        console.log("PROBLEM: failure in backlog, arg1 is not a string");
        console.log("PROBLEM: failure in backlog, intended arg1 = ", a);
        return;
    }
    var output_string = "BACKLOG1: " + a; 
    if (development_status === 'development') {
        if (b) {
            console.log(output_string, b);
            return;
        } else {
            console.log(output_string);
            return;
        };
    } else if (development_status === 'testing') {
        if (b) {
            console.log(output_string, b);
            return;
        } else {
            console.log(output_string);
            return;
        };
    } else if (development_status === 'release') {
        return;
    } else {
        console.log("PROBLEM in backlog, no development_status detected");
        console.log("PROBLEM in backlog, intended message = ", a);
        return;
    }
};


//BUGLOG
// we also want a log that displays crucial info even in release
// these would be for urgent issues that would reveal weaknesses and problems
// but wouldn't give away anything to users
// e.g. "more than 20 attempts at next_question attempted, switching mode"
// or "root not found in root list"

var buglog = function (a, b) {
    if (typeof a !== 'string') {
        console.log("PROBLEM: failure in buglog, arg1 is not a string");
        console.log("PROBLEM: failure in buglog, intended arg1 = ", a);
        return;
    }
    var output_string = "BUGLOG: " + a; 
    if (development_status === 'development') {
        // todo should this be alert or console.log
        if (b) {
            var b_string = b.toString();
            var output_string2 = output_string + b_string
            alert(output_string2);
            // return;
            // console.log(output_string, b);
            // return;
        } else {
            alert(output_string);
            // return;
            // console.log(output_string);
            // return;
        };
    } else if (development_status === 'testing') {
        // todo should this be alert or console.log
        if (b) {
            var b_string = b.toString();
            var output_string2 = output_string + b_string
            alert(output_string2);
            return;
            // console.log(output_string, b);
            // return;
        } else {
            alert(output_string);
            return;
            // console.log(output_string);
            // return;
        };
    } else if (development_status === 'release') {
        if (b) {
            console.log(output_string, b);
        } else {
            console.log(output_string);
        };
        return;
    } else {
        console.log("PROBLEM in buglog, no development_status detected");
        console.log("PROBLEM in buglog, intended message = ", a);
        return;
    }
};




//DEBUGLOG
// current bugs in process of debugging
// 
var debuglog = function (a, b) {
    if (typeof a !== 'string') {
        console.log("PROBLEM: failure in debuglog, arg1 is not a string");
        console.log("PROBLEM: failure in debuglog, intended arg1 = ", a);
        return;
    }
    var output_string = "DEBUGLOG: " + a; 
    if (development_status === 'development') {
        if (b) {
            console.log(output_string, b);
            return;
        } else {
            console.log(output_string);
            return;
        };
    } else if (development_status === 'testing') {
        if (b) {
            console.log(output_string, b);
            return;
        } else {
            console.log(output_string);
            return;
        };
    } else if (development_status === 'release') {
        return;
    } else {
        console.log("PROBLEM in debuglog, no development_status detected");
        console.log("PROBLEM in debuglog, intended message = ", a);
        return;
    }
};








