var create_morphology_choices_table = function (options, table_id, classes,
funcs, list_of_rows, items_per_row) {
    var master_table;
    var master_row;
    var e;
    var makes = [];
    var current_make;
    var row;
    var html_row;
    var cell;
    var html_cell;
    var func_to_use;
    
    master_table = make({'tag': 'table', 'id': table_id,
    'style': {'display': 'block'}}, options);
    
    master_row = make({'tag': 'tr'}, master_table);
    
    
    for (var i = 0; i < items_per_row; i++) {
        current_make = {'tag': 'td'};
        if (classes !== null) {current_make['class'] = classes[i]};
        makes.push(current_make);
    };
    if (typeof list_of_rows[0] !== 'string') {
        e = make({'tag': 'table', 'id': table_id + '_inside',
        'style': {'display': 'inline-block'}}, master_row);
    }
    for (var i = 0; i < list_of_rows.length; i++) {
        row = list_of_rows[i];
        if (typeof row === 'string') {
            if (i !== 0) {
                make({'text': list_of_repetitions(' ', 10).join('\xa0')}, master_row);
            }
            e = make({'tag': 'table', 'id': table_id + '_' + row,
            'style': {'display': 'inline-block'}}, master_row);
            make({'tag': 'th', 'text': row}, e);
            continue;
        }
        if (row.length !== items_per_row) {
            throw new Error('Row of incorrect length (' + row.length +
            ' when it should be ' + items_per_row + ')');
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