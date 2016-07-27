// This file contains the master function and the error switch.

// This is the error switch.
// The legal values are 'throw', 'redo', and 'prune'.
var LEXEME_ERROR_CATCHING_MODE = 'throw';

// This is the master function.
var main = function () {
    var success = false;
    while (!success) {
        // We make a random sentence.
        var sentence = make_random_sentence();
        console.log(sentence);
        // We delete the (basicly nonexistant) dummy clause from the sentence
        // if it is a single clause.
        if (sentence.is_single_clause()) {
            sentence.sentence[non_default_direction] = null;
        }
        // We add the determined properties.
        sentence.add_determined_properties();
        // We determine sequence.
        sentence.determine_sequence();
        // We make whatever random choices we have to.
        sentence.add_random_properties();
        // We determine tense.
        sentence.determine_tense();
        // We choose random lexemes and see whether it worked.
        success = sentence.choose_random_lexemes();
        // We see if we failed and if we want our error to be thrown.
        // We always want our error to be thrown unless we want to try again.
        if (!success && LEXEME_ERROR_CATCHING_MODE !== 'redo') {
            // Throw some error.
            throw 'No usable lexemes left!';
        }
        // We inflect the components.
        sentence.inflect_all_components();
    }
    // Finally, we display the sentence.
    display_on_page(sentence.display());
}