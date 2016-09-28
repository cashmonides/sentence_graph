// This file contains the definition of a lexeme.

var KCKLexeme = function (json_lexeme) {
    for (var i in json_lexeme) {
        this[i] = json_lexeme[i];
    }
    var name = this.get_name();
    if (!(name in KCKLexeme.lexemes)) {
        KCKLexeme.lexemes[name] = this;
    }
}

KCKLexeme.lexemes = {};

// Gets the lexeme's name.
KCKLexeme.prototype.get_name = function () {
    return this.core_properties.name;
}

// Any lexeme can be used as a lexeme.
KCKLexeme.prototype.usable_as_lexeme = function () {
    return true;
}

// Gets the lexeme's part of speech.
KCKLexeme.prototype.get_part_of_speech = function () {
    return this.core_properties.part_of_speech;
}

// Gets a language-independent property.
KCKLexeme.prototype.get_core_property = function (x) {
    return this.core_properties[x];
}

// Gets a language-dependent property.
KCKLexeme.prototype.get_language_dependent_property = function (x, language) {
    if (!(language in this)) {
        throw 'The lexeme given has no properties in the language '
        + language + '.';
    }
    return this[language][x];
}

// Gets all roots in a given language.
KCKLexeme.prototype.get_roots = function (language) {
    return this[language].roots;
}

// Gets a root in a given language.
KCKLexeme.prototype.get_root = function (x, language) {
    return this[language].roots[x];
}

// Get the lexical properties.
KCKLexeme.prototype.get_lexical_properties = function () {
    // We first get the lexical_properties and
    // the lexical_property_dictionary.
    var lexical_properties = this.get_core_property('lexical_properties');
    var lexical_property_dictionary = this.get_core_property(
        'lexical_property_dictionary');
    if (Array.isArray(lexical_properties)) {
        // If the lexical_properties exist (and are, as expected, a list)
        // we just return them.
        return lexical_properties;
    } else if (is_object(lexical_property_dictionary)) {
        // If the lexical_property_dictionary exists (and is a dictionary)
        // we return the keys filtered by the values being true.
        return Object.keys(lexical_property_dictionary).filter(function (i) {
            return lexical_property_dictionary[i];
        });
    } else {
        // We throw an error. The lexeme's name should be sufficient
        // for us to find it.
        throw 'Lexeme ' + this.get_name() + ' is bad.';
    }
}