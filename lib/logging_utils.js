/////////////////////////////
//////// development_status controls behavior of logs
// var development_status = 'development';
var development_status = 'release';

/////////////////////////
// individual switches can be turned on or off to clean up a messy console when desired
// their default is mostly true
// but debuglog can be set to false according to one's preference, e.g. if they clog the console

// var is_debuglogging_allowed = true; 
var is_debuglogging_allowed = false; 

var is_backlogging_allowed = true; 
// var is_backlogging_allowed = false;

var is_buglogging_allowed = true;
// var is_buglogging_allowed = false;



/////////////// THERE ARE 6 TYPES OF LOG //////////////

///type 1 console.log 
    // used for short term debugging only (i.e. one expects to erase them all before commit)
///type 2 debug.log
    // used for longer term debugging (i.e. persistent problems that endure through commits)
    // e.g. if a bug has not been fully fixed before a commit, all the console.logs should be converted to debug.log
    // can be turned off with a boolean if they get annoying or obscure the console
    // development: visible (but can be switched off with a bool if they become annoying)
    // release: hidden
//type 3 back.log
    // used as a more or less permanent record of the backstage workings
    // essentially a map of the control flow in the console 
    // also useful to narrow down bugs by providing basic checkpoints
    // development: visible
    // release: hidden
//type 4 bug.log
    // used to catch major failures, but it's less aggressive than the error log
    // development: alerts & logs in console
    // release: logs in console
//type 5 error logging (try throw catch etc.)
    // continues operation of game
    // logs errors in firebase
    // does not preserve line number of error
    // development & release: visible

//type 6 frontstage release logging (not yet implemented)
    // there are a few times when Akiva needs to check on certain status while kids play in class
    // i.e. it can't be hidden when development_status = release
    // e.g. user_id, ajax posting, sick modes
    // for now this is not yet implemented, it's just console.log (LOG: ...)
    // there are about a dozen of these

// DEBUGLOGGER

var Debuglogger = function(isDebug, switch_status) {
    var status_forbids_debug = (development_status === 'release') && (switch_status === 'development');
    // var switched_to;
    // case 1
    // if ((development_status === 'release') && (switch_status === 'development')) {
    //     switched_to = 'off';
    // } 
    var debug = {};
    if (isDebug && !status_forbids_debug) {
        for (var m in console) {
            if (typeof console[m] == 'function') {
                debug[m] = console[m].bind(console, "DEBUGLOG: ");
                // if (switched_to === "off") {
                //     // we set back to nothing
                //     this.back[m] = function(){};
                // } else {
                //     this.back[m] = console[m].bind(window.console, klass.toString()+": BACKLOG");
                // }
            }
        }
    } else {
        for (var m in console) {
            if (typeof console[m] == 'function') {
                debug[m] = function(){};
            }
        }
  }
  return debug;
}


//below moved to top
// var is_debuglogging_allowed = true; //global debug state
var debug = Debuglogger(is_debuglogging_allowed, 'development');








// BACKLOGGER
// this handles the backlog
// the backstage logging of control flow and state
// release: not visible to players during release
// testing: alerts on error
// development: alerts on error 

// new version for testing below
var Backlogger = function(isDebug, switch_status) {
    var status_forbids_debug = (development_status === 'release') && (switch_status === 'development');
    // var switched_to;
    // case 1
    // if ((development_status === 'release') && (switch_status === 'development')) {
    //     switched_to = 'off';
    // } 
    var back = {};
    if (isDebug && !status_forbids_debug) {
        for (var m in console) {
            if (typeof console[m] == 'function') {
                back[m] = console[m].bind(console, "BACKLOG");
                // if (switched_to === "off") {
                //     // we set back to nothing
                //     this.back[m] = function(){};
                // } else {
                //     this.back[m] = console[m].bind(window.console, klass.toString()+": BACKLOG");
                // }
            }
        }
    } else {
        for (var m in console) {
            if (typeof console[m] == 'function') {
                back[m] = function(){};
            }
        }
  }
  return back;
}




var back = Backlogger(is_backlogging_allowed, 'development');



