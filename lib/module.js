//I create a dictionary and I map an id I pick to an object which contains the id itself
//modes 0 = drop 1 = mcmode 2 = quick 3 = genericdrop


//todo make all the mode names consistent (keep them all lower case)
var game_mode_list = ['drop', 'latin', 'quick', 'etymology', 'input', 'mf'];

var game_mode_map = {
    'drop': 0,
    'latin': 1,
    'quick': 2,
    // 'genericdrop': 3,
    'etymology': 4,
    'input': 5,
    'mf': 6
}

//below is the real module
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
        threshold: 4,
        modes_allowed: [1, 2, 3, 4],
        mode_ratio: {'latin': 0.9, 'quick': 0.00001, 'etymology': .3},
        // mode_ratio: {'latin': 0.000009, 'quick': 0.00001, 'etymology': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 20,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        // cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        // level: [1, 20],
        etym_level: 40,
        grammar_level: 20,
        latin_drop_level: [1, 100],
        // latin_drop_level: 200,
        latin_extra_level: 30,
        latin_level: [10, 30],
        sentence_levels: {
            'english': 1,
            'latin': 1
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 2
    },
    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 6,
        modes_allowed: [1, 2, 4],
        mode_ratio: {'latin': 0.9, 'quick': 0.00001, 'etymology': .2},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 30,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // roots: ['CARN', 'DE', 'HERBI', 'OMNI', 'SCI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/crow01.jpg", "../resources/animal_images/crow02.jpg", "../resources/animal_images/crow03.jpg", "../resources/animal_images/crow04.jpg", "../resources/animal_images/crow05.jpg", "../resources/animal_images/crow06.jpg", "../resources/animal_images/crow07.jpg", "../resources/animal_images/crow08.gif", "../resources/animal_images/crow09.gif", "../resources/animal_images/crow10.gif", "../resources/animal_images/crow11.jpg", "../resources/animal_images/crow12.jpg", "../resources/animal_images/crow13.jpg", "../resources/animal_images/crow14.jpg"],
        etym_level: 60,
        grammar_level: 1,
        // latin_drop_level: [200, 300],
        latin_drop_level: 200,
        latin_extra_level: 10,
        latin_level: [30, 40],
        sentence_levels: {
            'english': 2,
            'latin': 2
        },
        tutorial: {0 : "tutorial0002.txt"},
        next: 3
    },
    //old horse - commented for testing
    // "3": {
    //     id: 3,
    //     icon_name: "horse",
    //     icon_url:"../resources/horse.jpg",
    //     threshold: 8,
    //     // modes_allowed: [0, 1, 2, 4],
    //     // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
    //     modes_allowed: [1, 2, 4, 5],
    //     mode_ratio: {'latin': 0.0009, 'quick': 0.00001, 'etymology': .000002, 'input': .9},
    //     submodule : {
    //         reward1: 4,
    //         reward2: 2,
    //         reward3: 1,
    //         penalty: 2,
    //         threshold: 40,
    //         max_incorrect_streak: 3
    //     },
    //     lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 
    //              'kangaroo', 'chicken', 'eat', 
    //              'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
    //              'speak'
    //              ],
    //     // roots: ['ANN/ENN', 'CARN', 'DE', 'HERBI', 'OMNI', 'PSEUD/PSEUDO',
    //     // 'SCI', 'SEMI', 'VOR/VOUR'],
    //     // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb'],
    //     cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
    //     lightbox_images: ["../resources/animal_images/horse01.jpg", "../resources/animal_images/horse02.jpg", "../resources/animal_images/horse03.jpg", "../resources/animal_images/horse04.jpg", "../resources/animal_images/horse05.jpg", "../resources/animal_images/horse06.jpg", "../resources/animal_images/horse07.jpg", "../resources/animal_images/horse08.gif", "../resources/animal_images/horse09.jpg", "../resources/animal_images/horse10.jpg", "../resources/animal_images/horse11.jpg"],
    //     etym_level: 30,
    //     grammar_level: 20,
    //     latin_drop_level: 300,
    //     latin_extra_level: 10,
    //     latin_level: [100, 110],
    //     sentence_levels: {
    //         'english': 2,
    //         'latin': 2
    //     },
    //     tutorial_content: false,
    //     tutorial_position: null, 
    //     next: 4
    // },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.00003, 'etymology': 0.9, 'input': .3},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // roots: ['ANN/ENN', 'CARN', 'DE', 'HERBI', 'OMNI', 'PSEUD/PSEUDO',
        // 'SCI', 'SEMI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/horse01.jpg", "../resources/animal_images/horse02.jpg", "../resources/animal_images/horse03.jpg", "../resources/animal_images/horse04.jpg", "../resources/animal_images/horse05.jpg", "../resources/animal_images/horse06.jpg", "../resources/animal_images/horse07.jpg", "../resources/animal_images/horse08.gif", "../resources/animal_images/horse09.jpg", "../resources/animal_images/horse10.jpg", "../resources/animal_images/horse11.jpg"],
        etym_level: 100,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: [80, 130],
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"}, 
        next: 4
    },
    /*
    "17": {
        id: 17,
        icon_name: "bird",
        icon_url: "../resources/bird.png",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.000008, 'drop': 0.000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/mouse01.jpg", "../resources/animal_images/mouse02.jpg", "../resources/animal_images/mouse03.jpg", "../resources/animal_images/mouse04.jpg", "../resources/animal_images/mouse05.jpg", "../resources/animal_images/mouse06.jpg", "../resources/animal_images/mouse07.jpg", "../resources/animal_images/mouse08.jpg", "../resources/animal_images/mouse09.jpg", "../resources/animal_images/mouse10.jpg"],
        etym_level: 470,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    },
    */
    
    
    "4": {
        id: 4,
        icon_name: "bear",
        icon_url:"../resources/bear.jpg",
        threshold: 10,
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .4},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/bear01.jpg", "../resources/animal_images/bear02.jpg", "../resources/animal_images/bear03.jpg", "../resources/animal_images/bear04.jpg", "../resources/animal_images/bear05.jpg", "../resources/animal_images/bear06.jpg", "../resources/animal_images/bear07.jpg",  "../resources/animal_images/bear08.jpg",  "../resources/animal_images/bear09.jpg", "../resources/animal_images/bear10.jpg", "../resources/animal_images/bear11.jpg", ],
        etym_level: 140,
        grammar_level: 20,
        latin_drop_level: [220, 230],
        latin_extra_level: 30,
        latin_level: [100, 130],
        sentence_levels: {
            'english': 2,
            'latin': 2
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 5
    },
    
    
    "5": {
        id: 5,
        icon_name: "bull",
        icon_url:"../resources/bull.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .5},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/bull01.jpg", "../resources/animal_images/bull02.jpg", "../resources/animal_images/bull03.jpg", "../resources/animal_images/bull04.jpg", "../resources/animal_images/bull05.jpg", "../resources/animal_images/bull06.jpg", "../resources/animal_images/bull07.jpg",  "../resources/animal_images/bull08.jpg",  "../resources/animal_images/bull09.jpg", "../resources/animal_images/bull10.jpg", "../resources/animal_images/bull11.jpg", ],
        etym_level: 180,
        grammar_level: 20,
        latin_drop_level: [220, 240],
        latin_extra_level: 40,
        latin_level: [120, 140],
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 6
    },
    

    
    "6": {
        id: 6,
        icon_name: "lizard",
        icon_url:"../resources/lizard.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .6},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'kangaroo', 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        //parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective', 'personal pronoun'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/lizard01.jpg", "../resources/animal_images/lizard02.jpg", "../resources/animal_images/lizard03.jpg", "../resources/animal_images/lizard04.jpg", "../resources/animal_images/lizard05.jpg", "../resources/animal_images/lizard06.jpg", "../resources/animal_images/lizard07.jpg",  "../resources/animal_images/lizard08.jpg",  "../resources/animal_images/lizard09.jpg", "../resources/animal_images/lizard10.jpg"],
        etym_level: 200,
        grammar_level: 20,
        latin_drop_level: [40, 50],
        latin_extra_level: 50,
        latin_level: [130, 140],
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 7
    },
    
    ////introducing first declension
    
    "7": {
        id: 7,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .7},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule'
                 ],
        //parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective', 'personal pronoun', 'preposition', 
        //                        'definite article', 'indefinite article'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/frog01.jpg", "../resources/animal_images/frog02.jpg", "../resources/animal_images/frog03.jpg", "../resources/animal_images/frog04.jpg", "../resources/animal_images/frog05.jpg", "../resources/animal_images/frog06.jpg", "../resources/animal_images/frog07.jpg",  "../resources/animal_images/frog08.jpg",  "../resources/animal_images/frog09.jpg", "../resources/animal_images/frog10.jpg"],
        etym_level: 240,
        grammar_level: 20,
        latin_drop_level: [110, 120],
        latin_extra_level: 20,
        latin_level: 140,
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 8
    },
    "8": {
        id: 8,
        icon_name: "eagle",
        icon_url: "../resources/eagle.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .8},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'grab'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/eagle01.jpg", "../resources/animal_images/eagle02.jpg", "../resources/animal_images/eagle03.jpg", "../resources/animal_images/eagle04.jpg", "../resources/animal_images/eagle05.jpg", "../resources/animal_images/eagle06.jpg", "../resources/animal_images/eagle07.jpg",  "../resources/animal_images/eagle08.jpg",  "../resources/animal_images/eagle09.jpg", "../resources/animal_images/eagle10.jpg"],
        etym_level: 280,
        grammar_level: 20,
        latin_drop_level: [120, 130],
        latin_extra_level: 30,
        latin_level: 140,
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 9
    },
    "9": {
        id: 9,
        icon_name: "chicken",
        icon_url: "../resources/chicken.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'chicken', 'centipede', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/chicken01.jpg", "../resources/animal_images/chicken02.jpg", "../resources/animal_images/chicken03.jpg", "../resources/animal_images/chicken04.png", "../resources/animal_images/chicken05.jpg", "../resources/animal_images/chicken06.jpg", "../resources/animal_images/chicken07.png",  "../resources/animal_images/chicken08.jpg",  "../resources/animal_images/chicken09.jpg", "../resources/animal_images/chicken10.jpg"],
        etym_level: 320,
        grammar_level: 20,
        latin_drop_level: [130, 140],
        latin_extra_level: 40,
        latin_level: 140,
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 10
    },
    "10": {
        id: 10,
        icon_name: "spider",
        icon_url: "../resources/spider.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.8, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'chicken', 'centipede', 'fly', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/spider01.jpg", "../resources/animal_images/spider02.jpg", "../resources/animal_images/spider03.jpg", "../resources/animal_images/spider04.jpg", "../resources/animal_images/spider05.jpg", "../resources/animal_images/spider06.jpg", "../resources/animal_images/spider07.jpg", "../resources/animal_images/spider08.jpg", "../resources/animal_images/spider09.gif", "../resources/animal_images/spider10.jpg"],
        // level: [1, 20],
        etym_level: 340,
        grammar_level: 20,
        latin_drop_level: [140, 150],
        latin_extra_level: 50,
        latin_level: [140, 200],
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 11
    },
    "11": {
        id: 11,
        icon_name: "fly",
        icon_url: "../resources/fly.gif",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.7, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/fly01.jpg", "../resources/animal_images/fly02.jpg", "../resources/animal_images/fly03.jpg", "../resources/animal_images/fly04.gif", "../resources/animal_images/fly05.jpg", "../resources/animal_images/fly06.gif", "../resources/animal_images/fly07.png", "../resources/animal_images/fly08.jpg", "../resources/animal_images/fly09.jpg", "../resources/animal_images/fly10.jpg"],
        etym_level: 360,
        grammar_level: 20,
        latin_drop_level: 150,
        latin_extra_level: 50,
        latin_level: [140, 210],
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 12
    },
    
    // "12": {
    //     id: 12,
    //     icon_name: "dog",
    //     icon_url: "../resources/dog.png",
    //     threshold: 5,
    //     modes_allowed: [0, 1, 2, 4],
    //     mode_ratio: {'latin': 0.8, 'drop': 0.000005, 'quick': 0.00005, 'etymology': 0.00001},
    //     submodule : {
    //         reward1: 4,
    //         reward2: 2,
    //         reward3: 1,
    //         penalty: 2,
    //         threshold: 40,
    //         max_incorrect_streak: 3
    //     },
    //     lexicon: [/*'horse', 'bear', 'wolf', 'crow',*/ 'bull', 'eat', 'love', 'attack', 
    //             'carry', 'see', 'scare', 'push', 'rule', 'speak', 'grab', 'hear', 'find', 'walk', 'shout',
    //             'father', 'mother', 'son', 'daughter', 'king', 'queen', 'god', 'goddess'
    //             // 'Hermes', 'Chronos', 'Poseidon',
    //             // 'Aphrodite', 'Ares', 'Hades', 'Zeus', 
    //             ],
    //     // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
    //     // parts_of_speech_filter: ['subject', 'verb', 'object'],
    //     cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
    //     lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
    //     etym_level: 360,
    //     grammar_level: 20,
    //     latin_drop_level: 41,
    //     latin_extra_level: 50,
    //     latin_level: [1001, 1002],
    //     sentence_levels: {
    //         'english': 4,
    //         'latin': 4
    //     },
    //     tutorial: {0 : "tutorial0001.txt"},   
    //     next: 13
    // },
    
    //add snail back in after testing dog
    
    
    "12": {
        id: 12,
        icon_name: "snail",
        icon_url: "../resources/snail.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.6, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'spider', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/snail01.jpg", "../resources/animal_images/snail02.jpg", "../resources/animal_images/snail03.jpg", "../resources/animal_images/snail04.jpg", "../resources/animal_images/snail05.gif", "../resources/animal_images/snail06.jpg", "../resources/animal_images/snail07.jpg", "../resources/animal_images/snail08.jpg", "../resources/animal_images/snail09.gif", "../resources/animal_images/snail10.jpg"],
        // level: [1, 20],
        etym_level: 380,
        grammar_level: 20,
        latin_drop_level: [30, 40],
        latin_extra_level: 50,
        latin_level: [140, 210],
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 13
    },
    
    "13": {
        id: 13,
        icon_name: "millipede",
        icon_url: "../resources/millipede.png",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.5, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/millipede01.jpg", "../resources/animal_images/millipede02.jpg", "../resources/animal_images/millipede03.jpg", "../resources/animal_images/millipede04.jpg", "../resources/animal_images/millipede05.jpg", "../resources/animal_images/millipede06.gif", "../resources/animal_images/millipede07.jpg", "../resources/animal_images/millipede08.jpg", "../resources/animal_images/millipede09.png", "../resources/animal_images/millipede10.jpg"],
        etym_level: 400,
        grammar_level: 20,
        latin_drop_level: [40, 50],
        latin_extra_level: 120,
        latin_level: [140, 210],
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 14
    },
    "14": {
        id: 14,
        icon_name: "kangaroo",
        icon_url: "../resources/kangaroo.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.4, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'fall'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 420,
        grammar_level: 20,
        latin_drop_level: 50,
        latin_extra_level: 130,
        latin_level: 210,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 15
    },
    
    
    ///adding third declension
    
    "15": {
        id: 15,
        icon_name: "lion",
        icon_url: "../resources/lion.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.3, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 
                 'octopus', 'fly', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/lion01.jpg", "../resources/animal_images/lion02.jpg", "../resources/animal_images/lion03.jpg", "../resources/animal_images/lion04.jpg", "../resources/animal_images/lion05.jpg", "../resources/animal_images/lion06.jpg", "../resources/animal_images/lion07.jpg", "../resources/animal_images/lion08.jpg", "../resources/animal_images/lion09.jpg", "../resources/animal_images/lion10.jpg"],
        etym_level: 450,
        grammar_level: 20,
        latin_drop_level: [110, 120],
        latin_extra_level: 30,
        latin_level: 220,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 16
    },
    "16": {
        id: 16,
        icon_name: "mouse",
        icon_url: "../resources/mouse.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.2, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 220,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'millipede', 
                 'octopus', 'fly', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall', 'sleep'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/mouse01.jpg", "../resources/animal_images/mouse02.jpg", "../resources/animal_images/mouse03.jpg", "../resources/animal_images/mouse04.jpg", "../resources/animal_images/mouse05.jpg", "../resources/animal_images/mouse06.jpg", "../resources/animal_images/mouse07.jpg", "../resources/animal_images/mouse08.jpg", "../resources/animal_images/mouse09.jpg", "../resources/animal_images/mouse10.jpg"],
        etym_level: 460,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 17
    },
    "17": {
        id: 17,
        icon_name: "bird",
        icon_url: "../resources/bird.png",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.1, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'millipede', 
                 'octopus', 'fly', 'scorpion', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall', 'flee', 'sleep'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/mouse01.jpg", "../resources/animal_images/mouse02.jpg", "../resources/animal_images/mouse03.jpg", "../resources/animal_images/mouse04.jpg", "../resources/animal_images/mouse05.jpg", "../resources/animal_images/mouse06.jpg", "../resources/animal_images/mouse07.jpg", "../resources/animal_images/mouse08.jpg", "../resources/animal_images/mouse09.jpg", "../resources/animal_images/mouse10.jpg"],
        etym_level: 470,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    }
    /*
    "18": {
        id: 18,
        icon_name: "dog",
        icon_url: "../resources/dog.png",
        threshold: 5,
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.000005, 'quick': 0.00005, 'etymology': 0.00001},
        // mode_ratio: {'quick': 1},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 2,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry', 'see', 'scare', 'push', 'rule', 'speak', 'grab', 'hear', 'find', 'walk', 'shout',
                'father', 'mother', 'son', 'daughter', 'king', 'queen', 'god', 'goddess',
                'Hermes', 'Chronos', 'Poseidon',
                'Aphrodite', 'Ares', 'Hades', 'Zeus', ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1000, 1000],
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    },
    "19": {
        id: 19,
        icon_name: "cerberus",
        icon_url: "../resources/cerberus.png",
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
                'carry', 'see', 'scare', 'push', 'rule', 'speak', 'grab', 'hear', 'find', 'walk', 'shout',
                'father', 'mother', 'son', 'daughter', 'king', 'queen', 'god', 'goddess',
                'Hermes', 'Chronos', 'Poseidon',
                'Aphrodite', 'Ares', 'Hades', 'Zeus', ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 20
    },
    "20": {
        id: 20,
        icon_name: "rabbit",
        icon_url: "../resources/rabbit.jpg",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 21
    },
    "21": {
        id: 21,
        icon_name: "cow",
        icon_url: "../resources/cow.jpg",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    },
    */
};



