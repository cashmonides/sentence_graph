function sorted_choices(output, key_for_word) {
    return unique_items(map_by_text(quick_sort(output[key_for_word], custom_sort)))
}

function quick_sort(list, f) {
    if (list.length === 0) {return []}
    var pivot = list[0];
    var before = list.slice(1).filter(function (x) {return f(x, pivot)});
    var after = list.slice(1).filter(function (x) {return f(pivot, x)});
    return quick_sort(before, f).concat(pivot, quick_sort(after, f))
}

function custom_sort(x, y) {

    ////~`console.log('Debug 11/1 x, y = ', x, y);
    ////~`console.log('Debug 11/1 x.text, y.text = ', x.text, y.text);
    ////~`console.log('Debug 11/1 x.length, y.length = ', x.text.length, y.text.length);
    var kf = 'kernel_form`dict';
    var lpe = 'lexeme_properties_english';
    switch (x.part_of_speech) {
        case 'subject':
            return sort_which_is_first([[kf + '_subject_' + lpe + '_root', 'natural'],
                    ['kernel_number', ['singular', 'plural']], ['kernel_person_0', 'natural']], x, y);
        case 'verb':
            return sort_which_is_first([[kf + '_verb_' + lpe + '_root', 'natural'],
                ['kernel_voice', ['active', 'passive']],
                ['kernel_tense', ['present', 'imperfect', 'future', 'present_subjunctive',
                    'imperfect_subjunctive', 'perfect_subjunctive', 'pluperfect_subjunctive',
                    'perfect', 'pluperfect', 'future_perfect', 'present_infinitive', 'perfect_infinitive']],
                ['kernel_person', ['1s', '2s', '3s', '1p', '2p', '3p']]], x, y);
        case 'object':
            return sort_which_is_first([[kf + '_object_' + lpe + '_root', 'natural'],
                    ['kernel_number`of`other`nouns', ['singular', 'plural']]], x, y);
    }
}

function sort_which_is_first (order, x, y) {
    for (var i = 0; i < order.length; i++) {
        var sort_by = order[i][0];
        var possibilities = order[i][1];
        sort_by = sort_by.split('_').map(function (x) {
            return x.replace(/`/g, '_')
        });
        if (possibilities === 'natural') {
            var x_value = sort_get_property(x, sort_by);
            var y_value = sort_get_property(y, sort_by);
            if (x_value !== y_value) {
                return x_value < y_value
            }
        } else {
            var x_position = possibilities.indexOf(sort_get_property(x, sort_by));
            var y_position = possibilities.indexOf(sort_get_property(y, sort_by));
            if (x_position !== -1 && y_position !== -1 && x_position !== y_position) {
                return x_position < y_position
            }
        }
    }
}

function sort_get_property(object, list) {
    if (list.length === 0) {
        return object
    } else {
        if (object[list[0]] !== undefined && object[list[0]] !== null) {
            return sort_get_property(object[list[0]], list.slice(1))
        } else {
            return null
        }
    }
}

function map_by_text(x) {
    return x.map(function (y) {return y.text})
}