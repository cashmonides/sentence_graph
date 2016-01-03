function WordSelector(words) {
    this.words = words;
    // We initially set the words_in_play property of our word selector to an empty set.
    // The words_in_play property is a set containing the words that should be tagged.
    this.words_in_play = new Set();
    // We initially set the previous_id property of our word selector to null.
    // The previous_id property is the id of the most recent word clicked.
    this.previous_id = null;
    // this.click_working is a property that describes whether the click_action function should operate.
    this.click_working = true;
}

// This function, given a starting index, returns the indices
// of the clause starting with that index.
WordSelector.prototype.indices_of_clause_starting_with = function(i) {
    // list is a variable that will will eventually return.
    var list = [i];
    // depth is how many levels of subordination deep we are compared to just after i.
    var depth = 0;
    // We increase i because we do not want i itself to have an effect
    // if it is an open parenthesis.
    i++;
    // We have a loop in which i increases by 1 every iteration.
    // We break out of it by using break.
    while (true) {
        if (this.words[i] === undefined) {
            // We have hit the end of the sentence. So we break.
            break
        } else if (this.words[i] === '(') {
            // We have hit an open parenthesis. So we increase our depth.
            // (Note that this open parenthesis can never be part of the clause.)
            depth++
        } else if (this.words[i] === ')') {
            // We check whether the depth is 0. If it is, we're done with our clause.
            // We put the index in the list and break. If not, we only decrease the depth.
            if (depth === 0) {
                list.push(i);
                break
            }
            depth--
        } else if (this.words[i] === '/') {
            // If the depth is 0, we're done with our clause, so we break.
            if (depth === 0) {
                break
            }
        } else if (depth === 0) {
            // We're in our clause, so we push the index.
            list.push(i)
        }
        // We increment i.
        i++
    }
    // We return our list.
    return list;
};

// This function resets the color of each word.
WordSelector.prototype.set_color_of_words = function () {
    // We loop over sentence.words.
    for (var i = 1; i < this.words.length; i++) {
        // We set e to the corresponding html element.
        var e = document.getElementById(i.toString());
        // If i is in this.words_to_play, e becomes red. Otherwise e becomes white.
        e.style.background = this.words_in_play.has(i) ? "red" : "white"
    }
};

// This function turns each word of the word selector in word_list a specific color.
WordSelector.prototype.turn_words_in = function (word_list, color) {
    this.set_color_of_words();
    word_list.forEach(function (x) {document.getElementById(x).style.background = color})
};

// This function is called for its side effects and has no return value.
// It takes the event and the id of the word clicked as its parameters.
// It updates words_in_play and previous_id, changes the color of some words,
// and has no other side effects.
WordSelector.prototype.click_action = function (event, id) {
    // If this.click_working is false, it means that for some reason, the user should not
    // be clicking on words in the sentence, for example, if they should
    // be clicking on entries in a box.
    if (this.click_working === false) {
        alert('Currently, you should not click on words in the sentence.');
        return null
    }
    // word is the word that was clicked on.
    // It is used twice: it is part of the next console.log
    // and used to determine if our word in an opening parenthesis.
    var word = this.words[id];
    // This is just a debugging log.
    // Note that at this point, our new word has not yet been
    // added to this.words_in_play.
    console.log("TAGGED! ", id, word, this.words_in_play);
    // i will be a looping index, as it usually is.
    var i;
    // We check if the shift key is held down. (This is the only use of event.)
    if (event.shiftKey) {
        // The shift key is held down, so we log this.
        console.log("shift key detected");
        // If this.previous_id is null, we don't want to do anything,
        // so we check that it isn't.
        if (this.previous_id !== null) {
            // We declare a start variable and an end variable,
            // and loop from start to end.
            // We don't know which of start and end will be more, so
            // we define start to be the smaller and end to be the larger.
            var start = Math.min(this.previous_id, id);
            var end = Math.max(this.previous_id, id);
            // We loop from start to (and including) end.
            for (i = start; i <= end; i++) {
                // For each i, we add it to words_in_play.
                this.words_in_play.add(i);
            }
        }
    } else {
        // The shift key is not held down.
        // We check whether id is already in words_in_play.
        if (this.words_in_play.has(id)) {
            // id is in words_in_play. We remove it and make the word white.
            this.words_in_play.delete(id);
        } else if (word === '(' || word === '/' || word === '|') {
            // id is not in words_in_play, but our word is an
            // open parenthesis, slash, or start character,
            // so we loop over the indices of the target clause, which we assign
            // to a variable.
            var indices_of_target_clause = this.indices_of_clause_starting_with(id);
            // We loop over the indices of the target clause here.
            for (i = 0; i < indices_of_target_clause.length; i++) {
                // For each i, we add it to words_in_play.
                this.words_in_play.add(indices_of_target_clause[i]);
            }
        } else {
            // id is not in words_in_play. We add it.
            this.words_in_play.add(id);
        }
    }
    // We reset the color of each word.
    this.set_color_of_words();
    // We reset this.previous_id.
    this.previous_id = id;
};