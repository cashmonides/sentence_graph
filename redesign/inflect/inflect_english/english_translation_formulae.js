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
	"may tense active": "may verb no -s",
	"may tense passive": "may be verbed",
	"might tense active": "might verb no -s",
	"might tense passive": "might be verbed",
	"can tense active": "can verb no -s",
	"can tense passive": "can be verbed",
	"could tense active": "could verb no -s",
	"could tense passive": "could be verbed"
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
	'indicative': {
		'active' : {
			// default, normal, indicative
			'verb': ['simultaneous'],
			'verbed': ['prior'],
			'will verb': ['subsequent'],
			
			//advanced tenses in normal clauses, indicative
			'had verbed': ['pluperfect indicative'],
			'will have verbed': ['future perfect indicative'],
			'was verbing': ['imperfect indicative'],
			//'has/have verbed': ['perfect-in-primary-sequence']
		}, 
		'passive' : {
			// default, normal, indicative
			'is verbed': ['simultaneous'],
			'was verbed': ['prior'],
			'will be verbed': ['subsequent'],
			
			//advanced tenses in normal clauses, indicative
			'had been verbed': ['pluperfect indicative'],
			'will have been verbed': ['future perfect indicative'],
			'was being verbed': ['imperfect indicative'],
			//'has/have been verbed': ['perfect-in-primary-sequence']
		}
	},
	'subordinate && subjunctive || infinitive &! conditional' : {
		'active' : {
			'verb': ['simultaneous', 'primary'],
			'verbed': ['prior', 'primary'],
			'will verb': ['subsequent', 'primary'],
			'was verbing': ['simultaneous', 'secondary'],
			'had verbed': ['prior', 'secondary'],
			'would verb': ['subsequent', 'secondary'],
		},
		'passive' : {
			'is verbed': ['simultaneous', 'primary'],
			'was verbed': ['prior', 'primary'],
			'will be verbed': ['subsequent', 'primary'],
			'was being verbed': ['simultaneous', 'secondary'],
			'had been verbed': ['prior', 'secondary'],
			'would have been verbed': ['subsequent', 'secondary'],
		}
	
	},
	'conditional' : {
		'active' : {
			'should verb': ['protasis_flv'],
			'would verb': ['apodosis_flv'],
			'verb': ['protasis_fmv'],
			'will verb': ['apodosis_fmv'],
			'were verbing': ['protasis_present_ctf'], //was 1sg & 3sg
			'would be verbing': ['apodosis_present_ctf'],
			'had verbed': ['protasis_past_ctf'], 
			'would have verbed': ['apodosis_past_ctf']
		}, 
		'passive' : {
			'should be verbed': ['protasis_flv'],
			'would be verbed': ['apodosis_flv'],
			'is verbed': ['protasis_fmv'],
			'will be verbed': ['apodosis_fmv'],
			'were being verbed': ['protasis_present_ctf'], //was 1sg & 3sg
			'would be being verbing': ['apodosis_present_ctf'],
			'had been verbed': ['protasis_past_ctf'], 
			'would have been verbed': ['apodosis_past_ctf']
		}
	},
	'purpose' : {
		'active' : {
			'may verb' : ['primary'],
			'might verb' : ['secondary']
		},
		'passive' : {
			'may be verbed' : ['primary'],
			'might be verbed' : ['secondary']
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
	"verb" : 'present indicative',  //default present indicative
	"verb no -s" : "present subjunctive",	//fossilized english subjunctive that...
	"verbed-preterite" : "preterite", //preterite
	"were verbing" : "past continuous", // was "was verbing"
	"will verb" : "future",
	"verbed" : "perfect",          // was "has verbed"
	"had verbed" : "pluperfect",
	"will have verbed" : "future perfect",
	"may verb no -s": "may tense",
	'might verb no -s': "might tense",
	"can verb no -s": "can tense",
	'could verb no -s': "could tense"
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