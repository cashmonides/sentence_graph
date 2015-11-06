//console.log"DEBUG 10-29 USER OBJECT TRIGGERED+++++++");

var User = function() {
    this.data = null;
    this.uid = null;
};


User.prototype.load = function(callback) {
    
    this.uid = get_cookie("quiz_uid");
    console.log("user uid:", this.uid);
    
    if (this.uid != null) {
        
        var self = this;
        Persist.get(["users", this.uid], function(data){ self.user_data_loaded(data, callback); });
        return true;
        
    } else {
        //console.log"error: no user id");
        return false;
    }

};

User.prototype.user_data_loaded = function(data, callback){
    
    this.data = data.val();
    if (!this.data.history) {
        this.data.history = {};
    }
    console.log("user data:", this.data);
    callback();
    
};


User.prototype.logout = function () {
    Persist.logout_user();
    delete_cookie("quiz_uid", "/", null);
};



User.prototype.get_current_module = function(){
    
    var sorted = get_module_order();
    
    
    
    for(var i = 0; i < sorted.length; i++){
        var mod_id = sorted[i]
        if(mod_id in this.data.history){
            if(this.data.history[mod_id].iteration == 0){
                return mod_id;
            }
        } else {
            // TODO: create module in user fbase and add to this.data.history
            this.create_module(mod_id);
            return mod_id;
        }
    }
    
    return null; // they've completed everything
      
};


User.prototype.create_module = function(mod_id){
    console.log("CREATE MODULE TRIGGERED", mod_id);
    this.data.history[mod_id] = {
        id: mod_id,
        iteration: 0,   //count
        in_progress: false,
        progress: 0,
        metrics: false    //dictionary
    };
    Persist.set(["users", this.uid, "history", mod_id], this.data.history[mod_id]); 
};
//we're never gonna set module progress ourselves only increment it
// User.prototype.set_module_progress = function (module_id, progress, callback) {
//     Persist.set(["users", this.uid, "history", module_id, "progress"], progress, callback);
// };


User.prototype.submodule_complete = function (module_id) {
    
    var mod = this.data.history[module_id];
    mod.progress++;
    var rollover = mod.progress >= ALL_MODULES[module_id].threshold;
    
    
    if (rollover) {
        mod.iteration++;
        mod.progress = 0;
        mod.in_progress = false;
    }
   

    Persist.set(["users", this.uid, "history", module_id], mod);    
    return rollover;

};

User.prototype.get_module = function(id){
    return this.data.history[id];
};


//field 1 = they got it right
//field 1 = they got it right
// User.prototype.update_question_metrics = function(field, module_id){
//      var mod = this.data.history[module_id];
//      var key = ["correct", "incorrect", "max_streak"][field-1];
     
//      mod[key]++;
     
//      Persist.set(["users", this.uid, "history", module_id, key], mod[key]);
// };


//incorrect = # of incorrect before termination of question (i.e. streak of incorrects)
User.prototype.update_question_metrics = function(incorrect, module_id) {
    var mod = this.data.history[module_id];
    if (!mod.metrics) {
        mod.metrics = {};    
    }
    
    
    //just did 1st question on a new iteration of the module
    if (!(mod.iteration in mod.metrics)) {
        mod.metrics[mod.iteration] = {};            //creates key and value
    } 
    
    var map = mod.metrics[mod.iteration];
    
    
    map[incorrect] = incorrect in map ? map[incorrect] + 1 : 1;
    console.log("DEBUG user module", mod);
    
    Persist.set(["users", this.uid, "history", module_id, "metrics"], mod.metrics);
};


User.set_cookie = function(uid){
    set_cookie("quiz_uid", uid, "/");
};

User.remove_cookie = function(){
    delete_cookie("quiz_uid", "/", null);
};




User.set_initial_data = function (uid, name, class_number, callback) {
    var data = {
        profile: {
            name: name, 
            class_number: class_number + "test string",
            level: 0
        },
        //todo make this a blank history for initial setting
        history: false
    };
    Persist.set(["users", uid], data, callback);
};