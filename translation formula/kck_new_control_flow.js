//SUMMARY
/*
- below is a data-driven dictionary-traverser-based approach to kck control flow
- the goals are:
    - most moving parts are encapsulated in data dictionaries, not functions
    - the functions themselves are mostly uniform and relatively agnostic towards language-specific data

- there seems to be four basic functions
    - TRAVERSAL 
        (get everything that matches a list of input terms)
        (this seems like a basic dictionary lookup)
        (the input terms can be varied including arbitrary terms like basic, 4th grade, etc.)
    - FILTER
        (exclude everything that doesn't match a value)
        (e.g. exclude all secondary sequnces)
    - BUNDLE/MERGE
        (mutate each inputted value)
        (e.g. add voice to a list of tensemoods)
    - RANDOM CHOICE
        (pick one from a list)
    
    
- TRAVERSAL takes a list of arguments, traverses the dictionary and returns terminal strings that match the arguments
    (e.g. we input [present-indicative-active , imperfect-indicative-active] & we want translation formula
        and we return ["VERBs", "was VERBing"])
        
- FILTER (I guess) removes items from an argument based on the map it consults
    (e.g. if we have a long list of tense-mood-voices that are allowed but only primary sequence is allowed
        then we consult a map and throw out all the tense-mood-voices that don't match primary sequence)

- RANDOM CHOICE
    (e.g. we have a list of allowed tense-mood-voices and we want to pick one of them 
        for final output)
    (basically is just traversal with only one output not a list)
        



- there is a lot of bundling of information as it progresses
    - starts as conjunction
    - picks up regime
    - regime gets bundled with tense mood
    - voice gets added 
        (based on allowed voice in module
        & perhaps semantic nonsense filters e.g. we reject "he was spoken")
    - person number is bundled separately
        (perhaps sent through a filter based on lexicon and semantics
         e.g. we reject 1st and 2nd persons that must be inanimate if such things ever exist)
        
- at the end of bundling we send a two item piece of data
    - regime-tense-mood-voice, person-number

- this is either a list of all options for cartesian,
  or a single piece for an actual selection
    
*/

//DETERMINE ORDER OF DICTIONARIES THAT WE CONSULT
// Since we're chaining together a few functions in the same order,
// we might as well encapsulate the process in a hard-coded data

//now it's a map for easy organization, but eventually will become a list probably

var order_of_maps_to_apply = {
    // traversal
    '1': 'conjunction_to_regime_map',
    // traversal
    '1.5': 'regime_to_tense_mood_map',
    // bundle together regime tense mood
    '1.75': 'some_bundling_function',
    // filter
    '2': 'regime_tense_mood_to_sequence_map',
    // bundle with allowed person_number
    '3': 'allowed_person_number_from_module', 
    // traversal for translation formula
    '4': 'regime_tense_mood_voice_to_translation_formula_map',
    // final clean up for english irregularities
};


// another option would be to add more structure to this sequence
//give the order when they're consulted and what arguments they take
var kck_maps_to_apply = {
    '1': {
        'map_to_traverse': 'conjunction_to_regime_tense_mood',
        'arguments': 'allowed_conjunctions'
    },
    '2': {
        'map_to_traverse': 'regime_tense_mood_to_sequence_map',
        'arguments': 'allowed sequences'
    }
    //etc.
};



///////THE PROCESS BELOW

//WE PICK A CONJUNCTION FROM ALLOWED CONJUNCTIONS IN MODULE
// e.g. cur

//WE PICK A SIDE TO MAKE
// e.g. cur - right

