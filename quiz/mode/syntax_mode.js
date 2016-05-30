// syntax mode.



var syntax_mode_test_sentences = [
    "{\"class_id\":1,\"words\":[\"Nisi\",\"fēminae\",\"nautās\",\"sententiārum\",\"dē\",\"incolīs\",\"dāmnābunt\",\"incolae\",\"in\",\"prōvinciā\",\"nōn\",\"labōrābunt\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[7],\"tags\":[]},{\"class_id\":2,\"indices\":[8],\"tags\":[]},{\"class_id\":2,\"indices\":[9],\"tags\":[]},{\"class_id\":2,\"indices\":[10],\"tags\":[]},{\"class_id\":2,\"indices\":[11],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]}],\"text\":\"Nisi fēminae nautās sententiārum dē incolīs dāmnābunt, incolae in prōvinciā nōn labōrābunt.\",\"language_of_sentence\":\"mf\",\"chapter\":2,\"number\":13}",
    "{\"class_id\":1,\"words\":[\"Nisī\",\"tacuisset\",\"miserum\",\"monuissem\",\"ut\",\"lacrimās\",\"cēlāret\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=imperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=indirect command\"},{\"class_id\":3,\"type\":\"s=secondary\"},{\"class_id\":3,\"type\":\"r=subsequent time\"}]}],\"text\":\"Nisī tacuisset, miserum monuissem ut lacrimās cēlāret.\",\"language_of_sentence\":\"mf\",\"chapter\":3,\"number\":15}"
].map(JSON.parse);


var tag_first_to_type = {
    't': 'tense',
    'm': 'mood',
    'c': 'construction',
    's': 'sequence',
    'r': 'relative time'
}

var verb_drop_down_types = ['tense', 'mood', 'construction', 'sequence', 'relative time'];

var noun_drop_down_types = ['nominative', 'genitive', 'dative',
'accusative', 'ablative', 'infinitive'];

var is_tag_we_care_about = function (tag) {
    return tag.class_id === 3;
}

var with_tags = function (region) {
    return {'indices': region.indices, 'tags': region.tags.filter(
        is_tag_we_care_about)}
}

var get_tags_status = function (x) {
    var tag_error = function () {
        alert('This sentence has an internal issue. Please tell your ' +
        'instructor that there is a software issue: a sentence without ' +
        'proper tags has not been deleted.');
        return_to_profile();
    }
    var status = 'none';
    for (var i = 0; i < x.tags.length; i++) {
        if (!is_proper_tag(x.tags[i].type)) {
            if (!is_proper_tag(status)) {
                tag_error();
            }
            status = x.tags[i].type;
        }
    }
    if (is_proper_tag(status)) {
        tag_error();
    }
    return status;
}

var has_tags = function (x) {
    return x.tags.length > 0;
}

var is_proper_tag = function (x) {
    return x !== 'verb' && x !== 'noun';
}

var get_proper_tags = function (x) {
    return x.tags.map(function (x) {return x.type}).filter(is_proper_tag);
}

var find_noun_tag_case = function (x) {
    var ns = syntax_module_filter.noun_syntax;
    for (var i in ns) {
        if (x in ns[i])  {
            return i;
        }
    }
    alert('Noun tag type "' + x + '" not found! If you are a student, report this!');
    return_to_profile();
}

var process_region_from_firebase = function (sentence_data) {
    return function (x) {
        var tags_status = get_tags_status(x);
        var proper_tags = get_proper_tags(x);
        var r = {
            'pos': tags_status,
            'text': sentence_data.text,
            'words': sentence_data.words,
            'chapter': sentence_data.chapter,
            'number': sentence_data.number,
            'indices': x.indices,
            'tags': {}
        };
        if (tags_status === 'verb') {
            for (var i = 0; i < proper_tags.length; i++) {
               r.tags[tag_first_to_type[proper_tags[i][0]]] = proper_tags[i].slice(2);
            }
        } else if (tags_status === 'noun') {
            for (var i = 0; i < proper_tags.length; i++) {
               r.tags[find_noun_tag_case(proper_tags[i])] = proper_tags[i];
            }
        }
        return r;
    }
}

var parse_firebase_syntax_data = function (sentence_data) {
    // console.log(sentence_data);
    var sentence_text = sentence_data.words;
    var regions_with_tags = sentence_data.regions.map(with_tags).filter(has_tags);
    return regions_with_tags.map(process_region_from_firebase(sentence_data));
}

var allowed_options_repository = function () {
    var known = {};
    return function (chapter, type, pos) {
        /*
        if (chapter === undefined || chapter === null ||
        type === undefined || type === null ||
        pos === undefined || pos === null) {
            alert('There\'s something weird about this sentence, tell your instructor.');
            return_to_profile();
        }
        */
        var key = [chapter, type, pos].join('/');
        if (key in known) {
            return known[key];
        }
        chapter = Number(chapter);
        var d = syntax_module_filter[pos + '_syntax'][type];
        var r = [type.toUpperCase()].concat(Object.keys(d).filter(function (x) {
            return d[x] <= chapter;
        }));
        if (should_have_non_applicable(type)) {
           r.push('not applicable');
        };
        known[key] = r;
        return r;
    }
}

var get_allowed_options = allowed_options_repository();

var has_choices = function (x) {
    return x.choices.length > 0;
}

