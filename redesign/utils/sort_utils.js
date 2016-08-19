// This file contains utils involving sorting.
// It also contains long functions passed to sort.

// This function works well for comparing two numbers or strings.
var cmp = function (a, b) {
    // Follow the rules of JavaScript sorting.
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        // We want to catch weird cases, like NaN.
        throw 'Impossible ordering!'
    }
}