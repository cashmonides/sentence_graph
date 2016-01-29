// A sentence takes a word list as its argument in construction.
var Sentence = function (words) {
    // We set the word list of the sentence to the word list passed in as an argument.
    // Note: word lists always begin with null.
    this.words = words;
    // Sentences initially have no regions.
    this.regions = [];
    // This is an antecedents-to-relative-clauses map:
    this.antecdents_to_relative_clause_regions = {};
};

// This function gets a region of a sentence
// given its word list (actually its indices list).
Sentence.prototype.get_region = function (indices) {
    // We iterate over the regions of the sentence.
    for (var i = 0; i < this.regions.length; i++) {
        // We use equals_list to determine whether a region's indices
        // are the same as the list of indices given as an argument.
        if (equals_list(this.regions[i].indices, indices)){
            // We return the proper region.
            return this.regions[i];
        }
    }
    return null
};

// This function makes a region from a list of indices.
Sentence.prototype.make_region = function(indices) {
    if (indices.length === 0) {
        // This should never get triggered. If it is, there's a bug.
        throw new Error('You cannot make an empty region.');
    }
    // We make a new region from our indices.
    var new_region = new Region (indices);
    // We push our new region to the list of regions of the sentence.
    this.regions.push(new_region);
    // We return our new region.
    return new_region;
};

// This function gets a region from its list of indices if such a region exists,
// otherwise it makes one.
Sentence.prototype.get_or_make_region = function (indices) {
    if (this.get_region(indices) !== null) {
        return this.get_region(indices)
    } else {
        return this.make_region(indices)
    }
};

// This is a utility method that takes a list of indices and converts them
// to the string containing the corresponding words, separated by spaces.
// We use the sentence's word property for this.
Sentence.prototype.indices_to_string = function (is) {
    // We need to create self because inner this is not the same as outer this.
    // We then map our indices, substituting them by the equivalent words,
    // join by a space, and return the result.
    var self = this;
    return is.map(function (x) {return self.words[x]}).join(" ");
};

// This function finds regions with a given tag by filtering the regions list
// by a region method that checks for that tag.
Sentence.prototype.regions_with = function (tag) {
    return this.regions.filter(function (x) {return x.check_for_tag(tag)});
};

// A region takes a list of included indices as its argument in construction.
// Sentences have a list of regions as a property.
var Region = function (indices) {
    // We set the indices of the region to the list of indices passed in as an argument.
    this.indices = indices;
    // Regions can have tags, but initially they don't have any.
    this.tags = [];
};

// This function takes a region x and determines whether this region (not x)
// is a sub-region of x. It does so by checking whether every index of this
// is also an index of x.
Region.prototype.is_a_sub_region_of = function(x) {
    return this.indices.every(function (y) {return x.indices.indexOf(y) !== -1})
};

// This function adds a tag (an argument for the function) to a region.
Region.prototype.add_tag = function (tag) {
    // We remove all tags with the same tag type as the one we're adding.
    this.tags = this.tags.filter(function(x) {
        return x.get_tag_type() !== tag.get_tag_type()
    });
    // If our tag type is a clause tag type, we remove all other clause tags.
    if (tag.get_tag_type().indexOf("clause") !== -1) {
        this.tags = this.tags.filter(function(x) {
            return x.get_tag_type().indexOf("clause") === -1
        });
    }
    // We add our tag.
    this.tags.push(tag);
};

// This function removes all tags with a given tag type (given as a string)
// from a region, by filtering its tags.
Region.prototype.remove_tag = function (string) {
    this.tags = this.tags.filter(function(x) {
        return x.get_tag_type() !== string
    });
};

// This function determines whether any of a region's tags have a given tag_type.
Region.prototype.check_for_tag = function (tag_type) {
    return this.tags.some(function (x) {return x.get_tag_type() === tag_type})
};

