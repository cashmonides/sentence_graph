// A sentence basically currently just wraps a tree structure
// in an object we can add methods to.

// This function initializes a sentence.
var Sentence = function (x) {
    this.sentence = x;
}

// The function gets the conjunction of the sentence, as a string.
// We do this by accessing the conjunction's 'citation_name' property.
Sentence.prototype.get_conjunction_as_string = function () {
    return this.sentence.conjunction.get_property('citation_name');
}

// The function gets the conjunction of the sentence
// as a conjunction object.
Sentence.prototype.get_conjunction = function () {
    return this.sentence.conjunction;
}

// The function determines whether the sentence is just one clause.
Sentence.prototype.is_single_clause = function () {
    // Note that this.get_conjunction() is a conjunction.
    return this.get_conjunction().is_null_conjunction();
}

// This allows us to call a method on each kernel.
// method is a string which is the name of the method to call,
// or a function to pass the kernel into.
// The remaining arguments are the arguments to pass in.
// Also, we return a list of results. We might not need
// this sometimes, but it's useful to have.
Sentence.prototype.each_kernel = function (method) {
    // Get the arguments.
    var args = args_to_list(arguments);
    // Get the arguments to pass in.
    var args_to_pass_in = args.slice(1);
    // If the method isn't a function, make it one.
    if (typeof method !== 'function') {
        // Is the method a method on Kernel?
        if (!(method in Kernel.prototype)) {
            throw method + ' is not a method of Kernel!';
        }
        // Define a variable to be the method since
        // we'll need it in a closure.
        var old_method = method;
        // Make method a function that calls the method on the kernel.
        method = function (kernel) {
            return function () {
                return kernel[old_method].apply(kernel, arguments);
            }
        }
    }
    // This is the list of results, as mentioned above.
    var list = [];
    // The default direction is always relevant.
    // That kernel always exists.
    list.push(method(
        this.sentence[default_direction]).apply(
            null, args_to_pass_in));
    // We only call the method on the right kernel
    // (right is currently the non default direction)
    // if it exists.
    if (this.sentence[non_default_direction]) {
        list.push(method(
            this.sentence[non_default_direction]).apply(
                null, args_to_pass_in));
    }
    // Return the list of results.
    return list;
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
    // Was our attempt to choose lexemes for a kernel successful?
    var success;
    // What lexemes have we chosen?
    this.chosen_lexemes = {};
    // We get our main kernel.
    var main_kernel = this.get_main_kernel();
    // We choose lexemes for our main kernel.
    success = main_kernel.choose_random_lexemes(this.chosen_lexemes);
    // We check if we did not succeed.
    if (!success) {
        // If we did not succeed, we return false,
        // since the whole sentence did not succeed.
        return false;
    }
    // We get our subordinate kernel.
    var subordinate_kernel = this.get_subordinate_kernel();
    // If our subordinate kernel does not exist, we are done,
    // so we return true.
    if (!subordinate_kernel) {
        // We return true, as said above.
        return true;
    }
    // We try to choose lexemes for our subordinate kernel.
    success = subordinate_kernel.choose_random_lexemes(this.chosen_lexemes);
    // What if we failed to find lexemes for our subordinate kernel?
    if (!success) {
        // We check whether we want to prune.
        if (LEXEME_ERROR_CATCHING_MODE === 'prune'
        // And we also check if we can.
        && this.subordinate_kernel_can_be_removed()) {
            // If we want to prune and we can, we of course prune. (Why not?)
            this.remove_subordinate_kernel();
        } else {
            // Otherwise (if we do not want to, or cannot,
            // remove part of the sentence) we (yet again) have failed,
            // so as in all the previous places where we have failed,
            // we return false.
            return false;
        }
    }
    // Pick some drop down lexemes.
    // todo: Come back to this when we have nouns,
    // because we can't have noun and verb options coexisting.
    this.pick_drop_down_lexemes();
    // We are finally done and have hit no fatal issues,
    // so we return true.
    return true;
};

