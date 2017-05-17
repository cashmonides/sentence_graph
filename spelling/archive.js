var archive = function () {
    var p = prompt('Do you really want to refresh? If so, type "yes", if not click "OK"');
    var refresh_mode = hash(p);
    var hacky_mode = (2654043e2 - 1) * 5;
    if (hash(p) === hacky_mode) {
        // You are not expected to understand this.
        var penguin = 'word_scores_archive';
        var security_through_obscurity = 'word_scores';
        var variable = 'Persist'
        var method_1 = 'get';
        var method_3 = 'set';
        var method_2 = 'val';
        this[variable][method_1]([security_through_obscurity], function (param) {
            var brillig = security_through_obscurity + ' ' + (new Date()).toString();
            this[variable][method_3]([penguin, brillig], param[method_2]());
        })
    } else {
        // just refresh, no special handling needed.
        window.location.reload()
    }
}