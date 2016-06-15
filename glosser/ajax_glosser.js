// absolute path name
// var AJAX_API = "bestiary.info/html/lib/sql.py";

//relative path name
var AJAX_API = "../glosser/word_db.py";

// does this type of variable hoisting of definitions work???

// a year later:
// yes. this is function hoisting. it hoists the definitions too.
// but it requires the keyword function. it will not work with
// var failure_callback = function ... so do not change!!!
var AJAX_FAILURE = failure_callback;
var AJAX_SUCCESS = success_callback;



function failure_callback(req){
	alert('ajax error: ' + req.status);
}

function success_callback(json){
	console.log("success:", json);
}

//meat of the operation
//json = a json object that we want to write to the db
//callback = the operation we run on completing the post?? 
//url = python file url (relative file path - gonna end up being hosted on media temple)
// async = boolean - (we're usually gonna want asynchronous, so we leave it blank)

// async might be a keyword in es7 so we use async_bool instead.
function post (json, callback, url, async_bool) {

	console.log("DEBUG 3-26 ajax post initiated");
    //AJAX request
    //XMLHttpRequest is a predefined object
    var req = new XMLHttpRequest();

    //called when it updates (asynchronous) - needs to be equal to a function
    req.onreadystatechange = wrap_callback(req, callback ? callback : AJAX_SUCCESS, AJAX_FAILURE);

    //first argument is whether it's get or post (we're always gonna use post)
    //second argument is what url we make the request to (i.e. the path to a python file hosted on mediatemple)
    
    //??? if here is where we get the python script sql.py and then we do something with it
    //is it then run? if so, is it interpreted as python? is the # not identified because it's not being recognized as a python file?
    req.open("POST", url == null ? AJAX_API : url, async_bool == null ? true : async_bool);

	//what we expect back (usually gonna be JSON because usually it's complicated data)
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	
	var j = JSON.stringify(json);
	console.log('DEBUG 1-22 json stringified =', j);
	
	console.log("DEBUG 1-22 json not-stringified =", json);
	
	
	
	console.log("DEBUG 3-26 ajax req.send about to be performed");
	//makes the request to the server (third line from quiz.js to server)
	//todo uncomment below after testing
	req.send(j);

}

//handles state changes
//req = request object
function wrap_callback(req, success, failure){

	return function(){
	    //if we get a response back
		if(req.readyState == XMLHttpRequest.DONE){
		    //200 is the typical code for success
			if(req.status == 200){
			    //responseText is whatever is after the blank line (which is after content setting)
			    console.log('1 -22 req.responseText = ',
			    req.responseText)
				var json = JSON.parse(req.responseText);
				success(json);
			} else {
				failure(req);
			}
		}
		//should there be an else here which is also failure?
		//no for 2 reason because there's a lot of weird state change codes that we don't bother handling
		// and also XMLHttpRequest.DONE  also happens when there's failure
	};

}