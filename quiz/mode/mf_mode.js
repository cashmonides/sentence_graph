var MFModeGame = function (path) {
    this.data = null;
    this.quiz = null;
    this.match_fraction = null;
    this.student_answer = null;
    // this.current_chapter = null;
    // this.current_question = null;
    this.current_path = path;
    this.metrics = {
        'completed': 0,
        'skipped': 0
    }
};

// mf sentences moved to obsolete.

var get_mf_questions = function (fn) {
    fn(mf_sentences);
}

MFModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
// Originally values here were lists with the same item repeated.
// I made them strings because I thought that would be clearer.
// But then it turned out that they weren't ever used.
// So I commented them out.
// MFModeGame.cell_1_feedback_wrong = "That doesn't match the model translation.";
// MFModeGame.cell_3_feedback_wrong = "That doesn't match the model translation.";

// This function is called very often (every question).
// So it is not a good place for one-time things.
MFModeGame.prototype.attach = function() {
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'initial');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
    // @cleanup
    // set_display("spelling_hint_button", 'none');
    set_display("spelling_hint_button_master", "none");
    set_display("dash_hint_button", 'none');
    
    set_display_of_class("bee_button", 'none');
    
    //current best result for clearing morphology
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class('cleared_in_etymology', 'initial');
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
    
    // set_display("feedback_for_input", 'none');
};

// Once the game is attached to the quiz, this is what must be done.
// (currently nothing)
MFModeGame.prototype.do_with_quiz_attachment = function () {
    /// this.chapter_and_sentence_init();
}

/*

MFModeGame.prototype.get_current_path = function () {
    return this.current_path;
}

MFModeGame.prototype.chapter_and_sentence_init = function () {
    // This is being temporarily disabled.
    console.log('WARNING: chapter and sentence initialized ' +
    '(perhaps re-initialized)');
    var sl = this.quiz.user.data.history.sentence_logs;
    console.log('sl =', sl);
    //todo Akiva commented these out for testing, comment back in
    this.current_chapter = sl.frontier_chapter;
    this.current_question = sl[sl.frontier_chapter].frontier;
    // this.current_chapter = 1;
    // this.current_question = 0;
    console.log('this =', this);
}
*/

/*
MFModeGame.prototype.set_question = function () {
    throw 'setting question number is not implemented!!!!';
}

MFModeGame.prototype.set_chapter = function () {
    throw 'setting chapter number is not implemented!!!!';
}
*/

// These functions were added during a period when the writer
// was particularly interested in what someone somewhere
// whom I could not find with a Google search (and whom I agree with)
// calls "OOP crap." As a result, it is at least somewhat readable.

