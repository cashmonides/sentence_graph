// This is a way to test kernels.
// dumping ground of arbitrary test data


var testing_allowed_library = {
    time: ['prior', 'simultaneous', 'subsequent'],
    voice: ['active', 'passive'],
    mood: ['indicative', 'subjunctive'],
    transitivity: ['transitive', 'intransitive'],
    person_and_number: ['1s', '2s', '3s', '1p', '2p', '3p']
}


var testing_rules = [
    'transitive or active',                 //intransitive verbs cannot be passive
    'main and secondary => prior',
    'main => indicative',
    // latin apparently has no subsequent subjunctive passives.
    'subsequent and subjunctive => active',
    // A main clause in secondary sequence cannot have a greek perfect indicative.
    // 'impossible' is just a constraint no clause will satisfy.
    'main and greek perfect indicative and secondary => impossible',
    'main and primary and prior => greek perfect indicative'
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
                root_2: 'DĪC',
                root_3: 'DĪX',
                root_4: 'DICT',
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
                root_2: 'VEN',
                root_3: 'VĒN',
                root_4: 'VENT'
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
                root_2: 'AM',
                root_3: 'AMĀV',
                root_4: 'AMĀT',
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
                root_2: 'IUB',
                root_3: 'IUSS',
                root_4: 'IUSS',
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
                root_2: 'TIM',
                root_3: 'TIMU',
                root_4: 'TIMIT',
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
    }
}