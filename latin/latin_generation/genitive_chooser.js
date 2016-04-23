var init_dsl = function () {
    execute('^ :: (properties.core.)');
    ['place', 'human', 'animate', 'god'].forEach(
        function (x) {execute('_' + x + ' : (^' + x + ')')});
    ['ruler', 'kin'].forEach(
        function (x) {execute('_' + x + ' : (^' + x + 'ship)')});
    execute('_animal : (_animate and (not (_human or _god)))');
    execute('_plain_human : (_human and (not (_ruler or _kin)))');
    execute('_inanimate : (not _animate)');
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

/*
some dsl notes of various types
NEW FEATURES NEEDED (now all here)
Akiva, if you're reading this, don't expect to get all of it, but
I'm happy to answer any questions.
eventually it will be needed to have arbitrary properties (I can tell)

i.e. need property 'not' from some object

can't do this currently

to this end, strings (as would be expected) with single or double quotes
(`s, `d) and escaping (uses a string-matching regex)
`n: [newline]
`s: [single quote]
`d: [double quote]
`b: [backtick]
`t: [tab]
no other backticks allowed

@ takes a string, returns a property getter

add @ to characters
ex. execute('@"`n a `q"')({"\n a '": 5}) -> 5

true, false, passes, fails
ex.
execute('true') -> true
execute('false') -> false
execute('passes')({}) -> true
execute('fails')({}) -> false

operators should not be allowed to be initial
ex. execute('& 2 3') throws an error

Note: this bit has nothing to do with Latin.
also, adverb function should be illegal
ex. execute('` not') also throws an error

the current function/constant distiction is useful and even makes some kind of sense now

however, it will be better in the future to have built_ins (now functions) vs dicts (now constants)

changing these names throughout is probably a good idea

no used feature depends on this, so it's not that bad a situation

also

new ,, operator
creates a fake set (but works in any browser)
ultimately better for large lists because it allows quick finding

e.g, is (dog,, cat,, fish,, frog,, dragon,, horse,, eagle) takes constant time

make , push each element instead of using concat

Note: and, &, and && are all the same operator, so use synonyms to your heart's content.
---------------

is_l : (word_id.is)
_transitive : (properties.latin.transitive.(is transitive))
_indirect_object : (is_l (give,, speak,, show))
Note: presumably more words will be added to this. When testing equality
against a long list, use double commas: it makes testing constant-time.
(Internally, it does this by using a hash instead of a list.)
_takes_ablative : (is_l (attack,, conquer,, defeat,, rule))
Note: See above.
_instrument : (is_l (sword, spear))
Note: on the other hand, the number of instruments might stay small.
_typical_verb : (_transitive and (not _indirect_object) and (not _takes_ablative))

Accusative:
'is_l give': '_inanimate',
'is_l show': 'passes',
'_takes_ablative': '_animate or _place',
'_typical_verb': 'passes'
Note: figure out what you can do with places. 'passes' will just
let them through (the horse eats Italy). Objects are complicated.

Dative:
'_indirect_object': '_animate'

Ablative:
'_takes_ablative': '_instrument'

---------------------
'is_l give': '_animate'
	dative = animate

	sense: "the king gives the sword to the queen"
	nonsense??: "the king gives the frog to the queen"
	slight nonsense: "the king gives the daughter to the queen"
	nonsense: "the king gives the sword to the spear"


speak
       accusative = none
	dative = animate

	sense: "the king speaks to the frog"
	nonsense: "the king speaks to the spear"

show
	accusative = animate || inanimate
	dative = animate

	sense: "the king shows the frogs to the queen"
	nonsense: "the king shows the frogs to the spear"


ABLATIVE

attack, conquer, defeat, rule
	accusative: animate || place
	ablative: instrument
*/