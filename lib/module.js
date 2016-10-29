//I create a dictionary and I map an id I pick to an object which contains the id itself
//modes 0 = drop 1 = mcmode 2 = quick 3 = genericdrop


//todo make all the mode names consistent (keep them all lower case)
var game_mode_list = ['drop', 'latin', 'quick', 'etymology', 'input', 'mf', 'syntax', 'kck'];

var game_mode_map = {
    'drop': 0,
    'latin': 1,
    'quick': 2,
    // 'genericdrop': 3,
    'etymology': 4,
    'input': 5,
    'mf': 6,
    'syntax': 7,
    'kck': 8
}

var get_module_order = function () {
    var order = [];
    var m = ALL_MODULES[0]; // start is always 0
    // console.log("DEBUG 10-9-16 m = ", m);
    while(m.next){
        m = ALL_MODULES[m.next];
        order.push(m.id);
        //console.logm.icon_name);
    }
    
    return order;
    
}



//we want different users to have access to different modules
//e.g. college players should have mf modules and 2nd graders should have different modules
//at login we call this function passing in an argument such as "mf_modules"
//for now we will assume "ALL_MODULES" is the default and we will reset that for mf players (players whose email terminates in .mf)
//down the road we will make every player set a specific module
function set_module_regime(module_regime) {
    ALL_MODULES = module_regime;
}


