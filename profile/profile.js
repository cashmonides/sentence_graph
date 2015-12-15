
window.onload = function(){
    ProfilePage.start();
};

var ProfilePage = {
    user: null
};

ProfilePage.logout = function () {
    document.location = "..";
}


//todo bottleneck passes parameter that sets mode to improve or advance
ProfilePage.enter_advance = function() {
    //todo call bottleneck here
    document.location = "../quiz/";
};

ProfilePage.enter_improve = function () {
    //todo call bottleneck here
    
    //todo make the following less hacky with something like a get first module function in utils
    var mod_id = this.user.get_improving_module();
    if (!mod_id) {
        if (!this.user.get_module(1)) {
            // The user hasn't even began module 1.
            alert("You haven't started the game yet. Complete some modules and then improve your accuracy.")
        } else if (this.user.get_module(1).iteration === 0) {
            // The user hasn't finished module 1.
            console.log("LOG no improving module detected");
            alert("You don't have any completed modules to improve. Complete some modules and then improve your accuracy.");
        } else {
            alert("click on a completed module to improve your accuracy");
        }
            
            
    } else {
        document.location = "../quiz/?mod=" + mod_id;
    }
};



//global functions can be simply reference but for methods we have to bind the method to "this" 
// this.user points to the user object
// this.display_profile - the this = ProfilePage - but for reasons of scope we need to bind it to the "this" of the ProfilePage
// bind passes in its argument into the argument of display_profile
ProfilePage.start = function(){
    this.user = new User();
    if(!this.user.load(this.display_profile.bind(this))) {
        this.display_profile();
    };
    // equivalent to: this.user.load(function(){ this.display_profile(); });
};

ProfilePage.display_profile = function() {
    var player_name = this.user.data.profile.name;
    var e1 = el("name_box");
    e1.innerHTML = "Welcome " + player_name;

    //todo fix dummy value here
    var current_module_id = this.user.get_current_module();
    var current_universal_module = ALL_MODULES[current_module_id];
    var current_universal_module_name = current_universal_module.icon_name;
    var e2 = el("level_box");
    e2.innerHTML = "your level is: " + current_universal_module_name;
    
    this.build_progress_table(this.user);
};



// return: int which is number of levels from current_module
ProfilePage.get_module_distance = function (user, module_id) {
    var current_module_id = user.get_current_module();
    console.log("DEBUG blur mode, current_module_id=", current_module_id);
    var distance = module_id - current_module_id;
    console.log("DEBUG blur mode: distance = ", distance);
    console.log("DEBUG blur mode module_id - current_mod = distance", module_id + " - " + current_module_id + " = " + distance);
    return distance;
}


ProfilePage.build_progress_table = function(user) {
    try {
        var table = el("table");
        var row = make({tag: "tr"}, table);
        var max_columns = 4;
        var order = get_module_order();
    
        
        
        for (var i = 0; i < order.length; i++) {
            var mod = ALL_MODULES[order[i]];
        
            var mod_history = mod.id in user.data.history ? user.get_module(mod.id) : null;
                            
            var img_class = mod_history && mod_history.iteration > 0 ? ["progress_image", "complete"] : ["progress_image", "incomplete"];
            
            
            // in progress
            var distance = this.get_module_distance(user, mod.id);
            var decimal_distance = Math.min(1, Math.max(1.1 - (distance/10), 0));
            
            var el2 = document.getElementById("progress_image");
            // var els = document.getElementsByClassName("incomplete");
            console.log("DECIMAL DISTANCE TO STRING = ", decimal_distance.toString());
            //turn a measure like 0.1 to an int between 1 and 100
            var blur_amount = decimal_distance.toString();
            
            

            
            make({
                tag: "td", 
                class: ["progress_cell"], 
                onclick: ProfilePage.select_improvement_module(mod.id),
                children: [
                    {tag: "img", class: img_class, src: mod.icon_url, style : {
                        background: "red",
                        // "-webkit-filter": "blur(" + blur_amount + "px)",
                        // filter: "blur(" + blur_amount + "px)"
                        }
                    },                      //UNIVERSAL MODULE
                    {tag: "br"},
                    this.get_display_caption(this.user, order[i])
                ]
            }, row);
    
    
            if (i > 0 && i % max_columns == 0) {
                row = make({tag: "tr"}, table);
            }
        }
    } catch (e) {
        log_error(e, {"function" : "build_progress_table"});
    }
};


//todo make get_display_caption produce an html element
ProfilePage.get_display_caption = function (user, module_id) {
    console.log("DEBUG 11-22 entering get_display_caption");
    var classification = user.classify_module(module_id);
    console.log("DEBUG 11-22 classification = ", classification);
    switch (classification) {
        case "completed" : return user.get_max_accuracy(module_id) + "%";
        case "frontier" : return user.get_progress(module_id).join("/");
        //old code below
        // case "frontier" : return user.get_module(module_id).progress + "/" + threshold; 
        case "improving" : return {
            tag : "span",
            children : [
                "current: " + user.get_max_accuracy(module_id) + "%",
                {tag : "br"}, 
                "best previous: " + user.get_previous_max_accuracy(module_id) + "%",
                {tag : "br"}, 
                "current progress: " + user.get_progress(module_id).join("/")
                ]
        };
        case "uncompleted" : return "";
        default : throw "no caption detected";
    }
};




//todo call bottleneck here
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
        var frontier_mod = self.user.get_current_module()
        //todo uncomment when done testing
        // var improving_mod_name = ALL_MODULES[improving_mod].icon_name;
        console.log("DEBUG 11-20 improving_mod", improving_mod);
        console.log("DEBUG 11-20 frontier_mod", frontier_mod);
        
        // console.log("DEBUG 11-20 improving_mod_name", improving_mod_name);
        
        var status;
        if (mod_id > frontier_mod) {
            status = 3;
        } else if (mod_id === frontier_mod) {
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
                        } 
            case 2 : if (confirm("would you like to continue improving your accuracy at this level?")) {
                            // alert("you would be entering the improvement level now");
                            document.location = "../quiz/?mod=" + mod_id;
                            break;
                        } 
            case 3 : return;
            case 4 : if (confirm("would you like to continue advancing at this level?")) {
                            // alert("you would be entering the advance level now");
                            document.location = "../quiz/?mod=" + mod_id;
                            break;
                        } 
        }
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