//below is testing
var ALL_MODULES_FAKE = {

    "0": {
        id: 0,
        level: 1,
        next: 1
    },
    "1": {
        id: 1,
        icon_name: "wolf",
        icon_url: "../resources/Wolf.png",
        threshold: 4,
        modes_allowed: [1, 2, 3, 4],
        mode_ratio: {'latin': 0.9, 'quick': 0.00001, 'etymology': .3},
        // mode_ratio: {'latin': 0.000009, 'quick': 0.00001, 'etymology': .9},
        submodule : {
            reward: 4,
            penalty: 2,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        // cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        // level: [1, 20],
        etym_level: 40,
        grammar_level: 20,
        latin_drop_level: [1, 100],
        // latin_drop_level: 200,
        latin_extra_level: 30,
        latin_level: [10, 30],
        sentence_levels: {
            'english': 1,
            'latin': 1
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 2
    },
    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 6,
        modes_allowed: [1, 2, 4],
        mode_ratio: {'latin': 0.9, 'quick': 0.00001, 'etymology': .2},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 30,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // roots: ['CARN', 'DE', 'HERBI', 'OMNI', 'SCI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/crow01.jpg", "../resources/animal_images/crow02.jpg", "../resources/animal_images/crow03.jpg", "../resources/animal_images/crow04.jpg", "../resources/animal_images/crow05.jpg", "../resources/animal_images/crow06.jpg", "../resources/animal_images/crow07.jpg", "../resources/animal_images/crow08.gif", "../resources/animal_images/crow09.gif", "../resources/animal_images/crow10.gif", "../resources/animal_images/crow11.jpg", "../resources/animal_images/crow12.jpg", "../resources/animal_images/crow13.jpg", "../resources/animal_images/crow14.jpg"],
        etym_level: 60,
        grammar_level: 1,
        // latin_drop_level: [200, 300],
        latin_drop_level: 200,
        latin_extra_level: 10,
        latin_level: [30, 40],
        sentence_levels: {
            'english': 2,
            'latin': 2
        },
        tutorial: {0 : "tutorial0002.txt"},
        next: 3
    },
    //old horse - commented for testing
    // "3": {
    //     id: 3,
    //     icon_name: "horse",
    //     icon_url:"../resources/horse.jpg",
    //     threshold: 8,
    //     // modes_allowed: [0, 1, 2, 4],
    //     // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
    //     modes_allowed: [1, 2, 4, 5],
    //     mode_ratio: {'latin': 0.0009, 'quick': 0.00001, 'etymology': .000002, 'input': .9},
    //     submodule : {
    //         reward1: 4,
    //         reward2: 2,
    //         reward3: 1,
    //         penalty: 2,
    //         threshold: 40,
    //         max_incorrect_streak: 3
    //     },
    //     lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 
    //              'kangaroo', 'chicken', 'eat', 
    //              'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
    //              'speak'
    //              ],
    //     // roots: ['ANN/ENN', 'CARN', 'DE', 'HERBI', 'OMNI', 'PSEUD/PSEUDO',
    //     // 'SCI', 'SEMI', 'VOR/VOUR'],
    //     // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb'],
    //     cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
    //     lightbox_images: ["../resources/animal_images/horse01.jpg", "../resources/animal_images/horse02.jpg", "../resources/animal_images/horse03.jpg", "../resources/animal_images/horse04.jpg", "../resources/animal_images/horse05.jpg", "../resources/animal_images/horse06.jpg", "../resources/animal_images/horse07.jpg", "../resources/animal_images/horse08.gif", "../resources/animal_images/horse09.jpg", "../resources/animal_images/horse10.jpg", "../resources/animal_images/horse11.jpg"],
    //     etym_level: 30,
    //     grammar_level: 20,
    //     latin_drop_level: 300,
    //     latin_extra_level: 10,
    //     latin_level: [100, 110],
    //     sentence_levels: {
    //         'english': 2,
    //         'latin': 2
    //     },
    //     tutorial_content: false,
    //     tutorial_position: null, 
    //     next: 4
    // },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.00003, 'etymology': 0.9, 'input': .3},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // roots: ['ANN/ENN', 'CARN', 'DE', 'HERBI', 'OMNI', 'PSEUD/PSEUDO',
        // 'SCI', 'SEMI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/horse01.jpg", "../resources/animal_images/horse02.jpg", "../resources/animal_images/horse03.jpg", "../resources/animal_images/horse04.jpg", "../resources/animal_images/horse05.jpg", "../resources/animal_images/horse06.jpg", "../resources/animal_images/horse07.jpg", "../resources/animal_images/horse08.gif", "../resources/animal_images/horse09.jpg", "../resources/animal_images/horse10.jpg", "../resources/animal_images/horse11.jpg"],
        etym_level: 100,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: [80, 130],
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"}, 
        next: 4
    },
    "4": {
        id: 4,
        icon_name: "bear",
        icon_url:"../resources/bear.jpg",
        threshold: 10,
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .4},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/bear01.jpg", "../resources/animal_images/bear02.jpg", "../resources/animal_images/bear03.jpg", "../resources/animal_images/bear04.jpg", "../resources/animal_images/bear05.jpg", "../resources/animal_images/bear06.jpg", "../resources/animal_images/bear07.jpg",  "../resources/animal_images/bear08.jpg",  "../resources/animal_images/bear09.jpg", "../resources/animal_images/bear10.jpg", "../resources/animal_images/bear11.jpg", ],
        etym_level: 140,
        grammar_level: 20,
        latin_drop_level: [220, 230],
        latin_extra_level: 30,
        latin_level: [100, 130],
        sentence_levels: {
            'english': 2,
            'latin': 2
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 5
    },
    "5": {
        id: 5,
        icon_name: "bull",
        icon_url:"../resources/bull.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .5},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/bull01.jpg", "../resources/animal_images/bull02.jpg", "../resources/animal_images/bull03.jpg", "../resources/animal_images/bull04.jpg", "../resources/animal_images/bull05.jpg", "../resources/animal_images/bull06.jpg", "../resources/animal_images/bull07.jpg",  "../resources/animal_images/bull08.jpg",  "../resources/animal_images/bull09.jpg", "../resources/animal_images/bull10.jpg", "../resources/animal_images/bull11.jpg", ],
        etym_level: 180,
        grammar_level: 20,
        latin_drop_level: [220, 240],
        latin_extra_level: 40,
        latin_level: [120, 140],
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 6
    },
    

    
    "6": {
        id: 6,
        icon_name: "lizard",
        icon_url:"../resources/lizard.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .6},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'kangaroo', 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'
                 ],
        //parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective', 'personal pronoun'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/lizard01.jpg", "../resources/animal_images/lizard02.jpg", "../resources/animal_images/lizard03.jpg", "../resources/animal_images/lizard04.jpg", "../resources/animal_images/lizard05.jpg", "../resources/animal_images/lizard06.jpg", "../resources/animal_images/lizard07.jpg",  "../resources/animal_images/lizard08.jpg",  "../resources/animal_images/lizard09.jpg", "../resources/animal_images/lizard10.jpg"],
        etym_level: 200,
        grammar_level: 20,
        latin_drop_level: [40, 50],
        latin_extra_level: 50,
        latin_level: [130, 140],
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 7
    },
    
    ////introducing first declension
    
    "7": {
        id: 7,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .7},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule'
                 ],
        //parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective', 'personal pronoun', 'preposition', 
        //                        'definite article', 'indefinite article'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/frog01.jpg", "../resources/animal_images/frog02.jpg", "../resources/animal_images/frog03.jpg", "../resources/animal_images/frog04.jpg", "../resources/animal_images/frog05.jpg", "../resources/animal_images/frog06.jpg", "../resources/animal_images/frog07.jpg",  "../resources/animal_images/frog08.jpg",  "../resources/animal_images/frog09.jpg", "../resources/animal_images/frog10.jpg"],
        etym_level: 240,
        grammar_level: 20,
        latin_drop_level: [110, 120],
        latin_extra_level: 20,
        latin_level: 140,
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 8
    },
    "8": {
        id: 8,
        icon_name: "eagle",
        icon_url: "../resources/eagle.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .8},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'chicken',
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'grab'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/eagle01.jpg", "../resources/animal_images/eagle02.jpg", "../resources/animal_images/eagle03.jpg", "../resources/animal_images/eagle04.jpg", "../resources/animal_images/eagle05.jpg", "../resources/animal_images/eagle06.jpg", "../resources/animal_images/eagle07.jpg",  "../resources/animal_images/eagle08.jpg",  "../resources/animal_images/eagle09.jpg", "../resources/animal_images/eagle10.jpg"],
        etym_level: 280,
        grammar_level: 20,
        latin_drop_level: [120, 130],
        latin_extra_level: 30,
        latin_level: 140,
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 9
    },
    "9": {
        id: 9,
        icon_name: "chicken",
        icon_url: "../resources/chicken.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.9, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'chicken', 'centipede', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/chicken01.jpg", "../resources/animal_images/chicken02.jpg", "../resources/animal_images/chicken03.jpg", "../resources/animal_images/chicken04.png", "../resources/animal_images/chicken05.jpg", "../resources/animal_images/chicken06.jpg", "../resources/animal_images/chicken07.png",  "../resources/animal_images/chicken08.jpg",  "../resources/animal_images/chicken09.jpg", "../resources/animal_images/chicken10.jpg"],
        etym_level: 320,
        grammar_level: 20,
        latin_drop_level: [130, 140],
        latin_extra_level: 40,
        latin_level: 140,
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 10
    },
    "10": {
        id: 10,
        icon_name: "spider",
        icon_url: "../resources/spider.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.8, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'chicken', 'centipede', 'fly', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/spider01.jpg", "../resources/animal_images/spider02.jpg", "../resources/animal_images/spider03.jpg", "../resources/animal_images/spider04.jpg", "../resources/animal_images/spider05.jpg", "../resources/animal_images/spider06.jpg", "../resources/animal_images/spider07.jpg", "../resources/animal_images/spider08.jpg", "../resources/animal_images/spider09.gif", "../resources/animal_images/spider10.jpg"],
        // level: [1, 20],
        etym_level: 340,
        grammar_level: 20,
        latin_drop_level: [140, 150],
        latin_extra_level: 50,
        latin_level: [140, 200],
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 11
    },
    "11": {
        id: 11,
        icon_name: "fly",
        icon_url: "../resources/fly.gif",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.7, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/fly01.jpg", "../resources/animal_images/fly02.jpg", "../resources/animal_images/fly03.jpg", "../resources/animal_images/fly04.gif", "../resources/animal_images/fly05.jpg", "../resources/animal_images/fly06.gif", "../resources/animal_images/fly07.png", "../resources/animal_images/fly08.jpg", "../resources/animal_images/fly09.jpg", "../resources/animal_images/fly10.jpg"],
        etym_level: 360,
        grammar_level: 20,
        latin_drop_level: 150,
        latin_extra_level: 50,
        latin_level: [140, 210],
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 12
    },
    
    "12": {
        id: 12,
        icon_name: "dog",
        icon_url: "../resources/dog.png",
        threshold: 5,
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.000005, 'quick': 0.00005, 'etymology': 0.00001},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: [/*'horse', 'bear', 'wolf', 'crow',*/ 'bull', 'eat', 'love', 'attack', 
                'carry', 'see', 'scare', 'push', 'rule', 'speak', 'grab', 'hear', 'find', 'walk', 'shout',
                'father', 'mother', 'son', 'daughter', 'king', 'queen', 'god', 'goddess'
                // 'Hermes', 'Chronos', 'Poseidon',
                // 'Aphrodite', 'Ares', 'Hades', 'Zeus', 
                ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 360,
        grammar_level: 20,
        latin_drop_level: 41,
        latin_extra_level: 50,
        latin_level: [1001, 1002],
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 13
    },
    
    //add snail back in after testing dog
    /*
    
    "12": {
        id: 12,
        icon_name: "snail",
        icon_url: "../resources/snail.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.6, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'spider', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/snail01.jpg", "../resources/animal_images/snail02.jpg", "../resources/animal_images/snail03.jpg", "../resources/animal_images/snail04.jpg", "../resources/animal_images/snail05.gif", "../resources/animal_images/snail06.jpg", "../resources/animal_images/snail07.jpg", "../resources/animal_images/snail08.jpg", "../resources/animal_images/snail09.gif", "../resources/animal_images/snail10.jpg"],
        // level: [1, 20],
        etym_level: 380,
        grammar_level: 20,
        latin_drop_level: [30, 40],
        latin_extra_level: 50,
        latin_level: [140, 210],
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 13
    },
    */
    "13": {
        id: 13,
        icon_name: "millipede",
        icon_url: "../resources/millipede.png",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.5, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/millipede01.jpg", "../resources/animal_images/millipede02.jpg", "../resources/animal_images/millipede03.jpg", "../resources/animal_images/millipede04.jpg", "../resources/animal_images/millipede05.jpg", "../resources/animal_images/millipede06.gif", "../resources/animal_images/millipede07.jpg", "../resources/animal_images/millipede08.jpg", "../resources/animal_images/millipede09.png", "../resources/animal_images/millipede10.jpg"],
        etym_level: 400,
        grammar_level: 20,
        latin_drop_level: [40, 50],
        latin_extra_level: 120,
        latin_level: [140, 210],
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 14
    },
    "14": {
        id: 14,
        icon_name: "kangaroo",
        icon_url: "../resources/kangaroo.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.4, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'fly', 
                 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'fall'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 420,
        grammar_level: 20,
        latin_drop_level: 50,
        latin_extra_level: 130,
        latin_level: 210,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 15
    },
    
    
    ///adding third declension
    
    "15": {
        id: 15,
        icon_name: "lion",
        icon_url: "../resources/lion.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.3, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 
                 'octopus', 'fly', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/lion01.jpg", "../resources/animal_images/lion02.jpg", "../resources/animal_images/lion03.jpg", "../resources/animal_images/lion04.jpg", "../resources/animal_images/lion05.jpg", "../resources/animal_images/lion06.jpg", "../resources/animal_images/lion07.jpg", "../resources/animal_images/lion08.jpg", "../resources/animal_images/lion09.jpg", "../resources/animal_images/lion10.jpg"],
        etym_level: 450,
        grammar_level: 20,
        latin_drop_level: [110, 120],
        latin_extra_level: 30,
        latin_level: 220,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 16
    },
    "16": {
        id: 16,
        icon_name: "mouse",
        icon_url: "../resources/mouse.jpg",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.2, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 220,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'millipede', 
                 'octopus', 'fly', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall', 'sleep'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/mouse01.jpg", "../resources/animal_images/mouse02.jpg", "../resources/animal_images/mouse03.jpg", "../resources/animal_images/mouse04.jpg", "../resources/animal_images/mouse05.jpg", "../resources/animal_images/mouse06.jpg", "../resources/animal_images/mouse07.jpg", "../resources/animal_images/mouse08.jpg", "../resources/animal_images/mouse09.jpg", "../resources/animal_images/mouse10.jpg"],
        etym_level: 460,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 17
    },
    "17": {
        id: 17,
        icon_name: "bird",
        icon_url: "../resources/bird.png",
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [1, 2, 4, 5],
        mode_ratio: {'latin': 0.1, 'drop': 0.000000000003, 'quick': 0.000000003, 'etymology': 0.9, 'input': .9},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 40,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'millipede', 
                 'octopus', 'fly', 'scorpion', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall', 'flee', 'sleep'
                 ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/mouse01.jpg", "../resources/animal_images/mouse02.jpg", "../resources/animal_images/mouse03.jpg", "../resources/animal_images/mouse04.jpg", "../resources/animal_images/mouse05.jpg", "../resources/animal_images/mouse06.jpg", "../resources/animal_images/mouse07.jpg", "../resources/animal_images/mouse08.jpg", "../resources/animal_images/mouse09.jpg", "../resources/animal_images/mouse10.jpg"],
        etym_level: 470,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    }
    /*
    "18": {
        id: 18,
        icon_name: "dog",
        icon_url: "../resources/dog.png",
        threshold: 5,
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.000005, 'quick': 0.00005, 'etymology': 0.00001},
        // mode_ratio: {'quick': 1},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 2,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry', 'see', 'scare', 'push', 'rule', 'speak', 'grab', 'hear', 'find', 'walk', 'shout',
                'father', 'mother', 'son', 'daughter', 'king', 'queen', 'god', 'goddess',
                'Hermes', 'Chronos', 'Poseidon',
                'Aphrodite', 'Ares', 'Hades', 'Zeus', ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1000, 1000],
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    },
    "19": {
        id: 19,
        icon_name: "cerberus",
        icon_url: "../resources/cerberus.png",
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
                'carry', 'see', 'scare', 'push', 'rule', 'speak', 'grab', 'hear', 'find', 'walk', 'shout',
                'father', 'mother', 'son', 'daughter', 'king', 'queen', 'god', 'goddess',
                'Hermes', 'Chronos', 'Poseidon',
                'Aphrodite', 'Ares', 'Hades', 'Zeus', ],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 20
    },
    "20": {
        id: 20,
        icon_name: "rabbit",
        icon_url: "../resources/rabbit.jpg",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 21
    },
    "21": {
        id: 21,
        icon_name: "cow",
        icon_url: "../resources/cow.jpg",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    },
    */
};


