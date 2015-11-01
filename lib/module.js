
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
        threshold: 10,
        modes_allowed: ["quick_mode"],
        next: 2
    },

    "2": {
        id: 2,
        icon_name: "crow",
        icon_url:"../resources/crow.png",
        threshold: 20,
        modes_allowed: ["quick_mode"],
        next: null
    }

};



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


