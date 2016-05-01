var lcs = function (a, b) {
    var a_length_inc = a.length + 1;
    var b_length_inc = b.length + 1;
    var arr = [];
    var a_item;
    var b_item;
    var arr_item;
    var result;
    for (var i = 0; i < a_length_inc; i++) {
        arr.push([0]);
    }
    for (var i = 1; i < b_length_inc; i++) {
        arr[0].push(0);
    }
    for (var i = 1; i < a_length_inc; i++) {
        arr_item = arr[i];
        for (var j = 1; j < b_length_inc; j++) {
            a_item = a[i - 1];
            b_item = b[j - 1];
            if (a_item[0] === 0) {
                result = 0;
                for (var k = 0; k < a_item[1].length; k++) {
                    result = Math.max(result, arr[a_item[1][k]][j]);
                }
            } else if (b_item[0] === 0) {
                result = 0;
                for (var l = 0; l < b_item[1].length; l++) {
                    result = Math.max(result, arr[i][b_item[1][l]]);
                }
            } else if (a_item[0] === b_item[0]) {
                result = 0;
                for (var k = 0; k < a_item[1].length; k++) {
                    for (var l = 0; l < b_item[1].length; l++) {
                        result = Math.max(result, arr[a_item[1][k]][b_item[1][l]]);
                    }
                }
                result += 1;
            } else {
                result = 0;
                for (var k = 0; k < a_item[1].length; k++) {
                    result = Math.max(result, arr[a_item[1][k]][j]);
                }
                for (var l = 0; l < b_item[1].length; l++) {
                    result = Math.max(result, arr[i][b_item[1][l]]);
                }
            }
            arr_item.push(result);
        }
    }
    return arr;
}

// console.log(lcs([['a', [0]], ['b', [0]], [0, [1, 2]], ['c', [3]]], [['a', [0]], ['b', [1]]]));
// should give [[0, 0, 0], [0, 1, 1], [0, 0, 1], [0, 1, 1], [0, 1, 1]]

var special_chars = '/^|{}-';

var is_special_char = function (c) {
    return special_chars.indexOf(c) !== -1;
}

var best_match_from_lcs = function (a, b, arr) {
    
}

var structure_from_part = function (s) {
    
}

var regex_from_structure = function (s) {
    
}

var regex_from_string = function (s) {
    var arr = [];
    for (var i = 0; i < s.length; i++) {
        // zero is the implied start location.
        arr.push([String.fromCharCode(s[i]), [i]]);
    }
    return arr;
}

// print stuff when:
// it's not a special character
// you did not meet a slash without a brace, space, or dash
// you are not in a locked braced region (at most one exists at a time)
var display_from_string = function (s) {
    var brace_locked = false;
    var slash_locked = false;
    var depth = 0;
    var locked_depth;
    var s_arr = [];
    var char;
    for (var i = 0; i < s.length; i++) {
        char = s[i];
        if (char === '{') {
            depth++;
        } else if (char === '}') {
            depth--;
        }
        if (brace_locked) {
            if (depth === locked_depth) {
                brace_locked = false;
            }
        } else if (slash_locked) {
            if ((char === ' ') || (char === '-')) {
                slash_locked = false;
                s_arr.push(' ');
            } else if ((char === '{') || (char === '}')) {
                slash_locked = false;
            }
        } else {
            if (char === '-') {
                s_arr.push(' ')
            } else if (char === '/') {
                slash_locked = true;
            } else if (char === '|') {
                brace_locked = true;
                locked_depth = depth - 1;
            }
            
            if (!is_special_char(char)) {
                s_arr.push(char);
            }
        }
    }
    return s_arr.join('');
}