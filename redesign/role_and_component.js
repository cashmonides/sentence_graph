// This file contains a Role object definition.
// A Role object represents not an actual word, but a position
// that can be filled with a component.
// This file also contains a Component object definition.
// A component object represents the properties of a word.

// This function defines a role object.
var Role = function (role_name) {
    // This property is the role's name: subject, object, etc.
    this.role_name = role_name;
    // This is the component corresponding to the role.
    this.component = new Component();
}

// Describe a role in a language.
Role.prototype.describe_in_language = function (language) {
    // Include the role name and the properties.
    return this.role_name + ' with properties \n' +
    this.component.describe_in_language(language) + '\n';
}

// This does nothing for now.
Role.prototype.choose_random_lexeme = function () {
    
}

// Forgetting about this for now.
// Choose a specific lexeme to fill a role.
// Role.prototype.choose_random_lexeme = function () {
    // Get the restrictions for a lexeme.
    // ???;
    // The lexemes are currently the keys of the testing_kernel
    // dictionary. This will also change when we move to verbs.
    // todo: Get lexemes in some other way when we add nouns.
    // var all_lexemes = Object.keys(testing_kernels);
    
    // Filter all lexemes so that they satisfy the restrictions.
    // Note: we currently have only verbs, so we don't filter
    // by part of speech.
    
    // todo: Filter by part of speech when we add nouns.
    // var lexemes = all_lexemes.filter(function (lexeme) {
        // ???;
    // });
    // Return a random choice from the lexemes.
    // return random_choice(lexemes);
// }

// This means that latin is our default setting.
var default_language = 'latin';

// This method adds random properties to the component in a role.

// Note: the random properties to be added are
// time, voice, mood, and transitivity.

// Another note:
// The operations of getting a property in the default language,
// setting it to something, then resetting it to the value previously
// gotten have no effect. We use this to our advantange to undo changes.

// Thus, our basic setup is:
// get everything
// while true
// set everything
// if it works, break and if not, revert

Role.prototype.add_random_properties = function () {
    // The properties we need to add are the keys
    // of the testing_allowed_library.
    var properties = Object.keys(testing_allowed_library);
    
    // i is just a looping variable.
    var i;
    
    // property is a temporary variable storing
    // the property currently being added.
    var property;
    
    // This variable stores the initial values.
    var original_values = {};
    
    // Loop over the properties.
    for (i = 0; i < properties.length; i++) {
        // Set property to the property under consideration.
        property = properties[i];
        // The original value for the property is its value
        // in the default language.
        original_values[property] = this.component.get_property_in_language(
            property, default_language);
    }
    
    // This is an infinite loop.
    while (true) {
        // Loop over the properties.
        for (i = 0; i < properties.length; i++) {
            // Set property to the property under consideration.
            property = properties[i];
            // Check whether the property is chosen.
            if (!this.component.chosen(property)) {
                // value is the randomly chosen value of the property.
                var value = random_choice(testing_allowed_library[property]);
                // Set the property to the value.
                this.component.set_property(property, value);
            }
        }
        // Check.
        if (this.component.check_all_rules()) {
            // Break.
            break;
        } else {
            // Revert.
            // Loop over the properties.
            for (i = 0; i < properties.length; i++) {
                // Set property to the property under consideration.
                property = properties[i];
                // Set the value for the property to what it was originally.
                this.component.set_property(
                    property, original_values[property]);
            }
        }
    }
}

// This defines a component. A component simply has properties.
var Component = function () {
    this.properties = {};
}

// This function finds whether a property has been chosen
// given the property's name.
Component.prototype.chosen = function (name) {
    // Is there a property corresponding to the name?
    if (name in this.properties) {
        // value is the value of the property.
        var value = this.properties[name];
        // Is the value of the property not null?
        if (value === null) {
            // If so, the property does not exist: return false.
            return value;
        } else if (typeof value === 'string') {
            // If the value of the property is a string, it does exist;
            // return true.
            return true;
        } else {
            // The property is an object. Check the default language's value.
            // If it is null, the default languge, at least, has no value,
            // so we return false. Otherwise every language without a value
            // can use the default language's value, so we can return true.
            return value[default_language] !== null;
        }
    } else {
        // Otherwise return false, since the property is unchosen.
        return false;
    }
}

