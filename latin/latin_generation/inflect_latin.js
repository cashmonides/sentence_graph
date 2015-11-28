//OBJECTIVE
//inflect_latin will be a sub-function of make form



//todo akiva's changes below
//uncomment and change to inflect_latin to inflect_latin_pre when ready to implement
// function inflect_latin (kernel, lexeme, word_settings, dashes) {
//     if (dashes) {
//         return inflect_latin_pre (kernel, lexeme, word_settings);
//     } else if (!dashes) {
//         var input = inflect_latin_pre(kernel, lexeme, word_settings);
//         return remove_dashes(input);
//     } else {
//         console.log("Error caught at dash removal stage");
//     }
// }

function inflect_latin (kernel, lexeme, word_settings){
    switch (lexeme.properties.core.part_of_speech) {
        case (Part_of_speech.Noun) : return inflect_latin_noun (kernel, lexeme, word_settings);    //todo will inflect_latin_verb be a method on a lexeme or on another object, e.g. a latin word
        case (Part_of_speech.Verb) : return inflect_latin_verb (kernel, lexeme);
        case (Part_of_speech.Adjective) : return inflect_latin_adjective (kernel, lexeme, word_settings);
        case (Part_of_speech.Co) : return lexeme.display(Language_enum.Latin);
    }
}

// problem: we may have entered a latin word for lion but not a spanish word, so if we make this a method on lexeme and try to run it through spanish, we won't get a result
// possible solution: we make the method inflect_latin_verb_middle on a different object, i.e. a latin word object
// another possible solution: check if the lexeme has a representation in the language and skip it if it doesn't

function inflect_latin_noun (kernel, lexeme, word_settings) {
    //todo can I replace lexeme.properties.latin.family with p.family if I declare p early?

    //GENDER, DECLENSION  IS ESTABLISHED BY THE LEXEME
    //NUMBER IS ESTABLISHED BY THE WORD SETTINGS GENERATOR (basically random choice of allowed parameters)
    //CASE IS ESTABLISHED BY LANGUAGE DEPENDENT MODULE BELOW
    //todo choice was made to pollute word_settings with word_settings.case (perhaps change later)
    //todo move case entirely into language-dependent
    if (word_settings.function === "subject"){
        if (kernel.clause_type === "is") {
            word_settings.case = "accusative";
        } else {
            word_settings.case = "nominative";
        }
    } else if (word_settings.function === "object"){
        word_settings.case = "accusative";
    }


    //BELOW PUTS IT INTO EFFECT
    var noun_ending;
    if (lexeme.properties.latin.family === "1") {
        if (word_settings.number === "singular") {
            var map_decl_1s = {
                nominative: "-A",
                genitive: "-AE",
                dative: "-AE",
                accusative: "-AM",
                ablative: "-A"
            };
            noun_ending = map_decl_1s[word_settings.case];
        } else if (word_settings.number === "plural") {
            var map_decl_1p = {
                nominative: "-AE",
                genitive: "-ARUM",
                dative: "-IS",
                accusative: "-AS",
                ablative: "-IS"
            };
            noun_ending = map_decl_1p[word_settings.case];
        }
    } else if (lexeme.properties.latin.family === "2") {
        if (lexeme.properties.latin.gender === "m") {
            if (word_settings.number === "singular") {
                var map_decl_2s = {
                    nominative: "-US",
                    genitive: "-I",
                    dative: "-O",
                    accusative: "-UM",
                    ablative: "-O"
                };
                noun_ending = map_decl_2s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_2p = {
                    nominative: "-I",
                    genitive: "-ORUM",
                    dative: "-IS",
                    accusative: "-OS",
                    ablative: "-IS"
                };
                noun_ending = map_decl_2p[word_settings.case];
            }
        } else if (lexeme.properties.latin.gender === "n") {
            if (word_settings.number === "singular") {
                var map_decl_2s = {
                    nominative: "-UM",
                    genitive: "-I",
                    dative: "-O",
                    accusative: "-UM",
                    ablative: "-O"
                };
                noun_ending = map_decl_2s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_2p = {
                    nominative: "-A",
                    genitive: "-ORUM",
                    dative: "-IS",
                    accusative: "-A",
                    ablative: "-IS"
                };
                noun_ending = map_decl_2p[word_settings.case];
            }
        }
    } else if (lexeme.properties.latin.family === "3") {
        if (lexeme.properties.latin.gender === "m") {
            if (word_settings.number === "singular") {
                var map_decl_3s = {
                    nominative: "",
                    genitive: "-IS",
                    dative: "-I",
                    accusative: "-EM",
                    ablative: "-E"
                };
                noun_ending = map_decl_3s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_3p = {
                    nominative: "-ES",
                    genitive: "-UM",
                    dative: "-IBUS",
                    accusative: "-ES",
                    ablative: "-IBUS"
                };
                noun_ending = map_decl_3p[word_settings.case];
            }
        } else if (lexeme.properties.latin.gender === "n") {
            if (word_settings.number === "singular") {
                var map_decl_3s = {
                    nominative: "",
                    genitive: "-IS",
                    dative: "-I",
                    accusative: "",
                    ablative: "-E"
                };
                noun_ending = map_decl_3s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_3p = {
                    nominative: "-A",
                    genitive: "-UM",
                    dative: "-IBUS",
                    accusative: "-A",
                    ablative: "-IBUS"
                };
                noun_ending = map_decl_3p[word_settings.case];
            }
        }
    }
    if (noun_ending === undefined) {
        throw "noun ending is undefined";
    }


    var p = lexeme.get_properties(Language_enum.Latin);


    if (p.stem_1[0] === '*' && word_settings.number === "singular" && word_settings.case === "nominative") {
        return p.stem_1
    } else {
        return p.stem_2 + noun_ending;
    }
};