// var MF_MODULES = {
//     "0": {
//         id: 0,
//         level: 1,
//         next: 1
//     },
//     "1" : {
//         id: 1,
//         icon_name: "mf1",
//         icon_url: "../resources/numbers/one.jpg",
//         // parts_of_speech_filter: ['subject', 'verb', 'object'],
//         lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
//         next: 2,
//         sentences: {
//         	1.1: ["Nauta in patriā poenās rēgīnae timet.", "The sailor in-the-country/homeland fears the penalties/punishments of-the-queen."],
        
//         	1.2: ["Poēta pecūniam fāmamque nōn optat.", "The poet does-not-want/choose money-and-fame."],
        
//         	1.3: ["Pecūniam poētārum habēmus.", "We-have the money-of-the-poets."],
        
//         	1.4: ["Poētīsne rēgīna pecūniam dabit?", "Will-the-queen-give the money to-the-poets?"],
        
//         	1.5: ["Rēgīnam īnsulae cum turbā nautārum vidēre optābāmus.", "We-wanted/chose-to-see the queen-of-the-island with-the-crowd-of-the-sailors."],
        
//         	1.6: ["Fēminae enim poētās corōnīs corōnābunt.", "Indeed the women will-crown the poets with-crowns."],
        
//         	1.7: ["Fēminās in viīs vidēbātis, sed dē fōrmā nōn clāmābātis. Poenās dabitis.", "You-(plural)-were-seeing the women in/on-the-roads but concerning/about-their-beauty you-(plural)-were-not-shouting. You-(plural)-will-pay-the-penalty."],
        
