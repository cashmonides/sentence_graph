// This file contains utils which are mostly about randomness.

// This function, given an integer x, chooses a random integer
// between 0 and x - 1 inclusive.
var rand_int = function (x) {
    return Math.floor(Math.random() * x)
}

// Thus function chooses randomly from an inclusive range given
// the range's boundaries.
var random_from_inclusive_range = function (min, max) {
    // The + 1 lets us get max.
    return min + rand_int(max - min + 1);
}

// This function, given a list, returns a random element from the list.
// It does the same for a string.
var random_choice = function (list) {
    return list[rand_int(list.length)];
}

// This function, given a list, will shuffle a list.
var shuffle = function (list) {
    // Loop backwards though the list.
    for (var i = (list.length - 1); i > 0; i--) {
        // Pick a random index.
        var j = rand_int(i + 1);
        // Swap the item at that index with the item at
        // a steadily-decreasing index, so that each item is random.
        // (Even though it sounds like there are problems, I don't
        // think there are, although it's possible I'm wrong.)
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    // Return the list so that we have access to it as a return value.
    return list;
}

// This function chooses from the keys of a dictionary,
// weighted by the values. There is an option for only
// letting certain keys be chosen.
var weighted_choice = function (dict, accept_key) {
    // If the accept_key parameter is not passed, accept every key.
    if (!accept_key) {
        accept_key = function () {return true};
    }
    // If the object being chosen from is an array, this is very simple.
    if (Array.isArray(dict)) {
        return random_choice(dict.filter(accept_key));
    }
    // Check that the object being chosen from is a real object.
    if (!is_object(dict)) {
        throw JSON.stringify(dict) + ' is not a real object.';
    }
    // We get the keys to choose from.
    var keys_to_choose_from = Object.keys(dict).filter(accept_key);
    // This just sums the values of the dictionary
    // for the keys we want to choose from.
    var x = sum(keys_to_choose_from.map(function (key) {
        return dict[key];
    }));
    // Choose a random number between 0 and the sum.
    var random_number = Math.random() * x;
    // Loop over the keys we want to choose from.
    var item;
    for (var i = 0; i < keys_to_choose_from.length; i++) {
        item = keys_to_choose_from[i];
        // Subtract each value from the number and, when the number
        // goes below zero, return the corresponding key. This gives
        // each key the correct chance.
        random_number -= dict[item];
        if (random_number < 0) {
            return item;
        }
    }
}