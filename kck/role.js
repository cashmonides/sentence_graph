// This file contains a Role object definition.
// A Role object represents not an actual word, but a position
// that can be filled with a component.

// This function defines a role object.
var Role = function (role_name) {
    // This property is the role's name: subject, object, etc.
    this.role_name = role_name;
    // This is the component corresponding to the role.
    this.component = new Component(role_name);
}

// Describe a role in a language.
Role.prototype.describe_in_language = function (language) {
    // Include the role name and the properties.
    return this.role_name + ' with properties \n' +
    this.component.describe_in_language(language) + '\n';
}

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

Role.prototype.add_random_properties = function (kck_level) {
    // The properties we need to add are the random component properties.
    var properties = random_component_properties;
    
    // Get the module.
    var module = get_current_module(kck_level);
    
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
        // in the default language (which we first must
        // convert to lowercase.)
        original_values[property] = this.component.get_property_in_language(
            property, default_language.toLowerCase());
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
                var value = random_choice(module[property]);
            } else if (this.component.get_property_default(property).slice(
                0, 4) === 'not ') {
                // So it starts with not.
                // The illegal value is easy to determine.
                var illegal = this.component.get_property_default(
                    property).slice(4);
                // value is the randomly chosen value of the property,
                // chosen not to be the illegal value.
                var value = random_choice(
                    module[property].filter(function (x) {
                        return x !== illegal;
                    })
                );
            } else {
                // We neither set the property nor perform a sanity check.
                // We just continue.
                continue;
            }
            // Set the property to the value.
            this.component.set_property(property, value);
        }
        // Tell the component to do what needs to be done
        // after determining random properties (but still in the loop).
        // The return value indicates whether the operation was successful.
        var after_failure = this.component.after_random_properties(kck_level);
        var failure = after_failure || this.component.rule_failed();
        // Check.
        if (!failure) {
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
            // I don't think tense needs to be cleared.
            // I might be wrong.
        }
    }
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
