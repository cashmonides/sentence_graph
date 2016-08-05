var get_person_number_combinations = function (allowed) {
    // Person and number are combined, so there's no need
    // for fancy list manipulation.
    // return cross(allowed.person, allowed.number, function (x, y) {
    //     return x + y;
    // });
    return allowed.person_and_number;
}

var get_drop_down_options = function (language, allowed, lexemes, kernel) {
    var conjunction = kernel.get_conjunction();
    var direction = kernel.get_direction();
    var person_number_combinations = get_person_number_combinations(allowed);
    // We have conjunction then direction, not vice versa (as before).
    var tf_options = prune_tf_space(language, tf_spaces[language], allowed, conjunction, direction);
    return cross(lexemes, tf_options, person_number_combinations, tf_to_translations[language]);
}

var tf_spaces = {
    english: maximal_english_tf_space,
    latin: maximal_latin_tense_space,
    ssslatin: maximal_latin_tense_space
}

var fake_component_from = function (tense, person_number_combination, lexeme) {
    // Believed to work, except for periphrastics.
    // todo: handle periphrastics as a special case.
    var component = Component();
    component.properties.tense = tense;
    component.properties.voice = /active|passive/.exec(tense)[0];
    component.properties.mood = /indicative|subjunctive|infinitive|imperative/.exec(tense)[0];
    component.properties.person_and_number = person_number_combination;
    component.lexeme = lexeme;
    return component;
}

var latin_tense_to_translations = function (tense, person_number_combination, lexeme) {
    var component = fake_component_from(tense, person_number_combination, lexeme);
    return inflect_latin_verb_main(component);
}

var tf_to_translations = {
    english: function (translation_formula, person_number_combination, lexeme) {
        return [inflect_english_verb_given_tf(
            lexeme, translation_formula, person_number_combination)];
    },
    latin: latin_tense_to_translations,
    ssslatin: function (tense, lexeme) {
        return latin_tense_to_translations(tense, lexeme).map(function (x) {
            return 'SSS' + x;
        });
    }
}