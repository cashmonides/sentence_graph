// This file contains the conjunction object.

// A conjunction object is just the conjunction JSON dictionary with methods.

// This function constructs a conjunction from its key,
// which we also call its citation name.
var Conjunction = function (citation_name) {
    // We get the conjunction corresponding to our string
    // from the conjunction library.
    var conjunction = conjunction_library[citation_name];
    // We stringify and parse the conjunction corresponding to our string
    // to avoid mutability issues, in effect copying it.
    var copied_conjunction = JSON.parse(JSON.stringify(conjunction));
    // We give the copied conjunction a citation name
    // which is the citation name passed in.
    copied_conjunction.citation_name = citation_name;
    // We set the conjunction property of this to x.
    this.conjunction = copied_conjunction;
    // We keep the original conjunction around so we can search it.
    this.original_conjunction = conjunction;
    // We add the conjunction as a lexeme if we should.
    if (this.usable_as_lexeme()) {
        KCKLexeme.lexemes[citation_name] = this;
    }
}

// This function simply does access into the underlying JSON dictionary.
Conjunction.prototype.get_property = function (x) {
    return this.conjunction[x];
}

// This function checks existance of properties
// in the underlying JSON dictionary.
Conjunction.prototype.has_property = function (x) {
    return x in this.conjunction;
}

// This function gets the type of the conjunction.
Conjunction.prototype.get_type = function (x) {
    return this.conjunction.type;
}

// This method lets us access a property of the conjunction telling us
// the appropriate construction.
// We do so via concatenating strings to make k_left_construction
// or k_right_construction, and then look at that
// property of the conjunction.
Conjunction.prototype.get_construction = function (direction) {
    return this.conjunction['k_' + direction + '_construction'];
}

// This method lets us get the part of speech of a conjunction.
Conjunction.prototype.get_part_of_speech = function () {
    return 'conjunction';
}

// This method lets us get the name of a conjunction.
Conjunction.prototype.get_name = function () {
    return this.conjunction.citation_name;
}
// The method lets us get the clause_acts_as property of the conjunction.
Conjunction.prototype.clause_acts_as = function () {
    return this.conjunction.clause_acts_as;
}

// This method lets us find whether a conjunction can be used as a lexeme.
Conjunction.prototype.usable_as_lexeme = function () {
    // A conjunction can be used as a lexeme if and only
    // if it is not the null conjunction.
    return !this.is_null_conjunction();
}

// This function lets us create conjunction methods that
// search a particular property of the conjunction,
// either the current version or the original.
var get_conjunction_restriction_from = function (property) {
    // Return the method created.
    return function (direction, type) {
        // We create our lookup string.
        var lookup_string = 'k_' + direction + '_' + type + '_restriction';
        // We check whether the lookup string is actually a property.
        if (lookup_string in this[property]) {
            // All is well and we return the associated value.
            return this[property][lookup_string];
        } else {
            // We have an issue since the lookup string is not a property.
            // We return a NonexistantKey, which will likely cause an
            // error-catching part of the code to throw an information-rich
            // error.
            return new NonexistantKey();
        }
    }
}

// This method lets us get a restriction from the conjunction
// given direction and type of the restriction.
Conjunction.prototype.get_restriction =
get_conjunction_restriction_from('conjunction');

// This method lets us get a restriction from the original conjunction
// given direction and type of the restriction.
Conjunction.prototype.get_original_restriction =
get_conjunction_restriction_from('original_conjunction');

// This function returns debuging information for a situation where
// we come across an error while adding a restriction.
Conjunction.prototype.debug_info = function (direction, type) {
    // We concatenate a lot of strings to make our debugging information.
    return 'conjunction ' +
    JSON.stringify(this) + ', direction ' +
    JSON.stringify(direction) + ', and restriction' +
    JSON.stringify(type);
}

// This detects whether a conjunction is null
// by checking whether its type is 'dummy main'.
Conjunction.prototype.is_null_conjunction = function (conjunction) {
    return this.get_type() === 'dummy main';
}

