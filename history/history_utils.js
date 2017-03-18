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


function get_word_or_root_definition (string) {
    var word_data_item = words[string];
    console.log("WORD DATA ITEM = ", word_data_item);
    
    var output = "DEFAULT";
    var definition_string = "NO STRING YET";
    
    if (word_data_item) {
        definition_string = word_data_item.meaning;
        output = definition_string;
    } else {
        word_data_item = roots[string];
        definition_string = word_data_item.meaning;
        output = definition_string;
    }
    
    
    if (output) {
        return output;
    } else {
        
        return "NO MEANING FOUND";
    }
}



// below is march 9th version, doesn't create object, creates a string
// var convert_word_score_accuracy_and_mastery_old = function (correct, total, mastery) {
    
    
    
    
//     var out_of_ten;
//     if (mastery < -4) {
//         out_of_ten = 0;
//     } else if (mastery < 0) {
//         out_of_ten = 1;
//     } else {
//         out_of_ten = 2 + Math.round(Math.max(0, mastery * 8));
//     }
//     var completion = out_of_ten + '/10';
    
//     var percentage = correct / total;
//     var rounded_percentage = Math.floor(percentage * 100)
//     var percentage_string = rounded_percentage + '%';
//     // return rounded_percentage + '% accuracy ||| ' + 'completion: ' + completion;
//     return 'completion: ' + completion + ' ||| ' + 'accuracy: ' + percentage_string;
// }


var convert_word_score_accuracy_and_mastery = function (word, correct, total, mastery) {
    // step 1 make an object
    var word_score_display_object = {
        'word': word,
        'correct': correct,
        'total': total,
        'accuracy': null,
        'mastery': null
    };
    
    // step 2 fill in all the fields
    // step 3 produce list of objects
    // two ways
        // step 4 expedient way: match (sort by regex int before % string in string)
        // step 4 right way sort by x-property (returns a newly sorted list of object)
    // step 5 convert to list of strings
    
    
    
    
    
    
    
    // var definition = 'dummy definition';
    // below is a dummy example of what the data pulled from dictionary will look like
    // var definition = 'to state that something is <span class=\"embedded_root\">sure</span>';
    var definition = get_word_or_root_definition(word);
    
    console.log("DEFINITION  = ", definition);
    
    // now we want to use regex to pull out the embedded root and make it capitalized
    // g = global don't stop at first match
    // () = remember this part
    definition = definition.replace(/<span.+>(.+)<\/span>/g, function(_, a) {
        return a.toUpperCase();
    });
    
    
    
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
    
    
    word_score_display_object.accuracy = percentage_string;
    word_score_display_object.mastery = completion;
    
    
    var accuracy_threshold = .75;
    
    // if-block vertsion
    // var threshold_status;
    
    // if (correct / total > accuracy_threshold) {
    //     threshold_status = 'word_score_display_item_above_threshold';
    // } else  {
    //     threshold_status = 'word_score_display_item_below_threshold';
    // }
    
    // ternary version
    var threshold_status = (correct / total > accuracy_threshold) 
            ? 'word_score_display_item_above_threshold'
            : 'word_score_display_item_below_threshold';
    
    
    console.log("WORD SCORE OBJECT stringified = ", JSON.stringify(word_score_display_object));
    
    
    return 'completion: ' + completion + ' ||| ' + 'accuracy: ' + percentage_string + ': <span class="' + threshold_status +  '" title="' + definition + '">' + word.replace(/%/g, '/') + '</span>';
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
            
            // old version below just returns string which is then converted into html via innerHTML
            // return convert_word_score_accuracy_and_mastery(data_item.item.replace(/%/g, '/'), data_item.correct, data_item.total, data_item.mastery);
            
            // new version creates an html element directly in the string
            return '<p>' + convert_word_score_accuracy_and_mastery(data_item.item.replace(/%/g, '/'), data_item.correct, data_item.total, data_item.mastery) + '</p>';
            
            
            
        });
        
        // var sorted_data_list = data_list.sort();
        console.log("DATA_LIST = ", data_list);
        // old way was producing lexicographical sort
        // var sorted_data_list = data_list.sort(sort_number);
        
        var sorted_data_list = data_list.sort(function(a,b) { 
            //   regex s=whitespace
            //  regex . = any character except linebreak
            // regex \d = any digit
            // regex  X+ = one or more of any of preceding X character
            
            // parseInt produces an integer
            // parseInt b - parseInt a produces a sort function (0, -1, 1)
            
            // match returns a few things
                // a number like 0, -1, 1
                // the isolated thing isolated by the regex
                // the original string itself
                // or null if no match
            return parseInt(a.match(/\s\d+%/)[0], 10) - parseInt(b.match(/\s\d+%/)[0], 10);
        });
        
        
        e.innerHTML = sorted_data_list.join('');
    });
}



















// below is one alternative of display
// displays mastery score (which is eventually converted to a x/10 display)
// pros: mastery is a good long term metric
// // cons: the advance is slow in the course of a short term game (1 month)
// var history_display_mastery = function (uid, e) {
//     Persist.get(['word_scores', uid], function (x) {
//         var data = x.val();
//         if (!data || (typeof data !== 'object')) {
//             return;
//         }
//         // old version sorted by x/10
//         // var data_list = values(data).filter(function (x) {
//         //     return typeof x === 'object'
//         // }).map(function (data_item) {
//         //     return convert_mastery(data_item.mastery) + ': ' + data_item.item.replace(/%/g, '/');
//         // }).sort();
        
//         // new version sorts by accuracy
//         var data_list = values(data).filter(function (x) {
//             return typeof x === 'object'
//         }).map(function (data_item) {
//             return convert_mastery(data_item.mastery) + ': ' + data_item.item.replace(/%/g, '/');
//         });
//         var sorted_data_list = data_list.sort(sort_number)
//         e.innerHTML = sorted_data_list.join('<br/>');
//     });
// }

// // below is another alternative of display
// // which shows just raw accuracy
// var history_display_accuracy = function (uid, e) {
//     Persist.get(['word_scores', uid], function (x) {
//         var data = x.val();
//         if (!data || (typeof data !== 'object')) {
//             return;
//         }
//         var data_list = values(data).filter(function (x) {
//             return typeof x === 'object'
//         }).map(function (data_item) {
//             return convert_word_score_accuracy(data_item.correct, data_item.total) + ': ' + data_item.item.replace(/%/g, '/');
//         }).sort();
//         e.innerHTML = data_list.join('<br/>');
//     });
// }