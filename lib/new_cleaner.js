var special_chars = '/^|{}()-@$[]';

var is_special_char = function (c) {
    return special_chars.indexOf(c) !== -1;
}

var is_non_paren_special_char = function (c) {
    return is_special_char(c) && c !== '(' && c !== ')';
}

var strip = function (x, c) {
    if (c === undefined) {c = ' '};
    return x.replace(new RegExp('^' + c + '+', 'g'), '').
    replace(new RegExp(c + '+$', 'g'), '').
    replace(new RegExp(c + '+', 'g'), c);
}

var remove_common_words = function (s) {
    for (var i in cleaning_words_to_delete) {
        s = s.replace(new RegExp('\\b' + i + '\\b', 'g'), '');
    }
    return s;
}

var regex_string_from_part = function (part) {
    return strip(remove_common_words(part), '-').
    replace(/-/g, '[ ]?').replace(/\|+/g, '|').
    replace(/^/g, '').replace(/\)/g, '|)').
    replace(/[^\/a-z][a-z]*\//g, function(m) {return m[0] + '(' + m.slice(1)}).
    replace(/\/[a-z]*[^\/a-z]/g, function(m) {return m.slice(0, -1) + ')' + m.slice(-1)}).
    replace(/^[a-z]*\//g, function(m) {return '(' + m}).
    replace(/\/[a-z]*$/g, function(m) {return m + ')'}).
    replace(/\//g, '|').replace(/{/g, '(').replace(/}/g, ')');
}

var regex_from_part = function (part) {
    var s = regex_string_from_part(part);
    if (s) {
        return new RegExp('\\b' + s + '\\b', 'g');
    } else {
        return null;
    }
}

var cleaning_words_to_delete = {
    'a': true,
    'an': true,
    'the': true,
    'might': true,
    'may': true,
    'my': true,
    'your': true,
    'our': true,
    'his': true,
    'her': true,
    'their': true
}

var remove_punc = function (string) {
    return string.replace(/[^a-z ]/g, '');
}

var only_letters_space_and_chars_regex = function (chars) {
    if (chars === undefined) {chars = ''};
    return new RegExp('[^a-z ' + chars.replace(/\W/g, function (x) {return '\\' + x}) + ']', 'g');
}

var remove_true_punc = function (string) {
    return string.replace(only_letters_space_and_chars_regex(special_chars), '');
}

var indices_of_words = function (string, fn, indices) {
    var word = [];
    var consider_deleting_word = function () {
        if (fn(word.map(function (x) {return x.text}).join(''))) {
            for (var j = 0; j < word.length; j++) {
                indices[word[j].index] = true;
            }
        }
    }
    for (var i = 0; i <= string.length; i++) {
        if (i in indices) {
            continue;
        }
        if (string[i] === ' ' || i === string.length) {
            consider_deleting_word();
            word = [];
        } else {
            word.push({'text': string[i], 'index': i})
        }
    }
    return indices;
}

// '   The !@#$%^cat eāt  $ t-h-e fIsh   ' -> cat eat fish
var mf_clean_input_string = function (string) {
    // already lower case
    
    var indices_to_drop = {};
    var i;
    for (i = 0; i < string.length; i++) {
        var g = string.charCodeAt(i);
        if (string[i] !== ' ' && (g < 97 || g > 122 )) {
            indices_to_drop[i] = true;
        }
    }
    
    indices_of_words(string, function (w) {
        return w in cleaning_words_to_delete;
    }, indices_to_drop);
    
    var prev = null;
    for (i = 0; i < string.length; i++) {
        if (i in indices_to_drop) {
            continue;
        }
        if (string[i] === ' ' && (prev === null || string[prev] === ' ')) {
           indices_to_drop[i] = true;
        }
        prev = i;
    }
    for (i = string.length - 1; i > -1; i--) {
        if (i in indices_to_drop) {
            continue;
        }
        if (string[i] === ' ') {
            indices_to_drop[i] = true;
        }
        break;
    }
    return indices_to_drop;
    // return strip(remove_common_words(remove_punc(string.toLowerCase())));
}

var standardized_model = function (sentence) {
    return remove_true_punc(sentence.toLowerCase());
}

// Currently we have five different float notations.
// Eventually we'll probably decide on one (or two).
var remove_sigils = function (x) {
    if (x[0] === '[') {
        if (x[x.length - 1] === ']') {
            return x.slice(1, -1);
        } else {
            throw 'Square brackets must match!';
        }
    } else if (x[0] === '@' || x[0] === '$') {
        if (x[x.length - 1] === x[0]) {
            return x.slice(1, -1);
        } else {
            return x.slice(1);
        }
    } else {
        return x;
    }
}

var sigil_type = function (x) {
    /*
    if ('@$['.indexOf(x[0]) !== -1) {
        return 'floating';
    } else {
        return 'fixed';
    }
    */
    return 'floating';
}

var lcs_len_var = function (locs) {
    var l = [];
    for (var i = 0; i < locs.length; i++) {
        if (locs[i] !== null) {
            l.push(Math.max(0, Math.max.apply(null, l.filter(function (x, j) {
                return locs[j] !== null && locs[j] <= locs[i];
            }))) + 1);
        } else {
            l.push(0);
        }
    }
    return Math.max(0, Math.max.apply(null, l));
}

var transform_dropped = function (a, b, l) {
    var j = 0;
    var d = {};
    for (var i = 0; i < l; i++) {
        if (!(i in b)) {
            if (j in a) {
                d[i] = true;
            }
            j++;
        }
    }
    return d;
}

var make_checker = function (sentence) {
    // ox -> oxen, regex -> regexen
    var model = standardized_model(sentence)
    
    var pre_regexen = model.split(' ');
    
    var regexen = pre_regexen.map(function (x) {
        return {'regex': regex_from_part(remove_sigils(x)), 'type': sigil_type(x)};
    }).filter(function (x) {
        var r = x.regex;
        return r !== null && !(r.exec(''));
    });
    
    var get_regexen_of_type = function (x) {
        var filtered_regexen = regexen.filter(function (y) {return y.type === x});
        return filtered_regexen.map(function (x) {return x.regex});
    }
    
    console.log(regexen);
    
    return function (s) {
        var i;
        
        regexen.forEach(function (x) {
            x.regex.endIndex = 0;
        });
        
        var add_correct = function (a, b) {
            for (var i = a; i < b; i++) {
                delete indices_incorrect[i];
            }
        }
        
        s = s.toLowerCase();
        
        var dropped = mf_clean_input_string(s);
        
        var t_l = [];
        for (i = 0; i < s.length; i++) {
            if (!(i in dropped)) {
                t_l.push(s[i]);
            }
        }
        
        var t = t_l.join('');
        
        console.log(s, dropped, t_l, t);
        
        var words_list = model.split(/[^a-z]/g);
        
        var words_dict = {};
        
        for (i = 0; i < words_list.length; i++) {
            words_dict[words_list[i]] = true;
        }
        
        var indices_incorrect = {};
        
        indices_of_words(t, function (w) {
            return !(w in words_dict);
        }, indices_incorrect);
        
        var score = 0;
        get_regexen_of_type('floating').forEach(function (r) {
            var e = r.exec(t);
            if (e !== null) {
                // add_correct(e.index, r.lastIndex);
                score++;
            }
        });
        var locs = get_regexen_of_type('fixed').map(function (r) {
            var e = r.exec(t);
            if (e !== null) {
                // add_correct(e.index, r.lastIndex)
                return r.lastIndex;
            } else {
                return null;
            }
        });
        
        score += lcs_len_var(locs);
        
        var real_incorrect_indices = transform_dropped(
            indices_incorrect, dropped, s.length);
        
        return {
            'score': score / regexen.length,
            'incorrect': real_incorrect_indices
        }
    }
}

var get_match_fraction = function (model, input) {
    return make_checker(model)(input);
}

// print stuff when:
// it's not a special character
// you did not meet a slash without a brace, space, or dash
// you are not in a locked braced region (at most one exists at a time)
var display_model_translation = function (s) {
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
            if (/\W/.exec(char) && '{}/|'.indexOf(char) === -1) {
                slash_locked = false;
                if (char === '-') {
                    s_arr.push(' ');
                } else {
                    s_arr.push(char);
                }
            } else if ((char === '{') || (char === '}')) {
                slash_locked = false;
            } else if (char === '|') {
                slash_locked = false;
                brace_locked = true;
                locked_depth = depth - 1;
            }
        } else {
            if (char === '-') {
                s_arr.push(' ');
            } else if (char === '/') {
                slash_locked = true;
            } else if (char === '|') {
                brace_locked = true;
                locked_depth = depth - 1;
            }
            
            if (!is_non_paren_special_char(char)) {
                s_arr.push(char);
            }
        }
    }
    return s_arr.join('');
}

