
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

    var e = el(id);
    //console.loge, id);
    e.innerHTML = "";

    //console.log"9-24 reached set_dropdown, list = ", list);
    for(var i = 0; i < list.length; i++){
        var x = list[i];
        var o = document.createElement("option");
        o.innerHTML = to_string ? to_string(x) : x;
        e.appendChild(o);
    }
}

function set_multiple_drop_downs(drop_down, id, list, heading, to_string){

    //console.log"LOG drop down = ", drop_down);
    //console.log"LOG id = ", id);
    //console.log"LOG list = ", list);
    //console.log"LOG heading = ", heading);

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

function selected_option(drop_down) {
    return drop_down.options[drop_down.selectedIndex].value;
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

//attrs has 4 special keys
    //tag (str with tag type, e.g. div)
    //children - list of attributes (thus allowing recursive calls)
    //text - the text of the tag (e.g. the text between tags, the content o)
    //class - an alias for className ()
//parent is optional - but if it's included, then element that's created is appended to it
function make(attrs, parent){
    //console.log"attributes in make", attrs, attrs["tag"]);
   var e = document.createElement(attrs["tag"]);

   for(var a in attrs){
      if(a != "tag" && a != "children" && a != "text"){
         var value = attrs[a];
         if(a == "class"){
            e.className = typeof(value) == "string" ? value : value.join(" ");
         } else if(a == "style"){
            for(var k in value){
               e.style[k] = value[k];
            }
         } else if(a in e){
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
            console.log("WARNING:", pair);
        }

    }

    // console.log("url parameters:", map);
    return map;

}



function get_accuracy2 (iteration) {
    console.log("DEBUG get_accuracy2 triggered");
    console.log("DEBUG get_accuracy2 iteration = ", iteration);
    return Math.floor(100 * iteration[0]
    / Object.keys(iteration).
    map(function (x) {return iteration[x]}).
    reduce(function (a, b) {return a + b}))
};