



/*
- another issue
      - input box needs to be wide enough to match the length of the string
      - my current temporary solution is to make it really wide as default
          e.g. size="99" will give 99 character width
         the angry lion knows that the stupid king of the bears attacked the queen of the frogs with the sword of zeus
        = 109 characters including spaces
    - another option would be to make it adapt to the width of the answer
        - so in attach we could set the size=width of the correct answer (+10 or 20 characters for padding)
        - this kind of gives them a clues as to what the answer is but not too much especially if there's padding
*/



var DefinitionInputModeGame = function(){
    this.data = null;
    this.quiz = null;
};

DefinitionInputModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
DefinitionInputModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
DefinitionInputModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];


// we want
    // submit button
    // etym cheat button (define the word ARTHROPOD, etym cheat sheet gives clues pertaining to word to word_definition)
DefinitionInputModeGame.prototype.attach = function(){
    set_display("latin_answer_choices", 'none');  // not used in input games
    set_display("drop_answer_choices", 'none'); // not used in input games
    set_display("submit_button", 'initial'); // needed for input games
    set_display("cheat_sheet_button", 'none');  // latin-specific
    set_display("vocab_cheat_button", 'none'); // latin-specific
    set_display("etym_cheat_button", 'initial'); // this game is etymological after all
    set_display("input_box", 'initial'); // needed for input games
    set_display("next_button", 'none'); // not sure what the use case of this is
    set_display("skip_button", 'none'); // might be useful but only if it incurs a penalty
    set_display("next_level_button", 'none'); // not needed until lightbox is filled
    // @cleanup
    // set_display("spelling_hint_button", 'none');
    set_display("spelling_hint_button_master", "none"); // not used in word-to-word_definition
    set_display("dash_hint_button", 'none'); // latin-specific
    
    
    set_display_of_class("bee_button", 'none'); // not used in non-bee mode
    // set_display("feedback_for_input", 'none');
    //current best result for clearing morphology
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class('cleared_in_etymology', 'initial');
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
    
    
    
};

DefinitionInputModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}

DefinitionInputModeGame.prototype.get_mode_name = function() {
    return "definition_input";
}





