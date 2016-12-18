var etym_levels = {
    
    //testing simple things don't use
    1 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR'],
        question_types: {
            'word_to_latin_root': .00001,
            'word_to_english_root': .0001,
            'word_to_translated_root': .0001,
            'english_root_to_word': .0001,
            'word_to_word_definition': .0001,
            'word_definition_to_word': .0001,
            'root_to_root_definition': .0001,
            'root_definition_to_root': .9
        }
    },
    5 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR'],
        question_types: {
            'word_to_latin_root': .00001,
            'word_to_english_root': .0001,
            'word_to_translated_root': .0001,
            'english_root_to_word': .0001,
            'word_to_word_definition': .0001,
            'word_definition_to_word': .0001,
            'root_to_root_definition': .0001,
            'root_definition_to_root': .9
        }
    },
    
    
    // //testing 10
    10 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR'],
        question_types: {
            'word_to_latin_root': .00001,
            'word_to_english_root': .0001,
            'word_to_translated_root': .0001,
            'english_root_to_word': .0001,
            'word_to_word_definition': .0001,
            'word_definition_to_word': .0001,
            'root_to_root_definition': .0001,
            'root_definition_to_root': .9
        }
    },
    //the real 10
    15 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR'],
        question_types: {
            'word_to_latin_root': 1,
            'word_to_english_root': 1,
            'word_to_translated_root': 1,
            'english_root_to_word': .1,
            'word_to_word_definition': .1,
            'word_definition_to_word': .1,
            'root_to_root_definition': .1,
            'root_definition_to_root': .1
        }
    },
    20 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED/POD'],
        question_types: {
            'word_to_latin_root': .5,
            'word_to_english_root': .5,
            'word_to_translated_root': .3,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': .5,
            'root_definition_to_root': .5
        }
    },
    30 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED/POD', 'ARTHR'],
        question_types: {
            'word_to_latin_root': .2,
            'word_to_english_root': .2,
            'word_to_translated_root': .1,
            'english_root_to_word': .7,
            'word_to_word_definition': 1.5,
            'word_definition_to_word': 1.5,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    40 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED/POD', 'ARTHR',
        "IG/IL/IM/IN/IR root 2", 'VERTEBR'],
        question_types: {
            'word_to_latin_root': 0,
            'word_to_english_root': 0,
            'word_to_translated_root': 0,
            'english_root_to_word': .5,
            'word_to_word_definition': 1.2,
            'word_definition_to_word': 1.2,
            'root_to_root_definition': 1.2,
            'root_definition_to_root': 1.2
        }
    },
    50 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED/POD', 'ARTHR',
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR'],
        question_types: {
            'word_to_latin_root': 0,
            'word_to_english_root': 0,
            'word_to_translated_root': 0,
            'english_root_to_word': .3,
            'word_to_word_definition': 1,
            'word_definition_to_word': 1,
            'root_to_root_definition': 1.5,
            'root_definition_to_root': 1.5
        }
    },
    60 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO'],
        question_types: {
            'word_to_latin_root': 0,
            'word_to_english_root': 0,
            'word_to_translated_root': 0,
            'english_root_to_word': .2,
            'word_to_word_definition': 1,
            'word_definition_to_word': 1,
            'root_to_root_definition': 2,
            'root_definition_to_root': 2
        }
    },
    70 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI'],
        question_types: {
            'word_to_latin_root': .2,
            'word_to_english_root': .2,
            'word_to_translated_root': .2,
            'english_root_to_word': .5,
            'word_to_word_definition': 1,
            'word_definition_to_word': 1,
            'root_to_root_definition': 1.7,
            'root_definition_to_root': 1.7
        }
    },
    80 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    
    /////////////////////////added stuff below - check for errors
    
    
    90 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    100 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    110 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    120 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'VID/VIS'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    130 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    140 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'SCOP/SCOPE', 'QUIN/QUINT'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    150 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    160 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    170 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'MICRO', 'METER/METR'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    180 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'MICRO', 'METER/METR'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    190 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 
        'MACRO'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    200 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 
        'MACRO', 'HEX/HEXA', 'GASTR'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    210 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 
        'MACRO', 'HEX/HEXA', 'GASTR', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    220 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 
        'MACRO', 'HEX/HEXA', 'GASTR', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    230 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 
        'MACRO', 'HEX/HEXA', 'GASTR', 'DU',  'CEPHAL', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    240 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 
        'MACRO', 'HEX/HEXA', 'GASTR', 'DU',  'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    250 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 
        'MACRO', 'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU',  'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    260 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'POLY',
        'PHOT/PHOTO', 'MULTI', 'MICRO', 'METER/METR', 'MAGN', 'MACRO', 'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU',  
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    270 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'OCT/OCTA/OCTO', 
        'MULTI', 'MICRO', 'METER/METR', 'MAGN', 'MACRO', 'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU',  
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    280 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'OCT/OCTA/OCTO', 
        'MULTI', 'MICRO', 'METER/METR', 'MATER/MATR/MATRI', 
        'MAGN', 'MACRO', 'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU',  
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    290 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'SOL', 'SEPT', 'SCOP/SCOPE', 'QUIN/QUINT', 
        'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'OCT/OCTA/OCTO', 
        'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU',  
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    300 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 
        'SOL', 'SEPT', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'OCT/OCTA/OCTO', 
        'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU',  
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    310 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 
        'SOL', 'SEPT', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'OCT/OCTA/OCTO', 
        'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    320 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 
        'SPEC/SPECT/SPIC', 'SOL', 'SEPT', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'OCT/OCTA/OCTO', 
        'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    330 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 
        'SPEC/SPECT/SPIC', 'SOL', 'SEPT', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    340 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    350 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    360 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    370 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    380 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    390 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    400 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    410 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'FRACT/FRAG', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    420 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MANIA', 'MAL', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'FRACT/FRAG', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    430 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SUB', 'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PHON', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MANIA', 'MAL', 'MAGN', 'MACRO', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'FRACT/FRAG', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    440 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SUB', 'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY',
        'PHOT/PHOTO', 'PHON', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MANIA', 'MAL', 'MAGN', 'MACRO', 'LUN/LUNA', 'HYPER', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'FRACT/FRAG', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    450 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SUB', 'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY', 'PNE/PNEUM', 
        'PHOT/PHOTO', 'PHON', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCUL', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MANIA', 'MAL', 'MAGN', 'MACRO', 'LUN/LUNA', 'HYPER', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GEO', 'GASTR', 'FRACT/FRAG', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    460 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SUB', 'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY', 'PNE/PNEUM', 
        'PHOT/PHOTO', 'PHON', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCUL', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MANIA', 'MAL', 'MAGN', 'MACRO', 'LUN/LUNA', 'HYPER', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GON', 'GEO', 'GASTR', 'FRACT/FRAG', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'CENT', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    470 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SUB', 'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCRIB/SCRIPT', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY', 'PNE/PNEUM', 
        'PHOT/PHOTO', 'PHON', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCUL', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MANIA', 'MAL', 'MAGN', 'MACRO', 'LUN/LUNA', 'KINE/KINEMAT/CINE', 'HYPER', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GON', 'GEO', 'GASTR', 'FRACT/FRAG', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'CENT', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    },
    480 : {
        roots: ['CARN', 'HERB', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED/POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'MON/MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEXA', 'OCT/OCTA/OCTO', 'DEC/DEKA', 'XEN/XENO', 
        'VIV/VIT', 'VID/VIS', 'VAC', 'UNI', 'UN', 'THERM', 'TERR', 'TEL/TELE', 
        'SUB', 'SPEC/SPECT/SPIC', 'SOMN/SOMNI', 'SOL', 'SEPT', 'SEMI', 'SCRIB/SCRIPT', 'SCOP/SCOPE', 
        'QUIN/QUINT', 'QUART', 'QUAD/QUADR', 'PSEUD/PSEUDO', 'PROT/PROTO', 'PRE', 'PORT', 'POLY', 'PNE/PNEUM', 
        'PHOT/PHOTO', 'PHON', 'PHOB', 'PENT/PENTA', 'PATER/PATR/PATRI', 'PAN', 'PALE/PALEO', 'OCUL', 'OCT/OCTA/OCTO', 
        'NOV', 'NEG', 'MULTI', 'MORPH', 'MILL', 'MICRO', 'METER/METR', 'MEGA', 'MEDI', 'MAX', 'MATER/MATR/MATRI', 
        'MAR/MARI/MARIN', 'MANIA', 'MAL', 'MAGN', 'MACRO', 'LUN/LUNA', 'KINE/KINEMAT/CINE', 'KILO', 'HYPER', 'HYDR', 
        'HEX/HEXA', 'HEPT/HEPTA', 'GON', 'GEO', 'GASTR', 'FRACT/FRAG', 'FLOR/FLEUR', 'EXTRA/EXTRO', 'DU', 'DECI', 
        'CHRON', 'CEPHAL', 'CENT', 'BIO/BI', 'BI/BIN', 'AVI', 'AUD/AUDI/AUDIO', 'ASTRO/ASTER', 'AQU/AQUA', 'ANIM', 'AMBI/AMPHI'],
        question_types: {
            'word_to_latin_root': .4,
            'word_to_english_root': .4,
            'word_to_translated_root': .4,
            'english_root_to_word': .5,
            'word_to_word_definition': .7,
            'word_definition_to_word': .7,
            'root_to_root_definition': 1,
            'root_definition_to_root': 1
        }
    }
}