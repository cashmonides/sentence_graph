// This file is intended to interpret instructions for inflection.
// Currently it is being designed only to interpret the
// inflect_latin_refactor_file. It contains an Inflector class
// created from a JSON dictionary like the one
// in inflect_latin_refactor.js and which can inflect latin lexemes.

// This function creates an Inflector object as described above.
var Inflector = function (json_dict) {
    // Create an info property to store miscellaneous information.
    this.info = {};
    // First thing to do: check the keys of the json object.
    this.check_keys(json_dict);
    // Next: create the property schema.
    // todo: change the annoying term PropertySchema.
    this.property_schema = new PropertySchema(json_dict);
}

// This method on an inflector inflects a lexeme.
// This might be clear, but the inflector will generally be able to inflect
// only one part of speech in one language, such as latin verbs.
// Beyond that, it will break.
Inflector.prototype.inflect = function (lexeme) {
    // todo: Fill this in.
}

// This method checks a condition on an object.
// It is a method of the Inflector class rather than
// any specific inflector because it uses no information
// from the inflector in question.
Inflector.check = function () {
    
}

// Keys we require, together with what the type of the value should be.
Inflector.always_required_keys = {
    // A description of what the object is.
    'description': 'string',
    // The part of speech being inflected.
    'part of speech': 'string',
    // The language being used.
    'language': 'string',
    // The properties of the lexeme that we should access.
    // Also keys of the json object.
    'properties': 'array',
    // The parts needed to make the form.
    // Also keys of the json object.
    'parts': 'array'
}
// We also have some optional keys.
Inflector.optional_keys = {
    // The synonyms are a list of things that include multiple possibilities.
    // Each has a name (the key) and a value (what it represents), so they
    // are stored as an object.
    'synonyms': 'object'
}

// This simply checks the keys of the json object.
// It is a method on instances since we want to use it
// to set properties on the inflector.
Inflector.prototype.check_keys = function (json_object) {
    // We create a looping variable.
    var i;
    // We loop over the always-required keys.
    for (i in Inflector.always_required_keys) {
        // We check that the type of the value for each is
        // the same as what it should be. If one of them is not there,
        // we will see a type mismatch involving undefined.
        if (real_type_of(json_object[i]) !==
        Inflector.always_required_keys[i]) {
            throw 'Wrong type for ' + i + '! (' + real_type_of(json_object[i])
            + ' vs. ' + Inflector.always_required_keys[i] + ')';
        }
        // We add the bit of required information to our info property
        // so we can get it if we need it in the future.
        this.info[i] = Inflector.always_required_keys[i];
    }
    // We loop over the optional keys.
    for (i in Inflector.optional_keys) {
        // We check that the type of the value for each is
        // the same as what it should be. If one of them is not there,
        // however, that is also acceptible.
        if (i in json_object && real_type_of(json_object[i])
        !== Inflector.optional_keys[i]) {
            throw 'Wrong type for ' + i + '! (' + real_type_of(json_object[i])
            + ' vs. ' + Inflector.optional_keys[i] + ')';
        }
        // We add the bit of optional information to our info property
        // so we can get it if we need it in the future.
        this.info[i] = Inflector.optional_keys[i];
    }
    // We have other required keys.
    var other_required_keys = set_disjoint_union(
        set_from(json_object.properties), set_from(json_object.parts),
        'There should be nothing in common between the properties ' +
        'and the parts!'
    );
    // We check that we have all of the other required keys.
    for (i in other_required_keys) {
        if (!(i in json_object)) {
            throw 'Key ' + i + ' not found!';
        }
    }
    // We check that all our keys are accounted for.
    for (i in json_object) {
        // We check whether the key is somewhere.
        if (!(i in Inflector.always_required_keys
        || i in other_required_keys || i in Inflector.optional_keys)) {
            // If not, we throw an error.
            throw 'Strange key ' + i + '!';
        }
    }
}