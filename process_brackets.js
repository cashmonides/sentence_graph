
/*

    text
    if supports brackets
        [text -> words with brackets]
        [remove brackets -> words]
    else
        text -> words
    create sentence using words
    [populate tags based on words with brackets]
    manual tag through gui



    



 */



var test2 = "the dog chases the cat (while the fish eats the worm)";
// region 1 = "the dog chases the cat"
//     tag.clause = "tag enumeration"
var test5 = "the dog sleeps / and the cat hunts (while the fish swims  / and the rabbit (who ate the carrot) jumps)";

var test = "the dog sleeps / and the cat hunts (while the fish swims  / and the rabbit jumps)";
//A B C D
//iteration returns this information:
// C.superordinate_clause = [A, B]
//C.coordinate_right = D
//D.coordinate_left = C

//inferrable from above:
//D.superordinate_clause = B 


//quizzable questions:
//click on the subordinate clause?

var test3 = "john went home / and mark went to the store (which closes at 8) (to buy milk)";
var test4 = "john went to war / and mark went to college (in order that they might impress their girlfriends)";
var test5 = "the dog jumps ( when the bell rings / and the flag is lifted ) into the lake";
var test6 = "the dog ( which you found in the park ) jumps ( when the bell ( which my father made ) rings )";
var test7 = "the cat sleeps / and the dog runs / and the fish swims";

window.onload = function () {

    var words = test6.split(/ /);
    var sentence = new Sentence();
    process_bracketed_text2(0, words, sentence, null);

};



/*

    the dog jumps (when the bell rings)
    
    
    the dog jumps (
        when the bell rings
    )
    
    the dog jumps 
        (when the bell rings)


    the dog jumps (when the bell rings / and the flag is lifted)
    
    the dog jumps 
        (when the bell rings / 
            and the flag is lifted
        )



*/


// input - list of words including brackets
// output - index from which to continue processing

var id = 0;

function process_bracketed_text2 (start, words, sentence, parent) {
    
    console.log("recursive call:", start, words, words[start]);

    var clause = new Clause();
    id++;
    clause.id = id;
    
    
    if(parent != null){
        clause.superordinate_clause = parent;
        console.log("our parent is: " + parent.id);
    }
    var indices = []
    
    var started_with_paren = false;
    
    if(words[start] == "("){
        start++;
        started_with_paren = true;
    }
    
    console.log("started with paren?", started_with_paren);
    
    var i;
    outer:
    for(i = start; i < words.length; i++){
        var w = words[i];
        switch(w){
            case "(":
                i = process_bracketed_text2(i, words, sentence, clause);
                console.log("i jumped to:", i);
                break;
            case ")":
                if(started_with_paren){
                    i += 1
                }
                break outer;
            case "/": 
                i = process_bracketed_text2(i + 1, words, sentence, clause);
                console.log("i jumped to:", i);
                break;
            default: 
                // console.log("should be a word:", w, i);
                indices.push(i);
        }
    }
    
    sentence.get_region(indices).add_tag(clause);
    console.log("indices:", indices, indices.map(function(i){ return words[i]; }), clause.id, (clause.superordinate_clause == null ? "" : clause.superordinate_clause.id));
    return i - 1;

}


























