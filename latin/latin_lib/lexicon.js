var zA = "\u0100";
var zE = "\u0112";
var zI = "\u012A";
var zO = "\u014C";
var zU = "\u016A";



var lexicon = [
    //NOUNS////////
    //1st declension nouns
    new Lexeme(
        "queen",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("queen", "queen", "queens", true, true, false, false, null),
            latin : new Latin_word_properties("REGĪNA", "REGĪN", "REGĪN", null, "1", "f", true, true, false, false, null)
        }),
    new Lexeme(
        "frog",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("frog", "frog", "frogs", true, true, false, false, null),
            latin : new Latin_word_properties("RANA", "RAN", "RAN", null, "1", "f", true, true, false, false, null)
        }),
    new Lexeme(
        "eagle",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("eagle", "eagle", "eagles", true, true, false, false, null),
            latin : new Latin_word_properties("AQUILA", "AQUIL", "AQUIL", null, "1", "f", true, true, false, false, null)
        }),
    //2nd declension nouns
    new Lexeme(
        "war",
        {   core: {part_of_speech: "noun", animate: false},
            english : new English_word_properties("war", "war", "wars", true, true, false, false, null),
            latin : new Latin_word_properties("BELLUM", "BELL", "BELL", null, "2", "n", true, true, false, false, null)
        }),
    new Lexeme(
        "man",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("man", "man", "men", true, true, false, false, null),
            latin : new Latin_word_properties("VIR", "*VIR*", "VIR", null, "2", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "bear",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("bear", "bear", "bears", true, true, false, false, null),
            latin : new Latin_word_properties("URSUS", "URS", "URS", null, "2", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "wolf",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("wolf", "wolf", "wolves", true, true, false, false, null),
            latin : new Latin_word_properties("LUPUS", "LUP", "LUP", null, "2", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "bull",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("bull", "bull", "bulls", true, true, false, false, null),
            latin : new Latin_word_properties("TAURUS", "TAUR", "TAUR", null, "2", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "crow",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("crow", "crow", "crows", true, true, false, false, null),
            latin : new Latin_word_properties("CORVUS", "CORV", "CORV", null, "2", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "horse",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("horse", "horse", "horses", true, true, false, false, null),
            latin : new Latin_word_properties("EQUUS", "EQU", "EQU", null, "2", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "lizard",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("lizard", "lizard", "lizards", true, true, false, false, null),
            latin : new Latin_word_properties("LACERTUS", "LACERT", "LACERT", null, "2", "m", true, true, false, false, null)
        }),
    //3rd declension nouns
    new Lexeme(
        "lion",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("lion", "lion", "lions", true, true, false, false, null),
            latin : new Latin_word_properties("LEO", "*LEO*", "LEON", null, "3", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "cow",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("cow", "cow", "cows", true, true, false, false, null),
            latin : new Latin_word_properties("BOS", "*BOS*", "BOV", null, "3", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "dog",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("dog", "dog", "dogs", true, true, false, false, null),
            latin : new Latin_word_properties("CANIS", "*CANIS*", "CAN", null, "3", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "mouse",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("mouse", "mouse", "mice", true, true, false, false, null),
            latin : new Latin_word_properties("MUS", "*MUS*", "MUR", null, "3", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "fish",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("fish", "fish", "fish", true, true, false, false, null),
            latin : new Latin_word_properties("PISCIS", "*PISCIS*", "PISC", null, "3", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "rabbit",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("rabbit", "rabbit", "rabbits", true, true, false, false, null),
            latin : new Latin_word_properties("LEPUS", "*LEPUS*", "LEPOR", null, "3", "m", true, true, false, false, null)
        }),
    //ADJECTIVES ///////////

    new Lexeme(
        "big",
        {   core: {part_of_speech: "adjective", animate: null},
            english : new English_word_properties("big", "big", "big", true, true, false, false, null),
            latin : new Latin_word_properties("MAGNUS", "MAGN", "MAGN", null, "2/1/2", null, true, true, false, false, null)
        }),
    new Lexeme(
        "sad",
        {   core: {part_of_speech: "adjective", animate: null},
            english : new English_word_properties("sad", "sad", "sad", true, true, false, false, null),
            latin : new Latin_word_properties("TRISTIS", "*TRISTIS*", "TRIST", null, "3", null, true, true, false, false, null)
        }),

    //TRANSITIVE VERBS//////////////
    //1st conjugation
    new Lexeme(
        "love",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("love", "love", "love", "love", "loves", "loved", "loved", "loving"),
            latin : new Latin_word_properties("AMĀRE", "AM", "AMĀV", "AMĀT", "1", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "attack",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("attack", "attack", "attack", "attack", "attacks", "attacked", "attacked", "attacking"),
            latin : new Latin_word_properties("OPPUGNARE", "OPPUGN", "OPPUGNAV", "OPPUGNAT", "1", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "carry",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("carry", "carry", "carry", "carry", "carries", "carried", "carried", "carrying"),
            latin : new Latin_word_properties("PORTARE", "PORT", "PORTAV", "PORTAT", "1", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "eat",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("eat", "eat", "eat", "eat", "eats", "ate", "eaten", "eating"),
            latin : new Latin_word_properties("VORARE", "VOR", "VORAV", "VORAT", "1", null, null, null, null, null, "transitive")
        }),
    //2nd conjugation
    new Lexeme(
        "fear",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("fear", "fear", "fear", "fear", "fears", "feared", "feared", "fearing"),
            latin : new Latin_word_properties("TIMERE", "TIM", "TIMU", "TIMIT", "2", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "see",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("see", "see", "see", "see", "sees", "saw", "seen", "seeing"),
            latin : new Latin_word_properties("VID", "VID", "VID", "VIS", "2", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "scare",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("scare", "scare", "scare", "scare", "scares", "scared", "scared", "scaring"),
            latin : new Latin_word_properties("TERR", "TERR", "TERRU", "TERRIT", "2", null, null, null, null, null, "transitive")
        }),
    //3rd conjugation
    new Lexeme(
        "push",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("push", "push", "push", "push", "pushes", "pushed", "pushed", "pushing"),
            latin : new Latin_word_properties("PELLERE", "PELL", "PEPUL", "PULS", "3", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "rule",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("rule", "rule", "rule", "rule", "rules", "ruled", "ruled", "ruling"),
            latin : new Latin_word_properties("REGERE", "REG", "REG", "RECT", "3", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "speak",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("speak", "speak", "speak", "speak", "speaks", "spoke", "spoken", "speaking"),
            latin : new Latin_word_properties("DICERE", "DIC", "DIX", "DICT", "3", null, null, null, null, null, "intransitive")
        }),
    //3i conjugation
    new Lexeme(
        "grab",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("grab", "grab", "grab", "grab", "grabs", "grabbed", "grabbed", "grabbing"),
            latin : new Latin_word_properties("CAPERE", "CAP", "CEP", "CAPT", "3i", null, null, null, null, null, "transitive")
        }),
    //4 conjugation
    new Lexeme(
        "hear",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("hear", "hear", "hear", "hear", "hears", "heard", "heard", "hearing"),
            latin : new Latin_word_properties("AUDIRE", "AUD", "AUDIV", "AUDIT", "4", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "find",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("find", "find", "find", "find", "finds", "found", "found", "finding"),
            latin : new Latin_word_properties("INVENIRE", "INVEN", "INVEN", "INVENT", "4", null, null, null, null, null, "transitive")
        }),

    //INTRANSITIVE VERBS
    //1st conjugation
    new Lexeme(
        "walk",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("walk", "walk", "walk", "walk", "walks", "walked", "walked", "walking"),
            latin : new Latin_word_properties("AMBULARE", "AMBUL", "AMBULAV", "AMBULAT", "1", null, null, null, null, null, "intransitive")
        }),
    new Lexeme(
        "shout",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("shout", "shout", "shout", "shout", "shouts", "shouted", "shouted", "shouting"),
            latin : new Latin_word_properties("CLAMARE", "CLAM", "CLAMAV", "CLAMAT", "1", null, null, null, null, null, "intransitive")
        }),
    //2nd conjugation
    new Lexeme(
        "sit",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("sit", "sit", "sit", "sit", "sits", "sat", "sat", "sitting"),
            latin : new Latin_word_properties("SEDERE", "SED", "SED", "SESS", "2", null, null, null, null, null, "intransitive")
        }),
    //3rd conjugation
    new Lexeme(
        "fall",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("fall", "fall", "fall", "fall", "falls", "fell", "fallen", "falling"),
            latin : new Latin_word_properties("CADERE", "CAD", "CECID", "CESS", "3", null, null, null, null, null, "intransitive")
        }),
    new Lexeme(
        "flee",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("flee", "flee", "flee", "flee", "flees", "fled", "fled", "fleeing"),
            latin : new Latin_word_properties("FUGERE", "FUG", "FUG", "FUGIT", "3i", null, null, null, null, null, "intransitive")
        }),
    //4th conjugation
    new Lexeme(
        "sleep",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("sleep", "sleep", "sleep", "sleep", "sleeps", "slept", "slept", "sleeping"),
            latin : new Latin_word_properties("DORMIRE", "DORM", "DORMIV", "DORMIT", "4", null, null, null, null, null, "intransitive")
        }),

    //CONJUNCTIONS
    new Lexeme(
        "and",
        {   core: {part_of_speech: "co", animate: null},
            english : new English_word_properties("and", "and", "and", "and", "and", "and", null, null),
            latin : new Latin_word_properties("ET", "ET", "ET", "ET", "1", null, null, null, null, null, null)
        })
];


//makes a list of lexemes appropriate to an element (subject, object, verb, etc.)
function get_lexemes (element) {
    if (element === Elements.Subject || element === Elements.Object) {
        element = Elements.Noun;
    }
    var result = [];
    for (var i in lexicon) {
        var pos = lexicon[i].get_property("core", "part_of_speech");
        if (pos === element) {
            result.push(lexicon[i]);
        }
    }
    return result;
}

var get_word_from_word_id = function (lexeme_string) {
    return lexicon.filter(function (x) {return lexeme_string = x.word_id})[0]
};

var generate_current_lexicon = function (list_of_lexeme_strings) {
    return lexicon.filter(function (x) {return list_of_lexeme_strings.indexOf(x.word_id) !== -1})
};

var return_lexicon_from_module = function (test_level) {
    console.log('DEBUG 11-16 lexicon = ', ALL_MODULES[test_level].lexicon)
    return ALL_MODULES[test_level].lexicon;
};