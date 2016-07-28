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
            return false;
        } else if (typeof value === 'string') {
            // If the value of the property is a string, it does exist;
            // return true.
            return true;
        } else {
            // The property is an object. Check the default language's value.
            // If it is null, the default languge, at least, has no value,
            // so we return false. Otherwise every language without a value
            // can use the default language's value, so we can return true.
            return value[default_language.toLowerCase()] !== null;
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
            value[default_language.toLowerCase()] = set_to;
        }
    } else {
        // Otherwise just set the property, since it is unchosen.
        this.properties[name] = set_to;
    }
}

// This function sets a property given the property's name,
// the value to set it to, and a language to set it in.

// Note: This method only works if the property is a dictionary.
Component.prototype.set_property_in_language = function (
    name, set_to, language) {
    // Is there a property corresponding to the name?
    if (name in this.properties) {
        // value is the value of the property.
        var value = this.properties[name];
        // Is the value of the property not null?
        if (value === null || typeof value === 'string') {
            // This should not happen.
            throw value + ', for ' + name + ' should be a dictionary, '
            'since we are trying to set it in a language-specific way.';
        } else {
            // Set the input language's value.
            // We lowercase the language for convenience.
            value[language.toLowerCase()] = set_to;
        }
    } else {
        // We should not be hitting this.
        throw 'Property ' + name + ' should exist.';
    }
}

// This function initializes a language-dependent property.
Component.prototype.initialize_language_dependent_property = 
function (property_name) {
    // Initialize a dictionary of values for the property.
    this.properties[property_name] = {};
    // Loop over the languages.
    for (var i = 0; i < languages.length; i++) {
        // Add a starting null value for each language.
        this.properties[property_name][languages[i].toLowerCase()] = null;
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
        // (in the default language, converted to lowercase).
        return self.get_property_default(property)
    });
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
    // If it is not we return null (we don't want to use default behavior).
    if (!(language in value)) {
        return null;
    }
    
    // This is the value of the property in the language.
    var value_in_language = value[language];
    
    // Is the value in the language null?
    if (value_in_language === null) {
        // Default to the default language.
        return value[default_language.toLowerCase()];
    } else {
        // Return the non-null value.
        return value_in_language;
    }
}

// This function gets the default value for a property from a component
// given the property's name.
// It, like the above function, uses a null default value.
Component.prototype.get_property_default = function (name) {
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
    // We return the value for the default language.
    return value[default_language.toLowerCase()];
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