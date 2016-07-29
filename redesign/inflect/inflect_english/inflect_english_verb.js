var english_verb_formula_regex = /\b[A-Za-z\-]*verb[A-Za-z\-]*\b/g;

// This function allows us to get the correct english pronoun.
var get_english_subject_pronoun = function (person_and_number) {
    // Look in the english_subject_pronoun_dict for the
    // person and number passed in.
    return english_subject_pronoun_dict[person_and_number];
}

var english_translation_formula_to_verb_formula = function (translation_formula) {
    // In this specific case, there should only be one match.
    return translation_formula.match(english_verb_formula_regex)[0];
}

// The person_and_number_key is like 1sg & 3sg.
// The person_and_number is like 1s.
var matches = function (person_and_number_key, person_and_number) {
    // For now, and indeed as far as I can tell,
    // we can simply use string containment.
    return person_and_number_key.indexOf(person_and_number) !== -1;
}

var apply_english_person_irregularities = function (
    formula, person_and_number, changes_to_not_apply) {
    // We loop over the keys of english_person_irregularities
    // (such as 1sg, 3sg, 1sg & 3sg).
    for (var person_and_number_key in english_person_irregularities) {
        // Do the key and the person and number match?
        if (matches(person_and_number_key, person_and_number)) {
            // We let the dictionary of replacements be all the replacements
            // that are triggered by the relevant combination of person
            // and number.
            var dict_of_replacements = english_person_irregularities[
                person_and_number_key];
            // Note that the things to be replaced are keys
            // and their replacements are values.
            // The replacement is the thing to replace with.
            var replacement;
            // We loop over the irregularities.
            for (var to_replace in dict_of_replacements) {
                replacement = dict_of_replacements[to_replace];
                // We do nothing if the replacement is a change to not apply.
                if (changes_to_not_apply.indexOf(replacement) !== -1) {
                    // Do not do the replacement.
                    continue;
                }
                // If the thing to replace does not mention verbs,
                // do the replacement.
                if (to_replace.indexOf('verb') === -1) {
                    formula = formula.replace(to_replace, replacement);
                } else if (formula === to_replace) {
                    // If the formula is exactly what is to be replaced,
                    // do the replacement. Otherwise do nothing
                    // (to prevent 'will have eaten' from changing).
                    formula = replacement;
                }
            }
        }
    }
    return formula;
}

var put_root_in_formula = function (root, formula) {
    // Simply replace anything mentioning the word 'verb' with the root.
    return formula.replace(english_verb_formula_regex, root);
}

var remove_dashed_tense_indicators = function (translation_formula) {
    // remove a final word with a preceding hyphen like -preterite
    // (but not -s, since it is preceded by a space).
    return translation_formula.replace(/\b-\w+$/g, '');
}

var get_english_irregularities_to_not_apply = function (translation_formula) {
    // This is basically everything split by ' no ', except
    // the first item in that split which is the actual translation formula.
    var english_irregularities_to_not_apply =
    translation_formula.split(' no ').slice(1);
    // Then we replace the dash (of which the should be only one)
    // by the string verb in each (so no -s becomes no verbs).
    return english_irregularities_to_not_apply.map(function (x) {
        return x.replace('-', 'verb');
    });
}

var remove_english_irregularities_to_not_apply = function (translation_formula) {
    // This is basically everything before the first 'no'.
    return translation_formula.split(' no ')[0];
}

var inflect_english_verb = function (verb_lexeme, tense_voice, person_and_number) {
    // Step 1.5. (Simply getting the translation formula.)
    var translation_formula = english_tense_to_translation_formula[
        tense_voice];
    // Check that the translation formula is not undefined.
    if (translation_formula === undefined) {
        throw 'Translation formula for ' + tense_voice +
        ' should not be undefined!';
    }
    // End of step 1.5.
    // Step 2.
    // First get the verb formula.
    var verb_formula = english_translation_formula_to_verb_formula(
        translation_formula);
    // Then get the root type.
    var english_root_type = english_verb_formula_to_root[verb_formula];
    // Check that the root type is a string.
    if (typeof english_root_type !== 'string') {
        throw english_root_type + ' is not a string! (It comes from ' +
        verb_formula + '.)';
    }
    // End of step 2.
    // Step 3.
    // Part 1 (getting the root from the lexeme).
    var english_root = verb_lexeme.get_root(english_root_type, 'english');
    if (typeof english_root !== 'string') {
        throw JSON.stringify(verb_lexeme) + ' has a bad ' +
        english_root_type + '!';
    }
    // Part 1.3 (removing extra things like -preterite
    // which we no longer need)
    translation_formula = remove_dashed_tense_indicators(translation_formula);
    // Part 1.6 (pulling of changes to not apply)
    // Get the changes to not apply.
    var changes_to_not_apply = get_english_irregularities_to_not_apply(translation_formula);
    // Remove them from the translation formula.
    translation_formula = remove_english_irregularities_to_not_apply(translation_formula);
    // Part 2 (applying the english_person_irregularities overrides).
    translation_formula = apply_english_person_irregularities(
        translation_formula, person_and_number, changes_to_not_apply);
    // End of step 3.
    // Step 4 (putting the root in the formula)
    var english_form = put_root_in_formula(english_root, translation_formula);
    // Step 5 (adding the subject pronoun).
    // todo: Change this when we might not have a subject pronoun.
    var subject_pronoun = get_english_subject_pronoun(person_and_number);
    // Return.
    return subject_pronoun + ' ' + english_form;
}