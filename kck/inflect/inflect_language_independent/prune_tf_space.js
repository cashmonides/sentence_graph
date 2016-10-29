var check_properties_from_allowed = [
    'time', 'universal_indicative_tenses_allowed', 'sequence', 'voice'
];

// Note that this function knows nothing about the lexeme.
// tags: @prune, @tagged, @long, @confusing, @hardtofind, @tfspace
var prune_tf_space = function (
    language, tf_space, allowed, conjunction, direction, regime, kck_level,
    allowed_conjunctions_override) {
    // My philosophy: any error that was not completely stupid is likely
    // to be made more than once.
    // Thus, due to a case of misordered parameters, we check that the
    // conjunction is a conjunction object.
    if (!(conjunction instanceof Conjunction)) {
        throw JSON.stringify(conjunction) + ' is not a conjunction!';
    }
    
    // Similarly, we check if the direction is left or right.
    if (direction !== 'left' && direction !== 'right') {
        throw direction + ' is not a direction!';
    }
    
    // Get the value of the red herring switch as a boolean.
    var red_herring_bool = read_bool_maybe_string(allowed['red herring']);
    // Find all the allowed conjunctions.
    var all_conjunction_direction_combos =
    get_all_conjunction_direction_combos(allowed, allowed_conjunctions_override);
    // If red herrings are on, we include all the conjunction-direction combos.
    // Otherwise, only the one used.
    var conjunction_direction_combos;
    if (red_herring_bool) {
        conjunction_direction_combos = all_conjunction_direction_combos;
    } else {
        conjunction_direction_combos = [
            new ConjunctionDirectionCombo(conjunction, direction)];
    }
    var verb_regimes_in_grouping = get_allowable_verb_regime_set(
        language, regime, allowed);
    var verb_regimes = Object.keys(tf_space);
    var allowed_verb_regimes = verb_regimes.filter(function (verb_regime) {
        var parts = verb_regime.split('.');
        var thing_tested = parts[0];
        if (thing_tested !== 'regime') {
            throw 'Not testing regime at the top level; testing ' +
            thing_tested + ' instead.';
        }
        var verb_regime = parts[1];
        return conjunction_direction_combos.some(function (x) {
            return x.has_verb_regime(verb_regime, language);
        }) && (verb_regimes_in_grouping === 'all'
        || verb_regimes_in_grouping.indexOf(verb_regime) !== -1);
    });
    
    if (allowed_verb_regimes.length === 0) {
        throw 'No allowed verb regimes!';
    }
    
    var constructions = remove_duplicates(
        all_conjunction_direction_combos.map(function (x) {
            return x.construction;
        })
    );
    
    var terminology_display_level = get_current_module(kck_level).
    terminology_display_dictionary;
    
    var check = check_function_from_allowed([
        {
            'get_props_from': allowed,
            'props_to_get': check_properties_from_allowed
        },
        {
            'get_props_from': {'construction': constructions},
            'props_to_get': ['construction']
        },
        {
            'get_props_from': {'tf_level': [terminology_display_level]},
            'props_to_get': ['tf_level']
        }
    ]);
    
    var pruned = concat_map(allowed_verb_regimes, function (x) {
        // Iterate over the relevant values of the translation formula space.
        return abstract_prune(tf_space_operators, tf_space[x], check).map(function (y) {
            y.regime = x.split('.')[1];
            return y;
        });
    });
    
    // Remove duplicates.
    return remove_duplicates(pruned, function (x) {return x.regime + '/' + x.text});
}

var get_allowable_verb_regime_set = function (language, regime, allowed) {
    var regimes_in_language = translation_formula_compatibility_dictionary[
        language];
    return get_option_with_settings(regime, allowed, regimes_in_language);
}

var get_all_conjunction_direction_combos = function (
    allowed, allowed_conjunctions_override) {
    var conjunctions;
    if (allowed_conjunctions_override === null) {
        conjunctions = allowed.allowed_conjunctions;
    } else {
        conjunctions = allowed_conjunctions_override;
    }
    if (conjunctions === null || conjunctions === undefined) {
        throw 'Bad conjunctions (null or undefined)!'
    }
    if (conjunctions === 'all_conjunctions') {
        conjunctions = Object.keys(conjunction_library);
    }
    return concat_map(conjunctions, function (conj) {
        var conj_object = new Conjunction(conj);
        if (conj_object.is_null_conjunction()) {
            return [
                new ConjunctionDirectionCombo(conj_object, 'left')
            ];
        } else {
            return [
                new ConjunctionDirectionCombo(conj_object, 'left'),
                new ConjunctionDirectionCombo(conj_object, 'right')
            ];
        }
    });
}

