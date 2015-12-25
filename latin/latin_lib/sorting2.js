function sorted_choices(output, key_for_word) {
    return map_by_text(separate_by_lexeme(quick_sort(output[key_for_word], custom_sort))).map(
        function (x) {return {'subheading': x.subheading, 'choices': unique_items(x.choices)}});
}

function quick_sort(list, f) {
    if (list.length === 0) {return []}
    // We sort from random index (original data may be somewhat sorted).
    // Perhaps we should switch to merge sort.
    var n = rand_int(list.length);
    var pivot = list[n];
    var rest = remove(list, n);
    var before = rest.filter(function (x) {return f(x, pivot)});
    var after = rest.filter(function (x) {return f(pivot, x)});
    return quick_sort(before, f).concat(pivot, quick_sort(after, f))
}

function separate_by_lexeme(l) {
    var r = [];
    var current_root = null;
    l.forEach(function (x) {
        var xl = x.lexeme === 'not the right lexeme' ? 'other' : x.lexeme.properties.english.root;
        if (xl !== current_root) {
            current_root = xl;
            r.push({'subheading': xl, 'choices': [x]})
        } else {
            peek(r).choices.push(x)
        }
    });
    return r
}

function custom_sort(x, y) {
    var lpe = 'lexeme_properties_english';
    switch (x.part_of_speech) {
        case 'subject':
            return sort_which_is_first([[lpe + '_root', 'natural'],
                    ['kernel_number', ['singular', 'plural']],
                ['kernel_number`of`other`nouns', ['singular', 'plural']],
                ['kernel_person_0', 'natural']], x, y);
        case 'verb':
            return sort_which_is_first([[lpe + '_root', 'natural'],
                ['kernel_voice', ['active', 'passive']],
                ['kernel_tense', ['present', 'imperfect', 'future', 'present_subjunctive',
                    'imperfect_subjunctive', 'perfect_subjunctive', 'pluperfect_subjunctive',
                    'perfect', 'pluperfect', 'future_perfect', 'present_infinitive', 'perfect_infinitive']],
                ['kernel_person', ['1s', '2s', '3s', '1p', '2p', '3p']]], x, y);
        case 'object':
            return sort_which_is_first([[lpe + '_root', 'natural'],
                    ['kernel_number`of`other`nouns', ['singular', 'plural']],
                        ['kernel_number', ['singular', 'plural']]], x, y);
    }
}

function cheat_sheet_sort(x, y) {
    // Here x and y are rows of the cheat sheet.
    return sort_which_is_first(
        [['properties_core_part`of`speech', ['noun', 'verb']],
        ['properties_latin_root', remove_long_vowels]], x, y)
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
            if (x_value === null && y_value !== null) {
                return false
            } else if (x_value !== null && y_value === null) {
                return true
            } else if (x_value !== y_value) {
                return x_value < y_value
            }
        } else if (typeof possibilities === "function") {
            var x_value = possibilities(sort_get_property(x, sort_by));
            var y_value = possibilities(sort_get_property(y, sort_by));
            if (x_value === null && y_value !== null) {
                return false
            } else if (x_value !== null && y_value === null) {
                return true
            } else if (x_value !== y_value) {
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
    x.forEach(function (part) {
        part.choices = part.choices.map(function (y) {return y.text})
    });
    return x
}

// Latin sorting functions.
// Move this?
function remove_long_vowels(s) {
    var long_to_short = {'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U'};
    for (var i in long_to_short) {
        s = s.replace(i, long_to_short[i])
    }
    return s
}