// This function sets a property given the property's name
// and the value to set it to.

// Note: This method, in some sense, does two things.
// If a property completely does not exist, or is not a dictionary,
// it sets it to the value given.
// But if the property exists and is a dictionary, it only sets
// the default in the dictionary to the value given.
Component.prototype.set_property = function (name, set_to) {
    // Is there a property corresponding to the name?
    if (name in this.properties) {
        // value is the value of the property.
        var value = this.properties[name];
        // Is the value of the property not null?
        if (value === null || typeof value === 'string') {
            // The property is not a dictionary, so just reset it.
            this.properties[name] = set_to;
        } else {
            // Set the default language's value.
            value[default_language] = set_to;
        }
    } else {
        // Otherwise just set the property, since it is unchosen.
        this.properties[name] = set_to;
    }
}

// The function gets the values of the properties of a component.
Component.prototype.values = function () {
    // Define self to be this since we use this
    // within an anonymous function.
    var self = this;
    // Map the keys by a function.
    return Object.keys(this.properties).map(function (property) {
        // The function, for each property, returns its value
        // (in the default language).
        return self.get_property_in_language(
            property, default_language);
    });
}

// This function checks whether a component satisfies some property.
// It currently simply checks for the property in the component's
// properties.
// This function is not very efficient, but it hardly matters right now.
Component.prototype.check = function (string) {
    return this.values().indexOf(string) !== -1;
}

// This function tests whether a component satisifes a rule.
Component.prototype.check_rule = function (rule) {
    // We parse the rule and apply it to the component.
    return parse_rule(rule)(this);
}

// This function tests whether a component satisfies all rules.
Component.prototype.check_all_rules = function () {
    // We iterate over the rules.
    for (var i = 0; i < testing_rules.length; i++) {
        // We see if the component fails to satisfy a rule.
        if (!this.check_rule(testing_rules[i])) {
            // If so, it does not satisfy all rules.
            return false;
        }
    }
    // No rules were not satisfied, so the kernel satisfies all rules.
    return true;
}

// This function gets a property from a component in a language
// given the property's name and language's name.
// It, like the above function, uses a null default value.
Component.prototype.get_property_in_language = function (name, language) {
    // Is there no property corresponding to the name?
    if (!(name in this.properties)) {
        // If so, return the null default value.
        return null;
    }
    
    // value is the value of the property.
    var value = this.properties[name];
    
    // Is the value not an object?
    if (!is_object(value)) {
        // If so, return the value. (It is language-independent.)
        return value;
    }
    
    // The property should be language-dependent.
    // We check that the language given is supported,
    // that is, the language is a property of the value.
    if (!(language in value)) {
        // We throw an error.
        throw 'Error! ' + language + ' is not in ' +
        JSON.stringify(value) + '!';
    }
    
    // This is the value of the property in the language.
    var value_in_language = value[language];
    
    // Is the value in the language null?
    if (value_in_language === null) {
        // Default to the default language.
        return value[default_language];
    } else {
        // Return the non-null value.
        return value_in_language;
    }
}

// This function returns a description of a property
// (actually, just the property and its value in a particular language).
Component.prototype.describe_property = function (
    property, language) {
    // Just add together the property, a colon and space,
    // and the value of the property.
    return property + ': ' + this.get_property_in_language(
        property, language);
}

// This method describes the component.
Component.prototype.describe_in_language = function (language) {
    // properties is the list of properties sorted.
    var properties = Object.keys(this.properties).sort();
    // Since we use this inside a function, we need to define
    // self to be this and use self instead.
    var self = this;
    // Describe each property, add indents, and join by '\n'
    return properties.map(function (property) {
        return '    ' + self.describe_property(property, language);
    }).join('\n');
}

// The function displays a role list of a kernel.
var role_list_display = function (kernel) {
    // We take the role list of the kernel, get the character
    // representing each item, then join them by spaces, and surround
    // the result in brackets.
    return '[' + kernel.role_list.map(function (x) {
        // We take the first character of the role name, then uppercase it.
        return x.role_name[0].toUpperCase();
    }).join(' ') + ']';
}