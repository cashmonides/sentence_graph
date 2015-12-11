
//i create a dictionary and I map an id I pick to an object which contains the id itself
//modes 0 = drop 1 = mcmode 2 = quick 3 = genericdrop

var game_mode_map = {
    'drop': 0,
    'latin': 1,
    'quick': 2,
    'genericdrop': 3,
    'etymology': 4
}

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
        threshold: 10,
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1],
        modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        // modes_allowed: [1],
        mode_ratio: {'latin': .6, 'drop': 0, 'quick': .5},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 4,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'
                 ],
        parts_of_speech_filter: ['subject', 'verb', 'object'],
        // parts_of_speech_filter: ['subject', "coordinating conjunction"],
        cheat_sheet: "../resources/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg"],
        level: [1, 2],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 2
    },

    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 5,
        // modes_allowed: [1],
        // modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        mode_ratio: {'latin': .5, 'drop': .5, 'quick': .5},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry', 'fear', 'see', 'scare'
                 ],
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective'],
        cheat_sheet: "../resources/cheat_sheet_1.jpg",
        lightbox_images: ["../resources/animal_images/crow01.jpg", "../resources/animal_images/crow02.jpg", "../resources/animal_images/crow03.jpg"],
        level: [1, 3],
        tutorial: {0 : "tutorial0002.txt"},
        next: 3
    },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 6,
        // modes_allowed: [1],
        modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1},
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
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb'],
        cheat_sheet: "../resources/cheat_sheet_2.jpg",
        lightbox_images: ["../resources/animal_images/horse01.jpg", "../resources/animal_images/horse02.jpg", "../resources/animal_images/horse03.jpg"],
        level: [1, 3],  
        tutorial_content: false,
        tutorial_position: null, 
        next: 4
    },
    "4": {
        id: 4,
        icon_name: "bull",
        icon_url:"../resources/bull.jpg",
        threshold: 7,
        // modes_allowed: [1],
        modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1},
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
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
                                'subordinating conjunction', 'coordinating conjunction'],
        cheat_sheet: "../resources/cheat_sheet_3.jpg",
        lightbox_images: ["../resources/animal_images/bull01.jpg", "../resources/animal_images/bull02.jpg", "../resources/animal_images/bull03.jpg"],
        level: [2,4],
        tutorial_content: false,
        tutorial_position: null,
        next: 5
    },
    "5": {
        id: 5,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 8,
        modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1},
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
        parts_of_speech_filter: ['subject', 'verb', 'objective', 'adjective', 'adverb', 
                                'subordinating conjunction', 'coordinating conjunction', 
                                'possessive adjective'],
        cheat_sheet: "../resources/cheat_sheet_4.jpg",
        lightbox_images: ["../resources/animal_images/frog01.jpg", "../resources/animal_images/frog02.jpg", "../resources/animal_images/frog03.jpg"],
        level: [3, 5],
        tutorial_content: false,
        tutorial_position: null,
        next: 6
    },
    "6": {
        id: 6,
        icon_name: "lion",
        icon_url:"../resources/lion.jpg",
        threshold: 9,
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        modes_allowed: [0, 1],
        mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1},
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
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
                                'subordinating conjunction', 'coordinating conjunction', 
                                'possessive adjective', 'personal pronoun'],
        cheat_sheet: "../resources/cheat_h.jpg",
        level: [3, 6],
        tutorial_content: false,
        tutorial_position: null,
        next: 7
    },
    "7": {
        id: 7,
        icon_name: "dog",
        icon_url:"../resources/dog.png",
        threshold: 12,
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        modes_allowed: [0, 1],
        mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1},
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
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
                                'subordinating conjunction', 'coordinating conjunction', 
                                'possessive adjective', 'personal pronoun', 'preposition', 
                                'definite article', 'indefinite article'],
        cheat_sheet: "../resources/cheat_h.jpg",
        level: [3, 7],
        tutorial_content: false,
        tutorial_position: null,
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


