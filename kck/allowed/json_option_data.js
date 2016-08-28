// trans. form. compatibility list
var translation_formula_compatibility_dictionary = {
    'english': {
        'absolute': {
            'absolute-relative-split?': [
                ['absolute', 'purpose', 'independent subjunctive',
                'english subjunctive'],
                ['absolute', 'relative', 'purpose', 'independent subjunctive',
                'english subjunctive']
            ]
        },
        'relative': {
            'absolute-relative-split?': [
                ['relative', 'purpose', 'independent subjunctive',
                'english subjunctive'],
                ['absolute', 'relative', 'purpose', 'independent subjunctive',
                'english subjunctive']
            ]
        },
        'purpose, independent subjunctive, english subjunctive': {
            'absolute-relative-split?': [
                ['absolute', 'purpose', 'independent subjunctive',
                'english subjunctive'],
                ['absolute', 'relative', 'purpose', 'independent subjunctive',
                'english subjunctive']
            ]
        },
        'conditional': ['conditional']
    },
    'latin': 'all',
    'ssslatin': 'all'
}

var properties_to_leave_out = {
    'english': {
        'absolute': {},
        'relative': {},
        'purpose': {},
        'independent subjunctive': {
            'time': true,
            'tense_and_mood': true
        },
        'english subjunctive': {
            'time': true,
            'tense_and_mood': true
        },
        'conditional': {
            'time': true,
            'tense_and_mood': true
        }
    },
    'latin': {
        'indicative': {},
        'subjunctive': {},
        'conditional': {
            'time': true
        },
        'infinitive': {}
    },
    'ssslatin': {
        'indicative': {},
        'subjunctive': {},
        'conditional': {
            'time': true
        },
        'infinitive': {}
    },
}

// var drop_down_language = 'english';
var drop_down_language = 'latin';

// drop_down_path gives the order of categories which the user will see while navigating through a drop down
// var drop_down_path = ['lexeme', 'person_and_number', 'voice', 'tense_and_mood'];
// var drop_down_path = ['person_and_number', 'voice', 'tense_and_mood', 'lexeme'];
// var drop_down_path = ['voice', 'tense_and_mood', 'lexeme', 'person_and_number'];
// var drop_down_path = ['lexeme', 'tense_and_mood', 'voice', 'person_and_number'];
// var drop_down_path = ['lexeme', 'voice', 'person_and_number'];

// default order of drop downs in the absence of any given order
var overall_ordering_preference = [
    'lexeme', 'voice', 'tense_and_mood',
    'time', 'sequence', 'person_and_number'
];

// order within categories in drop down
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