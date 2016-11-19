//compare_path returns a red_green_list
//a red_green_list is a list of 2-part lists
//first part gives item, second part gives str 'green' or 'red'
var compare_path = function (correct_path, answered_path) {
    // Assume no ambiguity (we don't care about it).
    //as: below is presumably a functionality that will become alive when we've made our ambiguity detector more sophisticated
    
    console.log("11-18 correct_path sent to compare_path", correct_path);
    console.log("11-18 answered_path sent to compare_path", answered_path);
    
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
    
    console.log("DEBUG 11-8 red_green_list");
    
    return {
        'correct': correct,
        'ambiguous': no_ambiguity,
        'red_green_list': red_green_list
    }
}



var compare_character_list = function (correct_character_list, answered_character_list) {
    var results_map = {};
    
    for (var i = 0; i < answered_character_list.length; i++) {
        if (answered_character_list[i] == correct_character_list[i]) {
            var character_to_push = answered_character_list[i];
            results_map[character_to_push] = "green";
        } else {
            var character_to_push = answered_character_list[i];
            results_map[character_to_push] = "red";
        }
    }
    console.log("SWAMP results_map = ", results_map);
    return results_map;
    
    //does below seem viable
    // var charsToSearch = answered_character_list;
    // var theChar = correct_character_list.charAt(i); /* Wherever str and i comes from */

    // if (charsToSearch.indexOf(theChar) != -1) {
        
    // }
}