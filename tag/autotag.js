
var auto_tagging_map = {
    "the" : "definite article",
    "a" : "indefinite article",
    "an" : "indefinite article",
    "I" : "personal pronoun",
    "me" : "personal pronoun",
    "you" : "personal pronoun",
    "he" : "personal pronoun",
    "she" : "personal pronoun",
    "we" : "personal pronoun",
    "they" : "personal pronoun",
    "them" : "personal pronoun",
    "my" : "possessive adjective",
    "your" : "possessive adjective",
    "his" : "possessive adjective",
    "her" : "possessive adjective",
    "its" : "possessive adjective",
    "our" : "possessive adjective",
    "their" : "possessive adjective",
    "after" : "subordinating conjunction",
    "although" : "subordinating conjunction",
    "because" : "subordinating conjunction",
    "before" : "subordinating conjunction",
    "how" : "subordinating conjunction",
    "if" : "subordinating conjunction",
    "that" : "subordinating conjunction",
    "unless" : "subordinating conjunction",
    "until" : "subordinating conjunction",
    "what" : "subordinating conjunction",
    "when" : "subordinating conjunction",
    "where" : "subordinating conjunction",
    "which" : "subordinating conjunction",
    "while" : "subordinating conjunction",
    "who" : "subordinating conjunction",
    "why" : "subordinating conjunction",
    "and" : "coordinating conjunction",
    "but" : "coordinating conjunction",
    "or" : "coordinating conjunction",
    "above" : "preposition",
    "about" : "preposition",
    "across" : "preposition",
    "against" : "preposition",
    "along" : "preposition",
    "amid" : "preposition",
    "among" : "preposition",
    "around" : "preposition",
    "as" : "preposition",
    "at" : "preposition",
    "behind" : "preposition",
    "below" : "preposition",
    "beneath" : "preposition",
    "beside" : "preposition",
    "besides" : "preposition",
    "between" : "preposition",
    "beyond" : "preposition",
    "by" : "preposition",
    "concerning" : "preposition",
    "despite" : "preposition",
    "during" : "preposition",
    "except" : "preposition",
    "for" : "preposition",
    "from" : "preposition",
    "in" : "preposition",
    "inside" : "preposition",
    "into" : "preposition",
    "like" : "preposition",
    "near" : "preposition",
    "of" : "preposition",
    "off" : "preposition",
    "on" : "preposition",
    "onto" : "preposition",
    "opposite" : "preposition",
    "outside" : "preposition",
    "over" : "preposition",
    "past" : "preposition",
    "to" : "preposition",
    "toward" : "preposition",
    "under" : "preposition",
    "underneath" : "preposition",
    "unlike" : "preposition",
    "with" : "preposition",
    "within" : "preposition",
    "without" : "preposition"
}

function autotag(text_data, sentence) {
    
    text_data.regions.forEach(function(r) {
        
        // single word
        if (r[0] === "word" && r[3].length == 1) {
            console.log("text data:", text_data);
            var word = text_data.get_word(r[3][0]);
            if (word in auto_tagging_map) {
                var new_region = sentence.get_region(r[3]);
                new_region.add_tag(new SingleRegionTag(auto_tagging_map[word]));
            } 
            
        // clauses
        } else {
        
            if(r[3].length > 0){
                
                var reg = sentence.get_region(r[3]);
                var tag = create_tag(r);
                reg.add_tag(tag);
                
            }
            
        }
    
    });

    
}

function create_tag(r){
    
    switch(r[0]){
        case "(": return new SubordinateClause();
        case "/": return new Clause(TagType.CoordinatingConjunction);
        case "main": return new Clause(TagType.MainClause);
        default: throw "unknown tag type: " + r[0];
    }

}