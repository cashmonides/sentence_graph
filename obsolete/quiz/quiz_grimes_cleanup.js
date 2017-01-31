// some weird hint stuff that said it should be eliminated

// @cleanup, below should be eliminated
//a more advanced version being developed
// goals:
// toggle, not just append
// catch errors
// make sure we're not giving the actual word itself
// make sure we're not producing multiple variations that give away the word
// e.g. pod_____y     & __iatry
// Quiz.prototype.initialize_spelling_hint = function () {
    
//     // todo see if something like this simple error catcher can work
//     //(some games won't have a spelling hint because they're not spelling mode)
//     // if (!this.game.make_spelling_hint()) {
//     //     console.log("PROBLEM: no spelling hint for this game");
//     //     return;
//     // } 
    
    
//     if (!this.module.submodule.spelling_hint_penalty) {
//         // todo when spelling hint penalty is implemented, build a block of code here
//         // bug.log("no spelling hint penalty specified");
//     } else {
//       if (this.module.submodule.spelling_hint_penalty != 0) {
//         if (this.game.chosen_question_type == "root_definition_to_root") {
//             alert("At this advanced level hints will cost you one point.");
//             this.decrement_score_via_hint();
//             }
//         }  
//     }
    
    
    
    
    
    
//     back.log("initialize_spelling_hint entered");
    
//     var div_to_inspect = el('spelling_hint_box');
    
//     var spelling_hint_string = this.game.spelling_hint;
    
    
//     console.log("[quiz.initialize_spelling_hint] hint_output = ", spelling_hint_string);
    
//     //we first test A SIMPLE VERSION
//     // SUMMARY: works but doesn't remove old hint, doesn't give new hint
//     // simple because it doesn't use make, it just alters a pre-existing div
//     // does this work??
//     // yes this works but sometimes (seemingly more than usual)
//     // it produces the full word
//     var div_string = 'spelling_hint_box'
//     var div_name = el('spelling_hint_box');
//     div_name.innerHTML = spelling_hint_string;
//     //works
//     // el('spelling_hint_button').onclick = function () {quiz.toggle_element('spelling_hint_div2')};
//     // quiz.toggle_element takes as its argument a string, not the div
//     el('spelling_hint_button').onclick = function () {quiz.toggle_element(div_string)};
// };    
  
  
// @GRIMES 
// we want to keep track of how many times they've hit the button
// and do certain behaviors if we hit the threshold
// we also want to keep track of how many alerts they've seen
// so we don't show alerts annoyingly
    // decrement score by some number
    // give alert or not
    // make letters bold
    // show etym cheat sheet
    // show underscore hint
// something like this
    // global_hint_counter++
    // consult a map, give alert if under threshold
    // consult a map, matching global_hint_counter (int) to a function
        // make embedded roots bold
        // (example sentence - unimplemented)
        // show etym cheat sheet
        // show underscore hint
// Quiz.prototype.initialize_spelling_hint_master_oldest = function () {
    
//     // todo see if something like this simple error catcher can work
//     //(some games won't have a spelling hint because they're not spelling mode)
//     // if (!this.game.make_spelling_hint()) {
//     //     console.log("PROBLEM: no spelling hint for this game");
//     //     return;
//     // } 
    
//     var hint_penalty_to_inflict;
    
    
//     global_hint_counter++;
//     global_hint_alert_counter++;
    
//     if (!this.module.submodule.spelling_hint_penalty) {
//         // todo when spelling hint penalty is implemented, build a block of code here
//         bug.log("no spelling hint penalty specified, penalty set to 1");
//         console.log("GRIMES no spelling hint penalty specified, penalty set to 1");
//         hint_penalty_to_inflict = 1;
//     } else {
//         hint_penalty_to_inflict = this.module.submodule.spelling_hint_penalty;
//         console.log("GRIMES hint_penalty set to module parameter = ", hint_penalty_to_inflict);
//     }
    
    
//     // handle the alert behavior
//     if (global_hint_alert_counter < 5) {
        
//         alert("At this advanced level a hint will cost you one point.");
//     }
    
    
//     if (this.game.chosen_question_type == "root_definition_to_root") {
        
//     }
    
//     // uncomment when implemented
//     // decrement the score (unimplemented for now)
//     // this.decrement_score_via_hint(penalty_to_inflict);
    
    
//     // maybe move these into the if blocks below
//     this.initialize_spelling_hint_subfunction_bold_roots();

//     this.initialize_spelling_hint_subfunction_etym_cheat_sheet();
    
//     this.initialize_spelling_hint_subfunction_underscore();

    
//     // handle the hint behavior
//     if (global_hint_counter === 1) {
//         // PSEUDOCODE: fade out hint_button_1, fade in hint_button_2
//     } else if (global_hint_counter === 2) {
//         // PSEUDOCODE: fade out hint_button_2, fade in hint_button_3
//     } else if (global_hint_counter === 3) {
//         // PSEUDOCODE: fade out hint_button_3
//     } else {
//         console.log("GRIMES global_hint_counter > 3, no action");
//     }
// }

