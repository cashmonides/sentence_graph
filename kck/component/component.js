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

// This function checks whether a component satisfies some property.
// It currently simply checks for the property in the component's
// properties.
// This function is not very efficient, but it hardly matters right now.
Component.prototype.check = function (string) {
    if (string.indexOf('.') !== -1) {
        return this.check_string_with_period(default_language, string);
    }
    return this.values().indexOf(string) !== -1;
}

// Check a string with a period.
Component.prototype.check_string_with_period = function (language, string) {
    // Divide by .
    var parts = string.split('.');
    // Check that there are two parts.
    if (parts.length !== 2) {
        throw 'Not two parts: ' + string;
    }
    // Name each part.
    var prop = parts[0];
    var value = parts[1];
    // Return the check.
    return this.get_property_in_language(prop, language) === value;
}

// This function tests whether a component satisifes a rule.
Component.prototype.check_rule = function (rule) {
    // We parse the rule and apply it to the component.
    return parse_rule(rule)(this);
}

// This function tests whether a component fails some rule.
Component.prototype.rule_failed = function () {
    // We iterate over the rules.
    for (var i = 0; i < testing_rules.length; i++) {
        // We see if the component fails to satisfy a rule.
        if (!this.check_rule(testing_rules[i])) {
            // If so, it does not satisfy all rules.
            return testing_rules[i];
        }
    }
    // No rules were not satisfied, so the kernel satisfies all rules.
    return false;
}


// This function returns a description of a property
// (actually, just the property and its value in a particular language).
Component.prototype.describe_property = function (
    property, language) {
    // Get the value of the property.
    var value = this.get_property_in_language(property, language);
    if (value === null) {
        // If the value is null, return null.
        return null;
    } else if (typeof value === 'string') {
        // If the value is a string, just add together the property,
        // a colon and space, and the value of the property.
        return property + ': ' + value;
    } else {
        // Otherwise, stringify.
        return property + ': ' + JSON.stringify(value, null, 4);
    }
}

// This method describes the component.
Component.prototype.describe_in_language = function (language) {
    // properties is the list of properties sorted.
    var properties = Object.keys(this.properties).sort();
    // Since we use this inside a function, we need to define
    // self to be this and use self instead.
    var self = this;
    // Describe each property (and the lexeme), add indents,
    // remove descriptions that shouldn't have been included,
    // and join by '\n'.
    return '    lexeme: ' + this.lexeme.get_name() + '\n' +
    remove_null(properties.map(function (property) {
        // Get the description.
        var description = self.describe_property(property, language);
        // If the description is null, return null.
        if (description === null) {
            return null;
        }
        // Add four spaces to the start of every line.
        return description.split('\n').map(function (x) {
            return '    ' + x ;
        }).join('\n');
    })).join('\n');
}

// This function allows a component to extract a single value
// corresponding to the component from a dictionary.
Component.prototype.get_value_from_dict = function (dict) {
    // If the 'dictionary' is just a string, return it.
    if (typeof dict === 'string') {
        return dict;
    } else {
        // Otherwise check each key and, if a key matches,
        // look in the relevant value.
        for (var i in dict) {
            if (this.check(i)) {
                return this.get_value_from_dict(dict[i]);
            }
        }
        // If we're here, no key matched, so throw an error.
        throw 'No key matched in ' + JSON.stringify(dict);
    }
}

// This does what needs to be do after determining the random properties
// (but still in the loop). Currently that is just determining tense.
Component.prototype.after_random_properties = function (kck_level) {
    if (this.get_part_of_speech() === 'verb') {
        try {
            // Determine the tense and indicate that we did not fail.
            this.determine_tense(kck_level);
            return false;
        } catch (e) {
            // If there is an error, check if it contains the phrase
            // 'tense error:'. If so, return error e.
            // Otherwise, we want to hear
            // about this error, so rethrow the error.
            if (typeof e === 'string' && e.indexOf('tense error:') !== -1) {
                return e;
            } else {
                throw e;
            }
        }
    } else {
        // For types of word other than verb
        // I can't think of anything needing to be done
        // after random properties, so we just return false.
        return false;
    }
}