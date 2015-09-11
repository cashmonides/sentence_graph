
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

function contains(list, object){
	return list.indexOf(object) > -1;
}

function set_dropdown(id, list, to_string){

    var e = document.getElementById(id);
    e.innerHTML = "";

    for(var i = 0; i < list.length; i++){

        var x = list[i];
        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);

    }

}
