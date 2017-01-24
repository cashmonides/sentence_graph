'use strict';

var ops = [
    {
        'name': '+',
        'f': function (a, b) {
            return a + b;
        },
        'difficulty': 1,
        'precedence': 4
    },
    {
        'name': '-',
        'f': function (a, b) {
            return a - b;
        },
        'difficulty': 2,
        'precedence': 4
    },
    {
        'name': '*',
        'f': function (a, b) {
            return a * b;
        },
        'difficulty': 3,
        'precedence': 5
    },
    {
        'name': '/',
        'f': function (a, b) {
            return a / b;
        },
        'difficulty': 4,
        'precedence': 5
    },
    {
        'name': '**',
        'f': function (a, b) {
            return Math.pow(a, b);
        },
        'difficulty': 10,
        'precedence': 6
    },
    {
        'name': '//',
        'f': function (a, b) {
            return Math.floor(a / b);
        },
        'difficulty': 14,
        'precedence': 5
    },
    {
        'name': '%',
        'f': function (a, b) {
            return a % b;
        },
        'difficulty': 14,
        'precedence': 5
    },
    {
        'name': '&',
        'f': function (a, b) {
            return a & b;
        },
        'difficulty': 20,
        'precedence': 3
    },
    {
        'name': '|',
        'f': function (a, b) {
            return a | b;
        },
        'difficulty': 20,
        'precedence': 1
    },
    {
        'name': '^',
        'f': function (a, b) {
            return a ^ b;
        },
        'difficulty': 20,
        'precedence': 2
    }
];

var create_op_dict = function () {
    var d = {};
    for (var i = 0; i < ops.length; i++) {
        d[ops[i].name] = ops[i];
    }
    return d;
}

var op_dict = create_op_dict();
