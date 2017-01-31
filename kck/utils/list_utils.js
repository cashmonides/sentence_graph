// This file contains utils relating to lists.

// This function removes null from a list.
var remove_null = function (list) {
    // We filter the list, filtering out null and only null.
    return list.filter(function (x) {
        // We filter out null.
        return x !== null;
    })
}

// This function gets the last item of a list.
var last = function (list) {
    return list[list.length - 1];
}

// This function removes duplicates from a list.
// It takes an optional function that turns elements into strings
// so that they can be compared.
var remove_duplicates = function (list, f) {
    // Let the function be the identity if it is not passed in.
    if (!f) {
        f = function (x) {return x};
    }
    // Initialize a list and a set.
    var new_list = [];
    var list_as_set = {};
    // Some completely typical looping code.
    var item;
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        // This skips items we've already seen.
        if (f(item) in list_as_set) {
            continue;
        }
        // We've not seen this item yet, so add the item to the list
        // and put it in the set.
        new_list.push(item);
        list_as_set[f(item)] = true;
    }
    // Return the new list. (We did not mutate.)
    return new_list;
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

// This function takes the sum of a list of numbers.
var sum = function (list) {
    return list.reduce(function (x, y) {return x + y}, 0);
}

// This function takes the product of a list of numbers.
var product = function (list) {
    return list.reduce(function (x, y) {return x * y}, 1);
}

// This function counts the number of items in a list with a certain property.
var count = function (list, f) {
    // The total number of items satisfying the condition is initially zero.
    var total = 0;
    // We loop over the list.
    for (var i = 0; i < list.length; i++) {
        // We add one to the total for each item satisfying the condition.
        if (f(list[i])) {
            total++;
        }
    }
    // We return the total.
    return total;
}

// This function counts the number of items in a list
// equal to a certain value.
var count_occurances = function (list, value) {
    return count(list, function (x) {
        return x === value;
    });
}

// This function builds a list of repetitions of a value.
var repeat = function (value, n) {
    // Initialize an empty result.
    var result = [];
    // Push value to the result n times.
    for (var i = 0; i < n; i++) {
        result.push(value);
    }
    // Return the result.
    return result;
}

// This function converts arguments to a list.
var args_to_list = function (x) {
    return [].slice.call(x);
}

// This function 'cross'es some lists by another function.
// Examples:
// ['a', 'b'], ['c', 'd'], + -> ['ac', 'ad', 'bc', 'bd']
// [1, 2, 4], [6, 7, 8], * -> [6, 7, 8, 12, 14, 16, 24, 28, 32]
var cross = function () {
    var args = args_to_list(arguments);
    var lists = args.slice(0, -1);
    if (lists.some(function (x) {return !Array.isArray(x)})) {
        throw 'Some of the supposed lists in ' +
        JSON.stringify(lists) + ' are not lists!';
    }
    var f = args[args.length - 1];
    var elems_in_cross = product(lists.map(function (x) {
        return x.length;
    }));
    var l = [];
    for (var i = 0; i < elems_in_cross; i++) {
        var k = i;
        var sub_l = [];
        for (var j = lists.length - 1; j > -1; j--) {
            sub_l.push(lists[j][k % lists[j].length]);
            k = Math.floor(k / lists[j].length);
        }
        sub_l.reverse();
        l.push(f.apply(null, sub_l));
    }
    return l;
}