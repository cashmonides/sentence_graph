// This contains the component methods devoted to
// choosing a lexeme for a component.

// It also contains the method for inflecting a lexeme.

// This method determines the part of speech of a component.
// It only currently works on subjects, objects, and verbs.
// todo: fix when we have adjectives and other nouns.
Component.prototype.get_part_of_speech = function () {
    return {
        'verb': 'verb',
        'subject': 'noun',
        'object': 'noun'
    }[this.role_name];
}

// This method determined whether a component can accept a lexeme
// with regard to part of speech. All it does is check whether
// the parts of speech are the same, which seems to be
// all it needs to do (except in tricky cases like predicates).
Component.prototype.accepts_part_of_speech_of = function (lexeme) {
    return this.get_part_of_speech() === lexeme.get_part_of_speech();
}

// This method determined whether a component can accept a lexeme
// with regard to lexical restrictions. Currently,
// it succeeds if either the component has no lexical restriction
// or the lexeme's lexical properties (currently only one)
// are the same as the component's lexical restrictions.
// Note that the kernel's lexical restrictions are
// stored under the key "lexical", which created a bug:
// I thought they were stored under "lexical_restrictions".
Component.prototype.accepts_lexical_restrictions_of = function (lexeme) {
    // If there are no lexical restrictions, we are fine.
    if (!this.chosen('lexical')) {
        return true;
    }
    // We define our lexical properties.
    var lexical_properties = lexeme.get_core_property('lexical_properties');
    // Check that the required lexical property is in those of the lexeme.
    return lexical_properties.indexOf(
        this.get_language_independent_property('lexical')) !== -1;
}

// This method determined whether a component can accept a lexeme
// with regard to transitivity. Currently,
// it just checks that the lexeme is transitive or the voice is active.
// todo: Change this when we want advanced transitivity
// (such as transitive if alone).
// todo: Change this when voice stops being language-independent.
Component.prototype.accepts_transitivity_of = function (lexeme) {
    return this.get_language_independent_property('voice') === 'active'
    || lexeme.get_core_property('transitivity') === 'transitive';
}

// This method determines whether a component can accept a lexeme.
Component.prototype.accepts_lexeme = function (lexeme) {
    // We check the part of speech, lexical restrictions,
    // and transitivity.
    // Having three conditions like this may be unhealthy,
    // but I don't think it's that bad yet.
    return this.accepts_part_of_speech_of(lexeme) &&
    this.accepts_lexical_restrictions_of(lexeme) &&
    this.accepts_transitivity_of(lexeme);
}

// This chooses a random lexeme to fill a component.
// It returns a boolean to represent whether it failed or succeeded.
Component.prototype.choose_random_lexeme = function (
    chosen_lexemes, kernel_chosen_lexemes) {
    // We get all lexemes.
    // We used to do this by simply taking the values of
    // our testing lexemes dictionary,
    // but now we use the converted lexemes.
    var all_lexemes = converted_lexeme_list;
    // We use this inside an anonymous function, so we use the self pattern.
    // (We could also have used bind, but I feel like
    // that can be less clear.)
    var self = this;
    // We filter our lexemes by a function that checks whether
    // the role accepts them, that is, the accepts_lexeme method
    // bound to the component. We also check that the lexeme
    // has not been chosen before.
    var filtered_lexemes = all_lexemes.filter(function (lexeme) {
        // Get the name. (We compare lexemes by their names.)
        var name = lexeme.get_name();
        // Check that no one else has chosen the lexeme,
        // in the kernel or outside of it, and that this component
        // will accept the lexeme.
        return !(name in kernel_chosen_lexemes ||
        name in chosen_lexemes)
        && self.accepts_lexeme(lexeme);
    });
    // We check that there are some lexemes which we can use.
    if (filtered_lexemes.length === 0) {
        // There are no usable lexemes! We fail.
        return false;
    }
    // We choose randomly from our list of lexemes.
    var chosen_lexeme = random_choice(filtered_lexemes);
    // We set our component's lexeme property to the chosen lexeme.
    this.lexeme = chosen_lexeme;
    // We put our new lexeme in the kernel chosen lexemes.
    kernel_chosen_lexemes[chosen_lexeme.get_name()] = true;
    // We return true to represent that we succeeded.
    return true;
}

// This method inflects a component's lexeme in a language passed in
// as a parameter. It will likely become more complicated.
// todo: Come back to this when we have nouns.
Component.prototype.inflect = function (language) {
    // We check that language is not undefined or null.
    if (language === undefined || language === null) {
        // The language was undefined or null, so we throw an error.
        throw 'Cannot inflect in the ' + language + ' language.';
    }
    // We do the inflection.
    this.form[language] = global_inflectors[language](this);
}