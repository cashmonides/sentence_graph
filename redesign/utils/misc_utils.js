// This file contains miscellaneous utils.

// This function reports the type of an object in a way perhaps better
// than the typeof operator. Firstly, null is a type. Secondly,
// arrays are also a type. Those are, however, the only differences.
// So real_type_of(new Number(2)) is still 'object',
// as is real_type_of(/abc/).
var real_type_of = function (x) {
    // We get the javascript type of x.
    var type = typeof x;
    // If the result is not 'object', it is reasonable.
    if (type !== 'object') {
        return type;
    } else if (x === null) {
        // The type of null is 'null'.
        return 'null';
    } else if (Array.isArray(x)) {
        // The type of an array is 'array'.
        return 'array';
    } else {
        // Our object is neither null or an array,
        // so we return 'object'.
        return 'object';
    }
}

// This function gets the maximum of a list.
var max_list = function (list) {
    return Math.max.apply(null, list);
}