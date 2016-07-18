var Lexeme = function(word_id, properties){
    this.word_id = word_id;
    this.properties = properties;                        //this is filled in by latin_word_properties or english_word_properties - which makes it more modular this will be p.animate or p.family etc. (might want to put these into the language-specific lexemes)

    //todo should lexeme store part of speech???



    //input is a language, output is a string
    this.display = function(language_enum){
        switch (language_enum){
            case (Language_enum.English) : return this.properties.english.root;
            case (Language_enum.Latin) : return this.properties.latin.root;
        }
    };

    // returns a string
    this.inflect = function(language_enum, word_settings){
        switch (language_enum) {
            case (Language_enum.English) :
                return inflect_english(this, word_settings);
            case (Language_enum.Latin) :
                return inflect_latin(this, word_settings);
        }
    };


    //gets a word property, e.g. is transitive, is animate, etc.
    this.get_property = function(language_enum, property) {
        return this.properties[language_enum][property];
    };


    this.get_properties = function(language_enum) {
        return this.properties[language_enum];                  //this will return all the properties of a word for a particular language (a map which we access via p.tense, p.voice, etc.)
    }

};


var Form = function(lexeme, word_settings, element) {
    this.lexeme = lexeme;
    this.word_settings = word_settings;


    //Subject Object Verb
    this.element = element;

    // this will return e.g. dogs or perros or loved   (this is the final string output)
    this.display = function(language_enum) {
        return this.lexeme.inflect(language_enum, this.word_settings);
    }
};



var Latin_word_properties = function (root, stem_1, stem_2, stem_3, family, gender, animate, count, respect, proper, transitive) {
    this.root = root; //citation form
    this.stem_1 = stem_1;
    this.stem_2 = stem_2;
    this.stem_3 = stem_3;
    this.family = family;
    this.gender = gender;
    this.animate = animate;
    this.count = count;
    this.respect = respect;
    this.proper = proper;
    this.transitive = transitive;
};

var English_word_properties = function (root, singular, plural, present, present_3sg, past, passive, gerund) {
    this.root = root;
    this.singular = singular;       //foot   vs  dog
    this.plural = plural;           //feet    vs dogs
    this.present = present;         // walk 
    this.present_3sg = present_3sg; // walks
    this.past = past;
    this.passive = passive;
    this.gerund = gerund;
};
