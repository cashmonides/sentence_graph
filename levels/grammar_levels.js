var grammar_levels = {
    
    
    //ask about: noun verb
    //choices are: noun verb
    1: ['noun', 'verb'],
    
    
    //ask about: n v s o 
    //choices are: n v || v s o but never n v s o
    20: ['noun', 'verb', 'subject', 'object'],
    
    
    //ask about: n v s o p a
    //choices are: n v a or v s o a|| v s o p but never n, s,o,p or p & a
    30: ['noun', 'verb', 'subject', 'object', 'predicate', 'adjective'],
    
    
    
}


var overlapping_tag_map = {
    "subject" : ['noun'],
    "object" : ['noun'],
    "predicate" : ['noun', 'adjective'],
    "noun": ['subject', 'object', 'predicate'],
    "adjective": ['predicate']
}

/*

var grammar_levels = {
    
    
    //ask about: noun verb
    //choices are: noun verb
    1: {'noun', 'verb'},
    
    
    //ask about: n v s o 
    //choices are: n v || v s o but never n v s o
    2: {'noun', 'verb', 'subject', 'object'},
    
    
    //ask about: n v s o p a
    //choices are: n v a or v s o a|| v s o p but never n, s,o,p or p & a
    3: {'noun', 'verb', 'subject', 'object', 'predicate', 'adjective'},
    
    
    
}
*/