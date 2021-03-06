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
    speak: {
        core_properties: {
            name: 'speak',
            part_of_speech: 'verb',
            transitivity: 'intransitive',
            lexical_properties: ['mental verb']
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
            lexical_properties: []
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
            lexical_properties: []
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
            lexical_properties: ['verb of commanding']
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
            lexical_properties: ['verb of fearing']
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
            lexical_properties: ['mental verb']
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