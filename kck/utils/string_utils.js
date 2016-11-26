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
    
    // console.log("MANCHESTER3 sanity check begin");
    // var query_word1 = 'carnivorous';
    // var substring1 = 'carn';
    
    // if (query_word1.indexOf('carnov') !== -1) {
    //     console.log("MANCHESTER3 sanity check match found");
    // } else {
    //     console.log("MANCHESTER3 sanity check match not found");
    // }
    
    // // if (query_word1.indexOf('carn') !== -1) {
    // //     console.log("MANCHESTER3 sanity check match found");
    // //     console.log("MANCHESTER3 sanity check discovered match = ", substring1);
    // //     var output = substring1;
    // //     return;
    // // } else {
    // //     console.log("MANCHESTER3 sanity check MATCH NOT FOUND continuing iteration");
    // //     return
    // // }
    // console.log("MANCHESTER3 sanity check end");
    
    
    ///PASTING SANITY CHECK BEGIN
    
    // console.log("MANCHESTER3 sanity check begin");
    
    // console.log("MANCHESTER3 sanity check input slash-string = ", slash_options_string);
    // console.log("MANCHESTER3 sanity check input query-word = ", query_word);
    
    // var query_word1 = query_word;

    // var slash_options_list = slash_options_string.split("/");

    // console.log("MANCHESTER3 sanity check slash_options_list = ", slash_options_list);
    // console.log("MANCHESTER3 sanity check slash_options_list[0] = ", slash_options_list[0]);
    
    // var substring1 = slash_options_list[0];
    // substring1 = substring1.toLowerCase();
    
    // console.log("MANCHESTER3 sanity check query_word1 = ", query_word1);
    // console.log("MANCHESTER3 sanity check substring1 = ", substring1);
    
    // if (query_word1.indexOf(substring1) !== -1) {
    //     console.log("MANCHESTER3 sanity check match found");
    // } else {
    //     console.log("MANCHESTER3 sanity check match not found");
    // }
    

    // console.log("MANCHESTER3 sanity check end");
    

    ////PASTING SANITY CHECK END
    
    
    //CASE WITH LOWER CASE
    
    console.log("MANCHESTER3 entering return_match");
    console.log("MANCHESTER3 input slash-string = ", slash_options_string);
    console.log("MANCHESTER3 input query-word = ", query_word);
    
    var slash_options_list = slash_options_string.split("/");
    
    
    console.log("MANCHESTER3 slash_options_list = ", slash_options_list);
    
    var output = false;
    for (var i = 0; i < slash_options_list.length; i++) {
        console.log("MANCHESTER slash_options_list[i] = ", slash_options_list[i]);
        console.log("MANCHESTER3 word we're checking = ", query_word);
        console.log("MANCHESTER3 equation = ", query_word.indexOf(slash_options_list[i]) !== -1);
        console.log("MANCHESTER3 value = ", query_word.indexOf(slash_options_list[i]));
        var substring = slash_options_list[i].toLowerCase();
        // if (query_word.indexOf(slash_options_list[i]) !== -1) {
        if (query_word.indexOf(substring) !== -1) {
            console.log("MANCHESTER match found");
            console.log("MANCHESTER discovered match = ", slash_options_list[i]);
            output = slash_options_list[i];
            return output;
        } else {
            console.log("MANCHESTER MATCH NOT FOUND continuing iteration");
            continue;
        }
    }
    console.log("MANCHESTER output returned = ", output);
    return output;
    
    
    ///NO TOLOWER CASE VERSION
    /*
    console.log("MANCHESTER3 entering return_match");
    console.log("MANCHESTER3 input slash-string = ", slash_options_string);
    console.log("MANCHESTER3 input query-word = ", query_word);
    
    var slash_options_list = slash_options_string.split("/");
    
    
    console.log("MANCHESTER3 slash_options_list = ", slash_options_list);
    
    var output = false;
    for (var i = 0; i < slash_options_list.length; i++) {
        console.log("MANCHESTER slash_options_list[i] = ", slash_options_list[i]);
        console.log("MANCHESTER3 word we're checking = ", query_word);
        console.log("MANCHESTER3 equation = ", query_word.indexOf(slash_options_list[i]) !== -1);
        console.log("MANCHESTER3 value = ", query_word.indexOf(slash_options_list[i]));
        var substring = slash_options_list[i];
        // if (query_word.indexOf(slash_options_list[i]) !== -1) {
        if (query_word.indexOf(substring) !== -1) {
            console.log("MANCHESTER match found");
            console.log("MANCHESTER discovered match = ", slash_options_list[i]);
            output = slash_options_list[i];
            return output;
        } else {
            console.log("MANCHESTER MATCH NOT FOUND continuing iteration");
            continue;
        }
    }
    console.log("MANCHESTER output returned = ", output);
    return output;
    
    */
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

