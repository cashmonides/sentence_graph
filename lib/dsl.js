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

var constant = function (x) {
    return function () {
        return x;
    }
}

var enlist = function (x) {
	return [].concat(x);
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
	
	var _join = function (a, b) {
		a = enlist(a);
		b = enlist(b);
		b.forEach(function (x) {a.push(x)});
	    return a;
	}
	
	var hash_ify = function (x) {
		if (typeof x === 'object') {
			return x;
		} else if (typeof x === 'function') {
			var h = {};
			h[get_name(x)] = true;
			return h;
		} else {
			throw 'value cannot be made into a hash';
		}
	}
	
	var _hash_join = function (a, b) {
		a = hash_ify(a);
		b = hash_ify(b);
		Object.keys(b).forEach(function (x) {a[x] = true});
	    return a;
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
		dicts[x] = new_f;
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
	        return new_f;
	    } else {
	    	throw 'attempt to create new function failed';
	    }
	    
	}
	
	var _at = function (s) {
	    return function (x) {
	        return x[s];
	    }
	}

	var _not = function (f) {
	    return function (x) {
	        return !f(x);
	    }
	}
	
	var _is = function (a) {
		var a_array = Array.isArray(a);
		var a_string = (typeof a === 'string');
		var g;
		if (a_array) {
			g = a.map(get_name);
			return function (b) {return g.indexOf(b) !== -1};
		} else if (a_string) {
			g = get_name(a);
			return function (b) {return g === b};
		} else {
			return function (b) {return b in a};
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

	var characters = '!@|&.,;`~';
	var operators = {
	    '|': _or, '&': _and, '||': _or, '&&': _and,
	    'or': _or, 'and': _and, '?': _q, '.': _dot,
	    ',': _join, ',,': _hash_join, ';': _semi_colon,
	    ':': _colon, '::': _paamayim_nekudotayim
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
		return (g in operators) || (g in adverbs) || (g in built_ins) || (g in dicts);
	}

	var built_ins = {
		'@': _at,
		'!': _not,
		'not': _not,
		'~': _flip,
		'is': _is,
		'id': identity,
		'def?': _pre_defined,
		'constant': _k,
		'if': _pre_if,
		'unless': _pre_unless,
		'name': get_name,
		'true': true,
		'false': false,
		'passes': constant(true),
		'fails': constant(false)
	};
	
	var dicts = {
		'operators': function () {return operators},
		'adverbs': function () {return adverbs},
		'built_ins': function () {return built_ins},
		'dicts': function () {return dicts}
	}

	var adverbs = {
		'`': _tick
	};
	
	var string_regex_base = '([^\'"`]|(`[bdnqst\'"]))*'
	
	var get_real_string = function (x) {
		return ' ' + x.slice(1, -1).
		replace('`\'', '\'').replace('`"', '"').
		replace('`d', '"').replace('`n', '\n').
		replace('`q', '\'').replace('`s', '\'').
		replace('`t', '\t').replace('`b', '`');
	}

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
					l.push(character);
					c++;
					while ((c < s.length) && (s[c] === character)) {
						add_char(character);
						c++;
					}
					c--;
					l.push('');
				} else if ((character === '\'') || (character === '"')) {
					var m = new RegExp(character + string_regex_base
					+ character).exec(s.slice(c));
					if (m === null) {
						throw 'improper string';
					}
					c += m[0].length - 1;
					l.push(get_real_string(m[0]));
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
		} else if (x[0] === ' ') {
			return 'string'
		} else if (x in operators) {
			return 'operator'
		} else if (x in adverbs) {
			return 'adverb'
		} else if (x in dicts) {
			return 'dict'
		} else {
			return 'function'
		}
	}

	var exec_from_parse = function (l) {
		if (typeof l === 'string') {
			if (l[0] === ' ') {
				return l.slice(1);
			} else if (l in operators) {
				return operators[l];
			} else if (l in adverbs) {
				return adverbs[l];
			} else if (l in built_ins) {
				return built_ins[l];
			} else if (l in dicts) {
				return dicts[l]();
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
			throw 'could not execute; type mismatch (x adverb)';
		} else if (left_type === 'operator') {
			throw 'could not execute; type mismatch (x operator)';
		} else if (left_type === 'adverb') {
			if (right_type !== 'operator') {
				throw 'could not execute; type mismatch (adverb !operator)';
			}
			return left(right);
		} else if (right_type === 'operator') {
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