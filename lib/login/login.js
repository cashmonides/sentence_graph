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


    //var test_count = 1;
    //var lightbox_count = 1;
    //
    //if (test_count >= lightbox_count) {
    //    console.log("lightbox count reached");
    //    var lightdiv = document.createElement("div");
    //    lightdiv.innerHTML = "test of lightbox";
    //    $.featherlight(lightdiv);
    //    console.log("lightbox triggered");
    //}


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
    // redirect_and_post("../../quiz/index.html", "uid", authData.auth.uid);
    set_cookie("quiz_uid", authData.auth.uid, "/");
    // document.location = "../../profile/profile.html";
    document.location = "https://sentence-graph-cashmonides.c9.io/profile/profile.html"
}


//todo is it as simple as below??? -
// note, if we use this below we need to remove create_user from persist.js
// do we need to initialize user parameters such as score, question count, etc. here or can we do that as we go

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
        class_number: class_number,
        level: 0
    }
    console.log("DATA = ", uid, name, class_number);
    fbase.child("users").child(uid).child("profile").set(data_map, callback);
    
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
    //options
    //null
    //string
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








// function redirect_and_post(url, key, value) {
//     var form = document.createElement("form");
//     form.method = 'post';
//     form.action = url;
//     var input = document.createElement('input');
//     input.type = "text";
//     input.name = key;
//     input.value = value;
//     form.appendChild(input);
//     form.submit();
// }



//old code below
//function set_login_mode(){
//
//    var es = document.querySelectorAll(".create");
//
//    for(var i = 0; i < es.length; i++){
//        es[i].style.display = 'none';
//    }
//
//    hide_elements(["create_button", "change_password_button"]);
//
//    document.getElementById("reset").style.display = 'inline';
//    document.getElementById("login_button").style.display = 'inline';
//
//    // document.getElementById("login_fields").style.display = 'block';
//    // document.getElementById("create_account_fields").style.display = 'none';
//    // document.getElementById("anonymous_fields").style.display = 'none';
//    // document.getElementById("forgotten_password_fields").style.display = 'none';
//
//
//
//}
//
//function set_create_mode(){
//    hide_elements(["login_button", "change_password_button"]);
//
//    document.getElementById("login_button").style.display = 'none';
//    document.getElementById("create_button").style.display = 'inline';
//
//    var es = document.querySelectorAll(".create");
//
//    for(var i = 0; i < es.length; i++){
//        es[i].style.display = 'table-row';
//    }
//
//    document.getElementById("reset").style.display = 'none';
//
//    // document.querySelectorAll(".hide").forEach(function(e){
//    //     e.style.display = 'block';
//    // });
//
//    // document.getElementById("login_fields").style.display = 'none';
//    // document.getElementById("create_account_fields").style.display = 'block';
//    // document.getElementById("anonymous_fields").style.display = 'none';
//    // document.getElementById("forgotten_password_fields").style.display = 'none';
//}
//
//function set_anonymous_mode(){
//    document.getElementById("login_fields").style.display = 'none';
//    document.getElementById("create_account_fields").style.display = 'none';
//    document.getElementById("anonymous_fields").style.display = 'block';
//    document.getElementById("forgotten_password_fields").style.display = 'none';
//}

//function set_change_mode() {
//    hide_elements(["login_button", "create_button", "reset", 'name', 'class_number']);
//    document.getElementById("change_password_button").style.display = 'inline';
//    document.getElementById("change_password").style.display = 'table-row';
//}