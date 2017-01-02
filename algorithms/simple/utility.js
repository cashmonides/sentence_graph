var maximise_utility = function (list_of_lists_of_choices) {
    // A map with all values as true and all chosen choices as keys.
    // Basically a way of simulating a set.
    var chosen = {};
    // The results of what has been chosen.
    var results = [];
    for (var i = 0; i < list_of_lists_of_choices.length; i++) {
        // The first item in the user's list of choices that hasn't already been chosen.
        var new_choice = first_satisfying(list_of_lists_of_choices[i], function (x) {
            return !(x in chosen);
        });
        chosen[new_choice] = true;
        results.push(new_choice);
    }
    return results;
}
