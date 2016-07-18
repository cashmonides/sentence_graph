// This file contains a Component object definition.
// A Component object represents the properties of a word.

// This defines a component. A component simply has properties.
// It also has a lexeme and form that are added far downstream,
// and a role name that is simply the name of its corresponding role.
var Component = function (role_name) {
    this.properties = {};
    // Set the role name.
    this.role_name = role_name;
    // Initialize the lexeme and form even though we won't need them
    // for a while.
    this.lexeme = null;
    // Note that the form is a dictionary because it will need
    // one property for each language.
    this.form = {};
}

// This function finds whether a property has been chosen
// given the property's name.
// Note: a null propery has not been chosen.
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

// This function gets a language-independent property from a component.
// It uses a null default value.
Component.prototype.get_language_independent_property = function (name) {
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
    
    // The property should have been language-independent.
    // But it seems to be language-dependent. We throw an error.
    throw 'Error! ' + JSON.stringify(value) + ' for property ' + name +
    ' is language-dependent!';
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
    // Describe each property (and the lexeme), add indents, and join by '\n'.
    return '    lexeme: ' + this.lexeme.name + '\n' +
    properties.map(function (property) {
        return '    ' + self.describe_property(property, language);
    }).join('\n');
}
