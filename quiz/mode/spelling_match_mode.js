


var SpellingMatchModeGame = function () {
    this.data = null;
    this.quiz = null;
};


SpellingMatchModeGame.prototype.attach = function(){
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    // etym cheat sheet has been replaced with the progressive hint button
    // so we don't show the button
    set_display("etym_cheat_button", 'none');
    //input box will be used
    set_display("input_box", 'initial');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    // todo get rid of this button altogether
    set_display("spelling_hint_button", 'none');
    set_display("spelling_hint_button_master", "initial");
    set_display("dash_hint_button", 'none');
    set_display("next_level_button", 'none');
    set_display_of_class("bee_button", 'none');
    
    //current best result for clearing morphology
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
    
    
    // todo get rid of below
    this.secret_streak = 0;
    
    
    //we first check whether a  mode-specific max-streak exists
    // if so we set it as our secret triggering point
    if (this.quiz.module.submodule.spelling_mode_max_incorrect_streak) {
        
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.spelling_mode_max_incorrect_streak;
        back.log("temporary max incorrect streak = ", this.temporary_max_incorrect_streak);
        // debug2("test of new console log wrapper");
        // debug2("test of new console log wrapper", this.temporary_max_incorrect_streak);
        
    } else {
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.max_incorrect_streak;
        back.log("PROBLEM: no spelling_mode_max_incorrect_streak specified. spellingmode.attach");
    }
    // the usual max_streak needs to be stored
    this.dummy_limit_to_streak = this.quiz.module.submodule.max_incorrect_streak;
    
    
};


// todo this is now otiose, replaced by 666 methods
// SpellingMatchModeGame.prototype.start_drone_timer = function (stopping_time) {
//     return start_timer('countdown', 50, this.end_drone_game(clock_refresh_id_to_cancel, element_name), stopping_time);
// }

// todo this is now otiose, replaced by 666 methods
// SpellingMatchModeGame.prototype.end_drone_game = function (clock_refresh_id_to_cancel, element_name){
//     // Tell the user that the game is over.
//     alert('game over!!!');
 
//     var path = ["test", this.quiz.pin, "scores", this.quiz.user.name];
    
//     var score = 666; //however we get score (this.match_score or something like that)
    
//     var callback = this.display_match_score(score);
    
//     Persist.set(path, score, callback);
// }


// todo this is now otiose, replaced by 666 methods
// SpellingMatchModeGame.prototype.display_match_score = function (score) {
//     el("fraction_header").innerHTML = score.toString();
// }



// @common to all quiz modes
// here it takes the form of e.g. {'etym_level': 50}
SpellingMatchModeGame.prototype.set_level = function (new_level) {
    throw 'This should never be called!';
}


// sometimes we want to set level not by usual means (i.e. from module)
// but rather we want to set it by an increment or by training mode
SpellingMatchModeGame.prototype.set_level_via_firebase = function () {
    // this.level = this.quiz.spelling_match_level;
    this.level = this.convert_int_to_object(this.quiz.spelling_match_level);
} 

// todo turn below into full dictionary
SpellingMatchModeGame.prototype.convert_int_to_object = function (level_as_int) {
    if (level_as_int < 50) {
        return {"etym_level": 60};
    } else {
        return {"etym_level": 80};
    }
}




// @common to all quiz modes
SpellingMatchModeGame.prototype.get_mode_name = function() {
    return "spelling_match";
}





