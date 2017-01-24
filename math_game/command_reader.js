'use strict';

var commands = {
    'calc': calc_op(calculator),
    'calculator': calc_op(calculator),
    'base': calc_op(base_convert),
    'level': {
        'f': function (x) {
            Question.set_level(parseInt(x, 10));
            Question.init_question();
        },
        'arg': true
    },
    'skip': {
        'f': function (x) {
            Question.skip();
        },
        'arg': false
    }
}

var show_invalid = function (x) {
    el('other').innerHTML = 'Invalid command.';
}

var clear_boxes = function () {
    el('command_input').value = '';
    el('other').innerHTML = '';
}

var process_input = function (input) {
    clear_boxes();
    if (/^-?\d+$/.exec(input)) {
        Question.answer(parseInt(input, 10));
    } else {
        process_typical_input(input);
    }
}

var process_typical_input = function (input) {
    var parts = input.split(' ');
    if (!(parts[0] in commands)) {
        show_invalid();
        return;
    }
    var command = commands[parts[0]];
    if (parts.length === 1) {
        if (command.arg === true) {
            show_invalid();
            return;
        }
        command.f();
    } else {
        if (command.arg === false) {
            show_invalid();
            return;
        }
        command.f(parts.slice(1).join(' '));
    }
}

window.onload = function () {
    Question.init();
    el('command_input').addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            process_input(el('command_input').value);
        }
    });
}
