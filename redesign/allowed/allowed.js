/*
var allowed_max = {
    'time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary', 'secondary'],
    'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative', 'greek perfect indicative', 'aorist indicative',
        'pluperfect indicative', 'future perfect indicative'],
    'voice' : ['active', 'passive'],
    'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
    'conjunctions': 'all_conjunctions',
    'red herring': 'true',
    'absolute-relative-split': 'on'
}

var allowed_high = {
    'time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary', 'secondary'],
    'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative', 'greek perfect indicative', 'aorist indicative',
        'pluperfect indicative', 'future perfect indicative'],
    'voice' : ['active', 'passive'],
    'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
    'conjunctions': ['c_null', 'c_and', 'c_or', 'c_but', 'c_purpose', 'c_when'],
    'red herring': 'true',
    'absolute-relative-split': 'on'
}


var allowed_medium = {
    'time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary'],
    'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative'],
    'voice' : ['active', 'passive'],
    'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
    'conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when'],
    'red herring': 'false',
    'absolute-relative-split': 'on'
}


var allowed_min = {
    'time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary'],
    'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative'],
    'voice' : ['active'],
    'person_and_number' : ['3s', '3p'],
    'conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when'],
    'red herring': 'false',
    'absolute-relative-split': 'on'
}


// The default settings are the maximum.
var default_allowed = allowed_medium;

var default_leave_out_settings = {}
*/

// dummy test levels above
// more realistic levels below

/*
EXPLANATION OF CATEGORIES
red_herring

absolute relative split = whether we have absolute and relative together in the same drop down
*/

/*
EXPLANATION OF HOW LEVELS WORK

choose a lexicon of allowed conjunctions

choose a lexicon of allowed verbs, nouns, etc.

linguistic features chosen
    - time
    - voice
    - sequence
    - person_and_number
    
some overrides may happen if there's an inconsistency
    - sequence (if a conjunction only takes certain sequences)
    - time (if a conjunction only takes certain time)
    - general rule: let conjunction have priority

some features are not chosen directly but only as a consequence of choosing a lexicon
    - e.g. transitivity
    
a lexeme might not be allowed but might be demanded by a conjunction
    - e.g. the allowed conjunction is indirect command but no verb of commanding has been allowed
    - general rule: let the conjunction have priority
    - i.e. use the lexeme even if it's not allowed
    
    

drop_display features
    - which components drop and which non-drop
        - e.g. 'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 0,
    - number of dummies (i.e. extra options)
    - none- option in drop downs
    - swap???
    
    
vocabulary cheat sheet display features
    - extra options in vocabulary cheat sheet
    
*/



/*
add when we have nouns:
    implicitness
    number_of_other_nouns : ["singular"],
    shuffle: [true, false],
    genitive_quantity: [0, 0],
    genitive_number: ["singular", "plural"],
    genitive_scramble: false
*/

var modules = {
    '1': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative'],
        'voice' : ['active', 'passive'],
        'person_and_number' : ['3s', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and', 'c_or', 'c_but'],
        'red herring': 'false',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        'drop_down_path' : ['lexeme', 'voice', 'time', 'person_and_number'],
        //todo make the following functional
        //contains drop_non_drop and lexicon dummies
        'drop_display_level' : 10,
        //todo make the following functional
        'drop_down_language' : {'english': 0.5, 'latin': 0.5},
        //setting for default display
        'terminology_display_dictionary': 'basic',
        'case': {
            'english': 'lower',
            'latin': 'upper'
        },
        'cheat_sheet_dummies': {
            'noun': 2,
            'verb': 2
        },
        'dashes': true
    },
    '10': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative', 'greek perfect indicative', 'aorist indicative'],
        'voice' : ['active', 'passive'],
        'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when', 'c_why'],
        'red herring': 'false',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        'drop_down_path' : ['lexeme', 'voice', 'time', 'person_and_number'],
        //todo make the following functional
        //contains drop_non_drop and lexicon dummies
        'drop_display_level' : 20,
        //todo make the following functional
        'drop_down_language' : {'english': 0.5, 'latin': 0.5},
        //setting for default display
        'terminology_display_dictionary': 'basic',
        'case': {
            'english': 'lower',
            'latin': 'upper'
        },
        'cheat_sheet_dummies': {
            'noun': 2,
            'verb': 2
        },
        'dashes': true
    }
}

var module_number = 1;