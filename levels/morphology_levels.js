/*
will contain

probably wise to add later:
morphology drop down path
how we display lexemes (AM, AM/AMAC)

*/



var morphology_levels = {
    1: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['3s'],
        // allowed_person_number: ['1s', '2s', '3s', '1p', '2p', '3p']
    },
    10: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['3s', '3p'],
        // allowed_person_number: ['1s', '2s', '3s', '1p', '2p', '3p']
    },
    20: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        // allowed_person_number: ['3s', '3p'],
        allowed_person_number: ['1s', '2s', '3s', '1p', '2p', '3p']
    },
    30: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active', 
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['3s', '3p'],
        // allowed_person_number: ['1s', '2s', '3s', '1p', '2p', '3p']
    },
    40: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active', 
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['1s', '2s', '3s', '1p', '2p', '3p']
    },
    
    
    // highly customized morphology levels to get narrow focus on dash removal
    //focus on int -> unt
    // start with 3s, 3p active only
    // corresponds to kck level 200
    // dash_hint_level: 1,
    200: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['3s', '3p']
    },
    
    // still focused onint -> unt
    // but expanding to active and passive
    // corresponds to kck level 210
    // dash_hint_level: 1,
    210: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active', 
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['3s', '3p']
    },
    
    // focus on iris -> eris  2s 3s passive only
    // corresponds to kck level 220
    // dash_hint_level: 2,
    220: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: [
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['2s', '3s']
    },
    
    // reinforcing iris -> eris by putting it in context with everything, including active
    // corresponds to kck level 230
    // dash_hint_level: 2,
    230: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active', 
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['2s', '3s', '1p', '2p', '3p']
    },
    
    
    // narrowing down to 1st person -o swallowing 
    // 3s added for comparison
    // active only
    // dash_hint_level: 4,
    // (future not able to be disabled for some reason)
    240: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active'
            ],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['1s', '3s']
    },
    
    // still focused on swallowing o, but adding passive
    // no future to avoid ham and five eggs probelms
    // corresponds to kck level 250
    // dash_hint_level: 3,
    250: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active',
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['1s', '3s']
    },
    
    // all places with dash removal changes
    // still no future
    // correponds to kck level 260
    // dash_hint_level: 3,
    260: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active',
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['1s', '2s', '3s', '3p'],
    },
    // the whole shebang, including future
    // ham and five eggs given in dash removal hint
    // corresponds to kck level 270
    // dash_hint_level: 4,
    270: {
        conjunction_override: ['c_null'],
        question_type: {'translation': 1, 'transformation': 0},
        allowed_tense_mood_voice: ['present indicative active',
            'imperfect indicative active', 'future indicative active', 
            'present indicative passive', 'imperfect indicative passive', 
            'future indicative passive'],
        // allowed_tense_mood_voice: ['present indicative active',
        //     'imperfect indicative active', 'future indicative active', 
        //     'present indicative passive', 'imperfect indicative passive', 
        //     'future indicative passive', 'perfect indicative active',
        //     'present subjunctive active', 'present subjunctive passive', 
        //     'imperfect subjunctive active', 'imperfect subjunctive passive'],
        allowed_conjugation: ['conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4'],
        allowed_person_number: ['1s', '2s', '3s', '1p', '2p', '3p']
    },
    // dash removal hint contains info about ham and five eggs
}