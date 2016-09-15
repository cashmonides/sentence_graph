// This is a way to test kernels.


var random_component_properties = ['person_and_number', 'time', 'voice'];


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
                name: 'rēgnum',
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
        attack: {
            core_properties: {
                name: 'attack',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don;t think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '1',
                roots: {
                    root_2: 'oppugn',
                    root_3: 'oppugnāv',
                    root_4: 'oppugnāt'
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
        eat: {
            core_properties: {
                name: 'eat',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], //left empty because almost every thing can be an object?
                subject_black_list: ['abstraction'], // I don;t think we need abstraction here since nothing is both animate and an abstraction
                object_black_list: ['abstraction', 'implement', 'mental']
            },
            latin: {
                conjugation: '1',
                roots: {
                    root_2: 'vor',
                    root_3: 'vorāv',
                    root_4: 'vorāt'
                }
            },
            english: {
                roots: {
            		'default': 'eat',
            		'final-s': 'eats',
            		'gerund': 'eating',
            		'past participle': 'eaten',
            		'preterite': 'ate'
        		}
        	}
        },
        speak: {
            core_properties: {
                name: 'speak',
                part_of_speech: 'verb',
                transitivity: 'intransitive',
                lexical_properties: ['mental verb'],
                subject_white_list: ['animate'],
                object_white_list: ['mental'], //left empty because almost every thing can be an object?
                subject_black_list: [], //left empty because animate white list excludes all things necessary
                object_black_list: [],
            },
            latin: {
                conjugation: '3',
                roots: {
                    root_2: 'dīc',
                    root_3: 'dīx',
                    root_4: 'dict',
                }
            },
            english: {
                roots: {
            		'default': 'speak',
        			'final-s': 'speaks',
        			'gerund': 'speaking',
        			'past participle': 'spoken',
        			'preterite': 'spoke'
        		}
        	}
        },
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
                roots: {
                    root_2: 'ven',
                    root_3: 'vēn',
                    root_4: 'vent'
                }
            },
            english: {
                roots: {
        			'default': 'come',
        			'final-s': 'comes',
        			'gerund': 'coming',
        			'past participle': 'come',
        			'preterite': 'came'
                }
    		}
        },
        love: {
            core_properties: {
                name: 'love',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: [],
                subject_white_list: ['animate'],
                object_white_list: [], 
                subject_black_list: ['abstraction'],
                object_black_list: [],
            },
            latin: {
                conjugation: '1',
                roots: {
                    root_2: 'am',
                    root_3: 'amāv',
                    root_4: 'amāt',
                }
            },
            english: {
                roots: {
        			'default': 'love',
        			'final-s': 'loves',
        			'gerund': 'loving',
        			'past participle': 'loved',
        			'preterite': 'loved'
                }
    		}
        },
        command: {
            core_properties: {
                name: 'command',
                part_of_speech: 'verb',
                transitivity: 'transitive',
                lexical_properties: ['verb of commanding'],
                subject_white_list: ['animate'],
                object_white_list: [], 
                subject_black_list: ['abstraction'],
                object_black_list: ['abstraction', 'implement', 'location', 'mental'],
            },
            latin: {
                conjugation: '2',
                roots: {
                    root_2: 'iub',
                    root_3: 'iuss',
                    root_4: 'iuss',
                }
            },
            english: {
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
                transitivity: 'transitive',
                lexical_properties: ['verb of fearing'],
                subject_white_list: ['animate'],
                object_white_list: [], 
                subject_black_list: ['abstraction'],
                object_black_list: [],
            },
            latin: {
                conjugation: '2',
                roots: {
                    root_2: 'tim',
                    root_3: 'timu',
                    root_4: 'timit',
                }
            },
            english: {
                roots: {
        			'default': 'fear',
        			'final-s': 'fears',
        			'gerund': 'fearing',
        			'past participle': 'feared',
        			'preterite': 'feared'
        		}
    		}
        },
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
                roots: {
                    root_2: 'sent',
                    root_3: 'sēns',
                    root_4: 'sēns'
                }
            },
            english: {
                roots: {
        			'default': 'feel',
        			'final-s': 'feels',
        			'gerund': 'feeling',
        			'past participle': 'felt',
        			'preterite': 'felt'
        		}
    		}
        }
    }
}