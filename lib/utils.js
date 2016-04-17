// This file has utils that still don't fit anywhere else.
// Now that the string utils are gone, this file is very small.

//below should be our separate abstraction of get_accuracy - not done yet
//takes an object (a module inside of metrics, which is a map of numbers to numbers - i.e. attempts to counts
//returns a number
var get_accuracy3 = function (iteration) {
    return percentage(iteration[0], sum(values(iteration)));
};

var percentage = function (a, b) {
    return Math.floor(100 * a / b);
}

var constant = function (x) {
    return function () {
        return x;
    }
}

var identity = function (x) {
    return x;
}

var hash = function (x) {
    var internal_hash = 0;
    if (x.length == 0) {return internal_hash};
    for (var i = 0; i < x.length; i++) {
        internal_hash = ((internal_hash << 5) - internal_hash)
        + x.charCodeAt(i);
    }
    return internal_hash;
}