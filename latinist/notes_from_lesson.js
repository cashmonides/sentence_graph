



// OPTION 1
var data1 = {
  'reference2' : {
  	'property1': 'value',
    'property2': 'value',
  },
  'reference2' : {
  	'property1': 'value',
    'property2': 'value',
  }
}

// function that converts option 1 to option 2
// while changing some of the keys
// values stay the same
// except for one particular property, a list needs to be turned into a map
// property   roots: ['bibli', 'man']   
// ---> 
// intermediate thing: 
// incomplete_component_list: [{'_1': 'bibli'}, {'_2': 'man'}]
// human intervention 
// -->
// component_list: [{'_1' : 'bibli'}, {'_2': 'o#'}, {'_3': 'man'}, {'_4': 'ia'}]

// component_map: [{index: 1, root: 'bibli'}, {}]



// OPTION 2
var data2 = [
  //nothing like a good comment!
  {'property1': 'value',
   'property2': 'value',
  },
  //here's another great comment!
  {
  	'property1': 'value',
    'property2': 'value',
  }
  ]





// example of old data
var old_format_object = "bibliophobia": {
        "grade": 12,
        "meaning": "the <span class=\"embedded_root\">fear</span> of <span class=\"embedded_root\">books</span>",
        "part of speech": "noun",
        "roots": [
            "BIBLI",
            "PHOB"
        ],
        "type": "none",
        "word": "bibliophobia"
    };



var new_dictionary_template1 = {
  	'canonical_form': null,
    'component_list': [],
  	'definition': null,
  	'variant_list': null,
    'british_variant_list': null,
   	'irregular_plural_list': null, 
 	'part_of_speech': null,
 	'level': null,
 	'sense_type': null,
 	'field_list': null     
};


var change_key_map = {
        'meaning': 'definition',
        'part of speech': 'part_of_speech',
        'word': 'canonical_form'
}


var change_big_dictionary_of_dictionaries = function (big_dictionary, change_map, altered_dictionary_template) {
    var new_list = [];
    for (let item in big_dictionary) {
        new_list.push(change_dictionary_keys(item, change_map, altered_dictionary_template));
    }
    console.log("NEW LIST = ", new_list);
    return new_list;
}


var change_dictionary_keys = function (unaltered_dictionary, change_map, altered_dictionary_template) {
  		var altered_dictionary = altered_dictionary_template;
 		for (let old_key in change_map) {
            if (change_map.hasOwnProperty(old_key)) {
                let value = unaltered_dictionary[old_key];
                let new_key = change_map[old_key];
                altered_dictionary[new_key] = value;
            }
        }
        altered_dictionary.canonical_form = unaltered_dictionary.meaning
  		altered_dictionary.component_list = convert_list_to_list_of_objects(unaltered_dictionary.roots);
  
        return altered_dictionary;
    }

// starting_list ['BIBLI', 'MANI']
// component_list: [{'_1' : 'bibli'}, {'_2': 'o#'}, {'_3': 'man'}, {'_4': 'ia'}]
var convert_list_to_list_of_objects = function (list) {
     return list.map(function (string, index){
     	var obj = {};
       //	var converted_index = '_' + (++index);
         obj['_' + (++index)] = string.toLowerCase();
     });
}

//    biology = the @study@2 of @life@1
// --->
// intermediate step 
// biology = the @study@ of @life@
// biologist = a @person involved in@3 the @study@2 of @life@1
// 	human intervention
// --->
//     biologist = a @person involved in@3 the @study@2 of @life@1


{"variant_list":null,"british_variant":null,"irregular_plural":null,"component_map":null,"definition":"the <span class=\"embedded_root\">fear</span> of <span class=\"embedded_root\">books</span>","part_of_speech":"noun",
"level":null,
"sense_type":null,
"field_list":null,
"canonical_form":"bibliophobia"}


{"variant_list":null,
"british_variant":null,
"irregular_plural":null,
"component_map":null,
"definition":"the <span class=\"embedded_root\">fear</span> of <span class=\"embedded_root\">books</span>",
"part_of_speech":"noun",
"level":null,
"sense_type":null,
"field_list":null,
"canonical_form":"bibliophobia"}



var new_dictionary_template1 = {
        'variant_list': null,
        'xyz1': 'xyz',
        'british_variant': null,
        'xyz2': 'xyz',
        'irregular_plural': null,
        'xyz3': 'xyz',
    	'component_map': null,
    	'xyz4': 'xyz',
    	'definition': null,
    	'xyz5': 'xyz',
    	'part_of_speech': null,
    	'xyz6': 'xyz',
    	'level': null,
    	'xyz7': 'xyz',
    	'sense_type': null,
    	'xyz8': 'xyz',
    	'field_list': null,
    	'xyz9': 'xyz',
    };




{  
   "canonical_form":"bibliophobia",
   "component_list":[  
      {  
         "_1":"bibli"
      },
      {  
         "_2":"phob"
      }
   ],
   "definition":"the @fear@ of @books@",
   "variant_list":null,
   "british_variant_list":null,
   "irregular_plural_list":null,
   "part_of_speech":"noun",
   "level":null,
   "sense_type":null,
   "field_list":null
},
{  
   "canonical_form":"bibliophobia",
   "component_list":[  
      {  
         "_1":"bibli"
      },
      {  
         "_2":"phob"
      }
   ],
   "definition":"the @fear@ of @books@",
   "variant_list":null,
   "british_variant_list":null,
   "irregular_plural_list":null,
   "part_of_speech":"noun",
   "level":null,
   "sense_type":null,
   "field_list":null
}