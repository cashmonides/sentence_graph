var syntax_mode_test_sentences = [
    "{\"class_id\":1,\"words\":[\"Nisi\",\"fēminae\",\"nautās\",\"sententiārum\",\"dē\",\"incolīs\",\"dāmnābunt\",\"incolae\",\"in\",\"prōvinciā\",\"nōn\",\"labōrābunt\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[7],\"tags\":[]},{\"class_id\":2,\"indices\":[8],\"tags\":[]},{\"class_id\":2,\"indices\":[9],\"tags\":[]},{\"class_id\":2,\"indices\":[10],\"tags\":[]},{\"class_id\":2,\"indices\":[11],\"tags\":[{\"class_id\":3,\"type\":\"t=future\"},{\"class_id\":3,\"type\":\"m=indicative\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis future more vivid conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]}],\"text\":\"Nisi fēminae nautās sententiārum dē incolīs dāmnābunt, incolae in prōvinciā nōn labōrābunt.\",\"language_of_sentence\":\"mf\",\"chapter\":2,\"number\":13}",
    "{\"class_id\":1,\"words\":[\"Nisī\",\"tacuisset\",\"miserum\",\"monuissem\",\"ut\",\"lacrimās\",\"cēlāret\"],\"regions\":[{\"class_id\":2,\"indices\":[0],\"tags\":[]},{\"class_id\":2,\"indices\":[1],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[2],\"tags\":[]},{\"class_id\":2,\"indices\":[3],\"tags\":[{\"class_id\":3,\"type\":\"t=pluperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=protasis/apodosis of a past contrary to fact conditional sentence\"},{\"class_id\":3,\"type\":\"s=not applicable\"},{\"class_id\":3,\"type\":\"r=not applicable\"}]},{\"class_id\":2,\"indices\":[4],\"tags\":[]},{\"class_id\":2,\"indices\":[5],\"tags\":[]},{\"class_id\":2,\"indices\":[6],\"tags\":[{\"class_id\":3,\"type\":\"t=imperfect\"},{\"class_id\":3,\"type\":\"m=subjunctive\"},{\"class_id\":3,\"type\":\"c=indirect command\"},{\"class_id\":3,\"type\":\"s=secondary\"},{\"class_id\":3,\"type\":\"r=subsequent time\"}]}],\"text\":\"Nisī tacuisset, miserum monuissem ut lacrimās cēlāret.\",\"language_of_sentence\":\"mf\",\"chapter\":3,\"number\":15}"
].map(JSON.parse);


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

var is_tag_we_care_about = function (tag) {
    return tag.class_id === 3;
}

var with_tags = function (region) {
    return {'indices': region.indices, 'tags': region.tags.filter(
        is_tag_we_care_about)}
}

var get_tags_status = function (x) {
    var tag_error = function () {
        alert('This sentence has an internal issue. Please tell your ' +
        'instructor that there is a software issue: a sentence without ' +
        'proper tags has not been deleted.');
        return_to_profile();
    }
    var status = 'none';
    for (var i = 0; i < x.tags.length; i++) {
        if (!is_proper_tag(x.tags[i].type)) {
            if (!is_proper_tag(status)) {
                tag_error();
            }
            status = x.tags[i].type;
        }
    }
    if (is_proper_tag(status)) {
        tag_error();
    }
    return status;
}

var has_tags = function (x) {
    return x.tags.length > 0;
}

var is_proper_tag = function (x) {
    return x !== 'verb' && x !== 'noun';
}

var get_proper_tags = function (x) {
    return x.tags.map(function (x) {return x.type}).filter(is_proper_tag);
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

var process_region_from_firebase = function (sentence_data) {
    return function (x) {
        var tags_status = get_tags_status(x);
        var proper_tags = get_proper_tags(x);
        var r = {
            'pos': tags_status,
            'text': sentence_data.text,
            'words': sentence_data.words,
            'chapter': sentence_data.chapter,
            'number': sentence_data.number,
            'indices': x.indices,
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
    var sentence_text = sentence_data.words;
    var regions_with_tags = sentence_data.regions.map(with_tags).filter(has_tags);
    return regions_with_tags.map(process_region_from_firebase(sentence_data));
}

var allowed_options_repository = function () {
    var known = {};
    return function (chapter, type, pos) {
        /*
        if (chapter === undefined || chapter === null ||
        type === undefined || type === null ||
        pos === undefined || pos === null) {
            alert('There\'s something weird about this sentence, tell your instructor.');
            return_to_profile();
        }
        */
        var key = [chapter, type, pos].join('/');
        if (key in known) {
            return known[key];
        }
        chapter = Number(chapter);
        var d = syntax_module_filter[pos + '_syntax'][type];
        var r = [type.toUpperCase()].concat(Object.keys(d).filter(function (x) {
            return d[x] <= chapter;
        }));
        if (should_have_non_applicable(type)) {
           r.push('not applicable');
        };
        known[key] = r;
        return r;
    }
}

var get_allowed_options = allowed_options_repository();

var has_choices = function (x) {
    return x.choices.length > 0;
}

var convert_syntax_data_to_drop_down_data = function (data) {
    var r = data.map(function (x) {
        var drop_down_types;
        if (x.pos === 'verb') {
            drop_down_types = verb_drop_down_types;
        } else if (x.pos === 'noun') {
            drop_down_types = noun_drop_down_types;
        }
        var drop_downs = drop_down_types.map(function (y) {
            return {
                'type': y,
                'choices': get_allowed_options(x.chapter, y, x.pos),
                'correct_answer': x.tags[y] || 'not applicable'
            }
        }).filter(has_choices);
        return {
            'pos': x.pos,
            'words': x.words,
            'sentence': x.text,
            'question': "Give the syntax of the highlighted word.",
            'target_indices': x.indices,
            'drop_downs': drop_downs
        }
    });
    
    return r.sort(region_sort);
}

var get_sentence_from_firebase = function (chapter_n, question_n, fn) {
    Persist.get(['sentence_mf'], function (x) {
        var v = x.val();
        var sentences = [];
        Object.keys(v).forEach(function (y) {
            var j = JSON.parse(v[y].data);
            // old code
            // if (j.language_of_sentence === 'mf' &&)
            if (j.chapter.toString() === chapter_n.toString()
            && j.number.toString() === question_n.toString()) {
                sentences.push(j);
            }
        });
        if (sentences.length === 0) {
            throw 'No sentences!!! chapter_number = ' + chapter_n +
            ' question_number = ' + question_n;
        }
        fn(sentences[0]);
    });
}

var get_syntax_questions = function (fn) {
    Persist.get(['sentence_mf'], function (x) {
        var v = x.val();
        var sentences = {};
        Object.keys(v).forEach(function (y) {
            var j = JSON.parse(v[y].data);
            sentences[j.chapter + '/' + j.number] = {'data': j, 'id': y};
        });
        fn(sentences);
    });
}

var should_have_non_applicable = function (x) {
    return x === 'sequence' || x === 'relative time';
}

// This function may never be used.
var get_syntax_question_ns = function (fn) {
    get_syntax_questions(function (x) {fn(Object.keys(x))});
}

var make_syntax_question = function (chapter_n, question_n, fn) {
    return get_sentence_from_firebase(chapter_n, question_n, function (x) {
        fn(convert_syntax_data_to_drop_down_data(parse_firebase_syntax_data(x)));
    });
}