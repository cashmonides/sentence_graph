// Some moderately confusing and otherwise bad utils, which are generally not that useful.

// todo akiva look at this
// takes a list (elements in the keys of the dictionary) and a dictionary
// returns a dictionary with just those keys and their values
var convert_keys_to_dict = function (x, y) {
    var r = {};
    x.forEach(function (z) {r[z] = y[z]});
    return r
};

// todo akiva look at this
// takes a list of pairs
// returns a dictionary with keys first items of pairs and values second items
var dict_from_list_of_pairs = function (x) {
    var r = {};
    x.forEach(function (z) {r[z[0]] = z[1]});
    return r
};

// todo akiva look at this
// given a list and a function
// returns a dictionary
var keys_mapped_by_function = function (x, f) {
    var r = {};
    x.forEach(function (y) {r[y] = f(y)});
    return r
};

// Now not used.
function array_from (s) {
	var r = [];
	for (var i of s) {r.push(i)}
	return r;
}

/*
// If we ever need these...
function f_curry(f) {
    return function (x) {return function (y) {return f(x, y)}};
}

function f_flip(f) {
    return function (x, y) {return f(y, x)};
}
*/

/*
Replaced by a simple equality test, with a variable correct_hash;
the name was somewhat misleading because this hash is only for login.
var is_correct_access_code = function(access_code) {
    return hash(access_code) === 1327021340;
}
*/