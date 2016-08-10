var master_features_from_tf_dictionary = {
    'english': {
        "verb": {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	"verb no -s" : {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	"verbed-preterite" : {
            'time': 'prior',
            'sequence': 'secondary'
        },
    	"were verbing" : {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
    	"will verb" : {
            'time': 'subsequent',
            'sequence': 'primary'
        },
    	"had verbed": {
            'time': 'prior',
            'sequence': 'secondary'
        },
    	"will have verbed": {
            'time': 'subsequent',
            'sequence': 'primary'
        },
    	'may verb': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'might verb': {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
    	'can verb': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'could verb': {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
    	'should verb': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'would verb': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'would be verbing': {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
    	'would have verbed': {
            'time': 'prior',
            'sequence': 'secondary'
        },
    	"are verbed": {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
        //todo problem: if this is the subjunctive translation formula
        //then we probably want to change it, since it's too archaic for grades 2-6
        //and "be verbed" is not part of the official Institute terminology
    	"be verbed": {
            'time': 'simultaneous',         
            'sequence': 'primary'           
        },
    	"were verbed": {
            'time': 'prior',
            'sequence': 'secondary'
        },
    	"were being verbed": {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
    	"will be verbed": {
            'time': 'subsequent',
            'sequence': 'primary'
        },
    	"had been verbed": {
            'time': 'prior',
            'sequence': 'secondary'
        },
    	"will have been verbed" : {
            'time': 'subsequent',
            'sequence': 'primary'
        },
    	'may be verbed': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'might be verbed': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'can be verbed': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'could be verbed': {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
    	'should be verbed': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'would be verbed': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
    	'would be being verbed': {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
    	'would have been verbed': {
            'time': 'prior',
            'sequence': 'secondary'
        }
    }, 
    'latin': {
        'present indicative active': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
        'present indicative passive': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
        'imperfect indicative active': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'imperfect indicative passive': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'future indicative active': {
            'time': 'subsequent',
            'sequence': 'primary'
        },
        'future indicative passive': {
            'time': 'subsequent',
            'sequence': 'primary'
        },
        'perfect indicative active': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'perfect indicative passive': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'pluperfect indicative active': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'pluperfect indicative passive': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'future perfect indicative active': {
            'time': 'subsequent',
            'sequence': 'primary'
        },
        'future perfect indicative passive': {
            'time': 'subsequent',
            'sequence': 'primary'
        },
        'present subjunctive active': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
        'present subjunctive passive': {
            'time': 'simultaneous',
            'sequence': 'primary'
        },
        'imperfect subjunctive active': {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
        'imperfect subjunctive passive': {
            'time': 'simultaneous',
            'sequence': 'secondary'
        },
        'perfect subjunctive active': {
            'time': 'prior',
            'sequence': 'primary'
        },
        'perfect subjunctive passive': {
            'time': 'prior',
            'sequence': 'primary'
        },
        'pluperfect subjunctive active': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'pluperfect subjunctive passive': {
            'time': 'prior',
            'sequence': 'secondary'
        },
        'present infinitive active': {
            'time': 'simultaneous',
            'sequence': 'xxx'
        },
        'present infinitive passive': {
            'time': 'simultaneous',
            'sequence': 'xxx'
        },
        'perfect infinitive active': {
            'time': 'prior',
            'sequence': 'xxx'
        },
        'perfect infinitive passive': {
            'time': 'prior',
            'sequence': 'xxx'
        },
        'present subjunctive of the active periphrastic': {
            'time': 'subsequent',
            'sequence': 'primary'
        },
        'imperfect subjunctive of the active periphrastic': {
            'time': 'subsequent',
            'sequence': 'secondary'
        }
    }
}