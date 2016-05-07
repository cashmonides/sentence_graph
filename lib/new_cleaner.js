var special_chars = '/^|{}()-';

var is_special_char = function (c) {
    return special_chars.indexOf(c) !== -1;
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
    if (s) {return new RegExp(s)} else {return null}
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
    return new RegExp('[^a-z ' + chars + ']', 'g');
}

var remove_true_punc = function (string) {
    return string.replace(only_letters_space_and_chars_regex(special_chars), '');
}

// '   The !@#$%^cat eāt  $ t-h-e fIsh   ' -> the cat eat the fish
var clean_input_string = function (string) {
    return strip(remove_common_words(remove_punc(string.toLowerCase())));
}

var standardized_model = function (sentence) {
    return remove_true_punc(sentence.toLowerCase())
}

var make_checker = function (sentence) {
    // ox -> oxen, regex -> regexen
    var regexen = standardized_model(sentence).split(' ').
    map(regex_from_part).filter(function (x) {return x !== null});
    
    return function (s) {
        s = clean_input_string(s);
        var score = 0;
        regexen.forEach(function (r) {if (r.exec(s) !== null) {score++}});
        return score / regexen.length;
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
            if ((char === ' ') || (char === '-')) {
                slash_locked = false;
                s_arr.push(' ');
            } else if ((char === '{') || (char === '}')) {
                slash_locked = false;
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
            
            if (!is_special_char(char)) {
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