var legal_answer_types = ['correct', 'incorrect', 'convention', 'message', 'defensible', 'transcendent'];

var goodness_dict = {
    'transcendent': 4,
    'correct': 3,
    'convention': 2,
    'defensible': 1,
    'incorrect': 0
}

var is_answer_type = function (x) {
    return legal_answer_types.indexOf(x) !== -1;
}

var check_is_answer_type = function (x, error) {
    if (!(is_answer_type(x))) {
        throw error;
    }
}

var LegalAnswerType = function (x, info) {
    check_is_answer_type(x, 'Illegal answer type (' + x + ') generated.');
    this.text = x;
    if (info !== undefined) {
        this.info = info;
    }
}

LegalAnswerType.prototype.is_type = function (x) {
    if (typeof x === 'string') {
        check_is_answer_type(x, 'Illegal answer type checked against.');
        return this.text === x;
    } else if (typeof x === LegalAnswerType) {
        return this.text === x.text;
    } else {
        throw 'Illegal comparison to answer type.'
    }
}

LegalAnswerType.prototype.get = function (x) {
    if (!('info' in this)) {
        throw 'Getting property ' + x + ' of answer type with no info.';
    } else if (!(x in this.info)) {
        throw 'Getting non-existant property (' + x + ') of answer type.';
    }
    return this.info[x];
}

LegalAnswerType.prototype.to_goodness = function () {
    if (this.text in goodness_dict) {
        return goodness_dict[this.text];
    } else {
        throw 'Getting goodness of answer type with no goodness.';
    }
}

var combine_answer_types = function (answer_types) {
    return answer_types.reduce(function (a, b) {
        if (a.to_goodness() < b.to_goodness()) {
            return a;
        } else {
            return b;
        }
    });
}

var answer_type_from = function (bool) {
    if (bool === true) {
        return new LegalAnswerType('correct');
    } else if (bool === false) {
        return new LegalAnswerType('incorrect');
    } else {
        throw 'Answer types can only be generated from booleans.';
    }
}