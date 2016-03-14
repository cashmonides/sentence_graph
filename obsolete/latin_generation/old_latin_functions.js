// Some old, unused, Latin functions.

/*
function remove_lexemes (lexeme_list, elements) {
    for (var i in lexeme_list) {
        if (elements.indexOf(i) === -1 && i.indexOf('dummy') === -1) {
            delete lexeme_list[i]
        }
    }
}


function remove_dummies (lexeme_list_with_dummies) {
    var lexeme_list = {};
    for (var i in lexeme_list_with_dummies) {
        if (i.indexOf('dummy') === -1) {
            lexeme_list[i] = lexeme_list_with_dummies[i]
        }
    }
    return lexeme_list;
}
*/

/*
Note: This function is old.
It is preserved in order that if what is being done is a terrible idea,
it can be fixed.
function alter_lexeme_list(state, elements, current_lexicon, lexeme_list) {
    // Note: this function now uses mutation.
    var i;
    // Note: it shouldn't matter what order these tasks are done in.
    for (i = 0; i < elements.length; i++) {
        if (!(elements[i] in lexeme_list)) {
            lexeme_list[elements[i]] = pick_lexeme_new(state, elements[i], current_lexicon, lexeme_list);
        }
    }
    for (i in lexeme_list) {
        if (elements.indexOf(i) === -1) {
            delete lexeme_list[i]
        }
    }
}
*/