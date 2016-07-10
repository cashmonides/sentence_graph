var conjunction_library = {
    c_null: {
        type: "dummy main",
        english_form: null,
        latin_form: null,
        ssslatin_form: null,
        // not sure how these will work
        k_left_clause_type: null,
        // not sure how these will work
        k_right_clause_type: 'main',
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
    c_null_independent_subjunctive: {
        type: "dummy main",
        english_form: null,
        latin_form: null,
        ssslatin_form: null,
        // not sure how these will work
        k_left_clause_type: null,
        // not sure how these will work
        k_right_clause_type: 'independent subjunctive',
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
    c_and: {
        type: "coordinating",
        english_form: 'and',
        latin_form: 'et',
        ssslatin_form: 'ssset',
        k_left_clause_type: null,
        k_right_clause_type: 'coordinate',
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
        k_left_clause_type: null,
        k_right_clause_type: 'coordinate',
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
        k_left_clause_type: null,
        k_right_clause_type: 'coordinate',
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
        k_left_clause_type: null,
        k_right_clause_type: 'temporal',
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
        k_left_clause_type: null,
        k_right_clause_type: 'purpose',
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
            latin: 'present',
            ssslatin: 'present'
        }
    },
    c_indirect_command: {
        type: "subordinating",
        english_form: 'that',
        latin_form: 'ut',
        ssslatin_form: 'sssut',
        k_left_clause_type: null,
        k_right_clause_type: 'indirect command',
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
            latin: 'present',
            ssslatin: 'present'
        }
    },
    c_fear: {
        type: "subordinating",
        english_form: 'that',
        latin_form: 'nē',
        ssslatin_form: 'sssnē',
        k_left_clause_type: null,
        k_right_clause_type: 'fear',
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
        k_left_clause_type: null,
        k_right_clause_type: 'cum temporal',
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
        k_left_clause_type: null,
        k_right_clause_type: 'cum causal',
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
        english_form: 'because',
        latin_form: 'cum',
        ssslatin_form: 'ssscum',
        k_left_clause_type: null,
        k_right_clause_type: 'cum circumstantial',
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
            latin: 'past',
            ssslatin: 'past'
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
        k_left_clause_type: null,
        k_right_clause_type: 'temporal',
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
        k_left_clause_type: null,
        k_right_clause_type: 'indirect question',
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
        k_left_clause_type: 'protasis_flv',
        k_right_clause_type: 'apodosis_flv',
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
            latin: 'present',
            ssslatin: 'present',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'present',
            ssslatin: 'present'
        }
    },
    c_if_fmv: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        k_left_clause_type: 'protasis_fmv',
        k_right_clause_type: 'apodosis_fmv',
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
            latin: 'future',
            ssslatin: 'future',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'future',
            ssslatin: 'future'
        }
    },
    c_if_fmve: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        k_left_clause_type: 'protasis_fmve',
        k_right_clause_type: 'apodosis_fmve',
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
            latin: 'future',        //should we override to future perfect here?
            ssslatin: 'future',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'future',
            ssslatin: 'future'
        }
    },
    c_if_present_ctf: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        k_left_clause_type: 'protasis_present_ctf',
        k_right_clause_type: 'apodosis_present_ctf',
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
            latin: 'present',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'present',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'present',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'present'
        }
    },
    c_if_past_ctf: {
        type: "subordinating conditional",
        english_form: 'if',
        latin_form: 'sī',
        ssslatin_form: 'ssssī',
        k_left_clause_type: 'protasis_past_ctf',
        k_right_clause_type: 'apodosis_past_ctf',
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
            latin: 'past',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'past',
        },
        k_right_time_restriction: {
            english: null,
            latin: 'past',      //should we just have an override here? overriding to imperfect?
            ssslatin: 'past'
        }
    },
}