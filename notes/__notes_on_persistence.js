/*
// PERSISTENCE TO SQL


////////// SOME TERMS
/// http = hyper text transfer protocol, a paradigm as opposed to a thing or an action


//////////VERY SIMPLE CONTROL FLOW
the basics are:
    a javascript posting function
    CREATES
    ups - ??presumably: a dictionary passed via the url params
    
    
    POST
    the default API is .../lib/sql.py and that's where it calls the python function
    
    
    PYTHON
    - received ups as its argument
    - python function performs c.execute
    - which translates into a SQL query (e.g. INSERT INTO x VALUES y)


/////// MORE DETAILED CONTROL FLOW
- JAVASCRIPT function #1 (outer wrapper, calls the js post function)
    the basic anatomy looks like this:
    - create a JSON object called data
        - e.g. {'completed': 10, 'skipped': 8}
    - somewhere in there (perhaps inside the JSON object), is a type of operation
        - e.g. type: "update_mf_metrics"
    - create a callback if necessary (log the sentence et sim.)
    - put object and callback into the arguments of the post function:
        - post({data: data, type: "update_mf_metrics"}, ajax_callback);

- JAVASCRIPT function #2 (post)

- PYTHON function (c.execute)
    calls c.execute and passes it a SQL command




////////// THE ENTITIES IN PLAY


POST




PYTHON FUNCTION
the python function (e.g. update accuracy new)



XMLHTTPREQUEST
"XMLHttpRequest"
    "XMLHttpRequest makes sending HTTP requests very easy. You simply create an instance of the object, open a URL, and send the request.  The HTTP status of the result, as well as the result's contents, are available in the request object when the transaction is completed.",
    async argument
        A request made via XMLHttpRequest can fetch the data in one of two ways, 
        asynchronously or synchronously. 
        The type of request is dictated by the optional async argument (the third argument) 
        that is set on the XMLHttpRequest open() method. 
        If this argument is true or not specified, 
        the XMLHttpRequest is processed asynchronously, 
        otherwise the process is handled synchronously.
    The XMLHttpRequest object can be used to request data from a web server.
    The XMLHttpRequest object is a developers dream, because you can:
        Update a web page without reloading the page
        Request data from a server - after the page has loaded
        Receive data from a server  - after the page has loaded
        Send data to a server - in the background
    example of use
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           document.getElementById("demo").innerHTML = xmlhttp.responseText;
        }
        xhttp.open("GET", "filename", true);
        xhttp.send();
    proeprties & methods
        .onreadystatechange
        .open
        .send
        .status (200 = success)
            The status of the response, xhr.status, is (generally) used to determine whether the request was successful or not.  
            500 - 599: the server had an error
            400 - 499: this is a client error (Ex: 404 page not found)
            300 - 399: then exists a redirect
            200 - 299: then it is correct and
            100 - 199: means information message
        .readyState (4 = success)
            xhr.readyState is simply used to determine the state of the request, such as "has not yet been sent" (0), "complete and response received" (4),
        .responseText
    browser compatibilities
        Old versions of Internet Explorer (IE5 and IE6) do not support the XMLHttpRequest object.
        
};
xhttp.open("GET", "filename", true);
xhttp.send();
}
*/

//meat of the operation
//json = a json object that we want to write to the db
//callback = the operation we run on completing the post
//url = python file url (relative file path - gonna end up being hosted on media temple)
// async = boolean - (we're usually gonna want asynchronous, so we leave it blank)

// async might be a keyword in es7 so we use async_bool instead.
function post (json, callback, url, async_bool) {

	console.log("LOG: in ajax.js: ajax post initiated");
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
	console.log('LOG: in ajax.js: json stringified =', j);
	
	console.log("LOG: in ajax.js: json not-stringified =", json);
	
	
	
	console.log("LOG: in ajax.js: ajax req.send about to be performed");
	//makes the request to the server (third line from quiz.js to server)
	//todo uncomment below after testing
	req.send(j);

}



///////// HANDLES STATE CHANGES
// req = request object (created via req = new XMLHttpRequest())
// success = callback we perform upon success
// failure = callback we perform upon failure
function wrap_callback(req, success, failure){
	console.log("LOG: in ajax.js: wrap_callback about to be performed");
	console.log("LOG: in ajax.js: about to log req.responseText");
	console.log('LOG: in ajax.js:req.responseText = ',
			    req.responseText)
	return function(){
	    //if we get a response back
		if(req.readyState == XMLHttpRequest.DONE){
		    //200 is the typical code for success
			if(req.status == 200){
			    //responseText is whatever is after the blank line (which is after content setting)
			    //todo redesign switch back when ready to start implementing stats for redesign
			    /*
			    console.log('1 -22 req.responseText = ',
			    req.responseText)
			    */
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



/////////////PYTHON OPERATIONS

def update_accuracy_new(ups):
    try:
    
        // apparently gets data from ups
        row = ups["data"]
        accuracy_dictionary = ups["accuracy_dictionary"]
        
        
        // create a db variable
        // # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        // # logging.debug("db connected")
        
        // create a variable for the db.cursor
        // cursor is just the entity that traverses the database
        c = db.cursor()
        
        // cursor has a property/method called execute
        // cursor.execute has 3 arguments
        // cursor.execute(operation, params, multi)
        // operation (mandatory) is what function you want the cursor to do
        // params () is the data you want to put in???
        // multi (optional) if multi is true, it returns an iterator
            // i.e. If multi is set to True, 
            // execute() is able to execute multiple statements specified in the operation string.
        
        
        // in our example it looks like this:
        // c.execute(insert_into_accuracy_metrics, empty_list, <<multi-omitted>>)
        
        // # This should work.
        for j in accuracy_dictionary:
            // initialize an empty list
            l = []
            // iterate through the 5 columns we want to enter
            for k in range(0, 4):
                // push each column in our dictionary to the list
                l.append(str(accuracy_dictionary[j][str(k)]))
            // perform our execute statement
            c.execute("INSERT INTO accuracy_metrics VALUES (null, " + str(row) + ", " + ", ".join(l) +
            ", \"" + j + "\")", [])
        
        
        
        // .commit() ends the transaction 
        // and makes all changes visible to other users.
        db.commit()
        
        
        // create a data object that can return information about the operation, for logging, etc.
        data = {
            "success": True
        }
        
        return data
        
        
    except Exception as e:
        logging.debug(str(e))
        
        // in the case of an error we prep the data to log for inspection
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "accuracy_dictionary": accuracy_dictionary
        }
        
        return data