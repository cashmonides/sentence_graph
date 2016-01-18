var closest = function (list, value) {
    var min_less = math_min(list.map(function (x) {return value - x}).filter(function (x) {return x >= 0}));
    var min_more = math_min(list.map(function (x) {return x - value}).filter(function (x) {return x >= 0}));
    if (min_less < min_more) {return value - min_less} else {return value + min_more}
};

var get_level_from = function (level, sub_module, score, score_per_sub_module, sub_modules) {
    if (typeof level === 'number') {
        return level
    } else {
        var min_level = level[0];
        var max_level = level[1];
        return min_level + (max_level - min_level) * (score_per_sub_module * sub_module + score) /
            (score_per_sub_module * sub_modules)
    }
};

var range_sampler = function (module_id, types_of_level) {
    var d = {};
    for (var i = 0; i < types_of_level.length; i++) {
        d[types_of_level[i]] = Math.round(get_level_from(
            ALL_MODULES[module_id][types_of_level[i]],
            quiz.user.data.history[module_id].progress, quiz.submodule.score,
            ALL_MODULES[module_id].submodule.threshold,
            ALL_MODULES[module_id].threshold))
    }
    return d
};

// How to get various things:
// d = level_to_allowed2
// min_level = ALL_MODUlES[module_id].level[0]
// max_level = ALL_MODUlES[module_id].level[1]
// sub_module = quiz.user.get_module(mod).progress;
// score = quiz.submodule.score
// score_per_sub_module = ALL_MODUlES[module_id].submodules.threshold
// sub_modules = ALL_MODUlES[module_id].threshold


//alert(range_sampler(5, 10, 2, 3, 6, 5, {1: 'novice', 3: 'intermediate', 5: 'professional', 7: 'master',
//    10: 'champion'}));