// Word finder.

// Note: this code is Evil. For example, it uses an arrasy as a hash.
// Even editing it will cause your
// cursor to be corrrrupted, and tttext to go in mysterious places,
// as if regex is being used to parse <HTML>, conventions
// (function () {x = 2}) are being violated,
// and the world i423223s being "Ph'nglui mglw'nafh
// Cthulhu R'lyeh wgah'nagl fhtagn"
// d?es?tr?oyed    by W#^%u2 the evil  cfmvedj they COme.

// (Also, if you find this comment and you don't know me, email me
// at d[letter after the first letter of this address]
// s[6! times 2/3]@[the 3-letter abbrevation
// for the college near Washington Square Park].
// [first two letters in other order]u)
// The result should be 14 characters long, and the sum of the letters
// (where a=1, b=2, c=3, etc.) is 118. There is one dot and no
// (, ), [, ], {, or } in the address.

var get_real_words = function () {
    return latin_words_in_mf.map(function (x) {
        x = x.split('^');
        if ('0123456789'.indexOf(x[0][0]) === -1) {
            return null;
        }
        var claim = function (y, z) {
            if (typeof y === 'object') {
                for (var i = 0; i < y.length; i++) {
                    claim(y[i], z);
                }
                return;
            }
            if (y !== z) {
                throw 'Bad data: ' + [x, y, z].map(JSON.stringify).join(' ');
            }
        }
        var result = {};
        result.unit = x[0];
        claim(x[1], '%');
        result.stem1 = x[2];
        claim([x[3], x[5], x[7]], ',');
        result.stem2 = x[4];
        result.stem3 = x[6];
        result.stem4 = x[8];
        result.gender = x[9];
        // claim(x[10], '*');
        // This was often missing.
        result.part_of_speech_display = x[11];
        result.definition = x[12];
        claim([x[13], x[15], x[17]], '#')
        result.conj_decl = x[14];
        result.part_of_speech = x[16];
        result.notes = x[18];
        result.supp_roots = x[19];
        result.cognates = x[20];
        return result;
    }).filter(function (x) {return x !== null});
}

var match_text_against_words = function (stem_objects) {
    var stems = [];
    for (var i = 1; i <= 4; i++) {
        for (var j = 0; j < stem_objects.length; j++) {
        	stems.push([]);
            var s = stem_objects[j]['stem' + i].split(',').filter(
            	function (x) {return x.replace(/-/g, '')});
            for (var k = 0; k < s.length; k++) {
                stems[j][i + '-' + k] = s[k];
            }
        }
    }
    
    return function (text) {
        var no_long_vowels;
        var words;
        if (typeof text === 'string') {
            if (!(/[āēīōū]/.exec(text))) {
                no_long_vowels = true;
            }
            text = text.replace(/[\n\t]/g, ' ');
            text = remove_punc(text);
            words = text.split(' ');
        } else {
            for (var init_item in text) {
                if (!(/[āēīōū]/.exec(init_item))) {
                    no_long_vowels = true;
                }
            }
            words = text.map(function (x) {return remove_punc(x.replace(/[\n\t]/g, ' '))});
        }

        if (!(Array.isArray(words))) {
        	throw 'there is something wrong: text is ' + JSON.stringify(text) +
        	', when it should be an array at this point'
        }

        words = words.filter(identity);
        
        var convert_for_matching = function (word) {
            if (no_long_vowels) {
                word = remove_long_vowels(word);
            }
            word = remove_punc(word);
            word = word.toLowerCase();
            return word;
        }
        var mode;
        var converted_word;
        var start_or_end;
        var best_for_word;
        var best_for_word_and_stem;
        var len = words.length;
        var word;
        var results = [];
        var best_stems = [];
        var word_results;
        var stem_score;
        for (var i = 0; i < len; i++) {
            word = words[i];
            converted_word = convert_for_matching(word);
            word_results = [];
            best_for_word = 0;
            for (var j in stems) {
                best_for_word_and_stem = [];
                for (var key in stems[j]) {
                	var value = stems[j][key];
                    if (value.indexOf('$') !== -1) {
                        mode = 'start';
                        start_or_end = value.split('$')[0];
                    } else if (value.indexOf('#') !== -1) {
                        mode = 'end';
                        start_or_end = peek(value.split('#'));
                    } else {
                        mode = 'start';
                        start_or_end = value;
                    }
                    start_or_end = convert_for_matching(start_or_end)
                    var fn;
                    if (mode === 'start') {
                        fn = starts_with;
                    } else {
                        fn = ends_with;
                    }
                    if (fn(converted_word, start_or_end)) {
                        best_for_word_and_stem.push({
                            'root': value,
                            'score': word.length - start_or_end.length
                        });
                    }
                    sort_by_score(best_for_word_and_stem);
                }
                if (best_for_word_and_stem.length > 0) {
                    word_results.push({
                        'details': best_for_word_and_stem,
                        'score': best_for_word_and_stem[0].score,
                        'word': stem_objects[j]
                    });
                }
            }
            sort_by_score(word_results);
            results.push({'word': word, 'word_results': word_results});
        }
        return results;
    }
}

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

var sort_by_score = function (z) {
    z.sort(function (x, y) {
        if (x.score < y.score) {
            return -1;
        } else if (x.score === y.score) {
            return 0;
        } else if (x.score > y.score) {
            return 1;
        }
    });
}

var remove_punc = function (string) {
    return string.replace(/[^a-zA-Z āēīōūĀĒĪŌŪ$#]/g, '');
}

var identity = function (x) {return x};

var peek = function (x) {
	return x[x.length - 1];
}