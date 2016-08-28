var compare_path = function (correct_path, answered_path) {
    var correct_path_set = set_from(correct_path);
    var correct = true;
    var red_green_list = [];
    var item;
    for (var i = 0; i < answered_path.length; i++) {
        item = answered_path[i];
        if (item in correct_path_set) {
            red_green_list.push([item, 'green']);
        } else {
            red_green_list.push([item, 'red']);
            correct = false;
        }
    }
    return {
        'correct': correct,
        'red_green_list': red_green_list
    }
}