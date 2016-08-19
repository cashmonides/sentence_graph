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

// This function gets a list of key-value pairs from a dictionary.
// It does this by getting the key-value pair for each key.
var list_of_pairs_from_dict = function (obj) {
    return Object.keys(obj).map(function (x) {
        return [x, obj[x]];
    });
}

// Handy dictionary navigation.
// Supports three types of navigation.
// plain - does what's usual.
// ? (at end) - defaults to null, returns null when given null.
// ! (at end) - throws an error if it is not fed a dictionary or
// the key is not found.
var dict_navigate = function (dict, string) {
    // Split into the navigational parts.
    var navigate_through = string.split('.');
    // Store the original dictionary in case of an error.
    var orig_dict = dict;
    var item;
    var search_by;
    var last_char;
    var get_all_error_data = function () {
        return 'navigate_through = ' + JSON.stringify(navigate_through) +
        ', item = ' + JSON.stringify(item) + ', dict = ' +
        JSON.stringify(dict) + ', original = ' + JSON.stringify(orig_dict);
    }
    for (var i = 0; i < navigate_through.length; i++) {
        item = navigate_through[i];
        last_char = item[item.length - 1];
        // What type of navigation?
        if (last_char === '?') {
            // Safe navigation.
            // (Note undefined will throw an error. Be careful.)
            if (dict !== null) {
                // Take off the question mark.
                search_by = item.slice(0, -1);
                // Safely check for key existance.
                if (search_by in dict) {
                    dict = dict[search_by]
                } else {
                    // No key so null.
                    dict = null;
                }
            }
        } else if (last_char === '!') {
            // Check!
            if (!is_object(dict)) {
                throw 'dict is not an object! ' + get_all_error_data();
            }
            // Take off the exclamation point.
            search_by = item.slice(0, -1);
            // Check!
            if (!(search_by in dict)) {
                throw 'Failed to find key in object! ' + get_all_error_data();
            }
            dict = dict[search_by];
        } else {
            // Do the normal thing.
            dict = dict[item];
        }
    }
    return dict;
}