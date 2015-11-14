//DESCRIPTION
//this module should be the first step, producing a kernel with language independent properties
// input: level (problem: level might be language dependent)
// output: kernel with kernel.properties



//____________offline testing only

//below is merely for off-line testing separate from the quiz format
function make_test(level, language_enum, output_type) {
    var x;
    //~`console.log("DEBUG 9-14 level in make_test = ", level);

    var kernel_with_output = make_output(level, language_enum, output_type);
    if (output_type === 'display') {
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_latin']));
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_english']));
    } else if (output_type === "cartesian") {
        x = convert_to_JSON(kernel_with_output);
        document.body.appendChild(document.createTextNode(JSON.stringify(x)));
    } else if (output_type === "mc & display") {
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_latin']));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createTextNode(kernel_with_output['sentence_in_english']));
        document.body.appendChild(document.createElement('br'));
        x = convert_to_JSON(kernel_with_output);
        document.body.appendChild(document.createTextNode(JSON.stringify(x)));
    }
}



//_____________________
//MASTER FUNCTION BELOW to make kernel
function make_output(level, language_enum, output_type) {
    var states;
    var elements;
    var lexeme_list;
    var output;
    var kernel;
    var i;
    var order = ['clause_type', 'sequence', 'tense', 'implicitness', 'person',
        'voice', 'number_of_other_nouns', 's_o_swap', 'shuffle'];
    if (output_type === "random") {
        var state = random_choice(master_cartesian(level, order));
        return make_kernel(level, language_enum, state);
    } else if (output_type === "cartesian") {
        states = master_cartesian(level, order);
        //todo new material below
        elements = [Elements.Subject, Elements.Object, Elements.Verb];
        lexeme_list = state_to_lexeme(states, level, elements);

        output = [];
        for (i = 0; i < states.length; i++) {
            kernel = make_kernel_new(level, language_enum, states[i], lexeme_list);
            if (kernel !== 'should not be made') {
                output.push(kernel)
            }
        }
    } else if (output_type === "quiz_english") {
        states = master_cartesian(level, order);
        //~`console.log("LOG.make_output states stringified  = ", JSON.stringify(states));


        //we need to establish transitivity before we do anything else
        //todo transitivity cannot necessarily be established in this way
        var transitivity;
        if (states.every(function (x) {return x.voice === 'passive'})) {
            //~`console.log('DEBUG 10/29 all passive states');
            transitivity = 'transitive'
        } else {
            //~`console.log('DEBUG 10/29 some active states');
            transitivity = random_choice(map_level_to_allowed(level).transitivity);
        }
        states.forEach(function (x) {
            x.transitivity = transitivity;
            x.template = make_kernel_template(x)
        });




        var template = maximal(states.map(function (x) {return x.template}));
        if (template.indexOf('subject') === -1) {template.unshift('subject')}
        //we start with the first item in the template and just assume we're homogenous in all states
        //todo later on we'll need to make something more sophisticated for non-homogenous sets of states
        //var template = states[0].template;
        ////~`console.log("LOG.make output template stringified = ", JSON.stringify(template));


        //we initilize a set of lexemes to play with
        lexeme_list = state_to_lexeme(states, level, template);
        //~`console.log("LOG.make output lexeme_list stringified = ", JSON.stringify(lexeme_list));


        //todo make this work, iterate across lexeme_list
        ////~`console.log("LOG.make_output lexeme list = ", JSON.stringify(lexeme_list.map(
        //    function (x) {return x.word_id}
        //)));

        //with lexemes and transitivity established we are ready to make an output
        output = [];


        //we iterate through states and make a kernel for each state, pushing it to the output list
        //making sure that we exclude those kernels that are self-contradictory
        for (i = 0; i < states.length; i++) {
            kernel = make_kernel_new(level, language_enum, states[i], lexeme_list);
            if (kernel !== 'should not be made') {
                output.push(kernel)
            }
        }

        if (output.length === 0) {throw new Error('No kernels were successfully made.')}

        //we hackily create output items that are specified for english (make more elegant later)
        // we return a property called kernel, which will give us the opportunity to sort it by its kernel properties (e.g. for proper ordering of drop downs)
        template.forEach(function (x) {
            output[x + '_in_english'] =
                output.map(function (y) {
                    return {'text': y[x + '_in_english'], 'kernel': y.kernel, 'part_of_speech': x}
                })
        });


        //old code below - we used to test for string equality but now we have unequal dictionaries so we're getting bear wolf bears wolves bear wolf bears wolves
        //template.forEach(function (x) {
        //    output[x + '_in_english'] =
        //        Array.from(new Set(output.map(function (y) {
        //            return {'text': y[x + '_in_english'], 'kernel': y.kernel}
        //        })))
        //});


        //we pick a random item in our output list to quiz the student on
        var choice = random_choice(output);

        /*var english_choices_test_output = template.map(function (x) {
            return {
                'choices': output[x + '_in_english'], 'heading': x,
                'correct_answer': choice[x + '_in_english']
            }
        });*/

        /*~`console.log('Debug 10.18 object in english ' + JSON.stringify(output.map(function (y) {
                return y['object_in_english']
            })));*/

        /*
         explanation of below:

         over template (i.e. the list ['subject', 'verb', 'object']) we perform map
         which means
         we perform the function known as function (x) on each element of the list
         i.e. we iterate over the list, treating each individual item as x in the anonymous function known as function (x)
         i.e. return blah blah blah
         */
        var english_template = list_intersection(choice.english_word_order, template);
        var drop_non_drop_map = drop_non_drop_creation(
            map_level_to_allowed(level)['drop_non_drop_map'], english_template);
        var output_dictionary = {
            'question': "Translate the following sentence:",
            'sentence': latin_mental_wrap(choice, choice['sentence_in_latin']),
            'drop_downs': english_mental_wrap(choice, manage_drop_downs(
                choice, output, english_template, Language_enum.English, drop_non_drop_map), level),
            'give_away_phrase': "The correct answer was: ",
            'give_away_ending_phrase': ". Now click on the correct answer."
        };


        //todo make a log statement to show english choices
        /*~`console.log("LOG.make_output output_dictionary = ", output_dictionary);
        //~`console.log("LOG.make_output output drop downs = ", output_dictionary.drop_downs.map(
            function (x) {return x.choices}));*/

        return output_dictionary;

    }
}

