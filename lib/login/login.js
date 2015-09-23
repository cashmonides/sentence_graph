
// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html

function login(){
    
    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    
    console.log("logging in: ", e, p);
    create_user(e, p);
    
    
}
