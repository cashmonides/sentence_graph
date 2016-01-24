
var test_sentences = [
    "( What we wish ), we readily believe, / and ( what we ourselves think ), we imagine ( others think also ).",
	"the cat sings / and the dog jumps (when the bell (which my father made) rings / and the flag is lifted ) .",
	"A baryon is a composite subatomic particle made up of three quarks (as distinct from mesons, which are composed of one quark and one antiquark). Baryons and mesons belong to the hadron family of particles, which are the quark-based particles. The name \"baryon\" comes from the Greek word for \"heavy\" (βαρύς, barys), because, at the time of their naming, most known elementary particles had lower masses than the baryons.",
	"The cat sings (while the dog dances).",
	"The cat sings.",
	"the poets utter wise things (which they do not understand).",
	"a confucius (who lived  in a country (which we now call China) a long time ago (rich in empire and roaring with war )) said  in his book (which is called the Analects) (that revenge is a dish (which tastes best cold)).",
	"the dog jumps when the bell rings.",
	"!Confucius said: \"(When you embark on a journey of revenge,) dig two graves.\"",
	"Silence is a true friend (who never betrays).",
	"There was an old man (who supposed (that the street door was partially closed)) but some very large rats ate his coat and his hats, (while that futile old gentleman dozed).",
	"(What we achieve inwardly) will change outer reality.",
	"There was an old woman (who lived in a shoe)."

];

//initializing global variables
var tag_list = ["noun", "verb", "subject", "object", "main clause", "subordinate clause", "coordinate clause", "adverb",
    "preposition", "definite article", "indefinite article", "personal pronoun", "subordinating conjunction",
    "coordinating conjunction"];

var implied_tags = {
    "subject": "noun",
    "object": "noun",
    "personal pronoun": "pronoun",
    "relative pronoun": "pronoun",
    "definite article": "article",
    "indefinite article": "article"
};


//todo down the road, when substantives are learned
//if word or answer is substantive:
//adjective : subject, object, predicate, substantive
//substantive: subject, object, predicate, adjective
//etc/

//another option: create a distinct tag for substantive-subject, etc.

var non_contradictory_tag_map = {
    "subject": ["noun", "pronoun", "personal pronoun", "relative pronoun"],
    "object": ["noun", "pronoun", "personal pronoun", "relative pronoun"],
    "predicate": ["noun", "pronoun", "adjective", "personal pronoun", "relative pronoun"],
    "noun": ["pronoun", "personal pronoun", "relative pronoun", "subject", "object", "predicate"],
    "adjective": ["predicate"],
    "personal pronoun": ["subject", "object", "predicate", "noun", "pronoun"],
    "relative pronoun": ["subject", "object", "predicate", "noun", "pronoun"],
    "pronoun": ["subject", "object", "predicate", "noun", "personal pronoun", "relative pronoun"],
    "definite article": ["article"],
    "indefinite article": ["article"],
    "article": ["definite article", "indefinite article"],
}

var sentence = null;
var word_selector = null;

//START
window.onload = function (){

    generate_buttons();
    generate_tags();
    // we need a default_text to start with for testing, eventually, we'll replace this with an empty inout box
    new_text(test_sentences[0]);

}




//FUNCTION summary
//no argument but it does have an input: entered by user into the box
//no return but calls new_text which is our master function that processes inputted text
//called by: index.html   (if keycode 13 (enter) is pressed, the text in sentence box is sent to sentence entered which processes it as new_text
function sentence_entered(){
    var text = el("sentencebox").value;
    //console.log"M: input text pasted into box at sentence_entered = ". text);
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

	var t = new Text(text);
	t.setup();
    sentence = new Sentence(t.get_words(), text);

    autotag(t, sentence);

    el("box").innerHTML = "";
    word_selector = new WordSelector("box", t);
    word_selector.setup();
    show_untagged_words();

    update_region_list();
    el("allregions").addEventListener("change", function(x){
        update_subregions();
    });
    //M: Master flow logged below
    //console.log("M: Sentence after autotagging: ", JSON.stringify(sentence));
}


//argument: string ('latin' 'english')
//returns: a side effect
function set_sentence_language(language_of_sentence) {
    sentence.language_of_sentence = language_of_sentence;
}

