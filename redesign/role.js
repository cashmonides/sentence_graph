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
