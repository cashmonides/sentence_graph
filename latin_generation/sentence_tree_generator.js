//todo replace random choice with actual functions




//DESCRIPTION
//this module should be the first step, producing a kernel with language independent properties
// input: level (problem, level might be language dependent)
// output: kernel with kernel.properties


function start (language_enum) {
    var level = generate_random_level();
    //make_test(level, language_enum, 'cartesian');
    var output_type = "quiz_english";
    var output_list;
    var i;
    if (output_type === 'cartesian') {
        output_list = make_output(level, language_enum, output_type);
        var latin_list = output_list.map(function (x) {return x['sentence_in_latin']});
        var english_list = output_list.map(function (x) {return x['sentence_in_english']});

        for (i = 0; i < latin_list.length; i++) {
            document.body.appendChild(document.createTextNode(latin_list[i]));
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createTextNode(english_list[i]));
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
        }
    } else if (output_type === 'quiz_english') {
        output_list = make_output(level, language_enum, output_type);
        document.body.appendChild(document.createTextNode(output_list.latin_question));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createTextNode(output_list.english_correct_answer));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createElement('br'));
        for (i = 0; i < output_list.english_choices.length; i++) {
            document.body.appendChild(document.createTextNode(output_list.english_choices[i]));
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
        }
    }
}
function generate_random_level(){
    return Math.floor(Math.random() * 300) + 1;                                                 //Math.random = random real number between 0 & 1
}




//____________MASTER FUNCTION for test

function make_test(level, language_enum, output_type) {
    console.log("DEBUG 9-14 level in make_test = ", level);

    var kernel_with_output = make_output(level, language_enum, output_type);
    if (output_type === 'display') {
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_latin']));
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_english']));
    } else if (output_type === "cartesian") {
        var x = convert_to_JSON(kernel_with_output);
        document.body.appendChild(document.createTextNode(JSON.stringify(x)));
    } else if (output_type === "mc & display") {
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_latin']));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_english']));
        document.body.appendChild(document.createElement('br'));
        var x = convert_to_JSON(kernel_with_output);
        document.body.appendChild(document.createTextNode(JSON.stringify(x)));
    }
}

//info in the JSON
//target sentence text
//base sentence text (ultimately a list)
// level
//test type

function convert_to_JSON(test) {
    var JSON_output = {};
    JSON_output['target_sentence'] = test['sentence_in_latin'];
    JSON_output['base_sentence'] = test['sentence_in_english'];
    JSON_output['level'] = test['level'];
    return JSON_output
}

//_____________________
//MASTER FUNCTION BELOW to make kernel
//todo language_enum is not implemented well - both inflect english and inflect latin are hard-coded whereas they should be dependent on language_enum


function make_output(level, language_enum, output_type) {
    var states;
    var elements;
    var lexeme_list;
    var output;
    var kernel;
    var i;
    if (output_type === "random") {
        var state = random_choice(master_cartesian(level));
        return make_kernel(level, language_enum, state);
    } else if (output_type === "cartesian") {
        states = master_cartesian(level);
        //todo new material below
        elements = [Elements.Subject, Elements.Object, Elements.Verb];
        lexeme_list = state_to_lexeme(states, level, elements);
        console.log('9-18 in master lexeme list ' + JSON.stringify(lexeme_list));
        output = [];
        for (i = 0; i < states.length; i++) {
            kernel = make_kernel_new(level, language_enum, states[i], lexeme_list);
            if (kernel !== 'should not be made') {output.push(kernel)}
        }
    } else if (output_type === "quiz_english") {
        states = master_cartesian(level);
        //todo new material below
        elements = [Elements.Subject, Elements.Object, Elements.Verb];
        lexeme_list = state_to_lexeme(states, level, elements);
        console.log('9-18 in master lexeme list ' + JSON.stringify(lexeme_list));
        output = [];
        for (i = 0; i < states.length; i++) {
            kernel = make_kernel_new(level, language_enum, states[i], lexeme_list);
            if (kernel !== 'should not be made') {output.push(kernel)}
        }
        var choice = random_choice(output);
        var latin_question = choice['sentence_in_latin'];
        var english_correct_answer = choice['sentence_in_english'];
        var english_choices = output.map(function (x) {return x['sentence_in_english']});
        return {'latin_question': latin_question, 'english_correct_answer': english_correct_answer,
        'english_choices': english_choices}
    } /*else if (output_type === "quiz_latin") {
        states = master_cartesian(level);
        //todo new material below
        elements = [Elements.Subject, Elements.Object, Elements.Verb];
        lexeme_list = state_to_lexeme(states, level, elements);
        console.log('9-18 in master lexeme list ' + JSON.stringify(lexeme_list));
        output = [];
        for (i = 0; i < states.length; i++) {
            kernel = make_kernel_new(level, language_enum, states[i], lexeme_list);
            if (kernel !== 'should not be made') {output.push(kernel)}
        }
    }*/
    console.log("DEBUG 9-15 output in make_output = ", output);
    console.log("DEBUG 9-15 stringified output in make_output = ", JSON.stringify(output));
    //todo problem here is that we're outputting just big kernels - we want to be outputting strings


    /*for (var i = 0; i < states.length; i++) {
        document.body.appendChild(document.createTextNode(JSON.stringify(states[i])));
        document.body.appendChild(document.createTextNode(i.toString()));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createElement('br'));
    }*/

    return output;
}

