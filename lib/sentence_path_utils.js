var path_regex = /[ \.\/]/g;

var standardize_path = function (s) {
    return s.replace(/[\/\-\.]/g, ' ');
}

var split_text_into_path = function (text) {
    if (typeof text !== 'string') {
        throw 'Weird text: ' + JSON.stringify(text);
    }
    return text.split(path_regex);
}

var path_to_list = function (path) {
    if (typeof path !== 'object') {
        return [path.toString()];
    }
    while ('path' in path) {
        path = path.path;
    }
    return path;
}

// I think the best way to display a path is to join it with spaces unless there are two consecutive numbers,
// in which case dot.

var path_display = function (path) {
    path = path_to_list(path);
    if (!Array.isArray(path)) {
        throw 'Illegal path ' + JSON.stringify(path);
    }
    var list = [];
    var nums = path.map(function (x) {return !isNaN(x)});
    for (var i = 0; i < path.length; i++) {
        list.push(path[i]);
        // We could return within this if,
        // but that seems confusing.
        if (i === path.length - 1) {
            continue;
        }
        if (nums[i] && nums[i + 1]) {
            list.push('.');
        } else {
            list.push(' ');
        }
    }
    return list.join('');
}

var display_path = path_display;

var Path = function (x) {
    if (!Array.isArray(x)) {
        throw 'Paths must be arrays!';
    }
    this.path = x;
}

Path.prototype.unamb_string = function () {
    return this.path.join(' ');
}

Path.prototype.chapter_to_database = function () {
    return this.path.join('_');
}

Path.prototype.number_to_database = function () {
    return 'not applicable for paths!';
}

Path.prototype.get_mf_sentence = function (callback) {
    callback(mf_sentences[this.path.join(' ')]);
}

Path.prototype.get_syntax_sentence = function (callback) {
    make_syntax_question(this.path, callback);
}

Path.to_url_params = function (x) {
    return path_to_list(x).join('^');
}

Path.from_url_params = function (ups) {
    return new Path(ups.path.split('^'));
}

window.addEventListener('load', function () {
    var path_interface = new Interface('path',
    ['to_url_params', 'from_url_params'],
    ['chapter_to_database', 'number_to_database',
    'get_mf_sentence', 'get_syntax_sentence']);
    path_interface.check(Path);
});