// A test to see how far allowing some code (not just data) gets us.
// Seems to get us rather far. We still have a lot of data,
// but now we have less implementation work.

// Add some fake methods.
// todo: remove this when we have actual tense.
Component.add_fake_property('tense', ['time'], function (results) {
    return {
        'prior': 'imperfect',
        'simultaneous': 'present',
        'subsequent': 'future'
    }[results.time];
});

// Note how one fake property can use another.
Component.add_fake_property('system', ['tense'], function (results) {
    if (['perfect', 'pluperfect', 'future perfect'].indexOf(
        results.tense) !== -1) {
        return 'perfect';
    } else {
        return 'present';
    }
});

Component.add_fake_property('1st person ending', ['tense', 'mood'],
function (results) {
    if (['present', 'future', 'future perfect'].indexOf(results.tense) !== -1
    && results.mood !== 'subjunctive') {
        return 'present';
    } else {
        return 'past/subjunctive';
    }
});

// It's sort of sad, but I can never remember...
Component.add_fake_property('number_and_person', ['person_and_number'],
function (results) {
    return results.person_and_number;
});

Component.add_fake_property('subject number', ['person_and_number'],
function (results) {
    var initial = results.person_and_number[1];
    return {
        's': 'singular',
        'p': 'plural'
    }[initial];
});

// Done with the fake methods.

var get_stem = function (component) {
    // We enabled adding of fake properties
    // so we can ask about perfect system in a clean way.
    var in_perfect_system = component.get_property_in_language(
        'system', 'latin') === 'perfect';
    var voice = component.get_property_in_language('voice', 'latin');
    if (in_perfect_system && voice === 'active') {
        return component.lexeme.stem_3;
    } else if (in_perfect_system && voice === 'passive') {
        return component.lexeme.stem_4;
    } else {
        return component.lexeme.stem_2;
    }
}

var get_middle_inflection = function (component) {
    var in_perfect_system = component.get_property_in_language(
        'system', 'latin') === 'perfect';
    var tense = component.get_property_in_language('tense', 'latin');
    var mood = component.get_property_in_language('mood', 'latin');
    if (in_perfect_system) {
        return perfect_middle[tense + ' ' + mood];
    } else {
        var conjugation = component.lexeme.conjugation;
        var inflections_for_conjugation = middle_inflections[
            'conjugation ' + conjugation];
        var search_string = tense + ' ' + mood;
        if (search_string in inflections_for_conjugation) {
            return inflections_for_conjugation[search_string];
        } else {
            var voice = component.get_property_in_language('voice', 'latin');
            return inflections_for_conjugation[search_string + ' ' + voice];
        }
    }
}

var get_end_inflection = function (component) {
    var mood = component.get_property_in_language('mood', 'latin');
    if (mood === 'infinitive') {
        return '';
    } else {
        var tense = component.get_property_in_language('tense', 'latin');
        var voice = component.get_property_in_language('voice', 'latin');
        var number_and_person = component.get_property_in_language(
            'number_and_person', 'latin');
        if (mood === 'indicative' && tense === 'perfect'
        && voice === 'active') {
            return perfect_endings[number_and_person];
        } else {
            if (!(voice + ' ' + number_and_person in normal_endings)) {
                // An ending seems to be missing!
                throw voice + ' ' + number_and_person + ' has no ending!';
            }
            var ending = normal_endings[voice + ' ' + number_and_person];
            if (typeof ending === 'string') {
                return ending;
            } else {
                var present_or_past_tense = component.get_property_in_language(
                    '1st person ending', 'latin');
                console.log(ending, present_or_past_tense);
                return ending[present_or_past_tense];
            }
        }
    }
}

// var get_agreement_marker = function (component) {
//     var clause_type = ???;
//     var number = component.get_property_in_language('subject number', 'latin');
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
        var tense = component.get_property_in_language('tense', 'latin');
        var voice = component.get_property_in_language('voice', 'latin');
        var number_and_person = component.get_property_in_language(
            'number_and_person', 'latin');
        return helping_verb[tense + ' ' + voice + ' ' + number_and_person];
    }
}

var get_subject_accusative_pronoun = function (component) {
    var number_and_person = component.get_property_in_language(
        'number_and_person', 'latin');
    return subject_accusative_pronoun[number_and_person];
}

