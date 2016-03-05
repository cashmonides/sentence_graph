// The main reason this is here is because it looks unclear.
// It is currently used for making etymology cheat sheets,
// and should perhaps be replaced in that purpose by
// something with more features.
var create_normal_cell = function (x) {
    return [[x, {}]];
}

// todo design issue; should this really go in cheat_sheets?
var latin_cheat_sheet_display = function (latin_word) {
    var stem = latin_word.split('-')[0];
    var ending = latin_word.split('-')[1] ? '-' + latin_word.split('-')[1] : '';
    return [[stem, {'font-weight': 'bold'}, 'b'],
    [ending, {'font-weight': '50%'}, 'b']];
}

var make_cheat_sheet_cell = function (e, f, text) {
    var parts = f(text);
    for (var j = 0; j < parts.length; j++) {
        var part = parts[j];
        // Arguably there is a better default than div.
        var tag = (part.length > 2) ? part[2] : 'div';
        var to_make = {'text': part[0], 'style': part[1], 'tag': tag};
        make(to_make, e);
    };
}

var create_cheat_sheet_table = function (o, table_id, classes,
funcs, list_of_rows, items_per_row) {
    var e = make({'tag': 'table', 'id': table_id,
    'style': {'display': 'block'}}, o);
    var makes = [];
    var current_make;
    var row;
    var html_row;
    var cell;
    var html_cell;
    var func_to_use;
    for (var i = 0; i < items_per_row; i++) {
        current_make = {'tag': 'td'};
        if (classes !== null) {current_make['class'] = classes[i]};
        makes.push(current_make);
    };
    for (var i = 0; i < list_of_rows.length; i++) {
        row = list_of_rows[i];
        if (typeof row === 'string') {
            make({'tag': 'th', 'text': row}, e);
            continue;
        }
        if (row.length !== items_per_row) {
            throw new Error('Row of incorrect length (' + row.length +
            ' when it should be ' + items_per_row);
        }
        html_row = make({'tag': 'tr'}, e);
        for (var j = 0; j < items_per_row; j++) {
            cell = row[j];
            html_cell = make(makes[j], html_row);
            if ((funcs === null) || (funcs[j] === null)) {
                func_to_use = create_normal_cell;
            } else {
                func_to_use = funcs[j];
            }
            make_cheat_sheet_cell(html_cell, func_to_use, cell);
        }
        /*
        var left = list_of_pairs[i][0];
        var right = list_of_pairs[i][1];
        var row = make({'tag': 'tr'}, e);
        var left_el = make(left_make, row);
        var left_parts = left_f(left);
        make_cheat_sheet_cell(left_el, left_f, left);
        var right_el = make(right_make, row);
        make_cheat_sheet_cell(right_el, right_f, right);
        */
    };
};