var latin_role_to_preposition = {
    'subject': null,
    'object': null,
    'personal agent': {
        'before vowel': 'ā',
        'before consonent': 'ab'
    }
}

var latin_role_to_case = {
    'subject': 'nominative',
    'object': 'accusative',
    'personal agent': 'ablative'
}

var latin_gender_and_declension_to_declension_for_endings = {
    '1': {
        'm': '1',
        'f': '1',
        'n': null
    },
    '2': {
        'm': '2m',
        'f': null,
        'n': '2n'
    },
    '3': {
        'm': '3m/f',
        'f': '3m/f',
        'n': '3n'
    },
    '3i': {
        'm': '3im/f',
        'f': '3im/f',
        'n': '3in'
    }
}

var latin_noun_declining_dictionary = {
    '1': {
        'singular': {
            'nominative': 'a',
            'genitive': 'ae',
            'dative': 'ae',
            'accusative': 'am',
            'ablative': 'ā'
        },
        'plural': {
            'nominative': 'ae',
            'genitive': 'ārum',
            'dative': 'īs',
            'accusative': 'ās',
            'ablative': 'īs'
        }
    },
    '2m': {
        'singular': {
            'nominative': 'us',
            'genitive': 'ī',
            'dative': 'ō',
            'accusative': 'um',
            'ablative': 'ō'
        },
        'plural': {
            'nominative': 'ī',
            'genitive': 'ōrum',
            'dative': 'īs',
            'accusative': 'ōs',
            'ablative': 'īs'
        }
    },
    '2n': {
        'singular': {
            'nominative': 'um',
            'genitive': 'ī',
            'dative': 'ō',
            'accusative': 'um',
            'ablative': 'ō'
        },
        'plural': {
            'nominative': 'a',
            'genitive': 'ōrum',
            'dative': 'īs',
            'accusative': 'a',
            'ablative': 'īs'
        }
    },
    '3m/f': {
        'singular': {
            'nominative': '[stars]',
            'genitive': 'is',
            'dative': 'ī',
            'accusative': 'em',
            'ablative': 'e'
        },
        'plural': {
            'nominative': 'ēs',
            'genitive': 'um',
            'dative': 'ibus',
            'accusative': 'ēs',
            'ablative': 'ibus'
        }
    },
    '3n': {
        'singular': {
            'nominative': '[stars]',
            'genitive': 'is',
            'dative': 'ī',
            'accusative': '[stars]',
            'ablative': 'e'
        },
        'plural': {
            'nominative': 'a',
            'genitive': 'um',
            'dative': 'ibus',
            'accusative': 'a',
            'ablative': 'ibus'
        }
    },
    '3im/f': {
        'singular': {
            'nominative': '[stars]',
            'genitive': 'is',
            'dative': 'ī',
            'accusative': 'em',
            'ablative': 'e'
        },
        'plural': {
            'nominative': 'ēs',
            'genitive': 'ium',
            'dative': 'ibus',
            'accusative': 'ēs/īs',
            'ablative': 'ibus'
        }
    },
    '3in': {
        'singular': {
            'nominative': '[stars]',
            'genitive': 'is',
            'dative': 'ī',
            'accusative': '[stars]',
            'ablative': 'ī'
        },
        'plural': {
            'nominative': 'ia',
            'genitive': 'ium',
            'dative': 'ibus',
            'accusative': 'ia',
            'ablative': 'ibus'
        }
    }
}