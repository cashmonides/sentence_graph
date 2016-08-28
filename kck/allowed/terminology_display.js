var terminology_display_dictionary = {
    //latin cases
    
    
    //if the word nominative occurs in the control flow
    'nominative': {
        //its default output if basic is true is the following
        'basic': 'subject',
        //its default if advanced is true is the follow
        'advanced': 'nominative',
        //
        'translation_formula': 'subject'
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
        'translation_formula': 'no translation formula'
    //sequence
    'primary sequence': '1st degree',
    'secondary sequence': 'e2nd degre',
    //english verb tenses
    'preterite': 'past (once)',
    'pluperfect': 'had...', 
    'past continuous': 'was...-ing', 
    'future perfect': 'will have...-ed', 
    'present subjunctive': 'present subjunctive???', 
    'may tense': 'may...', 
    'might tense': 'might...', 
    'can tense': 'can...', 
    'could tense': 'could...', 
    'should tense': 'should...', 
    'would tense': 'would...', 
    'would tense continuous': 'would be...', 
    'would tense perfect': 'would have...',
    
    
    
    'subsequent': {
            'regime.relative': {
                'basic': 'subsequent',
                'advanced': 'subsequent',
                'translation_formula': {
                    'sequence.primary': 'will VERB',
                    'sequence.secondary' 'would VERB'
                }
            },
            'regime.absolute': {
                'basic': 'future',
                'advanced': 'future',
                'translation_formula': {
                    'sequence.primary': 'will VERB',
                    'sequence.secondary' 'will VERB'
                }
            },
    },
   
   
   
    
}



var advanced_terminology_display = {
    //latin cases
    'nominative': 'nominative',
    'genitive': 'genitive',
    'dative': 'dative',
    'accusative': 'accusative',
    'ablative': 'ablative',
    //latin verb tenses
    'present indicative': 'present indicative',
    'imperfect indicative': 'imperfect indicative',
    'future indicative': 'future indicative',
    'perfect indicative': 'perfect indicative',
    'pluperfect indicative': 'pluperfect indicative',
    'future perfect indicative': 'future perfect indicative',
    'present subjunctive': 'present subjunctive',
    'imperfect subjunctive': 'imperfect subjunctive',
    'perfect subjunctive': 'perfect subjunctive',
    'pluperfect subjunctive': 'pluperfect subjunctive',
    //sequence
    'primary sequence': 'primary sequence',
    'secondary sequence': 'secondary sequence',
    //english verb tenses
    'preterite': 'preterite',
    'pluperfect': 'pluperfect', 
    'past continuous': 'past continuous', 
    'future perfect': 'future perfect', 
    'present subjunctive': 'present subjunctive', 
    'may tense': 'may...', 
    'might tense': 'might...', 
    'can tense': 'can...', 
    'could tense': 'could...', 
    'should tense': 'should...', 
    'would tense': 'would...', 
    'would tense continuous': 'would be...', 
    'would tense perfect': 'would have...'
    
    
    
    
    
}

var basic_terminology_display = {
    //latin cases
    'nominative': 'subject',
    'genitive': '\'of\'',
    'dative': '\'to\'',
    'accusative': 'object',
    'ablative': '\'with/by\'',
    //latin verb tenses
    'present indicative': 'present',
    'imperfect indicative': 'past (repeatedly)',
    'future indicative': 'future',
    'perfect indicative': 'past (once)',
    'pluperfect indicative': 'had...',
    'future perfect indicative': 'will have...',
    'present subjunctive': 'same time subjunctive 1st degree',
    'imperfect subjunctive': 'same time subjunctive 2nd degree',
    'perfect subjunctive': 'prior time subjunctive 1st degree',
    'pluperfect subjunctive': 'prior time subjunctive 2nd degree',
    //sequence
    'primary sequence': '1st degree',
    'secondary sequence': 'e2nd degre',
    //english verb tenses
    'preterite': 'past (once)',
    'pluperfect': 'had...', 
    'past continuous': 'was...-ing', 
    'future perfect': 'will have...-ed', 
    'present subjunctive': 'present subjunctive???', 
    'may tense': 'may...', 
    'might tense': 'might...', 
    'can tense': 'can...', 
    'could tense': 'could...', 
    'should tense': 'should...', 
    'would tense': 'would...', 
    'would tense continuous': 'would be...', 
    'would tense perfect': 'would have...'
}