//WE TRAVERSE TO FIND REGIMES
// e.g. cur - right - relative 
var conjunction_to_regime = {
    c_null: {
        //version 1
        'left': 'absolute',
        'right': null
    },
    c_null_potential_subjunctive: {
        'left': 'potential subjunctive',
        'right': null
    },
    c_and: {
        //eventually we should prevent this kind of clause from having imperatives on oneside but not the other
        'left': 'absolute',
        'right': 'absolute'
    },
    c_but: {
        //eventually we should prevent this kind of clause from having imperatives on oneside but not the other
        'left': 'absolute',
        'right':'absolute'
    },
    c_or: {
        //eventually we should prevent this kind of clause from having imperatives on oneside but not the other
        'left': 'absolute',
        'right':'absolute'
    },
    c_when: {
        'left': 'absolute',
        // todo right side cannot have imperative
        'right':'absolute'
    },
    c_purpose: {
        'left': 'absolute',
        'right': 'purpose'
        
    }, 
    c_indirect_command: {
        'left': 'absolute',
        'right': 'indirect command'
    },
    c_fear: {
        'left': 'absolute',
        'right': 'fear'
    },
    c_cum_when: {
        'left': 'absolute',
        // todo right side cannot have imperative
        'right':'absolute'
    },
    c_cum_because: {
        'left': 'absolute',
        'right':'relative'
    },
    c_cum_circumstantial: {
        'left': 'absolute',
        'right':'relative'
    },
    c_cum_concessive: {
        'left': 'absolute',
        'right':'relative'
    },
    c_because_allegedly: {
        'left': 'absolute',
        'right':'relative'
    },
    c_why: {
        'left': 'absolute',
        'right':'relative'
    },
    c_indirect_statement: {
        'left': 'absolute',
        'right':'indirect statement' 
    },
    c_if_fmv: {
        'left': 'conditional protasis_fmv',
        'right': 'conditional apodosis_fmv',
    },
    c_if_flv: {
        'left': 'conditional protasis_flv',
        'right': 'conditional apodosis_flv',
    },
    c_if_fmve: {
        'left': 'conditional protasis_fmve',
        'right': 'conditional apodosis_fmve',
    },
    c_if_present_ctf: {
        'left': 'conditional protasis_present_ctf',
        'right': 'conditional apodosis_present_ctf',
    },
    c_if_past_ctf: {
        'left': 'conditional protasis_past_ctf',
        'right': 'conditional apodosis_past_ctf',
    },
    c_if_mixed_ctf: {
        'left': 'conditional protasis_mixed_ctf',
        'right': 'conditional apodosis_mixed_ctf',
    }
};


// WE TAKE REGIME AND BUNDLE IT TOGETHER WITH A TENSE MOOD
// e.g. relative produces [pres. subj., imperf. subj., perf. subj., pluperf subj. etc]
// we bundle to get cur - right - [relative pres. subj., relative imperf. subj., relative perf. subj., relative pluperf subj. etc]
var regime_to_tense_mood = {
    'absolute': ['present indicative', 'imperfect indicative', 'future indicative', 
                'perfect indicative','pluperfect indicative', 'future perfect indicative', 
                'imperative'],
    'relative': ['present subjunctive', 'imperfect subjunctive', 
                'perfect subjunctive', 'pluperfect subjunctive', 
                'present subjunctive of the active periphrastic', 
                'imperfect subjunctive of the active periphrastic'],
    'potential subjunctive': ['present subjuntive', 'perfect subjunctive'],
    'purpose': ['present subjunctive', 'imperfect subjunctive'],
    'indirect command': ['present subjunctive', 'imperfect subjunctive'],
    'fear': ['present subjunctive', 'imperfect subjunctive'],
    'indirect statement': ['present infinitive', 'perfect infinitive', 'future infinitive'],
    'conditional protasis_fmv': ['future indicative'],
    'conditional apodosis_fmv': ['future indicative'],
    'conditional protasis_flv': ['present subjunctive'],
    'conditional apodosis_flv': ['present subjunctive'],
    'conditional protasis_fmve': ['future perfect indicative'],
    'conditional apodosis_fmve': ['future indicative'],
    'conditional protasis_present_ctf': ['imperfect subjunctive'],
    'conditional apodosis_present_ctf': ['imperfect subjunctive'],
    'conditional protasis_past_ctf': ['pluperfect subjunctive'],
    'conditional apodosis_past_ctf': ['pluperfect subjunctive'],
    'conditional protasis_mixed_ctf': ['pluperfect subjunctive'],
    'conditional apodosis_mixed_ctf': ['imperfect subjunctive']
};



// WE FILTER OUT SEQUENCES THAT ARE NOT ALLOWED
// e.g. we only allow secondary so we get:
// cur - right - [relative pres. subj., relative perf. subj. etc]



// but we only apply the sequence filter to a few regimes
    // but we have to be careful here
    // in indirect statement it will have no effect except on the left hand side
