/*
here (buried in maximal_english_tf_place) 
seems to some of Dan's notes that are the basis of a translation formula dictionary traverser

    //check red_herring_bool
    
	//if red_herring_booltrue, check if conjunction is in allowed conjunction 
	//if true, go down this path
	//once we've entered inside
	//check if voice is in allowed
	//if true go down the path
	//at each point check whatever is listed
	
	//if red_herring_bool is false, check CONJUNCTION ACTUALLY USED
	//if conjunction -> indicative
	//go down this path

*/



/*

A GENERAL OUTLINE OF HOW A TRANSLATION FORMULA DICTIONARY TRAVERSER MIGHT WORK

a time-mood-sequence bundle is produced by the kernel generator

returns a universal tense (or sometimes more than one)
    e.g. subsequent could return future or future perfect

(in case of getting more than one result, we check if one or the other is prohibited by indicative_tenses_allowed)

for each language the universal tense is converted to an actual tense

each actual tense is sent to the language's verb inflector

some languages just produce the tense

other languages need to consult a translation formula dictionary


that produces the individual form


we also need to produce all possibilities for the drop downs

we should be able to do that by just generating all possible time-mood-sequence bundles


*/











/*


STAGE 1 - kernel production and cataloguing of properties

we produce a universal tense in the kck level

we produce other properties that are necessary to get a trans. formula
    verb regime (absolute, relative, conditional, purpose, indep. subjunctive, english subjunctive (ind.command/fear))
    sequence
    time (simultaneous, prior, subsequent)

all of this gets bundled together


STAGE 2 conversion to english info
we're going to need a few pieces of information:
    - the english verb root we use (gerund carrying, past preterite carried, default carry, etc.)
    - the name of the english tense ('past continuous active')
    - the english translation formula (were verbing)
    - the grammartalk we use (simultaneous, secondary, prior)
    
STAGE 3 make the english




we send it to multiple places
    this gets converted to an english tense
    english_translation_formula --> would verb
    






*/


//questions?????

//what does this do?
var translation_formula_to_tense = {
    'english': function (translation_formula) {
        return english_grammatical_terminology_correspendence[
            translation_formula];
    },
    'latin': function (x) {
        return x;
    },
    'ssslatin': function (x) {
        return x;
    }
}

//how is this parsed? (from translation formulae)
// 'prior indicative secondary': [
//         'imperfect indicative',
//         ['perfect indicative', [
//             'greek perfect indicative',
//             'aorist indicative'
//         ]],
//         'pluperfect indicative'
//     ],






//GROUNDWORK 1: WE DIVIDE OUR LANGUAGES UP INTO CATEGORIES SO WE CAN ELIMINATE STEPS THAT DON'T APPLY


var languages_with_no_translation_formulae = {
    'latin': true,
    'ssslatin': true
}


// This map stores whether languages have moods.
// English's moods are so vestigial that we do not consider them
// to be true moods.
var has_mood = {
    'english': false,
    'latin': true,
    'ssslatin': true
}


//GROUNDWORK 2: SET UP OUR DEFAULTS

var default_regimes = {
    'english': 'absolute',
    'latin': 'indicative',
    'ssslatin': 'indicative'
}


//GROUNDWORK 3: establish the kernel properties that we will be using
var check_properties_from_allowed = [
    'time', 'universal_indicative_tenses_allowed', 'sequence', 'voice'
];



