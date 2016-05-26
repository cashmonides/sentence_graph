// syntax mode.

var syntax_module_filter = {
	"noun_syntax" : {
		"nominative": {
			"subject nominative": 1, 
			"predicate nominative": 1,
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
    		"genitive with expression of memory": 18
    	},
    
    	"dative": {
    		"dative of possessor": 5,
    		"dative of agent with passive periphrastic": 5, 
    		"predicate dative": 8, 
    		"dative of reference with a predicate dative": 8, 
    		"dative with certain intransitive verbs": 13,
    		"dative with compound verbs": 13, 
    		"dative of reference with an impersonal verb": 16
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
    		"accusative of respect": 18
    	},
    	"ablative": {
    		"ablative of means": 3, 
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
    		"ablative of possessive adjective agreeing with ellipsed rē with interest by analogy with rēfert": 16, 
    		"ablative of the supine to express respect": 17, 
    		"ablative of price": 18
    	}
	},
	"verb_syntax" : {
		"tense": {
        	"present": 2,
        	"imperfect": 2,
        	"future": 2,
        	"perfect": 2,
        	"pluperfect": 2
        },
		"mood": {
        	"indicative": 2,
        	"subjunctive": 2,
        	"infinitive": 2
		},
		"construction": {
		    "indirect statement": 5,
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
			"past optative - wish incapable of fulfillment": 12
			},
        "sequence": {
            	"primary": 2,
            	"secondary": 2
            },
        "relative time" : {
            	"simultaneous time": 2,
            	"prior time": 2, 
            	"subsequent time": 2, 
            	"breaking sequence to emphasize actuality of result": 14
            }
    }
}

var syntax_mode_test_sentences = [
    "{\"class_id\":1,\"words\":[\"Nisi\",\"fēminae\",\"nautās\",\"sententiārum\",\"dē\",\"incolīs\",\"dāmnābunt\",\"incolae\",\"in\",\"prōvinciā\",\"nōn\",\"labōrābunt\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[7],\"tags\":[]},{\"class_id\":2,\"indices\":[8],\"tags\":[]},{\"class_id\":2,\"indices\":[9],\"tags\":[]},{\"class_id\":2,\"indices\":[10],\"tags\":[]},{\"class_id\":2,\"indices\":[11],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]}],\"text\":\"Nisi fēminae nautās sententiārum dē incolīs dāmnābunt, incolae in prōvinciā nōn labōrābunt.\",\"language_of_sentence\":\"mf\",\"chapter\":2,\"number\":13}",
    "{\"class_id\":1,\"words\":[\"Nisī\",\"tacuisset\",\"miserum\",\"monuissem\",\"ut\",\"lacrimās\",\"cēlāret\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=imperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=indirect command\"},{\"class_id\":3,\"type\":\"s=secondary\"},{\"class_id\":3,\"type\":\"r=subsequent time\"}]}],\"text\":\"Nisī tacuisset, miserum monuissem ut lacrimās cēlāret.\",\"language_of_sentence\":\"mf\",\"chapter\":3,\"number\":15}"
].map(JSON.parse);


var tag_first_to_type = {
    't': 'tense',
    'm': 'mood',
    'c': 'construction',
    's': 'sequence',
    'r': 'relative time'
}

var drop_down_types = ['tense', 'mood', 'construction', 'sequence', 'relative time'];

var is_tag_we_care_about = function (tag) {
    return tag.class_id === 3;
}

var with_tags = function (region) {
    return {'indices': region.indices, 'tags': region.tags.filter(
        is_tag_we_care_about)}
}

var has_tags = function (x) {
    return x.tags.length > 0;
}

var parse_firebase_syntax_data = function (sentence_data) {
    console.log(sentence_data);
    var sentence_text = sentence_data.words;
    var regions_with_tags = sentence_data.regions.map(with_tags).filter(has_tags);
    return regions_with_tags.map(function (x) {
        var r = {
            'text': sentence_data.text,
            'chapter': sentence_data.chapter,
            'number': sentence_data.number,
            'indices': x.indices
        };
        for (var i = 0; i < x.tags.length; i++) {
            r[tag_first_to_type[x.tags[i].type[0]]] = x.tags[i].type.slice(2);
        }
        return r;
    });
}

