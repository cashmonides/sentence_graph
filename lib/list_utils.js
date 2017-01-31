// This file contains mainly list utils.
// It also has some dictionary utils.

var order_by = function (list, ordering, f) {
    var result = [];
    for (var i = 0; i < ordering.length; i++) {
        var item = ordering[i];
        for (var j = 0; j < list.length; j++) {
            var role = list[j];
            if (f(role) === item) {
                result.push(role);
            }
        }
    }
    return result;
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

//some old notes from original utils
//todo possibly make a sum function in utils, abstracting from get_accuracy
//research list comprehension in ES6 (not to be used; we are es5)
//sum function now made months later
//note from 2016: list comprehension is not in es6 or es7
var sum = function (list) {
    return list.reduce(function (a, b) {return a + b});
}

// Average (mean) of a list.
var average = function (list) {
    return sum(list) / list.length;
}

var count_occurrences = function (list, item) {
    return list.filter(function (x) {
        return x === item;
    }).length;
}

// Example:
// zip_with([1, 2], [3, 4, 5], [6, 7], function (a, b, c) {return a + b + c}) is [10, 13].
var zip_with = function () {
    var lists = args_to_list(arguments);
    // pop off the function at the end.
    var f = lists.pop();
    // Stop when the first result stops.
    var result_length = math_min(lists.map(function (x) {
        return x.length;
    }));
    var result = [];
    for (var i = 0; i < result_length; i++) {
        result.push(f.apply(null, lists.map(function (arg) {
            return arg[i];
        })));
    }
    return result;
}

// This function concatenates a list of lists.
var concat_all = function (list_of_lists) {
    if (list_of_lists.length < 10) {
        return [].concat.apply([], list_of_lists);
    } else {
        // There is a limit to the number of arguments a function can take
        // according to the JavaScript standard.
        // With apply, we are basicly feeding every item in list_of_lists in
        // as an argument of the concat method.
        // It's easy to see how this could be disastrous.
        // So we use some loops instead.
        var l = [];
        for (var i = 0; i < list_of_lists.length; i++) {
            for (var j = 0; j < list_of_lists[i].length; j++) {
                l.push(list_of_lists[i][j]);
            }
        }
        return l;
    }
}

// This function maps a list, then concatenates the results.
var concat_map = function (list, f) {
    if (!Array.isArray(list)) {
        throw 'This function only works with the list monad, not ' +
        JSON.stringify(list) + '!';
    }
    return concat_all(list.map(f));
}

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

// This function converts arguments to a list.
var args_to_list = function (x) {
    return [].slice.call(x);
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

// does the list contain the object?
function contains(list, object){
	return list.indexOf(object) > -1;
}

function is_empty(list) {
    return list.length === 0;
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

var copy = function (x) {
    return x.slice(0);
};

var enlist = function (x) {
	return [].concat(x);
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

// Return the first element in a list satisfying a function.
// Same effect as filtering and then taking the first element,
// but far more efficient.
var first_satisfying = function (list, f) {
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (f(item)) {
            return item;
        }
    }
    return null;
}

// Zips some number of lists together.
var zip = function () {
    var arguments_list = args_to_list(arguments);
    // Stop when the first argument stops.
    var result_length = math_min(arguments_list.map(function (x) {
        return x.length;
    }));
    var result = [];
    for (var i = 0; i < result_length; i++) {
        result.push(arguments_list.map(function (arg) {
            return arg[i];
        }));
    }
    return result;
}