var regimes_that_sequence_filter_applies_to = ['relative', 'purpose', 'indirect command','fear','indirect statement']



// one note: when picking a regular simple sentence (absolute) we ignore sequence
// instead we just check for allowed tense-mood-voices in module
// but of course when we have a complex sentence where sequence matters, we need to match left and right sequences
var regime_tense_mood_to_sequence = {
	// absolute
	// usually we won't check for sequence
	//indicatives & imperative
	'absolute present indicative': 'primary',
	'absolute imperfect indicative': 'secondary',
	'absolute future indicative': 'primary',
	'absolute perfect indicative': {
	    'default': 'secondary',
		'basic': 'secondary',
		'advanced': 'primary/secondary'
	},
	'absolute pluperfect indicative': 'secondary',
	'absolute future perfect indicative': 'primary',
	'absolute imperative': 'primary',
	
	
	//subjunctives
	'relative present subjunctive': 'primary',
	'relative imperfect subjunctive': 'secondary',
    'relative perfect subjunctive': 'primary',
    'relative pluperfect subjunctive': 'secondary',
    
    
    //periphrastic indicatives
    'absolute present indicative of the active periphrastic': 'primary',
    'absolute imperfect indicative of the active periphrastic': 'secondary',
    'absolute perfect indicative of the active periphrastic': 'primary',
    'absolute pluperfect indicative of the active periphrastic': 'secondary',
    
    //periphrastic subjunctives
    'relative present subjunctive of the active periphrastic': 'primary',
    'relative imperfect subjunctive of the active periphrastic': 'secondary',
    'relative perfect subjunctive of the active periphrastic': 'primary',
    'relative pluperfect subjunctive of the active periphrastic': 'secondary',
    
    
    //infinitives
    'relative present infinitive': ['primary','secondary'],
    'relative perfect infinitive': ['primary','secondary'],
    'relative future infinitive': ['primary','secondary'],
    
    
    //purpose
    'purpose present subjunctive': 'primary',
	'purpose imperfect subjunctive': 'secondary',
    'purpose perfect subjunctive': 'primary',
    'purpose pluperfect subjunctive': 'secondary',
    
    //fear
    'fear present subjunctive': 'primary',
	'fear imperfect subjunctive': 'secondary',
    'fear perfect subjunctive': 'primary',
    'fear pluperfect subjunctive': 'secondary',
    
    //indirect command
    'indirect command present subjunctive': 'primary',
	'indirect command imperfect subjunctive': 'secondary',
    'indirect command perfect subjunctive': 'primary',
    'indirect command pluperfect subjunctive': 'secondary',
    
    //conditionals
    //(conditionals ignore sequence, the conditional formula should override all choice of sequence)
    'conditional protasis_fmv future indicative': ['primary','secondary'],
    'conditional apodosis_fmv future indicative': ['primary','secondary'],
    'conditional protasis_flv present subjunctive': ['primary','secondary'],
    'conditional apodosis_flv present subjunctive': ['primary','secondary'],
    'conditional protasis_fmve future perfect indicative': ['primary','secondary'],
    'conditional apodosis_fmve future indicative': ['primary','secondary'],
    'conditional protasis_present_ctf imperfect subjunctive': ['primary','secondary'],
    'conditional apodosis_present_ctf imperfect subjunctive': ['primary','secondary'],
    'conditional protasis_past_ctf pluperfect subjunctive': ['primary','secondary'],
    'conditional apodosis_past_ctf pluperfect subjunctive': ['primary','secondary'],
    'conditional protasis_mixed_ctf pluperfect subjunctive': ['primary','secondary'],
    'conditional apodosis_mixed_ctf imperfect subjunctive': ['primary','secondary']
	
};





// 
// BUNDLE-FILTER RTMV
// different kind of filtration: if you're in list 1 and list 2 you get to go into the returned list
//return list of allwed rtmv
// flter_by_rtmv([regime-tense-mood], [allowed-regime-tense_mood_voices]) --> [regime-tense-mood-voice]

//no set dictionary for this - more like a set function
// but it would look something like this
//module gives us [allowed tense_mood_voices] = 
// ['present indicative active', 'present indicative passive', 'imperfect indicative active', 'imperfect indicative passive']
// we have already  upstream determined our [regime-tense-mood] = 
// ['absolute present indicative', 'absolute imperfect indicative', 'absolute future indicative']
//we merge together so we get as a return:
// ['absolute present indicative active', 'absolute present indicative passive', 'absolute imperfect indicative active', 'absolute imperfect indicative passive']