function state_to_lexeme(states, level, elements) {
    var lexeme_list = [];
    var lexemes_used = [];
    for (var i = 0; i < elements.length; i++) {
        lexeme_list[elements[i]] = pick_lexeme_new(states, level, elements[i], lexemes_used);
        lexemes_used.push(lexeme_list[elements[i]].word_id)
    }
    return lexeme_list;
    //animacy
    //
    //wolf, bear, love
    //wolf, bear, horse, king, love, carry, fear
}

function make_kernel (level, language_enum, state) {
    var kernel_with_output = {};

    //first we initialize the kernel and set its level
    var kernel = new Kernel();
    //todo test this below (added recently and not tested yet)
    kernel.level = level;


    //SECOND: we set its properties based on level
    //this will mutate the properties of the kernel passed in
    set_kernel_properties_2(kernel, level, state);
    var allowed = set_allowed(kernel, language_enum);



    //THIRD: populate the kernel with a randomly chosen template S O V, S V, etc.
    var template = make_kernel_template(kernel, level);




    console.log("TESTING template = ", JSON.stringify(template));


    //FOURTH: turn the template objects (S O V etc.) into forms
    var form_list = [];
    for (var i = 0; i < template.length; i++) {
        console.log('DEBUG 9-14 Successfully entered loop');
        var form = make_form(kernel, level, template[i], allowed, form_list);
        form_list.push(form);
        console.log("TESTING START for loop make_form");
        console.log("new form = ", JSON.stringify(form));
        console.log("TESTING END for loop make_form");
    }
    kernel.form_list = form_list;


    //TESTING FINAL OUTPUT
    console.log("TESTING START output of make_kernel");
    console.log("full kernel ", JSON.stringify(kernel));
    console.log("TESTING END make_kernel ");
    //we create a dictionary with only one initial key:value pair
    //string : function
    //later on we're going to add other key:value pairs
    //
    var sentence_in_latin = {'inflect': inflect_latin};
    var sentence_in_english = {'inflect': inflect_english};
    var sentences = [sentence_in_latin, sentence_in_english];


    for (i = 0; i < kernel.form_list.length; i++) {
        var current_form = kernel.form_list[i];
        console.log("DEBUG.9-10 current form = ", current_form);
        sentences.forEach(function (sentence) {
            sentence[current_form.element] = sentence.inflect(
                kernel, current_form.lexeme, current_form.word_settings)});
    }

    var default_latin_word_order = ['subject', 'object', 'verb'];
    if (level > 100 && kernel.clause_type !== 'is') {default_latin_word_order = shuffle(default_latin_word_order)}

    var sentence_in_latin_text = sentence_in_order(default_latin_word_order, sentence_in_latin);
    var sentence_in_english_text = sentence_in_order(['subject', 'verb', 'object'], sentence_in_english);

    console.log("sentence_in_latin = ", sentence_in_latin_text);
    console.log("sentence_in_english = ", sentence_in_english_text);

    kernel_with_output['kernel'] = kernel;
    kernel_with_output['sentence_in_latin'] = sentence_in_latin_text;
    kernel_with_output['sentence_in_english'] = sentence_in_english_text;
    kernel_with_output['level'] = level;

    return kernel_with_output;


    //END CHECKPOINT 3

    //todo when and where do we need kernel returned
    //return kernel;
}