var ConjunctionDirectionCombo = function (conjunction, direction) {
    // Note that the conjunction is a conjunction object.
    this.conjunction = conjunction;
    this.direction = direction;
    // Add verb regime (using the general get_property method).
    this.verb_regime = conjunction.get_property(
        'k_' + direction + '_verb_regime');
    if (!this.verb_regime) {
        throw 'No ' + direction + ' verb regime for ' + conjunction.get_name();
    }
    // Add construction (using the special get_construction method).
    this.construction = conjunction.get_construction(direction);
}

ConjunctionDirectionCombo.prototype.has_verb_regime = function (x, language) {
    return this.verb_regime[language] === x;
}

var check_function_from_allowed = function (list_of_allowed_sources) {
    // The categories are keys. Each value is a set of things
    // we return true for within that category.
    var hash_yes = {};
    for (var i = 0; i < list_of_allowed_sources.length; i++) {
        var item = list_of_allowed_sources[i];
        var what_to_get_props_from = item.get_props_from;
        var props_to_get = item.props_to_get;
        for (var j = 0; j < props_to_get.length; j++) {
            var prop = props_to_get[j];
            if (!(prop in what_to_get_props_from)) {
                throw JSON.stringify(what_to_get_props_from) +
                ' is missing ' + prop + '!';
            } else if (prop in hash_yes) {
                throw JSON.stringify(hash_yes) + ' already has ' +
                prop + '! This entry should not be overwriten!';
            }
            hash_yes[prop] = set_from(what_to_get_props_from[prop],
            'Error getting allowed! Probably bad data!');
            // We remove null.
            // Questions:
            // Is it OK to use null instead of 'null' here? Yes,
            // keys are converted to string.
            // What if we didn't add null? delete works anyway.
            delete hash_yes[prop][null];
        }
    }
    return function (x) {
        var parts = x.split('.');
        if (parts.length !== 2) {
            throw 'Bad thing being checked: ' + x;
        }
        var category = parts[0];
        if (!(category in hash_yes)) {
            throw 'Bad category: ' + category + '. This is the category of '
            + x;
        }
        // Examples: present, imperfect.
        var value_for_category = parts[1];
        return value_for_category in hash_yes[category];
    }
}

var abstract_prune = function (operators, space, check) {
    if (typeof space === 'string') {
        // Have choices and text.
        return [{'choices': [], 'text': space}];
    }
    var results = [];
    for (var i in space) {
        if (Array.isArray(space[i])) {
            if (space[i].every(function (x) {
                // Parse the conditions in values that are lists,
                // to handle
                // 'verb no -s' : ['sequence.primary || sequence.secondary']
                return parse_expr(operators, check, x);
            })) {
                // Again, include choices in the entry we're pushing.
                results.push({'choices': [], 'text': i});
            }
        } else if (parse_expr(operators, check, i)) {
            results.push(abstract_prune(
                operators, space[i], check
            ).map(function (x) {
                // Add i to the front.
                // I'm not fanatical about performance here,
                // so I don't really care about this being O(n),
                // especially since n <= 2 right now.
                x.choices.unshift(i);
                return x;
            }));
        }
    }
    return concat_all(results);
}

var tf_space_operators = [
    {
        re: / *[=\-]> */g,
        f: function (x, y) {
            return !x || y;
        }
    },
    {
        re: / *&! */g,
        f: function (x, y) {
            return x && !y;
        }
    },
    {
        re: / *\|\| */g,
        f: function (x, y) {
            return x || y;
        }  
    },
    {
        re: / *&& */g,
        f: function (x, y) {
            return x && y;
        }
    }
];

var parse_expr = function (operators, each_term, expr) {
    if (operators.length === 0) {
        return each_term(expr);
    } else {
        if (typeof expr !== 'string') {
            throw 'Weird expression: ' + expr + '!';
        }
        return expr.split(operators[0].re).map(function (x) {
            return parse_expr(operators.slice(1), each_term, x);
        }).reduce(operators[0].f);
    }
}