// STEP 1 generate a universal tense with extra properties
//todo fill in here: what exactly does the kernel maker produce?
/*
we pass in 4 arguments to the kernel constructor
    conjunction, direction, clause_acts_as, level

    we need to gather a few other facts
        construction: we set the construction based on the conjunction
        main_or_sub
        template

    

    
        
    by passing the template into the kernel we fix a lot of properties
        explicitness is the weighted choice from allowed
        voice is the weighted choice from allowed
        transitivity is more complicated
            //not sure how to express this exactly
            // first if block tries to prevent 2 things:
            // the first thing is if the subordinate clause acts as a noun
            // we must have a transitive verb
            // he walks why the lion is attacked
            // the second thing is if voice is passive we must have transitive
            // we don't want he was walked
            if (clause_acts_as === 'noun' || voice === 'passive') {
                transitivity = 'transitive';
            } 
            //we don't want transitive verbs without objects
            // e.g. he sends
            else if (clause_acts_as !== 'noun'
            && voice === 'active' && !noun_switch) {
                transitivity = 'intransitive';
            } 
            // this is the default case
            else {
                transitivity = weighted_choice(this_module.transitivity);
            }
        
        we also set the clause location (i.e. whether the subordinate clause acts as subject or object of the main verb)
            if clause acts as noun and is active, the clause location is subject
            if clause acts as noun and is passive, the clause location is object
        
        
        
        we push verb to the template
        we push subject, object, personal agent, to the template as appropriate (not implemented)
        
        
    the end result of this is we return a template
        return {
            'template': template,
            'voice': voice,
            'transitivity': transitivity,
            'clause_location': clause_location,
            'role_to_role_for_verb_restrictions':
            role_to_role_for_verb_restrictions
        }
    
    (((why don't we do anything with explicitness in this template)))))
        
        
    
     
    we now pass our modified information packet to a new Kernel constructor
        arguments: construction, main_or_sub, conjunction, direction, template
         
    so now our kernel has the following properties fixed
        voice
        transitivity
        explicitness
        
        
    our kernel has now been partially made but it's lacking some properties
        lexical, time, mood, clause type restrictions
        verb regime
    
    so we add those properties one by one
    
        //some properties are relatively simple, we just read them off the conjunction library
        
        
        // a simple one
        // We add any lexical restriction that may exist. 
        //e.g. mental verb only, verb of commanding
        kernel.add_lexical_restriction(conjunction, direction);
    
    
        // a simple one
        // We add the time restriction (it will be a dictionary
        // where the keys are languages, and should exist).
        // prior || simultaneous || subsequent
        kernel.add_time_restriction(conjunction, direction);
        
        // a simple one
        // We add the mood restriction (as above, it will be a dictionary
        // where the keys are languages, and should exist).
        kernel.add_mood_restriction(conjunction, direction);
        
        // a simple one
        // We add the clause type retriction. Any kernel is main,
        // independent subjunctive, subordinate,
        // or nonexistant (plus some possibilities for conditionals);
        // we call this its clause type.
        kernel.add_clause_type_restriction(conjunction, direction);
        
        
        //here's where things get complex
        //the tense override is easy
        // but where do we get the tf????
        // We give the kernel its tense overrides (and translation formulae).
        kernel.add_tense_overrides_and_tf(conjunction, direction);
        
        // a simple one
        // We give the kernel its regime.
        kernel.add_regime(conjunction, direction);
        // We return our just-constructed kernel.
        
    
    
    the kernel leaves certain properties unspecified
    instead leaving that to main.js 
    which manipulates the sentence object, which iterates through each kernel
        sets determined properties
        sets sequence
        sets random properties
        
    then main.js chooses the random lexemes
    
    
    then we inflect via inflect_all_components
        (this is where all the complexities of translation formulae rear their ugly heads)
    
        the path is like this:
            sentence.inflect_all_components
            calls
            kernel.inflect_all_components_in
                (the arguments are language and kck_level)
            this iterates through the role list and calls component.inflect(language, kck_level)
    
*/



//seems that the following takes a time-mood-sequence 
// and returns a universal tense

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
    'simultaneous infinitive primary': [
        'present infinitive'
    ]
    /*
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
    */
}

// STEP 2 determine english tense 
//this looks like it consults the different properties in the kernel
// simultaneous, subjunctive, primary etc.
// returns a name of a language-dependent tense 
// e.g. for english gives future perfect, could tense
//or for latin gives present subjunctive
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
        ],
        'simultaneous infinitive primary': [
            'present infinitive primary'
        ],
        'subsequent infinitive primary': [
            'future infinitive primary'
        ],
        'prior infinitive primary': [
            'perfect infinitive primary'
        ]
        /*
        'simultaneous infinitive secondary': [
            'present infinitive secondary'
        ],
        'subsequent infinitive secondary': [
            'future infinitive secondary'
        ],
        'prior infinitive secondary': [
            'perfect infinitive secondary'
        ]
        */
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

