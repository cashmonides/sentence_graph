function inflect_english (kernel, lexeme, word_settings) {
    console.log("DEBUGGING 3 inflect_english part_of_speech = " + lexeme.properties.core.part_of_speech);
    switch (lexeme.properties.core.part_of_speech) {
        case (Part_of_speech.Noun) :
            console.log("debug 9-6 inflect-english-noun triggered");
            return (make_article(word_settings) + ' ' +
            inflect_english_noun (kernel, lexeme, word_settings));
        case (Part_of_speech.Verb) : return inflect_english_verb (kernel, lexeme, word_settings);
        case (Part_of_speech.Adjective) : return inflect_english_adjective (kernel, lexeme, word_settings);
        case (Part_of_speech.Co) : return lexeme.display(Language_enum.English);
    }
}

function make_article(word_settings) {
    return random_choice(['the', word_settings.number === 'singular' ? 'a': '']);
}


function inflect_english_noun (kernel, lexeme, word_settings) {

    //GENDER, DECLENSION  IS ESTABLISHED BY THE LEXEME
    //NUMBER IS ESTABLISHED BY THE WORD SETTINGS GENERATOR (basically random choice of allowed parameters)
    //CASE IS ESTABLISHED BY LANGUAGE DEPENDENT MODULE BELOW
    //todo choice was made to pollute word_settings with word_settings.case (perhaps change later)
    //todo move case entirely into language-dependent


    //down the road we're going to need function & case in order to deal with he vs. him
    if (word_settings.function === "subject") {
        word_settings.case = "nominative";
    } else if (word_settings.function === "object") {
        word_settings.case = "accusative";
    }

    var p = lexeme.get_properties(Language_enum.English);

    //DEBUGGING below
    //console.log("P in english noun = ", p);
    //console.log("DEBUG 9-6 word_settings.number = ", word_settings.number);
    //console.log("DEBUG 9-6 p[word_settings.number] = ", p[word_settings.number]);


    return p[word_settings.number];
    /*if (word_settings.number === "singular") {
        return p.singular;
    } else if (word_settings.number === "plural") {
        return p.plural;
    }*/

}


function inflect_english_verb (kernel, lexeme, word_settings) {

    console.log("ENGLISH lexeme in english verb generation = ", JSON.stringify(lexeme));

    var pronoun = inflect_english_pronoun(kernel, word_settings);
    var helping = inflect_english_helping_verb(kernel, lexeme, word_settings);
    var main = inflect_english_main_verb(kernel, lexeme, word_settings);


    return pronoun + " " + helping + " " + main;
}


function inflect_english_helping_verb(kernel, lexeme, word_settings) {

    if (kernel.tense === "present" || kernel.tense === "present_subjunctive") {
        if (kernel.voice === "active") {
            return "";
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s") {
                return "am";
            } else if (kernel.person === "3s") {
                return "is"
            } else {
                return "are";
            }
        }
    } else if (kernel.tense === "imperfect" || kernel.tense === "perfect_subjunctive") {
        if (kernel.voice === "active") {
            return "";
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s" || kernel.person === "3s") {
                return "was";
            } else {
                return "were";
            }
        }
    } else if (kernel.tense === "future") {
        if (kernel.voice === "active") {
            return "will";
        } else if (kernel.voice === "passive") {
            return "will be";
        }
    } else if (kernel.tense === "perfect") {
        if (kernel.voice === "active") {
            return "";
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s" || kernel.person === "3s") {
                return "was";
            } else {
                return "were";
            }
        }
    } else if (kernel.tense === "pluperfect" || kernel.tense === "pluperfect_subjunctive") {
        if (kernel.voice === "active") {
            return "had";
        } else if (kernel.voice === "passive") {
            return "had been";
        }
    } else if (kernel.tense === "future_perfect") {
        if (kernel.voice === "active") {
            return "will have"
        } else if (kernel.voice === "passive") {
            return "will have been";
        }
    } else if (kernel.tense === "imperfect_subjunctive") {
        if (kernel.voice === "active") {
            if (kernel.person === "1s" || kernel.person === "3s") {
                return "was";
            } else {
                return "were";
            }
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s" || kernel.person === "3s") {
                return "was being";
            } else {
                return "were being";
            }
        }
    } else if (kernel.tense === "present_infinitive" && kernel.sequence === "primary") {
        if (kernel.voice === "active") {
            return "";
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s") {
                return "am";
            } else if (kernel.person === "3s") {
                return "is";
            }else {
                return "are";
            }
        }
    } else if (kernel.tense === "present_infinitive" && kernel.sequence === "secondary") {
        if (kernel.voice === "active") {
            if (kernel.person === "1s" || kernel.person === "3s") {
                return "was";
            } else {
                return "were";
            }
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s" || kernel.person === "3s") {
                return "was being";
            } else {
                return "were being";
            }
        }
    } else if (kernel.tense === "perfect_infinitive" && kernel.sequence === "primary") {
        if (kernel.voice === "active") {
            return "";
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s" || kernel.person === "3s") {
                return "was";
            } else {
                return "were";
            }
        }
    } else if (kernel.tense === "perfect_infinitive" && kernel.sequence === "secondary") {
        if (kernel.voice === "active") {
            return "had";
        } else if (kernel.voice === "passive") {
            return "had been";
        }
    } else {
        var error = "\nno tense detected. Tense = " + kernel.tense + "seq = " + kernel.sequence + "lex = " + lexeme + 'end debug\n';
        //console.log(error);
        //throw new Error(error);
        return error;
    }
}


