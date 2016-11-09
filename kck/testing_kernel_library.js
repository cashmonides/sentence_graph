// This is a way to test kernels.


var random_component_properties = ['person_and_number', 'time'];


var testing_rules = [
    'clause_type.main and secondary => prior',
    'clause_type.main => indicative',
    // latin apparently has no subsequent subjunctive passives.
    'subsequent and subjunctive => active',
    // A main clause in secondary sequence cannot have a greek perfect indicative.
    // 'impossible' is just a constraint no clause will satisfy.
    'clause_type.main and greek perfect indicative and secondary => impossible',
    'clause_type.main and primary and prior => greek perfect indicative'
];

var testing_time_to_tense_map = {
    'simultaneous': 'present',
    'subsequent': 'future',
    'prior': 'past'
}

/*
example of format
    attack: {
        core_properties: {
            name: 'attack',
            part_of_speech: 'verb',
            transitivity: 'transitive',
            lexical_properties: []
        },
        latin: {
            conjugation: '1',
            roots: {
                root_2: 'OPPUGN',
                root_3: 'OPPUGNAV',
                root_4: 'OPPUGNAT'
            }
        },
        english: {
            roots: {
        		'default': 'attack',
        		'final-s': 'attacks',
        		'gerund': 'attacking',
        		'past participle': 'attacked',
        		'preterite': 'attacked'
    		}
    	}
    },
*/

