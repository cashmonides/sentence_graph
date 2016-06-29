// make sentences given only data (no clicks, except of the submission button)

// NOTES:
// override: subset-based model (smaller overrides larger)

// this happens a bit upstream when words are tagged
// there are also tags of absence
// no sequence
// they remove whatever the absence is of
// thus a tag group has indices and tags
// and a tag has a pos (noun/verb), an attribute (e.g, tense),
// and either a type is absence or as an actual type

// so we need something to combine tags on a word

// first we need something to get each relevant type of tag (as a set)

// Then we need to initialize a list of surviving tags.

// Then we need to iterate over the result.

// Name conversion:

// Verb tags need a tweak to text. We do this at the last minute.

var verb_drop_down_types = ['tense', 'mood', 'construction', 'sequence', 'relative time'];

var noun_drop_down_types = ['nominative', 'genitive', 'dative',
'accusative', 'ablative', 'infinitive'];

var strict_subset = function (a, b) {
    if (Object.keys(a).length >= Object.keys(b).length) {
        return false;
    }
    for (var i in a) {
        if (!(i in b)) {
            return false;
        }
    }
    return true;
}

var dict_extend = function (a, b) {
    for (var i in b) {
        a[i] = b[i];
    }
    return a;
}

var add_sentences_to_firebase = function (sentences) {
    console.log(sentences);
    Persist.get(['sentence_mf_by_author'], function (x) {
        var v = x.val();
        var node;
        var sentence;
        var path;
        var node_name;
        for (var i = 0; i < sentences.length; i++) {
            sentence = sentences[i];
            path = sentence.path;
            node = v;
            for (var j = 0; j < path.length - 1; j++) {
                node_name = path.slice(0, j + 1).join('_');
                if (!(node_name in node) || typeof node[node_name] !== 'object'
                || node[node_name] === null) {
                    node[node_name] = {};
                }
                node = node[node_name];
            }
            node_name = path.join('_');
            node[node_name] = sentence;
        }
        console.log(v);
        Persist.set(['sentence_mf_by_author'], v);
    });
}

var advanced_auto = {};

// 'a'.charCodeAt(0) = 97
// '0'.charCodeAt(0) = 48
// 97 - 48 = 49
advanced_auto.letters_minus_numbers = 49;

advanced_auto.ERROR = 'Ended computation, see alert for why!';

advanced_auto.at_mark_regex = /\d*@\d*/g;

// There was a flip-flop regex bug. I hate them!

// This regex is not optimal, but I think it strikes the right balance
// of workability, maintainability, readability, and Cthulu-worship.
advanced_auto.process_part_regex_parts = ['\\*(.+)', '([^]*?)', '((\n+[^\n\\=]+=.*)+)'];

advanced_auto.process_part_regex = new RegExp(
    '^' + advanced_auto.process_part_regex_parts.join('\n+') + '\n*$');


advanced_auto.type_to_special_type = {
    'convention': 'conventions',
    'acceptable': 'conventions',
    'defensible': 'defensible'
}

advanced_auto.remove_comments_on_line = function (line) {
    return line.replace(/ *\/\/.*$/, '');
}

advanced_auto.remove_multiline_comment_lines = function (lines) {
    var depth = 0;
    var non_comment_lines = [];
    var line;
    var stripped_line;
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        stripped_line = strip(line);
        if (stripped_line === 'begin comment') {
            depth++;
        } else if (stripped_line === 'end comment') {
            depth--;
        } else if (depth === 0) {
            non_comment_lines.push(line);
        } else if (depth < 0) {
            alert('Too many "end comment"s.');
            throw advanced_auto.ERROR;
        }
    }
    if (depth > 0) {
        alert('Too many "begin comment"s.');
        throw advanced_auto.ERROR;
    }
    return non_comment_lines;
}

advanced_auto.remove_comments = function (text) {
    var l = advanced_auto.remove_multiline_comment_lines(text.split('\n'));
    return l.map(advanced_auto.remove_comments_on_line).join('\n');
}