// BUNDLE RTMV WITH ALLOWED PERSON_NUMBERs TO PRODUCE [[RTMV], [PN]]
// from module we get list of allowed person_number
// add_person_number([regime-tense-mood-voice], [allowed person_numbers) --> [[regime-tense-mood-voice], [person_number]]
//straight read off the module, meld it into a list of lists





// note: we need to send sequence into this map for only one case (indirect statement)
var regime_tense_mood_voice_to_translation_formula = {
    ////asbolute
    'absolute present indicative active': 'verb',
    'absolute present indicative passive': 'are verbed',
    'absolute imperfect indicative active': {
        'basic': 'verbed-preterite',
        'advanced': 'were verbing'
        },
    'absolute imperfect indicative passive': {
        'basic': 'were verbed',
        'advanced': 'were being verbed'
        },
    'absolute future indicative active': 'will verb',
    'absolute future indicative passive': 'will be verbed',
    'absolute perfect indicative active': {
        'basic': 'verbed-preterite (once)',
        'advanced': 'verbed-preterite'
    },
    'absolute perfect indicative passive': {
        'basic': 'were verbed (once)',
        'advanced': 'were verbed'
    },
    'absolute pluperfect indicative active': 'had verbed',
    'absolute pluperfect indicative passive': 'had been verbed',
    'absolute future perfect indicative active': 'will have verbed',
    'absolute future perfect indicative passive': 'will have been verbed',
    
    ////relative
    'relative present subjunctive active':'verb',
    'relative present subjunctive passive':'are verbed',
    'relative imperfect subjunctive active': 'were verbing',
    'relative imperfect subjunctive passive': 'were being verbed',
    'relative perfect subjunctive active': 'verbed-preterite',
    'relative perfect subjunctive passive': 'were verbed',
    'relative pluperfect subjunctive active': 'had verbed',
    'relative pluperfect subjunctive passive': 'had been verbed',
    'relative present subjunctive of the active periphrastic active': 'will verb',
    'relative imperfect subjunctive of the active periphrastic active': 'would verb',
    
    //////conditional
    'conditional protasis_flv present subjunctive active': 'should verb',
    'conditional protasis_flv present subjunctive passive': 'should be verbed',
    'conditional apodosis_flv present subjunctive active': 'would verb',
    'conditional apodosis_flv present subjunctive passive': 'would be verbed',
    'conditional protasis_fmv future indicative active': 'verb',
    'conditional protasis_fmv future indicative passive': 'are verbed',
    'conditional apodosis_fmv future indicative passive': 'will be verbed',
    'conditional protasis_fmve future perfect indicative active': 'verb (emphatic)',
    'conditional protasis_fmve future perfect indicative passive': 'are verbed (emphatic)',
    'conditional apodosis_fmve future indicative active': 'will verb',
    'conditional apodosis_fmve future indicative passive': 'will be verbed',
    'conditional protasis_present_ctf imperfect subjunctive active': 'were verbing',
    'conditional protasis_present_ctf imperfect subjunctive passive': 'were being verbed',
    'conditional apodosis_present_ctf imperfect subjunctive active': 'would be verbing',
    'conditional apodosis_present_ctf imperfect subjunctive passive': {
        'default': 'would be verbed',
        'basic': 'would be verbed',
        'advanced': 'would be being verbed'
    },
    'conditional protasis_past_ctf pluperfect subjunctive active': 'had verbed',
    'conditional protasis_past_ctf pluperfect subjunctive passive': 'had been verbed',
    'conditional apodosis_past_ctf pluperfect subjunctive active': 'would have verbed',
    'conditional apodosis_past_ctf pluperfect subjunctive passive': 'would have been verbed',
    'conditional protasis_mixed_ctf pluperfect subjunctive active': 'had verbed',
    'conditional protasis_mixed_ctf pluperfect subjunctive passive': 'had been been verbed',
    'conditional apodosis_mixed_ctf imperfect subjunctive active': 'would be verbing',
    'conditional apodosis_mixed_ctf imperfect subjunctive passive': {
        'default': 'would be verbed',
        'basic': 'would be verbed',
        'advanced': 'would be being verbed'
    },
    
    /////purpose
    'purpose present subjunctive active': 'may verb',  //no -s?
    'purpose present subjunctive passive': 'may be verbed',
    'purpose imperfect subjunctive active': 'might verb', //no -s?
    'purpose imperfect subjunctive passive': 'might be verbed',
 
    /////////indirect command
    'indirect command present subjunctive active': 'verb', //no -s?
    'indirect command present subjunctive passive': 'be verbed',
    'indirect command imperfect subjunctive active': 'verb', //no -s?
    'indirect command imperfect subjunctive passive': 'be verbed',
    //////// fear
    'indirect command present subjunctive active': 'will verb', 
    'indirect command present subjunctive passive': 'will be verbed',
    'indirect command imperfect subjunctive active': 'would verb', 
    'indirect command imperfect subjunctive passive': 'would be verbed',
    
    //////// indirect statement
    'indirect statement present infinitive active primary':'verb',
    'indirect statement present infinitive passive primary':'are verbed',
    'indirect statement present infinitive active secondary': 'were verbing',
    'indirect statement present infinitive passive secondary': 'were being verbed',
    
    'indirect statement perfect infinitive active primary': 'verbed-preterite',
    'indirect statement perfect infinitive passive primary': 'were verbed',
    'indirect statement perfect infinitive active secondary': 'had verbed',
    'indirect statement perfect infinitive passive secondary': 'had been verbed',
    
    'indirect statement present infinitive of the active periphrastic active primary': 'will verb',
    'indirect statement present infinitive of the active periphrastic active secondary': 'would verb',
    
    
    ////independent subjunctives
    /////potential
    'potential present subjunctive active': 'can verb',
    'potential present subjunctive passive': 'can be verbed',
    'potential imperfect subjunctive active': 'could verb',
    'potential imperfect subjunctive passive': 'could be verbed'
};




