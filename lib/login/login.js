// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html


//modes:
// 1 logging in
// 2 creating account
// 3 forgot password
// 4 change password

var mode_map = {
    "email_row": [[1, 2, 3, 4], "table-row"],
    "password_row": [[1, 2], "table-row"],
    "old_password_row": [[4], "table-row"],
    "new_password_row": [[4], "table-row"],
    "name_row": [[2], "table-row"],
    "class_row": [[2], "table-row"],

    "login_button": [[1], "inline"],
    "create_account_button": [[2], "inline"],
    "forgot_password_button": [[1], "inline"],
    "change_password_button": [[4], "inline"],


    "reset_password_instructions": [[3], 'inline']          //something like "enter your email and you'll be sent a temporary password to change your account with
};


//todo Akiva changed id.style.display etc. to e.style.display (is that right?)
function set_mode(mode){

    console.log("set mode entered");

    console.log("setting mode");
    for(id in mode_map){
        var data = mode_map[id];
        var e = document.getElementById(id);
        e.style.display = contains(data[0], mode) ? data[1] : "none";
    }
}



function enter_profile() {
    document.location = "../../profile/profile.html"
}

function login(){
    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    console.log("logging in: ", e, p);
    login_user(e, p, success);
}

function success(authData){
    console.log("Success triggered authData= ", authData);
    console.log("authData.uid = ", authData.auth.uid);
    set_cookie("quiz_uid", authData.auth.uid, "/");
    document.location = "../../profile/profile.html";
}



function create_account() {

    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    var n = document.getElementById("name").value;
    var c = document.getElementById("class_number").value;


    fbase.createUser({
        email    : e,
        password : p
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData);
            set_default_history(userData.uid);
            set_metadata(userData.uid, n, c, function(){
                login_user(e, p, success);
                console.log("callback successful");
            });
        }
    });
}


function set_metadata(uid, name, class_number, callback) {
    var data_map = {
        name: name, 
        class_number: class_number + "test string",
        level: 0
    };
    console.log("DATA = ", uid, name, class_number);

    //the field "profile" is created here, doesn't need to be initialized, right?
    fbase.child("users").child(uid).child("profile").set(data_map, callback);
    
}


function set_default_history(uid) {
    console.log("DEBUGGING 10-30 entering set_default_history");
    var default_history_map = {
        "1": {
            id: 1,
            name: "kangaroo",
            completed: false,
            progress: 0,
            error_rate: null
        },
        "2": {
            id: 2,
            name: "crow",
            completed: false,
            progress: 0,
            error_rate: null
        }
    };
    fbase.child("users").child(uid).child("history").set(default_history_map);
}


function enter_anonymous_game() {
    delete_cookie("quiz_uid", "/", null);
    document.location = "../../quiz/index.html";
}


function initiate_change_password() {
    var e = document.getElementById("email").value;
    var op = document.getElementById("old_password").value;
    var np = document.getElementById("new_password").value;
    change_password(e, op, np);
}

function reset_password() {

    var email = document.getElementById("email").value;
    if (!email || email.trim().length == 0) {
        alert("PLEASE ENTER A VALID EMAIL");
        return;
    } 


    fbase.resetPassword({
        email: email
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    alert("A PASSWORD RESET HAS BEEN SENT TO YOUR EMAIL");
                    break;
                default:
                    console.log("Error resetting password:", error);
            }
        } else {
            console.log("Password reset email sent successfully!");
            alert("A PASSWORD RESET HAS BEEN SENT TO YOUR EMAIL");
        }
    });
}





