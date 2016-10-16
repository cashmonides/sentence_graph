/*
some conventions:
Ē$ = the long E in 3, 3i, 4 which turns to -AM in future 1sg
Ē = the long E in 2nd conjugation

I@ = strong short I in 3i (strong against o and nt but not against ris and re)
    "I@-NT" : "IUNT",
    "I@-OR/R" : "IOR",
    "I@-RIS" : "ERIS",
    "I@-RE" : "ERE",
    "I@-NTUR" : "IUNTUR",
    
I# = short I in pp3 that doesn't go to -unt
    "I#-NT" : "INT",

I% = short I in perfect subjunctive that doesn't get swallowed by O
    "I%-Ō/M" : "IM",

    
*/


var latin_replacement_dictionary = {

    // applies in all situations
    "I-RIS": "ERIS",
    "I-RE": "ERE",


    // long a in 1st conjugation and all imperfects
    "Ā-M" : "AM",
    "Ā-T" : "AT",
    "Ā-NT" : "ANT",
    "Ā-R" : "AR",
    "Ā-NTUR" : "ANTUR",

    // long e in all situations
    "Ē$-Ō/M" : "AM",    //exception for 3/3i/4 ham and five eggs
    "Ē-Ō/M" : "EŌ",
    "Ē-M" : "EM",
    "Ē-T" : "ET",
    "Ē-NT" : "ENT",
    "Ē-OR/R" : "EOR",
    "Ē-NTUR" : "ENTUR",


    //i in ERI (perfect subjunctive 1st singular)
    "I%-Ō/M" : "IM",
    "I%-NT" : "INT",

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

    //long I in 4th conjugatio
    "Ī-Ō/M" : "Ō",
    "Ī-T" : "IT",
    "Ī-OR/R" : "IOR",
    "Ī-NT" : "IUNT",
    "Ī-NTUR" : "IUNTUR",
    
    //all other dashes
    "-": ""
};


var metacharacter_replacement_dictionary = {
    "@" : "",
    "#" : "",
    "%" : "",
    "$" : ""
};

// function remove_dashes (input) {
//     for (var i in latin_replacement_dictionary) {
//         var find = latin_replacement_dictionary[i];
//         var replace = latin_replacement_dictionary
//         return input.replace(new RegExp(find, 'g'), replace);
//     }
// }


var remove_dashes_and_metacharacters = function (input) {
    return remove_metacharacters(remove_dashes(input));
    // console.log("remove_dashes_disabled_until_fixed");
    // return input;
}

var escape_string = function (string) {
    return string.replace(/\W/g, function (i) {return '\\' + i})
}

var tr = function (input, dict) {
    for (var key in dict) {
        input = input.replace(new RegExp(escape_string(key), 'gi'), function (i) {
            if (i.toLowerCase() === i) {
                return dict[key].toLowerCase();
            } else if (i.toUpperCase() === i) {
                return dict[key].toUpperCase();
            } else {
                throw i + ' is mixed case.';
            }
        });
    }
    return input;
}

var remove_dashes = function (input) {
    return tr(input, latin_replacement_dictionary);
}


var remove_metacharacters = function  (input) {
    return tr(input, metacharacter_replacement_dictionary);
}


/* not implemented yet
function remove_stars (input) {
    var find = '*';
    return input.replace(new RegExp(find, 'g'), '');
}
*/




