//var text = "A baryon is a composite subatomic particle made up of three quarks (as distinct from mesons, which are composed of one quark and one antiquark). Baryons and mesons belong to the hadron family of particles, which are the quark-based particles. The name \"baryon\" comes from the Greek word for \"heavy\" (βαρύς, barys), because, at the time of their naming, most known elementary particles had lower masses than the baryons.";
// var default_text = "The cat sings (while the dog dances).";
// var default_text = "The cat sings.";
var default_text = "the cat sings / and the dog jumps (when the bell (which my father made) rings / and the flag is lifted ) .";
// var default_text = "the poets utter wise things (which they do not understand).";
// var text = "a confucius (who lived  in a country (which we now call China) a long time ago (rich in empire and roaring with war )) said  in his book (which is called the Analects) (that revenge is a dish (which tastes best cold)).";
// var text = "the dog jumps when the bell rings.";
// var default_text = "!Confucius said: \"(When you embark on a journey of revenge,) dig two graves.\"";
//var text = "Silence is a true friend (who never betrays).";
//var text = "There was an old man (who supposed (that the street door was partially closed)) but some very large rats ate his coat and his hats, (while that futile old gentleman dozed).";
//var text = "(What we achieve inwardly) will change outer reality.";
// var text = "There was an old woman (who lived in a shoe).";


//initializing global variables

var sentence = null;

// var word_map = {};                                                          //a set of unique integer ids for each word

// var words_in_play = new Set();

var tag_list = ["noun", "verb", "subject", "object", "main clause", "subordinate clause", "adverb", "preposition", "definite article", "indefinite article", "personal pronoun", "subordinating conjunction", "coordinating conjunction"];

// var tag_map = {};

// var previous_id = null;

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

var word_selector = null;

var conjunction_characters = new Set(['<', '>', '[', ']', '{', '}', '/']);


function is_word_char (c){
    // return (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c === '');
    // apostrophe possibilities: s' || 's || 'll || 'nt || 't (ain't) ||
    return /[a-zA-Z]/.test(c);
}


function is_conj_char (c){
    return conjunction_characters.has(c);
}


////////////////////////UTILITIES ABOVE////////////
///////////////////////MASTER FUNCTION BELOW///////////

//todo uncomment this when done testing parser
//START
window.onload = function (){

    // var x = document.getElementById("box");        //an expensive operation so we assign it to a variable before the for loop

    generate_buttons();
    generate_tags();
    // we need a default_text to start with for testing, eventually, we'll replace this with an empty inout box
    new_text(default_text);

}




//FUNCTION summary
//no argument but it does have an input: entered by user into the box
//no return but calls new_text which is our master function that processes inputted text
//called by: index.html   (if keycode 13 (enter) is pressed, the text in sentence box is sent to sentence entered which processes it as new_text
function sentence_entered(){
    var text = document.getElementById("sentencebox").value;
    console.log("M: input text pasted into box at sentence_entered = ". text);
    new_text(text);
}




//FUNCTION summary
//new_text receives and auto-tags new text that gets entered (in various ways: default text or pasted into the text box)
//no return, has side-effects:
    // parses the words in the text
    // creates a new sentence with the argument text
    // setups a wordselector object with the argument text (i.e. displays the words and makes them clickable)
    // processes the text inasmuch as its able (brackets and auto-tags)
    // this auto-processing produces new regions and tags so we also update region list & subregions)
// called by: window onload & sentence_entered
function new_text(text){

    //todo is this right?
//    var words_and_non_words = parse_words(text);
//    var words = words_and_non_words[0];
//    var non_words = words_and_non_words[1];                               //destructuring assignment

	var t = new Text(text);
	t.setup();
    sentence = new Sentence(t.get_words());

    //DEBUGGING 9-9
//    console.log("DEBUG 9-9 words:", words);
    
    document.getElementById("box").innerHTML = "";
    word_selector = new WordSelector("box", t);
    word_selector.setup();
    
//    process_bracketed_text(words, non_words);
//    process_auto_tags(words);

    update_region_list();
    document.getElementById("allregions").addEventListener("change", function(x){
        update_subregions();
    });
    //M: Master flow logged below
    console.log("M: Sentence after autotagging: ", JSON.stringify(sentence));
}

