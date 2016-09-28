var get_person_number_combinations = function (allowed) {
    // Person and number are combined, so there's no need
    // for fancy list manipulation.
    // return cross(allowed.person, allowed.number, function (x, y) {
    //     return x + y;
    // });
    return allowed.person_and_number;
}

// Gets options for drop downs.
// Does not choose lexemes to be used.
var get_drop_down_options = function (
    language, allowed, lexemes, kernel, regime) {
    // Check that our supposed kernel is a kernel.
    if (!(kernel instanceof Kernel)) {
        throw JSON.stringify(kernel) + ' is not a kernel!';
    }
    // Get its conjunction and direction.
    var conjunction = kernel.get_conjunction();
    var direction = kernel.get_direction();
    var transitivity = kernel.get_verb().get_language_independent_property(
        'transitivity');
    var person_number_combinations = get_person_number_combinations(allowed);
    // We need the lexeme for the tf options, so we can't do a triple-cross.
    // But we can do a concat-map and then a double-cross inside.
    // We have a result variable for convenient logging. 
    var result = concat_map(lexemes, function (lexeme) {
        // We filter allowed based on the lexeme.
        var filtered_allowed = filter_allowed_with_lexeme(allowed, lexeme);
        // Check that the language is in the tf space.
        if (!(language in tf_spaces)) {
            throw 'Weird language: ' + JSON.stringify(language);
        }
        // We have conjunction then direction, not vice versa (as before).
        var tf_options = prune_tf_space(
            language, tf_spaces[language], filtered_allowed,
            conjunction, direction, regime);
        return cross(tf_options, person_number_combinations, function (
            tf_option, person_number_combination) {
            // Make a function translation_and_features_from
            // to avoid too much ugliness.
            var options = translation_and_features_from(
                language, lexeme, tf_option, person_number_combination, allowed);
            // Hacky way to handle verbs where the translation
            // depends on transitivity.
            if (typeof options[0] === 'object') {
                options[0] = options[0][transitivity];
            }
            return options;
        });
    });
    console.log(result);
    // We return our result.
    return result;
}

var translation_and_features_from = function (
    language, lexeme, tf_option, person_number_combination, allowed) {
    var tf_text = tf_option.text;
    var regime = tf_option.regime;
    var features = {
        'voice': get_voice_from_tf_option(tf_option),
        'lexeme': lexeme.get_language_dependent_property(
            'citation_form', language),
        'person_and_number': person_number_combination
    };
    var item;
    for (var i = 0; i < features_from_tf.length; i++) {
        item = features_from_tf[i];
        features[item] = get_feature_from_tf[language][item](
            tf_text, regime, allowed);
    }
    return [
        tf_to_translations[language](lexeme, tf_text, person_number_combination),
        features
    ];
}

var get_voice_from_tf_option = function (x) {
    return x.choices[0].split('.')[1];
}

var tf_spaces = {
    english: maximal_english_tf_space,
    latin: maximal_latin_tense_space,
    ssslatin: maximal_latin_tense_space
}

var get_latin_voice_from_tense = function (tense) {
    return /active|passive/.exec(tense)[0];
}

var get_latin_mood_from_tense = function (tense) {
    return /indicative|subjunctive|infinitive|imperative/.exec(tense)[0];
}

var fake_component_from = function (tense, person_number_combination, lexeme) {
    // This is a new component.
    var component = new Component();
    component.properties.tense_and_mood = tense;
    // Make sure that the tense is as expected.
    if (/^.* (indicative|subjunctive|infinitive|imperative) (active|passive)$/.exec(tense) ||
    /^.* (indicative|subjunctive|infinitive|imperative) of the (active|passive) periphrastic$/.exec(tense)) {
        component.properties.voice = get_latin_voice_from_tense(tense);
        component.properties.mood = get_latin_mood_from_tense(tense);
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
    english: inflect_english_verb_given_tf_all_options,
    latin: latin_tense_to_translations,
    ssslatin: function (lexeme, tense, person_number_combination) {
        return 'SSS' + latin_tense_to_translations(
            lexeme, tense, person_number_combination);
    }
}