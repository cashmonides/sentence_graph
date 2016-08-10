// Create a language-dependent dictionary for translation formulae.

// This function allows us to get the tense from the translation formula.
var get_tense_from_translation_formula = function (
    translation_formula, language) {
    // We check whether the translation formula is null or not.
    if (translation_formula === null) {
        // The corrsponding tense is clearly null.
        return null;
    } else if (typeof translation_formula !== 'string') {
        // Throw an error since translation formulas should be strings.
        throw 'The translation formula ' + JSON.stringify(
            translation_formula) + ' is not a string.';
    } else {
        // We check that our translation formula to tense map
        // has an entry for the language.
        if (!(language in translation_formula_to_tense)) {
            throw 'No translation formula for ' + language + '!';
        }
        // Use our translation formula as an argument to the
        // translation forula to tense function for the given language.
        return translation_formula_to_tense[language](translation_formula);
    }
}