//set-up data
//choose which dictionary to use
var morphology_dictionary_chooser = {
    'latin verb morphology beginning': latin_verb_morphology_beginning,
    'latin verb morphology middle': latin_verb_morphology_middle,
    'latin verb morphology ending': latin_verb_morphology_ending
}



// pre-traverser tester
// test for minimum arguments
// test for non-matched arguments
// test for duplicate arguments




// traverser itself

//set up an empty list

//choose which dictionary to use


// set up the default sub-routine

//push to list

// remove duplicates from the list





//eventually we're going to expand the concept of match to include:
// greater than or equal to (e.g. greater than lgi unit 16)
var keyword_matches = function (keyword, key) {
    return key === keyword;
}

var some_keyword_matches = function (list_of_keywords, key) {
    for (var i = 0; i < list_of_keywords.length; i++) {
        var keyword = list_of_keywords[i];
        if (keyword_matches(keyword, key)) {
            return true;
        }
    }
    return false;
}


// Function that traverses dictionary recursively.
//arguments
    //dictionary = dictionary we want to traverse (e.g. verb morphology of middle)
    //list of key-match terms = key which we want to match (e.g. present indicative passive, 2s, basic )
// returns
    // - list of values that matched
    
var morphology_dictionary_traverser = function (dictionary, list_of_keywords) {
    // This is the base case of the recursion.
    // If the dictionary is actually a string, then we're at the bottom layer of nesting
    //so we just return a list with that string
    // e.g. we've hit '-aba' so we return a list
    // (we don't return a string because we want to be consistent 
    //and in other cases of recursion we return a list)
    if (typeof dictionary === 'string') {
        return [dictionary];
    }
    // matched_key helps us keep track of whether we need to trigger default or not
    // when matched_key == true, we don't match default
    // when matched_key == false, we do match default
    var matched_key = false;
    // at each round we are going to be concatenating our current match list 
    // with our master match list (i.e. all the matches so far)
    // (we want to avoid simply mutating the master match list)
    var current_match_list = [];
    // otherwise we have hit another layer of nesting,
    // so we loop over
    // FIRST PASS (skip default no matter what)
    for (var key in dictionary) {
        // run through an if block
        // either we hit default
        // in which case we do nothing 
        // or we hit a match, in which case we recurse and push
        // in other words, we only have to do something if
        // - the key is not default
        // and
        // - the key matches
        if (key !== 'default' && some_keyword_matches(list_of_keywords, key)) {
            // the recursion takes place here
            // we push not a list directly 
            // but rather the results of another call of our function
            // on the subdictionary
            // this process keeps recursing until it hits a string
            // at which time it returns that as a list
            // example:
            // key = 'present infinitive passive'
            // dictionary[key] =
            // {
            //    'conjugation 1': '-ārī',
            //    'conjugation 2': '-ērī',
            //    'conjugation 3': '-ī',
            //    'conjugation 3i': '-ī',
            //    'conjugation 4': '-īrī',
            // }
            current_match_list.push(morphology_dictionary_traverser(
                dictionary[key], list_of_keywords));
            // we matched a key so we don't want default to be matched
            matched_key = true;
        }
        //or we have no matches and no default and we do nothing
    }
    // SECOND PASS (add default if required, do nothing else)
    // the following handles a situation where:
    // we haven't matched with any keyword
    // and there exists a default
    if ('default' in dictionary && !matched_key) {
        // example:
        // dictionary =
        // {
        //    'gradeschool': '-ris',
        //    'lgi': '-ris/re',
        //    'default': '-ris',
        // }
        // dictionary['default'] = '-ris'
        // we want to recurse because maybe dictionary['default'] is
        // itself a dictionary
        current_match_list.push(morphology_dictionary_traverser(
            dictionary['default'], list_of_keywords));
    }
    // when we push an item to current match list, that item is an array of matches
    // so current match list is an array of arrays of matches
    // we have to concatinate it to return an array
    return concat_all(current_match_list);
}

// this is the main function
// arguments:
// - a single list as in design docs
// where to look + keywords we're looking for
// example:
// ['latin verb morphology middle', imperfect indicative active', 'conjugation 1', '3s']
// returns
// - a list of unique matches
var morphology_dictionary_traverser_main = function (arguments_as_list) {
    var dictionary_name = arguments_as_list[0];
    // Check that the dictionary_name refers to a dictionary
    // and throw an error if not.
    // example of when this is triggered: 'latin verb morphology end'
    // is used instead of 'latin verb morphology ending'
    if (!(dictionary_name in morphology_dictionary_chooser)) {
        throw 'No dictionary ' + dictionary_name + ' in morphology_dictionary_chooser!';
    }
    // we don't want to convert a string directly to a variable
    // so we do a lookup in morphology_dictionary_chooser
    var dictionary = morphology_dictionary_chooser[dictionary_name];
    // slice(1) removes the 0th item
    // we flatten any nested lists into a list by concatenating
    var list_of_keywords = concat_all(arguments_as_list.slice(1));
    // we get a list of matches, which will contain some duplicates
    var list_of_matches = morphology_dictionary_traverser(dictionary, list_of_keywords);
    // remove duplicates by calling unique_items
    var list_of_unique_matches = unique_items(list_of_matches);
    return list_of_unique_matches;
}

