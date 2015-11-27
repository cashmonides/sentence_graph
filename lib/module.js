
//i create a dictionary and I map an id I pick to an object which contains the id itself
//modes 0 = drop 1 = mcmode 2 = quick 3 = genericdrop


var ALL_MODULES = {

    "0": {
        id: 0,
        level: 1,
        next: 1
    },
    "1": {
        id: 1,
        icon_name: "wolf",
        icon_url: "../resources/Wolf.png",
        threshold: 2,
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        modes_allowed: [1],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'
                 ],
        cheat_sheet: "../resources/cheat_sheet_0.jpg",
        level: [1, 2],
        next: 2
    },

    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 5,
        modes_allowed: [1],
        // modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry', 'fear', 'see', 'scare'
                 ],
        cheat_sheet: "../resources/cheat_sheet_1.jpg",
        level: [1, 3],
        next: 3
    },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 6,
        modes_allowed: [1],
        // modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 
                 'kangaroo', 'chicken', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak'
                 ],
        cheat_sheet: "../resources/cheat_sheet_2.jpg",
        level: [1, 3],    
        next: 4
    },
    "4": {
        id: 4,
        icon_name: "cow",
        icon_url:"../resources/cow.jpg",
        threshold: 7,
        modes_allowed: [1],
        // modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog','eagle', 
                 'kangaroo', 'snail', 'chicken','spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'hear', 'find'
                 ],
        cheat_sheet: "../resources/cheat_sheet_3.jpg",
        level: [2,4],
        next: 5
    },
    "5": {
        id: 5,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 8,
        // modes_allowed: [0, 1],
        modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken','spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find'
                 ],
        cheat_sheet: "../resources/cheat_sheet_4.jpg",
        level: [3, 5],
        next: 6
    },
    "6": {
        id: 6,
        icon_name: "lion",
        icon_url:"../resources/lion.jpg",
        threshold: 9,
        modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0, 1],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'fly', 'scorpion', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall'
                 ],
        cheat_sheet: "../resources/cheat_h.jpg",
        level: [3, 6],
        next: 7
    },
    "7": {
        id: 7,
        icon_name: "dog",
        icon_url:"../resources/dog.png",
        threshold: 12,
        modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0, 1],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'millipede', 
                 'octopus', 'fly', 'scorpion', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall', 'flee', 'sleep'
                 ],
        cheat_sheet: "../resources/cheat_h.jpg",
        level: [3, 7],
        next: null
    }
};


// List of module IDs
function get_module_order(){
    var order = [];
    var m = ALL_MODULES[0]; // start is always 0
    
    while(m.next){
        m = ALL_MODULES[m.next];
        order.push(m.id);
        //console.logm.icon_name);
    }
    
    return order;
    
}


