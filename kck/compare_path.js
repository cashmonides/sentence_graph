var compare_path = function (correct_path, answered_path) {
    // Assume no ambiguity (we don't care about it).
    var no_ambiguity = false;
    var same_last_answer = false;
    var correct_path_set = set_from(correct_path,
    'The correct path, $, is somehow weird.');
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
        'ambiguous': no_ambiguity,
        'red_green_list': red_green_list
    }
}