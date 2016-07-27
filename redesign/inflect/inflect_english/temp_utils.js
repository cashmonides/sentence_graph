// Temporary utils that will become obsolete.

var get_english_tense_from_verb = function (verb) {
    var time = verb.get_property_in_language('time', 'english');
    var tense = {
        'prior': 'perfect',
        'simultaneous': 'present',
        'subsequent': 'future',
    }[time];
    if (tense === undefined) {
        throw 'No tense found for time ' + time;
    }
    var voice = verb.get_property_in_language('voice', 'english');
    return tense + ' ' + voice;
}