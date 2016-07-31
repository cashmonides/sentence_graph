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
var remove_duplicates = function (list) {
    // Initialize a list and a set.
    var new_list = [];
    var list_as_set = {};
    // Some completely typical looping code.
    var item;
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        // This skips items we've already seen.
        if (item in list_as_set) {
            continue;
        }
        // We've not seen this item yet, so add the item to the list
        // and put it in the set.
        new_list.push(item);
        list_as_set[item] = true;
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
    return concat_all(list.map(f));
}