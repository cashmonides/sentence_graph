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
// No longer.

var tag_regex = /@+[a-zA-Z_\_\-|`^]+/g;

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

var concat_map = function (x, f) {
    return [].concat.apply([], x.map(f));
}

var get_alias = function (x) {
    x = [x];
    var repl = true;
    while (repl) {
        repl = false;
        x = concat_map(x, function (y) {
            if (y in alias_dict) {
                repl = true;
                return alias_dict[y].split(/ *& */g);
            } else {
                return [y];
            }
        });
    }
    return x;
}

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
    var info_tags = concat_map(raw_tags, text_to_info_auto_tag_all);
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

var text_to_info_auto_tag_all = function (x) {
    var l = get_alias(x.replace(/[`^]/g, ' '));
    return l.map(text_to_info_auto_tag);
}

var text_to_info_auto_tag = function (x) {
    // We may need to remove the at sign.
    // (But we may not.)
    // We used to do different things based on whether there is a tilde.
    // But then we forgot about the tilde.
    // We ended up with this very simple function.
    return {'text': remove_at_sign(x)};
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
    
    return e.split(/[|\-]/g);
}

var get_name_tag_auto = function (d) {
    // This checks that the input is valid.
    if (typeof d !== 'object' || !('text' in d)) {
        throw JSON.stringify(d) + ' is not valid!';
    }
    
    var input = d.text;
    var type_and_nov = get_real_type_tag_auto(input);
    var type = type_and_nov.type;
    var noun_or_verb = type_and_nov.noun_or_verb;
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