// This function translates a conjunction into a given language.
Conjunction.prototype.translate_into = function (language) {
    // We lowercase the language, since entries
    // for languages are in lowercase.
    // We also add _form to it, because this too
    // is in conjunction translation entries.
    language = language.toLowerCase() + '_form';
    // We check that the conjunction has a translation in the language.
    if (!(language in this.conjunction)) {
        // We can't find the translation so we throw an error.
        throw JSON.stringify(this.conjunction) + ' does not have a/an '
        + language + ' form!';
    }
    // We return the translation.
    return this.conjunction[language];
}

// This method displays the constructions on the left and right
// of a conjunction, with a final newline if there is one.
Conjunction.prototype.construction_display = function () {
    // We create a list of constructions.
    var constructions = [];
    // We add the left construction if it is not null.
    if (this.get_construction('left') !== null) {
        constructions.push('    left construction: ' +
        this.get_construction('left'));
    }
    // We add the right construction if it is not null.
    if (this.get_construction('right') !== null) {
        constructions.push('    right construction: ' +
        this.get_construction('right'));
    }
    // We check if any of the constructions were not null.
    if (constructions.length > 0) {
        // We return the constructions joined by newline
        // and with a final newline.
        return constructions.join('\n') + '\n';
    } else {
        // We return nothing.
        return '';
    }
}

// This variable stores the types of constraints a conjunction can induce.
var conjunction_constraint_types = ['lexical', 'mood', 'time'];

// This function gets a constraint in a language.
// It first gets the constraint, then finds the entry
// for the language in it, if any.

// Note that it uses the original restriction to prevent
// bugs from restriction mutation.
Conjunction.prototype.get_original_constraint_in_language = function (
    direction, type, language) {
    // Make the language lowercase.
    language = language.toLowerCase();
    // Set a variable to the constraint being examined.
    var constraint = this.get_original_restriction(direction, type);
    
    // Is the constraint not an object?
    if (!is_object(constraint)) {
        // If so, return the constraint. (It is language-independent.)
        return constraint;
    }
    
    // Did the constraint not exist?
    if (constraint instanceof NonexistantKey) {
        // Return null, since there was no constraint.
        return null;
    }
    
    // The property should be language-dependent.
    // We check that the language given is supported,
    // that is, the language is a property of the value.
    if (!(language in constraint)) {
        // We throw an error.
        throw 'Error! ' + language + ' is not in ' +
        JSON.stringify(constraint) + '!';
    }
    
    // This is the value of the property in the language.
    var value_in_language = constraint[language];
    
    // We return the value in the language.
    return value_in_language;
}

// This function displays the constraints a conjunction imposes
// and adds a final newline if there are any constraints.
Conjunction.prototype.constraints_display = function (language) {
    // We create a list of constraints.
    var constraints = [];
    // We create a variable to store a constraint.
    var constraint;
    // We loop over our directions.
    for (var i = 0; i < directions.length; i++) {
        // We loop over all types of constraints.
        for (var j = 0; j < conjunction_constraint_types.length; j++) {
            // Get the constraint for the direction and type in the language.
            // Do not accept defaults.
            constraint = this.get_original_constraint_in_language(
                directions[i], conjunction_constraint_types[j], language);
            // If the constraint is not null, push it, plus
            // a description of what's being constrained,
            // to the constraint list.
            if (constraint !== null) {
                // Push the constraint.
                constraints.push('    ' + directions[i] + ' ' +
                    conjunction_constraint_types[j] + ': ' + constraint);
            }
        }
    }
    // We check if any of the constraints were not null.
    if (constraints.length > 0) {
        // We return a list of the constraints, joined by newline
        // and headed by 'constraints:'
        return '    constraints:\n' + constraints.join('\n') + '\n';
    } else {
        // We return nothing.
        return '';
    }
}

// This function displays the contents of a conjunction in a detailed way.
Conjunction.prototype.detailed_display = function (language) {
    // We include both the constructions and the constrains.
    return '[\n' + this.construction_display() +
    this.constraints_display(language) + ']';
}