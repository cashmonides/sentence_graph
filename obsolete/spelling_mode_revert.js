
/*


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
    
    //test of new buglog
    
    // var debug2 = console.log.bind(window.console);
    
    //we first check whether a  mode-specific max-streak exists
    // if so we set it as our secret triggering point
    if (this.quiz.module.submodule.spelling_mode_max_incorrect_streak) {
        
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.spelling_mode_max_incorrect_streak;
        console.log("temporary max incorrect streak = ", this.temporary_max_incorrect_streak);
        // debug2("test of new console log wrapper");
        // debug2("test of new console log wrapper", this.temporary_max_incorrect_streak);
        
    } else {
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.max_incorrect_streak;
        console.log("PROBLEM: no spelling_mode_max_incorrect_streak specified. spellingmode.attach");
    }
    // the usual max_streak needs to be stored
    this.dummy_limit_to_streak = this.quiz.module.submodule.max_incorrect_streak;
};

SpellingModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
    console.log("this.level = ", this.level);
}

SpellingModeGame.prototype.get_mode_name = function() {
    return "spelling";
}





SpellingModeGame.prototype.next_question = function(){
    clear_input_box("input_box");

    // todo separate spelling level from etymology level
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    this.quiz.update_display();
    
    
    // todo below is the typical way of getting legal question types
    // the problem is: it accesses etym_levels
    // when what we really want a separate spelling level
    // so for now we'll comment this out
    // this.legal_question_types = map_level_to_allowed(
    //     this.level.etym_level, etym_levels).question_types;
    // and instead hard code the question types, as below
    
    
    // we have a few options for hard-coding
    // this.legal_question_types = {'word_definition_to_word': 0.00000005,
    //     'root_definition_to_root': 0.5};
    // // this.legal_question_types = {'word_definition_to_word': 0.5,
    //     'root_definition_to_root': 0.5};
    this.legal_question_types = {'word_definition_to_word': 0.5, 'root_definition_to_root': 0.5};
    // this.legal_question_types = {'word_definition_to_word': 0.5};
    
    this.chosen_question_type = weighted(this.legal_question_types);
    
    
    console.log("[spellingmode.next_question] this.chosen_question_type = ", this.chosen_question_type);
    //testing back.log
    // seems to work
    back.log("[spellingmode.next_question] this.chosen_question_type = ", this.chosen_question_type);
    
    
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
    
    // etymology cheat sheet is mysteriously not working for spell root mode
    // fails to give relevant data if the integers are anything except 0, 0, 1
    // so as a short term measure we set a special etymology cheat sheet for that mode with just one term
    if (this.chosen_question_type == 'root_definition_to_root') {
        var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 0, this.quiz.module.spell_root_cheat_sheet_dummies, 3);
        // console.log(question_with_cheat_sheet['question_data']);
        var question = question_with_cheat_sheet['question_data'];
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    } else {
        var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 2, this.quiz.module.spell_word_cheat_sheet_dummies, 1);
        // console.log(question_with_cheat_sheet['question_data']);
        var question = question_with_cheat_sheet['question_data'];
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    }
    
    
    
    
    this.correct = question.correct_answer;
    this.clue = question.clue;
    console.log("[spellingmode.next_question] this.clue = ", this.clue);
    console.log("[spellingmode.next_question] this.correct = ", this.correct);
    
    
    
    
    if (this.chosen_question_type == 'root_definition_to_root') {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    } else {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    };
    
    
    this.spelling_hint = "HINT: " + this.give_underscore_hint(this.correct);
    console.log("[spellingmode.next_question] this.spelling_hint = ", this.spelling_hint);
    
    
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
    console.log("[spellingmode.process_answer] raw input string = ", raw_input_string);
    
    
    // todo clean_input_string creates objects (aka dictionaries)
    // which is a little too complicated than we always need
    // also some of the objects are called strings in their variable name so they should be changed
    // we want just a basic lower case string
    // like this
    // var user_input_string = raw_input_string.toLowerCase();
    var processed_input_string = raw_input_string.toLowerCase();
    
    
    
    console.log("[spellingmode.process_answer] processed input string = ", processed_input_string);
    
    
    
    
    
    
    
    // here we don't want to remove slashes
    // so instead we just convert to lower case
    var correct_english_string = this.correct;
    correct_english_string = correct_english_string.toLowerCase();
    console.log("[spellingmode.process_answer] correct_english_string = ", correct_english_string);
    
    
    // todo below seems a little ad hoc
    // submit...with_slash processes strings of the form (x/y) and matches to either x or y
    // regular submit without slash processes regular input
    // better would be to just have the processing take a consistent input 
    // and process the slash downstream
    var comparison_result;
    if (this.chosen_question_type == 'root_definition_to_root') {
        this.comparison_result = this.submit_to_green_red_master_with_slash(this.correct, raw_input_string, true);
        console.log("[spellingmode.process_answer] red-green comparison_result = ", comparison_result);
    } else {
        this.comparison_result = this.submit_string_to_green_and_red(this.correct, raw_input_string);
        console.log("[spellingmode.process_answer] red-green comparison_result = ", comparison_result);
    }
    
    this.display_red_green_result(this.comparison_result);
    
    
    if (correct_english_string.indexOf("/") !== -1) {
        // we convert a slashed-string to a list
        var boolean_result = string_matches_slashed_string(processed_input_string, correct_english_string);
        if (boolean_result) {
            this.process_correct_answer();
        } else {
            this.process_incorrect_answer();
        }
    } else {
        if (processed_input_string === correct_english_string) {
            this.process_correct_answer();
        } else {
            this.process_incorrect_answer();
        }
    }
};





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
    
    this.quiz.increment_score();
    
    var spelling_feedback = this.clue + " = " + this.correct;
    
    var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_right) + " " + spelling_feedback;
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    clear_input_box("input_box");
    
    this.quiz.question_complete();
};



SpellingModeGame.prototype.process_incorrect_answer = function() {
    console.log("[spellingmode.process_incorrect answer] entering process_incorrect_answer");
    this.quiz.submodule.incorrect_streak ++;
    
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        // // todo should anything go here?
        // console.log("if not triggered");
    }
    
    
    ///////BEGIN HACKY INTERVENTION
    console.log("HACK entering hacky intervention");
    // console.log("HACK before change this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    // console.log("HACK 8 before change this.quiz.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    // console.log("HACK before change this.dummy_limit_to_streak = ", this.dummy_limit_to_streak);
    // console.log("HACK before change this.temporary_max_incorrect_streak = ", this.temporary_max_incorrect_streak);
    
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
            // console.log("HACK above usual max but under secret max, so resetting to usual max - 1");
            // console.log("HACK this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
        }
    }
        
    // console.log("HACK this.quiz.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    // console.log("HACK after change this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    // console.log("HACK leaving hacky intervention");
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






SpellingModeGame.prototype.make_spelling_hint = function () {
    if (this.chosen_question_type === 'root_definition_to_root') {
        this.spelling_hint = "STARTS WITH THE LETTER: " + this.correct.charAt(0);
    } else {
        var underscore_hint = "HINT: " + this.give_underscore_hint(this.correct);
        this.spelling_hint = underscore_hint; 
    }
};





// todo convert the following into a global function in etymology mode
// probably going to be of general usage later, not just in spelling mode
// below is a hackily hacked together version which basically does the job
// but it needs to be redesigned to be:
// modular
// iterate through all the roots until it finds one

SpellingModeGame.prototype.give_underscore_hint = function (word) {
    if (this.chosen_question_type == "root_definition_to_root") {
        return "starts with the letter: " + this.correct.charAt(0);
    } else {
        // we extract all possible roots
        // e.g. quadruped ---> ['QUAD/QUADR', 'PED/POD']
        var roots_extracted = get_roots(word);
        
        // we need to remove metadata such as "root 2"
        // e.g. ['POS/POT root 2'] ---> ['POS/POT']
        roots_extracted = remove_metadata_from_roots(roots_extracted);
        
        // pick a random root from that list
        var random_root_to_replace = random_choice(roots_extracted);
        
        
        // todo here's where we should put the error catching
        var is_there_a_match = false;
        is_there_a_match = test_match_from_slash_options(random_root_to_replace, word);
        if (!is_there_a_match) {
            console.log("PROBLEM [spellingmode.give_underscore_hint] NO MATCH DISCOVERED where there should be a match, i.e. word should have root");
        } else {
            // console.log("spelling hint match detected");
        }
        
        
        // we find the substring that matches
        // ped, quadruped ---> ped
        random_root_to_replace = return_match_from_slash_options(random_root_to_replace, word);
        
        //we need to convert to lower case
        random_root_to_replace = random_root_to_replace.toLowerCase();
        
        
        // we need an underscore line to match the length of the word
        var length_of_root_to_replace = random_root_to_replace.length;
        
        var underscore_string = new Array(length_of_root_to_replace + 1).join("_");
        
        
        
        // we replace our matched substring with an underscore line
        var word_with_root_replaced = word.replace(random_root_to_replace, underscore_string);
        
        return word_with_root_replaced;
    }
};



// todo below got interrupted
// develop it later
SpellingModeGame.prototype.inflict_spelling_hint_penalty = function () {
    if (this.chosen_question_type === "word_definition_to_word") {
        
    } else {
        
    }
}

// todo below should be set up as a global function
// i.e. some kind of mode-agnostic string processing function
// todo below is a little buggy: if you enter bi/bin as your answer you get a bad result

SpellingModeGame.prototype.submit_to_green_red_master_with_slash = function(correct_answer_string, input_string, process_slashes_bool) {
    // new version, on the assumption that we always process slashes
    console.log("entering process slash block")
    console.log("BUG correct_answer_string pre-mutation = ", correct_answer_string);
    correct_answer_string = correct_answer_string.toLowerCase();
    console.log("BUG correct_answer_string in lower case = ", correct_answer_string);
    var red_green_result_list = [];
    console.log("BUG red_green_result_list pre-addition = ", red_green_result_list);
    var list_of_slash_options_to_process = correct_answer_string.split("/");
    console.log("BUG list_of_slash_options_to_process = ", list_of_slash_options_to_process);
    for (var i = 0; i < list_of_slash_options_to_process.length; i++) {
        console.log("BUG list_of_slash_options_to_process[i] = ", list_of_slash_options_to_process[i]);
        var type_test = typeof list_of_slash_options_to_process[i];
        console.log("BUG typeOf.list_of_slash_options_to_process[i] = ", type_test);
        var result = this.submit_string_to_green_and_red(list_of_slash_options_to_process[i], input_string);
        console.log("BUG result pre-slash addition = ", result);
        console.log("BUG123 stringified result pre-slash addition = ", JSON.stringify(result));
        red_green_result_list.push(result);
        red_green_result_list.push(["/"]);
        console.log("BUG red_green_result_list post-addition = ", red_green_result_list);
    }
    //we drop the last slash
    red_green_result_list.pop();
    // we need to flatten the list
    console.log("BUG red_green_result_list at end of loop = ", red_green_result_list);
    var flattened_red_green_result_list = [].concat.apply([], red_green_result_list);
    console.log("BUG flattened_red_green_result_list = ", flattened_red_green_result_list);
    // return red_green_result_list;
    return flattened_red_green_result_list;
    
    
    // todo make sure that new version above works, then delete the following
    // old version, on the assumption that we would sometimes not want to process slashes
    // if (process_slashes_bool) {
    //     // begin new code
        
        
    
    //     debuglog("entering process slash block")
    //     debuglog("BUG correct_answer_string pre-mutation = ", correct_answer_string);
    //     correct_answer_string = correct_answer_string.toLowerCase();
    //     debuglog("BUG correct_answer_string in lower case = ", correct_answer_string);
    //     var red_green_result_list = [];
    //     debuglog("BUG red_green_result_list pre-addition = ", red_green_result_list);
    //     var list_of_slash_options_to_process = correct_answer_string.split("/");
    //     debuglog("BUG list_of_slash_options_to_process = ", list_of_slash_options_to_process);
    //     for (var i = 0; i < list_of_slash_options_to_process.length; i++) {
    //         debuglog("BUG list_of_slash_options_to_process[i] = ", list_of_slash_options_to_process[i]);
    //         var type_test = typeof list_of_slash_options_to_process[i];
    //         debuglog("BUG typeOf.list_of_slash_options_to_process[i] = ", type_test);
    //         var result = this.submit_string_to_green_and_red(list_of_slash_options_to_process[i], input_string);
    //         debuglog("BUG result pre-slash addition = ", result);
    //         // result = result + "/";
    //         // console.log("GATOR result post-slash addition = ", result);
    //         red_green_result_list.push(result);
    //         red_green_result_list.push(["/"]);
    //         debuglog("BUG red_green_result_list post-addition = ", red_green_result_list);
    //     }
    //     //we drop the last slash
    //     red_green_result_list.pop();
    //     // we need to flatten the list
    //     debuglog("BUG red_green_result_list at end of loop = ", red_green_result_list);
    //     var flattened_red_green_result_list = [].concat.apply([], red_green_result_list);
    //     debuglog("BUG flattened_red_green_result_list = ", flattened_red_green_result_list);
    //     // return red_green_result_list;
    //     return flattened_red_green_result_list;
    // } else {
    //     this.submit_string_to_green_and_red(correct_answer_string, input_string);
    // }
}


// todo below should be set up as a global function
// some kind of mode-agnostic string processing function
SpellingModeGame.prototype.submit_string_to_green_and_red = function (correct_answer_string, input_string) {
    
    var levenshtein_result = levenshtein(correct_answer_string, input_string)
    var red_green_result;
    if ('feedback' in levenshtein_result) {
        red_green_result = levenshtein_result.feedback;
    } else {
        red_green_result = levenshtein_result.error.split('').map(function (x) {
            return [x, 'yellow'];
        });
    }
    console.log("TRUMP red_green_result = ", red_green_result);
    return red_green_result;
};

SpellingModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "The correct answer is \"" + this.clue + " = " + this.correct + '"';
    
    this.quiz.question_complete();
};



