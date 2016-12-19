// KCK mode.




// Global levels, somewhat of a hack.
// (Akiva: this seems to be only used here. Is it actually used or is it just a free-floating hack?)
// // var global_levels;

var get_remove_dashes_bool = function (kck_level) {
    var dashes_removed = get_current_module(kck_level).verb_dashes_removed;
    if (typeof dashes_removed === 'boolean') {
        return dashes_removed;
    } else {
        return read_bool_maybe_string(weighted(dashes_removed));
    }
}

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
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'initial');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'none');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
    set_display("spelling_hint_button", 'none');
    set_display("dash_hint_button", 'initial');
    set_display("set_spelling_bee_level_button", 'none');
    
    //current best result for clearing morphology
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class('cleared_in_etymology', 'initial');
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
    
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
    
    
    
    // define source and target language
    var source_language = weighted_choice(
        get_current_module(this.level.kck_level).source_language);
    var target_language = weighted_choice(
        get_current_module(this.level.kck_level).target_language,
        function (x) {return x !== source_language});
    this.source_language = source_language;
    this.target_language = target_language;
    
    //sets up our lexicon
    // var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    // var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    // todo implement generate_sentence function returning a sentence
    var sentence = generate_sentence(
        source_language, target_language,
        this.level.kck_level, this.level.latin_extra_level, null);
    // console.log('sentence =', sentence);
    // this.cheat_sheet = data.cheat_sheet;
    // sets data
    // var data = make_output(this.level, null, 'quiz_english');
    // todo implement or find some method that does this
    this.question = sentence.translate_into(source_language);
    // console.log('question =', this.question);
    // todo is the following otiose?
    // this.sentence = data.sentence;              // text displayed in display box
    // this.target_indices = data.target_indices;      //highlighted word if necessary
    
    this.cheat_sheet = this.kck_cheat_sheet(sentence.chosen_lexemes);
    
    
    
    this.dash_hint = get_dash_hint_list2(this.quiz.module.dash_hint_level);
    
    
    
    var remove_dashes_bool = get_remove_dashes_bool(this.level.kck_level);
    
    //a hack using a global variable for quick result, refactor when possible
    remove_dashes_global_hack = remove_dashes_bool;
    back.log("remove_dashes_global_hack = ", remove_dashes_global_hack);
    
    var process_output;
    
    if (remove_dashes_bool) {
        process_output = remove_dashes_and_metacharacters;
    } else {
        process_output = remove_metacharacters;
    }
    
    //changes the score, progress bar, etc.
    this.quiz.update_display();

    Quiz.set_question_text("Translate the following sentence:");
    
    this.question = process_output(this.question);
    
    this.quiz.add_question_text(this.question);
    
    //todo check if this works
    
    // todo implement or find some method that does this
    var drops_and_non_drops = sentence.get_all_drops_and_non_drops(this.level.kck_level, target_language);
    // console.log('drops and non drops =', drops_and_non_drops);
    
    
    for (var i = 0; i < drops_and_non_drops.length; i++) {
        var path = drops_and_non_drops[i].drop.correct_path;
        path[path.length - 1] = process_output(
            path[path.length - 1]);
        drops_and_non_drops[i].non_drop.text = process_output(
            drops_and_non_drops[i].non_drop.text);
    }
    
    var roles = drops_and_non_drops.map(function (x) {
        return x.role;
    });
    var drop_choices = choose_drops_and_non_drops(roles, this.level.latin_drop_level);
    this.used_drops_and_non_drops = [];
    var i;
    var role_num = drops_and_non_drops.length;
    for (i = 0; i < role_num; i++) {
        this.used_drops_and_non_drops.push(drops_and_non_drops[i][drop_choices[i]]);
    }
    
    this.actual_drops = this.used_drops_and_non_drops.filter(function (x) {
        return x instanceof DropDown;
    });
    
    // console.log('used drops and non drops =', this.used_drops_and_non_drops);
    
    this.give_away_phrase = "The correct answer was: ";
    this.give_away_ending_phrase = ".";
    
    // todo implement or find some method that does this
    this.correct_answer_as_string = sentence.translate_into(target_language);
    
    //implement this when ready
    // if remove_verb_dashes = true
    this.correct_answer_as_string = process_output(this.correct_answer_as_string);
    
    this.correct_answer_as_path = drops_and_non_drops.map(function (x) {
        return x.drop.correct_path;
    });
    
    // console.log('correct =', this.correct_answer_as_string, this.correct_answer_as_path);
    
    // console.log("DEBUG this.correct_answer = ", this.correct_answer);
    
    // console.log("DEBUG entering 1st random_choice");
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
    Quiz.set_question_text('Translate the following sentence:');
    
   
    // this.quiz.word_selector.is_clickable = false;
    // this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
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
    attach_all_to(this.used_drops_and_non_drops, e);
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
    var drop_down_statuses = this.actual_drops.map(function (x) {
        return x.get_status();
    });
    // console.log('drop down statuses =', drop_down_statuses);
    this.display_green_and_red_path(drop_down_statuses);
    // 'correct', 'incorrect', or 'missed'
    var correct_status = get_correct_status(drop_down_statuses);
    if (correct_status === 'correct') {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};









