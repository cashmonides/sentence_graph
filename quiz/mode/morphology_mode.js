// morphology mode

// morphology mode is a lot like kck mode

// it produces a kck sentence, picks a target language and a source language
// creates an answer (via clicking buttons not a drop down)
// the answer is fed into compare path (turns red and green)
// has the same cheat sheets (principal parts + translations)

/*
agenda:
pipe in lexicon
do a test run with null conjunction and 4 levels 
    active 3s 3p, 
    active and passive 3s 3p
    active 1s-3p, 
    active and passive 1s-3p
pipe in the usual kck cheat sheet   
little cosmetic bug: correct answer from previous sentence stays on screen

*/

var global_hack_morphology_testing_level = 1;

var global_hack_verb_output;

var global_hack_full_lexicon_for_morphology_as_object;

var global_hack_full_lexicon_for_morphology_as_object2;

var global_hack_full_lexicon_for_morphology = ['love', 'speak', 'carry', 'attack', 'fear', 'rule', 'come'];

var global_hack_properties_from_morphology_level = ['present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p'];

var global_hack_input_dictionary = {};

var global_hack_color_div_text = function (div, color) {
    var e = el(div);
    e.style.backgroundColor = color;
};


//this doesn't seem to work for mysterious reasons
var register_cell_fill = function (cell) {
    if (cell == 'beginning') {
        this.beginning_element_submitted = true;
    } else if (cell == 'middle') {
        this.middle_element_submitted = true;
    } else if (cell == 'ending') {
        this.ending_element_submitted = true;
    }
}


//sometimes we know we want to display roots (e.g. root_2 & root_3)
// but we want the actual lexical roots (e.g. am-, amav-, tim-, timu-)
// this function will take a list of roots and a lexeme list
// and return a list of items to populate morphological buttons
var convert_root_items_to_actual_forms = function (root_list, lexeme_list, lexeme_list_as_objects, language) {
    console.log("ECCE 3 lexeme_list_as_objects = ", lexeme_list_as_objects);
    var dictionary_to_consult;
    if (language == 'latin') {
        dictionary_to_consult = testing_lexemes;
    }
    
    
    //version with strings
    /*
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
    */
    
    //version with objects
    var list_of_lexical_roots = [];
    for (i=0; i<root_list.length; i++) {
        for (j=0; j<lexeme_list_as_objects.length; j++) {
            var root_to_find = root_list[i];
            var lexeme_to_consult = lexeme_list_as_objects[j];
            
            //below should be otiose
            // var lexeme_in_lexicon = testing_lexemes.verb[lexeme_to_consult];
            // console.log("ROOT LOOP testing_lexemes.verb[lexeme_to_consult] = ", lexeme_in_lexicon);
            
            
            var lexeme_in_lexicon = lexeme_to_consult;
            var latin_properties = lexeme_in_lexicon.latin;
            var roots = latin_properties.roots;
            var root_output = roots[root_to_find];
            list_of_lexical_roots.push(root_output);
        }
    }
    return list_of_lexical_roots;
    
}



// 

var MorphologyModeGame = function () {
    this.data = null;
    this.quiz = null;
    // todo we here assume that 1 is the initial level
    this.level = 1;
    
    this.beginning_element_submitted = null;
    this.middle_element_submitted = null;
    this.ending_element_submitted = null;
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
    set_display("spelling_hint_button", 'none');
    set_display("dash_hint_button", 'initial');
    
    
    //start changes 11-12-16
    set_display_of_class("morphology_to_clear", "initial");
    set_display_of_class('cleared_in_etymology', 'initial');
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    // set_display("morphology_to_clear3", "initial");
    //end changes 11-12-16
    
    
};

// set_level now moved up
MorphologyModeGame.prototype.set_level = function (new_level) {
    back.log("set_level entered new level = ", new_level);
    this.level = new_level;
}


MorphologyModeGame.prototype.get_mode_name = function() {
    console.log("DEBUG MORPHOLOGY get_mode_name entered");
    return "morphology";
};


