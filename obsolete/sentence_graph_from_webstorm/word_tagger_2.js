// The two following functions are basic string processing functions.
// This function tests whether a character is a letter.
// It covers variations of the English/Latin alphabet, Greek letters, and Cyrillic letters.
function is_word_char (c){
    return /[A-Za-zÀ-ɏΐ-ϿЀ-ԧ]/.test(c);
}

// This function tests whether a character is a bracket, slash,
// or start character (that is, in '|[]()<>{}/'). However, we
// currently handle only (, ), /, and |. We use a string
// instead of a regex because of how many characters
// would need to be escaped.
function is_conj_char (c){
    return '|[]()<>{}/'.indexOf(c) !== -1;
}

// This function takes a set and:
// 1: makes a list from our set (using Array.from,
// which works in Firefox and Chrome, but not Safari).
// 2: returns a sorted version of the list.
// set is reserved to some extent, so we call our parameter
// the_set instead.
function convert_set_to_sorted_list (the_set) {
    return Array.from(the_set).sort(function(a, b) {return a - b});
}

// This function gives the words of the sentence id and onclick properties.
// It has no return value and is called for its side effects.
// Its parameters are the word selector and the box containing the sentence.
function load_sentence_2(word_selector, input_box) {
    // We iterate over the children of the input_box.
    // Note that children does not include the text nodes (for us, the punctuation).
    for (var pos = 0; pos < input_box.children.length; pos++){
        // s is a span.
        var s = input_box.children[pos];
        // We give id here.
        // id numbering is 1-based.
        s.id = pos + 1;
        // This is a clever thing to do with closures.
        // The idea is that we want to fix id, which we do by making a function that takes
        // id as an argument and then gives us the function we actually want as a return value.
        // The function we actually want takes event as an argument
        // because Firefox requires it and Google and Safari
        // are fine either way.
        s.onclick = (function (id) {
            return function (event) {word_selector.click_action(event, id)}
        })(pos + 1);
    }
}

// This function automatically tags words that can be automatically tagged.
// It has no return value and is called for its side effects.
// Its parameters are the sentence and the dictionary of
// words that can be automatically tagged.
function automatic_tag(sentence, word_selector, auto_dict) {
    // We iterate over the words in sentence.words.
    // Because sentence.words is 1-based, we start with i as 1.
    for (var i = 1; i < sentence.words.length; i++) {
        // We assign the variable word to the lowercase version of our word.
        // We convert our word to lower case
        // to avoid having to make huge numbers of duplicate
        // entries in our dictionary. The word, however,
        // if it is upper case, will still show up as such
        // in the regions box.
        var word = sentence.words[i].toLowerCase();
        // We check whether our word is in the dictionary of
        // words that can be automatically tagged. If not,
        // we do nothing. If so, we tag our word via submit_tag
        // (as opposed to manually following the (two) necessary steps
        // as commented out). The reason for this is that
        // now we gain any new functionality submit_tag gets
        // (i.e., implied tags).
        if (word in auto_dict) {
            submit_tag(auto_dict[word], sentence, [i], word_selector);
            /*
            // We create an appropriate tag.
            var tag = new SingleRegionTag(auto_dict[sentence.words[i].toLowerCase()]);
            // We do a debugging log.
            console.log("MAKING REGION");
            // We make a region with just our word.
            var region = sentence.get_or_make_region([i]);
            // We do another debugging log.
            console.log("ADDING TAG ", sentence.words[i]);
            // We add our tag to our region.
            region.add_tag(tag);
            // We do yet another debugging log.
            console.log("REGION + TAGS", JSON.stringify(region));
            */
        }
    }
}

// This function makes the delete_tags button trigger submit_tags
// with the special tag type delete.
function set_delete_tags_behavior(sentence, word_selector) {
    document.getElementById("delete_tags").onclick =
        function () {submit_tag_and_clean_up('delete', sentence, word_selector)}
}

// This function determines whether two lists are the same.
// It takes both lists as arguments and returns a boolean.
// This function is here because it seems generally useful.
function equals_list(list_1, list_2) {
    // We determine whether our lists have the same length.
    if (list_1.length === list_2.length) {
        // Our lists have the same length, so we can loop through them
        // with the same parameter. We do so.
        for (var i = 0; i < list_1.length; i++) {
            // If list_1 and list_2 differ at position i, we return false.
            if (list_1[i] !== list_2[i]) {
                return false;
            }
        }
        // Our lists are the same length and have the same element
        // at each position, so we return true.
        return true;
    } else {
        // Our lists do not have the same length, so we can return false.
        return false;
    }
}

// This function, given a sentence, logs the relationships between
// the clauses of the sentence and does nothing else.
function log_relationships(sentence) {
    // We iterate over regions.
    for (var i = 0; i < sentence.regions.length; i++) {
        // We log 'clause'.
        console.log('clause');
        // We log the text of the clause.
        console.log(sentence.indices_to_string(sentence.regions[i].indices));
        // We log 'clause type'.
        console.log('clause type');
        // We log the clause type of the clause.
        console.log(sentence.regions[i].clause.clause_type);
        // We iterate over relationship types.
        ['subordinate', 'superordinate', 'coordinate_all',
            'coordinate_left', 'coordinate_right'].forEach(
            function (x) {
                // We check that the clause has the relationship type.
                // If not, we do nothing.
                if (x in sentence.regions[i].clause) {
                    // We log the relationship type.
                    console.log(x);
                    // We check whether (the return value of)
                    // the value of the relationship type is an array.
                    if (Array.isArray(sentence.regions[i].clause[x]())) {
                        // It is an array. For each clause in it, we log the text of the clause.
                        sentence.regions[i].clause[x]().forEach(
                            function (y) {console.log(sentence.indices_to_string(y.indices))})
                    } else {
                        // It is not an array, just a clause. We log the clause.
                        console.log(sentence.indices_to_string(
                            sentence.regions[i].clause[x]().indices));
                    }
                }
            }
        )
    }
}

var implied_tags = function (tag_name) {
    if (["subject", "object", "predicate"].indexOf(tag_name) !== -1) {
        return ["noun"]
    } else if (tag_name.indexOf("article") !== -1 && tag_name !== "article") {
        return ["article"];
    } else {
        return [];
    }
};