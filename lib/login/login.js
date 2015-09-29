
// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html

function login(){
    
    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    
    console.log("logging in: ", e, p);
    login_user(e, p, success);
    // create_user(e, p);
    
    
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
