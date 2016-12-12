 /*
    //CLEANUP this horrible pollution eventually
    // morphology_dictionary_traverser_main(['latin verb morphology middle', 'imperfect indicative active', 'conjugation 1', '3s', '3p']);
    // morphology_dictionary_traverser_main(['latin verb morphology end', 'present indicative active', 'imperfect indicative active', 'conjugation 1', '3s', '3p']);
    
    
    var shuffle_morphological_elements = false;
    remove_dashes_in_morphology_mode = true;
    
    var test_argument_for_morphology = ['latin verb morphology beginning', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p']
    
    var test_output_of_morphology = {};
    
    test_output_of_morphology.beginning = morphology_dictionary_traverser_main(['latin verb morphology beginning', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p'])
    
    test_output_of_morphology.middle = morphology_dictionary_traverser_main(['latin verb morphology middle', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p']);
    
    test_output_of_morphology.ending = morphology_dictionary_traverser_main(['latin verb morphology ending', 'present indicative active',
    'imperfect indicative active', 'future indicative active', 'present indicative passive', 
    'imperfect indicative passive', 'future indicative passive', 'perfect indicative active',
    'present subjunctive active', 'present subjunctive passive', 'imperfect subjunctive active', 'imperfect subjunctive passive',
    'conjugation 1', 'conjugation 2', 'conjugation 3', 'conjugation 3i', 'conjugation 4', 
    '1s', '2s', '3s', '1p', '2p', '3p']);
    
    
    
    var stringified_beginning = JSON.stringify(test_output_of_morphology.beginning);
    var stringified_middle = JSON.stringify(test_output_of_morphology.middle);
    var stringified_ending = JSON.stringify(test_output_of_morphology.ending);
    
    // console.log("ROOT LOOP stringified_beginning = ", stringified_beginning);
    
    var final_root_output = convert_root_items_to_actual_forms(test_output_of_morphology.beginning, ['love', 'eat', 'rule'], 'latin');
    console.log("ROOT LOOP final_root_output = ", final_root_output);
    final_root_output = JSON.stringify(final_root_output);
    
    if (shuffle_morphological_elements) {
        final_root_output = shuffle(final_root_output);
        stringified_beginning = shuffle(stringified_beginning);
        stringified_middle = shuffle(stringified_middle);
        stringified_ending = shuffle(stringified_ending);
    }
    
    if (remove_dashes_in_morphology_mode) {
        final_root_output = remove_dashes_and_metacharacters(final_root_output);
        stringified_beginning = remove_dashes_and_metacharacters(stringified_beginning);
        stringified_middle = remove_dashes_and_metacharacters(stringified_middle);
        stringified_ending = remove_dashes_and_metacharacters(stringified_ending);
    }
    
    
    //the button approach begin
    this.make_morphology_buttons(final_root_output, 'beginning');
    this.make_morphology_buttons(stringified_middle, 'middle');
    this.make_morphology_buttons(stringified_ending, 'ending');
    //the button approach end
    
    
    // var morphology_table = JSON.stringify(test_output_of_morphology, null, 4);
    
    // console.log("MORPHOLOGY LOG test_output_of_morphology = ", JSON.stringify(test_output_of_morphology, null, 4));
    
    // // this.set_word_selector(morphology_table);
    
    // var morphology_beginning_text = new Text(stringified_beginning);
    // morphology_beginning_text.setup();
    // this.word_selector_beginning = new WordSelector("morphology_cell_beginning", morphology_beginning_text);
    // this.word_selector_beginning.setup(); 
    // this.word_selector_beginning.click_callback = this.process_answer.bind(this);
    //the following didn't work, perhaps because bind can't take functions of the form function(arg1, arg2)
    //i.e. it can only be bound to a function
    //the error was: firebase.js:43 Uncaught TypeError: Cannot read property 'bind' of undefined(…)
    // this.word_selector_beginning.click_callback = this.submit_morphological_element_to_cell(morphology_beginning_text, 'beginning').bind(this);
    // this.word_selector_beginning.click_callback = this.submit_morphological_element_to_beginning_cell.bind(this);
    
    
    
    // var morphology_middle_text = new Text(stringified_middle);
    // morphology_middle_text.setup();
    // this.word_selector_middle = new WordSelector("morphology_cell_middle", morphology_middle_text);
    // this.word_selector_middle.setup(); 
    // this.word_selector_middle.click_callback = this.process_answer.bind(this);
    // //the following didn't work, perhaps because bind can't take functions of the form function(arg1, arg2)
    // //i.e. it can only be bound to a function
    // //the error was: firebase.js:43 Uncaught TypeError: Cannot read property 'bind' of undefined(…)
    // // this.word_selector_middle.click_callback = this.submit_morphological_element_to_cell(morphology_middle_text, 'middle').bind(this);
    // // this.word_selector_middle.click_callback = this.submit_morphological_element_to_middle_cell.bind(this);
    
    
    // var morphology_ending_text = new Text(stringified_ending);
    // morphology_ending_text.setup();
    // this.word_selector_ending = new WordSelector("morphology_cell_ending", morphology_ending_text);
    // this.word_selector_ending.setup(); 
    // this.word_selector_ending.click_callback = this.process_answer.bind(this);
    //the following didn't work, perhaps because bind can't take functions of the form function(arg1, arg2)
    //i.e. it can only be bound to a function
    //the error was: firebase.js:43 Uncaught TypeError: Cannot read property 'bind' of undefined(…)
    // this.word_selector_ending.click_callback = this.submit_morphological_element_to_cell(morphology_ending_text, 'ending').bind(this);
    // this.word_selector_ending.click_callback = this.submit_morphological_element_to_ending_cell.bind(this);
    */
    
    // el("morphology_clickable_choices_div").innerHTML = morphology_table;
    
    
    
    
    
    
    
