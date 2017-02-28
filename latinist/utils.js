/// ELEMENTAL ETYMOLOGY FUNCTIONS (aka word functions)
////// this file is a collection of all utils relating to the february 2017 reboot
////// it started with a focus on etymological operations
///// ultimately it seek to be a general format for other operations involving button clicks

//// some examples: find root, find word with root, replace root



// some notes




// ELEMENTAL FUNCTIONS

///////////////// --separate component--/////////////////////
// add metacharacter separator between components
//     verify --> ver.if.y



// input: 
    // string (point to a word in the word list) e.g. 'verify'
// output: array of strings   ['ver', 'i', 'fy']

// OPTION 1
// currying, returning a single function
function init_util (dictionary) {
    return function word_to_roots (word) {
        // look up word
        // return array of roots
    }
}

//OPTION 2
// returning an object whose properties are functions



// string-utils
///add utils here

// model-utils
function init_util (dictionary) {
    return {
        
        // input: a single word
        // output: a list of component_maps which is an array (usually only 1)
        // e.g. [{'_1': 'ver', '_2': 'i#', '_3': 'fy'}]
        word_to_components: function (word) {
            
            return this.word_from_canonical_form(word).map(function (form) {
                // values is ES6 returns just the values as an array
                // if the filter produces more than one output
                // map would produce an array of array
                return form.component_map.values();
            });
        },
        // input: string (e.g. 'verify')
        // output: list of word-object (hopefully only one)
        // 0 - when the input is bad or word is missing
        // more than 1 - when either
        // data is bad with duplicate words
        // or edge case: word that is both a verb and noun
        word_from_canonical_form: function (word) {
            return dictionary.words.filter(function (form) {
                return word === form.canonical_form;
            });
        },
        
        
        // input: one or more strings separated by commas ('ped') or ('ped', 'pod')
        // output: 
        
        // multiple arguments
        // gather
        // ...x if x is not a list, gathers all arguments of x into an array
        root_to_words: function (...roots) {
            roots.map(function (root) {
                return dictionary.filter(function (word){
                    // convert word.component_map from object to list of values
                    // what Object.values does but workable on mobile devices
                    // MDN polyfill
                    // also we want to roll our own array.contains
                    // essentially
                    // return word.component_map.values.includes(root);
                });
            });
        },
        
        // input: string    'ped'
        // output: list of word-objects [{biped},{octopus}]
        all_root_variants_to_words: function (root) {
            // spread
            // if x is a list, spreads into comma-separated values
            // we want to send a comma-separated values to root_to_words
            return this.root_to_words(...this.all_root_variants(root));
        }, 
        // input: string 'pod'
        // output: list of strings ['ped', 'pod', 'pus']
        all_root_variants: function (root) {
            
        }
        
    };
    
}

var latin_util = init_util(latin_dictionary);

var verify_components = latin_util.word_to_roots('verify');



var latin_word_to_root_function = init_util(latin_words_data);

// example of somewhere in the logic
// 
var verify_roots = latin_word_to_root_function('verify');

var sanskrit_word_to_root_function = init_util(sanskrit_words_data);

// example of somewhere in the logic
// 
var verify_roots = sanskrit_word_to_root_function('avatar');

// --replace component--
// replace component with either underscore or alternative 
//      connector alternative are just vowels
//      root alternative are any available roots
//      verify --> ___ify       (underscore)
//      verify --> pedify      (random root)
//      verify --> verofy     (random vowel)

// --replace n continuous characters--
// 	verify --> rurify

// --replace n random characters--
// 	verify --> vurifu

// -- restore random missing character (hangman)--
// 	_ _ _ _ _ _ --> _ e _ _ _ _

// --format component--
// provide a certain formatting (bold, italic, etc.) to a category of component (root, connector, core root, suffix root, prefix root)
// 	verify --> VERify

// --find word with root x--
// 	ver --> [verify, verisimillitude]

// --find root of word x--
// 	verify --> [ver, fy]

// --generate incorrect alternative (either connector or root or letter)----     
//      ver ---> [ped, anthro]
//      i --> [a, e, o, u]
     
     
// COMPOSITE FUNCTIONS
// --find word with root overlap--
// 	verify --> petrify

// --find word without root overlap--
// 	verify --> quadruped

// --find all possible roots for this word--
// 	vexillologist --> [vex, vexill, log, ist]
	

// --find a similar root--
// 	log --> [ling, cogn] 