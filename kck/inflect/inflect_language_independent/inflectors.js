// All the inflecting functions.
var global_inflectors = {};

// Latin inflection.
global_inflectors.latin = function (component, kck_level) {
    return inflect_latin_verb_main(component);
}

// English inflection.
global_inflectors.english = function (component, kck_level) {
    var tense_voice = component.get_property_in_language('tense_and_mood', 'english') +
    ' ' + component.get_language_independent_property('voice');
    var person_and_number = component.get_property_in_language(
        'person_and_number', 'english');
    var regime = component.get_property_in_language(
        'regime', 'english');
    var lexeme = component.lexeme;
    var options = kck_inflect_english_verb_all_options(
        lexeme, tense_voice, person_and_number, regime, kck_level);
    if (typeof options === 'string') {
        return options;
    } else {
        var transitivity = component.get_language_independent_property(
            'transitivity');
        return options[transitivity];
    }
}

// SSSLatin inflection.
global_inflectors.ssslatin = function (component, kck_level) {
    return 'SSS' + inflect_latin_verb_main(component);
}