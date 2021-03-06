// If something doesn't make sense, it's probably from DropMode.

/*

- add etymology question types
    - word to word_definition   "What is the meaning of the word QUADRUPED?"
//     - word_definition to word "What is a word meaning "dwelling on land""
//     - root to root_meaning   "What is the meaning of the root PED?"
//     - root_meaning to root  "which of the following roots means "foot"?
//     - root to word    "Which word has a root meaning "all"?
//     - word to root    "Select the root of the word QUADRUPED?"
//     - word to synonym  "What is a synonym of QUADRUPED?"
//     - word to antonym
//     - alternate root "What is an alternate root of AQU?"
//     - origin language "Is HYDR greek or latin?"
//     - type in answer 
//     - (one option, perhaps too easy to be used is latin root to word)
    
// Iteration 1.0
// - already have: root to word
// - word to root
// - word to word_definition
// - word_definition to word
// - root to root_definition
// - root_definition to root

// Iteration 2.0
// - what language the root is in (english, latin or both)
// - exclude synonyms (i.e. the coincidence factor)
// - word to synonym  "What is a synonym of QUADRUPED?"
// - word to antonym

// Further away
// - alternate root "What is an alternate root of AQU?"
// - origin language "Is HYDR greek or latin?"



// DESIGN ISSUE
// - two words may be quite close in meaning and by coincidence both words or both definitions
//     - once synonyms are loaded and ready, we could exclude synonyms

// */
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

// autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" supposedly turns spellcheck off
// maybe we want to be selective and do this, but presumably only in SpellingModeGame


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
    set_display("spelling_hint_button", 'initial');
    set_display("dash_hint_button", 'none');
    set_display("next_level_button", 'none');
    //current best result for clearing morphology
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
    
    
    
    // todo hack short term solution to accuracy metrics not having enough columns
    // todo a more modular way of resetting incorrect streak would be better here
    // but this is a short-term solution
    // we want to change the max incorrect streak for spelling mode
    // without radically affecting the architecture of the game, 
    // which currently checks for a single max incorrect streak for the whole module, 
    // not for any particular game mode
    
    //so we set a hidden streak which we will compare to the mode-specific max_streak
    // given by module
    this.secret_streak = 0;
    
    //we first check whether a  mode-specific max-streak exists
    // if so we process
    if (this.quiz.module.submodule.spelling_mode_max_incorrect_streak) {
        back.log("setting a temporary max incorrect streak");
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.spelling_mode_max_incorrect_streak;
        
        // this.dummy_limit_to_streak = this.quiz.module.submodule.max_incorrect_streak;
        
    } else {
        bug.log("PROBLEM: no spelling_mode_max_incorrect_streak specified!!!");
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.max_incorrect_streak;
        // this.dummy_limit_to_streak = this.quiz.module.submodule.max_incorrect_streak;
        
    }
    // this will be our secret triggering point
    this.dummy_limit_to_streak = this.quiz.module.submodule.max_incorrect_streak;
    // console.log("BACKLOG this.dummy_limit_to_streak = ", this.dummy_limit_to_streak);
    // console.log("BACKLOG 5 this.quiz.module.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    // console.log("BACKLOG this.temporary_max_incorrect_streak = ", this.temporary_max_incorrect_streak);
    // console.log("BACKLOG this.dummy_limit_to_streak = ", this.dummy_limit_to_streak);
};

SpellingModeGame.prototype.set_level = function (new_level) {
    back.log("new_level = ", new_level);
    this.level = new_level;
}

SpellingModeGame.prototype.get_mode_name = function() {
    return "spelling";
}





