var get_person_number_combinations = function (allowed) {
    // Person and number are combined, so there's no need
    // for fancy list manipulation.
    // return cross(allowed.person, allowed.number, function (x, y) {
    //     return x + y;
    // });
    return allowed.person_and_number;
}

var get_drop_down_options = function (language, allowed, lexemes, kernel) {
    // Check that our supposed kernel is a kernel.
    if (!(kernel instanceof Kernel)) {
        throw JSON.stringify(kernel) + ' is not a kernel!';
    }
    // Get its conjunction and direction.
    var conjunction = kernel.get_conjunction();
    var direction = kernel.get_direction();
    var person_number_combinations = get_person_number_combinations(allowed);
    // We need the lexeme for the tf options, so we can't do a triple-cross.
    // But we can do a concat-map and then a double-cross inside.
    return concat_map(lexemes, function (lexeme) {
        // We filter allowed based on the lexeme.
        var filtered_allowed = filter_allowed_with_lexeme(allowed, lexeme);
        // We have conjunction then direction, not vice versa (as before).
        var tf_options = prune_tf_space(language, tf_spaces[language], filtered_allowed, conjunction, direction);
        return cross(tf_options, person_number_combinations, function (
            tf_option, person_number_combination) {
            return tf_to_translations[language](lexeme, tf_option, person_number_combination);
        });
    });
}

var tf_spaces = {
    english: maximal_english_tf_space,
    latin: maximal_latin_tense_space,
    ssslatin: maximal_latin_tense_space
}

var fake_component_from = function (tense, person_number_combination, lexeme) {
    // This is a new component.
    var component = new Component();
    component.properties.tense = tense;
    // Make sure that the tense is as expected.
    if (/^.* (indicative|subjunctive|infinitive|imperative) (active|passive)$/.exec(tense) ||
    /^.* (indicative|subjunctive|infinitive|imperative) of the (active|passive) periphrastic$/.exec(tense)) {
        component.properties.voice = /active|passive/.exec(tense)[0];
        component.properties.mood = /indicative|subjunctive|infinitive|imperative/.exec(tense)[0];
    } else {
        throw 'Weird tense: ' + tense;
    }
    component.properties.person_and_number = person_number_combination;
    component.lexeme = lexeme;
    return component;
}

var latin_tense_to_translations = function (lexeme, tense, person_number_combination) {
    var component = fake_component_from(tense, person_number_combination, lexeme);
    return inflect_latin_verb_main(component);
}

var tf_to_translations = {
    english: function (lexeme, translation_formula, person_number_combination) {
        return [inflect_english_verb_given_tf(
            lexeme, translation_formula, person_number_combination)];
    },
    latin: latin_tense_to_translations,
    ssslatin: function (lexeme, tense, person_number_combination) {
        return 'SSS' + latin_tense_to_translations(
            lexeme, tense, person_number_combination);
    }
}