var testing_lexemes = {
    noun: {
        //1st declension
        queen: {
            core_properties: {
                name: 'queen',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: true,
                    god: false,
                    ruler: true,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '1',
                gender: 'f',
                roots: ['rēgīn']
            },
            english: {
                roots: {
            		'singular': 'queen',
            		'plural': 'queens'
        		}
        	}
        },
        frog: {
            core_properties: {
                name: 'frog',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '1',
                gender: 'f',
                roots: ['ran']
            },
            english: {
                roots: {
            		'singular': 'frog',
            		'plural': 'frogs'
        		}
        	}
        },
        eagle: {
            core_properties: {
                name: 'eagle',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '1',
                gender: 'f',
                roots: ['aquil']
            },
            english: {
                roots: {
            		'singular': 'eagle',
            		'plural': 'eagles'
        		}
        	}
        },
        spear: {
            core_properties: {
                name: 'spear',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: true,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '1',
                gender: 'f',
                roots: ['hast']
            },
            english: {
                roots: {
            		'singular': 'spear',
            		'plural': 'spears'
        		}
        	}
        },
        opinion: {
            core_properties: {
                name: 'opinion',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: true,
                    location: false,
                    mental: true
                }
            },
            latin: {
                declension: '1',
                gender: 'f',
                roots: ['sententi']
            },
            english: {
                roots: {
            		'singular': 'opinion',
            		'plural': 'opinions'
        		}
        	}
        },
        island: {
            core_properties: {
                name: 'island',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: true,
                    mental: false
                }
            },
            latin: {
                declension: '1',
                gender: 'f',
                roots: ['īnsul']
            },
            english: {
                roots: {
            		'singular': 'island',
            		'plural': 'islands'
        		}
        	}
        },
        //2nd declension masculine
        wolf: {
            core_properties: {
                name: 'wolf',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'm',
                roots: ['lup']
            },
            english: {
                roots: {
            		'singular': 'wolf',
            		'plural': 'wolves'
        		}
        	}
        },
        bull: {
            core_properties: {
                name: 'bull',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'm',
                roots: ['taur']
            },
            english: {
                roots: {
            		'singular': 'bull',
            		'plural': 'bulls'
        		}
        	}
        },
        bear: {
            core_properties: {
                name: 'bear',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'm',
                roots: ['urs']
            },
            english: {
                roots: {
            		'singular': 'bear',
            		'plural': 'bears'
        		}
        	}
        },
        crow: {
            core_properties: {
                name: 'crow',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'm',
                roots: ['corv']
            },
            english: {
                roots: {
            		'singular': 'crow',
            		'plural': 'crows'
        		}
        	}
        },
        horse: {
            core_properties: {
                name: 'horse',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'm',
                roots: ['equ']
            },
            english: {
                roots: {
            		'singular': 'horse',
            		'plural': 'horses'
        		}
        	}
        },
        sword: {
            core_properties: {
                name: 'sword',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: true,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'm',
                roots: ['gladi']
            },
            english: {
                roots: {
            		'singular': 'sword',
            		'plural': 'swords'
        		}
        	}
        },
        //2nd decl neuter
        kingdom: {
            core_properties: {
                name: 'kingdom',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: true,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'n',
                roots: ['rēgn']
            },
            english: {
                roots: {
            		'singular': 'kingdom',
            		'plural': 'kingdoms'
        		}
        	}
        },
        word: {
            core_properties: {
                name: 'word',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: true,
                    location: false,
                    mental: true
                }
            },
            latin: {
                declension: '2',
                gender: 'n',
                roots: ['verb']
            },
            english: {
                roots: {
            		'singular': 'words',
            		'plural': 'words'
        		}
        	}
        },
        gift: {
            core_properties: {
                name: 'gift',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '2',
                gender: 'n',
                roots: ['dōn']
            },
            english: {
                roots: {
            		'singular': 'gift',
            		'plural': 'gifts'
        		}
        	}
        },
        //3rd declension
        lion: {
            core_properties: {
                name: 'lion',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '3',
                gender: 'm',
                roots: ['leo', 'leon']
            },
            english: {
                roots: {
            		'singular': 'lion',
            		'plural': 'lions'
        		}
        	}
        },
        dog: {
            core_properties: {
                name: 'dog',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: true,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: false,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '3',
                gender: 'm',
                roots: ['canis', 'can']
            },
            english: {
                roots: {
            		'singular': 'dog',
            		'plural': 'dogs'
        		}
        	}
        },
        //3i declension
        tooth: {
            core_properties: {
                name: 'tooth',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: true,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '3i',
                gender: 'm',
                roots: ['dēns', 'dent']
            },
            english: {
                roots: {
            		'singular': 'tooth',
            		'plural': 'teeth'
        		}
        	}
        },
        claw: {
            core_properties: {
                name: 'claw',
                part_of_speech: 'noun',
                lexical_property_dictionary: {
                    animate: false,
                    edible: false,
                    human: false,
                    god: false,
                    ruler: false,
                    implement: true,
                    abstraction: false,
                    location: false,
                    mental: false
                }
            },
            latin: {
                declension: '3i',
                gender: 'm',
                roots: ['unguis', 'ungu']
            },
            english: {
                roots: {
            		'singular': 'claw',
            		'plural': 'claw'
        		}
        	}
        },
    },
    verb: {
        //transitive no implement
        rule: {
            core_properties: {
                name: 'rule',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '3',
                citation_form: 'reg- (3)',
                roots: {
                    root_2: 'reg',
                    root_3: 'rex',
                    root_4: 'rect'
                }
            },
            english: {
                citation_form: 'rule',
                roots: {
            		'default': 'rule',
            		'final-s': 'rules',
            		'gerund': 'ruling',
            		'past participle': 'ruled',
            		'preterite': 'ruled'
        		}
        	}
        },
        send: {
            core_properties: {
                name: 'send',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '3',
                citation_form: 'mitt- (3)',
                roots: {
                    root_2: 'mitt',
                    root_3: 'mīs',
                    root_4: 'mitt'
                }
            },
            english: {
                citation_form: 'send',
                roots: {
            		'default': 'send',
            		'final-s': 'sends',
            		'gerund': 'sending',
            		'past participle': 'sent',
            		'preterite': 'sent'
        		}
        	}
        },
        seek: {
            core_properties: {
                name: 'seek',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '3',
                citation_form: 'quaer- (3)',
                roots: {
                    root_2: 'quaer',
                    root_3: 'quaesīv',
                    root_4: 'quasīt'
                }
            },
            english: {
                citation_form: 'seek',
                roots: {
            		'default': 'seek',
            		'final-s': 'seeks',
            		'gerund': 'seeking',
            		'past participle': 'sought',
            		'preterite': 'sought'
        		}
        	}
        },
        grab: {
            core_properties: {
                name: 'grab',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '3i',
                citation_form: 'cap- (3i)',
                roots: {
                    root_2: 'cap',
                    root_3: 'cēp',
                    root_4: 'capt'
                }
            },
            english: {
                citation_form: 'grab',
                roots: {
            		'default': 'grab',
            		'final-s': 'grabs',
            		'gerund': 'grabbing',
            		'past participle': 'grabbed',
            		'preterite': 'grabbed'
        		}
        	}
        },
        'throw': {
            core_properties: {
                name: 'throw',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '3i',
                citation_form: 'iac- (3i)',
                roots: {
                    root_2: 'iac',
                    root_3: 'iēc',
                    root_4: 'iact'
                }
            },
            english: {
                citation_form: 'throw',
                roots: {
            		'default': 'throw',
            		'final-s': 'throws',
            		'gerund': 'throwing',
            		'past participle': 'thrown',
            		'preterite': 'threw'
        		}
        	}
        },
        carry: {
            core_properties: {
                name: 'carry',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '1',
                citation_form: 'port- (1)',
                roots: {
                    root_2: 'port',
                    root_3: 'portāv',
                    root_4: 'portāt'
                }
            },
            english: {
                citation_form: 'carry',
                roots: {
            		'default': 'carry',
            		'final-s': 'carries',
            		'gerund': 'carrying',
            		'past participle': 'carried',
            		'preterite': 'carried'
        		}
        	}
        },
        find: {
            core_properties: {
                name: 'find',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '4',
                citation_form: 'inven- (4)',
                roots: {
                    root_2: 'inven',
                    root_3: 'invēn',
                    root_4: 'invent'
                }
            },
            english: {
                citation_form: 'carry',
                roots: {
            		'default': 'carry',
            		'final-s': 'carries',
            		'gerund': 'carrying',
            		'past participle': 'carried',
            		'preterite': 'carried'
        		}
        	}
        },
        //transitive with implement
        scare: {
            core_properties: {
                name: 'scare',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'mental']
            },
            latin: {
                conjugation: '2',
                citation_form: 'terr- (2)',
                roots: {
                    root_2: 'terr',
                    root_3: 'terru',
                    root_4: 'territ'
                }
            },
            english: {
                citation_form: 'scare',
                roots: {
            		'default': 'scare',
            		'final-s': 'scares',
            		'gerund': 'scaring',
            		'past participle': 'scared',
            		'preterite': 'scared'
        		}
        	}
        },
        move: {
            core_properties: {
                name: 'move',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'mental']
            },
            latin: {
                conjugation: '2',
                citation_form: 'mov- (2)',
                roots: {
                    root_2: 'mov',
                    root_3: 'mōv',
                    root_4: 'mōt'
                }
            },
            english: {
                citation_form: 'move',
                roots: {
            		'default': 'move',
            		'final-s': 'moves',
            		'gerund': 'moving',
            		'past participle': 'moved',
            		'preterite': 'moved'
        		}
        	}
        },
        fill: {
            core_properties: {
                name: 'fill',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '2',
                citation_form: 'impl- (2)',
                roots: {
                    root_2: 'impl',
                    root_3: 'implēv',
                    root_4: 'implēt'
                }
            },
            english: {
                citation_form: 'fill',
                roots: {
            		'default': 'fill',
            		'final-s': 'fills',
            		'gerund': 'filling',
            		'past participle': 'filled',
            		'preterite': 'filled'
        		}
        	}
        },
        //ditransitive
        attack: {
            core_properties: {
                name: 'attack',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '1',
                citation_form: 'oppūgn- (1)',
                roots: {
                    root_2: 'oppugn',
                    root_3: 'oppugnāv',
                    root_4: 'oppugnāt'
                }
            },
            english: {
                citation_form: 'attack',
                roots: {
            		'default': 'attack',
            		'final-s': 'attacks',
            		'gerund': 'attacking',
            		'past participle': 'attacked',
            		'preterite': 'attacked'
        		}
        	}
        },
        invade: {
            core_properties: {
                name: 'invade',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don't think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '3',
                citation_form: 'invād- (3)',
                roots: {
                    root_2: 'invād',
                    root_3: 'invās',
                    root_4: 'invās'
                }
            },
            english: {
                citation_form: 'invade',
                roots: {
            		'default': 'invade',
            		'final-s': 'invades',
            		'gerund': 'invading',
            		'past participle': 'invaded',
            		'preterite': 'invaded'
        		}
        	}
        },
        love: {
            core_properties: {
                name: 'love',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], 
                subject_black_list: ['abstraction'],
                object_black_list: [],
            },
            latin: {
                conjugation: '1',
                citation_form: 'am- (1)',
                roots: {
                    root_2: 'am',
                    root_3: 'amāv',
                    root_4: 'amāt',
                }
            },
            english: {
                citation_form: 'love',
                roots: {
        			'default': 'love',
        			'final-s': 'loves',
        			'gerund': 'loving',
        			'past participle': 'loved',
        			'preterite': 'loved'
                }
    		}
        },
        eat: {
            core_properties: {
                name: 'eat',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don;t think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '1',
                citation_form: 'vor- (1)',
                roots: {
                    root_2: 'vor',
                    root_3: 'vorāv',
                    root_4: 'vorāt'
                }
            },
            english: {
                citation_form: 'eat',
                roots: {
            		'default': 'eat',
            		'final-s': 'eats',
            		'gerund': 'eating',
            		'past participle': 'eaten',
            		'preterite': 'ate'
        		}
        	}
        },
        //intransitive
        come: {
            core_properties: {
                name: 'come',
                part_of_speech: 'verb',
                transitivity: 'intransitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], 
                subject_black_list: [], 
                object_black_list: [],
            },
            latin: {
                conjugation: '4',
                citation_form: 'ven- (4)',
                roots: {
                    root_2: 'ven',
                    root_3: 'vēn',
                    root_4: 'vent'
                }
            },
            english: {
                citation_form: 'come',
                roots: {
        			'default': 'come',
        			'final-s': 'comes',
        			'gerund': 'coming',
        			'past participle': 'come',
        			'preterite': 'came'
                }
    		}
        },
        command: {
            core_properties: {
                name: 'command',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: ['verb of commanding'],
                subject_white_list: ['animate'],
                object_white_list: [], 
                subject_black_list: ['abstraction'],
                object_black_list: ['abstraction', 'implement', 'location', 'mental'],
            },
            latin: {
                conjugation: '2',
                citation_form: 'iub- (2)',
                roots: {
                    root_2: 'iub',
                    root_3: 'iuss',
                    root_4: 'iuss',
                }
            },
            english: {
                citation_form: 'command',
                roots: {
        			'default': 'command',
        			'final-s': 'commands',
        			'gerund': 'commanding',
        			'past participle': 'commanded',
        			'preterite': 'commanded'
        		}
    		}
        },
        fear: {
            core_properties: {
                name: 'fear',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: ['verb of fearing'],
                subject_white_list: ['animate'],
                object_white_list: [], 
                subject_black_list: ['abstraction'],
                object_black_list: [],
            },
            latin: {
                conjugation: '2',
                citation_form: 'tim- (2)',
                roots: {
                    root_2: 'tim',
                    root_3: 'timu',
                    root_4: 'timit',
                }
            },
            english: {
                citation_form: 'fear',
                roots: {
        			'default': 'fear',
        			'final-s': 'fears',
        			'gerund': 'fearing',
        			'past participle': 'feared',
        			'preterite': 'feared'
        		}
    		}
        },
        //mental object or animate noun object (implement mental part later)
        hear: {
            core_properties: {
                name: 'hear',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [], //later on we'll make it a combo mental verb and regular transitive
                subject_white_list: ['animate'],
                object_white_list: ['animate'], //left empty because almost every thing can be an object?
                subject_black_list: [], //left empty because animate white list excludes all things necessary
                object_black_list: [],
            },
            latin: {
                conjugation: '4',
                citation_form: 'aud- (4)',
                roots: {
                    root_2: 'aud',
                    root_3: 'audīv',
                    root_4: 'audīt',
                }
            },
            english: {
                citation_form: 'hear',
                roots: {
            		'transitive': {
            		    'default': 'hear',
            			'final-s': 'hears',
            			'gerund': 'hearing',
            			'past participle': 'heard',
            			'preterite': 'heard'
            		},
            		'intransitive': {
            		    'default': 'hear',
            			'final-s': 'hears',
            			'gerund': 'hearing',
            			'past participle': 'heard',
            			'preterite': 'heard'
            		}
        		}
        	}
        },
        //mental verb that can't take animate subject (only mental clauses)
        //mental ditransitive with consistent translations
        shout: {
            core_properties: {
                name: 'shout',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: ['mental verb'],
                subject_white_list: ['animate'],
                object_white_list: ['mental'], //left empty because almost every thing can be an object?
                subject_black_list: [], //left empty because animate white list excludes all things necessary
                object_black_list: [],
            },
            latin: {
                conjugation: '1',
                citation_form: 'clām- (1)',
                roots: {
                    root_2: 'clām',
                    root_3: 'clāmāv',
                    root_4: 'clāmāt',
                }
            },
            english: {
                citation_form: 'shout',
                roots: {
            		'transitive': {
            		    'default': 'shout',
            			'final-s': 'shouts',
            			'gerund': 'shouting',
            			'past participle': 'shouted',
            			'preterite': 'shouted'
            		},
            		'intransitive': {
            		    'default': 'shout',
            			'final-s': 'shouts',
            			'gerund': 'shouting',
            			'past participle': 'shouted',
            			'preterite': 'shouted'
            		}
        		}
        	}
        },
        //mental ditransitive with context-dependent translations
        speak: {
            core_properties: {
                name: 'say/speak',
                part_of_speech: 'verb',
                transitivity: 'ditransitive',
                lexical_properties: ['mental verb'],
                subject_white_list: ['animate'],
                object_white_list: ['mental'], //left empty because almost every thing can be an object?
                subject_black_list: [], //left empty because animate white list excludes all things necessary
                object_black_list: [],
            },
            latin: {
                conjugation: '3',
                citation_form: 'dīc- (3)',
                roots: {
                    root_2: 'dīc',
                    root_3: 'dīx',
                    root_4: 'dict',
                }
            },
            english: {
                citation_form: 'say/speak',
                roots: {
            		'transitive': {
            		    'default': 'say',
            			'final-s': 'says',
            			'gerund': 'saying',
            			'past participle': 'said',
            			'preterite': 'said'
            		},
            		'intransitive': {
            		    'default': 'speak',
            			'final-s': 'speaks',
            			'gerund': 'speaking',
            			'past participle': 'spoken',
            			'preterite': 'spoke'
            		}
        		}
        	}
        },
        //mental transitive
        feel: {
            core_properties: {
                name: 'feel',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: ['mental verb'],
                subject_white_list: ['animate'],
                object_white_list: ['mental'], 
                subject_black_list: ['abstraction'],
                object_black_list: [],
            },
            latin: {
                conjugation: '4',
                citation_form: 'sent- (4)',
                roots: {
                    root_2: 'sent',
                    root_3: 'sēns',
                    root_4: 'sēns'
                }
            },
            english: {
                citation_form: 'feel',
                roots: {
        			'default': 'feel',
        			'final-s': 'feels',
        			'gerund': 'feeling',
        			'past participle': 'felt',
        			'preterite': 'felt'
        		}
    		}
        },
        see: {
            core_properties: {
                name: 'see',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: ['mental verb'],
                subject_white_list: ['animate'],
                object_white_list: ['mental'], 
                subject_black_list: ['abstraction'],
                object_black_list: [],
            },
            latin: {
                conjugation: '2',
                citation_form: 'vid- (2)',
                roots: {
                    root_2: 'vid',
                    root_3: 'vīd',
                    root_4: 'vīs'
                }
            },
            english: {
                citation_form: 'see',
                roots: {
        			'default': 'see',
        			'final-s': 'sees',
        			'gerund': 'seeing',
        			'past participle': 'seen',
        			'preterite': 'saw'
        		}
    		}
        },
    }
}