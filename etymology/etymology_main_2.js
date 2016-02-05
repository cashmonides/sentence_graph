var question_template_dict = {
    'word_to_latin_root': 'Pick the root of the word ',                           //clue = english, choices = QUADR || four
    'word_to_english_root': 'Pick the root of the word ',
    'word_to_translated_root': 'Pick the root of the word ',
    'english_root_to_word': 'Pick the word with a root that means ',                   //clue = english, choices = english
    'word_to_word_definition': 'Pick the definition of the word ',
    'word_definition_to_word': 'Pick the word that means ',
    'root_to_root_definition': 'Pick the definition of the root ',
    'root_definition_to_root': 'Pick the root that means '
};

var legal_question_types = [
    'word_to_latin_root', 'word_to_english_root', 'word_to_translated_root',
    'english_root_to_word', 'word_to_word_definition', 'word_definition_to_word',
    'root_to_root_definition', 'root_definition_to_root'
];

var cheat_sheet_map = {
    'word_to_latin_root': 'root_to_root_definition', // (clue + choices + dummies)
    'word_to_english_root': 'word_to_word_definition', // (clue) // no dummies (how do we implement this)
    'word_to_translated_root': 'word_to_word_definition', // (clue)
    'english_root_to_word': 'word_to_word_definition',  // (choices + dummies)
    'word_to_word_definition': 'root_to_root_definition', // (clue + choices + dummies)
    'word_definition_to_word': 'root_to_root_definition', // (clue + choices + dummies)
    'root_to_root_definition': 'word_containing_root_to_word definition', //'root_to_word', (clue)
    'root_definition_to_root': 'word_containing_root_to_word definition' // (clue + choices + dummies)
}

var select_available_roots = function (etym_level) {
    return map_level_to_allowed(etym_level, etym_levels).roots;
}

var get_words_from_roots = function (allowed_roots) {
    return Object.keys(words).filter(function (x) {
        return something_in_common(words[x].roots, allowed_roots);
    });
}


var get_words_with_root = function (root, available_words) {
    return available_words.filter(function (x) {
        return words[x].roots.indexOf(root) !== -1;
    })
};

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
            var roots_of_clue = words[clue].roots;
            choices = push_random_n_satisfying_constraint(
                [root], available_roots, function (x) {return true},
                number_of_answer_choices - 1);
            if (question_type == 'word_to_latin_root') {
                correct_answer = root;
            } else if (question_type == 'word_to_english_root') {
                correct_answer = roots[root].meaning;
            } else if (question_type == 'word_to_translated_root') {
                correct_answer = root + ' - ' + roots[root].meaning;
            };
            break;
        case 'english_root_to_word':
            var root = random_choice(available_roots);
            clue = roots[root].meaning;
            var words_with_root = get_words_with_root(root, available_words)
            correct_answer = random_choice(words_with_root);
            choices = push_random_n_satisfying_constraint(
                [correct_answer], available_words, function (x) {
                    return words_with_root.indexOf(x) === -1},
                number_of_answer_choices - 1);
            break;
        case 'word_to_word_definition':
        case 'word_definition_to_word':
            var word = random_choice(available_words);
            var meaning = words[word].meaning;
            var wrong_words = push_random_n_satisfying_constraint(
                [], available_words, function (x) {return x !== clue},
            number_of_answer_choices - 1);
            var wrong_meanings = wrong_words.map(function (x) {
                return word[x].meaning;
            })
            if (question_type === 'word_to_word_definition') {
                clue = word;
                correct_answer = meaning;
                choices = wrong_meanings;
            } else if (question_type === 'word_definition_to_word') {
                clue = meaning;
                correct_answer = word;
                choices = wrong_words;
            }
            break;
        case 'root_to_root_definition':
        case 'root_definition_to_root':
            var root = random_choice(available_roots);
            var meaning = roots[root].meaning;
            var wrong_roots = push_random_n_satisfying_constraint(
                [], available_roots, function (x) {return x !== clue},
            number_of_answer_choices - 1);
            var wrong_meanings = wrong_words
            var wrong_meanings = wrong_roots.map(function (x) {
                return root[x].meaning
            })
            if (question_type === 'root_to_root_definition') {
                clue = root;
                correct_answer = meaning;
                choices = wrong_meanings;
            } else if (question_type === 'root_definition_to_root') {
                clue = meaning;
                correct_answer = root;
                choices = wrong_roots;
            }
    };
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
    'word_definition': Object.keys(words).map(function (x) {
        return words[x].meaning}),
    'latin_root': Object.keys(roots),
    'english_root': Object.keys(roots).map(function (x) {
        return roots[x].meaning}),
    'translated_root': Object.keys(roots).map(function (x) {
        return x + ' - ' + roots[x].meaning})
};

// x_to_y[x][y] is a function mapping type x to type y (x -> y).
// This only exists for some types; we can add more if we need to.
var x_to_y = {
    'word': {
        'word_definition': function (x) {return words[x].meaning},
        /*'latin_root': {
            function (x) {return random_choice(words[x].roots)}
        },*/
        'latin_root': function (x) {return words[x].roots}
    },
    'latin_root': {
        'english_root': function (x) {return roots[x].meaning},
        'word': function (x) {return get_words_with_root(x, words)}
    }
};

