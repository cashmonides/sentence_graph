function sort_numbers(list){
    return list.sort(function(a, b){return a-b;});
}

function peek(list){
    return list[list.length - 1];
}

function rand_int(x) {
    return Math.floor(Math.random()*x)
}

function random_choice(list) {
    return list[rand_int(list.length)];
}

function shuffle(list) {
    for (var i = (list.length - 1); i > 0; i--) {
        var j = rand_int(i + 1);
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
}

function shuffle_two_lists(list_1, list_2) {
    //~`console.log("TEST of list_1 and list_2 in shuffle two lists ", list_1, list_2);
    if (Math.random() < 1 / 2) {
        return list_1.concat(list_2)
    } else {
        return list_2.concat(list_1)
    }
}

function weighted(dict) {
    var x = 0;
    var i;
    for (i in dict) {
        x += dict[i];
    }
    var random_number = Math.random() * x;
    for (i in dict) {
        random_number -= dict[i];
        if (random_number < 0) {
            return i;
        }
    }
}

// This function is best when most of the possible options
// satisfy the constraint.
var random_satisfying_constraint = function (possible, constraint) {
    var r;
    for (var i = 0; i < possible.length; i++) {
        r = random_choice(possible);
        if (constraint(r)) {
            return r;
        }
    }
    for (var i = 0; i < possible.length; i++) {
        r = possible[i];
        if (constraint(r)) {
            return r;
        }
    }
    return null;
};

function quick_sort(list, f) {
    // Note: this did not sort a list of lists correctly,
    // but now it does.
    if (list.length === 0) {return []}
    // We sort from random index (original data may be somewhat sorted).
    // Perhaps we should switch to merge sort.
    var n = rand_int(list.length);
    var pivot = list[n];
    var rest = remove(list, n);
    var before = rest.filter(function (x) {return f(x, pivot)});
    var after = rest.filter(function (x) {return f(pivot, x)});
    return quick_sort(before, f).concat([pivot], quick_sort(after, f))
}

var push_random_n_satisfying_constraint = function (
already_there, possible, constraint, n) {
    var next;
    for (var i = 0; i < n; i++) {
        next = random_satisfying_constraint(possible, function (x) {
            return constraint(x) && already_there.indexOf(x) === -1;
        });
        if (next === null) {break} else {already_there.push(next)}
    };
    return already_there;
}

var separate_and_sort_by = function (list, f) {
    var separated = [];
    var types = [];
    var item;
    var type_of_i;
    var pos;
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        type_of_i = f(item);
        pos = types.indexOf(type_of_i);
        if (pos === -1) {
            types.push(type_of_i);
            separated.push([item]);
        } else {
            separated[pos].push(item);
        }
    }
    return quick_sort(separated, function (i, j) {return f(i[0]) < f(j[0])});
}

// This is not currently used, but might be useful.
var sort_by_prop = function (s) {
    return function (x, y) {return x.s < y.s};
}

var sort_by_func = function (f) {
    return function (x, y) {return f(x) < f(y)};
}

var get_pure_latin_root = function (x) {
    return remove_long_vowels(x.properties.latin.root);
}

// Latin sorting functions.
// Move this?
function remove_long_vowels(s) {
    var long_to_short = {'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U'};
    for (var i in long_to_short) {
        s = s.replace(i, long_to_short[i])
    }
    return s
}

var random_n = function (list, n) {
    var next;
    var result = [];
    for (var i = 0; i < n; i++) {
        next = random_satisfying_constraint(list, function (x) {
            return result.indexOf(x) === -1});
        if (next === null) {break} else {result.push(next)}
    };
    return result;
}


function random_choices(list, n) {
    var result = [];
    push_random_n_satisfying_constraint(result, list, function () {return true}, n)
    return result;
}

function range(start, end){
	var ns = [];
	for(var i = start; i <= end; i++){
		ns.push(i);
	}
	return ns;
}

// moved from cartesian
// returns the values of an object
var values = function(object) {
    return Object.keys(object).map(function (x) {return object[x]});
};

// moved from cartesian
// a utility function that combines a list of lists into a big list
var concat_arrays = function (list_of_arrays) {
    return Array.prototype.concat.apply([], list_of_arrays);
};

var begins_with = function (string, substring) {
    return string.slice(0, substring.length) === substring;
}

var ends_with = function (string, substring) {
    return string.slice(string.length - substring.length) === substring;
}

