// These functions assist in displaying sentences.

// This function displays the template of a sentence given
// a display for its conjunction and a function to log a kernel
// (and an optional separator, defaulting to ' ').
KCKSentence.prototype.template_display = function (
    conjunction_display, kernel_log, separator) {
    // The separator defaults to ' '.
    if (separator === undefined) {
        separator = ' ';
    }
    // If kernel_log is undefined, we make it just return 'K'.
    // 'K' is thus our default.
    if (kernel_log === undefined) {
        // We set kernel_log to a function that just returns 'K',
        // as said above.
        kernel_log = function () {
            return 'K';
        }
    }
    // We check whether the sentence is just a single clause,
    // that is, the other was removed.
    if (!this.sentence[non_default_direction]) {
        // The sentence is just a single clause so we return our kernel_log
        // ('K' by default).
        return kernel_log(this.sentence[default_direction]);
    } else {
        // We assume that the sentence only has a single conjunction.
        
        // We display both kernels and the conjunction
        // and join the results by spaces.
        
        // todo: make this more sophisticated.
        return [kernel_log(this.sentence.left), conjunction_display,
        kernel_log(this.sentence.right)].join(separator);
    }
}

// This function displays the conjunction of a sentence.
KCKSentence.prototype.conjunction_display = function () {
    return title(this.get_conjunction_as_string());
}

// This function displays the conjunction of a sentence
// in a given language.
KCKSentence.prototype.conjunction_translation_display = function (language) {
    return this.get_conjunction().translate_into(language);
}

// This function displays everything we want to know about a conjunction:
// both its detailed display and its translation.
KCKSentence.prototype.conjunction_full_display = function (language) {
    // First the translation, then the detailed display.
    return this.conjunction_translation_display(language) + '\n' +
    this.get_conjunction().detailed_display(language);
}

// This function displays the sentence structure
// and restrictions in each language.
KCKSentence.prototype.display_structure_and_restrictions = each_language(
    function (language) {
        // We show the language and the sentence structure and
        // restrictions in the language. To show the sentence
        // structure and restrictions in the language,
        // we use display_kernel_in and this.template_display.
        return language + ': ' + this.template_display(
            this.conjunction_display(),
            display_kernel_in(language.toLowerCase()));
    }
);

// This function displays a sentence without translations.
KCKSentence.prototype.display_without_translations = function () {
    // We combine a lot of pieces together
    return [
        // This simplest display: just K's and C's.
        this.template_display('C'),
        // Same as the first, but with a more complicated conjunction.
        this.template_display(this.conjunction_display()),
        // This has the same conjunction as the second,
        // but the kernels log their role lists rather than just K.
        this.template_display(this.conjunction_display(), role_list_display)
    ].join('\n') + '\n\n' + this.display_structure_and_restrictions();
}

// This method displays the translations of a sentence.
KCKSentence.prototype.display_partial_translations = each_language(
    function (language, conjunction_display) {
        // We show the language and the translation in the language.
        // To show the translation, we use translate_kernel_into
        // and this.template_display.
        // Note that we also have to translate the conjunction.
        return language + ':\n' + this.template_display(
            this.conjunction_full_display(language),
            partial_translate_kernel_into(language.toLowerCase()), '\n\n');
    }, '\n\n'
);

// This method displays the translation of a sentence in a language.
KCKSentence.prototype.translate_into = function (language) {
    return this.template_display(
        this.conjunction_translation_display(language),
        translate_kernel_into(language.toLowerCase()))
}

// This method displays the translations of a sentence.
KCKSentence.prototype.display_translations = each_language(
    function (language, conjunction_display) {
        // We show the language and the translation in the language.
        // To show the translation, we use translate_kernel_into
        // and this.template_display.
        // Note that we also have to translate the conjunction.
        return language + ':\n' + this.translate_into(language);
    }, '\n\n'
);

// This method displays the verb options of a sentence.
KCKSentence.prototype.display_verb_options = function (kck_level) {
    // Get the chosen lexemes.
    var chosen_lexemes = this.chosen_lexemes;
    // Do an error check.
    if (!('verb' in chosen_lexemes) || !chosen_lexemes.verb) {
        throw 'No \'verb\' in ' + JSON.stringify(chosen_lexemes);
    }
    // For each kernel...
    return this.each_kernel(function (kernel) {
        // ...and each language...
        return each_language(function (language) {
            // ...produce the verb options in that language.
            return language + ':\n' +
            kernel.display_verb_options_in_language(
                kck_level, language.toLowerCase(), chosen_lexemes.verb);
        })
    }).join('\n');
};

// Should the many verb options be displayed?
var VERB_OPTIONS_DISPLAY = true;

// This method displays the sentence.
KCKSentence.prototype.display = function (kck_level) {
    // We have the translations,
    // then after a line break, some asterisks, and another line break,
    // we have the part displayed without translations,
    // then after another line break, we have the partial translations,
    // then we have the verb options.
    var parts_of_display = [
        this.display_translations(),
        '************',
        this.display_without_translations(),
        this.display_partial_translations(),
        this.display_verb_options(kck_level)
    ];
    // Remove the verb options if they should not be displayed.
    if (!VERB_OPTIONS_DISPLAY) {
       parts_of_display.pop() 
    }
    // Join the parts of the display.
    return parts_of_display.join('\n\n');
}