//         	1.8: ["Poētae rēgīnam patriae ē turbā fēminārum optant.", "The poets do-not-want/choose a queen-of/for-the-country/homeland {from||out-of}-the-crowd-of-women."],
        
//         	1.9: ["Est cūra dē poenā poētae.", "There-is-anxiety/concern about/concerning-the-penalty-of-the-poet."],
        
//         	1.10: ["Taedās in viā vidēre timēbō.", "I-will-{be-afraid||fear}-to-see the torches-in-the-road."],
        
//         	1.11: ["Taedamne in īnsulā vidētis?", "Do-you-see (plural) the torch-in/on-the-island?"],
        
//         	1.12: ["Turbamne fēminārum in īnsulā vidēs?", "Do-you-see the crowd-of-women on/in-the-island?"],
        
//         	1.13: ["Cum poētā ē portīs in viam ambulō", "I-walk with-the-poet  out-of-the-gates into/onto-the-street."],
        
//         	1.14: ["Poētae et poenam et fāmam timent.", "The poets fear both-money-and-fame/glory."],
        
//         	1.15: ["Viās turbā implēbunt.", "They-will-fill the roads with-a-crowd/uproar."],
        
//         	1.16: ["Nautae fēminās taedīs terrēbant", "The sailors were-terrifying the women with-torches."],
        
