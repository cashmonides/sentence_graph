
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

function is_subset(superset, subset) {
   for (var i in subset) {
       if (!superset.has(subset[i])) {
           return false;
       }
   }
   return true;
}

function contains(list, object){
	return list.indexOf(object) > -1;
}

function set_dropdown(id, list, to_string){

    var e = document.getElementById(id);
    console.log(e, id);
    e.innerHTML = "";

    console.log("9-24 reached set_dropdown, list = ", list);
    for(var i = 0; i < list.length; i++){
        var x = list[i];
        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
    }
}

function set_multiple_drop_downs(drop_down, id, list, heading, to_string){

    console.log("LOG drop down = ", drop_down);
    console.log("LOG id = ", id);
    console.log("LOG list = ", list);
    console.log("LOG heading = ", heading);

    var e = document.getElementById(id);

    //var dd = document.createElement('select');

    [heading].concat(list).forEach(function (x) {

        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
        console.log("DEBUG 10-8 append child triggered");

    });
    drop_down.drop_down = e;
    document.getElementById(id).appendChild(e);
}


function set_multiple_drop_downs_old(drop_down, id, list, heading, to_string){

    console.log("LOG drop down = ", drop_down);
    console.log("LOG id = ", id);
    console.log("LOG list = ", list);
    console.log("LOG heading = ", heading);
    heading = "TEST HEADING";

    var e = document.createElement('select');

    [heading].concat(list).forEach(function (x) {
        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
        console.log("DEBUG 10-8 append child triggered");
    });
    drop_down.drop_down = e;
    document.getElementById(id).appendChild(e);
}

function selected_option(drop_down) {
    return drop_down.options[drop_down.selectedIndex].value
}


function selected_option(drop_down) {
    return drop_down.options[drop_down.selectedIndex].value
}




function get_cookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        // console.log("cookie in get cookie = ", c);
        // if (c.indexOf("quiz_uid") != -1) {
        //     console.log("found cookie = ", c);
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