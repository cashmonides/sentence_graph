//var text = "A baryon is a composite subatomic particle made up of three quarks (as distinct from mesons, which are composed of one quark and one antiquark). Baryons and mesons belong to the hadron family of particles, which are the quark-based particles. The name \"baryon\" comes from the Greek word for \"heavy\" (βαρύς, barys), because, at the time of their naming, most known elementary particles had lower masses than the baryons.";
//var text = "the dog jumps (when the bell (which my father made) rings ) .";
//var text = "the poets utter wise things (which they do not understand).";
var text = "a confucius (who lived  in a country (which we now call China) a long time ago (rich in empire and roaring with war )) said  in his book (which is called the Analects) (that revenge is a dish (which tastes best cold)).";
// var text = "the dog jumps when the bell rings.";
//var text = "(when you embark on a journey of revenge) dig two graves.";
//var text = "Silence is a true friend (who never betrays).";
//var text = "There was an old man (who supposed (that the street door was partially closed)) but some very large rats ate his coat and his hats, (while that futile old gentleman dozed).";
//var text = "(What we achieve inwardly) will change outer reality.";
//var text = "There was an old woman (who lived in a shoe).";


//initializing global variables

var sentence = null;

var word_map = {};                                                          //a set of unique integer ids for each word

var words_in_play = new Set();

var tag_list = ["noun", "verb", "subject", "object", "main clause", "subordinate clause", "adverb", "preposition", "definite article", "indefinite article", "personal pronoun", "subordinating conjunction", "coordinating conjunction"];

var tag_map = {};

var previous_id = null;

var words_to_clauses = {};                                          //words_to_clauses will be a dictionary from indices to clause_regions
                                                                     //its goal is to have an easy way of finding out what clause a word is in

var auto_tagging_map = {
    "the" : "definite article",
    "a" : "indefinite article",
    "an" : "indefinite article",
    "I" : "personal pronoun",
    "me" : "personal pronoun",
    "you" : "personal pronoun",
    "he" : "personal pronoun",
    "she" : "personal pronoun",
    "we" : "personal pronoun",
    "they" : "personal pronoun",
    "them" : "personal pronoun",
    "my" : "possessive adjective",
    "your" : "possessive adjective",
    "his" : "possessive adjective",
    "her" : "possessive adjective",
    "its" : "possessive adjective",
    "our" : "possessive adjective",
    "their" : "possessive adjective",
    "after" : "subordinating conjunction",
    "although" : "subordinating conjunction",
    "because" : "subordinating conjunction",
    "before" : "subordinating conjunction",
    "how" : "subordinating conjunction",
    "if" : "subordinating conjunction",
    "that" : "subordinating conjunction",
    "unless" : "subordinating conjunction",
    "until" : "subordinating conjunction",
    "what" : "subordinating conjunction",
    "when" : "subordinating conjunction",
    "where" : "subordinating conjunction",
    "which" : "subordinating conjunction",
    "while" : "subordinating conjunction",
    "who" : "subordinating conjunction",
    "why" : "subordinating conjunction",
    "and" : "coordinating conjunction",
    "but" : "coordinating conjunction",
    "or" : "coordinating conjunction",
    "above" : "preposition",
    "about" : "preposition",
    "across" : "preposition",
    "against" : "preposition",
    "along" : "preposition",
    "amid" : "preposition",
    "among" : "preposition",
    "around" : "preposition",
    "as" : "preposition",
    "at" : "preposition",
    "behind" : "preposition",
    "below" : "preposition",
    "beneath" : "preposition",
    "beside" : "preposition",
    "besides" : "preposition",
    "between" : "preposition",
    "beyond" : "preposition",
    "by" : "preposition",
    "concerning" : "preposition",
    "despite" : "preposition",
    "during" : "preposition",
    "except" : "preposition",
    "for" : "preposition",
    "from" : "preposition",
    "in" : "preposition",
    "inside" : "preposition",
    "into" : "preposition",
    "like" : "preposition",
    "near" : "preposition",
    "of" : "preposition",
    "off" : "preposition",
    "on" : "preposition",
    "onto" : "preposition",
    "opposite" : "preposition",
    "outside" : "preposition",
    "over" : "preposition",
    "past" : "preposition",
    "to" : "preposition",
    "toward" : "preposition",
    "under" : "preposition",
    "underneath" : "preposition",
    "unlike" : "preposition",
    "with" : "preposition",
    "within" : "preposition",
    "without" : "preposition"
}

