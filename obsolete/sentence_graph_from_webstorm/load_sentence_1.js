// This function, given the sentence text and the input box,
// puts the text in the box and returns the list of words in the text.
// It also makes the words in the text spans.
function load_sentence_1(text, input_box) {
    // -1 is an out-of-bounds value - a number that's not valid but within
    // the range of the data type we're using.
    var start = -1;
    // words is 1-based, so we give it a somewhat unused starting value.
    var words = [null];
    // word will be a word.
    var word;
    // We iterate over characters in the text.
    // Note that we let pos go up to text.length
    // so that we can process a final word.
    for (var pos = 0; pos < text.length + 1; pos++){
        // c is a character (or, if pos is text.length, undefined).
        var c = text[pos];
        // We check whether c is a conjunction character, word character, or neither.
        if (is_conj_char(c)) {
            // c is a conjunction character.
            // This will run if the preceding character is a word character.
            if (start >= 0) {
                // Because the preceding character was a word character, we need
                // to make the word that just ended.
                word = text.substring(start, pos);
                make_word(word, words, input_box)
            }
            // We consider c to be a word, and so put it in the box as such.
            make_word(c, words, input_box);
            // start must be reset to the out-of-bounds value.
            start = -1
        } else if (is_word_char(c)) {
            // c is a word character.
            // If start is -1, c is the first character of its word and start must be reset.
            if (start == -1) {
                start = pos;
            }
        } else {
            if (start >= 0) {
                // Because the preceding character was a word character, we need
                // to make the word that just ended.
                word = text.substring(start, pos);
                make_word(word, words, input_box)
            }
            // If c is not undefined, that is, if we are not at the end
            // (after the last character of the text) we append a text node containing c.
            if (c !== undefined) {
                input_box.appendChild(document.createTextNode(c));
            }
            // start must be reset to the out-of-bounds value.
            start = -1
        }
    }
    if (start >= 0) {
        // Because the preceding character was a word character, we need
        // to make the word that just ended.
        word = text.substring(start, pos);
        make_word(word, words, input_box)
    }
    // We return the list of words.
    return words
}

// This function makes a word, and puts it in a span in a box,
// given the word, a list the word must be pushed to,
// and the box to put the span in.
function make_word (word, words, input_box) {
    // We push the word to words.
    words.push(word);
    // We create a span.
    var s = document.createElement('span');
    // We put the word in the span.
    s.innerHTML = word;
    // We append s to the children of the box containing the sentence.
    input_box.appendChild(s);
}