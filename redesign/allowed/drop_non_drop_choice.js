var max_choosing_dropdown_attempts = 4200;

// Tries to be logical.
var choose_drops_and_non_drops = function (list_of_role_strings) {
    var drop_non_drop_settings = get_drop_non_drop_settings();
    var min = drop_non_drop_settings.min;
    var max = drop_non_drop_settings.max;
    var len = list_of_role_strings.length;
    if (len === 0) {
        throw 'No roles at all!';
    }
    if (min === undefined || min < 1) {
        min = 1;
    }
    if (max === undefined || max > len) {
        max = len;
    }
    // If someone does this, we throw an error.
    if (min > max) {
        throw 'Very serious error! min > max';
    }
    var choices;
    var number_of_attempts = 0;
    while (number_of_attempts < max_choosing_dropdown_attempts) {
        var attempt = choose_drops_and_non_drops_one_attempt(
            list_of_role_strings, drop_non_drop_settings);
        if (drops_and_non_drops_works(attempt, min, max)) {
            return attempt;
        }
        number_of_attempts++;
    }
    return choose_drops_and_non_drops_last_resort(
        list_of_role_strings, len, drop_non_drop_settings, min, max);
}

// It's annoying that this is how you do this, but it is.
var get_drop_non_drop_settings = function () {
    return drop_display_levels[
        get_current_module().drop_display_level].drop_non_drop_map;
}

var get_chance = function (role, drop_non_drop_settings) {
    var result = drop_non_drop_settings[role + '_drop'];
    if (result === undefined) {
        // Try not to ask about things that aren't mentioned.
        result = 0;
    }
    return result;
}

var single_drop_or_non_drop = function (role, drop_non_drop_settings) {
    var drop = get_chance(role, drop_non_drop_settings) > Math.random();
    if (drop) {
        return 'drop';
    } else {
        return 'non_drop';
    }
}

var choose_drops_and_non_drops_one_attempt = function (
    list_of_role_strings, drop_non_drop_settings) {
    return list_of_role_strings.map(function (role) {
        return single_drop_or_non_drop(role, drop_non_drop_settings);
    });
}

var drops_and_non_drops_works = function (attempt, min, max) {
    var drops = count_occurances(attempt, 'drop');
    return min <= drops && drops <= max;
}

// Completely disregards min and max (other than being bounded by them).
// Just does stuff in probabilistic order.
// Is O(n log(n)).
var choose_drops_and_non_drops_last_resort = function (
    list_of_role_strings, len, drop_non_drop_settings, min, max) {
    var number_of_drop_downs = random_from_inclusive_range(min, max);
    var drops = repeat('non_drop', len);
    // We're using i to loop over multiple things, but we're doing
    // it at different times.
    var i;
    var hash = {};
    var role;
    var chance;
    for (i = 0; i < len; i++) {
        role = list_of_role_strings[i];
        chance = get_chance(role, drop_non_drop_settings);
        if (chance in hash) {
            hash[chance].push(i);
        } else {
            hash[chance] = [i];
        }
    }
    // Most to least likely.
    var order_to_add_drops_for_roles_in = Object.keys(hash).sort(
        function (x, y) {return -cmp(hash[x], hash[y])}
    );
    var indices;
    var j;
    var k = 0;
    for (i = 0; i < order_to_add_drops_for_roles_in.length; i++) {
        role = order_to_add_drops_for_roles_in[i];
        indices = hash[role];
        if (k + indices.length <= number_of_drop_downs) {
            for (j = 0; j < indices.length; j++) {
                drops[indices[j]] = 'drop';
            }
            k += indices.length;
        } else {
            shuffle(indices);
            // number_of_drop_downs is the number needed.
            // k is the number already here.
            // So what remains is the difference.
            // Specifically, since number_of_drop_downs >= k,
            // we subtract k from number_of_drop_downs.
            var remainding_drops = number_of_drop_downs - k;
            if (remainding_drops < 0) {
                throw 'Program creator made a mistake!';
            }
            for (j = 0; j < remainding_drops; j++) {
                drops[indices[j]] = 'drop';
            }
            break;
        }
    }
    return drops;
}