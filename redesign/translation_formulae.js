// Create a language-dependent dictionary for translation formulae.
// The english translation formulae are simply the
// english_grammatical_terminology_correspendence.
// Currently, no other language has translation formulae.
var translation_formula_to_tense = {
    'english': english_grammatical_terminology_correspendence
};

// This function allows us to get the tense from the translation formula.
var get_tense_from_translation_formula = function (
    language, translation_formula) {
    // We check whether the translation formula is null or not.
    if (translation_formula === null) {
        // The corrsponding tense is clearly null.
        return null;
    } else {
        // We check that our translation forula to tense map
        // has an entry for the language.
        if (!(language in translation_formula_to_tense)) {
            throw 'No translation formula for ' + language + '!';
        }
        // Look for the entry for our translation formula in the
        // translation forula to tense map for the given language.
        return translation_formula_to_tense[language][translation_formula];
    }
}