var allowed_options_repository = function () {
    var known = {};
    return function (chapter, type) {
        if (chapter + '/' + type in known) {
            return known[chapter + '/' + type];
        }
        chapter = Number(chapter);
        var d = syntax_module_filter.verb_syntax[type];
        var r = Object.keys(d).filter(function (x) {
            return d[x] <= chapter;
        });
        known[chapter + '/' + type] = r;
        return r;
    }
}

var get_allowed_options = allowed_options_repository();

var has_choices = function (x) {
    return x.choices.length > 0;
}

var convert_syntax_data_to_drop_down_data = function (data) {
    var r = data.map(function (x) {
        var drop_downs = drop_down_types.map(function (y) {
            return {
                'type': y,
                'choices': get_allowed_options(x.chapter, y),
                'correct_answer': x[y]
            }
        }).filter(function (x) {
            return has_choices(x) && x.correct_answer !== 'not applicable'
        });
        return {
            'sentence': x.text,
            'question': "Give the syntax of the highlighted word.",
            'target_indices': x.indices,
            'drop_downs': drop_downs
        }
    });
    
    return r.sort(function (x, y) {
        var a = x.target_indices[0];
        var b = y.target_indices[0];
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else if (a === b) {
            return 0;
        } else {
            throw 'Impossible ordering!'
        }
    })
}

var get_sentence_from_firebase = function (chapter_n, question_n) {
    return random_choice(syntax_mode_test_sentences);
}

var make_syntax_question = function (chapter_n, question_n) {
    return convert_syntax_data_to_drop_down_data(
        parse_firebase_syntax_data(
            get_sentence_from_firebase(chapter_n, question_n)));
}

var SyntaxModeGame = function(){
    this.data = null;
    this.quiz = null;
    // todo we here assume that 1 is the initial level
    this.level = 1;    //we might replace this with this.current_chapter & this.current_question
    this.current_chapter = 1;
    this.current_question = 1;
};

SyntaxModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
SyntaxModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
SyntaxModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

SyntaxModeGame.prototype.get_mode_name = function () {
    return 'syntax';
}

SyntaxModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false

    //todo
    set_display("latin_answer_choices", 'initial');  //we'll just use this part for syntax answer choices, should work the same
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'none');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
    
};

// set_level now moved up
SyntaxModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}


SyntaxModeGame.prototype.get_mode_name = function() {
    return "syntax";
};

SyntaxModeGame.prototype.on_last_region = function () {
    return this.data.length - 1 === this.region_number;
}