function inflect_latin_adjective (kernel, lexeme, word_settings) {

    var adj_ending;
    var p = lexeme.get_properties(Language_enum.Latin);



    if (p.family === "2/1/2") {
        if (word_settings.gender === "f") {
            if (word_settings.number === "singular") {
                var map_decl_1s = {
                    nominative: "-A",
                    genitive: "-AE",
                    dative: "-AE",
                    accusative: "-AM",
                    ablative: "-A"
                };
                adj_ending = map_decl_1s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_1p = {
                    nominative: "-AE",
                    genitive: "-ARUM",
                    dative: "-IS",
                    accusative: "-AS",
                    ablative: "-IS"
                };
                adj_ending = map_decl_1p[word_settings.case];
            }
        } else if (word_settings.gender === "m") {
            if (word_settings.number === "singular") {
                var map_decl_2s = {
                    nominative: "-US",
                    genitive: "-I",
                    dative: "-O",
                    accusative: "-UM",
                    ablative: "-O"
                };
                adj_ending = map_decl_2s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_2p = {
                    nominative: "-I",
                    genitive: "-ORUM",
                    dative: "-IS",
                    accusative: "-OS",
                    ablative: "-IS"
                };
                adj_ending = map_decl_2p[word_settings.case];
            }
        } else if (word_settings.gender === "n") {
            if (word_settings.number === "singular") {
                var map_decl_2s = {
                    nominative: "-UM",
                    genitive: "-I",
                    dative: "-O",
                    accusative: "-UM",
                    ablative: "-O"
                };
                adj_ending = map_decl_2s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_2p = {
                    nominative: "-A",
                    genitive: "-ORUM",
                    dative: "-IS",
                    accusative: "-A",
                    ablative: "-IS"
                };
                adj_ending = map_decl_2p[word_settings.case];
            }
        }
    } else if (p.family === "3") {
        if (word_settings.gender === "m" || word_settings.gender === "f") {
            if (word_settings.number === "singular") {
                var map_decl_3s = {
                    nominative: "",
                    genitive: "-IS",
                    dative: "-I",
                    accusative: "-EM",
                    ablative: "-E"
                };
                adj_ending = map_decl_3s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_3p = {
                    nominative: "-ES",
                    genitive: "-UM",
                    dative: "-IBUS",
                    accusative: "-ES",
                    ablative: "-IBUS"
                };
                adj_ending = map_decl_3p[word_settings.case];
            }
        } else if (word_settings.gender === "n") {
            if (word_settings.number === "singular") {
                var map_decl_3s = {
                    nominative: "",
                    genitive: "-IS",
                    dative: "-I",
                    accusative: "",
                    ablative: "-E"
                };
                adj_ending = map_decl_3s[word_settings.case];
            } else if (word_settings.number === "plural") {
                var map_decl_3p = {
                    nominative: "-A",
                    genitive: "-UM",
                    dative: "-IBUS",
                    accusative: "-A",
                    ablative: "-IBUS"
                };
                adj_ending = map_decl_3p[word_settings.case];
            }
        }
    }
    if (adj_ending === undefined) {
        throw "adjective ending is undefined";
    }


    if (p.family === "3" && word_settings.number === "singular" && word_settings.case === "nominative") {
        return p.stem_1;
    } else if (p.family === "2/1/2" && word_settings.gender === "m" && word_settings.number === "singular" && word_settings.case === "nominative"){
        return p.stem_1;
    }
    else {
        return p.stem_2 + adj_ending;
    }
}


