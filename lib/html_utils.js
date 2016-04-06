// This file has the utils which pertain more to html,
// as opposed to list/dict/string manipulation, random numbers, etc.
// It also contains the cookie and url parameter functions.

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