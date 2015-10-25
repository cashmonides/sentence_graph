window.onload = function() {
    display_profile();
}


function display_profile() {
    var player_name = "PLAYER NAME HERE";
    var e1 = document.getElementById("name_box");
    e1.innerHTML = "Welcome " + player_name;
    
    var player_level = "PLAYER LEVEL HERE";
    var e2 = document.getElementById("level_box");
    e2.innerHTML = "your level is: " + player_level;
    
    
    var e3 = document.getElementById("snake");
    // e3.innerHTML = "<img src=\"https://googledrive.com/host/0B3sTgW9drSJIazRlY1h6UGVwb0k/frog\">"
    // e3.innerHTML = "<img src=\"https://googledrive.com/host/0B3sTgW9drSJIMFB0VnBHa0dwazQ\" style=\"display:block\" width:100% height:100%>"
    // e3.innerHTML = "<td background = \"https://googledrive.com/host/0B3sTgW9drSJIMFB0VnBHa0dwazQ>\""
    
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