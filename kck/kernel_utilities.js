// This function expands (and creates) a conjunction.
var expand_conj = function (kck_level, allowed_conjunctions_override) {
    // This is the list of possible conjunction choices.
    // They are keys in the conjunction library and are
    // the conjunctions allowed in the current module.
    // If the override exists, they are the conjunctions in the override.
    var conj_choices;
    if (allowed_conjunctions_override === null) {
        conj_choices = get_current_module(kck_level).allowed_conjunctions;
    } else {
        conj_choices = allowed_conjunctions_override;
    }
    
    // console.log("BACKSTAGE LOG allowed conjunctions = ", conj_choices);
    
    // We pick a random key from the possibilities.
    var key = random_choice(conj_choices);
    
    // sconsole.log("BACKSTAGE LOG chosen conjunction = ", key);
    
    // We return a conjunction constructed from that key.
    return new Conjunction(key);
}

// This function finds the index of a conjunction (c) in a seed.
var find_conjunction_index = function (seed) {
    return seed.indexOf('c');
}

// This function makes a random sentence.
var make_random_sentence = function (kck_level, allowed_conjunctions_override) {
    // We make a conjunction.
    // returns a new Conjunction object
    var conjunction = expand_conj(kck_level, allowed_conjunctions_override);
    // We get the clause_acts_as property of the conjunction.
    var clause_acts_as = conjunction.clause_acts_as();
    
    // We might want to use the conjunction somehow, maybe to avoid
    // forcing the conjunction to be in the middle of the sentence,
    // which we might do if we're not careful.
    
    // Note: Here the conjunction is a string.
    
    // We return a sentence based on the conjunction and two kernels.
    
    // Note that we pass clause_acts_as to the left kernel but not
    // the right one, since the right kernel might fulfill a role in the left
    // (so the left needs to know about the right) but not vice versa
    // since we can just insert the right in the left without telling it.
    return new KCKSentence({
        'conjunction': conjunction,
        // We expand the piece of the sentence
        // to the left of the conjunction.
        'left': kernel_constructor(conjunction, 'left', clause_acts_as, kck_level),
        // And we also expand the one to the right.
        'right': kernel_constructor(conjunction, 'right', null, kck_level)
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
// we need to declare this because we will be iterating over this list
var directions = ['left', 'right'];
