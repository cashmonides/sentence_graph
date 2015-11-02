

var Persist = {
    fbase: new Firebase('https://sentence-tagging.firebaseio.com/')
};

Persist.get_path = function(path){

    var node = this.fbase;

    for (var i=0; i < path.length; i++) {
        node = node.child(path[i]);
    }
    
    return node;
    
};

//path = list of strings (e.g. ["users", "uid", "score"))
Persist.get = function(path, callback) {
    this.get_path(path).once("value", callback);
};

Persist.set = function(path, value, callback) {
    this.get_path(path).set(value, callback);
};

Persist.push = function(path, value, callback){
    this.get_path(path).push({data : value}, callback);
};

/* ---------------------------- USER AUTH ------------------------------------ */

// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html


Persist.create_user = function(e, p, callback){
    this.fbase.createUser({email: e, password: p}, callback);    
};

Persist.reset_password = function(email, callback){
    this.fbase.resetPassword({ email: email }, callback);    
};

Persist.logout_user = function() {
    this.fbase.unauth();
};

Persist.login_user = function(email, password, callback){

    //console.log"entering login_user");

    this.fbase.authWithPassword({
      email    : email,
      password : password

    }, function(error, authData) {
      if (error) {
        //console.log"Login Failed!", error);
      } else {
        //console.log"Authenticated successfully with payload:", authData);
        callback(authData);
      }
    });
    //console.log"authwithpassword triggered");
    
};


Persist.change_password = function(email, oldPassword, newPassword) {
    //console.log"Email oldpw newpw", email, oldPassword, newPassword);

    this.fbase.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_PASSWORD":
                    //console.log"The specified user account password is incorrect.");
                    break;
                case "INVALID_USER":
                    //console.log"The specified user account does not exist.");
                    break;
                default:
                    //console.log"Error changing password:", error);
            }
        } else {
            //console.log"User password changed successfully!");
        }
    });
};