DefinitionInputModeGame.prototype.next_question = function () {
    
    
    
    console.log("BIRD starting next_question in definition_input mode");
    
    
    clear_input_box("input_box");
    
    
    
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    
    console.log("BIRD post_sampling_level = ", post_sampling_level);
    
    
    // todo
    // @beehack
    // this is the short term solution
    if (this.quiz.module.id === 0.5) {
        console.log("BEEHACK BEE MODE DETECTED, initiating beecatcher");
        
        
        
        var default_level_for_beehack = {'etym_level': 10};
        
        
        if (!global_beehack_new_level_set) {
            console.log("BEEHACK beehack bool is false, setting to default");
            // @beehack
            // old version below, didn't tie etym level to bee counter
            // this.set_level(default_level_for_beehack);
            // end old version
            
            
            // @ beehack
            // new version
            this.set_default_beehack_level(global_beehack_counter);
            
            console.log("BEEHACK level should be default", this.level);
        } else {
            // we skip the usual set level operation
            console.log("BEEHACK beehack bool is true, skipping set level");
            console.log("BEEHACK level should be user-input", this.level);
        }
        
    } else {
        this.set_level(post_sampling_level);
    }
    
    // @beehack
    console.log("BEEHACK FINAL LEVEL = ", this.level);
    console.log("BEEHACK FINAL BOOL = ", global_beehack_new_level_set);
    
    
    // @beehack
    if (this.quiz.module.id === 0.5) {
        //skip update display
    } else {
        this.quiz.update_display(); 
    }
    
    
    
    
    back.log("ABOUT TO CHOOSE QUESTION TYPE IN ETYMOLOGY-BASED GAMES, including definition");
    
    // we might want the flexibility of the following
    // this.legal_question_types = map_level_to_allowed(
    //     this.level.etym_level, etym_levels).question_types;
    // this.chosen_question_type = weighted(this.legal_question_types);
    // but for now we know we want word-to-word_definition, so we set it manually:
    this.chosen_question_type = 'word_to_word_definition';
    
    console.log("BIRD this.chosen_question_type = ", this.chosen_question_type);
    
    ///////todo @purge
    //sets up our lexicon
    // console.log("DEBUG 1/15 this.quiz.module.id =", this.quiz, this.quiz.module, this.quiz.module.id)
    // var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    // console.log('DEBUG 11-16 lexicon = ', list_of_lexeme_strings)
    // var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    
    
    
    // var data = make_output(this.level, current_lexicon);
    // this.cheat_sheet = data.cheat_sheet;
    
    
    /////////@endpurge
    
    
    
    
    
    
    
    // todo check this
    // turn the three numbers into a parameter
    // @beehack 
    var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 8, 12, 6);
    // console.log(question_with_cheat_sheet['question_data']);
    var question = question_with_cheat_sheet['question_data'];
    this.etymology_cheat_sheet = alphabetize_dict(
        question_with_cheat_sheet['cheat_sheet']);
        
        
        
    this.choices = alphabetize_list(question.choices);
    
    
    
    ///////////// DO
    console.log("BIRD about to make correct answer");
    this.correct = question.correct_answer;
    this.correct_answer = question.correct_answer;
    console.log("BIRD this.correct_answer = ", this.correct);
    console.log("BIRD this.correct_answer = ", this.correct_answer);
    
    
    Quiz.set_question_text("Define the following word by typing in the white box. Word =" + question.clue);
    
    
    
    this.quiz.set_word_selector(question.clue);
   
    
    
    
    this.give_away_phrase = "The dictionary definition is: ";
    this.give_away_ending_phrase = ".";
    
    
    
    
    
    
    
    /////////// todo @purge
    // console.log("DEBUG entering 1st random_choice");
    // this.none_display = random_choice(map_level_to_allowed(
        // this.level.latin_extra_level, latin_extra_levels).none_display);
    
   
    
    
    
   
    this.quiz.word_selector.is_clickable = false;
    
    ////////////// TODO DO is this needed? can it be eliminated?
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    
    
};


//todo below is our string cleanup and matcher


DefinitionInputModeGame.prototype.process_answer = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    back.log("[input_mode.process_answer] raw input string = ", raw_input_string);

    // todo all the string processing below is pretty hacky and ugly
    // at some point we should centralize it all in something like
    // clear punctuation, clear extra space, clear trailing spaces
    // and have it all in string_utils

    var processed_input_string = clean_input_string(raw_input_string);
    back.log("processed input string = ", processed_input_string);
    
    var lower_case_input_string = raw_input_string.toLowerCase();
    
    lower_case_input_string = lower_case_input_string.replace("(", "");
    lower_case_input_string = lower_case_input_string.replace(")", "");
    lower_case_input_string = lower_case_input_string.replace(".", "");
    lower_case_input_string = lower_case_input_string.replace("  ", " ");
    
    if (lower_case_input_string.slice(-1) === " ") {
        lower_case_input_string = lower_case_input_string.slice(0, -1);
    }
    

    var correct_english_translation;
    
    
    var correct_answer_without_parentheses = this.correct_answer.replace("(", "");
    correct_answer_without_parentheses = correct_answer_without_parentheses.replace(")", "");
    correct_answer_without_parentheses = correct_answer_without_parentheses.replace("   ", " ");
    correct_answer_without_parentheses = correct_answer_without_parentheses.replace("  ", " ");
    correct_answer_without_parentheses = correct_answer_without_parentheses.replace(".", "");
    correct_answer_without_parentheses = correct_answer_without_parentheses.toLowerCase();
    
    
    
    // clumsy attempt to remove final space
    // if (correct_answer_without_parentheses.charAt(-1) === " ") {
    if (correct_answer_without_parentheses.slice(-1) === " ") {
        console.log("TENERIFE space triggered");
        correct_answer_without_parentheses = correct_answer_without_parentheses.slice(0, -1);
    }
    
    
    
    
    
    //it might already be stored as this.correct_answer, in which case, we just do this
    correct_english_translation = clean_input_string(correct_answer_without_parentheses);
    
    console.log("BIRD correct_answer_without_parentheses = ", correct_answer_without_parentheses);
    console.log("BIRD correct_english_translation = ", correct_english_translation);
    console.log("BIRD processed_input_string = ", processed_input_string);
    
    
    //todo for now we're going to just send this function a string
    //later we'll need to do the necessary stripping of punctuation

    
    
    back.log("this.correct_answer = ", this.correct_answer);
    
    
    var comparison_result = this.submit_string_to_green_and_red(correct_answer_without_parentheses, lower_case_input_string);
    
    
    
    back.log("comparison_result = ", comparison_result);
    this.comparison_result = comparison_result;
    
    
    this.display_red_green_result(comparison_result);
    
    if (lower_case_input_string === correct_answer_without_parentheses) {
        back.log("input matches correct, process_correct_answer triggered");
        this.process_correct_answer();
    } else {
        back.log("input doesn't match correct, process_incorrect_answer triggered");
        this.process_incorrect_answer();
    }
};



