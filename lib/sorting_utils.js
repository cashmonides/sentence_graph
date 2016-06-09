// This file contains utils involving sorting.
// It also contains long functions passed to sort.

var cmp = function (a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        throw 'Impossible ordering!'
    }
}

function sort_numbers(list){
    return list.sort(function (a, b) {return a - b;});
}

function quick_sort(list, f) {
    // Note: this did not sort a list of lists correctly,
    // but now it does.
    if (is_empty(list)) {return []}
    // We sort from random index (original data may be somewhat sorted).
    // Perhaps we should switch to merge sort.
    var n = rand_int(list.length);
    var pivot = list[n];
    var rest = remove(list, n);
    var before = rest.filter(function (x) {return f(x, pivot)});
    var after = rest.filter(function (x) {return f(pivot, x)});
    return quick_sort(before, f).concat([pivot], quick_sort(after, f))
}

var separate_and_sort_by = function (list, f) {
    var separated = [];
    var types = [];
    var item;
    var type_of_i;
    var pos;
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        type_of_i = f(item);
        pos = types.indexOf(type_of_i);
        if (pos === -1) {
            types.push(type_of_i);
            separated.push([item]);
        } else {
            separated[pos].push(item);
        }
    }
    return quick_sort(separated, function (i, j) {return f(i[0]) < f(j[0])});
}

// This is not currently used, but might be useful.
var sort_by_prop = function (s) {
    return function (x, y) {return x.s < y.s};
}

var sort_by_func = function (f) {
    return function (x, y) {return f(x) < f(y)};
}

var alphabetize_list = function (l) {
    return quick_sort(l, function (x, y) {
        return remove_long_vowels(x) < remove_long_vowels(y)})
}

var alphabetize_dict = function (d) {
    return quick_sort(key_value_pairs(d), function (x, y) {
        return remove_long_vowels(x[0]) < remove_long_vowels(y[0])})
}

var sentence_sort = function (x, y) {
    var x_s = x.split(/[\.\-\/ ]/g);
    var y_s = y.split(/[\.\-\/ ]/g);
    var n_x_0 = isNaN(x_s[0]);
    var n_y_0 = isNaN(y_s[0]);
    if (!n_x_0 && n_y_0) {
        return -1;
    } else if (n_x_0 && !n_y_0) {
        return 1;
    } else if (n_x_0 && n_y_0) {
        var a = author_sort(x_s[0], y_s[0]);
        if (a !== 0) {
            return a;
        }
        x_s = x_s.slice(1);
        y_s = y_s.slice(1);
    }
    
    for (var i = 0; i < 2; i++) {
        var x_i = to_number(x_s[i]);
        var y_i = to_number(y_s[i]);
        if (x_i < y_i) {
            return -1;
        } else if (x_i > y_i) {
            return 1;
        }
    }
    return 0;
}

var author_sort = function (a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    }
}

var region_sort = function (x, y) {
    if (x.pos === 'verb' && y.pos === 'noun') {
        return -1
    } else if (x.pos === 'noun' && y.pos === 'verb') {
        return 1;
    };
    var a = x.target_indices[0];
    var b = y.target_indices[0];
    return cmp(a, b);
}

var raw_region_sort = function (x, y) {
    var a = x.indices[0];
    var b = y.indices[0];
    return cmp(a, b);
}