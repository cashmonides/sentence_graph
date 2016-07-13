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
    var with_ops_replaced = replace_ops(rule);
    // Then divide into words.
    return words_in_rule(with_ops_replaced);
}

// This function removes the operators from a tokenized rule.
var get_non_operators = function (rule) {
    // We filter the rule.
    return rule.filter(function (x) {
        // We filter out 'and' and 'or', currently our only operators.
        return x !== 'and' && x !== 'or';
    });
}

// This function creates a function from a tokenized rule.
var function_from_tokenized_rule = function (rule) {
    // We find the non-operators (that is, the real words)
    // in the rule.
    var non_operators = get_non_operators(rule);
    // We check whether the rule has an 'and'
    // by checking whether the index of and is not negative one.
    if (rule.indexOf('and') !== -1) {
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

// This function does the complete process to a rule.
var parse_rule = function (rule) {
    return function_from_tokenized_rule(tokenize_rule(rule));
}