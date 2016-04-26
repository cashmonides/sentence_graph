// dsl test cases.

function test_case(f, args, expected) {
    var orig_f = f;
    for (var i = 0; i < args.length; i++) {
        f = f(args[i]);
    }
    
    if (f !== expected) {
        throw ["with code", orig_f,  "and args", JSON.stringify(args),
        "got", JSON.stringify(f), "and expected", JSON.stringify(expected)]
        .join(' ')
    }
};

function test_error(f, args, expected) {
    var orig_f = f;
    try {
        for (var i = 0; i < args.length; i++) {
            f = f(args[i]);
        }
    } catch (e) {
        if (e !== expected) {
            throw ["with code", orig_f,  "and args", JSON.stringify(args),
            "got", e, "and expected", expected]
            .join(' ')
        } else {
            return;
        }
    }
    throw ["with code", orig_f,  "and args", JSON.stringify(args),
    "got no error", "and expected", expected].join(' ');
};

var test_suite = function () {
    // In the future add some more tests here.
    // A test for some string issues I was getting.
    test_error(execute, ['"'], 'string not closed');
    
    test_error(execute, ['\'`m\''], 'improper escape sequence');
    
    test_case(execute, ['\'"\''], '"');
    
    test_case(execute, ['@"`" `b`tab"', {'" `\tab': 42}], 42);
    
    test_case(execute, ['a & b', {a: 7, b: null}], null);
    
    test_case(execute, ['b | a', {a: 0, b: 3}], 3);
    
    test_error(execute, ['true and 7'],
    'first argument to "and" operator is not a function');
    
    test_error(execute, ['42 or false'],
    'second argument to "or" operator is not a function');
    
    test_error(execute, ['true.false'],
    'first argument to "dot" operator is not a function');
    
    test_error(execute, ['not "real"'],
    'argument to "not" function is not a function');
    
    test_error(execute, ['a ? b : ""'],
    'argument to "curried question mark" function is not a function');
}

test_suite();
