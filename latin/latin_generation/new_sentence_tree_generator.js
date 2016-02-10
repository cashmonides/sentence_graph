//DESCRIPTION
//this module should be the first step, producing a kernel with language independent properties
// input: level (problem: level might be language dependent)
// output: kernel with kernel.properties

//MASTER FUNCTION BELOW to make kernel
function make_output(level, current_lexicon, none_display) {
    var states;
    var i;
    var item;
    var full_order = ['clause_type', 'sequence', 'tense', 'implicitness', 'person',
        'voice', 'number_of_other_nouns', 'shuffle'];
    var order = {'subject': ['implicitness!explicit', 'person'],
        'object': ['number_of_other_nouns'],
        'verb': ['clause_type', 'sequence', 'tense', 'implicitness', 'person', 'voice']};
    var state_to_be_made = master_cartesian(level.latin_level, full_order, 'random');

    var words_to_make = [['noun', ['subject', 'object']], ['verb', ['verb']]];

    var creation_by_part_of_speech = [];
    /*
    
    Here begin the changes.
    */
    var master_lexeme_list = {
        get_lexemes: function (name) {
            return convert_keys_to_dict(this[name], this)
        },
        get_lexemes_as_list: function (name) {
            var self = this;
            return this[name].map(function (x) {return self[x]});
        },
    };
    master_lexeme_list.dummies_and_used = [];
    master_lexeme_list.all_lexemes = [];
    var drop_down_settings = map_level_to_allowed(level.latin_extra_level, latin_extra_levels)['drop_down_settings'];
    var part_of_speech;
    var things_with_part_of_speech;
    var new_lexemes;

    change_state_to_be_made_initial(state_to_be_made);

    for (i = 0; i < words_to_make.length; i++) {
        part_of_speech = words_to_make[i][0];
        things_with_part_of_speech = words_to_make[i][1];
        new_lexemes = add_to_lexeme_list(master_lexeme_list, state_to_be_made,
        part_of_speech, things_with_part_of_speech,
        drop_down_settings[part_of_speech], current_lexicon);
        creation_by_part_of_speech.push({'part of speech': part_of_speech,
        'sources': new_lexemes.filter(function (x) {
        return !(begins_with(x, 'double'))}), 'results': things_with_part_of_speech});
        // Originally return x.slice(0, 6) !== 'double'}), was here.
    }

    change_state_to_be_made_final(state_to_be_made, master_lexeme_list);
    // We make a template.
    state_to_be_made.template = make_kernel_template(state_to_be_made);

    // This is hacky (to a certain extent) and possibly incorrect.
    master_lexeme_list.used_only = none_display ? ['subject', 'object', 'verb'] : state_to_be_made.template;

    creation_by_part_of_speech.forEach(function (x) {x.results = x.results.filter(
    function (y) {return master_lexeme_list.used_only.indexOf(y) !== -1})});
    
    console.log('DEBUG 12-23 creation_by_part_of_speech = ', creation_by_part_of_speech);

    var correct = make_kernel_new(level, state_to_be_made,
        master_lexeme_list.get_lexemes('used_only'));

    states = {};
    var what_to_vary;
    for (i = 0; i < master_lexeme_list.used_only.length; i++) {
        item = master_lexeme_list.used_only[i];
        states[item] = master_cartesian(level.latin_level, order[item]);
    }

    var output = {};

    for (i = 0; i < creation_by_part_of_speech.length; i++) {
        item = creation_by_part_of_speech[i];
        console.log('DEBUG 12-23 item = ', item);
        for (var j = 0; j < item.sources.length; j++) {
            for (var k = 0; k < item.results.length; k++) {
                add_to_output(output, item.sources[j],
                item.results[k], states[item.results[k]],
                master_lexeme_list, level);
            }
        }
    }

    // we hackily create output items that are specified for english (make more elegant later)
    // we return a property called kernel, which will give us the opportunity to sort it by its kernel properties (e.g. for proper ordering of drop downs)
    for (var x in output) {
        output[x + '_in_english'] =
            output[x].map(function (y) {
                return {'text': y.form, 'kernel': y.kernel,
                'lexeme': y.lexeme, 'part_of_speech': x}
            })
    }

    // todo english_template should no longer be needed
    var english_template = list_intersection(["subject", "verb", "object"], Object.keys(output));
    
    console.log('DEBUG 12-23 output = ', output);
    console.log('DEBUG 12-23 english_template = ', english_template);
    
    var drop_non_drop_map = drop_non_drop_creation(
        map_level_to_allowed(level.latin_drop_level, latin_drop_levels)['drop_non_drop_map'], english_template);

    var r = {
        'question': "Translate the following sentence:",
        'sentence': latin_mental_wrap(correct, correct['sentence_in_latin']),
        'drop_downs': english_mental_wrap(correct, manage_drop_downs(
            correct, output, english_template, Language_enum.English, drop_non_drop_map), level),
        'give_away_phrase': "The correct answer was: ",
        'give_away_ending_phrase': ".",
        'cheat_sheet': cheat_sheet(master_lexeme_list.get_lexemes_as_list('all_lexemes'))
    };
    console.log('DEBUG 12-23 make_output result = ', r);
    return r
}

