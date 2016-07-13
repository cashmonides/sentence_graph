// This file contains utils relating to dictionaries.

// This function gets the values of a dictionary.
var values = function (dictionary) {
    // We begin with an empty list of values.
    var list_of_values = [];
    // We iterate over the keys of the dictionary.
    for (var i in dictionary) {
        // For each key, we push the corresponding value to our list of values.
        list_of_values.push(dictionary[i]);
    }
    // We return our list of values.
    return list_of_values;
}

// This function checks whether its input (x) is an object.
// It does so by applying the operator typeof to x.
// It x is an object, typeof x is 'object'.
// However, typeof null is also 'object',
// so we also do a check for null, since we don't
// generally want to consider null an object.
var is_object = function (x) {
    return typeof x === 'object' && x !== null;
}