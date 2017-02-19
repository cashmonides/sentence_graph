// additions
// synonyms
// semi-synonyms
// alternate forms



//------desiderata--------


//------desiderata #1--------
// hiding troublesome words
// pus is a variant form of the root ped = foot
// but we might not want to display that form at all times
// since it's mostly just useful for the word octopus and platypus

// so ideally: the variants list is tweakable and context dependent

// another example: ig/il/im/in/ir is awfully messy to look at when you're just trying to decode invisible


// perhaps we introduce two new categories:
// when we process the word object
// instantiated_root = the root actually used in the form
// in the root_map
// problematic_variant_list = a variant in the root list tagged as rare or otherwise problematic
// perhaps we have some category like instantiated_root
// and at bare minimum we display canonical_root + instantiated_root


// at medium we display all normal, unproblematic forms
// at maximum we display all forms, even the weird rare ones
// invisible -->
// minimum: [in]
// maximum: [ig, il, im, in, ir]
// immortal -->
// minimum: [in, im]
// maximum: [ig, il, im, in, ir]


// to handle 'pus' we introduce a distinction between medium and maximum

// minimum is just canonical + instantiated
// medium is for all the unproblematic variants
// maximum includes even the rare, misleading or otherwise problematic forms as well

// biped:
// minimum: ped
// medium: ped/pod
// maximum: ped/pod/pus

// octopus -->
// minimum: ped/pus
// medium: ped/pod/pus
// maximum: ped/pod/pus






// ---------utilities-------


ELEMENTAL FUNCTIONS

--separate component--
add metacharacter separator between components
    verify --> ver.if.y

--replace component--
replace component with either underscore or alternative 
     connector alternative are just vowels
     root alternative are any available roots
     verify --> ___ify       (underscore)
     verify --> pedify      (random root)
     verify --> verofy     (random vowel)

--replace n continuous characters--
	verify --> rurify

--replace n random characters--
	verify --> vurifu

-- restore random missing character (hangman)--
	_ _ _ _ _ _ --> _ e _ _ _ _

--format component--
provide a certain formatting (bold, italic, etc.) to a category of component (root, connector, core root, suffix root, prefix root)
	verify --> VERify

--find word with root x--
	ver --> [verify, verisimillitude]

--find root of word x--
	verify --> [ver, fy]

--generate incorrect alternative (either connector or root or letter)----     
     ver ---> [ped, anthro]
     i --> [a, e, o, u]
     
     
COMPOSITE FUNCTIONS
--find word with root overlap--
	verify --> petrify

--find word without root overlap--
	verify --> quadruped

--find all possible roots for this word--
	vexillologist --> [vex, vexill, log, ist]
	

--find a similar root--
	log --> [ling, cogn] 



//-------game types-------
// hangman
// as timer progresses, random letters are added to a hangman formatted string
// player has to spell the word before the computer does
// points = how many seconds remain on the clock
// e.g. spell the word that means "someone involved in the study of hidden animals"
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// _ _ y _ _ _ _ _ _ _ _ _ _ _ _
// _ _ y _ _ _ _ _ _ _ _ _ _ _ t
// _ _ y _ _ _ _ _ _ _ _ g _ _ t
// etc.



// crossword
// 




// match and mismatch
// find the word that shares a root
// find the word that doesn't share the root

// click on root
// click on word containing root
// click on meaning of root



//------questions-----
// carve out semi-words and nonsense into their own maps??
// i.e. to avoid contamination, make them easier to look up



//-----problems-------
// we want the component_map in the word-object to point to a root-object
// but roots have a canonical form and a list of variant forms
// e.g. ped is the canonical form but there are variants like pod and pus
// so tripod will try to point to pod but that's not canonical just a variant
// possible solution: 
// every variant form also lives on the map of roots
// but instead of a full fledged object, it just points to a real root object
// i.e. it's just an alias
// e.g.
// 'ped': {'alias_for: pod'}
// 'pod': {form_list: [xyz], definition: xyz, etc...} 



// -----the data-structure of the word object--------
// the whole thing is a map
// pretty much everything is a string
// with some metacharacters to show
    // root vs. connector
    // substring in definition string that will become bold to highlight root
    // e.g. "the fear@ of spiders@"
var example_of_word_objects = {
'reference': {		
	'root_map': {
		1: 'root-string',
		2: 'connector-string#',   //metacharacter --> connector, not a root
		3: 'root-string'
		},
	//with metacharacters to link words to roots
	// e.g. 'to make@3 something true@1'
	'definition': 'string',      
	'part_of_speech': 'string',
	'level': 4,
	//four sense_types:
	    // word: a proper dictionary word
	        //e.g. arachnophobia = "the fear of spiders"
	    // semi-word: a word that makes sense but is not in the dictionary
	        // e.g. cryptophobia = "the fear of secrets"
	    // nonsense: a word that doesn't make sense but still has a recoverable meaning
	        // used for silly games like "draw this imaginary word"
	        // e.g. anthropod = "a creature with humans for legs" 
	    // non-word: a word without any real recoverable meaning
	        // probably not used very much except as a red herring to encourage critical thinking
	        // e.g. bibi = "two-two"
	'sense_type': 'string'
	}
}




