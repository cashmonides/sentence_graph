// In the absolute regime we use universal tense. In any other regime
// we need a different method for choosing tense.

var regime_to_translation_formula = {
    'english': {
        'relative': {
            'sequence.primary': {
                'time.simultaneous': 'verb',
                'time.prior': 'verbed-preterite',
                'time.subsequent': 'will verb'
            },
            'sequence.secondary': {
                'time.simultaneous': 'were verbing',
                'time.prior': 'had verbed',
                'time.subsequent': 'would verb'
            }
        },
        'conditional': {
            'construction.protasis_flv': 'should verb',
            'construction.apodosis_flv': 'would verb',
            'construction.protasis_fmv': 'verb',
            'construction.apodosis_fmv': 'will verb',
            // Do we want different translation formulas for fmve conditionals?
            'construction.protasis_fmve': 'verb',
            'construction.apodosis_fmve': 'will verb',
            'construction.protasis_present_ctf': 'were verbing',
            'construction.apodosis_present_ctf': 'would be verbing',
            'construction.protasis_past_ctf': 'had verbed',
            'construction.apodosis_past_ctf': 'would have verbed'
        },
        'purpose': {
            'sequence.primary': 'may verb',
            'sequence.secondary': 'might verb'
        },
        'independent subjunctive': {
            'construction.potential': {
                'sequence.primary': 'can verb',
                'sequence.secondary': 'could verb'
            }
        },
        'english subjunctive': 'verb no -s'
    }
}

var translation_formula_to_tense = {
    'english': function (translation_formula) {
        return english_grammatical_terminology_correspendence[
            translation_formula];
    },
    'latin': function (x) {
        return x;
    },
    'ssslatin': function (x) {
        return x;
    }
}

var languages_with_no_translation_formulae = {
    'latin': true,
    'ssslatin': true
}

var default_regimes = {
    'english': 'absolute',
    'latin': 'indicative',
    'ssslatin': 'indicative'
}