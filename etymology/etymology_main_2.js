var question_template_dict = {
    // clue = quadruped, corrrect = QUADR, very easy
    'word_to_latin_root': 'Pick the root of the word ',
    // clue = quadruped, choices = QUADR - four, very easy
    'word_to_translated_root': 'Pick the translated root of the word ',
    // clue = quadruped, correct = "an animal with four legs",
    // hard (with cheat sheet easy-ish)
    'word_to_word_definition': 'Pick the definition of the word ',
    // clue = quadruped, correct = four, hard (with cheat sheet medium)
    'word_to_english_root': 'Pick the english meaning of the root of the word ',
    // clue = four, correct = quadruped, hard (with cheat sheet medium)
    'english_root_to_word': 'Pick the word with a root that means ',
    // clue = "an animal with four legs", correct = quadruped,
    // hard (with cheat sheet medium)
    'word_definition_to_word': 'Pick the word that means ',
    // clue = QUADR, correct = four, hard (with cheat sheet medium)
    'root_to_root_definition': 'Pick the definition of the root ',
    // clue = four, corect = QUADR, hard (with cheat sheet medium)
    'root_definition_to_root': 'Pick the root that means '
};

var legal_question_types = [
    'word_to_latin_root', 'word_to_english_root', 'word_to_translated_root',
    'english_root_to_word', 'word_to_word_definition', 'word_definition_to_word',
    'root_to_root_definition', 'root_definition_to_root'
];

var cheat_sheet_map = {
    'word_to_latin_root': {
        'type': 'root_to_root_definition', // (clue + choices + dummies)
        'mandatory': 'choices',
        'dummies': true
    },
    'word_to_english_root': {
        'type': 'word_to_word_definition', // (clue) // no dummies (how do we implement this)
        'mandatory': 'clue',
        'dummies': false
    },
    'word_to_translated_root': {
        'type': 'word_to_word_definition', // (clue) // no dummies (how do we implement this)
        'mandatory': 'clue',
        'dummies': false
    },
    'english_root_to_word': {
        'type': 'word_to_word_definition',
        'mandatory': 'choices',
        'dummies': true
    },
    'word_to_word_definition': {
        'type': 'root_to_root_definition', // (clue + choices + dummies)
        'mandatory': 'roots_in_clue',
        'dummies': true
    },
    'word_definition_to_word': {
        'type': 'root_to_root_definition', // (clue + choices + dummies)
        'mandatory': 'roots_in_choices',
        'dummies': true
    },
    'root_to_root_definition': {
        'type': 'word_to_word_definition',
        'mandatory': 'words_which_contain_root',
        // This does not give us all of them.
        'dummies': true
    },
    'root_definition_to_root': {
        'type': 'word_to_word_definition',
        'mandatory': 'words_which_contain_root',
        // This does not give us all of them.
        'dummies': true
    }
}


//chooses all available roots as specified for each module
var select_available_roots = function (etym_level) {
    return map_level_to_allowed(etym_level, etym_levels).roots;
}


var get_words_from_roots = function (allowed_roots) {
    return Object.keys(words).filter(function (x) {
        return something_in_common(get_roots(x), allowed_roots);
    });
}


var get_words_with_root = function (root, available_words) {
    return available_words.filter(function (x) {
        return get_roots(x).indexOf(root) !== -1;
    })
};

var get_word_meaning = function (word) {
    if (word in words) {
        return words[word].meaning;
    } else {
        throw "word not found in words: " + word;
    }
}

var get_roots = function (word) {
    if (word in words) {
        return words[word].roots;
    } else {
        throw "word not found in words: " + word;
    }
}

var get_root_meaning = function (root) {
    if (root in roots) {
        return roots[root].meaning;
    } else {
        throw "root not found in roots: " + root;
    }
}

var get_translated_root = function (root) {
    if (root in roots) {
        return root + ' - ' + roots[root].meaning;
    } else {
        throw "root not found in roots: " + root;
    }
}

var similar_enough = function (x, y) {
    return common_word(get_root_meaning(x), get_root_meaning(y), 4);
}





