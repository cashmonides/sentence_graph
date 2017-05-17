var pick_spelling_bee_words_with_persist_get = function (num_hard, num_hard_picked_from, num_random, callback) {
    Persist.get(['word_scores'], function (x) {
        var data = x.val();
        callback(pick_spelling_bee_words(data, num_hard, num_hard_picked_from, num_random));
    });
}

var pick_spelling_bee_words = function (data, num_hard, num_hard_picked_from, num_random) {
    var data_values = values(data);
    /*
    var list_of_words_and_roots_to_mastery = data_values.map(function (dict) {
        return alter_all_dictionary_values(dict, function (value) {
            return // This was not needed
        });
    });
    */
    var all_words_and_roots = unique_items(concat_all(data_values.map(Object.keys)));
    var calculate_accuracy_for_word_or_root = function (word_or_root) {
        var total_correct = sum(data_values.map(function (item) {
            return (item[word_or_root] || {}).correct; // avoids errors when item[word_or_root] is undefined.
        }).filter(function (item) {
            return item !== undefined; // filter out users who have not seen a word
        }));
        var total = sum(data_values.map(function (item) {
            return  (item[word_or_root] || {}).total; // avoids errors when item[word_or_root] is undefined.
        }).filter(function (item) {
            return item !== undefined; // filter out users who have not seen a word
        }));
        return total_correct / total;
    }
    var words_and_roots_to_average_accuracy = create_map_with_values_determined_by_function(
        all_words_and_roots, calculate_accuracy_for_word_or_root);
    var hardest_words = all_words_and_roots.sort(
        sort_by_value(words_and_roots_to_average_accuracy)
    ).slice(0, num_hard_picked_from);
    var random_hardest_words = random_n(hardest_words, num_hard);
    var random_words = random_n(all_words_and_roots, num_random);
    var result = convert_words_from_firebase_to_normal(
        shuffle(unique_items(random_hardest_words.concat(random_words))));
    return result;
}

// for testing
// var f = function () {pick_spelling_bee_words_with_persist_get(50, 500, 50, function (x) {console.log(x)})};
