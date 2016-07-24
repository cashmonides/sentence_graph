// All the inflecting functions.
var global_inflectors = {};

// Latin inflection.
global_inflectors.latin = inflect_latin_verb_main;

// English inflection. Currently dummy.
// todo: fix dummy.
global_inflectors.english = function () {
    return '[dummy english verb]';
}

// SSSLatin inflection.
global_inflectors.ssslatin = function (component) {
    return 'SSS' + inflect_latin_verb_main(component);
}