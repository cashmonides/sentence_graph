// All the inflecting functions.
var global_inflectors = {};

// Latin inflection.
global_inflectors.latin = inflect_latin_verb_main;

// English inflection.
global_inflectors.english = function (component) {
    var tense_voice = component.get_property_in_language('tense_and_mood', 'english') +
    ' ' + component.get_language_independent_property('voice');
    var person_and_number = component.get_property_in_language(
        'person_and_number', 'english');
    var lexeme = component.lexeme;
    var options = kck_inflect_english_verb_all_options(
        lexeme, tense_voice, person_and_number);
    if (typeof options === 'string') {
        return options
    } else {
        var transitivity = component.get_language_independent_property(
            'transitivity');
        return options[transitivity];
    }
}

// SSSLatin inflection.
global_inflectors.ssslatin = function (component) {
    return 'SSS' + inflect_latin_verb_main(component);
}