// This contains the component methods devoted to
// choosing a lexeme for a component.

// It also contains the method for inflecting a lexeme.

// This is a tiny map from roles to parts of speech.
// It feels somewhat out of place among so many big, bulky methods.
var role_to_part_of_speech_map = {
    'verb': 'verb',
    'subject': 'noun',
    'object': 'noun',
    'personal agent': 'noun'
}

// This method determines the part of speech of a component.
// It only currently works on subjects, objects, verbs,
// and ablatives of personal agent.
// We will need to add to this whenever we add adjectives
// or new types of nouns.
Component.prototype.get_part_of_speech = function () {
    var part_of_speech = role_to_part_of_speech_map[this.role_name];
    if (part_of_speech === undefined) {
        throw 'No known part of speech for ' + this.role_name;
    }
    return part_of_speech;
}

// This method determines whether a component can accept a lexeme
// with regard to part of speech. All it does is check whether
// the parts of speech are the same, which seems to be
// all it needs to do (except in tricky cases like predicates).
Component.prototype.accepts_part_of_speech_of = function (lexeme) {
    return this.get_part_of_speech() === lexeme.get_part_of_speech();
}

// This method determines whether a component can accept a lexeme
// with regard to lexical restrictions. Currently,
// it succeeds if either the component has no lexical restriction
// or the lexeme's lexical properties (currently only one)
// are the same as the component's lexical restrictions.
// Note that the kernel's lexical restrictions are
// stored under the key "lexical", which created a bug:
// I thought they were stored under "lexical_restrictions".
Component.prototype.accepts_verb_lexical_restrictions_of = function (lexeme) {
    // If there are no lexical restrictions, we are fine.
    if (!this.chosen('lexical')) {
        return true;
    }
    // We define our lexical properties.
    var lexical_properties = lexeme.get_lexical_properties();
    // Check that the required lexical property is in those of the lexeme.
    return lexical_properties.indexOf(
        this.get_language_independent_property('lexical')) !== -1;
}

// This method determined whether a component can accept a lexeme
// with regard to transitivity. Currently,
// it just checks that the lexeme is either ditransitive or
// the same as the component.
// todo: Change this when we want advanced transitivity
// (such as transitive if alone).
// todo: Change this when voice stops being language-independent.
Component.prototype.accepts_transitivity_of = function (lexeme) {
    // Get the component and lexeme transitivities.
    var component_transitivity = this.get_language_independent_property(
        'transitivity');
    var lexeme_transitivity = lexeme.get_core_property('transitivity');
    // Do the check.
    return lexeme_transitivity === 'ditransitive' ||
    lexeme_transitivity === component_transitivity;
}

Component.prototype.accepts_noun_lexical_restrictions_of = function (lexeme) {
    // Note that we only handle one-item white lists because
    // it seems to be safer.
    var white_list = this.get_language_independent_property('white_list');
    if (!Array.isArray(white_list) || white_list.length > 1) {
        throw 'No white list, or white list has too many items.'
    }
    var black_list = set_from(this.get_language_independent_property(
        'black_list'), 'No black list!');
    var lexeme_props = set_from(
        lexeme.get_lexical_properties(), '$ is not a valid list ' +
        'of lexical properties!');
    return (white_list.length === 0 || white_list[0] in lexeme_props) &&
    Object.keys(set_intersection(black_list, lexeme_props)).length === 0;
}


// This method determines whether a component can accept a lexeme.
Component.prototype.accepts_lexeme = function (lexeme) {
    var part_of_speech = this.get_part_of_speech();
    if (part_of_speech === 'verb') {
        return this.accepts_verb_lexical_restrictions_of(lexeme) &&
        this.accepts_transitivity_of(lexeme);
    } else if (part_of_speech === 'noun') {
        return this.accepts_noun_lexical_restrictions_of(lexeme);
    } else {
        throw 'Cannot handle part of speech ' + part_of_speech + '.';
    }
}

// This chooses a random lexeme to fill a component.
// It returns a boolean to represent whether it failed or succeeded.
Component.prototype.choose_random_lexeme = function (
    chosen_lexemes, kernel_chosen_lexemes, level) {
    // We use this inside an anonymous function, so we use the self pattern.
    // (We could also have used bind, but I feel like
    // that can be less clear, expecially since
    // it seems to be considered magic.)
    var self = this;
    // We get the part of speech.
    var part_of_speech = this.get_part_of_speech();
    // We get all lexemes of the correct part of speech.
    // In the past, we didn't care about part of speech.
    // We used to do this by simply taking the values of
    // our testing lexemes dictionary,
    // but then we used the converted lexemes.
    // Now we separate the lexemes by part of speech,
    // which makes life even easier.
    var all_lexemes = converted_lexemes_by_part_of_speech[part_of_speech];
    // We get a list of allowed lexeme names for the given part of speech
    // from our settings, with dictionary lookup and string concatination.
    var allowed_lexemes = set_from(get_current_module(level)[
        'allowed_' + part_of_speech + 's'],
        'The allowed values ($) for lexemes with part of speech ' +
        part_of_speech + ' are strange.');
    // We make a function that detects whether a lexeme is not yet used.
    var not_yet_used = function (name) {
        return !(name in kernel_chosen_lexemes || name in chosen_lexemes);
    }
    // We filter our lexemes by a function that checks whether
    // the role accepts them, that is, the accepts_lexeme method
    // bound to the component. We also check that the lexeme
    // has not been chosen before.
    var filtered_lexemes = all_lexemes.filter(function (lexeme) {
        // Get the name. (We compare lexemes by their names.)
        var name = lexeme.get_name();
        // Check that no one else has chosen the lexeme,
        // in the kernel or outside of it, that the lexeme is one of those allowed,
        // and that this component will accept the lexeme.
        return not_yet_used(name) && self.accepts_lexeme(lexeme);
    });
    // We check that there are some lexemes which we can use.
    if (filtered_lexemes.length === 0) {
        // We become less restrictive.
        filtered_lexemes = all_lexemes.filter(function (lexeme) {
            // Get the name. (We compare lexemes by their names.)
            var name = lexeme.get_name();
            // Get the part of speech.
            var lexeme_part_of_speech = lexeme.get_part_of_speech();
            // Check that no one else has chosen the lexeme,
            // in the kernel or outside of it, that the lexeme has
            // the right part of speech, and that this component
            // will accept the lexeme.
            return not_yet_used(name)
            && lexeme_part_of_speech === part_of_speech 
            && self.accepts_lexeme(lexeme);
        });
        // We check that there are some lexemes which we can use.
        if (filtered_lexemes.length === 0) {
            // There are no usable lexemes! We fail.
            return false;
        }
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
Component.prototype.inflect = function (language, kck_level) {
    // We check that language is not undefined or null.
    if (language === undefined || language === null) {
        // The language was undefined or null, so we throw an error.
        throw 'Cannot inflect in the ' + language + ' language.';
    }
    // We do the inflection.
    this.form[language] = global_inflectors[language](this, kck_level);
}