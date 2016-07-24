// This file allows for the creation of PropertySchema objects.
// todo: come up with new name.
// A PropertySchema object allows for determination
// of how to access properties.
// i.e., how should present be accessed?

// Create a property schema.
var PropertySchema = function (json_object) {
    // The access dict is the dictionary from keys like present
    // to how to access them like "component: tense"
    this.access_dict = {};
    // Use a stack to traverse the data structure.
    
    // If we have just a string, then we are in the base case.
    // In this case, store both the value and any comments on it.
    // In imperfect: not implemented, not implemented is a comment.
    if (typeof json_object === 'string') {
        // What we do here is unclear.
        // todo: figure it out.
        this.access_dict[json_object.split(/: /)[0]] =
        new PropertySchemaPath([], );
    } else {
        var list_of_keys;
        if (top_level) {
            list_of_keys = json_object.properties;
        } else {
            list_of_keys = Object.keys(json_object);
        }
        for (var i = 0; i < list_of_keys.length; i++) {
            var sub_schema = new PropertySchema(json_object[list_of_keys[i]]);
            for (var j in sub_schema.access_dict) {
                if (j in this.access_dict) {
                    this.access_dict[j] = 'ambiguous';
                } else {
                    this.access_dict[j] = sub_schema.access_dict[j];
                }
            }
        }
    }
    // If we are at the top level...
    if (top_level) {
        // Set the language.
        this.language = json_object.language;
        // And do some setup procedures.
        this.setup();
    }
}

// A property schema path is a simple way to maintain a path to a
// value in a property schema.
// The key reason we use it is that it stores itself in a reversed list form,
// but has an initialize method that can be called on it
// to get its string and list forms.
var PropertySchemaPath = function () {
    
}

PropertySchema.prototype.get_access_for = function (string) {
   if (!(string in this.access_dict)) {
        throw 'Could not find ' + string + '!';
    } else if (this.access_dict[string] === 'ambiguous') {
        throw string + ' is ambiguous.';
    } else {
        return this.access_dict[string];
    }
}

PropertySchema.prototype.access = function (property_schema_path, lexeme) {
    // It seems weird to reset the lexeme.
    var obj = lexeme;
    for (var i = 0; i < property_schema_path.length; i++) {
        if (!(real_type_of(obj) === 'object' || 'inflection_get' in obj)) {
            throw 'Issue getting ' + property_schema_path.join(': ') +
            ', on value ' + property_schema_path[i - 1];
        }
        obj = obj.inflection_get(property_schema_path[i]);
    }
    var final_val;
    if (typeof obj === 'string') {
        final_val = obj;
    } else if (!(real_type_of(obj) === 'object' || 'translate_into' in obj)) {
        final_val = obj.translate_into(this.language);
    }
    // todo: Do a check.
    return final_val;
}