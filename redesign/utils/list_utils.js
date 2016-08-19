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
    return [].concat.apply([], list_of_lists);
}

// This function maps a list, then concatenates the results.
var concat_map = function (list, f) {
    if (!Array.isArray(list)) {
        throw 'This function only works with the list monad, not ' +
        JSON.stringify(list) + '!';
    }
    return concat_all(list.map(f));
}

// This function takes the product of a list of numbers.
var product = function (list) {
    return list.reduce(function (x, y) {return x * y}, 1);
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