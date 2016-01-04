
var Sentence = function (words, text) {   /// automagically creates: var Sentence = {prototype: {}}
    
    this.class_id = 1;
    this.words = words;
    this.regions = [];
    this.text = text;
    this.language_of_sentence = null;
    
};

Sentence.prototype.get_regions = function(){
  return this.regions;  
};

//todo should this be renamed make_region?
Sentence.prototype.get_region2 = function (indices) {
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
Sentence.prototype.get_region = function (indices) {
    for (var i in this.regions) {
        if (this.regions[i].equals_list(indices)){
            return this.regions[i];
        }
    }
    var nr = new Region (indices);
    this.regions.push(nr);
    return nr;
};

Sentence.prototype.get_sub_regions = function (region) {
    var superset = new Set (region.get_indices());
    var results = [];
    for (var i in this.regions) {
        if (is_subset(superset, this.regions[i].get_indices()))  {
            results.push(this.regions[i]);
        }
    }
    return results;
};

Sentence.prototype.get_region_text = function(region){
    
    var ws = this.words;
    var is = region.get_indices();
    // //console.log"is", is);
    return is.map(function(i){ return ws[i];}).join(" ");
    
};


Sentence.prototype.debug = function(){
    var self = this;
    this.regions.forEach(function(r){
        //console.logself.get_region_text(r), r.get_tag_types().toString());
    });
};

Sentence.prototype.get_regions_with_tag = function(tag_type){
    return this.get_regions().filter(function(r){ return r.has_tag_type(tag_type); });
};

Sentence.prototype.get_regions_for_tags = function(region_filter){
    
    var tags_to_regions = {};
    var regions = region_filter ? this.regions.filter(region_filter) : this.regions;

    regions.forEach(function(r){
        r.get_tag_types().forEach(function(t){
            
            var rs = tags_to_regions[t];
            if (rs == null) {
                rs = [];
                tags_to_regions[t] = rs;
            }
            rs.push(r);
            
        });
    });

    return tags_to_regions;
    
};


//todo rename to get filtered tag types
Sentence.prototype.get_all_tag_types = function(region_filter, tag_filter){
    
    //todo below was old code
    // var tags = new Set();
    var all_tags = new Set();
    
    // new rejected code
    // var tag_region_combos = [];
    var regions = region_filter ? this.regions.filter(region_filter) : this.regions;
    
    //todo on 11-29 new code below added tag filter
    regions.forEach(function(r){
        var tags = tag_filter ? r.get_tag_types().filter(tag_filter) : r.get_tag_types();
        // old code
        // r.get_tag_types().forEach(function(t){
        tags.forEach(function(t){
            // new rejected code
            // tag_region_combos.push({'region': r, 'tag': t});
            all_tags.add(t);
        });
    });
    
    //todo old code
    // return tags;
    // todo new rejected code
    // return tag_region_combos;
    return all_tags;
    
};



Sentence.save = function(sentence) {
    //console.log"saving to firebase: ", sentence);
    //console.log"stringify: ", JSON.stringify(sentence));
    
    var callback = function(error) {
        if (error != null) {
            //console.logerror);
        }
    };
    
    Persist.push(["sentence"], JSON.stringify(sentence), callback);


};

//firebase data will be serialized (i.e. packed up in a string format (basically JSON??)
//but we want access to all the properties of the object
//so we need to deserialize the data (i.e. turn it back into an object)
Sentence.deserialize = function(data){

    var all_sentences = data.val();

    var unique_ids = Object.keys(all_sentences);
    console.log("sentences loaded:", unique_ids.length);
    //console.logunique_ids);
    var sentences = [];
    
    for(var i in unique_ids){
        var ser_str = all_sentences[unique_ids[i]];
        var sentence = JSON.parse(ser_str.data, Sentence.reviver);
        // //console.logsentence);
        sentences.push(sentence);
    }
    
    return sentences;

};

//the reviver will
Sentence.reviver = function(key, value){
    
    // //console.logkey, value);
    
    if(value != null && value.hasOwnProperty("class_id")){
        // //console.log"found class!", value);
        
        var obj;
        
        switch(value.class_id){
            case 1: obj = new Sentence(); break;
            case 2: obj = new Region(); break;
            case 3: obj = new SingleRegionTag(); break;
            case 4: obj = new Clause(); break;
            case 5: obj = new SubordinateClause(); break;
            default:
                //console.log"you forgot a class!");
                throw "can't deserialize this object: " + value.class_id;
        }
        
        var keys = Object.keys(value);
        
        // //console.logkeys);
        
        keys.forEach(function(key){
            obj[key] = value[key];
        });
        
        return obj;
        
    } else {
    
        // is a primitive (like number, boolean, string)
        return value;
    
    }
    
};

Sentence.get_all_sentences = function(callback){
    
    var wrapped_callback = function(data){
        var sentences = Sentence.deserialize(data);
        callback(sentences);
    };
    
    Persist.get(["sentence"], wrapped_callback);
    
};


