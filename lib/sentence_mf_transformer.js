var rewrite_old_entry = function (entry) {
    entry = JSON.parse(entry.data);
    entry.type = 'sentence';
    if (!('chapter' in entry) || !('number' in entry)) {
        console.log(entry);
        throw 'Weird entry!';
    }
    entry.path = split_text_into_path(entry.chapter.toString()).
    concat(split_text_into_path(entry.number.toString()));
    delete entry.chapter;
    delete entry.number;
    return entry;
}

var add_to_fbase_built = function (path, data, dbase) {
    var node_name;
    for (var i = 0; i < path.length - 1; i++) {
        node_name = path.slice(0, i + 1).join('_');
        if (!(node_name in dbase)) {
            dbase[node_name] = {};
        }
        dbase = dbase[node_name];
    }
    var final_node_name = path.join('_');
    if (!(final_node_name in dbase)) {
        dbase[final_node_name] = data;
    } else if (Array.isArray(dbase[final_node_name])) {
        dbase[final_node_name].push(data);
    } else {
        dbase[final_node_name] = [dbase[final_node_name], data]
    }
}

// We should really look at this as a big opportunity without very much danger.
// We can store our data in a completely new way, so we want to carefully decide how.

var transform_on_data = function (data) {
    var d = {};
    for (var i in data) {
        var r = rewrite_old_entry(data[i]);
        add_to_fbase_built(r.path, r, d);
    }
    console.log(d);
    alert('continue?');
    return d;
}

var make_into_sentence_mf_transform = function (f) {
    return function () {
        Persist.get(['sentence_mf'], function (x) {
            Persist.set(['sentence_mf_by_author'], f(x.val()));
        })
    }
}

var transform_full = make_into_sentence_mf_transform(transform_on_data);

// To see result:
// Persist.get(['sentence_mf_by_author'], function (x) {console.log(x.val())});
// or to set a global variable to it:
// Persist.get(['sentence_mf_by_author'], function (x) {g_sentences = x.val()});

// Path notes:

// A path should probably just be an object with a lot of methods (and one method on Path)