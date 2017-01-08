// This file contains utils involving sorting.
// It also contains long functions passed to sort.

var cmp = function (a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        // We want to catch weird cases, like NaN.
        throw 'Impossible ordering for ' + JSON.stringify(a) +
        ' and ' + JSON.stringify(b) + '!';
    }
}

function sort_numbers(list){
    return list.sort(function (a, b) {return a - b;});
}

function quick_sort(list, f) {
    // Note: this did not sort a list of lists correctly,
    // but now it does.
    if (is_empty(list)) {return []}
    // We sort from random index (original data may be somewhat sorted).
    // Perhaps we should switch to merge sort.
    var n = rand_int(list.length);
    var pivot = list[n];
    var rest = remove(list, n);
    var before = rest.filter(function (x) {return f(x, pivot)});
    var after = rest.filter(function (x) {return f(pivot, x)});
    return quick_sort(before, f).concat([pivot], quick_sort(after, f))
}

var separate_and_sort_by = function (list, f) {
    var separated = [];
    var types = [];
    var item;
    var type_of_i;
    var pos;
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        type_of_i = f(item);
        pos = types.indexOf(type_of_i);
        if (pos === -1) {
            types.push(type_of_i);
            separated.push([item]);
        } else {
            separated[pos].push(item);
        }
    }
    return quick_sort(separated, function (i, j) {return f(i[0]) < f(j[0])});
}

// This is not currently used, but might be useful.
var sort_by_prop = function (s) {
    return function (x, y) {return x.s < y.s};
}

var sort_by_func = function (f) {
    return function (x, y) {return f(x) < f(y)};
}

var alphabetize_list = function (l) {
    return quick_sort(l, function (x, y) {
        return remove_long_vowels(x) < remove_long_vowels(y)})
}

var alphabetize_dict = function (d) {
    return quick_sort(key_value_pairs(d), function (x, y) {
        return remove_long_vowels(x[0]) < remove_long_vowels(y[0])})
}

var sentence_path_sort = function (x, y) {
    x = path_to_list(x);
    y = path_to_list(y);
    var l = Math.min(x.length, y.length);
    var c;
    for (var i = 0; i < l; i++) {
        c = sentence_part_item_sort(x[i], y[i]);
        if (c !== 0) {
            return c;
        }
    }
    return cmp(x.length, y.length);
}

var basic_list_sort = function (x, y) {
    var l = Math.min(x.length, y.length);
    var c;
    for (var i = 0; i < l; i++) {
        c = cmp(x[i], y[i])
        if (c !== 0) {
            return c;
        }
    }
    return cmp(x.length, y.length);
}

var sentence_part_item_sort = function (x, y) {
    var x_n = x.match(/\d+/g);
    var y_n = y.match(/\d+/g);
    if (x_n === null && y_n === null) {
        return author_sort(x, y);
    } else if (x_n === null && y_n !== null) {
        return 1;
    } else if (x_n !== null && y_n === null) {
        return -1;
    } else if (x_n !== null && y_n !== null) {
        var n = basic_list_sort(x_n.map(Number), y_n.map(Number));
        if (n !== 0) {
            return n;
        }
        return cmp(x, y);
    }
}

var author_sort = function (a, b) {
    if (is_earlier_author(a, b)) {
        return -1;
    } else if (is_earlier_author(b, a)) {
        return 1;
    } else if (a === b) {
        return 0;
    }
}

var is_earlier_author = function (a, b) {
    return a < b;
}

var region_sort = function (x, y) {
    if (x.pos === 'verb' && y.pos === 'noun') {
        return -1
    } else if (x.pos === 'noun' && y.pos === 'verb') {
        return 1;
    };
    var a = x.target_indices[0];
    var b = y.target_indices[0];
    return cmp(a, b);
}

var raw_region_sort = function (x, y) {
    var a = x.indices[0];
    var b = y.indices[0];
    return cmp(a, b);
}




var sort_map_by_values = function (map, reverse_bool) {

    var sortable = [];
    for (var item in map) {
        sortable.push([item, map[item]]);
    }
    
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    
    if (reverse_bool) {
        sortable.reverse();
    }
    
    console.log("SORTED MAP = ", sortable);
    
    return sortable;
}




