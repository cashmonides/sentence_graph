// This function expands (and creates) a conjunction.
var expand_conj = function (kck_level) {
    // This is the list of possible conjunction choices.
    // They are keys in the conjunction library and are
    // the conjunctions allowed in the current module.
    var conj_choices = get_current_module(kck_level).allowed_conjunctions;
    // We pick a random key from the possibilities.
    var key = random_choice(conj_choices);
    // We return a conjunction constructed from that key.
    return new Conjunction(key);
}

// This function finds the index of a conjunction (c) in a seed.
var find_conjunction_index = function (seed) {
    return seed.indexOf('c');
}

// This function makes a random sentence.
var make_random_sentence = function (kck_level) {
    // We make a conjunction.
    var conjunction = expand_conj(kck_level);
    // We might want to use the conjunction somehow, maybe to avoid
    // forcing the conjunction to be in the middle of the sentence,
    // which we might do if we're not careful.
    
    // Note: Here the conjunction is a string.
    
    // We return a sentence based on the conjunction and two kernels.
    return new KCKSentence({
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
