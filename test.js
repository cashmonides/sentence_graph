window.onload = test;

function test () {
    var text = "the dog jumps (when the bell rings)";
    //["the"0, "dog"1, "jumps"2, "when"3, "the"4, "bell"5, "rings"6]
    var words = convert (text);
    console.log(words);
    var sentence = new Sentence (words);

    var r = sentence.get_region ([1,2,3]);
    r.add_tag(TagType.MainClause);
    r.add_tag(TagType.Noun);




    //sentence.add_region(new Region([1,2,3]));
    //sentence.add_region(new Region([1,2,3]));
    //sentence.add_region(new Region([1,2,4]));
    //console.log(sentence);
    //var mc = new Clause();
    //var sc = new Clause();
    //var soc = new SubordinateClause();
    //soc.superordinate = mc;
    //tags.add_tag(mc);
    //var r1 = new Region([1,2,3]);
    //var r2 = new Region([1,2,3]);
    //console.log(r1==r2);
    //console.log(r1===r2);
    //console.log(r1.equals(r2));
}

function convert (text) {
   return text.split(/\s+/);
}