// graveyard /////////////

// var submit_morphological_element_to_cell = function (morphological_element, cell_destination) {
//     console.log("BUTTON TESTING submit morphological element to cell entered");
    
//     console.log("BUTTON TESTING in submit morphological_element_sent to cell = ", morphological_element);
//     console.log("BUTTON TESTING in submit cell_destination = ", cell_destination);
//     // we first check if the submitted data is of the right type
//     if (typeof (morphological_element) !== 'string') {
//         alert("submitted morphological element is not a string");
//     }
    
//     //we need to display the morphological element
//     var div_to_fill_with_morphological_element;
//     if (cell_destination == 'beginning') {
//         el('morphology_cell_answer_beginning').innerHTML = morphological_element;
//     } else if (cell_destination == 'middle') {
//         el('morphology_cell_answer_middle').innerHTML = morphological_element;
//     } else if (cell_destination == 'ending') {
//         el('morphology_cell_answer_ending').innerHTML = morphological_element;
//     } else {
//         alert("cell_destination is neither beginning middle nor end");
//     }
// }


// var createClickHandler = function(arg, destination) {
//   return function() { 
//       console.log("create_click_handler arg = ", arg);
//       console.log("BUTTON TESTING destination in createclickhandler = ", destination);
//       submit_morphological_element_to_cell(arg, destination);
//   };
// }


// Quiz.prototype.make_morphology_buttons = function(morphological_elements, cell_destination) {
    
//     console.log("BUTTON TESTING morphological_elements pre-processing = ", morphological_elements);
//     morphological_elements = JSON.parse(morphological_elements);
//     console.log("BUTTON TESTING morphological_elements after parse = ", morphological_elements);
    
//     //not sure if necessary    
//     var docFragment = document.createDocumentFragment();
    

    
    
//     for (var i = 0; i < morphological_elements.length; i++) {
//         //we first make the button for each morphological element
//         var button = document.createElement("BUTTON");
        
//         //we want to tweak the cosmetics of this button so we give it a class
//         button.className += 'morphology_option_button';
        
        
//         // this button is now empty of text, so we need to add the text (e.g. amav, aba, erunt)
//         var morphological_element_to_input = morphological_elements[i];
//         var t = document.createTextNode(morphological_element_to_input);   
//         console.log("BUTTON TESTING morphological_element_to_input = ", morphological_element_to_input);
//         console.log("BUTTON TESTING type of morphological_element_to_input = ",typeof(morphological_element_to_input));
        
        
        
//         //we need to create a separate function so we don't end up with one variable
//         button.onclick = createClickHandler(morphological_element_to_input, cell_destination);
        
        
//         button.innerHTML = morphological_element_to_input
        
//         docFragment.appendChild(button); 
        
//         if (cell_destination == 'beginning') {
//             // button.className += 'morphology_beginning_button';
//             button.setAttribute('class', 'morphology_beginning_button');
//             var e = document.getElementById("morphology_cell_options_beginning");
//             e.appendChild(docFragment);
//         } else if (cell_destination == 'middle') {
//             // button.className += 'morphology_middle_button';
//             button.setAttribute('class', 'morphology_middle_button');
//             var e = document.getElementById("morphology_cell_options_middle");
//             e.appendChild(docFragment);
//         } else if (cell_destination == 'ending') {
//             // button.className += 'morphology_ending_button';
//             button.setAttribute('class', 'morphology_ending_button');
//             var e = document.getElementById("morphology_cell_options_ending");
//             e.appendChild(docFragment);
//         }
        