// A helper object. Denotes a location at which a sentence
// may - or may not - be. The only way to find out is to check.
// The internals are rather simple. The arguments are converted
// to numbers so we can easily add to them.
/*
var SentenceFinder = function (chapter_n, question_n) {
    if (isNaN(chapter_n)) {
        this.chapter_type = 'string';
        this.chapter_n = chapter_n;
    } else {
        this.chapter_type = 'number';
        this.chapter_n = Number(chapter_n);
    }
    if (isNaN(question_n)) {
        this.question_type = 'string';
        this.question_n = question_n;
    } else {
        this.question_type = 'number';
        this.question_n = Number(question_n);
    }
}

// Simply goes to the next sentence, without consideration
// of whether it exists.
SentenceFinder.prototype.next = function () {
    this.question_n++;
}

var sentence_finder_start_chapter = function (n) {
    return new SentenceFinder(n, 0);
}


// Turns the object into a searchable string.
// (I feel like I don't want to override toString here.
// Maybe I should.)
// . is the separator. If it changes, we can just change the dot.
SentenceFinder.prototype.as_string = function () {
    return this.chapter_n + '.' + this.question_n;
}


// Finds the number of questions to try to find.
// This will fail only if a) some section has over 1000 questions,
// and b) it has some complete gap at least 10 times the length
// of the section before the gap. This is hard to imagine.
// (Come back to this, consider if the solution which
// examines all the keys of mf_sentences might be better.)
MFModeGame.prototype.num_of_questions_to_try = function () {
    return Math.max(this.current_question * 10, 100);
}

// Finds whether a sentence (in the form of a SentenceFinder) exists.
// Uses mf_sentences. The goal is for only three methods
// (including this one) to do this.
// (Consider whether this should be a method given that
// it does not use the game object itself.)
MFModeGame.prototype.has_sentence = function (sentence_finder) {
    return sentence_finder.as_string() in mf_sentences;
}

// Checks for a sentence. Throws an error if the sentence does not exist.
// Uses mf_sentences. The goal is for only three methods
// (including this one) to do this.
// (Consider whether the this.has_sentence check would be cleaner
// as a check with mf_sentences directly, since we're not being abstract in
// this method anyway.)
MFModeGame.prototype.get_sentence = function (sentence_finder) {
    // Here is a potential alternative.
    // if (sentence_finder.as_string() in mf_sentences) {
    if (this.has_sentence(sentence_finder)) {
        return mf_sentences[sentence_finder.as_string()];
    } else {
        throw 'trying to get non-existant sentence! (potential solution: ' +
        'check for existance first)';
    }
}

// Gets the current sentence.
// Category theory implication: we can make
// (a -> b) -> (((a, b) -> c) -> (a -> c))
// to be precise (Haskell):
// func f g x = g (x, (f x))
MFModeGame.prototype.get_current_sentence = function () {
    return this.get_sentence(this.sentence_finder());
}

// Returns a SentenceFinder corresponding to the current game state.
// Uses mf_sentences. The goal is for only three methods
// (including this one) to do this. Originally the goal was two,
// but this method changed that.
MFModeGame.prototype.sentence_finder = function () {
    return new SentenceFinder(this.current_chapter, this.current_question);
}

// Sets the sentence to a sentence in the sentence finder.
// This is surprisingly simple. Do we also have to set some text question?
// Something is fishy here.
// Actually, it's fine. It's very possible to get the sentence.
MFModeGame.prototype.use_sentence = function (sentence_finder) {
    this.current_chapter = sentence_finder.chapter_n;
    this.current_question = sentence_finder.question_n;
}

// Gets the next question.
MFModeGame.prototype.get_incremented_question = function () {
    // We find the number of questions to try.
    var num_to_try = this.num_of_questions_to_try();
    // We create our sentence finder.
    var sentence_finder = this.sentence_finder();
    // Loop num_to_try times. (Note: I do not think there is
    // an off-by-one error here, but if there is it is not significant.)
    for (var i = 0; i < num_to_try; i++) {
        // Increment our sentence finder.
        sentence_finder.next();
        if (this.has_sentence(sentence_finder)) {
            // We found a sentence!
            return sentence_finder;
            // We're done.
        }
    }
    // No sentence was found!
    return 'done';
}

// Gets the first question in a chapter.
MFModeGame.prototype.get_first_question_in_chapter = function (chapter) {
    // We find the number of questions to try.
    var num_to_try = 1000;
    // We create our sentence finder.
    var sentence_finder = sentence_finder_start_chapter(chapter);
    console.log('sentence_finder =', sentence_finder);
    // Loop num_to_try times. (Note: I do not think there is
    // an off-by-one error here, but if there is it is not significant.)
    for (var i = 0; i < num_to_try; i++) {
        // Increment our sentence finder.
        sentence_finder.next();
        if (this.has_sentence(sentence_finder)) {
            // We found a sentence!
            return sentence_finder;
            // We're done.
        }
    }
    // No sentence was found!
    return 'done';
}

MFModeGame.prototype.get_sentence_finder_to_use = function (
    sentence_finder, chapter) {
    if (sentence_finder instanceof SentenceFinder) {
        return sentence_finder;
    } else {
        return this.get_sentence_finder_to_use(
            this.get_first_question_in_chapter(chapter + 1), chapter + 1);
    }
}

MFModeGame.prototype.get_next_sentence = function () {
    return this.get_sentence_finder_to_use(
        this.get_incremented_question(), this.current_chapter);
}

MFModeGame.prototype.increment_question = function () {
    var sentence_finder = this.get_next_sentence();
    this.use_sentence(sentence_finder);
}

MFModeGame.prototype.finish_chapter = function () {
    // Remove when fixed.
    alert('Finishing the chapter!!! Currently this leads to an endless loop!');
    throw 'finishing a chapter is not implemented!!!!';
}

MFModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}

*/

// The above OOP crap boils down to this, for current purposes.

MFModeGame.prototype.get_current_sentence = function () {
    return mf_sentences[path_display(this.current_path)];
}

MFModeGame.prototype.get_mode_name = function() {
    return "mf";
}





