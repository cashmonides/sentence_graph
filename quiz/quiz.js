
window.onload = start;

function start(){
    
    load(data_loaded);
    
};

var wordSel = null;
var target_tag = null;
var sentences = null;
var sentence = null;
var count_correct = 0;
var count_incorrect = 0;
var incorrect_streak = 0;
var max_incorrect_streak = 4;
var quick_mode = true;

//data_loaded gets passed the data that comes back to us from firebase
//so we want to deserialize this data
function data_loaded(data){
    
    sentences = deserialize(data);
    console.log("sentences loaded: ", sentences.length);
    generate_question_ui(sentences);
    
};


//step 1 : create a set of available tags
//step 2: pick randomly a target tag and tell the user to match it
//step 3: user submits the answer in the form of indices
//step 4: check answer by looking for target tag in tag list for that region


function refresh_score() {
    document.getElementById("scorebox").innerHTML = "Correct: " + count_correct + ", Incorrect: " + count_incorrect;
}

function generate_question(sentences){
   
    
    var available_tags = new Set();
    sentence = random_choice(sentences);
    
    
    
    for (var i in sentence.regions) {
        var r = sentence.regions[i];
        if (quick_mode && r.get_indices().length == 1 || !quick_mode) {
            var tags = r.get_tag_types();
            console.log("DEBUG 9-3 r.tags = ", tags, sentence.get_region_text(r));
            for (var i = 0; i < tags.length; i++) {
                available_tags.add(tags[i]); 
            }
            console.log("tag concatenated!");
        }
    }
    
    target_tag = random_choice(Array.from(available_tags));
    console.log(":target_tag = " + target_tag);
}






function generate_question_ui(sentences) {
    generate_question(sentences);
    refresh_score();
    document.getElementById("questionbox").innerHTML = "Click on the word that matches " + wrap_string(target_tag);
   
    document.getElementById("testbox").innerHTML = "";
    console.log(sentence.text);
    var text_data = new Text(sentence.text);
    text_data.setup();
    wordSel = new WordSelector("testbox", text_data);
    text_data.word_selector = wordSel;
    wordSel.setup();
    if (quick_mode) {
        wordSel.click_callback = quick_click;
    }
   
};

function quick_click (word_selector, index) {
    console.log("QUICK CLICK index = ", index);
    submit_answer();
    
}


function submit_answer() {

    var answer_indices = wordSel.get_selected_indices();
    console.log("answer_indices = ", answer_indices);
    var answer_region = sentence.get_region(answer_indices);
    var tag_names = answer_region.get_tag_types();
    
    console.log("tag names:", tag_names);
    console.log("target type: ", target_tag);
    
    var is_correct = contains(tag_names, target_tag);
    
    if (is_correct) {
        process_correct_answer();
    } else {
        process_incorrect_answer(tag_names);
    }
}



function process_correct_answer() {
    console.log("answer matches target");        
    incorrect_streak = 0;
    if (incorrect_streak < max_incorrect_streak) {
        count_correct ++;
    }
    var cell_1 = random_choice(cell_1_feedback_right);
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = cell_1;
    generate_question_ui(sentences);
}

var cell_1_feedback_right = ["Correct!", "Excellent!"]
var cell_1_feedback_wrong = ["whoops", "not exactly"]
var cell_3_feedback_wrong = ["try again", "take another shot"]

function process_incorrect_answer(tag_names) {
    incorrect_streak ++;
    count_incorrect ++;
    refresh_score();
    wordSel.clear();
    
    if (incorrect_streak < max_incorrect_streak) {
        var cell_2;
        if (tag_names.length == 0) {
            cell_2 = "That's not a valid region.";
        } else if (tag_names.length == 1) {
            cell_2 = "That's a " + wrap_string(tag_names[0]);
        } else {
            tag_names = tag_names.map(wrap_string);
            cell_2 = "That matches the following: " + tag_names.join(", ");
        }
        var cell_1 = random_choice(cell_1_feedback_wrong);
        var cell_3 = random_choice(cell_3_feedback_wrong);
        var fbox = document.getElementById("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        give_away_answer();
    }
}

function wrap_string(tag) {
    return "<span class=\"tag_names\">" + tag + "</span>";
}

function give_away_answer(){
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = "";
    
    for(var ri in sentence.get_regions()){
        var r = sentence.get_regions()[ri];
        for(var ti in r.get_tags()){
            var t = r.get_tags()[ti];
            if(t.get_tag_type() == target_tag) {
                var text = sentence.get_region_text(r);
                console.log("this was a solution:", text);
                fbox.innerHTML += wrap_string(target_tag) + " = " + text + "<br>";
            }
        }
    }
    
}






//new stuff below
function generate_question_word_to_tag(sentences){

    var available_tags = new Set();
    sentence = random_choice(sentences);


    for (var i in sentence.regions) {
        var r = sentence.regions[i];
        if (quick_mode && r.get_indices().length == 1 || !quick_mode) {
            var tags = r.get_tag_types();
            for (var i = 0; i < tags.length; i++) {
                available_tags.add(tags[i]);
            }
        }
    }
    target_tag = random_choice(Array.from(available_tags));
    //so we have a good tag
    //we need to mark it as the correct answer
    //and we need to get its index
    //amd we need to send that index to set_highlighted

    console.log("target_tag = " + target_tag);
}

function generate_question_ui_word_to_tag(sentences) {
    //the logic will change
    //we no longer want to wrap_string
    //instead we want to generate a drop down
    //which implies that we will need to pass as an argument the appropriate data for the drop down
    generate_question_word_to_tag(sentences);
    refresh_score();
    document.getElementById("questionbox").innerHTML = "Classify the highlighted word: ";

    document.getElementById("testbox").innerHTML = "";
    console.log(sentence.text);
    var text_data = new Text(sentence.text);
    text_data.setup();
    wordSel = new WordSelector("testbox", text_data);
    text_data.word_selector = wordSel;
    wordSel.setup();
    if (quick_mode) {
        wordSel.click_callback = quick_click;
    }

};


//new stuff above