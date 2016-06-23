var Interface = function (name, class_v, methods) {
    if (!Array.isArray(class_v)) {
        class_v = [class_v];
    }
    if (!Array.isArray(methods)) {
	    methods = [methods];
    }
    this.name = name;
	this.class_v = class_v;
	this.methods = methods;
}

Interface.prototype.is_satisfied_by = function (x) {
	if (typeof x !== 'function') {
	    x = x.constructor;
	}
	for (var i = 0; i < this.class_v.length; i++) {
	    if (!(this.class_v[i] in x)) {
	        return {'result': false, 'fails': this.class_v[i]};
	    }
	}
	for (var i = 0; i < this.methods.length; i++) {
	    if (!(this.methods[i] in x.prototype)) {
	        return {'result': false, 'fails': this.methods[i]};
	    }
	}
	return {'result': true};
}

Interface.prototype.check = function (x) {
    var r = this.is_satisfied_by(x);
    if (!r.result) {
        throw 'Interface ' + this.name + ' was not completely implemented: missing ' + r.fails;
    }
}

/*
// A simple meta example of using interfaces.
var test_interface = new Interface ('test', [], 'check');

test_interface.check(Interface);

test_interface.check(test_interface);
*/

// var path_interface = new Interface ('path', ['from_url']);