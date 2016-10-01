// This is some stuff that was rushed out in a hurry
// and could be much better commented.


//AS: this perhaps belongs in utils??
// Returns a list of matches.
var match_dicts = function (dict_being_matched, matching_dict) {
    if (!is_object(matching_dict)) {
        throw matching_dict + ' is not an object!';
    }
    if (typeof dict_being_matched === 'string') {
        if (!(dict_being_matched in matching_dict)) {
           // Return an empty list since there is no match here:
           // the string is not one of the possibilities accounted for.
           // Example: {intransitive: ...} has no transitive option
           // because it has nothing to say about transitives.
           return [];
        } else {
            return [matching_dict[dict_being_matched]];
        }
    }
    if (!is_object(dict_being_matched)) {
        throw dict_being_matched + ' is not an object!';
    }
    return concat_map(Object.keys(matching_dict), function (key) {
        if (!(key in dict_being_matched)) {
            throw key + ' is not in ' + JSON.stringify(dict_being_matched);
        }
        return match_dicts(dict_being_matched[key], matching_dict[key]);
    });
}


//AS notes begin:
//below seems to be an example of a single constraint
// in shorthand, it would be "intransitive" requires "active voice"
// this might be something that belongs in a data file, alterable by teachers
//AS notes end
// transitivity is in core_properties.
var lexeme_constraints = {
    'core_properties': {
        'transitivity': {
            'intransitive': {
                // Remember to wrap it in a list.
                'voice': ['active']
            }
        }
    }
}

// Match with the lexeme constraints, then join the list of resulting
// dictionaries of constraints.
var get_constraints_from_lexeme = function (lexeme) {
    return join_disjoint_dicts(match_dicts(lexeme, lexeme_constraints));
}

// Filter allowed based on what a lexeme allows.
var filter_allowed_with_lexeme = function (allowed, lexeme) {
    var constraints = get_constraints_from_lexeme(lexeme);
    return filter_allowed_with_constraints(allowed, constraints);
}

// This method combines allowed with some constraints.
// It takes each key in allowed and checks if it is in constraints.
// If so, it just uses the corresponding value.
// If not, it only uses the items in the corresponding value
// allowed by the constraint, i.e., it the list that should be
// the value in constraints.
// Example:
// value in constraints: {voice: ['active']}
// everything but voice goes through
// every voice is filtered by whether it's active
var filter_allowed_with_constraints = function (allowed, other_constraints) {
    var result = {};
    for (var i in allowed) {
        if (i in other_constraints) {
            // This is a set from the value constraints[i], which is a list.
            // This is probably bad when you take into account
            // the small size of this set.
            // But it shouldn't matter because it's not nested that deeply,
            // so I'm keeping it.
            var constraints_set = set_from(other_constraints[i],
            '$, which seems like it should be some type of list ' +
            'of constraints, is not.');
            result[i] = allowed[i].filter(function (x) {
                return x in constraints_set;
            });
        } else {
            result[i] = allowed[i];
        }
    }
    // Almost forgot this.
    // But of course we need it since we're not mutating.
    return result;
}