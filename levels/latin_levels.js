var latin_levels = {
    
    //starting level
    1 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    //present tense only
    //singular only
    //no verb drop and only present
    10 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //adding plural subjects and objects
    //still no verb drop and just present
    20 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //adding all three tenses and verb drop
    //dropping it back down to singular only for simplicity's sake
    30 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    //keeping all three tenses and verb drop
    //adding in singular and plurals
    40 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    ///////////////////
    //moving to iq and is
    
    
    //moving to iq and is (no main)
    //primary sequence only
    //keeping it singular only for simplicity's sake
    100 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //moving to iq and is (no main)
    //primary sequence only
    //adding singulars and plurals
    110 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    //adding secondary sequence (no main)
    //simplifying to singular only
    120 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    //adding singular and plural (no main)
    130 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //adding some review of main clauses as well
    140 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    //only iq and is
    //adding passive
    //singular only for simplicity's sake
    200 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //only iq and is
    //active and passive
    //adding both singular and plural
    210 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //a controversial stage?
    //a review stage with main, iq and is
    //active and passive
    //singular and plural
    220 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    //////////////////////////////////////
    //moving to implicit verbs
    
    
    
    //moving to implicit verbs
    //active only
    //present only for simplicity's sake
    //singular and plural
    300 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //expanding to all tenses
    //still active only
    //singular and plural
    310 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //expanding to iq and is
    //still active only
    //singular and plural
    //primary sequence only for simplicity's sake
    320 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    
    //still expanding to iq and is
    //still active only
    //singular and plural
    //extending to both primary and secondary sequence
    330 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    //still expanding to iq and is
    //adding active and passive
    //singular and plural
    //primary and secondary sequence
    340 : {
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
        shuffle: [true, false],
        genitive_quantity: [0, 0],
        genitive_number: ["singular", "plural"],
        genitive_scramble: false
    },
    
    ///////////////////////////
    
    //add adjectives
    
    
    //add conditionals
    
    
    
    
    //add ablative
    
    //add dative
    
    
    //add genitive
    
};