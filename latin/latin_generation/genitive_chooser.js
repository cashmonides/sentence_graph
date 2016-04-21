var init_dsl = function () {
    execute('^ :: (properties.core.)');
    ['place', 'human', 'animate', 'god'].forEach(
        function (x) {execute('_' + x + ' : (^' + x + ')')});
    ['ruler', 'kin'].forEach(
        function (x) {execute('_' + x + ' : (^' + x + 'ship)')});
    execute('_animal : (_animate and (not (_human or _god)))');
    execute('_plain_human : (_human and (not (_ruler or _kin)))');
}

var lexeme_criteria = {
    'genitive': function (lexeme) {
        var i;
        var values = [];
        for (i in genitive_lexical_restictions) {
            if (execute(i)(lexeme)) {
                values.push(execute(genitive_lexical_restictions[i]));
            }
        }
        
        return function (x) {
            for (var i = 0; i < values.length; i++) {
                if (values[i](x)) {
                    return true;
                }
            }
            return false;
        }
    }
}