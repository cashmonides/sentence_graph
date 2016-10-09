// This function finds the index of a conjunction (c) in a seed.
var find_conjunction_index = function (seed) {
    return seed.indexOf('c');
}


// This function checks whether its input is a direction.
// It is used for error-checking.
var check_is_direction = function (direction) {
    // left and right are the only legal directions.
    if (direction !== 'left' && direction !== 'right') {
        throw 'Expected a direction but got ' + JSON.stringify(direction);
    }
}