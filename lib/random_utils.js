// This file contains utils which are mostly about randomness.

function rand_int(x) {
    return Math.floor(Math.random()*x)
}

function random_choice(list) {
    return list[rand_int(list.length)];
}

function shuffle(list) {
    for (var i = (list.length - 1); i > 0; i--) {
        var j = rand_int(i + 1);
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
}

function shuffle_two_lists(list_1, list_2) {
    //~`console.log("TEST of list_1 and list_2 in shuffle two lists ", list_1, list_2);
    if (Math.random() < 1 / 2) {
        return list_1.concat(list_2)
    } else {
        return list_2.concat(list_1)
    }
}

function weighted(dict) {
    var x = 0;
    var i;
    for (i in dict) {
        x += dict[i];
    }
    var random_number = Math.random() * x;
    for (i in dict) {
        random_number -= dict[i];
        if (random_number < 0) {
            return i;
        }
    }
}

// This function is best when most of the possible options
// satisfy the constraint.
var random_satisfying_constraint = function (possible, constraint) {
    var r;
    for (var i = 0; i < possible.length; i++) {
        r = random_choice(possible);
        if (constraint(r)) {
            return r;
        }
    }
    for (var i = 0; i < possible.length; i++) {
        r = possible[i];
        if (constraint(r)) {
            return r;
        }
    }
    return null;
};

var push_random_n_satisfying_constraint = function (
already_there, possible, constraint, n) {
    var next;
    for (var i = 0; i < n; i++) {
        next = random_satisfying_constraint(possible, function (x) {
            return constraint(x) && already_there.indexOf(x) === -1;
        });
        if (next === null) {break} else {already_there.push(next)}
    };
    return already_there;
}

var random_n = function (list, n) {
    var next;
    var result = [];
    for (var i = 0; i < n; i++) {
        next = random_satisfying_constraint(list, function (x) {
            return result.indexOf(x) === -1});
        if (next === null) {break} else {result.push(next)}
    };
    return result;
}


function random_choices(list, n) {
    var result = [];
    push_random_n_satisfying_constraint(result, list, function () {return true}, n)
    return result;
}

var random_letter = function () {
    return String.fromCharCode(97 + rand_int(26));
}

var random_string = function (n) {
    var s = '';
    for (var i = 0; i < n; i++) {
        s += random_letter();
    }
    return s;
}