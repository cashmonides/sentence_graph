// This function is called for its side effects and has no return value.
// It takes the tag_type corresponding to the button pressed as its parameter.
// It adds the appropriate tags to a collection of indices
// and has no other side effects.
var submit_tag = function (tag_type, sentence, indices, word_selector) {

    implied_tags(tag_type).forEach(function (x) {
        console.log('assuming ' + x + ' given ' + tag_type);
        submit_tag(x, sentence, indices, word_selector);
    });
    // tag will be a tag we want to add to a region.
    // region will be a region.
    // i will be a looping index.
    var tag;
    var region;
    var i;
    // We do some debugging logs.
    console.log("submit tag triggered here");
    console.log("TEST OF tag type", tag_type, indices.length, indices);
    // From now on, instead of using words_in_play, we use a sorted list
    // with the same elements. We call it indices, and log it for debugging.
    console.log(indices);
    // We check whether our tag type is delete or antecedent, for which special procedures must be
    // adopted. If not, we check whether it is a clause tag type.
    if (tag_type === 'delete') {
        // Our tag type is delete. We find the region we are deleting from.
        region = sentence.get_region(indices);
        // We check that the region is not null. If it is null, we do nothing.
        if (region !== null) {
            // We remove tags until there are none left.
            // (We specifically allow "subordinate clause: unspecified".)
            while (region.tags.some(function (x) {
                return x.get_tag_type() !== "unspecified clause"})) {
                // We find the tag type of our tag.
                var tag_checked = region.tags[0].get_tag_type();
                if (tag_checked === "antecedent") {
                    // We remove each antecedent (index) from the antecedents
                    // property of its relative clause.
                    region.indices.forEach(function (r) {
                        sentence.antecdents_to_relative_clause_regions[r].
                            clause.remove_from(tag_checked, r)});
                    // We remove the tag.
                    region.remove_tag(region.tags[0].get_tag_type())
                } else if (["subject", "object", "verb", "predicate"].
                        indexOf(tag_checked) !== -1) {
                    // We remove each element from its position in its clause.
                    region.indices.forEach(function (r) {
                        sentence.indices_to_clause_regions[r].clause.remove_from(tag_checked, r)});
                    // We remove the tag.
                    region.remove_tag(region.tags[0].get_tag_type())
                } else if (tag_checked.indexOf("clause") !== -1 &&
                    tag_checked !== "subordinate clause: unspecified") {
                    // We make our clause region unspecified.
                    // Note that we could probably get away with also cleaning up
                    // here, but there's no need, because it will be done
                    // later anyway.
                    submit_tag("unspecified clause", sentence, indices, word_selector)
                } else {
                    // We remove the tag.
                    region.remove_tag(region.tags[0].get_tag_type())
                }
            }
        }
    } else if (tag_type === "antecedent") {
        // The user will need to click on relative clauses.
        // So if there are none, that's a problem.
        if (sentence.regions_with("subordinate clause: relative").length === 0) {
            alert("There are no relative clauses yet. You must create " +
            "relative clauses before starting to tag antecedents.")
        } else {
            // t is the tags.
            var t = document.getElementById("tags");
            // We make the program select relative clause (6th tag when counting starts from 0).
            t.selectedIndex = 6;
            // We generate regions appropriately.
            generate_regions(sentence, "subordinate clause: relative");
            // e is the regions box.
            var e = document.getElementById("regions");
            // g is the relative clauses.
            var g = sentence.regions_with("subordinate clause: relative");
            // We put some helpful text in the info paragraph.
            document.getElementById("info").innerHTML =
                'Click on the relative clause for "' + sentence.words[indices[0]] +
                '", in the second-to-the-left box in the top row, labelled "regions".';
            // Clicking in the word selector should not go well.
            word_selector.click_working = false;
            // We create a function for clicking regions.
            e.onclick = function () {
                // We make d the index of the region clicked.
                var d = e.selectedIndex;
                // If the tags option is not relative clauses, then relative clauses are not showing up.
                // So we tell the user this, because the user needs to click
                // on relative clauses. If nothing is selected,
                // for example, if another part of the box is clicked, that's also a problem.
                if (t.options[t.selectedIndex].innerHTML !== "subordinate clause: relative") {
                    alert("Reset the regions area to show relative clauses.")
                } else if (d === -1) {
                    alert("Select a relative clause.")
                } else {
                    // We make a region from the first of the indices.
                    var region = sentence.get_or_make_region([indices[0]]);
                    // We add an antecedent tag to our new region.
                    region.add_tag(new SingleRegionTag("antecedent"));
                    // We make our word an antecedent of our clause.
                    g[d].clause.push_to("antecedent", sentence.get_region([indices[0]]));
                    // We log our clause's antecedents.
                    console.log('the antecedents are', g[d].clause['antecedent']());
                    sentence.antecdents_to_relative_clause_regions[indices[0]] = g[d];
                    // Push the first of the indices out.
                    indices.shift();
                    // Update the info for the new word.
                    document.getElementById("info").innerHTML =
                        'Click on the relative clause for "' + sentence.words[indices[0]] +
                        '", in the second-to-the-left box in the top row, labelled "regions".';
                    // If we're out of indices, we remove onclick and info, and restore
                    // the ability to click words in the box containing the sentence.
                    if (indices.length === 0) {
                        e.onclick = function () {};
                        document.getElementById("info").innerHTML = "";
                        word_selector.click_working = true;
                    }
                    // We display any new regions that may have formed in the all regions box.
                    display_all_regions(sentence)
                }
            }
        }
    } else if (tag_type.indexOf("clause") === -1) {
        // Our tag type is not a clause tag type.
        // We iterate over indices.
        for (i = 0; i < indices.length; i++) {
            // We create a tag of the appropriate type.
            tag = new SingleRegionTag(tag_type);
            // We create (or get) a region with just one word
            // (the one corresponding to indices[i]).
            console.log("MAKING REGION");
            region = sentence.get_or_make_region([indices[i]]);
            // We add our tag to our region.
            console.log("ADDING TAG ", tag_type);
            region.add_tag(tag);
            console.log("REGION + TAGS", JSON.stringify(region));
        }
    } else {
        // We do a debugging log.
        console.log('tag type = ' + tag_type);
        // Currently, use of this functionality to create new clauses
        // is not encouraged, although it's good for changing old clauses.
        // sentence.indices_to_clause_regions isn't reset, nor are the other clauses.
        // Subordination and coordination relationships are also not changed.
        // We create a tag of the appropriate type.
        tag = new SingleRegionTag(tag_type);
        // We get (or create) a region with the words tagged.
        region = sentence.get_or_make_region(indices);
        // We add our tag to our region.
        console.log("ADDING TAG ", tag_type);
        region.add_tag(tag);
        // We change the type of the clause of the region with the tagged words,
        // or make a new one.
        region.make_clause(tag_type);
        console.log("REGION + TAGS", JSON.stringify(region));
    }
    // We check whether our tag_type is something we want to tag the clause with.
    if (["subject", "object", "verb", "predicate"].indexOf(tag_type) !== -1) {
        // We loop over indices.
        for (i = 0; i < indices.length; i++) {
            // We create a clause variable, which is the clause of the
            // clause region of the word tagged.
            var clause = sentence.indices_to_clause_regions[indices[i]].clause;
            // We do some debugging logs.
            console.log("CLAUSE = ", JSON.stringify(clause));
            console.log(indices);
            // We do some defensive programming.
            // This checks whether the tag type is a property of the clause.
            // If not, there's a problem, because the clause
            // can't have that type of thing.
            if (tag_type in clause) {
                // Note that this assumes that subjects and such are single words.
                // Under that assumption, this checks whether the word
                // being tagged is already tagged as fulfilling
                // that role to the clause.
                if (clause[tag_type]().map(function (x) {
                        return x.indices[0]}).indexOf(indices[i]) === -1) {
                    // This line changes the tag_type property of the clause
                    // (not the one called "tag_type", but the one with the name of
                    // the string that tag_type is). In particular, it pushes indices[i]
                    // to (the return value of) the tag_type property.
                    clause.push_to(tag_type, sentence.get_region([indices[i]]))
                } else {
                    alert("You tried to tag the word '" + sentence.words[indices[i]] +
                    "' as a " + tag_type + ", but it already is.")
                }
            } else {
                alert("You tried to tag the word '" + sentence.words[indices[i]] +
                "' as a " + tag_type + ", but its clause can't have " + tag_type + "s.")
            }
            // We do some more debugging logs.
            console.log("CLAUSE = ", JSON.stringify(clause));
            // Note that here we call clause[tag_type] as a function,
            // which it is.
            console.log("CLAUSE[" + tag_type + "] = ", JSON.stringify(clause[tag_type]()));
        }
    }
};


// This function makes words_in_play empty, makes all words white,
// and does some logging. It has no return value
// and is called for its side effects.
var clean_up = function (sentence, word_selector) {
    console.log('cleaning up');
    var i;
    // We empty words_in_play.
    word_selector.words_in_play.clear();
    // We color our words (in this case, all white).
    word_selector.set_color_of_words();
    // We display our regions in the all regions box.
    display_all_regions(sentence);
    // We do some debugging logs.
    console.log("WORDS in play after clear", word_selector.words_in_play.size);
    // We loop over the regions of the sentence.
    for (i = 0; i < sentence.regions.length; i++) {
        console.log("sentence region = ", JSON.stringify(sentence.regions[i]));
    }
};

var submit_tag_and_clean_up = function (tag_type, sentence, word_selector) {
    // If there are no words in play, we stop execution by an early return.
    // (We don't want to create a wordless region.)
    if (word_selector.words_in_play.size === 0) {
        return null
    }
    var indices = convert_set_to_sorted_list(word_selector.words_in_play);
    // We still have to pass word_selector in to submit_tag to
    // turn its clicking properties on and off.
    submit_tag(tag_type, sentence, indices, word_selector);
    clean_up(sentence, word_selector);
};