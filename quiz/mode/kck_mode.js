// KCK mode.

var KCKModeGame = function () {
    this.data = null;
    this.quiz = null;
    // todo we here assume that 1 is the initial level
    this.level = 1;
};

KCKModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
KCKModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
KCKModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

KCKModeGame.prototype.attach = function () {
    // make word selector nonclickable (somewhere in set word selector)
    // (should word_selector.setup bave a flag for clickable or not clickable?
    // maybe something like in setup, if clickable is false then it just sets r[0] to false

    //todo
    set_display("latin_answer_choices", 'initial');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'initial');
    set_display("vocab_cheat_button", 'initial');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'none');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
    // state.switch_count = 1
    
    //this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    //make_element( <button .....onclick = this.process_answer()>  )
};

// set_level now moved up
KCKModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}


KCKModeGame.prototype.get_mode_name = function() {
    return "kck";
};


KCKModeGame.prototype.next_question = function () {
    var types_of_level = ['latin_drop_level', 'latin_extra_level', 'latin_cosmetic_level', 'kck_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    //sets up our lexicon
    var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    // todo implement generate_sentence function returning a sentence
    var sentence = generate_sentence();
    // this.cheat_sheet = data.cheat_sheet;
    // sets data
    // var data = make_output(this.level, null, 'quiz_english');
    // todo implement or find some method that does this
    this.question = sentence.get_text_in_source_language();
    // todo is the following otiose?
    // this.sentence = data.sentence;              // text displayed in display box
    // this.target_indices = data.target_indices;      //highlighted word if necessary

    
    
    //changes the score, progress bar, etc.
    this.quiz.update_display();

    Quiz.set_question_text("Translate the following sentence:");
    this.quiz.add_question_text(this.question);
    //todo check if this works
    
    // todo implement or find some method that does this
    this.drops_and_non_drops = sentence.get_drops_and_non_drops_in_target_language();
    
    this.give_away_phrase = "The correct answer was: ";
    this.give_away_ending_phrase = ".";
    
    // todo implement or find some method that does this
    this.correct_answer_as_string = sentence.get_correct_answer_string();
    
    this.correct_answer_as_path = sentence.get_correct_answer_paths();
    
    // console.log("DEBUG this.correct_answer = ", this.correct_answer);
    
    console.log("DEBUG entering 1st random_choice");
    this.none_display = random_choice(map_level_to_allowed(
        this.level.latin_extra_level, latin_extra_levels).none_display);
    
    // We now use this to guarantee that our answer choices end up in the right place.
    // remove_element(el("answer_choices"));
    remove_element_by_id("latin_answer_choices");
    
    var new_answer_choices = document.createElement('div');
    
    new_answer_choices.id = "latin_answer_choices";
    
    el('drop_downs').appendChild(new_answer_choices);
    
    // document.getElementById("answer_choices").removeChild(
    //    document.getElementById('answer_wrapper'));
    
    var e = document.createElement('div');
    e.id = 'latin_answer_wrapper';
    new_answer_choices.appendChild(e);
    
    // todo - I found this in the code - what is the point of it?
    // remove_children(document.getElementById("answer_choices"));
    // todo why is this capitalized
    Quiz.set_question_text(this.question);
    this.quiz.set_word_selector(this.sentence);
    
   
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    /*
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }
    */

    // Make the drop downs.
    this.make_drop_down(e);

};

KCKModeGame.prototype.display = function (x) {
    return x.type === 'non_drop' || x.correct_answer || this.none_display;
};

//master function makes all the drops and non-drops
KCKModeGame.prototype.make_drop_down = function (e) {
    // todo is this right?
    for (var i = 0; i < this.drop_downs.length; i++) {
        // todo do we need breaks?
        this.drop_downs[i].attach_to(e);
    }
    /*
    //initialize a count of how many drop down menus we'll have
    // if it remains 0 we start all over again
    var drops = 0;
    var self = this;
    
    //this.drop_downs is a list of drops and non-drops
    //each item in the list is a dictionary and has a type
    // type = drop or non-drop
    // dictionary for drop = heading, choices
    // dictionary for non-drop = non-drop text
    this.drop_downs.forEach(function (x) {
        if (self.display(x)) {
            switch (x.type) {
                case 'non_drop':
                    // todo make sure this fix works
                    var e1 = document.createTextNode(x.non_drop_text || '');
                    e.appendChild(e1);
                    break;
                case 'drop down':
                    // e = element we're appending to
                    // x = dictionary with the following properties
                    //x.choices = ['bear', 'bears']
                    //x.heading = "subject"
                    //self.none_display = bool
                    set_multiple_drop_downs(x, e, self.none_display);
                    drops++
                    break;
                default:
                    throw new Error('Drop downs should have a type.')
            }
            e.appendChild(document.createTextNode(' '))
        }
    });
    return drops
    */
};



KCKModeGame.prototype.process_answer = function(){
    var is_correct = this.drop_downs.every(function (x) {
        // todo how do we do this?
        return x.check_drop_down_correctness();
    });
    this.display_green_and_red_path();
    if (is_correct) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};









KCKModeGame.prototype.process_correct_answer = function () {
    this.quiz.increment_score();
    
    console.log("DEBUG entering 2nd random_choice");
    var cell_1 = random_choice(KCKModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;

    this.quiz.question_complete();
};



KCKModeGame.prototype.process_incorrect_answer = function () {
    this.quiz.submodule.incorrect_streak ++;
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG if not triggered");
    }
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        console.log("DEBUG entering 3rd random_choice");
        
        var cell_1 = random_choice(KCKModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(KCKModeGame.cell_3_feedback_wrong);
        
        
        
        console.log("DEBUG leaving 3rd random_choice");
        
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_3;
    } else {
        this.give_away_answer();
    }
    this.quiz.update_display();
    // KCKMode has no real word selector
    // this.quiz.word_selector.clear();
};

KCKModeGame.prototype.give_away_answer = function () {
    var fbox = el("feedbackbox");
    fbox.innerHTML = this.display_give_away_answer();
    this.quiz.question_complete();
};

KCKModeGame.prototype.display_give_away_answer = function () {
    // todo figure out how to combine string and path
    return this.give_away_phrase + ' [todo] ' + this.give_away_ending_phrase
}

// todo implement this (maybe a new div?)
KCKModeGame.prototype.display_green_and_red_path = function () {
    throw 'Not yet implemented!';
}