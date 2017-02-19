///////// MASTER FUNCTION
// this is our master_function
    // it performs the get and receives data
    // then it runs the sub_master_function on that data twice
    // once for roots and once for words
    // returns nothing but performs a callback on: map of available words and roots
    // with key='words'||'roots'
    // and value=list of strings

// parameters:
    // number_of_items = how many total words we want & how many total roots we want
    // mastery_score_range e.g. [0.3, 0.7]
    // sorting_type (sort_high||sort_low||shuffle)
    // weighting_map e.g. {'targeted': 0.8, 'unseen': 0.1, 'untargeted': 0.1}
    // allowed_roots e.g. ['BI', 'PED']
    // word_root_ratio e.g. {'word': 0.8, 'root': 0.2}

var get_items_from_word_scores = function (firebase_path, mastery_score_range,
sorting_type, allowed_roots, callback) {
    Persist.get(firebase_path, function (x) {
        var data = x.val();
        var available_roots = sub_master_function(
            data, mastery_score_range, allowed_roots,
            sorting_type, 'root');
        var available_words = sub_master_function(
            data, mastery_score_range, allowed_roots,
            sorting_type, 'word');
        var available_words_and_roots_map = {
            'words': available_words,
            'roots': available_roots
        };
        callback(available_words_and_roots_map); 
    });
}



////// SUB MASTER FUNCTION
// called twice
// once with type=root and once with type=word
var sub_master_function = function (data, mastery_score_range, allowed_roots,
sorting_type,type) {
    // returns a map
    // either of roots or words
    // keys: seen, targeted, untargeted
    // value: map from word/root to mastery score
    var categorized = master_categorize(
        data, mastery_score_range, allowed_roots, type);
    // shuffle or sort (ascending descending)
    var sorted = shuffle_or_sort(categorized, sorting_type);
    return sorted;
    // concatenate into a final list
    // var available = concatenate_different_types(sorted, weighting_map);
    // return available;
}



// CATEGORIZE THE DATA
// returns a map 
// keys: unseen, targeted, untargeted
// values: list of strings e.g. ['bi', 'arthr']


// paraphrase: after getting raw data, sort into unseen, targeted, untargeted
// along with their mastery score (for purposes of sorting later)
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

///////// FILTER INTO WORDS AND ROOTS
/* 
below categorizes the word_scores we get from firebase
divides into words and roots
and makes a map from item to mastery_score


input: map
{
'arthropod': {
    'type': 'word',
    'mastery': .5,
    'name': 'arthropod',
     // an example of data we don't care about, not exactly what there is
    'categorization': 'animal',
    ...
},
'arthr': {
    'type': 'root',
    'mastery': .7,
    'name': 'arthr',
    'categorization': 'body part',
    ...
},
...



output (run twice, once for words and once for roots) e.g. 
var seen_items = {
    'arthr': 0.7,
    'bi': 0.3
}



*/

// returns a map from roots to mastery level
var categorize_seen_items = function (data, type) {
    // filter by type (e.g. root or word)
    // return a map only with the desired type
    var filtered_values = values(data).filter(function (value) {
        // key might be 'arthr'
        /* value might be {
            'type': 'root',
            'mastery': .7,
            'name': 'arthr',
            'categorization': 'body part',
            ...
        }
        */
        // first type (value.type) is the property 'type': 'root' e.g.
        // second type (type) is the argument passed into the function
        return value.type === type;
    });
    /*
    var altered_map = alter_all_dictionary_values(filtered_data, function (map) {
        return map.mastery;
    });
    */
    
    return filtered_values;
}



///////// GET TARGETTED, UNTARGETTED, UNSEEN
// run twice, once for roots and and once for words
// returns map 
// 'arthropod': 0.7
var get_targeted_items = function (list_of_word_or_root_objects, mastery_score_range) {
    return list_of_word_or_root_objects.filter(function (object) {
        return within_mastery_score_range(object.mastery, mastery_score_range);
    });
}

