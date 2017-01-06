// Some simple pre-processing of the data (which I can and will write)
// will be needed to apply this function.

// This applies only to the original use case. If there are more, different,
// uses in the future, this comment is not that helpful.
// Given the current data format, the first thing is to create a sorted list
// of values without test users, where the lower grades are first in the list.
// Then make a list of lists, just getting the choices from each value.
// Then apply this function.
// Then zip with the usernames and we're done.

var maximise_utility_1 = function (list_of_lists_of_choices) {
    // A map with all values as true and all chosen choices as keys.
    // Basically a way of simulating a set.
    var chosen = {};
    // The results of what has been chosen.
    var results = [];
    // The (added) list of rankings people get.
    var rankings = [];
    // This is basically a for-loop over the users. There doesn't seem to be
    // any really elegant functional way to do this: it almost seems like a
    // utility function.
    for (var i = 0; i < list_of_lists_of_choices.length; i++) {
        // The first item in the user's list of choices that hasn't already been chosen.
        // Note: even if their first choice was no one else's first choice,
        // it might have been someone else's second choice and thus already been chosen.
        var new_choice = first_satisfying(list_of_lists_of_choices[i], function (x) {
            // Has x (the choice) not yet been chosen?
            // Also some defenciveness so we don't choose undefined somehow.
            return !(x in chosen) && typeof x === 'string';
        });
        // Add the choice to the chosen choices.
        chosen[new_choice] = true;
        // Add the choice to the results.
        results.push(new_choice);
        // Simplest solution, and doesn't increase time complexity, so why not?
        rankings.push(list_of_lists_of_choices[i].indexOf(new_choice));
    }
    // Return the results (just as a list).
    // Also return the rankings so we can see how well we did.
    return [results, rankings];
}

var maximise_utility_2 = function (list_of_lists_of_choices) {
    var how_many_users = list_of_lists_of_choices.length;
    // Largest number of choices for any user.
    var max_user_choices = math_max(list_of_lists_of_choices.map(function (x) {
        return x.length;
    }));
    // A map with all values as true and all chosen choices as keys.
    // Basically a way of simulating a set.
    var chosen = {};
    // The results of what has been chosen.
    var results = list_of_repetitions(null, how_many_users);
    // The (added) list of rankings people get.
    var rankings = list_of_repetitions(-1, how_many_users);
    var j = 0;
    for (var j = 0; j < max_user_choices; j++) {
        for (var i = 0; i < list_of_lists_of_choices.length; i++) {
            // The first item in the user's list of choices that hasn't already been chosen.
            // Note: even if their first choice was no one else's first choice,
            // it might have been someone else's second choice and thus already been chosen.
            var new_choice = list_of_lists_of_choices[i][j];
            if (!(new_choice in chosen) &&
            typeof new_choice === 'string' &&
            results[i] === null) {
                // Add the choice to the chosen choices.
                chosen[new_choice] = true;
                // Add the choice to the results.
                results[i] = new_choice;
                rankings[i] = j;
            }
        }
    }
    // Return the results (just as a list).
    // Also return the rankings so we can see how well we did.
    return [results, rankings];
}