//         	1.17: ["Et pecūniā et corōnīs poētās dōnābis.", "You-will-present/reward the poets with-both-money-and-crowns."],
        
//         	1.18: ["Erisne (eruntne, erantne, suntne) in īnsulā cum rēgīnā?", "Will-you-be on-the-island with-the-queen?"],
        
//         	1.19: ["Fēminae est fōrma, fāma nautae; fēminīs est fōrma, fāma nautīs.", "To-a-women is beauty, fame (is) to-a-sailor; to-women is beauty, fame (is) to-sailors."],
        
//         	1.20: ["Poena nautārum erat cūra rēgīnae.", "The penalty-of-the-sailors was-anxiety/concern to/of-the-queen."],
        
//         	1.21: ["Rēgīnaene corōnam vidēre optābās?", "Were-you-wanting/choosing to-see the crown of-the-queen?"],
        
//         	1.22: ["Rēgīnae dē patriā cūram habent.", "The queens-have-anxiety concerning/about-the-country/homeland."],
        
//         	1.23: ["Nauta enim poenās dare nōn optat.", "Indeed the sailor does-not-want to pay the penalty."],
        
//         	1.24: ["Ex aquā ambulāmus.", "We walk {from||out-of}-water."],  
        
//         	1.25: ["Patria poētae est īnsula.", "The country/homeland-of-the-poet is-an-island."],
        
//         	1.26: ["Īnsulam esse patriam habēbat.", "He/she/it-was-considering the island to-be-his-country/homeland."],
        
//         	1.27: ["Vidēre taedās patriae est nautīs cūra.", "To-see-the-torches-of-the-country/homeland is an anxiety to/for-the-sailors."]
//         }
//     },

//     mf2 : {
        
 	
//  	2.2: ["Sententiam mūtābit. Sententiam mūtāre dubitat. Sententiam mūtāre incēperat. Sententiam mūtāvit.", "He/she/it-will-change his-opinion. He/she/it-hesitates-to-change his-opinion. He/she/it-had-begun-to-change his-opinion. He/she/it-changed his-opinion."],

//  	2.3: ["Nisi fēminae nautās sententiārum dē incolīs dāmnābunt, incolae in prōvinciā nōn labōrābunt.", "{If-the-women-do-not-condemn||unless-the-women-condemn} the-sailors for-their-opinions, the-inhabitants will-not-labor in-the-province."],

//  	2.4: ["Incolae sī fēminās īnsulae dāmnārent, nautae ad terram venīre nōn dubitārent.", "If-the-inhabitants-were-condemning the-women of-the-island, the-sailors would-not-be-hesitating-to-come to/towards/toward-the-land."],

//  	2.5: ["Incolae sī īnsulae fēminās dāmnāvissent, nautae ad terram venīre nōn dubitāvissent.", "{If-the-inhabitants-of-the-island-had-condemned-the-women||if-the-inhabitants-had-condemned-the-women-of-the-island}, the-sailors-would-not-have-hesitated-to-come to-the-island."],

//  	2.6: ["Incolae sī īnsulae fēminās īnsidiārum dāmnent, nautae ad prōvinciam venīre nōn dubitent.", "{If-the-inhabitants-of-the-island-should-condemn-the-women||if-the-inhabitants-should-condemn-the-women-of-the-island} (on-a-charge-of) of/for-treachery/treacheries, the-sailors-would-not-hesitate-to-come to/towards-the-province."],

//  	2.7: ["Incolae sī fēminās in turbā dāmnābunt, nautae ad īnsulam venīre nōn dubitābunt.", "If-the-inhabitants-condemn-the-women-in-the-crowd, the-sailors-will-not-hesitate-to-come to/towards-the-island."],

