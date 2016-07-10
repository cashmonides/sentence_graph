// This file serves as an example of the current coding standards,
// and also checks them.

// This function counts the number of lines in a file.
var lines = function (file) {
	return file.split('\n');
}

// This function detects whether a line is a comment.
var is_comment = function (line) {
	return line.match(/^[ \t]*\/\/.*$/g);
}

// This function detects whether a line is just a brace.
var is_brace = function (line) {
	return line.match(/^[ \t]*};?$/g);
}

// This function detects whether a line is empty.
var is_empty = function (line) {
	return line.match(/^[ \t]*$/);
}

// This function detects whether a line is not worth counting.
var is_uncounted = function (line) {
	return is_brace(line) || is_empty(line);
}

// This function detects the maximum length of a line in a file.
var max_line_length = function (lines) {
	return Math.max.apply(null, lines.map(function (x) {return x.length}));
}

// This function finds the longest stretch in a file without comments.
var largest_stretch_without_comments = function (lines) {
	var best = 0;
	var current = 0;
	var line;
	// We loop over the lines.
	for (var i = 0; i < lines.length; i++) {
		line = lines[i];
		// We check whether the line in question is a comment.
		if (is_comment(line)) {
			current = 0;
		} else {
			// We continue if we should not count the line.
			if (is_uncounted(line)) {
				continue;
			}
			current++;
			// We might have to update best.
			if (current > best) {
				best = current;
			}
		}
	}
	// We return the longest stretch.
	return best;
}

// This function filters out comments from lines of code.
var code_lines = function (lines) {
	return lines.filter(function (x) {return !is_comment(x) && !is_uncounted(x)})
}

// This function will determine whether a file meets the standards.
var file_conforms = function (file) {
	var l = lines(file);
	// We get the number of lines in our file.
	var total_lines = code_lines(l).length;
	console.log('total lines:', total_lines);
	// We get the largest stretch of non-commented lines.
	var largest_stretch = largest_stretch_without_comments(l);
	console.log('lines without comments:', largest_stretch);
	// We get the length of the longest line.
	var max_length = max_line_length(l);
	console.log('longest line length:', max_length);
	// We return a boolean saying whether the file meets the standards.
	return total_lines <= 100 && largest_stretch <= 5 && max_length <= 80;
}

var log_file_confirms = function (error, data) {
	// Check our file.
    console.log(file_conforms(data));
}

// Import the file module.
var fs = require('fs');

// Do the main thing.
fs.readFile("/Users/dan/Documents/file_check.js", "utf8", log_file_confirms);