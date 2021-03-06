// This file contains the definition of a lexeme.

var Lexeme = function (json_lexeme) {
    for (var i in json_lexeme) {
        this[i] = json_lexeme[i];
    }
    var name = this.get_name();
    if (!(name in Lexeme.lexemes)) {
        Lexeme.lexemes[name] = this;
    }
}

Lexeme.lexemes = {};

// Gets the lexeme's name.
Lexeme.prototype.get_name = function () {
    return this.core_properties.name;
}

// Any lexeme can be used as a lexeme.
Lexeme.prototype.usable_as_lexeme = function () {
    return true;
}

// Gets the lexeme's part of speech.
Lexeme.prototype.get_part_of_speech = function () {
    return this.core_properties.part_of_speech;
}

// Gets a language-independent property.
Lexeme.prototype.get_core_property = function (x) {
    return this.core_properties[x];
}

// Gets a language-dependent property.
Lexeme.prototype.get_language_dependent_property = function (x, language) {
    return this[language][x];
}

// Gets a root in a given language.
Lexeme.prototype.get_root = function (x, language) {
    return this[language].roots[x];
}