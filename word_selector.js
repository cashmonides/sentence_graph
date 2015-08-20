
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
    
    this.click_2 = function(event, id){
        // console.log(event, i, this.words[i]);
        id = parseInt(id);
        var word = this.words[id];
        console.log("TAGGED! ", id, typeof(id),  word, this.words_in_play);
    
        //check if shift key is held down
        if (event.shiftKey) {
            console.log("shift key detected");
            if (this.previous_id != null) {
                var start = this.previous_id < id ? this.previous_id : id;
                var end = this.previous_id > id ? this.previous_id : id;
                for (var i = start; i <= end; i++) {
                    var e = document.getElementById(i);
                    this.words_in_play.add(i);        
                    e.style.background = "red";
                }
            }
        } else {
            var e = document.getElementById(id);
            if (this.words_in_play.has(id)){                        //if...tests if it's already highlighted, in which case it gets unhighlighted
                this.words_in_play.delete(id);
                e.style.background = "white";
            } else if (word === '(' || word === '/') {              //todo this is the addition here
                var indices_of_open_bracket_clause = this.open_bracket_clause(id);
                console.log(indices_of_open_bracket_clause);
                //add these indices to words_in_play and turn red
                for (var i = 0; i < indices_of_open_bracket_clause.length; i++) {
                    this.words_in_play.add(indices_of_open_bracket_clause[i]);      //todo turn i into a sring?
                    var e2 = document.getElementById(indices_of_open_bracket_clause[i]);
                    e2.style.background = "red";
                }
            }
            //this deals with the case of neither being highlighted nor a metacharacter
            else {
                this.words_in_play.add(id);  // TODO - why is ID a string?
                e.style.background = "red";
            }
        }
    
        this.previous_id = id;
        console.log("currently selected: ", this.words_in_play);
        
    };
    
    
    this.get_text = function (is) {
        output = "";
        for (var i in is) {
            output += (this.words[is[i]]) + " ";
        }
        return output;
    };
    
    
    this.get_selected_indices = function (){
        
        console.log(this.words_in_play);
        var list = [];
    
        var callback = function (e) {
            // console.log(e);
            list.push(e);
        };
    
        this.words_in_play.forEach(callback);
    
        list.sort();
        console.log(list);
        return list;
    
        
    };




    //todo new functionality below
    //goal: to be able to click on an open bracket and wordselector only selects/highlights the words contained in the brackets

    //argument will be an index (the index of the bracket user has clicked on)
    //this will return a list of indices
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





}