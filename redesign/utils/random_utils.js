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
// weighted by the values.
var weighted_choice = function (dict) {
    // This just sums the values of the dictionary.
    var x = sum(values(dict));
    // Shoose a random number between 0 and the sum.
    var random_number = Math.random() * x;
    // Loop over the values.
    for (var i in dict) {
        // Subtract each value from the number and, when the number
        // goes below zero, return the corresponding key. This gives
        // each key the correct chance.
        random_number -= dict[i];
        if (random_number < 0) {
            return i;
        }
    }
}