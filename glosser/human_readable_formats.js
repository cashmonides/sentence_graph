var human_readable_matches_old = function (text) {
    var note = 'Note: lower scores are generally better.';
    var data = match_text_against_words(get_real_words(latin_words_in_mf))(text);
    return note + data.map(make_entry_readable_old).join('\n');
}

var make_entry_readable_old = function (entry) {
    var word = entry.word;
    var matches = entry.word_results;
    if (matches.length === 0) {
        return 'There were no matches for the word ' + word + '.';
    } else if (matches.length === 1) {
        return 'The only match for the word ' + word + ' was:\n' +
        display_match_old(matches[0]);
    } else {
        return 'There were ' + number_display(matches.length) +
        ' matches for the word ' + word + '. They were:\n' +
        matches.map(display_match_old).join('\n');
    }
}

var number_display = function (n) {
    if (n === 2) {
        return 'two';
    } else if (n === 3) {
        return 'three';
    } else {
        return 'many';
    }
}

var display_match_old = function (x) {
    return x.word.stem1.replace(/[#$]/g, '') + ', with definition "' +
    x.word.definition + '" and score ' + x.score;
}

// new stuff starts here

var human_readable_matches = function (text) {
    var data = match_text_against_words(get_real_words(latin_words_in_mf))(text);
    var data1 = data.filter(function (x) {return x.word_results.length === 0});
    var data2 = data.filter(function (x) {return x.word_results.length !== 0});
    return table_from_pre_table(data1.map(table_row_from_entry).concat(data2.map(table_row_from_entry)));
}

var table_row_from_entry = function (entry) {
    return [[entry.word], entry.word_results.map(
        function (x) {return x.word.stem1}),
        entry.word_results.map(
        function (x) {return x.word.definition})]
}

var array_max = function (l) {
    return Math.max.apply(null, l);
}

var flatten = function (l) {
    return [].concat.apply([], l);
}

var str_times = function (s, n) {
    var r = [];
    for (var i = 0; i < n; i++) {
        r.push(s);
    }
    return r.join('');
}

var table_from_pre_table = function (pre_table) {
    var column_widths = [];
    for (var c_n = 0; c_n < pre_table[0].length; c_n++) {
    	var column = pre_table.map(function (x) {return x[c_n]});
    	var max_width_in_cell = function (cell) {
    		return array_max(cell.map(function (y) {return y.length}))
    	}
        column_widths.push(array_max(column.map(max_width_in_cell)) + 1);
    }
    var row_heights = [];
    for (var r_n = 0; r_n < pre_table.length; r_n++) {
        row_heights.push(array_max(pre_table[r_n].map(function (y) {return y.length})));
    }
    var result = [];
    for (var r_n = 0; r_n < pre_table.length; r_n++) {
        for (var real_rn = 0; real_rn < row_heights[r_n]; real_rn++) {
            for (var c_n = 0; c_n < pre_table[r_n].length; c_n++) {
                var entry = (real_rn < pre_table[r_n][c_n].length) ?
                pre_table[r_n][c_n][real_rn] : null;
                if (entry === null) {
                    result.push(str_times(' ', column_widths[c_n]));
                    if (real_rn === 0) {
                        result[result.length - 1] = 'xxxxx' +
                        result[result.length - 1].slice(5);
                    }
                } else {
                    result.push(entry + str_times(' ', column_widths[c_n] - entry.length));
                }
            }
            result.push('\n');
        }
    }
    return result.join('');
}
