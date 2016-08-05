// note: english_grammatical_terminology_correspendence appears unused (except for its keys)
// a rule has a string represation
// "were" : "was",                           was
// "are" : "am",                             am
// "verb" : "verbs"                          -s
// "have been verbed" : "has been verbed",   had been -ed
// in other words, hyphen is simply equivalent to verb
// verb no -s -> verb no verbs -> no rule with right hand side verbs can be applied
// match number and person: look for anything matching /[1-3][sp]/g and use it
// check indexOf for each of these, check the ones that match.
// We still need to know which root to use for each tense.

// Should the english_grammatical_terminology_correspendence go both ways?


//////STEP 1
//time is past
//latin is dominant
//latin picks imperfect active
//consult latin_tense to english_tense
//spit out english past continuous active

// Step 1.5
// Consult english_tense_to_translation_formula dictionary
// to get translation formula.
var english_tense_to_translation_formula = {
	"present active" : "verb",
	"present passive" : "are verbed",			//is eaten
	"present subjunctive active" : "verb no -s",
	"present subjunctive passive" : "be verbed",
	"preterite active" : "verbed-preterite",			//ate
	"preterite passive": "were verbed",			//was eaten
	"present continuous active" : "are verbing",
	"present continuous passive" : "are being verbed",
	"past continuous active" : "were verbing",
	"past continuous passive" : "were being verbed",
	"future active" : "will verb",
	"future passive" : "will be verbed",
	"pluperfect active" : "had verbed",
	"pluperfect passive" : "had been verbed",
	"future perfect active" : "will have verbed",
	"future perfect passive" : "will have been verbed",
	"may tense active": "may verb",
	"may tense passive": "may be verbed",
	"might tense active": "might verb",
	"might tense passive": "might be verbed",
	"can tense active": "can verb",
	"can tense passive": "can be verbed",
	"could tense active": "could verb",
	"could tense passive": "could be verbed",
	"should tense active": "should verb",
	"should tense passive": "should be verbed",
	"would tense active": "would verb",
	"would tense passive": "would be verbed",
	"would tense continuous active": "would be verbing",
	"would tense continuous passive": "would be being verbed",
	"would tense perfect active": "would have verbed",
	"would tense perfect passive": "would have been verbed"
}


/////STEP 2
var english_verb_formula_to_root = {
	"verbed" : "past participle",
	"verbing" : "gerund",
	"verbed-preterite": "preterite",
	"verbs" : "final-s",
	"verb" : "default"
}


//////STEP 3
//get root from lexicon (accounts for the irregularity of eat/ate)
//check english_person_irregularities overrides   (person-dependent was/were)
	//processes verb and helping verb

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



/////STEP 4
//combine info from step 3 with root
//previous steps returned an english_verb_template
//wherever string_containing_verb occurs in template, replace with root




var english_subject_pronoun_dict = {
	'1s': 'I',
	'2s': 'you',
	'3s': 'he',
	'1p': 'we',
	'2p': 'y\'all',
	'3p': 'they'
}




// arguments
// conjunction
// left right
// allowed dictionary
	// allowed sequence
	// allowed tenses (Latin-driven)
	// allowed relative
	// allowed voice
	// LATER: allowed person-number
	// allowed clause types (or maybe this is better we need allowed conjunctions)
//red herring boolean

