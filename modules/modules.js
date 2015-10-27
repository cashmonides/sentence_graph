//MODULES
//- module object
//- module id
//- icon name
//- icon url
//- threshold
//- percentages of each mode
//- level & data for each mode

//ordering options
// 1, 2, 3 (new insertions -> have to renumber everything)
// 100, 200, 300 (new insertions = 150 e.g.)
// store a list with ids
// linked list

/*

["kangaroo", "crow", "dog"]
["kangaroo1", "crow1", "dog1"]

["1hd6q", "71ihu"]







[1, 2, 3, 56, 67, 6, 7, 8]


[1, 2, 3, 56, 67, 129, 6, 7, 8]


*/

//function print: modules in order
//
//3 options





//current design
// dictionary of modules with unique ids that are
    //integers                           1: { etc....}
    
//fork in the road
    //next field*
    //ordered list
    //order number as a field


//make image urls relative to a folder

/*

ROOT: http://sentence-graph-cashmonides.c9.io/_____ --> sentence_graph/____

/resources/animalspic/images/dog.jpg

icon_url: /images/dog.jpg
var RELATIVE = "/resources/animalspic/"

HTML: <img src=RELATIVE + icon_url>



icon_url: dog.jpg
var RELATIVE = "/resources/animalspic/images/"

HTML: <img src=RELATIVE + icon_url>


*/

//i create a dictionary and I map an id I pick to an object which contains the id itself
var modules = {
    0: {
        id: 0,
        next: 1
    },
    1: {
        id: 1,
        icon_name: "kangaroo",
        icon_url: "../resources/kangaroo.jpg",
        threshold: 10,
        modes_allowed: ["quick_mode"],
        next: 2
    },
    // 3: {
    //     id: 3,
    //     icon_name: "mouse",
    //     //icon_url:,
    //     threshold: 20,
    //     modes_allowed: ["quick_mode"],
    //     next: 2
    // },
    2: {
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
    var m = modules[0]; // start is always 0
    
    while(m.next){
        m = modules[m.next];
        order.push(m.id);
        console.log(m.icon_name);
    }
    
    return order;
    
}

/*

//list where I pick the id
//the reference is its index
var modules_list_of_objects = [
    {
        //id:1
        icon_name: "kangaroo",
        //icon_url:,
        threshold: 10,
        modes_allowed: ["quick_mode"]
    },
    {
        //id: 2
        icon_name: "crow",
        //icon_url:,
        threshold: 10,
        modes_allowed: ["quick_mode"]
    }
]


//list where firebase picks the id
var modules_list_of_objects = [
    7h9h9h9 : {
        //id:76t7ts87at8a7
        icon_name: "kangaroo",
        //icon_url:,
        threshold: 10,
        modes_allowed: ["quick_mode"]
    },
    89u9 : {
        //id: 88asas0as9as
        icon_name: "crow",
        //icon_url:,
        threshold: 10,
        modes_allowed: ["quick_mode"]
    }
]

*/



