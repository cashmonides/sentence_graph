// Utils that log errors.

//3rd argument is optional. If passed in, must always be a dictionary
function log_error(error, fname, context) {
    
    try {
        console.log("log_error initiated", error);
        var d = new Date().toUTCString();
        var uid = get_cookie("quiz_uid");
        
        if (context === undefined || context === null) {
            context = {};
        } 
        context["function"] = fname;
        var data = {
            date: d,
            user: uid,
            error: error,
            context: context
        }
        
        
        
        Persist.push(["log"], data, function(){});
    } catch (e) { 
        console.log("error caught at log_error", e);
        // maybe don't throw
        // throw "error found in log_error";
    }
}

function log_urgent_error(error, fname, custom_message, context) {
    try {
        console.log("urgent log_error initiated", error);
        var d = new Date().toUTCString();
        var uid = get_cookie("quiz_uid");
        
        if (context === undefined || context === null) {
            context = {};
        } 
        context["function"] = fname;
        var data = {
            date: d,
            user: uid,
            error: error,
            context: context,
            custom_message: custom_message
        }
        Persist.push(["urgent_log"], data, function(){});
    } catch (e) { 
        console.log("error caught at urgent log_error", e);
        // maybe don't throw
        // throw "error found in log_error";
    }
}

//is it possible to make a general error handler for random choice functions
//i.e. given a function f as an argument, if error happens, run f again, of course avoiding infinite loop
//of course avoiding infinite loop (maybe increment a number and if it hits 10, then throw a real error)


/*
try {
    var mode = get_mode();
    next_question();
} catch (e) {
    next_question();
    log_error(e, "escape route triggered", "mode=" + mode);
}
*/