function english_mental_wrap(choice, drop_downs, level) {
    if (choice.kernel.clause_type === 'main') {
        return drop_downs;
    } else {
        var conjunction = (choice.kernel.clause_type === 'is') ? 'that': 'why';
        var main_clause = {'type': 'non_drop', 'non_drop_text': 'the bird ' +
        (choice.kernel.sequence === 'primary' ? 'knows ': 'knew ') + ' ('};
        var conjunction_drop_or_not =
            (Math.random() < map_level_to_allowed(level)['drop_non_drop_map']['conjunction_drop']);
        var conjunction_drop = {'type': 'drop down', choices: ['that', 'why'],
            heading: 'conjunction', correct_answer: conjunction};
        return [main_clause].concat(
            [conjunction_drop_or_not ? conjunction_drop : {'type': 'non_drop', non_drop_text: conjunction}],
            drop_downs, [{type: 'non_drop', 'non_drop_text': ')'}])
    }
}

function latin_mental_wrap(choice, sentence) {
    if (choice.kernel.clause_type === 'main') {
        return sentence;
    } else {
        return 'AVIS ' +
        (choice.kernel.sequence === 'primary' ? 'SCIT ': 'SCIEBAT ') + ' (' +
        (choice.kernel.clause_type === 'is' ? '': 'CUR ') + sentence + ')'
    }
}