MFModeGame.prototype.next_question = function () {
    console.log("DEBUG  starting next_question in mf mode");
    
    
    clear_input_box("input_box");
    
    //todo since we're not doing drops we don't need drop_level or extra_level
    // var types_of_level = ['latin_drop_level', 'latin_extra_level', 'latin_level'];
    // var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    // this.set_level(post_sampling_level);
    
    
    
    //sets up our lexicon
    // console.log("DEBUG 1/15 this.quiz.module.id =", this.quiz, this.quiz.module, this.quiz.module.id)
    // var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    // console.log('DEBUG 11-16 lexicon = ', list_of_lexeme_strings)
    // var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    // console.log('this =', this);
    var data = this.get_current_sentence();
    
    // console.log('data, search, mf_sentences =', data,
    // this.current_chapter + '.' + this.current_question, mf_sentences);
    
    
    //this.question = data.question;
    //todo is the following otiose?
    this.sentence = data[0];
    this.model_translation = data[1];
    
    // console.log(data, this.sentence, this.model_translation);
    
    // this.target_indices = data.target_indices;      //highlighted word if necessary

    // console.log("DEBUG 4-9 data.sentence = ", data.sentence);
    
    
    
    //todo very important: why is chrome throwing errors at update display in mf & syntax mode while safari doesn't???!!!
    if (!this.quiz.user.is_mf()) {
        this.quiz.update_display();
    };

    Quiz.set_question_text("Translate the following sentence:");
    this.quiz.set_word_selector(data[0]);
    this.correct_answer = data[1];
    
    this.data = data;
    
    
    
    this.give_away_phrase = 'If you\'d like to skip this question and move on, click "SKIP". If you\'d like to keep trying, click "SUBMIT".';
    //this.give_away_ending_phrase = "dummy give away ending phrase";
    
    
    
    
    // console.log("DEBUG entering 1st random_choice");
    // this.none_display = random_choice(map_level_to_allowed(
    //     this.level.latin_extra_level, latin_extra_levels).none_display);
    
    //////////
    //todo all of below was commented out because it seemed to do strictly with drop downs which we wont use in input mode
    
    // We now use this to guarantee that our answer choices end up in the right place.
    // remove_element(el("answer_choices"));
    // remove_element_by_id("latin_answer_choices");
    
    // var new_answer_choices = document.createElement('div');
    
    // new_answer_choices.id = "latin_answer_choices";
    
    // el('drop_downs').appendChild(new_answer_choices);
    
    // document.getElementById("answer_choices").removeChild(
    //     document.getElementById('answer_wrapper'));
    
    // var e = document.createElement('div');
    // e.id = 'latin_answer_wrapper';
    // new_answer_choices.appendChild(e);
    //////////////////
    
    
    
    
   
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    // Akiva is confused on this (what is the point of it? do we need it in input mode?)
    // Dan: It highlights some words. Seems completely dead to me.
    /*
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }
    */

    //todo Akiva has no idea what to do with this below
    // Hacky way to guarantee a drop down.
    // var x = this.make_drop_down(e);
    // if (x === 0) {this.next_question()}
    
};

MFModeGame.prototype.log_data_to_firebase = function () {
    var data_to_log = {
        // 'chapter': this.current_chapter,
        // 'question': this.current_question,
        // 'username': this.quiz.user.get_personal_data('name'),
        // 'email': this.quiz.user.get_personal_data('email'),
        'latin': this.sentence,
        // 'target': this.correct_answer,
        'target': display_model_translation(this.correct_answer),
        'given': this.student_answer,
        'score': this.match_fraction
    };
    
    getting(['mf_translation_logs', this.quiz.user.get_personal_data('name'),
    this.current_path.chapter_to_database()], function (x) {
        if (!('latin' in x)) {
            x.latin = data_to_log.latin;
        }
        
        if (!('target' in x)) {
            x.target = data_to_log.target;
        }
        
        if (!('attempts' in x)) {
            x.attempts = [];
        }
        
        x.attempts.push(data_to_log.score + ', ' + data_to_log.given);
        
        return x;
    }, {'global': true, 'save_result': true, 'transform_null': true})();
    
    // console.log('data_to_log =', data_to_log);
}


//todo below is our string cleanup and matcher

MFModeGame.prototype.process_answer = function(){
    // var self = this;
    var raw_input_string = el("input_box").value;
    this.student_answer = raw_input_string;
    console.log("DEBUG INPUT 4-9 raw input string = ", raw_input_string);
    
    /*
    var processed_input_string = clean_mf_input_string(raw_input_string);
    console.log("DEBUG INPUT 4-9 process input string = ", processed_input_string);
    
    var processed_model_translation = clean_mf_model_string(this.correct_answer)
    */
    
    var match_fraction = get_match_fraction(this.correct_answer, raw_input_string);
    
    this.match_fraction = percentage(match_fraction.score, 1);
    
    this.incorrect_indices = match_fraction.incorrect;
   
   
   
    // No matter what, we want to log this data to firebase.
    this.log_data_to_firebase();
    
    if (this.match_fraction >= 75) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};