MorphologyModeGame.prototype.next_question = function () {
    backlog("[morph_mode.next_question] next_question entered");

    
    //morphology cells do not seem to be cleared after submit????!!!
    var e1 = el('morphology_cell_answer_beginning');
    e1.innerHTML = '_____';
    e1.style.backgroundColor = 'navajowhite';
    var e2 = el('morphology_cell_answer_middle');
    e2.innerHTML = '_____';
    e2.style.backgroundColor = 'navajowhite';
    var e3 = el('morphology_cell_answer_ending');
    e3.innerHTML = '_____';
    e3.style.backgroundColor = 'navajowhite';
    
    
    this.beginning_element_submitted = false;
    this.middle_element_submitted = false;
    this.ending_element_submitted = false;
    
    backlog("[morph_mode.next_question] this.beginning_element_submitted = ", this.beginning_element_submitted);
    backlog("[morph_mode.next_question] this.middle_element_submitted = ", this.middle_element_submitted);
    backlog("[morph_mode.next_question] this.ending_element_submitted = ", this.ending_element_submitted);
    
    

    
    // todo very important
    // is this the right place to clear the feedback box?
    // var o = el('feedbackbox');
    // remove_all_children(o);

    this.clear_buttons();
    
    
    //todo we probably won't need drop or extra level
    // but latin_extra_level is hard-wired into kck's generate sentence
    // so it would be tricky to just delete it
    // cosmetic level (dashes and such) - we can't implement until we build the functionality
    
    var types_of_level = ['latin_drop_level', 'latin_extra_level', 'latin_cosmetic_level', 'kck_level', 'morphology_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    // var test_level = weighted_choice(
    //     get_current_module(this.level).morphology_level)
        
    
    global_hack_morphology_testing_level = this.level.morphology_level;
    
    
    
    //this will be the point at which we establish the question type
    // whether we ask for: english to latin
    // or: properties to latin
    // or: transform latin to properties
    
    //below should work but seems to throw an error and make the game sick
    // var question_type = weighted_choice(
    //     get_current_module(this.level.morphology_levels).question_type);
    // console.log("DEBUG MORPHOLOGY checkpoint 2.5 question_type = ", question_type);
    
    
    //we will always set the target language as latin
    //since we will always be producing latin and evaluating those forms as the answer
    // the target language will be english
    // but we won't always be displaying english, sometimes we will just display properties
    var source_language = 'english';
    var target_language = 'latin';
    this.source_language = source_language;
    this.target_language = target_language;
    
    
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
    
    
    //lexicon intervention begin
    global_hack_full_lexicon_for_morphology_as_object = sentence.chosen_lexemes;
    
    backlog("[morph_mode.next_question] sentence.chosen_lexemes = ", sentence.chosen_lexemes);
    
    
    global_hack_full_lexicon_for_morphology_as_object2 = sentence.chosen_lexemes.verb;
    backlog("[morph_mode.next_question] sentence.chosen_lexemes.verb = ", sentence.chosen_lexemes.verb); 
    
    
    
    backlog("[morph_mode.next_question] sentence =", sentence);
    
    
    this.question = sentence.translate_into(source_language);
    backlog("[morph_mode.next_question] this.question = ", this.question);
    
    this.answer = sentence.translate_into(target_language);
    backlog("[morph_mode.next_question] this.answer = ", this.answer);
    
    
    backlog("[morph_mode.next_question] sentence.chosen_lexemes =", sentence.chosen_lexemes);
    
    
    
    this.dash_hint = get_dash_hint_list2(this.quiz.module.dash_hint_level);
    
    
    //todo below should work but is making the game sick - commenting it out for now
    this.cheat_sheet = this.morphology_cheat_sheet(sentence.chosen_lexemes);
    
    
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


    Quiz.set_question_text("Translate the following sentence:");
    
    
    
    // this.question = process_output(this.question);
    
    this.quiz.add_question_text(this.question);
    
    
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
    
    
    // todo implement or find some method that does this
    this.correct_answer_as_string = sentence.translate_into(target_language);
    backlog("[morph_mode.next_question] correct_answer_as_string = ", this.correct_answer_as_string);
    
    //we are going to remove dashes from the morphological elements for cosmetic reason
    //so we are going to compare [am, aba, t] with the correct answer as string
    
    //doesn't seem like we need correct_answer_as_path
    // this.correct_answer_as_path = drops_and_non_drops.map(function (x) {
    //     return x.drop.correct_path;
    // });
    
    //don't really need this
    // this.none_display = random_choice(map_level_to_allowed(
    //     this.level.latin_extra_level, latin_extra_levels).none_display);
    
    
    

    
    Quiz.set_question_text('Translate the following sentence:');
    
    this.generate_morphology_options_master_function(1);
    
};

MorphologyModeGame.prototype.get_morphological_properties_from_level = function (morphological_level) {
    
    backlog("morph_mode.get_morphological_properties_from_level] entering get_morphological_properties_from_level");
    
    
    backlog("morph_mode.get_morphological_properties_from_level] morphological level = ", morphological_level);
    var list_of_morphological_properties = [];
    
    
    // morphology_levels is a global
    backlog("morph_mode.get_morphological_properties_from_level] morphology_levels = ", morphology_levels);
    
    var morphological_level_to_consult = morphology_levels[morphological_level];
    
    backlog("morph_mode.get_morphological_properties_from_level] morphological_level_to_consult = ", morphological_level_to_consult);
    
    
    //we push all the tense_mood_voice combos
    //e.g. present indicative active
    var allowed_tense_mood_voice_list = morphological_level_to_consult.allowed_tense_mood_voice;
    backlog("morph_mode.get_morphological_properties_from_level] allowed_tense_mood_voice_list = ", allowed_tense_mood_voice_list);
    list_of_morphological_properties.push(allowed_tense_mood_voice_list);
    backlog("morph_mode.get_morphological_properties_from_level] list_of_morphological_properties = ", list_of_morphological_properties);
    
    //we push all the person_number combos
    //e.g. 3s
    var allowed_person_number_list = morphological_level_to_consult.allowed_person_number;
    backlog("morph_mode.get_morphological_properties_from_level] allowed_person_number_list = ", allowed_person_number_list);
    list_of_morphological_properties.push(allowed_person_number_list);
    backlog("morph_mode.get_morphological_properties_from_level] list_of_morphological_properties = ", list_of_morphological_properties);
    
    
    //we push all the person_number combos
    //e.g. 3s
    var allowed_conjugation_list = morphological_level_to_consult.allowed_conjugation;
    backlog("morph_mode.get_morphological_properties_from_level] allowed_conjugation_list = ", allowed_conjugation_list);
    list_of_morphological_properties.push(allowed_conjugation_list);
    backlog("morph_mode.get_morphological_properties_from_level] list_of_morphological_properties pre-flattening = ", list_of_morphological_properties);
    
    list_of_morphological_properties = [].concat.apply([], list_of_morphological_properties);
    backlog("morph_mode.get_morphological_properties_from_level] list_of_morphological_properties post-flattening = ", list_of_morphological_properties);
    
    
    return list_of_morphological_properties;
}


MorphologyModeGame.prototype.get_morphological_elements_from_level = function (position, morphological_level) {
    var morphology_dictionary_to_traverse;
    if (position == 'beginning') {
        morphology_dictionary_to_traverse = 'latin verb morphology beginning';
    } else if (position == 'middle') {
        morphology_dictionary_to_traverse = 'latin verb morphology middle';
    } else if (position == 'ending') {
        morphology_dictionary_to_traverse = 'latin verb morphology ending';
    }
    
    
    return morphology_dictionary_traverser_main([morphology_dictionary_to_traverse, global_hack_properties_from_morphology_level]);
}

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
    
    
    
    
    // getElementById("morphology_cell_answer_beginning").innerHTML = "cleared";
    
    var shuffle_morphological_elements = false;
    remove_dashes_in_morphology_mode = true;
    
    var test_argument_for_morphology = ['latin verb morphology beginning', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p']
    
    var test_output_of_morphology = {};
    
    
    //below is now obsolete
    // test_output_of_morphology.beginning = morphology_dictionary_traverser_main(['latin verb morphology beginning', 'present indicative active',
    // 'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    // 'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    // 'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    // 'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    // '1s', '2s', '3s', '1p', '2p', '3p'])
    //end obsolescence
    
    
    global_hack_properties_from_morphology_level = this.get_morphological_properties_from_level(global_hack_morphology_testing_level);
    
    
    test_output_of_morphology.beginning = this.get_morphological_elements_from_level ('beginning', global_hack_properties_from_morphology_level);
    
    
    test_output_of_morphology.middle = this.get_morphological_elements_from_level ('middle', global_hack_properties_from_morphology_level);
    
    // test_output_of_morphology.middle = morphology_dictionary_traverser_main(['latin verb morphology middle', 'present indicative active',
    // 'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    // 'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    // 'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    // 'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    // '1s', '2s', '3s', '1p', '2p', '3p']);
    
    
    test_output_of_morphology.ending = this.get_morphological_elements_from_level ('ending', global_hack_properties_from_morphology_level);
    //old version below
    // test_output_of_morphology.ending = morphology_dictionary_traverser_main(['latin verb morphology ending', 'present indicative active',
    // 'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    // 'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    // 'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    // 'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    // '1s', '2s', '3s', '1p', '2p', '3p']);
    
    
    
    var stringified_beginning = JSON.stringify(test_output_of_morphology.beginning);
    var stringified_middle = JSON.stringify(test_output_of_morphology.middle);
    var stringified_ending = JSON.stringify(test_output_of_morphology.ending);
    
    // console.log("ROOT LOOP stringified_beginning = ", stringified_beginning);
    
    
    
    
    var final_root_output = convert_root_items_to_actual_forms(test_output_of_morphology.beginning, global_hack_full_lexicon_for_morphology, global_hack_full_lexicon_for_morphology_as_object2, 'latin');
    
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

var submit_morphological_element_to_input_dictionary = function (morphological_element, cell_destination) {
    // console.log("REMOVE HEY THIS IS CALLED 2");
    
    
    if (cell_destination == 'beginning') {
        global_hack_input_dictionary.beginning = morphological_element;
        // console.log("MORMON TOGGLE BEGINNING");
        // this.beginning_element_submitted = true;
        // this.register_cell_fill('beginning');
        register_cell_fill('beginning');
    } else if (cell_destination == 'middle') {
        global_hack_input_dictionary.middle = morphological_element;
        // console.log("MORMON TOGGLE MIDDLE");
        // this.middle_element_submitted = true;
        // this.register_cell_fill('middle');
        register_cell_fill('middle');
    } else if (cell_destination == 'ending') {
        global_hack_input_dictionary.ending = morphological_element;
        // console.log("MORMON TOGGLE ENDING");
        // this.ending_element_submitted = true;
        // this.register_cell_fill('ending');
        register_cell_fill('ending');
    } else {
        alert("cell_destination is neither beginning middle nor end");
    }
    // console.log("REMOVE HEY input_dictionary = ", global_hack_input_dictionary);
    // console.log("REMOVE HEY input_dictionary stringified = ", JSON.stringify(global_hack_input_dictionary));
    
    // console.log("MORMON DEVIL this.beginning_element_submitted = ", this.beginning_element_submitted);
    // console.log("MORMON DEVIL this.middle_element_submitted = ", this.middle_element_submitted);
    // console.log("MORMON DEVIL this.ending_element_submitted = ", this.ending_element_submitted);
    
    
    
    
    
    //DAMAGE CONTROL
    // below is not quite functional and perhaps not desirable
    // if (this.beginning_element_submitted && this.middle_element_submitted 
    //     && this.ending_element_submitted) {
    //         console.log("MORMON GOD invoked");
    //         //doesn't work
    //         // self.process_answer();
    //         // self.quiz.process_answer();
    //         this.quiz.process_answer();
    //     }
    
    return global_hack_input_dictionary;
}

var submit_morphological_element_to_cell = function (morphological_element, cell_destination) {
    backlog("[morph.mode submit_morphological_element_to_cell] entering submit_morphological_element_to_cell");
    
    submit_morphological_element_to_input_dictionary(morphological_element, cell_destination);
    backlog("[morph.mode submit_morphological_element_to_cell] morphological_element = ", morphological_element);
    backlog("[morph.mode submit_morphological_element_to_cell] cell_destination = ", cell_destination);
    // we first check if the submitted data is of the right type
    if (typeof (morphological_element) !== 'string') {
        alert("submitted morphological element is not a string");
    }
    
    //we need to display the morphological element
    var div_to_fill_with_morphological_element;
    if (cell_destination == 'beginning') {
        el('morphology_cell_answer_beginning').innerHTML = morphological_element;
        // this.beginning_element_submitted = true;
    } else if (cell_destination == 'middle') {
        el('morphology_cell_answer_middle').innerHTML = morphological_element;
        // this.middle_element_submitted = true;
    } else if (cell_destination == 'ending') {
        el('morphology_cell_answer_ending').innerHTML = morphological_element;
        // this.ending_element_submitted = true;
    } else {
        alert("cell_destination is neither beginning middle nor end");
    }
    
    // console.log("MORMON DEVIL this.beginning_element_submitted = ", this.beginning_element_submitted);
    // console.log("MORMON DEVIL this.middle_element_submitted = ", this.middle_element_submitted);
    // console.log("MORMON DEVIL this.ending_element_submitted = ", this.ending_element_submitted);
    
    // // below is not quite functional and perhaps not desirable
    // if (this.beginning_element_submitted && this.middle_element_submitted 
    //     && this.ending_element_submitted) {
    //         console.log("MORMON GOD invoked");
    //         //doesn't work
    //         // self.process_answer();
    //         // self.quiz.process_answer();
    //         this.quiz.process_answer();
    //     }
}


var createClickHandler = function(arg, destination) {
  return function() { 
      submit_morphological_element_to_cell(arg, destination);
  };
}

var clear_div = function (elementID) {
    document.getElementById(elementID).innerHTML = "";
}

MorphologyModeGame.prototype.clear_buttons = function () {
    var e1 = document.getElementById("morphology_cell_options_beginning");
    e1.innerHTML = "";
    var e2 = document.getElementById("morphology_cell_options_middle");
    e2.innerHTML = "";
    var e3 = document.getElementById("morphology_cell_options_ending");
    e3.innerHTML = "";
}


MorphologyModeGame.prototype.clear_morphology_answer_cells = function () {
    var e1 = document.getElementById("morphology_cell_answer_beginning");
    e1.innerHTML = "_____";
    var e2 = document.getElementById("morphology_cell_answer_middle");
    e2.innerHTML = "_____";
    var e3 = document.getElementById("morphology_cell_answer_ending");
    e3.innerHTML = "_____";
}

MorphologyModeGame.prototype.make_morphology_buttons = function(morphological_elements, cell_destination) {
    
    morphological_elements = JSON.parse(morphological_elements);
    
    //not sure if necessary    
    var docFragment = document.createDocumentFragment();
    
    
    // var e = document.getElementsByClassName("morphology_options");
    // clear_div("morphology_options");
    
    
    
    //below somehow works but only on 3rd dive
    // var node3 = document.getElementById("morphology_cell_options_ending");
    // while (node3.hasChildNodes()) {
    //     node3.removeChild(node3.firstChild);
    // }
    
    // //we need to clear the 3 divs
    // var e = document.getElementById("morphology_cell_options_ending");
    // e.removeChild();
    
    // // var e2 = document.getElementById("morphology_cell_options_middle");
    // // e2.innerHTML = "";
    
    // var top = document.getElementById("morphology_options");
    // var nested = document.getElementById("morphology_cell_options_middle");
    // top.removeChild(nested);
    
    
    
    
    for (var i = 0; i < morphological_elements.length; i++) {
        
        //we first make the button for each morphological element
        var button = document.createElement("BUTTON");
        
        
        //we want to tweak the cosmetics of this button so we give it a class
        button.className += 'morphology_option_button';
        
        
        
        // this button is now empty of text, so we need to add the text (e.g. amav, aba, erunt)
        var morphological_element_to_input = morphological_elements[i];
        var t = document.createTextNode(morphological_element_to_input);   
        
        
        
        
        //we need to create a separate function so we don't end up with one variable
        button.onclick = createClickHandler(morphological_element_to_input, cell_destination);
        
        
        
        button.innerHTML = morphological_element_to_input
        
        
        // docFragment.appendChild(button); 
        
        
        if (cell_destination == 'beginning') {
            // button.className += 'morphology_beginning_button';
            button.setAttribute('class', 'morphology_beginning_button');
            var e = document.getElementById("morphology_cell_options_beginning");
            // e.appendChild(docFragment);
            e.appendChild(button);
        } else if (cell_destination == 'middle') {
            // button.className += 'morphology_middle_button';
            button.setAttribute('class', 'morphology_middle_button');
            var e = document.getElementById("morphology_cell_options_middle");
            // e.appendChild(docFragment);
            e.appendChild(button);
        } else if (cell_destination == 'ending') {
            // button.className += 'morphology_ending_button';
            button.setAttribute('class', 'morphology_ending_button');
            var e = document.getElementById("morphology_cell_options_ending");
            // e.appendChild(docFragment);
            e.appendChild(button);
        }
        
    }
    //below just throws it up on the page
    // document.body.appendChild(docFragment);
    //we want it to be in the beginning, middle or end block
   
   
    // e.appendChild(docFragment);
}




//not sure how to handle this, it seems to be not used very much 
MorphologyModeGame.prototype.display = function (x) {
    return x.type === 'non_drop' || x.correct_answer || this.none_display;
};



//this needs to be extensively changed
MorphologyModeGame.prototype.process_answer = function(){
    
    var o = el('feedbackbox');
    remove_all_children(o);
    
    //we need to get answer_statuses somehow
    // 'correct', 'incorrect', or 'missed'
    
    // console.log('LOG MORPHOLOGY answer_statuses =', answer_statuses);
    // this.display_green_and_red_path(answer_statuses);
    // 'correct', 'incorrect', or 'missed'
    
    
    //compare path is obscure to Akiva
    // var correct_status = compare_path(drop_down_statuses);
    
    
    var correct_status = this.hack_compare_input_to_correct_answer(global_hack_input_dictionary);
    
    
    if (correct_status) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};

var convert_dictionary_to_dashed_form = function (dictionary) {
    var output;
    output = dictionary.beginning + "-" + dictionary.middle + "-" + dictionary.ending;
    return output;
}


MorphologyModeGame.prototype.hack_compare_input_to_correct_answer = function (input) {
    input = convert_dictionary_to_dashed_form(input);
    var processed_correct_answer_as_string = remove_metacharacters(this.correct_answer_as_string);
    
    if (input == processed_correct_answer_as_string) {
        return true;
    } else {
        return false;
    }
}




//BIG CHANGE
// check to see that we're comparing the right things when we compare paths
MorphologyModeGame.prototype.process_correct_answer = function () {
    this.quiz.increment_score();
    
    var cell_1 = random_choice(MorphologyModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML += '<br/>' + cell_1 + " ";
    var correct_answer_as_string_for_path = remove_metacharacters(this.correct_answer_as_string);
    var question_as_string_for_path = this.question;
    var question_plus_answer_as_string = question_as_string_for_path + " = " + correct_answer_as_string_for_path;
    
    backlog("[morph_mode.process_correct_answer] answer_as_string_for_path =", correct_answer_as_string_for_path);
    
    fbox.appendChild(document.createTextNode(question_plus_answer_as_string));
    fbox.appendChild(document.createElement('br'));
    fbox.appendChild(document.createElement('br'));
    
    
    this.quiz.question_complete();
};


MorphologyModeGame.prototype.determine_red_green_cell_old = function () {
  var text = remove_metacharacters(this.correct_answer_as_string);

  var text_split = text.split("-");

  
  var red_green_cell_map = {};
  
  if (global_hack_input_dictionary.beginning == text_split[0]) {
      red_green_cell_map.beginning = 'green';
  } else {
      red_green_cell_map.beginning = 'red';
  }
  
  if (global_hack_input_dictionary.middle == text_split[1]) {
      red_green_cell_map.middle = 'green';
  } else {
      red_green_cell_map.middle = 'red';
  }
  
  if (global_hack_input_dictionary.middle == text_split[2]) {
      red_green_cell_map.ending = 'green';
  } else {
      red_green_cell_map.ending = 'red';
  }
  
//   console.log("MORMON red_green_cell_map = ",red_green_cell_map);
  return red_green_cell_map;  
};


MorphologyModeGame.prototype.determine_red_green_cell = function () {
  var text = remove_metacharacters(this.correct_answer_as_string);

  var text_split = text.split("-");

  var red_green_cell_list = [];
  
  if (global_hack_input_dictionary.beginning == text_split[0]) {
      red_green_cell_list.push('green');
  } else {
      red_green_cell_list.push('red');
  }
  
  if (global_hack_input_dictionary.middle == text_split[1]) {
      red_green_cell_list.push('green');
  } else {
      red_green_cell_list.push('red');
  }
  
  if (global_hack_input_dictionary.ending == text_split[2]) {
      red_green_cell_list.push('green');
  } else {
      red_green_cell_list.push('red');
  }
  
  return red_green_cell_list;  
};


MorphologyModeGame.prototype.color_cells_red_and_green = function (cell_list) {
    // morphology_cell_answer_beginning
    for (var i = 0; i < cell_list.length; i++){
        var color_to_add = cell_list[i];
        if (i == 0) {
            global_hack_color_div_text('morphology_cell_answer_beginning', color_to_add);
        } else if (i == 1) {
            global_hack_color_div_text('morphology_cell_answer_middle', color_to_add);
        } else if (i == 2) {
            global_hack_color_div_text('morphology_cell_answer_ending', color_to_add);
        }
    }
};





MorphologyModeGame.prototype.process_incorrect_answer = function () {
    
    //begin AKIVA Damage control 11-20-16
    //map version
    // var red_green_cell_map = this.determine_red_green_cell_old();
    // this.color_cells_red_and_green(red_green_cell_map);
    //list version
    // console.log("MORMON about to color cells");
    // global_hack_clear_morphology_cell_colors();
    var red_green_cell_list = this.determine_red_green_cell();
    this.color_cells_red_and_green(red_green_cell_list);
    // console.log("MORMON done coloring cells");
    //end Akiva damage control
    
    
    this.quiz.submodule.incorrect_streak ++;
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        // do nothing
    }
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        
        var cell_1 = random_choice(MorphologyModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(MorphologyModeGame.cell_3_feedback_wrong);
        
        
        
        
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
    return this.give_away_phrase + " " + remove_metacharacters(this.correct_answer_as_string) + this.give_away_ending_phrase
}

// todo below are ideas maybe to implement this (maybe a new div?)
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






// todo needs to be modified for the different lexicon format of morphology (all principal parts)
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
};




MorphologyModeGame.prototype.register_cell_fill = function (cell) {
    if (cell === 'beginning') {
        this.beginning_element_submitted = true;
    } else if (cell === 'middle') {
        this.middle_element_submitted = true;
    } else if (cell === 'ending') {
        this.ending_element_submitted = true;
    }
};


