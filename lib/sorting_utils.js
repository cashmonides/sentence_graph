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

var sentence_path_sort = function (x, y) {
    x = path_to_list(x);
    y = path_to_list(y);
    var l = Math.min(x.length, y.length);
    var c;
    for (var i = 0; i < l; i++) {
        c = sentence_part_item_sort(x[i], y[i]);
        if (c !== 0) {
            return c;
        }
    }
    return cmp(x.length, y.length);
}

var basic_list_sort = function (x, y) {
    var l = Math.min(x.length, y.length);
    var c;
    for (var i = 0; i < l; i++) {
        c = cmp(x[i], y[i])
        if (c !== 0) {
            return c;
        }
    }
    return cmp(x.length, y.length);
}

var sentence_part_item_sort = function (x, y) {
    var x_n = x.match(/\d+/g);
    var y_n = y.match(/\d+/g);
    if (x_n === null && y_n === null) {
        return author_sort(x, y);
    } else if (x_n === null && y_n !== null) {
        return 1;
    } else if (x_n !== null && y_n === null) {
        return -1;
    } else if (x_n !== null && y_n !== null) {
        var n = basic_list_sort(x_n.map(Number), y_n.map(Number));
        if (n !== 0) {
            return n;
        }
        return cmp(x, y);
    }
}

var author_sort = function (a, b) {
    if (is_earlier_author(a, b)) {
        return -1;
    } else if (is_earlier_author(b, a)) {
        return 1;
    } else if (a === b) {
        return 0;
    }
}

var is_earlier_author = function (a, b) {
    return a < b;
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




var sort_map_by_values = function (map) {

    var sortable = [];
    for (var item in map)
        sortable.push([item, map[item]])
    
    sortable.sort(function(a, b) {
        return a[1] - b[1]
    })
    sortable.reverse();
    return sortable;
}