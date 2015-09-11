
// regions contain:
// "word" | "(" | "/", pos (start), pos (end), word index (start), word index (end)

var Text = function(text){
	this.text = text;
	this.words = [];
	this.regions = [];
	this.word_selector = null;
};

Text.prototype.setup = function(){

	console.log(this.text);

	var stack = [];

	for(var i = 0; i < this.text.length; i++){

		var match = /^[a-zA-Z]+(\'[a-zA-Z])?/.exec(this.text.substring(i));

		// the start of a word
		if (match) {

//			console.log(i, match);
			var word = match[0];
			this.regions.push(["word", i, i + (word.length - 1), this.words.length, this.words.length]);
			this.words.push(word);
			i = i + (word.length - 1);

		// non-word character
		} else {

			var c = this.text[i];
//			console.log(c);

			switch(c){
			case '(':
				stack.push(["(", i, null, this.words.length, null]);
				break;
			case ')':
				if(stack.length > 0){
					var region = stack.pop();
					region[2] = i;
					region[4] = this.words.length;
					this.regions.push(region);
//					console.log("pop", region);
				} else {
					throw "illegal end paren";
				}
				break;
			case '/':
				this.regions.push(["/", i, i, this.words.length, this.words.length]);
				break;
			}

		}

	}

	// sort regions by start position
	this.regions.sort(function(left, right){
		return left[1] - right[1];
	});

	var self = this;
	this.regions.forEach(function(r){
		console.log(r[0], r[1], r[2], r[3], r[4], "'" + self.text.substring(r[1], r[2] + 1) + "'");
	});

	console.log(stack);
	console.log(this.get_words());

};

Text.prototype.get_text = function(){
	return this.text;
};

Text.prototype.get_words = function(){
	return this.words;
}

// returns a list of regions. each region is: [ true (selectable) | false (hook), start, end, hook data (optional) ]
// must be sorted by start
Text.prototype.get_regions = function(){

	var regions = [];

	this.regions.forEach(function(x){
		if(x[0] == "word"){
			regions.push([true, x[1], x[2]]);
		} else {
			regions.push([false, x[1], x[1], [x[3], x[4]]]);
		}
	});

	return regions;

}


Text.prototype.selected = function(range){

	console.log("range:", range);
	word_selector.clear();
	for(var i = range[0]; i < range[1]; i++){
		word_selector.set_highlighted(i, true);
	}

};