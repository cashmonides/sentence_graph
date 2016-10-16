var terminology_display_dictionary = {
    //latin cases
    
    
    //if the word nominative occurs in the control flow
    'nominative': {
        //its default output if basic is true is the following
        'basic': 'subject',
        //its default if advanced is true is the follow
        'advanced': 'nominative',
        // no plans to implement translation formula exist
        // 'translation_formula': 'subject'
    },
    'genitive': {
        'basic': '\'of\'',
        'advanced': 'genitive'},
    'dative': {
        'basic': '\'to\'',
        'advanced': 'dative'},
    'accusative': {
        'basic': 'object',
        'advanced': 'accusative'},
    'ablative': {
        'basic': '\'with/by\'',
        'advanced': 'ablative'},
    //latin verb tenses
    'present indicative': {
        'basic': 'present',
        'advanced': 'present indicative'
    },
    'imperfect indicative': {
        'basic': 'past (repeatedly)',
        'advanced': 'imperfect indicative'
        },
    'future indicative': {
        'basic': 'future',
        'advanced': 'future indicative'
        },
    'perfect indicative': {
        'basic': 'past (once)',
        'advanced': 'perfect indicative'
        },
    'pluperfect indicative': {
        'basic': 'had VERBed',
        'advanced': 'pluperfect indicative'
        },
    'future perfect indicative': 'will have...',
    'present subjunctive': 'same time subjunctive 1st degree',
    'imperfect subjunctive': 'same time subjunctive 2nd degree',
    'perfect subjunctive': 'prior time subjunctive 1st degree',
    'pluperfect subjunctive': {
        'basic': 'prior time subjunctive 2nd degree',
        'advanced': 'pluperfect subjunctive',
        // 'translation_formula': 'no translation formula'
    },
    //sequence
    'primary': {
        'basic': '1st degree',
        'advanced': 'primary sequence'
    },
    'secondary': {
        'basic': '2nd degree',
        'advanced': 'secondary sequence'
    },
    //english verb tenses
    'preterite': 'VERBed (once)',
    'pluperfect': 'had VERBed', 
    //original version
    // 'past continuous': 'was VERBing',
    //new version
    'past continuous': {
        'basic': 'VERBed',
        'advanced': 'was VERBing'
    },
    'future perfect': 'will have VERBed', 
    'present subjunctive': {
        'basic': 'VERB',
        'advanced': 'present subjunctive'
    },
    'imperfect subjunctive': {
        'basic': 'VERB',
        'advanced': 'imperfect subjunctive'
    },
    'may time': 'may VERB', 
    'might time': 'might VERB',
    'can time': 'can VERB', 
    'could time': 'could VERB',
    'may tense': 'may VERB', 
    'might tense': 'might VERB', 
    'can tense': 'can VERB', 
    'could tense': 'could VERB', 
    'should tense': 'should VERB', 
    'would tense': 'would VERB', 
    'would tense continuous': 'would be VERBing', 
    'would tense perfect': 'would have VERBed',
    'prior': {
        'regime.relative|subjunctive': {
            'basic': 'prior',
            'advanced': 'prior'
        },
        'regime.absolute|indicative': {
            'basic': 'past',
            'advanced': 'past'
        },
        'default': 'If you see this, tell your teacher!'
    },
    'simultaneous': {
        'regime.relative|subjunctive': {
            'basic': 'same-time',
            'advanced': 'simultaneous'
        },
        'regime.absolute|indicative': {
            'basic': 'present',
            'advanced': 'present'
        },
        'default': 'If you see this, tell your teacher!'
    },
    'subsequent': {
            'regime.relative|subjunctive': {
                'basic': 'subsequent',
                'advanced': 'subsequent',
                /*'translation_formula': {
                    'sequence.primary': 'will VERB',
                    'sequence.secondary': 'would VERB'
                }*/
            },
            'regime.absolute|indicative': {
                'basic': 'future',
                'advanced': 'future',
                /*'translation_formula': {
                    'sequence.primary': 'will VERB',
                    'sequence.secondary': 'will VERB'
                }*/
            },
            'default': 'If you see this, tell your teacher!'
    }
}




