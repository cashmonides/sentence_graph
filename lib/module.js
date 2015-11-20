
//i create a dictionary and I map an id I pick to an object which contains the id itself
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
        modes_allowed: [1],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'eat', 'love'],
        level: 1,
        next: 2
    },

    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 5,
        modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'eat', 'love', 'attack'],
        level: 2,
        next: 3
    },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 6,
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 'carry'],
        level: 3,    
        next: 4
    },
    "4": {
        id: 4,
        icon_name: "cow",
        icon_url:"../resources/cow.jpg",
        threshold: 7,
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        modes_allowed: [0, 1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 'carry', 'fear', 'see'],
        level: 4,
        next: 5
    },
    "5": {
        id: 5,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 8,
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        modes_allowed: [0, 1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'frog', 'eagle', 'queen', 'eat', 'love', 'attack'],
        level: 5,
        next: 6
    },
    "6": {
        id: 6,
        icon_name: "lion",
        icon_url:"../resources/lion.jpg",
        threshold: 9,
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        modes_allowed: [0, 1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'eagle', 'queen', 'eat', 'love', 'attack', 'carry', 'fear', 'see', 'scare'],
        level: 6,
        next: 7
    },
    "7": {
        id: 7,
        icon_name: "dog",
        icon_url:"../resources/dog.png",
        threshold: 12,
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        modes_allowed: [0, 1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 'queen', 'eat', 'love', 'attack', 'carry', 'fear', 'see', 'scare'],
        level: 7,
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


