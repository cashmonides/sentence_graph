var middle_inflections = {
    'conjugation 1': {
        'present indicative': '-A',
        'imperfect indicative': '-ABA',
        'future indicative': '-ABI',
        'present subjunctive': '-E',
        'imperfect subjunctive': '-ARE',
        'present infinitive active': '-ARE',
        'present infinitive passive': '-ARI'
    },
    'conjugation 2': {
        'present indicative': '-E',
        'imperfect indicative': '-EBA',
        'future indicative': '-EBI',
        'present subjunctive': '-EA',
        'imperfect subjunctive': '-ERE',
        'present infinitive active': '-ERE',
        'present infinitive passive': '-ERI'
    },
    'conjugation 3': {
        'present indicative': '-I',
        'imperfect indicative': '-EBA',
        'future indicative': '-E',
        'present subjunctive': '-A',
        'imperfect subjunctive': '-ERE',
        'present infinitive active': '-ERE',
        'present infinitive passive': '-I'
    },
    'conjugation 3i': {
        'present indicative': '-I',
        'imperfect indicative': '-IEBA',
        'future indicative': '-IE',
        'present subjunctive': '-IA',
        'imperfect subjunctive': '-ERE',
        'present infinitive active': '-ERE',
        'present infinitive passive': '-I'
    },
    'conjugation 4': {
        'present indicative': '-I',
        'imperfect indicative': '-IEBA',
        'future indicative': '-IE',
        'present subjunctive': '-IA',
        'imperfect subjunctive': '-IRE',
        'present infinitive active': '-IRE',
        'present infinitive passive': '-IRI'
    }
}

var perfect_middle = {
    'perfect indicative': '-*',
    'pluperfect indicative': '-ERA',
    'future perfect indicative': '-ERI',
    'perfect subjunctive': '-ERI',
    'pluperfect subjunctive': '-ISSE',
    'perfect infinitive': '-ISSE'
}

var perfect_endings = {
    '1s': '-I',
    '2s': '-ISTI',
    '3s': '-IT',
    '1p': '-IMUS',
    '2p': '-ITIS',
    '3p': '-ERUNT'
}

var normal_endings = {
    'active 1s': {
        'present 1st person ending': '-O',
        'past/subjunctive 1st person ending': '-M'
    },       
    'active 2s': '-S',
    'active 3s': '-T',
    'active 1p': '-MUS',
    'active 2p': '-TIS',
    'active 3p': '-NT',
    'passive 1s': {
        'present 1st person ending': '-OR',
        'past/subjunctive 1st person ending': '-R'
    },
    'passive 2s': '-RIS',
    'passive 3s': '-TUR',
    'passive 1p': '-MUR',
    'passive 2p': '-MINI',
    'passive 3p': '-NTUR'
}

var agreement_marker =  {
    'is': {
        'm singular': '-UM',
        'm plural': '-OS',
        'f singular': '-AM',
        'f plural': '-AS',
        'n singular': '-UM',
        'n plural': '-A'
    },
    'otherwise': {
        'm singular': '-US',
        'm plural': '-I',
        'f singular': '-A',
        'f plural': '-AE',
        'n singular': '-UM',
        'n plural': '-A'
    }
}

var latin_form_of_to_be = {
    'present indicative 1s': 'SUM',
    'present indicative 2s': 'ES',
    'present indicative 3s': 'EST',
    'present indicative 1p': 'SUMUS',
    'present indicative 2p': 'ESTIS',
    'present indicative 3p': 'SUNT',
    'imperfect indicative 1s': 'ERAM',
    'imperfect indicative 2s': 'ERAS',
    'imperfect indicative 3s': 'ERAT',
    'imperfect indicative 1p': 'ERAMUS',
    'imperfect indicative 2p': 'ERATIS',
    'imperfect indicative 3p': 'ERANT',
    'future indicative 1s': 'ERO',
    'future indicative 2s': 'ERIS',
    'future indicative 3s': 'ERIT',
    'future indicative 1p': 'ERIMUS',
    'future indicative 2p': 'ERITIS',
    'future indicative 3p': 'ERUNT',
    'present subjunctive 1s': 'SIM',
    'present subjunctive 2s': 'SIS',
    'present subjunctive 3s': 'SIT',
    'present subjunctive 1p': 'SIMUS',
    'present subjunctive 2p': 'SITIS',
    'present subjunctive 3p': 'SINT',
    'imperfect subjunctive 1s': 'ESSEM',
    'imperfect subjunctive 2s': 'ESSES',
    'imperfect subjunctive 3s': 'ESSET',
    'imperfect subjunctive 1p': 'ESSEMUS',
    'imperfect subjunctive 2p': 'ESSETIS',
    'imperfect subjunctive 3p': 'ESSENT'
}

var latin_verb_subject_accusative_pronoun = {
    '1s': 'ME',
    '2s': 'TE',
    '3s': 'EUM',
    '1p': 'NOS',
    '2p': 'VOS',
    '3p': 'EOS'
}

var latin_perfect_tense_to_present_tense_map = {
    'perfect': 'present',
    'pluperfect': 'imperfect',
    'future perfect': 'future'
}