SpellingMatchModeGame.prototype.next_question = function() {

    clear_input_box("input_box");
    
    

    // todo separate spelling level from etymology level
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
        
    
    
    
    
    if (this.quiz.module.id === 0.25) {
        //level is set by the pin
        this.set_level_via_firebase();
        
    } else {
        // shouldn't be triggered
        throw 'This should never happen!';
    }
    
    
    
    // @beehack
    console.log("FINAL LEVEL = ", this.level);
    
    
    
    this.quiz.update_display(); 
    
    
    
    
    
    // we have a few options for hard-coding
    // this.legal_question_types = {'word_definition_to_word': 0.00000005,
    //     'root_definition_to_root': 0.5};
    // // this.legal_question_types = {'word_definition_to_word': 0.5,
    //     'root_definition_to_root': 0.5};
    this.legal_question_types = {'word_definition_to_word': 0.5, 'root_definition_to_root': 0.5};
    // this.legal_question_types = {'word_definition_to_word': 0.5};
    
    this.chosen_question_type = weighted(this.legal_question_types);
    
    
    
    back.log("this.chosen_question_type = ", this.chosen_question_type);
    
    
    var spelling_intro_question;
    if (this.chosen_question_type == 'root_definition_to_root') {
        spelling_intro_question = "Spell the ROOT that means: "
    } else if (this.chosen_question_type == 'word_definition_to_word') {
        spelling_intro_question = "Spell the WORD that means: "
    } else {
        spelling_intro_question = "Type the closest match to: "
        bug.log("PROBLEM: invalid question type in spelling mode");
    }
    
    
    
    
    //the parameters for the following function is:
    // etym_level, question_type, number_of_answer_choices, number_of_dummies, number_of_mandatory)
    // so the numbers are number_of_answer_choices, number_of_dummies, number_of_mandatory
    //1,0,1 gives good results
    //2,0,1 gives a dummy
    // 2,0,1 mysteriously gives good results, usually 3 answers with one dummy and two relevant ones
    
    // for root-definition-to-root we must have the number of answer choice set to 0
    
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
    back.log("this.clue = ", this.clue);
    back.log("this.correct = ", this.correct);
    
    
    
    
    if (this.chosen_question_type == 'root_definition_to_root') {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    } else {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    };
    
    
    this.spelling_hint = "HINT: " + this.give_underscore_hint(this.correct);
    back.log("this.spelling_hint = ", this.spelling_hint);
    
    
    Quiz.set_question_text(spelling_intro_question + '"' + question.clue + '".');
    
   
    
    
    //todo
    //etymology mode and spelling mode is the only mode without a word selector
    //that leads to a problem: the previous word selector remains on the page
    //the following is a hacky solution that can probably be improved on
    var empty_word_selector = "";
    this.quiz.set_word_selector(empty_word_selector);
};




SpellingMatchModeGame.prototype.process_answer = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    back.log("raw input string = ", raw_input_string);
    
    
    // todo clean_input_string creates objects (aka dictionaries)
    // which is a little more complicated than we really need
    // also some of the objects are called strings in their variable name so they should be changed
    // we want just a basic lower case string
    // like this
    // var user_input_string = raw_input_string.toLowerCase();
    var processed_input_string = raw_input_string.toLowerCase();
    
    
    
    back.log("processed input string = ", processed_input_string);
    
    
    
    // here we don't want to remove slashes
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
        this.comparison_result = this.submit_to_green_red_master_with_slash(this.correct, raw_input_string, true);
        back.log("red-green comparison_result = ", comparison_result);
    } else {
        this.comparison_result = this.submit_string_to_green_and_red(this.correct, raw_input_string);
        back.log("red-green comparison_result = ", comparison_result);
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





SpellingMatchModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
SpellingMatchModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
SpellingMatchModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];







SpellingMatchModeGame.prototype.process_correct_answer = function() {
    
    // todo perhaps move the below functions to quiz
    global_spelling_match_score_counter++;
    el("fraction_header").innerHTML = "score=" + global_spelling_match_score_counter;
    
    
    
    this.quiz.increment_score();
    
    var spelling_feedback = this.clue + " = " + this.correct;
    
    var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_right) + " " + spelling_feedback;
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    clear_input_box("input_box");
    
    this.quiz.question_complete();
};



SpellingMatchModeGame.prototype.process_incorrect_answer = function() {
    back.log("entering process_incorrect_answer");
    this.quiz.submodule.incorrect_streak ++;
    
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        // // todo should anything go here?
        // console.log("if not triggered");
    }
    
    
    ///////BEGIN HACKY INTERVENTION
    back.log("HACK entering hacky intervention for secret incorrect streak");
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
    
    // @beehack
    // if (this.quiz.module.id === 0.5) {
    //     //skip update display
    // } else {
    //     this.quiz.update_display(); 
    // }
    //old version
    this.quiz.update_display();
};






