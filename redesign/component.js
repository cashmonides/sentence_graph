// This file contains a Component object definition.
// A Component object represents the properties of a word.

// This defines a component. A component simply has properties.
// It also has a lexeme and form that are added far downstream,
// and a role name that is simply the name of its corresponding role.
var Component = function (role_name) {
    this.properties = {};
    // Set the role name.
    this.role_name = role_name;
    // Initialize the lexeme and form even though we won't need them
    // for a while.
    this.lexeme = null;
    // Note that the form is a dictionary because it will need
    // one property for each language.
    this.form = {};
}

// This function checks whether a component satisfies some property.
// It currently simply checks for the property in the component's
// properties.
// This function is not very efficient, but it hardly matters right now.
Component.prototype.check = function (string) {
    return this.values().indexOf(string) !== -1;
}

// This function tests whether a component satisifes a rule.
Component.prototype.check_rule = function (rule) {
    // We parse the rule and apply it to the component.
    return parse_rule(rule)(this);
}

// This function tests whether a component satisfies all rules.
Component.prototype.check_all_rules = function () {
    // We iterate over the rules.
    for (var i = 0; i < testing_rules.length; i++) {
        // We see if the component fails to satisfy a rule.
        if (!this.check_rule(testing_rules[i])) {
            // If so, it does not satisfy all rules.
            return false;
        }
    }
    // No rules were not satisfied, so the kernel satisfies all rules.
    return true;
}

// This function returns a description of a property
// (actually, just the property and its value in a particular language).
Component.prototype.describe_property = function (
    property, language) {
    // Just add together the property, a colon and space,
    // and the value of the property.
    return property + ': ' + this.get_property_in_language(
        property, language);
}

// This method describes the component.
Component.prototype.describe_in_language = function (language) {
    // properties is the list of properties sorted.
    var properties = Object.keys(this.properties).sort();
    // Since we use this inside a function, we need to define
    // self to be this and use self instead.
    var self = this;
    // Describe each property (and the lexeme), add indents, and join by '\n'.
    return '    lexeme: ' + this.lexeme.name + '\n' +
    properties.map(function (property) {
        return '    ' + self.describe_property(property, language);
    }).join('\n');
}

// This method determines the tense of the component.
Component.prototype.determine_tense = function () {
    // We first initialize the language-independent property of tense.
    this.initialize_language_dependent_property('tense');
    // We will need time and mood. We get the default values.
    var time = this.get_property_default('time');
    var mood = this.get_property_default('mood');
    // We then determine the tense taxonomy's tense, as well as the
    // time-mood-sequence combination used to get it.
    var time_mood_sequence = this.get_tense_mood_sequence(
        default_language.toLowerCase());
    // We randomly choose amoung the possibilities.
    var tense_from_tense_taxonomy = random_tense_from(
        tense_taxonomy[time_mood_sequence]);
    console.log(tense_from_tense_taxonomy);
    // Then we set tense for the other languages.
    // We loop over the languages.
    for (var i = 0; i < languages.length; i++) {
        // We add tense for each language.
        this.determine_tense_in_language(
            languages[i].toLowerCase(), tense_from_tense_taxonomy);
    }
}

// This allows for getting the time, mood, and sequence
// (to use as a key for the tense_maps) in a language passed in as
// a parameter.
Component.prototype.get_tense_mood_sequence = function (language) {
    // We will need time and mood. We get the values in the language.
    var time = this.get_property_in_language('time', language);
    var mood = this.get_property_in_language('mood', language);
    // We check for a time and mood entry in the tense maps for the language.
    if (time + ' ' + mood in tense_maps[language]) {
        // We only need time and mood.
        return time + ' ' + mood;
    } else {
        // In this case, we also need sequence.
        var sequence = this.get_property_in_language('sequence', language);
        return time + ' ' + mood + ' ' + sequence;
    }
}

// This function gets the override tense in a language.
Component.prototype.get_override_tense_in = function (language) {
    // We get the tense from tense override and
    // the translation formula from tf.
    var tense_from_tense_override = this.get_override_tense_via(
        'tense', language);
    var translation_formula = this.get_override_tense_via(
        'tf', language);
    // We get the tense from the translation formula.
    var tense_from_translation_formula = get_tense_from_translation_formula(
        language, translation_formula);
    // If both are null, return null.
    if (tense_from_tense_override === null
    && tense_from_translation_formula === null) {
        return null;
    }
    // We then check if neither is null.
    if (tense_from_tense_override !== null
    && tense_from_translation_formula !== null) {
        // If so, check that they are the same and otherwise throw an error.
        if (tense_from_tense_override !== tense_from_translation_formula) {
            throw tense_from_tense_override + ' is not the same as ' +
            tense_from_translation_formula + '!';
        }
    }
    // We return the first non-null one, which we can get via the or operator.
    // (Since null is the only false-like value we expect.)
    return tense_from_tense_override || tense_from_translation_formula;
}

// This method allows us to determine tense in a given language.
Component.prototype.determine_tense_in_language = function (
    language, tense_from_tense_taxonomy) {
    // Before we do anything else, check whether we have an override tense.
    var override_tense = this.get_override_tense_in(language);
    // If the override tense is not null, just use it.
    if (override_tense !== null) {
        return override_tense;
    }
    // We get the time, mood, and sequence (which is language-dependant)
    var time_mood_sequence = this.get_tense_mood_sequence(language);
    // We see what is possible given the time, mood, and sequence alone.
    var possible_given_tms = tense_maps[
        language][time_mood_sequence];
    // We filter what is possible given that it has to match the tense
    // from the tense taxonomy.
    var possible_given_taxonomy_choice = possible_given_tms.filter(
        function (tense_string) {
            // Check that the tense from the tense taxonomy
            // matches the tense string.
            return tense_from_tense_taxonomy.matches(tense_string);
        }
    );
    // We have some error cases.
    if (possible_given_taxonomy_choice.length === 0) {
        // No tense.
        throw 'No appropriate tense exists! (' +
        [language, tense_from_tense_taxonomy.name,
        time_mood_sequence].join(', ') + ')';
    } else if (possible_given_taxonomy_choice.length > 1) {
        // More than one tense.
        throw 'More than one appropriate tense exists! (' +
        [language, tense_from_tense_taxonomy.name,
        time_mood_sequence].join(', ') + ')';
    }
    // We get the unique possible tense.
    var tense = possible_given_taxonomy_choice[0];
    // We get rid of anything before (and including) a possible colon,
    // as that is what we call the tense in other languages
    // (such as imperfect subjunctive: aorist optative,
    // in which case we want only aorist optative here.)
    return last(tense.split(/: */g));
}