function inflect_latin_verb_beginning (kernel, lexeme) {
    var beginning;
    var p = lexeme.get_properties(Language_enum.Latin);
    if (kernel.tense === "present" || kernel.tense === "imperfect" || kernel.tense === "future"
        || kernel.tense === "present_subjunctive" || kernel.tense === "imperfect_subjunctive"
        || kernel.tense === "present_infinitive") {
        beginning = p.stem_1;
    } else if (kernel.tense === "perfect" || kernel.tense === "pluperfect" || kernel.tense === "future_perfect"
        || kernel.tense === "perfect_subjunctive" || kernel.tense === "pluperfect_subjunctive"
        || kernel.tense === "perfect_infinitive") {
        if (kernel.voice === "active") {
            beginning = p.stem_2;
        } else if (kernel.voice === "passive") {
            beginning = p.stem_3;
        }
    }

    if (beginning === undefined) {
        throw new Error("verb beginning is undefined");
    }
    return beginning;
}

function inflect_latin_verb_middle (kernel, lexeme) {


    var verb_middle;
    if (lexeme.properties.latin.family === "1") {
        var map_conj_1 = {
            present: "-A",
            imperfect: "-ABA",
            future: "-ABI",
            present_subjunctive: "-E",
            imperfect_subjunctive: "-ARE",
            present_infinitive: "-ARE",
            perfect: "-*",
            pluperfect: "-ERA",
            future_perfect: "-ERI",
            perfect_subjunctive: "-ERI",
            pluperfect_subjunctive: "-ISSE",
            perfect_infinitive: "-ISSE"
        };
        verb_middle = map_conj_1[kernel.tense];
    } else if (lexeme.properties.latin.family === "2") {
        var map_conj_2 = {
            present: "-E",
            imperfect: "-EBA",
            future: "-EBI",
            present_subjunctive: "-EA",
            imperfect_subjunctive: "-ERE",
            present_infinitive: "-ERE",
            perfect: "-*",
            pluperfect: "-ERA",
            future_perfect: "-ERI",
            perfect_subjunctive: "-ERI",
            pluperfect_subjunctive: "-ISSE",
            perfect_infinitive: "-ISSE"
        };
        verb_middle = map_conj_2[kernel.tense];
    } else if (lexeme.properties.latin.family === "3") {
        var map_conj_3 = {
            present: "-I",
            imperfect: "-EBA",
            future: "-E",
            present_subjunctive: "-A",
            imperfect_subjunctive: "-ERE",
            present_infinitive: "-ERE",
            perfect: "-*",
            pluperfect: "-ERA",
            future_perfect: "-ERI",
            perfect_subjunctive: "-ERI",
            pluperfect_subjunctive: "-ISSE",
            perfect_infinitive: "-ISSE"
        };
        verb_middle = map_conj_3[kernel.tense];
    } else if (lexeme.properties.latin.family === "3i") {
        var map_conj_3i = {
            present: "-I",
            imperfect: "-IEBA",
            future: "-IE",
            present_subjunctive: "-IA",
            imperfect_subjunctive: "-ERE",
            present_infinitive: "-ERE",
            perfect: "-*",
            pluperfect: "-ERA",
            future_perfect: "-ERI",
            perfect_subjunctive: "-ERI",
            pluperfect_subjunctive: "-ISSE",
            perfect_infinitive: "-ISSE"
        };
        verb_middle = map_conj_3i[kernel.tense];
    } else if (lexeme.properties.latin.family === "4") {
        var map_conj_4 = {
            present: "-I",
            imperfect: "-IEBA",
            future: "-IE",
            present_subjunctive: "-IA",
            imperfect_subjunctive: "-IRE",
            present_infinitive: "-IRE",
            perfect: "-*",
            pluperfect: "-ERA",
            future_perfect: "-ERI",
            perfect_subjunctive: "-ERI",
            pluperfect_subjunctive: "-ISSE",
            perfect_infinitive: "-ISSE"
        };
        verb_middle = map_conj_4[kernel.tense];
    }
    if (kernel.voice === "passive" && kernel.tense === "present_infinitive"){
        if (lexeme.properties.latin.family === "1"){
            verb_middle = "-ARI"
        } else if (lexeme.properties.latin.family === "2"){
            verb_middle = "-ERI"
        } else if (lexeme.properties.latin.family === "3"){
            verb_middle = "-I"
        } else if (lexeme.properties.latin.family === "3i"){
            verb_middle = "-I"
        } else if (lexeme.properties.latin.family === "4"){
            verb_middle = "-IRI"
        }
    }

    return verb_middle;
}

