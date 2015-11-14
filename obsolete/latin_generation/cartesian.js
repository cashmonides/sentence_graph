//DESCRIPTION
//below is complete in the sense that it returns all states properly
// minimally hacky


var level_to_allowed2 = {
    1 : {
        declension : ["2"],
        conjugation : ["1"],
        transitivity: ["transitive"],                          //changes the lexicon
        gender : ["m"],


        clause_type : ["main"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },

        implicitness : ["explicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["3s", "3p"]
        },

        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        s_o_swap: shuffle(["no_swap", "swap"])

    },
    100 : {
        declension : ["2"],
        conjugation : ["1"],
        transitivity: ["transitive"],                          //changes the lexicon
        gender : ["m"],


        clause_type : ["main"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },

        implicitness : ["explicit", "implicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["3s", "3p"]
        },

        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        s_o_swap: shuffle(["no_swap", "swap"])

    },
    200 : {
        declension : ["1", "2", "3"],
        conjugation : ["1", "2", "3"],
        transitivity: ["transitive", "intransitive"],                          //changes the lexicon
        //transitivity: ["intransitive"],                          //changes the lexicon
        gender : ["m", "f", "n"],


        //below would be properties of dictionaries within kernel.state

        clause_type : ["main", "iq", "is"],
        sequence: {
            main: ['none'],
            is: ['primary', 'secondary'],
            iq: ['primary', 'secondary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            }
        },

        implicitness : ["explicit", "implicit"],
        person : {
            explicit : ["3s", "3p"],
            implicit : ["1s", "2s", "3s", "1p", "2p", "3p"]
        },

        voice: ["active"],
        number_of_other_nouns : ["singular", "plural"],
        s_o_swap: shuffle(["no_swap", "swap"])
    }
};



//the interdependencies in latin require that we set parameters in a specific order
var order = ['clause_type', 'sequence', 'tense', 'implicitness', 'person',
    'voice', 'number_of_other_nouns', 's_o_swap'];


//input is level (int)
//returns a list of dictionaries with keys = parameters & values = parameter values (e.g. tense : future)
master_cartesian = function (level) {
    //initialize a list of dictionaries
    var states = [{}];
    //we walk through the parameters in order (tense, clause_type, etc.) and set the cartesian property of each
    //we concat each of these lists to states
    for (var i = 0; i < order.length; i++) {
        states = concat_arrays(states.map(function (state) {return set_cartesian_property(order[i], state, level)}))
    }
    //console.log"LOG master_cartesian states = ", states);
    return states;
};



//returns the cartesian product of a single given property (i.e. all the possibilities), constrained by certain properties already fixed in the argument state
set_cartesian_property = function(property_name, state, level) {
    var property_values_allowed = map_level_to_allowed(level)[property_name];
    //below will return a list of all allowed values (e.g. ['past', 'present', 'future']
    var list_of_allowed = access_list(state, property_values_allowed);
    //console.log"LOG list_of_allowed in set_cartesian_property = ", list_of_allowed);
    return cartesian_product(state, property_name, list_of_allowed);
};


//level is converted into key (the greatest key <= input level)
//returns the value of that key in the dictionary level_to_allowed
    //Math.max.apply returns the maximum of a list (null is a dummy argument)
function map_level_to_allowed(level) {
    return level_to_allowed2[Math.max.apply(
        null, Object.keys(level_to_allowed2).filter(function (x) {return x <= level}))]
}



//sometimes the list (of allowed values) that we want to access is nested inside of a dictionary
//in such a case we need to drop down into the dictionary until we encounter a single list
//(so far we only have one layer but in the future we may have multiple layers so the following function is recursive)
//returns a list e.g. ['present', 'future'\
access_list = function(state, dict_to_access_from) {
    if (Array.isArray(dict_to_access_from)) {return dict_to_access_from}
    for (var i = 0; i < values(state).length; i++) {
        if (values(state)[i] in dict_to_access_from) {
            return access_list(state, dict_to_access_from[values(state)[i]])
        }
    }
};

//takes a state, a property name and a list of allowed values for that property
//returns a new list with:
// key: property_name
// value: whatever add_property returns????
cartesian_product = function(state, property_name, list) {
    return list.map(function (x) {return add_property(state, property_name, x)})
};

//todo is object here just state? should it be renamed state?
//what this seems to do is:
// starts with any object state (here it happens to be a state)
//copies the object into a new object and adds a property to the new object
//why all this trouble? because we can't simply mutate the object in place
// keeps every property of the state except the property_name
// sets the given property_name to equal value
add_property = function(object, property_name, value) {
    var new_object = {};
    for (var i in object) {new_object[i] = object[i]}
    new_object[property_name] = value;
    return new_object;
};



//returns the values of an object (maybe move to utils eventually)
var values = function(object) {
    var new_array = [];
    for (var i in object) {new_array.push(object[i])}
    return new_array
};


//a utility function that combines a list of lists into a big list (maybe move to utils eventually)
concat_arrays = function (list_of_arrays) {
    ////console.log"LOG list of arrays in concat_arrays", list_of_arrays);
    return Array.prototype.concat.apply([], list_of_arrays);
};





//possibly use below
/*function map_level_to_allowed(parameter, level) {
 var m = level_to_allowed_2[parameter];
 //console.log'debug 9-11 1 ' + JSON.stringify(m));
 var s =  Math.max.apply(null, Object.keys(m).filter(function(x) {return x <= level}));
 return m[s]
 }*/