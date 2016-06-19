// Goal: be able to apply automated tags to a text.
// More precisely:
// Take the text and its word selector.
// Start tagging (based on clues).
// Easiest way: meta-characters are word characters too.
// So @~| are probably safe.

// Examples:
// The cat@subject loves@tense~present|mood~indicative|secondary`sequence the dog@object.

// What operations can we perform on the word selector?

// We should be able to add a tag at an index (otherwise this is nearly impossible).

// Let's check.

// KEY functions:
// update_word_selector_tags_auto: updates the word selector
// update_sentence_tags_auto: updates the sentence
// produce_tags_list_tag_auto: produces the list of tags

// current issue: produce_tags_list_tag_auto always returns [] (the empty list)


var update_word_selector_tags_auto = function (tags) {
    // Each tag has an index and a name.
    var i_done = {};
    var tag;
    var index;
    for (var i = 0; i < tags.length; i++) {
        tag = tags[i];
        index = tag.index;
        // Avoid submitting duplicate pos tags.
        if (!(index in i_done)) {
            submit_tag(tag.noun_or_verb, [index]);
            i_done[index] = true;
        }
        submit_tag(tag.name, [index]);
    }
}

var get_real_type_tag_auto = function (input) {
    var i;
    var dd_type;
    for (i = 0; i < verb_drop_down_types.length; i++) {
        var dd_type = verb_drop_down_types[i];
        if (input in syntax_module_filter.verb_syntax[dd_type]) {
            return {'type': dd_type, 'noun_or_verb': 'verb'};
        }
    }
    for (i = 0; i < noun_drop_down_types.length; i++) {
        var dd_type = noun_drop_down_types[i];
        if (input in syntax_module_filter.noun_syntax[dd_type]) {
            return {'type': dd_type, 'noun_or_verb': 'noun'};
        }
    }
    throw 'Weird input: ' + input;
}

var alias_dict = {
    's': 'subject',
    'o': 'object',
    'p': 'predicate',
    'pa': 'predicate accusative',
    'sa': 'subject accusative of an indirect statement',
    'sa not is': 'subject accusative of an infinitive not in indirect statement',
    'ind': 'indicative',
    'subj': 'subjunctive',
    'subjunct': 'subjunctive',
    'inf': 'infinitive',
    'ss': 'secondary',
    'ps': 'primary',
    'secondary sequence': 'secondary',
    'primary sequence': 'primary',
    'subject': 'subject nominative',
    'object': 'accusative direct object',
    'predicate': 'predicate nominative',
    'proviso': 'proviso clause',
    'pres': 'present',
    'simultaneous': 'simultaneous time',
    'char': 'relative clause of characteristic',
    'simul': 'simultaneous time',
    'prior': 'prior time',
    'purpose': 'purpose clause',
    'rel purpose': 'relative clause of purpose',
    'am': 'ablative of means',
    'means': 'ablative of means',
    'manner': 'ablative of manner',
    'juss': 'jussive',
    'comp': 'compound',
    'compound': 'dative with compound verbs',
    'part': 'partitive',
    'partitive': 'partitive genitive',
    'abs': 'ablative subject in an ablative absolute',
    'abp': 'ablative predicate in an ablative absolute',
    'adv acc': 'adverbial accusative',
    'is': 'indirect statement',
    'iq': 'indirect question',
    'ic': 'indirect command',
    'si': 'subject infinitive',
    'fmv': "protasis/apodosis of a future more vivid conditional sentence",
	'fmv emph': "protasis/apodosis of a future more vivid conditional sentence with emphatic protasis",
	'flv': "protasis/apodosis of a future less vivid conditional sentence",
	'pres ctf': "protasis/apodosis of a present contrary to fact conditional sentence",
	'present ctf': 'pres ctf',
	'past ctf': "protasis/apodosis of a past contrary to fact conditional sentence",
	'mixed ctf': "protasis/apodosis of a mixed contrary to fact conditional sentence",
	'abl ell spat': "ablative with ellipsed spatial preposition"
}

var get_alias = function (x) {
    while (x in alias_dict) {
        x = alias_dict[x];
    }
    return x;
}

var tag_regex = /@+[a-zA-Z_\_|~`^]+/g;

var produce_tags_list_tag_auto = function (text) {
    var words = words_as_in_text(text);
    var word;
    var tags;
    var all_tags = [];
    for (var i = 0; i < words.length; i++) {
        word = words[i];
        tags = full_tag_process_auto(word);
        for (var j = 0; j < tags.length; j++) {
            tags[j].index = i;
            all_tags.push(tags[j])
        }
    }
    return all_tags;
}

var full_tag_process_auto = function (word) {
    var raw_tags = raw_tags_in_word_auto(word);
    var info_tags = raw_tags.map(text_to_info_auto_tag);
    var tags = info_tags.map(get_name_tag_auto);
    return tags;
}

var remove_at_sign = function (x) {
    if (x[0] === '@') {
        return x.slice(1);
    } else {
        return x;
    }
}

var text_to_info_auto_tag = function (x) {
    // We may need to remove the at sign.
    // (But we may not.)
    x = remove_at_sign(x);
    
    // Do different things based on whether there is a tilde.
    if (x.indexOf('~') === -1) {
        return {'text': x};
    } else {
        var parts = x.split(/~/g);
        if (parts.length !== 2) {
            throw 'parts of wrong length (not 2): ' + parts;
        }
        return {'text': parts[1], 'supposed_type': parts[0]};
    }
}

var raw_tags_in_word_auto = function (word) {
    // Match the tag_regex in word. Get one match or none.
    var e = word.match(tag_regex);
    if (e === null) {
        return [];
    }
    
    if (Array.isArray(e)) {
        if (e.length !== 1) {
            throw 'Weird matches: ' + JSON.stringify(e);
        }
        e = e[0];
    }
    
    // Be defensive and remove the at sign.
    e = remove_at_sign(e);
    
    return e.split('|');
}

var get_name_tag_auto = function (d) {
    // This checks that the input is valid.
    if (typeof d !== 'object' || !('text' in d)) {
        throw JSON.stringify(d) + ' is not valid!';
    }
    
    var input = d.text;
    var supposed_type;
    if ('supposed_type' in d) {
        supposed_type = d.supposed_type;
    } else {
        supposed_type = null;
    }
    input = get_alias(input.replace(/[`^]/g, ' '));
    var i;
    var dd_type;
    var type_and_nov = get_real_type_tag_auto(input);
    var type = type_and_nov.type;
    var noun_or_verb = type_and_nov.noun_or_verb;
    if (supposed_type !== null && supposed_type !== type) {
        throw 'Mismatch between ' + supposed_type + ' and ' + type;
    }
    return {
        'name': alter_name_tag_auto(type, noun_or_verb, input),
        'noun_or_verb': noun_or_verb
    }
}

var alter_name_tag_auto = function (type, noun_or_verb, result) {
    if (noun_or_verb === 'noun') {
        return result;
    } else if (noun_or_verb === 'verb') {
        return type[0] + '=' + result;
    }
}

var update_sentence_tags_auto = function (sentence) {
    return sentence.split(/ /g).map(actual_word_tags_auto).join(' ');
}

var actual_word_tags_auto = function (word) {
    return word.replace(tag_regex, '');
}