//utility functions


function is_word_char (c){
    return (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z');
}

function is_conj_char (c){
    return (c === '[' || c === '(' || c === '<' || c === '{' || c === ']' || c === ')' || c === '>' || c === '}');
}


function indices_to_string(is) {
    output = "";
    for (var i in is) {
        output += (word_map[is[i]]) + " ";
    }
    return output;
}




//START
window.onload = function (){
    var x = document.getElementById("box");        //an expensive operation so we assign it to a variable before the for loop

    generate_buttons();
    generate_tags();


    var words = load_sentence(x);
    process_bracketed_text(words);

    process_auto_tags(words);




    //debugging below
    console.log(JSON.stringify(sentence));

};




//adds clicked words to set of words_in_play
function click_2(event, id){
    var word = word_map[id];
    console.log("TAGGED! ", id, word, words_in_play);

    //check if shift key is held down
    if (event.shiftKey) {
        console.log("shift key detected");
        if (previous_id != null) {
            var start = previous_id < id ? previous_id : id;
            var end = previous_id > id ? previous_id : id;
            for (var i = start; i <= end; i++) {
                var e = document.getElementById(i);
                words_in_play.add(i);
                e.style.background = "red";
            }
        }
    } else {
        var e = document.getElementById(id);
        if (words_in_play.has(id)){
            words_in_play.delete(id);
            e.style.background = "white";
        } else if (word === "(") {
            var indices_of_target_clause = words_to_clauses[id].indices;
            for (i  = 0; i < indices_of_target_clause.length; i++) {
                var e2 = document.getElementById(indices_of_target_clause[i]);
                words_in_play.add(indices_of_target_clause[i]);
                e2.style.background = "red";
            }
        } else {
            words_in_play.add(id);
            e.style.background = "red";
        }
    }

    previous_id = id;

}


function convert_wordset_to_list () {
    console.log(words_in_play);
    var list = [];

    var callback = function (e) {
        console.log(words_in_play, e);
        list.push(e);
    };

    words_in_play.forEach(callback);

    list.sort();
    console.log(list);
    return list;
}

function submit_tag(tag_type){
    var tag = new SingleRegionTag(tag_list[tag_type]);
    console.log("submit tag triggered here");
    console.log("TEST OF tag type", tag, words_in_play.size, words_in_play.values());

    words_in_play.forEach(function(x){
      document.getElementById(x).style.background = "white";
    });



    var indices = convert_wordset_to_list();                                                                //indices = highlighted words
    console.log(indices);
    var region = sentence.get_region(indices);                                                              //make a region to hold the tags
    if (region != undefined && region != null) {
        console.log("ADDING TAG ", tag);
        region.add_tag(tag);
        //todo additions below
        //if (tag.indexOf("clause") !== -1) {
        //    region.make_clause(tag);
        //}
    }
    console.log(sentence);

    //TODO current problem
    //regions dont have clause properties
    //tag_type is a number and we need it to be a string

    //todo checkpoint 1A
    //so what we've done above is
    //allow a submitted tag to be associated with a region
    //thats step 1 mission accomplished
    //but another functionality we want is:
    //to change the clause object and give it a .subject property
    //to accomplish this we will do the following
    //first we find an easy way to access the clause object
    //namely we will use the words to clauses
    //because words to clauses maps indices to clauses so it's an easy way to get it
    //let's see it in action
    //for easy handling we assign the variable clause to a clause in our words_to_clauses map
    //so clause is an object
    var clause = words_to_clauses[indices[0]].tags[0];
    console.log("CHECKPOINT 1A clause = ", clause);
    //now we assign a region to the clause.subject property (e.g.
    clause[tag_list[tag_type]] = indices;
    //clause["subject"] = region         this assigns a list of indices to the clause.subject property

    console.log("Subject of clause below = ", indices_to_string([clause.subject]));
    console.log("Object of clause below = ", indices_to_string([clause.object]));
    console.log("Verb of clause below = ", indices_to_string([clause.verb]));
    console.log("Clause = ", indices_to_string(clause.indices));
    console.log("clause type of clause = ", clause.clause_type);


    console.log("CHECKPOINT 1A complete");





    words_in_play.clear();
    console.log("WORDS in play after clear", words_in_play.size);

    console.log("REGION + TAGS", JSON.stringify(region));
    console.log("REGION SUMMARY");
    console.log("words = ", indices.map(function (x) {return word_map[x]}).join(' '));
    console.log("indices = ", JSON.stringify(region.indices));
    console.log("tags = ", JSON.stringify(region.tags));
    if (region.clause) {
        console.log("clause_type = ", JSON.stringify(region.clause.clause_type));
    }


}






function load_sentence (input_box) {
    var start = -1;               //-1 is an out of band value - a number that's not valid but within the range of the data type we're using
    var id = 1;
    var words = [];
    var word;

    for (var pos in text){                                                                                              //todo make text not a global variable
        var c = text[pos];
        if (is_conj_char(c)) {
            if (start >= 0) {
                word = text.substring(start, pos);
                words.push(word);
                word_map[id] = word;
                input_box.innerHTML += "<span id=\"" + id + "\" onclick=\"click_2(event, " + id + ")\">" + word + "</span>";
                id += 1;
            }
            var bracket = c;
            words.push(bracket);
            word_map[id] = bracket;
            input_box.innerHTML += "<span id=\"" + id + "\" onclick=\"click_2(event, "+id+")\">" + bracket + "</span>";
            id += 1;
            start = -1;

        } else if (is_word_char(c)) {
            if (start == -1) {
                start = pos
            }
        } else {
            if (start >= 0){
                word = text.substring(start, pos);
                words.push(word);
                word_map[id] = word;
                input_box.innerHTML += "<span id=\"" + id + "\" onclick=\"click_2(event, "+id+")\">" + word + "</span>";
                id += 1;
                start = -1;
            }
            input_box.innerHTML += c;
        }
    }
    sentence = new Sentence(words);
    return words;
}


//this should return a list of clause objects (ideally with subordinate and superordinate)
//currently it modifies the global variable sentence by adding new regions
//and the regions have clause objects as properties
//and the clauses so far don't have a clause type (but that functionality will be added later)
function process_bracketed_text (words) {
    //clause_stack is a stack of all the clauses (i.e. their indices) which haven't been processed yet
    //type = list of lists of indices
    var clause_stack = [[]];

    //clause_region is the region which we will end up pushing to sentence.regions
    var clause_region;


    for (var i = 1; i <= words.length; i++) {
        //console.log("CLAUSE STACK = ", JSON.stringify(clause_stack));
        if (word_map[i] === '(') {
            //a subordinate clause has been detected so we want to add it to the clause stack
            //so we create a list [i] and push it to the stack
            clause_stack.push([i]);
        } else {
            //no subordinate clause has been detected
            //so we want to push our new word (i.e. an index) into the current clause (i.e. the top item of the clause_stack)
            clause_stack[clause_stack.length - 1]. push(i);

            //but we might have hit a closed bracket, meaning a clause has ended
            //in which case we want to close a clause
            //and we want to remove the clause that just closed from the clause stack
            //and we want to make a new region with region.clause = the clause we just removed
            //in other words, wehn we hit a close bracket we want to assign the clause region and throw it out of the stack because the stack is for current clauses
            if (word_map[i] === ')') {
                var y = clause_stack.pop();                 //this does two things at once, return y and pops
                if (clause_stack.length !== 0) {            //when clause_stack.length == 0 we have a problem because we've ended the main clause with a close bracket
                
                    // clause_region = new Region(y);
                    // clause_region.make_clause('subordinate clause');
                    // y.forEach(function(x) {                         //we iterate over the indices and populate the map of words to clauses
                    //     words_to_clauses[x] = clause_region;
                    // });
                    // sentence.regions.push(clause_region);           //we want our new clause (that just closed) to be in sentence

                    //TODO CHECKPOINT 2
                    //old below
                    //sentence.get_region(y).add_tag(new SubordinateClause());

                    //NEW BELOW
                    var new_region = sentence.get_region(y);
                    new_region.add_tag(new SubordinateClause());

                    //quick and dirty check
                    new_region.tags[0].indices = y;



                    //we want to update our words_to_clauses
                     y.forEach(function(x) {                         //we iterate over the indices and populate the map of words to clauses
                         words_to_clauses[x] = new_region;
                     });
                    //sentence.regions.push(new_region);            //we don't need this because get_region pushes a region

                    //todo END CHECKPOINT 2

                    
                } else {                                        //this is a case with too many closing brackets
                    throw "bad tagging";
                }
            }
        }
    }
    if (clause_stack.length !== 1) {                            //this tests for too many open clause
        throw 'bad tagging';
    }
    clause_region = new Region(clause_stack[0]);                //this makes our main clause
    //todo check: added clause_stack[0] to arguments of new Clause
    clause_region.add_tag(new Clause("main clause", clause_stack[0]));           //this adds a tag (i.e. a Clause object) to our newly made region
    clause_stack[0].forEach(function(x) {
        words_to_clauses[x] = clause_region;
    });
    sentence.regions.push(clause_region);
    console.log("WORDS TO CLAUSES = ", words_to_clauses);
    console.log("SENTENCE.REGIONS = ", sentence.regions);

    var clean_regions = sentence.regions.map(function(x) {
        return x.tags[0].clause_type + '=' + x.indices.map(function (z) {return word_map[z]}).join(' ')
    }).join('\n');


    console.log("CLEAN OUTPUT = ", clean_regions);


}



function process_auto_tags(words){
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word in auto_tagging_map) {
            var new_region = sentence.get_region([i + 1]);
            new_region.add_tag(new SingleRegionTag(auto_tagging_map[word]));
            console.log("TEST OF AUTO TAGGER START");
            console.log("desired index", (i + 1));
            console.log("desired word = ", auto_tagging_map[word]);
        }
    }
}


