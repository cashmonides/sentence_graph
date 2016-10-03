/*
// damage control 1 begin:
//we set an arbitrary number of dummy lexemes for the cheat sheet
// later we'll make this a parameter set by each module
var number_of_dummy_lexemes_hack = 5;
// hackily, we store the available lexemes as a global variable and add to is as we go along
var available_lexemes_hack;
//chosen_lexemes_as_global_variable_hack will be the actual used lexemes
var chosen_lexemes_as_global_variable_hack;
// damage control 1 end
*/


/*
    
    //damage control 2 begin:
    //used to live in kckmode.next_question
    console.log("VOCAB CHEAT SHEET LOG test of get current module = ", get_current_module(this.level.kck_level).lexicon);
    //below is a hack, it adds a bunch of random lexemes from the full lexicon to pad out the test of a vocab cheat sheet
    available_lexemes_hack = get_current_module(this.level.kck_level).lexicon;
    console.log("VOCAB CHEAT SHEET LOG in next_question available_lexemes_hack = ", available_lexemes_hack);
    //damage control 2 end


    // damage control 3 begin:
    console.log("VOCAB CHEAT SHEET LOG about to make vocab_cheat_sheet = ");
    // below is the super hacky version that works but just gives lexeme objects:
    var kck_cheat_sheet = chosen_lexemes_as_global_variable_hack;
    //below is an attempt at JSON stringify
    // var kck_cheat_sheet = JSON.stringify(chosen_lexemes_as_global_variable_hack);
    var hack_output = hackily_convert_kck_lexeme_list_to_real_lexeme_list(kck_cheat_sheet);
    this.cheat_sheet = hack_output;
    console.log("VOCAB CHEAT SHEET LOG finished making kck_cheat_sheet with this.cheat_sheet = ", this.cheat_sheet);
    // damage control 3 end
    
    */


/*
//damage control 4 begin:
// used to live in kernel.prototype.choose_random_lexemes
console.log("VOCAB CHEAT SHEET LOG chosen_lexemes", chosen_lexemes);
chosen_lexemes_as_global_variable_hack = chosen_lexemes;
console.log("VOCAB CHEAT SHEET LOG chosen_lexemes_as_global_variable_hack", chosen_lexemes_as_global_variable_hack);
//damage control 4 end
*/



