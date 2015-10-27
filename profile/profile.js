//var urls = {
//    //kangaroo: "0B3sTgW9drSJISUlrT1dQMjhfVE0",
//    kangaroo:"../resources/kangaroo.jpg",
//    crow: "0B3sTgW9drSJIYXF4WmZtWm9OazA",
//    bear: "0B3sTgW9drSJIYS1DMnJwZUtndDQ",
//    bull: "0B3sTgW9drSJIWnU5eWQxbzQwUm8"
//}



var prefix = "https://googledrive.com/host/";




var test_history = {
    kangaroo: {
        completed: true,
        progress: 10,
        error_rate: null
    },
    crow: {
        completed: false,
        progress: 8,
        error_rate: null
    }
};


//create account -> no initial history
//load game -> load firebase
//as he beats each level -> write to firebase his new or updated history

// var user : {
//     history : {
//         module_id : {
//             completed: false,
//             progress: 8,
//             error_rate: null
//         }
//     },
// }
    





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


    // var history = test_history;
    console.log("user.data = ", user.data);
    var history = user.data.history;
    console.log("HISTORY LOADED = ", history);
    build_progress_table(history);
}


function build_progress_table(history) {


    var e3 = document.getElementById("table");
    var row = make("tr");
    var max_columns = 2;

    var order = get_module_order();
    console.log("order = ", order);

    for (var i = 0; i < order.length; i++) {
        var url = modules[order[i]].icon_url;
        var cell = make("td", {class:["progress_cell"]});
        //var img = make("img", {class: ["progress_image"], src: prefix + url});



        //todo Akiva's new stuff below - test

        // console.log("history[order[i]]", history[order[i]]);
        //console.log("history[order[i][completed]]", history[order[i][completed]]);
        // console.log("history[order[i]].completed", history[order[i]].completed);

        if (history[order[i]].completed == false) {
            console.log("incomplete level triggered");
            var img = make("img", {class: ["progress_image", "incomplete"], src: url});
        } else {
            console.log("incomplete level not triggered");
            var img = make("img", {class: ["progress_image"], src: url});
        }
        cell.appendChild(img);


        cell.appendChild(make("br"));


        var denominator = modules[order[i]].threshold;
        var progress_numerator = history[order[i]].progress;



        cell.appendChild(document.createTextNode(progress_numerator + "/" + denominator));
        console.log(cell);
        if (i > 0 && i % max_columns == 0) {
            e3.appendChild(row);
            row = make("tr");
        }
        row.appendChild(cell);
    }
    //todo TEST 10-26 uncomment when done testing
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
