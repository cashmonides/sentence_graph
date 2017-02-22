//////// a february 2017 reboot of the etymology_data.js data-structure
/// all lives in a single dictionary
// fields: academics, science, zoology, math, sociology (including politics)
// e.g. matriarchy = [sociology]    // blanket category for sociology, politics, current events
// e.g. archaeology = [academics]  // blanket category for humanities, social sciences, academics in general
// e.g. factor = [math, general]   
// e.g. factorial = [math]
// e.g. tetrapod = [zoology]

// autoconstruction:

// step 1: suck data from old etymology data
// converting root list to component map

// step 2: suck roots from old etymology data
// iterate through words and and pull all members of component map
// divide into two dictionaries: with metacharacter, without metacharacter


// step 3: match new roots to old roots



var english_word_data = {
/////////////words/////////
'words' : {
    'archaeology': {	
        'variant_list': ['archeology'],
        'british_variant': null,
    	'component_map': {
    		'1': 'ver',
    		'2': 'i#',
    		'3': 'fy'
    		},
    	'definition': 'to make@3 something true@1',
    	'part_of_speech': 'verb',
    	'level': 5,
    	'sense_type': 'word',
    	'field_list': ['academics']
	},
    'verify': {	
        'variant_list': null,
        'british_variant': null,
    	'component_map': {
    		'1': 'ver',
    		'2': 'i#',
    		'3': 'fy'
    		},
    	'definition': 'to make@3 something true@1',
    	'part_of_speech': 'verb',
    	'level': 5,
    	'sense_type': 'word',
    	'field_list': ['academics']
	},
    'cryptozoologist': {
        'variant_list': null,
        'british_variant': null,
    	'component_map': {
    		'1': 'crypt',
    		'2': 'o#',
    		'3': 'zo',
    		'4': 'o#',
    		'5': 'log',
    		'6': 'ist'
    		},
    	'definition': 'a @person involved in@6 the study@5 of hidden@1, possibly mythical, animals@3',
    	'part_of_speech': 'noun',
    	'level': 8,
    	'sense_type': 'word',
    	'field_list': ['science']
	},
    'quadruped': {		
        'variant_list': null,
        'british_variant': null,
    	'component_map': {
    		'1': 'quadr',
    		'2': 'u#',
    		'3': 'ped'
    		},
    	'definition': 'an animal with four@1 legs@3',
    	'part_of_speech': 'noun',
    	'level': 8,
    	'sense_type': 'word',
    	'field_list': ['zoology']
	}
},


'semi_words' : {
    'cryptophobia': {	
        'variant_list': null,
        'british_variant': null,
    	'component_map': {
    		'1': 'crypt',
    		'2': 'o#',
    		'3': 'phob',
    		'4': 'ia'
    		},
    	'definition': 'the @fear@3 of @secrets@1',
    	'part_of_speech': 'noun',
    	'level': 5,
    	'field_list': ['general']
    }
},


'nonsense_words' : {
    'anthropod': {	
        'variant_list': null,
        'british_variant': null,
    	'component_map': {
    		'1': 'anthr',
    		'2': 'o#',
    		'3': 'pod'
    		},
    	'definition': 'a creature with @humans@1 for @feet@3',
    	'part_of_speech': 'noun',
    	'level': 5,
    	'field_list': ['general']
    }
},

/////////////root/////////
'roots' : {
    'ver': {
        'form_list': ['ver'],
        'problematic_variant_list': null,
    	'definition': 'true',
    	'root_type': 'core',
    	'level': 3,
    	'synonym_map': {
    	    'latin': null, 
    	    'greek': null
    	},
    	'language': 'latin'
	},
    'crypt': {	
        'form_list': ['crypt'],
        'problematic_variant_list': null,
    	'definition': 'secret, hidden',
    	'root_type': 'core',
    	'level': 8,
    	'synonym_map': {
    	    'latin': null, 
    	    'greek': null
    	},
    	'language': 'greek'
	},
    'fac': {	
        'form_list': ['fic', 'fac', 'fy'],
        //f@1 = the f meaning make/do (pacifist)   VS. f@2 = the f meaning speak (infant)
        'problematic_variant_list': ['f@1'],
    	'definition': 'make, do',
    	'root_type': 'core',
    	'level': 3,
    	'synonym_map': {
    	    'latin': null, 
    	    'greek': null
    	},
    	'language': 'latin'
	},
    'ist': {	
        'variant_list': ['ist'],
        'problematic_variant_list': null,
    	'definition': 'a person involved in',
    	'root_type': 'suffix',
    	'level': 3,
    	'synonym_map': {
    	    'latin': ['er'], //er=or
    	    'greek': null
    	},
    	'language': 'greek'
	},
    'log': {	
        'variant_list': ['log'],
        'problematic_variant_list': null,
    	'definition': 'study, word, speech',
    	'root_type': 'core',
    	'level': 3,
    	'synonym_map': {
    	    'latin': ['verb', 'loqu'], 
    	    'greek': null
    	},
    	'language': 'greek'
	},
    'ped': {	
        'variant_list': ['ped', 'pod'],
        'problematic_variant_list': ['pus'],
    	'definition': 'study, word, speech',
    	'root_type': 'core',
    	'level': 3,
    	'synonym_map': {
    	    'latin': nullify, 
    	    'greek': ['pus']
    	},
    	'language': 'latin'
	},
    'quad': {	
        'variant_list': ['quad', 'quadr'],
        'problematic_variant_list': ['quart'],
    	'definition': 'secret, hidden',
    	'root_type': 'core',
    	'level': 8,
    	'synonym_map': {
    	    'latin': null, 
    	    'greek': ['tetr']
    	},
    	'language': 'latin'
	},
    'zo': {		
    	'variant_list': ['zo'],
    	'problematic_variant_list': null,
    	'definition': 'animal',
    	'root_type': 'core',
    	'level': 8,
    	'synonym_map': {
    	    'latin': ['bio'], //????? 
    	    'greek': null
    	},
    	'language': 'greek'
    }
},

/////////////root to words/////////
'root_to_words' : {
	//option 1
	'fac': ['factory', 'fiction', 'petrify'],
	//option 2
	'fac': ['factory', 'facsimilie', 'manufacture'],
	'fy': ['petrify', 'purify']
}
}