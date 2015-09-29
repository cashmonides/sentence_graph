var lexicon = [
    new Lexeme(
        "lion",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("lion", "lion", "lions", true, true, false, false, null),
            latin : new Latin_word_properties("LEO", "*LEO*", "LEON", null, "3", "m", true, true, false, false, null)
        }),
    new Lexeme(
        "war",
        {   core: {part_of_speech: "noun", animate: false},
            english : new English_word_properties("war", "war", "wars", true, true, false, false, null),
            latin : new Latin_word_properties("BELLUM", "BELL", "BELL", null, "2", "n", true, true, false, false, null)
        }),
    new Lexeme(
        "frog",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("frog", "frog", "frogs", true, true, false, false, null),
            latin : new Latin_word_properties("RANA", "RAN", "RAN", null, "1", "f", true, true, false, false, null)
        }),
    new Lexeme(
        "queen",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("queen", "queen", "queens", true, true, false, false, null),
            latin : new Latin_word_properties("REGINA", "REGIN", "REGIN", null, "1", "f", true, true, false, false, null)
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
        "mouse",
        {   core: {part_of_speech: "noun", animate: true},
            english : new English_word_properties("mouse", "mouse", "mice", true, true, false, false, null),
            latin : new Latin_word_properties("MUS", "*MUS*", "MUR", null, "3", "m", true, true, false, false, null)
        }),
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
    new Lexeme(
        "love",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("love", "love", "love", "love", "loves", "loved", "loved", "loving"),
            latin : new Latin_word_properties("AMARE", "AM", "AMAV", "AMAT", "1", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "fear",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("fear", "fear", "fear", "fear", "fears", "feared", "feared", "fearing"),
            latin : new Latin_word_properties("TIMERE", "TIM", "TIMU", "TIMIT", "2", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "push",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("push", "push", "push", "push", "pushes", "pushed", "pushed", "pushing"),
            latin : new Latin_word_properties("PELLERE", "PELL", "PEPUL", "PULS", "3", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "grab",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("grab", "grab", "grab", "grab", "grabs", "grabbed", "grabbed", "grabbing"),
            latin : new Latin_word_properties("CAPERE", "CAP", "CEP", "CAPT", "3i", null, null, null, null, null, "transitive")
        }),
    new Lexeme(
        "hear",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("hear", "hear", "hear", "hear", "hears", "heard", "heard", "hearing"),
            latin : new Latin_word_properties("AUDIRE", "AUD", "AUDIV", "AUDIT", "4", null, null, null, null, null, "transitive")
        }),


    //intransitive verbs below
    new Lexeme(
        "walk",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("walk", "walk", "walk", "walk", "walks", "walked", "walked", "walking"),
            latin : new Latin_word_properties("AMBULARE", "AMBUL", "AMBULAV", "AMBULAT", "1", null, null, null, null, null, "intransitive")
        }),
    new Lexeme(
        "sit",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("sit", "sit", "sit", "sit", "sits", "sat", "sat", "sitting"),
            latin : new Latin_word_properties("SEDERE", "SED", "SED", "SESS", "2", null, null, null, null, null, "intransitive")
        }),
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
    new Lexeme(
        "sleep",
        {   core: {part_of_speech: "verb", animate: null},
            english : new English_word_properties("sleep", "sleep", "sleep", "sleep", "sleeps", "slept", "slept", "sleeping"),
            latin : new Latin_word_properties("DORMIRE", "DORM", "DORMIV", "DORMIT", "4", null, null, null, null, null, "intransitive")
        }),
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

