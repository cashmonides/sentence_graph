var standard_time_format = {
    'hour': {
        'length': 3600,
        'digits': null
    },
    'minute': {
        'length': 60,
        'digits': 2
    },
    'second': {
        'length': 1,
        'digits': 2
    },
    'represent': '$hour:$minute:$second'
};

var time_units_by_length = function (format) {
    // Get all the keys representing time units
    // (all the keys but 'represent')
    var keys = Object.keys(format).filter(function (x) {
        return x !== 'represent';
    });
    return keys.sort(function (a, b) {
        return format[a].length - format[b].length;
    });
}

var pad_num = function (num, how_many_digits) {
    var length = num.toString().length;
    if (length >= how_many_digits) {
        return num.toString();
    } else {
        return new Array(how_many_digits - length + 1).join('0') + num.toString();
    }
}

var get_unit_representation_at_time = function (format, time, unit, next_unit) {
    var how_many_of_unit;
    if (!next_unit) {
        how_many_of_unit = Math.floor(
            time / format[unit].length);
    } else {
        how_many_of_unit = Math.floor(
            (time % format[next_unit].length) / format[unit].length);
    }
    var representation;
    if (format[unit].digits === null) {
        representation = how_many_of_unit;
    } else {
        representation = pad_num(how_many_of_unit, format[unit].digits);
    }
    return representation;
}

var represent_time_in = function (format, time) {
    var lengths = time_units_by_length(format);
    var represent_unit_value = {};
    for (var i = 0; i < lengths.length; i++) {
        var unit = lengths[i];
        var next_unit = lengths[i + 1];
        represent_unit_value[unit] = get_unit_representation_at_time(
            format, time, unit, next_unit);
    }
    return format.represent.replace(/\$[a-z]+/g, function (match) {
        return represent_unit_value[match.slice(1)];
    });
}