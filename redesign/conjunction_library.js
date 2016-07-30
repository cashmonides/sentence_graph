var conjunction_library = {
    c_null: {
        //citation_name: "c_null",
        type: "dummy main",
        english_form: null,
        latin_form: null,
        ssslatin_form: null,
        // not really relevant
        removable: null,
        // not sure how these will work
        k_left_construction: 'main',
        // not sure how these will work
        k_right_construction: null,
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: 'indicative',
            ssslatin: 'indicative'
        },
        k_right_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_null_potential_subjunctive: {
        type: "dummy main",
        english_form: null,
        latin_form: null,
        ssslatin_form: null,
        // not really relevant
        removable: null,
        // not sure how these will work
        k_left_construction: 'independent subjunctive',
        // not sure how these will work
        k_right_construction: null,
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_right_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_left_time_restriction: {
            english: null,
            latin: 'simultaneous',
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_left_translation_formula: {
            'english': {
                'primary': 'can verb no -s',
                'secondary': 'could verb no -s'
            }
        }
    },
    c_and: {
        type: "coordinating",
        english_form: 'and',
        latin_form: 'et',
        ssslatin_form: 'ssset',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'coordinate',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_but: {
        type: "coordinating",
        english_form: 'but',
        latin_form: 'sed',
        ssslatin_form: 'ssssed',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'coordinate',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_or: {
        type: "coordinating",
        english_form: 'or',
        latin_form: 'aut',
        ssslatin_form: 'sssaut',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'coordinate',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_when: {
        type: "subordinating",
        english_form: 'when',
        latin_form: 'ubi',
        ssslatin_form: 'sssubi',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'temporal',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'indicative',
            ssslatin: 'indicative'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_purpose: {
        type: "subordinating",
        english_form: 'in order that',
        latin_form: 'ut',
        ssslatin_form: 'sssut',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'purpose',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: 'simultaneous',
            ssslatin: 'simultaneous'
        },
        k_right_translation_formula: {
            'english': {
                'primary': 'may verb no -s',
                'secondary': 'might verb no -s'
            }
        }
    },
    /*
    c_indirect_command: {
        type: "subordinating",
        english_form: 'that',
        latin_form: 'ut',
        ssslatin_form: 'sssut',
        removable: false,
        k_left_construction: null,
        k_right_construction: 'indirect command',
        k_left_lexical_restriction: 'verb of commanding',
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: 'simultaneous',
            ssslatin: 'simultaneous'
        },
        k_right_translation_formula: {
            'english': {
                'primary': 'verb no -s',
                'secondary': 'verb'
            }
        }
    },
    c_fear: {
        type: "subordinating",
        english_form: 'that',
        latin_form: 'nē',
        ssslatin_form: 'sssnē',
        removable: false,
        k_left_construction: null,
        k_right_construction: 'fear',
        k_left_lexical_restriction: 'verb of fearing',
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_cum_when: {
        type: "subordinating",
        english_form: 'when',
        latin_form: 'cum',
        ssslatin_form: 'ssscum',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'cum temporal',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'indicative',
            ssslatin: 'indicative'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_cum_because: {
        type: "subordinating",
        english_form: 'because',
        latin_form: 'cum',
        ssslatin_form: 'ssscum',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'cum causal',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_cum_circumstantial: {
        type: "subordinating",
        english_form: 'under the circumstances when',
        latin_form: 'cum',
        ssslatin_form: 'ssscum',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'cum circumstantial',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: 'prior',
            ssslatin: 'prior'
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_because_allegedly: {
        type: "subordinating",
        english_form: 'because allegedly',
        latin_form: 'quod',
        ssslatin_form: 'sssquod',
        removable: true,
        k_left_construction: null,
        k_right_construction: 'causal',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_why: {
        type: "subordinating",
        english_form: 'why',
        latin_form: 'cūr',
        ssslatin_form: 'ssscūr',
        removable: false,
        k_left_construction: null,
        k_right_construction: 'indirect question',
        k_left_lexical_restriction: 'mental',
        k_left_mood_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        },
        k_right_time_restriction: {
            english: null,
            latin: null,
            ssslatin: null
        }
    },
    c_if_flv: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        removable: false,
        k_left_construction: 'apodosis_flv',
        k_right_construction: 'protasis_flv',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: 'simultaneous',
            ssslatin: 'simultaneous',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'simultaneous',
            ssslatin: 'simultaneous'
        }
    },
    c_if_fmv: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        removable: false,
        k_left_construction: 'apodosis_fmv',
        k_right_construction: 'protasis_fmv',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: 'indicative',
            ssslatin: 'indicative'
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'indicative',
            ssslatin: 'indicative'
        },
        k_left_time_restriction: {
            english: null,
            latin: 'subsequent',
            ssslatin: 'subsequent',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'subsequent',
            ssslatin: 'subsequent'
        }
    },
    c_if_fmve: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        removable: false,
        k_left_construction: 'apodosis_fmve',
        k_right_construction: 'protasis_fmve',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: 'indicative',
            ssslatin: 'indicative'
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'indicative',
            ssslatin: 'indicative'
        },
        k_left_time_restriction: {
            english: null,
            latin: 'subsequent',        //should we override to future perfect here?
            ssslatin: 'subsequent',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'subsequent',
            ssslatin: 'subsequent'
        }
    },
    c_if_present_ctf: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        removable: false,
        k_left_construction: 'apodosis_present_ctf',
        k_right_construction: 'protasis_present_ctf',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: 'simultaneous',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'simultaneous',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'simultaneous',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'simultaneous'
        }
    },
    c_if_past_ctf: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        removable: false,
        k_left_construction: 'apodosis_past_ctf',
        k_right_construction: 'protasis_past_ctf',
        k_left_lexical_restriction: null,
        k_left_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_right_mood_restriction: {
            english: null,
            latin: 'subjunctive',
            ssslatin: 'subjunctive'
        },
        k_left_time_restriction: {
            english: null,
            latin: 'prior',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'prior',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'prior',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'prior'
        }
    },
    */
}