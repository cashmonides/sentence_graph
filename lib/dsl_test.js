// dsl test cases.

function test_(f, args, expected) {
    var orig_f = f;
    for (var i = 0; i < args.length; i++) {
        f = f(args[i]);
    }
    
    if (f !== expected) {
        throw ["with code", orig_f,  "and args", JSON.stringify(args),
        "got", JSON.stringify(f), "and expected", JSON.stringify(expected)]
        .join(' ')
    }
};
execute('^ :: (properties.core.)');

['place', 'human', 'animate', 'god'].forEach(
    function (x) {
        console.log('crashing?');
        console.log(execute('def? ^'));
        console.log('no crash yet');
        console.log('_' + x + ' : (^' + x + ')');
        execute('_' + x + ' : ((properties.core.) ' + x + ')');
        console.log('still good');
        execute('_' + x + ' : (^' + x + ')')});
        console.log('still still good');