/*
var m1 = make_checker(
    'I-will-{be-afraid||fear}-to-see the torches-in-the-road.');

var text = [
    'foo foo bar bar',
    'I * fear * the * Array',
    'I * will fe|ar  to see * the * Array',
     'I * fear * the * Array',
    'torches a in road: I will the fe|ar  to see blah blah',
    'I will fear to see! I will fear to see!',
    'penalty of sailors: concern of queen',
    'concern of queen was penalty of sailors',
    'penalty of sailors was concern of queen',
    'was concern'
];

text.forEach(function (x) {
    console.log(x);
    console.log(clean_input_string(x));
    console.log(m1(x));
});

console.log('');

// make_checker is not actually used except in tests.

var m2 = make_checker(
    'The penalty-of-the-sailors was-anxiety/concern to/of-the-queen.');
text.forEach(function (x) {
    console.log(x);
    console.log(clean_input_string(x));
    console.log(m2(x));
});

console.log('');

var display_tests = [
    'I-will-{be-afraid||fear}-to-see the torches-in-the-road.',
    'The penalty-of-the-sailors was-anxiety/concern to/of-the-queen.',
    'We-have the money-of-the-poets.',
    'Will-the-queen-give the money to-the-poets?',
    'We-wanted/chose-to-see the queen-of-the-island ' +
    'with-the-crowd-of-the-sailors.',
    'Indeed the women will-crown the poets with-crowns.',
    'You-(plural)-were-seeing the women in/on-the-roads but ' +
    'concerning/about-their-beauty you-(plural)-were-not-shouting. ' +
    'You-(plural)-will-pay-the-penalty.',
    'The poets do-not-want/choose a queen-of/for-the-country/homeland ' +
    '{from||out-of}-the-crowd-of-women.'
];

display_tests.forEach(function (x) {console.log(display_from_string(x))});
*/