// PROCESS TRANSLATION FORMULA FOR FINAL OUTPUT
// process_translation_formula(translation_formula, person_number, language, level, additional info)

var person_number_to_english_irregularity = {
	"1s" : {
		"were" : "was",
		"are" : "am"
	},
	"3s" : {
		"were" : "was",
		"are" : "is",
		//below accounts for everything & 'will have' stays 'will have'
		"have verbed" : "has verbed",
		"have been verbed" : "has been verbed",
		//add -s if 3s
		"verb" : "verbs"   
	}
};

// GET ENGLISH ROOT
var english_verb_formula_to_root = {
	"verbed" : "past participle",
	"verbing" : "gerund",
	"verbed-preterite": "preterite",
	"verbs" : "final-s",
	"verb" : "default"
}

//// SET FINAL DISPLAY PREFERENCES

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






///GET TEMPLATE INFO
// animate subject, implement, dative, etc.










// END CARTESIAN

//
///////// SELECT THE ACTUAL CHOSEN FORM//////////////

// SELECT RANDOM CONJUNCTION

// GET LEXICAL RESTRICTIONS
// from conjunction
// add it to some restrictions list or object
// e.g. we want to add verb of commanding left
// we send direction and 'verb of commanding' to the backstage interpreter
// it provides a function with those arguments and it consults the property

// details on restriction object
// 'in allowed_sequences' -> backstage json object interpreter turns this into function (x) {return x in sequences}
// 'transitive?' -> backstage json object interpreter turns this into function (x) {return x.transitivity = transitive}

// SELECT CHOSEN SEQUENCE
// filter_by_chosen_sequence(chosen_sequence, [regime-tense-mood-voice])
//     --> [regime-tense-mood-voice]

// ENTANGLE SEQUENCE IN BOTH LEFT AND RIGHT KERNEL


// SELECT CHOSEN RTMV PN
// pick_chosen_properties(chosen_conjunction, [[regime-tense-mood-voice], [person_number]])
//     --> [rtmv, pn]
    
// SELECT CHOSEN TRANSLATION FORMULA
// pick_translation_formula([rtmv, pn], language, level, additional info) --> translation_formula (str)

// SEND TRANSLATION FORMULA TO ENGLISH CLEAN UP
// was vs were
// ate vs eated

