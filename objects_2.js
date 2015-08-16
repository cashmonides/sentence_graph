/**
 implementation 1: (object-oriented)
 node class
 field: set of all nodes you're connected to
 graph class
 field: set of nodes

 implementation 2: (adjacency list)

 graph class
 field: set of edges
 field: set of nodes

 edge class
 field: start and end



 implementation 3: (adjacency matrix)
 matrix with boolean



 ________________________



 _______________________
 (we need a directed graph)


 (polymorphism)
 ("needs to be polymorphic on some operation")

 data:
 sentence: the dog jumps when the bell rings    (could be a list of words) (we keep track of words by their index)
 node: region (a selection of the sentence)
 region: set of indices (number above every word)       (can be discontinuous)
 identifier: pair of tag & region              (e.g. tag = subject)
 edge: pair of nodes, tag        (tag identifies the kind of relationship between the two nodes)



 graph class
 field: set of all regions
 field: set of all edges

 tag class
 field: tag, set of regions          (so we need labels, because an index wouldn't give us any way to keep track of it)  (e.g. tag = subordination, record = main: x, sub1: y, sub2: z)

 region class
 field: set of indices
 //field: set of tags


 passage is composed of sentences




 the dog (who loves the mouse) is named rover

 region: the dog...is named rover   = main clause  12789

 example of an edge: (2, 12789, subject)

 **/




/*var TagType = {
 //below has its own class
 SubordinateClause : "subordinate clause",
 MainClause : "main clause",
 SubordinatingConjunction : "subordinating conjunction",
 CoordinatingConjunction : "coordinating conjunction",
 Clause : "clause",

 // below are clumped together under single region tag
 Noun : "noun",
 Subject : "subject",
 Object : "object",
 Verb : "verb",
 Adjective : "verb",
 Adverb : "verb"
 };*/


var Sentence = function (words) {
    this.words = words;
    this.regions = [];
    //dan's version
    this.get_region = function (indices) {
        for (var i = 0; i < this.regions.length; i++) {
            if (this.regions[i].equals_list(indices)){
                return this.regions[i];
            }
        }
        var nr = new Region (indices);
        this.regions.push(nr);
        return nr;
    };




};

var Region = function (indices) {
    this.indices = indices;
    this.tags = [];


    this.get_indices = function () {
        return this.indices;
    };


    this.equals_list = function (indices) {
        if (this.indices.length === indices.length) {
            for (var i = 0; i < this.indices.length; i++) {
                if (this.indices[i] != indices[i]) {
                    console.log("this region matches");
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    };

    this.add_tag = function (tag) {
        this.tags = this.tags.filter(function(x) {
            return x.get_tag_type() !== tag.get_tag_type()
        });
        if (tag.get_tag_type().indexOf("clause") !== -1) {
            this.tags = this.tags.filter(function(x) {
                return x.get_tag_type().indexOf("clause") === -1
            });
        }
        this.tags.push(tag);
    };

    this.make_clause = function (clause_type) {
        if (!this.clause) {
            this.clause = new Clause (clause_type, indices)
        } else {
            this.clause.clause_type = clause_type
        }
    };
};




var Clause = function (clause_type, indices) {
    this.subject = [];
    this.object = [];
    this.verb = [];
    this.predicate = [];
    this.clause_type = clause_type;
    this.indices = indices;
    this.get_tag_type = function () {
        return clause_type;
    };

    // new stuff below
    this.get = {};
    this.set = function (string, value) {
        this.get[string] = function () {return value}};
    this.push_to = function (string, value) {
        var v = this.get[string]();
        this.get[string] = function () {return v.concat(value)}};
    // There are three advantages to this:
    // 1: We avoid circular json errors.
    // 2: We implement getters and setters.
    // 3: We can easily add new properties
};

//motivation: we want to reduce classes and so we want a single class which can give us
// tag type - stores type and region
// useful for: noun, verb, adjective, adverb
var SingleRegionTag = function (type) {
    this.type = type;
    this.get_tag_type = function () {
        return this.type;
    }
};