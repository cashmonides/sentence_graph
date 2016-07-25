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
// We still need to know which stem to use for each tense.

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
	"perfect active" : "verbed-preterite",			//ate
	"perfect passive": "were verbed",			//was eaten
	"present continuous active" : "are verbing",
	"present continuous passive" : "are being verbed",
	"past continuous active" : "were verbing",
	"past continuous passive" : "were being verbed",
	"future active" : "will verb",
	"future passive" : "will be verbed",
	"pluperfect active" : "had verbed",
	"pluperfect passive" : "had been verbed",
	"future perfect active" : "will have verbed",
	"future perfect passive" : "will have been verbed"
}


/////STEP 2
var english_verb_formula_to_stem = {
	"verbed" : "past participle",
	"verbing" : "gerund",
	"verbed-preterite": "preterite",
	"verbs" : "final-s",
	"verb" : "default"
}


//////STEP 3
//get stem from lexicon (accounts for the irregularity of eat/ate)
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
//combine info from step 3 with stem
//previous steps returned an english_verb_template
//wherever string_containing_verb occurs in template, replace with stem













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
		english_stems: {
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






/*
// Commented out for now, going to be used in the future.
//map between teacher friendly blanket terms and english grammatical terminology
var english_grammatical_terminology_correspendence = {
	"verb" : 'present indicative',  //default present indicative
	"verb no -s" : "present subjunctive",	//fossilized english subjunctive that...
	"verbed" : "preterite", //preterite
	"were verbing" : "past continuous", // was "was verbing"
	"will verb" : "future",
	"verbed" : "perfect",          // was "has verbed"
	"had verbed" : "pluperfect",
	"will have verbed" : "future perfect"
}
*/



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

had verbed -> verb_replacer (replaces "verb" with "stem")

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

verbed -> pretertie

was verbed

past pple for eat = eaten

spits out "eaten"

*/