//FUNCTION summary
// input: text
//returns two lists
//the basic logic:
    // keep track of two things in parallel: current & previous
    // we can use X.start > -1 to check if we've switched into a new type (switched from word to non_word & vice versa)
function parse_words (text) {
    var words = {start : -1, list : [null]};                    //we make the first value null because if the first character is a non-word, we want the non-word character to have a word to follow
    var non_words = {start : -1, list : []};

    for (var pos = 0; pos < text.length; pos ++) {
        
        var b = is_word_char(text[pos]);                        //b is a boolean: true if word, false if non_word
        var current = b ? words : non_words;                    //current has two values (words or non_words)
        var previous = b ? non_words : words;                   //this makes previous always the inverse of current
        console.log("DEBUG", b, text[pos], current, previous);

        //if our first character is a word we don't want words & non_words to be of different length so we push a null string
        //so we want to check 3 things 
        if (non_words.list.length == 0 && non_words.start == -1 && b) {
            console.log("first character = word detected");
            non_words.list.push("");
        }
        
        //if a X is in progress we need to end it & push X to X.list & reset X.start to -1
        if (previous.start > -1) {
            var sub = text.substring(previous.start, pos);
            console.log("SUB", (b ? "non_word" : "word"), previous.list.length, " = ", sub);
            previous.list.push(sub);
            previous.start = -1;
        }
        
        
        //    !Confucius
        
        //this checks if we haven't started on our current thing (i.e. if we're starting a new type)
        if(current.start == -1){
            current.start = pos;
            console.log("setting start for: ", b, (b ? "word" : "non_word"), pos);
        }

        //this checks if we've hit the terminal character. If so we push to our current.list
        if (pos == text.length - 1) {
            var sub = text.substring(current.start, pos + 1);
            console.log("DEBUGGING 9-9: text = ", text);
            console.log("SUB2 = ", sub);
            current.list.push(sub);
        }
        
    }
    
    console.log("WORDS = ", words.list);
    console.log("NON_WORDS = ", non_words.list);
    
    if (words.list.length != non_words.list.length) {
        //todo 9-9 uncomment when done testing
        console.log("ERROR: words != non_words");
        throw "words != non_words";
    }
    return [words.list, non_words.list];
}


//todo 9-9 make sure to uncomment tbis after testing
//FUNCTION summary
//input: words (list of strings)
//no return, just side effects: creates regions and adds tags to them
// function process_bracketed_text2 (words) {
//     //clause_stack is a stack of all the clauses (i.e. their indices) which haven't been processed yet
//     //type = list of lists of indices
//     var clause_stack = [[]];

//     //clause_region is the region which we will end up pushing to sentence.regions
//     var clause_region;

//     // yesterday, ((the dog) whatever)
//     // 0    | 0         | 14  | 18  |
//     // null | yesterday | the | dog | whatever
//     //      | ,_((      | _   | )_  | )


//     //get a reference to every initial index
//     //iterate only through those indices
//     //create a function that counts occurences of a  character
//     //be careful that i will be +1 when you hit a (


//     for (var i = 0; i < words.length; i++) {
//         //console.log("CLAUSE STACK = ", JSON.stringify(clause_stack));
//         //we cant just equality bc it might be "(
//         //so we need to see if non_words containsthe metacharacter
//         //we can't check for just occuring in, because we can have ((
//         //solution is st like count opens, and count closes
//         var count  = count('(', non_words[i]);

