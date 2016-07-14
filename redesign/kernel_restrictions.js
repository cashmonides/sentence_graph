// This function adds the appropriate lexical restriction (if any)
// to the kernel. It takes a conjunction (in JSON format) and a direction.
Kernel.prototype.add_lexical_restriction = function (
    conjunction, direction) {
    // We find the appropriate lexical restriction by property lookup
    // in the conjunction.
    var lexical_restriction = get_conjunction_restriction(
        conjunction, direction, 'lexical');
    // If the lexical restriction we just got exists, we add it.
    // This includes checking that it is not of type NonexistantKey.
    if (lexical_restriction && !(
        lexical_restriction instanceof NonexistantKey)) {
        this.restrictions.lexical = lexical_restriction;
    }
}

// This function uses property lookup on the conjunction
// to get a specific restriction.
var get_conjunction_restriction = function (conjunction, direction, type) {
    // We create our lookup string.
    var lookup_string = 'k_' + direction + '_' + type + '_restriction';
    // We check whether the lookup string is actually a property.
    if (lookup_string in conjunction) {
        // All is well and we return the associated value.
        return conjunction['k_' + direction + '_' + type + '_restriction'];
    } else {
        // We have an issue since the lookup string is not a property.
        // We return a NonexistantKey, which will likely cause an
        // error-catching part of the code to throw an information-rich
        // error.
        return new NonexistantKey();
    }
}

// This function returns debuging information for a situation where
// we come across an error while adding a restriction.
var restriction_debug_info = function (conjunction, direction, type) {
    // We concatenate a lot of strings to make our debugging information.
    return 'conjunction ' +
    JSON.stringify(conjunction) + ', direction ' +
    JSON.stringify(direction) + ', and restriction' +
    JSON.stringify(type);
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
        // We get the restriction based on the conjunction,
        // direction, and type.
        var restriction = get_conjunction_restriction(
            conjunction, direction, type);
        // We check that the restriction is a true object
        // (its type is object and it is not null).
        
        // We check that the restriction is valid.
        if (restriction instanceof NonexistantKey) {
            // This means that the key does not exist (unless
            // someone actually used a NonexistantKey object as a value,
            // which should never happen).
            // We put together debugging information for this error.
            throw 'The restriction with ' + conjunction_debug_info(
                conjunction, direction, type) +
                'appears not to exist.';
        } else if (!is_object(restriction)) {
            // The restriction exists, it just isn't valid. We throw an error
            // saying what the restriction is.
            throw 'The restriction with ' + conjunction_debug_info(
                conjunction, direction, type) +
                'appears to be invalid; it is ' + JSON.stringify(restriction);
        }
        // We add the restriction as a restiction of the specified type.
        this.restrictions[type] = restriction;
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

// This function adds a main or sub restriction.
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
Kernel.prototype.add_main_or_sub_restriction = function (
    conjunction, direction) {
    // We create our ConjunctionType object.
    var conjunction_type = new ConjunctionType(conjunction);
    // We create a main or sub variable to store
    // the main or sub value of the clause.
    var main_or_sub;
    
    // We have a bunch of if statements.
    
    // Is the conjunction coordinating?
    if (conjunction_type.is('coordinating')) {
        // If so, the clause is main.
        main_or_sub = 'main';
    } else if (conjunction_type.is('subordinating')) {
        // The conjunction is subordinating.
        if (direction === 'left') {
            // The left clause is main.
            // (Here, it is the subordinating clause).
            main_or_sub = 'main';
        } else {
            // The right clause is subordinate, subordinated
            // by the conjunction passed in as an argument.
            main_or_sub = 'subordinate';
        }
    } else if (conjunction_type.is('subordinating conditional')) {
        // The conjunction is an if statement.
        // It seems wise to adopt the structure a if b for now,
        // so the right clause is the subortdinate apotasis.
        // todo: Should this be changed?
        if (direction === 'left') {
            // The left clause is the apotasis.
            main_or_sub = 'apotasis';
        } else {
            // The right clause is the protasis.
            main_or_sub = 'protasis';
        }
    } else if (conjunction_type.is('dummy main')) {
        // The conjunction is a dummy.
        if (direction === default_direction) {
            // The clause in the default direction exists (and is main).
            // But does it have an independent subjunctive?
            // We determine this by checking whether our mood restriction
            // (in latin) is indicative, or, as it would otherwise be,
            // subjunctive.
            // todo: This is teribly hacky, try to remove it.
            if (conjunction.k_left_mood_restriction.latin === 'indicative') {
                // Indicative implies no independent subjunctive.
                main_or_sub = 'main';
            } else {
                // Subjunctive implies an independent subjunctive.
                main_or_sub = 'independent subjunctive';
            }
        } else {
            // All the other clauses (currently, only one; the one
            // in the non-default direction) are nonexistant.
            main_or_sub = 'nonexistant';
        }
    }
    
    // We actually set the property.
    this.restrictions.main_or_sub = main_or_sub;
}