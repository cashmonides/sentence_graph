// This file contains functions for the game that are somewhat general.

var get_current_module = function (level) {
    return map_level_to_allowed(level, kck_levels);
}