// A test to see how far allowing some code (not just data) gets us.
// Seems to get us rather far. We still have a lot of data,
// but now we have less implementation work.

var in_latin_periphrastic = function (component) {
    var latin_tense = component.get_property_in_language('tense_and_mood', 'latin');
    return latin_tense.indexOf('periphrastic') !== -1;
}

// Determines tense.
var get_latin_verb_tense = function (component) {
    // Get rid of voice and everything after.
    var tense = component.get_property_in_language('tense_and_mood', 'latin');
    return get_real_latin_tense_from_component_tense(tense);
};

var get_real_latin_tense_from_component_tense = function (tense) {
    if (!tense) {
        throw 'No tense! tense = ' + JSON.stringify(tense);
    }
    return tense.replace(/ (indicative|subjunctive|infinitive|imperative).*/, '');
}

var get_latin_tense_and_mood_from_component_tense = function (tense) {
    return tense.replace(/ (active|passive)$/, '');
}

var get_latin_root_vowel = function (component) {
    return latin_root_vowel_map[component.lexeme.latin.conjugation];
}

var get_latin_verb_system = function (component) {
    var tense = get_latin_verb_tense(component);
    if (['perfect', 'pluperfect', 'future perfect'].indexOf(tense) !== -1) {
        return 'perfect system';
    } else {
        return 'present system';
    }
};

var get_latin_verb_1st_person_ending = function (component) {
    var tense = get_latin_verb_tense(component);
    var mood = component.get_property_in_language('mood', 'latin');
    if (['present', 'future', 'future perfect'].indexOf(tense) !== -1
    && mood !== 'subjunctive') {
        return 'present 1st person ending';
    } else {
        return 'past/subjunctive 1st person ending';
    }
};

var get_latin_subject_number_from_verb = function (verb_component) {
    var person_and_number = verb_component.get_property_in_language(
        'person_and_number', 'latin');
    // The second character of the person and number is s or p,
    // corresponding to singular or plural.
    var initial_letter = person_and_number[1];
    return {
        's': 'singular',
        'p': 'plural'
    }[initial];
}
// Done with the fake methods.

//rename to get_latin_verb_root
var get_root = function (component) {
    // We enabled adding of fake properties
    // so we can ask about perfect system in a clean way.
    var in_perfect_system = get_latin_verb_system(component)
    === 'perfect system';
    var voice = component.get_property_in_language('voice', 'latin');
    if (in_perfect_system && voice === 'active') {
        return component.lexeme.get_root('root_3', 'latin');
    } else if (in_perfect_system && voice === 'passive') {
        return component.lexeme.get_root('root_4', 'latin');
    } else {
        return component.lexeme.get_root('root_2', 'latin');
    }
}

//rename to get_latin_verb_middle
var get_middle_inflection = function (component) {
    var in_perfect_system = get_latin_verb_system(component)
    === 'perfect system';
    var tense = get_latin_verb_tense(component);
    var mood = component.get_property_in_language('mood', 'latin');
    if (in_perfect_system) {
        // rename to latin_verb_perfect_middle
        return perfect_middle[tense + ' ' + mood];
    } else {
        // Get the latin conjugation.
        var conjugation = component.lexeme.get_language_dependent_property(
            'conjugation', 'latin');
        var latin_verb_middle_for_conjugation = middle_inflections[
            'conjugation ' + conjugation];
        var latin_tense_mood_string = tense + ' ' + mood;
        if (latin_tense_mood_string in latin_verb_middle_for_conjugation) {
            return latin_verb_middle_for_conjugation[latin_tense_mood_string];
        } else {
            // Infinitive, so we also need voice.
            var voice = component.get_property_in_language('voice', 'latin');
            return latin_verb_middle_for_conjugation[
                latin_tense_mood_string + ' ' + voice];
        }
    }
}

