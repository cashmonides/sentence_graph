// ---------------THE SHORTEST POSSIBLE VERSION----------
// a single object called language_words_data
	// e.g. latin_words_data, english_words_data, sanskrit_words_data
	// with at least three members
	// 1) list/dictionary of word objects
	// 2) list/dictionary of roots
	// 3) a dictionary of roots to words (string to list of strings)
	// in all cases, strings point to canonical forms
	// all variant forms are a property of the word||root object (a list of strings)
	// e.g. 'ped' points to 'ped': {'form_list': ['ped', 'pod', 'pus']
// a set of utils that operates on the word object
// a set of utils that operates on strings (language-agnostic)
// a game engine that takes question-data and game-settings



// --------------THE GOAL----------------

// in short:
	// semi-automatically generated: 
		// information rich word objects (verify)
		// information rich root objects  (ver)
		// a linking list (linking roots to words)
		// e.g. ver: [verify, veracity, verisimilitude,...]
	// to play games with


// at length:
// a semi-automated process that produces word and root objects
	// we want to minimize human drudgery
	// though humans will be necessary for:
	// e.g. writing good definitions
	// e.g. distinguishing sense from nonsense
	// e.g. distinguishing good nonsense from bad nonsense
		// bibi is just bad nonsense = "twotwo?!"
		// but cryptophobia is a nice bit of nonsense = "fear of secrets!"

// the WORD OBJECT should be information-rich
	// each substring should point to a root object
	// e.g. 'verify' should be able to be analyzed into
	// ver, i, fy
	// and each of these elements should be information rich
	// i.e. ver is a root meaning true
	// i is a connecting element with no meaning
	// fy is a suffix meaning make 


// the root object should also be information-rich
	// meaning
	// type (prefix, root, suffix)
		// prefixes cannot occur without a root following them
		// suffixes cannot occur without a root preceding them
	// level
	// synonyms_list
	// homonyms_list

// a separate mutable data structure links roots to words
	// i.e. a map of root to list of words containing that root 
	// e.g. ver: [verify, veracity, verisimilitude,...]
	// kept separately because:
		// it might be large and slow down the root object
		// it might be large and hard to read
		// it will be changed often as words are added



// game types
	// given the definition, spell the word by typing
	// given the definition, spell the word by clicking buttons
	// given the word with connector removed, spell the word
	// given some fun nonsense, draw a picture of the word
		// e.g. draw a picture of an anthropod
		// e.g. draw a picture of a astrovulcanologist
	// given a list of words, match words that share the same root
	// given a list of words, match words that don't share the same root
	// etc.



// --------------STEP 1-----make roots-----------


// a human, with the aid of a roots dictionary (print & online)
// produces a list of raw_roots

raw_roots_list = ['anthr', 'ver', 'fy', 'log', 'quad', 'quadr','quart', 'de', 'de'];


// some human filtration happens where we handle three exceptional cases
// exception 1: synonyms (quad & quart, quad and quadr)
// exception 2: homonyms (de & de  de1=remove de2=god)


// resulting in a intermediate_roots_list
// i.e. an intermediate stage of processing, neither raw nor final
// which is perhaps a list of lists
intermediate_roots_list = ['anthr', 'ver', 'fy', 'log', ['quad', 'quadr', 'quart'], 'de1', 'de2'];


// each root is converted into an object (i.e. a map)
roots_list = [
'anthr': {
	'form': 'anthr',
	'meaning': 'human',
	'type': 'root'   
},
// a single canonical citation form for a root that may have many forms
'quad': {
	'form': ['quad', 'quadr', 'quart'],
	'meaning': 'four',
	'type': 'root'
},
// a metacharacter to distinguish homonym roots
'de@1': {
	'form': ['de'],
	'meaning': 'remove',
	'type': 'prefix'
},
'de@2': {
	'form': ['de'],
	'meaning': 'god',
	'type': 'root'
}
]

// --------------STEP 2----produce all combos------------

// roots are fed into an n-dimensional matrix
// that produces all sense and nonsense and everything in between

// its input is a flattened intermediate roots list with metacharacters retained

// its output is huge: anthropod, bibi, bipod, biphobia, cryptophobioa


// --------------STEP 3----filter all combos------------


// from the huge list extract the words that are definitely SENSE
// an API-assisted dictionary check filters all dictionary words