Sentence.prototype.pick_drop_down_lexemes = function () {
    var original_chosen_lexemes = this.chosen_lexemes;
    // This function changes chosen_lexemes to add some new ones.
    var chosen_lexemes = {};
    var all_lexemes = converted_lexeme_list;
    var lexeme;
    var part_of_speech;
    for (var name in original_chosen_lexemes) {
        // We retain references to all lexemes ever created.
        lexeme = Lexeme.lexemes[name];
        part_of_speech = lexeme.get_part_of_speech();
        if (!(part_of_speech in chosen_lexemes)) {
            var n = number_of_dummies[part_of_speech];
            // Only keep the non-chosen lexemes with
            // the correct part of speech.
            var allowed_dummies = all_lexemes.filter(function (x) {
                return x.get_part_of_speech() === part_of_speech &&
                !(x.get_name() in original_chosen_lexemes);
            })
            // Automatically defensive.
            chosen_lexemes[part_of_speech] =
            shuffle(allowed_dummies).slice(0, n);
        }
        chosen_lexemes[part_of_speech].push(lexeme);
    }
    for (var i in chosen_lexemes) {
        chosen_lexemes[i].sort(function (x, y) {
            return cmp(x.get_name(), y.get_name());
        });
    }
    this.chosen_lexemes = chosen_lexemes;
}

// This function takes another function f. When the result is called,
// it does f for each language and joins the results by a newline
// (or a string if a string is given). However, the result string
// does not need to be used, and indeed sometimes is not.
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

// This method inflects all components in the kernels in a sentence,
// in every available language.
Sentence.prototype.inflect_all_components = each_language(
    function (language) {
        // We inflect all the components of the kernel in the language.
        // (But first we lowercase the language, since the information
        // we care about is stored under the language's lowercased version.)
        this.each_kernel(
            'inflect_all_components_in', language.toLowerCase());
    }
);

// This method gets the main kernel of a sentence.
Sentence.prototype.get_main_kernel = function () {
    return this.sentence.left;
}

// This method gets the subordinate kernel of a sentence
// (actually, the right kernel, which may not exist).
Sentence.prototype.get_subordinate_kernel = function () {
    return this.sentence.right;
}

// This method checks whether the subordinate kernel of a sentence
// can be removed by testing whether the conjunction is removable.
Sentence.prototype.subordinate_kernel_can_be_removed = function () {
    return this.sentence.conjunction.get_property('removable');
}

// This method removes the subordinate kernel of a sentence
// (actually, the right kernel).
Sentence.prototype.remove_subordinate_kernel = function () {
    this.sentence.right = null;
}

// This method determines whether a sentence has the same sequence
// in both clauses.
// todo: Check whether this still makes sense with more clauses.
Sentence.prototype.has_same_sequence_on_both_sides = function () {
    // Currently, only subordinate clauses require this.
    return this.get_conjunction().get_type() === 'subordinating';
}

// This method determines sequence within a sentence.
Sentence.prototype.determine_sequence = function () {
    // Check if the sentence requires the same sequence on both sides.
    if (this.has_same_sequence_on_both_sides()) {
        // If so, choose a master sequence.
        var sequence = random_choice(['primary', 'secondary']);
        this.each_kernel('adopt_sequence', sequence);
    } else {
        // Otherwise choose a random sequence on both sides.
        this.each_kernel('adopt_random_sequence');
    }
}

// This method gets all drop downs from the sentence.
Sentence.prototype.get_all_drop_downs = function (language) {
    var drop_down_lists = this.each_kernel(
        'get_all_drop_downs', language, this.chosen_lexemes);
    if (drop_down_lists.length === 1) {
         return drop_down_lists[0];
    } else {
        return drop_down_lists[0].concat(
            new NonDropDown(this.get_conjunction().translate_into(language)),
            concat_all(drop_down_lists.slice(1)));
    }
}

// This method gets all translation-path pairs from the sentence.
Sentence.prototype.get_all_translations_and_paths = function (language) {
    var translation_path_lists = this.each_kernel('get_all_translations_and_paths', language);
    // Each translation_path_list is a list, so translation_path_lists is a list of lists,
    // which we concatenate.
    // todo: Add the conjunction if it's a drop down.
    return concat_all(translation_path_lists);
}