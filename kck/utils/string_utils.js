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


// we want to return a bool, whether an input word matches with a target list of slash_options
// "ped", "ped/pod" --> true
var test_match_in_slash_options = function (input_word, slash_options_string) {
    //convert to lower case
    slash_options_string = slash_options_string.toLowerCase();
    var slash_options_list = slash_options_string.split("/");
    
    var boolean = false;
    for (var i = 0; i < slash_options_list.length; i++) {
        if (slash_options_list[i].indexOf(input_word)) {
            back.log("[test_match_in_slash_options] match found, boolean switched to true");
            boolean = true;
            return boolean;
        } else {
            console.log("[test_match_in_slash_options] match not found continuing iteration");
            continue;
        }
    }
    return boolean;
};


// we want to return a bool (whether a match has been found or not)
var test_match_from_slash_options = function (slash_options_string, query_word) {
    var lowercase_query = query_word.toLowerCase();
    var options = slash_options_string.toLowerCase().split('/');
    // some list method: returns boolean
    // if any items of list satisfy function
    return options.some(function (option) {
        // is the option in the lowercase query?
        return lowercase_query.indexOf(option) !== -1;
    });
}

/*
// we want to return a bool (whether a match has been found or not)
var test_match_from_slash_options = function (slash_options_string, query_word) {
    
    
    back.log("slash_options_string = ", slash_options_string);
    back.log("query_word = ", query_word);
    
    // todo improve this into something more modular
    // capitalized words like December seem to be throwing a bug
    query_word = query_word.toLowerCase();
    
    
    var slash_options_list = slash_options_string.split("/");
    
    back.log("slash_options_list = ", slash_options_list);
    
    var boolean = false;
    for (var i = 0; i < slash_options_list.length; i++) {
        if (query_word.indexOf(slash_options_list[i]) !== -1) {
            boolean = true;
            return boolean;
        } else {
            continue;
        }
    }
    return boolean;
};
*/


// this function returns either a string (the matched root)
// or false
var return_match_from_slash_options = function (slash_options_string, query_word) {
    
    back.log("[return_match_from_slash_options] slash-string = ", slash_options_string);
    back.log("[return_match_from_slash_options] query-word = ", query_word);
    
    var slash_options_list = slash_options_string.split("/");
    
    var output = false;
    for (var i = 0; i < slash_options_list.length; i++) {
        var substring = slash_options_list[i].toLowerCase();
        // if (query_word.indexOf(slash_options_list[i]) !== -1) {
        if (query_word.indexOf(substring) !== -1) {
            back.log("[return_match_from_slash_options] match found");
            back.log("[return_match_from_slash_options] match = ", slash_options_list[i]);
            output = slash_options_list[i];
            return output;
        } else {
            back.log("[return_match_from_slash_options] match not found continuing iteration");
            continue;
        }
    }
    back.log("[return_match_from_slash_options] output returned = ", output);
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

