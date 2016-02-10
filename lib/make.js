/*
old and obsolete version of make
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
*/


//notes on make
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
         } else if((a in e)) {
            // if the attribute is a potential attribute of the element 
            // it might be worth adding a check for properties in 
            // a list of properties that a element can have
            // even if its parent doesn't
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