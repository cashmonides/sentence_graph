// start just loads the page
// user types in parameters
// user clicks on "make game" button
// that sends to firebase
// with a callback
// callback displays pin
// and sets up a countdown



window.onload = start;

function start() {
    
}

var make_spelling_match = function (level, time_limit) {
    
    
    
    var pin = autogenerate_spelling_match_pin()
    display_spelling_match_pin(pin);
    
    send_spelling_match_to_firebase(level, time_limit, pin);
    
    // get timer from firebase
    // set timer display
    
}   


var send_spelling_match_to_firebase = function (level, time_limit, pin) {
    // persist - make the object
}

var autogenerate_spelling_match_pin = function () {
    return 1456323;
}

var display_spelling_match_pin = function (pin) {
    //stringify pin if necessary
    el("spelling_match_pin_cell").innerHTML = pin;
}