function make_kernel_new (level, language_enum, state, old_lexeme_list) {
    var lexeme_list = {};
    if (state.s_o_swap === 'swap') {
        lexeme_list['subject'] = old_lexeme_list['object'];
        lexeme_list['object'] = old_lexeme_list['subject'];
    } else {
        lexeme_list['subject'] = old_lexeme_list['subject'];
        lexeme_list['object'] = old_lexeme_list['object'];
    }
    lexeme_list['verb'] = old_lexeme_list['verb'];
    state.subject_gender = lexeme_list['subject'].properties.latin.gender;
    state.transitivity = lexeme_list['verb'].properties.latin.transitive;
    //todo make below more eloquent
    if (state.transitivity === 'intransitive' && (
        state.number_of_other_nouns === 'plural' || state.s_o_swap === 'swap')) {
        return 'should not be made'
    }
    console.log('DEBUG 9-21 transitivity = ', state.transitivity);
    state.number = (state.person[1] === 's'? 'singular': 'plural');
    var template = make_kernel_template(state, level);



    var form_list = [];
    for (var i = 0; i < template.length; i++) {
        var word_setting = set_word_setting_new(state, lexeme_list[template[i]], template[i], level);
        var form = new Form(lexeme_list[template[i]], word_setting, template[i]);
        console.log('DEBUG 9-21 form = ', form);
        form_list.push(form);
    }
    state.form_list = form_list;


    //we create a dictionary with only one initial key:value pair
    //string : function
    //later on we're going to add other key:value pairs
    var sentence_in_latin = {'inflect': inflect_latin};
    var sentence_in_english = {'inflect': inflect_english};
    var sentences = [sentence_in_latin, sentence_in_english];


    for (i = 0; i < form_list.length; i++) {
        var current_form = form_list[i];
        sentences.forEach(function (sentence) {
            console.log('DEBUG 9-21 current_form.element = ', current_form.element);
            sentence[current_form.element] = sentence.inflect(
                state, current_form.lexeme, current_form.word_settings)});
    }

    //todo make word order part of level_to_allowed
    var default_latin_word_order = ['subject', 'object', 'verb'];
    if (level > 100 && state.clause_type !== 'is') {default_latin_word_order = shuffle(default_latin_word_order)}

    var sentence_in_latin_text = sentence_in_order(default_latin_word_order, sentence_in_latin);
    var sentence_in_english_text = sentence_in_order(['subject', 'verb', 'object'], sentence_in_english);

    console.log("sentence_in_latin = ", sentence_in_latin_text);
    console.log("sentence_in_english = ", sentence_in_english_text);

    var kernel_with_output = {};
    kernel_with_output['kernel'] = state;
    kernel_with_output['sentence_in_latin'] = sentence_in_latin_text;
    kernel_with_output['sentence_in_english'] = sentence_in_english_text;
    kernel_with_output['level'] = level;

    return kernel_with_output;

}

function set_word_setting_new(state, lexeme, element, level) {
    console.log('DEBUG 9-14 in set_word_setting');
    var word_settings_map = {};




    if (element === "verb") {
        console.log('DEBUG 9-14 in verb case');
        word_settings_map.conjugation = lexeme.properties.latin.family;
        //this will need to be fixed below

    } else {
        console.log('DEBUG 9-14 in noun case');
        //language-independent
        //todo make number dependent on
        word_settings_map.number = (element === "subject" ? state.number : state.number_of_other_nouns);
        word_settings_map.declension = lexeme.properties.latin.family;
        word_settings_map.gender = lexeme.properties.latin.gender;


        //todo form.element should probably just be changed to "function"
        var syntactic_function = element;


        if (syntactic_function === "subject") {
            word_settings_map.function = "subject";
        } else if (syntactic_function === "object") {
            word_settings_map.function = "object";
        }
    }

    return word_settings_map;
}


function sentence_in_order(word_order, sentence) {
    return word_order.map(function (x) {return sentence[x]}).join(' ').replace(/ +/g, ' ').replace(/^ | $/g, '');                       //   / = beginning of the regex  += any number of occurrences  /g = applied globally, i.e. repeatedly, until there are no more left
}



//_______________
//SUB FUNCTIONS BELOW to make kernel


function set_kernel_properties_2 (kernel, level, state) {
    for (var i in state) {
        kernel[i] = state[i];
        kernel.gender = "m";
        kernel.verb_type = "transitive";
    }

    console.log("DEBUG 9-14 state = ", JSON.stringify(state));



    kernel.verb_type = ((kernel.voice === "active" && level > 10) ?
        // todo do we really want to require level > 10?
        random_choice(["transitive", "intransitive"]): "transitive");
    // kernel.verb_type = random_choice(["transitive", "intransitive", "copula"]);

    //below isn't set by cartesian
    kernel.gender = random_choice(level < 10 ? ["m"] : (
        (level < 100 || kernel.voice === "active")
            ? ['m', 'f']: ['m', 'f', 'n']));
    console.log("DEBUG 9-7 kernel = ", JSON.stringify(kernel))
}



function make_kernel_template (kernel, level) {
    var s = Elements.Subject;
    var o = Elements.Object;
    var v = Elements.Verb;
    var template_list = [v];
    if (kernel.transitivity === "transitive" && kernel.voice === "active")   {
        template_list = [o].concat(template_list)
    }

    if (kernel.implicitness === "explicit")   {
        template_list = [s].concat(template_list)
    }

    return template_list;
}