advanced_auto.is_not_tag_type = function (i) {
    return i === 'strength';
}

advanced_auto.relevant_tag_types_in_group = function (tag_group) {
    var s = {};
    for (var i in tag_group) {
        if (!advanced_auto.is_not_tag_type(i)) {
            s[i] = true;
        }
    }
    return s;
}

advanced_auto.relevant_tag_types = function (tag_groups) {
    var s = {};
    for (var i = 0; i < tag_groups.length; i++) {
        dict_extend(s, advanced_auto.relevant_tag_types_in_group(tag_groups[i]));
    }
    return s;
}

advanced_auto.is_not_absence_tag = function (tag) {
    return tag.text !== 'absence';
}

advanced_auto.remove_absence_tags = function (tags) {
    return tags.filter(advanced_auto.is_not_absence_tag);
}

advanced_auto.compare_groups = function (a, b) {
    if (a === null && b !== null) {
        return -1;
    } else if (a !== null && b === null) {
        return 1;
    }
    var c = cmp(a.strength, b.strength);
    if (c !== 0) {
        return c;
    } else if (strict_subset(a, b)) {
        return 1;
    } else if (strict_subset(b, a)) {
        return -1;
    } else {
        return 0;
    }
}

advanced_auto.winning_tag = function (word, tag_groups, prop) {
    var relevant_tag_groups = tag_groups.filter(function (x) {
        return prop in x;
    });
    var winner = null;
    var group = null;
    var c;
    for (var i = 0; i < relevant_tag_groups.length; i++) {
        group = relevant_tag_groups[i];
        c = advanced_auto.compare_groups(winner, group);
        if (c === -1) {
            winner = group;
        } else if (c === 0) {
            alert('Error on ' + prop + ' and ' + word + ', with two competing tag groups. ' +
            'You probably got this error because you tagged a word twice with the same tag type.');
            throw advanced_auto.ERROR;
        }
    }
    if (!(prop in winner)) {
        alert('Somehow, the winning tag group does not have the property ' + prop +
        '. This is a programming error and should be taken to Akiva.');
        throw advanced_auto.ERROR;
    }
    return winner[prop];
}

// Is it not sad that after but ten lines of list existance,
// the special tags are turned into strings once more?
advanced_auto.special_tag_to_string = function (l) {
    var t = advanced_auto.tag_to_tag_list(l[1]);
    /*if (t.length !== 1) {
        alert(t + ' implied something!');
        throw advanced_auto.ERROR;
    }*/
    return '%' + advanced_auto.type_to_special_type[l[0]] + '~' + t[0];
}

advanced_auto.read_tag_line_part = function (s) {
    var l = s.split(/ *: */g);
    if (l.length === 1) {
        return ['main', strip(s).split(' ')];
    } else if (l.length === 2) {
        if (!(l[0] in advanced_auto.type_to_special_type)) {
            alert('Weird text before colon: ' + l[0]);
            throw advanced_auto.ERROR;
        }
        return ['other', advanced_auto.special_tag_to_string(l)];
    } else {
        alert('Reading part ' + s + ' failed. This is because there are ' +
        'two (or more) colons in it: there should not be.');
        throw advanced_auto.ERROR;
    }
}

advanced_auto.divide_tags = function (line) {
    var r = line.split(/ *\+ */).map(advanced_auto.read_tag_line_part);
    var d = {'other': []};
    var type;
    var value;
    for (var i = 0; i < r.length; i++) {
        type = r[i][0];
        value = r[i][1];
        if (type === 'main') {
            if ('main' in d) {
                alert('Two main components.');
                throw advanced_auto.ERROR;
            }
            d.main = value;
        } else if (type === 'other') {
            d.other.push(value);
        } else {
            alert('Weird component.');
            throw advanced_auto.ERROR;
        }
    }
    if (!('main' in d)) {
        alert('No main components.');
        throw advanced_auto.ERROR;
    }
    return d;
}

advanced_auto.transform_special_tags = function (special_tags) {
    return special_tags.map(function (x) {
        return {'text': x}
    });
}

