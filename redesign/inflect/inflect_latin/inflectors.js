// All the inflecting functions.
var global_inflectors = {};

// Latin inflection.
global_inflectors.latin = inflect_latin_verb_main;

// English inflection. Currently dummy.
// todo: fix dummy.
global_inflectors.english = function (component) {
    var tense_voice = get_english_tense_from_verb(component);
    var person_and_number = component.get_property_in_language(
        'person_and_number', 'english');
    var lexeme = component.lexeme;
    return inflect_english_verb(lexeme, tense_voice, person_and_number);
}

// SSSLatin inflection.
global_inflectors.ssslatin = function (component) {
    return 'SSS' + inflect_latin_verb_main(component);
}