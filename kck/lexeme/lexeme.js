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
    return this[language][x];
}

// Gets a root in a given language.
KCKLexeme.prototype.get_root = function (x, language) {
    return this[language].roots[x];
}