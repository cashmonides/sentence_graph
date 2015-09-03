
window.onload = start;

function start(){
    
    load(data_loaded);
    
};

var wordSel = null;
var target_tag = null;
var sentences = null;
var sentence = null;
var count_correct = 0;
var count_incorrect = 0;

//data_loaded gets passed the data that comes back to us from firebase
//so we want to deserialize this data
function data_loaded(data){
    
    sentences = deserialize(data);
    console.log("sentences loaded: ", sentences.length);
    generate_question(sentences);
    
};


//step 1 : create a set of available tags
//step 2: pick randomly a target tag and tell the user to match it
//step 3: user submits the answer in the form of indices
//step 4: check answer by looking for target tag in tag list for that region
function generate_question(sentences){
   
    document.getElementById("scorebox").innerHTML = "Correct: " + count_correct + ", Incorrect: " + count_incorrect;

    var available_tags = [];
    sentence = random_choice(sentences);
    
    
    for (var i in sentence.regions) {
        var r = sentence.regions[i];
        console.log("DEBUG 9-3 r.tags = ", r.get_tag_types(), sentence.get_region_text(r));
        available_tags = available_tags.concat(r.tags); 
        console.log("tag concatenated!");
    }
    target_tag = random_choice(available_tags);
    console.log(":target_tag = " + target_tag);
   
    document.getElementById("questionbox").innerHTML = "Click on the word that matches " + target_tag.get_tag_type();
   
    document.getElementById("testbox").innerHTML = "";
    wordSel = new WordSelector("testbox", sentence.words);
    wordSel.setup();
   
};



function submit_answer() {

    var answer_indices = wordSel.get_selected_indices();
    console.log("answer_indices = ", answer_indices);
    var answer_region = sentence.get_region(answer_indices);
    var tag_names = answer_region.get_tag_types();
    
    console.log("tag names:", tag_names);
    console.log("target type: ", target_tag.get_tag_type());

   
    if (tag_names.indexOf(target_tag.get_tag_type()) != -1) {
        
        // right answer
        console.log("answer matches target");        
        count_correct ++;
        
    } else {
        
        // wrong answer
        count_incorrect ++;
        
    }
    
    display_feedback();
    generate_question(sentences);
    
    //safe version
    // for (var i in answer_region.tags) {
    //     if (target_tag.get_tag_type() === answer_region.tags[i].get_tag_type()) {

    //         break;
    //     } else {
    //         console.log("no match for ", answer_region.tags[i]);
    //     }
    // }
    
}

function display_feedback(){
    
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = "";
    
    for(var ri in sentence.get_regions()){
        var r = sentence.get_regions()[ri];
        for(ti in r.get_tags()){
            var t = r.get_tags()[ti];
            if(t.get_tag_type() == target_tag.get_tag_type()){
                var text = sentence.get_region_text(r);
                console.log("this was a solution:", text);
                fbox.innerHTML += text + "<br>";
            }
        }
    }
    
}


