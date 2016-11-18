// If something doesn't make sense, it's probably from DropMode.

/*

- add etymology question types
    - word to word_definition   "What is the meaning of the word QUADRUPED?"
    - word_definition to word "What is a word meaning "dwelling on land""
    - root to root_meaning   "What is the meaning of the root PED?"
    - root_meaning to root  "which of the following roots means "foot"?
    - root to word    "Which word has a root meaning "all"?
    - word to root    "Select the root of the word QUADRUPED?"
    - word to synonym  "What is a synonym of QUADRUPED?"
    - word to antonym
    - alternate root "What is an alternate root of AQU?"
    - origin language "Is HYDR greek or latin?"
    - type in answer 
    - (one option, perhaps too easy to be used is latin root to word)
    
Iteration 1.0
- already have: root to word
- word to root
- word to word_definition
- word_definition to word
- root to root_definition
- root_definition to root

Iteration 2.0
- what language the root is in (english, latin or both)
- exclude synonyms (i.e. the coincidence factor)
- word to synonym  "What is a synonym of QUADRUPED?"
- word to antonym

Further away
- alternate root "What is an alternate root of AQU?"
- origin language "Is HYDR greek or latin?"



DESIGN ISSUE
- two words may be quite close in meaning and by coincidence both words or both definitions
    - once synonyms are loaded and ready, we could exclude synonyms

*/
// var etymology_question_types = {
//     root_to_word: 0,
//     word_to_root: 1,
//     word_to_word_definition: 2,
//     word_definition_to_word: 3,
//     root_to_root_definition: 4,
//     root_definition_to_root: 5
// }


/*
ISSUE 1 - what data do we pull from module
- option a: pull only roots and we select words that either have all known roots or just 1 known root
- option b: pull roots and known words from module (maybe useful in early stages)

example of data we pull from module:
(a list of usable roots)
(do we have a list of usable words?)

currently have in module:
['BI', 'QUADR', 'PED']

do we want it to look like this in module:
{
    'BI' : [biped, bicycle, binoculaurs],
    'QUADR' : [quadruped, quadrilateral, quadratic],
    'PED' : "all"
}

ISSUE 2: common interface for all etymolgy question types

example of JSON object:
question_type:                              //word to root                          //random choice from allowed
question_template:                          //"What is the root of" + x + "?""      //determined 
what_gets_inserted_into_template:           //QUADRUPED                             //random choice from allowed
choices:                                    //['BI', 'QUADR', 'TERR']               //random choice from allowed
correct_answer:                             //'QUADR'                               //determined



PHILOSOPHICAL CHOICE
- choose root first or word first?
    - if we choose root first, we avoid the biased weighting of the sample with many words that end in -logy
    

STEPS
- deterministic parts
    - map of question_type to the deterministic parts of the JSON object

- random choice from allowed 
    (function we probably already have)
    argument based on root_first or word_first
    all we need to do is get the arguments


function: master function
argument 2: available question types (from level)
argument 3: available roots (from level)
argument 4: available words 
    (default should be a utility extracting all words from available roots)
    (but we should be able to filter words if we want toi)

returns JSON object


function: filter allowed






ISSUE 3 - what does etym level look like
- available roots
- available question types
- available words??

*/


var SpellingModeGame = function(){
    this.data = null;
    this.quiz = null;
    this.level = 0;
};


SpellingModeGame.prototype.attach = function(){
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'initial');
    //input box will be used
    set_display("input_box", 'initial');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
    //current best result for clearing morphology
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
};

SpellingModeGame.prototype.set_level = function (new_level) {
    console.log("LOG SpellingModeGame new_level = ", new_level);
    this.level = new_level;
}

SpellingModeGame.prototype.get_mode_name = function() {
    return "spelling";
}


