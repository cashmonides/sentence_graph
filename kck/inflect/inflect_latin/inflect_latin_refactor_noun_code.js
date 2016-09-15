var inflect_latin_noun_main = function (component) {
    var noun = inflect_latin_noun_without_preposition(component);
    var prep = latin_role_to_preposition[component.role_name];
    return latin_combine_preposition_and_noun(prep, noun)
}

var latin_combine_preposition_and_noun = function (prep, noun) {
    if (prep === null) {
        return noun;
    } else if (typeof prep === 'string') {
        return prep + ' ' + noun;
    } else if (starts_with_latin_vowel_or_h(noun)) {
        return prep['before vowel'] + ' ' + noun;
    } else {
        return prep['before consonent'] + ' ' + noun;
    }
}

var starts_with_latin_vowel_or_h = function (string) {
    return 'aeiouāēīōūh'.indexOf(string[0].toLowerCase()) !== -1;
}

var inflect_latin_noun_without_preposition = function (component) {
    var ending = inflect_latin_noun_ending(component);
    var roots = component.lexeme.get_language_dependent_property('roots', 'latin');
    if (ending === '[stars]') {
        return '*' + roots[0] + '*';
    } else {
        return roots[roots.length - 1] + '-' + ending;
    }
}

var inflect_latin_noun_ending = function (component) {
    var number = component.get_language_independent_property('number');
    var latin_case = component.get_property_in_language('case', 'latin');
    var latin_declension_for_endings = get_latin_noun_declension_for_endings(
        component.lexeme);
    return latin_noun_declining_dictionary[
        latin_declension_for_endings][number][latin_case];
}

var get_latin_noun_declension_for_endings = function (lexeme) {
    var latin_gender = lexeme.get_language_dependent_property(
        'gender', 'latin');
    var latin_declension = lexeme.get_language_dependent_property(
        'declension', 'latin');
    var latin_declension_for_endings = latin_gender_and_declension_to_declension_for_endings[
        latin_declension][latin_gender];
    if (latin_declension_for_endings === null) {
        throw latin_gender + ' and ' + latin_declension +
        ' should not be together!';
    }
    return latin_declension_for_endings;
}

// Determine case.
var determine_case = function (
    target_language, role_name, conjunction, direction) {
    if (target_language === 'english') {
        throw 'No case exists in English!';
    } else if (target_language === 'latin' || target_language === 'ssslatin') {
        if (role_name === 'subject' && conjunction.get_name() ===
        'c_that_indirect_statement' && direction === 'right') {
            return 'object';
        } else if (role_name in latin_role_to_case) {
            return latin_role_to_case[role_name];
        } else {
            throw 'No known case for role ' + role_name + '!';
        }
    }
}