SpellingModeGame.prototype.next_question = function(){
    
    clear_input_box("input_box");

    //todo do we need to do something here to clear and reset the spelling hint button?


    // todo separate spelling level from etymology level
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    this.quiz.update_display();
    
    
    // todo below is the typical way of getting legal question types
    // the problem is: it accesses etym_levels
    // when what we really want a separate spelling level
    // so for now we'll comment this out
    this.legal_question_types = map_level_to_allowed(
        this.level.etym_level, etym_levels).question_types;
    // and instead hard code the question types
    
    // this.legal_question_types = {'word_definition_to_word': 0.00000005,
    //     'root_definition_to_root': 0.5};
    this.legal_question_types = {'word_definition_to_word': 0.5,
        'root_definition_to_root': 0.5};
    // this.legal_question_types = {'word_definition_to_word': 0.000001, 'root_definition_to_root': 0.5};
    // this.legal_question_types = {'word_definition_to_word': 0.5};
    
    this.chosen_question_type = weighted(this.legal_question_types);
    back.log("this.chosen_question_type = ", this.chosen_question_type);
    back.log("this.chosen_question_type = ", this.chosen_question_type);
    
    
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
    
    // var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
    //     this.level.etym_level, this.chosen_question_type, 3, 3, 3);
    
    
    
    
    back.log("chosen_question_type = ", this.chosen_question_type);
    var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 4, 4, 4);
    // console.log(question_with_cheat_sheet['question_data']);
    var question = question_with_cheat_sheet['question_data'];
    
    
    
    
    
    // this.lizard_cheat_sheet = alphabetize_dict(
    //     question_with_cheat_sheet['cheat_sheet']);
        
    // backlog("[spelling_mode.next_question] this.lizard_cheat_sheet = ", this.lizard_cheat_sheet);
    
    
    
    // console.log("LIZARD this.chosen_question_type = ", this.chosen_question_type);
    // var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
    //     this.level.etym_level, this.chosen_question_type, 3, 0, 1);
    // // console.log(question_with_cheat_sheet['question_data']);
    // var question = question_with_cheat_sheet['question_data'];
    
    
    
    // this.lizard_cheat_sheet = alphabetize_dict(
    //     question_with_cheat_sheet['cheat_sheet']);
    
    
    
    
    this.correct = question.correct_answer;
    this.clue = question.clue;
    
    
    //BEGIN DRAGON HACK
    // we want to send a list of dummy roots to the cheat sheet
    var dummy_root_list = [];
    var number_of_dummy_roots = 2;
    var input_level = this.level.etym_level;
    var all_roots = select_available_roots(input_level);
    console.log("DRAGON all_roots = ", all_roots);
    for (var i = 0; i < number_of_dummy_roots; i++) {
        var random_root = random_choice(all_roots);
        console.log("DRAGON random_root = ", random_root);
        dummy_root_list.push(random_root);
    }
    
    dummy_root_list.push(this.correct);
    console.log("DRAGON dummy_root_list after adding correct root = ", dummy_root_list);
    ///END DRAGON HACK
    
    
    if (this.chosen_question_type == 'root_definition_to_root') {
        console.log("DRAGON about to invoke the dragon with input = ", this.correct);
        //old version that works with just one root
        // this.etymology_cheat_sheet =  this.make_root_definition_to_root_cheat_sheet(this.correct);
        // new version that might work
        this.etymology_cheat_sheet =  this.make_root_definition_to_root_cheat_sheet_new(dummy_root_list);
    } else {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    };
    
    
    console.log("FINAL ETYMOLOGY CHEAT SHEET = ", this.etymology_cheat_sheet);
    
    
    
    back.log("this.etymology_cheat_sheet = ", this.etymology_cheat_sheet);
    this.choices = alphabetize_list(question.choices);
    
    // console.log("BACKLOG: this.correct spelling_mode  = ", this.correct);
    
    var underscore_hint = "HINT: " + this.give_underscore_hint(this.correct);
    back.log("underscore_hint = ", underscore_hint);
    this.spelling_hint = underscore_hint;
    back.log("this.spelling_hint = ", this.spelling_hint);
    
    Quiz.set_question_text(spelling_intro_question + '"' + question.clue + '".');
    
   
    
    
    //todo
    //etymology mode and spelling mode is the only mode without a word selector
    //that leads to a problem: the previous word selector remains on the page
    //the following a hacky solution that can probably be improved on
    
    var empty_word_selector = "";
    this.quiz.set_word_selector(empty_word_selector);
    
    
    //unlike etymology mode we don't have any drop downs so we don't need to clear or make them
};