// run twice, once for roots and and once for words
// returns map 
// 'arthropod': 0.7
var get_untargeted_items = function (list_of_word_or_root_objects, mastery_score_range) {
    return list_of_word_or_root_objects.filter(function (object) {
        return !within_mastery_score_range(object.mastery, mastery_score_range);
    });
}

var has_at_least_one_allowed_root = function (word, allowed_roots_set) {
    return word.roots.some(function (root) {
        return root in allowed_roots_set;
    });
}

var get_allowed = function (allowed_roots, type) {
    if (type === 'root') {
        // If we want roots, the allowed roots are given.
        return allowed_roots;
    } else {
        // We need the words with at least one of the allowed roots.
        var allowed_roots_set = set_from(allowed_roots);
        return Object.keys(words).filter(function (x) {
            var word = words[x];
            return has_at_least_one_allowed_root(word, allowed_roots_set);
        })
    }
}

var create_default_data_rich_object = function (string, type) {
    return {
        'item': string,
        'type': type,
        'mastery': -10,
        'correct': 0,
        'used_all_attempts': 0,
        'hints': 0,
        'total': 0
    }
}


// returns a map of string to mastery score
// where mastery score is for unseen words a default value
// which currenty has no use but is retained for reasons of symmetr
var get_unseen = function (seen, allowed_roots, type) {
    var allowed = get_allowed(allowed_roots, type);
    var unseen_list = allowed.filter(function (x) {
        return !(x in seen);
    });
    var unseen_map = unseen_list.map(function (string) {
        return create_default_data_rich_object(string, type);
    });
    return unseen_map;
}


// a basic util that checks if we are within range
var within_mastery_score_range = function (mastery, mastery_score_range) {
    return mastery_score_range[0] <= mastery && mastery <= mastery_score_range[1];
}




////////// SORT
// either shuffle, rank high to low, rank low to high
// keys of categorized: unseen, untargeted, targeted
// each value is a dictionary from string to mastery

// we want each value to be a list of strings (words or roots)

var shuffle_or_sort = function (categorized, sorting_type) {
    return alter_all_dictionary_values(categorized, function (list) {
        // list of words or roots
        // output of below would be e.g.
        // ['arthropod', 'xenophobia', ...]
        
        if (sorting_type === 'ascending') {
            return list.sort(function (item_1, item_2) {
                return item_1.mastery - item_2.mastery;
            });
        } else if (sorting_type === 'descending') {
            return list.sort(function (item_1, item_2) {
                return item_2.mastery - item_1.mastery;
            });
        } else if (sorting_type === 'shuffle') {
            return shuffle(list);
        } else {
            throw Error('Unrecognized sorting type ' + sorting_type);
        }
    });
}

/*
////////// CONCATENATE
var concatenate_different_types = function (sorted, weighting_map) {
    // todo add later
    return sorted;
}
*/








/*
RAW INPUT
map of keys to dictionary

arthropod: {
    master: 0.7,
    type: root
}




INPUT OPTIONS
b
option 1
[['arthropod', 0.7], ['vertebrate', 0.4]]

option 1.5

[['arthropod', {'mastery': 0.7, extra_info: xyz}], ['vertebrate', {'mastery': 0.4, 'extra_info': xyz}]]


option 2
[{'arthropod': 0.7}, {'vertebrate': 0.4}]


option 3
{ 
'arthropod': 
    {'mastery': 0.7, extra_info: xyz}, 
'vertebrate': 
    {'mastery': 0.4, 'extra_info': xyz}
}

option 4
{ 
'arthropod': 0.7,
'vertebrate': 0.4
}



OUTPUT

scrubbed list of strings
['arthropod', 'invertebrate', 'anemic']


unscrubbed list of strings
[['arthropod', 0.7], ['vertebrate', 0.4]]

unscrubbed map of strings
{ 
'arthropod': 0.7,
'vertebrate': 0.4
}



*/