SpellingMatchModeGame.prototype.make_spelling_hint = function () {
    if (this.chosen_question_type === 'root_definition_to_root') {
        this.spelling_hint = "STARTS WITH THE LETTER: " + this.correct.charAt(0);
    } else {
        var underscore_hint = "HINT: " + this.give_underscore_hint(this.correct);
        this.spelling_hint = underscore_hint; 
    }
};



/*

// todo convert the following into a global function in etymology mode
// probably going to be of general usage later, not just in spelling mode
// below is a hackily hacked together version which basically does the job
// but it needs to be redesigned to be:
// modular
// iterate through all the roots until it finds one

SpellingMatchModeGame.prototype.give_underscore_hint = function (word) {
    if (this.chosen_question_type == "root_definition_to_root") {
        return "starts with the letter: " + this.correct.charAt(0);
    } else {
        
        
        // todo tolowercase should be way upstream somewhere
        word = word.toLowerCase();
        
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
            bug.log("PROBLEM [spellingmode.give_underscore_hint] NO MATCH DISCOVERED where there should be a match, i.e. word should have root");
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

*/

// todo development of below got interrupted
// develop it later
SpellingMatchModeGame.prototype.inflict_spelling_hint_penalty = function () {
    if (this.chosen_question_type === "word_definition_to_word") {
        
    } else {
        
    }
}



// todo below should be set up as a global function
// i.e. some kind of mode-agnostic string processing function
// todo slash processing seemed a little buggy, debug and get rid of these logs
    // bug behavior: if you enter bi/bin as your answer you get a bad result

SpellingMatchModeGame.prototype.submit_to_green_red_master_with_slash = function(correct_answer_string, input_string, process_slashes_bool) {
    // new version, on the assumption that we always process slashes
    back.log("entering process slash block")
    // console.log("correct_answer_string pre-mutation = ", correct_answer_string);
    correct_answer_string = correct_answer_string.toLowerCase();
    // console.log("correct_answer_string in lower case = ", correct_answer_string);
    var red_green_result_list = [];
    // console.log("red_green_result_list pre-addition = ", red_green_result_list);
    var list_of_slash_options_to_process = correct_answer_string.split("/");
    back.log("list_of_slash_options_to_process = ", list_of_slash_options_to_process);
    for (var i = 0; i < list_of_slash_options_to_process.length; i++) {
        debug.log("list_of_slash_options_to_process[i] = ", list_of_slash_options_to_process[i]);
        var type_test = typeof list_of_slash_options_to_process[i];
        debug.log("typeOf.list_of_slash_options_to_process[i] = ", type_test);
        var result = this.submit_string_to_green_and_red(list_of_slash_options_to_process[i], input_string);
        debug.log("result pre-slash addition = ", result);
        debug.log("stringified result pre-slash addition = ", JSON.stringify(result));
        red_green_result_list.push(result);
        red_green_result_list.push(["/"]);
        debug.log("red_green_result_list post-addition = ", red_green_result_list);
    }
    //we drop the last slash
    red_green_result_list.pop();
    // we need to flatten the list
    debug.log("red_green_result_list at end of loop = ", red_green_result_list);
    var flattened_red_green_result_list = [].concat.apply([], red_green_result_list);
    debug.log("flattened_red_green_result_list = ", flattened_red_green_result_list);
    // return red_green_result_list;
    return flattened_red_green_result_list;
}


// todo below should be set up as a global function
// some kind of mode-agnostic string processing function
SpellingMatchModeGame.prototype.submit_string_to_green_and_red = function (correct_answer_string, input_string) {
    
    var levenshtein_result = levenshtein(correct_answer_string, input_string)
    var red_green_result;
    if ('feedback' in levenshtein_result) {
        red_green_result = levenshtein_result.feedback;
    } else {
        red_green_result = levenshtein_result.error.split('').map(function (x) {
            return [x, 'yellow'];
        });
    }
    back.log("red_green_result of submit string = ", red_green_result);
    return red_green_result;
};




