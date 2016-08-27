var drop_display_levels = {


    //equal distribution of s, v  and o
    //only one drop
    //no extras
    10: {
        drop_non_drop_map: {'subject_drop': 0, 'verb_drop': 1, 'object_drop': 0, 'conjunction_drop': 1,
            min: 1, max: 1},
        drop_down_settings: {
            noun: {
                extra_options: 0
            },
            verb: {
                extra_options: 2
            },
            conjunction: {
                extra_options: 2
            }
        },
        none_display: [false]
    },
    20: {
        drop_non_drop_map: {'subject_drop': 0, 'verb_drop': 1, 'object_drop': 0, 'conjunction_drop': 1,
            min: 1, max: 2},
        drop_down_settings: {
            noun: {
                extra_options: 0
            },
            verb: {
                extra_options: 3
            },
            conjunction: {
                extra_options: 3
            }
        },
        none_display: [false]
    },
    //equal distribution of s, v  and o
    //drops 1-2
    //no extras
    
    //equal distribution of s, v  and o
    //drops 1-3
    //no extras
    //equal distribution of s, v  and o
    //drops 2-3
    //no extras
    40: {
        drop_non_drop_map: {'subject_drop': .1, 'verb_drop': .1, 'object_drop': .1, 'conjunction_drop': 0,
            min: 2, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //equal distribution of s, v  and o
    //drops 3
    //no extras
    50: {
        drop_non_drop_map: {'subject_drop': 1, 'verb_drop': 1, 'object_drop': 1, 'conjunction_drop': 0,
            min: 3, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    
    
    //////////////////////////////////
    
    
    //verb only
    //1 drop
    //no extras
    110: {
        drop_non_drop_map: {'subject_drop': 0, 'verb_drop': 1, 'object_drop': 0, 'conjunction_drop': 0,
            min: 1, max: 1},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //verb dominant 1 vs. .3
    //1-2 drops
    //no extras
    120: {
        drop_non_drop_map: {'subject_drop': 0.3, 'verb_drop': 1, 'object_drop': 0.3, 'conjunction_drop': 0,
            min: 1, max: 2},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //verb dominant 1 vs. .3
    //1-3 drops
    //no extras
    130: {
        drop_non_drop_map: {'subject_drop': 0.3, 'verb_drop': 1, 'object_drop': 0.3, 'conjunction_drop': 0,
            min: 1, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //verb dominant 1 vs. .3
    //2-3 drops
    //no extras
    140: {
        drop_non_drop_map: {'subject_drop': 0.3, 'verb_drop': 1, 'object_drop': 0.3, 'conjunction_drop': 0,
            min: 2, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //verb dominant 1 vs. .3
    //3 drops
    //no extras
    150: {
        drop_non_drop_map: {'subject_drop': 0.3, 'verb_drop': 1, 'object_drop': 0.3, 'conjunction_drop': 0,
            min: 3, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    
    //////////////////////////////////
    
    //verb dominant 1 vs. .7
    //1-2 drops
    //no extras
    160: {
        drop_non_drop_map: {'subject_drop': 0.7, 'verb_drop': 1, 'object_drop': 0.7, 'conjunction_drop': 0,
            min: 1, max: 2},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //verb dominant 1 vs. .7
    //1-3 drops
    //no extras
    170: {
        drop_non_drop_map: {'subject_drop': 0.7, 'verb_drop': 1, 'object_drop': 0.7, 'conjunction_drop': 0,
            min: 1, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //verb dominant 1 vs. .7
    //2-3 drops
    //no extras
    180: {
        drop_non_drop_map: {'subject_drop': 0.7, 'verb_drop': 1, 'object_drop': 0.7, 'conjunction_drop': 0,
            min: 2, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    //verb dominant 1 vs. .7
    //3 drops
    //no extras
    190: {
        drop_non_drop_map: {'subject_drop': 0.7, 'verb_drop': 1, 'object_drop': 0.7, 'conjunction_drop': 0,
            min: 3, max: 3},
        drop_down_settings: {
            noun: {
                extra_options: 0,
                lexicon_dummies: 0,
                swap: true
            },
            verb: {
                extra_options: 0,
                lexicon_dummies: 0
            }
        },
        none_display: [false]
    },
    
}