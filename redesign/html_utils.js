// This file contains utils that deal with HTML.

// Ths function gets an element with a given name.
var el = function (x) {
    return document.getElementById(x);
}

// This function displays a string on the page.
var display_on_page = function (string) {
    el('output_box').value = string;
}

// This function removes all children from an element.
var remove_all_children = function (elem) {
    // Check if jQuery is defined. (Why else would '$' be a global variable?)
    if ('$' in window) {
        // StackOverflow says that jQuery needs this to clean up metadata.
        $(elem).empty();
    } else {
        // StackOverflow says this is quickest, although
        // there seems to be minor disagreement.
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    }
}