SpellingModeGame.prototype.process_answer = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    back.log("raw input string = ", raw_input_string);
    
    
    // todo clean_input_string creates objects (aka dictionaries)
    // which is a little too complicated than we always need
    // also some of the objects are called strings in their variable name so they should be changed
    // we want just a basic lower case string
    // like this
    var user_input_string = raw_input_string.toLowerCase();
    
    var processed_input_string = clean_input_string(raw_input_string);
    back.log("cleaned input string = ", processed_input_string);
    
    
    
    
    
    var correct_english_translation;
    
    // todo clean_input_string removes punctuation but too indifferently
    back.log("this.correct = ", this.correct);
    correct_english_translation = clean_input_string(this.correct);
    
    // so instead we just convert to lower case
    var correct_english_string = this.correct;
    correct_english_string = correct_english_string.toLowerCase();
    back.log("correct_english_string = ", correct_english_string);
    
    // todo below seems a little ad hoc
    // submit...with_slash processes strings of the form (x/y) and matches to either x or y
    // regular submit without slash processes regular input
    // better would be to just have the processing take a consistent input 
    // and process the slash downstream
    var comparison_result;
    if (this.chosen_question_type == 'root_definition_to_root') {
        comparison_result = this.submit_to_green_red_master_with_slash(this.correct, raw_input_string, true);
    } else {
        comparison_result = this.submit_string_to_green_and_red(this.correct, raw_input_string);
    }
    
    this.comparison_result = comparison_result;
    
    this.display_red_green_result(comparison_result);
    
    
    
    // A HACKY INTERVENTION TO DEAL WITH SLASHES IN CORRECT ANSWER
    // slash_option_equals(input, target_list) will be altered
    // such that it returns true if there is a match on either side
    // it basically divides slash_options into string
    // converts to lower case
    // iterate through new list and apply object_equals
    if (correct_english_string.indexOf("/") !== -1) {
        // we convert a slashed-string to a list
        var boolean_result = string_matches_slashed_string(user_input_string, correct_english_string);
        if (boolean_result) {
            this.process_correct_answer();
        } else {
            this.process_incorrect_answer();
        }
    } else {
        if (object_equals(processed_input_string, correct_english_translation)) {
            this.process_correct_answer();
        } else {
            // console.log("SPELLING checkpoint 1 about to call process_incorrect_answer");
            this.process_incorrect_answer();
        }
    }
    
};



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



SpellingModeGame.prototype.display_red_green_result = function (list) {
    var parent_el = document.createElement('div');
    var e;
    for (var i = 0; i < list.length; i++) {
        e = document.createElement('font');
        e.style.color = list[i][1];
        e.innerHTML = list[i][0];
        parent_el.appendChild(e);
    }
    var fbox = el("image_display_box");
    fbox.appendChild(parent_el);
    return parent_el;
}




SpellingModeGame.prototype.process_correct_answer = function() {
    
    
    // todo turkey remove when done testing
    // var test_list = ['pos', 'pot root 2'];
    // var test_output = remove_metadata_from_roots(test_list);
    // console.log("TURKEY test_output = ", test_output);
    
    this.quiz.increment_score();
    
    var spelling_feedback = this.clue + " = " + this.correct;
    
    var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_right) + " " + spelling_feedback;
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    clear_input_box("input_box");
    
    this.quiz.question_complete();
};



