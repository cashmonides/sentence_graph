//VERBOSE VERSION OF beginning
var latin_verb_morphology_beginning = {
    'present indicative active': 'root_2',
    'present indicative passive': 'root_2',
    'imperfect indicative active': 'root_2',
    'imperfect indicative passive': 'root_2',
    'future indicative active': 'root_2',
    'future indicative passive': 'root_2',
    'present subjunctive active': 'root_2',
    'present subjunctive passive': 'root_2',
    'imperfect subjunctive active': 'root_2',
    'imperfect subjunctive passive': 'root_2',
    'present infinitive active': 'root_2',
    'present infinitive passive': 'root_2',
    'perfect indicative active': 'root_3',
    'perfect indicative passive': 'root_4',
    'pluperfect indicative active': 'root_3',
    'pluperfect indicative passive': 'root_4',
    'future perfect indicative active': 'root_3',
    'future perfect indicative passive': 'root_4',
    'perfect subjunctive active': 'root_3',
    'perfect subjunctive passive': 'root_4',
    'pluperfect subjunctive active': 'root_3',
    'pluperfect subjunctive passive': 'root_4',
    'perfect infinitive active': 'root_3',
    'perfect infinitive passive': 'root_4'
}



//VERBOSE VERSION OF middle
var latin_verb_morphology_middle = {
    'present indicative active': {
            'conjugation 1': '-ā',
            'conjugation 2': '-ē',
            'conjugation 3': '-i',
            'conjugation 3i': '-i',
            'conjugation 4': '-ī',
    },
    'present indicative passive': {
            'conjugation 1': '-ā',
            'conjugation 2': '-ē',
            'conjugation 3': '-i',
            'conjugation 3i': '-i',
            'conjugation 4': '-ī',
    },
    'imperfect indicative active': {
            'conjugation 1': '-ābā',
            'conjugation 2': '-ēbā',
            'conjugation 3': '-ēbā',
            'conjugation 3i': '-iēbā',
            'conjugation 4': '-iēbā',
    },
    'imperfect indicative passive': {
            'conjugation 1': '-ābā',
            'conjugation 2': '-ēbā',
            'conjugation 3': '-ēbā',
            'conjugation 3i': '-iēbā',
            'conjugation 4': '-iēbā',
    },
    'future indicative active': {
            'conjugation 1': '-ābi',
            'conjugation 2': '-ēbi',
            'conjugation 3': '-ē',
            'conjugation 3i': '-iē',
            'conjugation 4': '-iē',
    },
    'future indicative passive': {
            'conjugation 1': '-ābi',
            'conjugation 2': '-ēbi',
            'conjugation 3': '-ē',
            'conjugation 3i': '-iē',
            'conjugation 4': '-iē',
    },
    'present subjunctive active': {
            'conjugation 1': '-ē',
            'conjugation 2': '-eā',
            'conjugation 3': '-ā',
            'conjugation 3i': '-iā',
            'conjugation 4': '-iā',
    },
    'present subjunctive passive': {
            'conjugation 1': '-ē',
            'conjugation 2': '-eā',
            'conjugation 3': '-ā',
            'conjugation 3i': '-iā',
            'conjugation 4': '-iā',
    },
    'imperfect subjunctive active': {
            'conjugation 1': '-ārē',
            'conjugation 2': '-ērē',
            'conjugation 3': '-erē',
            'conjugation 3i': '-erē',
            'conjugation 4': '-īrē',
    },
    'imperfect subjunctive passive': {
            'conjugation 1': '-ārē',
            'conjugation 2': '-ērē',
            'conjugation 3': '-erē',
            'conjugation 3i': '-erē',
            'conjugation 4': '-īrē',
    },
    'present infinitive active': {
            'conjugation 1': '-āre',
            'conjugation 2': '-ēre',
            'conjugation 3': '-ere',
            'conjugation 3i': '-ere',
            'conjugation 4': '-īre',
    },
    'present infinitive passive': {
            'conjugation 1': '-ārī',
            'conjugation 2': '-ērī',
            'conjugation 3': '-ī',
            'conjugation 3i': '-ī',
            'conjugation 4': '-īrī',
    },
    'perfect indicative active': '-___',
    'perfect indicative passive': 'Dummy Agreement marker',
    'pluperfect indicative active': '-erā',
    'pluperfect indicative passive': 'Dummy Agreement marker',
    'future perfect indicative active': '-eri#',
    'future perfect indicative passive': 'Dummy Agreement marker',
    'perfect subjunctive active': '-eri%',
    'perfect subjunctive passive': 'Dummy Agreement marker',
    'pluperfect subjunctive active': '-issē',
    'pluperfect subjunctive passive': 'Dummy Agreement marker',
    'perfect infinitive active': '-isse',
    'perfect infinitive passive': 'Dummy Agreement marker'
}



