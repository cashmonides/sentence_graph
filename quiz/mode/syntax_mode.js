// syntax mode.

var SyntaxModeGame = function (chapter, question) {
    this.data = null;
    this.quiz = null;
    // todo we here assume that 1 is the initial level
    this.level = 1;
    // we might replace this (this.level??? This comment was initially on the above line.)
    // with this.current_chapter & this.current_question
    this.current_chapter = chapter;
    this.current_question = question;
    this.metrics = {
        'completed': 0,
        'skipped': 0
    }
};

SyntaxModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
SyntaxModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
SyntaxModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

SyntaxModeGame.prototype.get_mode_name = function () {
    return 'syntax';
}

SyntaxModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    // (should word_selector.setup bave a flag for clickable or not clickable?
    // maybe something like in setup, if clickable is false then it just sets r[0] to false

    //todo
    set_display("latin_answer_choices", 'initial');  //we'll just use this part for syntax answer choices, should work the same
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'none');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
    
};

// set_level now moved up
SyntaxModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}


SyntaxModeGame.prototype.get_mode_name = function() {
    return "syntax";
};

SyntaxModeGame.prototype.sentence_finder = function () {
    return new SentenceFinder(this.current_chapter, this.current_question);
}

SyntaxModeGame.prototype.on_last_region = function () {
    return this.data.length - 1 === this.region_number;
}

SyntaxModeGame.prototype.chapter_and_question = function () {
    return this.current_chapter + '.' + this.current_question;
}

SyntaxModeGame.prototype.next_question = function () {
    if (this.data && this.on_last_region()) {
        return_to_profile();
    }
    if (!this.data) {
        this.region_number = 0;
        make_syntax_question(
            this.current_chapter, this.current_question,
            this.real_next_question.bind(this));
    } else {
       this.region_number++;
       this.real_next_question(this.data);
    }
    /*
    if (!(this.data) || this.on_last_region()) {
        if (this.data && this.on_last_region()) {
            return_to_profile();
        }
        this.current_question++;
        this.region_number = 0;
        make_syntax_question(
            this.current_chapter, this.current_question,
            this.real_next_question.bind(this));
    } else {*/
    // this.region_number++;
    // this.real_next_question(this.data);
    /*}*/
}

SyntaxModeGame.prototype.real_next_question = function (data) {
    
    this.data = data;
    
    data = data[this.region_number];
    
    this.question = data.question;
    this.sentence = data.sentence;                 // text displayed in display box
    this.target_indices = data.target_indices;      // highlighted word if necessary

    
    
    //changes the score, progress bar, etc.
    
    
    //todo very important: why is chrome throwing errors at update display in mf & syntax mode while safari doesn't???!!!
    if (!this.quiz.user.is_mf()) {
        this.quiz.update_display();
    };
    
    
    
    
    // We should probably set the question type to the question asked.
    Quiz.set_question_text(this.question);
    this.quiz.set_word_selector(data.sentence);
    
    
    //drop_downs is a list of dictionaries
        //each dictionary has 3 properties:
        //heading
        //choices
        //correct answer (string or index?)
    //is the following formulation otiose? should we just do data.drop_downs?
    this.drop_downs = data.drop_downs;
    
    this.give_away_phrase = 'If you\'d like to skip this question and move on, click "SKIP". If you\'d like to keep trying, click "SUBMIT".';
    this.give_away_ending_phrase = "";
    this.correct_answer = this.drop_downs.map(function (x) {
        return x.correct_answer || x.non_drop_text}).join(' ');
    
    // console.log("DEBUG entering 1st random_choice");
    this.none_display = true;
    
    remove_element_by_id("latin_answer_choices");
    
    var new_answer_choices = document.createElement('div');
    
    new_answer_choices.id = "latin_answer_choices";
    
    el('drop_downs').appendChild(new_answer_choices);
    
    //todo - I found this in the code - what is the point of it?
    // remove_children(document.getElementById("answer_choices"));
    //todo why is this capitalized
    Quiz.set_question_text(this.question);
    this.quiz.set_word_selector(this.sentence);
    
   
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    // state state state. If you see state in your code, come here.
    // State appears to have died everywhere but quick mode.
    // But since there are target indices, there is an issue.
    // Best thing to do: set state, or take it as an argument.
    // And in reality, it's just the quiz. this.quiz is my far preferred name.
    // State may have been completely hunted down. Then again,
    // it may just be lying in wait for the next coder.
    this.highlight_indices();
    
    // We don't need to guarantee a drop down.
    this.make_drop_downs();
};

SyntaxModeGame.prototype.highlight_indices = function () {
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {
            this.quiz.word_selector.set_highlighted(x, true);
        });
    }
}

SyntaxModeGame.prototype.display = function (x) {
    return x.type === 'non_drop' || x.correct_answer || this.none_display;
};

SyntaxModeGame.prototype.drop_down_location = "pre_footer";

//master function makes all the drops
SyntaxModeGame.prototype.make_drop_downs = function () {
    var self = this;
    this.drop_downs.forEach(function (x, index) {
        x.e = self.add_single_drop_down(x, index);
    });
};