SyntaxModeGame.prototype.next_question = function () {
    if (!(this.data) || this.on_last_region()) {
        this.current_question++;
        this.region_number = 0;
        this.data = make_syntax_question(this.current_chapter, this.current_question);
    } else {
        this.region_number++;
    }
    
    var data = this.data[this.region_number];
    
    this.question = data.question;
    this.sentence = data.sentence;                 // text displayed in display box
    this.target_indices = data.target_indices;      // highlighted word if necessary

    
    
    //changes the score, progress bar, etc.
    this.quiz.update_display();
    
    // todo Dan commented this line out, maybe it should stay.
    // Quiz.set_question_text("DUMMY QUESTION, e.g. give the syntax of the highlighted word:");
    
    // We should probably set the question type to the question asked.
    Quiz.set_question_text(this.question);
    this.quiz.set_word_selector(data.sentence);
    
    
    //drop_downs is a list of dictionaries
        //each dictionary has 3 properties:
        //heading
        //choices
        //correct answer (string or index?)
    //is the following formulation otiose? should we just do data.drop_downs?
    this.drop_downs = data.drop_downs;
    
    this.give_away_phrase = "DUMMY GIVE AWAY PHRASE - HIT SKIP IF YOU WANT TO SKIP";
    this.give_away_ending_phrase = "DUMMY GIVE AWAY ENDING PHRASE - BETTER LUCK NEXT TIME";
    this.correct_answer = this.drop_downs.map(function (x) {
        return x.correct_answer || x.non_drop_text}).join(' ');
    
    console.log("DEBUG entering 1st random_choice");
    this.none_display = true;
    
    
    remove_element_by_id("latin_answer_choices");
    
    var new_answer_choices = document.createElement('div');
    
    new_answer_choices.id = "latin_answer_choices";
    
    el('drop_downs').appendChild(new_answer_choices);
    
    
    
    var e = document.createElement('div');
    e.id = 'latin_answer_wrapper';
    new_answer_choices.appendChild(e);
    
    //todo - I found this in the code - what is the point of it?
    // remove_children(document.getElementById("answer_choices"));
    //todo why is this capitalized
    Quiz.set_question_text(this.question);
    this.quiz.set_word_selector(this.sentence);
    
   
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }

    // Hacky way to guarantee a drop down.
    var x = this.make_drop_down(e);
    if (x === 0) {this.next_question()}

};

SyntaxModeGame.prototype.display = function (x) {
    return x.type === 'non_drop' || x.correct_answer || this.none_display;
};

//master function makes all the drops and non-drops
SyntaxModeGame.prototype.make_drop_down = function (e) {
    //initialize a count of how many drop down menus we'll have
    // if it remains 0 we start all over again
    var drops = 0;
    var self = this;
    
    //this.drop_downs is a list of drops and non-drops
    //each item in the list is a dictionary and has a type
    // type = drop or non-drop
    // dictionary for drop = heading, choices
    // dictionary for non-drop = non-drop text
    this.drop_downs.forEach(function (x) {
        if (self.display(x)) {
            switch (x.type) {
                case 'non_drop':
                    // todo make sure this fix works
                    var e1 = document.createTextNode(x.non_drop_text || '');
                    e.appendChild(e1);
                    break;
                case 'drop down':
                    // e = element we're appending to
                    // x = dictionary with the following properties
                    //x.choices = ['bear', 'bears']
                    //x.heading = "subject"
                    //self.none_display = bool
                    set_multiple_drop_downs(x, e, self.none_display);
                    drops++
                    break;
                default:
                    throw new Error('Drop downs should have a type.')
            }
            e.appendChild(document.createTextNode(' '))
        }
    });
    return drops
};



SyntaxModeGame.prototype.process_answer = function(){
    
    
    
    var self = this;
    var is_correct = this.drop_downs.every(function (x) {
        return (x.type === 'non_drop') || (!self.display(x)) ||
            (selected_option(x.HTML_element) === strip(x.correct_answer || x.none_option || 'none'))});
    if (is_correct) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};





SyntaxModeGame.prototype.process_correct_answer = function () {
    this.quiz.increment_score();
    
    console.log("DEBUG entering 2nd random_choice");
    var cell_1 = random_choice(SyntaxModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;

    this.quiz.question_complete();
};



SyntaxModeGame.prototype.process_incorrect_answer = function () {
    this.quiz.submodule.incorrect_streak ++;
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG if not triggered");
    }
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        console.log("DEBUG entering 3rd random_choice");
        
        var cell_1 = random_choice(SyntaxModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(SyntaxModeGame.cell_3_feedback_wrong);
        
        
        
        console.log("DEBUG leaving 3rd random_choice");
        
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_3;
    } else {
        this.give_away_answer();
    }
    this.quiz.update_display();
    
    //todo check if this is the right place to clear the word selector
    this.quiz.word_selector.clear();
};

SyntaxModeGame.prototype.give_away_answer = function (){
    var fbox = el("feedbackbox");
    fbox.innerHTML = this.give_away_phrase + this.correct_answer + this.give_away_ending_phrase;
    this.quiz.question_complete();
};