//     }
//     //below just throws it up on the page
//     // document.body.appendChild(docFragment);
//     //we want it to be in the beginning, middle or end block
    
//     // e.appendChild(docFragment);
// }

// //sometimes we know we want to display roots (e.g. root_2 & root_3)
// // but we want the actual lexical roots (e.g. am-, amav-, tim-, timu-)
// // this function will take a list of roots and a lexeme list
// // and return a list of items to populate morphological buttons
// var convert_root_items_to_actual_forms = function (root_list, lexeme_list, language) {
//     var dictionary_to_consult;
//     if (language == 'latin') {
//         dictionary_to_consult = testing_lexemes.verb;
//     }
//     console.log("ROOT LOOP dictionary_to_consult = ", dictionary_to_consult);
    
    
//     var list_of_lexical_roots = [];
//     for (i=0; i<root_list.length; i++) {
//         for (j=0; j<lexeme_list.length; j++) {
//             var root_to_find = root_list[i];
//             console.log("ROOT LOOP root_to_find = ", root_to_find);
//             var lexeme_to_consult = lexeme_list[j];
//             console.log("ROOT LOOP lexeme_to_consult = ", lexeme_to_consult); 
//             var lexeme_in_lexicon = testing_lexemes.verb[lexeme_to_consult];
//             console.log("ROOT LOOP testing_lexemes.verb[lexeme_to_consult] = ", lexeme_in_lexicon);
//             var latin_properties = lexeme_in_lexicon.latin;
//             console.log("ROOT LOOP latin_properties = ", latin_properties);
//             var roots = latin_properties.roots;
//             console.log("ROOT LOOP roots = ", roots);
//             var root_output = roots[root_to_find];
//             console.log("ROOT LOOP root_output = ", root_output);
//             list_of_lexical_roots.push(root_output);
//         }
//     }
//     console.log("ROOT LOOP list_of_lexical_roots =", list_of_lexical_roots);
//     return list_of_lexical_roots;
// }


//not sure if I can make this work as a method, since it's called by a global function
// Quiz.prototype.submit_morphological_element_to_cell = function (morphological_element, cell_destination) {
//     console.log("BUTTON TESTING 911 morphological_element = ", morphological_element);
//     console.log("BUTTON TESTING 911 cell_destination = ", cell_destination);
//     console.log("BUTTON TESTING submit morphological element to cell entered");
//     console.log("BUTTON TESTING cell_destination in submit to cell = ", cell_destination);
//     // we first check if the submitted data is of the right type
//     if (typeof (morphological_element) !== 'string') {
//         alert("submitted morphological element is not a string");
//     }
    
//     // we need to display the morphological element
//     if (cell_destination == 'beginning') {
//         console.log("BUTTON TESTING beginning cell triggered");
//         el('morphology_cell_answer_beginning').innerHTML = morphological_element;
//     } else if (cell_destination == 'middle') {
//         console.log("BUTTON TESTING middle cell triggered");
//         el('morphology_cell_answer_middle').innerHTML = morphological_element;
//     } else if (cell_destination == 'ending') {
//         console.log("BUTTON TESTING middle cell triggered");
//         el('morphology_cell_answer_ending').innerHTML = morphological_element;
//     } else {
//         alert("cell_destination is neither beginning middle nor end");
//     }
// }


// Quiz.prototype.submit_morphological_element_to_middle_cell = function() {
//     var morphological_element = global_hack_morphological_elements.middle;
//     //we first check if the submitted data is of the right type
//     if (typeof(morphological_element) !== 'string') {
//         alert("submitted morphological element is not a string");
//     }
    
//     //we need to display the morphological element
//     var div_to_fill_with_morphological_element;
//     if (cell_destination == 'beginning') {
//         el('morphology_cell_answer_beginning').innerHTML = morphological_element;
//     } else if (cell_destination == 'middle') {
//         el('morphology_cell_answer_middle').innerHTML = morphological_element;
//     } else if (cell_destination == 'ending') {
//         el('morphology_cell_answer_ending').innerHTML = morphological_element;
//     } else {
//         alert("cell_destination is neither beginning middle nor end");
//     }
    
    
    
//     //we also need to update our submitted answer
    
// }

