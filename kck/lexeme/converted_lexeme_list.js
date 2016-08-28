// Rather straightforward: convert all the JSON objects to KCKLexemes.

var converted_lexeme_list = values(testing_lexemes).map(function (x) {
    return new KCKLexeme(x);
});

converted_lexeme_list = converted_lexeme_list.concat(
    Object.keys(conjunction_library).map(function (x) {
        return new Conjunction(x);
    }).filter(function (x) {
        // Remove the null conjunctions because they're not really lexemes.
        return x.usable_as_lexeme();
    })
);