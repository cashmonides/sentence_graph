//we convert a time_mood_sequence to a universal tense
// e.g. simultaneous_subjunctive_secondary -> imperfect subjunctive
// e.g. prior_indicative_secondary -> imperfect indicative, perfect indicative, pluperfect indicative
// note that we will produce somethings like greek perfectindicative and aorist indicative
// this should behave as follows
//      every kernel generates a tense-mood-sequence bundle
//      every possible tense-mood-sequence bundle is 'caught' by the dictionary
//      we always get a match, if not, something has gone wrong

var time_mood_sequence_bundle_to_universal_tense = {
    'simultaneous indicative primary': [
        'present indicative'
    ],
    'subsequent indicative primary': [
        'future indicative',
        'future perfect indicative'
    ],
    'prior indicative secondary': [
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
    'simultaneous infinitive primary': [
        'present infinitive'
    ],
    'simultaneous infinitive secondary': [
        'present infinitive'
    ],
    'prior infinitive primary': [
        'perfect infinitive'
    ],
    'prior infinitive secondary': [
        'perfect infinitive'
    ],
    'subsequent infinitive primary': [
        'future infinitive'
    ],
    'subsequent infinitive secondary': [
        'future infinitive'
    ]
    
}



//DO WE NEED A STAGE HERE WHERE UNIVERSAL TENSE GETS CONVERTED TO A SPECIFIC ENGLISH TENSE?



//we can't just send a universal tense to english and get a translation formula
// e.g. 'perfect subjunctive' doesn't give us any info on how to translate into english
// so we send our time-mood-sequence bundle
// but we also send other information
//      verb regime (e.g. conditional)
//      construction  (e.g. apodosis_fmve)
// we are going to traverse this dictionary twice
//      once to produce the single form
//      a second time to produce the cartesian product to populate the drop downs


var translation_formulae_for_those_languages_which_require_them = {
    'english': {
        'relative': {
            'sequence.primary': {
                'time.simultaneous': 'verb',
                'time.prior': 'verbed-preterite',
                'time.subsequent': 'will verb'
            },
            'sequence.secondary': {
                'time.simultaneous': 'were verbing',
                'time.prior': 'had verbed',
                'time.subsequent': 'would verb'
            }
        },
        'conditional': {
            'construction.protasis_flv': 'should verb',
            'construction.apodosis_flv': 'would verb',
            'construction.protasis_fmv': 'verb',
            'construction.apodosis_fmv': 'will verb',
            // Do we want different translation formulas for fmve conditionals?
            'construction.protasis_fmve': 'verb (emphatic)',
            'construction.apodosis_fmve': 'will verb',
            'construction.protasis_present_ctf': 'were verbing',
            'construction.apodosis_present_ctf': 'would be verbing',
            'construction.protasis_past_ctf': 'had verbed',
            'construction.apodosis_past_ctf': 'would have verbed'
        },
        'purpose': {
            'sequence.primary': 'may verb',
            'sequence.secondary': 'might verb'
        },
        'independent subjunctive': {
            'construction.potential': {
                'sequence.primary': 'can verb',
                'sequence.secondary': 'could verb'
            }
        },
        'english subjunctive': 'verb no -s'
    }
}


//a more verbose but more data-centric approach
//one which takes a universal tense-mood composed with voice
// and the additional arguments of construction and sequence

var older_verbose_translation_formulae_for_those_languages_which_require_them = {
    'english': {
        'absolute': {
            'present indicative': {
                'active': 'verb',
                'passive': 'are verbed'
            },
            'imperfect indicative': {
                'active': {
                    'basic': 'verbed-preterite',
                    'advanced': 'were verbing'
                },
                'passive': {
                    'basic': 'were verbed',
                    'advanced': 'were being verbed'
                }
            },
            'future indicative': {
                'active': 'will verb',
                'passive': 'will be verbed'
            },
            'perfect indicative': {
                'active': {
                    'basic': 'verbed-preterite (once)',
                    'advanced': 'verbed-preterite'  
                },
                'passive': {
                    'basic': 'were verbed (once)',
                    'advanced': 'was verbed'  
                },
            },
            'pluperfect indicative': {
                'active': 'had verbed',
                'passive': 'had been verbed'
            },
            'future perfect indicative': {
                'active': 'will have verbed',
                'passive': 'will have been verbed'
            },
        },
        'relative': {
            'present subjunctive': {
                'active': 'verb',
                'passive': 'are verbed'
            },
            'imperfect subjunctive': {
                'active': 'were verbing',
                'passive': 'were being verbed'
            },
            'perfect subjunctive': {
                'active': 'verbed-preterite',
                'passive': 'were verbed'
            },
            'pluperfect subjunctive': {
                'active': 'had verbed',
                'passive': 'had been verbed'
            },
            'subsequent primary': {
                'active': 'will verb',
                'passive': 'will be verbed'
            },
            'subsequent secondary': {
                'active': 'would verb',
                'passive': 'would be verbed'
            }
        },
        'conditional': {
            'construction.protasis_flv': 'should verb',
            'construction.apodosis_flv': 'would verb',
            'construction.protasis_fmv': 'verb',
            'construction.apodosis_fmv': 'will verb',
            // Do we want different translation formulas for fmve conditionals?
            'construction.protasis_fmve': 'verb (emphatic)',
            'construction.apodosis_fmve': 'will verb',
            'construction.protasis_present_ctf': 'were verbing',
            'construction.apodosis_present_ctf': 'would be verbing',
            'construction.protasis_past_ctf': 'had verbed',
            'construction.apodosis_past_ctf': 'would have verbed'
        },
        'purpose': {
            'primary': 'may verb',
            'secondary': 'might verb'
        },
        'independent subjunctive': {
            'construction.potential': {
                'sequence.primary': 'can verb',
                'sequence.secondary': 'could verb'
            }
        },
        'english subjunctive': 'verb no -s'
    }
}


var verbose_translation_formulae_for_those_languages_which_require_them = {
    'english': {
        'absolute': {
            'present indicative active': 'verb',
            'present indicative passive': 'are verbed',
            'imperfect indicative active': {
                'basic': 'verbed-preterite',
                'advanced': 'were verbing'
                },
            'imperfect indicative passive': {
                'basic': 'were verbed',
                'advanced': 'were being verbed'
                },
            'future indicative active': 'will verb',
            'future indicative passive': 'will be verbed',
            'perfect indicative active': {
                'basic': 'verbed-preterite (once)',
                'advanced': 'verbed-preterite'
            },
            'perfect indicative passive': {
                'basic': 'were verbed (once)',
                'advanced': 'were verbed'
            },
            'pluperfect indicative active': 'had verbed',
            'pluperfect indicative passive': 'had been verbed',
            'future perfect indicative active': 'will have verbed',
            'future perfect indicative passive': 'will have been verbed',
        },
        'relative': {
            'present subjunctive active':'verb',
            'present subjunctive passive':'are verbed',
            'imperfect subjunctive active': 'were verbing',
            'imperfect subjunctive passive': 'were being verbed',
            'perfect subjunctive active': 'verbed-preterite',
            'perfect subjunctive passive': 'were verbed',
            'pluperfect subjunctive active': 'had verbed',
            'pluperfect subjunctive passive': 'had been verbed',
            'present subjunctive of the active periphrastic active': 'will verb',
            'imperfect subjunctive of the active periphrastic active': 'would verb'
        },
        'conditional': {
            'construction.protasis_flv active': 'should verb',
            'construction.protasis_flv passive': 'should be verbed',
            'construction.apodosis_flv active': 'would verb',
            'construction.apodosis_flv passive': 'would be verbed',
            'construction.protasis_fmv active': 'verb',
            'construction.protasis_fmv passive': 'are verbed',
            'construction.apodosis_fmv active': 'will verb',
            'construction.apodosis_fmv active': 'will be verbed',
            'construction.protasis_fmve active': 'verb (emphatic)',
            'construction.protasis_fmve passive': 'are verbed (emphatic)',
            'construction.apodosis_fmve active': 'will verb',
            'construction.apodosis_fmve passive': 'will be verbed',
            'construction.protasis_present_ctf active': 'were verbing',
            'construction.protasis_present_ctf passive': 'were being verbed',
            'construction.apodosis_present_ctf active': 'would be verbing',
            'construction.apodosis_present_ctf passive': 'would be being verbed', //maybe change to basic=would be verbed
            'construction.protasis_past_ctf active': 'had verbed',
            'construction.protasis_past_ctf passive': 'had been verbed',
            'construction.apodosis_past_ctf active': 'would have verbed',
            'construction.apodosis_past_ctf passive': 'would have been verbed'
        },
        'purpose': {
            'present subjunctive active': 'may verb',
            'present subjunctive passive': 'may be verbed',
            'imperfect subjunctive active': 'might verb',
            'imperfect subjunctive passive': 'might be verbed'
        },
        'independent subjunctive': {
            'construction.potential': {
                'present subjunctive active': 'can verb',
                'present subjunctive active': 'can be verbed',
                'imperfect subjunctive active': 'could verb',
                'imperfect subjunctive passive': 'could be verbed'
            }
        },
        'english subjunctive': 'verb no -s'
    }
}



// we need to do some final cleanup and deal with the horrid irregularities of English
// consulting person and number to change so we get 'he was verbing' instead of 'he were verbing'


var english_person_irregularities = {
	"1sg" : {
		"were" : "was",
		"are" : "am"
	},
	"3sg" : {
		"were" : "was",
		"are" : "is",
		//below accounts for everything & 'will have' stays 'will have'
		"have verbed" : "has verbed",
		"have been verbed" : "has been verbed",
		//add -s if 3sg
		"verb" : "verbs"   
	}
	
}




//for all languages:
// we also need to do some final scrubbing of how the drop downs are displayed
// based on the idea that basic students can't handle certain terms like pluperfect subjunctive
// and instead use prior time subjunctive 1st degree

var terminology_display_dictionary = {
    
    '1s': {
        'basic': 'I',
        'advanced': '1st sing.'
    },
    '2s': {
        'basic': 'you',
        'advanced': '2nd sing.'
    },
    '3s': {
        'basic': 'he',
        'advanced': '3rd sing.'
    },
    '1p': {
        'basic': 'we',
        'advanced': '1st plur.'
    },
    '2p': {
        'basic': 'y\'all',
        'advanced': '2nd plur.'
    },
    '3p': {
        'basic': 'they',
        'advanced': '3rd plur.'
    },
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


