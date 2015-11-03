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
            if(!this.data.history[mod_id].completed){
                return mod_id;
            }
        } else {
            // TODO: create module in user fbase and add to this.data.history
            return mod_id;
        }
    }
    
    return null; // they've completed everything
      
};

//we're never gonna set module progress ourselves only increment it
// User.prototype.set_module_progress = function (module_id, progress, callback) {
//     Persist.set(["users", this.uid, "history", module_id, "progress"], progress, callback);
// };


User.prototype.sub_module_complete = function (module_id) {
    var new_progress = ++this.data.history[module_id].progress;
    Persist.set(["users", this.uid, "history", module_id, "progress"], new_progress, callback);
    if (new_progress >= ALL_MODULES[module_id].threshold) {
         Persist.set(["users", this.uid, "history", module_id, "completed"], true, callback);
         return true;
    } else {
        return false;
    }
}

User.prototype.get_module = function(id){
    return this.data.history[id];
}

User.set_cookie = function(uid){
    set_cookie("quiz_uid", uid, "/");
}

User.remove_cookie = function(){
    delete_cookie("quiz_uid", "/", null);
}


