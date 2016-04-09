// This file has utils that still don;t fit anywhere else.

var get_pure_latin_root = function (x) {
    return remove_long_vowels(x.properties.latin.root);
}

// Move this?
var remove_long_vowels = function (s) {
    var long_to_short = {
        'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U',
        'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u'
    };
    for (var i in long_to_short) {
        s = s.replace(i, long_to_short[i])
    }
    return s
}

var remove_punc = function (string) {
    return string.replace(/[^a-z ]/g, '');
}

var strip = function (x) {
    return x.replace(/^ +/g, '').replace(/ +$/g, '').replace(/ +/g, ' ')
}


// '   The !@#$%^cat eāt  $ t-h-e fIsh   ' -> the cat eat the fish
var clean_input_string = function (string) {
    return strip(remove_punc(remove_long_vowels(string.toLowerCase())))
}

var begins_with = function (string, substring) {
    return string.slice(0, substring.length) === substring;
}

var ends_with = function (string, substring) {
    return string.slice(string.length - substring.length) === substring;
}

var cut_off = function (string, substring) {
    return string.slice(substring.length);
}


//todo possibly make a sum function in utils, abstracting from get_accuracy
//research list comprehension in ES6 (not to be used; we are es5)


//below should be our separate abstraction of get_accuracy - not done yet
//takes an object (a module inside of metrics, which is a map of numbers to numbers - i.e. attempts to counts
//returns a number
var get_accuracy3 = function (iteration) {
    console.log("DEBUG 11-20 get_accuracy3 triggered");
    console.log("DEBUG 11-20 get_accuracy3 iteration = ", iteration);
    var output = Math.floor(100 * iteration[0]
    / Object.keys(iteration).
    map(function (x) {return iteration[x]}).
    reduce(function (a, b) {return a + b}))
    console.log("DEBUG 11-20 get_accuracy3 output = ", output);
    return output;
};

var hash = function (x) {
    var internal_hash = 0;
    if (x.length == 0) {return internal_hash};
    for (var i = 0; i < x.length; i++) {
        internal_hash = ((internal_hash << 5) - internal_hash)
        + x.charCodeAt(i);
    }
    return internal_hash;
}