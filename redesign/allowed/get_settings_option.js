var get_option_with_settings = function (option, settings, dict) {
    if (Array.isArray(dict) || typeof dict === 'string' || typeof dict === 'boolean') {
        return dict;
    } else {
        if (!is_object(dict)) {
            throw 'dict, ' + JSON.stringify(dict) +
            ', is not an object!';
        }
        var recur = function (x) {
            return get_option_with_settings(option, settings, x);
        }
        for (var i in dict) {
            if (i[i.length - 1] === '?') {
                var key = i.slice(0, -1);
                if (!(key in settings)) {
                    throw 'Missing key ' + key + '!';
                }
                var key_on = read_bool_maybe_string(settings[key]);
                if (key_on) {
                    return recur(dict[i][0]);
                } else {
                    return recur(dict[i][1]);
                }
            } else if (i.split(/ *, */).indexOf(option) !== -1) {
                return recur(dict[i]);
            }
        }
        throw 'Nothing matched ' + option + ' in ' + JSON.stringify(dict);
    }
}

var bool_maybe_string_dict = {
    'false': false,
    'no': false,
    'off': false,
    'true': true,
    'yes': true,
    'on': true
}

// Read a boolean that may actually be a string.
var read_bool_maybe_string = function (s) {
    if (s in bool_maybe_string_dict) {
        return bool_maybe_string_dict[s];
    } else {
        throw 'Weird value for red herring: ' + red_herring;
    }
}

var filter_set_with_settings = function (option, settings, my_set) {
    var result = {};
    for (var i in my_set) {
        if (get_option_with_settings(option, settings, my_set[i])) {
            result[i] = true;
        }
    }
    return result;
}