//         if (count > 0) {
//             //a subordinate clause has been detected so we want to add it to the clause stack
//             //so we create an empty list [] and push it to the stack
//             for(  count times  ){
//                 clause_stack.push([]);
//             }
//         } else {
//             //but we might have hit a closed bracket, meaning a clause has ended
//             //in which case we want to close a clause
//             //and we want to remove the clause that just closed from the clause stack
//             //and we want to make a new region with region.clause = the clause we just removed
//             //in other words, wehn we hit a close bracket we want to assign the clause region and throw it out of the stack because the stack is for current clauses
//             if (word_selector.words[i] === ')') {
//                 var y = clause_stack.pop();                 //this does two things at once, return y and pops
//                 if (clause_stack.length !== 0) {            //when clause_stack.length == 0 we have a problem because we've ended the main clause with a close bracket

//                     // clause_region = new Region(y);
//                     // clause_region.make_clause('subordinate clause');
//                     // y.forEach(function(x) {                         //we iterate over the indices and populate the map of words to clauses
//                     //     words_to_clauses[x] = clause_region;
//                     // });
//                     // sentence.regions.push(clause_region);           //we want our new clause (that just closed) to be in sentence

//                     //TODO CHECKPOINT 2
//                     //old below
//                     //sentence.get_region(y).add_tag(new SubordinateClause());

//                     //NEW BELOW
//                     var new_region = sentence.get_region(y);
//                     new_region.add_tag(new SubordinateClause());

//                     //quick and dirty check
//                     // new_region.tags[0].indices = y;



//                     //we want to update our words_to_clauses
//                     y.forEach(function(x) {                         //we iterate over the indices and populate the map of words to clauses
//                         words_to_clauses[x] = new_region;
//                     });
//                     //sentence.regions.push(new_region);            //we don't need this because get_region pushes a region

//                     //todo END CHECKPOINT 2


//                 } else {                                        //this is a case with too many closing brackets
//                     throw "bad tagging";
//                 }
//             }
//             else {
//                 //no subordinate clause has been detected
//                 //so we want to push our new word (i.e. an index) into the current clause (i.e. the top item of the clause_stack)
//                 peek(clause_stack).push(i);
//             }
//         }
//     }
//     if (clause_stack.length !== 1) {                            //this tests for too many open clause
//         throw 'bad tagging';
//     }
//     clause_region = new Region(clause_stack[0]);                //this makes our main clause
//     //todo check: added clause_stack[0] to arguments of new Clause
//     clause_region.add_tag(new Clause("main clause", clause_stack[0]));           //this adds a tag (i.e. a Clause object) to our newly made region
//     clause_stack[0].forEach(function(x) {
//         words_to_clauses[x] = clause_region;
//     });
//     sentence.regions.push(clause_region);
//     console.log("WORDS TO CLAUSES = ", words_to_clauses);
//     console.log("SENTENCE.REGIONS = ", sentence.regions);

//     var clean_regions = sentence.regions.map(function(r) {
//         return r.tags[0].clause_type + '=' + r.get_indices().map(function (z) {return word_selector.words[z]}).join(' ')
//     }).join('\n');


//     console.log("CLEAN OUTPUT = ", clean_regions);
// }