var make_question_data = function (question_type,
available_words, available_roots, number_of_answer_choices) {
    // available_words and available_roots are lists.
    // var question_type = random_choice(available_question_types);
    if (legal_question_types.indexOf(question_type) === -1) {
        throw new Error('Illegal question type.');
    }
    var question_template = question_template_dict[question_type];
    var clue;
    var correct_answer;
    var choices;
    switch (question_type) {
        case 'word_to_latin_root':
        case 'word_to_english_root':
        case 'word_to_translated_root':
            var root = random_choice(available_roots);
            var words_with_root = get_words_with_root(root, available_words);
            clue = random_choice(words_with_root);
            var roots_of_clue = get_roots(clue);
            choices = push_random_disjoint(
                [root], available_roots, similar_enough,
                function (x) {return roots_of_clue.indexOf(x) === -1},
                number_of_answer_choices - 1);
            if (question_type == 'word_to_latin_root') {
                correct_answer = root;
            } else if (question_type == 'word_to_english_root') {
                correct_answer = get_root_meaning(root);
                choices = choices.map(get_root_meaning);
            } else if (question_type == 'word_to_translated_root') {
                correct_answer = get_translated_root(root);
                choices = choices.map(get_translated_root);
            };
            break;
        case 'english_root_to_word':
            var root = random_choice(available_roots);
            clue = get_root_meaning(root);
            var words_with_root = get_words_with_root(root, available_words);
            correct_answer = random_choice(words_with_root);
            choices = push_random_n_satisfying_constraint(
                [correct_answer], available_words, function (x) {
                    return words_with_root.indexOf(x) === -1},
                number_of_answer_choices - 1);
            break;
        case 'word_to_word_definition':
        case 'word_definition_to_word':
            var word = random_choice(available_words);
            var meaning = get_word_meaning(word);
            var word_choices = push_random_n_satisfying_constraint(
                [word], available_words, function (x) {return x !== clue},
            number_of_answer_choices - 1);
            var word_meaning_choices = word_choices.map(get_word_meaning);
            if (question_type === 'word_to_word_definition') {
                clue = word;
                correct_answer = meaning;
                choices = word_meaning_choices;
            } else if (question_type === 'word_definition_to_word') {
                clue = meaning;
                correct_answer = word;
                choices = word_choices;
            }
            
            break;
        case 'root_to_root_definition':
        case 'root_definition_to_root':
            var root = random_choice(available_roots);
            var meaning = get_root_meaning(root);
            // Some changes occured here.
            // The "push random disjoint" function takes a custom equality tester.
            // Here, the equality test tests whether there is a common word
            // in the root's descriptions of length at least 4.
            var root_choices = push_random_disjoint(
                [root], available_roots, similar_enough,
                    constant(true), number_of_answer_choices - 1);
            var root_meaning_choices = root_choices.map(get_root_meaning);
            if (question_type === 'root_to_root_definition') {
                clue = root;
                correct_answer = meaning;
                choices = root_meaning_choices;
            } else if (question_type === 'root_definition_to_root') {
                clue = meaning;
                correct_answer = root;
                choices = root_choices;
            }
    };
    //akiva_damage_control 10-21-16
    // console.log("ETYM.CSV output = ", question_template + clue + JSON.stringify(choices) + correct_answer); 
    // console.log("ETYM.CSV correct_answer = ", correct_answer);
    // console.log("ETYM.CSV choices = ", JSON.stringify(choices));
    // console.log("ETYM.CSV clue = ", clue);
    // console.log("ETYM.CSV question_template = ", question_template); 
    // console.log("ETYM.CSV question_type = ", question_type); 
    return {
        'question_type': question_type,
        'question_template': question_template,
        'clue': clue,
        'correct_answer': correct_answer,
        'choices': choices
    }
}

// signature:
// takes as arguments:
// x: string
// x = latin root | english root | translated root | word definition | root definition
// y: string
// y = latin root | english root | translated root | word definition | root definition
// returns:
// ?

// example:
// x = latin root    //data type x
// y = english root  //data type y
// clue = 'QUADR'     //instance of x
// choices = ['four', ' // list of instances of x
// dummies =          //list of instances of x

/*
//example of producing a cheat sheet
//x= latin root
y=english root
clue= QUADR      (mandatory thing that's included - e.g. if question is what is a four legged animal called, the clue = quadr)
choices = ARTHR, MACRO, POLY   (random choice from allowed x)
dummies = 
//example a producing a question with choices
*/

/*
//example of producing a cheat sheet
//x= data type
y= data type
mandatory = list of data type x   
number of extras = int 
constraint = function (x -> bool)

*/

// This is done (I think).
var all_of = {
    'word': Object.keys(words),
    'word_definition': Object.keys(words).map(get_word_meaning),
    'latin_root': Object.keys(roots),
    'english_root': Object.keys(roots).map(get_root_meaning),
    'translated_root': Object.keys(roots).map(get_translated_root)
};

// x_to_y[x][y] is a function mapping type x to type y (x -> y).
// This only exists for some types; we can add more if we need to.
var x_to_y = {
    'word': {
        'word_definition': get_word_meaning,
        /*'latin_root': {
            function (x) {return random_choice(words[x].roots)}
        },*/
        'latin_root': get_roots
    },
    'latin_root': {
        'english_root': get_root_meaning,
        'word': function (x) {return get_words_with_root(x, words)}
    }
};

var cheat_sheet_x_to_y = function (x, y, mandatory, number_of_extras,
constraint) {
    if (!constraint) {
        constraint = function () {return true};
    };
    // a is a list of all items of type x
    var a = all_of[x];
    // xs is the list of x's to use
    var xs = mandatory;
    // we do this loop number_of_extras times
    // each time we add another entry to xs
    push_random_n_satisfying_constraint(xs, a, constraint, number_of_extras);
    // we return a dict by mapping our keys by the appropriate function (x_to_y[x][y])
    // where x_to_y[x][y] is a function mapping type x to type y (x -> y)
    var mapping_function = x_to_y[x][y];
    var result = {};
    for (var i = 0; i < xs.length; i++) {
        result[xs[i]] = mapping_function(xs[i]);
    }
    return result;
    // return keys_mapped_by_function(xs, x_to_y[x][y]);
}

