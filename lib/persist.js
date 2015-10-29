var fbase = new Firebase('https://sentence-tagging.firebaseio.com/');

//

// function save(sentence) {
//     fbase.child("sentence").once("value",                               //creates a request, once only, asks the firebase database for the value at that node (student>name)
//         function (response) {                                                    //when the response comes back, it does the function and passes in the response
//             var exists = response.val();                                         //returns an object, which is the val of response (the contents of the node)
//             console.log(exists);
//         }
//     );

//     set_score("jane doe", "500");
// };

// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html

//currently duplicated by in login.js
function create_user(email, password){
    
    fbase.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:");
        login_user(email, password);
      }
    });
    
}



function logout() {
    fbase.unauth();
}

//every firebase operation is asynchronous so everything will be a callback
//everything in firebase is a path so key contains userid as part of the path userid/..../key
function get_user_data(path, callback, uid){
    
    var c = fbase.child("users").child(uid == null ? state.user.uid : uid);
    if (path != null) {
       c = c.child(path); 
    }
    c.once("value", callback);
    
}

function set_user_data(path, value){
    
    fbase.child("users").child(state.user.uid).child(path).set(value);
    
}

// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html

function login_user(email, password, callback){

    console.log("entering login_user");

    fbase.authWithPassword({
      email    : email,
      password : password

    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        // console.log("cookies: ", document.cookie);
        callback(authData);
      }
    });
    console.log("authwithpassword triggered");
    
}


function change_password(email, oldPassword, newPassword) {
    console.log("Email oldpw newpw", email, oldPassword, newPassword);

    fbase.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_PASSWORD":
                    console.log("The specified user account password is incorrect.");
                    break;
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    break;
                default:
                    console.log("Error changing password:", error);
            }
        } else {
            console.log("User password changed successfully!");
        }
    });
}




//testing

function save (sentence) {
    console.log("saving to firebase: ", sentence);
    console.log("stringify: ", JSON.stringify(sentence));
    
    fbase.child("sentence").push({                       //   ...set({ score: int }, function() {} )
            data : JSON.stringify(sentence)
        },
        function(error) {
            if (error != null) {
                console.log(error);
            }
        }
    );


}

//load will load a tagged sentence from firebase so we can use it to make a quiz
//this needs to be implemented as a callback
function load (callback) {
    fbase.child("sentence").once("value", callback);
}


//firebase data will be serialized (i.e. packed up in a string format (basically JSON??)
//but we want access to all the properties of the object
//so we need to deserialize the data (i.e. turn it back into an object)
function deserialize(data){

    var all_sentences = data.val();

    var unique_ids = Object.keys(all_sentences);
    console.log(unique_ids);
    var sentences = [];
    
    for(var i in unique_ids){
        var ser_str = all_sentences[unique_ids[i]];
        var sentence = JSON.parse(ser_str.data, reviver);
        // console.log(sentence);
        sentences.push(sentence);
    }
    
    return sentences;

}

//the reviver will
function reviver(key, value){
    
    // console.log(key, value);
    
    if(value != null && value.hasOwnProperty("class_id")){
        // console.log("found class!", value);
        
        var obj;
        
        switch(value.class_id){
            case 1: obj = new Sentence(); break;
            case 2: obj = new Region(); break;
            case 3: obj = new SingleRegionTag(); break;
            case 4: obj = new Clause(); break;
            case 5: obj = new SubordinateClause(); break;
            default:
                console.log("you forgot a class!");
                throw "can't deserialize this object: " + value.class_id;
        }
        
        var keys = Object.keys(value);
        
        // console.log(keys);
        
        keys.forEach(function(key){
            obj[key] = value[key];
        });
        
        return obj;
        
    } else {
    
        // is a primitive (like number, boolean, string)
        return value;
    
    }
    
};
