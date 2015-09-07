
// window.onload = function(){
    
//     var words = ["hello", "world", "goodbye", "world"];
//     var ws = new WordSelector("box", words);
//     ws.setup();
    
// }

var WordSelector = function(element_id, words){
    
    this.element_id = element_id;
    this.words = words;
    this.highlighted_words = new Set();
    this.previous_id = null;
    
};

    WordSelector.prototype.toggle = function(index){

        var word = this.words[index];
        
        if (word === '(' || word === '/') {
            var indices_of_open_bracket_clause = this.open_bracket_clause(index);
            for (var i = 0; i < indices_of_open_bracket_clause.length; i++) {
                this.set_highlighted(indices_of_open_bracket_clause[i], true);
            }
        } else {
            this.set_highlighted(index, !this.is_highlighted(index));
        }

    }
    
    WordSelector.prototype.is_highlighted = function(index){
        return this.highlighted_words.has(index);
    }
    
    WordSelector.prototype.set_highlighted = function(index, flag){
        
        var e = document.getElementById(index);
        
        if(flag){
            this.highlighted_words.add(index);
            e.style.background = "red";
        } else {
            this.highlighted_words.delete(index);
            e.style.background = "white";
        }
        
    }
    
    WordSelector.prototype.clear = function(){
        this.highlighted_words.forEach(function(index){
            this.set_highlighted(index, false);
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
    }
    
    // ----------------------------------------------------------------------------------------
    
    WordSelector.prototype.setup = function(){
        var e = document.getElementById(this.element_id);
        e.innerHTML = "";
        for(var i in this.words){
            var s = document.createElement("span");
            s.setAttribute("id", i);
            s.innerHTML = this.words[i] + " ";
            var f = this.create_closure(i);
            s.addEventListener("click", f);
            e.appendChild(s);
        }
    };
    
    WordSelector.prototype.create_closure = function(i){
        var self = this;
        return function(event){ self.click_received(event, i); };
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




    //argument will be an index (the index of the bracket user has clicked on)
    //input: single integer, index
    //output: list of indices
    WordSelector.prototype.open_bracket_clause = function (i) {
        //todo defensively program against clicking on close bracket ')' or clicking on the final character
        var list = []; 
        //depth is a measure of how "deep" we are in the subordination, i.e. how many levels deep we are
        var depth = 0;
        //advance the index
        i++;
        for (; i < this.words.length; i++) {
            //we might get to the end without hitting any break-inducing character - namely ')' or '/')
            if (this.words[i] === undefined) {
                break;
            }
            //so first we deal with the scenario of not finishing our current clause but rather entering another subordinate clause
            else if (this.words[i] === '(') {
                //another layer of subordination has been entered and thus we increase the depth by  one layer
                depth++;
            }
            // or secondly we might close our current bracket
            else if (this.words[i] === ')') {
                //check if we are under any subordination
                if (depth === 0) {
                    //if so, we consider our clause to have ended
                    //so we need to exit the loop because we're done
                    break;
                }
                //but we might be under a subordination
                else {
                    // in which case we need to decrease the depth, because we've left a layer of subordination
                    depth--;
                }
            }
            //we might have reached coordination at the top level
            else if (this.words[i] === '/') {
                //in which case we wan't to push everything before and break
                if (depth === 0) {
                    break;
                }
            }
            //or we might not hit any metacharacter, and in that case we just add indices to our list
            else if (depth === 0) {
                list.push(i);
            }
        }
        return list;
    };