// STEP 3 determine english translation formula 
    //if we are in absolute regime we do one thing
    //if we are in another regime we consult our dictionary of translation formulae


// STEP 3a if absolute




//STEP 3b if relative
   
//below are the non-absolute translation formulae
var regime_to_translation_formula = {
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
            'construction.protasis_fmve': 'verb',
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



// STEP 4 determine english grammartalk
//todo desiderata: this dictionary should be traversable such that we can give
//parameters like basic and advanced


// the following seems to give a grammartalk tense name given a translation formula
//e.g. "would be verbing" returns 'would verb continuous'
//but beware! a note states: english_grammatical_terminology_correspendence appears unused (except for its keys)
var english_grammatical_terminology_correspendence = {
	"verb" : 'present',  //default present indicative
	"verb no -s" : "present subjunctive",	//fossilized english subjunctive that...
	"verbed-preterite" : "preterite", //preterite
	"were verbing" : "past continuous", // was "was verbing"
	"will verb" : "future",
	// "verbed" : "perfect",          // was "has verbed"
	"had verbed" : "pluperfect",
	"will have verbed" : "future perfect",
	'may verb': 'may tense',
	'might verb': 'might tense',
	'can verb': 'can tense',
	'could verb': 'could tense',
	'should verb': 'should tense',
	'would verb': 'would tense',
	'would be verbing': 'would tense continuous',
	'would have verbed': 'would tense perfect',
	"are verbed" : 'present',  //default present indicative
	"be verbed" : "present subjunctive",	//fossilized english subjunctive that...
	"were verbed" : "preterite", //preterite
	"were being verbed" : "past continuous", // was "was verbing"
	"will be verbed" : "future",
	// "verbed" : "perfect",          // was "has verbed"
	"had been verbed" : "pluperfect",
	"will have been verbed" : "future perfect",
	'may be verbed': 'may tense',
	'might be verbed': 'might tense',
	'can be verbed': 'can tense',
	'could be verbed': 'could tense',
	'should be verbed': 'should tense',
	'would be verbed': 'would tense',
	'would be being verbed': 'would tense continuous',
	'would have been verbed': 'would tense perfect'
}



// the following seems to go from translation formula to a dictionary of properties
// e.g. "were verbing": { "time": "prior", "sequence": "secondary","tense_and_mood": "past continuous"},
var master_features_from_tf_dictionary = {
    "english": {
        "absolute": {
            "verb": {
                "time": "simultaneous",
                "sequence": "primary",
                "tense_and_mood": "present"
            },
            "verbed-preterite": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "preterite"
            },
            "were verbing": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "past continuous"
            },
            "will verb": {
                "time": "subsequent",
                "sequence": "primary",
                "tense_and_mood": "future"
            },
            "had verbed": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "pluperfect"
            },
            "will have verbed": {
                "time": "subsequent",
                "sequence": "primary",
                "tense_and_mood": "future perfect"
            },
            "are verbed": {
                "time": "simultaneous",
                "sequence": "primary",
                "tense_and_mood": "present"
            },
            "be verbed": {
                "time": "simultaneous",
                "sequence": "primary",
                "tense_and_mood": "present subjunctive"
            },
            "were verbed": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "preterite"
            },
            "were being verbed": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "past continuous"
            },
            "will be verbed": {
                "time": "subsequent",
                "sequence": "primary",
                "tense_and_mood": "future"
            },
            "had been verbed": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "pluperfect"
            },
            "will have been verbed": {
                "time": "subsequent",
                "sequence": "primary",
                "tense_and_mood": "future perfect"
            }
        },
        "relative": {
            "verb": {
                "time": "simultaneous",
                "sequence": "primary",
                "tense_and_mood": "present"
            },
            "verbed-preterite": {
                "time": "prior",
                "sequence": "primary",
                "tense_and_mood": "preterite"
            },
            "will verb": {
                "time": "subsequent",
                "sequence": "primary",
                "tense_and_mood": "future"
            },
            "were verbing": {
                "time": "simultaneous",
                "sequence": "secondary",
                "tense_and_mood": "past continuous"
            },
            "had verbed": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "pluperfect"
            },
            "would verb": {
                "time": "subsequent",
                "sequence": "primary",
                "tense_and_mood": "would tense"
            },
            "are verbed": {
                "time": "simultaneous",
                "sequence": "primary",
                "tense_and_mood": "present"
            },
            "were verbed": {
                "time": "prior",
                "sequence": "primary",
                "tense_and_mood": "preterite"
            },
            "will be verbed": {
                "time": "subsequent",
                "sequence": "primary",
                "tense_and_mood": "future"
            },
            "were being verbed": {
                "time": "simultaneous",
                "sequence": "secondary",
                "tense_and_mood": "past continuous"
            },
            "had been verbed": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "pluperfect"
            },
            "would be verbed": {
                "time": "prior",
                "sequence": "secondary",
                "tense_and_mood": "would tense"
            }
        },
        "conditional": {
            "should verb": {
                "time": "conditional future less vivid",
                "sequence": "primary",
                "tense_and_mood": "should tense"
            },
            "would verb": {
                "time": "conditional future less vivid",
                "sequence": "primary",
                "tense_and_mood": "would tense"
            },
            "verb": {
                "time": "conditional future more vivid",
                "sequence": "primary",
                "tense_and_mood": "present"
            },
            "will verb": {
                "time": "conditional future more vivid",
                "sequence": "primary",
                "tense_and_mood": "future"
            },
            "were verbing": {
                "time": "conditional present ctf",
                "sequence": "secondary",
                "tense_and_mood": "past continuous"
            },
            "would be verbing": {
                "time": "conditional present ctf",
                "sequence": "secondary",
                "tense_and_mood": "would tense continuous"
            },
            "had verbed": {
                "time": "conditional past ctf",
                "sequence": "secondary",
                "tense_and_mood": "pluperfect"
            },
            "would have verbed": {
                "time": "conditional past ctf",
                "sequence": "secondary",
                "tense_and_mood": "would tense perfect"
            },
            "should be verbed": {
                "time": "conditional future less vivid",
                "sequence": "primary",
                "tense_and_mood": "should tense"
            },
            "would be verbed": {
                "time": "conditional future less vivid",
                "sequence": "primary",
                "tense_and_mood": "would tense"
            },
            "are verbed": {
                "time": "conditional future more vivid",
                "sequence": "primary",
                "tense_and_mood": "present"
            },
            "will be verbed": {
                "time": "conditional future more vivid",
                "sequence": "primary",
                "tense_and_mood": "future"
            },
            "were being verbed": {
                "time": "conditional present ctf",
                "sequence": "secondary",
                "tense_and_mood": "past continuous"
            },
            "would be being verbed": {
                "time": "conditional present ctf",
                "sequence": "secondary",
                "tense_and_mood": "would tense continuous"
            },
            "had been verbed": {
                "time": "conditional past ctf",
                "sequence": "secondary",
                "tense_and_mood": "pluperfect"
            },
            "would have been verbed": {
                "time": "conditional past ctf",
                "sequence": "secondary",
                "tense_and_mood": "would tense perfect"
            }
        },
        "english subjunctive": {
            "verb no -s": {
                "time": "simultaneous",
                "sequence": "primary",
                "tense_and_mood": "present subjunctive"
            },
            "be verbed": {
                "time": "simultaneous",
                "sequence": "primary",
                "tense_and_mood": "present subjunctive"
            }
        },
        "purpose": {
            "may verb": {
                "time": "may time",
                "sequence": "primary",
                "tense_and_mood": "may tense"
            },
            "might verb": {
                "time": "might time",
                "sequence": "secondary",
                "tense_and_mood": "might tense"
            },
            "may be verbed": {
                "time": "may time",
                "sequence": "primary",
                "tense_and_mood": "may tense"
            },
            "might be verbed": {
                "time": "might time",
                "sequence": "primary",
                "tense_and_mood": "might tense"
            }
        },
        "independent subjunctive": {
            "can verb": {
                "time": "can time",
                "sequence": "primary",
                "tense_and_mood": "can tense"
            },
            "could verb": {
                "time": "could time",
                "sequence": "secondary",
                "tense_and_mood": "could tense"
            },
            "can be verbed": {
                "time": "can time",
                "sequence": "primary",
                "tense_and_mood": "can tense"
            },
            "could be verbed": {
                "time": "could time",
                "sequence": "secondary",
                "tense_and_mood": "could tense"
            }
        }
    },
    "latin": {
        "indicative": {
            "present indicative active": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "present indicative passive": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "imperfect indicative active": {
                "time": "prior",
                "sequence": "secondary"
            },
            "imperfect indicative passive": {
                "time": "prior",
                "sequence": "secondary"
            },
            "future indicative active": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "future indicative passive": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "perfect indicative active": {
                "time": "prior",
                "sequence": "secondary"
            },
            "perfect indicative passive": {
                "time": "prior",
                "sequence": "secondary"
            },
            "pluperfect indicative active": {
                "time": "prior",
                "sequence": "secondary"
            },
            "pluperfect indicative passive": {
                "time": "prior",
                "sequence": "secondary"
            },
            "future perfect indicative active": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "future perfect indicative passive": {
                "time": "subsequent",
                "sequence": "primary"
            }
        },
        "subjunctive": {
            "present subjunctive active": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "present subjunctive passive": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "imperfect subjunctive active": {
                "time": "simultaneous",
                "sequence": "secondary"
            },
            "imperfect subjunctive passive": {
                "time": "simultaneous",
                "sequence": "secondary"
            },
            "perfect subjunctive active": {
                "time": "prior",
                "sequence": "primary"
            },
            "perfect subjunctive passive": {
                "time": "prior",
                "sequence": "primary"
            },
            "pluperfect subjunctive active": {
                "time": "prior",
                "sequence": "secondary"
            },
            "pluperfect subjunctive passive": {
                "time": "prior",
                "sequence": "secondary"
            },
            "present subjunctive of the active periphrastic": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "imperfect subjunctive of the active periphrastic": {
                "time": "subsequent",
                "sequence": "secondary"
            }
        },
        "conditional": {
            "present indicative active": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "present indicative passive": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "future indicative active": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "future indicative passive": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "future perfect indicative active": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "future perfect indicative passive": {
                "time": "subsequent",
                "sequence": "primary"
            },
            "present subjunctive active": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "present subjunctive passive": {
                "time": "simultaneous",
                "sequence": "primary"
            },
            "imperfect subjunctive active": {
                "time": "simultaneous",
                "sequence": "secondary"
            },
            "imperfect subjunctive passive": {
                "time": "simultaneous",
                "sequence": "secondary"
            },
            "pluperfect subjunctive active": {
                "time": "prior",
                "sequence": "secondary"
            },
            "pluperfect subjunctive passive": {
                "time": "prior",
                "sequence": "secondary"
            }
        },
        "infinitive": {
            "present infinitive active": {
                "time": "simultaneous",
                "sequence": "xxx"
            },
            "present infinitive passive": {
                "time": "simultaneous",
                "sequence": "xxx"
            },
            "perfect infinitive active": {
                "time": "prior",
                "sequence": "xxx"
            },
            "perfect infinitive passive": {
                "time": "prior",
                "sequence": "xxx"
            }
        }
    }
}


