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
    return out_of_ten + '/10';
}

var convert_word_score_accuracy_and_mastery = function (correct, total, mastery) {
    var out_of_ten;
    if (mastery < -4) {
        out_of_ten = 0;
    } else if (mastery < 0) {
        out_of_ten = 1;
    } else {
        out_of_ten = 2 + Math.round(Math.max(0, mastery * 8));
    }
    var completion = out_of_ten + '/10';
    
    var percentage = correct / total;
    var rounded_percentage = Math.floor(percentage * 100)
    var percentage_string = rounded_percentage + '%';
    // return rounded_percentage + '% accuracy ||| ' + 'completion: ' + completion;
    return 'completion: ' + completion + ' ||| ' + 'accuracy: ' + percentage_string;
}


function sort_number2(a,b) {
    return a - b;
}


// below from stack overflow to compare mixture of numbers and strings
function sort_number (a,b) {
  var a1=typeof a, b1=typeof b;
  return a1<b1 ? -1 : a1>b1 ? 1 : a<b ? -1 : a>b ? 1 : 0;
};



// combines accuracy and mastery (called completion)
var history_display = function (uid, e) {
    Persist.get(['word_scores', uid], function (x) {
        var data = x.val();
        if (!data || (typeof data !== 'object')) {
            return;
        }
        
        // old version
        // var data_list = values(data).filter(function (x) {
        //     return typeof x === 'object'
        // }).map(function (data_item) {
        //     return convert_word_score_accuracy_and_mastery(data_item.correct, data_item.total, data_item.mastery) + ': ' + data_item.item.replace(/%/g, '/');
        // }).sort();
        
        var data_list = values(data).filter(function (x) {
            return typeof x === 'object'
        }).map(function (data_item) {
            return convert_word_score_accuracy_and_mastery(data_item.correct, data_item.total, data_item.mastery) + ': ' + data_item.item.replace(/%/g, '/');
        });
        
        // var sorted_data_list = data_list.sort();
        console.log("DATA_LIST = ", data_list);
        var sorted_data_list = data_list.sort(sort_number);
        // var sorted_data_list = data_list.sort(function(a,b) { return a - b; });
        e.innerHTML = sorted_data_list.join('<br/>');
    });
}



















// below is one alternative of display
// displays mastery score (which is eventually converted to a x/10 display)
// pros: mastery is a good long term metric
// cons: the advance is slow in the course of a short term game (1 month)
var history_display_mastery = function (uid, e) {
    Persist.get(['word_scores', uid], function (x) {
        var data = x.val();
        if (!data || (typeof data !== 'object')) {
            return;
        }
        // old version sorted by x/10
        // var data_list = values(data).filter(function (x) {
        //     return typeof x === 'object'
        // }).map(function (data_item) {
        //     return convert_mastery(data_item.mastery) + ': ' + data_item.item.replace(/%/g, '/');
        // }).sort();
        
        // new version sorts by accuracy
        var data_list = values(data).filter(function (x) {
            return typeof x === 'object'
        }).map(function (data_item) {
            return convert_mastery(data_item.mastery) + ': ' + data_item.item.replace(/%/g, '/');
        });
        var sorted_data_list = data_list.sort(sort_number)
        e.innerHTML = sorted_data_list.join('<br/>');
    });
}

// below is another alternative of display
// which shows just raw accuracy
var history_display_accuracy = function (uid, e) {
    Persist.get(['word_scores', uid], function (x) {
        var data = x.val();
        if (!data || (typeof data !== 'object')) {
            return;
        }
        var data_list = values(data).filter(function (x) {
            return typeof x === 'object'
        }).map(function (data_item) {
            return convert_word_score_accuracy(data_item.correct, data_item.total) + ': ' + data_item.item.replace(/%/g, '/');
        }).sort();
        e.innerHTML = data_list.join('<br/>');
    });
}