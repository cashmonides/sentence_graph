// This function is useless now that everything's been moved.
// It is not critical and will be replaced when needed.

/*
var delete_sentence_from_firebase = function (chapter, number, callback) {
    if (!callback) {
        callback = function () {};
    }
    Persist.get(['sentence_mf'], function (x) {
        var v = x.val();
        var z = null;
        for (var i in v) {
            var j = JSON.parse(v[i].data);
            if (j.chapter === chapter && j.number === number) {
                z = v[i];
                delete v[i];
            }
        }
        
        if (z === null) {
            callback();
            throw 'Trying to delete a nonexistant sentence!';
        }
        
        // In case someone malicious finds this function and uses it
        // but can't figure out how to delete stuff otherwise,
        // we save the sentences somewhere else.
        Persist.get(['obsolete_mf'], function (y) {
            console.log(y, i, z);
            
            var w = y.val();
            
            if (w === null) {
                w = {};
            }
            
            w[i] = z;
            
            Persist.set(['obsolete_mf'], w);
        });
        
        console.log(v);
        
        Persist.set(['sentence_mf'], v, callback);
    });
}
*/

/*
// This function may never be used.
var get_syntax_question_ns = function (fn) {
    get_syntax_questions(function (x) {fn(Object.keys(x))});
}
*/