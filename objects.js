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




var TagType = {
    //below has its own class
    SubordinateClause : "subordinate clause",
    MainClause : "main clause",
    SubordinatingConjunction : "subordinating conjunction",
    CoordinatingConjunction : "coordinating conjunction",
    Clause : "clause",

    // below are clumped together under single region tag
    Adjective : "adjective",
    Noun : "noun",
    Adverb : "adverb",
    Subject : "subject",
    Object : "object",
    Verb : "verb"
};


var Sentence = function (words) {
    this.words = words;
    this.regions = [];

    //todo should this be renamed make_region?
    this.get_region2 = function (indices) {
        for (var i in this.regions) {
            if (this.regions[i].equals_list(indices)){
                return ;        //todo this seems to return undefined which will get us into trouble at submit_tag because if the region is undefined, submit_tag will skip the step add_tag
            }
        }
        var nr = new Region (indices);
        this.regions.push(nr);
        return nr;
    };

    //dan's version
    this.get_region = function (indices) {
        for (var i in this.regions) {
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
    this.sentence = null;
    this.tags = [];


    this.get_indices = function () {
        return this.indices;
    };


    this.equals_list = function (indices) {
        if (this.indices.length === indices.length) {
            for (var i in this.indices) {
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

    //todo old version below
    //this.add_tag = function (tag) {
    //    this.tags.push(tag);
    //};

    //new version below
    this.add_tag = function (tag) {
        if (tag.indexOf("clause") !== -1) {                             //if clause is in our tag
            this.tags = this.tags.filter(function(x) {                  //we remove any other clause tags that might have been accidentally associated with it
                return x.indexOf("clause") === -1
            });
        }
        this.tags.push(tag);
    };

    //todo old version below
    //this.make_clause = function (clause_type) {
    //    this.clause = new Clause (clause_type)
    //};

    //new version below
    this.make_clause = function (clause_type) {
        if (!this.clause) {                                             //if a region has no clause property
            this.clause = new Clause(clause_type, indices);           //we make onb
        }
        else {                                                              //but if a region already has a clause, and all we want to do is assign it a clause type
            this.clause.clause_type = clause_type;
        }

    }

};




var Clause = function (clause_type, indices) {
    this.subject = null;       //todo change this to list?
    this.object = null;
    this.verb = null;
    this.predicate = null;
    //todo, added below
    this.clause_type = clause_type;
    this.indices = indices;
    this.get_tag_type = function () {
        return TagType.Clause;
    }



};

var SubordinateClause = function () {
    this.superordinate = null;
    this.subordinate = null;
    this.subordinating_conjunction = null;
    this.get_tag_type = function () {
        return TagType.SubordinateClause;
    }
};

//motivation: we want to reduce classes and so we want a single class which can give us
// tag type - stores type and region
// useful for: noun, verb, adjective, adverb
var SingleRegionTag = function (type, region) {
    this.type = type;
    this.region = region;
    this.get_tag_type = function () {
        return this.type;
    }
};