//VERBOSE VERSION OF ENDINGS
var latin_verb_morphology_ending = {
    'present indicative active': {
        '1s': '-ō',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'present indicative passive': {
        '1s': '-or',
        '2s': '-ris',
        '3s': '-tur',
        '1p': '-mur',
        '2p': '-minī',
        '3p': '-ntur'
    },
    'imperfect indicative active': {
        '1s': '-m',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'imperfect indicative passive': {
        's': '-r',
        '2s': '-ris',
        '3s': '-tur',
        '1p': '-mur',
        '2p': '-minī',
        '3p': '-ntur'
    },
    'future indicative active': {
        '1s': '-ō',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'future indicative passive': {
        '1s': '-or',
        '2s': '-ris',
        '3s': '-tur',
        '1p': '-mur',
        '2p': '-minī',
        '3p': '-ntur'
    },
    'present subjunctive active': {
        '1s': '-m',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'present subjunctive passive': {
        '1s': '-r',
        '2s': '-ris',
        '3s': '-tur',
        '1p': '-mur',
        '2p': '-minī',
        '3p': '-ntur'
    },
    'imperfect subjunctive active': {
        '1s': '-m',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'imperfect subjunctive passive': {
        '1s': '-r',
        '2s': {
            'gradeschool': '-ris',
            'lgi': '-ris/re',
            'default': '-ris',
        },
        '3s': '-tur',
        '1p': '-mur',
        '2p': '-minī',
        '3p': '-ntur'
    },
    
    'perfect indicative active': {
        '1s': '-ī',
        '2s': '-istī',
        '3s': '-it',
        '1p': '-imus',
        '2p': '-istis',
        '3p': {
            'gradeschool': '-ērunt',
            'lgi': {
                    'default': '-ērunt',
                    'basic': '-ērunt',
                    'advanced': '-ērunt/ēre'
            },
            'default': '-ērunt'
        }
    },
    'perfect indicative passive': 'Dummy ESSE helping verb',
    
    'pluperfect indicative active': {
        '1s': '-m',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'pluperfect indicative passive': 'Dummy ESSE helping verb',
    
    'future perfect indicative active': {
        '1s': '-m',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'future perfect indicative passive': 'Dummy ESSE helping verb',
    
    'perfect subjunctive active': {
        '1s': '-m',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'perfect subjunctive passive': 'Dummy ESSE helping verb',
    
    
    
    'pluperfect subjunctive active': {
        '1s': '-m',     
        '2s': '-s',
        '3s': '-t',
        '1p': '-mus',
        '2p': '-tis',
        '3p': '-nt'
    },
    'pluperfect subjunctive passive': 'Dummy ESSE helping verb',
    
    
    'present infinitive active': 'the NULL ending',
    'present infinitive passive': 'the NULL ending',
    'perfect infinitive active': 'the NULL ending',
    'perfect infinitive passive': 'the NULL ending',
    'present imperative active': 'the NULL ending',
    'present imperative passive': 'the NULL ending'
}








//latin_root_vowel_map used for things like periphrastics (root_vowel + ND)
var latin_root_vowel_map = {
    'conjugation 1': 'ā',
    'conjugation 2': 'ē',
    'conjugation 3': 'ē',
    'conjugation 3i': 'iē',
    'conjugation 4': 'iē',
}



var agreement_marker =  {
    'is': {
        'm singular': '-um',
        'm plural': '-ōs',
        'f singular': '-am',
        'f plural': '-ās',
        'n singular': '-um',
        'n plural': '-a'
    },
    'otherwise': {
        'm singular': '-us',
        'm plural': '-ī',
        'f singular': '-a',
        'f plural': '-ae',
        'n singular': '-um',
        'n plural': '-a'
    }
}

var latin_form_of_to_be = {
    'present indicative 1s': 'sum',
    'present indicative 2s': 'es',
    'present indicative 3s': 'est',
    'present indicative 1p': 'sumus',
    'present indicative 2p': 'estis',
    'present indicative 3p': 'sunt',
    'imperfect indicative 1s': 'eram',
    'imperfect indicative 2s': 'erās',
    'imperfect indicative 3s': 'erat',
    'imperfect indicative 1p': 'erāmus',
    'imperfect indicative 2p': 'erātis',
    'imperfect indicative 3p': 'erant',
    'future indicative 1s': 'erō',
    'future indicative 2s': 'eris',
    'future indicative 3s': 'erit',
    'future indicative 1p': 'erimus',
    'future indicative 2p': 'eritis',
    'future indicative 3p': 'erunt',
    'present subjunctive 1s': 'sim',
    'present subjunctive 2s': 'sīs',
    'present subjunctive 3s': 'sit',
    'present subjunctive 1p': 'sīmus',
    'present subjunctive 2p': 'sītis',
    'present subjunctive 3p': 'sint',
    'imperfect subjunctive 1s': 'essem',
    'imperfect subjunctive 2s': 'essēs',
    'imperfect subjunctive 3s': 'esset',
    'imperfect subjunctive 1p': 'essēmus',
    'imperfect subjunctive 2p': 'essētis',
    'imperfect subjunctive 3p': 'essent'
}

var latin_verb_subject_accusative_pronoun = {
    '1s': 'mē',
    '2s': 'tē',
    '3s': 'eum',
    '1p': 'nōs',
    '2p': 'vōs',
    '3p': 'eōs'
}



//todo what is this used for exactly??
var latin_perfect_tense_to_present_tense_map = {
    'perfect': 'present',
    'pluperfect': 'imperfect',
    'future perfect': 'future'
}