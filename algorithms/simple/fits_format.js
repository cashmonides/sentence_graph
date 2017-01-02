// A format is a list of lists of words.

var fits_format = function (string, format) {
    var words = string.split(' ');
    // There of course need to be the same number of words as in the format.
    var same_length = words.length === format.length;
    return same_length && zip(words, format).every(function (pair) {
        // Check that the second element of the pair (the list of words)
        // contains the first (the word).
        return pair[1].indexOf(pair[0]) !== -1;
    });
}