// arguments: none
// returns: a side effect (adds "untagged" to the class name of untagged words)
function show_untagged_words() {
    var words = sentence.words;
    for (var i = 0; i < words.length; i++){
        if (sentence.get_region([i]).get_tags().length == 0) {
            var e = el(i);
            e.className += " untagged";
            //console.log("untagged word", words[i]);
        }
    }
}

// called by: generate_buttons()
// argument is an integer (i.e. an index in the tag list)
function submit_tag(tag_type){
    var tag_type_as_string = tag_list[tag_type];
    var tag = new SingleRegionTag(tag_type_as_string);
    //console.log("submit tag triggered here");
    //console.log("TEST OF tag type", tag, word_selector.highlighted_words.size, word_selector.highlighted_words.values());

    var indices = word_selector.get_selected_indices();                                                                //indices = highlighted words
    //console.log(indices);
    var region = sentence.get_region(indices);                                                              //make a region to hold the tags
    if (region != undefined && region != null) {
        
        //checking for contradictory tags
        var tag_types_to_keep = non_contradictory_tag_map[tag_type_as_string] || [];
        console.log('tag_types_to_keep =', tag_types_to_keep);
        region.remove_tags_not_in_list(tag_types_to_keep);
        //console.log"ADDING TAG ", tag);
        region.add_tag(tag);
        
        //checking for implied tags (a subject tag implies a noun tag)
        if (tag_type_as_string in implied_tags) {
            var implied_tag = new SingleRegionTag(implied_tags[tag_type_as_string]);
            region.add_tag(implied_tag);
        }
        region.remove_duplicate_tags();
        
        update_region_list();
        //todo additions below
        //if (tag.indexOf("clause") !== -1) {
        //    region.make_clause(tag);
        //}
    }
    //console.logsentence);
    // console.log('I, 1, am responcible.')
    console.log('submit_tag has been called');
    console.log('word selector is', word_selector);
    word_selector.clear();
    // debug(indices);
    
}



//creates the 1st column, a list of tags
function generate_tags() {

	set_dropdown("tags", tag_list);

    el("tags").addEventListener("change", function(x){
        generate_regions();
    });

}

//fills the right hand side of the 2nd column
function generate_regions() {

    var dd = el("tags");                   //dd = drop-down optios on the left hand side
    if(dd.selectedIndex < 0){
    	return;
    }
    var tag = dd.options[dd.selectedIndex].value;               //tag = clikced tag in right hand box tag will be a string
    //console.log"target tag = ", tag);

	var rs = sentence.get_regions().filter(function(r){
		return contains(r.get_tag_types(), tag);
	});

    set_dropdown("regions", rs, function(x){ return word_selector.get_text(x.get_indices()); });

}


function update_region_list(){
	set_dropdown("allregions", sentence.regions, function(x){ return region_to_text(x); });
}


function update_subregions(){

    var dd = el("allregions");         //dd = drop-down options on the left hand side
    if (dd.selectedIndex < 0) {
        return;
    }
    var region = sentence.regions[dd.selectedIndex]; 
                     
    //console.logregion, sentence);
    var subregions = sentence.get_sub_regions(region);

	set_dropdown("subregions", subregions, function(x){ return region_to_text(x); });

    // select words in the gui
    var is = region.get_indices();
    // console.log('I, 2, am responcible.')
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
    var tags = region.get_tag_types().join(", ");
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
    var e = el("buttons");
    //console.log"tag_list = ", JSON.stringify(tag_list));
    for (var i = 0; i < tag_list.length; i++) {
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

function clear_all_highlights() {
    // console.log('I, 3, am responcible.')
    word_selector.clear();
}



function set_sentence_difficulty_level (level) {
    sentence.difficulty_level = level;
    
    
}

//FUNCTION summary
//no input, calls save which has no return, just side effects: appends a child to firebase
//called by: the submit button on the html page
function submit_sentence(){
    if (sentence.language_of_sentence == null) {
        alert("no language specified");
    } else {
        console.log("sentence submitted");
        console.log('sentence.language_of_sentence =', sentence.language_of_sentence);
        console.log("sentence.difficulty_level = ", sentence.difficulty_level);
        Sentence.save(sentence);
    }
}
