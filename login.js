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
    "school_row": [[2], "table-row"],
    "grade_row": [[2], "table-row"],
    "class_row": [[2], "table-row"],
    "access_code_row": [[2], "table-row"],

    "login_button": [[1], "inline"],
    "create_account_button": [[2], "inline"],
    "forgot_password_button": [[1], "inline"],
    "change_password_button": [[4], "inline"],


    // "reset_password_instructions": [[3], 'inline']          //something like "enter your email and you'll be sent a temporary password to change your account with
};


//todo Akiva changed id.style.display etc. to e.style.display (is that right?)
function set_mode(mode){

    //console.log"set mode entered");

    //console.log"setting mode");
    for(id in mode_map){
        var data = mode_map[id];
        var e = el(id);
        e.style.display = contains(data[0], mode) ? data[1] : "none";
    }
}

function create_account() {
    var e = el("email").value;
    var p = el("password").value;
    var n = el("name").value;
    var s = el("school").value;
    var g = el("grade").value;
    var c = el("class_number").value;
    var ac = el("access_code").value;
    
    var correct_hash = 1327021340; // The correct hash value.
    if (hash(ac) !== correct_hash) {
        alert("Talk to Akiva in class about how to log in.");
        return;
    }
    

    var callback = function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
            //todo should an urgent error log go here???
            alert(error);
        } else {
            console.log("Successfully created user account with uid:", userData);
            User.set_initial_data(userData.uid, n, s, g, c, e, login);
        }
    };
    Persist.create_user(e, p, callback);
}

function login() {
    var e = el("email").value;
    var p = el("password").value;
    //console.log"logging in: ", e, p);
    Persist.login_user(e, p, success);
}

function success(authData){
    //console.log"Success triggered authData= ", authData);
    //console.log"authData.uid = ", authData.auth.uid);
    User.set_cookie(authData.auth.uid);
    

    
    document.location = "../profile/";
}




function enter_anonymous_game() {
    User.remove_cookie();
    document.location = "../quiz/";
}


function initiate_change_password() {
    var e = el("email").value;
    var op = el("old_password").value;
    var np = el("new_password").value;
    if (e.endsWith(".tag") || e.endsWith(".lls")) {
        alert("you are using a special account, see Akiva in class to change your password");
        return;
    }
    var callback = function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_PASSWORD":
                    console.log("The specified user account password is incorrect.");
                    alert("Password is incorrect.");
                    break;
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    alert("Account does not exist.");
                    break;
                default:
                    //console.log"Error changing password:", error);
            }
        } else {
            alert("Congratulations! You've changed your password. Click on \"I already have an account\" and log in.");
            //console.log"User password changed successfully!");
        }
    };
    Persist.change_password(e, op, np, callback);
}

function reset_password() {

    var email = el("email").value;
    if (!email || email.trim().length == 0) {
        alert("PLEASE ENTER A VALID EMAIL");
        return;
    } 
    
    if (email.endsWith(".test") || email.endsWith(".solo")) {
        alert("you are using a special account, see Akiva in class to change your password");
        return;
    }

    var callback = function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    alert("The specified user account does not exist");
                    break;
                default:
                    console.log("Error resetting password:", error);
            }
        } else {
            console.log("Password reset email sent successfully!");
            alert("A PASSWORD RESET HAS BEEN SENT TO YOUR EMAIL");
        }
    };

    Persist.reset_password(email, callback);

}