var display_student_answer = function (text, red_indices) {
    var l = [];
    var item;
    for (var i = 0; i < text.length; i++) {
        if (i in red_indices) {
            item = redden(text[i]);
        } else {
            item = text[i];
        }
        l.push(item);
    }
    return l.join('');
}


//todo below is uncomplicated, just like every other mode

MFModeGame.prototype.process_correct_answer = function () {
    this.metrics.completed++;
    
    console.log("DEBUG 5/23 checkpoint 1");
    // currently being removed
    // this.quiz.update_sentence_log(this.sentence_finder(), "completed");
    // console.log("this.current_chapter = ", this.current_chapter);
    // console.log("this.current_question = ", this.current_question);
    console.log("DEBUG 5/23 checkpoint 2");
    
    
    
    
    this.quiz.increment_score();
    
    var helpful_message;
    
    if (this.match_fraction === 100) {
        if (Object.keys(this.incorrect_indices).length === 0) {
            helpful_message = '<br\/>';
        } else {
            helpful_message = '<br\/>[But part of your answer isn\'t in the correct translation!]<br\/>';
        }
    } else {
       if (Object.keys(this.incorrect_indices).length === 0) {
            helpful_message = '<br\/>[There are still some missing words, though.]<br\/>';
        } else {
            helpful_message = '<br\/>[But some of your translation is incorrect!]<br\/>';
        }
    }
    
    
    var cell_1 = "Excellent, your match score was: " + this.match_fraction + "%" + helpful_message
    + "SENTENCE: " + this.sentence + "<br\/>" 
    + "MODEL TRANSLATION: " + display_model_translation(this.correct_answer) + "<br\/>"
    + "YOUR TRANSLATION: " + display_student_answer(
        this.student_answer, this.incorrect_indices)  + "<br\/>";
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    el('questionbox').innerHTML = '';
    
    clear_input_box("input_box");
    
    console.log("DEBUG 4-9 entering question_complete");
    this.quiz.question_complete();
};



MFModeGame.prototype.process_incorrect_answer = function () {
    
    this.quiz.submodule.incorrect_streak++;
    
    var helpful_message;
    
    if (Object.keys(this.incorrect_indices).length === 0) {
        helpful_message = ' [Looking good but you seem to have some words missing. Try again.]';
    } else {
        helpful_message = '';
    }
    
    var cell_1 = "Not exactly. Your match fraction is: " + this.match_fraction + "%<br\/>" +
    "Your translation was: " + display_student_answer(
        this.student_answer, this.incorrect_indices)  + helpful_message + "<br\/>";
    var cell_3 = "Try to get above 75%.";
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1 + " " + cell_3;
    if (this.quiz.submodule.incorrect_streak >=
    this.quiz.module.submodule.max_incorrect_streak)  {
        this.give_away_answer();
        // clear_input_box("input_box");
    }
    
    //todo very important: why is chrome throwing errors at update display in mf & syntax mode while safari doesn't???!!!
    if (!this.quiz.user.is_mf()) {
        this.quiz.update_display();
    };
    
    
    
    
    // akiva tried uncommenting the following as an experiment (but that didn't work) (the following isn't used in mcmode)
    // this.quiz.word_selector.clear();
    
    
    
};

// mf mode is special in regard to the "give away" option
// we want the feedback box to remain operational
// so we change some if statements
MFModeGame.prototype.give_away_answer = function () {
    set_display("next_button", 'none');
    set_display("feedback_for_input", 'initial');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("skip_button", 'initial');
    
    // This seems to have been planned to be
    var skip_button = el("skip_button");
    var skip_onclick = skip_button.onclick.bind(skip_button);
    var self = this;
    skip_button.onclick = function () {
        self.metrics.skipped++;
        skip_onclick();
    }
    
    var fbox_for_input = el("feedback_for_input");
    fbox_for_input.innerHTML = this.give_away_phrase;
    
    //todo hacky quick fix, make more elegant later
    document.getElementById("feedback_for_input").style.fontSize = "medium";
    // var fbox = el("feedbackbox");
    // fbox.innerHTML = "";
    //todo very important: write to firebase that they skipped this question
    //todo very important
    //write to firebase using a function like   log_skipped_sentence(this.current_question)
    
    
    
    console.log("DEBUG 5/23 checkpoint #3 - give away answer triggered");
};




////////////////////////////////////////////
