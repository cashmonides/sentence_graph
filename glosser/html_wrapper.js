var generate_gloss = function () {
    var b = el('input_box').value;
    main(b, function (x) {
        el('output_box').value = x;
    });
}

var start = function () {
    var my_button = document.getElementById("click_button");
    
    my_button.addEventListener('click', generate_gloss, false);
}

window.onload = start;