var default_behaviors = {
    'redo': function () {
        return {
            'done': false,
            'call': this._execute.bind(this)
        }
    }
}

var test_from = function (x) {
    if (x instanceof RegExp) {
        return {
            check: function (string) {
                return x.exec(string);
            }
        }
    } else {
        return {
            check: function (y) {
                return x === y;
            }
        }
    }
}

var CatchErrors = function (f) {
    this.function = f;
    this.behaviors = default_behaviors;
    this.exceptions = [];
};

CatchErrors.prototype.execute = function (f, args) {
    if (typeof f !== 'function') {
        throw JSON.stringify(f) + ' is not a function!';
    }
    // This variable tracks whether we 
    var ok;
    try {
        ok = true;
        console.log(f, null, args);
        var v = f.apply(null, args);
    } catch (e) {
        ok = false;
        var info = this.get_exception_info_from(e, args);
        var behavior = this.get_behavior_from(info);
        if (behavior in this.behaviors) {
            return this.behaviors[behavior].call(this);
        } else if (typeof e === 'object' && behavior in e) {
            return e[behavior];
        } else {
            throw 'Could not find what to do with ' + behavior +
            ' while handling: ' + JSON.stringify(e);
        }
    }
    if (ok) {
        return {
            done: true,
            value: v
        }
    }
}

CatchErrors.prototype.catch = function (r, f) {
    this.exceptions.push({
        test: test_from(r),
        value: f
    });
    return this;
}

CatchErrors.prototype.get_exception_info_from = function (e) {
    if (typeof e === 'string') {
        return e;
    } else {
        return e.info;
    }
}

CatchErrors.prototype.get_behavior_from = function (e, args) {
    for (var i = 0; i < this.exceptions.length; i++) {
        var check_result = this.exceptions[i].test.check(e);
        if (check_result) {
            return this.exceptions[i].value(check_result, args);
        }
    }
}

CatchErrors.prototype.end = function () {
    var outer_this = this;
    return function () {
        // Initial thing to do.
        var result = {
            done: false,
            call: outer_this.function.bind(this)
        };
        while (!result.done) {
            result = outer_this.execute(result.call, arguments);
        }
        return result.result;
    }
}