function make_form (kernel, level, element, allowed, form_list) {
    var word_settings = set_word_setting(kernel, level, element, allowed);
    var lexeme = pick_lexeme(kernel, level, element, word_settings, allowed, form_list);
    console.log("2) word settings = ", word_settings);
    return new Form(lexeme, word_settings, element);
}



function pick_lexeme_new(kernels, level, element, lexemes_used) {
    var kernel = kernels[0];
   //we want our lexeme to be the right part of speech
    var part_of_speech = (element === "verb" ? "verb" : "noun");
    var allowed_lexemes = lexicon.filter(function (lexeme) {
        return lexeme.properties.core.part_of_speech === part_of_speech});

    console.log("DEBUG 9-18 allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
        function (x) {return x.word_id}
    )));

    //we don't want to use a lexeme twice
    allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
        return lexemes_used.indexOf(lexeme.word_id) === -1});

    console.log("DEBUG 9-18 allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
        function (x) {return x.word_id}
    )));

    //we want only animate nouns as the subject of active verbs
    if (kernel.voice === "active" && element === "subject") {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.core.animate === true})
    }

    console.log("DEBUG 9-18 allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
        function (x) {return x.word_id}
    )));


    if (part_of_speech === "noun") {
        //todo don't set allowed.gender yet
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).gender.indexOf(
                    lexeme.properties.latin.gender) !== -1});
        console.log("DEBUG 9-18 allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
            function (x) {return x.word_id}
        )));
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).declension.indexOf(
                    lexeme.properties.latin.family) !== -1});
    } else if (part_of_speech === "verb") {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).conjugation.indexOf(
                    lexeme.properties.latin.family) !== -1});
        console.log("DEBUG 9-18 allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
            function (x) {return x.word_id}
        )));
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).transitivity.indexOf(
                    lexeme.properties.latin.transitive) !== -1});
    }

    console.log("DEBUG 9-18 allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
        function (x) {return x.word_id}
    )));
    return random_choice(allowed_lexemes);
}


function pick_lexeme(kernel, level, element, word_settings, allowed, form_list) {
    // todo form list added as argument to avoid repetition of subject and object
    // we want sensitivity to: animacy / mass vs count nouns
    // this is so that our lexemes can be compared
    var lexemes_used = form_list.map(function (x) {return x.lexeme.word_id});
    var part_of_speech = (element === "verb" ? "verb" : "noun");
    var allowed_lexemes = lexicon.filter(function (lexeme) {
        return lexeme.properties.core.part_of_speech === part_of_speech});
    allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
        return lexemes_used.indexOf(lexeme.word_id) === -1});
    console.log("lexemes_used = ", JSON.stringify(lexemes_used));
    console.log("allowed_lexemes = ", JSON.stringify(allowed_lexemes));
    if (kernel.voice === "active" && element === "subject") {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.core.animate === true})
    }

    if (part_of_speech === "noun") {
        //todo don't set allowed.gender yet
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.latin.gender === word_settings.gender});
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.latin.family === word_settings.declension})
    } else if (part_of_speech === "verb") {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.latin.family === word_settings.conjugation});
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.latin.transitive === kernel.verb_type})
    }

    console.log("allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
        function (x) {return x.word_id}
    )));
    return random_choice(allowed_lexemes);
}

function generate_form_list (template) {
    var form_list = [];
    var nouns = get_lexemes(Elements.Noun);

    if (template.indexOf(Elements.Verb) >= 0) {
        var verbs = get_lexemes(Elements.Verb);
        var verb = random_choice(verbs);
        form_list.push(new Form(verb, null, Elements.Verb));
    }

    var subject_noun;

    if (template.indexOf(Elements.Subject) >= 0) {
        subject_noun = random_choice(nouns);
        form_list.push(new Form(subject_noun, null, Elements.Subject));
    }

    var object_noun = subject_noun;

    if (template.indexOf(Elements.Object) >= 0) {
        while (object_noun === subject_noun) {
            object_noun = random_choice(nouns);
        }
        form_list.push(new Form(object_noun, null, Elements.Object));
    }

    return form_list;
}






//____________________________________________________
//utility functions below


function get_property (level_map, level) {
    return random_choice(level_map[level]);
}
function set_property (level, property) {

}





//function generate_form_list (template) {
//    var form_list = [];
//    for (var i in template) {
//        var lex = generate_lexeme(template[i]);
//        form_list.push(new Form (lex, null, template[i]));
//    }
//    return form_list;
//}
//
//
//function generate_lexeme (element) {
//    var ls = get_lexemes(element);
//    //todo filter out inanimate subjects and such
//    return random_choice(ls);
//}


//LOOSE ENDS