SpellingMatchModeGame.prototype.display_red_green_result = function (list) {
    
    
    
    
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
    
    

    // todo convert below into a parameter set module by module
    var max_number_of_red_green_display = 4

    if (fbox.childNodes[max_number_of_red_green_display]) {
        // @currentchanges
        // console.log("fbox.childNodes[0] = ", fbox.childNodes[0]); 
        fbox.removeChild(fbox.childNodes[0]); 
    }
    
    return parent_el;
}




SpellingMatchModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "The correct answer is \"" + this.clue + " = " + this.correct + '"';
    
    this.quiz.question_complete();
};













// below can be used for initializing or incrementing
// when initializing counter argument will be 0 or absent
// SpellingMatchModeGame.prototype.set_beehack_level123 = function (counter) {
//     var increment;
    
    
    
    
//     ///// adding some flexibility in case we want to change the increment
//     if (!counter) {
//         increment = 0;
//     } else if (counter === "+1") {
//         increment = 1;
//     } else {
//         console.log("PROBLEM: counter should be +1 or null");
//         increment = 0;
//     }
    
    
    
//     // some error-catching
//     if (!session_bee_counter) {
//         console.log("beehack123 PROBLEM: no session_bee_level");
//     }
//     if (!spelling_bee_training_counter) {
//         console.log("beehack123 PROBLEM: no spelling_bee_training_level");
//     }
    
    
//     ///////WHETHER WE INCREMENT OR NOT/////
//     // if player is on a level equal to or above his real level
//     // we increase his session level
//     // because session_level is that which persists
    
//     // todo @beehack, make into a function
//     var temporary_boolean = in_spelling_bee_training_mode && session_bee_counter > spelling_bee_training_counter;
    
//     if (!temporary_boolean) {
//         console.log("BEEHACK770 boolean is false, incrementing session_bee_counter")
//         session_bee_counter = session_bee_counter + increment;
//     }
//     // we always increment training level to make it progressively harder
//     spelling_bee_training_counter = spelling_bee_training_counter + increment;
    
    
    
    
//     //////WHAT WE SET LEVEL TO//////
//     // the default case, no bee level clicked in quiz
//     // so we set to session_bee_level
//     if (!in_spelling_bee_training_mode) {
//         this.set_level_by_counter(session_bee_counter);
//     } 
//     // when a bee level is clicked in quiz
//     // we set it to that level
//     else {
//         this.set_level_by_counter(spelling_bee_training_counter);
//     }
// }


// SpellingMatchModeGame.prototype.initialize_bee_level = function () {
//     console.log("BEEHACK789 initialize_bee_level entered")
//     // below gets from firebase, should be an integer
    
//     var counter_to_set;
//     var counter_from_firebase = this.quiz.get_initial_spelling_bee_counter();
    
//     console.log("BEEHACK666 about to compare session to firebase");
//     console.log("BEEHACK666 session_bee_counter = ", session_bee_counter);
//     console.log("BEEHACK666 counter_from_firebase = ", counter_from_firebase);
//     console.log("BEEHACK666 equality comparison = ", session_bee_counter > counter_from_firebase);
    
    
    
    
    
//     if (session_bee_counter > counter_from_firebase) {
//         counter_to_set = session_bee_counter;
//         console.log("BEEHACK666 greater than,  level initialized at = ", session_bee_counter);
        
//     } else {
//         session_bee_counter = counter_from_firebase;
//         counter_to_set = counter_from_firebase;
//         console.log("BEEHACK666 less than, level initialized at = ", counter_from_firebase);
        
//     }
    
    
    
    
    
    
//     if (in_spelling_bee_training_mode) {
//         console.log("BEEHACK 666 training mode, level initialized at: ", spelling_bee_training_counter);
//         counter_to_set = spelling_bee_training_counter;
//     }
    
    
//     console.log("BEEHACK666 counter_from_firebase = ", counter_from_firebase);
//     console.log("BEEHACK666 session_bee_counter = ", session_bee_counter);
//     console.log("BEEHACK666 spelling_bee_training_counter = ", spelling_bee_training_counter);
//     console.log("BEEHACK666 setting counter as  = ", counter_to_set);
    
    
//     this.set_level_by_counter(counter_to_set);
// }


// @! hopefully obsolete soon, get rid of
// @beehack 
// short term version to connect counter to level
// SpellingMatchModeGame.prototype.set_default_beehack_level = function (counter) {
//     var output = counter_to_etym_level_map[counter];
    