function process_bracketed_text (words, non_words) {
    //clause_stack is a stack of all the clauses (i.e. their indices) which haven't been processed yet
    //type = list of lists of indices
    var clause_stack = [[]];

    //when open count > close count
        //
    //when open count < close count
    //when open count = close count
    
    
    //we iterate through non_words list
    //if non_words[i] has a open bracket, we start to push words[i+1]
    
    // yesterday, ((the dog) whatever)
    // 0    | 0         | 14  | 18  |
    // null | yesterday | the | dog | whatever
    // 
    //| ,_((      | _   | )_  | )

    // yesterday, (i saw (the dog) whatever) (AA())
    // 0    | 0         | 14  | 18  |
    // null | yesterday | the | dog | whatever
    //      | ,_((      | _   | )_  | )

    // (if the dog sleeps) the cat dances

    // 0    | 1  | 2   | 3   | 4      | 5   | 6   | 7
    // null | if | the | dog | sleeps | the | cat | dances
    // (    |    |     |     | )      |     |     |

    //create a function that counts occurences of a  character
    //be careful that i will be +1 when you hit a (

        //console.log("CLAUSE STACK = ", JSON.stringify(clause_stack));
        //we cant just equality bc it might be "(
        //so we need to see if non_words containsthe metacharacter
        //we can't check for just occuring in, because we can have ((
        //solution is st like count opens, and count closes
        // var open_count  = count('(', non_words[i]);
        // var close_count = count(')', non_words[i]);

        // if (open_count > 0 && open_count > close_count) {               //we have a subordinate clause we need to deal with
        //     //a subordinate clause has been detected so we want to add it to the clause stack
        //     //so we create an empty list [] and push it to the stack
        //     for(  count times  ){
        //         clause_stack.push([]);
        //     }
        // } else {
            //but we might have hit a closed bracket, meaning a clause has ended
            //in which case we want to close a clause
            //and we want to remove the clause that just closed from the clause stack
            //and we want to make a new region with region.clause = the clause we just removed
            //in other words, wehn we hit a close bracket we want to assign the clause region and throw it out of the stack because the stack is for current clauses


    for (var i = 0; i < non_words.length; i++) {

        //push a word is always our first step
        //but we don't want to count it towards a region
        if(i != 0){
            peek(clause_stack).push(i);
        }

        var non_word = non_words[i];

        for(var ci = 0; ci < non_word.length; ci++){
            
            var c = non_word[ci];
            
            if(c === '('){
                
                clause_stack.push([]);
                
            } else if (c === ')') {
                
                var y = clause_stack.pop();                 //this does two things at once, return y and pops
                if (clause_stack.length !== 0) {            //when clause_stack.length == 0 we have a problem because we've ended the main clause with a close bracket

                    var new_region = sentence.get_region(y);
                    new_region.add_tag(new SubordinateClause());

                    //quick and dirty check
                    // new_region.tags[0].indices = y;



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

    if (clause_stack.length !== 1) {                            //this tests for too many open clauses
        throw 'bad tagging';
    }
    
    //clause_region is the region which we will end up pushing to sentence.regions
    var clause_region = new Region(clause_stack[0]);                //this makes our main clause
    //todo check: added clause_stack[0] to arguments of new Clause
    clause_region.add_tag(new Clause("main clause", clause_stack[0]));           //this adds a tag (i.e. a Clause object) to our newly made region
    clause_stack[0].forEach(function(x) {
        words_to_clauses[x] = clause_region;
    });
    sentence.regions.push(clause_region);
    console.log("WORDS TO CLAUSES = ", words_to_clauses);
    console.log("SENTENCE.REGIONS = ", sentence.regions);

    var clean_regions = sentence.regions.map(function(r) {
        return r.tags[0].clause_type + '=' + r.get_indices().map(function (z) {return word_selector.words[z]}).join(' ')
    }).join('\n');


    console.log("CLEAN OUTPUT = ", clean_regions);
}


//FUNCTION summary
//input: words (strings)
//no return, just side effects: creates regions and adds tags to them
function process_auto_tags(words){
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word in auto_tagging_map) {
            var new_region = sentence.get_region([i]);
            new_region.add_tag(new SingleRegionTag(auto_tagging_map[word]));
            //console.log("TEST OF AUTO TAGGER START");
            //console.log("desired index", (i));
            //console.log("desired word = ", auto_tagging_map[word]);
        }
    }
}



//called by: generate_buttons() - but where is generate_buttons called?
function submit_tag(tag_type){
    
    var tag = new SingleRegionTag(tag_list[tag_type]);
    console.log("submit tag triggered here");
    console.log("TEST OF tag type", tag, word_selector.highlighted_words.size, word_selector.highlighted_words.values());

    var indices = word_selector.get_selected_indices();                                                                //indices = highlighted words
    console.log(indices);
    var region = sentence.get_region(indices);                                                              //make a region to hold the tags
    if (region != undefined && region != null) {
        console.log("ADDING TAG ", tag);
        region.add_tag(tag);
        update_region_list();
        //todo additions below
        //if (tag.indexOf("clause") !== -1) {
        //    region.make_clause(tag);
        //}
    }
    console.log(sentence);
    word_selector.clear();
    // debug(indices);
    
}



//creates the 1st column, a list of tags
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

//fills the right hand side of the 2nd column
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
                o.innerHTML = word_selector.get_text(cr.get_indices());
                e.appendChild(o);
                console.log("found tag", sentence.regions[r].get_indices());
            }
        }
    }
}