function process_bracketed_text (words, sentence) {

    //these were global variable (which I was trying to modularize and isolate)
    //they need to be initialized when we initialize sentence
    //todo move these to some function like create_sentence
    
    //todo comment this out
    var indices_to_regions = {};
    // var word_map = {};

    //clause_stack is a stack of all the clauses (i.e. their indices) which haven't been processed yet
    // = list of lists of indices
    var clause_stack = [[]];

    //clause_region is the region which we will end up pushing to sentence.regions
    var clause_region;

    //info_stack holds all the information about super/sub/coordination
    var info_stack = [{'siblings' : [], 'children' : []}];


    //y is the list of indices that will become a clause, turned into a region, then we make a clause in that region
    var y;


    //we iterate through the bracketed text and we look for signs of subordination and coordination
    for (var i = 1; i <= words.length; i++) {
        //console.log("CLAUSE STACK = ", JSON.stringify(clause_stack));
        if (words[i] === '(') {
            //a subordinate clause has been detected so we want to add it to the clause stack
            //so we create a list [i] and push it to the stack
            clause_stack.push([i]);
            //we also, in parallel, push an empty info stack to be populated
            info_stack.push({'siblings': [], 'children': []});
        } else if (words[i] === '/') {
            //coordination has been detected
            //therefore we push i (namely the slash character) to the current item in the stack
            clause_stack[clause_stack.length - 1].push(i);
            //therefore one clause has finished so we pop it from the clause stack
            y = clause_stack.pop();
            // so, since a new clause has just finished, we want to add it to our sentence object. So this makes the region
            clause_region = sentence.get_region(y);
            // and now we want to set the .clause property of this new region we've just created
            //as follows: if the clause_stack is empty, then it indicates that the clause we just popped is main
            clause_region.make_clause(
                clause_stack.length === 0 ? 'main clause' : 'subordinate clause: unspecified');
            //so now we also want to set properties of both the current clause and the info stack
            add_properties(clause_region.clause, info_stack);
            //now we want to associate regions with the clauses we've just made
            y.forEach(function (x) {
                    indices_to_regions[x] = clause_region;
                }
            );
            //now we want to clear the children in the last item of the stack
            info_stack[info_stack.length - 1].children = [];
            //we've just popped y, so we want to push an empty list, which will be eventually filled
            clause_stack.push([]);

        } else if (words[i] === ')') {
            //end of clause detected so we push the ) character
            clause_stack[clause_stack.length - 1].push(i);
            y = clause_stack.pop();
            //defensive programming: sentence might not be tagged correctly
            // first we deal with the unproblematic situation, where there is an open bracket
            if (clause_stack.length !== 0) {
                clause_region = sentence.get_region(y);
                clause_region.make_clause('subordinate clause: unspecified');
                add_properties(clause_region.clause, info_stack);
                info_stack.pop();
                y.forEach(function (x) {
                    indices_to_regions[x] = clause_region;
                })
            } else {
                throw 'bad tagging';
            }


        } else {
            //if we don't hit a bracket character (i.e. a regular word) we push the word
            clause_stack[clause_stack.length - 1].push(i);
        }

    }

    //we might have not closed all brackets, i.e. we might have more than just a main clause
    if (clause_stack.length !== 1) {
       throw 'bad tagging';
    }

    //below processes the last main clause
    clause_region = sentence.get_region(clause_stack[0]);                    //this makes our main clause
    clause_region.make_clause('main clause');
    add_properties(clause_region.clause, info_stack);
    clause_stack[0].forEach(function(x) {
        indices_to_regions[x] = clause_region;
    });

    //console.log("WORDS TO CLAUSES = ", words_to_clauses);
    console.log("SENTENCE.REGIONS = ", sentence.regions);
    //
    //var clean_regions = sentence.regions.map(function(x) {
    //    return x.tags[0].clause_type + '=' + x.indices.map(function (z) {return word_selector.words[z]}).join(' ')
    //}).join('\n');
    //
    //
    //console.log("CLEAN OUTPUT = ", clean_regions);



    log_relationships(sentence, words);

    return sentence;
}

//this will add properties (super/sub/coordinate) to a given clause
function add_properties (clause, info_stack) {


    //below will deal with subordination and superordinate
    //first we initialize a variable for all the children of the argument clause
    //so info_stack[info_stack.length - 1] = most recent clause
    var children = info_stack[info_stack.length - 1].children;

    //there are two possibilities
    //either we're in the main clause (info_stack.length = 1)
    //or we're in a subordinate clause (infor_stack.length != 1)

    //if our argument clause is a subordinate clause, then we want to push it to the children of the clause above it (info_stack[info_stack.length - 2]
    if (info_stack.length !== 1) {
        info_stack[info_stack.length - 2].children.push(clause);
    }

    //now we want to set our subordinate clause property (this.subordinatate & this.superordinate & this.coordinate of our clause
    //slice(0) copies a list (i.e. it starts at 0 and goes to the end)
    clause.set('subordinate', children.slice(0));

    //now we want to make our argument clause superordinate to all its children
    children.forEach(function (x) {
        x.set('superordinate', clause)
    });


    //now we want to deal with coordination
    //we initialize a variable for all the siblings of the argument clause
    var siblings = info_stack[info_stack.length - 1].siblings;

    //we push our argument clause into the siblings group (which modifies the info_stack)
    siblings.push(clause);

    //first we want to set what clauses are all coordinate to each other
    clause.set('coordinate_all', siblings.slice(0));


    //we also need to add the argument clause to its siblings
    //so we iterate through all the siblings and push argument clause into the coordinate_all
    for (var i = 0; i < siblings.length - 1; i++) {
        siblings[i].push_to('coordinate_all', clause);
    }

    //so we've just finished making a big list of all the clauses that are coordinate to each other
    //now we want to figure out which clauses are adjacent neighbors to each other
    if (siblings.length > 1) {
        var left = siblings[siblings.length - 2];
        left.set('coordinate_right', clause);
        clause.set('coordinate_left', left);
    }

}

function log_relationships(sentence, words) {
    for (var j = 0; j < sentence.regions.length; j++) {
        console.log('clause');
        console.log(indices_to_string(sentence.regions[j].indices, words));
        ['subordinate', 'superordinate', 'coordinate_all',
            'coordinate_left', 'coordinate_right'].forEach(
            function (x) {
                if (x in sentence.regions[j].clause.get) {
                    console.log(x);
                    if (Array.isArray(sentence.regions[j].clause.get[x]())) {
                        sentence.regions[j].clause.get[x]().forEach(
                            function (y) {console.log(indices_to_string(y.indices, words))})
                    } else {
                        console.log(indices_to_string(
                            sentence.regions[j].clause.get[x]().indices, words));
                    }
                }
            }
        )
    }
}

function indices_to_string(is, words) {
    var output = "";
    for (var i = 0; i < is.length; i++) {
        output += (words[is[i]]) + " ";
    }
    return output.slice(0, -1);
}