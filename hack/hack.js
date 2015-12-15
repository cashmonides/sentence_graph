//hard coded variables that need to match something
var uid = "dfb9bc3f-66b0-4a70-af22-0ffc490d0fca";  //john213@llls.com 

// gobbledygook for testing
var value = "malicious testing part 2";
var credentials = {email: "hack@hack.com", password : "hack"}



function callback_2 (error) {
    if (error) {
        console.log("malicious hack not successful!!!, error =", error);
        
        // alert("malicious hack not successful!!!");
    } else {
        console.log("malicious hack successful");
        // alert("malicious hack successful!!!");
    }
}


//authData = Firebase reserved word that stores their identity
function callback_1 (error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        alert("Login failed!", error);
      } else {
        fbase.child("users/" + uid + "/history/hack_test").set(value, callback_2);
      }
}


var fbase = new Firebase('https://sentence-tagging.firebaseio.com/');
fbase.authWithPassword(credentials, callback_1);
    
    
  
  

    
    
