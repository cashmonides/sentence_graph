
// window.onload = function(){
    
//     var words = ["hello", "world", "goodbye", "world"];
//     var ws = new WordSelector("box", words);
//     ws.setup();
    
// }

var WordSelector = function(element_id, text_data){
    
    this.element_id = element_id;
    this.text_data = text_data;
    this.words = text_data.get_words();
    this.highlighted_words = new Set();
    this.previous_id = null;
    
};

WordSelector.prototype.toggle = function(index){

    var word = this.words[index];
    this.set_highlighted(index, !this.is_highlighted(index));

};
    
WordSelector.prototype.is_highlighted = function(index){
    return this.highlighted_words.has(index);
};

WordSelector.prototype.set_highlighted = function(index, flag){

    var e = document.getElementById(index);

    if(flag){
        this.highlighted_words.add(index);
        e.style.color = "red";
    } else {
        this.highlighted_words.delete(index);
        e.style.color = "#666";
    }

};
    
WordSelector.prototype.clear = function(){
    var self = this;
    this.highlighted_words.forEach(function(index){
        self.set_highlighted(index, false);
    });
    this.highlighted_words = new Set();
};

//returns a sorted list of highlighted indices
WordSelector.prototype.get_selected_indices = function (){
    var list = [];
    var callback = function (e) {
        list.push(e);
    };
    this.highlighted_words.forEach(callback);
    list.sort();
    return list;
};
    
WordSelector.prototype.get_word = function(index){
    return this.words[index];
};

// ----------------------------------------------------------------------------------------

WordSelector.prototype.setup = function(){

    var e = document.getElementById(this.element_id);
    e.innerHTML = "";

	var text = this.text_data.get_text();
    var regions = this.text_data.get_regions();
    var pos = 0;
    var word_count = 0;
    console.log("regions:", regions);

    for(var i = 0; i < regions.length; i++){

    	var r = regions[i];

		if(r[1] > pos){
			var plain = text.substring(pos, r[1]);
			pos += plain.length;
//			console.log("plain:", plain);
			e.appendChild(document.createTextNode(plain));
		}

//		console.log(this.words[i]);
		var s = document.createElement("span");
		var plain = text.substring(r[1], r[2] + 1);
		pos += plain.length;
		s.innerHTML = plain;
		if(r[0]){
//			console.log("word index?", r);
			var f = this.create_word_closure(word_count);
			s.addEventListener("click", f);
		} else {
			var f = this.create_paren_closure(r[3]);
			s.addEventListener("click", f);
		}
		if(r[0]){
			s.setAttribute("id", word_count);
			word_count++;
		}
		s.setAttribute("class", "hoverable");
		e.appendChild(s);

    }

    e.appendChild(document.createTextNode(text.substring(pos)));

};
    
WordSelector.prototype.create_word_closure = function(i){
    var self = this;
    return function(event){ self.click_received(event, i); };
};

WordSelector.prototype.create_paren_closure = function(obj){
    var self = this;
    return function(event){ self.text_data.selected(obj); };
};

//click_2 contains click_3
//two options - either we have a simple click or a click with the shift key held down
WordSelector.prototype.click_received = function(event, index){
    index = parseInt(index);                                                                          //id is a string and we need to convert it to an integer
    //check if shift key is held down
    if (event.shiftKey) {
        console.log("shift key detected");
        if (this.previous_id != null) {
            var start = this.previous_id < index ? this.previous_id : index;
            var end = this.previous_id > index ? this.previous_id : index;
            for (var i = start; i <= end; i++) {
                this.set_highlighted(i, true);
            }
        }
        this.previous_id = null;
    } else {
        this.toggle(index);
        this.previous_id = index;
    }
};

//a utility function that will allow us to turn indices into a string
WordSelector.prototype.get_text = function (indices) {
    var output = "";
    for (var i in indices) {
        output += (this.words[indices[i]]) + " ";
    }
    return output;
};