var cheat_sheet_x_to_y = function (x, y, mandatory, number_of_extras,
constraint) {
    // a is a list of all items of type x
    var a = all_of[x];
    // xs is the list of x's to use
    var xs = mandatory;
    // we do this loop number_of_extras times
    // each time we add another entry to xs
    push_random_n_satisfying_constraint(xs, a, constraint, number_of_extras);
    // we use our util keys mapped by function to return a dict
    // where x_to_y[x][y] is a function mapping type x to type y (x -> y)
    return keys_mapped_by_function(xs, x_to_y[x][y]);
}

var make_etymology_question = function (etym_level, question_type,
number_of_answer_choices) {
    var available_roots = select_available_roots(etym_level);
    var available_words = get_words_from_roots(available_roots);
    return make_question_data(question_type, available_words,
    available_roots, number_of_answer_choices);
}

var make_etymology_question_with_cheat_sheet = function (
etym_level, question_type, number_of_answer_choices,
number_of_cheat_sheet_extras) {
    var question_data = make_etymology_question(
        etym_level, question_type, number_of_answer_choices);
    var cheat_sheet_type = cheat_sheet_map[question_type];
    var x = cheat_sheet_type.split('_to_')[0];
    var y = cheat_sheet_type.split('_to_')[1];
    var constraint = function () {return true};
    if (x === 'word_containing_root') {
        x = 'word';
        constraint = function (x) {
            return words[x].roots.indexOf(question_data['clue']) !== -1;
        }
    }
    var cheat_sheet = cheat_sheet_x_to_y(x, y, [], number_of_cheat_sheet_extras,
    constraint);
    return {
        'question_data': question_data,
        'cheat_sheet': cheat_sheet
    }
}

// comment this out when done testing
window.onload= function () {
    document.body.appendChild(document.createTextNode(
        JSON.stringify(make_etymology_question_with_cheat_sheet
        (5, 'word_to_latin_root', 4, 4))));
    document.body.appendChild(document.createTextNode(
        JSON.stringify(cheat_sheet_x_to_y('word', 'latin_root', [],
        3, function () {return true}))));
}

/*
var x_to_y = function (x, y, clue, choices, dummies) {
    
}
*/

/*

var question_template_dict = {
    'word_to_latin_root': 'Pick the root of the word ',                           //clue = english, choices = QUADR || four
    'word_to_english_root': 'Pick the root of the word ',
    'word_to_translated_root': 'Pick the root of the word ',
    'english_root_to_word': 'Pick the word with a root that means ',                   //clue = english, choices = english
    'word_to_word_definition': 'Pick the definition of the word ',
    'word_definition_to_word': 'Pick the word that means ',
    'root_to_root_definition': 'Pick the definition of the root ',
    'root_definition_to_root': 'Pick the root that means '
};

- word to word_definition   "What is the meaning of the word QUADRUPED?"
    - root to root_meaning   "What is the meaning of the root PED?"
    - root_meaning to root  "which of the following roots means "foot"?
    - root to word    "Which word has a root meaning "all"?
    - word to root    "Select the root of the word QUADRUPED"

    'word_to_latin_root', 'word_to_english_root', 'word_to_translated_root',
    'english_root_to_word', 'word_to_word_definiton', 'word_definition_to_word',
    'root_to_root_definiton', 'root_definition_to_root'

- types of cheat sheet
- root to root meaning
- word to word meaning
- root to word (i.e., word containing that root)
cheat_sheet_map = {
    'word_to_latin_root': 'root_to_root_definition', // (clue + choices + dummies)
    'word_to_english_root': 'word_to_word_definition', // (clue) // no dummies (how do we implement this)
    'word_to_translated_root': 'word_to_word_definition', // (clue)
    'english_root_to_word': 'word_to_word_definition',  // (choices + dummies)
    'word_to_word_definition': 'root_to_root_definition', // (clue + choices + dummies)
    'word_definition_to_word': 'root_to_root_definition', // (clue + choices + dummies)
    'root_to_root_definition': "word_containing_root_to_word definition"       //'root_to_word', (clue)
    'root_definition_to_root': 'word_containing_root_to_word definition' // (clue + choices + dummies)
}

example: 
question is: what is the meaning of micro?
cheat sheet:  : microscope: a tool for looking at small things
microeconomics: xxxxx
microcephaly: asadsasdadsdas

question is: what is a root meaning 'small'?
choices: micro, macro, arthro, terra
cheat sheet:
microscope: a tool for looking at small things
macropod: a kangaroo with large feet
arthropod: a type of inveribrate with an exoskeleton
terraform: to make like earth

('root', 'root_definition', root, 0, function (word) {
return words['word'].roots.indexOf(root) !== -1}) -> {word: word_definiton}

x & y = type of data
namely
x = latin root | english root | translated root | word definition | root definition
y = latin root | english root | translated root | word definition | root definition

function x_to_y (x, y, clue, choices, dummies) {

    
}

function x_to_y (root, root_definition, "quadruped", null, null) {

    
}

function x_to_y (root, root_definition, "quadruped", ["arthropod", "gastropod", "macroscopic"], null) {

    
}

display_type  = cheat_sheet, quiz
quiz x = clue and y = choices
cheat_sheet x = left side of dictionary, y = right side

display_x_to_y (output_of_x_to_y, display_type)


}


*/