function drop_non_drop_creation (drop_non_drop_allowed, template) {
    var i = 0;
    while (i < 1000) {
        var drop_non_drop_map = {};
        var drops = 0;
        template.forEach(function (x) {if (Math.random() < drop_non_drop_allowed[x + '_drop']) {
            //~`console.log('A drop!');
            drop_non_drop_map[x] = 'drop';
            drops++
            } else {
            drop_non_drop_map[x] = 'non_drop'
        }});
        if (drops >= Math.min(drop_non_drop_allowed.min, template.length) &&
            drops <= Math.max(drop_non_drop_allowed.max, 0)) {
            return drop_non_drop_map
        }
        i++
    }
    throw new Error('Either there is a mistake in level_to_allowed or you have very bad luck.')
}

//argument:
    //template: we need template (latin) so we know what english things to include
    //choice: correct answer
    //output: all options
//returns:
    //map of an intersection of 2 lists
        //map
            //create drop or non-drop for each item in our list intersection
        //2 lists
            //list 1: english word order (an always fixed order SVO)
            //list 2: template (variable, SV SOV VOS..)
                //eg. intersection of SVO & SV -> SV
                //eg intersection of SVO & VOS -> SVO
function manage_drop_downs(choice, output, english_template, language_enum, drop_non_drop_map) {
    return english_template.map(function (x) {return (drop_non_drop_map[x] === 'drop' ?
            create_drop_down_object : create_non_drop_object)
        (x, output, choice, language_enum)})
}

function list_intersection(l1, l2) {
  return l1.filter(function (x) {return l2.indexOf(x) !== -1})
}


function create_drop_down_object(x, output, choice, language_enum) {
    //~`console.log('Debug 11/2 reality check drop down objects are created');
    var key_for_word = x + '_in_' + language_enum;
    return {
        'type': 'drop down',
        'choices': sorted_choices(output, key_for_word),
        //'choices': output[key_for_word].sort(function (x, y) {}),
        'heading': x,
        'correct_answer': choice[key_for_word]
    }
}

function create_non_drop_object(x, output, choice, language_enum) {
    return {
        'type': 'non_drop',
        'non_drop_text': choice[x + '_in_' + language_enum]
    }
}

function state_to_lexeme(states, level, elements) {
    var lexeme_list = {};
    var lexemes_used = [];
    for (var i = 0; i < elements.length; i++) {
        lexeme_list[elements[i]] = pick_lexeme_new(states, level, elements[i], lexemes_used);
        lexemes_used.push(lexeme_list[elements[i]].word_id)
    }
    return lexeme_list;
}


function pick_lexeme_new(kernels, level, element, lexemes_used) {
    //we assume homogenous states for now
    var kernel = kernels[0];

    //we want our lexeme to be the right part of speech
    var part_of_speech = (element === "verb" ? "verb" : "noun");
    var allowed_lexemes = lexicon.filter(function (lexeme) {
        return lexeme.properties.core.part_of_speech === part_of_speech});




    //we don't want to use a lexeme twice
    allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
        return lexemes_used.indexOf(lexeme.word_id) === -1});





    //we want only animate nouns as the subject of active verbs
    if (kernel.voice === "active" && element === "subject") {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.core.animate === true})
    }



    if (part_of_speech === "noun") {
        //todo don't set allowed.gender yet
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).gender.indexOf(
                    lexeme.properties.latin.gender) !== -1});
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).declension.indexOf(
                    lexeme.properties.latin.family) !== -1});
    } else if (part_of_speech === "verb") {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).conjugation.indexOf(
                    lexeme.properties.latin.family) !== -1});
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return map_level_to_allowed(level).transitivity.indexOf(
                    lexeme.properties.latin.transitive) !== -1});
        if (kernel.transitivity === 'transitive') {
            allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
                return lexeme.properties.latin.transitive === 'transitive'});
        } else {
            allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
                return lexeme.properties.latin.transitive === 'intransitive'});
        }
    }

    /*~`console.log("LOG.pick_lexeme allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
        function (x) {return x.word_id}
    )));*/

    //var output_lexeme = random_choice(allowed_lexemes);
    //~`console.log("LOG.pick_lexeme chosen lexeme = ", output_lexeme);
    return random_choice(allowed_lexemes);
}



