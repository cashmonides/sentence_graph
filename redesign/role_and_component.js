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

// This method adds random properties to the component in a role.
Role.prototype.add_random_properties = function () {
    throw 'This function is broken!';
    for (var i in testing_allowed_library) {
        if (this.component.get_property(i) === null) {
            this.component.set_property(i, random_choice(
                testing_allowed_library[i]));
        }
    }
}

// This defines a component. A component simply has properties.
var Component = function () {
    this.properties = {};
}

// This function adds a property to a component given the property's
// name and value.
Component.prototype.add_property = function (name, value) {
    this.properties[name] = value;
}

// This function gets a property from a component
// given the property's name. It uses a null default value.
Component.prototype.get_property = function (name) {
    if (name in this.properties) {
        return this.properties[name];
    } else {
        return null;
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