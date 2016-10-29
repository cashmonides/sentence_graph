/*
set allowed properties
pick combination from allowed
bundle into kernel
send kernel to inflect latin verb's three parts
store result as "old form"

pick new combination
store combination as: target_properties
do as above and store as new_form



make question:
"Change " + old_form "so it is " + target_properties"

check input
- match to new_form



*/

window.onload = start;




var test_tenses = ["present", "imperfect", "future", "perfect", "pluperfect", "future perfect"];
var test_moods = ["indicative", "subjunctive"];
var test_voices = ["active", "passive"];
var test_persons = ["1s", "2s", "3s", "1p", "2p", "3p"];


var test_kernel;

test_kernel.tense = random_choice(test_tenses);

test_kernel.mood = random_choice(test_moods);

test_kernel.voice = random_choice(test_voice);

test_kernel.person = random_choice(test_persons);

console.log("test_kernel = ", test_kernel);

var generate_morphology = function (kernel) {
    var beginning = inflect_latin_verb_beginning(kernel);

    console.log("beginning = ", beginning);


    var middle = inflect_latin_verb_middle(kernel);

    console.log("middle = ", middle);

    var middle = inflect_latin_verb_end(kernel);

    console.log("end = ", end);

    var output = beginning + middle + end;
    
    return output;
}





function start () {
    generate_morphology(test_kernel);
}