// Utils relating primarily to strings go here.

// Regex cheat sheet (made out of a long commment):
// / = beginning of the regex
// ^ = start of string
// $ = end of string
// [] = character class
// A-Z in character class (i.c.c) = uppercase letters
// a-z i.c.c = lowercase letters
// 0-9 i.c.c = digits
// ^ i.c.c = negates chacracter class
// * = any number of occurrences (including 0)
// + = any number of occurrences (at least 1)
// / = end of the regex
// g = applied globally, i.e. repeatedly, until there are no more left
// If a regex is not explained by this, it is likely magic to some extent.

var get_pure_latin_root = function (x) {
    return remove_long_vowels(x.properties.latin.root);
}

var remove_long_vowels = function (s) {
    var long_to_short = {
        'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U',
        'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u'
    };
    for (var i in long_to_short) {
        s = s.replace(new RegExp(i, 'g'), long_to_short[i])
    }
    return s;
}

var remove_punc = function (string) {
    return string.replace(/[^a-z ]/g, '');
}

var strip = function (x, c) {
    if (c === undefined) {c = ' '};
    return x.replace(new RegExp('^' + c + '+', 'g'), '').
    replace(new RegExp(c + '+$', 'g'), '').
    replace(new RegExp(c + '+', 'g'), c);
}

var hex_to_num = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15
}


// '   The !@#$%^cat eāt  $ t-h-e fIsh   ' -> the cat eat the fish
var clean_input_string = function (string) {
    return clean_parts(strip(remove_punc(remove_long_vowels(
        string.toLowerCase()))).split(' '));
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

var starts_with = function (string, substring) {
    return string.slice(0, substring.length) === substring;
}

var ends_with = function (string, substring) {
    return string.slice(string.length - substring.length) === substring;
}

var cut_off = function (string, substring) {
    return string.slice(substring.length);
}