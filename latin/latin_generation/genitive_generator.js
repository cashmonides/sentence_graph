
/*

step 1:
generate an input lexeme
FATHER

step 2:
we check module & latin_levels to see if a genitive is required
TRUE

step 3:
if so, we input the input lexeme into the function make_lexical_restrictions_for_genitive
outputs a dictionary
{
            animal: true,                   //yes father of the lion
            animate: true,                  //yes father of the sailor
            inanimate: false,               //no father of the sword
            place: false,                    //no father of the island
            rulership: true,               //yes father of the king
            kinship: false,                 //no father of the father  (although at advanced levels we should eventually allow such things as: the father of the brother of Zeus et sim.)
            human: true                     //yes father of the sailor
        }

step 4:
randomly choose a key with value = true
e.g. human

step 5:
pick a lexeme from allowed_lexemes where human = true
& all the false keys are false
SAILOR

step 6:
if no allowed lexemes, pick another key with value = true



*/


//the following can possibly just be encapsulated in a single dictionary
function make_lexical_restrictions_for_genitive (input_lexeme) {
    //first we deal with animals
    if (input_lexeme.properties.core.animal == true){
        return {
            animal: false,                   //no wolf of the lion
            animate: true,                  //yes wolf of the sailor
            inanimate: false,               //no wolf of the sword
            place: true,                    //yes wolf of the island
            rulership: true,               //yes wolf of the king
            kinship: true,                 //yes wolf of the father
            human: true                     //yes wolf of the sailor
        };
    }
    //secondly we will tackle all the different classes of humans
    // first among the humans are those humans who are neither rulers nor kin (sailor, farmer, slave)
    else if (input_lexeme.properties.core.human == true 
    && input_lexeme.properties.core.rulership == false 
    && input_lexeme.properties.core.kinship == false) {
        return {
            animal: false,                   //no sailor of the lion
            animate: false,                  //no sailor of the farmer
            inanimate: false,               //no sailor of the sword
            place: false,                    //no sailor of the island
            rulership: true,               //yes sailor of the king
            kinship: false,                 //no sailor of the father
            human: false                     //no sailor of the sailor
        };
    }
    //next we deal with rulers (king, queen, god, goddess, dominus, magister, etc.)
    else if (input_lexeme.properties.core.rulership == true) {
        return {
            animal: true,                   //yes queen of the lion
            animate: true,                  //yes queen of the sailor
            inanimate: false,               //no queen of the sword
            place: true,                    //yes queen of the island
            rulership: false,               //no queen of the king
            kinship: false,                 //no queen of the father
            human: true                     //yes queen of the sailor
        };
    }
    //next we deal with kinship terms (father, mother, brother, etc.)
    else if (input_lexeme.properties.core.kinship == true) {
        return {
            animal: true,                   //yes father of the lion
            animate: true,                  //yes father of the sailor
            inanimate: false,               //no father of the sword
            place: false,                    //no father of the island
            rulership: true,               //yes father of the king
            kinship: false,                 //no father of the father  (although at advanced levels we should eventually allow such things as: the father of the brother of Zeus et sim.)
            human: true                     //yes father of the sailor
        };
    }
    //now we deal with inanimate objects that are not places (sword, food, etc)
    else if (input_lexeme.properties.core.animate == false 
    && input_lexeme.properties.core.place == false) {
        return {
            animal: true,                   //yes sword of the lion
            animate: true,                  //yes sword of the sailor
            inanimate: false,               //no sword of the sword
            place: false,                    //no sword of the island
            rulership: true,               //yes sword of the king
            kinship: true,                 //yes sword of the father
            human: true                     //yes sword of the sailor
        };
    }
    //now we deal with places (island, kingdom)
    else if (input_lexeme.properties.core.place == true){
        return {
            animal: true,                   //yes island of the lion
            animate: true,                  //yes island of the sailor
            inanimate: false,               //no island of the sword
            place: false,                    //no island of the island
            rulership: true,               //yes island of the king
            kinship: true,                 //yes island of the father
            human: true                     //yes island of the sailor
        };
    }
    else {
        console.log("DEBUG GENITIVE: no if blocks triggered");
        return {
            animal: false,                   
            animate: false,                  
            inanimate: false,              
            place: false,                    
            rulership: false,               
            kinship: false,                 
            human: false                    
        };
    }
};


// We use our dsl to do the above in ten lines (including this comment).
// This does not count the necessary definitions, however.

var genitive_lexical_restictions = {
    '_animal': '_place or _human',
    '_human and (not _ruler)': '_ruler',
    '_ruler or _kin': '_animal or _plain_human',
    '_ruler': '_place',
    'not _animate': '_animate'
}