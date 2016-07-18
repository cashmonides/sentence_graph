// These functions assist in displaying sentences.

// This function displays the template of a sentence given
// a display for its conjunction and a function to log a kernel
// (and an optional separator, defaulting to ' ').
Sentence.prototype.template_display = function (
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
Sentence.prototype.conjunction_display = function () {
    return title(this.get_conjunction_as_string());
}

// This function displays the conjunction of a sentence
// in a given language.
Sentence.prototype.conjunction_translation_display = function (language) {
    return this.get_conjunction().translate_into(language);
}

// This function displays everything we want to know about a conjunction:
// both its detailed display and its translation.
Sentence.prototype.conjunction_full_display = function (language) {
    // First the translation, then the detailed display.
    return this.conjunction_translation_display(language) + '\n' +
    this.get_conjunction().detailed_display(language);
}

// This function displays the sentence structure
// and restrictions in each language.
Sentence.prototype.display_structure_and_restrictions = each_language(
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
Sentence.prototype.display_without_translations = function () {
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
Sentence.prototype.display_partial_translations = each_language(
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

// This method displays the translations of a sentence.
Sentence.prototype.display_translations = each_language(
    function (language, conjunction_display) {
        // We show the language and the translation in the language.
        // To show the translation, we use translate_kernel_into
        // and this.template_display.
        // Note that we also have to translate the conjunction.
        return language + ':\n' + this.template_display(
            this.conjunction_translation_display(language),
            translate_kernel_into(language.toLowerCase()));
    }, '\n\n'
);

// This method displays the sentence.
Sentence.prototype.display = function () {
    // We have the part displayed without translations,
    // then after a line break, we have the partial translations,
    // then after another line break, we have the translations.
    return [
        this.display_without_translations(),
        this.display_partial_translations(),
        this.display_translations()
    ].join('\n\n');
}