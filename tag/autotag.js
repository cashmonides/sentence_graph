
var auto_tagging_map = {

	"definite article": ["the"],
	"indefinite article": ["a", "an"],
	"personal pronoun": ["i", "me", "you", "he", "she", "we", "they", "them"],
	"possessive adjective": ["my", "your", "his", "her", "its", "our", "their"],
	"coordinating conjunction": ["and", "but", "or"],

	"subordinating conjunction": [
		"after", "although", "because", "before", "how", "if",
		"that", "unless", "until", "what", "when", "where", "which", "while", "who", "why"
	],

	"preposition": [
		"above", "about", "across", "against", "along", "amid", "among", "around", "as", "at", "behind",
		"below", "beneath", "beside", "besides", "between", "beyond", "by", "concerning", "despite",
		"during", "except", "for", "from","in", "inside", "into", "like", "near", "of", "off", "on", "onto",
    	"opposite", "outside", "over", "past", "to", "toward", "under", "underneath", "unlike", "with", "within", "without"
    ]

};

function autotag(text_data, sentence) {
    
    text_data.regions.forEach(function(r) {
        
        // single word
        if (r[0] === "word" && r[3].length == 1) {

            var word = text_data.get_word(r[3][0]);
        	for(type in auto_tagging_map){
				if (contains(auto_tagging_map[type], word.toLowerCase())) {
					var new_region = sentence.get_region(r[3]);
					new_region.add_tag(new SingleRegionTag(type));
					break;
				}
            }
            
        // clauses
        } else {
        
            if(r[3].length > 0){
                
                var reg = sentence.get_region(r[3]);
                var tag = create_tag(r);
                reg.add_tag(tag);
                
            } else {
            	console.log("WARNING: empty region");
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