// GET LEXICAL RESTRICTIONS
// from RTMV PN
// add it to some restrictions list or object


// SELECT CHOSEN LEXEMES
// (filter + select)
// pick_chosen_lexeme(chosen_conjunction, direction) --> lexeme


// PICK DUMMY LEXEMES
// pick_dummy_lexemes()  --> [lexemes]
// important: dummy lexemes do not need to meet lexical restrictions
//  except must be different from chosen lexeme

// MERGE LEXEMES
// merge_lexemes([lexemes], chosen_lexeme) --> [lexemes]




//BUNDLE AND ORGANIZE METATALK (tense names, person_number_names, etc.) FOR DROP DOWN PATH
//get list of metatalk categories from module.drop_down_path
// 
//(we want to make sure that if relative time is in the drop down path, 
// then we don't trigger except where it is relevant and non-confusing
// namely indirect question, indirect statement and the like)
// (so if we don't have any indirect statements or indirect questions, we should kill off relative time from the drop-down path)
// something like consult a list of constructions where relative time is triggered
// filter_categories_from_drop_down_path(conjunction, [drop_down_path_categories]) --> [drop_down_path_categories]


//here's a list, might be worth just setting it up as a property in the conjunction library
var conjunctions_which_trigger_relative_time = ['c_why', 'c_that_indirect_statement'];


// so we have a big list of translation formulae
// and we want to turn it into a nested map of maps
// 
// before we do anything we need to drop some drop down categories nonsensical/confusing

// argument 1: list of dropdown options (e.g. he loved, he will love, he loves)

// argument 2: list of categories/aka drop down path (e.g. lexeme, voice, person_number)

// we need a way of sorting items that appear in a single drop-down block (e.g. 1s, 2s, 3s not just random)
// and we want to be able to control it block by block
// argument 3: list of categories that control order within block (e.g. tense, person)

// additional arguments:
    // alphabetical order of lexemes?
    // process_final_string


// (1)
// present
//    3s
//        he loves
//    3p
//        they love
// past
// future

// (2)
// present
//     he loves
//     they love
// past
// future

// (3)
// he loves
// they love
// he loved
// ...

// (4)
// he loves
// he loved
// he will love
// ...
// ...



//CONVERT BACKSTAGE METATALK (tense names, person_number_names, etc.) TO FINAL DISPLAY

