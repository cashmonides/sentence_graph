// This file contains the master function.

// This is the master function.
var main = function () {
    // We make a random sentence.
    var sentence = make_random_sentence();
    // We add the determined properties.
    sentence.add_determined_properties();
    // We make whatever random choices we have to.
    sentence.add_random_properties();
    // We choose random lexemes.
    sentence.choose_random_lexemes();
    // Finally, we display the sentence.
    display_on_page(sentence.display());
}