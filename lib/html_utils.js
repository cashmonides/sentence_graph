// This file has the utils which pertain more to html,
// as opposed to list/dict/string manipulation, random numbers, etc.
// It also contains the cookie and url parameter functions.

function set_dropdown(id, list, to_string){
    // console.log("DEBUG 11-18 entering set_dropdown");
    // console.log("DEBUG 11-18 id = ", id);
    // console.log("DEBUG 11-18 list = ", list);
    var e = el(id);
    e.innerHTML = "";

    //console.log"9-24 reached set_dropdown, list = ", list);
    for(var i = 0; i < list.length; i++){
        var x = list[i];
        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
    }
    
    // todo new code below 11-29 
    // added so we would have something to check
    // that it doesn't just have one answer
    return e;
}

// todo Akiva look this over
// todo superceded by make
function create_element(type, text, location, label) {
    var e = document.createElement(type);
    e[label ? label: 'innerHTML'] = text;
    if (location) {location.appendChild(e)};
    return e;
}
function remove_element(x) {
    x.parentNode.removeChild(x)
}

function remove_element_by_id(x) {
    var e = el(x);
    if (e) {e.parentNode.removeChild(e)}
}

function remove_children(x) {
    while (x.children.length > 0) {x.removeChild(x.children[0])}
}

function set_multiple_drop_downs(drop_down, e, none_display, to_string) {
    //adds none to the list without mutating it
    var list = 'choices' in drop_down ? drop_down.choices : drop_down.parts;
    if (none_display && (drop_down.no_none_display !== true)) {
        list = list.concat('none');
    }
    var e1 = document.createElement('select');
    var h = create_element('option', drop_down.heading, e1);
    list.forEach(function (x) {
        if (typeof x === 'object') {
            if (x.opt_groups) {
                // if (!x) {return} // Just to be safe if we change our approach again.
                // old code below didn't seem to work (or just got wiped by sort)
                // if (!x) {if (none_display) {x = 'none'} else {return}}
                // Note that strip is in utils because it is (intrinsically)
                // only string manipulation.
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

var make_drop_down_html = function (answer_choices, element_to_attach_to, id_number) {
    // todo fixme second parameter hack
    if (!element_to_attach_to) {
        element_to_attach_to = "pre_footer";
    }
    
    if (id_number === undefined || id_number === null) {
        id_number = '';
    }
    //html elements created here
    var pf = document.getElementById(element_to_attach_to);
    // console.log("pf = ", pf);
    
    var ac = document.createElement("div");
    ac.id = "drop_answer_choices" + id_number;
    // console.log("ac = ", ac);
    pf.appendChild(ac);
    
    var aw = document.createElement("div");
    aw.id = "drop_answer_wrapper" + id_number;
    // console.log("aw = ", aw);
    ac.appendChild(aw);
    
    var select_id = "select_element" + id_number;
    
    var e = document.createElement("select");
    e.id = select_id;
    // console.log("e = ", e);
    aw.appendChild(e);
    
    // console.log("DEBUG 11-18 final append reached");
    // console.log("DEBUG 11-18 dropdown data inserted = ", answer_choices);
    return set_dropdown(select_id, answer_choices);
};

/*
// We might never need this.
var remove_tags_drop_down = function (x) {
    return x.replace(/<.*>/g, '');
}
*/

// Note: this was just changed to remove any color tags.
var selected_option = function (drop_down) {
    return drop_down.options[drop_down.selectedIndex].value;
}

var redden = function (x) {
    return '<span style="color:#cc0000">' + x + '</span>';
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

function clear_input_box (el) {
    console.log("clear_input_box triggered div = ", el);
    document.getElementById(el).value = "";
}

function clear_input_feedback_box (el) {
    console.log("clear_input_box triggered div = ", el);
    document.getElementById(el).value = "";
}

function el(id){
    return document.getElementById(id);
}

//todo wasn't working as Quiz.logout_from_quiz

var return_to_login = function () {
    document.location = "..";
}

var return_to_profile = function () {
    document.location = "../profile/";
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

//old version plunder its try throw perhps
// var set_display_of_class = function (a, b) {
//     var e = cl(a);
//     console.log("ECCE 12 e = ", e);
//     if (e) {
//         try {
//             console.log("ECCE 12 display of class set")
//             e.style.display = b;
//         }
//         catch (err) {
//             console.log("ERROR IN inner_html cleared");
//             return;
//         }
//     } else {
//         return;
//         console.log("PROBLEM: clear_inner_html: e does not exist")
//     };
// }


var cl = function (x) {
    return document.getElementsByClassName(x);
}


var set_inner_html_of_class = function (a, b) {
    var divs = document.getElementsByClassName(a);

    [].slice.call(divs).forEach(function (div) {
        div.innerHTML = b;
    });
}

var set_display_of_class = function (a, b) {
    var divs = document.getElementsByClassName(a);
    if (!divs) {
        alert("no divs");
        console.log("PROBLEM no divs in set_display_of_class");
        return;
    }
    [].slice.call(divs).forEach(function (div) {
        div.style.display = b;
    });
}


var clear_inner_html_of_class = function (a) {
    var e = cl(a);
    console.log("ECCE 13 e = ", e);
    if (e) {
        try {
            console.log("ECCE 13 inner_html cleared")
            e.innerHTML = "CLASS CLEARED";
        }
        catch (err) {
            console.log("ecce 13 ERROR IN inner_html cleared");
            return;
        }
    } else {
        return;
        console.log("PROBLEM: clear_inner_html: e does not exist")
    };
}




var clear_inner_html_of_div = function (a) {
    var e = el(a);
    if (e) {
        e.innerHTML = "CLEARED";
        try {
            console.log("ECCE 9 inner_html cleared")
            e.innerHTML = "";
        }
        catch (err) {
            console.log("ERROR IN inner_html cleared");
            return;
        }
    } else {
        return;
        console.log("PROBLEM: clear_inner_html: e does not exist")
    };
}

function get_url_parameters() {
    var map = {};
    var query = window.location.search.substring(1);
    var pairs = query.split("&");

    for (var i = 0; i < pairs.length; i++) {
        // console.log('getting url parameters');
        var pair = pairs[i].split("=");
        if(pairs[i].length > 0 && (pair.length == 1 || pair.length == 2)){
            var key = pair[0];
            var value = pair.length == 1 ? null : pair[1];
            map[key] = value.replace(/%[0-9A-F]{2}/g, function (x) {
                var r = String.fromCharCode(
                    hex_to_num[x[1]] * 16 + hex_to_num[x[2]]);
                // console.log('r =', r);
                return r;
            });   
        } else {
            console.log("NO URL PARAMETER DETECTED:", pair);
        }

    }

    // console.log("url parameters:", map);
    return map;

}

/*

//old and obsolete functions below

function set_multiple_drop_downs_OBSOLETE(
drop_down, id, list, heading, to_string){



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
*/