// This function displays a classification in a given language.
// (Its values, not its name.)
var display_classification = function (classification, language) {
    // We check whether the classification is an object and, if not,
    // whether it is a string or null.
    if (is_object(classification)) {
        // The classification is a true object: we find our language in it.
        var value = classification[language];
        if (typeof value === 'string' || value === null) {
            // The value is a string or null. We use it as it is.
            return value;
        } else if (value === undefined) {
            // The value is undefined. Who wants to see that?
            return null;
        } else {
            // Stringify.
            return JSON.stringify(value, null, 4);
        }
    } else if (typeof classification === 'string' || classification === null) {
        // The classification is a string or null. It is thus
        // language-independent, so we just return it.
        return classification;
    } else {
        // The classification is strange. It's a number or boolean or something.
        // Currently, this should never happen, so we throw an error.
        throw 'Weird classification: ' + JSON.stringify(classification);
    }
}

// This function displays the kernel in a given language.
// It is higher-order: first you pass the language,
// which gives you a function to which you can pass the kernel.
var display_kernel_in = function (language) {
    // We create a function that displays a restriction
    // in the given language.
    var display_classification_in_language = function (classification) {
        // Very simple: just display the restriction in the language.
        return display_classification(classification, language);
    }
    
    // This is the above-mentioned function that takes the kernel.
    return function (kernel) {
        // These are the values of the kernel.classifications dictionary.
        // This is a list not of the names/types of the classifications,
        // but rather the classifications themselves.
        var classifications = values(kernel.classifications);
        // We display each restriction, filter out the null restrictions,
        // and then join by ', ', surround by brackets, and precede
        // the result by 'K'.
        
        // We put the classifications in display form.
        var classifications_displayed = classifications.map(
            display_classification_in_language);
        
        // We remove null from our displayed classifications.
        var filtered_classifications = remove_null(classifications_displayed);
        
        // We join by ', ', surround by brackets, and precede
        // the result by 'K', as said above.
        return 'K[' + filtered_classifications.join(', ') + ']';
    }
}

// This function is higher-order: it takes a language
// and returns a function that partially translates
// a kernel into that language.
var partial_translate_kernel_into = function (language) {
    return function (kernel) {
        // Return a string describing each role, separated by ', '
        // and surrounded by brackets.
        return '[' + kernel.role_list.map(function (role) {
            // Describe each role.
            return role.describe_in_language(language);
        }).join(', ') + ']';
    }
}

// This function is higher-order: it takes a language
// and returns a function that translates
// a kernel into that language.
var translate_kernel_into = function (language) {
    return function (kernel) {
        // Return the translation of each role, separated by spaces.
        return kernel.role_list.map(function (role) {
            // Describe each role.
            return role.component.form[language];
        }).join(' ');
    }
}

// This method makes a JSON object with the verb translations
// of a kernel, in a language.
Kernel.prototype.get_verb_json_options = function (
    language, verb_lexeme_options) {
    // Get the verb.
    var verb = this.get_verb();
    // Create the list of options and then join them.
    // todo: replace default_allowed with something level-dependent.
    var options = get_drop_down_options(
        language, default_allowed, verb_lexeme_options, this,
        verb.get_property_in_language('regime', language));
    // Initialize the regime.
    var regime = verb.get_property_in_language('regime', language);
    // Find what to leave out.
    // todo: Come back to this area while removing defaults.
    var leave_out = filter_set_with_settings(
        null, default_leave_out_settings, properties_to_leave_out[language][regime]);
    // Do an error check.
    if (!is_object(leave_out)) {
        throw 'leave_out is not an object: it is ' + JSON.stringify(leave_out);
    }
    var json_options = option_list_to_json(
        options, drop_down_path,
        overall_ordering_preference, language_sorts[language], leave_out);
    return json_options;
}

// This method displays the verb translations of a kernel, in a language.
Kernel.prototype.display_verb_options_in_language = function (
    language, verb_lexeme_options) {
    var json_options = this.get_verb_json_options(
        language, verb_lexeme_options);
    return JSON.stringify(json_options, null, 2);
}

// This method makes a drop down for a verb in a language.
Kernel.prototype.get_verb_drop_down = function (
    language, verb_lexeme_options) {
    var json_options = this.get_verb_json_options(
        language, verb_lexeme_options);
    var verb_translation_and_path =
    this.get_verb_translation_and_path(language);
    return new DropDown('VERB', json_options, verb_translation_and_path);
}


// This method gets a verb's correct translation and path.
Kernel.prototype.get_verb_translation_and_path = function (language) {
    // Get the verb component.
    var verb = this.get_verb();
    // Get the translation of the verb in the language.
    var translation = verb.form[language];
    // Create an empty path (to be pushed to).
    var path = [];
    // Get the regime.
    var regime = verb.get_property_in_language('regime', language)
    // Get the options to leave out. For example, in an English conditional
    // we want to avoid time.
    var options_to_leave_out = properties_to_leave_out[language][regime];
    // Loop over the important options.
    var option;
    for (var i = 0; i < drop_down_path.length; i++) {
        option = drop_down_path[i];
        // Check that the option is not one of the options to leave out.
        // If it is, use continue to skip this iteration of the loop
        // and go to the next one.
        if (option in options_to_leave_out) {
            continue;
        }
        // For each option, if it is 'lexeme', push the verb's lexeme:
        // otherwise, push that property of the verb.
        // (lexeme is not stored as a property.)
        if (option === 'lexeme') {
            // Push the name of the lexeme.
            path.push(verb.lexeme.get_name());
        } else {
            // Get the property and push it.
            path.push(verb.get_property_in_language(option, language));
        }
    }
    // Push the translation to the path.
    path.push(translation);
    // Return the translation and path.
    return {
        'translation': translation,
        'path': path
    }
}

// This method gets all of a kernel's correct translation-and-path pairs.
Kernel.prototype.get_all_translations_and_paths = function (language) {
    // todo: Fix this when we go beyond verbs.
    return [this.get_verb_translation_and_path(language)];
}

// This method gets all drop downs for a kernel.
Kernel.prototype.get_all_drop_downs = function (language, lexeme_options) {
    // todo: Fix this when we go beyond verbs.
    return [this.get_verb_drop_down(language, lexeme_options.verb)];
}