// This is the master function.
var main = function () {
    var verb_lexeme = random_choice(testing_lexemes);
    var tense_voice = random_choice(Object.keys(english_tense_to_translation_formula));
    var person_and_number = random_choice(['1s', '2s', '3s', '1p', '2p', '3p']);
    var verb_form = inflect_english_verb(verb_lexeme, tense_voice, person_and_number);
    display_on_page([
        JSON.stringify(verb_lexeme, null, 4),
        tense_voice,
        person_and_number,
        verb_form
    ].join('\n'));
}