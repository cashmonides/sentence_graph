// This file contains some kernel utilities for use in the redesign.

// This lists below are unused because we're making some assuptions
// and hardcoding some things.

// This is our list for sentence seeds.
// var seed_list = [['k'], ['k', 'c', 'k']];

// This is our list for types of kernel.
// Note that we're currently only concerned with verbs.
// Note also that we have a nested list since each item
// in the nested list represents a list of roles.
// var kernel_list = [['v']];

// This line is commented out since we're currently
// only considering verbs.
// var kernel_list = [['s', 'v', 'o'], ['s', 'v'], ['v']];

// This function is not currently necessary since all conjunctions
// are currently treated the same way.

// This function returns whether a key of conjunction_library
// is a real conjunction, that is, not the null conjunction.

// Note that it should only take keys of conjunction_library.
// var is_real_conjunction = function (conjunction) {
//    return conjunction !== 'c_null';
// }

// This is our list for types of conjunction.
// We get it by taking the list of keys in the conjunction library.
var conj_list = Object.keys(conjunction_library);

// This function picks a random sentence seed.
// var random_seed = function () {
//    return random_choice(seed_list);
// }

// This function appears to have been a mistake due to
// its lack of sophistication.
// This function expands a kernel.
// var expand_kernel = function () {
//    return random_choice(kernel_list);
// }

// This function expands a conjunction.
var expand_conj = function () {
    // We pick a random key from the conjunction library.
    var key = random_choice(conj_list);
    // We return a conjunction constructed from that key.
    return new Conjunction(key);
}

// This function seems to have been a mistake:
// kernel creation and conjunction creation are quite different.

// This function expands a kernel or conjunction.
// k_or_c is a single character, either k, representing a kernel,
// or c, representing a conjunction.
// var expand_k_or_c = function (k_or_c) {
//     // We check whether k_or_c is k, c, or neither.
//     if (k_or_c === 'k') {
//         // We return an expanded kernel.
//         return expand_kernel();
//     } else if (k_or_c === 'c') {
//         // We return an expanded conjunction.
//         return expand_conj();
//     } else {
//         // k_or_c was neither k nor c, so we throw an error.
//         throw new Error('k_or_c, which is ' + k_or_c +
//         ', is not a kernel (k) or conjunction (c).');
//     }
// }

// This function finds the index of a conjunction (c) in a seed.
var find_conjunction_index = function (seed) {
    return seed.indexOf('c');
}


// This function seems to be obsolete due to conjunction objects.
// // This function returns a conjunction JSON object given its name or null.
// var conjunction_JSON_from_name = function (conjunction) {
//     // If the conjunction parameter is false-like (i.e., null),
//     // we use c_null instead.
//    var true_conjunction = conjunction_library[conjunction || 'c_null'];
//    // We check that the true conjunction is a non-null object.
//    // (Note that is_object does a check for null
//    // so we don't have to do it ourselves here.)
//    if (!is_object(true_conjunction)) {
//        // Oh no! The true conjunction was not as expected,
//        // so we throw an error.
//        throw 'Could not find conjunction ' +
//        JSON.stringify(true_conjunction);
//    }
//    // We return the true conjunction, parsing and stringifying to copy.
//    return JSON.parse(JSON.stringify(true_conjunction));
// }

// This function makes a random sentence.
var make_random_sentence = function () {
    // We make a conjunction.
    var conjunction = expand_conj();
    // We might want to use the conjunction somehow, maybe to avoid
    // forcing the conjunction to be in the middle of the sentence,
    // which we might do if we're not careful.
    
    // Note: Here the conjunction is a string.
    
    // We return a sentence based on the conjunction and two kernels.
    return new Sentence({
        'conjunction': conjunction,
        // We expand the piece of the sentence
        // to the left of the conjunction.
        'left': kernel_constructor(conjunction, 'left'),
        // And we also expand the one to the right.
        'right': kernel_constructor(conjunction, 'right')
    });
}

// This function checks whether its input is a direction.
// It is used for error-checking.
var check_is_direction = function (direction) {
    // left and right are the only legal directions.
    if (direction !== 'left' && direction !== 'right') {
        throw 'Expected a direction but got ' + JSON.stringify(direction);
    }
}

// Our default direction is left.
// This comes into play when we make a main clause,
// in which case it is considered to be on the left of a null conjunction.
var default_direction = 'left';

// Our non-default direction is right.
// This is simple the direction other than our default direction.
var non_default_direction = 'right';

// Our directions are left and right.
var directions = ['left', 'right'];

// This function makes a random sentence.
// It also prints as it goes.
var log_make_random_sentence = function () {
    // We pick a random seed and then log it.
    // For now our seed is always ['k', 'c', 'k'].
    // var seed = ['k', 'c', 'k'];
    // We make a random sentence and display the sentence.
    var sentence = make_random_sentence();
    display_on_page(sentence.display_without_translations());
    // We return our sentence.
    return sentence;
}