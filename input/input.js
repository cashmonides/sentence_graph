var test_correct_string = "the bear loves the horse";
    
var target;

var test_list = ["the bear", "loves", "the horse"];
  
// var container = document.getElementById("blank_fill");

window.onload = function () {
    console.log("Window onload entered");
    target = pick_blank_target(test_list);
    // var target_index = get_target_index(test_list, target);
    // make_blank_fill(test_list, target);
    
    
    var blanked_list = convert_list_to_blank(test_list, target);
    make_blank_fill2(blanked_list);
}


var get_target_index = function (list, target) {
    var target_index;
    
    for (var i=0; list.length; i++) {
        if (list[i] === target) {
            target_index = i;
            console.log("target_index = ", target_index);
            return;
        }
    }
};

var pick_blank_target = function (list) {
    
    var target = list[Math.floor(Math.random()*list.length)];
    
    console.log("target = ", target);
    
    return target;
    
};


var convert_list_to_blank = function (list, target) {
    // var target_index = get_target_index(list, target);
    
    var target_index2 = list.indexOf(target);
    
    if (target_index2 !== -1) {
        list[target_index2] = "xyz";
    }
    console.log("listy after conversion = ", list);
    return list;
}


var make_blank_fill2 = function (list) {
    
    
    
    var container = document.getElementById("blank_fill");
    console.log("make_blank_fill2 entered");
    console.log("container = ", container);
    
    
    // var input_field = document.createElement("input");
    // input_field.type = "text";
    // input_field.setAttribute("id", "blank_answer_input_box");
    
    
    for (var i=0; i < list.length; i++) {
        if (list[i] === "xyz") {
            var input_field = document.createElement("input");
            input_field.type = "text";
            input_field.setAttribute("id", "blank_answer_input_box");
            container.appendChild(input_field);
        } else {
            var text = document.createTextNode(list[i]);
            container.appendChild(text);
        }
    }
    
    return;
    
    
    
    // var text = document.createTextNode(test_list[0]);
    // var text2 = document.createTextNode(test_list[2]);
    
    // container.appendChild(text);
    
    // container.appendChild(text2);
}








var make_blank_fill = function (list, target) {
    
    var target_index = get_target_index(list, target);
    
    var container = document.getElementById("blank_fill");
    console.log("make_blank_fill entered");
    console.log("container = ", container);
    var input_field = document.createElement("input");
    input_field.type = "text";
    input_field.setAttribute("id", "blank_answer_input_box");
    
    var text = document.createTextNode(test_list[0]);
    var text2 = document.createTextNode(test_list[2]);
    
    container.appendChild(text);
    container.appendChild(input_field);
    container.appendChild(text2);
}



var process_input_blank = function () {
    
    var answer_input = document.getElementById("blank_answer_input_box").value;
    var answer_input_2 = answer_input.replace(/[.,!]/g,"");
    var answer_input_3 = answer_input_2.replace(/\s{2,}/g," ");
    var answer_input_4 = answer_input_3.toLowerCase();
        
    if (answer_input_4 === target) {
        console.log("correct");
    } else {
        console.log("incorrect! The correct answer is: ", test_correct_string);
    }
}   
    
var process_input = function () {
    var answer_input = document.getElementById("answer_input_box").value;
    var answer_input_2 = answer_input.replace(/[.,!]/g,"");
    var answer_input_3 = answer_input_2.replace(/\s{2,}/g," ");
    var answer_input_4 = answer_input_3.toLowerCase();
        
    if (answer_input_4 === test_correct_string) {
        console.log("correct");
    } else {
        console.log("incorrect! The correct answer is: ", test_correct_string);
    }
}