var backstage_metatalk_to_frontstage_metatalk_map = {
    
    '1s': {
        'default': 'I',
        'basic': 'I',
        'advanced': '1st singular'
    },
    '2s': {
        'default': 'you',
        'basic': 'you',
        'advanced': '2nd singular'
    },
    '3s': {
        'default': 'he',
        'basic': 'he',
        'advanced': '3rd singular'
    },
    '1p': {
        'default': 'we',
        'basic': 'we',
        'advanced': '1st plural'
    },
    '2p': {
        'default': 'y\'all',
        'basic': 'y\'all',
        'advanced': '2nd plural'
    },
    '3p': {
        'default': 'they',
        'basic': 'they',
        'advanced': '3rd plural'
    },
    //latin cases
    

    'nominative': {
        'default': 'subject',
        'basic': 'subject',
        'advanced': 'nominative',
    },
    'genitive': {
        'default': '\'of\'',
        'basic': '\'of\'',
        'advanced': 'genitive'},
    'dative': {
        'default': '\'to\'',
        'basic': '\'to\'',
        'advanced': 'dative'},
    'accusative': {
        'default': 'object',
        'basic': 'object',
        'advanced': 'accusative'},
    'ablative': {
        'default': '\'with/by\'',
        'basic': '\'with/by\'',
        'advanced': 'ablative'},
    //latin verb tenses
    'present indicative': {
        'default': 'present',
        'basic': 'present',
        'advanced': 'present indicative'
    },
    'imperfect indicative': {
        'default': 'past',
        'basic': 'past',
        'advanced': 'imperfect indicative'
        },
    'future indicative': {
        'default': 'future',
        'basic': 'future',
        'advanced': 'future indicative'
        },
    'perfect indicative': {
        'default': 'past (once)',
        'basic': 'past (once)',
        'advanced': 'perfect indicative'
        },
    'pluperfect indicative': {
        'default': 'had VERBed',
        'basic': 'had VERBed',
        'advanced': 'pluperfect indicative'
        },
    'future perfect indicative': {
        'default': 'had VERBed',
        'basic': 'had VERBed',
        'advanced': 'future perfect indicative'
        },
    'present subjunctive': {
        'default': 'same time subjunctive 1st degree',
        'basic': 'same time subjunctive 1st degree',
        'advanced': 'present subjunctive'
        },
    'imperfect subjunctive': {
        'default': 'same time subjunctive 2nd degree',
        'basic': 'same time subjunctive 2nd degree',
        'advanced': 'imperfect subjunctive'
        },
    'perfect subjunctive': {
        'default': 'prior time subjunctive 1st degree',
        'basic': 'prior time subjunctive 1st degree',
        'advanced': 'perfect subjunctive'
        },
    'pluperfect subjunctive': {
        'default': 'prior time subjunctive 2nd degree',
        'basic': 'prior time subjunctive 2nd degree',
        'advanced': 'pluperfect subjunctive',
    },
    //sequence
    'primary sequence': {
        'default': '1st degree',
        'basic': '1st degree',
        'advanced': 'primary sequence'
    },
    'secondary sequence': {
        'default': '2nd degree',
        'basic': '2nd degree',
        'advanced': 'secondary sequence'
    },
    //not sure if the below is necessary, might be handled by translation formula
    //seems like we're just working backwards on operation we've already done above
    //(i.e. convert properties to metatalk)
    //english verb tenses
    'preterite': {
        'default': 'VERBed (once)',
        'basic': 'VERBed (once)',
        'advanced': 'preterite'
    },
    'pluperfect': {
        'default': 'had VERBed',
        'basic': 'had VERBed',
        'advanced': 'pluperfect'
    },
    'past continuous': {
        'default': 'VERBed',
        'basic': 'VERBed',
        'advanced': 'was VERBing'
    },
    'future perfect': {
        'default': 'will have VERBed',
        'basic': 'will have VERBed',
        'advanced': 'future perfect'
    },
    
    //the ad hoc names that name the weird translation formula
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
    
    
    
    //relative time categories
    
    //we have to be careful to keep relative and absolute time separate
    //prior is a nice category in the drop down path for indirect questions and statements
    //but if we trigger this for indicatives or purpose clauses it can lead to confusion
    //one option would be to have a kill list: kill the time category in the drop down path
    //for all constructions except c_why and c_that_indirect statement right
    
    // I imagine a drop down path for love like this:
    // love / carry / eat  (pick love)
    // present / past / future / prior-time / same-time / later-time (pick same-time)
    // 1st degree / 2nd degree (pick 2nd degree)
    // active / passive (pick passive)
    // 3s / 3p (pick 3p)
    // result is am-are-ntur
    
    
    'relative prior': {
        'default': 'prior-time',
        'basic': 'prior-time',
        'advanced': 'prior'
    },
    'relative simultaneous': {
        'default': 'same-time',
        'basic': 'same-time',
        'advanced': 'simultaneous'
    },
    'relative subsequent': {
        'default': 'later-time',
        'basic': 'later-time',
        'advanced': 'subsequent'
    },
    //this is sort of a weird category
    // it's basically a placeholder for when we're not in relative time
    // so the drop down path has a consistent set of choices
    // e.g. present / past / future / prior-time / same-time / later-time
    'absolute prior': {
        'default': 'past',
        'basic': 'past',
        'advanced': 'past'
    },
    'absolute simultaneous': {
        'default': 'present',
        'basic': 'present',
        'advanced': 'present'
    },
    'absolute subsequent': {
        'default': 'future',
        'basic': 'future',
        'advanced': 'future'
    },
    
};






///////////BELOW ARE SOME NOTES FOR TWEAKS TO OVERALL PROGRAM/////////

//PROPERTIES WE MIGHT WANT TO ADD TO CONJUNCTION LIBRARY
// - whether relative time should be allowed in the drop down path 
//      - for ind. statement and ind. question the value would be true
//      - for cum_causal, concessive, circumstantial, rel_clause_of_characteristic etc. the value would be true
//      - for almost everything else it would be false


















//  GRAVEYARD