function inflect_latin_verb_end (kernel) {
    var ending;

    if (kernel.tense === "perfect" && kernel.voice === "active") {
        if (kernel.person === "1s") {
            ending = "-I"
        } else if (kernel.person === "2s") {
            ending = "ISTI"
        } else if (kernel.person === "3s") {
            ending = "-IT"
        } else if (kernel.person === "1p") {
            ending = "-IMUS"
        } else if (kernel.person === "2p") {
            ending = "-ITIS"
        } else if (kernel.person === "3p") {
            ending = "-ERUNT"
        }
    } else if (kernel.tense === "present_infinitive") {
        ending = "";
    } else if (kernel.tense === "perfect_infinitive" && kernel.voice === "active") {
        ending = "";
    } else {
        if (kernel.voice === "active") {
            if (kernel.person === "1s") {
                ending = "-O/M"
            } else if (kernel.person === "2s") {
                ending = "-S"
            } else if (kernel.person === "3s") {
                ending = "-T"
            } else if (kernel.person === "1p") {
                ending = "-MUS"
            } else if (kernel.person === "2p") {
                ending = "-TIS"
            } else if (kernel.person === "3p") {
                ending = "-NT"
            }
        } else if (kernel.voice === "passive") {
            if (kernel.person === "1s") {
                ending = "-OR/R"
            } else if (kernel.person === "2s") {
                ending = "-RIS"
            } else if (kernel.person === "3s") {
                ending = "-TUR"
            } else if (kernel.person === "1p") {
                ending = "-MUR"
            } else if (kernel.person === "2p") {
                ending = "-MINI"
            } else if (kernel.person === "3p") {
                ending = "-NTUR"
            }
        }
    }
    return ending;
}

function inflect_agreement_marker (kernel) {
    var agreement_marker;
    if (kernel.clause_type !== "is") {
        if (kernel.subject_gender === "m") {
            if (kernel.number === "singular") {
                agreement_marker = "-US";
            } else if (kernel.number === "plural") {
                agreement_marker = "-I";
            }
        } else if (kernel.subject_gender === "f") {
            if (kernel.number === "singular") {
                agreement_marker = "-A";
            } else if (kernel.number === "plural") {
                agreement_marker = "-AE";
            }
        } else if (kernel.subject_gender === "n") {
            if (kernel.number === "singular") {
                agreement_marker = "-UM";
            } else if (kernel.number === "plural") {
                agreement_marker = "-A";
            }
        }
    } else if (kernel.clause_type === "is") {
        if (kernel.subject_gender === "m") {
            if (kernel.number === "singular") {
                agreement_marker = "-UM";
            } else if (kernel.number === "plural") {
                agreement_marker = "-OS";
            }
        } else if (kernel.subject_gender === "f") {
            if (kernel.number === "singular") {
                agreement_marker = "-AM";
            } else if (kernel.number === "plural") {
                agreement_marker = "-AS";
            }
        } else if (kernel.subject_gender === "n") {
            if (kernel.number === "singular") {
                agreement_marker = "-UM";
            } else if (kernel.number === "plural") {
                agreement_marker = "-A";
            }
        }
    }
    return agreement_marker;
}

