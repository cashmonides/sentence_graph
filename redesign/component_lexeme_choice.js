// This contains the component methods devoted to
// choosing a lexeme for a component.

// It also contains the method for inflecting a lexeme.

// This method determined whether a component can accept a lexeme
// with regard to part of speech. Currently it always returns true,
// since we only have verbs.
// todo: Change this method when we add nouns.
Component.prototype.accepts_part_of_speech_of = function (lexeme) {
    return true;
}

// This method determined whether a component can accept a lexeme
// with regard to lexical restrictions. Currently,
// it succeeds if either the component has no lexical restriction
// or the lexeme's lexical properties (currently only one)
// are the same as the component's lexical restrictions.
// Note that the kernel's lexical restrictions are
// stored under the key "lexical", which created a bug:
// I thought they were stored under "lexical_restrictions".
// todo: Change this when we know how to represent
// multiple lexical restrictions. That is, make this check that every
// lexical restriction of the component is a lexical property
// of the lexeme. This is probably doable now but is not being done
// in the interest of avoiding overcomplication.
Component.prototype.accepts_lexical_restrictions_of = function (lexeme) {
    return !this.chosen('lexical') ||
    this.get_language_independent_property('lexical')
    === lexeme.lexical_properties;
}

// This method determined whether a component can accept a lexeme
// with regard to trnasitivity. Currently,
// it just checks whether the two transitivities are the same.
// todo: Change this when we want advanced transitivity
// (such as transitive if alone).
Component.prototype.accepts_transitivity_of = function (lexeme) {
    return this.get_language_independent_property('transitivity') ===
    lexeme.transitivity;
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
    // We do this by simply taking the values of
    // our testing kernels dictionary.
    var all_lexemes = values(testing_kernels);
    // We use this inside an anonymous function, so we use the self pattern.
    // (We could also have used bind, but I feel like
    // that can be less clear.)
    var self = this;
    // We filter our lexemes by a function that checks whether
    // the role accepts them, that is, the accepts_lexeme method
    // bound to the component. We also check that the lexeme
    // has not been chosen before.
    var filtered_lexemes = all_lexemes.filter(function (lexeme) {
        // Check that no one else has chosen the lexeme,
        // in the kernel or outside of it, and that this component
        // will accept the lexeme.
        return !(lexeme.name in kernel_chosen_lexemes ||
        lexeme.name in chosen_lexemes)
        && self.accepts_lexeme(lexeme);
    });
    // We check that there are some lexemes which we can use.
    if (filtered_lexemes.length === 0) {
        // There are no usable lexemes! We fail.
        return false;
    }
    // We choose randomly from our list of lexemes.
    var lexeme = random_choice(filtered_lexemes);
    // We set our component's lexeme property to the chosen lexeme.
    this.lexeme = lexeme;
    // We put our new lexeme in the kernel chosen lexemes.
    kernel_chosen_lexemes[lexeme.name] = true;
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
    // We get the mood and time in the language,
    // and the language-independent voice.
    var mood = this.get_property_in_language('mood', language);
    var voice = this.get_language_independent_property('voice');
    var time = this.get_property_in_language('time', language);
    // Get the form based on the mood, tense (as determined
    // by putting the time into the testing_time_to_tense_map), and voice.
    // todo: Solve this in a better way when the testing_time_to_tense_map
    // is removed.
    this.form[language] = this.lexeme[language][mood][voice][
        testing_time_to_tense_map[time]];
}