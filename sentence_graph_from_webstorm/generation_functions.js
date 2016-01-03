// This function creates buttons in the button area.
// It has no return value and is called for its side effects.
// Its parameters are the sentence, the word selector, and the list of tags.
function generate_buttons(sentence, word_selector, tag_list) {
    // This is the button area.
    var e = document.getElementById("buttons");
    // We log the tag list for debugging purposes.
    console.log("tag_list = ", JSON.stringify(tag_list));
    // We iterate over the elements of the tag list.
    for (var i = 0; i < tag_list.length; i++) {
        // We create a button.
        var s = document.createElement('button');
        // We make its inner html an element of the tag list.
        s.innerHTML = tag_list[i];
        // This is a clever thing to do with closures.
        // The idea is that we want to fix the tag submitted, which we do by making
        // a function that takes it as an argument and then gives us the function
        // we actually want as a return value.
        s.onclick = (function (t) {
            return function () {submit_tag_and_clean_up(t, sentence, word_selector)}
        })(tag_list[i]);
        // We append our button as a child of the button area.
        e.appendChild(s);
    }
}

// This function is called for its side effects and has no return value.
// It takes the sentence and a tag parameters.
// It shows the appropriate words in the regions area snd has no other side effects.
generate_regions = function (sentence, tag) {
    // We call the regions area e.
    var e = document.getElementById("regions");
    e.innerHTML = "";
    // We iterate over regions of the sentence.
    var r = sentence.regions_with(tag);
    for (var i = 0; i < r.length; i++) {
        // We create an option.
        var o = document.createElement('option');
        // Its inner html is the text of the region.
        o.innerHTML = sentence.indices_to_string(r[i].indices);
        // We append it as a child to e.
        e.appendChild(o);
        // We do a debugging log.
        console.log("found tag", r[i].indices);
    }
};

// This function creates tags in the tag area.
// It has no return value and is called for its side effects.
// Its parameters are the sentence and the list of tags.
function generate_tags(sentence, tag_list) {
    // This is the tag area.
    var e = document.getElementById("tags");
    // We iterate over the elements of the tag list.
    for (var i = 0; i < tag_list.length; i++) {
        // We create an option element.
        var o = document.createElement("option");
        // We set its inner html to an item of the tag list.
        o.innerHTML = tag_list[i];
        // We append it as a child of the tag area.
        e.appendChild(o);
    }
    // When a change occurs in the tag area, we call the generate_regions
    // function, which shows the correct regions in the regions area.
    e.onclick = function () {
        // This occurs if no tag is selected, that is, if the user clicks
        // somewhere else in the box. This is not currently possible,
        // but let's be safe.
        if (e.selectedIndex === -1) {alert("Select a tag."); return null}
        generate_regions(sentence, e.options[e.selectedIndex].value);
    };
}
