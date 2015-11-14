
//i create a dictionary and I map an id I pick to an object which contains the id itself
var ALL_MODULES = {

    "0": {
        id: 0,
        next: 1
    },

    "1": {
        id: 1,
        icon_name: "kangaroo",
        icon_url: "../resources/kangaroo.jpg",
        threshold: 2,
        modes_allowed: [1, 2],
        //
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        next: 2
    },

    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 2,
        modes_allowed: [1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        next: 3
    },
    "3": {
        id: 3,
        icon_name: "horse",
        icon_url:"../resources/horse.jpg",
        threshold: 2,
        modes_allowed: [1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        next: 4
    },
    "4": {
        id: 4,
        icon_name: "cow",
        icon_url:"../resources/cow.jpg",
        threshold: 2,
        modes_allowed: [1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
        next: 5
    },
    "5": {
        id: 5,
        icon_name: "frog",
        icon_url:"../resources/frog.gif",
        threshold: 2,
        modes_allowed: [1, 2],
        submodule : {
            reward: 2,
            penalty: 1,
            threshold: 6,
            max_incorrect_streak: 3
        },
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


