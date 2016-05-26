// This file has utils that still don't fit anywhere else.
// Now that the string utils are gone, this file is very small.

//below should be our separate abstraction of get_accuracy - not done yet
//takes an object (a module inside of metrics, which is a map of numbers to numbers - i.e. attempts to counts
//returns a number
var get_accuracy3 = function (iteration) {
    return percentage(iteration[0], sum(values(iteration)));
};

var percentage = function (a, b) {
    return Math.floor(100 * a / b);
}

var constant = function (x) {
    return function () {
        return x;
    }
}

var pass = function () {}

var identity = function (x) {
    return x;
}

var hash = function (x) {
    var internal_hash = 0;
    if (x.length == 0) {return internal_hash};
    for (var i = 0; i < x.length; i++) {
        internal_hash = ((internal_hash << 5) - internal_hash)
        + x.charCodeAt(i);
    }
    return internal_hash;
}


// The utils below feel somewhat hacky for some reason.

// Very valuable for understanding, 
var getting = function (prop, f, get_user) {
    return function () {
        var self;
        if (get_user) {
            self = get_user(this);
        } else {
            self = this;
        };
        var internal_prop = ["users", self.uid].concat(prop);
        var args = arguments;
        Persist.get(internal_prop, function (x) {
            f.bind(self, x.val()).apply(self, args)
        });
    }
}

var to_array = function (x) {
    return Array.prototype.slice.call(x);
}

var debug_via_log = function (f, name) {
    if (typeof f === 'function') {
        return function () {
            console.log('entering ' + name + ', arguments:',
            to_array(arguments));
            var r = f.apply(this, arguments);
            console.log('exiting ' + name + ', returned value:', r);
            return r;
        }
    } else {
        return f;
    }
}

var do_all = function () {
    var args = to_array(arguments);
    console.log(args);
    return function () {
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] === 'function') {
                 args[i].apply(this, arguments);
            }
        }
    }
}

var safe_lookup = function () {
    // Not strictly necessary.
    var args = to_array(arguments);
    var v = args[0];
    for (var i = 1; i < args.length; i++) {
        if (typeof v === 'object' && args[i] in v) {
            v = v[args[i]];
        } else {
            console.log('lookup failed! args =', args);
            return null;
        }
    }
    return v;
}

var current_time = function () {
    return Date.now ? Date.now() : new Date().getTime();
}