//todo language_enum is not implemented well - both inflect english and inflect latin are hard-coded whereas they should be dependent on language_enum
function make_kernel_new (level, language_enum, state, old_lexeme_list) {
    var template = state.template;
    var lexeme_list = {};



    //we establish the lexemes we're going to use
    if (state.s_o_swap === 'swap') {
        lexeme_list['subject'] = old_lexeme_list['object'];
        lexeme_list['object'] = old_lexeme_list['subject'];
    } else {
        lexeme_list['subject'] = old_lexeme_list['subject'];
        lexeme_list['object'] = old_lexeme_list['object'];
    }
    lexeme_list['verb'] = old_lexeme_list['verb'];

    if (lexeme_list.subject) {state.subject_gender = lexeme_list['subject'].properties.latin.gender}

    state.number = (state.person[1] === 's'? 'singular': 'plural');

    //todo make below more eloquent
    // We don't want to swap S & O when there's no O in the template.
    if (template.indexOf('object') === -1 && state.s_o_swap === 'swap') {return 'should not be made'}
    // We don't want to have an intransitive passive verb.
    //~`console.log('DEBUG 10/29 transitivity and voice = ', state.transitivity, state.voice);
    if (state.transitivity === 'intransitive' && state.voice === 'passive') {return 'should not be made'}
    //We don't want subject and object to be 3rd plural EXCEPT in indirect statement.
    //~`console.log("DEBUG 11/1 entering problematic zone");

    if (lexeme_list.subject && lexeme_list.subject.properties.latin.family === '3' && state.number === "plural"
        && lexeme_list.object && lexeme_list.object.properties.latin.family === '3' && state.number_of_other_nouns === "plural"
        && state.clause_type !== "is") {

        //~`console.log("DEBUG 11/1 reality check: 3rd subject plural & 3rd object detected");
        return 'should not be made'
    }
    //if (lexeme_list.subject && lexeme_list.subject.declension === '3' && state.number === 'plural'
    //    && lexeme_list.object && lexeme_list.object.declension === '3' && state.number_of_other_nouns === 'plural'
    //    && state.clause_type !== 'is') {
    //
    //    //~`console.log("DEBUG 11/1 3rd decl. plural collision detected");
    //    return 'should not be made'
    //}



    ///////////////
    //
    var form_dict = {};
    for (var i = 0; i < template.length; i++) {
        var word_setting = set_word_setting_new(state, lexeme_list[template[i]], template[i], level);
        form_dict[template[i]] = new Form(lexeme_list[template[i]], word_setting, template[i]);
    }
    state.form_dict = form_dict;


    //we create a dictionary with only one initial key:value pair
    //string : function
    //later on we're going to add other key:value pairs
    var sentence_in_latin = {'inflect': inflect_latin};
    var sentence_in_english = {'inflect': inflect_english};
    var sentences = [sentence_in_latin, sentence_in_english];


    //we iterate through form list and inflect each form
    //within this iteration we iterate through the sentences (here latin and english)
    for (i in form_dict) {
        var current_form = form_dict[i];
        sentences.forEach(function (sentence) {
            //~`console.log('DEBUG 9-21 current_form.element = ', current_form.element);
            var word = sentence.inflect(state, current_form.lexeme, current_form.word_settings);
            //catches the case where a single form produces multiple drop downs
            //todo should helping verbs in english also be treated the same way?
            //first condition is if the return is an object (i.e. a dictionary)

            if (typeof word === 'object') {
                //in which case we iterate through the dictionary
                for (var j in word) {
                    //if the key is already in the sentence we throw an error (e.g. already has a subject)
                    //todo ego cad-i-o -> shouldn't throw an error even though there are two subjects
                    if (j in sentence && sentence[j] !== word[j]) {
                        throw new Error(j + ' should not already be a property of the sentence.')
                    } else {
                        //we're updating with our new dictionary produced as word
                        sentence[j] = word[j];
                    }
                }
            } else if (typeof word === 'string') {
                sentence[current_form.element] = word
            }
        });
    }

    //todo make word order part of level_to_allowed
    var default_latin_word_order = ['subject', 'object', 'verb'];
    var default_english_word_order = ['subject', 'verb', 'object'];
    if (state.shuffle && state.clause_type !== "is") {default_latin_word_order = shuffle(default_latin_word_order)}

    //~`console.log("10-15 debug sentence_in_latin", sentence_in_latin);
    var sentence_in_latin_text = sentence_in_order(default_latin_word_order, sentence_in_latin);

    //~`console.log("sentence_in_latin = ", sentence_in_latin_text);

    var kernel_with_output = {};
    kernel_with_output['kernel'] = state;
    kernel_with_output['sentence_in_latin'] = sentence_in_latin_text;
    kernel_with_output['level'] = level;



    kernel_with_output['template'] = template;

    //~`console.log("DEBUG 10-15 template = ", kernel_with_output['template']);

    var sentence_in_english_text = sentence_in_order_list(default_english_word_order, sentence_in_english);
    for (i = 0; i < sentence_in_english_text.length; i++) {
        kernel_with_output[sentence_in_english_text[i].element + '_in_english'] =
            sentence_in_english_text[i].word;
    }

    kernel_with_output.english_word_order = default_english_word_order;

    return kernel_with_output;

}

