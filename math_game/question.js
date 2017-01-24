'use strict';

var Question = {
    'init': function () {
        this.level = 1.2;
        this.seeds = {};
        this.init_question();
    },
    'set_seed': function () {
        if (!(this.diff in this.seeds)) {
            this.seeds[this.diff] = Math.pow(this.diff, 2);
        } else {
            this.seeds[this.diff]++;
        }
        this.seed = this.seeds[this.diff];
    },
    'set_level': function (x) {
        this.level = x;
    },
    'init_question': function () {
        if (this.level >= 51) {
            el('problem').innerHTML = 'You win!';
            this.game_status = 'won';
            return;
        }
        this.correct_attempts = [];
        this.diff = Math.floor(this.level);
        this.set_seed();
        this.question = create_problem_wrapper_f(Math.floor(this.diff), this.seed);
        if (this.question === undefined) {
            // Consider the question correctly answered.
            this.correct_f();
        } else {
            this.display_question();
        }
    },
    'display_question': function () {
        el('problem').innerHTML = 'Difficulty: ' + this.diff + '<br/>' +
        'x = ' + this.question.x + '<br/>' + this.question.str;
    },
    'has_not_yet_answered': function (n) {
        return this.correct_attempts.indexOf(n) === -1;
    },
    'answer': function (n) {
        if (this.game_status === 'won') {
            el('problem').innerHTML = 'You already won!';
            return;
        }
        var status = check_num_answer(n, this.question);
        if (status === 'intended') {
            this.correct_f();
        } else if (status === 'correct') {
            if (this.has_not_yet_answered(n)) {
                this.correct_attempts.push(n);
                el('problem').innerHTML += '<br/>' + n + ' is correct but not intended.';
            } else {
                el('problem').innerHTML += '<br/>' + n + ' is correct but not intended, ' +
                'but you have already given it as an answer.';
            }
            if (this.correct_attempts.length === 3) {
                this.correct_f();
            }
        } else {
            el('problem').innerHTML += '<br/>' + n + ' is ' + status + '.';
        }
    },
    'skip': function () {
        if (this.level > 0.5) {
            this.level -= 0.5;
        }
        this.init_question();
    },
    'correct_f': function () {
        this.level += 0.3;
        // Ask a new question.
        this.init_question();
    },
    'set_level': function (x) {
        if (Number.isFinite(x)) {
            this.level = x;
        }
    }
}