KCKModeGame.prototype.process_correct_answer = function () {
    this.quiz.increment_score();
    
    // console.log("DEBUG entering 2nd random_choice");
    var cell_1 = random_choice(KCKModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML += '<br/>' + cell_1 + " ";
    var correct_answer_as_string_for_path = this.correct_answer_as_string;
    var question_as_string_for_path = this.question;
    var question_plus_answer_as_string = question_as_string_for_path + " = " + correct_answer_as_string_for_path;
    // console.log("DEBUG answer_as_string_for_path =", correct_answer_as_string_for_path);
    fbox.appendChild(document.createTextNode(question_plus_answer_as_string));
    fbox.appendChild(document.createElement('br'));
    fbox.appendChild(document.createElement('br'));
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
        // console.log("DEBUG entering 3rd random_choice");
        
        var cell_1 = random_choice(KCKModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(KCKModeGame.cell_3_feedback_wrong);
        
        
        
        // console.log("DEBUG leaving 3rd random_choice");
        
        var fbox = el("feedbackbox");
        fbox.innerHTML += "<br/>" + cell_1 + " " + cell_3;
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
    return this.give_away_phrase + " " + this.correct_answer_as_string + this.give_away_ending_phrase
}

// todo implement this (maybe a new div?)
KCKModeGame.prototype.display_green_and_red_path = function (statuses) {
    var o = el('feedbackbox');
    remove_all_children(o);
    // var question_as_string_for_path = this.question;
    // console.log("DEBUG question_as_string_for_path =", question_as_string_for_path);
    // o.appendChild(document.createTextNode(question_as_string_for_path));
    // o.appendChild(document.createElement('br'));
    // o.appendChild(document.createElement('br'));
    
    var status;
    var e;
    for (var i = 0; i < statuses.length; i++) {
        if (i !== 0 && o.lastChild.tagName.toLowerCase() !== 'div') {
            o.appendChild(document.createElement('br'));
        }
        status = statuses[i];
        if (status === 'missed') {
            var e = document.createElement('font');
            e.style.color = 'gray';
            e.innerHTML = 'You missed this drop down';
        } else {
            var e = display_status(status);
        }
        o.appendChild(e);
    }
    
}






// modified for the different lexicon format of kck
// no properties
KCKModeGame.prototype.kck_cheat_sheet = function (chosen_lexemes) {
    var source_language = this.source_language;
    var target_language = this.target_language;
    var lexemes_sorted_by_part_of_speech = Object.keys(chosen_lexemes).sort().map(function (x) {
        return chosen_lexemes[x];
    });
    // We sort each group.
    var lexemes_sorted_by_root = lexemes_sorted_by_part_of_speech.map(function (x) {
        return quick_sort(x, sort_by_func(function (x) {
            return x.get_citation_form_in(source_language);
        }))
    });
    // We push the part of speech to each item (as a header).
    for (var i = 0; i < lexemes_sorted_by_root.length; i++) {
        var item = lexemes_sorted_by_root[i];
        var typical_lexeme = item[0];
        item.unshift(typical_lexeme.get_part_of_speech() + 's');
    }
    var result = concat_map(lexemes_sorted_by_root, function (x) {
        return x.map(function (y) {
            if (y instanceof KCKLexeme) {
                return [y.latin.roots.root_2 + ' (' + y.latin.conjugation + ')', y.core_properties.name];
            } else if (is_object(y)) {
                return [y.get_citation_form_in(source_language), y.get_citation_form_in(target_language)];
            } else {
                return y;
            }
        });
    });
    // console.log(result);
    return result;
}