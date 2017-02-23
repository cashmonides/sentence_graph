//// master function
// iterate through old_map
// rename values
// convert root list to a map with string-integers 

///////////////////end of psuedocode


/// get value



/// 

var add_old_value_to_new_key = function (new_dictionary, new_key, old_value) {
    
}


var convert_dictionary = function () {
};


var alter_all_dictionary_keys = function (unaltered_dict, f) {
	var altered_dict = {};
	for (var key in unaltered_dict) {
	    var value = unaltered_dict[key];
	    altered_dict[f(key)] = value;
	}
	return altered_dict;
}




var change_dictionary_key = function (unaltered_dictionary, old_key, new_key) {
	var altered_dictionary = {};
	var value = unaltered_dictionary[old_key];
    altered_dict[new_key] = value;
	return altered_dictionary;
}