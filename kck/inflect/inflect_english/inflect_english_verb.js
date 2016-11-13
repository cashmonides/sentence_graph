var english_verb_formula_regex = /\b[A-Za-z\-]*verb[A-Za-z\-]*\b/g;

// This function allows us to get the correct english pronoun.
var get_english_subject_pronoun = function (person_and_number) {
    // Look in the english_subject_pronoun_dict for the
    // person and number passed in.
    return english_subject_pronoun_dict[person_and_number];
}

var english_translation_formula_to_verb_formula = function (
    translation_formula, person_and_number) {
    if (typeof translation_formula !== 'string'
    || typeof person_and_number !== 'string') {
        throw 'Something is wrong: translation_formula, person_and_number ='
        + JSON.stringify(translation_formula) + ', ' +
        JSON.stringify(person_and_number);
    }
    // The verb formula is found in the translation formula.
    // In this specific case, there should only be one match.
    var match = translation_formula.match(english_verb_formula_regex);
    if (match === null || match.length !== 1) {
        throw 'Weird match: ' + JSON.stringify(match) + ' with '
        + JSON.stringify(translation_formula) + ', ' +
        JSON.stringify(person_and_number);
    }
    var verb_formula = match[0];
    // todo: Change this special case of 3s present.
    // It's entirely sustainable: this is indeed the only weird case.
    if (person_and_number === '3s' && translation_formula === 'verb') {
        // Return 'verbs'.
        return 'verbs';
    } else {
        // Return the verb formula.
        return verb_formula;
    }
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

var get_verb_form_of_english_root = function (root) {
    // Just drop everything after the first dash.
    // Example: verbed-preterite becomes verbed
    return root.split('-')[0];
}

var put_english_root_in_formula = function (root, formula, verb_formula) {
    // Just drop everything after the first dash.
    // Example: verbed-preterite becomes verbed.
    verb_formula = verb_formula.split('-')[0];
    // Simply replace anything mentioning the word 'verb' with the root
    // (but actually, only replace what we expect and throw an error
    // on anything else).
    return formula.replace(english_verb_formula_regex, function (x) {
        // Check that the thing we're replacing is indeed
        // the form of the root.
        if (x !== verb_formula) {
            throw 'Error in putting a root in a formula: ' +
            x + ' is not ' + verb_formula + '!';
        };
        // Return the root.
        return root;
    });
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

var get_english_translation_formula = function (tense_voice, regime, kck_level) {
    
    // Step 1.5. (Simply getting the translation formula.)
    var translation_formula = english_tense_to_translation_formula[
        tense_voice];
    if (is_object(translation_formula)) {
        var terminology_display_mode = get_current_module(kck_level).
        terminology_display_dictionary;
        if (!(regime in translation_formula)) {
            regime = 'default';
        }
        translation_formula = translation_formula[regime][terminology_display_mode];
    }
    // Check that the translation formula is not undefined.
    if (translation_formula === undefined) {
        throw 'Translation formula for ' + JSON.stringify(tense_voice) +
        ' should not be undefined!';
    }
    // Return the translation formula.
    return translation_formula;
}

var get_english_root_type = function (verb_formula) {
    // Get the root type.
    var english_root_type = english_verb_formula_to_root[verb_formula];
    // Check that the root type is a string.
    if (typeof english_root_type !== 'string') {
        throw english_root_type + ' is not a string! (It comes from ' +
        verb_formula + '.)';
    }
    // Return the root type.
    return english_root_type;
}

var get_english_root = function (english_root_type, root_dictionary) {
    // Get the english root.
    var english_root = root_dictionary[english_root_type];
    // Error checking.
    if (typeof english_root !== 'string') {
        throw JSON.stringify(root_dictionary) + ' has a bad entry ' +
        '(or none at all) for ' + english_root_type + '!';
    }
    // Return the root.
    return english_root;
}

var inflect_english_verb_given_tf = function (
    root_dictionary, translation_formula, person_and_number) {
    // Step 2.
    // First get the verb formula.
    // aka the part of the translation formula that includes the verb
    // but excludes all helping words
    // e.g. 'verbs', 'verbing', 'verbed', 'verb'
    // Note that the verb formula depends on the person and number.
    var verb_formula = english_translation_formula_to_verb_formula(
        translation_formula, person_and_number);
    // Then get the root type.
    // aka a slightly expanded version of English principal parts
    // 'verb' -> 'default'
    // 'verbs' -> 'final-s'
    // 'verbed' -> 'preterite'
    var english_root_type = get_english_root_type(verb_formula);
    // End of step 2.
    // Step 3.
    // Part 1 (getting the root from the lexeme).
    var english_root = get_english_root(english_root_type, root_dictionary);
    // Part 1.3 (removing extra things like -preterite
    // which we no longer need)
    translation_formula = remove_dashed_tense_indicators(translation_formula);
    // Part 1.6 (pulling of changes to not apply)
    // Get the changes to not apply.
    var changes_to_not_apply = get_english_irregularities_to_not_apply(
        translation_formula);
    // Remove them from the translation formula.
    translation_formula = remove_english_irregularities_to_not_apply(
        translation_formula);
    // Part 2 (applying the english_person_irregularities overrides).
    translation_formula = apply_english_person_irregularities(
        translation_formula, person_and_number, changes_to_not_apply);
    // End of step 3.
    // Step 4 (putting the root in the formula).
    // We put the root in the translation formula.
    var english_form = put_english_root_in_formula(
        english_root, translation_formula, verb_formula);
    // Step 5 (adding the subject pronoun).
    // todo: Change this when we might not have a subject pronoun.
    var subject_pronoun = get_english_subject_pronoun(person_and_number);
    // Return.
    return subject_pronoun + ' ' + english_form;
}

// returns an english string (e.g. "he had attacked")
// takes a verb lexeme, and tense-voice combination (as a string),
// and a person-number combination (e.g., 1s)
var inflect_english_verb_given_tf_all_options = function (
    verb_lexeme, tense_voice, person_and_number) {
    var roots = verb_lexeme.get_roots('english');
    if (typeof values(roots)[0] === 'string') {
        return inflect_english_verb_given_tf(
            roots, tense_voice, person_and_number);
    } else {
        var translations = {};
        for (var i in roots) {
            translations[i] = inflect_english_verb_given_tf(
                roots[i], tense_voice, person_and_number);
        }
        return translations;
    }
}

// main function
var kck_inflect_english_verb_all_options = function (
    verb_lexeme, tense_voice, person_and_number, regime, kck_level) {
    // Step 1.5. (Simply getting the translation formula, e.g., "was verbing")
    var translation_formula = get_english_translation_formula(
        tense_voice, regime, kck_level);
    // End of step 1.5.
    // Use another function to do the rest.
    return inflect_english_verb_given_tf_all_options(
        verb_lexeme, translation_formula, person_and_number);
}