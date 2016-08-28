var kck_levels = {
    '1': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative'],
        'voice' : ['active'],
        'person_and_number' : ['3s', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and', 'c_or', 'c_but'],
        'red herring': 'false',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        'drop_down_path' : ['lexeme', 'voice', 'time', 'person_and_number'],
        'source_language' : {'english': 0, 'latin': 1},
        'target_language' : {'english': 1, 'latin': 0},
        'terminology_display_dictionary': 'basic'
    },
    '10': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative', 'greek perfect indicative', 'aorist indicative'],
        'voice' : ['active', 'passive'],
        'person_and_number' : ['3s', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when', 'c_why', 'c_if_flv', 'c_if_fmv', 'c_cum_because'],
        'red herring': 'false',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        'drop_down_path' : ['lexeme', 'voice', 'time', 'person_and_number'],
        'source_language' : {'english': 1, 'latin': 0},
        'target_language' : {'english': 0, 'latin': 1},
        //setting for default display
        'terminology_display_dictionary': 'basic'
    },
    '20': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative', 'greek perfect indicative', 'aorist indicative'],
        'voice' : ['active', 'passive'],
        'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when', 'c_why', 'c_if_flv', 'c_if_fmv', 'c_cum_because'],
        'red herring': 'true',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        'drop_down_path' : ['lexeme', 'voice', 'time', 'person_and_number'],
        'source_language' : {'english': 0.5, 'latin': 0.5},
        'target_language' : {'english': 0.5, 'latin': 0.5},
        //setting for default display
        'terminology_display_dictionary': 'basic'
    }
}