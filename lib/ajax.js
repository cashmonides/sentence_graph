var AJAX_API = "sql.py";

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
function post(json, callback, url, async){

    //AJAX request
    //XMLHttpRequest is a predefined object
    var req = new XMLHttpRequest();

    //called when it updates (asynchronous) - needs to be equal to a function
    req.onreadystatechange = wrap_callback(req, callback ? callback : AJAX_SUCCESS, AJAX_FAILURE);

    //first argument is whether it's get or post (we're always gonna use post)
    //second argument is what url we make the request to (i.e. the path to a python file hosted on mediatemple)
    req.open("POST", url == null ? AJAX_API : url, async == null ? true : async);

	//what we expect back (usually gonna be JSON because usually it's complicated data)
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	//what we're sending
	req.send(JSON.stringify(json));

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
				var json = JSON.parse(req.responseText);
				success(json);
			} else {
				failure(req);
			}
		}
	};

}