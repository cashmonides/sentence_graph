var properties_that_tf_resets = {
    'english': ['sequence', 'time'],
    'latin': null,
    'ssslatin': null
}

var features_from_tf = ['tense_and_mood', 'sequence', 'time'];

var make_feature_getter = function (what_feature, what_language) {
    return function (translation_formula, regime, allowed) {
        var search_string = [what_language, regime, translation_formula, what_feature].join('!.') + '!';
        var look_through = dict_navigate(
            master_features_from_tf_dictionary, search_string);
        return get_option_with_settings(null, allowed, look_through);
    }
}

var get_feature_from_tf = {}

get_feature_from_tf.english = {
    'tense_and_mood': make_feature_getter('tense_and_mood', 'english'),
    'sequence': make_feature_getter('sequence', 'english'),
    'time': make_feature_getter('time', 'english')
};

get_feature_from_tf.latin = {
    'tense_and_mood': get_latin_tense_and_mood_from_component_tense,
    'sequence': make_feature_getter('sequence', 'latin'),
    'time': make_feature_getter('time', 'latin')
};

get_feature_from_tf.ssslatin = get_feature_from_tf.latin;