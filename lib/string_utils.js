// Utils relating primarily to strings go here.

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
    return x.replace(/^ +/g, '').replace(/ +$/g, '').replace(/ +/g, ' ');
}


// '   The !@#$%^cat eāt  $ t-h-e fIsh   ' -> the cat eat the fish
var clean_input_string = function (string) {
    return strip(remove_punc(remove_long_vowels(string.toLowerCase())));
}

var get_words = function (string, n) {
    var words = remove_punc(string).split(' ');
    if (n !== undefined) {
        words = words.filter(function (x) {return x.length >= n});
    }
    return words;
}

var common_word = function (a, b, n) {
    return something_in_common(get_words(a, n), get_words(b, n));
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