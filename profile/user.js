console.log("DEBUG 10-29 USER OBJECT TRIGGERED+++++++");

var User = function() {
    this.data = null;
    this.uid = null;
};


User.prototype.load = function(callback) {
    
    this.uid = get_cookie("quiz_uid");
    console.log("UID in load user = ", this.uid);
    
    if (this.uid != null) {
        
        var self = this;
        get_user_data(null, function(fbase_data){ self.user_data_loaded(fbase_data, callback); }, this.uid);
        return true;
        
    } else {
        console.log("error: no user id");
        return false;
    }

};

User.prototype.user_data_loaded = function(fbase_data, callback){
    
    this.data = fbase_data.val();
    console.log("user loaded:", this.data);
    callback();
    
};


User.prototype.logout = function () {
    logout();
    delete_cookie("quiz_uid", "/", null);
};



User.prototype.set_module_progress = function (module_name, progress, callback) {
    set_path(["users", this.uid, "history", module_name, "progress"], progress, callback);
};
