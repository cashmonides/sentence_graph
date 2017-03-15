var offsets = {
    'n': [1, 0],
    'e': [0, 1],
    'w': [0, -1],
    's': [-1, 0],
}

var mult = function (a, b) {
    return a * b;
}

var add = function (a, b) {
    return a + b;
}

var ops = {
    '*': ['*', mult, 'multiplication'],
    '+': ['+', add, 'addition']
}

var randint = function (n) {
    return Math.floor(n * Math.random());
}

var pluralize = function (n, s) {
    if (n === 1) {
        return s;
    } else {
        return s + 's';
    }
}

var add_ing = function (s) {
    return s.replace(' ', 'ing '); // single replace
}

var challenge = function (how_many, op_name, what, cond) {
    if (!cond) {
        return false;
    }
    var op = ops[op_name];
    alert('You have to solve ' + how_many + ' ' + op[2] + ' ' + pluralize(how_many, 'problem')
        + ' to ' + what + '.');
    for (var i = 0; i < how_many; i++) {
        var x = randint(20);
        var y = randint(20);
        var z = op[1](x, y);
        var z_as_string = z.toString();
        var answer = prompt('What is ' + [x, op[0], y].join(' ') + '?');
        if (answer !== z_as_string) {
            alert('You fail to ' + what + '.');
            return false;
        }
    }
    alert('You succeed in ' + add_ing(what) + '.');
    return true;
}

var size = 3;

var play = function () {
    var explored = {'0 0': true};
    var num_explored = 1;
    var num_rooms = Math.pow(1 + size, 2);
    var loc = [0, 0];
    while (num_explored < num_rooms) {
        alert('Current location: ' + loc[0] + ' north, ' + loc[1] + ' east');
        var d = 'x';
        while (!(d[0] in offsets)) {
            d = prompt('Direction to move in (north, east, south, west, quit to quit)');
            if (d == 'quit') {
                return;
            }
            if (!(d[0] in offsets)) {
                alert('Invalid direction.');
            }
        }
        var offset = offsets[d[0]];
        var new_loc = [loc[0] + offset[0], loc[1] + offset[1]];
        if (0 > new_loc[0] || new_loc[0] > size || 0 > new_loc[1] || new_loc[1] > size) {
            alert('You can\'t go that way.');
            continue;
        }
        var opened_door = challenge(1, '*', 'open the door', true);
        var entered_room = challenge(10, '+', 'enter the room', opened_door);
        if (entered_room) {
            loc = new_loc;
            if (!(loc.join(' ') in explored)) {
                explored[loc.join(' ')] = true;
                num_explored++;
            }
        }
    }
    alert('You explored every room! You win!');
}

window.onload = play;
