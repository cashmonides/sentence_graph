// This function takes 1 out of every step items from a list, starting with list[start].
// It is equivalent to list[start::step] in Python, except that step must here be positive.
function step(list, start, step) {
    // We put our result in a list.
    var result = [];
    // i starts at start and goes up by step until
    // it is greater than the length of the list.
    for (var i = start; i < list.length; i += step) {
        // We push the ith item of list to result.
        result.push(list[i])
    }
    // We return our result.
    return result
}

// This function takes a clause and breaks it into its separate coordinate parts.
function process_bracketed_text_coordination(sentence, words_and_indices) {
    // This will be how deeply subordinate we are relative to where we began.
    var depth = 0;
    // This will be a loop variable.
    var i;
    // This will be a list of alternating parts of the sentence and coordination markers.
    var parts = [[]];
    // We should have some words. Otherwise something is wrong.
    if (words_and_indices.length === 0) {
        throw new Error("You tried to create an empty clause. And I saw it, and it was not good.")
    }
    // We loop over words_and_indices.
    for (i = 0; i < words_and_indices.length; i++) {
        // We check whether our word is a slash.
        if (words_and_indices[i]['word'] === '/') {
            // Our word is a slash.
            // We check whether we are on the main level.
            if (depth === 0) {
                // We push the slash as an entry in parts and then push a new empty clause.
                parts.push(words_and_indices[i]);
                parts.push([])
            } else {
                // We're not on the main level so we just push the slash to the list
                // entry in our parts list.
                parts[parts.length - 1].push(words_and_indices[i]);
            }
        } else {
            // Our word is not a slash, so we push it to the last entry in our parts list.
            parts[parts.length - 1].push(words_and_indices[i]);
            // If our word is an open parenthesis, we increase depth. If it's a closed parenthesis,
            // we do nothing to depth.
            if (words_and_indices[i]['word'] === '(') {
                depth++
            } else if (words_and_indices[i]['word'] === ')') {
                depth--
            }
        }
    }
    // result is the clauses in our parts list when process_bracketed_text_subordination
    // has been applied to them via map.
    var result = step(parts, 0, 2).map(function (x) {
        return process_bracketed_text_subordination(sentence, x)});
    // We loop over all items of result but the first.
    for (i = 1; i < result.length; i++) {
        // Just to be clear, the slash here is parts[2 * i - 1]
        // and the clause is result[i]. I'll refer to them later.
        // We put the preceding slash (that is, its index)
        // at the start of the appropriate clause.
        result[i].indices.unshift(parts[2 * i - 1]['index']);
        // We associate the slash with the appropriate clause.
        sentence.indices_to_clause_regions[parts[2 * i - 1]['index']] = result[i]
    }
    // We loop over result.
    for (i = 0; i < result.length; i++) {
        // Each clause is coordinate to all the others in result.
        result[i].clause.set('coordinate_all', result.map(function (x) {return x.clause}))
    }
    // We loop over all but the last member of result.
    for (i = 0; i < result.length - 1; i++) {
        // Each clause has the one to its right as coordinate_right
        // and it, itself, is coordinate_left to that clause.
        result[i].clause.set('coordinate_right', result[i + 1].clause);
        result[i + 1].clause.set('coordinate_left', result[i].clause)
    }
    // We return our result.
    return result
}