function add_to_output(output, source, result_role,
states_allowed, master_lexeme_list, level) {
    var start_length = ((result_role in output) ? output[result_role].length : 0);
    var fn_result;
    var kernel;
    
    if (!(result_role in output)) {output[result_role] = []};
    for (var i = 0; i < states_allowed.length; i++) {
        kernel = make_minimal_form_english(level, states_allowed[i],
        master_lexeme_list[source], result_role);
        if (kernel === "should not be made") {continue}
        if (typeof kernel.form === "string") {
            output[result_role].push(kernel)
        } else {
            for (var j in kernel.form) {
                fn_result = kernel;
                fn_result.lexeme = ((j === result_role) ?
                master_lexeme_list[source] : "not the right lexeme");
                fn_result.form = kernel.form.j;
                if (!(j in output)) {output[j] === []};
                output[j].push(fn_result);
            }
        }
    }
    var end_length = ((result_role in output) ? output[result_role].length : 0);
    if (start_length === end_length) {
        throw new Error("No new entries added.")
    }
}

var cheat_sheet = function (master_lexeme_list) {
    // We put our lexemes in groups corresponding to their part of speech.
    var lexemes_by_part_of_speech = separate_and_sort_by(
        master_lexeme_list, function (x) {
            return x.properties.core.part_of_speech});
    // We sort each group.
    var lexemes_sorted_by_root = lexemes_by_part_of_speech.map(
        function (x) {return quick_sort(x, sort_by_func(get_pure_latin_root))});
    // We push the part of speach to each item (as a header).
    lexemes_sorted_by_root.forEach(function (x) {
        x.unshift(x[0].properties.core.part_of_speech)});
    return concat_arrays(lexemes_sorted_by_root).map(function (x) {
        return [x.properties.latin.root, x.properties.english.root]});
}

function change_state_to_be_made_initial (state) {
    state.number = (state.person[1] === 's'? 'singular': 'plural');
}

function change_state_to_be_made_final (state, lexeme_list) {
    // Part of Grand Decoupling.
    // If other stuff needs to be changed it can go here too.
    state.transitivity = lexeme_list.verb.properties.latin.transitive;
    state.subject_gender = lexeme_list.subject.properties.latin.gender;
}