/*

// damage control 5 begin:



var hackily_convert_kck_lexeme_list_to_real_lexeme_list = function(kck_lexeme_list_asJSON) {
    
    console.log("DAMAGE DEBUG 1-1-16 about to insert");
    console.log("Damage control DEBUG 1-1-16 full_lexemes_hack in kckmode = ", full_lexemes_hack);
    // console.log("Damage control DEBUG 1-1-16 Object.keys(full_lexemes_hack) in kckmode = ", Object.keys(full_lexemes_hack));
    // console.log("Damage control DEBUG 1-1-16 Object.keys(full_lexemes_hack.verb) in kckmode = ", Object.keys(full_lexemes_hack.verb));
    // console.log("Damage control DEBUG 1-1-16 Object.keys(full_lexemes_hack.verb.english) in kckmode = ", Object.keys(full_lexemes_hack.verb.english));
    
    
    // for (var lexeme in full_lexemes_hack) {
    //     if (lexeme == 'conjunction') {
    //         continue;
    //     } else {
    //         for (var entry in lexeme) {
    //             var dummy_name_hack = entry.get_name();
    //             console.log("DESPERATE LOOP dummy_name_hack = ", dummy_name_hack);
    //         }
    //     }
            
    //     }
        
    // }
    
    // console.log("Damage control DEBUG 666 JSON.stringifyfull_lexemes_hack in kckmode = ", JSON.stringify(full_lexemes_hack));
    
    
    
    console.log("DEBUG 9-30-16 kck_lexeme_list_stringified", kck_lexeme_list_asJSON);
    var keys = Object.keys(kck_lexeme_list_asJSON);
    console.log("DEBUG 9-30-16 keys = ", keys);
   

    var kck_vocab_cheat_sheet_list_hack = [];

    console.log("DEBUG 9-30-16 in hackily convert available_lexemes_hack = ", available_lexemes_hack);

    for (var i=0; i < number_of_dummy_lexemes_hack; i++) {
        var randomly_chosen_lexeme = random_choice(available_lexemes_hack);
        console.log("DEBUG 9-30-16 randomly_chosen_lexeme = ", randomly_chosen_lexeme);
        keys.push(randomly_chosen_lexeme);
        console.log("DEBUG 9-30-16 keys = ", keys);
        console.log("DEBUG 9-30-16 kck_vocab_cheat_sheet_list_hack = ", kck_vocab_cheat_sheet_list_hack);
    }
    
    // for (var i = 0; i < keys.length; i++) {
    //     kck_vocab_cheat_sheet_list_hack.push(keys[i]);
    // }

    
    

    for (var i = 0; i < keys.length; i++) {
        var english_name_hack = keys[i];
        console.log("DEBUG 9-30-16 english_name_hack", english_name_hack);
        if (keys[i].startsWith("c_")) {
            var lexeme_hack = conjunction_library[english_name_hack];
            var latin_form_hack = lexeme_hack.latin_form;
            latin_form_hack = latin_form_hack.toUpperCase();
            var english_form_hack = lexeme_hack.english_form;
            console.log("DEBUG 9-30 lexeme_hack = ", lexeme_hack);
            console.log("DEBUG 9-30 latin_form_hack = ", latin_form_hack);
            var dictionary_output_hack = latin_form_hack + ' ' + english_form_hack;
            kck_vocab_cheat_sheet_list_hack.push(dictionary_output_hack);
        } else {
            var lexeme_hack = testing_lexemes.verb[english_name_hack];
            var latin_form_hack = lexeme_hack.latin.citation_form;
            latin_form_hack = latin_form_hack.toUpperCase();
            console.log("DEBUG 9-30 lexeme_hack = ", lexeme_hack);
            console.log("DEBUG 9-30 latin_form_hack = ", latin_form_hack);
            var dictionary_output_hack = latin_form_hack + ' ' + keys[i];
            kck_vocab_cheat_sheet_list_hack.push(dictionary_output_hack);
        }
    }
   console.log("DEBUG 9-30-16 kck_vocab_cheat_sheet_list_hack", kck_vocab_cheat_sheet_list_hack);
   kck_vocab_cheat_sheet_list_hack = remove_duplicates(kck_vocab_cheat_sheet_list_hack);
   kck_vocab_cheat_sheet_list_hack = kck_vocab_cheat_sheet_list_hack.sort();
   return kck_vocab_cheat_sheet_list_hack;
}


//damage control 5 end

*/


/*
stashing lexicon in kck_levels
//damage control begin:
        //this was added as a simple way to test Akiva's vocab cheat sheet
        'lexicon': [ 'eat', 'love', 'attack', 'carry', 'fear', 'see', 'scare']
        //  //damage control end
*/



/* a pathetic attempt to steal chosen lexemes from sentence.js

//damage control begin:
//damage control begin:
//sentence produces a full set of lexemes (both the right answers and the dummy ones)
// it's called chosen_lexemes here
// in kck chosen_lexemes is just the right answers (i.e. the ones used in the sentence)
// in kck they're produced as a map with attack: true, command: true
// here in sentence they are kcklexeme objects
var full_lexemes_hack;

//damage control end




    console.log("Damage control DEBUG 1-1-16 chosen_lexemes in sentence = ", chosen_lexemes);
    full_lexemes_hack = chosen_lexemes;
    console.log("Damage control DEBUG 1-1-16 full_lexemes_hack in sentence = ", full_lexemes_hack);
    console.log("Damage control DEBUG 1-1-16 allowed_dummies in sentence = ", allowed_dummies);
    
    //damage control end

*/