//below is the real module (but we absolutely must change the thresholds of later units, which were set to 1 for testing and never changed back)
var ALL_MODULES = {

    "0": {
        id: 0,
        level: 1,
        next: 1
    },
    /*
    "1": {
        id: 1,
        icon_name: "wolf",
        icon_url: "../resources/Wolf.png",
        threshold: 1,
        mode_ratio: {'kck': 0.9, 'quick': 0.0000000001, 'etymology': .00003},
        // mode_ratio: {'latin': 0.9, 'quick': 0.00001, 'etymology': .000009},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'dog', 'eagle', 
                 'eat', 'love', 'attack', 'carry', 'fear', 'see', 'scare', 'push'],
        // roots: ['CARN', 'HERBI', 'OMNI', 'VOR/VOUR'],
        // parts_of_speech_filter: ['subject', 'verb', 'object'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        // cheat_sheet: "../resources/cheat_sheets/cheat_sheet_z.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        // level: [1, 20],
        etym_level: 40,
        grammar_level: 20,
        kck_level: 1,
        // latin_drop_level: [1, 100],
        latin_drop_level: 400,
        latin_extra_level: 30,
        latin_level: [10, 30],
        latin_cosmetic_level: 1,
        sentence_levels: {
            'english': 1,
            'latin': 1
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 2
    },
    */
    // 2016 wolf
    "1": {
        id: 1,
        icon_name: "wolf",
        icon_url: "../resources/Wolf.png",
        threshold: 10,
        // mode_ratio: {'latin': 0.00000000007, 'quick': 0.5, 'etymology': 0.00003},
        mode_ratio: {'kck': 0.9, 'quick': 0.0000000001, 'etymology': .000009},
        // mode_ratio: {'kck': 0.9, 'latin': 0.0001, 'quick': 0.0000000001, 'etymology': .000009},
        // mode_ratio: {'kck': 0.0000000009, 'latin': 0.0001, 'quick': 0.0000000001, 'etymology': .9},
        // mode_ratio: {'kck': 0.0000000009, 'latin': 0.1, 'quick': 0.0000000001, 'etymology': .0000009},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: [ 
                // 'zeus', 'aphrodite', 'ares', 'poseidon',
                // 'hermes','ouranus', 'cronos', 'hades', 
                'horse', 'bear', 'wolf', 'crow', 'bull', 'frog', 'eagle', 
                'dog', 'lion', 'mouse',
                 'eat', 'love', 'attack', 'carry'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        // etym_level: 1,
        etym_level: 480,
        grammar_level: 20,
        kck_level: 1,
        // latin_drop_level: [1, 100],
        latin_drop_level: [1, 40],
        latin_extra_level: 20,
        latin_level: 20,
        latin_cosmetic_level: 1,
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
        threshold: 1,
        // mode_ratio: {'kck': 0.9, 'quick': 0.0000000001, 'etymology': .00003},
        mode_ratio: {'kck': 0.9, 'quick': 0.0000000001, 'etymology': .000009},
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
        kck_level: 10,
        // latin_drop_level: [200, 300],
        latin_drop_level: 200,
        latin_extra_level: 10,
        latin_level: [30, 40],
        latin_cosmetic_level: 1,
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
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        mode_ratio: {'kck': 0.9, 'quick': 0.0000000001, 'etymology': .00003},
        // mode_ratio: {'latin': 0.9, 'quick': 0.000000001, 'etymology': .0009},
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
        kck_level: 20,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: [80, 130],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [220, 230],
        latin_extra_level: 30,
        latin_level: [100, 130],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [220, 240],
        latin_extra_level: 40,
        latin_level: [120, 140],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [40, 50],
        latin_extra_level: 50,
        latin_level: [130, 140],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [110, 120],
        latin_extra_level: 20,
        latin_level: 140,
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [120, 130],
        latin_extra_level: 30,
        latin_level: 140,
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [130, 140],
        latin_extra_level: 40,
        latin_level: 140,
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [140, 150],
        latin_extra_level: 50,
        latin_level: [140, 200],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: 150,
        latin_extra_level: 50,
        latin_level: [140, 210],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [30, 40],
        latin_extra_level: 50,
        latin_level: [140, 210],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [40, 50],
        latin_extra_level: 120,
        latin_level: [140, 210],
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: 50,
        latin_extra_level: 130,
        latin_level: 210,
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [110, 120],
        latin_extra_level: 30,
        latin_level: 220,
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        latin_cosmetic_level: 1,
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
        kck_level: 1,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        latin_cosmetic_level: 1,
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


//testing mf module
var MF_MODULES = {

    "0": {
        id: 0,
        level: 1,
        next: 1
    },
    "1": {
        id: 1,
        icon_name: "mf1",
        icon_url: "../resources/numbers/one.jpg",
        threshold: 4,
        modes_allowed: [2, 4, 6, 7],
        mode_ratio: {'mf': 0.0000000000009, 'quick': 0.000000000000000001, 'etymology': .00000000000000001, 'syntax': 0.9},
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
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        etym_level: 40,
        grammar_level: 20,
        latin_drop_level: [1, 100],
        latin_extra_level: 30,
        latin_level: [10, 30],
        sentence_levels: {
            'english': 1,
            'latin': 1
        },
        game_change_method: 'one_game',
        tutorial: {0 : "tutorial0001.txt"},   
        next: 2
    },
    "2": {
        id: 2,
        icon_name: "mf1",
        icon_url: "../resources/numbers/two.jpg",
        threshold: 4,
        modes_allowed: [2, 4, 6, 7],
        mode_ratio: {'mf': 0.0000000000009, 'quick': 0.000000000000000001, 'etymology': .00000000000000001, 'syntax': 0.9},
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
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        etym_level: 40,
        grammar_level: 20,
        latin_drop_level: [1, 100],
        latin_extra_level: 30,
        latin_level: [10, 30],
        sentence_levels: {
            'english': 1,
            'latin': 1
        },
        game_change_method: 'one_game',
        tutorial: {0 : "tutorial0001.txt"},   
        next: 3
    },
    "3": {
        id: 3,
        icon_name: "mf3",
        icon_url: "../resources/numbers/three.jpg",
        threshold: 4,
        modes_allowed: [2, 4, 6],
        mode_ratio: {'mf': 0.9, 'quick': 0.000000000000000001, 'etymology': .00000000000000001},
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
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        etym_level: 40,
        grammar_level: 20,
        latin_drop_level: [1, 100],
        latin_extra_level: 30,
        latin_level: [10, 30],
        sentence_levels: {
            'english': 1,
            'latin': 1
        },
        game_change_method: 'one_game',
        tutorial: {0 : "tutorial0001.txt"},   
        next: null
    }
};


/* SOME NOTES ON MODULES
latin_cosmetic_level only has one choice (=1) controls upper and lower case
*/

var ALL_MODULES_2016 = {

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
        mode_ratio: {'latin': 0.7, 'quick': 0.3, 'etymology': .3},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 
                 'eat', 'love', 'attack', 'carry'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/wolf01.jpg", "../resources/animal_images/wolf02.jpg", "../resources/animal_images/wolf03.jpg", "../resources/animal_images/wolf04.jpg", "../resources/animal_images/wolf05.jpg", "../resources/animal_images/wolf06.jpg", "../resources/animal_images/wolf07.jpg", "../resources/animal_images/wolf08.jpg", "../resources/animal_images/wolf09.jpg", "../resources/animal_images/wolf10.jpg", "../resources/animal_images/wolf11.jpg"],
        etym_level: 10,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [1, 40],
        latin_extra_level: 20,
        latin_level: 10,
        latin_cosmetic_level: 1,
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
        threshold: 4,
        mode_ratio: {'latin': 0.7, 'quick': 0.3, 'etymology': .3},
        submodule : {
            reward1: 4,
            reward2: 2,
            reward3: 1,
            penalty: 2,
            threshold: 10,
            max_incorrect_streak: 3
        },
        lexicon: ['horse', 'bear', 'wolf', 'crow', 'bull', 'eat', 
                 'love', 'attack', 'carry'],
        cheat_sheet: "../resources/cheat_sheets/cheat_h.jpg",
        lightbox_images: ["../resources/animal_images/crow01.jpg", "../resources/animal_images/crow02.jpg", "../resources/animal_images/crow03.jpg", "../resources/animal_images/crow04.jpg", "../resources/animal_images/crow05.jpg", "../resources/animal_images/crow06.jpg", "../resources/animal_images/crow07.jpg", "../resources/animal_images/crow08.gif", "../resources/animal_images/crow09.gif", "../resources/animal_images/crow10.gif", "../resources/animal_images/crow11.jpg", "../resources/animal_images/crow12.jpg", "../resources/animal_images/crow13.jpg", "../resources/animal_images/crow14.jpg"],
        etym_level: 10,
        grammar_level: 1,
        kck_level: 10,
        latin_drop_level: 20,
        latin_extra_level: 30,
        latin_level: [30, 40],
        latin_cosmetic_level: 1,
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
        threshold: 1,
        // modes_allowed: [0, 1, 2, 4],
        // mode_ratio: {'latin': 0.8, 'drop': 0.5, 'quick': 0.5, 'etymology': 0.2},
        mode_ratio: {'kck': 0.9, 'quick': 0.0000000001, 'etymology': .00003},
        // mode_ratio: {'latin': 0.9, 'quick': 0.000000001, 'etymology': .0009},
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
        etym_level: 20,
        grammar_level: 20,
        kck_level: 20,
        latin_drop_level: [10, 50],
        latin_extra_level: 40,
        latin_level: [80, 130],
        latin_cosmetic_level: 1,
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
        etym_level: 20,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [220, 230],
        latin_extra_level: 50,
        latin_level: [100, 130],
        latin_cosmetic_level: 1,
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
        etym_level: 30,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [220, 240],
        latin_extra_level: 40,
        latin_level: [120, 140],
        latin_cosmetic_level: 1,
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
        etym_level: 30,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [40, 50],
        latin_extra_level: 50,
        latin_level: [130, 140],
        latin_cosmetic_level: 1,
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
        etym_level: 40,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [110, 120],
        latin_extra_level: 20,
        latin_level: 140,
        latin_cosmetic_level: 1,
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
        etym_level: 40,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [120, 130],
        latin_extra_level: 30,
        latin_level: 140,
        latin_cosmetic_level: 1,
        sentence_levels: {
            'english': 3,
            'latin': 3
        },
        tutorial: {0 : "tutorial0001.txt"},   
        next: 9
    },
    //etym levels from now on increment by 10
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
        etym_level: 50,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [130, 140],
        latin_extra_level: 40,
        latin_level: 140,
        latin_cosmetic_level: 1,
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
        etym_level: 60,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [140, 150],
        latin_extra_level: 50,
        latin_level: [140, 200],
        latin_cosmetic_level: 1,
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
        etym_level: 70,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: 150,
        latin_extra_level: 50,
        latin_level: [140, 210],
        latin_cosmetic_level: 1,
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
        etym_level: 80,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [30, 40],
        latin_extra_level: 50,
        latin_level: [140, 210],
        latin_cosmetic_level: 1,
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
        etym_level: 90,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [40, 50],
        latin_extra_level: 120,
        latin_level: [140, 210],
        latin_cosmetic_level: 1,
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
        etym_level: 100,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: 50,
        latin_extra_level: 130,
        latin_level: 210,
        latin_cosmetic_level: 1,
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
        etym_level: 110,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [110, 120],
        latin_extra_level: 30,
        latin_level: 220,
        latin_cosmetic_level: 1,
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
        etym_level: 120,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        latin_cosmetic_level: 1,
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
        etym_level: 130,
        grammar_level: 20,
        kck_level: 1,
        latin_drop_level: [120, 140],
        latin_extra_level: 40,
        latin_level: 220,
        latin_cosmetic_level: 1,
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


