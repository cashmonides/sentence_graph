
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
        
        var word = this.words[id];
        console.log("TAGGED! ", id, word, this.words_in_play);
    
        //check if shift key is held down
        if (event.shiftKey) {
            console.log("shift key detected");
            if (this.previous_id != null) {
                var start = this.previous_id < id ? this.previous_id : id;
                var end = this.previous_id > id ? this.previous_id : id;
                for (var i = start; i <= end; i++) {
                    var e = document.getElementById(i);
                    this.words_in_play.add(i + "");
                    e.style.background = "red";
                }
            }
        } else {
            var e = document.getElementById(id);
            if (this.words_in_play.has(id)){
                this.words_in_play.delete(id);
                e.style.background = "white";
            } 
            
            // else if (word === "(") {
            //     var indices_of_target_clause = this.words_to_clauses[id].indices;
            //     for (i  = 0; i < indices_of_target_clause.length; i++) {
            //         var e2 = document.getElementById(indices_of_target_clause[i]);
            //         this.words_in_play.add(indices_of_target_clause[i]);
            //         e2.style.background = "red";
            //     }
            // } 
            
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
    
}