
//create a Persist object by creating a firebase object which is now tagged with the name fbase
var Persist = {
    fbase: new Firebase('https://sentence-tagging.firebaseio.com/')
};


//todo this never seems to be used and it seems buggy
//returns the node leaf of the tree
Persist.get_path = function(path){
    var node = this.fbase;
    for (var i=0; i < path.length; i++) {
        node = node.child(path[i]);
    }
    return node;
};

//argument path = list of strings (e.g. ["users", "uid", "score"))
//returns the value of the final element in the path (e.g. returns a score value of 20)
Persist.get = function(path, callback) {
    
    //version 1
    // this.get_path(path).once("value", function(x) {
    //     (callback || function () {})(x);
    //     //todo re-enable when there are less bugs
    //     // try {
    //     // callback(x);
    //     // } catch (err){
    //     //     console.log("MAJOR PROBLEM ERROR CAUGHT WAY DOWNSTREAM", err);
    //     // }
    // });
    /*
    function(x) {
        callback(x);
        //todo re-enable when there are less bugs
        // try {
        // callback(x);
        // } catch (err){
        //     console.log("MAJOR PROBLEM ERROR CAUGHT WAY DOWNSTREAM", err);
        // }
    });
    */
    //version2
    
    this.get_path(path).once("value", callback);
};

/*
Note: real_get is impossible! Do not try to fix it!
// x is a local altered by the second argument to get and then returned.
// Since this second argument is a callback, it will set x to y, its input.
// Its input is, in turn, the actual value retrieved by get.
// So this simply returns the actual value.
Persist.real_get = function(path, callback) {
    var bad_string = 'very bad impossible value (not in database)';
    var x = bad_string;
    Persist.get(path, function (y) {alert('y, y = bad_string = ' + y + ' '
    + (y === bad_string)); x = y});
    alert('x = ' + x);
    // hacky
    var i = 0;
    while ((x === bad_string) && (i < 1000000)) {i++};
    alert('x, i =', x, i)
    return x;
}
*/

// A version of get that gets the value and applies the callback to that.
Persist.get_val = function(path, callback) {
    Persist.get(path, function (x) {callback(x.val())});
}

Persist.set = function(path, value, callback) {
    this.get_path(path).set(value, callback || function () {});
};

//pushes a dictionary
Persist.push = function(path, value, callback){
    this.get_path(path).push({data : value}, callback);
};





//pushes value to a list
Persist.push_value = function(path, value, callback){
    this.get_path(path).push(value, callback);
};



Persist.clear_node = function(path, callback) {
    this.get_path(path).set("node_cleared", callback);
}



Persist.remove_node = function (path, callback) {
    this.get_path(path).remove(callback || function () {});
}
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

    this.fbase.authWithPassword({
      email    : email,
      password : password

    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        alert("Login failed!", error);
      } else {
        //console.log"Authenticated successfully with payload:", authData);
        callback(authData);
      }
    });
    //console.log"authwithpassword triggered");
    
};


Persist.change_password = function(email, oldPassword, newPassword, callback) {
    //console.log"Email oldpw newpw", email, oldPassword, newPassword);

    this.fbase.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
    }, callback);
};