//     if (output) {
//         this.level = output;
//     } else {
//         this.level = {'etym_level': 50}
//     }
// }




var SpellingMatchModeGame = function () {
    this.data = null;
    this.quiz = null;
};


SpellingMatchModeGame.prototype.attach = function(){
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
    set_display_of_class("bee_button", 'none');
    
    //current best result for clearing morphology
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
    
    
    // todo get rid of below
    this.secret_streak = 0;
    
    
    //we first check whether a  mode-specific max-streak exists
    // if so we set it as our secret triggering point
    if (this.quiz.module.submodule.spelling_mode_max_incorrect_streak) {
        
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.spelling_mode_max_incorrect_streak;
        back.log("temporary max incorrect streak = ", this.temporary_max_incorrect_streak);
        // debug2("test of new console log wrapper");
        // debug2("test of new console log wrapper", this.temporary_max_incorrect_streak);
        
    } else {
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.max_incorrect_streak;
        back.log("PROBLEM: no spelling_mode_max_incorrect_streak specified. spellingmode.attach");
    }
    // the usual max_streak needs to be stored
    this.dummy_limit_to_streak = this.quiz.module.submodule.max_incorrect_streak;
    
    
};


// todo this is now otiose, replaced by 666 methods
// SpellingMatchModeGame.prototype.start_drone_timer = function (stopping_time) {
//     return start_timer('countdown', 50, this.end_drone_game(clock_refresh_id_to_cancel, element_name), stopping_time);
// }

// todo this is now otiose, replaced by 666 methods
// SpellingMatchModeGame.prototype.end_drone_game = function (clock_refresh_id_to_cancel, element_name){
//     // Tell the user that the game is over.
//     alert('game over!!!');
 
//     var path = ["test", this.quiz.pin, "scores", this.quiz.user.name];
    
//     var score = 666; //however we get score (this.match_score or something like that)
    
//     var callback = this.display_match_score(score);
    
//     Persist.set(path, score, callback);
// }


// todo this is now otiose, replaced by 666 methods
// SpellingMatchModeGame.prototype.display_match_score = function (score) {
//     el("fraction_header").innerHTML = score.toString();
// }



// @common to all quiz modes
// here it takes the form of e.g. {'etym_level': 50}
SpellingMatchModeGame.prototype.set_level = function (new_level) {
    throw 'This should never be called!';
}


// sometimes we want to set level not by usual means (i.e. from module)
// but rather we want to set it by an increment or by training mode
SpellingMatchModeGame.prototype.set_level_via_firebase = function () {
    // this.level = this.quiz.spelling_match_level;
    this.level = this.convert_int_to_object(this.quiz.spelling_match_level);
} 

// todo turn below into full dictionary
SpellingMatchModeGame.prototype.convert_int_to_object = function (level_as_int) {
    if (level_as_int < 50) {
        return {"etym_level": 60};
    } else {
        return {"etym_level": 80};
    }
}




// @common to all quiz modes
SpellingMatchModeGame.prototype.get_mode_name = function() {
    return "spelling_match";
}