// STEP 5 determine verb root we use

var english_verb_formula_to_root = {
	"verbed" : "past participle",
	"verbing" : "gerund",
	"verbed-preterite": "preterite",
	"verbs" : "final-s",
	"verb" : "default"
}



// STEP 6 produce english form


//STEP 10 (or some later step)
// english has a bunch of rules about was, were, is, are, etc.
//a set of rules to be sensitive to english variation dependent on person
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





//STEP 20  determine the actual grammartalk terms we display in our dropdowns
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









//more or less understood above
//////////////////////////////////////////////////////////////////


//stuff below that should probably be turned into data and centralized





// note says: Commented out for now, going to be used in the future.
// note says: map between teacher friendly blanket terms and english grammatical terminology
var english_grammatical_terminology_correspendence = {
	"verb" : 'present',  //default present indicative
	"verb no -s" : "present subjunctive",	//fossilized english subjunctive that...
	"verbed-preterite" : "preterite", //preterite
	"were verbing" : "past continuous", // was "was verbing"
	"will verb" : "future",
	// "verbed" : "perfect",          // was "has verbed"
	"had verbed" : "pluperfect",
	"will have verbed" : "future perfect",
	'may verb': 'may tense',
	'might verb': 'might tense',
	'can verb': 'can tense',
	'could verb': 'could tense',
	'should verb': 'should tense',
	'would verb': 'would tense',
	'would be verbing': 'would tense continuous',
	'would have verbed': 'would tense perfect',
	"are verbed" : 'present',  //default present indicative
	"be verbed" : "present subjunctive",	//fossilized english subjunctive that...
	"were verbed" : "preterite", //preterite
	"were being verbed" : "past continuous", // was "was verbing"
	"will be verbed" : "future",
	// "verbed" : "perfect",          // was "has verbed"
	"had been verbed" : "pluperfect",
	"will have been verbed" : "future perfect",
	'may be verbed': 'may tense',
	'might be verbed': 'might tense',
	'can be verbed': 'can tense',
	'could be verbed': 'could tense',
	'should be verbed': 'should tense',
	'would be verbed': 'would tense',
	'would be being verbed': 'would tense continuous',
	'would have been verbed': 'would tense perfect'
}


