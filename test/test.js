window.onload = test;

function test(){
    
    test3 ();
    
}

function test3 () {

//	var s = "\"Fuck!\", yelled the cat's friend.";
	var s = "(hello (how)) (are you)";
	var t = new Text(s);
	t.setup();

}

function test2 () {
    
    //var text = "The book says: \"{the cat, the dog and the mouse sleep.}\"";
    var text = "The book says: \"{the cat, the dog and the mouse sleep";
    //var text = "abc ,\" dog.";
    //var text = "The cat jumps";
    //var text = "The cat jumps.";
    var lists = parse_words(text);
    //console.loglists);
    
    var x = "abc ,\" ";
    for(var i = 0; i < x.length; i++){
        //console.logx[i], is_word_char(x[i]));
    }
    
}

function test1 () {
    var text = "the dog jumps (when the bell rings)";
    //["the"0, "dog"1, "jumps"2, "when"3, "the"4, "bell"5, "rings"6]
    var words = convert (text);
    //console.logwords);
    var sentence = new Sentence (words);

    var r = sentence.get_region ([1,2,3]);
    r.add_tag(TagType.MainClause);
    r.add_tag(TagType.Noun);




    //sentence.add_region(new Region([1,2,3]));
    //sentence.add_region(new Region([1,2,3]));
    //sentence.add_region(new Region([1,2,4]));
    ////console.logsentence);
    //var mc = new Clause();
    //var sc = new Clause();
    //var soc = new SubordinateClause();
    //soc.superordinate = mc;
    //tags.add_tag(mc);
    //var r1 = new Region([1,2,3]);
    //var r2 = new Region([1,2,3]);
    ////console.logr1==r2);
    ////console.logr1===r2);
    ////console.logr1.equals(r2));
}

function convert (text) {
   return text.split(/\s+/);
}



