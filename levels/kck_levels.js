var kck_levels = {
    //start with just variation in the middle element 3s only (v1-2 only)
    '1': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative'],
        'voice' : ['active'],
        // 'voice' : ['active', 'passive'],
        // 'person_and_number' : ['3s'],
        'person_and_number' : ['1s'],
        'allowed_conjunctions': ['c_null', 'c_and'],
        // 'allowed_conjunctions': ['c_null', 'c_and'],
        // 'allowed_conjunctions': ['c_null', 'c_and', 'c_or', 'c_but', 'c_purpose', 'c_when', 'c_why'],
        // 'allowed_conjunctions': ['c_why'],
        'red herring': 'false',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        // 'allowed_verbs' : ['speak', 'attack'],
        'noun_switch' : false,
        'allowed_nouns': ['wolf'],
        'drop_down_path' : [ 'time', 'lexeme', 'voice', 'tense_and_mood','person_and_number'],
        // 'drop_down_path' : ['lexeme', 'voice', 'time', 'tense_and_mood','person_and_number'],
        // 'drop_down_path' : ['lexeme', 'voice', 'person_and_number'],
        // 'drop_down_path' : ['lexeme', 'person_and_number'],
        // 'drop_down_path' : ['lexeme'],
        'drop_down_path_noun' : ['lexeme', 'case'],
        'transitivity' : {'transitive': 0.9, 'intranstive': 0.1},
        'explicitness' : {'explicit': 0.9, 'implicit': 0.1},
        'source_language' : {'english': 0, 'latin': 1},
        'target_language' : {'english': 1, 'latin': 0},
        // 'source_language' : {'english': 1, 'latin': 0},
        // 'target_language' : {'english': 0, 'latin': 1},
        // 'source_language' : {'english': 0.5, 'latin': 0.5},
        // 'target_language' : {'english': 0.5, 'latin': 0.5},
        'terminology_display_dictionary': 'basic',
        // 'terminology_display_dictionary': 'advanced',
        'verb_dashes_removed': false,
        // 'verb_dashes_removed': true
    },
    //start with just variation in the middle element 3s only (v1-4)1~
    //jump to 3s and 3p
    '10': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative'],
        'voice' : ['active'],
        // 'voice' : ['active', 'passive'],
        'person_and_number' : ['3s', '3p'],
        // 'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and'],
        // 'allowed_conjunctions': ['c_null', 'c_and'],
        // 'allowed_conjunctions': ['c_null', 'c_and', 'c_or', 'c_but', 'c_purpose', 'c_when', 'c_why'],
        // 'allowed_conjunctions': ['c_why'],
        'red herring': 'false',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        // 'allowed_verbs' : ['speak', 'attack'],
        'noun_switch' : false,
        'allowed_nouns': ['wolf'],
        // 'drop_down_path' : ['lexeme', 'voice', 'time', 'tense_and_mood','person_and_number'],
        'drop_down_path' : ['lexeme', 'voice', 'person_and_number'],
        // 'drop_down_path' : ['lexeme', 'person_and_number'],
        // 'drop_down_path' : ['lexeme'],
        'drop_down_path_noun' : ['lexeme', 'case'],
        'transitivity' : {'transitive': 0.9, 'intranstive': 0.1},
        'explicitness' : {'explicit': 0.9, 'implicit': 0.1},
        'source_language' : {'english': 0, 'latin': 1},
        'target_language' : {'english': 1, 'latin': 0},
        // 'source_language' : {'english': 1, 'latin': 0},
        // 'target_language' : {'english': 0, 'latin': 1},
        // 'source_language' : {'english': 0.5, 'latin': 0.5},
        // 'target_language' : {'english': 0.5, 'latin': 0.5},
        'terminology_display_dictionary': 'basic',
        // 'terminology_display_dictionary': 'advanced',
        'verb_dashes_removed': false,
        // 'verb_dashes_removed': true
    },
    ///////INTRO OF ALL PERSONAL ENDINGS
    //vary endings 1s-3p with present tense only (limited verbs)
    '20': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative', 'greek perfect indicative', 'aorist indicative'],
        // 'voice': ['active'],
        'voice' : ['active', 'passive'],
        'person_and_number' : ['3s', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when', 'c_why', 'c_if_flv', 'c_if_fmv', 'c_cum_because'],
        'red herring': 'false',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        'allowed_nouns': ['wolf'],
        'noun_switch' : false,
        'drop_down_path' : ['lexeme', 'voice', 'time', 'tense_and_mood','person_and_number', 'sequence'],
        'drop_down_path_noun' : ['lexeme', 'case'],
        'transitivity' : {'transitive': 0.9, 'intranstive': 0.1},
        'explicitness' : {'explicit': 0.9, 'implicit': 0.1},
        'source_language' : {'english': 1, 'latin': 0},
        'target_language' : {'english': 0, 'latin': 1},
        //setting for default display
        'terminology_display_dictionary': 'basic',
        'verb_dashes_removed': false
    },
    // all active endings, all tenses (limited verbs)
    '30': {
        'time': ['simultaneous', 'prior', 'subsequent'],
        'sequence': ['primary', 'secondary'],
        'universal_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
            'imperfect indicative', 'greek perfect indicative', 'aorist indicative'],
        // 'voice': ['active'],
        'voice' : ['active', 'passive'],
        'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
        'allowed_conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when', 'c_why', 'c_if_flv', 'c_if_fmv', 'c_cum_because'],
        'red herring': 'true',
        'absolute-relative-split': 'on',
        'allowed_verbs' : ['love', 'speak', 'command', 'attack', 'fear'],
        'allowed_nouns': ['wolf'],
        'noun_switch' : false,
        'drop_down_path' : ['lexeme', 'voice', 'time', 'tense_and_mood','person_and_number', 'sequence'],
        'drop_down_path_noun' : ['lexeme', 'case'],
        'transitivity' : {'transitive': 0.9, 'intranstive': 0.1},
        'explicitness' : {'explicit': 0.9, 'implicit': 0.1},
        'source_language' : {'english': 0.5, 'latin': 0.5},
        'target_language' : {'english': 0.5, 'latin': 0.5},
        //setting for default display
        'terminology_display_dictionary': 'basic',
        'verb_dashes_removed': false
    }
    // all active endings, all tenses (many verbs)
    ///////INTRO OF PASSIVE
    // 3s active and passive present only (limited verbs)
    // 3s active and passive all tenses (limited verbs)
    // 3s & 3p active and passive all tenses (limited verbs)
    // 3s & 3p active and passive all tenses (many verbs)
    // 1s - 3p active and passive all tenses (limited verbs)
    // 1s - 3p active and passive all tenses (many verbs)
}