// word is only used for debugging in this function.
advanced_auto.interpret_line = function (word, line) {
    var d = advanced_auto.divide_tags(line);
    var tag_groups = advanced_auto.tag_descs_to_tags(d.main);
    if (tag_groups === null) {
        alert('Error: could not interpret ' + line + '!');
        throw advanced_auto.ERROR;
    }
    return advanced_auto.combine_tags_on_word(word, tag_groups).concat(
        advanced_auto.transform_special_tags(d.other))
}

// Major Function
// Used to get results from raw data
// word is used for debugging, and only then
advanced_auto.combine_tags_on_word = function (word, tag_groups) {
    var relevant_tag_types = advanced_auto.relevant_tag_types(tag_groups);
    var surviving_tags = [];
    for (var i in relevant_tag_types) {
        surviving_tags.push(advanced_auto.winning_tag(word, tag_groups, i));
    }
    var r = advanced_auto.remove_absence_tags(surviving_tags);
    if (r.length === 0) {
        alert('Error on ' + word + ', no tags found.');
        throw advanced_auto.ERROR;
    }
    advanced_auto.check_tags_validity(word, r);
    return r;
}

// Now we write two important functions.
// One goes from words to tags.
// The other checks the validity of a list of tags.

var concat_map = function (x, f) {
    return [].concat.apply([], x.map(f));
}

advanced_auto.get_tag_strength = function (tag) {
    return tag.strength;
}

advanced_auto.get_tag_list_strength = function (tag_list) {
    return Math.max.apply(null, tag_list.map(advanced_auto.get_tag_strength));
}

advanced_auto.tag_group_from_tag_list = function (tag_list) {
    var d = {};
    var tag;
    for (var i = 0; i < tag_list.length; i++) {
        tag = tag_list[i];
        if (tag.attribute in d) {
            alert('Some tag overexpanded, that is, it had two distinct ' +
            'contradictory implications for ' + tag.attribute +
            '. Definitely contact Akiva.');
            throw advanced_auto.ERROR;
        }
        d[tag.attribute] = tag;
    }
    d.strength = advanced_auto.get_tag_list_strength(tag_list);
    return d;
}

advanced_auto.remove_strength = function (tag) {
    return tag.split('!')[0];
}

advanced_auto.get_strength = function (tag) {
    if (tag.indexOf('!') !== -1) {
        return Number(tag.split('!')[1]);
    } else {
        return 0;
    }
}

advanced_auto.tag_text_to_strengthless_tag = function (tag_text) {
    if (advanced_auto.is_override_tag(tag_text)) {
        return advanced_auto.make_override_tag(tag_text);
    }
    var i;
    var dd_type;
    for (i = 0; i < verb_drop_down_types.length; i++) {
        var dd_type = verb_drop_down_types[i];
        if (tag_text in syntax_module_filter.verb_syntax[dd_type]) {
            return {'attribute': dd_type, 'text': tag_text, 'pos': 'verb'};
        }
    }
    for (i = 0; i < noun_drop_down_types.length; i++) {
        var dd_type = noun_drop_down_types[i];
        if (tag_text in syntax_module_filter.noun_syntax[dd_type]) {
            return {'attribute': dd_type, 'text': tag_text, 'pos': 'noun'};
        }
    }
    // This is not silent failure in a bad sense
    // since we use the stack to backtrack.
    return null;
}

advanced_auto.tag_text_to_tag = function (tag) {
    console.log(tag);
    var tag_text = advanced_auto.remove_strength(tag);
    var strength = advanced_auto.get_strength(tag);
    var d = advanced_auto.tag_text_to_strengthless_tag(tag_text);
    if (d === null) {
        return null;
    }
    d.strength = strength;
    return d;
}

advanced_auto.is_override_tag = function (tag) {
    var tag_words = tag.split(' ');
    return tag_words[0] === 'no' && verb_drop_down_types.indexOf(
        tag_words.slice(1).join(' ')) !== -1;
}