SpellingModeGame.prototype.process_incorrect_answer = function() {
    back.log("entering process_incorrect_answer");
    this.quiz.submodule.incorrect_streak ++;
    
    back.log("this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    
    
    // todo below seems arbitrary and messy, worth refactoring
    // the if seems to be rarely triggered
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
    }
    
    
    ///////A HACKY WAY OF MAKING A LONGER MAX INCORRECT STREAK FOR SPELLING MODE
    back.log("entering hacky intervention");
    back.log("before change this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    back.log("before change this.quiz.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    back.log("before change this.dummy_limit_to_streak = ", this.dummy_limit_to_streak);
    back.log("before change this.temporary_max_incorrect_streak = ", this.temporary_max_incorrect_streak);
    
    if (this.secret_streak >= this.temporary_max_incorrect_streak) {
        //we have hit our temporary max so we trigger give away answer
        this.quiz.submodule.incorrect_streak = this.dummy_limit_to_streak;
    } else {
        // we haven't hit our temporary max so we want to continue allowing answers
        // so we increment secret_streak 
        this.secret_streak++;
        // and if we trigger our dummy limit
        // we decrement our incorrect streak to 1 beneath the limit
        if (this.quiz.submodule.incorrect_streak >= this.dummy_limit_to_streak) {
            this.quiz.submodule.incorrect_streak = this.dummy_limit_to_streak - 1;
            back.log("above usual max but under secret max, so resetting to usual max - 1");
            back.log("this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
        }
    }
        
    back.log("this.quiz.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    back.log("after change this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    back.log("leaving hacky intervention");
    ///end the hacky section, the rest is as usual in other modes
    
    
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        var cell_2;
        cell_2 = "";
        var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(SpellingModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.give_away_answer();
    }
    this.quiz.update_display();
};



// todo eliminate below and test
//this is a primitive version which does all the function at once doesn't toggle 
// what we really want is something that will work with the toggle function

// a version that only takes one root, not as useful
SpellingModeGame.prototype.make_root_definition_to_root_cheat_sheet = function (root) {
    var output_words = make_root_to_word_list(root);
    return output_words;
};


// a version that takes a list of roots
SpellingModeGame.prototype.make_root_definition_to_root_cheat_sheet_new = function (root_list) {
    var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 4, 4, 4);
        
    var question = question_with_cheat_sheet['question_data'];
    this.etymology_cheat_sheet = alphabetize_dict(
        question_with_cheat_sheet['cheat_sheet']);
        
    var output_list = [];
    var output_words;
    for (var i = 0; i < root_list.length; i++) {
        output_words = make_root_to_word_list(root_list[i]);
        console.log("DRAGON output_words = ", output_words);
        output_list.push(output_words);
    }
    
    var merged_output_list = [].concat.apply([], output_list);
    
    
    var shuffled_output_list = shuffle(merged_output_list);
    shuffled_output_list = remove_duplicates(shuffled_output_list);
    
    return shuffled_output_list;
};


// todo below should probably be refactored to return something instead of mutating this.spelling_hint
SpellingModeGame.prototype.make_spelling_hint = function () {
    if (this.chosen_question_type === 'root_definition_to_root') {
        // the hacky test version
        this.spelling_hint = "STARTS WITH THE LETTER: " + this.correct.charAt(0);
        // todo the real version should be something like this
        // this.spelling_hint = this.give_first_letter_hint(this.correct);
    } else {
        var underscore_hint = "HINT: " + this.give_underscore_hint(this.correct);
        this.spelling_hint = underscore_hint; 
    }
};



// todo below is a hackily hacked together version which basically does the job
// but it needs to be redesigned to be:
// modular
// iterate through all the roots until it finds one

SpellingModeGame.prototype.give_underscore_hint = function (word) {
    
    if (this.chosen_question_type == "root_definition_to_root") {
        return "starts with the letter: " + this.correct.charAt(0);
    } else {
        back.log("entering underscore hit generator");
        back.log("word to provide underscore hint for = ", word);
        // we extract all possible roots
        // e.g. quadruped ---> ['QUAD/QUADR', 'PED/POD']
        var roots_extracted = get_roots(word);
        
        // we need to remove metadata such as "root 2"
        // e.g. ['POS/POT root 2'] ---> ['POS/POT']
        roots_extracted = remove_metadata_from_roots(roots_extracted);
        back.log('list of roots_extracted after cleanup = ', roots_extracted);
        
        // pick a random root from that list
        var random_root_to_replace = random_choice(roots_extracted);
        back.log("random_root_to_replace chosen from list = ", random_root_to_replace);
        
        
        //here's where we should put the error catching
        var is_there_a_match = false;
        is_there_a_match = test_match_from_slash_options(random_root_to_replace, word);
        if (!is_there_a_match) {
            bug.log("NO MATCH DISCOVERED IN SPELLING HINT GENERATOR");
        } else {
            back.log("spelling hint match detected");
        }
        
        
        // we find the substring that matches
        // ped, quadruped ---> ped
        random_root_to_replace = return_match_from_slash_options(random_root_to_replace, word);
        
        //we need to convert to lower case
        random_root_to_replace = random_root_to_replace.toLowerCase();
        back.log("root we've chosen to replace = ", random_root_to_replace);
        
        
        // we need an underscore line to match the length of the word
        var length_of_root_to_replace = random_root_to_replace.length;
        
        var underscore_string = new Array(length_of_root_to_replace + 1).join("_");
        
        
        // we replace our matched substring with an underscore line
        var word_with_root_replaced = word.replace(random_root_to_replace, underscore_string);
       
        return word_with_root_replaced;
    }
};



// todo below should be set up as a global function
// some kind of mode-agnostic string processing function
SpellingModeGame.prototype.submit_to_green_red_master_with_slash = function(correct_answer_string, input_string, process_slashes_bool) {
    //we want to create a table of divs for each slash option
    // in each cell of the table row we will put a red-green result
    //e.g.   star = ASTER/ASTR
    // if they input ASTOR
    //we return ASTor   /  ASTor
    // var number_of_options_to_populate = get_number_of_slash_options(correct_answer_string);
    // var list_of_slash_options_to_process = correct_answer_string.split("/");
    // var number_of_options_to_populate = list_of_slash_options_to_process.length;
    //we iterate through the list_of_slash_options_to_process
    // produce a list of red_green_results for each
    if (process_slashes_bool) {
        // begin new code
        
        
    
        correct_answer_string = correct_answer_string.toLowerCase();
        var red_green_result_list = [];
        var list_of_slash_options_to_process = correct_answer_string.split("/");
        for (var i = 0; i < list_of_slash_options_to_process.length; i++) {
            var type_test = typeof list_of_slash_options_to_process[i];
            var result = this.submit_string_to_green_and_red(list_of_slash_options_to_process[i], input_string);
            red_green_result_list.push(result);
            red_green_result_list.push(["/"]);
        }
        //we drop the last slash
        red_green_result_list.pop();
        // we need to flatten the list
        var flattened_red_green_result_list = [].concat.apply([], red_green_result_list);

        return flattened_red_green_result_list;
    } else {
        this.submit_string_to_green_and_red(correct_answer_string, input_string);
    }
}


// todo below might not be used should be set up as a global function
// some kind of mode-agnostic string processing function
SpellingModeGame.prototype.submit_string_to_green_and_red = function (correct_answer_string, input_string) {
    //we want to turn each character green or red
    /*console.log("TRUMP entering submit string");
    var correct_answer_as_list_of_characters = correct_answer_string.split("");
    var input_string_as_list_of_characters = input_string.split("");
    console.log("TRUMP correct answer list = ", correct_answer_as_list_of_characters);
    console.log("TRUMP input list = ", input_string_as_list_of_characters);*/
    
    
    
    
    
    
    var levenshtein_result = levenshtein(correct_answer_string, input_string)
    var red_green_result;
    if ('feedback' in levenshtein_result) {
        red_green_result = levenshtein_result.feedback;
    } else {
        red_green_result = levenshtein_result.error.split('').map(function (x) {
            return [x, 'yellow'];
        });
    }
    // var red_green_result = compare_path(correct_answer_as_list_of_characters, input_string_as_list_of_characters);
    console.log("TRUMP red_green_result = ", red_green_result);
    // console.log("SWAMP red_green_result.red_green_list = ", red_green_result.red_green_list);
    return red_green_result;
};

SpellingModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "The correct answer is \"" + this.clue + " = " + this.correct + '"';
    
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







/*
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
*/




// SpellingModeGame.prototype.make_spelling_hint = function () {
//     var underscore_hint = "HINT: " + this.give_underscore_hint(this.correct);
//     console.log("HINT underscore_hint = ", underscore_hint);
//     var hint_to_add = document.createTextNode(underscore_hint);
//     var box_for_underscore_hint = el('image_display_box');
//     box_for_underscore_hint.append(hint_to_add);
// };






/*SpellingModeGame.prototype.display_red_green_result = function (list) {
    
    //pseudo-code
    //iterate through list
    //if list[1] = red
    //wrap in span or set style or something that will establish its color
    //push to red_green_string which will be our final displayed string
    // var red_green_list = [];
    
    // console.log("SWAMP checkpoint 6.2 red_green_list pre-push = ", red_green_list);
    // var colored_character_list = [];
    // var colored_string;
    
    var parent_el = document.createElement('div');
    // var container_div = document.createElement('div');
    
    var e;
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
        e.style.color = list[i][1];
        e.innerHTML = list[i][0];
        parent_el.appendChild(e);
        // console.log("SWAMP 6.81 color = ", list[i][1]);
        // e.style.color = list[i][1];
        // console.log("SWAMP 6.81 text = ", list[i][0]);
        // e.innerHTML = list[i][0];
        // console.log("SWAMP 6.81 e = ", e);
        // container_div.appendChild(e);
        // parent_el.appendChild(container_div);
    }
    var fbox = el("image_display_box");
    fbox.appendChild(parent_el);
    return parent_el;
    
    // parent_el.appendChild(container_div);
    // console.log("SWAMP 6.9 checkpoint out of for loop")
    // console.log("SWAMP 6.91 colored_character_list = ", colored_character_list);
    
    
    // console.log("SWAMP 6.92 checkpoint about to append to feedback box");
    
    // console.log("SWAMP 6.91 parent_el = ", parent_el);
    // return parent_el;
    
    
    // console.log("SWAMP red_green_list after push = ", red_green_list);
    
    // var red_green_string = red_green_list.toString();
    
    // console.log("SWAMP red_green_string = ", red_green_string);
    
    // var fbox = el("feedbackbox");
    // fbox.innerHTML = "Almost! Try again." + red_green_string;
}*/
