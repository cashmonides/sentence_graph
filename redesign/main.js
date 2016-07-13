// This file contains the master function.

// This is the master function.
var main = function () {
    // We make a random sentence.
    var sentence = make_random_sentence();
    // We add the determined properties.
    sentence.add_determined_properties();
    // We determine sequence.
    sentence.determine_sequence();
    // We make whatever random choices we have to.
    sentence.add_random_properties();
    // We haven't yet implemented choosing random lexemes
    // and don't really plan to very soon.
    // We choose random lexemes.
    // sentence.choose_random_lexemes();
    // Finally, we display the sentence.
    display_on_page(sentence.display());
}