var maximal_english_tf_space = {
	//check red_herring_bool
	//if true, check if conjunction is in allowed conjunction 
	//if true, go down this path
	//once we've entered inside
	//check if voice is in allowed
	//if true go down the path
	//at each point check whatever is listed
	
	//if false, check CONJUNCTION ACTUALLY USED
	//if conjunction -> indicative
	//go down this path
	
	
	// 'conjunction.used.mood_restriction'
	
	// 'conjunctions that use the indicative in the specified direction'
	
	
	
	// 'conjunctions that use the subjunctive || infinitive in the specified direction && are subordinate'

	// 'conjunctions that are purpose clause on the right'	
	
	
	
	
	'regime.absolute': {
		// check ALLOWED
		// if voice.active, go down this path
		'voice.active' : {
			// default, normal, indicative
			//information comes from ALLOWED
			'verb': ['time.simultaneous'],
			'verbed-preterite': ['time.prior || tf_level.basic'],
			'will verb': ['time.subsequent'],
			
			//advanced tenses in normal clauses, indicative
			//information comes from ALLOWED
			'had verbed': ['universal_indicative_tenses_allowed.pluperfect indicative'],
			'will have verbed': ['universal_indicative_tenses_allowed.future perfect indicative'],
			'were verbing': ['universal_indicative_tenses_allowed.imperfect indicative', 'tf_level.advanced'],
			//'has/have verbed': ['perfect-in-primary-sequence']
		}, 
		'voice.passive' : {
			// default, normal, indicative
			//information comes from ALLOWED
			'are verbed': ['time.simultaneous'],
			'were verbed': ['time.prior || tf_level.basic'],
			'will be verbed': ['time.subsequent'],
			
			//advanced tenses in normal clauses, indicative
			//information comes from ALLOWED
			'had been verbed': ['universal_indicative_tenses_allowed.pluperfect indicative'],
			'will have been verbed': ['universal_indicative_tenses_allowed.future perfect indicative'],
			'were being verbed': ['universal_indicative_tenses_allowed.imperfect indicative', 'tf_level.advanced'],
			//'has/have been verbed': ['perfect-in-primary-sequence']
		}
	},
	//information comes from CONJUNCTION actually chosen + red_herring_bool
	'regime.relative' : {
		'voice.active' : {
			'verb': ['time.simultaneous', 'sequence.primary'],
			'verbed-preterite': ['time.prior', 'sequence.primary'],
			'will verb': ['time.subsequent', 'sequence.primary'],
			'were verbing': ['time.simultaneous', 'sequence.secondary'],
			'had verbed': ['time.prior', 'sequence.secondary'],
			'would verb': ['time.subsequent', 'sequence.secondary'],
		},
		'voice.passive' : {
			'are verbed': ['time.simultaneous', 'sequence.primary'],
			'were verbed': ['time.prior', 'sequence.primary'],
			'will be verbed': ['time.subsequent', 'sequence.primary'],
			'were being verbed': ['time.simultaneous', 'sequence.secondary'],
			'had been verbed': ['time.prior', 'sequence.secondary'],
			'would be verbed': ['time.subsequent', 'sequence.secondary'],
		}
	
	},
	'regime.conditional' : {
		'voice.active' : {
			'should verb': ['construction.protasis_flv'],
			'would verb': ['construction.apodosis_flv'],
			'verb': ['construction.protasis_fmv || construction.protasis_fmve'],
			'will verb': ['construction.apodosis_fmv || construction.apodosis_fmve'],
			'were verbing': ['construction.protasis_present_ctf'], //was 1sg & 3sg
			'would be verbing': ['construction.apodosis_present_ctf'],
			'had verbed': ['construction.protasis_past_ctf'], 
			'would have verbed': ['construction.apodosis_past_ctf']
		}, 
		'voice.passive' : {
			'should be verbed': ['construction.protasis_flv'],
			'would be verbed': ['construction.apodosis_flv'],
			'are verbed': ['construction.protasis_fmv || construction.protasis_fmve'],
			'will be verbed': ['construction.apodosis_fmv || construction.apodosis_fmve'],
			'were being verbed': ['construction.protasis_present_ctf'], //was 1sg & 3sg
			'would be being verbed': ['construction.apodosis_present_ctf'],
			'had been verbed': ['construction.protasis_past_ctf'], 
			'would have been verbed': ['construction.apodosis_past_ctf']
		}
	},
	'regime.purpose' : {
		'voice.active' : {
			'may verb' : ['sequence.primary'],
			'might verb' : ['sequence.secondary']
		},
		'voice.passive' : {
			'may be verbed' : ['sequence.primary'],
			'might be verbed' : ['sequence.secondary']
		}
	},
	'regime.independent subjunctive' : {
		'voice.active' : {
			'can verb' : ['sequence.primary'],
			'could verb' : ['sequence.secondary']
		},
		'voice.passive' : {
			'can be verbed' : ['sequence.primary'],
			'could be verbed' : ['sequence.secondary']
		}
	},
	'regime.english subjunctive' : {
		'voice.active' : {
			'verb no -s' : ['sequence.primary || sequence.secondary']
		},
		'voice.passive' : {
			'be verbed' : ['sequence.primary || sequence.secondary']
		}
	}
}


