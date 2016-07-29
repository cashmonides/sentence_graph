// The file that parses rules.

// Find the words in a rule.
// Note that rules allow things like latin:subjunctive,
// so we allow colons in a word. We also want to be able to use dash,
// so we allow it too.
var words_in_rule = function (rule) {
    return rule.match(/[A-Za-z:\-]+/g);
}

// This replaces operators in a rule.
// Currently the only operators supported are or
// (also represented by any number of pipes) and and
// (also represented by any number of ampersands)
var replace_ops = function (rule) {
    return rule.replace(/\|+/g, ' or ').replace(/&+/g, ' and ');
}

// This divides a rule into tokens.
var tokenize_rule = function (rule) {
    // Replace the operators.
    return replace_ops(rule);
    // We don't need to divide into words anymore.
    // // Then divide into words.
    // return words_in_rule(with_ops_replaced);
}

// This function removes the operators from a tokenized rule.
var get_non_operators = function (rule) {
    // We split the rule by and and or. We do not capture because
    // some browsers would add and and or back in,
    // due to them being captured.
    return rule.split(/ +(?:and|or) +/g).filter(function (x) {
        return x !== 'and' && x !== 'or';
    });
}

// A simple test.
var get_non_operators_test = function () {
    // Form a result and an expected result.
    var result = get_non_operators('stranger and weirder or at any rate ' +
    'unusual and that is all');
    var expected = ['stranger', 'weirder', 'at any rate unusual',
    'that is all'];
    // Check for the same length.
    if (result.length !== expected.length) {
        throw 'Not the same length: ' + result.length + ' is not ' +
        expected.length + '!';
    }
    // Loop over the actual result.
    for (var i = 0; i < result.length; i++) {
        // Throw an error is the results are different in some position.
        if (result[i] !== expected[i]) {
            throw result[i] + ' is not ' + expected[i] + '!';
        }
    }
    // If we get to here, the test passed.
}

get_non_operators_test();

// This function creates a function from a tokenized rule.
var function_from_tokenized_rule = function (rule) {
    // We find the non-operators (that is, the real words)
    // in the rule.
    var non_operators = get_non_operators(rule);
    // We check whether the rule has an 'and'
    // by checking whether the index of and is not negative one.
    if (rule.indexOf(' and ') !== -1) {
        // We return a function.
        return function (x) {
            // We loop over the non-operators.
            for (var i = 0; i < non_operators.length; i++) {
                // We check whether one of them fails.
                if (!x.check(non_operators[i])) {
                    // Since we have and, we fail if any of them fail.
                    return false;
                }
            }
            // None of them failed so we return true.
            return true;
        };
    } else {
        // We again return a function.
        return function (x) {
            // Again, we loop over the non-operators.
            for (var i = 0; i < non_operators.length; i++) {
                // We check if any succeed.
                if (x.check(non_operators[i])) {
                    // If any succeed, we return true.
                    return true;
                }
            }
            // None of them worked, so we return false.
            return false;
        };
    }
}

// A regex to match arrows.
var arrow_regex = / *[=\-]> */g;

var parse_arrow_rule = function (rule) {
    // The rules within the rule.
    var sub_rules = rule.split(arrow_regex);
    // We remove the last one, parse it, and make it
    // a consequence of the others.
    // (Logically, in 'main -> indicative', 'indicative' should be
    // the consequence of 'main').
    var consequence = parse_rule(sub_rules.pop());
    // We also have the assumptions: those things that are needed
    // for the consequence. They, indeed, are everything
    // but the consequence.
    var assumptions = sub_rules.map(parse_rule);
    // We then return our function. It assumes the situation is good
    // if any of the assumptions fail, but otherwise
    // it all rests on the consequence.
    // (Yes, by the logical behavior of an if-statement, an assumption failing
    // means that statement evaluates to true.)
    return function (x) {
        // Iterate over the assumptions.
        for (var i = 0; i < assumptions.length; i++) {
            // Check whether the assumption failed.
            if (!assumptions[i](x)) {
                // The assumption failed so the statement passes.
                return true;
            }
        }
        // It all comes down to the consequence.
        return consequence(x);
    }
}

// This function does the complete process to a rule.
var parse_rule = function (rule) {
    // Check whether the rule has an arrow.
    if (rule.match(arrow_regex)) {
        // Parse the rule in a different way since it has an arrow.
        return parse_arrow_rule(rule);
    }
    return function_from_tokenized_rule(tokenize_rule(rule));
}