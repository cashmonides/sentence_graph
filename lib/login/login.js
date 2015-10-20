
// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html


function set_login_mode(){

    var es = document.querySelectorAll(".create");
    
    for(var i = 0; i < es.length; i++){
        es[i].style.display = 'none';
    }
    
    document.getElementById("reset").style.display = 'inline';
    document.getElementById("create_button").style.display = 'none';
    document.getElementById("login_button").style.display = 'inline';

    // document.getElementById("login_fields").style.display = 'block';
    // document.getElementById("create_account_fields").style.display = 'none';
    // document.getElementById("anonymous_fields").style.display = 'none';
    // document.getElementById("forgotten_password_fields").style.display = 'none';



}

function set_create_mode(){
    document.getElementById("login_button").style.display = 'none';
    document.getElementById("create_button").style.display = 'inline';
   
    var es = document.querySelectorAll(".create");
    
    for(var i = 0; i < es.length; i++){
        es[i].style.display = 'table-row';
    } 
    
    document.getElementById("reset").style.display = 'none';
    
    // document.querySelectorAll(".hide").forEach(function(e){
    //     e.style.display = 'block';
    // });
    
    // document.getElementById("login_fields").style.display = 'none';
    // document.getElementById("create_account_fields").style.display = 'block';
    // document.getElementById("anonymous_fields").style.display = 'none';
    // document.getElementById("forgotten_password_fields").style.display = 'none';
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
    console.log("DATA = ", uid, name, class_number);
    fbase.child("users").child(uid).child("profile").set({name: name, class_number: class_number}, callback);
}




//TODO
//we need to reset the cookie somehow
function enter_anonymous_game() {
    
    delete_cookie("quiz_uid", "/", null);
    document.location = "../../quiz/index.html";
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

    var ref = new Firebase("https://sentence-tagging.firebaseio.com");


    ref.resetPassword({
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


function success(authData){

    console.log("Success triggered authData= ", authData);
    console.log("authData.uid = ", authData.auth.uid);
    // redirect_and_post("../../quiz/index.html", "uid", authData.auth.uid);
    set_cookie("quiz_uid", authData.auth.uid, "/");
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
