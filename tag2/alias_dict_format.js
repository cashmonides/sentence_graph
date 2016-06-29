var main = function () {
    var l = Object.keys(alias_dict).sort();
    
    var last = l[l.length - 1];
    
    console.log('var alias_dict = {');
    
    for (var i = 0; i < l.length; i++) {
        console.log('    \'' + l[i] + '\': \'' + alias_dict[l[i]] + '\'' + (l[i] === last ? '\n}' : ','));
    }
}

main();