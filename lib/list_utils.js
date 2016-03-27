// This file contains mainly list utils.
// It also has some dictionary and sorting utils.

function sort_numbers(list){
    return list.sort(function(a, b){return a - b;});
}

function quick_sort(list, f) {
    // Note: this did not sort a list of lists correctly,
    // but now it does.
    if (list.length === 0) {return []}
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

var peek = function (list) {
    return list[list.length - 1];
}

var list_of_repetitions = function (x, n) {
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(x);
    }
    return result;
}

// moved from cartesian
// returns the values of an object
var values = function(object) {
    return Object.keys(object).map(function (x) {return object[x]});
};

// moved from cartesian
// a utility function that combines a list of lists into a big list
var concat_arrays = function (list_of_arrays) {
    return Array.prototype.concat.apply([], list_of_arrays);
};

// We had three confusing utils here, now no longer used and in obsolete.

// todo akiva look at this
// returns a boolean given two lists, true if they share a common element
// e.g. two lists of roots
var something_in_common = function (x, y) {
    for (var i = 0; i < x.length; i++) {
        if (y.indexOf(x[i]) !== -1) {
            return true;
        }
    }
    return false;
};

var list_intersection = function (l1, l2) {
    return l1.filter(function (x) {return l2.indexOf(x) !== -1})
}

var key_value_pairs = function (d) {
    return Object.keys(d).map(function (x) {return [x, d[x]]});
}

/*
function is_subset(superset, subset) {
   for (var i = 0; i < subset.length; i++) {
       if (superset.indexOf(subset[i]) !== -1) {
           return false;
       }
   }
   return true;
}
*/

function is_sub_list(super_list, sub_list) {
    for (var i = 0; i < sub_list.length; i++) {
        if (super_list.indexOf(sub_list[i]) === -1) {
            return false;
        }
    }
    return true;
}

function remove_item (list, value) {
    return list.filter(function (x) {x !== value})
}

function remove (list, n) {
    return list.slice(0, n).concat(list.slice(n + 1));
}

function math_max (l) {
    if (l.length === 0) {return -Infinity}
    return l.reduce(function (x, y) {return Math.max(x, y)})
}
function math_min (l) {
    if (l.length === 0) {return Infinity}
    return l.reduce(function (x, y) {return Math.min(x, y)})
}

function contains(list, object){
	return list.indexOf(object) > -1;
}

var closest = function (list, value) {
    var min_less = math_min(list.map(function (x) {return value - x}).filter(
        function (x) {return x >= 0}));
    var min_more = math_min(list.map(function (x) {return x - value}).filter(
        function (x) {return x >= 0}));
    if (min_less < min_more) {return value - min_less} else {return value + min_more}
};

function unique_items(list) {
    var result = [];
    list.forEach(function (x) {if (result.indexOf(x) === -1) {result.push(x)}});
    return result;
}


function maximal(l) {
    ////~`console.log('LOG.maximal all template options = ' + JSON.stringify(l));
    var result = [];
    l.forEach(function (x) {
        var index = -1;
        x.forEach(function (y) {
            // Find y's index.
            var proposed_index = result.indexOf(y);
            // If y does not occur.
            if (proposed_index === -1) {
                // Increase index.
                index++;
                // Insert y at new index.
                result = result.slice(0, index).concat(y, result.slice(index));
            } else {
                // Make index y's index.
                index = proposed_index
            }
        })
    });
    ////~`console.log('LOG.maximal maximal template = ' + JSON.stringify(result));
    return result
}

function object_equals(a, b) {
    if (Object.keys(a).length === Object.keys(b).length) {
        for (var i in a) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

function list_equals(a, b) {
    if (a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}