SpellingMatchModeGame.prototype.next_question = function() {

    clear_input_box("input_box");
    
    

    // todo separate spelling level from etymology level
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
        
    
    
    
    
    if (this.quiz.module.id === 0.25) {
        //level is set by the pin
        this.set_level_via_firebase();
        
    } else {
        // shouldn't be triggered
        throw 'This should never happen!';
    }
    
    
    
    // @beehack
    console.log("FINAL LEVEL = ", this.level);
    
    
    
    this.quiz.update_display(); 
    
    
    
    
    
    // we have a few options for hard-coding
    // this.legal_question_types = {'word_definition_to_word': 0.00000005,
    //     'root_definition_to_root': 0.5};
    // // this.legal_question_types = {'word_definition_to_word': 0.5,
    //     'root_definition_to_root': 0.5};
    this.legal_question_types = {'word_definition_to_word': 0.5, 'root_definition_to_root': 0.5};
    // this.legal_question_types = {'word_definition_to_word': 0.5};
    
    this.chosen_question_type = weighted(this.legal_question_types);
    
    
    
    back.log("this.chosen_question_type = ", this.chosen_question_type);
    
    
    var spelling_intro_question;
    if (this.chosen_question_type == 'root_definition_to_root') {
        spelling_intro_question = "Spell the ROOT that means: "
    } else if (this.chosen_question_type == 'word_definition_to_word') {
        spelling_intro_question = "Spell the WORD that means: "
    } else {
        spelling_intro_question = "Type the closest match to: "
        bug.log("PROBLEM: invalid question type in spelling mode");
    }
    
    
    
    
    //the parameters for the following function is:
    // etym_level, question_type, number_of_answer_choices, number_of_dummies, number_of_mandatory)
    // so the numbers are number_of_answer_choices, number_of_dummies, number_of_mandatory
    //1,0,1 gives good results
    //2,0,1 gives a dummy
    // 2,0,1 mysteriously gives good results, usually 3 answers with one dummy and two relevant ones
    
    // for root-definition-to-root we must have the number of answer choice set to 0
    
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
    back.log("this.clue = ", this.clue);
    back.log("this.correct = ", this.correct);
    
    
    
    
    if (this.chosen_question_type == 'root_definition_to_root') {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    } else {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    };
    
    
    this.spelling_hint = "HINT: " + this.give_underscore_hint(this.correct);
    back.log("this.spelling_hint = ", this.spelling_hint);
    
    
    Quiz.set_question_text(spelling_intro_question + '"' + question.clue + '".');
    
   
    
    
    //todo
    //etymology mode and spelling mode is the only mode without a word selector
    //that leads to a problem: the previous word selector remains on the page
    //the following is a hacky solution that can probably be improved on
    var empty_word_selector = "";
    this.quiz.set_word_selector(empty_word_selector);
};




SpellingMatchModeGame.prototype.process_answer = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    back.log("raw input string = ", raw_input_string);
    
    
    // todo clean_input_string creates objects (aka dictionaries)
    // which is a little more complicated than we really need
    // also some of the objects are called strings in their variable name so they should be changed
    // we want just a basic lower case string
    // like this
    // var user_input_string = raw_input_string.toLowerCase();
    var processed_input_string = raw_input_string.toLowerCase();
    
    
    
    back.log("processed input string = ", processed_input_string);
    
    
    
    // here we don't want to remove slashes
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
        this.comparison_result = this.submit_to_green_red_master_with_slash(this.correct, raw_input_string, true);
        back.log("red-green comparison_result = ", comparison_result);
    } else {
        this.comparison_result = this.submit_string_to_green_and_red(this.correct, raw_input_string);
        back.log("red-green comparison_result = ", comparison_result);
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





SpellingMatchModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
SpellingMatchModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
SpellingMatchModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];







SpellingMatchModeGame.prototype.process_correct_answer = function() {
    
    // todo perhaps move the below functions to quiz
    global_spelling_match_score_counter++;
    el("fraction_header").innerHTML = "score=" + global_spelling_match_score_counter;
    
    
    
    this.quiz.increment_score();
    
    var spelling_feedback = this.clue + " = " + this.correct;
    
    var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_right) + " " + spelling_feedback;
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    clear_input_box("input_box");
    
    this.quiz.question_complete();
};



SpellingMatchModeGame.prototype.process_incorrect_answer = function() {
    back.log("entering process_incorrect_answer");
    this.quiz.submodule.incorrect_streak ++;
    
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        // // todo should anything go here?
        // console.log("if not triggered");
    }
    
    
    ///////BEGIN HACKY INTERVENTION
    back.log("HACK entering hacky intervention for secret incorrect streak");
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
    
    // @beehack
    // if (this.quiz.module.id === 0.5) {
    //     //skip update display
    // } else {
    //     this.quiz.update_display(); 
    // }
    //old version
    this.quiz.update_display();
};






