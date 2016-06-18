// Somehow it feels messy to do this outside of a function.
// So we create a function to do it.
// This may be stupid.
var get_in_production_switch = function () {
    return document.location.href.indexOf('sentence-graph') === -1;
}

var IN_PRODUCTION_SWITCH = get_in_production_switch();