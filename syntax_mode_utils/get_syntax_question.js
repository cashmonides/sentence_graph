/*
var syntax_mode_test_sentences = [
    "{\"class_id\":1,\"words\":[\"Nisi\",\"fēminae\",\"nautās\",\"sententiārum\",\"dē\",\"incolīs\",\"dāmnābunt\",\"incolae\",\"in\",\"prōvinciā\",\"nōn\",\"labōrābunt\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[7],\"tags\":[]},{\"class_id\":2,\"indices\":[8],\"tags\":[]},{\"class_id\":2,\"indices\":[9],\"tags\":[]},{\"class_id\":2,\"indices\":[10],\"tags\":[]},{\"class_id\":2,\"indices\":[11],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]}],\"text\":\"Nisi fēminae nautās sententiārum dē incolīs dāmnābunt, incolae in prōvinciā nōn labōrābunt.\",\"language_of_sentence\":\"mf\",\"chapter\":2,\"number\":13}",
    "{\"class_id\":1,\"words\":[\"Nisī\",\"tacuisset\",\"miserum\",\"monuissem\",\"ut\",\"lacrimās\",\"cēlāret\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=imperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=indirect command\"},{\"class_id\":3,\"type\":\"s=secondary\"},{\"class_id\":3,\"type\":\"r=subsequent time\"}]}],\"text\":\"Nisī tacuisset, miserum monuissem ut lacrimās cēlāret.\",\"language_of_sentence\":\"mf\",\"chapter\":3,\"number\":15}"
].map(JSON.parse);
*/


var tag_first_to_type = {
    't': 'tense',
    'm': 'mood',
    'c': 'construction',
    's': 'sequence',
    'r': 'relative time'
}

var verb_drop_down_types = ['tense', 'mood', 'construction', 'sequence', 'relative time'];

var noun_drop_down_types = ['nominative', 'genitive', 'dative',
'accusative', 'ablative', 'infinitive'];

// This may be a property of all tags for all I know.
var is_tag_we_care_about = function (tag) {
    return tag.class_id === 3;
}

var with_tags = function (region) {
    return {'indices': region.indices, 'tags': region.tags.filter(
        is_tag_we_care_about)}
}

var get_tags_status = function (tags) {
    var tag_error = function () {
        alert('This sentence has an internal issue. Please tell your ' +
        'instructor that there is a software issue: a sentence without ' +
        'proper tags has not been deleted.');
        return_to_profile();
    }
    console.log(tags);
    var status = 'none';
    for (var i = 0; i < tags.length; i++) {
        if (is_status_tag(tags[i])) {
            if (is_status_tag(status)) {
                tag_error();
            }
            status = tags[i];
        }
    }
    if (!is_status_tag(status)) {
        tag_error();
    }
    return status;
}

var has_tags = function (x) {
    return x.tags && x.tags.length > 0;
}

var is_proper_tag = function (x) {
    return x !== 'verb' && x !== 'noun' && !is_special_tag(x);
}

var is_status_tag = function (x) {
    return x === 'verb' || x === 'noun';
}

var get_proper_tags = function (x) {
    return get_all_tags(x).filter(is_proper_tag);
}

var is_special_tag = function (x) {
    return x[0] === '%';
}

var get_special_tags = function (x) {
    return get_all_tags(x).filter(is_special_tag).map(function (x) {
        return x.slice(1);
    });
}

var find_noun_tag_case = function (x) {
    var ns = syntax_module_filter.noun_syntax;
    for (var i in ns) {
        if (x in ns[i])  {
            return i;
        }
    }
    alert('Noun tag type "' + x + '" not found! If you are a student, report this!');
    return_to_profile();
}

var make_special_tag_dict = function (special_tags) {
    var result = {};
    for (var i = 0; i < special_tags.length; i++) {
        var split_tag = special_tags[i].split('~');
        if (!(split_tag[0] in result)) {
            result[split_tag[0]] = [];
        }
        result[split_tag[0]].push(split_tag[1]);
    }
    return result;
}

var get_all_tags = function (x) {
    return x.tags.map(function (x) {return x.type});
}