function inflect_latin_helping_verb (kernel) {
    var tenses_with_sum = ["perfect", "pluperfect", "future_perfect", "perfect_subjunctive", "pluperfect_subjunctive", "perfect_infinitive"];
    if (tenses_with_sum.indexOf(kernel.tense) !== -1 && kernel.voice === "passive") {
        if (kernel.tense === "perfect") {
            if (kernel.person === "1s") {
                return "SUM";
            } else if (kernel.person === "2s") {
                return "ES";
            } else if (kernel.person === "3s") {
                return "EST";
            } else if (kernel.person === "1p") {
                return "SUMUS";
            } else if (kernel.person === "2p") {
                return "ESTIS";
            } else if (kernel.person === "3p") {
                return "SUNT";
            }
        } else if (kernel.tense === "pluperfect") {
            if (kernel.person === "1s") {
                return "ERAM";
            } else if (kernel.person === "2s") {
                return "ERAS";
            } else if (kernel.person === "3s") {
                return "ERAT";
            } else if (kernel.person === "1p") {
                return "ERAMUS";
            } else if (kernel.person === "2p") {
                return "ERATIS";
            } else if (kernel.person === "3p") {
                return "ERANT";
            }
        } else if (kernel.tense === "future_perfect") {
            if (kernel.person === "1s") {
                return "ERO";
            } else if (kernel.person === "2s") {
                return "ERIS";
            } else if (kernel.person === "3s") {
                return "ERIT";
            } else if (kernel.person === "1p") {
                return "ERIMUS";
            } else if (kernel.person === "2p") {
                return "ERITIS";
            } else if (kernel.person === "3p") {
                return "ERUNT";
            }
        } else if (kernel.tense === "perfect_subjunctive") {
            if (kernel.person === "1s") {
                return "SIM";
            } else if (kernel.person === "2s") {
                return "SIS";
            } else if (kernel.person === "3s") {
                return "SIT";
            } else if (kernel.person === "1p") {
                return "SIMUS";
            } else if (kernel.person === "2p") {
                return "SITIS";
            } else if (kernel.person === "3p") {
                return "SINT";
            }
        } else if (kernel.tense === "pluperfect_subjunctive") {
            if (kernel.person === "1s") {
                return "ESSEM";
            } else if (kernel.person === "2s") {
                return "ESSES";
            } else if (kernel.person === "3s") {
                return "ESSET";
            } else if (kernel.person === "1p") {
                return "ESSEMUS";
            } else if (kernel.person === "2p") {
                return "ESSETIS";
            } else if (kernel.person === "3p") {
                return "ESSENT";
            }
        } else if (kernel.tense === "perfect_infinitive") {
            return "ESSE";
        }
    } else {return null}
}

function inflect_subject_accusative_pronoun (kernel) {
    var sap;
    if (kernel.clause_type == "is" && kernel.implicitness == "implicit") {
        if (kernel.person === "1s") {
            sap = "ME "
        } else if (kernel.person === "2s") {
            sap = "TE "
        } else if (kernel.person === "3s") {
            sap = "EUM "
        } else if (kernel.person === "1p") {
            sap = "NOS "
        } else if (kernel.person === "2p") {
            sap = "VOS "
        } else if (kernel.person === "3p") {
            sap = "EOS "
        }
    } else {
        sap = ""
    }
    return sap;
}


function inflect_latin_verb (kernel, lexeme) {
    //todo Akiva's additions below
    var sap = inflect_subject_accusative_pronoun(kernel);

    var beginning = inflect_latin_verb_beginning(kernel, lexeme);
    var middle = inflect_latin_verb_middle(kernel, lexeme);
    var end = inflect_latin_verb_end(kernel);
    var agreement_marker = inflect_agreement_marker(kernel);
    var helping_verb = inflect_latin_helping_verb(kernel);

    if ((kernel.tense === "perfect" || kernel.tense === "pluperfect" || kernel.tense === "future_perfect"
        || kernel.tense === "perfect_subjunctive" || kernel.tense === "pluperfect_subjunctive"
        || kernel.tense === "perfect_infinitive") && kernel.voice === "passive") {
        if (sap === "") {
            return beginning + agreement_marker + ' ' + helping_verb;
        } else {
            return {'subject': sap, 'verb': beginning + agreement_marker + ' ' + helping_verb,
                'main_entry': 'verb'};
        }
    } else {
        if (sap === "") {
            return beginning + middle + end;
        } else {
            return {'subject': sap, 'verb': beginning + middle + end, 'main_entry': 'verb'};
        }
    }
}