var calculate_word_mastery = function (correct, total, minimum_exposure) {
    return (correct - minimum_exposure) / total;
}


// front stage conversion
// between -5 and -3 display_score = 0/10
// between -3 and 0 display score = 1/10
// mastery of 0.1 = 1/10
//mastery of 0.3 = 3/10 
// etc.
var convert_mastery = function (mastery) {
    var out_of_ten;
    if (mastery < -4) {
        out_of_ten = 0;
    } else if (mastery < 0) {
        out_of_ten = 1;
    } else {
        out_of_ten = 2 + Math.round(Math.max(0, mastery * 8));
    }
    return out_of_ten + ' / 10';
}

var history_display = function (uid, e) {
    Persist.get(['word_scores', uid], function (x) {
        var data = x.val();
        if (!data || (typeof data !== 'object')) {
            return;
        }
        var data_list = values(data).filter(function (x) {
            return typeof x === 'object'
        }).map(function (data_item) {
            return convert_mastery(data_item.mastery) + ': ' + data_item.item.replace(/%/g, '/');
        }).sort();
        e.innerHTML = data_list.join('<br/>');
    });
}