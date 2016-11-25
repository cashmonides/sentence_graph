// This file contains utils related to strings.

// This function capitalizes the first character of a string
// and none of the others.
var title = function (x) {
    return x[0].toUpperCase() + x.slice(1).toLowerCase();
}


// OPERATIONS THAT HANDLE SLASHES
// 'x/y' gives two options, both of which are correct
// we want a couple of operations to handle this
// e.g.
//  return a list of slash options
//  check for match (i.e. return a bool if we match x or y)
//
//
var return_slash_options = function (slashed_string) {
    // we first slice the list
    var slash_options = slashed_string.split('/');
    // 
};

// we have a list of slash options like [x/y/z] and a query word like 'abcdx'
// we want to return the substring that is in the query word 
// the problem is we might get multiple matches
// [ig/il/im/in] might match 'in' twice with in.nivincible or inv.in.cible

// we want to return a bool (whether a match has been found or not)
var test_match_from_slash_options = function (slash_options_string, query_word) {
    
    var slash_options_list = slash_options_string.split("/");
    
    var boolean = false;
    for (var i = 0; i < slash_options_list.length; i++) {
        if (query_word.indexOf(slash_options_list[i])) {
            console.log("MANCHESTER match found, boolean switched to true");
            console.log("MANCHESTER discovered match = ", slash_options_list[i]);
            boolean = true;
            return boolean;
        } else {
            console.log("MANCHESTER MATCH NOT FOUND continuing iteration")
            continue;
        }
    }
    console.log("MANCHESTER boolean returned = ", boolean);
    return boolean;
};

// this function returns either a string (the matched root)
// or false
var return_match_from_slash_options = function (slash_options_string, query_word) {
    
    var slash_options_list = slash_options_string.split("/");
    
    var output = false;
    for (var i = 0; i < slash_options_list.length; i++) {
        if (query_word.indexOf(slash_options_list[i])) {
            console.log("MANCHESTER match found");
            console.log("MANCHESTER discovered match = ", slash_options_list[i]);
            output = slash_options_list[i];
            return output;
        } else {
            console.log("MANCHESTER MATCH NOT FOUND continuing iteration")
            continue;
        }
    }
    console.log("MANCHESTER output returned = ", output);
    return output;
};



// OPERATIONS THAT HANDLE ETYMOLOGICAL DATA
// we want to remove metadata such as "root 2" in ["pos", "pot root 2"]
var remove_metadata_from_roots = function (root_list) {
    // todo make this less ad hoc (maybe use map-filter-reduce)
    var new_list = [];
    for (var i = 0; i < root_list.length; i++) {
        var item_to_push = root_list[i].replace("root", "");
        item_to_push = item_to_push.replace(/[1-9]/g, '');
        item_to_push = item_to_push.replace(/ /g, '');
        new_list.push(item_to_push);
    }
    return new_list;
}

