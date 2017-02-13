var calculate_word_mastery = function (correct, total, minimum_exposure) {
    return (correct - minimum_exposure) / total;
}