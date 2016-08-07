// This is our list for types of conjunction.
// We get it by taking the list of keys in the conjunction library.
var conj_list = Object.keys(conjunction_library);

// This function expands a conjunction.
var expand_conj = function () {
    // We pick a random key from the conjunction library.
    var key = random_choice(conj_list);
    // We return a conjunction constructed from that key.
    return new Conjunction(key);
}

// This function finds the index of a conjunction (c) in a seed.
var find_conjunction_index = function (seed) {
    return seed.indexOf('c');
}

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