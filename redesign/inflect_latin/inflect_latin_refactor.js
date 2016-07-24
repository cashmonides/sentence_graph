var latin_verb_inflector_json = {
    'description': 'A json object describing how to inflect a Latin verb.',
    'part of speech': 'verb',
    'language': 'Latin',
    'synonyms': {
        'present system': 'present or imperfect or future',
        'perfect system': 'perfect or pluperfect or future perfect',
    },
    // properties is metadata storing a certain kind of key.
    // This type of key represents structure.
    // i.e., we have a list of conjugations,
    // and a verb lexeme has a conjugation.
    
    // A verb lexeme also has an associated kernel and component.
    'properties': [
        'kernel',
        'component',
        'conjugation'
        // Yes, this is confusing, but this part of the file is
        // more metadata than anything else.
    ],
    // Hi Dan!
    // I'm going to take a break and try to install python3 on mediatemple
    // with some pro help
    // I'll check in on you soon.
    // What are the things that go into constructing a verb?
    // Again, this is metadata which ordinary teachers
    // shouldn't need to alter.
    'parts': [
        'main',
        'beginning',
        'middle',
        'end',
        'agreement marker',
        'helping verb',
        'subject accusative pronoun'
    ],
    'conjugation': [
        'conjugation 1',
        'conjugation 2',
        'conjugation 3',
        'conjugation 3i',
        'conjugation 4'
    ],
    'kernel': {
        'clause type': [
            'is',
            'other'
        ],
        'implicitness': [
            'implicit',
            'explicit'
        ],
        'roles: subject': {
            'syntax': {
                'number': [
                    'singular',
                    'plural'
                ],
            },
            'lexeme': {
                'gender': [
                    'm',
                    'f',
                    'n'
                ]
            }
        }
    },
    'component': {
        'tense': {
            'present system': [
                'present',
                'imperfect',
                'future'
            ],
            'perfect system': [
                'perfect',
                'pluperfect',
                'future perfect'
            ]
        },
        'mood': [
            // An example of the three types of comments.
            // not in: forbids certain possibilities.
            // only in: also forbids certain possibilities.
            // not implemented/not yet implemented: forget about this,
            // it should basically be ignored.
            'indicative',
            'subjunctive: not in future, future perfect',
            'infinitive: only in present, perfect',
            'imperative: only in present, perfect: not yet implemented'
        ],
        'voice': [
            'active',
            'passive'
        ],
        'person and number': [
            '1s',
            '2s',
            '3s',
            '1p',
            '2p',
            '3p'
        ]
    },
    'beginning': {
        'present system': 'stem 1',
        'active perfect system': 'stem 2',
        'passive perfect system': 'stem 3'
    },
    'middle': {
        'conjugation 1 present indicative': '-A',
        'conjugation 1 imperfect indicative': '-ABA',
        'conjugation 1 future indicative': '-ABI',
        'conjugation 1 present subjunctive': '-E',
        'conjugation 1 imperfect subjunctive': '-ARE',
        'conjugation 1 present infinitive active': '-ARE',
        'conjugation 1 present infinitive passive': '-ARI',
        'conjugation 2 present indicative': '-E',
        'conjugation 2 imperfect indicative': '-EBA',
        'conjugation 2 future indicative': '-EBI',
        'conjugation 2 present subjunctive': '-EA',
        'conjugation 2 imperfect subjunctive': '-ERE',
        'conjugation 2 present infinitive active': '-ERE',
        'conjugation 2 present infinitive passive': '-ERI',
        'conjugation 3 present indicative': '-I',
        'conjugation 3 imperfect indicative': '-EBA',
        'conjugation 3 future indicative': '-E',
        'conjugation 3 present subjunctive': '-A',
        'conjugation 3 imperfect subjunctive': '-ERE',
        'conjugation 3 present infinitive active': '-ERE',
        'conjugation 3 present infinitive passive': '-I',
        'conjugation 3i present indicative': '-I',
        'conjugation 3i imperfect indicative': '-IEBA',
        'conjugation 3i future indicative': '-IE',
        'conjugation 3i present subjunctive': '-IA',
        'conjugation 3i imperfect subjunctive': '-ERE',
        'conjugation 3i present infinitive active': '-ERE',
        'conjugation 3i present infinitive passive': '-I',
        'conjugation 4 present indicative': '-I',
        'conjugation 4 imperfect indicative': '-IEBA',
        'conjugation 4 future indicative': '-IE',
        'conjugation 4 present subjunctive': '-IA',
        'conjugation 4 imperfect subjunctive': '-IRE',
        'conjugation 4 present infinitive active': '-IRE',
        'conjugation 4 present infinitive passive': '-IRI',
        'perfect indicative': '-*',
        'pluperfect indicative': '-ERA',
        'future perfect indicative': '-ERI',
        'perfect subjunctive': '-ERI',
        'pluperfect subjunctive': '-ISSE',
        'perfect infinitive': '-ISSE'
    },
    'end': {
        'perfect indicative active': {
            '1s': '-I',
            '2s': '-ISTI',
            '3s': '-IT',
            '1p': '-IMUS',
            '2p': '-ITIS',
            '2p': '-ERUNT'
        },
        'infinitive': '',
        'otherwise': {
             //AS: -m for anything that's subjunctive or past
                //AS: imperfect, pluperfect, perfect
             //AS: -o for everything else
            'active 1s': '-O/M',       
            'active 2s': '-S',
            'active 3s': '-T',
            'active 1p': '-MUS',
            'active 2p': '-TIS',
            'active 3p': '-NT',
            //AS: -r for anything that's subjunctive or past
                //AS: imperfect, pluperfect, perfect
             //AS: -or for everything else
            'passive 1s': '-OR/R',
            'passive 2s': '-RIS',
            'passive 3s': '-TUR',
            'passive 1p': '-MUR',
            'passive 2p': '-MINI',
            'passive 3p': '-NTUR'
        }
    },
    'agreement marker': {
        'is': {
            'subject: m singular': '-UM',
            'subject: m plural': '-OS',
            'subject: f singular': '-AM',
            'subject: f plural': '-AS',
            'subject: n singular': '-UM',
            'subject: n plural': '-A'
        },
        'otherwise': {
            'subject: m singular': '-US',
            'subject: m plural': '-I',
            'subject: f singular': '-A',
            'subject: f plural': '-AE',
            'subject: n singular': '-UM',
            'subject: n plural': '-A'
        }
    },
    'helping verb': {
        'assume': 'passive perfect system',
        'perfect indicative 1s': 'SUM',
        'perfect indicative 2s': 'ES',
        'perfect indicative 3s': 'EST',
        'perfect indicative 1p': 'SUMUS',
        'perfect indicative 2p': 'ESTIS',
        'perfect indicative 3p': 'SUNT',
        'pluperfect indicative 1s': 'SUM',
        'pluperfect indicative 2s': 'ES',
        'pluperfect indicative 3s': 'EST',
        'pluperfect indicative 1p': 'SUMUS',
        'pluperfect indicative 2p': 'ESTIS',
        'pluperfect indicative 3p': 'SUNT',
        'future perfect indicative 1s': 'SUM',
        'future perfect indicative 2s': 'ES',
        'future perfect indicative 3s': 'EST',
        'future perfect indicative 1p': 'SUMUS',
        'future perfect indicative 2p': 'ESTIS',
        'future perfect indicative 3p': 'SUNT',
        'perfect subjunctive 1s': 'SUM',
        'perfect subjunctive 2s': 'ES',
        'perfect subjunctive 3s': 'EST',
        'perfect subjunctive 1p': 'SUMUS',
        'perfect subjunctive 2p': 'ESTIS',
        'perfect subjunctive 3p': 'SUNT',
        'pluperfect subjunctive 1s': 'SUM',
        'pluperfect subjunctive 2s': 'ES',
        'pluperfect subjunctive 3s': 'EST',
        'pluperfect subjunctive 1p': 'SUMUS',
        'pluperfect subjunctive 2p': 'ESTIS',
        'pluperfect subjunctive 3p': 'SUNT',
        'perfect infinitive': 'ESSE'
    },
    'subject accusative pronoun': {
        'assume': 'implicit is',
        '1s': 'ME',
        '2s': 'TE',
        '3s': 'EUM',
        '1p': 'NOS',
        '2p': 'VOS',
        '3p': 'EOS'
    },
    'main': {
        'passive perfect system': {
            'is': 'subject: subject accusative pronoun, ' +
            'verb: beginning + agreement marker + space + helping verb',
            'otherwise': 'verb: beginning + agreement marker + ' +
            'space + helping verb'
        },
        'otherwise': {
            'is': 'subject: subject accusative pronoun, ' +
            'verb: beginning + middle + end',
            'otherwise': 'verb: beginning + middle + end'
        }
    }
}