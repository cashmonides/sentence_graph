var ALL_CONVENTIONS = {
    'sub/sim convention': {
        'construction': [
            'purpose clause',
            'indirect command',
            'fear clause',
            'prevention clause'
        ],
        'correct': 'subsequent time',
        'arbitrarily incorrect': 'simultaneous time',
        'message': 'remember that the (somewhat arbitrary) convention ' +
        'for relative time is SUBSEQUENT in @construction~s.'
    },
    'substantive ut convention': {
        'construction': [
            'fear clause',
            'substantive ut clause',
        ],
        'correct': 'fear clause',
        'arbitrarily incorrect': 'substantive ut clause',
        'applicable': ['17.26'],
        'message': 'although this clause could be considered ' +
        'a substantive ut clause, we arbitrarily consider it a fear clause.'
    }
}

var get_type_of_convention = function (convention, name) {
    var correct = convention.correct;
    for (var i in syntax_module_filter.verb_syntax) {
        if (correct in syntax_module_filter.verb_syntax[i]) {
            return i;
        }
    }
    throw 'Convention "' + name + '" does not appear to have an ' +
    'associated dropdown.';
}

var get_cond = function (s_list) {
    s_list = enlist(s_list);
    return function (convention) {
        var s;
        for (var i = 0; i < s_list.length; i++) {
            s = s_list[i];
            if (s in convention) {
                return enlist(convention[s]);
            }
        }
        return null;
    }
}

var check_same = function (s) {
    var g = get_cond(s);
    return function (convention, x) {
        return g(convention).indexOf(x) !== -1;
    }
}

var get_applicable_conv = get_cond('applicable');

var get_non_applicable_conv = get_cond(['non-applicable', 'not applicable']);

var applies_to = function (convention, sentence) {
    var a = get_applicable_conv(convention);
    var n = get_non_applicable_conv(convention);
    if (a !== null) {
        return sentence.indexOf(a) !== -1;
    } else if (n !== null) {
        return sentence.indexOf(n) === -1;
    } else {
        return true;
    }
}

var drop_downs_work = function (convention, get_correct) {
    var item;
    var allowed;
    for (var i = 0; i < verb_drop_down_types.length; i++) {
        item = verb_drop_down_types[i];
        allowed = get_cond(item)(convention);
        if (allowed !== null && allowed.indexOf(get_correct(item)) === -1) {
            return false;
        }
    }
    return true;
}

var is_arbitarily_incorrect_conv = check_same('arbitrarily incorrect');

var is_correct_conv = check_same('correct');

var convention_applies = function (name, info) {
    var convention = ALL_CONVENTIONS[name];
    
    // Check that the convention applies to the relevant drop down.
    if (get_type_of_convention(convention, name) !== info.type) {
        return false;
    }
    // Check that the correct answer is correct.
    if (!(is_correct_conv(convention, info.correct))) {
        return false;
    }
    // Check that the convention applies given the sentence.
    if (!(applies_to(convention, info.sentence))) {
        return false;
    }
    // Check that the conditions are met for every drop down.
    if (!(drop_downs_work(convention, info.get_drop_down_correct))) {
        return false;
    }
    // Check that the answer is arbitarily incorrect.
    if (!(is_arbitarily_incorrect_conv(convention, info.given))) {
        return false;
    }
    return true;
}

// info: a dictionary
// its properties are:
// correct: correct answer
// type: drop down type
// get_drop_down_correct: a function taking a type and returning the
// correct answer for that type of drop down
// given: the answer given
// sentence: the sentence chapter and number
var conventions_matched = function (info) {
    return Object.keys(ALL_CONVENTIONS).filter(function (name) {
        return convention_applies(name, info);
    });
    /*
    var item;
    for (var i = 0; i < verb_drop_down_types.length; i++) {
        item = ALL_CONVENTIONS
        if (get_correct_answer(verb_drop_down_types[i])) {
            
        }
    }
    */
}