// a more clunky traversal below
// var conjunction_to_regime_tense_mood_verbose_clunky = {
//     c_null: {
//         //version 1
//         'left': ['present indicative', 'imperfect indicative', 'future indicative', 
//             'perfect indicative','pluperfect indicative', 'future perfect indicative', 'imperative'],
//         //version 2 more verbose
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': null
//     },
//     c_null_potential_subjunctive: {
//         'left': ['potential present subjunctive', 'potential perfect subjunctive', 
//             'potential imperfect subjunctive'],
//         'right': null
//     },
//     c_and: {
//         //eventually we should prevent this kind of clause from having imperatives on oneside but not the other
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative']
//     },
//     c_but: {
//         //eventually we should prevent this kind of clause from having imperatives on oneside but not the other
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative']
//     },
//     c_or: {
//         //eventually we should prevent this kind of clause from having imperatives on oneside but not the other
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative']
//     },
//     c_when: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         //right side cannot have imperative
//         'right': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative']
//     },
//     c_purpose: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['purpose present subjunctive', 'purpose imperfect subjunctive']
        
//     }, 
//     c_indirect_command: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['indirect command present subjunctive', 'indirect command imperfect subjunctive']
//     },
//     c_fear: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['fear present subjunctive', 'fear imperfect subjunctive']
//     },
//     c_cum_when: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         //right side cannot have imperative
//         'right': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative']
//     },
//     c_cum_because: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['relative present subjunctive', 'relative imperfect subjunctive', 
//             'relative perfect subjunctive', 'relative pluperfect subjunctive',
//             'relative present subjunctive of the active periphrastic', 'relative imperfect subjunctive of the active periphrastic']
//     },
//     c_cum_circumstantial: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['relative present subjunctive', 'relative imperfect subjunctive', 
//             'relative perfect subjunctive', 'relative pluperfect subjunctive',
//             'relative present subjunctive of the active periphrastic', 'relative imperfect subjunctive of the active periphrastic']
//     },
//     c_cum_concessive: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['relative present subjunctive', 'relative imperfect subjunctive', 
//             'relative perfect subjunctive', 'relative pluperfect subjunctive',
//             'relative present subjunctive of the active periphrastic', 'relative imperfect subjunctive of the active periphrastic']
//     },
//     c_because_allegedly: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['relative present subjunctive', 'relative imperfect subjunctive', 
//             'relative perfect subjunctive', 'relative pluperfect subjunctive',
//             'relative present subjunctive of the active periphrastic', 'relative imperfect subjunctive of the active periphrastic']
//     },
//     c_why: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//         'right': ['relative present subjunctive', 'relative imperfect subjunctive', 
//             'relative perfect subjunctive', 'relative pluperfect subjunctive',
//             'relative present subjunctive of the active periphrastic', 'relative imperfect subjunctive of the active periphrastic']
//     },
//     c_indirect_statement: {
//         'left': ['absolute present indicative', 'absolute imperfect indicative', 
//             'absolute future indicative', 'absolute perfect indicative', 'absolute pluperfect indicative', 
//             'absolute future perfect indicative', 'absolute imperative'],
//       'right': ['relative present infinitve', 'relative perfect infinitive', 
//             'relative future infinitive']  
//     },
//     c_if_fmv: {
//         'left': 'conditional protasis_fmv future indicative',
//         'right': 'conditional apodosis_fmv future indicative',
//     },
//     c_if_flv: {
//         'left': 'conditional protasis_flv present subjunctive',
//         'right': 'conditional apodosis_flv present subjunctive',
//     },
//     c_if_fmve: {
//         'left': 'conditional protasis_fmve future perfect indicative',
//         'right': 'conditional apodosis_fmve future indicative',
//     },
//     c_if_present_ctf: {
//         'left': 'conditional protasis_present_ctf imperfect subjunctive',
//         'right': 'conditional apodosis_present_ctf imperfect subjunctive',
//     },
//     c_if_past_ctf: {
//         'left': 'conditional protasis_past_ctf pluperfect subjunctive',
//         'right': 'conditional apodosis_past_ctf pluperfect subjunctive',
//     },
//     c_if_mixed_ctf: {
//         'left': 'conditional protasis_mixed_ctf pluperfect subjunctive',
//         'right': 'conditional apodosis_mixed_ctf imperfect subjunctive',
//     }
// };

