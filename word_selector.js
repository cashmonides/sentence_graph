
// window.onload = function(){
    
//     var words = ["hello", "world", "goodbye", "world"];
//     var ws = new WordSelector("box", words);
//     ws.setup();
    
// }

var WordSelector = function(element_id, words){
    
    this.element_id = element_id;
    this.words = words;
    this.words_in_play = new Set();
    this.previous_id = null;
    
    this.clear = function(){
        this.words_in_play.forEach(function(id){
            var e = document.getElementById(id);
            e.style.background = "white";
        });
        this.words_in_play = new Set();
    };
    
    this.setup = function(){
        var e = document.getElementById(element_id);
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
    
    this.create_closure = function(i){
        var self = this;
        return function(event){ self.click_2(event, i); };
    };


    // input: integer index
    // result: toggle that index between red and white and adds to word-in-play
    this.click_3 = function(index){
        
        var word = this.words[index];
        //console.log("TAGGED! ", index, typeof(index),  word, this.words_in_play);
        
        var e = document.getElementById(index);
        //first we deal with the case where the word is already highlighted, in which case we unhighlight and remove from words_in_play
        if (this.words_in_play.has(index)){
            this.words_in_play.delete(index);                                   //mutates a property of word selector
            e.style.background = "white";                                       //alters the html
        }
        //next we deal with the case of a clause opener, to allow easy highlighting of an entire clause
        else if (word === '(' || word === '/') {
            var indices_of_open_bracket_clause = this.open_bracket_clause(index);
            //add these indices to words_in_play and turn red
            for (var i = 0; i < indices_of_open_bracket_clause.length; i++) {
                this.words_in_play.add(indices_of_open_bracket_clause[i]);
                var e2 = document.getElementById(indices_of_open_bracket_clause[i]);
                e2.style.background = "red";
            }
        }
        //lastly we deal with the case of neither highlighted nor a bracket character
        else {
            this.words_in_play.add(index);
            e.style.background = "red";
        }
    };
    
    //click_2 contains click_3
    //two options - either we have a simple click or a click with the shift key held down
    this.click_2 = function(event, index){
        index = parseInt(index);                                                                          //id is a string and we need to convert it to an integer
        //check if shift key is held down
        if (event.shiftKey) {
            console.log("shift key detected");
            if (this.previous_id != null) {
                var start = this.previous_id < index ? this.previous_id : index;
                var end = this.previous_id > index ? this.previous_id : index;
                for (var i = start; i <= end; i++) {
                    var e = document.getElementById(i);
                    this.words_in_play.add(i);        
                    e.style.background = "red";
                }
            }
            this.previous_id = null;
        } else {
            this.click_3(index);
            this.previous_id = index;
        }
    };

    //a utility function that will allow us to take a list of indices and "click" on them - i.e. highlight them and add the to words in play
    this.set_indices = function(indices){
        this.clear();
        for(var i in indices){
            this.click_3(indices[i]);
        }
    };
    
    //a utility function that will allow us to turn indices into a string
    this.get_text = function (indices) {
        output = "";
        for (var i in indices) {
            output += (this.words[indices[i]]) + " ";
        }
        return output;
    };


    //returns a sorted list of highlighted indices
    this.get_selected_indices = function (){
        var list = [];
        var callback = function (e) {
            list.push(e);
        };
        this.words_in_play.forEach(callback);
        list.sort();
        return list;
    };


    //argument will be an index (the index of the bracket user has clicked on)
    //input: single integer, index
    //output: list of indices
    this.open_bracket_clause = function (i) {
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





};