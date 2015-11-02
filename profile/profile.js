
window.onload = function(){
    ProfilePage.start();
};

var ProfilePage = {
    user: null
};

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

