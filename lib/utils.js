
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