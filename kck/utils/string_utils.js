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

// OPERATIONS THAT HANDLE ETYMOLOGICAL DATA
// we want to remove metadata such as "root 2" in ["pos", "pot root 2"]
var remove_metadata_from_roots = function (root_list) {
    // todo make this less ad hoc
    console.log("TURKEYSTRING premodified root_list = ", root_list);
    var new_list = [];
    for (var i = 0; i < root_list.length; i++) {
        console.log('TURKEYSTRING root_list[i] =', root_list[i]);
        // root_list[i].replace("root " + /[1-9]/g, "XXXX");
        console.log("TURKEYSTRING premodified item = ", root_list[i]);
        var item_to_push = root_list[i].replace("root", "");
        item_to_push = item_to_push.replace(/[1-9]/g, '');
        item_to_push = item_to_push.replace(/ /g, '');
        console.log("TURKEYSTRING postmodified item = ", item_to_push);
        new_list.push(item_to_push);
    }
    console.log("TURKEYSTRING modified_root_list = ", root_list);
    // return root_list;
    console.log("TURKEYSTRING new_list = ", new_list);
    return new_list;
}

