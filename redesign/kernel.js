// This file contains a Kernel object definition.
// A Kernel object represents a clause apart from its conjunction.

// This function constructs a kernel from a conjunction
// and a choice of left or right.
// Note that the conjunction here is a string which will be
// converted into a JSON object.
var kernel_constructor = function (conjunction, direction) {
    // We convert the conjunction into JSON.
    conjunction = conjunction_JSON_from_name(conjunction);
    // We access a property of the conjunction telling us
    // the appropriate clause type.
    // We do so via concatinating strings to make k_left_clause_type
    // or k_right_clause_type, and then look at that
    // property of the conjunction.
    var clause_type = conjunction['k_' + direction + '_clause_type'];
    
    
    
    // We check that the clause type is not undefined
    // and throw an error if it is.
    if (clause_type === undefined) {
        // The clause type is undefined! We throw an error
        // with the clause type, the direction, and the conjunction.
        throw 'clause_type is undefined, left_or_right = ' + direction +
        ', conjunction = ' + JSON.stringify(conjunction); 
    }
    // We construct a random role list.
    // For now this is just a list containing a verb role.
    
    // todo: when we are done with the minimum viable product,
    // we should make this more complicated.
    var role_list = [new Role('verb')];
    // We construct a Kernel object from our clause type and role list.
    var kernel = new Kernel(role_list, clause_type);
    // In the next few lines we just add restrictions.
    
    // We add any lexical restriction that may exist.
    kernel.add_lexical_restriction(conjunction, direction);
    // We add the time restriction (it will be a dictionary
    // where the keys are languages, and should exist).
    kernel.add_time_restriction(conjunction, direction);
    // We add the mood restriction (as above, it will be a dictionary
    // where the keys are languages, and should exist).
    kernel.add_mood_restriction(conjunction, direction);
    // We add the main or sub retriction. Any kernel is main,
    // independent subjunctive, subordinate,
    // or nonexistant; we call this its main or sub.
    kernel.add_main_or_sub_restriction(conjunction, direction);
    
    // We return our just-constructed kernel.
    return kernel;
}

// This is the initial definition of the Kernel object.
var Kernel = function (role_list, clause_type) {
    // list of roles (objects)
    this.role_list = role_list;
    // main, iq, is, cond_prot, cond_apod. purpose, ic
    this.clause_type = clause_type;
    // active, passive
    this.voice = null;
    // past, present, future - agnostic as to subtleties of tense and aspect
    this.time = null;
    // transitive, intransitive, copula
    this.verb_type = null;
    // Restrictions contains verious types of restriction.
    // lexical: e.g., mental, command, fear, etc.
    // time: i.e., present, past, and future.
    // todo: add more types of time
    // mood: i.e., indicative and subjunctive
    // Note that time and mood are dictionaries
    // with one entry for each language.
    this.restrictions = {};
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

// This method does something to each role in the role list.
// It may be obsolete or at least in need of replacement.
Kernel.prototype.visit = function (visitor) {
    // We iterate over the role list.
    for (var i = 0; i < this.role_list.length; i++) {
        // We pass our input function both the kernel
        // and the current role.
        visitor(this, this.role_list[i]);
    }
};

// This function gets the verb component from the kernel.
Kernel.prototype.get_verb = function () {
    // We filter the role list to include only verbs,
    // then take the first one (but there should be only one).
    // This gives us the verb role.
    var verb_role = this.role_list.filter(function (x) {
        // We only keep the roles which are verbs.
        return x.role_name === 'verb';
    })[0];
    // We return the component corresponding to the verb role.
    return verb_role.component;
}

// This function adds determined properties from the kernel to the verb.
Kernel.prototype.add_determined_properties = function () {
    // We find the verb component.
    var verb_component = this.get_verb();
    // We iterate over our restrictions.
    for (var i in this.restrictions) {
        // We add each one to the verb.
        verb_component.set_property(i, this.restrictions[i])
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
Kernel.prototype.choose_random_lexemes = function (visitor) {
    // We iterate over the role list.
    for (var i = 0; i < this.role_list.length; i++) {
        // We determine a lexeme for the current role.
        this.role_list[i].choose_random_lexeme();
    }
};

// This function displays a restriction in a given language.
var display_restriction = function (restriction, language) {
    // We check whether the restriction is an object and, if not,
    // whether it is a string or null.
    if (is_object(restriction)) {
        // The restriction is a true object: we find our language in it.
        return restriction[language];
    } else if (typeof restriction === 'string' || restriction === null) {
        // The restriction is a string or null. It is thus
        // language-independent, so we just return it.
        return restriction;
    } else {
        // The restriction is strange. It's a number or boolean or something.
        // Currently, this should never happen, so we throw an error.
        throw 'Weird restriction: ' + JSON.stringify(restriction);
    }
}

// This function displays the kernel in a given language.
// It is higher-order: first you pass the language,
// which gives you a function to which you can pass the kernel.
var display_kernel_in = function (language) {
    // We create a function that displays a restriction
    // in the given language.
    var display_restriction_in_language = function (restriction) {
        // Very simple: just display the restriction in the language.
        return display_restriction(restriction, language);
    }
    
    // This is the above-mentioned function that takes the kernel.
    return function (kernel) {
        // These are the values of the kernel.restrictions dictionary.
        // This is a list not of the names/types of the restrictions,
        // but rather the restrictions themselves.
        var restrictions = values(kernel.restrictions);
        // We display each restriction, filter out the null restrictions,
        // and then join by ', ', surround by brackets, and precede
        // the result by 'K'.
        
        // We puts the restrictions in display form.
        var restrictions_displayed = restrictions.map(
            display_restriction_in_language);
        
        // We remove null from our displayed restrictions.
        var filtered_restrictions = remove_null(restrictions_displayed);
        
        // We join by ', ', surround by brackets, and precede
        // the result by 'K', as said above.
        return 'K[' + filtered_restrictions.join(', ') + ']';
    }
}

// This function is higher-order: it takes a language
// and returns a function that translates a kernel into that language.
var translate_kernel_into = function (language) {
    return function (kernel) {
        // Return a string describing each role, separated by ', '
        // and surrounded by brackets.
        return '[' + kernel.role_list.map(function (role) {
            // Describe each role.
            return role.describe_in_language(language);
        }).join(', ') + ']';
    }
}