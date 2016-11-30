var MAX_ANSWER_LENGTH = 120;

var min_by_first = function (list) {
    var best_so_far = [null, Infinity];
    for (var i = 0; i < list.length; i++) {
        if (list[i][1] < best_so_far[1]) {
            best_so_far = list[i];
        }
    }
    return best_so_far;
}

var levenshtein = function (correct, given) {
    if (given.length > MAX_ANSWER_LENGTH) {
        return {
            'error': 'answer longer than max answer length ('
            + MAX_ANSWER_LENGTH + ')'
        }
    }
    var list = [];
    var get_item = function (i, j) {
        if (i >= 0 && j >= 0) {
            return list[i][j];
        } else {
            return ['out of bounds', Infinity];
        }
    }
    var add_to_list = function (item) {
        list[list.length - 1].push(item);
    }
    for (var i = 0; i <= correct.length; i++) {
        list.push([]);
        for (var j = 0; j <= given.length; j++) {
            if (i === 0 && j === 0) {
                add_to_list(['start', 0]);
            } else if (i > 0 && j > 0 && correct[i - 1] === given[j - 1]) {
                add_to_list(['given and correct have a match', get_item(i - 1, j - 1)[1]]);
            } else {
                add_to_list(min_by_first([
                    ['given missing correct character', get_item(i - 1, j)[1] + 1],
                    ['given has extra character', get_item(i, j - 1)[1] + 1],
                    ['given and correct have a mismatch', get_item(i - 1, j - 1)[1] + 1]
                ]));
            }
        }
    }
    var differences = [];
    var current_i = correct.length;
    var current_j = given.length;
    while (current_i !== 0 || current_j !== 0) {
        var item = get_item(current_i, current_j)[0];
        if (item === 'given and correct have a match') {
            differences.push([given[current_j - 1], 'green']);
            current_i--;
            current_j--;
        } else if (item === 'given missing correct character') {
            differences.push(['_', 'red']);
            current_i--;
        } else if (item === 'given has extra character') {
            differences.push([given[current_j - 1], 'red']);
            current_j--;
        } else if (item === 'given and correct have a mismatch') {
            differences.push([given[current_j - 1], 'red']);
            current_i--;
            current_j--;
        } else {
            return {'error': 'what is going on? item = ' + item};
        }
    }
    return {'feedback': differences.reverse()};
}
