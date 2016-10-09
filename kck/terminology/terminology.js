// Here type could be something like lexeme, regime, time, etc.
// lexeme and regime are not types of terminology.
// (regime is not a type because it's backstage.)
// Everything else is.
var is_type_of_terminology = function (type) {
    return type !== 'lexeme' && type !== 'regime';
}

// This function takes a condition like regime.relative and a feature dictionary
// and returns whether the feature dictionary satisfies the condition
// (has the key-value pair in the condition).
var feature_dictionary_satisfies = function (feature_dictionary, condition) {
    // In this case we are dealing with a terminology level, not a condition.
    if (condition.indexOf('.') === -1) {
        return false;
    }
    var parts = condition.split('.');
    // For example: regime.relative.active
    // what would something like this, with more than one period, mean?
    if (parts.length !== 2) {
        throw 'Strange condition: ' + condition;
    }
    // Here we use the example regime.relative
    // Check that the actual value for the key (for example, regime)
    // is the value given in the condition (for example, relative)
    // New feature: allow one of several values in the second part,
    // so regime.relative|indicative applies to either of those regimes.
    return parts[1].indexOf(feature_dictionary[parts[0]]) !== -1;
}

// This function takes a feature dictionary,
// a piece of terminology, and a terminology display level
// and returns the appropriate form
// for the piece of terminology given.
// A feature dictionary will have features such as regime, time, tense, etc.
// tags: @transform, @terminology, @tagged
var transform_terminology = function (feature_dictionary, terminology, level) {
    // We let form_of_terminology start out as a dictionary
    // but we take smaller and smaller parts of it until
    // we get a single string.
    // For example: {'regime.relative': {'basic': 'present'}}
    // then {'basic': 'present'}, then 'present'.
    var form_of_terminology = terminology_display_dictionary[terminology];
    // If there is no entry, just return the terminology.
    // This catches cases like 'active'.
    if (form_of_terminology === undefined) {
        return terminology;
    }
    while (typeof form_of_terminology !== 'string') {
        var found_key = false;
        // Check every key and see if we can use the corresponding value.
        for (var i in form_of_terminology) {
            if (i === level || feature_dictionary_satisfies(
                feature_dictionary, i)) {
                form_of_terminology = form_of_terminology[i];
                found_key = true;
                // Exit the inner loop but not the outer loop.
                break;
            }
        }
        if (!found_key) {
            if ('default' in form_of_terminology) {
                form_of_terminology = form_of_terminology['default'];
            } else {
                throw 'Cannot find appropiate entry in ' +
                JSON.stringify(form_of_terminology) + ' for ' +
                JSON.stringify(feature_dictionary) + ' at level ' + level;
            }
        }
    }
    return form_of_terminology;
}

// This function takes a kck level and returns a function that
// takes a drop down entry and transforms all the terminology in it
// (actually, returns a new version with the terminoloy transformed).
// tags: @transform, @terminology, @tagged
var get_terminology_transformer = function (kck_level) {
    // Get the appropriate terminology display level (a string).
    var terminology_display_level = get_current_module(kck_level).
    terminology_display_dictionary;
    // We can't do this since 'basic' and 'advanced' are not
    // the top-level keys (nor should they be).
    /*
    // Get the terminology display dictionary (and give it a different
    // name than the global terminology display dictionary,
    // to avoid confusion).
    var terminology_display_dictionary_used =
    terminology_display_dictionary[terminology_display_level];
    */
    // Return the terminology-transforming function.
    return function (drop_down_entry) {
        var new_drop_down_entry = {};
        for (var i in drop_down_entry) {
            // Avoid transforming the regime as if it were terminology.
            if (is_type_of_terminology(i)) {
                // Get the value (which is the piece of terminology
                // we need to transform).
                // We need to be transforming 'active', not 'voice'
                var value = drop_down_entry[i];
                new_drop_down_entry[i] = transform_terminology(
                    drop_down_entry, value, terminology_display_level);
            } else {
                new_drop_down_entry[i] = drop_down_entry[i];
            }
        }
        return new_drop_down_entry;
    }
}