//  	2.8: ["Incolae sī fēminās invidiae damnāverint, nautae sententiam dē fāmā incolārum mūtāre nōn dubitābunt.", "If-the-inhabitants-condemn the-women (on-a-charge-of) of/for-envy{ill-will}, the-sailors will-not-hesitate-to-change-their-opinion concerning-the-fame/glory-of-the-inhabitants."],

//  	2.9: ["Sī nautae undās timēbunt, in terrā semper erunt.", "If-the-sailors-fear-the-waves, they-will always be on/in-the-land."], 

//  	2.10: ["Puella dē glōriā et fāmā poētārum cōgitat.", "The-girl thinks/ponders concerning-the-glory-and-fame-of-the-poets."], 

//  	2.12: ["Sī nautae noxās ā puellīs pepulissent, et glōriam et fāmam cēpissent.", "If-the-sailors-had-pushed the-injuries {from/away-from} the-girls, they-would-have-seized/captured both-glory-and-fame."],

//  	2.13: ["Dē nātūrā animae nec cum poēta sēnseram nec sententiam mūtāre optāveram.", "Concerning the-nature-of-the-soul, I-had-wanted/chosen neither to-agree-with-the-poet nor (had-I-wanted) to-change-my/his-opinion"],

//  	2.14: ["Terram sī poētae incoluissent, nautās ē prōvinciā expulissent et nātūram patriae mūtāvissent.", "{If-the-poets-had-inhabited-the-earth/land||If-they-had-inhabited-the-land/earth-of-the-poet}, they-would-have-expelled the-sailors {out-of||from}-the-province."],

//  	2.15: ["Sī nautās rēgīnae superāvissem, prōvinciam tenērem.", "If-I-had-wanted-to-conquer/overcome the-sailors of-the-queen, I-would-be-holding/possessing the-province."],

//  	2.20: ["Sī Hannibal ad portās prōvinciae vēnisset, incolās taedīs monuissem.", "If-Hannibal-had-come to/toward-the-gates-of-the-province."], 

//  	2.21: ["Nisī pecūniam in cellā cēlāvissēs, rēgīna nautās nec dāmnāvisset nec ē prōvinciā expelleret.", "{If-you-had-concealed/hidden||unless-you-had-concealed/hidden} the-money in-the-storeroom."],

//  	2.22: ["Et glōria incolīs prōvinciae et culpa, sed poēta dē nātūrā incolārum tacuit.", "Both-gloria-and-blame-(are,-i.e.-belong) to-the-inhabitants-of-the-province, but the-poet was-silent concerning/about-the-nature-of-the-inhabitants."],

//  	2.24: ["Sub lūnā labōrāverāmus.", "We-had-labored under-the-moon."], 

//  	2.27: ["Vīta rēgīnae nihil dedit nisī glōriam fāmamque.", "Life-gave-nothing to-the-queen {except||if-not} glory and fame."],

//  	2.28: ["Puellāsne dē morā nautārum monuistī? Puellās monui, sed nīl timent.", "{Did-you-warn||you-warned} the-girls concerning/about-the-delay of-the-inhabitants."], 

// }



// var mf_translation_map_3 = {
// 	3.1: ["Nautae validī magnā cum cūrā pūgnābant ut incolās īnsulae superārent.", "The-strong-sailors {with-great-care||very-carefully} were-fighting in-order-that-they-might-conquer/overcome the-inhabitants-of-the-island."],
// 	3.4: ["Rēgīna magnum gladium virō bonō dabit ut cum Rōmānīs in campō pūgnet.", "The-queen will-give the-large/great-sword to-the-good-man in-order-that he/she-(may)-fight with-the-Romans in-the-field/plain."],
// 	3.5: ["Marcus, vir magnus et bonus, corōnam ad poētam portāvit.", "Marcus, {a-great/large-and-good-man||a-man-great-and-large}, carried the-crown to/towards-the-poet."],
// 	3.6: ["Nautae Rōmānī vēla ventīs dextrīs dabant nē virī malī campōs tenērent.", "The-Roman-sailors {were-giving-their-sails-to-fortunate/favorable-winds||were-setting-sail with-favorable/fortunate-winds} in-order-that the-evil-men not-hold the-fields/plains"],
// 	3.8: ["Līberī malōs multīs gladiīs superābunt nē servī miserī sint.", "The-free-(men) will-conquer/overcome the-evil-(men) {by-means-of||with}-many-swords in-order-that {they-may-not-be miserable-slaves||the-slaves-may-not-be-miserable}."],
// 	3.9: ["Regina pulchra poētae caecō dōnum bonum dederat ut verba clara semper audīret.", "The-beautiful-queen had-given a-good-gift to-the-blind-poet in-order-that she/he/it-may-hear famous/clear-words."],
// 	3.11: ["Virī validī nautās ōrāvērunt ut incolās prōvinciae bellō et gladiīs superārent.", "The-strong-men begged the-sailors that they-overcome the-inhabitants of-the-province {by-means-of||with} war and swords."],
// 	3.12: ["Sī dōnum bonum poētae Marcō darētis, magna verba cum dīligentia scrīberet.", "If-you-(plural)-were-giving a-good-gift {to-the-poet-Marcus||to-Marcus-the-poet}, he-would-be-writing great-words {with-diligence||diligently}."],
// 	3.13: ["Si verba mala puerorum audīvistis, laetī nōn erātis.", "If-you-(plural)-heard the-evil/bad-words-of-the-boys, you-(plural)-were-not-happy."],
// 	3.14: ["Līberī prōvinciae servī fuissent, nisī nautae Rōmānī bellum in patriā gessissent.", "The-free-(men)-of-the-province would-have-been slaves, if-the-Roman-sailors-had-not-waged/conducted-war in-the-country/homeland."],
// 	3.15: ["Nisī tacuisset, miserum monuissem ut lacrimās cēlāret.", "If-he-had-not-{kept-silent||been-silent}, I-would-have-warned the-miserable-man that-he-conceal his-tears."],
// 	3.16: ["Nisī tacuerint, miserōs monēbō ut lacrimās cēlent.", "If-they-{do-not-keep-silent||are-not-silent}, I-will-warn the-miserable-(men) that-they-conceal their-tears."],
// 	3.19: ["Poētae bonō sī pecūniam dedissēs, multa dē agrīs prōvinciae scrīpsisset ut incolīs magna fāma esset.", "If-you-had-given money to-the-good-poet, he-would-have-written many-(things) concerning/about-the-fields-of-the-province in-order-that great-fame-might-be-(i.e.-belong) to-the-inhabitants."],
// 	3.22: ["Vīdistisne magnum bellum in campīs? Fēminae sī bellum vīdissent, nātōs magnīs cum lacrimīs monuissent ut malōs ex agrīs patriae expellerent.", "Did-you-(plural)-see-the-great-war-in-the-fields/plains? If-the-women-had-seen-the-war, they-would-have-warned-their-sons {with-great-tears||very-tearfully} that they-expel the-evil-(men) {out-of||from}-the-fields-of-the-country/homeland."],
// 	3.24: ["Nisī malōs saxīs gladiīsque ē cellā pepulissēmus, patriam cum glōriā nōn tenuissēmus, et nunc servī essēmus.", "If-we-had-pushed the-evil-men {out-of||from}-the-storeroom {by-means-of||with}-stones and swords"],
// 	3.25: ["Ā rēgīnā petīvistī ut veniam incolīs daret.", "From-the-queen you-requested that-she-give favor/indulgence/kindness to-the-inhabitants."],
// 	3.26: ["Poēta validōs in agrīs monuit ut clārum gladium sub saxō peterent.", "The-poet warned the-strong-men in-the-fields that they-seek the-famous/bright-sword beneath-the-stone."]
// },





