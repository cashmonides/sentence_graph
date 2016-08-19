var maximal_latin_tense_space = {
	'regime.indicative': {
		// check ALLOWED
		// if voice.active, go down this path
		'voice.active' : {
			// default, normal, indicative
			//information comes from ALLOWED
			'present indicative active': ['universal_indicative_tenses_allowed.present indicative'],
			'imperfect indicative active': ['universal_indicative_tenses_allowed.imperfect indicative'],
			'future indicative active': ['universal_indicative_tenses_allowed.future indicative'],
			
			//advanced tenses in normal clauses, indicative
			//information comes from ALLOWED
			'pluperfect indicative active': ['universal_indicative_tenses_allowed.pluperfect indicative'],
			'future perfect indicative active': ['universal_indicative_tenses_allowed.future perfect indicative'],
			'perfect indicative active': ['universal_indicative_tenses_allowed.greek perfect indicative ' + 
			'|| universal_indicative_tenses_allowed.aorist indicative']
			//'has/have verbed': ['perfect-in-primary-sequence']
		}, 
		'voice.passive' : {
			// default, normal, indicative
			//information comes from ALLOWED
			'present indicative passive': ['universal_indicative_tenses_allowed.present indicative'],
			'imperfect indicative passive': ['universal_indicative_tenses_allowed.imperfect indicative'],
			'future indicative passive': ['universal_indicative_tenses_allowed.future indicative'],
			
			//advanced tenses in normal clauses, indicative
			//information comes from ALLOWED
			'pluperfect indicative passive': ['universal_indicative_tenses_allowed.pluperfect indicative'],
			'future perfect indicative passive': ['universal_indicative_tenses_allowed.future perfect indicative'],
			'perfect indicative passive': ['universal_indicative_tenses_allowed.greek perfect indicative ' + 
			'|| universal_indicative_tenses_allowed.aorist indicative']
			//'has/have been verbed': ['perfect-in-primary-sequence']
		}
	},
	//information comes from CONJUNCTION actually chosen + red_herring_bool
	'regime.subjunctive' : {
		'voice.active' : {
			'present subjunctive active': ['time.simultaneous', 'sequence.primary'],
			'perfect subjunctive active': ['time.prior', 'sequence.primary'],
			'present subjunctive of the active periphrastic': ['time.subsequent', 'sequence.primary'],
			'imperfect subjunctive active': ['time.simultaneous', 'sequence.secondary'],
			'pluperfect subjunctive active': ['time.prior', 'sequence.secondary'],
			'imperfect subjunctive of the active periphrastic': ['time.subsequent', 'sequence.secondary']
		},
		'voice.passive' : {
			'present subjunctive passive': ['time.simultaneous', 'sequence.primary'],
			'perfect subjunctive passive': ['time.prior', 'sequence.primary'],
			'imperfect subjunctive passive': ['time.simultaneous', 'sequence.secondary'],
			'pluperfect subjunctive passive': ['time.prior', 'sequence.secondary']
		}
	
	},
	'regime.conditional' : {
		'voice.active' : {
			'present subjunctive active': ['construction.protasis_flv || construction.apodosis_flv'],
			'future indicative active': ['construction.protasis_fmv || construction.apodosis_fmv ' +
			'|| construction.apodosis_fmve'],
			'future perfect indicative active': ['construction.protasis_fmve'],
			'imperfect subjunctive active': ['construction.protasis_present_ctf || construction.apodosis_present_ctf'],
			'pluperfect subjunctive active': ['construction.protasis_past_ctf || construction.apodosis_past_ctf']
		}, 
		'voice.passive' : {
			'present subjunctive passive': ['construction.protasis_flv || construction.apodosis_flv'],
			'future indicative passive': ['construction.protasis_fmv || construction.apodosis_fmv ' +
			'|| construction.apodosis_fmve'],
			'future perfect indicative passive': ['construction.protasis_fmve'],
			'imperfect subjunctive passive': ['construction.protasis_present_ctf || construction.apodosis_present_ctf'],
			'pluperfect subjunctive passive': ['construction.protasis_past_ctf || construction.apodosis_past_ctf']
		}
	},
	'regime.infinitive' : {
		'voice.active' : {
			'present infinitive active': ['time.simultaneous'],
			'perfect infinitive active': ['time.prior'],
			'future infinitive active': ['time.subsequent']
		},
		'voice.passive' : {
			'present infinitive passive': ['time.simultaneous'],
			'perfect infinitive passive': ['time.prior'],
			'future infinitive passive': ['time.subsequent']
		}
	}
}