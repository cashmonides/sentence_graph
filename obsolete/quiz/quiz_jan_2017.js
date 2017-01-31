// @beehack

/////////////OLD VERSIONS BELOW/////////

// // @beehack
// // Quiz.prototype.set_spelling_bee_level_egg = function () {

// //     var output = {"etym_level": 10}
    
// //     this.game.set_level(output);
// //     global_beehack_new_level_set = true;
// //     global_beehack_level = output;
    
    
// //     this.reset_submodule_without_post();
// //     var div = el("spelling_level_header");
// //     div.innerHTML = "level=EGG";
// // }


// // @beehack
// Quiz.prototype.set_spelling_bee_level_larva = function () {
//     var output = {"etym_level": 40}
    
//     this.game.set_level(output);
//     global_beehack_new_level_set = true;
//     global_beehack_level = output;
//     this.reset_submodule_without_post();
//     var div = el("spelling_level_header");
//     div.innerHTML = "level=LARVA";
// }


// // @beehack
// Quiz.prototype.set_spelling_bee_level_pupa = function () {
//     var output = {"etym_level": 80}
    
//     this.game.set_level(output);
//     global_beehack_new_level_set = true;
//     global_beehack_level = output;
//     this.reset_submodule_without_post();
//     var div = el("spelling_level_header");
//     div.innerHTML = "level=PUPA";
// }

// // @beehack
// Quiz.prototype.set_spelling_bee_level_drone = function () {
//     var output = {"etym_level": 200}
    
//     this.game.set_level(output);
//     global_beehack_new_level_set = true;
//     global_beehack_level = output;
//     // this.next_question();
    
//     this.reset_submodule_without_post();
//     var div = el("spelling_level_header");
//     div.innerHTML = "level=DRONE";
// }


// // @beehack
// Quiz.prototype.set_spelling_bee_level_worker = function () {
//     var output = {"etym_level": 300}
    
//     this.game.set_level(output);
//     global_beehack_new_level_set = true;
//     global_beehack_level = output;
//     this.reset_submodule_without_post();
//     var div = el("spelling_level_header");
//     div.innerHTML = "level=WORKER";
// }


// // @beehack
// Quiz.prototype.set_spelling_bee_level_warrior = function () {
//     var output = {"etym_level": 400}
    
//     this.game.set_level(output);
//     global_beehack_new_level_set = true;
//     global_beehack_level = output;
//     this.reset_submodule_without_post();
//     var div = el("spelling_level_header");
//     div.innerHTML = "level=WARRIOR";
// }





// // @beehack
// Quiz.prototype.set_spelling_bee_level_queen = function () {
//     var output = {"etym_level": 470}
    
//     this.game.set_level(output);
//     global_beehack_new_level_set = true;
//     global_beehack_level = output;
//     this.reset_submodule_without_post();
//     var div = el("spelling_level_header");
//     div.innerHTML = "level=QUEEN";
// }

/*
Quiz.prototype.set_spelling_bee_level_larva = function () {
    console.log("BEEHACK789 setting spelling bee level to larva");
    console.log("BEEHACK789 counter should be set to: ", 20);
    
    
    // we alter globals
    
    // the old version get rid of
    global_beehack_new_level_set = true;
    
    // the new version to keep
    in_spelling_bee_training_mode = true;
    
    spelling_bee_training_counter = 20;
    
    
    // we call the method to change level in the game
    this.game.set_level_by_counter(spelling_bee_training_counter);
    // this.game.set_level_by_counter(21);
    
    // we reset the submodule with the new level
    // in order to clear the progress bar and generate a new question
    this.reset_submodule_without_post();
    var div = el("spelling_level_header");
    div.innerHTML = "level=LARVA";
}


Quiz.prototype.set_spelling_bee_level_pupa = function () {
    console.log("BEEHACK789 setting spelling bee level to pupa");
    console.log("BEEHACK789 counter should be set to: ", 30);
    
    
    // we alter globals
    
    // the old version get rid of
    global_beehack_new_level_set = true;
    
    // the new version to keep
    in_spelling_bee_training_mode = true;
    
    spelling_bee_training_counter = 30;
    
    
    // we call the method to change level in the game
    this.game.set_level_by_counter(spelling_bee_training_counter);
    
    
    // we reset the submodule with the new level
    // in order to clear the progress bar and generate a new question
    this.reset_submodule_without_post();
    var div = el("spelling_level_header");
    div.innerHTML = "level=PUPA";
}


Quiz.prototype.set_spelling_bee_level_drone = function () {
    console.log("BEEHACK789 setting spelling bee level to drone");
    console.log("BEEHACK789 counter should be set to: ", 40);
    
    
    // we alter globals
    
    // the old version get rid of
    global_beehack_new_level_set = true;
    
    // the new version to keep
    in_spelling_bee_training_mode = true;
    
    spelling_bee_training_counter = 40;
    
    
    // we call the method to change level in the game
    this.game.set_level_by_counter(spelling_bee_training_counter);
    
    
    // we reset the submodule with the new level
    // in order to clear the progress bar and generate a new question
    this.reset_submodule_without_post();
    var div = el("spelling_level_header");
    div.innerHTML = "level=DRONE";
}


Quiz.prototype.set_spelling_bee_level_worker = function () {
    console.log("BEEHACK789 setting spelling bee level to worker");
    console.log("BEEHACK789 counter should be set to: ", 41);
    
    
    // we alter globals
    
    // the old version get rid of
    global_beehack_new_level_set = true;
    
    // the new version to keep
    in_spelling_bee_training_mode = true;
    
    spelling_bee_training_counter = 41;
    
    
    // we call the method to change level in the game
    this.game.set_level_by_counter(spelling_bee_training_counter);
    
    
    // we reset the submodule with the new level
    // in order to clear the progress bar and generate a new question
    this.reset_submodule_without_post();
    var div = el("spelling_level_header");
    div.innerHTML = "level=WORKER";
}


Quiz.prototype.set_spelling_bee_level_warrior = function () {
    console.log("BEEHACK789 setting spelling bee level to warrior");
    console.log("BEEHACK789 counter should be set to: ", 42);
    
    
    // we alter globals
    
    // the old version get rid of
    global_beehack_new_level_set = true;
    
    // the new version to keep
    in_spelling_bee_training_mode = true;
    
    spelling_bee_training_counter = 42;
    
    
    // we call the method to change level in the game
    this.game.set_level_by_counter(spelling_bee_training_counter);
    
    
    // we reset the submodule with the new level
    // in order to clear the progress bar and generate a new question
    this.reset_submodule_without_post();
    var div = el("spelling_level_header");
    div.innerHTML = "level=WARRIOR";
}


Quiz.prototype.set_spelling_bee_level_queen = function () {
    console.log("BEEHACK789 setting spelling bee level to warrior");
    console.log("BEEHACK789 counter should be set to: ", 43);
    
    
    // we alter globals
    
    // the old version get rid of
    global_beehack_new_level_set = true;
    
    // the new version to keep
    in_spelling_bee_training_mode = true;
    
    spelling_bee_training_counter = 43;
    
    
    // we call the method to change level in the game
    this.game.set_level_by_counter(spelling_bee_training_counter);
    
    
    // we reset the submodule with the new level
    // in order to clear the progress bar and generate a new question
    this.reset_submodule_without_post();
    var div = el("spelling_level_header");
    div.innerHTML = "level=QUEEN";
}
*/