// voice
//person & number
// indicative vs. subjunctive
// subordinate vs. 
// construction
// mood
// voice
// time
// subordinate or main
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
			'verbed': ['time.prior'],
			'will verb': ['time.subsequent'],
			
			//advanced tenses in normal clauses, indicative
			//information comes from ALLOWED
			'had verbed': ['latin_indicative_tenses_allowed.pluperfect indicative'],
			'will have verbed': ['latin_indicative_tenses_allowed.future perfect indicative'],
			'was verbing': ['latin_indicative_tenses_allowed.imperfect indicative'],
			//'has/have verbed': ['perfect-in-primary-sequence']
		}, 
		'voice.passive' : {
			// default, normal, indicative
			//information comes from ALLOWED
			'is verbed': ['time.simultaneous'],
			'was verbed': ['time.prior'],
			'will be verbed': ['time.subsequent'],
			
			//advanced tenses in normal clauses, indicative
			//information comes from ALLOWED
			'had been verbed': ['latin_indicative_tenses_allowed.pluperfect indicative'],
			'will have been verbed': ['latin_indicative_tenses_allowed.future perfect indicative'],
			'was being verbed': ['latin_indicative_tenses_allowed.imperfect indicative'],
			//'has/have been verbed': ['perfect-in-primary-sequence']
		}
	},
	//information comes from CONJUNCTION actually chosen + red_herring_bool
	'regime.relative' : {
		'voice.active' : {
			'verb': ['time.simultaneous', 'sequence.primary'],
			'verbed': ['time.prior', 'sequence.primary'],
			'will verb': ['time.subsequent', 'sequence.primary'],
			'was verbing': ['time.simultaneous', 'sequence.secondary'],
			'had verbed': ['time.prior', 'sequence.secondary'],
			'would verb': ['time.subsequent', 'sequence.secondary'],
		},
		'voice.passive' : {
			'is verbed': ['time.simultaneous', 'sequence.primary'],
			'was verbed': ['time.prior', 'sequence.primary'],
			'will be verbed': ['time.subsequent', 'sequence.primary'],
			'was being verbed': ['time.simultaneous', 'sequence.secondary'],
			'had been verbed': ['time.prior', 'sequence.secondary'],
			'would have been verbed': ['time.subsequent', 'sequence.secondary'],
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
			'is verbed': ['construction.protasis_fmv || construction.protasis_fmve'],
			'will be verbed': ['construction.apodosis_fmv || construction.apodosis_fmve'],
			'were being verbed': ['construction.protasis_present_ctf'], //was 1sg & 3sg
			'would be being verbing': ['construction.apodosis_present_ctf'],
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






/*
var forms_to_autogenerate = [
	'1s present active',
	'3s present active',
	'1s preterite passive',
	'1s past continuous active',
	'1s present passive'
]
*/

/*
example of a generated lexeme
	love
		english_roots: {
			default: love,
			final-s: loves,			//need this to capture carries
			gerund: loving,
			past participle: loved,
			preterite: loved
		}
		generated_forms : {
			"present active" : {
			    "1s": love",
			    "3s": "loves"
			},
			"present passive" : "is loved",			//is eaten
			"perfect active" : "loved",			//ate
			"perfect passive": "was loved",			//was eaten
			"past continuous active" : "was loved",
			"past continuous passive" : "was being verbed",
			"future active" : "will verb",
			"future passive" : "will be verbed"
		}
	eat
	

*/







// Commented out for now, going to be used in the future.
//map between teacher friendly blanket terms and english grammatical terminology
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
	'would have verbed': 'would tense perfect'
}



/*

"HAD VERBED": past participle    //value is what english grammatical thing is impled

DS writes a function/dictionary to translate the above

AS enters below into conjunction library
purpose
	left: null
	right: 
		primary: "MAY VERB", no -s
		secondary: "MIGHT VERB",  

indirect command
	left: null
	right: "VERB", no -s


fear:
	left: null
	right: null

cum:
	left: null
	right: null

if_flv:
	left: "SHOULD VERB", no -s
	right: "WOULD VERB", no -s

if_fmv:
	left: "VERB"   //=override into present, but it can have -s, which is the default
	right: null

if_pres_ctf:
	left: "WERE VERBING"
	right: "WERE VERBING"


if_past_ctf:
	left: "HAD VERBED"			//unchanged
	right: "WOULD HAVE VERBED"  //unchanged



plug in eat and attack to past ctf

check if irregular:

had verbed -> verb_replacer (replaces "verb" with "root")

consults irregular verb dictionary:
eat: {
    had verbed: "had eaten",
    verbed: "ate"
}

spits out "had eaten"

spits out "had attacked"


OPTION 2


consults irregular verb info alternative 2:

had verbed -> past pple  

verbed -> preterite

was verbed

past pple for eat = eaten

spits out "eaten"

*/