function inflect_english_main_verb(kernel, lexeme, word_settings) {
    ////debugging only
    //console.log("sequence = ", kernel.sequence);
    var p = lexeme.get_properties(Language_enum.English);
    console.log("DEBUG 9-6 in inflect english main verb p = ", JSON.stringify(p));
    if (kernel.tense === "present" || kernel.tense === "present_subjunctive") {
        if (kernel.voice === "active") {
            if (kernel.person === "3s") {
                return p.present_3sg;
            } else {
                return p.present;
            }
        } else if (kernel.voice === "passive") {
            return p.passive;
        }
    } else if (kernel.tense === "imperfect" || kernel.tense === "perfect_subjunctive") {
        if (kernel.voice === "active") {
            return p.past;
        } else if (kernel.voice === "passive") {
            return p.passive
        }
    } else if (kernel.tense === "future") {
        if (kernel.voice === "active") {
            return p.present;
        } else if (kernel.voice === "passive") {
            return p.passive;
        }
    } else if (kernel.tense === "perfect") {
        if (kernel.voice === "active") {
            return p.past;
        } else if (kernel.voice === "passive") {
            return p.passive;
        }
    } else if (kernel.tense === "pluperfect" || kernel.tense === "pluperfect_subjunctive") {
        return p.passive;
    } else if (kernel.tense === "future_perfect") {
        return p.passive
    } else if (kernel.tense === "imperfect_subjunctive") {
        if (kernel.voice === "active") {
            return p.gerund;
        } else if (kernel.voice === "passive") {
            return p.passive;
        }
    } else if (kernel.tense === "present_infinitive" && kernel.sequence === "primary") {
        console.log("DEBUG 9-5 INFINITIVE DETECTED");
        if (kernel.voice === "active") {
            if (kernel.person === "3s") {
                return p.present_3sg;
            } else {
                return p.present;
            }
        } else if (kernel.voice === "passive") {
            return p.passive;
        }
    } else if (kernel.tense === "present_infinitive" && kernel.sequence === "secondary") {
        console.log("DEBUG 9-5 INFINITIVE DETECTED");
        if (kernel.voice === "active") {
            return p.gerund;
        } else if (kernel.voice === "passive") {
            return p.passive;
        }
    } else if (kernel.tense === "perfect_infinitive" && kernel.sequence === "primary") {
        console.log('DEBUG 9-6 primary perfect infinitive');
        if (kernel.voice === "active") {
            return p.past;
        } else if (kernel.voice === "passive") {
            return p.passive
        }i
    } else if (kernel.tense === "perfect_infinitive" && kernel.sequence === "secondary") {
        console.log('DEBUG 9-6 secondary perfect infinitive');
        return p.passive;
    }
}

function inflect_english_pronoun(kernel, word_settings) {
    var pronoun;
    if (kernel.implicitness === "implicit") {
        if (kernel.person === "1s") {
            pronoun = "I";
        } else if (kernel.person === "2s") {
            pronoun = "you";
        } else if (kernel.person === "3s") {
            if (kernel.subject_gender === "m") {
                pronoun = "he";
            } else if (kernel.subject_gender === "f") {
                pronoun = "she";
            } else if (kernel.subject_gender === "n") {
                pronoun = "it";
            }
        } else if (kernel.person === "1p") {
            pronoun = "we";
        } else if (kernel.person === "2p") {
            pronoun = "y'all";
        } else if (kernel.person === "3p") {
            pronoun = "they";
        }
    } else {
        pronoun = "";
    }
    return pronoun;
}


