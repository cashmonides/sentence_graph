
// regions contain:
// "word" | "(" | "/", pos (start), pos (end), [word indices]

var Text = function(text){
	
	this.text = text;
	this.words = [];
	this.regions = [];

};

Text.prototype.setup = function(){

	console.log(this.text);

	var stack = [];
	
	//this will be the wrapper of the main clause - we might need a fourth enumeration
	stack.push(["main", 0, this.text.length - 1, []]);
	
	// AAAA(BBBB)
	
	for(var i = 0; i < this.text.length; i++){

		//returns an object 
		// returns entire match "they'll"    
		// also returns the groups "'ll"     the things in parentheses (\'etc.)
		var match = /^[a-zA-Z]+(\'[a-zA-Z]+)?/.exec(this.text.substring(i));

		// the start of a word
		if (match) {

		//console.log(i, match);
			var word = match[0];
			this.regions.push(["word", i, i + (word.length - 1), [this.words.length]]);
			peek(stack)[3].push(this.words.length);
			this.words.push(word);
			i = i + (word.length - 1);

		// non-word character
		} else {

			var c = this.text[i];
//			console.log(c);

			switch(c){
			case '(':
				stack.push(["(", i, null, []]);
				break;
			case ')':
				if(stack.length > 1){
					this.close_slash(stack, i - 1);
					var region = stack.pop();
					region[2] = i;
					this.regions.push(region);
//					console.log("pop", region);
				} else {
					throw "illegal end paren";
				}
				break;
			case '/':
				this.close_slash(stack, i - 1);
				stack.push(["/", i, null, []]);
				break;
			}

		}

	}

	this.close_slash(stack, this.text.length - 1);
	//handles the main clause & checks that the stack has only one item
	if(stack.length == 1){
		var region = stack.pop();
		this.regions.push(region);
	} else {
		console.log(stack);
		throw "bad stack";
	}


	// sort regions by start position
	this.regions.sort(function(left, right){
		//returns a negative number if left < right & returns a positive number if vice versa
		return left[1] == right[1] ? right[2] - left[2] : left[1] - right[1];
	});

	var self = this;
	this.regions.forEach(function(r){
		console.log(r[0], r[1], r[2], "[" + r[3].toString() + "]", "[" + self.text.substring(r[1], r[2] + 1) + "]");
	});

	console.log(this.get_words());

};

Text.prototype.close_slash = function(stack, i){
	//if the top of the stack is a / we know we've come to an end of clause so we need to remove it
	if(peek(stack)[0] == "/"){
		var region = stack.pop();
		region[2] = i;
		this.regions.push(region);
	}

};

Text.prototype.get_text = function(){
	return this.text;
};

Text.prototype.get_word = function(index) {
	return this.words[index];
};

Text.prototype.get_words = function(){
	return this.words;
};

// returns a list of regions for word_selector each region is: [ true (selectable) | false (hook), start, end, hook data (optional) ]
// must be sorted by start
Text.prototype.get_regions = function(){

	var regions = [];

	
	this.regions.forEach(function(x){
		if(x[0] == "word"){
			regions.push([true, x[1], x[2]]);
		} else {
			if(x[0] != "main"){
				regions.push([false, x[1], x[1], function(word_selector){ Text.selected(word_selector, x[3]); }]);
			}
		}
	});

	return regions;

};

//this is the hook function, i.e. what's being called when we click on a bracket
Text.selected = function(word_selector, range){

//	console.log("range:", range);
	word_selector.clear();
	for(var i = 0; i < range.length; i++){
		word_selector.set_highlighted(range[i], true);
	}

};