function set_word_setting_new(state, lexeme, element, level) {
    //~`console.log('DEBUG 9-14 in set_word_setting');
    var word_settings_map = {};

    if (!lexeme) {throw new Error('lexeme is null or undefined')}


    if (element === "verb") {
        //~`console.log('DEBUG 9-14 in verb case');
        word_settings_map.conjugation = lexeme.properties.latin.family;
        //this will need to be fixed below

    } else {
        //~`console.log('DEBUG 9-14 in noun case');
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

function sentence_in_order_list (word_order, sentence) {
    return word_order.map(function (x) {return {'element': x, 'word': sentence[x]}})
}

function sentence_in_order(word_order, sentence) {
    return word_order.map(function (x) {return sentence[x]}).join(' ').replace(/ +/g, ' ').replace(/^ | $/g, '');                       //   / = beginning of the regex  += any number of occurrences  /g = applied globally, i.e. repeatedly, until there are no more left
}



//_______________
//SUB FUNCTIONS BELOW to make kernel

/*
function set_kernel_properties_2 (kernel, level, state) {
    for (var i in state) {
        kernel[i] = state[i];
        kernel.gender = "m";
        kernel.verb_type = "transitive";
    }

    //~`console.log("DEBUG 9-14 state = ", JSON.stringify(state));



    kernel.verb_type = ((kernel.voice === "active" && level > 10) ?
        // todo do we really want to require level > 10?
        random_choice(["transitive", "intransitive"]): "transitive");
    // kernel.verb_type = random_choice(["transitive", "intransitive", "copula"]);

    //below isn't set by cartesian
    kernel.gender = random_choice(level < 10 ? ["m"] : (
        (level < 100 || kernel.voice === "active")
            ? ['m', 'f']: ['m', 'f', 'n']));
    //~`console.log("DEBUG 9-7 kernel = ", JSON.stringify(kernel))
}
*/



function make_kernel_template (kernel) {
    var s = Elements.Subject;
    var o = Elements.Object;
    var v = Elements.Verb;
    var template_list = [v];
    if (kernel.transitivity === "transitive" && kernel.voice === "active") {
        template_list = [o].concat(template_list)
    }
    if (kernel.implicitness === "explicit")   {
        //~`console.log('adding subject');
        template_list = [s].concat(template_list)
    }

    return template_list;
}




//____________________________________________________
//utility functions below


function get_property (level_map, level) {
    return random_choice(level_map[level]);
}

function generate_random_level(){
    //Math.random = random real number between 0 & 1
    return Math.floor(Math.random() * 300) + 1;
}







//__________________________
//possibly obsolete functions below
function convert_to_JSON(test) {
    var JSON_output = {};
    JSON_output['target_sentence'] = test['sentence_in_latin'];
    JSON_output['base_sentence'] = test['sentence_in_english'];
    JSON_output['level'] = test['level'];
    return JSON_output
}


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







//______________________________________________
//old functions below
/*
function make_form (kernel, level, element, allowed, form_list) {
    var word_settings = set_word_setting(kernel, level, element, allowed);
    var lexeme = pick_lexeme_new(kernel, level, element, word_settings, allowed, form_list);
    //~`console.log("2) word settings = ", word_settings);
    return new Form(lexeme, word_settings, element);
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
    //~`console.log("lexemes_used = ", JSON.stringify(lexemes_used));
    //~`console.log("allowed_lexemes = ", JSON.stringify(allowed_lexemes));
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

    //~`console.log("allowed lexemes = ", JSON.stringify(allowed_lexemes.map(
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















//function set_property (level, property) {
//
//}
//












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









/*function make_kernel (level, language_enum, state) {
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




 //~`console.log("TESTING template = ", JSON.stringify(template));


 //FOURTH: turn the template objects (S O V etc.) into forms
 var form_list = [];
 for (var i = 0; i < template.length; i++) {
 //~`console.log('DEBUG 9-14 Successfully entered loop');
 var form = make_form(kernel, level, template[i], allowed, form_list);
 form_list.push(form);
 //~`console.log("TESTING START for loop make_form");
 //~`console.log("new form = ", JSON.stringify(form));
 //~`console.log("TESTING END for loop make_form");
 }
 kernel.form_list = form_list;


 //TESTING FINAL OUTPUT
 //~`console.log("TESTING START output of make_kernel");
 //~`console.log("full kernel ", JSON.stringify(kernel));
 //~`console.log("TESTING END make_kernel ");
 //we create a dictionary with only one initial key:value pair
 //string : function
 //later on we're going to add other key:value pairs
 //
 var sentence_in_latin = {'inflect': inflect_latin};
 var sentence_in_english = {'inflect': inflect_english};
 var sentences = [sentence_in_latin, sentence_in_english];


 for (i = 0; i < kernel.form_list.length; i++) {
 var current_form = kernel.form_list[i];
 //~`console.log("DEBUG.9-10 current form = ", current_form);
 sentences.forEach(function (sentence) {
 sentence[current_form.element] = sentence.inflect(
 kernel, current_form.lexeme, current_form.word_settings)});
 }

 var default_latin_word_order = ['subject', 'object', 'verb'];
 if (level > 100 && kernel.clause_type !== 'is') {default_latin_word_order = shuffle(default_latin_word_order)}

 var sentence_in_latin_text = sentence_in_order(default_latin_word_order, sentence_in_latin);
 var sentence_in_english_text = sentence_in_order(['subject', 'verb', 'object'], sentence_in_english);

 //~`console.log("sentence_in_latin = ", sentence_in_latin_text);
 //~`console.log("sentence_in_english = ", sentence_in_english_text);

 kernel_with_output['kernel'] = kernel;
 kernel_with_output['sentence_in_latin'] = sentence_in_latin_text;
 kernel_with_output['sentence_in_english'] = sentence_in_english_text;
 kernel_with_output['level'] = level;

 return kernel_with_output;


 //END CHECKPOINT 3

 //todo when and where do we need kernel returned
 //return kernel;
 }*/