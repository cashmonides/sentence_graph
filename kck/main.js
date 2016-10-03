// This file contains the master function and the error switch.

// This is the error switch.
// The legal values are 'throw', 'redo', and 'prune'.
var LEXEME_ERROR_CATCHING_MODE = 'throw';

// This is the master function.
var generate_sentence = function (source, target, kck_level, drop_extra_level) {
    var success = false;
    while (!success) {
        // We make a random sentence.
        // console.log("DEBUG NO VERB IN 10-2-16 checkpoint #3 about to make random_sentence");
        
        
        var sentence = make_random_sentence(kck_level);
        
        
        // console.log("DEBUG NO VERB IN 10-2-16 checkpoint #4 done making random sentence");
        
        
        // We remove the (basicly nonexistant) dummy clause from the sentence
        // if it is a single clause.
        if (sentence.is_single_clause()) {
            sentence.sentence[non_default_direction] = null;
        }
        // We add the determined properties.
        sentence.add_determined_properties();
        // We determine sequence.
        sentence.determine_sequence(kck_level);
        // We make whatever random choices we have to (including tense).
        sentence.add_random_properties(kck_level);
        // We choose random lexemes and see whether it worked.
        success = sentence.choose_random_lexemes(kck_level, drop_extra_level);
        // We see if we failed and if we want our error to be thrown.
        // We always want our error to be thrown unless we want to try again.
        if (!success && LEXEME_ERROR_CATCHING_MODE !== 'redo') {
            // Throw some error.
            throw 'No usable lexemes left!';
        }
        // We inflect the components.
        sentence.inflect_all_components();
        // We check for ambiguity.
        success = success && sentence.check_for_no_ambiguity(
            source.toLowerCase());
    }
    /*
    if (display_in_text_box) {
        // Finally, we display the sentence.
        display_on_page(sentence.display());
    }
    */
    return sentence;
}