var convert_syntax_data_to_drop_down_data = function (data) {
    var r = data.map(function (x) {
        var drop_down_types;
        if (x.pos === 'verb') {
            drop_down_types = verb_drop_down_types;
        } else if (x.pos === 'noun') {
            drop_down_types = noun_drop_down_types;
        }
        var drop_downs = drop_down_types.map(function (y) {
            return {
                'type': y,
                'choices': get_allowed_options(x.chapter, y, x.pos),
                'correct_answer': x.tags[y] || 'not applicable'
            }
        }).filter(has_choices);
        return {
            'pos': x.pos,
            'words': x.words,
            'sentence': x.text,
            'question': "Give the syntax of the highlighted word.",
            'target_indices': x.indices,
            'drop_downs': drop_downs
        }
    });
    
    return r.sort(function (x, y) {
        if (x.pos === 'verb' && y.pos === 'noun') {
            return -1
        } else if (x.pos === 'noun' && y.pos === 'verb') {
            return 1;
        };
        var a = x.target_indices[0];
        var b = y.target_indices[0];
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else if (a === b) {
            return 0;
        } else {
            throw 'Impossible ordering!'
        }
    });
}

var get_sentence_from_firebase = function (chapter_n, question_n, fn) {
    Persist.get(['sentence_mf'], function (x) {
        var v = x.val();
        var sentences = [];
        Object.keys(v).forEach(function (y) {
            var j = JSON.parse(v[y].data);
            if (j.language_of_sentence === 'mf' && j.chapter === Number(chapter_n)
            && j.number === Number(question_n)) {
                sentences.push(j);
            }
        });
        if (sentences.length === 0) {
            throw 'No sentences!!! chapter_number = ' + chapter_n +
            ' question_number = ' + question_n;
        }
        fn(sentences[0]);
    });
}

var get_syntax_questions = function (fn) {
    Persist.get(['sentence_mf'], function (x) {
        var v = x.val();
        var sentences = {};
        Object.keys(v).forEach(function (y) {
            var j = JSON.parse(v[y].data);
            sentences[j.chapter + '/' + j.number] = j;
        });
        fn(sentences);
    });
}

var should_have_non_applicable = function (x) {
    return x === 'sequence' || x === 'relative time';
}

// This function may never be used.
var get_syntax_question_ns = function (fn) {
    get_syntax_questions(function (x) {fn(Object.keys(x))});
}

var make_syntax_question = function (chapter_n, question_n, fn) {
    return get_sentence_from_firebase(chapter_n, question_n, function (x) {
        fn(convert_syntax_data_to_drop_down_data(parse_firebase_syntax_data(x)));
    });
}

var SyntaxModeGame = function (chapter, question) {
    this.data = null;
    this.quiz = null;
    // todo we here assume that 1 is the initial level
    this.level = 1;    //we might replace this with this.current_chapter & this.current_question
    this.current_chapter = chapter;
    this.current_question = question;
    this.all_right = true;
};

SyntaxModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
SyntaxModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
SyntaxModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

SyntaxModeGame.prototype.get_mode_name = function () {
    return 'syntax';
}

SyntaxModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false

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

SyntaxModeGame.prototype.is_correct = function (given, correct) {
    return correct === 'not applicable' || correct === given;
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

SyntaxModeGame.prototype.check_correctness = function (drop_downs) {
    var self = this;
    if (this.current_pos() === 'verb') {
        return this.drop_downs.every(function (x) {
            return self.is_correct(selected_option(x.e), x.correct_answer);
        });
    } else if (this.current_pos() === 'noun') {
        var num_selected = this.drop_downs.filter(function (x) {
            return x.e.selectedIndex !== 0;
        }).length;
        if (num_selected === 0) {
            return {'message': 'You didn\'t seem to select any answer choices!'}
        } else if (num_selected > 1) {
            return {'message': 'You seemed to select more than one answer choice!'}
        } else {
            var relevant_drop_down = this.relevant_drop_downs()[0];
            return selected_option(relevant_drop_down.e) ===
            relevant_drop_down.correct_answer;
        }
    }
}

SyntaxModeGame.prototype.process_answer = function() {
    var is_correct = this.check_correctness();
    if (is_correct === true) {
        this.process_correct_answer();
    } else if (is_correct === false) {
        this.process_incorrect_answer();
    } else {
        alert(is_correct.message);
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
    this.quiz.increment_score();
    
    // Only update when question is finished.
    // this.quiz.update_sentence_log(this.sentence_finder(), "completed");
    
    // console.log("DEBUG entering 2nd random_choice");
    var relevant_data = this.data[this.region_number];
    
    var syntax_info;
    
    if (this.current_pos() === 'verb') {
        syntax_info = this.drop_downs.map(function (x) {
            return x.type.toUpperCase() + ': ' + x.correct_answer || x.non_drop_text;
        }).join('<br>')
    } else if (this.current_pos() === 'noun') {
        syntax_info = this.relevant_drop_downs()[0].correct_answer;
    }
    
    var cell_1 = random_choice(SyntaxModeGame.cell_1_feedback_right) + '<br><br>' +
    'The syntax of <em>' + relevant_data.target_indices.map(function (index) {
        return relevant_data.words[index];
    }).join(' ') + '</em> is:<br>' + syntax_info;
    var fbox = el("feedbackbox");
    el('questionbox').innerHTML = '';
    fbox.innerHTML = cell_1;
    
    
    // console.log("DEBUG 5-29 checkpoint 1");
    
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
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        console.log("DEBUG entering 3rd random_choice");
        
        var cell_1 = random_choice(SyntaxModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(SyntaxModeGame.cell_3_feedback_wrong);
        
        
        
        console.log("DEBUG leaving 3rd random_choice");
        
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_3;
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
        self.all_right = false;
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