// This function makes a clause in a region given a clause type
// (or changes one if the region already has a clause).
Region.prototype.make_clause = function (clause_type) {
    // This checks whether our region has a clause property.
    if ('clause' in this) {
        // Our region does have a clause property.
        // We check whether we are making the clause type relative,
        // changing the clause type from relative, or neither.
        if (this.clause.clause_type !== 'subordinate clause: relative' &&
            clause_type === 'subordinate clause: relative') {
            // We make the clause type relative.
            this.clause.clause_type = clause_type;
            // We create an antecedent property of our clause.
            this.clause.set('antecedent', [])
        } else if (this.clause.clause_type === 'subordinate clause: relative' &&
            clause_type !== 'subordinate clause: relative') {
            // We are changing our clause type from relative.
            // But if we have antecedents, this will also stop them from being such.
            // (There is the very subtle case of a word that is an antecedent
            // to more than one relative clause. However, this is not very common,
            // and can be fixed by tagging such an antecedent again.)
            // So, if a clause has antecedents, we ask the user to confirm their change
            // of clause type.
            if (this.clause["antecedent"]().length === 0 ||
                confirm('The clause you are tagging is relative. Tagging it as ' +
                'something else will remove all its antecedents. Do you want to continue?')) {
                // Either there were no antecedents or the user confirmed.
                // We change the clause type.
                this.clause.clause_type = clause_type;
                // We loop over the antecedents of the clause.
                for (var i = 0; i < this.clause["antecedent"]().length; i++) {
                    // We remove the antecedent tag from each.
                    this.clause["antecedent"]()[i].remove_tag("antecedent")
                }
                // We delete the antecedent property from the clause.
                delete this.clause["antecedent"]
            }
        } else {
            // We simply change the clause type of the clause.
            this.clause.clause_type = clause_type;
        }
        // Our region has a clause property, and so we just change its clause type.
    } else {
        // Our region does not have a clause property, and so we create one.
        // (Note that the clause indices stay the same as the region indices.)
        this.clause = new Clause(clause_type, this.indices);
        if (clause_type === 'subordinate clause: relative') {
            this.set('antecedent', [])
        }
    }
    // No matter what, we add the clause type as a tag
    // and also log that we're doing so.
    console.log('adding ' + clause_type + ' as a tag');
    var tag = new SingleRegionTag(clause_type);
    this.add_tag(tag);
};

// A clause takes a clause type and a list of included indices
// as its arguments in construction.a list of included indices and
// Regions can have a clause as a property.
var Clause = function (clause_type, indices) {
    // We set the clause type of the clause to the given clause type,
    // and the indices to the given indices.
    this.clause_type = clause_type;
    this.indices = indices;

    // We do this because this may be reset in the foreach loop.
    var self = this;
    // We set the subject, object, verb, and predicate properties to empty lists.
    ["subject", "object", "verb", "predicate"].forEach(function (x) {
        self.set(x, [])
    });
};

// We here make some things that can set, push to, or remove from
// any property of the clause. However, they doesn't actually
// set properties: they set the return value of the
// properties, which are actually functions.
// There are three advantages to this:
// 1: We avoid circular json errors. (Functions don't show up in json.)
// 2: We implement setters (but not getters).
// 3: We can easily add new properties.
Clause.prototype.set = function (string, value) {
    // We set the string property to (a function returning) value.
    this[string] = function () {return value}
};

Clause.prototype.push_to = function (string, value) {
    // We get (the current return value of) the value of the string property.
    var v = this[string]();
    // We make the value of the string property (a function returning)
    // v with value at the end. Note: This fails if value is a list.
    this[string] = function () {return v.concat(value)}
};

Clause.prototype.remove_from = function (string, value) {
    // We get (the current return value of) the value of the string property.
    var v = this[string]();
    // We make the value of the string property (a function returning)
    // v without occurrence of value.
    this[string] = function () {return v.filter(function (x) {return x !== value})}
};

// A single region tag takes a type as its argument in construction.
// Regions have a list of single region tags as a property.
var SingleRegionTag = function (type) {
    // This sets the type of our single region tag to type,
    // which is typically a string.
    this.type = type;
};

// This is a getter function for type.
SingleRegionTag.prototype.get_tag_type = function () {return this.type};