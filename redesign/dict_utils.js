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
// It does so by applying the real_type_of function to x.
var is_object = function (x) {
    return real_type_of(x) === 'object';
}