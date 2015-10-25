var urls = {
    kangaroo: "0B3sTgW9drSJISUlrT1dQMjhfVE0",
    crow: "0B3sTgW9drSJIYXF4WmZtWm9OazA",
    bear: "0B3sTgW9drSJIYS1DMnJwZUtndDQ",
    bull: "0B3sTgW9drSJIWnU5eWQxbzQwUm8" 
}


var prefix = "https://googledrive.com/host/"

var order = ["kangaroo", "crow", "bear", "bull"]

var caption = "10/10";


var john_does_progress = {
    "kangaroo" : 10/10,
    "crow": 9/10,
    "bear": 0/10,
    "bull": 0/10,
    "griffin": 0/50
}







window.onload = display_profile;

function display_profile() {
    
    
    var player_name = "PLAYER NAME HERE";
    var e1 = document.getElementById("name_box");
    e1.innerHTML = "Welcome " + player_name;
    
    var player_level = "PLAYER LEVEL HERE";
    var e2 = document.getElementById("level_box");
    e2.innerHTML = "your level is: " + player_level;
    
    build_progress_table();
    
    
    
    // var e3 = document.getElementById("snake");
    // e3.innerHTML = "<img src=\"https://googledrive.com/host/0B3sTgW9drSJIazRlY1h6UGVwb0k/frog\">"
    // e3.innerHTML = "<img src=\"https://googledrive.com/host/0B3sTgW9drSJIMFB0VnBHa0dwazQ\" style=\"display:block\" width:100% height:100%>"
    // e3.innerHTML = "<td background = \"https://googledrive.com/host/0B3sTgW9drSJIMFB0VnBHa0dwazQ>\""
    
}


function build_progress_table() {
    
    
    var e3 = document.getElementById("table");
    var row = make("tr");
    var max_columns = 2;
    
    
    for (var i = 0; i < order.length; i++) {
        var url = urls[order[i]];
        var cell = make("td", {class:["progress_cell"]});
        var img = make("img", {class: ["progress_image"], src: prefix + url});
        cell.appendChild(img);
        cell.appendChild(make("br"));
        cell.appendChild(document.createTextNode(caption));
        console.log(cell);
        if (i > 0 && i % max_columns == 0) {
           e3.appendChild(row);
           row = make("tr");
        }
        row.appendChild(cell);
    }
 
    e3.appendChild(row);
    
}





function enter_game() {
    document.location = "../quiz/index.html";
}




var folder_address = "https://drive.google.com/folderview?id=0B3sTgW9drSJIazRlY1h6UGVwb0k&usp=sharing"




// For example, the folder ID from this link: 
// https://docs.google.com/folder/d/0B5AR8ct5SZfSTDZTQjNNVXR4RWM/edit ... is: 0B5AR8ct5SZfSTDZTQjNNVXR4RWM
// The URL for each file will be 
// https://googledrive.com/host/ followed by the folder id followed by the filename. 
// For example: if you saved style.css in the folder in step #1: https://googledrive.com/host/0B5AR8ct5SZfSTDZTQjNNVXR4RWM/style.css