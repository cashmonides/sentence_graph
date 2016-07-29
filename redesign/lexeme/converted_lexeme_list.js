// Rather straightforward: convert all the JSON objects to Lexemes.

var converted_lexeme_list = values(testing_lexemes).map(function (x) {
    return new Lexeme(x);
});