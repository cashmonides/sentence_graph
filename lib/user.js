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



User.prototype.set_module_progress = function (module_name, progress, callback) {
    Persist.set(["users", this.uid, "history", module_name, "progress"], progress, callback);
};

User.set_cookie = function(uid){
    set_cookie("quiz_uid", uid, "/");
}

User.remove_cookie = function(){
    delete_cookie("quiz_uid", "/", null);
}
