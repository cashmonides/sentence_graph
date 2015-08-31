
window.onload = start;

function start(){
    
    load(data_loaded);
    
};


//data_loaded gets passed the data that comes back to us from firebase
//so we want to deserialize this data
function data_loaded(data){
    
    var sentence = deserialize(data);
    console.log(sentence);
    var ws = new WordSelector("testbox", sentence.words);
    ws.setup();
    generate_question(sentence);
    
};


//step 1 : create a set of available tags
//step 2: pick randomly a target tag and tell the user to match it
//step 3: user submits the answer in the form of indices
//step 4: check answer by loking for target tag in tag list for that region
function generate_question(sentence){
   
    var available_tags = [];
    
    for (var i in sentence.regions) {
        var r = sentence.regions[i];
        available_tags = available_tags.concat(r.tags); 
        console.log("tag concatenated!");
    }
   var target_tag = available_tags[Math.floor(available_tags.length * Math.random())];
   console.log(":target_tag = " + target_tag);
   
   document.getElementById("questionbox").innerHTML = "Click on the word that matches " + target_tag.get_tag_type();
   
};
