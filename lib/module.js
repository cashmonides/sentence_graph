//I create a dictionary and I map an id I pick to an object which contains the id itself
//modes 0 = drop 1 = mcmode 2 = quick 3 = genericdrop


//todo make all the mode names consistent (keep them all lower case)
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
        threshold: 2,
        modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.1},
        mode_ratio: {'quick': 1},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 2,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        // level: [1, 20],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 2
    },

    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 2,
        // modes_allowed: [1],
        // modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        // mode_ratio: {'latin': .5, 'drop': .5, 'quick': .5},
        mode_ratio: {'quick': 1},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 2,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry', 'fear', 'see', 'scare'
                 ],
        roots: ['CARN', 'DE', 'HERBI', 'OMNI', 'SCI', 'VOR/VOUR'],
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_1.jpg",
        lightbox_images: ["../resources/animal_images/crow01.jpg", "../resources/animal_images/crow02.jpg", "../resources/animal_images/crow03.jpg", "../resources/animal_images/crow04.jpg", "../resources/animal_images/crow05.jpg", "../resources/animal_images/crow06.jpg", "../resources/animal_images/crow07.jpg", "../resources/animal_images/crow08.gif", "../resources/animal_images/crow09.gif", "../resources/animal_images/crow10.gif", "../resources/animal_images/crow11.jpg", "../resources/animal_images/crow12.jpg", "../resources/animal_images/crow13.jpg", "../resources/animal_images/crow14.jpg"],
        etym_level: 15,
        grammar_level: 15,
        latin_drop_level: [25, 45],
        latin_extra_level: 30,
        latin_level: [10, 30],
        tutorial: {0 : "tutorial0002.txt"},
        next: 3
    },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 2,
        // modes_allowed: [1],
        modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        // modes_allowed: [0],
        // mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1, 'etymology': .9},
        mode_ratio: {'quick': 1},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 1,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 
                 'kangaroo', 'chicken', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak'
                 ],
        roots: ['ANN/ENN', 'CARN', 'DE', 'HERBI', 'OMNI', 'PSEUD/PSEUDO',
        'SCI', 'SEMI', 'VOR/VOUR'],
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_2.jpg",
        lightbox_images: ["../resources/animal_images/horse01.jpg", "../resources/animal_images/horse02.jpg", "../resources/animal_images/horse03.jpg", "../resources/animal_images/horse04.jpg", "../resources/animal_images/horse05.jpg", "../resources/animal_images/horse06.jpg", "../resources/animal_images/horse07.jpg", "../resources/animal_images/horse08.gif", "../resources/animal_images/horse09.jpg", "../resources/animal_images/horse10.jpg", "../resources/animal_images/horse11.jpg"],
        etym_level: 20,
        grammar_level: 20,
        latin_drop_level: [35, 60],
        latin_extra_level: 40,
        latin_level: [20, 40], 
        tutorial_content: false,
        tutorial_position: null, 
        next: 4
    },
    "4": {
        id: 10,
        icon_name: "bull",
        icon_url:"../resources/bull.jpg",
        threshold: 2,
        // modes_allowed: [1],
        modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1, 'etymology': .9},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 1,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog','eagle', 
                 'kangaroo', 'snail', 'chicken','spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'hear', 'find'
                 ],
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
                                'subordinating conjunction', 'coordinating conjunction'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_3.jpg",
        lightbox_images: ["../resources/animal_images/bull01.jpg", "../resources/animal_images/bull02.jpg", "../resources/animal_images/bull03.jpg"],
        etym_level: 30,
        grammar_level: 30,
        latin_drop_level: 60,
        latin_extra_level: 45,
        latin_level: 40,
        tutorial_content: false,
        tutorial_position: null,
        next: 5
    },
    
    //introducing first declension
    
    "5": {
        id: 5,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 2,
        modes_allowed: [0, 1],
        // modes_allowed: [1],
        // modes_allowed: [1, 2],
        // modes_allowed: [0, 1, 2],
        mode_ratio: {'latin': .8, 'drop': .1, 'quick': .1},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 1,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken','spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find'
                 ],
        parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
                                'subordinating conjunction', 'coordinating conjunction', 
                                'possessive adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_4.jpg",
        lightbox_images: ["../resources/animal_images/frog01.jpg", "../resources/animal_images/frog02.jpg", "../resources/animal_images/frog03.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [10, 20],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial_content: false,
        tutorial_position: null,
        next: 6
    },
    
    
    //add some more first declensions here before bringing in 3rd declension
    
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
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        etym_level: 25,
        grammar_level: 25,
        latin_drop_level: [20, 30],
        latin_extra_level: 30,
        latin_level: [1, 25],
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
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        etym_level: 18,
        grammar_level: 18,
        latin_drop_level: [30, 55],
        latin_extra_level: 35,
        latin_level: [20, 30],
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


