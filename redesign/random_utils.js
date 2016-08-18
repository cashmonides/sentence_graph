// This file contains utils which are mostly about randomness.

// This function, given an integer x, chooses a random integer
// between 0 and x - 1 inclusive.
var rand_int = function (x) {
    return Math.floor(Math.random() * x)
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