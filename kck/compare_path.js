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



var compare_character_list_old = function (correct_character_list, answered_character_list) {
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
};

//i = index at which all elements will be red to the right, including that index
var turn_all_rightward_elements_red = function (character_list, index) {
    //pseudo-code
    // initialize a list of lists
    // [[character, color], [character, color], [character, color], ...]
    //iterate through character list
    // if before index, push character and green
    //if index and after, push character and red
    //end pseudo-code
    
    //we need a master list to push all our elements to  
    var master_list = [];
    for (var i = 0; i < character_list.length; i++) {
        //the character we are going to evaluate
        var char = character_list[i];
        var sub_list = [];
        sub_list.push(char);
        if (i < index) {
            sub_list.push("green")
        } else if (i >= index) {
            sub_list.push("red");
        } else {
            alert("Something terribly wrong with index");
        }
        //we should now have a character and a color in this form [character, color]
        // we push this sub-list to our master-list
        master_list.push(sub_list);
    };
    console.log("SWAMP master_list = ", master_list);
    console.log("SWAMP master_list.toString = ", master_list.toString());
    return master_list;
};


//this is the less sophisticated version of the spellchecker
// if a string is spelled correctly up to point i but a mistake is made at i
// then everything before i is green, i and after is red
var compare_character_list_rightward_red = function (correct_character_list, answered_character_list) {
    var results_list = [];
    
    for (var i = 0; i < answered_character_list.length; i++) {
        if (answered_character_list[i] == correct_character_list[i]) {
            var character_to_push = answered_character_list[i];
            // results_list[i] = character_to_push + "green";
            continue;
        } else {
            var character_to_push = answered_character_list[i];
            results_list[i] = character_to_push + "red";
            results_list = turn_all_rightward_elements_red(answered_character_list, i);
            return results_list;
        }
    }
    console.log("SWAMP results_list = ", results_list);
    return results_list;
    
    //does below seem viable
    // var charsToSearch = answered_character_list;
    // var theChar = correct_character_list.charAt(i); /* Wherever str and i comes from */

    // if (charsToSearch.indexOf(theChar) != -1) {
        
    // }
};