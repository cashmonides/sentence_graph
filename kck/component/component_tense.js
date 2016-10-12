// This method determines the tense of the component.
Component.prototype.determine_tense = function (kck_level) {
    if (this.get_part_of_speech() !== 'verb') {
        throw 'Determining tense for a component filling role ' +
        this.role_name + '!';
    }
    // We first initialize the language-independent property of tense.
    this.initialize_language_dependent_property('tense_and_mood');
    // We then determine the tense taxonomy's tense, as well as the
    // time-mood-sequence combination used to get it.
    var time_mood_sequence = this.get_time_mood_sequence(
        default_language.toLowerCase());
    // We check for the time_mood_sequence.
    if (!(time_mood_sequence in tense_taxonomy)) {
        throw 'Weird time_mood_sequence (not in the tense taxonomy): ' +
        time_mood_sequence;
    }
    // We get a part of the tense taxonomy.
    var part_of_tense_taxonomy = tense_taxonomy[time_mood_sequence];
    // If the sentence is indicative,
    var allowed_tenses_apply = this.get_property_in_language(
        'mood', default_language.toLowerCase()) === 'indicative';
    // We randomly choose amoung the possibilities.
    var tense_from_tense_taxonomy = random_tense_from(
        kck_level, part_of_tense_taxonomy, allowed_tenses_apply);
    // Set the universal tense to be the tense from the tense taxonomy
    // (actually, its name).
    this.set_property('universal_tense', tense_from_tense_taxonomy.name);
    // Then we set tense for the other languages.
    // We loop over the languages.
    for (var i = 0; i < languages.length; i++) {
        // We add tense for each language.
        // We find the tense.
        var tense_in_language = this.determine_tense_in_language(
            languages[i].toLowerCase(), tense_from_tense_taxonomy);
        // We check for non-undefined.
        if (tense_in_language === undefined) {
            throw 'tense is undefined in ' + languages[i] + '!';
        }
        // Then we actually set it.
        this.set_property_in_language(
            'tense_and_mood', tense_in_language, languages[i].toLowerCase())
    }
}

// This allows for getting the time, mood, and sequence
// (to use as a key for the tense_maps) in a language passed in as
// a parameter.
Component.prototype.get_time_mood_sequence = function (language) {
    // There is a very easy case: if the language does not have mood
    // (like english, where the subjunctive is so vestigial we ignore it),
    // just return the time.
    if (!has_mood[language]) {
        var time = this.get_property_in_language('time', language);
        if (typeof time !== 'string') {
            throw 'The time ' + JSON.stringify(time) + ' is not a string!';
        }
        return time;
    }
    // We will need time and mood. We get the values in the language.
    var time = this.get_property_in_language('time', language);
    var mood = this.get_property_in_language('mood', language);
    if (typeof time !== 'string') {
        throw 'The time ' + JSON.stringify(time) + ' is not a string!';
    }
    if (typeof mood !== 'string') {
        throw 'The mood ' + JSON.stringify(mood) + ' is not a string!';
    }
    // We check for a time and mood entry in the tense maps for the language.
    if (time + ' ' + mood in tense_maps[language]) {
        // We only need time and mood.
        return time + ' ' + mood;
    } else {
        // In this case, we also need sequence.
        var sequence = this.get_property_in_language('sequence', language);
        if (typeof sequence !== 'string') {
            throw 'The sequence ' + JSON.stringify(sequence) +
            ' is not a string!';
        }
        return time + ' ' + mood + ' ' + sequence;
    }
}

// This function gets the override tense from a specific source.
Component.prototype.get_override_tense_from = function (method, language) {
    // Return null if the method is not a property or if there is no entry
    // for the language.
    if (!(method in this.properties
    && language in this.properties[method])) {
        return null;
    } else {
        // Otherwise get the value from this.properties[method][language]
        // (which may be a dictionary to allow dependance
        // on things such as sequence).
        return this.get_value_from_dict(this.properties[method][language]);
    }
}

// Get the translation formula from the regime and language.
Component.prototype.get_translation_formula_from_regime = function (
    regime, language) {
    // Get the translation formulas for the regime.
    var dict = regime_to_translation_formula[language][regime];
    // All the things checked should have a period.
    var check = this.check_string_with_period.bind(this, language);
    // We use the operators from the tf space.
    var results = abstract_prune(tf_space_operators, dict, check);
    // Check for exactly one result.
    if (results.length !== 1) {
        throw 'There is not exactly one result: [' +
        results.join(', ') + ']. ' +
        [regime, language, JSON.stringify(this.properties)].join(' ');
    }
    // Results from pruning now have text.
    return results[0].text;
}

// This function gets the override tense in a language.
Component.prototype.get_override_tense_in = function (language) {
    // We get the tense from tense override.
    var tense_from_tense_override = this.get_override_tense_from(
        'tense_override', language);
    // If we have a tense from the tense override, return it.
    if (tense_from_tense_override) {
        return tense_from_tense_override;
    }
    // If the language is one of those with no translation formulae,
    // return null.
    if (language in languages_with_no_translation_formulae) {
        return null;
    }
    // Get the regime.
    var regime = this.get_property_in_language('regime', language);
    // If the regime is the default regime (e.g., indicative for latin,
    // or absolute for english), return null.
    if (regime === default_regimes[language]) {
        return null;
    }
    // Get the translation formula.
    var translation_formula = this.get_translation_formula_from_regime(
        regime, language);
    // Check that the translation formula exists.
    if (!translation_formula) {
        throw 'Null, undefined, or otherwise unusual translation formula!' +
        ' It is ' + JSON.stringify(translation_formula);
    }
    // No longer resetting properties.
    // Reset some properties based on the translation formula.
    // this.reset_properties(translation_formula, language);
    // Get a tense from the regime in the language.
    var tense = get_tense_from_translation_formula(
        translation_formula, language);
    // Return the tense.
    return tense;
}

// This method allows us to determine tense in a given language.
Component.prototype.determine_tense_in_language = function (
    language, tense_from_tense_taxonomy) {
    // Before we do anything else, check whether we have an override tense.
    var override_tense = this.get_override_tense_in(language);
    // If the override tense is not null, just use it.
    if (override_tense !== null) {
        // Check that the override tense is not undefined.
        if (override_tense === undefined) {
            throw 'The override tense is undefined in ' + language + '!';
        }
        return override_tense;
    }
    // We get the time, mood, and sequence (which are language-dependent).
    var time_mood_sequence = this.get_time_mood_sequence(language);
    // We see what is possible given the time, mood, and sequence alone.
    var possible_given_tms = tense_maps[
        language][time_mood_sequence];
    // We do a sanity check.
    if (!Array.isArray(possible_given_tms)) {
        throw 'Something went wrong getting ' + language +
        ' entries that are ' + time_mood_sequence + '!';
    }
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
        throw 'tense error: No appropriate tense exists! (' +
        [language, tense_from_tense_taxonomy.name,
        time_mood_sequence].join(', ') + ')';
    } else if (possible_given_taxonomy_choice.length > 1) {
        // More than one tense.
        throw 'tense error: More than one appropriate tense exists! (' +
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