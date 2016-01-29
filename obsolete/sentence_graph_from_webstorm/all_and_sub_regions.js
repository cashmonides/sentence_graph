// This function displays all the regions of a sentence in the all regions box.
function display_all_regions (sentence) {
    // We let e be the all regions box.
    var e = document.getElementById("all_regions");
    // We get rid of anything inside.
    e.innerHTML = "";
    // We iterate over regions of the sentence.
    var r = sentence.regions;
    for (var i = 0; i < r.length; i++) {
        // We let o be an option.
        var o = document.createElement('option');
        // Its inner html is the text of the region, plus some description
        // of any tags it may have.
        o.innerHTML = sentence.indices_to_string(r[i].indices) + ' ' +
        (r[i].tags.length === 0 ? ' has no tags' : ' = ' + r[i].tags.map(function (x) {
            return x.get_tag_type()}).join(', '));
        // We append it as a child to e.
        e.appendChild(o);
    }
}

// This function sets the behavior of the all regions box, given the sentence.
function set_all_regions_behavior(sentence, word_selector) {
    // e is the all regions box.
    var e = document.getElementById("all_regions");
    e.onclick = function () {
        // This occurs if no region is selected, that is,
        // if the user clicks somewhere else in the box.
        // This can happen for short sentences that don't fill the box.
        if (e.selectedIndex === -1) {alert("select a region."); return null}
        // We show the sub-regions of the clicked region.
        show_sub_regions(sentence, e.selectedIndex);
        // We make the words of the region green.
        word_selector.turn_words_in(sentence.regions[e.selectedIndex].indices, "green")
    }
}

// This function shows the sub-regions of a given region given
// the sentence and the index of that region in sentence.regions,
// which is the same as its index in the all regions box.
function show_sub_regions(sentence, index) {
    // e is the sub-regions box.
    var e = document.getElementById("sub_regions");
    // We get rid of anything inside.
    e.innerHTML = "";
    // We iterate over the regions of the sentence.
    for (var i = 0; i < sentence.regions.length; i++) {
        // We check whether sentence.regions[i] is a sub-region of
        // sentence.regions[index].
        if (sentence.regions[i].is_a_sub_region_of(sentence.regions[index])) {
            // We create an option.
            var o = document.createElement('option');
            // Its inner html is the text of the region.
            o.innerHTML = sentence.indices_to_string(sentence.regions[i].indices);
            // We append it as a child to e.
            e.appendChild(o)
        }
    }
}