/* ALL GARBAGE BELOW


//damage control begin:
// Akiva makes a global variable to hold chosen lexemes
// i.e. chosen_lexemes is what is produced by the kernel generation process




// damage control end






//damage control begin:
// Akiva added this global variable to handle the kck_vocab_cheat_sheet

// argument should be a function that takes a real argument (something like master_lexeme_list)
// for hacking purposes we are going to use a global variable 
// gradually we'll upgrade it to a real argument and function

// var kck_cheat_sheet = chosen_lexemes_as_global_variable_hack;

    /*
    function (chosen_lexemes_as_global_variable_hack) {
    
    // damage control begin
    console.log("DEBUG 9-30-16 in kck_mode.js chosen_lexemes_as_global_variable_hack", chosen_lexemes_as_global_variable_hack);
    // damage control end
    
    

    
    
    // damage control begin
    console.log("DEBUG 9-30-16 in kck_mode.js chosen_lexemes_as_global_variable_hack", chosen_lexemes_as_global_variable_hack);
    // damage control end
    
    
    
    // We put our lexemes in groups corresponding to their part of speech.
    var lexemes_by_part_of_speech = separate_and_sort_by(
        master_lexeme_list, function (x) {
            return x.properties.core.part_of_speech});
    // We sort each group.
    var lexemes_sorted_by_root = lexemes_by_part_of_speech.map(
        function (x) {return quick_sort(x, sort_by_func(get_pure_latin_root))});
    // We push the part of speach to each item (as a header).
    lexemes_sorted_by_root.forEach(function (x) {
        x.unshift(x[0].properties.core.part_of_speech + 's')});
    return concat_arrays(lexemes_sorted_by_root).map(function (x) {
        if (typeof x === 'object') {
            return [x.properties.latin.root + ' (' + x.properties.latin.family + ')', x.properties.english.root]
        } else {
            return x
        }
    });
    
}
*/

//damage control end






//damage control begin:
// Akiva added this global variable to handle the kck_vocab_cheat_sheet

// argument should be a real argument (master_lexeme_list)
// for hacking purposes we are going to use a global variable 
// gradually we'll upgrade it to a real argument

// var kck_cheat_sheet_first_attempt = function (chosen_lexemes_as_global_variable_hack) {
    
//     // damage control begin
//     console.log("DEBUG 9-30-16 in kck_mode.js chosen_lexemes_as_global_variable_hack", chosen_lexemes_as_global_variable_hack);
//     // damage control end
    
    
    
//     // We put our lexemes in groups corresponding to their part of speech.
//     var lexemes_by_part_of_speech = separate_and_sort_by(
//         master_lexeme_list, function (x) {
//             return x.properties.core.part_of_speech});
//     // We sort each group.
//     var lexemes_sorted_by_root = lexemes_by_part_of_speech.map(
//         function (x) {return quick_sort(x, sort_by_func(get_pure_latin_root))});
//     // We push the part of speach to each item (as a header).
//     lexemes_sorted_by_root.forEach(function (x) {
//         x.unshift(x[0].properties.core.part_of_speech + 's')});
//     return concat_arrays(lexemes_sorted_by_root).map(function (x) {
//         if (typeof x === 'object') {
//             return [x.properties.latin.root + ' (' + x.properties.latin.family + ')', x.properties.english.root]
//         } else {
//             return x
//         }
//     });
// }


//damage control end


/*
// below is the more advanced version not used
//modified for the different lexicon format of kck
// no properties
var kck_cheat_sheet = function (chosen_lexemes_as_global_variable_hack) {
    
    console.log("DEBUG 9-30-16 checkpoint #1");
    
    
    // We put our lexemes in groups corresponding to their part of speech.
    var lexemes_by_part_of_speech = separate_and_sort_by(
        chosen_lexemes_as_global_variable_hack, function (x) {
            return x.core_properties.part_of_speech});
    // We sort each group.
    var lexemes_sorted_by_root = lexemes_by_part_of_speech.map(
        function (x) {return quick_sort(x, sort_by_func(get_pure_latin_root))});
    // We push the part of speach to each item (as a header).
    lexemes_sorted_by_root.forEach(function (x) {
        x.unshift(x[0].core_properties.part_of_speech + 's')});
    return concat_arrays(lexemes_sorted_by_root).map(function (x) {
        if (typeof x === 'object') {
            return [x.latin.roots.root_2 + ' (' + x.latin.conjugation + ')', x.core_properties.name]
        } else {
            return x
        }
    });
}



All garbage above
*/