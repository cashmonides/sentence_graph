var option_list_to_json = function (
    option_list, priorities, order_at_bottom_level, sorts, leave_out) {
    if (priorities.length === 0 && order_at_bottom_level.length === 0) {
        // if (option_list.length > 1) {
        //     throw 'More than one option: ' + JSON.stringify(option_list);
        // }
        return option_list.map(function (x) {
            return x[0];
        });
    }
    var current_feature;
    var new_priorities;
    var new_order_at_bottom_level;
    if (priorities.length === 0) {
        current_feature = order_at_bottom_level[0];
        new_priorities = [];
        new_order_at_bottom_level = order_at_bottom_level.slice(1);
    } else {
        current_feature = priorities[0];
        new_priorities = priorities.slice(1);
        new_order_at_bottom_level = order_at_bottom_level;
    }
    var recursive_call = function (x) {
        return option_list_to_json(
            x, new_priorities, new_order_at_bottom_level, sorts, leave_out);
    }
    if (current_feature in leave_out) {
        return recursive_call(option_list);
    }
    var by_current_feature = by_feature(
        current_feature, option_list, recursive_call);
    if (Object.keys(by_current_feature).length === 1) {
        return values(by_current_feature)[0];
    }
    var sorting_function = sorts(current_feature);
    var key_value_pairs_in_order = list_of_pairs_from_dict(
        by_current_feature
    ).sort(function(x, y) {
        return sorting_function(x[0], y[0]);
    });
    if (priorities.length === 0) {
        return concat_map(key_value_pairs_in_order, function (x) {
            return x[1];
        });
    } else {
        return key_value_pairs_in_order;
    }
};

var by_feature = function (current_feature, option_list, recursive_call) {
    var by_current_feature = {};
    var option;
    var option_feature;
    for (var i = 0; i < option_list.length; i++) {
        option = option_list[i];
        if (!Array.isArray(option)) {
            throw 'option is not an array, it is ' + JSON.stringify(option);
        }
        option_feature = option[1][current_feature];
        if (!(option_feature in by_current_feature)) {
            by_current_feature[option_feature] = [];
        }
        by_current_feature[option_feature].push(option);
    }
    for (var i in by_current_feature) {
        by_current_feature[i] = recursive_call(by_current_feature[i]);
    }
    return by_current_feature;
}

var sort_functions_from_orders = function (orders, language) {
    var orders_as_dicts = {};
    for (var i in orders) {
        orders_as_dicts[i] = {};
        var order = orders[i];
        while (language in order) {
            order = order[language];
        }
        if (!Array.isArray(order)) {
            throw JSON.stringify(order) + ' is not an array, and '
            + language + ' is not in it!';
        }
        for (var j = 0; j < order.length; j++) {
            orders_as_dicts[i][order[j]] = j;
        }
    }
    return function (x) {
        if (x in orders_as_dicts) {
            return function (y, z) {
                return orders_as_dicts[x][y] - orders_as_dicts[x][z];
            }
        } else {
            return cmp;
        }
    }
}