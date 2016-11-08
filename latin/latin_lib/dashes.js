var latin_replacement_dictionary_old = {

    // long a in 1st conjugation and all imperfects
    "Ā-M" : "AM",
    "Ā-T" : "AT",
    "Ā-NT" : "ANT",
    "Ā-R" : "AR",
    "Ā-NTUR" : "ANTUR",

    // long e in all situations
    "Ē$-Ō/M" : "AM",    //exception for ham and five eggs
    "Ē-Ō/M" : "EŌ",
    "Ē-M" : "EM",
    "Ē-T" : "ET",
    "Ē-NT" : "ENT",
    "Ē-OR/R" : "EOR",
    "Ē-NTUR" : "ENTUR",


    //i in ERI (perfect subjunctive 1st singular)
    "I%-Ō/M" : "IM",

    //i in ERI (perfect subjunctive & future perfect + NT)
    "I#-NT" : "INT",



    //in in 3rd conjugation & ABI
    "I-Ō/M" : "O",
    "I-NT" : "UNT",
    "I-OR/R" : "OR",
    "I-RIS" : "ERIS",
    "I-RE" : "ERE",


    //i in 3i conjugation
    "I@-NT" : "IUNT",
    "I@-OR/R" : "IOR",
    "I@-RIS" : "ERIS",
    "I@-RE" : "ERE",
    "I@-NTUR" : "IUNTUR",

    //long I in 4th conjugation
    "Ī-Ō/M" : "Ō",
    "Ī-T" : "IT",
    "Ī-OR/R" : "IOR",
    "Ī-NTUR" : "IUNTUR"

};


var metacharacter_replacement_dictionary_old = {
    "@" : "",
    "#" : "",
    "%" : "",
    "$" : "",
    "~" : ""
};

// function remove_dashes (input) {
//     for (var i in latin_replacement_dictionary) {
//         var find = latin_replacement_dictionary[i];
//         var replace = latin_replacement_dictionary
//         return input.replace(new RegExp(find, 'g'), replace);
//     }
// }


function remove_dashes (input) {
    var dict = latin_replacement_dictionary;
    for (var key in dict) {
        if (!dict.hasOwnProperty(key)) {
            continue;
        }
        return input.replace(new RegExp(key, 'g'), dict[key]);
    }
}


function remove_metacharacters_old (input) {
    var dict = metacharacter_replacement_dictionary;
    for (var key in dict) {
        if (!dict.hasOwnProperty(key)) {
            continue;
        }
        return input.replace(new RegExp(key, 'g'), dict[key]);
    }
}

function remove_stars (input) {
    var find = '*';
    return input.replace(new RegExp(find, 'g'), '');
}




