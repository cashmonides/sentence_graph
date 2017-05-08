// below builds the template for a language-agnostic set of utils
// all language specific information is fed in as a dictionary (maybe better renamed as library vel sim.)

function init_util (dictionary) {
    return {
        get_list_of_components: function (component_list) {
            //console.log("entering utils.get_list_of_components");
            //
            //
            
            ///// console logs below simply for debugging, to test what kind of components list we have
            //console.log("COMPONENT_LIST = ", component_list);
            //console.log("COMPONENT_LIST STRINGIFIED = ", JSON.stringify(component_list));
            //console.log("typeof component_list[0] = ", typeof component_list[0]);
            //console.log("component_list[0] stringified = ", JSON.stringify(component_list[0]));
            //console.log("component_list[0].length = ", component_list[0].length);

            // problematically we have two coexisting versions of component_list
            // one is an array of arrays (produced by the spread operator)
            // the other is just an array
            // below is a short term hack to 
            
            if (component_list[0].length) {
                //console.log("BRUTE FORCE METHOD ENTERED");
                return component_list[0].map((c,i) => c["_"+(++i)]);
            } else {
                return component_list.map(function (item) {
                    //console.log("ENTERING FOR ITERATION component_list = ", component_list);

                    for (let key in item) {
                        //console.log("INSIDE FOR ITERATION key = ", key);
                        //console.log("INSIDE FOR ITERATION component[key] = ", item[key]);
                        return item[key];
                    }
                });
            }

        },


        // input: word, root_list (list of strings),
        // output: bool
        bool_word_contains_some_roots: function (word, ...roots) {

            // short term hack to deal with the embedded list issue
            if (roots[0].length) {
                //console.log("SHORT TERM HACK ROOTS UNEMBEDDED");
                roots = roots[0];
            }

            for (var i = 0; i < roots.length; i++) {
                if (this.get_list_of_components(word.component_list).indexOf(roots[i]) >= 0) {
                    return true;
                };
            };
            return false;
        },



        // input: word, root_list (list of strings),
        // output: bool
        bool_word_contains_no_roots: function (word, ...roots) {
            //console.log("DEBUGGING roots = ", roots);
            //console.log("DEBUGGING roots stringified = ", JSON.stringify(roots));
            //console.log("DEBUGGING word = ", word);
            //console.log("DEBUGGING word stringified = ", JSON.stringify(word));
            //
            //console.log("DEBUGGING this.get_list_of_components(word.component_list) = ", this.get_list_of_components(word.component_list));
    
            if (roots[0].length) {
                //console.log("SHORT TERM HACK ROOTS UNEMBEDDED");
                roots = roots[0];
            }
    
    
    
    
            for (var i = 0; i < roots.length; i++) {
                if (this.get_list_of_components(word.component_list).indexOf(roots[i]) >= 0) {
                    return false;
                };
            };
            return true;
        },
    
    
        bool_word_contains_all_roots: function (word, ...roots) {
            // get component-map of word
            // check for contains
        },
    
    
        // input: 1-n arguments, csv
        // output: list of word objects
        get_words_that_contain_roots: function (...roots) {
            // => causes the scope of this. before the function filter to be inherited
            // into the scope of filter
            // without it, the outer scope (i.e. the scope of filter) would constitute the scope of this.
    
            return dictionary.filter( (item) => {
                    return this.bool_word_contains_some_roots(item, ...roots)
            })
        },



        // input: 1-n arguments, csv
        // output: list of word objects
        get_words_that_do_not_contain_roots: function (...roots) {
            // => causes the scope of this. before the function filter to be inherited
            // into the scope of filter
            // without it, the outer scope (i.e. the scope of filter) would constitute the scope of this.
        
            return dictionary.filter( (item) => {
                    return this.bool_word_contains_no_roots(item, ...roots)
            });
        },



        
        // input: a single word
        // output: a list of component_maps which is an array (usually only 1)
        // e.g. [{'_1': 'ver', '_2': 'i#', '_3': 'fy'}]
        // internal mechanics
        word_to_components: function (word) {
            console.log("entering utils.word_to_components");
        
            // this.word_from_canonical_form(word) = list containing object
            // this object contains a property which is a list
            // result is a list within a list
            return this.word_from_canonical_form(word).map(function (form) {
                console.log("FORM = ", form);
                console.log("FORM.COMPONENT_LIST stringified = ", JSON.stringify(form.component_list));
                return form.component_list;
                ////var component_string_list = component_list_to_components(form.component_list);
                //var component_string_list = this.get_list_of_components(form.component_list);
                //console.log("COMPONENT_STRING_LIST = ", component_string_list);
                //return component_string_list;
            });
        },
        


        
        
        // @addition
        // we want to iterate through a component list and return just the strings
        // [{"_1":"carn"},{"_2":"vor"}]
        // -->
        // ['carn', 'vor']
        
        //component_list_to_components: function (component_list) {
        //    console.log("entering utils.component_list_to_components");
        //    var output = component_list.map(function(item) {
        //        return item.values;
        //    });
        //    console.log("OUTPUT = ", output);
        //    return output;
        //},
        
        
        
        // input: string (e.g. 'verify')
        // output: list of word-objects (hopefully only one)
        // 0 - when the input is bad or word is missing
        // more than 1 - when either
        // data is bad with duplicate words
        // or edge case: word that is both a verb and noun e.g.
        word_from_canonical_form: function (word) {
            console.log("WORD INPUTTED INTO WORD FROM CANONICAL FORM = ", word);
            //console.log("DICTIONARY = ", dictionary);
        
        
        
        
            //console.log("DICTIONARY.WORDS = ", dictionary.words);
            // @fix: ultimately we want the dictionary to have two parts
            // dictionary.words and dictionary.roots
            // so ultimately the return statement will be as follows
            //return dictionary.words.filter(function (form) {
            //    return word === form.canonical_form;
            //});
            // but for now we'll just work with one dictionary
        
        
            // typeof output = list of length 1 (containing 1 object)
            var output = dictionary.filter(function (form) {
                return word === form.canonical_form;
            });
            console.log("OUTPUT of word_from_canonical_form = ", output);
            return output;
        },
        
        
        word_to_canonical_form: function (word) {
            var output = word.canonical_form;
            console.log("CANONICAL FORM = ", canonical_form);
            return output;
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
        // output: list of word-objects [{biped: xyz, etc.},{octopus:xyz, etc.}]
        all_root_variants_to_words: function (root) {
            // spread
            // if x is a list, spreads into comma-separated values
            // we want to send a comma-separated values to root_to_words
            return this.root_to_words(...this.all_root_variants(root));
        },
        
        // input: string 'pod'
        // output: list of strings ['ped', 'pod', 'pus']
        all_root_variants: function (root) {
        
        },
        
        get_root_object: function (root) {
        
        },
        
        
        // input: string 'pod' or 'pus'
        // output: string 'ped'
        get_canonical_root_form: function (root) {
        
        },
        
        
        
        
        // given 1-n arguments, get all words that share a root
        // input: 1-n arguments
        // output: list of objects
        // e.g. biped --> [bicycle, pedestrian, impediment, etc.]
        // or e.g. biped, carnivore --> [bicycle, pedestrian, reincarnation, etc.]
        get_words_with_overlapping_roots: function (...words) {
            // convert word to component map
            // remove non-roots from component map (e.g. the i in verify)
            // turn component map into list of strings
            // turn strings into objects (pus --> ped objects)
            // iterate through list
            // run the operation contains root on the dictionary
        },
        
        // given 1-n arguments, get all words that don't share a root
        // input: 1-n arguments
        // output: list of objects
        // e.g. biped --> [homicide, monarchy, etc.]
        // or e.g. biped, carnivore --> [homicide, monarchy, etc.]
        get_words_without_overlapping_roots: function (...roots) {
        
        },
    };

}


////////////// an example of how we access this util library/////////

// we pass the dictionary (list of word-objects) as an argument
// this creates a new object (example_english_util)
// which has some functions as properties (e.g. word_to_components)
// var example_english_util = init_util(english_dictionary);

// we can now call those functions with dot notation
// var example_output = example_english_util.word_to_components('quadruped');



/*

 // initializing a language-specific set of utils
 var latin_util = init_util(latin_dictionary);

 ////// establishing a set of specific utils


 ///////////// examples
 var verify_components = latin_util.word_to_roots('verify');



 var latin_word_to_root_function = init_util(latin_words_data);

 // example of somewhere in the logic
 //
 var verify_roots = latin_word_to_root_function('verify');

 var sanskrit_word_to_root_function = init_util(sanskrit_words_data);

 // example of somewhere in the logic
 //
 var verify_roots = sanskrit_word_to_root_function('avatar');


 */


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



//////////////// some very basic housekeeping utils


// convert component_map to root_map (i.e. remove the connecting elements that are tagged by metacharacters)



// cosmetic: add metacharacter separator between components
// input: component map, bool
// output: string
//     verify --> ver.i.fy    quadruped --> quadr.u.ped


//

