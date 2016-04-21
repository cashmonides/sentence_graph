// dsl language

var pass = function () {};

var peek = function (x) {
	return x[x.length - 1];
}

var is_empty = function (x) {
	return x.length === 0;
}

var identity = function (x) {
    return x;
}

var create_execute = function () {
	var _and = function (a, b) {
	    return function (x) {
	        return a(x) && b(x);
	    }
	}

	var _or = function (a, b) {
	    return function (x) {
	        return a(x) || b(x);
	    }
	}

	var _q = function (a, b) {
	    return function (c) {
	        return function (x) {
	            return a(x) ? b(x) : c(x);
	        }
	    }
	}

	var _dot = function (a, b) {
	    return function (c) {
	       // Sorry! There is a very good motivation, though!
	       return b(a(c));
	    }
	}

	var get_name = function (f) {
	    return f(0);
	}
	
	var set_f = function (x, f) {
		var new_f = function (z) {
			if (z === 0) {
				return x
			} else {
				return f(z)
			}
		}
		functions[x] = new_f;
		return new_f;
	}

	var _colon = function (x, y) {
	    return set_f(get_name(x), y);
	}

	var _paamayim_nekudotayim = function (x, y) {
	    var g = get_name(x);
	    if ((typeof g === 'string') && g.length === 1) {
	        characters += g;
	        var new_f = set_f(g, y);
	    }
	    return new_f;
	}

	var _not = function (f) {
	    return function (x) {
	        return !f(x);
	    }
	}

	var _flip = function (f) {
		return function (a) {
			return function (b) {
			     return f(b)(a);
			 }
		}
	}

	var _tick = function (f) {
		return function (a) {
			return function (b) {
			     return f(a, b);
			 }
		}
	}

	var _semi_colon = pass;

	var characters = '!|&.;`~';
	var operators = {
	    '|': _or, '&': _and, 'or': _or, 'and': _and, '?': _q, '.': _dot,
	    ';': _semi_colon, ':': _colon, '::': _paamayim_nekudotayim
	};

	var _k = function (x) {
		return ['k', x];
	}

	var _pre_if = function (x) {
		return x ? identity : _k(0);
	}

	var _pre_unless = function (x) {
		return x ? _k(0) : identity;
	}

	var _pre_defined = function (x) {
		var g = get_name(x);
		return (g in operators) || (g in adverbs) || (g in functions) || (g in constants);
	}

	var functions = {
		'!': _not,
		'not': _not,
		'~': _flip,
		'id': identity,
		'def?': _pre_defined,
		'constant': _k,
		'if': _pre_if,
		'unless': _pre_unless,
		'name': get_name
	};
	
	var constants = {
		'operators': function () {return operators},
		'adverbs': function () {return adverbs},
		'functions': function () {return functions},
		'constants': function () {return constants}
	}

	var adverbs = {
		'`': _tick
	};

	// parse s into a list of components
	var parse = function (s) {
		var l = [''];
		// parentheses increase depth
		var depth = 0;
		var character;

		var add_char = function () {
			l[l.length - 1] += character;
		}

		for (var c = 0; c < s.length; c++) {
			character = s[c];

			if (depth === 0) {
				if (character === '(') {
					depth++;
				} else if (character === ')') {
					throw 'unparsable string';
				} else if (characters.indexOf(character) !== -1) {
					l.push('');
					add_char(character);
					l.push('');
				} else if (character === ' ') {
					l.push('');
				} else {
					add_char(character);
				}
			} else {
				if (character === '(') {
					depth++;
				}

				if (character === ')') {
					depth--;
				}
				
				add_char(character);

				if (depth === 0) {
					l.push(parse(l.pop().slice(0, -1)));
					l.push('');
				}
			}
		};
		if (depth !== 0) {
			throw 'unparsable string'
		}
		return l.filter(function (x) {return !(is_empty(x))});
	};

	var examine = function (x) {
		if (typeof x !== 'string') {
			if (x.length === 1) {
				return examine(x[0]);
			} else {
				return 'function'
			}
		} else if (x in operators) {
			return 'operator'
		} else if (x in adverbs) {
			return 'adverb'
		} else if (x in constants) {
			return 'constant'
		} else {
			return 'function'
		}
	}

	var exec_from_parse = function (l) {
		if (typeof l === 'string') {
			if (l in operators) {
				return operators[l];
			} else if (l in adverbs) {
				return adverbs[l];
			} else if (l in functions) {
				return functions[l];
			} else if (l in constants) {
				return constants[l]();
			}

			return function (x) {
				if ((typeof x === 'object') && (l in x)) {
					return x[l];
				} else if (x === 0) {
					return l;
				} else {
					return 'failed';
				}
			}
		} else if (l.length === 0) {
			throw 'could not execute'
		} else if (l.length === 1) {
			return exec_from_parse(l[0]);
		}
		var left = exec_from_parse(l.slice(0, -1));
		if (Array.isArray(left) && (left[0] === 'k')) {
			return left[1];
		}
		var left_type = examine(l.slice(0, -1));
		var right_type = examine(peek(l));
		var right = exec_from_parse(peek(l));

		if (right_type === 'adverb') {
			throw 'could not execute'
		} else if ((right_type === 'operator') && (left_type !== 'adverb')) {
			return function (x) {return right(left, x)};
		} else {
			return left(right);
		}
	}

	var execute = function (x) {
		if (typeof x !== 'string') {
			throw 'trying to execute a non-string';
		}
		return exec_from_parse(parse(x));
	}

	return execute;
}

var execute = create_execute();