advanced_auto.make_override_tag = function (tag) {
    var attribute = tag.split(' ').slice(1).join(' ');
    return {
        'attribute': attribute,
        'text': 'absence',
        'pos': 'verb'
    };
}

advanced_auto.is_end_tag = function (x) {
    return x[0] === '^';
}

advanced_auto.get_non_end_tags = function (tags) {
    return tags.filter(function (x) {
        return !advanced_auto.is_end_tag(x);
    });
}

advanced_auto.get_end_tags = function (tags) {
    return tags.filter(advanced_auto.is_end_tag).map(function (x) {
        return x.slice(1);
    });
}

advanced_auto.replace_its = function (y) {
    return function (z) {
        console.log(y, z);
        return z.replace(/^[^A-Za-z]*it[^A-Za-z]*$/g, function (w) {
            return w.replace(/it/g, y);
        });
    }
}

advanced_auto.tag_to_tag_list = function (tag) {
    // Handled downstream.
    /*
    if (advanced_auto.is_override_tag(tag)) {
        return advanced_auto.make_override_tag(tag);
    }
    */
    var tags = [tag];
    var end_tags = [];
    var repl = true;
    while (repl) {
        end_tags = end_tags.concat(advanced_auto.get_end_tags(tags));
        tags = advanced_auto.get_non_end_tags(tags);
        repl = false;
        tags = concat_map(tags, function (y) {
            if (y in alias_dict) {
                repl = true;
                return alias_dict[y].split(/ *& */g).map(advanced_auto.replace_its(y));
            } else {
                return [y];
            }
        });
    }
    tags = end_tags.concat(tags);
    return tags;
}

advanced_auto.interpet_tag_list = function (tags) {
    var tag_list = tags.map(advanced_auto.tag_text_to_tag);
    if (tag_list.indexOf(null) !== -1) {
        return null;
    }
    return advanced_auto.tag_group_from_tag_list(tag_list);
}


advanced_auto.interpret_tag = function (tag) {
    return advanced_auto.interpet_tag_list(advanced_auto.tag_to_tag_list(tag));
}

// This somewhat naive approach works since multiple possibilities
// that are not quickly shown to be impossible are likely very rare,
// and since a typical list of words will be no more than 20 words long.
advanced_auto.tag_descs_to_tags = function (words) {
    var a;
    var b;
    if (words.length === 0) {
        return [];
    }
    // The loop order is important here! We want the interpreation where
    // present and subjunctive are part of the same tag to beat the one
    // where they are part of different tags!
    // (Believe it or not, I originally wrote this message next to,
    // and changed, a different loop!)
    for (var i = words.length; i > -1; i--) {
        a = advanced_auto.interpret_tag(words.slice(0, i + 1).join(' '));
        if (a !== null) {
            var b = advanced_auto.tag_descs_to_tags(words.slice(i + 1));
            if (b !== null) {
                b.push(a);
                return b;
            }
        }
    }
    return null;
}

// I think this is all the checking we need.
advanced_auto.check_tags_validity = function (word, tags) {
    console.log(word, tags);
    if (tags.length === 0) {
        alert('Something is severely wrong: the tags given for ' + word + ' all cancel out.');
        throw advanced_auto.ERROR;
    }
    var pos = tags[0].pos;
    if (pos === 'noun') {
        if (tags.length !== 1) {
            alert('Something is severely wrong: ' + word + ' seems to be a noun but it has only one tag.');
            throw advanced_auto.ERROR;
        } else {
            return;
        }
    }
    if (pos !== 'verb') {
        alert('The part of speech for ' + word + " appears somehow to be neither a noun nor a verb: " +
        'it is a ' + pos + '.');
    }
    
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].pos !== 'verb') {
            alert('The word ' + word + " seems to be a verb, but it has a tag that suggests otherwise.");
            throw advanced_auto.ERROR;
        }
    }
}