var process_region_from_firebase = function (sentence_data) {
    return function (x) {
        var proper_tags = get_proper_tags(x);
        var special_tags = get_special_tags(x);
        var tags_status = get_tags_status(get_all_tags(x));
        var r = {
            'pos': tags_status,
            'text': sentence_data.text,
            'words': sentence_data.words,
            'path': sentence_data.path,
            'indices': x.indices,
            'special_tags': make_special_tag_dict(special_tags),
            'tags': {}
        };
        if (tags_status === 'verb') {
            for (var i = 0; i < proper_tags.length; i++) {
               r.tags[tag_first_to_type[proper_tags[i][0]]] = proper_tags[i].slice(2);
            }
        } else if (tags_status === 'noun') {
            for (var i = 0; i < proper_tags.length; i++) {
               r.tags[find_noun_tag_case(proper_tags[i])] = proper_tags[i];
            }
        }
        return r;
    }
}

var parse_firebase_syntax_data = function (sentence_data) {
    // console.log(sentence_data);
    // var sentence_text = sentence_data.words;
    if (sentence_data === undefined || sentence_data === null) {
        throw 'Somehow, this sentence does not seem to exist.'
    }
    var regions_with_tags = sentence_data.regions.filter(has_tags).map(with_tags);
    return regions_with_tags.map(process_region_from_firebase(sentence_data));
}

var get_author_name = function (x) {
    return x.split(' ')[0];
}

var get_allowed_options = function (path, type, pos) {
    /*
    if (chapter === undefined || chapter === null ||
    type === undefined || type === null ||
    pos === undefined || pos === null) {
        alert('There\'s something weird about this sentence, tell your instructor.');
        return_to_profile();
    }
    */
    var d = syntax_module_filter[pos + '_syntax'][type];
    var r = [type.toUpperCase()].concat(Object.keys(d).filter(function (x) {
        return sentence_path_sort(path, d[x]) !== -1;
    }));
    if (should_have_non_applicable(type)) {
       r.push('not applicable');
    };
    return r;
}

var has_choices = function (x) {
    return x.choices.length > 0;
}

var convert_region_to_drop_down_data = function (x) {
    var drop_down_types;
    if (x.pos === 'verb') {
        drop_down_types = verb_drop_down_types;
    } else if (x.pos === 'noun') {
        drop_down_types = noun_drop_down_types;
    }
    var drop_downs = drop_down_types.map(function (y) {
        return {
            'type': y,
            'choices': get_allowed_options(x.path, y, x.pos),
            'correct_answer': x.tags[y] || 'not applicable'
        }
    }).filter(has_choices);
    return {
        'pos': x.pos,
        'words': x.words,
        'sentence': x.text,
        'question': "Give the syntax of the highlighted word.",
        'target_indices': x.indices,
        'special_tags': x.special_tags,
        'drop_downs': drop_downs
    }
}

var convert_syntax_data_to_drop_down_data = function (data) {
    var r = data.map(convert_region_to_drop_down_data);
    return r.sort(region_sort);
}

var get_sentence_from_firebase = function (path, fn) {
    var transformed_path = ['sentence_mf_by_author'].concat(path.map(function (_, i) {
        // Yes, join('_'), not join(_); we don't use _.
        return path.slice(0, i + 1).join('_');
    }));
    console.log('paths =', path, transformed_path);
    Persist.get(transformed_path, function (x) {
        var v = x.val();
        console.log(v);
        if (Array.isArray(v)) {
            fn(v[0]);
        } else {
            fn(v);
        }
    });
}

var flat_sentences = function (x) {
    var d = {};
    if (typeof x !== 'object' || x === null) {
        return d;
    }
    if ('type' in x && x.type === 'sentence') {
        d[path_display(x.path)] = x;
        return d;
    }
    for (var i in x) {
        var f = flat_sentences(x[i]);
        for (var j in f) {
            d[j] = f[j];
        }
    }
    return d;
}

var get_syntax_questions = function (fn) {
    Persist.get(['sentence_mf_by_author'], function (x) {
        fn(flat_sentences(x.val()));
    });
}

var should_have_non_applicable = function (x) {
    return x === 'sequence' || x === 'relative time';
}

var make_syntax_question = function (path, fn) {
    return get_sentence_from_firebase(path, function (x) {
        fn(convert_syntax_data_to_drop_down_data(parse_firebase_syntax_data(x)));
    });
}