SyntaxModeGame.prototype.drop_down_for = function (x) {
    if (x === undefined || x === null) {
        throw 'Cannot try to find drop down with header "' + x + '".';
    }
    if (typeof x === 'object') {
        throw 'Cannot find drop down with a type that is an object.';
    }
    for (var i = 0; i < this.drop_downs.length; i++) {
        if (this.drop_downs[i].type === x) {
            return this.drop_downs[i];
        }
    }
    throw 'No ' + x + ' drop down found!';
};

SyntaxModeGame.prototype.correct_answer_for = function (x) {
    return this.drop_down_for(x).correct_answer;
}

SyntaxModeGame.prototype.selected_answer_for = function (x) {
    return selected_option(this.drop_down_for(x).e);
}

SyntaxModeGame.prototype.get_convention_info = function (type) {
    return {
        'type': type,
        'correct': this.correct_answer_for(type),
        'given': this.selected_answer_for(type),
        'get_drop_down_correct': this.correct_answer_for.bind(this),
        'sentence': this.chapter_and_question()
    }
}

SyntaxModeGame.prototype.is_against_convention = function (type) {
    var info = this.get_convention_info(type);
    var result = conventions_matched(info);
    
    if (result.length > 0) {
        this.conventions_broken[type] = result;
        return true;
    } else {
        return false;
    }
}

SyntaxModeGame.prototype.correct_type = function (given, correct, type) {
    if (correct === 'not applicable' || correct === given) {
        return new LegalAnswerType('correct');
    } else if (this.is_against_convention(type)) {
        return new LegalAnswerType('convention');
    } else {
        return new LegalAnswerType('incorrect');
    }
}

SyntaxModeGame.prototype.add_single_drop_down = function (x, index) {
    // console.log('making a drop down with', x, index);
    return make_drop_down_html(x.choices, this.drop_down_location, index);
}

SyntaxModeGame.prototype.current_pos = function () {
    return this.data[this.region_number].pos;
}

SyntaxModeGame.prototype.relevant_drop_downs = function () {
    return this.drop_downs.filter(function (x) {
        return x.correct_answer !== 'not applicable';
    });
}

SyntaxModeGame.prototype.check_verb_correctness = function () {
    var self = this;
    return combine_answer_types(this.drop_downs.map(function (x) {
        return self.correct_type(selected_option(x.e), x.correct_answer, x.type);
    }));
}

/*
SyntaxModeGame.prototype.turn_dropdown_red = function (name) {
    var d = this.drop_down_for(name).e;
    
    console.log(d);
    
    var v = d.options[d.selectedIndex];
    
    v.style.color = 'red';
    
    if (v.indexOf('<') === -1) {
        d.options[d.selectedIndex].innerHTML = redden(v);
    }
}
*/

SyntaxModeGame.prototype.check_noun_dropdowns = function () {
    var num_selected = this.drop_downs.filter(function (x) {
        return x.e.selectedIndex !== 0;
    }).length;
    if (num_selected === 0) {
        return 'You didn\'t seem to select any answer choices!';
    } else if (num_selected > 1) {
        return 'You seemed to select more than one answer choice!';
    } else {
        return null;
    }
}

SyntaxModeGame.prototype.check_noun_correctness = function () {
    var relevant_drop_down = this.relevant_drop_downs()[0];
    var correct = selected_option(relevant_drop_down.e) ===
    relevant_drop_down.correct_answer;
    return answer_type_from(correct);
}

SyntaxModeGame.prototype.check_correctness = function () {
    var self = this;
    var correct;
    var info;
    if (this.current_pos() === 'verb') {
        return this.check_verb_correctness();
    } else if (this.current_pos() === 'noun') {
        var issue = this.check_noun_dropdowns();
        if (issue !== null) {
            return new LegalAnswerType('message', {'message': issue});
        }
        return this.check_noun_correctness();
    }
}

SyntaxModeGame.prototype.pre_process_answer = function () {
    this.conventions_broken = {};
}

SyntaxModeGame.prototype.alert_convention_broken = function (name, times) {
    var convention = ALL_CONVENTIONS[name];
    /*
    var init_string;
    if (times === 0) {
        init_string = 'Correct! But ';
    } else {
        init_string = 'Also, '
    }
    */
    var self = this;
    var message = convention.message.replace(
        /@(\w+)/g, function (x) {return self.correct_answer_for(x.slice(1))}).replace(
        /\$(\w+)/g, function (x) {return self.selected_answer_for(x.slice(1))}).replace(/~/g, '');
    alert(message);
}

SyntaxModeGame.prototype.display_broken_convention_alerts = function () {
    var times_alerted = 0;
    var type;
    for (var i = 0; i < verb_drop_down_types.length; i++) {
        type = verb_drop_down_types[i];
        if (type in this.conventions_broken) {
            this.alert_convention_broken(this.conventions_broken[type], times_alerted);
            times_alerted++;
        }
    }
}