DefinitionInputModeGame.prototype.submit_string_to_green_and_red = function (correct_answer_string, input_string) {

    var levenshtein_result = levenshtein(correct_answer_string, input_string)
    var red_green_result;
    
    if ('feedback' in levenshtein_result) {
        red_green_result = levenshtein_result.feedback;
    } else {
        red_green_result = levenshtein_result.error.split('').map(function (x) {
            return [x, 'yellow'];
        });
    }
    
    return red_green_result;
};


DefinitionInputModeGame.prototype.display_red_green_result = function (list) {
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

// more primitive version with no red-green functionality
DefinitionInputModeGame.prototype.process_answer_old = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    
    var processed_input_string = clean_input_string(raw_input_string);
    
    
    //todo we need the correct english answer - should be stored as a variable somewhere in this.next_question
    var correct_english_translation;
    
    //it might already be stored as this.correct_answer, in which case, we just do this
    correct_english_translation = clean_input_string(this.correct_answer);
    
    
    
    if (object_equals(processed_input_string, correct_english_translation)) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};

//todo below is uncomplicated, just like every other mode

DefinitionInputModeGame.prototype.process_correct_answer = function () {
    this.quiz.increment_score();
    
    var cell_1 = random_choice(DefinitionInputModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    
    clear_input_box("input_box");
    
    
    this.quiz.question_complete();
    
};



DefinitionInputModeGame.prototype.process_incorrect_answer = function () {
    this.quiz.submodule.incorrect_streak ++;
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        // do nothing
    }
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        
        
        var cell_1 = random_choice(DefinitionInputModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(DefinitionInputModeGame.cell_3_feedback_wrong);
        
        
        
        
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_3;
    } else {
        this.give_away_answer();
        // clear_input_box("input_box");
    }
    
    
    // @beehack
    if (this.quiz.module.id === 0.5) {
        //skip update display
    } else {
        this.quiz.update_display(); 
    }
    
    
    
    
    
    // akiva tried uncommenting the following as an experiment (but that didn't work) (the following isn't used in mcmode)
    // this.quiz.word_selector.clear();
    
    
    
};

DefinitionInputModeGame.prototype.give_away_answer = function (){
    set_display("next_button", 'initial');
    set_display("feedback_for_input", 'initial');
    set_display("submit_button", 'none');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("skip_button", 'none');
    
    
    var fbox_for_input = el("feedback_for_input");
    fbox_for_input.innerHTML = "The dictionary definition is: \"" + this.correct + '"';
};




