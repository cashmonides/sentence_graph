var features_from_tf = ['tense_and_mood', 'sequence', 'time'];

var get_feature_from_tf = {}

get_feature_from_tf.english = {
    'tense_and_mood': function (translation_formula) {
        return english_grammatical_terminology_correspendence[
            translation_formula];
    },
    'sequence': function (tf) {
        return master_features_from_tf_dictionary.english[tf].sequence;
    },
    'time': function (tf) {
        return master_features_from_tf_dictionary.english[tf].time;
    }
};

get_feature_from_tf.latin = {
    'tense_and_mood': get_latin_tense_and_mood_from_component_tense,
    'sequence': function (tense) {
        return master_features_from_tf_dictionary.latin[tense].sequence;
    },
    'time': function (tense) {
        return master_features_from_tf_dictionary.latin[tense].time;
    }
};

get_feature_from_tf.ssslatin = get_feature_from_tf.latin;