var cut_off = function (string, substring) {
    return string.slice(substring.length);
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

// todo akiva look at this
//returns a boolean given two lists, true if they share a common element
// e.g. two lists of roots
var something_in_common = function (x, y) {
    for (var i = 0; i < x.length; i++) {
        if (y.indexOf(x[i]) !== -1) {
            return true;
        }
    }
    return false;
};

// todo akiva look at this
// given a list and a function
// returns a dictionary
var keys_mapped_by_function = function (x, f) {
    var r = {};
    x.forEach(function (y) {r[y] = f(y)});
    return r
};

var key_value_pairs = function (d) {
    return Object.keys(d).map(function (x) {return [x, d[x]]});
}

var alphabetize_list = function (l) {
    return quick_sort(l, function (x, y) {
        return remove_long_vowels(x) < remove_long_vowels(y)})
}

var alphabetize_dict = function (d) {
    return quick_sort(key_value_pairs(d), function (x, y) {
        return remove_long_vowels(x[0]) < remove_long_vowels(y[0])})
}

function is_subset(superset, subset) {
   for (var i in subset) {
       if (!superset.has(subset[i])) {
           return false;
       }
   }
   return true;
}

function is_sub_list(super_list, sub_list) {
    for (var i = 0; i < sub_list.length; i++) {
        if (super_list.indexOf(sub_list[i]) === -1) {
            return false;
        }
    }
    return true;
}

/* Now not used.
function array_from (s) {
	var r = [];
	for (var i of s) {r.push(i)}
	return r;
}
*/

function remove (list, n) {
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

/*
// If we ever need these...
function f_curry(f) {
    return function (x) {return function (y) {return f(x, y)}};
}

function f_flip(f) {
    return function (x, y) {return f(y, x)};
}
*/

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
    if (location) {location.appendChild(e)};
    return e;
}


function set_multiple_drop_downs(drop_down, e, none_display, to_string) {
    //adds none to the list without mutating it
    var list = 'choices' in drop_down ? drop_down.choices : drop_down.parts;
    if (none_display) {list = list.concat('none')}
    var e1 = document.createElement('select');
    var h = create_element('option', drop_down.heading, e1);
    list.forEach(function (x) {
        if (typeof x === 'object') {
            if (x.opt_groups) {
                // if (!x) {return} // Just to be safe if we change our approach again.
                // old code below didn't seem to work (or just got wiped by sort)
                // if (!x) {if (none_display) {x = 'none'} else {return}}
                var o = create_element("optgroup", strip(
                    to_string ? to_string(x.subheading) : x.subheading), e1, 'label');
                x.choices.forEach(function (y) {
                    create_element("option", strip(to_string ? to_string(y) : y), o);
                });
            } else {
                x.choices.forEach(function (y) {
                    create_element("option", strip(to_string ? to_string(y) : y), e1);
                });
            }
        } else {
            create_element("option", strip(to_string ? to_string(x) : x), e1);
        }
    });
    // drop_down (x) now has an html element
    drop_down.HTML_element = e1;
    e.appendChild(e1);
}

var closest = function (list, value) {
    var min_less = math_min(list.map(function (x) {return value - x}).filter(function (x) {return x >= 0}));
    var min_more = math_min(list.map(function (x) {return x - value}).filter(function (x) {return x >= 0}));
    if (min_less < min_more) {return value - min_less} else {return value + min_more}
};

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

function el(id){
    return document.getElementById(id);
}

/*
function remove_child_from_ids(a, b) {
    var e1 = el(a);
    var e2 = el(b);
    if (e1 && e2) {
        e1.removeChild(e2);
        console.log("DEBUG 11-18 remove html elements triggered");
    }
}
*/

var set_display = function (a, b) {
    var e = el(a);
    if (e) {e.style.display = b};
}

var make_drop_down_html = function (answer_choices) {
    //html elements created here
    var pf = document.getElementById("pre_footer");
    console.log("pf = ", pf);
    
    var ac = document.createElement("div");
    ac.id = "drop_answer_choices";
    console.log("ac = ", ac);
    pf.appendChild(ac);
    
    var aw = document.createElement("div");
    aw.id = "drop_answer_wrapper";
    console.log("aw = ", aw);
    ac.appendChild(aw);
    
    var e = document.createElement("select");
    e.id = "select_element";
    console.log("e = ", e);
    aw.appendChild(e);
    
    console.log("DEBUG 11-18 final append reached");
    console.log("DEBUG 11-18 dropdown data inserted = ", answer_choices);
    set_dropdown("select_element", answer_choices);
};

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

function remove_element_by_id(x) {
    var e = el(x);
    if (e) {e.parentNode.removeChild(e)}
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

function list_equals(a, b) {
    if (a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
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

function hash(x) {
    var internal_hash = 0;
    if (x.length == 0) {return internal_hash};
    for (var i = 0; i < x.length; i++) {
        internal_hash = ((internal_hash << 5) - internal_hash)
        + x.charCodeAt(i);
    }
    return internal_hash;
}

var is_correct_access_code = function(access_code) {
    return hash(access_code) === 1327021340;
}