var words = {
'verify': {		
	'component_map': {
		1: 'ver',
		2: 'i#',
		3: 'fy'
		},
	'definition': 'to make@3 something true@1',
	'part_of_speech': 'verb',
	'level': 5,
	'sense_type': 'word'
	},
'cryptozoologist': {		
	'component_map': {
		1: 'crypt',
		2: 'o#',
		3: 'zo',
		4: 'o#',
		5: 'log',
		6: 'ist'
		},
	'definition': 'a @person involved in@6 the study@5 of hidden@1, possibly mythical, animals@3',
	'part_of_speech': 'noun',
	'level': 8,
	'sense_type': 'word'
	},
'quadruped': {		
	'component_map': {
		1: 'quadr',
		2: 'u#',
		3: 'ped'
		},
	'definition': 'an animal with four@1 legs@3',
	'part_of_speech': 'noun',
	'level': 8,
	'sense_type': 'word'
	}
}


var roots = {
'ver': {
    'variant_list': ['ver'],
    'problematic_variant_list': null,
	'definition': 'true',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
'crypt': {	
    'variant_list': ['crypt'],
    'problematic_variant_list': null,
	'definition': 'secret, hidden',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': null
	},
'fac': {	
    'variant_list': ['fic', 'fac', 'fy', 'f'],
    'problematic_variant_list': null,
	'definition': 'make, do',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
'ist': {	
    'variant_list': ['ist'],
    'problematic_variant_list': null,
	'definition': 'a person involved in',
	'root_type': 'suffix',
	'level': 3,
	'synonyms_list': ['er']
	},
'log': {	
    'variant_list': ['log'],
    'problematic_variant_list': null,
	'definition': 'study, word, speech',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
'ped': {	
    'variant_list': ['ped', 'pod'],
    'problematic_variant_list': ['pus'],
	'definition': 'study, word, speech',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
'quad': {	
    'variant_list': ['quad', 'quadr'],
    'problematic_variant_list': null,
	'definition': 'secret, hidden',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': ['quart', 'tetra']
	},
'zo': {		
	'variant_list': ['zo'],
	'problematic_variant_list': null,
	'definition': 'animal',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': null
	}
}


var root_to_word = {
	//option 1
	'fac': ['factory', 'fiction', 'petrify']
	//option 2
	'fac': ['factory', 'facsimilie', 'manufacture'],
	'fy': ['petrify', 'purify']
}




/// OPTION 2 below - all in one dictionary

var etymology_dictionary = {
	words: etymology_words,
	roots: etymology_roots,
	root_to_word: etymology_root_to_word	
}


var etymology_words = [
{'canonical_form': 'verify',		
	'component_map': {
		1: 'ver',
		2: 'i#',
		3: 'fy'
		},
	'definition': 'to make@3 something true@1',
	'part_of_speech': 'verb',
	'level': 5,
	'sense_type': 'word'
	},
{'canonical_form': 'cryptozoologist',		
	'component_map': {
		1: 'crypt',
		2: 'o#',
		3: 'zo',
		4: 'o#',
		5: 'log',
		6: 'ist'
		},
	'definition': 'a @person involved in@6 the study@5 of hidden@1, possibly mythical, animals@3',
	'part_of_speech': 'noun',
	'level': 8,
	'sense_type': 'word'
	},
{'canonical_form': 'quadruped',		
	'component_map': {
		1: 'quadr',
		2: 'u#',
		3: 'ped'
		},
	'definition': 'an animal with four@1 legs@3',
	'part_of_speech': 'noun',
	'level': 8,
	'sense_type': 'word'
	}
];


var etymology_roots = [
{'canonical_form': 'ver',
    'variant_list': ['ver'],
    'problematic_variant_list': null,
	'definition': 'true',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
{'canonical_form': 'crypt',
    'variant_list': ['crypt'],
    'problematic_variant_list': null,
	'definition': 'secret, hidden',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': null
	},
{'canonical_form': 'fac',	
    'variant_list': ['fic', 'fac', 'fy', 'f'],
    'problematic_variant_list': null,
	'definition': 'make, do',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
{'canonical_form': 'ist',	
    'variant_list': ['ist'],
    'problematic_variant_list': null,
	'definition': 'a person involved in',
	'root_type': 'suffix',
	'level': 3,
	'synonyms_list': ['er']
	},
{'canonical_form': 'log',	
    'variant_list': ['log'],
    'problematic_variant_list': null,
	'definition': 'study, word, speech',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
{'canonical_form': 'ped',	
    'variant_list': ['ped', 'pod'],
    'problematic_variant_list': ['pus'],
	'definition': 'study, word, speech',
	'root_type': 'core',
	'level': 3,
	'synonyms_list': null
	},
{'canonical_form': 'quad',	
    'variant_list': ['quad', 'quadr'],
    'problematic_variant_list': null,
	'definition': 'secret, hidden',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': ['quart', 'tetra']
	},
{'canonical_form': 'zo',		
	'variant_list': ['zo'],
	'problematic_variant_list': null,
	'definition': 'animal',
	'root_type': 'core',
	'level': 8,
	'synonyms_list': null
	}
];



var etymology_root_to_word = [
	//option 1
	'fac': ['factory', 'fiction', 'petrify']
	//option 2
	'fac': ['factory', 'facsimilie', 'manufacture'],
	'fy': ['petrify', 'purify']
];


