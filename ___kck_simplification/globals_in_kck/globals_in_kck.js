
// _____DEVELOPMENT SETTINGS WE CHANGE AS WE DEVELOP, TEST and RELEASE_____





// ___________NOT SURE WHAT THIS IS EXACTLY_______
// Should the many verb options be displayed?
var VERB_OPTIONS_DISPLAY = true; //(contaned in sentence_display.js)



// _______________IMPORTANT STRUCTURAL ELEMENTS_______________
var random_component_properties = ['person_and_number', 'time'];

var testing_rules = [
    'clause_type.main and secondary => prior',
    'clause_type.main => indicative',
    // latin apparently has no subsequent subjunctive passives.
    'subsequent and subjunctive => active',
    // A main clause in secondary sequence cannot have a greek perfect indicative.
    // 'impossible' is just a constraint no clause will satisfy.
    'clause_type.main and greek perfect indicative and secondary => impossible',
    'clause_type.main and primary and prior => greek perfect indicative'
];

var testing_time_to_tense_map = {
    'simultaneous': 'present',
    'subsequent': 'future',
    'prior': 'past'
}


// ____________DEFAULTS WE EXPECT TO NEVER CHANGE___________


// Our default direction is left.
// This comes into play when we make a main clause without a subordinate clause
// in which case the main clause is considered to be on the left of a null conjunction.
var default_direction = 'left';

// Our non-default direction is right.
// This is simple the direction other than our default direction.
var non_default_direction = 'right';

// Our directions are left and right.
// we need to declare this because we will be iterating over this list
var directions = ['left', 'right'];


// This is our list of languages.
var languages = ['English', 'Latin', 'SSSLatin'];

// This means that latin is our default setting.
var default_language = 'Latin';

// We also have a list of non-default languages.
var non_default_languages = ['English', 'SSSLatin'];




// ________________SUPER TECHNICAL GLOBALS________

// A regex to match arrows.
var arrow_regex = / *[=\-]> */g;