// Quiz.prototype.make_morphology_buttons_old = function(morphological_elements, cell_destination) {
//     var docFragment = document.createDocumentFragment();
//     console.log("BUTTON TESTING morphological_elements pre-processing = ", morphological_elements);
//     morphological_elements = JSON.parse(morphological_elements);
//     console.log("BUTTON TESTING morphological_elements after parse = ", morphological_elements);
//     for (var i = 0; i < morphological_elements.length; i++) {
//         var button = document.createElement("BUTTON");
//         // this button is now empty of text, so we need to add the text (e.g. amav, aba, erunt)
//         var morphological_element_to_input = morphological_elements[i];
//         var t = document.createTextNode(morphological_element_to_input);   
//         console.log("BUTTON TESTING morphological_element_to_input = ", morphological_element_to_input);
//         console.log("BUTTON TESTING type of morphological_element_to_input = ",typeof(morphological_element_to_input));
//         button.onclick = function() {
//             //research why this.submit... doesn't work
//             submit_morphological_element_to_cell(morphological_element_to_input, cell_destination);
//             // submit_morphological_element_to_cell('test', 'middle');
//         };
//         button.appendChild(t); 
//         // document.body.appendChild(button); 
//         docFragment.appendChild(button); 
        
//     }
//     document.body.appendChild(docFragment); 
// }


// Quiz.prototype.make_morphology_buttons_Old_and_obsolete = function(morphological_elements, cell_destination) {
    
//     console.log("BUTTON TESTING morphological_elements pre-processing = ", morphological_elements);
//     morphological_elements = JSON.parse(morphological_elements);
//     console.log("BUTTON TESTING morphological_elements after parse = ", morphological_elements);
    
//     //not sure if necessary    
//     var docFragment = document.createDocumentFragment();
    

    
//     //to handle closure in the for lopp
//     var loop_closure_functions = []
    
//     //version with 2 arguments
//     // for (var j = 0; j < morphological_elements.length; j++) {
//     //     loop_closure_functions[j] = create_loop_closure_function (morphological_elements[j], cell_destination);
//     // }
    
//     // version with 1 argument
//     for (var j = 0; j < morphological_elements.length; j++) {
//         console.log("CLOSURE DEBUG j-loop triggered");
//         loop_closure_functions[j] = create_loop_closure_function (morphological_elements[j]);
//         console.log("CLOSURE DEBUG loop_closure_functions[j] = ", loop_closure_functions[j]);
//     }
    
//     console.log("CLOSURE DEBUG loop_closure_functions = ", loop_closure_functions);
    
    
//     for (var i = 0; i < morphological_elements.length; i++) {

    
        
        
        
//         var button = document.createElement("BUTTON");
//         // this button is now empty of text, so we need to add the text (e.g. amav, aba, erunt)
//         var morphological_element_to_input = morphological_elements[i];
//         var t = document.createTextNode(morphological_element_to_input);   
//         console.log("BUTTON TESTING morphological_element_to_input = ", morphological_element_to_input);
//         console.log("BUTTON TESTING type of morphological_element_to_input = ",typeof(morphological_element_to_input));
        
//         //attempt #1
//         // button.onclick = function() {
//         //     // alert("BUTTON CLICK");
//         //     loop_closure_functions[i];
//         // };
        
//         //attempt #2
//         button.onclick = createClickHandler(morphological_element_to_input, cell_destination);
//         button.innerHTML = morphological_element_to_input
//         document.body.appendChild(button)
        
//         //part of attempt #1
//         // button.appendChild(t); 
        
//         // document.body.appendChild(button); 
//         docFragment.appendChild(button); 
        
//     }
//     document.body.appendChild(docFragment); 
// }





// var submit_morphological_element_to_cell = function (morphological_element, cell_destination) {
//     console.log("BUTTON TESTING submit morphological element to cell entered");
    
//     console.log("BUTTON TESTING morphological_element_sent to cell = ", morphological_element);
//     // we first check if the submitted data is of the right type
//     if (typeof (morphological_element) !== 'string') {
//         alert("submitted morphological element is not a string");
//     }
    
//     //we need to display the morphological element
//     var div_to_fill_with_morphological_element;
//     if (cell_destination == 'beginning') {
//         el('morphology_cell_answer_beginning').innerHTML = morphological_element;
//     } else if (cell_destination == 'middle') {
//         el('morphology_cell_answer_middle').innerHTML = morphological_element;
//     } else if (cell_destination == 'ending') {
//         el('morphology_cell_answer_ending').innerHTML = morphological_element;
//     } else {
//         alert("cell_destination is neither beginning middle nor end");
//     }
// }


// var create_loop_closure_function = function (i, cell_destination) {
//     return function() {
//         submit_morphological_element_to_cell(i, cell_destination)
//     };
// }

//1 argument version
// var create_loop_closure_function = function (i) {
//     return function(i) {
//         // alert("closure triggered");
//         console.log("CLOSURE create_loop_closure triggered");
//         submit_morphological_element_to_cell(i);
//     };
// }
    
    
    