// var mf_translation_map_4 = {
// 	4.1: ["Nautae malī ab incolīs līberīs in viam āctī sunt.", "The-evil-sailors were-driven/led into-the-path/street by-the-free-inhabitants."],
// 	4.3: ["Sī oppidum validum superābitur, līberī erunt servī.", "If-the-strong-town is-conquered/overcome, the free-(men) will-be-slaves."]
// 	4.4: ["Liber ā poēta cum dīligentia scrīptus est ut magnum perīculum bonīs mōnstrārētur.", "The-book was-written by-the-poet {with-diligence||diligently} in-order-that the-great-danger might be-shown to-the-good-men."],
// 	4.5: ["Sī litterae ā rēgīnā pulchrā ad honestōs missae essent, monitī essent ut bellum gererent, et oppidum ab amīcīs malōrum nōn superātum esset.", "If the letter/letters had-been-sent by-the-beautiful-queen to/toward-the-honorable/honest-men, they-would-have-been-warned that they wage-war and the town would-not-have-been-overcome by-the-friends of-the-evil-(men)."],
// 	4.6: ["Urna pulchra in mēnsā ā fēminīs rēgīnae pōnētur ut cibō aquāque impleātur.", "The-beautiful-urn will-be-placed on/onto-the-table by-the-women of-the-queen in-order-that it might-be-filled with-food-and (with) water."],
// 	4.10: ["Magna cum dīligentiā bellum gestum est nē ab incolīs prōvinciae Rōmānae malīs rēgnum superārētur.", ""], 
// 	4.11: ["Sī verba vēra magnō studiō ā virīs bonīs honestīsque legentur et intellegentur, perīculum bellī dēlēbitur.", ""],
// 	Sī multae urnae ā puerīs factae essent, dōna pecūniae ā rēgīnā nōn datae essent.", ""],
// 	4.15: ["Fīlia rēgīnae bonae ad āram ā nautīs Rōmānīs ducta est ut honesta dīs agerentur.", ""],
// 	4.16: ["Perīculum rēgnō magnum fīliīs līberōrum vidētur.", ""], 
// 	4.17: ["Circum oppidum dūcēbāris ut ā bonīs malīsque vidērēre.", ""],
// 	4.20: ["Sī litterae fīliō honestō mittantur, respondeatne?", ""],
// 	4.21: ["Ōrābimus ut urnae aquā ā puellā impleantur.", ""],
// 	4.22: ["Sī magna bella ab incolīs gerentur, rēgnum vērē dēlēbitur.", ""],
// 	4.24: ["Multa vērō pecūnia in mēnsā pōnitur ut honestī pecūniam capiant et magnum tēctum fīliīs faciant.", "Truly/indeed, much-money is-placed on-the-table in-order-that honorable/honest-(men) may take the-money and make a-great-house/home/roof for-their-sons."],
// 	4.25: ["Nisī ab amīcīs trāditus esset, vītam nōn perdidisset.", "If-he-had-not-been-betrayed by-his-friends, he-would-not-have-lost his-life."],
// 	4.27: ["Āra aeterna ab incolīs oppidī facta est ut dōna dīs cāra darentur.", "An-eternal-altar was-made by-the-inhabitants-of-the-town in-order-that gifts dear to-the-gods might be-given."],
// },

// }

