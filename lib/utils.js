
function sort_numbers(list){
    return list.sort(function(a, b){return a-b;});
}

function peek(list){
    return list[list.length - 1];
}

function random_choice(list) {
    return list[Math.floor(list.length * Math.random())];
}

function range(start, end){

	var ns = [];

	for(var i = start; i <= end; i++){
		ns.push(i);
	}

	return ns;

}

// todo akiva look at this
// takes a list (elements in the keys of the dictionary) and a dictionary
// returns a dictionary with just those keys and their values
var convert_keys_to_dict = function (x, y) {
    var r = {};
    x.forEach(function (z) {r[z] = y[z]});
    return r
};

// todo akiva look at this
// takes a list of pairs
// returns a dictionary with keys first items of pairs and values second items
var dict_from_list_of_pairs = function (x) {
    var r = {};
    x.forEach(function (z) {r[z[0]] = z[1]});
    return r
};

function is_subset(superset, subset) {
   for (var i in subset) {
       if (!superset.has(subset[i])) {
           return false;
       }
   }
   return true;
}

function is_sub_list(super_list, sub_list) {
    for (var i in sub_list) {
        if (super_list.indexOf(sub_list[i]) === -1) {
            return false;
        }
    }
    return true;
}

function array_from (s) {
	var r = [];
	for (var i of s) {r.push(i)}
	return r;
}

function remove (list, n) {
    console.log('list =', list);
    return list.slice(0, n).concat(list.slice(n + 1));
}

function math_max (l) {
    if (l.length === 0) {return -Infinity}
    return l.reduce(function (x, y) {return Math.max(x, y)})
}
function math_min (l) {
    if (l.length === 0) {return Infinity}
    return l.reduce(function (x, y) {return Math.min(x, y)})
}

function contains(list, object){
	return list.indexOf(object) > -1;
}

function set_dropdown(id, list, to_string){
    console.log("DEBUG 11-18 entering set_dropdown");
    console.log("DEBUG 11-18 id = ", id);
    console.log("DEBUG 11-18 list = ", list);
    var e = el(id);
    e.innerHTML = "";

    //console.log"9-24 reached set_dropdown, list = ", list);
    for(var i = 0; i < list.length; i++){
        var x = list[i];
        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
    }
    
    //todo new code below 11-29 
    //added so we would have something to check that it doesn't just have one answer
    // return e;
}

// todo Akiva look this over
// todo superceded by make
function create_element(type, text, location, label) {
    var e = document.createElement(type);
    e[label ? label: 'innerHTML'] = text;
    if (location) {location.appendChild(e)}
    return e
}


function set_multiple_drop_downs(drop_down, e, none_display, to_string) {
    //adds none to the list without mutating it
    var list = 'choices' in drop_down ? drop_down.choices : drop_down.parts;
    if (none_display) {list = list.concat('none')}
    var e1 = document.createElement('select');
    var h = create_element('optgroup', drop_down.heading, e1, 'label');
    list.forEach(function (x) {
        if (typeof x === 'object') {
            // if (!x) {return} // Just to be safe if we change our approach again.
            // old code below didn't seem to work (or just got wiped by sort)
            // if (!x) {if (none_display) {x = 'none'} else {return}}
            var o = create_element("optgroup", strip(
                to_string ? to_string(x.subheading) : x.subheading), e1, 'label');
            x.choices.forEach(function (y) {
                create_element("option", strip(to_string ? to_string(y) : y), o);
            });
        } else {
            create_element("option", strip(to_string ? to_string(x) : x), e1);
        }
    });
    // drop_down (x) now has an html element
    drop_down.HTML_element = e1;
    e.appendChild(e1);
}




function selected_option(drop_down) {
    return drop_down.options[drop_down.selectedIndex].value;
}






function get_cookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        // //console.log"cookie in get cookie = ", c);
        // if (c.indexOf("quiz_uid") != -1) {
        //     //console.log"found cookie = ", c);
        // }
        while (c.charAt(0)==' '){
            c = c.substring(1);  
        } 
        if (c.indexOf(name) == 0){
            return c.substring(name.length, c.length);  
        } 
    }
    return null;
}


// function delete_cookie( name ) {
//   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }

function delete_cookie( name, path, domain ) {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function set_cookie(name, value, path){
    document.cookie = name + "=" + value + "; path=" + path;
}


function hide_elements (id_list) {
    id_list.forEach(function(id) {
        el(id).style.display="none";
    })
}


//attrs optional
function make_old(type, attrs){

	var e = document.createElement(type);

	if(attrs){
		for(var a in attrs){
			//console.loga, attrs[a]);
			if(a === "class"){ e.className = attrs[a].join(" "); }
			else if(a === "html"){ e.innerHTML = attrs[a]; }
			else { e.setAttribute(a, attrs[a]); }
		}
	}
	return e;

}






//
//attrs is an attribute map with 4 special keys (but it could have many other keys)
    //tag (str with tag type, e.g. div)    //this is the only mandatory key
    //2 mutually exclusive options:
        //text - the text of the tag (e.g. the text between tags, the content o) [[[for when you just want text and nothing fancy with non-text children]
        //OR
        //children - list of attribute maps (thus allowing recursive calls)  [[[can contain text with any other types of children]
    
    //class - an alias for className (just a convenience to avoid writing className)
    //parent is optional - but if it's included, then element that's created is appended to it
    
    
    //there's a convenience built in: if you put string into children (along with a list of optional attribute maps for recursion)
    //then it will create a textnode with that string
    //
    
    
    ////multiple classes can be assigned to one element, e.g. a cell in a table could be image & cell
    //and javascript stores classNames not as a list (as is sensible) but as a string with spaces in between
    
    
    
    //every element has a predetermined list of potential attributes (href, src, onhover) and we check for that
    //if that check fails, we throw an error
function make(attrs, parent){
    //console.log"attributes in make", attrs, attrs["tag"]);
   
   //creates an element with the tag name in angle brackets
   var e = document.createElement(attrs["tag"]);


    //we iterate through attrs, looking for things like id, href, class, src, onhover, style
    //style will be a map of things {color: grey, font-size: 10px}
   for(var a in attrs){
      if(a != "tag" && a != "children" && a != "text"){
         var value = attrs[a];
         if(a == "class"){
            e.className = typeof(value) == "string" ? value : value.join(" ");   //must be a string with spaces in between
         } else if(a == "style"){
            for(var k in value){
               e.style[k] = value[k];
            }
         } else if(a in e){                                 //if the attribute is a potential attribute of the element    
            e[a] = value;
         } else {
            alert("unknown property: " + a);
         }
      }
   }

   if("children" in attrs){
      attrs["children"].forEach(function(c){
         if(typeof(c) == "string"){
            e.appendChild(document.createTextNode(c));
         } else {
            make(c, e);
         }
      });
   } else if("text" in attrs){
      e.appendChild(document.createTextNode(attrs["text"]));
   }

   if(parent){
      parent.appendChild(e);
   }

   return e;

}

function el(id){
    return document.getElementById(id);
}

function get_url_parameters() {
    var map = {};
    var query = window.location.search.substring(1);
    var pairs = query.split("&");

    for (var i = 0; i < pairs.length; i++){

        var pair = pairs[i].split("=");
        if(pairs[i].length > 0 && (pair.length == 1 || pair.length == 2)){
            var key = pair[0];
            var value = pair.length == 1 ? null : pair[1];
            map[key] = value;   
        } else {
            console.log("NO URL PARAMETER DETECTED:", pair);
        }

    }

    // console.log("url parameters:", map);
    return map;

}






//todo possibly make a sum function in utils, abstracting from get_accuracy
//research list comprehension in ES6


//below should be our separate abstraction of get_accuracy - not done yet
//takes an object (a module inside of metrics, which is a map of numbers to numbers - i.e. attempts to counts
//returns a number
function get_accuracy3 (iteration) {
    console.log("DEBUG 11-20 get_accuracy3 triggered");
    console.log("DEBUG 11-20 get_accuracy3 iteration = ", iteration);
    var output = Math.floor(100 * iteration[0]
    / Object.keys(iteration).
    map(function (x) {return iteration[x]}).
    reduce(function (a, b) {return a + b}))
    console.log("DEBUG 11-20 get_accuracy3 output = ", output);
    return output;
};


function unique_items(list) {
    var result = [];
    list.forEach(function (x) {if (result.indexOf(x) === -1) {result.push(x)}});
    return result;
}


function maximal(l) {
    ////~`console.log('LOG.maximal all template options = ' + JSON.stringify(l));
    var result = [];
    l.forEach(function (x) {
        var index = -1;
        x.forEach(function (y) {
            // Find y's index.
            var proposed_index = result.indexOf(y);
            // If y does not occur.
            if (proposed_index === -1) {
                // Increase index.
                index++;
                // Insert y at new index.
                result = result.slice(0, index).concat(y, result.slice(index));
            } else {
                // Make index y's index.
                index = proposed_index
            }
        })
    });
    ////~`console.log('LOG.maximal maximal template = ' + JSON.stringify(result));
    return result
}



function remove_children(x) {
    while (x.children.length > 0) {x.removeChild(x.children[0])}
}

function remove_element(x) {
    x.parentNode.removeChild(x)
}

function strip(x) {
    return x.replace(/^ +/g, '').replace(/ +$/g, '')
}

function object_equals(a, b) {
    if (Object.keys(a).length === Object.keys(b).length) {
        for (var i in a) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}






//old and obsolete functions below

function set_multiple_drop_downs_OBSOLETE(drop_down, id, list, heading, to_string){



    var e = el(id);

    //var dd = document.createElement('select');

    [heading].concat(list).forEach(function (x) {

        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
        //console.log"DEBUG 10-8 append child triggered");

    });
    drop_down.drop_down = e;
    el(id).appendChild(e);
}


function set_multiple_drop_downs_old(drop_down, id, list, heading, to_string){

    //console.log"LOG drop down = ", drop_down);
    //console.log"LOG id = ", id);
    //console.log"LOG list = ", list);
    //console.log"LOG heading = ", heading);
    heading = "TEST HEADING";

    var e = document.createElement('select');

    [heading].concat(list).forEach(function (x) {
        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
        //console.log"DEBUG 10-8 append child triggered");
    });
    drop_down.drop_down = e;
    el(id).appendChild(e);
}


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