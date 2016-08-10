var global_test_important_options = ['lexeme', 'voice', 'tense_and_mood'];

var overall_ordering_preference = [
    'lexeme', 'voice', 'tense_and_mood',
    'time', 'sequence', 'person_and_number'
];

var ordering_preference_within_categories = {
    'voice' : ['active', 'passive'],
    'tense_and_mood': {
        'latin': ['present indicative', 'imperfect indicative', 'future indicative',
                 'present subjunctive', 'imperfect subjunctive', 'perfect subjunctive',
                 'pluperfect subjunctive', 'present subjunctive of the active periphrastic',
                 'imperfect subjunctive of the active periphrastic',
                 'present infinitive', 'perfect infinitive'],
        'english': ['present', 'future', 'perfect', 'preterite', 'pluperfect', 
                    'past continuous', 'future perfect', 'present subjunctive', 
                    'may tense', 'might tense', 'can tense', 'could tense', 'should tense', 
                    'would tense', 'would tense continuous', 'would tense perfect']
    },
    'time': ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary', 'secondary'],
    'person_and_number': ['1s', '2s', '3s', '1p', '2p', '3p']
}

ordering_preference_within_categories.tense_and_mood.ssslatin =
ordering_preference_within_categories.tense_and_mood.latin;