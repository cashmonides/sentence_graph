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

// This method displays the verb translations of a kernel, in a language.
Kernel.prototype.display_verb_options_in_language = function (language) {
    // Create the list of options and then join them.
    // todo: replace default_allowed with something level-dependent.
    var options = get_drop_down_options(
        language, default_allowed, [this.get_verb().lexeme], this);
    var json_options = option_list_to_json(
        options, global_test_important_options,
        overall_ordering_preference, language_sorts[language]);
    return JSON.stringify(json_options, null, 2);
}