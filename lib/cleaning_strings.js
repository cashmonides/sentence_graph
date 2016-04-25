var cleaning_words_to_delete = {
    'a': true,
    'an': true,
    'the': true
}

var cleaning_replacements = {
    'overcome': 'conquer',
    'overcame': 'conquered'
}

var tiny_words = {
    'to': true,
    'from': true,
    'of': true,
    'by': true,
    'in': true,
    'am': true,
    'is': true,
    'are': true,
    'was': true,
    'were': true,
    'will': true,
    'had': true,
    'be': true,
    'been': true,
    'being': true
}

var clean_parts = function (x) {
    x = x.map(function (y) {
        return (y in cleaning_replacements) ? cleaning_replacements[y] : y})
        .filter(function (y) {return !(y in cleaning_words_to_delete)});
    var l = [];
    for (var i = 0; i < x.length; i++) {
        if (!(is_empty(l)) && !(is_empty(peek(l)))
        && peek(peek(l)) in tiny_words) {
            peek(l).push(x[i]);
        } else {
            l.push([x[i]]);
        }
    }
    var d = {};
    for (var i = 0; i < l.length; i++) {
        if (l[i].join(' ') in d) {
            d[l[i].join(' ')] += 1;
        } else {
            d[l[i].join(' ')] = 1;
        }
    }
    return d;
}