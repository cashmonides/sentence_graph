
window.onload = function(){
    ProfilePage.start();
};

var ProfilePage = {
    user: null
};

// ProfilePage.IMAGE_PREFIX = "https://googledrive.com/host/";


ProfilePage.logout = function () {
    document.location = "../login/";
}

ProfilePage.enter_advance = function() {
    document.location = "../quiz/";
};

ProfilePage.enter_improve = function () {
    var mod_id = this.user.get_improving_module();
    document.location = "../quiz/?mod=" + mod_id;
};
// ProfilePage.enter_game = function() {
//     document.location = "../quiz/";
// };

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
            onclick: ProfilePage.select_improvement_module(mod.id),
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

//todo disabling click handler for now
//later we'll enable it in an intelligent way
// ProfilePage.click_handler = function(mod_id){
    
//     return function(){
//         document.location = "../quiz/?mod=" + mod_id;
//     };
    
// };


ProfilePage.select_improvement_module = function(mod_id){
    // three cases
    // 1 no improving module at all
        // alert: would you like to improve your accuracy at this level? yes/no
        // yes
            // enter improvement at that module
        // no 
            // -> profile
    // 2 module clicked on is improving
        // alert: would you like to continue improve your accuracy at this level? yes/no
        // yes
            // enter improvement at that module
        // no 
            // -> profile
    // 3 module clicked on is not improving but improving exists
        // alert: click improve or advance to get started
    // 4 module clicked on is frontier
        // alert: would you like to advance in this level?
        //yes : 
            //enter mod_id
        //no: 
            // -> profile
    var self = this;
    return function () {
        
        var improving_mod = self.user.get_improving_module();
        //todo uncomment when done testing
        // var improving_mod_name = ALL_MODULES[improving_mod].icon_name;
        console.log("DEBUG 11-20 improving_mod", improving_mod);
        
        // console.log("DEBUG 11-20 improving_mod_name", improving_mod_name);
        
        var status;
        if (mod_id === self.user.get_current_module()) {
            status = 4;
        } else if (improving_mod === null) {
            status = 1;
        } else if (improving_mod === mod_id) {
            status = 2;
        } else if (improving_mod !== mod_id) {
            status = 3
        } else {
            throw new Error("no improvement status detected");
        }
        
        
        
        
        switch (status) {
            case 1 : if (confirm("would you like to improve your accuracy at this level?")) {
                            // alert("you would be entering the improvement level now");
                            document.location = "../quiz/?mod=" + mod_id;
                            break;
                        } else {
                          return null;  
                        }
            case 2 : if (confirm("would you like to continue improving your accuracy at this level?")) {
                            // alert("you would be entering the improvement level now");
                            document.location = "../quiz/?mod=" + mod_id;
                            break;
                        } else {
                          return null;  
                        }
            case 3 : alert("Click advance or improve to play the game. You are currently improving at level: " + "improving_mod_name"); 
                    return null;
            case 4 : if (confirm("would you like to continue advancing at this level?")) {
                            // alert("you would be entering the advance level now");
                            document.location = "../quiz/?mod=" + mod_id;
                            break;
                        } else {
                          return null;  
                        }
        }
        
        
        // switch (status) {
        //     case 1 : alert("would you like to improve your accuracy at this level?");
        //             return null;
        //     case 2 : alert("would you like to continue improving your accuracy at this level?");
        //             return null;
        //     case 3 : alert("Click advance or improve to play the game. You are currently improving at level: " + improving_mod_name); 
        //             return null;
        // }
    
    
    // if (mod_id !== this.user.)
    // return function(){
    //     document.location = "../quiz/?mod=" + mod_id;
    // };
    }
};



////////////////////////////
//new material below for custom confirm box

//I guess the way it will be used is: 

//we define a CustomAlert object
function CustomAlert(){
	this.render = function(dialog){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = "Acknowledge This Message";
	    document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
	}
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}

var Alert2 = new CustomAlert();

//looks like this won't get used
function deletePost(id){
	var db_id = id.replace("post_", "");
	// Run Ajax request here to delete post from database
	document.body.removeChild(document.getElementById(id));
}

function CustomConfirm(){
	this.render = function(dialog,op,id){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
		
		document.getElementById('dialogboxhead').innerHTML = "Confirm that action";
	    document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Confirm.yes(\''+op+'\',\''+id+'\')">Yes</button> <button onclick="Confirm.no()">No</button>';
	}
	this.no = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.yes = function(op,id){
		//this we will replace with our customized functionality
		if(op == "delete_post"){
			deletePost(id);
		}
		
		//this we will keep, clears the display
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Confirm = new CustomConfirm();