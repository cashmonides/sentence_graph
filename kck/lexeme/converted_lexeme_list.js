// Rather straightforward: convert all the JSON objects to KCKLexemes.

var converted_lexemes_by_part_of_speech = {};

(function () {
    for (var i in testing_lexemes) {
        converted_lexemes_by_part_of_speech[i] = values(
            testing_lexemes[i]
        ).map(function (x) {
            return new KCKLexeme(x);
        });
    }
})();

converted_lexemes_by_part_of_speech.conjunction =
Object.keys(conjunction_library).map(function (x) {
    return new Conjunction(x);
}).filter(function (x) {
    // Remove the null conjunctions because they're not really lexemes.
    return x.usable_as_lexeme();
});