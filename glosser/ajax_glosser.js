// This is our relative path name.
var AJAX_API = "word_db.py";

var failure_callback = function (req) {
	alert('ajax error: ' + req.status);
}

var success_callback = function (json) {
	console.log("success:", json);
}

// This has to be below the function definitions
// (since we're not using function hoisting).
var AJAX_FAILURE = failure_callback;
var AJAX_SUCCESS = success_callback;

// meat of the operation
// json = a json object that we want to write to the db
// callback = the operation we run on completing the post
// url = python file url
// * relative file path
// * hosted on server
// async_bool = boolean
// * We're usually gonna want asynchronous, so we leave it blank.

// Becuase async might be a keyword in es7, we use async_bool instead.
function post (json, callback, url, async_bool) {
	console.log("DEBUG 3-26 ajax post initiated");
    // This is our AJAX request.
    // XMLHttpRequest is a predefined object.
    var req = new XMLHttpRequest();

    // Called when it updates (asynchronous).
    // Needs to be equal to a function.
    req.onreadystatechange = wrap_callback(req, callback ? callback : AJAX_SUCCESS, AJAX_FAILURE);

    // First argument is whether it's get or post (we're always gonna use post).
    // Second argument is what url we make the request to (i.e. the path to a python file).
    
    // If here is where we get the python script sql.py
    // and then we do something with it, is it then run?
    // If so, is it interpreted as python?
    // Is the # not identified because it's not being recognized as a python file?
    req.open("POST", url == null ? AJAX_API : url, async_bool == null ? true : async_bool);

	// What we expect back (usually gonna be JSON because usually it's complicated data).
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	var j = JSON.stringify(json);
	console.log('DEBUG 1-22 json stringified =', j);
	
	console.log("DEBUG 1-22 json not-stringified =", json);
	
	console.log("DEBUG 3-26 ajax req.send about to be performed");
	// Make the request to the server.
	req.send(j);
}

// This is the text of the error we throw when we get a python file
// instead of a JSON document.
var PYTHON_ERROR = 'Serious error: received python file, not JSON!';

// Handles state changes.
// req = request object
function wrap_callback(req, success, failure){
	return function(){
	    // If we get a response back...
		if (req.readyState == XMLHttpRequest.DONE) {
		    // 200 is the typical code for success.
			if (req.status == 200) {
			    // response_text is whatever is after the blank line (which is after content setting).
			    var response_text = req.responseText;
			    if (response_text.slice(0, 6) === '#!/usr') {
			    	console.log(response_text);
			    	alert(PYTHON_ERROR);
			    	throw PYTHON_ERROR;
			    }
				var json = JSON.parse(response_text);
				success(json);
			} else {
				failure(req);
			}
		}
		// Should there be an else here which is also failure?
		// No for 2 reasons:
		// * 1 There's a lot of weird state change codes that we don't bother handling.
		// * 2 XMLHttpRequest.DONE also happens when there's failure.
	}
}