function generate_buttons() {
    var e = document.getElementById("buttons");
    console.log("tag_list = ", JSON.stringify(tag_list));
    for (var i in tag_list) {
        e.innerHTML += "<button onclick=\"submit_tag(" + i + ")\">" + tag_list[i] + "</button>"
    }
}


//create a two columned tagged box with left = tags & right = regions thusly tagged
function generate_tags() {
    var e = document.getElementById("tags");
    for (var i in tag_list) {
        var o = document.createElement("option");
        o.innerHTML = tag_list[i];
        e.appendChild(o);
    }
    e.addEventListener("change", function(x){
        //console.log(x);
        generate_regions();
    });
}

//fills the right hand side
function generate_regions() {
    var e = document.getElementById("regions");
    e.innerHTML = "";
    var dd = document.getElementById("tags");                   //dd = drop-down optios on the left hand side
    var tag = dd.options[dd.selectedIndex].value;               //tag = clikced tag in right hand box tag will be a string
    console.log("target tag = ", tag);

    for (var r in sentence.regions) {
        var cr = sentence.regions[r];           //cr = current region
        for (var t in cr.tags) {               //todo these need to be tag objects
            var ct = cr.tags[t];               //ct is an object, not a string (current tag)
            console.log(ct);
            if (ct.get_tag_type() === tag) {
                var o = document.createElement("option");
                o.innerHTML = indices_to_string(cr.get_indices());
                e.appendChild(o);
                console.log("found tag", sentence.regions[r].indices);
            }
        }
    }
}




function submit_sentence(){
    
    save(sentence);
    
}





















//OLD VERSION BELOW

//
//if (is_conj_char(c)) {
//    if (start == -1) {
//        start = pos;
//        var conjunction = c;
//        words.push(conjunction);
//        word_map[id] = conjunction;
//        x.innerHTML += "<span id=\"" + id + "\" onclick=\"click_2(event, "+id+")\">" + conjunction + "</span>";
//        id += 1;
//        start = -1;
//    }
//} else if (is_word_char(c)) {
//    if (start == -1) {
//        start = pos
//    }
//} else {
//    if (start >= 0){
//        var word = text.substring(start, pos);
//        words.push(word);
//        word_map[id] = word;
//        x.innerHTML += "<span id=\"" + id + "\" onclick=\"click_2(event, "+id+")\">" + word + "</span>";
//        id += 1;
//        start = -1;
//    }
//    x.innerHTML += c;
//}


