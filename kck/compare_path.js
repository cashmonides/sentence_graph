//compare_path returns a red_green_list
//a red_green_list is a list of 2-part lists
//first part gives item, second part gives str 'green' or 'red'
var compare_path = function (correct_path, answered_path) {
    // Assume no ambiguity (we don't care about it).
    //as: below is presumably a functionality that will become alive when we've made our ambiguity detector more sophisticated
    var no_ambiguity = false;
    var same_last_answer = false;
    //set_from creates a set from the first argument, the second argument is an optional error message
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