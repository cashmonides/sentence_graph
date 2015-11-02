
window.onload = function(){
    ProfilePage.start();
}

var ProfilePage = {
    user: null
}

ProfilePage.IMAGE_PREFIX = "https://googledrive.com/host/";

ProfilePage.enter_game = function() {
    document.location = "../quiz/";
};

ProfilePage.start = function(){
    this.user = new User();
    this.user.load(this.display_profile.bind(this));
    //console.log"USER in start = ", user);
};

ProfilePage.display_profile = function() {

    //var player_name = "PLAYER NAME HERE";
    var player_name = this.user.uid;
    var e1 = el("name_box");
    e1.innerHTML = "Welcome " + this.user.data.profile.name;

    var player_level = "PLAYER LEVEL HERE";
    var e2 = el("level_box");
    e2.innerHTML = "your level is: " + player_level;
    //console.log"FIRST PARTS COMPLETED")


    
    //console.log"user.data = ", user.data);
    var history = this.user.data.history;
    //console.log"HISTORY LOADED = ", history);
    this.build_progress_table(history);
};


ProfilePage.build_progress_table = function(history) {

    var table = el("table");
    var row = make({tag: "tr"}, table);
    var max_columns = 2;
    var order = get_module_order();


    for (var i = 0; i < order.length; i++) {

        var mod = ALL_MODULES[order[i]];
        var img_class = history[mod.id].completed ? ["progress_image"] : ["progress_image", "incomplete"];

        make({
            tag: "td", 
            class: ["progress_cell"], 
            children: [
                {tag: "img", class: img_class, src: mod.icon_url},
                {tag: "br"},
                history[mod.id].progress + "/" + mod.threshold
            ]
        }, row);

        if (i > 0 && i % max_columns == 0) {
            row = make({tag: "tr"}, table);
        }

    }

};









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
//    var e1 = el("name_box");
//    e1.innerHTML = "Welcome " + player_name;
//
//    var player_level = "PLAYER LEVEL HERE";
//    var e2 = el("level_box");
//    e2.innerHTML = "your level is: " + player_level;
//
//    build_progress_table();
//
//
//    // var e3 = el("snake");
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
//    var e3 = el("table");
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
//        //console.logcell);
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
