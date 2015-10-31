



var prefix = "https://googledrive.com/host/";




// var test_history = {
//     kangaroo: {
//         completed: true,
//         progress: 3,
//         error_rate: null
//     },
//     crow: {
//         completed: false,
//         progress: 3,
//         error_rate: null
//     }
// };











var user = null;



window.onload = start();



function enter_game() {
    document.location = "../quiz/index.html";
}

function start(){
    user = new User();
    user.load(display_profile);
    console.log("USER in start = ", user);
}


function display_profile() {

    //var player_name = "PLAYER NAME HERE";
    var player_name = user.uid;
    var e1 = document.getElementById("name_box");
    e1.innerHTML = "Welcome " + user.data.profile.name;

    var player_level = "PLAYER LEVEL HERE";
    var e2 = document.getElementById("level_box");
    e2.innerHTML = "your level is: " + player_level;
    console.log("FIRST PARTS COMPLETED")


    
    console.log("user.data = ", user.data);
    var history = user.data.history;
    console.log("HISTORY LOADED = ", history);
    build_progress_table(history);
}


function build_progress_table(history) {

    // var test_history = user.data.history;
    // console.log("DEBUG 10/29 test history = ", test_history);

    var e3 = document.getElementById("table");
    var row = make({tag: "tr"});
    var max_columns = 2;

    var order = get_module_order();
    console.log("order = ", order);

    console.log("history in build_progress_table = ", history);
    //console.log("history[order[i].completed", history[order[i].completed);





    for (var i = 0; i < order.length; i++) {

        var current_item = modules[order[i]].id;
        console.log("NEW TEST", history[current_item].completed);
        var url = modules[order[i]].icon_url;


        //todo replace all with make
        //var cell = make("td", {class:["progress_cell"]});
        var cell = make({class:["progress_cell"], tag:"td"});


        if (history[current_item].completed == false) {
            console.log("incomplete level triggered");
            // var img = make("img", {class: ["progress_image", "incomplete"], src: url});
            var img = make({class: ["progress_image", "incomplete"], tag: "img", src: url});
        } else {
            console.log("incomplete level not triggered");
            //var img = make("img", {class: ["progress_image"], src: url});
            var img = make({class: ["progress_image"], tag: "img", src: url});
        }
        cell.appendChild(img);
        //todo below is an example of the rewriting
        // cell.appendChild(make("br"));
        make({tag:"br"}, cell);

        var denominator = modules[order[i]].threshold;
        var progress_numerator = history[current_item].progress;
        cell.appendChild(document.createTextNode(progress_numerator + "/" + denominator));
        console.log(cell);
        if (i > 0 && i % max_columns == 0) {
            e3.appendChild(row);
            //row = make("tr");
            row = make({tag: "tr"});
        }
        row.appendChild(cell);
    }

    e3.appendChild(row);

}



















//
//var folder_address = "https://drive.google.com/folderview?id=0B3sTgW9drSJIazRlY1h6UGVwb0k&usp=sharing"
//
//


// For example, the folder ID from this link: 
// https://docs.google.com/folder/d/0B5AR8ct5SZfSTDZTQjNNVXR4RWM/edit ... is: 0B5AR8ct5SZfSTDZTQjNNVXR4RWM
// The URL for each file will be 
// https://googledrive.com/host/ followed by the folder id followed by the filename. 
// For example: if you saved style.css in the folder in step #1: https://googledrive.com/host/0B5AR8ct5SZfSTDZTQjNNVXR4RWM/style.css




/////////obsolete functions below//////


//function display_profile() {
//
//    var player_name = "PLAYER NAME HERE";
//    var e1 = document.getElementById("name_box");
//    e1.innerHTML = "Welcome " + player_name;
//
//    var player_level = "PLAYER LEVEL HERE";
//    var e2 = document.getElementById("level_box");
//    e2.innerHTML = "your level is: " + player_level;
//
//    build_progress_table();
//
//
//    // var e3 = document.getElementById("snake");
//    // e3.innerHTML = "<img src=\"https://googledrive.com/host/0B3sTgW9drSJIazRlY1h6UGVwb0k/frog\">"
//    // e3.innerHTML = "<img src=\"https://googledrive.com/host/0B3sTgW9drSJIMFB0VnBHa0dwazQ\" style=\"display:block\" width:100% height:100%>"
//    // e3.innerHTML = "<td background = \"https://googledrive.com/host/0B3sTgW9drSJIMFB0VnBHa0dwazQ>\""
//
//}
//
//
//function build_progress_table() {
//
//
//    var e3 = document.getElementById("table");
//    var row = make("tr");
//    var max_columns = 2;
//
//
//    for (var i = 0; i < order.length; i++) {
//        var url = urls[order[i]];
//        var cell = make("td", {class:["progress_cell"]});
//        //var img = make("img", {class: ["progress_image"], src: prefix + url});
//        var img = make("img", {class: ["progress_image"], src: url});
//        cell.appendChild(img);
//        cell.appendChild(make("br"));
//        cell.appendChild(document.createTextNode(caption));
//        console.log(cell);
//        if (i > 0 && i % max_columns == 0) {
//            e3.appendChild(row);
//            row = make("tr");
//        }
//        row.appendChild(cell);
//    }
//    //todo TEST 10-26 uncomment when done testing
//    e3.appendChild(row);
//
//}
