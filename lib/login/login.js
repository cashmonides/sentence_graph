
// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html


function set_login_mode(){

    document.getElementById("login_fields").style.display = 'block';
    document.getElementById("create_account_fields").style.display = 'none';
    document.getElementById("anonymous_fields").style.display = 'none';
    document.getElementById("forgotten_password_fields").style.display = 'none';



}

function set_create_mode(){
    document.getElementById("login_fields").style.display = 'none';
    document.getElementById("create_account_fields").style.display = 'block';
    document.getElementById("anonymous_fields").style.display = 'none';
    document.getElementById("forgotten_password_fields").style.display = 'none';
}

function set_anonymous_mode(){
    document.getElementById("login_fields").style.display = 'none';
    document.getElementById("create_account_fields").style.display = 'none';
    document.getElementById("anonymous_fields").style.display = 'block';
    document.getElementById("forgotten_password_fields").style.display = 'none';
}



//


function login(){
    
    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    
    console.log("logging in: ", e, p);
    login_user(e, p, success);
    // create_user(e, p);
    
    
}


//todo is it as simple as below??? -
// note, if we use this below we need to remove create_user from persist.js
// what callback should we pass login_user to get the game started? does it need success?
// do we need to initialize user parameters such as score, question count, etc. here or can we do that as we go

function create_account() {
    var ref = new Firebase("https://sentence-tagging.firebaseio.com");

    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    var n = document.getElementById("name").value;
    var c = document.getElementById("class_number").value;


    ref.createUser({
        email    : e,
        password : p,
        name : n,
        class_number : c
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            login_user(e, p, success);
        }
    });
}






//TODO
//we need to reset the cookie somehow
function enter_anonymous_game() {
    document.location = "../../quiz/index.html";
}




function reset_password() {
    var ref = new Firebase("https://sentence-tagging.firebaseio.com");


    document.getElementById("login_fields").style.display = 'none';
    document.getElementById("create_account_fields").style.display = 'none';
    document.getElementById("anonymous_fields").style.display = 'none';
    document.getElementById("forgotten_password_fields").style.display = 'block';


    document.getElementById("forgotten_password_prompt_box").innerHTML = "ENTER YOUR EMAIL BELOW " +
        "AND CLICK HERE FOR A REMINDER.";


    var e = document.getElementById("forgotten_password_email").value;

    ref.resetPassword({
        email: e
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    break;
                default:
                    console.log("Error resetting password:", error);
            }
        } else {
            console.log("Password reset email sent successfully!");
        }
    });
}


function success(authData){

    console.log("Success triggered authData= ", authData);
    console.log("authData.uid = ", authData.auth.uid);
    // redirect_and_post("../../quiz/index.html", "uid", authData.auth.uid);
    document.cookie = "quiz_uid=" + authData.auth.uid + "; path=/";
    document.location = "../../quiz/index.html";

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