var make_etymology_question = function (etym_level, question_type,
number_of_answer_choices) {
    var available_roots = select_available_roots(etym_level);
    var available_words = get_words_from_roots(available_roots);
    return make_question_data(question_type, available_words,
    available_roots, number_of_answer_choices);
}


// Add more entries as needed.
var get_constraint = {
    'contain_root': function (question_data) {
        var my_roots;
        var question_type = question_data['question_type'];
        if (starts_with(question_type, 'root_to')) {
            my_roots = [question_data['clue']];
        } else if (ends_with(question_type, 'to_root')) {
            my_roots = [question_data['correct_answer']];
        } else {
            throw new Error('There is no root in this question,' +
            'but yet some answers must contain the root.');
        }
        return function (word) {
            return something_in_common(get_roots(word), my_roots);
        }
    }
}

var get_mandatory = function (mandatory_type,
question_data, number_of_mandatory) {
    var new_mandatory_type;
    if (mandatory_type === 'clue') {
        return [question_data['clue']]
    } else if (mandatory_type === 'choices') {
        return question_data['choices']
    } else if (mandatory_type === 'choices') {
        return question_data['choices']
    } else if (starts_with(mandatory_type, 'roots_in_')) {
        new_mandatory_type = cut_off(mandatory_type, 'roots_in_');
        var my_words = get_mandatory(new_mandatory_type,
            question_data, number_of_mandatory);
        // my_roots is a list of lists.
        var my_roots = my_words.map(get_roots);
        return unique_items(concat_arrays(my_roots));
    } else if (mandatory_type.indexOf('s_which_')) {
        new_mandatory_type = mandatory_type.split('s_which_')[0];
        // This is only a string.
        var constraint = mandatory_type.split('s_which_')[1];
        // This is an actual function.
        var real_constraint = get_constraint[constraint](question_data);
        return random_n(all_of[new_mandatory_type].filter(real_constraint),
            number_of_mandatory);
    }
}

var etym_standardize = function(term) {
    if (term === 'root') {
        return 'latin_root';
    } else if (term === 'root_definition') {
        return 'english_root';
    } else {
        return term;
    }
}

var get_number_of_dummies = function (number_of_dummies,
dummy_cheat_sheet_type) {
    if (dummy_cheat_sheet_type === true) {
        // We're fine; number_of_dummies doesn't need to change.
        return number_of_dummies;
    } else if (dummy_cheat_sheet_type === false) {
        return 0; // We don't want dummies.
    } else {
        throw new Error('dummies not in cheat_sheet_type, ' +
        'or set to an illegal value.');
    }
}

var make_etymology_question_with_cheat_sheet = function (
etym_level, question_type, number_of_answer_choices,
number_of_dummies, number_of_mandatory) {
    var question_data = make_etymology_question(
        etym_level, question_type, number_of_answer_choices);
        
        
    debug.log("BEEBUG question_data = ", question_data);
    debug.log("BEEBUG question_data stringified = ", JSON.stringify(question_data));

        
    var cheat_sheet_type = cheat_sheet_map[question_type];
    var x = cheat_sheet_type['type'].split('_to_')[0];
    var y = cheat_sheet_type['type'].split('_to_')[1];
    x = etym_standardize(x);
    y = etym_standardize(y);
    var mandatory = [];
    var mandatory_types = cheat_sheet_type['mandatory'].split(' + ');
    for (var i = 0; i < mandatory_types.length; i++) {
        mandatory = mandatory.concat(get_mandatory(
            mandatory_types[i], question_data, number_of_mandatory));
    };
    number_of_dummies = get_number_of_dummies(
        number_of_dummies, cheat_sheet_type['dummies']);
    var cheat_sheet = cheat_sheet_x_to_y(x, y, mandatory, number_of_dummies);
    return {
        'question_data': question_data,
        'cheat_sheet': cheat_sheet
    }
}


// we want a cheat sheet that will help when we are trying to go
// from root_definition_to_root
// e.g. spell the root that means "four"
// cheat sheet would have a bunch of words that have that root, along with some dummies
// arguments:
// root = the root we want to be in common
// max = the maximum number of words that we return

var make_root_to_word_list = function (root) {
    console.log("DRAGON entering the dragon make_root_to_word_list");
    console.log("DRAGON input = ", root);
    //we get all words with that root
    var root_list = [];
    root_list.push(root);
    // todo later we'll push max - 1 random roots
    var all_words_with_root = get_words_from_roots(root_list);
    // var all_words_with_root = get_words_with_root(root, words);
    console.log("DRAGON output all_words_with_root = ", all_words_with_root);
    
    //hacky quick test
    var output_list = [];
    for (var i = 0; i < all_words_with_root.length; i++) {
        var word_to_query = all_words_with_root[i];
        var meaning_of_word = get_word_meaning(word_to_query);
        var word_and_meaning = word_to_query.toUpperCase() + " = " + meaning_of_word;
        output_list.push(word_and_meaning);
    }
    
    // primitive version below
    // return all_words_with_root;
    
    return output_list;
}
