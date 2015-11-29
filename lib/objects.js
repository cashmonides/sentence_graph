
var TagType = {
    //below has its own class
    SubordinateClause : "subordinate clause",
    CoordinateClause : "coordinate clause",
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


var Region = function (indices) {
    
    this.class_id = 2;
    this.indices = indices;
    // this.sentence = null;
    this.tags = [];
    
};

    Region.prototype.get_tags = function(){
        return this.tags;
    };

    //this returns a sorted set, and we don't want a list
    Region.prototype.get_indices = function () {
        var set_of_indices = new Set (this.indices);
        var list_of_indices = Array.from(set_of_indices);
        //a-b retur s
        return list_of_indices.sort(function(a, b){return a-b;});
        
    };


    //below is a method to extract a list of all tags on a region
    //in easy single-interface form (because .tags method will return objects not strings)
    Region.prototype.get_tag_types = function () {
        
        return this.tags.map(function(t){
            return t.get_tag_type();
        });
        
    };
        
    Region.prototype.has_tag_type = function(tag_type){
        return contains(this.get_tag_types(), tag_type);
    };


    Region.prototype.equals_list = function (indices) {
        if (this.indices.length === indices.length) {
            for (var i in this.indices) {
                if (this.indices[i] != indices[i]) {
                    //console.log"this region matches");
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    };

    //todo old version below CHECK
    Region.prototype.add_tag = function (tag) {
        this.tags.push(tag);
    };


    Region.prototype.clear_tags = function () {
        this.tags = [];
    };


    //todo new version below CHECK
    // this.add_tag = function (tag) {
    //     if (tag.get_tag_type().indexOf("clause") !== -1) {              //trying to avoid having multiple tags with the word clause in it
    //         this.tags = this.tags.filter(function(x) {                  //we remove any other clause tags that might have been accidentally associated with it
    //             return x.get_tag_type().indexOf("clause") === -1
    //         });
    //     }
    //     this.tags.push(tag);
    //};
    


    //todo old version below
    Region.prototype.make_clause = function (clause_type) {
        this.clause = new Clause (clause_type);
    };


    //new version below
    // this.make_clause = function (clause_type) {
    //     if (!this.clause) {                                             //if a region has no clause property
    //         this.clause = new Clause(clause_type, indices);           //we make onb
    //     }
    //     else {                                                              //but if a region already has a clause, and all we want to do is assign it a clause type
    //         this.clause.clause_type = clause_type;
    //     }

    // };



//this is an object
var Clause = function (clause_type) {
    
    this.class_id = 4;
    this.subject = null;       //todo change this to list?
    this.object = null;
    this.verb = null;
    
    this.predicate = null;

    this.clause_type = clause_type;
    this.superordinate_clause = null;
    this.conjunction = null;

};

    Clause.prototype.get_tag_type = function () {
        return this.clause_type;
    };


//although called a clause, it's really a tag
var SubordinateClause = function () {


    //quick and dirty additions to get some funcitonality (possibly collapse sub and main clause together)
    this.class_id = 5;
    this.subject = null;
    this.object = null;
    this.verb = null;
    this.predicate = null;
    this.clause_type = "subordinate clause";

    this.superordinate = null;
    this.subordinate = null;
    this.subordinating_conjunction = null;

};

    SubordinateClause.prototype.get_tag_type = function () {
        return "subordinate clause";
    };

//motivation: we want to reduce classes and so we want a single class which can give us
// tag type - stores type and region
// useful for: noun, verb, adjective, adverb
var SingleRegionTag = function (type) {
    this.class_id = 3;
    this.type = type;
};

    SingleRegionTag.prototype.get_tag_type = function () {
        return this.type;
    };













