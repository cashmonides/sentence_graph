// This file contains a Kernel object definition.
// A Kernel object represents a clause apart from its conjunction.

// This function constructs a kernel from a conjunction
// and a choice of left or right.
// Note that the conjunction here is simply a conjunction object.
var kernel_constructor = function (conjunction, direction) {
    // We get the appropriate construction from the conjunction.
    var construction = conjunction.get_construction(direction);
    
    
    
    // We check that the construction is not undefined
    // and throw an error if it is.
    if (construction === undefined) {
        // The construction is undefined! We throw an error
        // with the construction, the direction, and the conjunction.
        throw 'construction is undefined, left_or_right = ' + direction +
        ', conjunction = ' + JSON.stringify(conjunction); 
    }
    
    // main or sub is a variable that stores whether
    // our kernel is main or subordinate.
    var main_or_sub;
    // We check whether our direction is the default direction
    // or our conjunction's type property (it has a type property,
    // not a clause_type property) is coordinating.
    if (direction === default_direction 
    || conjunction.get_type() === 'coordinating') {
        // If our direction is the default, we are in the main clause.
        main_or_sub = 'main';
    } else {
        // Otherwise we are in the subordinate clause.
        main_or_sub = 'subordinate';
    }
    
    // We construct a random role list.
    // For now this is just a list containing a verb role.
    
    // todo: when we are done with the minimum viable product,
    // we should make this more complicated.
    var role_list = [new Role('verb')];
    // We construct a Kernel object from our construction and role list.
    var kernel = new Kernel(role_list, construction, main_or_sub,
    conjunction, direction);
    // In the next few lines we just add restrictions.
    
    // We add any lexical restriction that may exist.
    kernel.add_lexical_restriction(conjunction, direction);
    // We add the time restriction (it will be a dictionary
    // where the keys are languages, and should exist).
    kernel.add_time_restriction(conjunction, direction);
    // We add the mood restriction (as above, it will be a dictionary
    // where the keys are languages, and should exist).
    kernel.add_mood_restriction(conjunction, direction);
    // We add the clause type retriction. Any kernel is main,
    // independent subjunctive, subordinate,
    // or nonexistant (plus some possibilities for conditionals);
    // we call this its clause type.
    kernel.add_clause_type_restriction(conjunction, direction);
    // We give the kernel its tense overrides (and translation formulae).
    kernel.add_tense_overrides_and_tf(conjunction, direction);
    // We give the kernel its regime.
    kernel.add_regime(conjunction, direction);
    // We return our just-constructed kernel.
    return kernel;
}

// This is the initial definition of the Kernel object.
var Kernel = function (
    role_list, construction, main_or_sub, conjunction, direction) {
    // list of roles (objects)
    this.role_list = role_list;
    // Classification contains verious types of classification.
    // lexical: e.g., mental, command, fear, etc.
    // time: i.e., present, past, and future.
    // todo: add more types of time
    // mood: i.e., indicative and subjunctive
    // Note that time and mood are dictionaries
    // with one entry for each language.
    this.classifications = {};
    // main, iq, is, cond_prot, cond_apod. purpose, ic, etc.
    this.classifications.construction = construction;
    // main, subordinate
    this.classifications.main_or_sub = main_or_sub;
    // conjunction and direction
    // currently stored directly.
    this.conjunction = conjunction;
    this.direction = direction;
}

// Helper method for getting the conjunction in case we decide
// to store it indirectly in the future.
Kernel.prototype.get_conjunction = function () {
    return this.conjunction;
}

// Helper method for getting the direction in case we decide
// to store it indirectly in the future.
Kernel.prototype.get_direction = function () {
    return this.direction;
}

// This method gets the role at a given position in the role list.
// This might not actually be used and might be worth deleting.
Kernel.prototype.get_role = function (position) {
    return this.role_list[position];
};

// This method gets the number of roles in a kernel.
Kernel.prototype.get_size = function () {
    return this.role_list.length;
};

// This method chooses a random sequence for the kernel.
Kernel.prototype.adopt_random_sequence = function () {
    // Just pick a random sequence (from those in
    // the current module) and adopt it.
    // todo: change if additional sequences are found.
    this.adopt_sequence(random_choice(get_current_module().sequence));
}

// This function gets the verb component from the kernel.
Kernel.prototype.get_verb = function () {
    // We get the verb role and return its component.
    return this.get_verb_role().component;
}

// This function gets the verb role from the kernel.
Kernel.prototype.get_verb_role = function () {
    // We filter the role list to include only verbs,
    // then take the first one (but there should be only one).
    // This gives us the verb role.
    var verb_role = this.role_list.filter(function (x) {
        // We only keep the roles which are verbs.
        return x.role_name === 'verb';
    })[0];
    // We return the verb role.
    return verb_role;
}

// This function adds determined properties from the kernel to the verb.
Kernel.prototype.add_determined_properties = function () {
    // We find the verb component.
    var verb_component = this.get_verb();
    // We iterate over our classifications.
    for (var i in this.classifications) {
        // We add each one to the verb.
        verb_component.set_property(i, this.classifications[i]);
    }
}

// This function adds random properties to the component in each role.
Kernel.prototype.add_random_properties = function () {
    // We iterate over the role_list.
    for (var i = 0; i < this.role_list.length; i++) {
        // We add random properties to each role.
        this.role_list[i].add_random_properties();
    }
}

// This function makes the kernel adopt a sequence.
Kernel.prototype.adopt_sequence = function (sequence) {
    // Set the sequence of the verb component to the sequence given.
    this.get_verb().set_property('sequence', sequence);
}

// This function determines a lexeme for each role in a kernel.
Kernel.prototype.choose_random_lexemes = function (chosen_lexemes) {
    // We initialize some lexemes chosen in this kernel.
    this.chosen_lexemes = {};
    // We iterate over the role list.
    for (var i = 0; i < this.role_list.length; i++) {
        // We determine a lexeme for the current role.
        // Note that we do this by calling a method on its component.
        var success = this.role_list[i].component.choose_random_lexeme(
            chosen_lexemes, this.chosen_lexemes);
        // We throw an error if we fail.
        if (!success) {
            // We check whether we want to throw an error
            // or take some other type of action.
            if (LEXEME_ERROR_CATCHING_MODE === 'throw') {
                // We failed so we throw an error.
                throw 'Failed to choose lexeme for ' +
                JSON.stringify(this.role_list[i].component);
            } else {
                // We just return false.
                return false;
            }
        }
    }
    // We add the lexemes chosen in the kernel to our master dictionary
    // of chosen lexemes, one at a time.
    for (var i in this.chosen_lexemes) {
        // Add i.
        chosen_lexemes[i] = true;
    }
    // Return true since all went well.
    return true;
};

// This method lets us inflect all the components of a kernel
// in a given language.
Kernel.prototype.inflect_all_components_in = function (language) {
    // We iterate over the role list.
    for (var i = 0; i < this.role_list.length; i++) {
        // We inflect the component at position i.
        this.role_list[i].component.inflect(language);
    }
}