//rename to get_latin_verb_ending
var get_end_inflection = function (component) {
    var mood = component.get_property_in_language('mood', 'latin');
    if (mood === 'infinitive') {
        return '';
    } else {
        var tense = get_latin_verb_tense(component);
        var voice = component.get_property_in_language('voice', 'latin');
        var person_and_number = component.get_property_in_language(
            'person_and_number', 'latin');
        if (mood === 'indicative' && tense === 'perfect'
        && voice === 'active') {
            return perfect_endings[person_and_number];
        } else {
            if (!(voice + ' ' + person_and_number in normal_endings)) {
                // An ending seems to be missing!
                throw voice + ' ' + person_and_number + ' has no ending!';
            }
            var ending = normal_endings[voice + ' ' + person_and_number];
            if (typeof ending === 'string') {
                return ending;
            } else {
                var present_or_past_tense = get_latin_verb_1st_person_ending(
                    component);
                return ending[present_or_past_tense];
            }
        }
    }
}

// var get_agreement_marker = function (component) {
//     var clause_type = ???;
//     var number = get_latin_subject_number_from_verb(component);
//     var gender = ???;
//     if (clause_type === 'is') {
//         return agreement_marker.is[gender + ' ' + number];
//     } else {
//         return agreement_marker.otherwise[gender + ' ' + number];
//     }
// }

// todo: fix dummy.
var get_agreement_marker = function () {
    return '[dummy agreement marker]'
}

var get_helping_verb = function (component) {
    var mood = component.get_property_in_language('mood', 'latin');
    if (mood === 'infinitive') {
        return 'ESSE';
    } else {
        var tense = get_latin_verb_tense(component);
        // We need mood but not voice; voice is
        // always passive when we call this.
        // We need an active form of to be, however.
        var mood = component.get_property_in_language('mood', 'latin');
        var person_and_number = component.get_property_in_language(
            'person_and_number', 'latin');
        return latin_form_of_to_be[
            latin_perfect_tense_to_present_tense_map[tense] +
            ' ' + mood + ' ' + person_and_number];
    }
}

var latin_periphrastics = {
    'active': function (component) {
        var tense = get_latin_verb_tense(component);
        var mood = component.get_property_in_language(
            'mood', 'latin');
        var person_and_number = component.get_property_in_language(
            'person_and_number', 'latin');
        var form_of_to_be = latin_form_of_to_be[
            [tense, mood, person_and_number].join(' ')];
        return component.lexeme.get_root('root_4', 'latin') + '-ŪR-' +
        get_agreement_marker(component) + ' ' + form_of_to_be;
    },
    'passive': function (component) {
        var tense = get_latin_verb_tense(component);
        var mood = component.get_property_in_language(
            'mood', 'latin');
        var person_and_number = component.get_property_in_language(
            'person_and_number', 'latin');
        var form_of_to_be = latin_form_of_to_be[
            [tense, mood, person_and_number].join(' ')];
        return component.lexeme.get_root('root_2', 'latin') + get_latin_root_vowel(component) + 'ND-' +
        get_agreement_marker(component) + ' ' + form_of_to_be;
    },
}

var get_subject_accusative_pronoun = function (component) {
    var person_and_number = component.get_property_in_language(
        'person_and_number', 'latin');
    return latin_verb_subject_accusative_pronoun[person_and_number];
}

var inflect_latin_verb_main = function (component) {
    var root = get_root(component);
    var in_perfect_system = get_latin_verb_system(component)
    === 'perfect system';
    var voice = component.get_property_in_language('voice', 'latin');
    var inflected = {};
    if (in_perfect_system && voice === 'passive') {
        inflected.verb = root + get_agreement_marker(component) + ' ' +
        get_helping_verb(component);
    } else {
        var tense = get_latin_verb_tense(component);
        var mood = component.get_property_in_language('mood', 'latin');
        if (tense === 'future' && mood === 'subjunctive') {
            throw 'A future subjunctive is a bug!';
        }
        // Check for periphrastics.
        var in_periphrastic = in_latin_periphrastic(component);
        if (in_periphrastic) {
            return latin_periphrastics[voice](component);
        }
        inflected.verb = root + get_middle_inflection(component) +
        get_end_inflection(component);
    }
    // var clause_type = component;
    // var implicitness = component;
    // if (clause_type === 'is' && implicitness === 'explicit') {
    //     inflected.subject = get_subject_accusative_pronoun(component);
    // }
    // todo: add subjects back.
    return inflected.verb;
}