SyntaxModeGame.prototype.process_answer = function() {
    this.pre_process_answer();
    var answer_type = this.check_correctness();
    if (answer_type.is_type('correct')) {
        this.process_correct_answer();
    } else if (answer_type.is_type('incorrect')) {
        this.process_incorrect_answer();
    } else if (answer_type.is_type('convention')) {
        this.display_broken_convention_alerts();
        this.process_correct_answer();
    } else if (answer_type.is_type('message')) {
        alert(answer_type.get('message'));
    }
};

SyntaxModeGame.prototype.remove_drop_downs = function () {
    var e;
    for (var i = 0;;i++) {
        e = el('drop_answer_choices' + i);
        if (e === null) {
            break;
        }
        remove_element(e);
    }
}



SyntaxModeGame.prototype.process_correct_answer = function () {
    this.metrics.completed++;
    this.quiz.increment_score();
    
    // Only update when question is finished.
    // this.quiz.update_sentence_log(this.sentence_finder(), "completed");
    
    // console.log("DEBUG entering 2nd random_choice");
    var relevant_data = this.data[this.region_number];
    
    var syntax_info;
    
    var self = this;
    
    if (this.current_pos() === 'verb') {
        syntax_info = this.drop_downs.map(function (x) {
            return x.type + ': ' + self.correct_answer_for(x.type);
        }).join('<br>')
    } else if (this.current_pos() === 'noun') {
        syntax_info = this.relevant_drop_downs()[0].correct_answer;
    }
    
    var cell_1 = random_choice(SyntaxModeGame.cell_1_feedback_right) + '<br><br>' +
    'The syntax of <em>' + relevant_data.target_indices.map(function (index) {
        return relevant_data.words[index];
    }).join(' ') + '</em> is:<br>' + syntax_info + '<br>&nbsp;';
    var fbox = el("feedbackbox");
    el('questionbox').innerHTML = '';
    fbox.innerHTML = cell_1;
    
    
    // console.log("DEBUG 5-29 checkpoint 1");
    if (this.on_last_region()) {
        this.quiz.word_selector.clear();
    }
    
    this.remove_drop_downs();

    // console.log("DEBUG 5-29 checkpoint 2");
    this.quiz.question_complete();
};



SyntaxModeGame.prototype.process_incorrect_answer = function () {
    this.quiz.submodule.incorrect_streak++;
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG if not triggered");
    }
    
    var self = this;
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        console.log("DEBUG entering 3rd random_choice");
        
        var cell_1 = random_choice(SyntaxModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(SyntaxModeGame.cell_3_feedback_wrong);
        
        var syntax_info;
        var pre_text;
    
        if (this.current_pos() === 'verb') {
            pre_text = 'Your answers:';
            syntax_info = this.drop_downs.map(function (x) {
                var text =  x.type.toUpperCase() + ': ' + selected_option(x.e);
                
                if (self.correct_type(selected_option(x.e), x.correct_answer, x.type).is_type('correct')) {
                    return text;
                } else {
                    return redden(text);
                }
            }).join('<br>')
        } else if (this.current_pos() === 'noun') {
            pre_text = 'Your answer:';
            syntax_info = redden(this.drop_downs.map(function (x) {
                if (x.e.selectedIndex === 0) {
                    return '';
                } else {
                    return selected_option(x.e);
                }
            }).join(''));
        }
        
        console.log("DEBUG leaving 3rd random_choice");
        
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + ' ' + cell_3 + '</br\/></br\/>' + pre_text + '</br\/>'
        + syntax_info + '</br\/>';
    } else {
        this.give_away_answer();
    }
    //todo very important: why is chrome throwing errors at update display in mf & syntax mode while safari doesn't???!!!
    if (!this.quiz.user.is_mf()) {
        this.quiz.update_display();
    };
    
    //todo check if this is the right place to clear the word selector
    //this.quiz.word_selector.clear();
};

SyntaxModeGame.prototype.give_away_answer = function () {
    set_display("next_button", 'none');
    set_display("feedback_for_input", 'initial');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("skip_button", 'initial');
    var skip_button = el("skip_button");
    var skip_onclick = skip_button.onclick.bind(skip_button);
    var self = this;
    skip_button.onclick = function () {
        self.metrics.skipped++;
        self.remove_drop_downs();
        skip_onclick();
    }
    var fbox_for_input = el("feedback_for_input");
    fbox_for_input.innerHTML = this.give_away_phrase;
    
    
    //todo hacky quick fix, make more elegant later
    document.getElementById("feedback_for_input").style.fontSize = "medium";
    
    // var fbox = el("feedbackbox");
    // fbox.innerHTML = "";
    
    
    
    console.log("DEBUG 5/23 checkpoint #3 - give away answer triggered");
};

/*
SyntaxModeGame.prototype.give_away_answer = function () {
    set_display("skip_button", 'initial');
    this.remove_drop_downs();
    var fbox = el("feedbackbox");
    fbox.innerHTML = this.give_away_phrase + this.correct_answer + this.give_away_ending_phrase;
    this.quiz.question_complete();
};
*/