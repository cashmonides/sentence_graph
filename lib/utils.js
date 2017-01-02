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

// I never use one-argument +. I am not going to start doing so now.
// Sometimes not using a feature even when it fits is better
// since it is good to have a limited number of features used.
// Other example: == null
// Originally:
// return typeof x === 'number' ? x : parseInt(x, 10);
// I was also against ternaries. How ironic.
var to_number = function (x) {
    if (typeof x === 'number') {
        return x;
    } else {
        var p = parseInt(x, 10);
        if (isNaN(p)) {
            return null;
        } else {
            return p;
        }
    }
}


// The utils below feel somewhat hacky for some reason.

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


var generate_ordinal_suffix = function (int) {
    if ([11, 12, 13].indexOf(int % 100) !== -1) {
        // 11, 12, 13 all take suffix th; 11th, 12th, 13th, 112th
        return "th";
    } else if (int % 10 === 1) {
        // 1st, 21st
        return "st";
    } else if (int % 10 === 2) {
        // 2nd, 22nd, 42nd
        return "nd";
    } else if (int % 10 === 3) {
        // 3rd, 153rd
        return "rd";
    } else {
        // 4th, 17th, 9th
        return "th";
    }
}

var generate_ranking_from_int = function (int) {
    return int + generate_ordinal_suffix(int);
}