var latin_levels = {
    
    
    //present tense only
    //singular only
    //no verb drop and only present
    10 : {
        drop_non_drop_map: {'subject_drop': 0.9, 'verb_drop': 0, 'object_drop': 0.9, 'conjunction_drop': 0.9,
            min: 1, max: 2},
        clause_type : ["main"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular"],
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //adding plural subjects and objects
    //still no verb drop and just present
    20 : {
        drop_non_drop_map: {'subject_drop': 0.9, 'verb_drop': 0, 'object_drop': 0.9, 'conjunction_drop': 0.9,
            min: 1, max: 2},
        clause_type : ["main"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //adding all three tenses and verb drop
    //dropping it back down to singular only for simplicity's sake
    30 : {
        drop_non_drop_map: {'subject_drop': 0.3, 'verb_drop': 1, 'object_drop': 0.3, 'conjunction_drop': 0.9,
            min: 1, max: 3},
        clause_type : ["main"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    //keeping all three tenses and verb drop
    //adding in singular and plurals
    40 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 0.9,
            min: 1, max: 3},
        clause_type : ["main"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    ///////////////////
    //moving to iq and is
    
    
    //moving to iq and is
    //primary sequence only
    //keeping it singular only for simplicity's sake
    100 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ["iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary'],
            iq: ['primary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //moving to iq and is
    //primary sequence only
    //adding singulars and plurals
    110 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ["iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary'],
            iq: ['primary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    //adding secondary sequence
    //simplifying to singular only
    120 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ["iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    //adding singular and plural
    130 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ["iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //adding some review of main clauses as well
    140 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ["main", "iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    //only iq and is
    //adding passive
    //singular only for simplicity's sake
    200 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ["iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active", "passive"],
        number_of_other_nouns : ["singular"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //only iq and is
    //active and passive
    //adding both singular and plural
    210 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ["iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active", "passive"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //a controversial stage?
    //a review stage with main, iq and is
    //active and passive
    //singular and plural
    220 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ['main', "iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active", "passive"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    
    //moving to implicit verbs
    
    
    
    //moving to implicit verbs
    //active only
    //present only for simplicity's sake
    //singular and plural
    300 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ['main'],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit", "implicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //expanding to all tenses
    //still active only
    //singular and plural
    310 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ['main'],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit", "implicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //expanding to iq and is
    //still active only
    //singular and plural
    //primary sequence only for simplicity's sake
    320 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ['main', 'iq', 'is'],
        sequence: {
            main: ['none'],
            is: ['primary'],
            iq: ['primary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit", "implicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    //still expanding to iq and is
    //still active only
    //singular and plural
    //extending to both primary and secondary sequence
    330 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ['main', 'iq', 'is'],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit", "implicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    //still expanding to iq and is
    //adding active and passive
    //singular and plural
    //primary and secondary sequence
    340 : {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 1,
            min: 1, max: 3},
        clause_type : ['main', 'iq', 'is'],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },
        implicitness : ["explicit", "implicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "1p", "2s", "2p", "3s", "3p"]
        },
        voice: ["active", "passive"],
        number_of_other_nouns : ["singular", "plural"],
        drop_down_settings: {
            noun: {
                extra_options: 1,
                lexicon_dummies: 1,
                swap: true
            },
            verb: {
                extra_options: 1,
                lexicon_dummies: 1
            }
        },
        none_display: [false],
        shuffle: [true, false]
    },
    
    
    //add conditionals
    
    
    //add ablative
    
    //add dative
    
    
    //add genitive
    
};