// find the ILLUMINATING NONSENSE
// step 1: mechanically filter out the BAD NONSENSE
// remove any string with the following condition:
// prefix follows root e.g. anthropre
// suffix precedes root e.g. logyanthro

// step 2: humanistically grab the ILLUMINATING NONSENSE
// human filters the list looking for words like:
// anthropod: a creature with humans for feet
// cryptophobe: a person who fears secrets







// --------------STEP 4---produce root map for each word-------------

// mechanical processing
// automatically convert each word into root_map using root list
/*
input: 'verify'
output: 'root_map': {
			1: 'ver',
			2: 'i#',
			3: 'fy'
			},

the #metacharacter identifies it as an item not on the root list
and thus it is a connecter
*/	



// --------------STEP 5----create word object------------

// merge everything into a single word object
// human adds definition, part of speech, level, sense_type
// human adds properties:
// definition property + metacharacters for spans
// sense_type property
	// sense_type: word = a bona fide dictionary  word
	// sense_type: semiword = a word that makes sense but isn't in the dictionary (yet)
	// sense_type: nonword = a word that doesn't make sense
	// anthropology = word
	// cryptophobe = semiword
	// anthropod = nonword
// level = some qualitative measure of difficulty (1-10)



// we end up with

var words = 

[

'verify': {		
	'root_map': {
		1: 'ver',
		2: 'i#',
		3: 'fy'
		},
	'definition': 'to make@1 something true@3',
	'part_of_speech': 'verb',
	'level': 5,
	'sense_type': 'word'
	}

]


var roots = {
'ver': {
    'form_list': ['ver'],
	'definition': 'true',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
'crypt': {	
    'form_list': ['crypt'],
	'definition': 'secret, hidden',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': null
	},
'fac': {	
    'form_list': ['fic', 'fac', 'fy', 'f'],
	'definition': 'make, do',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
'ist': {	
    'form_list': ['ist'],
	'definition': 'a person involved in',
	'root_type': 'suffix',
	'level': 3,
	'synonyms_list': ['er']
	},
'log': {	
    'form_list': ['log'],
	'definition': 'study, word, speech',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
'quad': {	
    'form_list': ['quad', 'quadr'],
	'definition': 'secret, hidden',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': 'quart'
	},
'zo': {		
	'form_list': ['zo'],
	'definition': 'animal',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': null
	}
}


// -------------------UTILITY OPERATIONS-----------

// GIVEN DEFINITION SPELL WORD
/*
1) remove random x from word (either root or connector)
verify --> fy

2) replace with underscore of same length
ver.i.__
(ideal: produce a list of strings
if answer is zo
crypto.__.__.___.___, crypto.__.__.log.___, crypto.__.o.log.ist, crypto.zo.o.log.ist
hint button will keep showing elements in the string
until we hit the final item
)

3) store a correct answer which is a complex object
containing its full form (fic/fac/fy)
as well as which of those choices is correct (fy)
answer: {
	full_form: [fic, fac, fy],
	specific_form: fy
}

4) return question object:

question : {
	prompt: string,
	underscore_hint: string,
	answer_object: {
		full_form: list of strings,
		specific_form: string,
		definition_of_root: string
	}
}

5) generate wrong_answers 
(random selection from all roots)
[[[this might be a parameter we want the user to control]]]
random from all roots or random from all allowed dummy roots


6) check for identical form to correct answer
(either prevent this from happening altogether)
(or allow it but develop a response if an identical one is clicked)
(if two identical roots appear, 
the stage 2 question should be something like
"which meaning of de did you mean")


7) produce list of wrong_answer objects

8) add list of wrong_answer objects to question objecvt


9) return question object

question : {
	prompt: string,
	underscore_hint: string,
	answer_object: {
		full_form: list of strings,
		specific_form: string,
		definition_of_root: string
	},
	dummy_answer_list: [
		// either a list of objects
		// or just a list of strings that point to the object in the database
		'fy', 'quad', 'de'
	]
}

FORK IN THE ROAD
- produce dummies of type:
root: 
connector: choose from all connector list

- hints will be different in remove connector mode



-----------GENERATING THE QUESTION SETTINGS--------
variables:
how many 

at what hint level we display:
- bold roots in definition
- display string on button
- underscore hint with one root
- underscore hint with two roots
- underscore hint with three roots etc.
(keep going until penultimate)
- highlight correct button



*/ 


