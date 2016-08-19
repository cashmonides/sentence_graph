// This file contains utils related to strings.

// This function capitalizes the first character of a string
// and none of the others.
var title = function (x) {
    return x[0].toUpperCase() + x.slice(1).toLowerCase();
}