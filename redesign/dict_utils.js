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

// This function joins a list of disjoint dictionaries.
var join_disjoint_dicts = function (dicts) {
    // Create our result.
    var result = {};
    // Standard looping code.
    var dict;
    for (var i = 0; i < dicts.length; i++) {
        dict = dicts[i];
        // For each key in the item dict, check that it doesn't exist
        // already, and add it to the new dictionary (with the same value).
        for (var j in dict) {
            // The check of nonexistance.
            if (j in result) {
                throw j + ' is a duplicate key!';
            }
            // The addition to the new dictionary.
            result[j] = dict[j];
        }
    }
    // Return the result.
    return result;
}

// This function does a function throughout a dictionary in a nested way.
var iterate_through_dict = function (d, f) {
    // Check if the dictionary actually is a dictionary.
    if (is_object(d)) {
        // Do the obvious recursive thing.
        // (just {i: iterate_through_dict(d[i], f) for i in d} in python,
        // but javascript doesn't work that way)
        var result = {};
        for (var i in d) {
            // Note: not f(d[i]). This would cause problems
            // in the case of more than one level of nesting.
            result[i] = iterate_through_dict(d[i], f);
        }
        return result;
    } else {
        // If the dictionary is not actually a dictionary there is
        // no nesting, so just apply the function.
        return f(d);
    }
}

// This function gets a list of key-value pairs from a dictionary.
// It does this by getting the key-value pair for each key.
var list_of_pairs_from_dict = function (obj) {
    return Object.keys(obj).map(function (x) {
        return [x, obj[x]];
    });
}