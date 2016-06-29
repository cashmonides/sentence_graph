var set_from = function (x) {
    var d = {};
    for (var i = 0; i < x.length; i++) {
        d[x[i]] = true;
    }
    return d;
}

var data_display = {};

data_display.special_type_to_type = {
    'conventions': 'acceptable',
    'defensible': 'defensible'
}

data_display.get_sentence_data = function (callback) {
    Persist.get(['sentence_mf_by_author'], function (x) {
        callback(x.val());
    })
}

data_display.get_path_chapter = function (path) {
    return path_display(path.slice(0, -1));
}

data_display.get_path_sentence = function (path) {
    return path[path.length - 1];
}

data_display.index_lookup = function (text, indices) {
    var with_i = words_with_indices(text);
    var len = with_i.length;
    with_i.push({'start': text.length});
    var counts = {};
    var dis_amb = {};
    var word;
    for (var i = 0; i < len; i++) {
        word = with_i[i].word;
        if (word in counts) {
            counts[word]++;
        } else {
            counts[word] = 1;
        }
    }
    for (var i in counts) {
        if (counts[i] > 1) {
            dis_amb[i] = 2;
        }
    }
    counts = {};
    var d = {};
    var a = [];
    a.push(text.slice(0, with_i[0].start));
    for (var i = 0; i < len; i++) {
        word = with_i[i].word;
        if (word in counts) {
            counts[word]++;
        } else {
            counts[word] = 1;
        }
        if (i in indices && word in dis_amb) {
            a.push(word + '@' + counts[word]);
            d[i] = '@' + counts[word] + word;
        } else {
            a.push(word);
            d[i] = word;
        }
        a.push(text.slice(with_i[i].end, with_i[i + 1].start));
    }
    return {
        'text': a.join(''),
        'index_dict': d
    }
}

data_display.display_sentence_tags = function (regions, index_dict) {
    return regions.sort(raw_region_sort).map(function (x) {
        return data_display.display_tags_in_region(x, index_dict);
    }).filter(function (x) {
        return x !== null;
    }).join('\n');
}

data_display.basic_tag_display = function (tag) {
    if (tag === 'noun' || tag === 'verb' || tag === 'not applicable') {
        return null;
    } else {
        return tag;
    }
}

data_display.display_one_tag = function (tag, index_dict) {
    if (tag[0] === '%') {
        var parts = tag.split('~');
        var special_type = parts[0].slice(1);
        if (!(special_type in data_display.special_type_to_type)) {
            throw 'Weird special type: ' + special_type;
        }
        var type = data_display.special_type_to_type[special_type];
        return '+ ' + type + ': ' + parts[1];
    } else if (tag[1] === '=') {
        return data_display.basic_tag_display(tag.slice(2))
    } else {
        return data_display.basic_tag_display(tag);
    }
}

data_display.verb_tag_number = function (x) {
    for (var i = 0; i < verb_drop_down_types.length; i++) {
        if (x in syntax_module_filter.verb_syntax[verb_drop_down_types[i]]) {
            return i;
        }
    }
    throw 'Something weird happened with ' + x + '!';
}

data_display.verb_tag_sort = function (x, y) {
    var x_n = data_display.verb_tag_number(x);
    var y_n = data_display.verb_tag_number(y);
    return cmp(x_n, y_n);
}

data_display.tag_sort = function (x, y) {
    if (x[0] === '+' && y[0] !== '+') {
        return 1;
    } else if (x[0] !== '+' && y[0] === '+') {
        return -1;
    } else if (x[0] === '+' && y[0] === '+') {
        return cmp(x, y);
    } else {
        return data_display.verb_tag_sort(x, y);
    }
}

data_display.display_tags_in_region = function (region, index_dict) {
    if (!('tags' in region) || region.tags.length === 0) {
        return null;
    }
    return region.indices.map(function (index) {
        return index_dict[index];
    }).join(' ') + ' = * ' + region.tags.map(function (tag) {
        return data_display.display_one_tag(tag.type, index_dict);
    }).filter(function (x) {
        return x !== null;
    }).sort(data_display.tag_sort).join(' ');
}

data_display.display_one_sentence_data = function (data) {
    var indices = set_from(concat_map(data.regions.filter(function (x) {
        return 'tags' in x && x.tags.length > 0;
    }), function (x) {
        return x.indices;
    }));
    var d = data_display.index_lookup(data.text, indices);
    return d.text + '\n\n' + data_display.display_sentence_tags(data.regions, d.index_dict);
}

data_display.display_sentence = function (sentence) {
    return '*' + data_display.get_path_sentence(sentence.path) +
    '\n\n' + data_display.display_one_sentence_data(sentence);
}

data_display.display_chapter = function (chapter) {
    var chapter_string = data_display.get_path_chapter(chapter[0].path);
    
    return 'chapter: ' + chapter_string + '\n\n' +
    chapter.map(data_display.display_sentence).join('\n\n');
}

data_display.is_sentence = function (data) {
    if (typeof data !== 'object') {
        throw 'data, ' + JSON.stringify(data) + ', is not an object!';
    }
    return 'type' in data && data.type === 'sentence';
}

data_display.is_cleared_node = function (data) {
    return data === 'node_cleared';
}

data_display.get_sentences_by_chapter = function (data) {
    var intermediate = {};
    var chapter;
    var i;
    for (i in data) {
        chapter = data_display.get_path_chapter(data[i].path);
        if (!(chapter in intermediate)) {
            intermediate[chapter] = [];
        }
        intermediate[chapter].push(data[i]);
    }
    for (i in intermediate) {
        intermediate[i].sort(function (x, y) {
            return sentence_path_sort(x.path, y.path)
        });
    }
    var result = values(intermediate);
    result.sort(function (x, y) {
        return sentence_path_sort(x[0].path, y[0].path);
    });
    return result;
}

data_display.complete_flatten = function (data, dict) {
    if (!dict) {
        dict = {};
    }
    if (data_display.is_cleared_node(data)) {
        return dict;
    }
    if (data_display.is_sentence(data)) {
        dict[data.path.join('_')] = data;
    } else {
        for (var i in data) {
            data_display.complete_flatten(data[i], dict);
        }
    }
    return dict;
}

data_display.process_sentence_data = function (data) {
    var sentences = data_display.get_sentences_by_chapter(data_display.complete_flatten(data));
    return sentences.map(data_display.display_chapter).join('\n\n----------\n\n');
}

data_display.display_all_sentence_data = function () {
    data_display.get_sentence_data(function (data) {
        el('sentencedatabox').value = data_display.process_sentence_data(data);
    });
}