function process_bracketed_text_subordination(sentence, words_and_indices) {
    // This will be how deeply subordinate we are relative to where we began.
    var depth = 0;
    // This will be a loop variable.
    var i;
    // This will be a list. Every four items there will be a part of the main clause,
    // an open parenthesis, a subordinate part of the sentence, and a close parenthesis.
    var parts = [[]];
    // We should have some words. Otherwise something is wrong.
    if (words_and_indices.length === 0) {
        throw new Error("You tried to create an empty clause. And I saw it, and it was not good.")
    }
    // We loop over words_and_indices.
    for (i = 0; i < words_and_indices.length; i++) {
        // We check whether our word is an open parenthesis, a closed parenthesis, or neither.
        // We don't care about slashes here.
        if (words_and_indices[i]['word'] === '(') {
            // Our word is an open parenthesis.
            // We check whether depth is 0.
            if (depth === 0) {
                // depth is 0, so we're entering a new subordinate clause.
                // We push the open parenthesis and a new part
                // of the sentence to the list of parts.
                parts.push(words_and_indices[i]);
                parts.push([])
            } else {
                // depth is not 0, so we simply push our open parenthesis
                // to the last item of parts.
                parts[parts.length - 1].push(words_and_indices[i]);
            }
            // We increment depth.
            depth++
        } else if (words_and_indices[i]['word'] === ')') {
            // Our word is an close parenthesis.
            // If depth is 0, there is a problem (depth would become negative.).
            if (depth === 0) {
                throw new Error("You should not hastily end what you have started.");
            } else {
                // We check whether depth is 1.
                if (depth === 1) {
                    // depth is 0, so it will become 0, that is,
                    // we're exiting a subordinate clause.
                    // We push the close parenthesis and a new part
                    // of the sentence to the list of parts.
                    parts.push(words_and_indices[i]);
                    parts.push([]);
                } else {
                    // depth is not 1, so we simply push our close parenthesis
                    // to the last item of parts.
                    parts[parts.length - 1].push(words_and_indices[i]);
                }
                // We decrement depth.
                depth--
            }
        } else {
            // We push our word to the last item of parts.
            parts[parts.length - 1].push(words_and_indices[i]);
        }
    }
    // We should have closed everything by now.
    if (depth > 0) {
        throw new Error("You must end what you have started.");
    }
    // result is the subordinate clauses in our parts list when process_bracketed_text_subordination
    // has been applied to them via map.
    var result = step(parts, 2, 4).map(function (x) {
        return process_bracketed_text_coordination(sentence, x)});
    // main_result is the main clause, obtained by applying concat to its pieces
    // and using process_bracketed_text_single_clause on the result.
    var main_result =  process_bracketed_text_single_clause(
        sentence, Array.prototype.concat.apply([], step(parts, 0, 4)));
    // We loop over groups of coordinate subordinate clauses.
    for (i = 0; i < result.length; i++) {
        // The preceding open parenthesis is parts[4 * i + 1]. The following close parenthesis is
        // parts[4 * i + 3]. The group of coordinate subordinate clauses is result[i].
        // I'll refer to them later.
        // We put the preceding open parenthesis at the front of the first of the
        // coordinate subordinate clauses. Then we but the following close parenthesis at the end
        // of the last of them.
        result[i][0].indices.unshift(parts[4 * i + 1]['index']);
        result[i][result[i].length - 1].indices.push(parts[4 * i + 3]['index']);
        // We now associate the open and close parenthesis with the appropriate clauses.
        sentence.indices_to_clause_regions[parts[4 * i + 1]['index']] = result[i][0];
        sentence.indices_to_clause_regions[parts[4 * i + 3]['index']] = result[i][result[i].length - 1]
    }
    // We loop over groups of coordinate subordinate clauses.
    for (i = 0; i < result.length; i++) {
        // We loop over subordinate clauses.
        for (var j = 0; j < result[i].length; j++) {
            // We set the superordinate property of each subordinate clause
            // to main_result.clause.
            result[i][j].clause.set('superordinate', main_result.clause)
        }
    }
    // We set the subordinate property of the main clause to the lists
    // of its clause-children, all concatenated.
    main_result.clause.set('subordinate',  Array.prototype.concat.apply(
        [], result.map(function (x) {return x.map(function (y) {return y.clause})})));
    // We return our main clause.
    return main_result
}

function process_bracketed_text_single_clause(sentence, words_and_indices) {
    // We should have some words. Otherwise something is wrong.
    if (words_and_indices.length === 0) {
        throw new Error("You tried to create an empty clause. And I saw it, and it was not good.")
    }
    // We make a clause region from the given indices
    // (obtained by mapping words and indices to contain
    // the indices alone).
    var clause_region = sentence.get_or_make_region(
        words_and_indices.map(function (x) {return x['index']}));
    // We make a clause in our clause region.
    clause_region.make_clause('subordinate clause: unspecified');
    // We put into indices_to_clause_regions the information that every index
    // in words_and_indices is in our clause region.
    words_and_indices.forEach(function (x) {
        sentence.indices_to_clause_regions[x['index']] = clause_region
    });
    // We log the text of our clause region.
    console.log(words_and_indices.map(function (x) {return x['word']}).join(' '));
    // We return a list containing our clause region.
    return clause_region;
}

// This function processes bracketed text given the text. It returns a sentence object
// and has no side effects (other than logs).
function process_bracketed_text(words) {
    // If the first word (other than null) is not |, or if any other word is,
    // that's a problem.
    if (words[1] !== '|') {
        throw new Error("Sentences should begin with the start character ('|').");
    }
    if (words.slice(2).indexOf('|') !== -1) {
        throw new Error("Sentences should only use '|' at the start.");
    }
    // We create a sentence from the words.
    var sentence = new Sentence(words);
    // We do some logs for debugging purposes.
    console.log(JSON.stringify(sentence));
    console.log(JSON.stringify(sentence.words.join(' ')));
    // We declare sentence.indices_to_clause_regions as an empty dictionary.
    sentence.indices_to_clause_regions = {};
    // We declare words_and_indices as a dictionary containing the words and indices information.
    // slice is used to get rid of the first (null) entry.
    var words_and_indices = words.map(function (x, y) {return {'word': x, 'index': y}}).slice(1);
    // c is the result of process_bracketed_text_coordination.
    // It will be a list of the main clauses.
    var c = process_bracketed_text_coordination(sentence, words_and_indices);
    // We make all our main clauses main, and add a main clause tag to each of them.
    c.forEach(function (x) {
        x.make_clause("main clause");
        x.add_tag(new SingleRegionTag("main clause"))
    });
    // We return the sentence object.
    return sentence
}