var test_sentences = [
    "Rex iubeat ut nauta reginam timeat."
];

//initializing global variables
// var tag_list_real = ["noun", "verb", "subject", "object", "predicate", "adjective", "adverb", 
//     "preposition", "main clause", "subordinate clause", "coordinate clause",
//     "definite article", "indefinite article", "personal pronoun", "subordinating conjunction",
//     "coordinating conjunction",
    
//     ];

var get_tag_list_maker = function () {
    var tag_list = null;
    return function () {
        if (tag_list === null) {
            tag_list = [];
            var s;
            var item;
            for (var i = 0; i < noun_drop_down_types.length; i++) {
                item = noun_drop_down_types[i];
                s = syntax_module_filter.noun_syntax[item];
                for (var j in s) {
                    tag_list.push('n=' + j);
                }
            }
            for (var i = 0; i < verb_drop_down_types.length; i++) {
                item = verb_drop_down_types[i]
                s = syntax_module_filter.verb_syntax[item]
                for (var j in s) {
                    tag_list.push(item[0] + '=' + j);
                }
                if (should_have_non_applicable(item)) {
                    tag_list.push(item[0] + '=' + 'not applicable');
                }
            }
        }
        
        return tag_list;
    }
}

var get_tag_list = get_tag_list_maker();

/*
//a test list with new variables
var tag_list = [
// "noun", "verb", "subject", "object", "predicate", "adjective", "adverb", "preposition", "main clause", "subordinate clause", "coordinate clause", "definite article", "indefinite article", "personal pronoun", "subordinating conjunction", "coordinating conjunction", 
"n=subject nominative", 
"n=predicate nominative", 
"n=genitive of the charge", 
"n=genitive of the penalty", 
"n=partitive genitive", 
"n=genitive of description", 
"n=subjective genitive", 
"n=objective genitive", 
"n=genitive of characteristic (aka predicate)", 
"n=genitive of the source of the feeling with an impersonal verb of emotional distress", 
"n=genitive of the person concerned with interest/rēfert", 
"n=genitive with causā to express purpose", 
"n=genitive of indefinite value", 
"n=genitive with expression of memory", 
"n=dative of possessor", 
"n=dative of agent with passive periphrastic", 
"n=predicate dative", 
"n=dative of reference with a predicate dative", 
"n=dative with certain intransitive verbs", 
"n=dative with compound verbs", 
"n=dative of reference with an impersonal verb", 
"n=accusative direct object", 
"n=predicate accusative", 
"n=subject accusative of an indirect statement", 
"n=accusative of place to which", 
"n=accusative of duration of time", 
"n=accusative of extent of space", 
"n=accusative of exclamation", 
"n=subject accusative of an infinitive not in indirect statement", 
"n=accusative of the gerund to express purpose with a verb of motion", 
"n=accusative of the feeler of the feeling with an impersonal verb of emotional distress", 
"n=accusative of the [gerund/gerundive] with ad to show purpose", 
"n=accusative of the supine to express purpose", 
"n=adverbial accusative", 
"n=accusative direct object of a verb in the middle voice", 
"n=accusative of respect", 
"n=ablative of means", 
"n=ablative of manner", 
"n=ablative of personal agent", 
"n=ablative of separation", 
"n=ablative of origin", 
"n=ablative of place from which", 
"n=ablative of accompaniment", 
"n=ablative of time when", 
"n=ablative of time within which", 
"n=ablative of respect", 
"n=ablative of comparison", 
"n=ablative of degree of difference", 
"n=ablative subject in an ablative absolute", 
"n=ablative predicate in an ablative absolute", 
"n=ablative of description", 
"n=ablative of cause",
"n=ablative of possessive adjective agreeing with rē in rēfert",
"n=ablative of possessive adjective agreeing with ellipsed rē with interest by analogy with rēfert", 
"n=ablative of the supine to express respect", 
"n=ablative of price",

"n=subject infinitive", 
"n=object infinitive", 
"n=complementary infinitive", 

"t=present", "t=imperfect", "t=future", "t=perfect", "t=pluperfect", "t=future_perfect",

"m=indicative", "m=subjunctive", "m=infinitive",

"c=protasis/apodosis of a future more vivid conditional sentence", 
"c=protasis/apodosis of a future more vivid conditional sentence with emphatic protasis", 
"c=protasis/apodosis of a future less vivid conditional sentence", 
"c=protasis/apodosis of a present contrary to fact conditional sentence",
"c=protasis/apodosis of a past contrary to fact conditional sentence", 
"c=protasis/apodosis of a mixed contrary to fact conditional sentence", 
"c=jussive", 
"c=present deliberative", 
"c=past deliberative", 
"c=present potential", 
"c=past potential", 
"c=hortatory", 
"c=present optative - wish capable of fulfillment", 
"c=present optative - wish incapable of fulfillment", 
"c=past optative - wish incapable of fulfillment", 
"c=purpose clause", 
"c=indirect command", 
"c=subordinate clause in indirect statement", 
"c=indirect question", 
"c=result clause", 
"c=substantive ut clause", 
"c=relative clause of characteristic", 
"c=relative clause of result", 
"c=relative clause of purpose", 
"c=relative clause of purpose introduced by a relative adverb", 
"c=purpose clause introduced by quō + comparative", 
"c=cum circumstantial clause", 
"c=cum concessive clause",
"c=cum causal clause", 
"c=proviso clause", 
"c=fear clause", 
"c=doubting clause", 
"c=prevention clause", 
"c=by attraction", 
"c=fore ut clause", 
"c=indirect statement",


"s=primary", 
"s=secondary",
"s=not applicable",

"r=simultaneous time", 
"r=prior time", 
"r=subsequent time", 
"r=breaking sequence to emphasize actuality of result",
"r=not applicable"
];

*/