function update_region_list(){
    
    var e = document.getElementById("allregions");
    e.innerHTML = "";
    
    for(var i in sentence.regions){
        
        var r = sentence.regions[i];
        var o = document.createElement("option");
        o.innerHTML = region_to_text(r);
        e.appendChild(o);
        console.log(i, r);
        
    }
    
}


function update_subregions(){
    var e = document.getElementById("subregions");
    e.innerHTML = "";

    var dd = document.getElementById("allregions");         //dd = drop-down optios on the left hand side
    if (dd.selectedIndex < 0) {
        return;
    }
    var region = sentence.regions[dd.selectedIndex]; 
                     
    console.log(region, sentence);
    var subregion = sentence.get_sub_regions(region);
    
    for(var i in subregion){
        var o = document.createElement("option");
        o.innerHTML = region_to_text(subregion[i]);
        e.appendChild(o);
    }
    
    // select words in the gui
    var is = region.get_indices();
    word_selector.clear();
    for(var i in is){
        word_selector.set_highlighted(is[i], true);
    }
    
}


//todo 9-9 below is rather specific, should be made more general (should it be made a method in the Region object?)
//FUNCTION summary
//input = region
//return = string ("text = tags")
//called by: update_subregions (which populates the columns of the explorer)
function region_to_text(region){
    var text = word_selector.get_text(region.get_indices());
    var tags = region.tags.map(function(x){ return x.get_tag_type(); }).join(", ");
    return text + " = " + tags;
}





////////////////////
//maybe move these below functions somewhere else, like a .js file that just deals with gui functionality

//FUNCTION summary
// strictly HTML setup & possibly obsolete (not called anywhere)
// no input
//no return, just side effects: mutates the HTML
//called by: window onload
function generate_buttons() {
    var e = document.getElementById("buttons");
    console.log("tag_list = ", JSON.stringify(tag_list));
    for (var i in tag_list) {
        e.innerHTML += "<button onclick=\"submit_tag(" + i + ")\">" + tag_list[i] + "</button>"
    }
}



//FUNCTION summary
//no input, no return, just side effects: clears all tags on the highlighted word
//called by: the delete tag button on the html page
function delete_tags(){
    var indices = word_selector.get_selected_indices();
    var region = sentence.get_region(indices);
    region.clear_tags();
    update_region_list();
    update_subregions();
}

//FUNCTION summary
//no input, calls save which has no return, just side effects: appends a child to firebase
//called by: the submit button on the html page
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




function debug(indices){
    

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

    console.log("Subject of clause below (9-7)  = ", word_selector.get_text([clause.subject]));
    console.log("Object of clause below = ", word_selector.get_text([clause.object]));
    console.log("Verb of clause below = ", word_selector.get_text([clause.verb]));
    console.log("Clause = ", word_selector.get_text(clause.get_indices()));
    console.log("clause type of clause = ", clause.clause_type);


    console.log("CHECKPOINT 1A complete");


    console.log("WORDS in play after clear", word_selector.highlighted_words.size);

    console.log("REGION + TAGS", JSON.stringify(region));
    console.log("REGION SUMMARY");
    // console.log("words = ", indices.map(function (x) {return word_map[x]}).join(' '));
    console.log("indices = ", JSON.stringify(region.get_indices()));
    console.log("tags = ", JSON.stringify(region.tags));
    if (region.clause) {
        console.log("clause_type = ", JSON.stringify(region.clause.clause_type));
    }


}