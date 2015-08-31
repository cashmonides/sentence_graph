var fbase = new Firebase('https://sentence-tagging.firebaseio.com/');

//

// function save(sentence) {
//     fbase.child("sentence").once("value",                               //creates a request, once only, asks the firebase database for the value at that node (student>name)
//         function (response) {                                                        //when the response comes back, it does the function and passes in the response
//             var exists = response.val();                                         //returns an object, which is the val of response (the contents of the node)
//             console.log(exists);
//         }
//     );

//     set_score("jane doe", "500");
// };


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


};


function load (callback) {
    fbase.child("sentence").once("value", callback);
};


function deserialize(data){

    var all_sentences = data.val();

    var unique_ids = Object.keys(all_sentences)
    console.log(unique_ids);
    
    var one_sentence = all_sentences[unique_ids[0]]; 
    
    var x = JSON.parse(one_sentence.data, reviver);
    // console.log(x);
    return x;

};

function reviver(key, value){
    
    // console.log(key, value);
    
    if(value != null && value.hasOwnProperty("class_id")){
        // console.log("found class!", value);
        
        var obj;
        
        switch(value.class_id){
            case 1: obj = new Sentence(); break
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
