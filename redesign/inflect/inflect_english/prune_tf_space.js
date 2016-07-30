var prune_tf_space = function (tf_space, allowed, conjunction, direction) {
    // Find the allowed conjunctions.
    var conjunction_list = get_conjunction_list(
        allowed, conjunction, direction);
    // Get a check function.
    var check = check_function_from_allowed(allowed, conjunction_list);
    // Prune.
    var pruned = abstract_prune(tf_space_operators, tf_space, check);
    // Remove duplicates.
    return remove_duplicates(pruned);
}

var get_conjunction_prop = function (conj_and_dir, prop_name) {
    return conj_and_dir.conjunction[
        'k_' + conj_and_dir.direction + '_' + prop_name];
}

var conjunctions_in_both_directions = function (conjunctions) {
    return [].concat.apply(
        [], conjunctions.map(function (x) {
            return [
                [{'conjunction': x, 'direction': 'left'}],
                [{'conjunction': x, 'direction': 'right'}]
            ]
        })
    );
}

var get_conjunction_list = function (allowed, conjunction, direction) {
    // Yes, 'false'. (But we also allow false in case someone makes a mistake.)
    if (allowed['red herring'] === 'false'
    || allowed['red herring'] === false) {
        // A single conjunction.
        return [{'conjunction': conjunction, 'direction': direction}];
    } else if (allowed.conjunctions === 'all_conjunctions') {
        return conjunctions_in_both_directions(values(conjunction_library));
    } else {
        return conjunctions_in_both_directions(
            allowed.conjunctions.map(function (x) {
                return conjunction_library[x];
            })
        );
    }
}

var check_function_from_allowed = function (allowed, conjunction_list) {
    // The things we return true for.
    var hash_yes = {};
    var i;
    var item;
    // Add a conjunction property, checking if it's null.
    var add = function (x, prop, dependent) {
        var prop_value = get_conjunction_prop(x, prop);
        if (dependent === 'dependent') {
            prop_value = prop_value[default_language];
        }
        if (prop_value) {
            hash_yes[prop_value] = true;
        }
    }
    for (i in allowed) {
        item = allowed[i];
        if (Array.isArray(item) && i !== 'conjunction') {
            // Loop over the items of this list, adding each one.
            for (var j = 0; j < item.length; j++) {
                hash_yes[item[j]] = true;
            }
        }
    }
    for (i = 0; i < conjunction_list.length; i++) {
        // Item is a conjunction.
        item = conjunction_list[i];
        // Add the language-dependent mood restriction.
        add(item, 'mood_restriction', 'dependent');
        // Add the language-independent construction.
        add(item, 'construction', 'independent');
        // The type is special. We can use it to get
        // "subordinate" and "conditional".
        var type = item.conjunction.type;
        if (item.direction + ' ' + type in type_inferences) {
            hash_yes[type_inferences[item.direction + ' ' + type]] = true;
        }
    }
    return function (x) {
        return x in hash_yes;
    }
}

var type_inferences = {
    'subordinating right': 'subordinate',
    // Annoying but true.
    // A protasis is subordinate.
    // Anything else would be unexpected.
    'subordinating conditional right': 'subordinate',
    'subordinating conditional left': 'conditional',
    'subordinating conditional right': 'conditional'
}

var abstract_prune = function (operators, space, check) {
    var results = [];
    for (var i in space) {
        if (Array.isArray(space[i])) {
            if (space[i].every(check)) {
                results.push([i]);
            }
        } else if (parse_expr(operators, check, i)) {
            results.push(abstract_prune(operators, space[i], check))
        }
    }
    return [].concat.apply([], results);
}

var tf_space_operators = [
    {
        re: / *&! */g,
        f: function (x, y) {
            return function (z) {
                return x(z) && !(y(z));
            }
        }
    },
    {
        re: / *\|\| */g,
        f: function (x, y) {
            return function (z) {
                return x(z) || y(z);
            }
        }  
    },
    {
        re: / *&& */g,
        f: function (x, y) {
            return function (z) {
                return x(z) && y(z);
            }
        }
    }
];

var parse_expr = function (operators, each_term, expr) {
    if (operators.length === 0) {
        return each_term(expr);
    } else {
        return expr.split(operators[0].re).map(function (x) {
            return parse_expr(operators.slice(1), each_term, x);
        }).reduce(operators[0].f);
    }
}