// // @beehack
// Quiz.prototype.set_spelling_bee_level = function (level) {
//     // level = 66666;
//     this.user.persist_spelling_bee_level(level);
// }

// var set_persistent_spelling_bee_level = function (level) {
//     console.log("BEEHACK123 quiz.set_persistent called, level = ", level);
//     global_beehack_level_persistent = level;
// }






///////scorched earth below


/////// HINT #1

// Quiz.prototype.initialize_spelling_hint_subfunction_bold = function () {
//     el('spelling_hint_button').onclick = function () {
//         set_font_weight_of_class("embedded_root", "900");
//         set_case_of_class("embedded_root", "uppercase");
//     };
// }


// Quiz.prototype.initialize_spelling_hint_subfunction_bold_old = function (n) {
//     el('spelling_hint_button' + n).onclick = function () {
//         set_font_weight_of_class("embedded_root", "900");
//         set_case_of_class("embedded_root", "uppercase");
//     };
// }


/////// HINT #2

// Quiz.prototype.initialize_spelling_hint_subfunction_etym_cheat_sheet_old = function (n) {
    
    
    
//     var name = "etym_cheat_sheet"
//     var etym_cheat = this.game.etymology_cheat_sheet;
    
    
//     // @beehack
//     // the mystery: <span ... etc. occurs on the html page
//     // below is the short term removal
//     // ideally we want the words to be able to be made bold in the cheat sheet as well

    
//     var new_list = [];
//     for (var i = 0; i < etym_cheat.length; i++) {
//         var sublist = etym_cheat[i];
        
//         var new_sublist = [];
        
        
//         for (var j = 0; j < sublist.length; j++) {
//             var item = sublist[j].replace("<span class=\"embedded_root\">", "");
//             item = item.replace("</span>", "");
//             new_sublist.push(item);
//         }
//         new_list.push(new_sublist);
//     } 
    
    
//     etym_cheat = new_list;
    
//     // console.log("this.game.etym_cheat_sheet stringified = ", 
//     //     JSON.stringify(etym_cheat));
        
    
//     //end beehack
        
    
    
    
//     back.log("this.game.etym_cheat_sheet stringified = ", 
//         JSON.stringify(etym_cheat));
    
//     var outer_div = el(name + "_div");
//     // create_cheat_sheet_table(outer_div, name,
//     // null, null, etym_cheat, 2);
//     // el('spelling_hint_button' + n).onclick = function () {quiz.toggle_element(name)};
//     el('spelling_hint_button' + n).onclick = function () {
//         set_display(el(name)), 'initial'};
// }



/////// HINT #3
// Quiz.prototype.initialize_spelling_hint_subfunction_underscore_old = function (n) {
//     back.log("spelling_hint_subfunction_underscore entered");
//     console.log("GRIMES spelling_hint_subfunction_underscore entered");
    
//     var div_to_inspect = el('spelling_hint_box');
    
//     // var spelling_hint_string = this.game.spelling_hint;
    
    
    
//     var spelling_hint_string = this.game.spelling_hint;
    
//     console.log("GRIMES spelling_hint_string = ", spelling_hint_string);
    
    
    
//     back.log("underscore_hint_output = ", spelling_hint_string);
//     console.log("GRIMES underscore_hint_output = ", spelling_hint_string);
    
//     var div_string = 'spelling_hint_box'
//     var div_name = el('spelling_hint_box');
//     div_name.innerHTML = spelling_hint_string;
    
//     el('spelling_hint_button' + n).onclick = function () {quiz.toggle_element(div_string)};
// };    
  
//////// HINT #4

// Quiz.prototype.initialize_spelling_hint_subfunction_first_letter = function (n) {
//     console.log("GRIMES first letter function STILL EMPTY");
// }