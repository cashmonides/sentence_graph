function get_leaderboard123 () {
    console.log("get leaderboard123 called");
    // if (email_filter) {
    //     email_termination_to_include = email_filter;  
    // };
    Persist.get(["users"], callback4);
};




function callback4(data) {
    console.log("callback4 triggered");
    var users = data.val();
    
    // Create a sick and non-sick users dictionary.
    var sick_users = {};
    var old_users = {};
    var old_users2 = {};
    var non_sick_users = {};
    
    
    
    var spelling_rankings_list = [];
    var sorted_spelling_rankings_list = [];
    
    // For each key (a uid) in users...
    for (var uid in users) {
        // Get the user that is the corresponding value.
        var user = users[uid];
        var sick = detect_sick_user(user, uid);
        var old = detect_old_user(user, uid, email_termination_to_include);
        // If the user is sick...
        if (sick) {
            // Add the user to the sick users.
            sick_users[uid] = {'user': user, 'why_sick': sick};
        } else if (old) {
            // add the user to the old users
            old_users[uid] = {'user': user, 'why_old': old};
        } else {
            // Otherwise add the user to the non-sick users dictionary
            // (with the key of uid).
            non_sick_users[uid] = user;
        }
    }
    
    // this will be a div where we keep all the scored 
    var e = el("spelling_bee_leaderboard");
    // make({tag:"tr", children: [{tag: "td"}]}, e);
    
    for (var uid in non_sick_users) {
        
        
        
        console.log("entering for loop in get leaderboard");
        
        var user = non_sick_users[uid];
        
        
        
        
        
        if (!user.spelling_level) {
            continue;
        }
        // filtering out to include only high spelling scores
        if (user.spelling_level < min_spelling_level_to_include) {
            continue;
        }
        
        
        // todo
        // short term spelling level display
        var user_name = user.profile.name;
        var avatar = user.profile.avatar;
        var spelling_score = user.spelling_level;
        var tuple = [];
        tuple.push(spelling_score);
        tuple.push(user_name);
        tuple.push(avatar);
        tuple.push("grade: " + user.profile.grade);
        tuple.push('$');
        
        spelling_rankings_list.push(tuple);
        // console.log("SPELLING_RANKINGS_LIST = ", spelling_rankings_list);
        // console.log("SPELLING_RANKINGS_LIST stringified = ", JSON.stringify(spelling_rankings_list));
        
        
        // sorted_spelling_rankings_list = spelling_rankings_list.sort(compare_by_first_element());
        var sorted_spelling_rankings_list = spelling_rankings_list.sort(function(a,b){return b[0] - a[0]});
        
        
        
        var final_output = sort_and_display_match_results_presorted(sorted_spelling_rankings_list, 0);
        console.log("FINAL OUTPUT = ", final_output);
    
        // to sort in sublime text: replace $ with \n
        // then enable regex and replace \\n with \n
    }
    e.innerHTML = final_output;
}