//below is a testing module
/*
var ALL_MODULES2 = {

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
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0, 'quick': 0, 'etymology': 0.2},
        // // mode_ratio: {'quick': 1},
        modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        // mode_ratio: {'latin': 0.9, 'drop': 0.2, 'quick': 0.2, 'etymology': 0.05},
        //testing version for etymology below, real version above
        mode_ratio: {'latin': 0.01, 'drop': 0.01, 'quick': 0.01, 'etymology': 0.9},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        // level: [1, 20],
        etym_level: 1,
        grammar_level: 20,
        latin_drop_level: [110, 120],
        latin_extra_level: 1,
        latin_level: [1, 20],
        sentence_levels: {
            'english': 1,
            'latin': 1
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 2
    },

    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry', 'fear', 'see', 'scare'
                 ],
        // roots: ['CARN', 'DE', 'HERBI', 'OMNI', 'SCI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_1.jpg",
        lightbox_images: ["../resources/animal_images/crow01.jpg", "../resources/animal_images/crow02.jpg", "../resources/animal_images/crow03.jpg", "../resources/animal_images/crow04.jpg", "../resources/animal_images/crow05.jpg", "../resources/animal_images/crow06.jpg", "../resources/animal_images/crow07.jpg", "../resources/animal_images/crow08.gif", "../resources/animal_images/crow09.gif", "../resources/animal_images/crow10.gif", "../resources/animal_images/crow11.jpg", "../resources/animal_images/crow12.jpg", "../resources/animal_images/crow13.jpg", "../resources/animal_images/crow14.jpg"],
        etym_level: 1,
        grammar_level: 1,
        latin_drop_level: [110, 130],
        latin_extra_level: 10,
        latin_level: 20,
        sentence_levels: {
            'english': 2,
            'latin': 2
        },
        tutorial: {0 : "tutorial0002.txt"},
        next: 3
    },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 
                 'kangaroo', 'chicken', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak'
                 ],
        // roots: ['ANN/ENN', 'CARN', 'DE', 'HERBI', 'OMNI', 'PSEUD/PSEUDO',
        // 'SCI', 'SEMI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_2.jpg",
        lightbox_images: ["../resources/animal_images/horse01.jpg", "../resources/animal_images/horse02.jpg", "../resources/animal_images/horse03.jpg", "../resources/animal_images/horse04.jpg", "../resources/animal_images/horse05.jpg", "../resources/animal_images/horse06.jpg", "../resources/animal_images/horse07.jpg", "../resources/animal_images/horse08.gif", "../resources/animal_images/horse09.jpg", "../resources/animal_images/horse10.jpg", "../resources/animal_images/horse11.jpg"],
        etym_level: 20,
        grammar_level: 20,
        latin_drop_level: [210, 230],
        latin_extra_level: 20,
        latin_level: 30,
        sentence_levels: {
            'english': 2,
            'latin': 2
        },
        tutorial_content: false,
        tutorial_position: null, 
        next: 4
    },
    "4": {
        id: 4,
        icon_name: "bear",
        icon_url:"../resources/bear.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog','eagle', 
                 'kangaroo', 'snail', 'chicken','spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'hear', 'find'
                 ],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_3.jpg",
        lightbox_images: ["../resources/animal_images/bear01.jpg", "../resources/animal_images/bear02.jpg", "../resources/animal_images/bear03.jpg", "../resources/animal_images/bear04.jpg", "../resources/animal_images/bear05.jpg", "../resources/animal_images/bear06.jpg", "../resources/animal_images/bear07.jpg",  "../resources/animal_images/bear08.jpg",  "../resources/animal_images/bear09.jpg", "../resources/animal_images/bear10.jpg", "../resources/animal_images/bear11.jpg", ],
        etym_level: 30,
        grammar_level: 20,
        latin_drop_level: [220, 230],
        latin_extra_level: 30,
        latin_level: [30, 40],
        sentence_levels: {
            'english': 2,
            'latin': 2
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 5
    },
    
    
    "5": {
        id: 5,
        icon_name: "bull",
        icon_url:"../resources/bull.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken','spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find'
                 ],
        // parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_4.jpg",
        lightbox_images: ["../resources/animal_images/bull01.jpg", "../resources/animal_images/bull02.jpg", "../resources/animal_images/bull03.jpg", "../resources/animal_images/bull04.jpg", "../resources/animal_images/bull05.jpg", "../resources/animal_images/bull06.jpg", "../resources/animal_images/bull07.jpg",  "../resources/animal_images/bull08.jpg",  "../resources/animal_images/bull09.jpg", "../resources/animal_images/bull10.jpg", "../resources/animal_images/bull11.jpg", ],
        etym_level: 40,
        grammar_level: 20,
        latin_drop_level: [220, 240],
        latin_extra_level: 40,
        latin_level: 40,
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 6
    },
    

    
    "6": {
        id: 6,
        icon_name: "lizard",
        icon_url:"../resources/lizard.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'fly', 'scorpion', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall'
                 ],
        //parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective', 'personal pronoun'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/lizard01.jpg", "../resources/animal_images/lizard02.jpg", "../resources/animal_images/lizard03.jpg", "../resources/animal_images/lizard04.jpg", "../resources/animal_images/lizard05.jpg", "../resources/animal_images/lizard06.jpg", "../resources/animal_images/lizard07.jpg",  "../resources/animal_images/lizard08.jpg",  "../resources/animal_images/lizard09.jpg", "../resources/animal_images/lizard10.jpg"],
        etym_level: 40,
        grammar_level: 20,
        latin_drop_level: [40, 50],
        latin_extra_level: 50,
        latin_level: 40,
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 7
    },
    
    ////introducing first declension
    
    "7": {
        id: 7,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'bee', 'kangaroo', 'snail', 'pig', 'chicken', 'centipede', 'millipede', 
                 'octopus', 'fly', 'scorpion', 'crocodile', 'spider', 'queen', 'eat', 
                 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push', 'rule', 
                 'speak', 'grab', 'hear', 'find', 'walk', 'shout', 'sit', 'fall', 'flee', 'sleep'
                 ],
        //parts_of_speech_filter: ['subject', 'verb', 'object', 'adjective', 'adverb', 
        //                        'subordinating conjunction', 'coordinating conjunction', 
        //                        'possessive adjective', 'personal pronoun', 'preposition', 
        //                        'definite article', 'indefinite article'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/frog01.jpg", "../resources/animal_images/frog02.jpg", "../resources/animal_images/frog03.jpg", "../resources/animal_images/frog04.jpg", "../resources/animal_images/frog05.jpg", "../resources/animal_images/frog06.jpg", "../resources/animal_images/frog07.jpg",  "../resources/animal_images/frog08.jpg",  "../resources/animal_images/frog09.jpg", "../resources/animal_images/frog10.jpg"],
        etym_level: 50,
        grammar_level: 20,
        latin_drop_level: [110, 120],
        latin_extra_level: 20,
        latin_level: [1, 20],
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial_content: false,
        tutorial_position: null,
        next: 8
    },
    "8": {
        id: 8,
        icon_name: "eagle",
        icon_url: "../resources/eagle.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/eagle01.jpg", "../resources/animal_images/eagle02.jpg", "../resources/animal_images/eagle03.jpg", "../resources/animal_images/eagle04.jpg", "../resources/animal_images/eagle05.jpg", "../resources/animal_images/eagle06.jpg", "../resources/animal_images/eagle07.jpg",  "../resources/animal_images/eagle08.jpg",  "../resources/animal_images/eagle09.jpg", "../resources/animal_images/eagle10.jpg"],
        etym_level: 50,
        grammar_level: 20,
        latin_drop_level: [120, 130],
        latin_extra_level: 30,
        latin_level: [10, 30],
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 9
    },
    "9": {
        id: 9,
        icon_name: "chicken",
        icon_url: "../resources/chicken.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/chicken01.jpg", "../resources/animal_images/chicken02.jpg", "../resources/animal_images/chicken03.jpg", "../resources/animal_images/chicken04.png", "../resources/animal_images/chicken05.jpg", "../resources/animal_images/chicken06.jpg", "../resources/animal_images/chicken07.png",  "../resources/animal_images/chicken08.jpg",  "../resources/animal_images/chicken09.jpg", "../resources/animal_images/chicken10.jpg"],
        etym_level: 60,
        grammar_level: 20,
        latin_drop_level: [130, 140],
        latin_extra_level: 40,
        latin_level: [20, 30],
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 10
    },
    "10": {
        id: 10,
        icon_name: "spider",
        icon_url: "../resources/spider.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/spider01.jpg", "../resources/animal_images/spider02.jpg", "../resources/animal_images/spider03.jpg", "../resources/animal_images/spider04.jpg", "../resources/animal_images/spider05.jpg", "../resources/animal_images/spider06.jpg", "../resources/animal_images/spider07.jpg", "../resources/animal_images/spider08.jpg", "../resources/animal_images/spider09.gif", "../resources/animal_images/spider10.jpg"],
        // level: [1, 20],
        etym_level: 60,
        grammar_level: 20,
        latin_drop_level: [140, 150],
        latin_extra_level: 50,
        latin_level: [30, 40],
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 11
    },
    "11": {
        id: 11,
        icon_name: "fly",
        icon_url: "../resources/fly.gif",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/fly01.jpg", "../resources/animal_images/fly02.jpg", "../resources/animal_images/fly03.jpg", "../resources/animal_images/fly04.gif", "../resources/animal_images/fly05.jpg", "../resources/animal_images/fly06.gif", "../resources/animal_images/fly07.png", "../resources/animal_images/fly08.jpg", "../resources/animal_images/fly09.jpg", "../resources/animal_images/fly10.jpg"],
        etym_level: 70,
        grammar_level: 20,
        latin_drop_level: 150,
        latin_extra_level: 50,
        latin_level: 40,
        sentence_levels: {
            'english': 4,
            'latin': 4
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 12
    },
    "12": {
        id: 12,
        icon_name: "snail",
        icon_url: "../resources/snail.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/snail01.jpg", "../resources/animal_images/snail02.jpg", "../resources/animal_images/snail03.jpg", "../resources/animal_images/snail04.jpg", "../resources/animal_images/snail05.gif", "../resources/animal_images/snail06.jpg", "../resources/animal_images/snail07.jpg", "../resources/animal_images/snail08.jpg", "../resources/animal_images/snail09.gif", "../resources/animal_images/snail10.jpg"],
        // level: [1, 20],
        etym_level: 70,
        grammar_level: 20,
        latin_drop_level: [30, 40],
        latin_extra_level: 50,
        latin_level: 40,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 13
    },
    "13": {
        id: 13,
        icon_name: "millipede",
        icon_url: "../resources/millipede.png",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/millipede01.jpg", "../resources/animal_images/millipede02.jpg", "../resources/animal_images/millipede03.jpg", "../resources/animal_images/millipede04.jpg", "../resources/animal_images/millipede05.jpg", "../resources/animal_images/millipede06.gif", "../resources/animal_images/millipede07.jpg", "../resources/animal_images/millipede08.jpg", "../resources/animal_images/millipede09.png", "../resources/animal_images/millipede10.jpg"],
        etym_level: 80,
        grammar_level: 20,
        latin_drop_level: [40, 50],
        latin_extra_level: 120,
        latin_level: 40,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 14
    },
    "14": {
        id: 14,
        icon_name: "kangaroo",
        icon_url: "../resources/kangaroo.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 80,
        grammar_level: 20,
        latin_drop_level: 50,
        latin_extra_level: 130,
        latin_level: 40,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 15
    },
    
    
    ///adding third declension
    
    "15": {
        id: 15,
        icon_name: "lion",
        icon_url: "../resources/lion.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/lion01.jpg", "../resources/animal_images/lion02.jpg", "../resources/animal_images/lion03.jpg", "../resources/animal_images/lion04.jpg", "../resources/animal_images/lion05.jpg", "../resources/animal_images/lion06.jpg", "../resources/animal_images/lion07.jpg", "../resources/animal_images/lion08.jpg", "../resources/animal_images/lion09.jpg", "../resources/animal_images/lion10.jpg"],
        etym_level: 80,
        grammar_level: 20,
        latin_drop_level: [110, 120],
        latin_extra_level: 30,
        latin_level: 10,
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 16
    },
    "16": {
        id: 16,
        icon_name: "mouse",
        icon_url: "../resources/mouse.jpg",
        threshold: 10,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        modes_allowed: [0, 1, 2, 4],
        mode_ratio: {'latin': 0.8, 'drop': 0.3, 'quick': 0.3, 'etymology': 0.05},
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 'love', 'attack', 
                'carry'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/mouse01.jpg", "../resources/animal_images/mouse02.jpg", "../resources/animal_images/mouse03.jpg", "../resources/animal_images/mouse04.jpg", "../resources/animal_images/mouse05.jpg", "../resources/animal_images/mouse06.jpg", "../resources/animal_images/mouse07.jpg", "../resources/animal_images/mouse08.jpg", "../resources/animal_images/mouse09.jpg", "../resources/animal_images/mouse10.jpg"],
        etym_level: 80,
        grammar_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: [10, 20],
        sentence_levels: {
            'english': 5,
            'latin': 5
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    }
    
    //todo uncomment the following when images are ready
    /*
    "17": {
       id: 17,
        icon_name: "bird",
        icon_url: "../resources/bird.png",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 18
    },
    "18": {
        id: 18,
        icon_name: "dog",
        icon_url: "../resources/dog.png",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 19
    },
    "19": {
        id: 19,
        icon_name: "cerberus",
        icon_url: "../resources/cerberus.png",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 20
    },
    "20": {
        id: 20,
        icon_name: "rabbit",
        icon_url: "../resources/rabbit.jpg",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: 21
    },
    "21": {
        id: 21,
        icon_name: "cow",
        icon_url: "../resources/cow.jpg",
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
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_sheet_0.jpg",
        lightbox_images: ["../resources/animal_images/kangaroo01.jpg", "../resources/animal_images/kangaroo02.jpg", "../resources/animal_images/kangaroo03.jpg", "../resources/animal_images/kangaroo04.jpg", "../resources/animal_images/kangaroo05.jpg", "../resources/animal_images/kangaroo06.jpg", "../resources/animal_images/kangaroo07.jpg", "../resources/animal_images/kangaroo08.jpg", "../resources/animal_images/kangaroo09.jpg", "../resources/animal_images/kangaroo10.jpg"],
        etym_level: 10,
        grammar_level: 10,
        latin_drop_level: [20, 40],
        latin_extra_level: 20,
        latin_level: [1, 20],
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    },
};
*/

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


