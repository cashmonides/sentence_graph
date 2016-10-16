var middle_inflections = {
    'conjugation 1': {
        'present indicative': '-ā',
        'imperfect indicative': '-ābā',
        'future indicative': '-ābi',
        'present subjunctive': '-ē',
        'imperfect subjunctive': '-ārē',
        'present infinitive active': '-āre',
        'present infinitive passive': '-ārī'
    },
    'conjugation 2': {
        'present indicative': '-ē',
        'imperfect indicative': '-ēbā',
        'future indicative': '-ēbi',
        'present subjunctive': '-eā',
        'imperfect subjunctive': '-ēre',
        'present infinitive active': '-ēre',
        'present infinitive passive': '-ērī'
    },
    'conjugation 3': {
        'present indicative': '-i',
        'imperfect indicative': '-ēbā',
        'future indicative': '-ē$',
        'present subjunctive': '-ā',
        'imperfect subjunctive': '-erē',
        'present infinitive active': '-ere',
        'present infinitive passive': '-ī'
    },
    'conjugation 3i': {
        'present indicative': '-i@',
        'imperfect indicative': '-iēbā',
        'future indicative': '-iē$',
        'present subjunctive': '-iā',
        'imperfect subjunctive': '-erē',
        'present infinitive active': '-ere',
        'present infinitive passive': '-ī'
    },
    'conjugation 4': {
        'present indicative': '-ī',
        'imperfect indicative': '-iēbā',
        'future indicative': '-iē$',
        'present subjunctive': '-iā',
        'imperfect subjunctive': '-īrē',
        'present infinitive active': '-īre',
        'present infinitive passive': '-īrī'
    }
}

var perfect_middle = {
    'perfect indicative': '-*',
    'pluperfect indicative': '-erā',
    'future perfect indicative': '-eri#',
    'perfect subjunctive': '-eri%',
    'pluperfect subjunctive': '-issē',
    'perfect infinitive': '-isse'
}

var perfect_endings = {
    '1s': '-ī',
    '2s': '-istī',
    '3s': '-it',
    '1p': '-imus',
    '2p': '-istis',
    '3p': '-ērunt'
}

var normal_endings = {
    'active 1s': {
        'present 1st person ending': '-ō',
        'past/subjunctive 1st person ending': '-m'
    },       
    'active 2s': '-s',
    'active 3s': '-t',
    'active 1p': '-mus',
    'active 2p': '-tis',
    'active 3p': '-nt',
    'passive 1s': {
        'present 1st person ending': '-or',
        'past/subjunctive 1st person ending': '-r'
    },
    'passive 2s': '-ris',
    'passive 3s': '-tur',
    'passive 1p': '-mur',
    'passive 2p': '-minī',
    'passive 3p': '-ntur'
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

var latin_perfect_tense_to_present_tense_map = {
    'perfect': 'present',
    'pluperfect': 'imperfect',
    'future perfect': 'future'
}

var latin_root_vowel_map = {
    'conjugation 1': 'ā',
    'conjugation 2': 'ē',
    'conjugation 3': 'ē',
    'conjugation 3i': 'iē',
    'conjugation 4': 'iē',
}