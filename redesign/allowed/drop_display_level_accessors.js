var drop_display_level = function () {
    return drop_display_levels[get_current_module().drop_display_level];
}

var number_of_dummies_for = function (part_of_speech) {
    return drop_display_level().drop_down_settings[
        part_of_speech].extra_options;
}

// It's annoying that this is how you do this, but it is.
var get_drop_non_drop_settings = function () {
    return drop_display_level().drop_non_drop_map;
}