var allowed_max = {
    'relative time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary', 'secondary'],
    'latin_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative', 'perfect indicative', 'pluperfect indicative'],
    'voice' : ['active', 'passive'],
    'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
    'conjunctions': 'all_conjunctions',
    'red herring': 'true'
}

var allowed_high = {
    'relative time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary'],
    'latin_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative'],
    'voice' : ['active', 'passive'],
    'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
    'conjunctions': ['c_null', 'c_and', 'c_or', 'c_but', 'c_purpose', 'c_when'],
    'red herring': 'true'
}


var allowed_medium = {
    'relative time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary'],
    'latin_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative'],
    'voice' : ['active', 'passive'],
    'person_and_number' : ['1s', '2s', '3s', '1p', '2p', '3p'],
    'conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when'],
    'red herring': 'false'
}


var allowed_min = {
    'relative time' : ['simultaneous', 'prior', 'subsequent'],
    'sequence': ['primary'],
    'latin_indicative_tenses_allowed' : ['present indicative', 'future indicative', 
        'imperfect indicative'],
    'voice' : ['active'],
    'person_and_number' : ['3s', '3p'],
    'conjunctions': ['c_null', 'c_and', 'c_purpose', 'c_when'],
    'red herring': 'false'
}