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
    'main and primary and prior => greek perfect indicative'
];

var testing_time_to_tense_map = {
    'simultaneous': 'present',
    'subsequent': 'future',
    'prior': 'past'
}

var testing_kernels = {
    attack : {
        stem_2: 'OPPUGN',
        stem_3: 'OPPUGNAV',
        stem_4: 'OPPUGNAT',
        conjugation: '1',
        name: 'attack',
        transitivity: 'transitive',
        lexical_properties: null,
        english_stems: {
			'default': 'attack',
			'final-s': 'attacks',
			'gerund': 'attacking',
			'past participle': 'attacked',
			'preterite': 'attacked'
		}
    },
    speak : {
        stem_2: 'DĪC',
        stem_3: 'DĪX',
        stem_4: 'DICT',
        conjugation: '3',
        name: 'speak',
        transitivity: 'intransitive',
        lexical_properties: 'mental verb',
        english_stems: {
			'default': 'speak',
			'final-s': 'speaks',
			'gerund': 'speaking',
			'past participle': 'spoken',
			'preterite': 'spoke'
		}
    },
    come : {
        stem_2: 'VEN',
        stem_3: 'VĒN',
        stem_4: 'VENT',
        conjugation: '4',
        name: 'come',
        transitivity: 'intransitive',
        lexical_properties: null,
        english_stems: {
			'default': 'come',
			'final-s': 'comes',
			'gerund': 'coming',
			'past participle': 'come',
			'preterite': 'came'
		}
    },
    love : {
        stem_2: 'AM',
        stem_3: 'AMĀV',
        stem_4: 'AMĀT',
        conjugation: '1',
        name: 'love',
        transitivity: 'transitive',
        lexical_properties: null,
        english_stems: {
			'default': 'love',
			'final-s': 'loves',
			'gerund': 'loving',
			'past participle': 'loved',
			'preterite': 'loved'
		}
    },
    command : {
        stem_2: 'IUB',
        stem_3: 'IUSS',
        stem_4: 'IUSS',
        conjugation: '2',
        name: 'command',
        transitivity: 'transitive',
        lexical_properties: 'verb of commanding',
        english_stems: {
			'default': 'command',
			'final-s': 'commands',
			'gerund': 'commanding',
			'past participle': 'commanded',
			'preterite': 'commanded'
		}
    },
    fear : {
        stem_2: 'TIM',
        stem_3: 'TIMU',
        stem_4: 'TIMIT',
        conjugation: '2',
        name: 'fear',
        transitivity: 'transitive',
        lexical_properties: 'verb of fearing',
        english_stems: {
			'default': 'fear',
			'final-s': 'fears',
			'gerund': 'fearing',
			'past participle': 'feared',
			'preterite': 'feared'
		}
    }
}