// trans. form. compatibility list
var translation_formula_compatibility_dictionary = {
    'english': {
        'absolute': {
            'absolute-relative-split?': [
                ['absolute', 'purpose', 'independent subjunctive',
                'english subjunctive'],
                ['absolute', 'relative', 'purpose', 'independent subjunctive',
                'english subjunctive']
            ]
        },
        'relative': {
            'absolute-relative-split?': [
                ['relative', 'purpose', 'independent subjunctive',
                'english subjunctive'],
                ['absolute', 'relative', 'purpose', 'independent subjunctive',
                'english subjunctive']
            ]
        },
        'purpose, independent subjunctive, english subjunctive': {
            'absolute-relative-split?': [
                ['absolute', 'purpose', 'independent subjunctive',
                'english subjunctive'],
                ['absolute', 'relative', 'purpose', 'independent subjunctive',
                'english subjunctive']
            ]
        },
        'conditional': ['conditional']
    },
    'latin': 'all',
    'ssslatin': 'all'
}

// AS notes below
// properties are the properties that appear on the drop-down path (tense, person, etc)
// in some constructions those properties are irrelevant or non-applicable or confusing
// e.g. conditionals have sequence but are irrelevant
// e.g. independent
var properties_to_leave_out = {
    'english': {
        'absolute': {},
        'relative': {},
        'purpose': {},
        'independent subjunctive': {
            'time': true,
            'tense_and_mood': true
        },
        'english subjunctive': {
            'time': true,
            'tense_and_mood': true
        },
        'conditional': {
            'time': true,
            'tense_and_mood': true
        }
    },
    'latin': {
        'indicative': {},
        'subjunctive': {},
        'conditional': {
            'time': true
        },
        'infinitive': {}
    },
    'ssslatin': {
        'indicative': {},
        'subjunctive': {},
        'conditional': {
            'time': true
        },
        'infinitive': {}
    },
}









