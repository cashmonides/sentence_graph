
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

//global functions can be simply reference but for methods we have to bind the method to "this" 
// this.user points to the user object
// this.display_profile - the this = ProfilePage - but for reasons of scope we need to bind it to the "this" of the ProfilePage
// bind passes in its argument into the argument of display_profile
ProfilePage.start = function(){
    this.user = new User();
    this.user.load(this.display_profile.bind(this));
    // equivalent to: this.user.load(function(){ this.display_profile(); });
    //console.log"USER in start = ", user);
};

ProfilePage.display_profile = function() {

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
    var max_columns = 4;
    var order = get_module_order();
    
    console.log("DEBUG 11-20 order = ", order);

    // document.getElementById()

    for (var i = 0; i < order.length; i++) {
        console.log("DEBUG 11-20 i, order[i]", i, order[i]);
        var mod = ALL_MODULES[order[i]];
    
        var mod_history = mod.id in history ? history[mod.id] : null;
        
        var img_class = mod_history && mod_history.iteration > 0 ? ["progress_image"] : ["progress_image", "incomplete"];
        
        console.log("entering make function");
        make({
            tag: "td", 
            class: ["progress_cell"], 
            onclick: ProfilePage.click_handler(mod.id),
            children: [
                {tag: "img", class: img_class, src: mod.icon_url},                      //UNIVERSAL MODULE
                {tag: "br"},
                this.get_display_caption(this.user, order[i])
            ]
        }, row);


        if (i > 0 && i % max_columns == 0) {
            row = make({tag: "tr"}, table);
        }

    }

};



ProfilePage.get_display_caption = function (user, module_id) {
    // finished "accuracy = x%""     (max accuracy)
    // "improving previous accuracy = x% , current accuracy = y%"  x = max accuracy
    //in progress "0/5"
    // not done  
    console.log("DEBUG 11-20 get_display_caption entered");
    console.log("DEBUG 11-20 in get_display_caption user argument = ", user);
    console.log("DEBUG 11-20 in get_display_caption module_id argument = ", module_id);
    // var order = get_module_order();
    // var threshold = ALL_MODULES[module_id].threshold;
    // console.log("DEBUG 11-20 threshold = ", threshold);
    
    
    // console.log("DEBUG 11-20 in_progress = ", user.data.history[module_id].progress);
   
    
    
    var classification = user.classify_module(module_id);
    console.log("DEBUG 11-20 classification = ", classification);
    switch (classification) {
        case "completed" : return user.get_max_accuracy(module_id) + "%";
        case "frontier" : return user.get_progress(module_id).join("/");
        //old code below
        // case "frontier" : return user.data.history[module_id].progress + "/" + threshold; 
        case "improving" : return "current: " + user.get_max_accuracy(module_id)
        + "% best previous: " + user.get_previous_max_accuracy(module_id) +
        '% current progress: ' + user.get_progress(module_id).join("/");
        case "uncompleted" : return "";
        default : throw "no caption detected";
    }
}


//todo in user make get_accuracy return a list of accuracies
// sample the final one
// max of all previous
// 


ProfilePage.click_handler = function(mod_id){
    
    return function(){
        document.location = "../quiz/?mod=" + mod_id;
    };
    
};

