var dash_hint_as_list0 = [
    "dash hint removal not needed for this level"
]

var dash_hint_as_list1 = [
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"
]


var dash_hint_as_list2 = [
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"
]


var dash_hint_as_list3 = [
    "1,2,3: i-ō → ō",
    "3i:    i-ō → iō",
    "4:     i-ō → iō",
    "____________",
    "1:     ā-ō → ō",
    "2:     ē-ō → eō",
    "____________",
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"
]


var dash_hint_as_list4 = [
    "3: ē-ō -> am (future I)",
    "3i: iē-ō -> iam (future I)",
    "4: iē-ō -> iam (future I)",
    "____________",
    "1,2,3: i-ō → ō",
    "3i:    i-ō → iō",
    "4:     i-ō → iō",
    "____________",
    "1:     ā-ō → ō",
    "2:     ē-ō → eō",
    "____________",
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"
]

//old version
var dash_hint_as_list = [
    "1,2,3: i-ō → ō",
    "3i:    i-ō → iō",
    "4:     i-ō → iō",
    "____________",
    "1:     ā-ō → ō",
    "2:     ē-ō → eō",
    "____________",
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"
]

var get_dash_hint_list2 = function (level) {
    if (level === 0) {
        return dash_hint_as_list0;
    } else if (level === 1) {
        return dash_hint_as_list1;
    } else if (level === 2) {
        return dash_hint_as_list2;
    } else if (level === 3) {
        return dash_hint_as_list3;
    }  else if (level === 4) {
        return dash_hint_as_list4;
    }
}







var dash_hint_map = {
    "1": "hello1",
    "2": "hello2",
    "3": "hello3"
}


var get_dash_hint_list_problematic = function (level) {
    // return dash_hint_map.level;
    return hack_dash_hint_list[level - 1];
}

var hack_dash_hint_list = [
    [
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"],
    [
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"],
    [
    "1,2,3: i-ō → ō",
    "3i:    i-ō → iō",
    "4:     i-ō → iō",
    "____________",
    "1:     ā-ō → ō",
    "2:     ē-ō → eō",
    "____________",
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"]
]
    

// todo research this problem:
// none of below seemed to work for mysterious reasons


var dash_hint_map_old = {
    1: ["1,2,3: i-nt → unt",
        "3i:    i-nt → iunt",
        "4:     i-nt → iunt"
    ],
    2: [
        "1-4:   i-ris → eris",
        "____________",
        "1,2,3: i-nt → unt",
        "3i:    i-nt → iunt",
        "4:     i-nt → iunt"
    ],
    3: [
        "1,2,3: i-ō → ō",
        "3i:    i-ō → iō",
        "4:     i-ō → iō",
        "____________",
        "1:     ā-ō → ō",
        "2:     ē-ō → eō",
        "____________",
        "1-4:   i-ris → eris",
        "____________",
        "1,2,3: i-nt → unt",
        "3i:    i-nt → iunt",
        "4:     i-nt → iunt"
    ]
}



var dash_hint_map_new = {
    1: dash_hint_1,
    2: dash_hint_2,
    3: dash_hint_3
}

var dash_hint_1 = [
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"]
    
var dash_hint_2 = [
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"]
    
var dash_hint_3 = [
    "1,2,3: i-ō → ō",
    "3i:    i-ō → iō",
    "4:     i-ō → iō",
    "____________",
    "1:     ā-ō → ō",
    "2:     ē-ō → eō",
    "____________",
    "1-4:   i-ris → eris",
    "____________",
    "1,2,3: i-nt → unt",
    "3i:    i-nt → iunt",
    "4:     i-nt → iunt"]





/// sanity check testing
// var dash_hint_map = {
//     1: ["hello"],
//     2: ["hello"],
//     3: ["hello"]
// }














//// RAW DATA BELOW

/*
Ō vs. M
Ō = present & future
M = past
____________
OR vs. R
OR = present & future
R = past
____________
i-ō → ō	
i-ō → ō	
i-ō → ō	
i-ō → iō	
i-ō → iō
____________
ā-ō → ō	
ē-ō → eō
____________
i-ris → eris	
i-ris → eris	
i-ris → eris	
i-ris → eris	
i-ris → eris
____________
i-nt → unt	
i-nt → unt	
i-nt → unt	
i-nt → iunt	
i-nt → iunt
*/