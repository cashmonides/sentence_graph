var etym_levels = {
    1 : {
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
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
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED', 'POD'],
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
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED', 'POD', 'ARTHR'],
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
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED', 'POD', 'ARTHR',
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
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED', 'POD', 'ARTHR',
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
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED', 'POD', 'ARTHR', 
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
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'PED', 'POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'CELL'],
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
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR', 'BI/BIN', 'QUAD/QUADR', 'TRI', 'PED', 'POD', 'ARTHR', 
        "IG/IL/IM/IN/IR root 2", 'VERTEBR', 'GASTR', 'MACRO', 'MICRO', 'MULTI', 'UNI', 'CELL', 'MONO', 
        'POLY', 'GON', 'METER/METR', 'PENT/PENTA', 'HEX/HEX', 'OCT/OCTA/OCTO', 'DEC/DEKA'],
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