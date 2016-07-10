// This file contains utils that deal with HTML.

// Ths function gets an element with a given name.
var el = function (x) {
    return document.getElementById(x);
}

// This function displays a string on the page.
var display_on_page = function (string) {
    el('output_box').value = string;
}