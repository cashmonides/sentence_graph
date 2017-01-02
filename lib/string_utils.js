// Utils relating primarily to strings go here.

// Regex cheat sheet (made out of a long commment):
// / = beginning of the regex
// ^ = start of string
// $ = end of string
// [] = character class
// A-Z in character class (i.c.c) = uppercase letters
// a-z i.c.c = lowercase letters
// 0-9 i.c.c = digits
// ^ i.c.c = negates chacracter class
// * = any number of occurrences (including 0)
// + = any number of occurrences (at least 1)
// / = end of the regex
// g = applied globally, i.e. repeatedly, until there are no more left
// If a regex is not explained by this, it is likely magic to some extent.

var get_pure_latin_root = function (x) {
    return remove_long_vowels(x.properties.latin.root);
}

//sometimes a list of options is given by x/y (e.g. o/m or mon/mono)
var convert_slash_options_to_list = function (string) {
    return string.split("/");
}


var string_matches_slashed_string = function (input_string, slashed_string) {
  back.log("[string_matches_slashed_string] entering");
  back.log("[string_matches_slashed_string] input_string = ", input_string);
  back.log("[string_matches_slashed_string] slashed_string = ", slashed_string);
  var slashed_list = slashed_string.split("/");
//   console.log("[string_matches_slashed_string] slashed_list = ", slashed_list);
  
  var boolean = false
  for (var i = 0; i < slashed_list.length; i++) {
    //   console.log("[string_matches_slashed_string] input = ", input_string);
    //   console.log("[string_matches_slashed_string] target = ", slashed_list[i]);
      if (input_string === slashed_list[i]) {
        //   console.log("[string_matches_slashed_string] true triggered at final match");
          boolean = true;
          return boolean;
      } else {
        //   console.log("[string_matches_slashed_string] false triggered at final match");
          continue;
      }
  }
  return boolean;
};

var remove_long_vowels = function (s) {
    var long_to_short = {
        'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U',
        'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u'
    };
    for (var i in long_to_short) {
        s = s.replace(new RegExp(i, 'g'), long_to_short[i])
    }
    return s;
}

var remove_punc = function (string) {
    return string.replace(/[^a-z ]/g, '');
}

var strip = function (x, c) {
    if (c === undefined) {c = ' '};
    return x.replace(new RegExp('^' + c + '+', 'g'), '').
    replace(new RegExp(c + '+$', 'g'), '').
    replace(new RegExp(c + '+', 'g'), c);
}

var hex_to_num = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15
}

var ordinal_string_to_int = {
    'first': 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
}


// '   The !@#$%^cat eāt  $ t-h-e fIsh   ' -> the cat eat the fish
var clean_input_string = function (string) {
    return clean_parts(strip(remove_punc(remove_long_vowels(
        string.toLowerCase()))).split(' '));
}

var get_words = function (string, n) {
    var words = remove_punc(string).split(' ');
    if (n !== undefined) {
        words = words.filter(function (x) {return x.length >= n});
    }
    return words;
}

var common_word = function (a, b, n) {
    return something_in_common(get_words(a, n), get_words(b, n));
}

var starts_with = function (string, substring) {
    return string.slice(0, substring.length) === substring;
}

var ends_with = function (string, substring) {
    return string.slice(string.length - substring.length) === substring;
}

var cut_off = function (string, substring) {
    return string.slice(substring.length);
}


var replace_all_substrings = function (string, substring, replacement) {
        return string.split(substring).join(replacement);
};
// var replace_all_substrings = function (string, substring, replacement) {
//     return string.replace(new RegExp(substring, 'g'), replacement);
// };


////// below should theoretically be possible but Akiva wasn't able to make it work
// String.prototype.replace_all_substrings = function(substring, replacement) {
//     var target = this;
//     return target.replace(new RegExp(substring, 'g'), replacement);
// };

var number_names = {
	1: ['one', 'first'],
	2: ['two', 'second'],
	3: ['three', 'third'],
	4: ['four'],
	5: ['five', 'fifth'],
	6: ['six'],
	7: ['seven'],
	8: ['eight'],
	9: ['nine'],
	10: ['ten'],
	11: ['eleven'],
	12: ['twelve', 'twelth', 'twelfth']
}

var convert_string_to_number = function (grade) {
	var numbers_matches = grade.match(/\d+/g);
	if (numbers_matches === null) {
	    numbers_matches = [];
	}
	for (var i in number_names) {
		if (number_names[i].some(function (name) {
			return grade.indexOf(name) !== -1;
		})) {
			numbers_matches.push(i);
		}
	}
	numbers_matches = unique_items(numbers_matches).map(function (x) {
		return parseInt(x, 10);
	});
	if (numbers_matches.length === 0) {
		return 'no match';
	} else if (numbers_matches.length > 1) {
		return 'more than one match';
	} else {
		return numbers_matches[0];
	}
}