// A sentence basically currently just wraps a tree structure
// in an object we can add methods to.

// This function initializes a sentence.
var Sentence = function (x) {
    this.sentence = x;
}

// This detects whether a conjunction is null
// by checking for "null" in its name.
Sentence.prototype.is_null_conjunction = function (conjunction) {
    return conjunction_library[conjunction].type === 'dummy main';
}

// The function gets the conjunction of the sentence, as a string.
Sentence.prototype.get_conjunction = function () {
    return this.sentence.conjunction;
}

// The function gets the conjunction of the sentence as JSON,
// by finding its entry in the conjunction library. We stringify and parse
// to avoid modification.
Sentence.prototype.get_conjunction_as_json = function () {
    return JSON.parse(JSON.stringify(conjunction_library[
        this.get_conjunction()]));
}

// The function determines whether the sentence is just one clause.
Sentence.prototype.is_single_clause = function () {
    // Note that this.get_conjunction() is a string.
    return this.is_null_conjunction(this.get_conjunction());
}

// This allows us to call a method on each kernel.
// method is a string which is the name of the method to call.
// arg is the argument to pass in. If it is undefined,
// it is still passed in, but javascript doesn't generally
// care about an undefined argument.
Sentence.prototype.each_kernel = function (method, arg) {
    // Is the method a method on Kernel?
    if (!(method in Kernel.prototype)) {
        throw method + ' is not a method of Kernel!';
    }
    // We only call the method on the left kernel
    // (left is currently the non default direction)
    // if it is relevant because there is more than one clause.
    if (!this.is_single_clause()) {
        this.sentence[non_default_direction][method](arg);
    }
    // The default direction is always relevant.
    // That kernel always exists.
    this.sentence[default_direction][method](arg);
}

// This method adds determined properties to the kernels in a sentence.
Sentence.prototype.add_determined_properties = function () {
    this.each_kernel('add_determined_properties');
}

// This method adds random properties to the kernels in a sentence.
Sentence.prototype.add_random_properties = function () {
    this.each_kernel('add_random_properties');
}

// This method chooses random lexemes throughout a sentence.
Sentence.prototype.choose_random_lexemes = function () {
    this.each_kernel('choose_random_lexemes');
}

// This method determines sequence within a sentence.
Sentence.prototype.determine_sequence = function () {
    var sequence = random_choice(['primary', 'secondary']);
    this.each_kernel('adopt_sequence', sequence);
}

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
    // We check whether the sentence is just a single clause.
    if (this.is_single_clause()) {
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
    return title(this.get_conjunction());
}

// This function displays the conjunction of a sentence
// in a given language.
Sentence.prototype.conjunction_translation_display = function (language) {
    // We lowercase the language, since entries
    // for languages are in lowercase.
    // We also add _form to it, because this too
    // is in conjunction translation entries.
    language = language.toLowerCase() + '_form';
    // We get the conjunction as a JSON object.
    var conjunction = this.get_conjunction_as_json();
    // We check that the conjunction has a translation in the language.
    if (!(language in conjunction)) {
        // We can't find the translation so we throw an error.
        throw JSON.stringify(conjunction) + ' does not have a/an '
        + language + '!';
    }
    // We return the translation.
    return conjunction[language];
}

// This function takes another function f. When the result is called,
// it does f for each language and joins the results by a newline
// (or a string if a string is given).
var each_language = function (f, string) {
    // We let '\n' be the default value for string and set it to that
    // if no value is given.
    if (string === undefined) {
        string = '\n';
    }
    // This function, when called, does f for each language.
    // The f.bind(this) ensures that this has the same value
    // inside as outside.
    return function () {
        return languages.map(f.bind(this)).join(string);
    }
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
Sentence.prototype.display_translations = each_language(
    function (language) {
        // We show the language and the translation in the language.
        // To show the translation, we use translate_kernel_into
        // and this.template_display.
        // Note that we also have to translate the conjunction.
        return language + ':\n' + this.template_display(
            this.conjunction_translation_display(language),
            translate_kernel_into(language.toLowerCase()), '\n');
    }, '\n\n'
);

// This method displays the sentence.
Sentence.prototype.display = function () {
    // We have the part displayed without translations,
    // then after a line break, we have the translations.
    return this.display_without_translations() + '\n\n' +
    this.display_translations();
}