// This file implements a conjunction type.

// This is a list of legal conjunction types.
var legal_conjunction_types = ['coordinating', 'subordinating', 'dummy main',
'subordinating conditional'];

// A conjunction type is an object representeing a type of conjunction.
// To create one, you need the conjunction you want the type of.
var ConjunctionType = function (conjunction) {
    // First, get the type of the conjunction.
    var conjunction_type = conjunction.get_type();
    // Then, check that it is a legal conjunction type.
    if (legal_conjunction_types.indexOf(conjunction_type) === -1) {
        // The conjunction type is not legal; we throw an error.
        throw conjunction_type + ', the type of ' +
        JSON.stringify(conjunction) + ', is not a legal conjunction type.';
    }
    this.conjunction_type = conjunction_type;
}

// This method determines whether two conjunction types,
// or a conjunction type and a string, are equal.
ConjunctionType.prototype.is = function (other) {
    // We get the string in other if other is a conjunction type,
    // so we're always dealing with strings belond this conditional.
    if (other instanceof ConjunctionType) {
        // other is a ConjunctionType; we replace it by the type as a string.
        other = other.conjunction_type;
    }
    // We check whether the conjunction type of this is the same as other
    // and return the result of the check.
    return this.conjunction_type === other;
}