var implied_tags = {
    "subject": "noun",
    "object": "noun",
    "predicate": "noun",
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

// var non_contradictory_tag_map = {
//     "subject": ["noun", "pronoun", "personal pronoun", "relative pronoun"],
//     "object": ["noun", "pronoun", "personal pronoun", "relative pronoun"],
//     "predicate": ["noun", "pronoun", "adjective", "personal pronoun", "relative pronoun"],
//     "noun": ["pronoun", "personal pronoun", "relative pronoun", "subject", "object", "predicate"],
//     "adjective": ["predicate"],
//     "personal pronoun": ["subject", "object", "predicate", "noun", "pronoun"],
//     "relative pronoun": ["subject", "object", "predicate", "noun", "pronoun"],
//     "pronoun": ["subject", "object", "predicate", "noun", "personal pronoun", "relative pronoun"],
//     "definite article": ["article"],
//     "indefinite article": ["article"],
//     "article": ["definite article", "indefinite article"],
// }

var sentence = null;
var word_selector = null;

//START
window.onload = function (){
    //generate_buttons();
    init_drop_downs();
    // generate_tags();
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

    // autotag(t, sentence);

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

var verb_drop_down_types = ['tense', 'mood', 'construction', 'sequence', 'relative time'];

var noun_drop_down_types = ['nominative', 'genitive', 'dative',
'accusative', 'ablative', 'infinitive'];


//argument: string ('latin' 'english')
//returns: a side effect
function set_sentence_language(language_of_sentence) {
    console.log('language set to ' + language_of_sentence);
    sentence.language_of_sentence = language_of_sentence;
}

var is_a = function (x) {
    if (noun_drop_down_types.indexOf(x) !== -1) {
        return function (y) {
            return y.slice(2) in syntax_module_filter.noun_syntax[x];
        }
    } else {
        return function (y) {
            return x[0] === y[0];
        }
    }
}

function options_for (x) {
    return get_tag_list().filter(is_a(x)).map(function (y) {return y.slice(2)});
}

function init_drop_downs () {
    var d = get_all_drop_down_types();
    for (var i = 0; i < d.length; i++) {
        create_html_drop_down(d[i], [d[i].toUpperCase()].concat(options_for(d[i])));
    }
}

function reset_drop_downs () {
    var d = get_all_drop_down_types();
    for (var i = 0; i < d.length; i++) {
        el('select_element' + i).selectedIndex = 0;
    }
}

function get_all_drop_down_types () {
    return verb_drop_down_types.concat(noun_drop_down_types);
}

function get_drop_down_index_of (x) {
    return get_all_drop_down_types().indexOf(x);
}

function create_html_drop_down (header, options) {
    var where_to_add = 'tagger_drop_downs';
    var number = get_drop_down_index_of(header);
    make_drop_down_html(options, where_to_add, number);
    el('select_element' + number).role = header;
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
function submit_tag (tag_type) {
    var tag_type_as_string = tag_type;
    var tag = new SingleRegionTag(tag_type_as_string);
    //console.log("submit tag triggered here");
    //console.log("TEST OF tag type", tag, word_selector.highlighted_words.size, word_selector.highlighted_words.values());

    var indices = word_selector.get_selected_indices();                                                                //indices = highlighted words
    //console.log(indices);
    var region = sentence.get_region(indices);                                                              //make a region to hold the tags
    if (region != undefined && region != null) {
        
        //checking for contradictory tags
        // var tag_types_to_keep = non_contradictory_tag_map[tag_type_as_string] || [];
        // console.log('tag_types_to_keep =', tag_types_to_keep);
        // region.remove_tags_not_in_list(tag_types_to_keep);
        //console.log"ADDING TAG ", tag);
        region.add_tag(tag);
        //checking for implied tags (a subject tag implies a noun tag)
        // if (tag_type_as_string in implied_tags) {
        //    var implied_tag = new SingleRegionTag(implied_tags[tag_type_as_string]);
        //    region.add_tag(implied_tag);
        //}
        region.remove_duplicate_tags();
        
        update_region_list();
        
        console.log('final region', region,
        region.tags, region.tags.length);
        //todo additions below
        //if (tag.indexOf("clause") !== -1) {
        //    region.make_clause(tag);
        //}
    }
    //console.logsentence);
    // console.log('I, 1, am responcible.')
    console.log('submit_tag has been called');
    console.log('word selector is', word_selector);
    // word_selector.clear();
    // debug(indices);
    
}


/*
// This code seems to be broken or unused. Either way we can comment it.
//creates the 1st column, a list of tags
function generate_tags() {

	set_dropdown("tags", get_tag_list());

    el("tags").addEventListener("change", function(x){
        generate_regions();
    });

}
*/

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
    var tag_list = get_tag_list();
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

function reset_all () {
    word_selector.clear();
    reset_drop_downs();
}

function submit_verb_tags () {
    submit_tag('verb');
    for (var i = 0; i < verb_drop_down_types.length; i++) {
        choice = selected_option(el('select_element' + i));
        if (choice === verb_drop_down_types[i].toUpperCase()) {
            continue;
        }
        text = verb_drop_down_types[i][0] + '=' + choice;
        submit_tag(text);
    }
}

function submit_noun_tags () {
    submit_tag('noun');
    for (var i = 0; i < noun_drop_down_types.length; i++) {
        choice = selected_option(el('select_element' + (
            verb_drop_down_types.length + i)));
        if (choice === noun_drop_down_types[i].toUpperCase()) {
            continue;
        }
        submit_tag(choice);
    }
}

function local_submit_sentence(){
    console.log("local sentence submitted");
    var choice;
    var text;
    var verb_drops_on = 0;
    for (var i = 0; i < verb_drop_down_types.length; i++) {
        if (el('select_element' + i).selectedIndex !== 0) {
            verb_drops_on++;
        }
    }
    
    var noun_drops_on = 0;
    for (var i = 0; i < noun_drop_down_types.length; i++) {
        if (el('select_element' + (verb_drop_down_types.length + i)).
        selectedIndex !== 0) {
            noun_drops_on++;
        }
    }
    if (verb_drops_on && noun_drops_on) {
        alert('It looks like you\'ve selected options for ' +
        'a verb and a noun at the same time.');
    } else if (verb_drops_on) {
        submit_verb_tags();
        reset_all();
    } else if (noun_drops_on) {
        if (noun_drops_on !== 1) {
            alert('It looks like you selected more than one option for a noun.');
        } else {
            submit_noun_tags();
            reset_all();
        }
    } else {
        alert('It looks like you didn\'t select anything.');
    }
}

//FUNCTION summary
//no input, calls save which has no return, just side effects: appends a child to firebase
//called by: the submit button on the html page
function global_submit_sentence(){
    console.log('sentence =', sentence);
    var sentence_chapter = el("chapter_number_box").value;
    var sentence_number = el("sentence_number_box").value;
    if (sentence.language_of_sentence == null) {
        alert("no language specified");
    /*
    } else if (isNaN(sentence_chapter) || sentence_chapter === 0) {
        alert("no chapter specified");
    } else if (isNaN(sentence_number) || sentence_number === 0) {
        alert('no sentence number specified');
    }
    */
    } else if (/[\.\-\/]/g.exec(sentence_chapter)) {
        alert("chapter specified contains dash, period, or slash");
    } else if (/[\.\-\/]/g.exec(sentence_number)) {
        alert('no sentence number specified');
    } else if (sentence.has_region([])) {
        alert('empty region detected, please do sentence again');
    } else {
        sentence.chapter = sentence_chapter;
        sentence.number = sentence_number;
        console.log("sentence submitted");
        console.log('sentence =', sentence);
        console.log('sentence.language_of_sentence =', sentence.language_of_sentence);
        Persist.push(["sentence_mf"], JSON.stringify(sentence), function () {});
    }
}

var generate_tag_report = function (tag) {
    tag = tag.type;
    if (tag.indexOf('=') === -1) {
        return tag;
    } else {
        return tag_first_to_type[tag.split('=')[0]] + '=' + tag.split('=')[1];
    };
}

var generate_region_report = function (x, sentence_words) {
    console.log(x);
    return x.indices.map(function (i) {return sentence_words[i]}).join(' ')
    + ': ' + x.tags.map(generate_tag_report).join(', ');
}

var generate_all_regions_report = function (sentence_regions, sentence_words) {
    return sentence_regions.sort(raw_region_sort).map(with_tags).
    filter(has_tags).map(function (x) {
        return generate_region_report(x, sentence_words);
    });
}

var generate_report_for_sentence = function (sentence_id, sentence, id) {
    return {
        'sentence': sentence_id.replace(/[\.\-\/]/g, '.'),
        'text': sentence.text,
        'tag_map': generate_all_regions_report(sentence.regions, sentence.words),
        'id': id
    }
}

/*
Syntax report form, from program notes.
{
    sentence: 2.1
    text: nauta reginam timet
    tag_map: {
        nauta: noun, nominative subject
        timet: verb, present subju.... 
}
*/

var generate_syntax_report = function () {
    get_syntax_questions(function (x) {
        var d = Object.keys(x).sort(sentence_sort).map(function (i) {
            return generate_report_for_sentence(i, x[i].data, x[i].id);
        });
        var text = JSON.stringify(d, null, 4);
        el('syntax_report').innerHTML = text;
    });
}

var get_noun_answer_report = function (x, t) {
    if (x.given === t.toUpperCase()) {
        // Now it's presumably just an issue of not selecting anything.
        if (x.correct === 'not applicable') {
            return [];
        } else {
            return 'correct: ' + x.correct;
        }
    } else {
        if (x.correct === 'not applicable') {
            return 'given: ' + x.given;
        } else if (x.correct === x.given) {
            return 'match: ' + x.correct;
        } else {
            return ['correct: ' + x.correct, 'given: ' + x.given];
        }
    }
}

var get_verb_answer_report = function (x) {
    if (x.given === x.correct) {
        return 'match: ' + x.correct;
    } else {
        return ['correct: ' + x.correct, 'given: ' + x.given];
    }
}

var generate_attempt_report = function (x) {
    var v;
    if ('tense' in x) {
        v = verb_drop_down_types.map(function (t) {
            return get_verb_answer_report(x[t]);
        });
    } else if ('nominative' in x) {
        v = noun_drop_down_types.map(function (t) {
            return get_noun_answer_report(x[t], t);
        });
    } else {
        v = [];
    }
    return ['status: ' + x.status].concat([].concat.apply([], v))
}

var generate_answer_report_for_one_sentence = function (x, j) {
    return [
        'sentence: ' + j,
        'text: ' + x.text,
        'words: ' + x.words.join(' '),
        x.attempts.map(generate_attempt_report)
    ]
}

var generate_syntax_answers_report = function () {
    getting(['syntax_logs'], function (x) {
        // More sophisticated in the future.
        var d = {};
        for (var i in x) {
            d[i] = [];
            for (var j in x[i]) {
                d[i].push(generate_answer_report_for_one_sentence(x[i][j], j))
            }
            d[i].sort(function (x, y) {
                return sentence_sort(x[0].split(' ')[1], y[0].split(' ')[1]);
            });
        }
        var text = JSON.stringify(d, null, 4);
        el('syntax_report').innerHTML = text;
    }, {'global': true})();
}

var generate_mf_answers_report = function () {
    getting(['mf_translation_logs'], function (x) {
        // More sophisticated in the future.
        var d = {};
        for (var i in x) {
            d[i] = [];
            for (var j in x[i]) {
                var x_i_j = x[i][j];
                x_i_j.sentence = j;
                d[i].push(x_i_j)
            }
            /*
            d[i].sort(function (x, y) {
                return sentence_sort(x[0].split(' ')[1], y[0].split(' ')[1]);
            });
            */
        }
        var text = JSON.stringify(d, null, 4);
        el('syntax_report').innerHTML = text;
    }, {'global': true})();
}