var inflect_latin_verb_main = function (component) {
    var stem = get_stem(component);
    var in_perfect_system = component.get_property_in_language(
        'system', 'latin') === 'perfect';
    var voice = component.get_property_in_language('voice', 'latin');
    var inflected = {};
    if (in_perfect_system && voice === 'passive') {
        inflected.verb = stem + get_agreement_marker(component) + ' ' +
        get_helping_verb(component);
    } else {
        inflected.verb = stem + get_middle_inflection(component) +
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

var middle_inflections = {
    'conjugation 1': {
        'present indicative': '-A',
        'imperfect indicative': '-ABA',
        'future indicative': '-ABI',
        'present subjunctive': '-E',
        'imperfect subjunctive': '-ARE',
        'present infinitive active': '-ARE',
        'present infinitive passive': '-ARI'
    },
    'conjugation 2': {
        'present indicative': '-E',
        'imperfect indicative': '-EBA',
        'future indicative': '-EBI',
        'present subjunctive': '-EA',
        'imperfect subjunctive': '-ERE',
        'present infinitive active': '-ERE',
        'present infinitive passive': '-ERI'
    },
    'conjugation 3': {
        'present indicative': '-I',
        'imperfect indicative': '-EBA',
        'future indicative': '-E',
        'present subjunctive': '-A',
        'imperfect subjunctive': '-ERE',
        'present infinitive active': '-ERE',
        'present infinitive passive': '-I'
    },
    'conjugation 3i': {
        'present indicative': '-I',
        'imperfect indicative': '-IEBA',
        'future indicative': '-IE',
        'present subjunctive': '-IA',
        'imperfect subjunctive': '-ERE',
        'present infinitive active': '-ERE',
        'present infinitive passive': '-I'
    },
    'conjugation 4': {
        'present indicative': '-I',
        'imperfect indicative': '-IEBA',
        'future indicative': '-IE',
        'present subjunctive': '-IA',
        'imperfect subjunctive': '-IRE',
        'present infinitive active': '-IRE',
        'present infinitive passive': '-IRI'
    }
}

var perfect_middle = {
    'perfect indicative': '-*',
    'pluperfect indicative': '-ERA',
    'future perfect indicative': '-ERI',
    'perfect subjunctive': '-ERI',
    'pluperfect subjunctive': '-ISSE',
    'perfect infinitive': '-ISSE'
}

var perfect_endings = {
    '1s': '-I',
    '2s': '-ISTI',
    '3s': '-IT',
    '1p': '-IMUS',
    '2p': '-ITIS',
    '2p': '-ERUNT'
}

var normal_endings = {
    'active 1s': {
        'present': '-O',
        'past/subjunctive': '-M'
    },       
    'active 2s': '-S',
    'active 3s': '-T',
    'active 1p': '-MUS',
    'active 2p': '-TIS',
    'active 3p': '-NT',
    'passive 1s': {
        'present': '-OR',
        'past/subjunctive': '-R'
    },
    'passive 2s': '-RIS',
    'passive 3s': '-TUR',
    'passive 1p': '-MUR',
    'passive 2p': '-MINI',
    'passive 3p': '-NTUR'
}

var agreement_marker =  {
    'is': {
        'm singular': '-UM',
        'm plural': '-OS',
        'f singular': '-AM',
        'f plural': '-AS',
        'n singular': '-UM',
        'n plural': '-A'
    },
    'otherwise': {
        'm singular': '-US',
        'm plural': '-I',
        'f singular': '-A',
        'f plural': '-AE',
        'n singular': '-UM',
        'n plural': '-A'
    }
}

var helping_verb = {
    'perfect indicative 1s': 'SUM',
    'perfect indicative 2s': 'ES',
    'perfect indicative 3s': 'EST',
    'perfect indicative 1p': 'SUMUS',
    'perfect indicative 2p': 'ESTIS',
    'perfect indicative 3p': 'SUNT',
    'pluperfect indicative 1s': 'SUM',
    'pluperfect indicative 2s': 'ES',
    'pluperfect indicative 3s': 'EST',
    'pluperfect indicative 1p': 'SUMUS',
    'pluperfect indicative 2p': 'ESTIS',
    'pluperfect indicative 3p': 'SUNT',
    'future perfect indicative 1s': 'SUM',
    'future perfect indicative 2s': 'ES',
    'future perfect indicative 3s': 'EST',
    'future perfect indicative 1p': 'SUMUS',
    'future perfect indicative 2p': 'ESTIS',
    'future perfect indicative 3p': 'SUNT',
    'perfect subjunctive 1s': 'SUM',
    'perfect subjunctive 2s': 'ES',
    'perfect subjunctive 3s': 'EST',
    'perfect subjunctive 1p': 'SUMUS',
    'perfect subjunctive 2p': 'ESTIS',
    'perfect subjunctive 3p': 'SUNT',
    'pluperfect subjunctive 1s': 'SUM',
    'pluperfect subjunctive 2s': 'ES',
    'pluperfect subjunctive 3s': 'EST',
    'pluperfect subjunctive 1p': 'SUMUS',
    'pluperfect subjunctive 2p': 'ESTIS',
    'pluperfect subjunctive 3p': 'SUNT',
    'perfect infinitive': 'ESSE'
}

var subject_accusative_pronoun = {
    '1s': 'ME',
    '2s': 'TE',
    '3s': 'EUM',
    '1p': 'NOS',
    '2p': 'VOS',
    '3p': 'EOS'
}