function english_mental_wrap(choice, drop_downs, level) {
    if (choice.kernel.clause_type === 'main') {
        return drop_downs;
    } else {
        var conjunction = (choice.kernel.clause_type === 'is') ? 'that': 'why';
        var main_clause = {'type': 'non_drop', 'non_drop_text': 'the bird ' +
        (choice.kernel.sequence === 'primary' ? 'knows ': 'knew ') + ' ('};
        var conjunction_drop_or_not =
            (Math.random() < map_level_to_allowed(level.latin_drop_level,
            latin_drop_levels)['drop_non_drop_map']['conjunction_drop'])
            && (is_sub_list(map_level_to_allowed(level.latin_level,
            latin_levels)['clause_type'], ['iq', 'is']));
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
    console.log('important info;', drop_non_drop_allowed, template, template.length);
    var i = 0;
    while (i < 1000) {
        var drop_non_drop_map = {};
        var drops = 0;
        template.forEach(function (x) {if (Math.random() < drop_non_drop_allowed[x + '_drop']) {
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
    var r = english_template.map(function (x) {return (drop_non_drop_map[x] === 'drop' ?
            create_drop_down_object : create_non_drop_object)
        (x, output, choice, language_enum)});
    console.log('DEBUG 12-23 manage_drop_downs result = ', r);
    return r
}

function list_intersection(l1, l2) {
  return l1.filter(function (x) {return l2.indexOf(x) !== -1})
}


function create_drop_down_object(x, output, choice, language_enum) {
    var key_for_word = x + '_in_' + language_enum;
    return {
        'type': 'drop down',
        'parts': sorted_choices(output, key_for_word),
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


function add_to_lexeme_list (
    master_lexeme_list, state, part_of_speech,
    things_with_part_of_speech, drop_down_dict, current_lexicon) {
    var element;
    var i;
    var new_lexemes = [];
    // lexicon dummies = items that only show up in the cheat sheet.
    var drop_down_number = things_with_part_of_speech.length + drop_down_dict.extra_options;
    var total_number = drop_down_number + drop_down_dict.lexicon_dummies
    // Note: it shouldn't matter what order these tasks are done in.
    for (i = 0; i < total_number; i++) {
        if (i < things_with_part_of_speech.length) {
            element = things_with_part_of_speech[i]
        } else if (i < drop_down_number) {
            element = 'dummy_' + part_of_speech + '_' + (i - things_with_part_of_speech.length)
        } else {
            element = 'double_dummy_' + part_of_speech + '_' + (i - drop_down_number)
        }

        master_lexeme_list[element] = pick_lexeme_new(state, element,
            part_of_speech, current_lexicon, master_lexeme_list);
        if (!(begins_with(element, 'double'))) {
            // Originally (element.slice(0, 6) !== 'double')
            master_lexeme_list.dummies_and_used.push(element)
        }
        master_lexeme_list.all_lexemes.push(element);
        new_lexemes.push(element)
    }
    return new_lexemes
}

/*
function remove_lexemes (lexeme_list, elements) {
    for (var i in lexeme_list) {
        if (elements.indexOf(i) === -1 && i.indexOf('dummy') === -1) {
            delete lexeme_list[i]
        }
    }
}


function remove_dummies (lexeme_list_with_dummies) {
    var lexeme_list = {};
    for (var i in lexeme_list_with_dummies) {
        if (i.indexOf('dummy') === -1) {
            lexeme_list[i] = lexeme_list_with_dummies[i]
        }
    }
    return lexeme_list;
}
*/

/*
Note: This function is old.
It is preserved in order that if what is being done is a terrible idea,
it can be fixed.
function alter_lexeme_list(state, elements, current_lexicon, lexeme_list) {
    // Note: this function now uses mutation.
    var i;
    // Note: it shouldn't matter what order these tasks are done in.
    for (i = 0; i < elements.length; i++) {
        if (!(elements[i] in lexeme_list)) {
            lexeme_list[elements[i]] = pick_lexeme_new(state, elements[i], current_lexicon, lexeme_list);
        }
    }
    for (i in lexeme_list) {
        if (elements.indexOf(i) === -1) {
            delete lexeme_list[i]
        }
    }
}
*/

function pick_lexeme_new(kernel, element, part_of_speech, current_lexicon, lexeme_list) {
    var lexemes_already_used = Object.keys(lexeme_list).map(
        function (x) {return lexeme_list[x].word_id});
    //we want our lexeme to be the right part of speech
    var allowed_lexemes = current_lexicon.filter(function (lexeme) {
        return lexeme.properties.core.part_of_speech === part_of_speech});

    //we don't want to use a lexeme twice
    allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
        return lexemes_already_used.indexOf(lexeme.word_id) === -1});

    //we want only animate nouns as the subject of active verbs
    if (kernel.voice === "active" && element === "subject") {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.core.animate === true})
    }

    // We don't want intransitive passive verbs.
    if (part_of_speech === "verb" && kernel.voice === 'passive') {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.latin.transitive === 'transitive'});
    }

    // We need to avoid double third-declension plurals.
    // This solution depends on subjects never being created after objects.
    if (element === 'object' && lexeme_list.subject &&
        lexeme_list.subject.properties.latin.family === '3' &&
        kernel.number === 'plural' && kernel.number_of_other_nouns === 'plural' &&
        kernel.clause_type !== 'is') {
        allowed_lexemes = allowed_lexemes.filter(function (lexeme) {
            return lexeme.properties.latin.family !== '3'});
    }

    if (allowed_lexemes.length === 0) {throw new Error('There are no allowed lexemes!')}
    return random_choice(allowed_lexemes);
}



// language_enum is not implemented well - both inflect english and inflect latin are hard-coded
// whereas they should be dependent on language_enum
function make_kernel_new (level, state, lexeme_list) {
    var template = state.template;

    var form_dict = {};
    for (var i = 0; i < template.length; i++) {
        var word_setting = set_word_setting_new(state, lexeme_list[template[i]], template[i]);
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
        for (var j = 0; j < sentences.length; j++) {
            var sentence = sentences[j];
            // if sentence is implicit and we are dealing with a subject do not do anything else this loop
            if (i === 'subject' && state.implicitness === "implicit") {continue}
            var word = sentence.inflect(state, current_form.lexeme, current_form.word_settings);
            //catches the case where a single form produces multiple drop downs
            //todo should helping verbs in english also be treated the same way?
            //first condition is if the return is an object (i.e. a dictionary)

            if (typeof word === 'object') {
                //in which case we iterate through the dictionary
                for (var k in word) {
                    //if the key is already in the sentence we throw an error (e.g. already has a subject)
                    //todo ego cad-i-o -> shouldn't throw an error even though there are two subjects
                    if (k in sentence && sentence[k] !== word[k]) {
                        throw new Error(j + ' should not already be a property of the sentence.')
                    } else {
                        //we're updating with our new dictionary produced as word
                        sentence[k] = word[k];
                    }
                }
            } else if (typeof word === 'string') {
                sentence[current_form.element] = word
            }
        }
    }

    //todo make word order part of level_to_allowed
    var default_latin_word_order = ['subject', 'object', 'verb'];
    var default_english_word_order = ['subject', 'verb', 'object'];
    if (state.shuffle && state.clause_type !== "is") {default_latin_word_order = shuffle(default_latin_word_order)}

    var sentence_in_latin_text = sentence_in_order(default_latin_word_order, sentence_in_latin);

    var kernel_with_output = {};
    kernel_with_output['kernel'] = state;
    kernel_with_output['sentence_in_latin'] = sentence_in_latin_text;
    kernel_with_output['level'] = level;

    kernel_with_output['template'] = template;

    var sentence_in_english_text = sentence_in_order_list(default_english_word_order, sentence_in_english);
    for (i = 0; i < sentence_in_english_text.length; i++) {
        kernel_with_output[sentence_in_english_text[i].element + '_in_english'] =
            sentence_in_english_text[i].word;
    }

    kernel_with_output.english_word_order = default_english_word_order;

    return kernel_with_output;
}

function make_minimal_form_english (level, state, lexeme, lexeme_type) {
    if (lexeme_type === 'subject') {state.subject_gender = lexeme.properties.latin.gender}

    if (lexeme_type === 'subject' || lexeme_type === 'verb') {
        state.number = (state.person[1] === 's'? 'singular': 'plural')}

    if (lexeme.properties.latin.transitive === 'intransitive' && state.voice === 'passive') {
        return 'should not be made'}

    var word_setting = set_word_setting_new(state, lexeme, lexeme_type);
    var form = new Form(lexeme, word_setting, lexeme_type);
    state.form = form;

    // We inflect our form.
    var word = inflect_english(state, form.lexeme, form.word_settings);

    var kernel_with_output = {};
    kernel_with_output['kernel'] = state;
    kernel_with_output['level'] = level;
    kernel_with_output['lexeme_type'] = lexeme_type;
    kernel_with_output['lexeme'] = lexeme;
    kernel_with_output['form'] = word;
    return kernel_with_output;
}

function set_word_setting_new(state, lexeme, element) {
    var word_settings_map = {};
    if (element === "verb") {
        word_settings_map.conjugation = lexeme.properties.latin.family;
        // This will need to be fixed below.
    } else {
        if (element === "subject") {
            word_settings_map.number = state.number
        } else {
            word_settings_map.number = state.number_of_other_nouns
        }
        if (lexeme) {
            // This does not occur if there is no appropriate lexeme, i.e., implicit subject.
            word_settings_map.declension = lexeme.properties.latin.family;
            word_settings_map.gender = lexeme.properties.latin.gender;
        }

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

function make_kernel_template (kernel) {
    var s = Elements.Subject;
    var o = Elements.Object;
    var v = Elements.Verb;
    var template_list = [v];
    // transitive kernels get objects & kernels whose transitivity has not yet been decided
    // (i.e., undefined) get objects
    // btw: another line of code will deal with kernels whose transitivity gets determined later
    if (kernel.transitivity !== "intransitive" && kernel.voice === "active") {
        template_list = [o].concat(template_list)
    }
    if (kernel.implicitness === "explicit")   {
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