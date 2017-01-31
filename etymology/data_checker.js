var check_word_root_consistency = function (words, roots) {
    // Various types of issues.
    var root_set_from_words = set_from(concat_map(values(words), function (x) {
        return x.roots;
    }));
    var root_set_from_roots = set_from(Object.keys(roots));
    var weird_roots = Object.keys(roots).filter(function (x) {
        return roots[x].root !== x;
    }).map(function (x) {
        return {
            'key': x,
            'root': roots[x].root
        }
    });
    var weird_words = Object.keys(words).filter(function (x) {
        return words[x].word !== x;
    }).map(function (x) {
        return {
            'key': x,
            'word': words[x].word
        }
    });
    var word_extra_roots = Object.keys(
        set_difference(root_set_from_words, root_set_from_roots));
    var word_missing_roots = Object.keys(
        set_difference(root_set_from_roots, root_set_from_words));
    return {
        'extra_roots': word_extra_roots,
        'missing_roots': word_missing_roots,
        'weird_roots': weird_roots,
        'weird_words': weird_words
    };
}