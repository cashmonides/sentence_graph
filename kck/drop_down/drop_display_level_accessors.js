var drop_display_level = function (level) {
    return map_level_to_allowed(level, latin_drop_levels);
}

var drop_extra_level = function (level) {
    return map_level_to_allowed(level, latin_extra_levels);
}

var number_of_dummies_for = function (part_of_speech, level) {
    return drop_extra_level(level).drop_down_settings[
        part_of_speech].extra_options;
}

// It's annoying that this is how you do this, but it is.
var get_drop_non_drop_settings = function (level) {
    return drop_display_level(level).drop_non_drop_map;
}