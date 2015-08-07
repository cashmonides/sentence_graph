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