////////////////////////////////////////////////////////////////////
//processed below


//below is intended to give all the exceptional translation formulae triggered
// by things such as conditionals, purpose clauses, relative regime
var english_translation_formula = {
    'absolute': {
        //should we just put something here so that it's all centralized??
    },
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
        'construction.protasis_fmve': 'verb',
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



// a note states: english_grammatical_terminology_correspendence appears unused (except for its keys)
var english_grammatical_terminology_correspendence = {
	"verb" : 'present',  //default present indicative
	"verb no -s" : "present subjunctive",	//fossilized english subjunctive that...
	"verbed-preterite" : "preterite", //preterite
	"were verbing" : "past continuous", // was "was verbing"
	"will verb" : "future",
	// "verbed" : "perfect",          // was "has verbed"
	"had verbed" : "pluperfect",
	"will have verbed" : "future perfect",
	'may verb': 'may tense',
	'might verb': 'might tense',
	'can verb': 'can tense',
	'could verb': 'could tense',
	'should verb': 'should tense',
	'would verb': 'would tense',
	'would be verbing': 'would tense continuous',
	'would have verbed': 'would tense perfect',
	"are verbed" : 'present',  //default present indicative
	"be verbed" : "present subjunctive",	//fossilized english subjunctive that...
	"were verbed" : "preterite", //preterite
	"were being verbed" : "past continuous", // was "was verbing"
	"will be verbed" : "future",
	// "verbed" : "perfect",          // was "has verbed"
	"had been verbed" : "pluperfect",
	"will have been verbed" : "future perfect",
	'may be verbed': 'may tense',
	'might be verbed': 'might tense',
	'can be verbed': 'can tense',
	'could be verbed': 'could tense',
	'should be verbed': 'should tense',
	'would be verbed': 'would tense',
	'would be being verbed': 'would tense continuous',
	'would have been verbed': 'would tense perfect'
}








//this looks like it consults the different properties in the kernel
// simultaneous, subjunctive, primary etc.
// returns a name of a language-dependent tense 
// e.g. for english gives future perfect, could tense
//or for latin gives present subjunctive
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
        ],
        'simultaneous infinitive primary': [
            'present infinitive primary'
        ],
        'subsequent infinitive primary': [
            'future infinitive primary'
        ],
        'prior infinitive primary': [
            'perfect infinitive primary'
        ]
        /*
        'simultaneous infinitive secondary': [
            'present infinitive secondary'
        ],
        'subsequent infinitive secondary': [
            'future infinitive secondary'
        ],
        'prior infinitive secondary': [
            'perfect infinitive secondary'
        ]
        */
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


//seems to be: key is backstage meta-description of a verb
// value is: list of universal tense names that match
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
    'simultaneous infinitive primary': [
        'present infinitive'
    ]
    /*
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
    */
}