SpellingMatchModeGame.prototype.make_spelling_hint = function () {
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

SpellingMatchModeGame.prototype.give_underscore_hint = function (word) {
    if (this.chosen_question_type == "root_definition_to_root") {
        return "starts with the letter: " + this.correct.charAt(0);
    } else {
        
        
        // todo tolowercase should be way upstream somewhere
        word = word.toLowerCase();
        
        // we extract all possible roots
        // e.g. quadruped ---> ['QUAD/QUADR', 'PED/POD']
        var roots_extracted = get_roots(word);
        
        // we need to remove metadata such as "root 2"
        // e.g. ['POS/POT root 2'] ---> ['POS/POT']
        roots_extracted = remove_metadata_from_roots(roots_extracted);
        
        // pick a random root from that list
        var random_root_to_replace = random_choice(roots_extracted);
        
        
        // todo here's where we should put the error catching
        var is_there_a_match = test_match_from_slash_options(random_root_to_replace, word);
        if (!is_there_a_match) {
            bug.log("PROBLEM [spellingmode.give_underscore_hint] NO MATCH DISCOVERED where there should be a match, i.e. word should have root");
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



// todo development of below got interrupted
// develop it later
SpellingMatchModeGame.prototype.inflict_spelling_hint_penalty = function () {
    if (this.chosen_question_type === "word_definition_to_word") {
        
    } else {
        
    }
}



// todo below should be set up as a global function
// i.e. some kind of mode-agnostic string processing function
// todo slash processing seemed a little buggy, debug and get rid of these logs
    // bug behavior: if you enter bi/bin as your answer you get a bad result

SpellingMatchModeGame.prototype.submit_to_green_red_master_with_slash = function(correct_answer_string, input_string, process_slashes_bool) {
    // new version, on the assumption that we always process slashes
    back.log("entering process slash block")
    // console.log("correct_answer_string pre-mutation = ", correct_answer_string);
    correct_answer_string = correct_answer_string.toLowerCase();
    // console.log("correct_answer_string in lower case = ", correct_answer_string);
    var red_green_result_list = [];
    // console.log("red_green_result_list pre-addition = ", red_green_result_list);
    var list_of_slash_options_to_process = correct_answer_string.split("/");
    back.log("list_of_slash_options_to_process = ", list_of_slash_options_to_process);
    for (var i = 0; i < list_of_slash_options_to_process.length; i++) {
        debug.log("list_of_slash_options_to_process[i] = ", list_of_slash_options_to_process[i]);
        var type_test = typeof list_of_slash_options_to_process[i];
        debug.log("typeOf.list_of_slash_options_to_process[i] = ", type_test);
        var result = this.submit_string_to_green_and_red(list_of_slash_options_to_process[i], input_string);
        debug.log("result pre-slash addition = ", result);
        debug.log("stringified result pre-slash addition = ", JSON.stringify(result));
        red_green_result_list.push(result);
        red_green_result_list.push(["/"]);
        debug.log("red_green_result_list post-addition = ", red_green_result_list);
    }
    //we drop the last slash
    red_green_result_list.pop();
    // we need to flatten the list
    debug.log("red_green_result_list at end of loop = ", red_green_result_list);
    var flattened_red_green_result_list = [].concat.apply([], red_green_result_list);
    debug.log("flattened_red_green_result_list = ", flattened_red_green_result_list);
    // return red_green_result_list;
    return flattened_red_green_result_list;
}


// todo below should be set up as a global function
// some kind of mode-agnostic string processing function
SpellingMatchModeGame.prototype.submit_string_to_green_and_red = function (correct_answer_string, input_string) {
    
    var levenshtein_result = levenshtein(correct_answer_string, input_string)
    var red_green_result;
    if ('feedback' in levenshtein_result) {
        red_green_result = levenshtein_result.feedback;
    } else {
        red_green_result = levenshtein_result.error.split('').map(function (x) {
            return [x, 'yellow'];
        });
    }
    back.log("red_green_result of submit string = ", red_green_result);
    return red_green_result;
};




SpellingMatchModeGame.prototype.display_red_green_result = function (list) {
    
    
    
    
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
    
    

    // todo convert below into a parameter set module by module
    var max_number_of_red_green_display = 4

    if (fbox.childNodes[max_number_of_red_green_display]) {
        // @currentchanges
        // console.log("fbox.childNodes[0] = ", fbox.childNodes[0]); 
        fbox.removeChild(fbox.childNodes[0]); 
    }
    
    return parent_el;
}




SpellingMatchModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "The correct answer is \"" + this.clue + " = " + this.correct + '"';
    
    this.quiz.question_complete();
};













// below can be used for initializing or incrementing
// when initializing counter argument will be 0 or absent
// SpellingMatchModeGame.prototype.set_beehack_level123 = function (counter) {
//     var increment;
    
    
    
    
//     ///// adding some flexibility in case we want to change the increment
//     if (!counter) {
//         increment = 0;
//     } else if (counter === "+1") {
//         increment = 1;
//     } else {
//         console.log("PROBLEM: counter should be +1 or null");
//         increment = 0;
//     }
    
    
    
//     // some error-catching
//     if (!session_bee_counter) {
//         console.log("beehack123 PROBLEM: no session_bee_level");
//     }
//     if (!spelling_bee_training_counter) {
//         console.log("beehack123 PROBLEM: no spelling_bee_training_level");
//     }
    
    
//     ///////WHETHER WE INCREMENT OR NOT/////
//     // if player is on a level equal to or above his real level
//     // we increase his session level
//     // because session_level is that which persists
    
//     // todo @beehack, make into a function
//     var temporary_boolean = in_spelling_bee_training_mode && session_bee_counter > spelling_bee_training_counter;
    
//     if (!temporary_boolean) {
//         console.log("BEEHACK770 boolean is false, incrementing session_bee_counter")
//         session_bee_counter = session_bee_counter + increment;
//     }
//     // we always increment training level to make it progressively harder
//     spelling_bee_training_counter = spelling_bee_training_counter + increment;
    
    
    
    
//     //////WHAT WE SET LEVEL TO//////
//     // the default case, no bee level clicked in quiz
//     // so we set to session_bee_level
//     if (!in_spelling_bee_training_mode) {
//         this.set_level_by_counter(session_bee_counter);
//     } 
//     // when a bee level is clicked in quiz
//     // we set it to that level
//     else {
//         this.set_level_by_counter(spelling_bee_training_counter);
//     }
// }


// SpellingMatchModeGame.prototype.initialize_bee_level = function () {
//     console.log("BEEHACK789 initialize_bee_level entered")
//     // below gets from firebase, should be an integer
    
//     var counter_to_set;
//     var counter_from_firebase = this.quiz.get_initial_spelling_bee_counter();
    
//     console.log("BEEHACK666 about to compare session to firebase");
//     console.log("BEEHACK666 session_bee_counter = ", session_bee_counter);
//     console.log("BEEHACK666 counter_from_firebase = ", counter_from_firebase);
//     console.log("BEEHACK666 equality comparison = ", session_bee_counter > counter_from_firebase);
    
    
    
    
    
//     if (session_bee_counter > counter_from_firebase) {
//         counter_to_set = session_bee_counter;
//         console.log("BEEHACK666 greater than,  level initialized at = ", session_bee_counter);
        
//     } else {
//         session_bee_counter = counter_from_firebase;
//         counter_to_set = counter_from_firebase;
//         console.log("BEEHACK666 less than, level initialized at = ", counter_from_firebase);
        
//     }
    
    
    
    
    
    
//     if (in_spelling_bee_training_mode) {
//         console.log("BEEHACK 666 training mode, level initialized at: ", spelling_bee_training_counter);
//         counter_to_set = spelling_bee_training_counter;
//     }
    
    
//     console.log("BEEHACK666 counter_from_firebase = ", counter_from_firebase);
//     console.log("BEEHACK666 session_bee_counter = ", session_bee_counter);
//     console.log("BEEHACK666 spelling_bee_training_counter = ", spelling_bee_training_counter);
//     console.log("BEEHACK666 setting counter as  = ", counter_to_set);
    
    
//     this.set_level_by_counter(counter_to_set);
// }


// @! hopefully obsolete soon, get rid of
// @beehack 
// short term version to connect counter to level
// SpellingMatchModeGame.prototype.set_default_beehack_level = function (counter) {
//     var output = counter_to_etym_level_map[counter];
    
//     if (output) {
//         this.level = output;
//     } else {
//         this.level = {'etym_level': 50}
//     }
// }

