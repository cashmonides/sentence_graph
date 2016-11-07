// morphology mode

// morphology mode is a lot like kck mode

// it produces a kck sentence, picks a target language and a source language
// creates an answer (via clicking buttons not a drop down)
// the answer is fed into compare path (turns red and green)
// has the same cheat sheets (principal parts + translations)




var MorphologyModeGame = function () {
    this.data = null;
    this.quiz = null;
    // todo we here assume that 1 is the initial level
    this.level = 1;
};

MorphologyModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
MorphologyModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
MorphologyModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

MorphologyModeGame.prototype.attach = function () {
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'initial');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'none');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
};

// set_level now moved up
MorphologyModeGame.prototype.set_level = function (new_level) {
    console.log("DEBUG MORPHOLOGY set_level entered new level = ", new_level);
    this.level = new_level;
}


MorphologyModeGame.prototype.get_mode_name = function() {
    console.log("DEBUG MORPHOLOGY get_mode_name entered");
    return "morphology";
};


MorphologyModeGame.prototype.next_question = function () {
    console.log("DEBUG MORPHOLOGY next_question entered");
    //todo we probably won't need drop or extra level
    // but latin_extra_level is hard-wired into kck's generate sentence
    // so it would be tricky to just delete it
    // cosmetic level (dashes and such) - we can't implement until we build the functionality
    console.log("DEBUG MORPHOLOGY next_question checkpoint 1");
    
    var types_of_level = ['latin_drop_level', 'latin_extra_level', 'latin_cosmetic_level', 'kck_level', 'morphology_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 2");
    
    
    //this will be the point at which we establish the question type
    // whether we ask for: english to latin
    // or: properties to latin
    // or: transform latin to properties
    
    //below should work but seems to throw an error and make the game sick
    // var question_type = weighted_choice(
    //     get_current_module(this.level.morphology_levels).question_type);
    // console.log("DEBUG MORPHOLOGY checkpoint 2.5 question_type = ", question_type);
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 3");
    //we will always set the target language as latin
    //since we will always be producing latin and evaluating those forms as the answer
    // the target language will be english
    // but we won't always be displaying english, sometimes we will just display properties
    var source_language = 'english';
    var target_language = 'latin';
    this.source_language = source_language;
    this.target_language = target_language;
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 4");
    // sets up our lexicon
    // var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    // var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    // todo implement generate_sentence function returning a sentence
    
    // LITTLE change
    // get override conjunctions from morphology level
    // plug that into argument for generate sentence
    
    var sentence = generate_sentence(
        source_language, target_language,
        this.level.kck_level, this.level.latin_extra_level, null);
    
    
    console.log('LOG MORPHOLOGY sentence =', sentence);
    console.log("DEBUG MORPHOLOGY next_question checkpoint 5");
    
    
    this.question = sentence.translate_into(source_language);
    
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 6");
    console.log("sentence.chosen_lexemes =", sentence.chosen_lexemes);
    
    
    //todo below should work but is making the game sick - commenting it out for now
    // this.cheat_sheet = this.morphology_cheat_sheet(sentence.chosen_lexemes);
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 7");
    //we have to freeze out remove dashes for now
    // maybe later we can develop some form of the student inputing the dash-removed form
    // var remove_dashes_bool = get_remove_dashes_bool(this.level.kck_level);
    // var process_output;
    // if (remove_dashes_bool) {
    //     process_output = remove_dashes_and_metacharacters;
    // } else {
    //     process_output = remove_metacharacters;
    // }
    
    //changes the score, progress bar, etc.
    this.quiz.update_display();

    console.log("DEBUG MORPHOLOGY next_question checkpoint 8");

    Quiz.set_question_text("Translate the following sentence:");
    
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 9");
    
    // this.question = process_output(this.question);
    
    this.quiz.add_question_text(this.question);
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 10");
    
    //we're not using drops so we comment it all out
    // todo implement or find some method that does this
    // var drops_and_non_drops = sentence.get_all_drops_and_non_drops(this.level.kck_level, target_language);
    // console.log('drops and non drops =', drops_and_non_drops);
    
    // CHANGE simplify if possible 
    
    // for (var i = 0; i < drops_and_non_drops.length; i++) {
    //     var path = drops_and_non_drops[i].drop.correct_path;
    //     path[path.length - 1] = process_output(
    //         path[path.length - 1]);
    //     drops_and_non_drops[i].non_drop.text = process_output(
    //         drops_and_non_drops[i].non_drop.text);
    // }
    
    // var roles = drops_and_non_drops.map(function (x) {
    //     return x.role;
    // });
    // var drop_choices = choose_drops_and_non_drops(roles, this.level.latin_drop_level);
    // this.used_drops_and_non_drops = [];
    // var i;
    // var role_num = drops_and_non_drops.length;
    // for (i = 0; i < role_num; i++) {
    //     this.used_drops_and_non_drops.push(drops_and_non_drops[i][drop_choices[i]]);
    // }
    
    // this.actual_drops = this.used_drops_and_non_drops.filter(function (x) {
    //     return x instanceof DropDown;
    // });
    
    // console.log('used drops and non drops =', this.used_drops_and_non_drops);
    
    this.give_away_phrase = "The correct answer was: ";
    this.give_away_ending_phrase = ".";
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 11");
    
    // todo implement or find some method that does this
    this.correct_answer_as_string = sentence.translate_into(target_language);
    console.log("LOG MORPHOLOGY correct_answer_as_string = ", this.correct_answer_as_string);
    
    //we are going to remove dashes from the morphological elements for cosmetic reason
    //so we are going to compare [am, aba, t] with the correct answer as string
    
    //doesn't seem like we need correct_answer_as_path
    // this.correct_answer_as_path = drops_and_non_drops.map(function (x) {
    //     return x.drop.correct_path;
    // });
    
    //don't really need this
    // this.none_display = random_choice(map_level_to_allowed(
    //     this.level.latin_extra_level, latin_extra_levels).none_display);
    
    
    
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 12");
    // todo we probably need to clean up the landscape and clear out whatever div we're populating
    // document.getElementById("morphology_options").innerHTML = ""
    
    Quiz.set_question_text('Translate the following sentence:');
    console.log("DEBUG MORPHOLOGY next_question checkpoint 13");
    
    this.generate_morphology_options_master_function(1);
    
    console.log("DEBUG MORPHOLOGY next_question checkpoint 14");
};


MorphologyModeGame.prototype.generate_morphology_options_master_function = function (morphology_level) {
    
    /*
    we create a function which pulls 2 separate things
        - lexemes used (to generate roots)
        - arguments to plug into the morphology dictionary traverser
        
    we just need to make sure that the limitations set by morphology levels (what tense_mood_voice combos we use)
    don't contradict the choices made by the kck sentence that gets produced
    more effective than the conjunction override might perhaps be a tense-mood-voice override
    conjunction override (like null + ut_purpose) can definitely work to produce some things
    we could also plug in (null + ut_purpose + cur_why to generate all of them)
    we have to be careful to control carefully for passives though
    
    
    */
    
    
    
    
    var shuffle_morphological_elements = false;
    remove_dashes_in_morphology_mode = true;
    
    var test_argument_for_morphology = ['latin verb morphology beginning', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p']
    
    var test_output_of_morphology = {};
    
    test_output_of_morphology.beginning = morphology_dictionary_traverser_main(['latin verb morphology beginning', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p'])
    
    test_output_of_morphology.middle = morphology_dictionary_traverser_main(['latin verb morphology middle', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p']);
    
    test_output_of_morphology.ending = morphology_dictionary_traverser_main(['latin verb morphology ending', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p']);
    
    
    
    var stringified_beginning = JSON.stringify(test_output_of_morphology.beginning);
    var stringified_middle = JSON.stringify(test_output_of_morphology.middle);
    var stringified_ending = JSON.stringify(test_output_of_morphology.ending);
    
    // console.log("ROOT LOOP stringified_beginning = ", stringified_beginning);
    
    var final_root_output = convert_root_items_to_actual_forms(test_output_of_morphology.beginning, ['love', 'eat', 'rule'], 'latin');
    console.log("ROOT LOOP final_root_output = ", final_root_output);
    final_root_output = JSON.stringify(final_root_output);
    
    if (shuffle_morphological_elements) {
        final_root_output = shuffle(final_root_output);
        stringified_beginning = shuffle(stringified_beginning);
        stringified_middle = shuffle(stringified_middle);
        stringified_ending = shuffle(stringified_ending);
    }
    
    if (remove_dashes_in_morphology_mode) {
        final_root_output = remove_dashes_and_metacharacters(final_root_output);
        stringified_beginning = remove_dashes_and_metacharacters(stringified_beginning);
        stringified_middle = remove_dashes_and_metacharacters(stringified_middle);
        stringified_ending = remove_dashes_and_metacharacters(stringified_ending);
    }
    
    
    //the button approach begin
    this.make_morphology_buttons(final_root_output, 'beginning');
    this.make_morphology_buttons(stringified_middle, 'middle');
    this.make_morphology_buttons(stringified_ending, 'ending');
    //the button approach end
};


var submit_morphological_element_to_cell = function (morphological_element, cell_destination) {
    console.log("BUTTON TESTING submit morphological element to cell entered");
    
    console.log("BUTTON TESTING in submit morphological_element_sent to cell = ", morphological_element);
    console.log("BUTTON TESTING in submit cell_destination = ", cell_destination);
    // we first check if the submitted data is of the right type
    if (typeof (morphological_element) !== 'string') {
        alert("submitted morphological element is not a string");
    }
    
    //we need to display the morphological element
    var div_to_fill_with_morphological_element;
    if (cell_destination == 'beginning') {
        el('morphology_cell_answer_beginning').innerHTML = morphological_element;
    } else if (cell_destination == 'middle') {
        el('morphology_cell_answer_middle').innerHTML = morphological_element;
    } else if (cell_destination == 'ending') {
        el('morphology_cell_answer_ending').innerHTML = morphological_element;
    } else {
        alert("cell_destination is neither beginning middle nor end");
    }
}


var createClickHandler = function(arg, destination) {
  return function() { 
      console.log("create_click_handler arg = ", arg);
      console.log("BUTTON TESTING destination in createclickhandler = ", destination);
      submit_morphological_element_to_cell(arg, destination);
  };
}

MorphologyModeGame.prototype.make_morphology_buttons = function(morphological_elements, cell_destination) {
    
    console.log("BUTTON TESTING morphological_elements pre-processing = ", morphological_elements);
    morphological_elements = JSON.parse(morphological_elements);
    console.log("BUTTON TESTING morphological_elements after parse = ", morphological_elements);
    
    //not sure if necessary    
    var docFragment = document.createDocumentFragment();
    

    
    
    for (var i = 0; i < morphological_elements.length; i++) {
        console.log("DEBUG BUTTONS checkpoint 1");
        //we first make the button for each morphological element
        var button = document.createElement("BUTTON");
        
        console.log("DEBUG BUTTONS checkpoint 3");
        //we want to tweak the cosmetics of this button so we give it a class
        button.className += 'morphology_option_button';
        
        console.log("DEBUG BUTTONS checkpoint 4");
        
        // this button is now empty of text, so we need to add the text (e.g. amav, aba, erunt)
        var morphological_element_to_input = morphological_elements[i];
        var t = document.createTextNode(morphological_element_to_input);   
        console.log("BUTTON TESTING morphological_element_to_input = ", morphological_element_to_input);
        console.log("BUTTON TESTING type of morphological_element_to_input = ",typeof(morphological_element_to_input));
        
        console.log("DEBUG BUTTONS checkpoint 5");
        
        
        
        //we need to create a separate function so we don't end up with one variable
        button.onclick = createClickHandler(morphological_element_to_input, cell_destination);
        
        
        console.log("DEBUG BUTTONS checkpoint 6");
        
        button.innerHTML = morphological_element_to_input
        
        console.log("DEBUG BUTTONS checkpoint 7");
        
        docFragment.appendChild(button); 
        
        console.log("DEBUG BUTTONS checkpoint 8");
        
        if (cell_destination == 'beginning') {
            // button.className += 'morphology_beginning_button';
            button.setAttribute('class', 'morphology_beginning_button');
            var e = document.getElementById("morphology_cell_options_beginning");
            e.appendChild(docFragment);
        } else if (cell_destination == 'middle') {
            // button.className += 'morphology_middle_button';
            button.setAttribute('class', 'morphology_middle_button');
            var e = document.getElementById("morphology_cell_options_middle");
            e.appendChild(docFragment);
        } else if (cell_destination == 'ending') {
            // button.className += 'morphology_ending_button';
            button.setAttribute('class', 'morphology_ending_button');
            var e = document.getElementById("morphology_cell_options_ending");
            e.appendChild(docFragment);
        }
        
    }
    //below just throws it up on the page
    // document.body.appendChild(docFragment);
    //we want it to be in the beginning, middle or end block
    console.log("DEBUG BUTTONS checkpoint 9");
    // e.appendChild(docFragment);
}

//sometimes we know we want to display roots (e.g. root_2 & root_3)
// but we want the actual lexical roots (e.g. am-, amav-, tim-, timu-)
// this function will take a list of roots and a lexeme list
// and return a list of items to populate morphological buttons
var convert_root_items_to_actual_forms = function (root_list, lexeme_list, language) {
    var dictionary_to_consult;
    if (language == 'latin') {
        dictionary_to_consult = testing_lexemes.verb;
    }
    console.log("ROOT LOOP dictionary_to_consult = ", dictionary_to_consult);
    
    
    var list_of_lexical_roots = [];
    for (i=0; i<root_list.length; i++) {
        for (j=0; j<lexeme_list.length; j++) {
            var root_to_find = root_list[i];
            console.log("ROOT LOOP root_to_find = ", root_to_find);
            var lexeme_to_consult = lexeme_list[j];
            console.log("ROOT LOOP lexeme_to_consult = ", lexeme_to_consult); 
            var lexeme_in_lexicon = testing_lexemes.verb[lexeme_to_consult];
            console.log("ROOT LOOP testing_lexemes.verb[lexeme_to_consult] = ", lexeme_in_lexicon);
            var latin_properties = lexeme_in_lexicon.latin;
            console.log("ROOT LOOP latin_properties = ", latin_properties);
            var roots = latin_properties.roots;
            console.log("ROOT LOOP roots = ", roots);
            var root_output = roots[root_to_find];
            console.log("ROOT LOOP root_output = ", root_output);
            list_of_lexical_roots.push(root_output);
        }
    }
    console.log("ROOT LOOP list_of_lexical_roots =", list_of_lexical_roots);
    return list_of_lexical_roots;
}



//not sure how to handle this, it seems to be not used very much 
MorphologyModeGame.prototype.display = function (x) {
    return x.type === 'non_drop' || x.correct_answer || this.none_display;
};



//this needs to be extensively changed
MorphologyModeGame.prototype.process_answer = function(){
    
    //we need to get answer_statuses somehow
    // 'correct', 'incorrect', or 'missed'
    
    // console.log('LOG MORPHOLOGY answer_statuses =', answer_statuses);
    this.display_green_and_red_path(answer_statuses);
    // 'correct', 'incorrect', or 'missed'
    
    
    //compare path is obscure to Akiva
    var correct_status = compare_path(drop_down_statuses);
    
    if (correct_status === 'correct') {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};








//BIG CHANGE
// check to see that we're comparing the right things when we compare paths
MorphologyModeGame.prototype.process_correct_answer = function () {
    this.quiz.increment_score();
    
    // console.log("DEBUG entering 2nd random_choice");
    var cell_1 = random_choice(MorphologyModeGame.cell_1_feedback_right);
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



MorphologyModeGame.prototype.process_incorrect_answer = function () {
    this.quiz.submodule.incorrect_streak ++;
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG if not triggered");
    }
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        // console.log("DEBUG entering 3rd random_choice");
        
        var cell_1 = random_choice(MorphologyModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(MorphologyModeGame.cell_3_feedback_wrong);
        
        
        
        // console.log("DEBUG leaving 3rd random_choice");
        
        var fbox = el("feedbackbox");
        fbox.innerHTML += "<br/>" + cell_1 + " " + cell_3;
    } else {
        this.give_away_answer();
    }
    this.quiz.update_display();
};

MorphologyModeGame.prototype.give_away_answer = function () {
    var fbox = el("feedbackbox");
    fbox.innerHTML = this.display_give_away_answer();
    this.quiz.question_complete();
};

MorphologyModeGame.prototype.display_give_away_answer = function () {
    // todo figure out how to combine string and path
    return this.give_away_phrase + " " + this.correct_answer_as_string + this.give_away_ending_phrase
}

// todo implement this (maybe a new div?)
MorphologyModeGame.prototype.display_green_and_red_path = function (statuses) {
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






//needs to be modified for the different lexicon format of morphology (all principal parts)
// no properties
MorphologyModeGame.prototype.morphology_cheat_sheet = function (chosen_lexemes) {
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