// Quiz.prototype.initialize_spelling_hint_master_old = function (n) {
    
//     // todo see if something like this simple error catcher can work
//     //(some games won't have a spelling hint because they're not spelling mode)
//     // if (!this.game.make_spelling_hint()) {
//     //     console.log("PROBLEM: no spelling hint for this game");
//     //     return;
//     // } 
    
    
    
//     console.log("GRIMES this.game.spelling_hint = ", this.game.spelling_hint);
    
    
//     var hint_penalty_to_inflict;
    
    
//     global_hint_counter++;
//     global_hint_alert_counter++;
    
//     if (!this.module.submodule.spelling_hint_penalty) {
//         // todo when spelling hint penalty is implemented, build a block of code here
//         bug.log("no spelling hint penalty specified, penalty set to 1");
//         console.log("GRIMES no spelling hint penalty specified, penalty set to 1");
//         hint_penalty_to_inflict = 1;
//     } else {
//         hint_penalty_to_inflict = this.module.submodule.spelling_hint_penalty;
//         console.log("GRIMES hint_penalty set to module parameter = ", hint_penalty_to_inflict);
//     }
    
    
//     // handle the alert behavior
//     // todo alerts disabled for testing, implement when done testing
//     if (global_hint_alert_counter < 0) {
        
//         alert("At this advanced level a hint will cost you one point.");
//     }
    
    
    
    
//     // uncomment when implemented
//     // decrement the score (unimplemented for now)
//     // this.decrement_score_via_hint(penalty_to_inflict);
    
    
//     // maybe move these into the if blocks below
//     // this.initialize_spelling_hint_subfunction_bold_roots();
//     // this.initialize_spelling_hint_subfunction_underscore();
//     // this.initialize_spelling_hint_subfunction_etym_cheat_sheet();
    
    
    
//     // handle the hint behavior
    
//     console.log("ENTERING GRIMES1");
    
//     console.log("GRIMES1 this.game.chosen_question_type = ", this.game.chosen_question_type);
//     console.log("GRIMES1 number of button pressed = ", n);
    
//     if (this.game.chosen_question_type === "root_definition_to_root") {
//         if (n === 1) {
//             console.log("GRIMES1, root n = 1");
//             // PSEUDOCODE: make etym cheat sheet
//             this.initialize_spelling_hint_subfunction_etym_cheat_sheet(1);
//         } else if (n === 2) {
//             console.log("GRIMES1, root n = 2");
//             // PSEUDOCODE: first letter hint
//             // todo underscore and first letter are presumabley the same, so rename
//             // this doesn't seem to work
//             this.initialize_spelling_hint_subfunction_underscore(2);
//         } else if (n === 3) {
//             console.log("GRIMES1, root n = 3");
//             // todo add some kind of super hint like, bolding the relevant roots in the cheat sheet
//             console.log("GRIMES no hint at this level")
//         } else {
//             console.log("GRIMES global_hint_counter > 3, no action");
//         }
//     } else if (this.game.chosen_question_type === "word_definition_to_word") {
//         if (n === 1) {
//             console.log("GRIMES1, word n = 1");
//             // PSEUDOCODE: bold words
//             this.initialize_spelling_hint_subfunction_bold(1);
//         } else if (n === 2) {
//             console.log("GRIMES1, word n = 2");
//             // PSEUDOCODE: etym cheat sheet
//             this.initialize_spelling_hint_subfunction_etym_cheat_sheet(2);
//         } else if (n === 3) {
//             console.log("GRIMES1, word n = 3");
//             // PSEUDOCODE: underscore
//             this.initialize_spelling_hint_subfunction_underscore(3);
//         } else {
//             console.log("GRIMES global_hint_counter > 3, no action");
//         }
//     } else {
//         console.log("PROBLEM neither root nor word, hopefully etym, setting up default (etym cheat sheet)")
//         if (n === 1) {
//             // PSEUDOCODE: bold words
//             this.initialize_spelling_hint_subfunction_bold();
//         } else if (n === 2) {
//             // PSEUDOCODE: etym cheat sheet
//             this.initialize_spelling_hint_subfunction_etym_cheat_sheet();
//         } else if (n === 3) {
//             // PSEUDOCODE: underscore
//         } else {
//             console.log("GRIMES global_hint_counter > 3, no action");
//         }
//     }
    
    
    
    
    

    
//     // handle the button behavior
//     if (n === 1) {
//         // PSEUDOCODE: fade out hint_button_1, fade in hint_button_2
//     } else if (n === 2) {
//         // PSEUDOCODE: fade out hint_button_2, fade in hint_button_3
//     } else if (n === 3) {
//         // PSEUDOCODE: fade out hint_button_3
//     } else {
//         console.log("GRIMES global_hint_counter > 3, no action");
//     }
// }