advanced_auto.getter = function (x) {
    var r = new RegExp('^' + x + ': *(.*)$', 'm');
    return function (text) {
        if (!r.exec(text)) {
            alert('No ' + x + ' can be found!');
            throw advanced_auto.ERROR;
        }
        return strip(r.exec(text)[1].replace(/['"]/g, ''));
    }
}

advanced_auto.get_chapter = advanced_auto.getter('chapter');

advanced_auto.process_part = function (part) {
    var result = advanced_auto.process_part_regex.exec(part);
    if (result === null) {
        alert('Could not make sense of the part beginning with ' +
        part.slice(0, 100) + '.');
        throw advanced_auto.ERROR;
    }
    return [result[1], result[2], result[3]];
}

advanced_auto.get_parts = function (text) {
    var lines = text.split('\n');
    var parts = [];
    var part = null;
    var line;
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        if (/^\*.*$/g.exec(line)) {
            if (part !== null) {
                parts.push(part.join('\n'));
            }
            part = [line];
        } else {
            if (part !== null) {
                part.push(line);
            }
        }
    }
    if (part !== null) {
        parts.push(part.join('\n'));
    }
    return parts;
}

advanced_auto.start_and_end_of_tag_line = function (x) {
    var result = /([^-=\n]+)[\-=] ([^\n]*)/.exec(x);
    if (result === null) {
        alert('This really should not have happened: the line ' +
        x + ' does not seem to indicate tags. But it\'s probably my fault, ' +
        'not yours. Tell Akiva. (I am not Akiva, by the way.)');
        throw advanced_auto.ERROR;
    }
    return [strip(result[1]), result[2]];
}

advanced_auto.find_all_indices = function (words, lookup_dict) {
    var word_list = words.split(' ');
    return word_list.map(function (word) {
        return advanced_auto.find_index(word, lookup_dict);
    });
}

advanced_auto.tags_from_tag_line = function (line, lookup_dict) {
    var tag_line_broken = advanced_auto.start_and_end_of_tag_line(line);
    var words = tag_line_broken[0];
    var tag_line_main = tag_line_broken[1];
    var indices = advanced_auto.find_all_indices(words, lookup_dict);
    // This doesn't use word except for debugging.
    var tags = advanced_auto.interpret_line(words, tag_line_main);
    for (var i = 0; i < tags.length; i++) {
        tags[i].indices = indices;
    }
    return tags;
}

// We can assume correspondence of word indices with words in the word selector.

advanced_auto.hash_for_word_in_tag = function (word) {
    var letters = word.replace(/[0-9@]/g, '');
    var numbers = word.replace(/\D/g, '');
    return letters + numbers;
}

advanced_auto.hash_for_word_in_main = function (word) {
    if (word.indexOf('@') === -1) {
        return word;
    }
    var letters = word.split('@')[0];
    var numbers = advanced_auto.letters_to_numbers(word.split('@')[1]);
    return letters + numbers;
}

advanced_auto.find_index = function (word, lookup_dict) {
    var index = lookup_dict[advanced_auto.hash_for_word_in_tag(word)];
    if (index === undefined) {
         alert('Apparently this text contains no ' + word + '.');
        throw advanced_auto.ERROR;
    }
    if (index === null) {
        alert('Apparently this text contains more than one ' + word +
        ', so you have to specify which you want.');
        throw advanced_auto.ERROR;
    }
    return index;
}

advanced_auto.letters_to_numbers = function (s) {
    return s.split('').map(function (x) {
        return String.fromCharCode(x.charCodeAt(0) -
        advanced_auto.letters_minus_numbers);
    }).join('');
}

advanced_auto.numbers_to_letters = function (s) {
    return s.split('').map(function (x) {
        return String.fromCharCode(x.charCodeAt(0) +
        advanced_auto.letters_minus_numbers);
    }).join('');
}

advanced_auto.replace_ats = function (main_text) {
    return main_text.replace(/@\d+/g, function (x) {
        return '@' + advanced_auto.numbers_to_letters(x.slice(1));
    });
}

advanced_auto.get_lookup_dict = function (main_text) {
    var replaced_ats = advanced_auto.replace_ats(main_text);
    var text = words_as_in_text(replaced_ats);
    var d = {};
    var word;
    for (var i = 0; i < text.length; i++) {
        word = advanced_auto.hash_for_word_in_main(text[i]);
        if (word in d) {
            // Make it so that we'll know this word is ambiguous.
            // This still works even if the word occurs more than twice,
            // since it is still in d.
            d[word] = null;
        } else {
            d[word] = i;
        }
    }
    return d;
}

advanced_auto.data_for_part = function (part) {
    console.log(part);
    var processed_part = advanced_auto.process_part(part);
    var sentence_number = processed_part[0];
    var main_text = processed_part[1];
    var lookup_dict = advanced_auto.get_lookup_dict(main_text);
    var tags = processed_part[2].split('\n').filter(function (x) {return x !== ''});
    var real_tags = tags.map(function (tag_line) {
        return advanced_auto.tags_from_tag_line(tag_line, lookup_dict);
    });
    return {
        'sentence_number': sentence_number,
        'sentence': main_text,
        'tags': real_tags
    }
}

advanced_auto.data_from_text = function (text) {
    var comment_less = advanced_auto.remove_comments(text);
    var chapter = advanced_auto.get_chapter(comment_less);
    var parts = advanced_auto.get_parts(comment_less);
    var results = parts.map(advanced_auto.data_for_part);
    for (var i = 0; i < results.length; i++) {
        results[i].chapter = chapter;
    }
    return results;
}

advanced_auto.get_data = function () {
    var text = el("sentencebox").value;
    return advanced_auto.data_from_text(text);
}

// The bit below this should do all the actual submission.

advanced_auto.get_data_text = function (tag) {
    if (tag.pos === 'verb') {
        return tag.attribute[0] + '=' + tag.text;
    } else {
        return tag.text;
    }
}

function submit_tag (sentence, tag_type, indices) {
    var tag_type_as_string = tag_type;
    var tag = new SingleRegionTag(tag_type_as_string);
    
    console.log('submitting tag with', tag_type, indices);
    
    //console.log(indices);
    var region = sentence.get_region(indices);
    if (region != undefined && region != null) {
        region.add_tag(tag);
        region.remove_duplicate_tags();
    }
    
}

advanced_auto.add_tag = function (sentence, tag) {
    submit_tag(sentence, advanced_auto.get_data_text(tag), tag.indices);
}

advanced_auto.add_pos_tag = function (sentence, tag) {
    submit_tag(sentence, tag.pos, tag.indices);
}

advanced_auto.add_tags = function (sentence, tags) {
    for (var i = 0; i < tags.length; i++) {
        advanced_auto.add_tag(sentence, tags[i]);
    }
    advanced_auto.add_pos_tag(sentence, tags[0]);
}

advanced_auto.add_tags_for_all_words = function (sentence, tags) {
    for (var i = 0; i < tags.length; i++) {
        advanced_auto.add_tags(sentence, tags[i]);
    }
}

advanced_auto.clean_text = function (text) {
    return text.replace(advanced_auto.at_mark_regex, '');
}

// Plays the very important philosophical role
// of turning data into action.
// However, this is not as major a part of the process as it sounds.
// Somewhat taken from global submit.
advanced_auto.auto_submit = function (data, deleted) {
    console.log(data);
    var text = advanced_auto.clean_text(data.sentence);
    var t = new Text(text);
	t.setup();
    var sentence = new Sentence(t.get_words(), text);
    advanced_auto.add_tags_for_all_words(sentence, data.tags);
    sentence.path = split_text_into_path(data.chapter).
    concat(split_text_into_path(data.sentence_number));
    sentence.type = 'sentence';
    sentence.language_of_sentence = 'latin_author';
    
    return sentence;
}


// Data contains a list of questions.
advanced_auto.auto_submit_all = function (data) {
    var sentences = data.map(advanced_auto.auto_submit);
    add_sentences_to_firebase(sentences);
}

advanced_auto.full_process = function () {
    var data = advanced_auto.get_data();
    advanced_auto.auto_submit_all(data);
    alert('Everything successful! All the data was submitted!');
}