// 'DOMContentLoaded' is a reserved-string for a browser event
// it is an event produced by ______ and passed to ______
// it means all DOM content has been loaded (but not necessarily rendered)
    // load (parsing characters in the html template and creating the elements)
    // --> render (via css, turns elements into pixels)
// this is downstream from window.onload which is too early to run start
// the optional third argument sets it as capture phase if true, default is bubbling phase
document.addEventListener('DOMContentLoaded', start);
document.addEventListener('DOMContentLoaded', sanity_check);


// settings will represent all state that changes
// e.g. target language
var Settings = {
  'lang': null
};







// todo problem:
// Uncaught TypeError: Function.prototype.apply was called on undefined, which is a undefined and not a function


// todo english_words is popping up as undefined
// var dictionaries = {
//     'english': english_words
// };


function sanity_check () {
    console.log("sanity check triggered");
}


function start () {
    console.log("LATINIST beginning");
    
    set_language(); 
    ////////////new///////////
    
    
    
    // # = css selector for the id
    // give me the first element you find that has the id xyz
    // document.querySelector('#root_to_words_button').addEventListener('click', root_to_words);
    document.querySelector('#set_spanish_button').addEventListener('click', set_spanish);
    document.querySelector('#root_to_words_button').addEventListener('click', roots_to_words);
    document.querySelector('#words_to_roots_button').addEventListener('click', words_to_roots);
    
}


function set_language (flag) {
  Settings.lang = flag || 'english';
  console.log("Settings.lang = ", Settings.lang);
  // we expect Settings.dictionary to be a list of objects [{}, {},...]
  Settings.dictionary = set_dictionary(Settings.lang);
  Settings.utils = set_utils(Settings.dictionary);
  console.log("Settings.utils = ", Settings.utils);
};


function set_spanish () {
    set_language('spanish');
    console.log("Set spanish clicked");
};

function set_dictionary (language) {
    
    
    return english_words;
    
    
    // todo below commented out until the dictionaries map bug can be fixed
    // console.log("DEBUGGING language = ", language);
    // if (dictionaries.hasOwnProperty(language)) {
    //     return dictionaries[language];
    // }
    // console.log("no language specified");
    // return null;
};


function set_utils () {
    console.log("setting utils, Settings.dictionary = ", Settings.dictionary);
    return init_util(Settings.dictionary); 
};







////////////// above is work on saturday march 4th lesson
///////////// below is added work


function get_input () {
    var raw_input = document.querySelector('#string_input').value;
    return preprocess_input(raw_input);
}

function preprocess_input (string) {
    // break at spaces into a list of strings
    return string;
};


function roots_to_words () {
    var processed_input = get_input();
    console.log("processed_input = ", processed_input);
    var output = Settings.utils.get_words_that_contain_roots(processed_input);
    console.log("roots_to_words output = ", output);
    console.log("roots_to_words output stringified = ", JSON.stringify(output));
    return output;
};

function words_to_roots () {
  var processed_input = get_input();  
  console.log("processed_input = ", processed_input);
  var component_list = Settings.utils.word_to_components(processed_input);
  var components_as_list = Settings.utils.get_list_of_components(component_list);
  console.log("words_to_roots output = ", components_as_list);
};