// BUGLOGGER
// below works insofar as it tags a console.log with the tag "buglog"
// below doesn't work insofar as it doesn't show an alert
var Buglogger = function(isDebug, switch_status) {
    // case 1
    // if ((development_status === 'development') && (switch_status === 'bug_logging')) {
        // we've hit a big bug
        // so we want trigger some heavy duty alert
        // ideally we add some info to it but for an alert would also be useful
        // and continue and log the error in the console for good measure
        // if we're in release mode we just log in console
        // but below doesn't actually trigger an alert
        // probably because this is a constructor and not called when the bug.log is called
        // alert("BUG CAUGHT BY BUGLOGGER");
        
    // } 
    
    
    var status_allows_debug = (development_status === 'development') && (switch_status === 'bug_logging');
    
    
    var bug = {}
    if (isDebug && status_allows_debug) {
        for (var m in console) {
            if (typeof console[m] == 'function') {
                bug[m] = function () {
                    var arguments_in_string = [].slice.call(arguments).join(" ");
                    alert("BUGLOG: " + arguments_in_string);
                    console.log("BUGLOG: " + arguments_in_string);
                }
            }
        }
    } else {
        for (var m in console) {
            if (typeof console[m] == 'function') {
                bug[m] = console[m].bind(console, "BUGLOG");
            }
        }
  }
  return bug;
}


var bug = Buglogger(is_buglogging_allowed, 'bug_logging');







// var Debugger = function(gState, klass, switch_status) {

//     if ((development_status === 'testing') && (switch_status === 'development')) {
//         return;
//     } 
//     this.debug = {}
//     if (gState && klass.isDebug) {
//         for (var m in console) {
//             if (typeof console[m] == 'function') {
//                 this.debug[m] = console[m].bind(window.console, klass.toString()+": BACKLOG")
//             }
//         }
//     } else {
//         for (var m in console) {
//             if (typeof console[m] == 'function') {
//                 this.debug[m] = function(){};
//             }
//         }
//   }
//   return this.debug;
// }

// var isDebug = true; //global debug state
// debug = Debugger(isDebug, this, 'development');



// // a new attempt from stack overflow
// // it preserves line number but doesn't give us any other functionality
// // e.g. extra info, error checking

// var debug2 = console.log.bind(window.console);
// var debug9 = window.console.log.bind(window.console, '%s: %s');
// var debug9 = console.log.bind(window.console, '%s: %s');
// var debug8 = console.log.bind(window.console, 'NEW TESTING APPROACH');

// // a second attempt from 
// var debug3 = function () {
//   if (! window.console || ! console.log) {
//     return;
//   }
//   return Function.prototype.bind.call(console.log, console);
// } ();


// var debug;

/*


// third attempt from  stack overflow
// works but doesn't allow yet for the switching based on development
var Debugger = function(gState, klass) {

  this.debug = {}

  if (gState && klass.isDebug) {
    for (var m in console)
      if (typeof console[m] == 'function')
        this.debug[m] = console[m].bind(window.console, klass.toString()+": BACKLOG")
  }else{
    for (var m in console)
      if (typeof console[m] == 'function')
        this.debug[m] = function(){}
  }
  return this.debug
}

var isDebug = true //global debug state
debug = Debugger(isDebug, this)


// how it would work
// debug.log('Hello log!')
// debug.trace('Hello trace!')


// 

*/



// fifth attempt from stack overflow
// function setDebug(isDebug) {
//   if (window.isDebug) {
//     window.debug = window.console.log.bind(window.console, '%s: %s');
//   } else {
//     window.debug = function() {};
//   }
// }

// setDebug(true);

// ...

//how it would work
// debug('level', 'This is my message.'); // --> level: This is my message. (line X)





////BELOW ALL WORKS WITHOUT LINE NUMBERS


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

//BACKLOG
// we want some kind of backstage log that will show our basic progress through each step
// but will disappear when we toggle the development status from: development to release
// this will be used for things like correct_answer, question_type and such
// i.e. things that we don't want displayed in release or testing
// args:
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






/// GRAVEYARD

// old version that didn't switch
// var Backlogger_old_works = function(gState, klass, switch_status) {
//     var switched_to;
//     // case 1
//     if ((development_status === 'release') && (switch_status === 'development')) {
//         switched_to = 'off';
//     } 
    
//     this.back = {}
//     if (gState && klass.isDebug) {
//         for (var m in console) {
//             if (typeof console[m] == 'function') {
//                 this.back[m] = console[m].bind(window.console, klass.toString()+": BACKLOG")
//             }
//         }
//     } else {
//         for (var m in console) {
//             if (typeof console[m] == 'function') {
//                 this.back[m] = function(){};
//             }
//         }
//   }
//   return this.back;
// }



