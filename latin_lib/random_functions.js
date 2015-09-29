function rand_int(x) {
    return Math.floor(Math.random()*x)
}

function random_choice(choices){
    var xyz = rand_int(choices.length);
    return choices[xyz];
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
    console.log("TEST of list_1 and list_2 in shuffle two lists ", list_1, list_2);
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