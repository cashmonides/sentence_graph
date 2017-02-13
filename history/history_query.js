///////// MASTER FUNCTION
// returns: nothing, but calls calback with data

// number_of_items = how many total words we want & how many total roots we want
// mastery_score_range e.g. [0.3, 0.7]
// sorting_type (sort_high||sort_low||shuffle)
// weighting_map e.g. {'targeted': 0.8, 'unseen': 0.1, 'untargeted': 0.1}
// allowed_roots e.g. ['BI', 'PED']
// word_root_ratio e.g. {'word': 0.8, 'root': 0.2}

var get_items_from_word_scores = function (firebase_path, mastery_score_range,
sorting_type, weighting_map, allowed_roots, callback) {
    Persist.get(firebase_path, function (x) {
        var data = x.val();
        var available_roots = sub_master_function(
            data, mastery_score_range, allowed_roots,
            sorting_type, weighting_map, 'root');
        var available_words = sub_master_function(
            data, mastery_score_range, allowed_roots,
            sorting_type, weighting_map, 'word');
        var available_words_and_root_map = {
            'words': available_words,
            'roots': available_roots
        };
        callback(available_words_and_root_map); 
    });
}

var sub_master_function = function (data, mastery_score_range, allowed_roots,
sorting_type, weighting_map, type) {
    // returns a map with keys seen, targeted, untargeted
    var categorized = master_categorize(
        data, mastery_score_range, allowed_roots, type);
    // shuffle or sort low-hi hi-low
    var sorted = shuffle_or_sort(categorized, sorting_type);
    // concatenate into a final list
    var available = concatenate_different_types(sorted, weighting_map);
    return available;
}

// returns a map 
// keys: unseen, targeted, untargeted
// values: list of strings e.g. ['bi', 'arthr']
var master_categorize = function (data, mastery_score_range, allowed_roots, type) {
    var seen = categorize_seen_items(data, type);
    var targeted = get_targeted_items(seen, mastery_score_range);
    var untargeted = get_untargeted_items(seen, mastery_score_range);
    // the keys of seen are the words/roots that have been seen.
    // so we can filter allowed by not being in (that is, a key of) seen.
    var unseen = get_unseen(seen, allowed_roots, type);
    // in the future, potentially do some filtering to not have more than 100 items
    return {
        'unseen': unseen,
        'targeted': targeted,
        'untargeted': untargeted
    }
}

////////// GET

// returns list
var get_unseen = function (seen, allowed_roots, type) {
    var allowed;
    if (type === 'root') {
        allowed = allowed_roots;
    } else {
        var allowed_roots_set = set_from(allowed_roots);
        allowed = Object.keys(words).filter(function (x) {
            return words[x].roots.some(function (root) {
                return root in allowed_roots_set;
            });
        })
    }
    return allowed.filter(function (x) {
        return !(x in seen);
    });
}


///////// FILTER INTO WORDS AND ROOTS
/* 
below categorizes the word_scores we get from firebase
divides into words and roots
and makes a map from item to mastery_score

output e.g. 
var seen_roots = {
    'arthr': 0.7,
    'bi': 0.3
}
*/

var categorize_seen_items = function (data, type) {
    var seen_items_map = {};
    for (var key in data) {
        if (data[key].type === type) {
            // Get mastery score as value.
            seen_items_map[key] = data[key].mastery;
        }
    }
    return seen_items_map;
}


///////// FILTER INTO TARGETTED, UNTARGETTED, UNSEEN
//returns list of strings
var get_targeted_items = function (key_to_mastery_map, mastery_score_range) {
    return Object.keys(key_to_mastery_map).filter(function (key) {
        return within_mastery_score_range(key_to_mastery_map[key], mastery_score_range);
    });
}

// returns list of strings
var get_untargeted_items = function (key_to_mastery_map, mastery_score_range) {
    return Object.keys(key_to_mastery_map).filter(function (key) {
        return !within_mastery_score_range(key_to_mastery_map[key], mastery_score_range);
    });
}

var within_mastery_score_range = function (mastery, mastery_score_range) {
    return mastery_score_range[0] <= mastery && mastery <= mastery_score_range[1];
}




////////// SORT
// either shuffle, rank high to low, rank low to high
var shuffle_or_sort = function (categorized, sorted_type) {
    // todo add later
    return categorized;
}


////////// CONCATENATE
var concatenate_different_types = function (sorted, weighting_map) {
    // todo add later
    return sorted;
}






