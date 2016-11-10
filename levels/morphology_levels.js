/*
will contain

probably wise to add later:
morphology drop down path
how we display lexemes (AM, AM/AMAC)

*/



var morphology_levels = {
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
    120: {
        conjunction_override: ['c_null', 'c_null_potential_subjunctive'],
        question_type: {'translation': 1, 'transformation': 0}
    },
    
    
    
}