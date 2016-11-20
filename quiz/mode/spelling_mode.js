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
    
    //we want to change the max incorrect streak
    if (this.quiz.module.submodule.spelling_mode_max_incorrect_streak) {
        console.log("PROBLEM: no spelling_mode_max_incorrect_streak specified");
       this.temporary_max_incorrect_streak = this.quiz.module.submodule.spelling_mode_max_incorrect_streak;
    } else {
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.max_incorrect_streak;
    }
    console.log("TRUMP this.quiz.module.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    console.log("TRUMP this.temporary_max_incorrect_streak = ", this.temporary_max_incorrect_streak);
    
};

SpellingModeGame.prototype.set_level = function (new_level) {
    console.log("LOG SpellingModeGame new_level = ", new_level);
    this.level = new_level;
}

SpellingModeGame.prototype.get_mode_name = function() {
    return "spelling";
}


SpellingModeGame.prototype.next_question = function(){
    
    clear_input_box("input_box");
    
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    this.quiz.update_display();
    
    this.legal_question_types = map_level_to_allowed(
        this.level.etym_level, etym_levels).question_types;
    
    console.log("SPELLING LOG this.legal_question_types before change = ", this.legal_question_types);

    
    // this.legal_question_types = {'word_definition_to_word': 0.00000005,
    //     'root_definition_to_root': 0.5};
    // this.legal_question_types = {'word_definition_to_word': 0.5,
        // 'root_definition_to_root': 0.5};
    this.legal_question_types = {'word_definition_to_word': 0.5};
    
    console.log("SPELLING LOG this.legal_question_types after change = ", this.legal_question_types);
    
    console.log("TRUMP weighted(this.legal_question_types) =", weighted(this.legal_question_types));
    
    this.chosen_question_type = weighted(this.legal_question_types);
    
    var spelling_intro_question;
    if (this.chosen_question_type == 'root_definition_to_root') {
        spelling_intro_question = "Spell the ROOT that means: "
    } else if (this.chosen_question_type == 'word_definition_to_word') {
        spelling_intro_question = "Spell the WORD that means: "
    } else {
        spelling_intro_question = "Type the closest match to: "
        console.log("PROBLEM invalid question type in spelling mode");
    }
    
    
    //the parameters for the following function is:
    // etym_level, question_type, number_of_answer_choices, number_of_dummies, number_of_mandatory)
    // so the numbers are number_of_answer_choices, number_of_dummies, number_of_mandatory
    //1,0,1 gives good results
    //2,0,1 gives a dummy
    // 2,0,1 mysteriously gives good results, usually 3 answers with one dummy and two relevant ones
    var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 3, 0, 1);
    // console.log(question_with_cheat_sheet['question_data']);
    var question = question_with_cheat_sheet['question_data'];
    this.etymology_cheat_sheet = alphabetize_dict(
        question_with_cheat_sheet['cheat_sheet']);
    this.choices = alphabetize_list(question.choices);
    this.correct = question.correct_answer;
    
   
    
    console.log("TRUMP question.question_template = ", question.question_template);
    console.log("TRUMP question.clue = ", question.clue);
    
    
    
    Quiz.set_question_text(spelling_intro_question + '"' + question.clue + '".');
    
    
    //todo
    //etymology mode and spelling mode is the only mode without a word selector
    //that leads to a problem: the previous word selector remains on the page
    //the following a hacky solution that can probably be improved on
    
    var empty_word_selector = "";
    this.quiz.set_word_selector(empty_word_selector);
    
    
    //todo we don't want drop downs in spelling mode so we need to disable below
    
    
    //remove all html elements in drop down
    // remove_element_by_id("drop_answer_choices");
    
    //make html elements
    // make_drop_down_html(this.choices);
    
    //todo new code 11-29 the following avoids drop-downs with only one answer
    // if (el("select_element").children.length === 1) {this.next_question()}
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
    
    
    //todo for now we're going to just send this function a string
    //later we'll need to do the necessary stripping of punctuation
    console.log("SWAMP this.correct = ", this.correct);
    console.log("SWAMP raw_input_string = ", raw_input_string);
    
    //more primitive version without slashes works
    // var comparison_result = this.submit_string_to_green_and_red(this.correct, raw_input_string);
    //more advanced version with slashes in testing
    console.log("TRUMP this.correct = ", this.correct);
    console.log("TRUMP this.chosen_question_type = ", this.chosen_question_type);
    
    if (this.chosen_question_type == 'root_definition_to_root') {
        console.log("TRUMP slash mode triggered");
        var comparison_result = this.submit_to_green_red_master_with_slash(this.correct, raw_input_string, true);
    } else {
        //the old version that works
        var comparison_result = this.submit_string_to_green_and_red(this.correct, raw_input_string);
    
    }
    console.log("SWAMP comparison_result = ", comparison_result);
    this.comparison_result = comparison_result;
    
    
    console.log("SWAMP checkpoint 6 entering display_red_green-result");
    console.log("SWAMP checkpoint 6.1 input to argument = ", comparison_result);
    
    this.display_red_green_result(comparison_result);
    console.log("SWAMP checkpoint 6.9999999 leaving display_red_green-result");
    
    if (object_equals(processed_input_string, correct_english_translation)) {
        this.process_correct_answer();
    } else {
        console.log("swamp checkpoint 1 about to call process_incorrect_answer");
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


SpellingModeGame.prototype.display_red_green_result_old_with_add_class = function (list) {
    
    //pseudo-code
    //iterate through list
    //if list[1] = red
    //wrap in span or set style or something that will establish its color
    //push to red_green_string which will be our final displayed string
    var red_green_list = [];
    
    console.log("SWAMP checkpoint 6.2 red_green_list pre-push = ", red_green_list);
    
    for (var i = 0; i < list.length; i++) {
        console.log("SWAMP entering for loop");
        var sublist_to_query = list[i];
        console.log("SWAMP sublist_to_query = ", sublist_to_query);
        var character_with_class;
        character_with_class = sublist_to_query[0];
        console.log("SWAMP character_with_class pre-class = ", character_with_class);
        if (sublist_to_query[1] == 'green') {
            character_with_class.addClass('correct_input');
            console.log("SWAMP character_with_class pre-class = ", character_with_class);
        } else if (sublist_to_query[1] == 'red') {
            character_with_class.addClass('incorrect_input');
            console.log("SWAMP character_with_class pre-class = ", character_with_class);
        }
        red_green_list.push(character_with_class);
    }
    
    
        e = document.createElement('font');
        e.style.color = red_green_list[i][1];
        e.innerHTML = red_green_list[i][0];
    
    
    console.log("SWAMP red_green_list after push = ", red_green_list);
    
    var red_green_string = red_green_list.toString();
    
    console.log("SWAMP red_green_string = ", red_green_string);
    
    var fbox = el("feedbackbox");
    fbox.innerHTML = "Almost! Try again." + red_green_string;
}



SpellingModeGame.prototype.display_red_green_result = function (list) {
    
    //pseudo-code
    //iterate through list
    //if list[1] = red
    //wrap in span or set style or something that will establish its color
    //push to red_green_string which will be our final displayed string
    var red_green_list = [];
    
    console.log("SWAMP checkpoint 6.2 red_green_list pre-push = ", red_green_list);
    
    
    var parent_el = document.createElement('div');
    var e;
    var colored_character_list = [];
    var colored_string;
    var container_div = document.createElement('div');
    for (var i = 0; i < list.length; i++) {
        // if (i !== 0) {
        //     //we need to create something that's not a div but rather a bit of text
        //     // so instead of createElement as below
        //     // e = document.createElement('div');
        //     //we need create text
        //     e.innerHTML = '&nbsp;';
        //     e.style.display = 'inline-block';
        //     parent_el.appendChild(e);
        // }
        e = document.createElement('font');
        console.log("SWAMP 6.81 color = ", list[i][1]);
        e.style.color = list[i][1];
        console.log("SWAMP 6.81 text = ", list[i][0]);
        e.innerHTML = list[i][0];
        console.log("SWAMP 6.81 e = ", e);
        container_div.appendChild(e);
        // parent_el.appendChild(container_div);
    }
    
    console.log("SWAMP 6.9 checkpoint out of for loop")
    console.log("SWAMP 6.91 colored_character_list = ", colored_character_list);
    
    parent_el.appendChild(container_div);
    
    
    console.log("SWAMP 6.92 checkpoint about to append to feedback box");
    var fbox = el("image_display_box");
    fbox.appendChild(parent_el);
    
    console.log("SWAMP 6.91 parent_el = ", parent_el);
    return parent_el;
    
    
    // console.log("SWAMP red_green_list after push = ", red_green_list);
    
    // var red_green_string = red_green_list.toString();
    
    // console.log("SWAMP red_green_string = ", red_green_string);
    
    // var fbox = el("feedbackbox");
    // fbox.innerHTML = "Almost! Try again." + red_green_string;
}



SpellingModeGame.prototype.process_correct_answer = function() {
    //console.log"answer matches target");
    
    this.quiz.increment_score();
    
    
    var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    clear_input_box("input_box");
    
    this.quiz.question_complete();
};



SpellingModeGame.prototype.process_incorrect_answer = function() {
    console.log("swamp checkpoint 2 about to call process_incorrect_answer");
    this.quiz.submodule.incorrect_streak ++;
    
    console.log("swamp checkpoint 2.5 about to submit to red_green");
    
    
    
    
    
    
    console.log("swamp 4 11-8 this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    if (this.quiz.submodule.incorrect_streak === 1) {
        console.log("Swamp 11-8 if triggered");
        this.quiz.decrement_score();
    } else {
        console.log("swamp 11-8 if not triggered");
    }
    
    console.log("TRUMP this....submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak)
    console.log("TRUMP this.temporary_max_incorrect_streak = ", this.temporary_max_incorrect_streak);
    //old version worked but didn't reset incorrect streak
    // if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
    //attempt at new version resetting incorrect streak for spelling mode only
    if (this.quiz.submodule.incorrect_streak < this.temporary_max_incorrect_streak) {
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




SpellingModeGame.prototype.submit_to_green_red_master_with_slash = function(correct_answer_string, input_string, process_slashes_bool) {
    //we want to create a table of divs for each slash option
    // in each cell of the table row we will put a red-green result
    //e.g.   star = ASTER/ASTR
    // if they input ASTOR
    //we return ASTor   /  ASTor
    // var number_of_options_to_populate = get_number_of_slash_options(correct_answer_string);
    var list_of_slash_options_to_process = correct_answer_string.split("/");
    var number_of_options_to_populate = list_of_slash_options_to_process.length;
    //we iterate through the list_of_slash_options_to_process
    // produce a list of red_green_results for each
    if (process_slashes_bool) {
        console.log("TRUMP entering process slash block")
        var red_green_result_list = [];
        console.log("TRUMP red_green_result_list = ", red_green_result_list);
        var list_of_slash_options_to_process = correct_answer_string.split("/");
        console.log("TRUMP list_of_slash_options_to_process = ", list_of_slash_options_to_process);
        for (var i = 0; i < list_of_slash_options_to_process.length; i++) {
            console.log("TRUMP list_of_slash_options_to_process[i] = ", list_of_slash_options_to_process[i]);
            var type_test = typeof list_of_slash_options_to_process[i];
            console.log("TRUMP typeOf.list_of_slash_options_to_process[i] = ", type_test);
            var result = this.submit_string_to_green_and_red(list_of_slash_options_to_process[i], input_string);
            red_green_result_list.push(result);
        }
        console.log("TRUMP red_green_result_list = ", red_green_result_list);
        return red_green_result_list;
        
    } else {
        this.submit_string_to_green_and_red(correct_answer_string, input_string);
    }
}



SpellingModeGame.prototype.submit_string_to_green_and_red = function(correct_answer_string, input_string) {
    //we want to turn each character green or red
    console.log("TRUMP entering submit string");
    var correct_answer_as_list_of_characters = correct_answer_string.split("");
    var input_string_as_list_of_characters = input_string.split("");
    console.log("TRUMP correct answer list = ", correct_answer_as_list_of_characters);
    console.log("TRUMP input list = ", input_string_as_list_of_characters);
    
    
    var red_green_result = compare_character_list_rightward_red(correct_answer_as_list_of_characters, input_string_as_list_of_characters);
    // var red_green_result = compare_path(correct_answer_as_list_of_characters, input_string_as_list_of_characters);
    console.log("TRUMP red_green_result = ", red_green_result);
    // console.log("SWAMP red_green_result.red_green_list = ", red_green_result.red_green_list);
    return red_green_result;
};

SpellingModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "The correct answer was \"" + this.correct + '"';
    
    // var self = this;
    // this.quiz.sentence.get_regions_with_tag(this.target_tag).forEach(function(r){
    //     var text = this.quiz.sentence.get_region_text(r);
    //     fbox.innerHTML += Quiz.wrap_string(self.target_tag) + " = " + text + "<br>";
    // });
    
    
    /////BELOW is one option which displays the word a little bigger with a next button
    // set_display("next_button", 'initial');
    // set_display("feedback_for_input", 'initial');
    // set_display("submit_button", 'none');
    // set_display("cheat_sheet_button", 'none');
    // set_display("vocab_cheat_button", 'none');
    // set_display("skip_button", 'none');
    // var fbox_for_input = el("feedback_for_input");
    // fbox_for_input.innerHTML = "the correct spelling is: " + "<br\/>" + this.correct;
    // fbox_for_input.innerHTML = this.give_away_phrase + "<br\/>" + this.correct + this.give_away_ending_phrase;
    // this.quiz.question_complete();
    
    
    
    this.quiz.question_complete();
};