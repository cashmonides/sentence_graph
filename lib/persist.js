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


//every firebase operation is asynchronous so everything will be a callback
//everything in firebase is a path so key contains userid as part of the path userid/..../key
function get_user_data(path, callback){
    
    fbase.child("users").child(state.uid).child(path).once("value", callback);
    
}

function set_user_data(path, value){
    
    fbase.child("users").child(state.uid).child(path).set(value);
    
}

// DOCUMENTATION
// https://www.firebase.com/docs/web/guide/login/password.html

function login_user(email, password, callback){
    
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
