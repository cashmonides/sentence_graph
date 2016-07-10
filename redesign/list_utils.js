// This file contains utils relating to lists.

// This function removes null from a list.
var remove_null = function (list) {
    // We filter the list, filtering out null and only null.
    return list.filter(function (x) {
        // We filter out null.
        return x !== null;
    })
}