// var sort_map_by_values_with_ties = function (map, reverse_bool) {

//     var sortable = [];
//     for (var item in map) {
//         var sub_list = [];
//         sortable.push([item, map[item]]);
//     }
    
    
//     sortable.sort(function(a, b) {
//         return a[1] - b[1];
//     });
    
//     if (reverse_bool) {
//         sortable.reverse();
//     }
    
//     console.log("SORTED MAP = ", sortable);
    
//     return sortable;
// }

// given a list of the form [[name1, score1], [name2, score2], ... ]
var group_ties_in_ranked_list = function (list) {
    
    var master_list = [];
    for (var i = 0; i < list.length; i++) {
        
        var sub_list = [];
        
        // test whether the current item is tied with the previous item
        // if so we push both items to a sublist and push that sublist to the master list
        if (i != 0 && list[i][1] === list[i-1][1]) {
            console.log("TIE FOUND, GROUPING INTO SUBLIST");
            
            sub_list.push(list[i-1]);
            sub_list.push(list[i]);
            master_list.push(sub_list);
            
            // remove the tied item
            var index_of_item_to_remove = master_list.indexOf(list[i-1]);
            if (index_of_item_to_remove > -1) {
                master_list.splice(index_of_item_to_remove, 1);
            }
            
        } else {
            master_list.push([list[i]]);
        }
        
        // remove duplicates from sub_list
        
    }
    
    
    console.log("LIST WITH TIES = ", master_list)
    return master_list;
    
}

var tie_detector = function (master_list, comparison_function, n) {
    // iterate through master_list
    // at each step we 
        // set current item (i)
        // set previous item (i-1)
        // set populated sublist
        // compare
            // is current tied with previous item (master_list index i-1)?
        // push
            // if no tie detected
                // push populated sublist to master_list
                // push current item to a new empty sublist
            // if tie detected
                // push current item to a populated sublist (if tie detected)
        // clean-up
            // if tie detected on final item, need to push final populated sublist to master_list 
    var previous_item;
    var current_item;
    var sublist = [];
    var ranked_list = [];
    for (var i = 0; i < master_list.length; i++) {
        
        current_item = master_list[i];
        
        // the first item has no previous item to compare to
        // so we push it to a list
        if (i === 0) {
            sublist.push(current_item);
            continue;
        }
        
        previous_item = master_list[i-1];
        
        // tie detection
        if (comparison_function(previous_item, current_item, n)) {
            // a tie has been detected
            // so we push current item to sublist
            sublist.push(current_item);
        } else {
            // no tie has been detected
            // so we push our sublist to master_list
            ranked_list.push(sublist);
            // and we reset the sublist to empty
            sublist = [];
            // and push our current item to that
            sublist.push(current_item);
        }
    }
    
    // clean-up
    // push our last sub_list
    ranked_list.push(sublist);

    return ranked_list;
}

// Probably worse than your version.
var dan_untested_hyper_compact_tie_detector = function (list, f) {
    var item;
    var result = [];
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        if (i === 0 || f(list[i - 1], item)) {
            peek(result).push(item);
        } else {
            result.push([item])
        }
    }
    return result;
}

var compare_nth_item_of_list = function (list_a, list_b, n) {
    // console.log("ITEM VALUE 1 = ", list_a[1])
    return list_a[n] === list_b[n];
}

var compare_second_item_of_list = function (list_a, list_b) {
    // console.log("ITEM VALUE 1 = ", list_a[1])
    return list_a[1] === list_b[1];
}


/*
var assign_rank_to_map_with_ties_from_stack_overflow = function (map) {
    // initialize an empty array that will be populated with items and sorted
    var arr = [];
    
    // we push each key-value combo in the map (x: y) to the array
    for (var item in map) {
        arr.push([item, map[item]])
    };
    
    
    // sort the list
    var sorted = arr.slice().sort(function(a,b){return b-a});
    
    // produce a ranking (taking ties into account)
    var ranks = arr.slice().map(function(v){ return sorted.indexOf(v)+1 });
    
    console.log("RANKS = ", ranks);
    
    return ranks;
}
*/




