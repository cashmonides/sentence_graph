var tense_maps = {
    'english': {
        'simultaneous': [
            'present indicative: present'
        ],
        'subsequent': [
            'future indicative: future',
            'future perfect indicative: future perfect'
        ],
        'prior': [
            'imperfect indicative: past continuous',
            'perfect indicative: preterite',
            'pluperfect indicative: pluperfect'
        ],
        'can tense': [
            'present subjunctive: can tense'
        ],
        'could tense': [
            'imperfect subjunctive: could tense'
        ],
        'may tense': [
            'present subjunctive: may tense'
        ],
        'might tense': [
            'imperfect subjunctive: might tense'
        ],
        'conditional should tense': [
            'present subjunctive: future indicative'
        ],
        'conditional would tense': [
            'imperfect subjunctive: would tense continuous',
            'pluperfect indicative: would tense perfect'
        ]
    },
    'latin': {
        'simultaneous indicative': [
            'present indicative'
        ],
        'subsequent indicative': [
            'future indicative',
            'future perfect indicative'
        ],
        'prior indicative': [
            'imperfect indicative',
            'perfect indicative',
            'pluperfect indicative'
        ],
        'simultaneous subjunctive primary': [
            'present subjunctive'
        ],
        'simultaneous subjunctive secondary': [
            'imperfect subjunctive'
        ],
        'prior subjunctive primary': [
            'perfect subjunctive'
        ],
        'prior subjunctive secondary': [
            'pluperfect subjunctive'
        ],
        'subsequent subjunctive primary': [
            'present subjunctive of the active periphrastic'
        ],
        'subsequent subjunctive secondary': [
            'imperfect subjunctive of the active periphrastic'
        ]
    },
    'ssslatin': {
        'simultaneous indicative': [
            'present indicative'
        ],
        'subsequent indicative': [
            'future indicative',
            'future perfect indicative'
        ],
        'prior indicative': [
            'imperfect indicative',
            'perfect indicative',
            'pluperfect indicative'
        ],
        'simultaneous subjunctive primary': [
            'present subjunctive'
        ],
        'simultaneous subjunctive secondary': [
            'imperfect subjunctive'
        ],
        'prior subjunctive primary': [
            'perfect subjunctive'
        ],
        'prior subjunctive secondary': [
            'pluperfect subjunctive'
        ],
        'subsequent subjunctive primary': [
            'present subjunctive of the active periphrastic'
        ],
        'subsequent subjunctive secondary': [
            'imperfect subjunctive of the active periphrastic'
        ]
    }
}

var tense_taxonomy = {
    'simultaneous indicative': [
        'present indicative'
    ],
    'subsequent indicative': [
        'future indicative',
        'future perfect indicative'
    ],
    'prior indicative': [
        'imperfect indicative',
        ['perfect indicative', [
            'greek perfect indicative',
            'aorist indicative'
        ]],
        'pluperfect indicative'
    ],
    'simultaneous subjunctive primary': [
        'present subjunctive'
    ],
    'simultaneous subjunctive secondary': [
        'imperfect subjunctive'
    ],
    'prior subjunctive primary': [
        'perfect subjunctive'
    ],
    'prior subjunctive secondary': [
        'pluperfect subjunctive'
    ],
    'subsequent subjunctive primary': [
        'present subjunctive of the active periphrastic'
    ],
    'subsequent subjunctive secondary': [
        'imperfect subjunctive of the active periphrastic'
    ],
    'present infinitive': [
        'present infinitive'
    ],
    'perfect infinitive': [
        'perfect infinitive'
    ]
}

// This map stores whether languages have moods.
// English's moods are so vestigial that we do not consider them
// to be true moods.
var has_mood = {
    'english': false,
    'latin': true,
    'ssslatin': true
}