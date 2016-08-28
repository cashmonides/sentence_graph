// This function adds the appropriate lexical restriction (if any)
// to the kernel. It takes a conjunction and a direction.
Kernel.prototype.add_lexical_restriction = function (
    conjunction, direction) {
    // We find the appropriate lexical restriction
    // in the conjunction.
    var lexical_restriction = conjunction.get_restriction(
        direction, 'lexical');
    // If the lexical restriction we just got exists, we add it.
    // This includes checking that it is not of type NonexistantKey.
    if (lexical_restriction && !(
        lexical_restriction instanceof NonexistantKey)) {
        // The lexical restriction exists, so (as said above) we add it.
        this.classifications.lexical = lexical_restriction;
    }
}

// The function is higher-order. It takes a type of restriction
// (as a string, e.g., lexical) and returns a function
// which, when used as a method on the Kernel,
// adds a restriction of the type specified given
// a conjunction (as JSON) and a direction.
var add_language_specific_restriction = function (type) {
    // As said above, this function takes a conjunction
    // and a direction and adds a restriction of
    // the specified type to the conjunction.
    return function (conjunction, direction) {
        // We get the restriction from the conjunction based on the
        // direction and type.
        var restriction = conjunction.get_restriction(direction, type);
        // We check that the restriction is a true object
        // (its type is object and it is not null).
        
        // We check that the restriction is valid.
        if (restriction instanceof NonexistantKey) {
            // This means that the key does not exist (unless
            // someone actually used a NonexistantKey object as a value,
            // which should never happen).
            // We put together debugging information for this error.
            throw 'The restriction with ' + conjunction.debug_info(
                direction, type) + 'appears not to exist.';
        } else if (!is_object(restriction)) {
            // The restriction exists, it just isn't valid. We throw an error
            // saying what the restriction is.
            throw 'The restriction with ' + conjunction.debug_info(
                direction, type) + 'appears to be invalid; it is ' +
                JSON.stringify(restriction);
        }
        // We add the restriction as a classification of the specified type.
        this.classifications[type] = restriction;
    }
}

// This function adds the appropriate time restriction to the kernel.
// It takes a conjunction (in JSON format) and a direction.
Kernel.prototype.add_time_restriction = add_language_specific_restriction(
    'time');


// This function is as above, except that it adds a mood restriction
// instead of a time restriction.
Kernel.prototype.add_mood_restriction = add_language_specific_restriction(
    'mood');

// This function adds a clause type restriction.
// Those restrictions have different rules than other types of restriction.
// This function takes a conjunction (in JSON format) and a direction.

// It finds the type of the conjunction; this should be one of
// 'coordinating', 'subordinating', or 'dummy main'. We encapsulate
// this check in a ConjunctionType object.

// Then we have some if statements to determine our type.

// Note: When we have multiple clauses this will need to be smarter,
// but we're not making it smarter right now because we don't need to.
// todo: Fix this when we have some idea of what happens
// with multiple clauses.
Kernel.prototype.add_clause_type_restriction = function (
    conjunction, direction) {
    // We create our ConjunctionType object.
    var conjunction_type = new ConjunctionType(conjunction);
    // We create a variable called clause_type to store
    // the clause type of the clause.
    var clause_type;
    
    // We have a bunch of if statements.
    
    // Is the conjunction coordinating?
    if (conjunction_type.is('coordinating')) {
        // If so, the clause is main.
        clause_type = 'main';
    } else if (conjunction_type.is('subordinating')) {
        // The conjunction is subordinating.
        if (direction === 'left') {
            // The left clause is main.
            // (Here, it is the subordinating clause).
            clause_type = 'main';
        } else {
            // The right clause is subordinate, subordinated
            // by the conjunction passed in as an argument.
            clause_type = 'subordinate';
        }
    } else if (conjunction_type.is('subordinating conditional')) {
        // The conjunction is an if statement.
        // For if statements, it seems that the constructions in
        // the conjunction library are sufficient, so we simply use those.
        clause_type = conjunction.get_construction(direction);
    } else if (conjunction_type.is('dummy main')) {
        // The conjunction is a dummy.
        if (direction === default_direction) {
            // The clause in the default direction exists (and is main).
            // But does it have an independent subjunctive?
            // We determine this by checking whether our mood restriction
            // on the default side (in latin) is subjunctive, or,
            // as it would otherwise be, indicative (or null
            // since indicative is implicit).
            
            // We define a variable to be the mood restriction.
            var mood_restriction = conjunction.get_restriction(
                default_direction, 'mood').latin;
            // We do the check of the mood restriction.
            if (mood_restriction === 'subjunctive') {
                // Subjunctive implies an independent subjunctive.
                clause_type = 'independent subjunctive';
            } else {
                // We check that the mood restriction is indicative or null.
                if (mood_restriction !== 'indicative'
                && mood_restriction !== null) {
                    // The mood restriction was neither indicative or null,
                    // so we throw an error.
                    throw 'mood restriction ' + JSON.stringify(
                        mood_restriction) + ' of conjunction ' +
                        JSON.stringify(conjunction) +
                        ' is neither indicative or null!';
                }
                // Indicative implies no independent subjunctive.
                clause_type = 'main';
            }
        } else {
            // All the other clauses (currently, only one; the one
            // in the non-default direction) are nonexistant.
            clause_type = 'nonexistant';
        }
    } else {
        // We throw an informative error.
        throw 'Error with conjunction ' + JSON.stringify(conjunction) +
        ', direction ' + JSON.stringify(direction) +
        ', and conjunction type ' + JSON.stringify(conjunction_type) +
        '; conjunction type appears to have slipped through the if statement';
    }
    
    // We check that clause_type is a string.
    if (typeof clause_type !== 'string') {
        // We throw an informative error.
        throw 'Error with conjunction ' + JSON.stringify(conjunction) +
        ', direction ' + JSON.stringify(direction) +
        ', conjunction type ' + JSON.stringify(conjunction_type) +
        ', and clause_type ' + JSON.stringify(clause_type) +
        '; clause_type was somehow not set or set to a non-string.';
    }
    
    // We actually set the property.
    this.classifications.clause_type = clause_type;
}

// This method lets us add tense overrides and translation formulae to the kernel.
Kernel.prototype.add_tense_overrides_and_tf = function (conjunction, direction) {
    // This adds a tense_override and translation_formula "restriction".
    // They are null if they cannot be found.
    // This is the cleanest way I know of of looping over a few items.
    // I consider a for loop over an array less clear,
    // and forEach potentially confusing.
    for (var property in {
        'tense_override': true,
        'translation_formula': true,
    }) {
        // This is the key for accessing the property.
        var key = 'k_' + direction + '_' + property;
        // If the conjuction has the property, add what the conjunction has.
        if (conjunction.has_property(key)) {
            this.classifications[property] = conjunction.get_property(key);
        }
    }
}

// This method lets us add a regime to the kernel.
Kernel.prototype.add_regime = function (conjunction, direction) {
    // This is the key for accessing the verb regime.
    var key = 'k_' + direction + '_verb_regime';
    // If the conjuction has a verb regime (which it should),
    // add what the conjunction has.
    if (conjunction.has_property(key)) {
        this.classifications.regime = conjunction.get_property(key);
    }
}