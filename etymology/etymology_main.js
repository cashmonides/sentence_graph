var score = 0;

var n_of_choices = 4;

/*
//gets the level that has an associated lexicon that is at or closest beneath the argument (int)
var get_level = function (n) {
    return math_max(Object.keys(limited_lexemes).filter(
        function (x) {return x <= n}))
};
*/

//it = word (i.e. item) that is a wrong answer
//r = root
// w = word that contains r
// ws = dictionary of words
    // keys: strings                    "aquarium"
    // values: dictionaries        {meaning....root....grade_level...}
// returns int (measure of difficulty in ruling out item based on similarity to correct answer )
    //similarity is measured on meaning similarity (co-occurrence of long words in the meaning field of both it and w)
    // and on the basis "false root" (i.e. string of the root occurs in it(em) but root is not the root of it(em) pants pangea are related if r=pan
var relatedness = function (it, r, w, ws) {
    //c is an int, measuring "false root" connection
    var c = 0;
    //throw out "root 1"
    //get list of different forms of root (lith/lit)
    //check whether each for (lith/lit) is in it(em)
    r.split(' ')[0].split('/').forEach(function (x) {
        if (it.indexOf(x.toLowerCase()) !== -1) {c += 3}
    });

    //d is an int, measuring similarity of meaning
    //split meaning of w into constituent words
    //check whether each word is in meaning of it(em)
    //only if its length is greater than 3
    var d = 0;
    ws[w]['meaning'].split(' ').forEach(function (x) {
        if (ws[it]['meaning'].split(' ').indexOf(x) !== -1
            && x.length > 3 ) {d++}
    });

    //add two measures of relatedness
    return c + d;
};

//we want to eliminate answer choices that have similar roots, e.g. hydrophobia & aquarium
//takes words and roots
//returns a dictionary with the following properties
    // "r" : root                       e.g. "AQU"
    // "r_like" : r & its similar roots [strs]  e.g. ["HYDR", "AQU"]       //based on common word in meaning
    // "w" : word that contains the root r     e.g. aquarium
    // "b" : all words that contain no roots in r_like   e.g. all words without HYDR and AQU
    // "difficulties" : {
//            b_1 :  int,          macropod : 0   (because relatedness in
//            b_2 : int,           phydrolith: 5 (because string hydr occurs but not root HYDR)
//            b_3 : int            encephalitis: 4 (because the word "water" occurs in its definition)
//}
var single_try = function (ws, rs) {
    var r = random_choice(Object.keys(rs));
    var r_like = Object.keys(rs).filter(function (root) {
        return something_in_common(rs[r]['meaning'].split(', '),
            rs[root]['meaning'].split(', '))});
    var w = random_choice(Object.keys(ws).filter(function (x) {
        return ws[x]['roots'].indexOf(r) !== -1}));
    var b = Object.keys(ws).filter(function (x) {
        return !something_in_common(ws[x]['roots'], r_like)
    });
    return {'difficulties': keys_mapped_by_function(b, function (x) {
        return relatedness(x, r, w, ws)}),
        'r': r, 'r_like': r_like, 'w': w, 'b': b}
};

/*
//initialize times remaining as times seen &  times remaining will decrease
var initialize = function () {
    for (var word in words) {
        words[word]['times remaining'] = words[word]['times seen']
    }
};

//when user gets a word wrong, resets times?????debug
var show_word_again = function (word) {
    words[word]['times remaining'] = words[word]['times shown']
};

//returns empty string or definition based upon times remaining
// also decrements times remaining if not already 0
var definition = function (word) {
     if (words[word]['times remaining'] === 0) {
         return ''
     } else {
         words[word]['times remaining']--;
         return ' (' + words[word]['meaning'] + ')'
     }
};
*/


/*//sets allowed lexicons
var change_lexemes_and_lexicon = function (g) {
    if (Array.isArray(limited_lexemes[g])) {
        limited_lexemes[g] =
            convert_keys_to_dict(limited_lexemes[g], roots)
    }
    if (!(g in limited_lexicons)) {
        limited_lexicons[g] = convert_keys_to_dict(Object.keys(words).filter(function (x) {
            return is_sub_list(Object.keys(limited_lexemes[g]),
                words[x]['roots'])}), words)
    }
};
*/

var get_words_and_roots = function (root_list) {
    return {'roots': convert_keys_to_dict(root_list, roots),
    'words': convert_keys_to_dict(Object.keys(words).filter(function (x) {
            return is_sub_list(root_list, words[x]['roots'])
            && words[x]['grade'] < 13}), words)
    }
};

//selects the most difficult of n attempts at selecting question
// n presumably higher at higher levels
var create_etymology_question = function (score, words_and_roots) {
    var j;
    var d = [];
    var words_allowed = words_and_roots.words;
    var roots_allowed = words_and_roots.roots;
    // var g = get_level(score);
    // change_lexemes_and_lexicon(g);
    for (j = 0; j < 10; j++) {d.push(single_try(words_allowed, roots_allowed))}
    var best = {'difficulties': [-1]};
    for (j = 0; j < 10; j++) {
        if (math_max(values(d[j]['difficulties'])) >
        math_max(values(best['difficulties']))) {best = d[j]}
    }
    var l = shuffle(Object.keys(best['difficulties']).sort(function (x, y) {
        return best['difficulties'][x] > best['difficulties'][y] ? 1 : -1}).
        slice(-n_of_choices + 1).concat(best['w']));
    return {'meaning_asked_about': roots_allowed[best['r']]['meaning'],
    'word_choices': l, 'correct': best['w']};
};