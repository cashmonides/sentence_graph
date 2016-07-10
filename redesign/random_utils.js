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