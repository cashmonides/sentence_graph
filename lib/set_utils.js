// This file contains utils relating to sets.
// Since sets are not a built-in type until es6 and many people
// still use es5 browsers, some of which do not implement sets,
// we use dictionaries as sets rather than using any built-in type of set.

// This function creates a set from a list or dictionary (or other set).
// It can also be used to copy a set.
// There is an optional error message.
var set_from = function (x, error_message) {
    // We create our set.
    // "set" is used syntactically in javascript
    // (although it is not a reserved word)
    // and it seems to annoy my editor, so I'm not using
    // it as a variable name.
    var our_set = {};
    // We do different things depending on whether our set
    // is being created from an array. No matter what, though,
    // we need a looping variable i.
    var i;
    if (Array.isArray(x)) {
        // Loop over x as an array, adding each item to the set.
        for (i = 0; i < x.length; i++) {
            our_set[x[i]] = true;
        }
    } else if (is_object(x)) {
        // Loop over x as a dictionary, again adding each item to the set.
        for (i in x) {
            our_set[i] = true;
        }
    } else {
        if (error_message === undefined) {
            throw JSON.stringify(x) + ' is not convertible to a set!';
        } else {
            throw error_message.replace(/\$/g, JSON.stringify(x));
        }
    }
    // After having added elements to it, we return our set.
    return our_set;
}

// This function adds the elements of its second argument to its first.
// If it finds an element in both, it throws an error.
var set_disjoint_union = function (x, y, err) {
    // We loop over the second argument.
    for (var i in y) {
        // If an element in the second argument is also in the first,
        // we throw an error.
        if (i in x) {
            throw err;
        }
        // Add the element to the first set.
        x[i] = true;
    }
    // We return the first set.
    return x;
}

// Take the intersection of two sets.
var set_intersection = function (a, b) {
    // Make an empty set.
    var s = {};
    // Add every item in both sets to it.
    for (var i in a) {
        if (i in b) {
            s[i] = true;
        }
    }
    // Return the new set.
    return s;
}

// Take the difference of two sets.
var set_difference = function (a, b) {
    // Make an empty set.
    var s = {};
    // Add every item in the first set but not the second to it.
    for (var i in a) {
        if (!(i in b)) {
            s[i] = true;
        }
    }
    // Return the new set.
    return s;
}