SpellingModeGame.prototype.next_question = function(){
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    this.quiz.update_display();
    
    this.legal_question_types = map_level_to_allowed(
        this.level.etym_level, etym_levels).question_types;
    
    console.log("SPELLING LOG this.legal_question_types before change = ", this.legal_question_types);

    
    // this.legal_question_types = {'word_definition_to_word': 0.5,
    // 'root_definition_to_root': 0.5};
    this.legal_question_types = {'word_definition_to_word': 0.5};
    
    console.log("SPELLING LOG this.legal_question_types after change = ", this.legal_question_types);
    
    
    var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, weighted(this.legal_question_types), 4, 4, 4);
    // console.log(question_with_cheat_sheet['question_data']);
    var question = question_with_cheat_sheet['question_data'];
    this.etymology_cheat_sheet = alphabetize_dict(
        question_with_cheat_sheet['cheat_sheet']);
    this.choices = alphabetize_list(question.choices);
    this.correct = question.correct_answer;
    
    console.log('OK in etymology, now only HTML remains')
    
    Quiz.set_question_text(question.question_template + '"' + question.clue + '".');
    
    
    //todo
    //etymology mode is the only mode without a word selector
    //that leads to a problem: the previous word selector remains on the page
    //the following a hacky solution that can probably be improved on
    
    var empty_word_selector = "";
    this.quiz.set_word_selector(empty_word_selector);
    
    
    //todo we don't want drop downs in spelling mode so we need to disable below
    
    
    //remove all html elements in drop down
    remove_element_by_id("drop_answer_choices");
    
    //make html elements
    make_drop_down_html(this.choices);
    
    //todo new code 11-29 the following avoids drop-downs with only one answer
    if (el("select_element").children.length === 1) {this.next_question()}
};


//todo change to input mode

//begin insertion of input mode

SpellingModeGame.prototype.process_answer = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    console.log("DEBUG SPELLING raw input string = ", raw_input_string);
    
    var processed_input_string = clean_input_string(raw_input_string);
    console.log("DEBUG SPELLING process input string = ", processed_input_string);
    
    
    //todo we need the correct english answer - should be stored as a variable somewhere in this.next_question
    var correct_english_translation;
    
    //it might already be stored as this.correct_answer, in which case, we just do this
    correct_english_translation = clean_input_string(this.correct);
    
    
    if (object_equals(processed_input_string, correct_english_translation)) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};

//end insertion of input mode

//old process_answer
// SpellingModeGame.prototype.process_answer = function() {
//     var dd = el("select_element");
//     var selected_answer = dd.options[dd.selectedIndex].value;
//     console.log("selected_answer = ", selected_answer);

//     var is_correct = selected_answer === this.correct;

//     if (is_correct) {
//         //console.log"correct");
//         this.process_correct_answer();
//     } else {
//         //console.log"incorrect");
//         this.process_incorrect_answer();
//     }

// };

SpellingModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
SpellingModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
SpellingModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

SpellingModeGame.prototype.process_correct_answer = function() {
    //console.log"answer matches target");
    
    this.quiz.increment_score();
    
    
    var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    
    this.quiz.question_complete();
    
    

};


EtymologyModeGame.prototype.process_incorrect_answer = function() {
    this.quiz.submodule.incorrect_streak ++;
    
    
    console.log("Debug 11-8 this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    if (this.quiz.submodule.incorrect_streak === 1) {
        console.log("Debug 11-8 if triggered");
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG 11-8 if not triggered");
    }
    
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        var cell_2;
        cell_2 = "";
    
        var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(SpellingModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.give_away_answer();
        //refresh_score();
    }
    this.quiz.update_display();
    // Etymology has no word selector
    // this.quiz.word_selector.clear();
};

SpellingModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "The correct answer was \"" + this.correct + '"';
    
    // var self = this;
    // this.quiz.sentence.get_regions_with_tag(this.target_tag).forEach(function(r){
    //     var text = this.quiz.sentence.get_region_text(r);
    //     fbox.innerHTML += Quiz.wrap_string(self.target_tag) + " = " + text + "<br>";
    // });
    this.quiz.question_complete();
};