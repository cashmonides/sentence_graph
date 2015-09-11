
var test_sentences = [

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
var tag_list = ["noun", "verb", "subject", "object", "main clause", "subordinate clause", "adverb", "preposition", "definite article", "indefinite article", "personal pronoun", "subordinating conjunction", "coordinating conjunction"];

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

	var t = new Text(text);
	t.setup();
    sentence = new Sentence(t.get_words());

    autotag(t, sentence);

    document.getElementById("box").innerHTML = "";
    word_selector = new WordSelector("box", t);
    t.word_selector = word_selector;
    word_selector.setup();

    update_region_list();
    document.getElementById("allregions").addEventListener("change", function(x){
        update_subregions();
    });
    //M: Master flow logged below
    console.log("M: Sentence after autotagging: ", JSON.stringify(sentence));
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

	set_dropdown("tags", tag_list);

    document.getElementById("tags").addEventListener("change", function(x){
        generate_regions();
    });

}

//fills the right hand side of the 2nd column
function generate_regions() {

    var dd = document.getElementById("tags");                   //dd = drop-down optios on the left hand side
    if(dd.selectedIndex < 0){
    	return;
    }
    var tag = dd.options[dd.selectedIndex].value;               //tag = clikced tag in right hand box tag will be a string
    console.log("target tag = ", tag);

	var rs = [];
    for (var r in sentence.regions) {
    	var cr = sentence.regions[r];
    	var tag_types = cr.get_tag_types();
    	if(contains(tag_types, tag)){
    		rs.push(cr);
    	}
    }

    set_dropdown("regions", rs, function(x){ return word_selector.get_text(x.get_indices()); });

}


function update_region_list(){
	set_dropdown("allregions", sentence.regions, function(x){ return region_to_text(x); });
}


function update_subregions(){

    var dd = document.getElementById("allregions");         //dd = drop-down optios on the left hand side
    if (dd.selectedIndex < 0) {
        return;
    }
    var region = sentence.regions[dd.selectedIndex]; 
                     
    console.log(region, sentence);
    var subregions = sentence.get_sub_regions(region);

	set_dropdown("subregions", subregions, function(x){ return region_to_text(x); });

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
