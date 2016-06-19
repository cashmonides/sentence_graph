var syntax_module_filter = {
	"noun_syntax" : {
		"nominative": {
			"subject nominative": 1, 
			"predicate nominative": 1,
			"apposition to a subject": "Caligula",
			"apposition to a predicate": "Caligula",
		},
    	"genitive": {
    		"genitive of the charge": 2, 
    		"genitive of the penalty": 2, 
    		"partitive genitive": 9, 
    		"genitive of description": 10, 
    		"subjective genitive": 11, 
    		"objective genitive": 11, 
    		"genitive of characteristic (aka predicate)": 11, 
    		"genitive of the source of the feeling with an impersonal verb of emotional distress": 16, 
    		"genitive of the person concerned with interest/rēfert": 16, 
    		"genitive with causā to express purpose": 17, 
    		"genitive of indefinite value": 18, 
    		"genitive with expression of memory": 18,
    		"epexegetical genitive": "Caligula"
    	},
    
    	"dative": {
    		"dative of possessor": 5,
    		"dative of agent with passive periphrastic": 5, 
    		"predicate dative": 8, 
    		"dative of reference with a predicate dative": 8, 
    		"dative with certain intransitive verbs": 13,
    		"dative with compound verbs": 13, 
    		"dative of reference with an impersonal verb": 16,
    		"dative of possessor of the body part in question": "Caligula",
    		"dative of purpose not used as a predicate": "Caligula",
    		"dative of advantage/disadvantage/separation": "Caligula",
    		"dative of agent in the perfect passive system": "Caligula"
    	},
    	"accusative": {
    		"accusative direct object": 1, 
    		"predicate accusative": 6, 
    		"subject accusative of an indirect statement": 6,
    		"accusative of place to which": 6,  
    		"accusative of duration of time": 7,
    		"accusative of extent of space": 7,
    		"accusative of exclamation": 15,
    		"subject accusative of an infinitive not in indirect statement": 15, 
    		"accusative of the gerund to express purpose with a verb of motion": 16, 
    		"accusative of the feeler of the feeling with an impersonal verb of emotional distress": 16, 
    		"accusative of the [gerund/gerundive] with ad to show purpose": 16, 
    		"accusative of the supine to express purpose": 17, 
    		"adverbial accusative": 18,
    		"accusative direct object of a verb in the middle voice": 18,
    		"accusative of respect": 18,
    		"predicate accusative of an infinite not in indirect statement": "Caligula"
    	},
    	"ablative": {
    		"ablative of means": 1, 
    		"ablative of manner": 3, 
    		"ablative of personal agent": 4, 
    		"ablative of separation": 6, 
    		"ablative of origin": 6, 
    		"ablative of place from which": 6, 
    		"ablative of accompaniment": 7,
    		"ablative of time when": 7,
    		"ablative of time within which": 7,
    		"ablative of respect": 8, 
    		"ablative of comparison": 9,
    		"ablative of degree of difference": 9, 
    		"ablative subject in an ablative absolute": 10, 
    		"ablative predicate in an ablative absolute": 10, 
    		"ablative of description": 10,
    		"ablative of cause": 10,
    		"ablative of possessive adjective agreeing with rē in rēfert": 16, 
    		"ablative of possessive adjective agreeing with ellipsed rē with interest by analogy with rēfert": 16, 
    		"ablative of the supine to express respect": 17, 
    		"ablative of price": 18,
    		"ablative of attendant circumstances": "Caligula",
    		"ablative with ellipsed spatial preposition": "Seneca_Thyestes"
    	},
    	"infinitive": {
    	    "subject infinitive": 1,
    	    "object infinitive": 1,
    	    "complementary infinitive": 2,
    	    "epexegetical infinitive": "Seneca_Thyestes",
    	    "infinitive of purpose": "Seneca_Thyestes"
    	}
	},
	"verb_syntax" : {
		"tense": {
        	"present": 2,
        	"imperfect": 2,
        	"future": 2,
        	"perfect": 2,
        	"pluperfect": 2,
        	"future_perfect": 2
        },
		"mood": {
        	"indicative": 2,
        	"subjunctive": 2,
        	"infinitive": 2
		},
		"construction": {
		    "indirect statement": 6,
			"purpose clause": 3,
			"indirect command": 3,
			"subordinate clause in indirect statement": 7,
			"indirect question": 12,
			"result clause": 14,
			"substantive ut clause": 14,
			"relative clause of characteristic": 14,
			"relative clause of result": 14,
			"relative clause of purpose": 14,
			"relative clause of purpose introduced by a relative adverb": 14,
			"purpose clause introduced by quō + comparative": 14,
			"cum circumstantial clause": 15,
			"cum concessive clause": 15,
			"cum causal clause": 15,
			"proviso clause": 15,
			"fear clause": 17,
			"doubting clause": 17,
			"prevention clause": 17,
			"by attraction": 18,
			"fore ut clause": 18,
			"protasis/apodosis of a future more vivid conditional sentence": 2,
			"protasis/apodosis of a future more vivid conditional sentence with emphatic protasis": 2,
			"protasis/apodosis of a future less vivid conditional sentence": 2,
			"protasis/apodosis of a present contrary to fact conditional sentence": 2,
			"protasis/apodosis of a past contrary to fact conditional sentence": 2,
			"protasis/apodosis of a mixed contrary to fact conditional sentence": 2,
			"jussive": 12,
			"present deliberative": 12,
			"past deliberative": 12,
			"present potential": 12,
			"past potential": 12,
			"hortatory": 12,
			"present optative - wish capable of fulfillment": 12,
			"present optative - wish incapable of fulfillment": 12,
			"past optative - wish incapable of fulfillment": 12,
		    "frequentative subjunctive": "Caligula", // ***"
			"subordinate clause in virtual indirect statement": "Caligula", // ***"
			"anticipatory (priusquam/antequam/dum) clause without anticipation due to subjunctivitis": "Caligula",
			"indirect question standing in for original deliberative": "Caligula",
			"2nd singular generalizing subjunctive": "Caligula"
	    },
        "sequence": {
        	"primary": 2,
        	"secondary": 2,
        	"breaking sequence for repraesentatio": "Caligula"
        },
        "relative time" : {
        	"simultaneous time": 2,
        	"prior time": 2,
        	"subsequent time": 2, 
        	"breaking sequence to emphasize actuality of result": 14
         }
    }
}