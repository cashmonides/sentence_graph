// A tense is an object that gives as specific a description of
// the relevant tense as possible.
// It has a name (such as "aorist indicative") and some categories
// describing its less precise properties (such as "perfect").
var Tense = function (string) {
    this.name = string;
    this.categories = {};
}

// We can add a category to a tense.
Tense.prototype.add_category = function (item) {
    this.categories[item] = true;
}

// We can check whether something matches a tense.
Tense.prototype.matches = function (tense_string) {
    // Only the part before the colon matters.
    tense_string = tense_string.split(/ *:/g)[0];
    // Check whether it is either the name of the tense
    // or one of its categories.
    return tense_string === this.name || tense_string in this.categories;
}

// This lists the tenses in a tense object such as
// [
//     'imperfect subjunctive of the active periphrastic'
// ]
// or
// [
//     'imperfect indicative',
//     ['perfect indicative', [
//         'greek perfect indicative',
//         'aorist indicative'
//     ]],
//     'pluperfect indicative'
// ]
var list_tenses_in = function (tense_obj) {
    // We check that our tense_obj is sane.
    if (tense_obj === undefined || tense_obj === null) {
        throw 'Bad tense object: ' + tense_obj;
    }
    // If the tense object is a string we simply make a tense from it.
    if (typeof tense === 'string') {
        return [new Tense(tense)];
    } else {
        // Our tense object should be a list, as in both examples here.
        // There are then two types of entries in our tense object:
        // simple strings, and types of tenses as with perfect indicative.
        // These types are dealt with separately.
        // We create an initially empty list of tenses.
        var list_of_tenses = [];
        // We loop over the tense object.
        for (var i = 0; i < tense_obj.length; i++) {
            // The string case is very simple. Simply create
            // the tense and add it.
            if (typeof tense_obj[i] === 'string') {
                list_of_tenses.push(new Tense(tense_obj[i]));
            } else {
                // The item being examines is a list in the format
                // ['perfect indicative', [
                //     'greek perfect indicative',
                //     'aorist indicative'
                // ]]
                // The first item is simply a category name. The second is
                // a list of tenses within that category, or, actually,
                // a tense object. This allows for nested categories
                // (maybe some language combines all continuous past tenses).
                var category = tense_obj[i][0];
                var tenses_to_add = list_tenses_in(tense_obj[i][1]);
                // We loop over the tenses to add, adding each after
                // adding the appropriate category.
                for (var i = 0; i < tenses_to_add.length; i++) {
                    tenses_to_add[i].add_category(category);
                    list_of_tenses.push(tenses_to_add[i]);
                }
            }
        }
        // We return our list of tenses.
        return list_of_tenses;
    }
}

// To get a random tense, choose randomly from the possibilities.
var random_tense_from = function (kck_level, tense_obj, allowed_tenses_apply) {
    var tenses = list_tenses_in(tense_obj);
    if (!allowed_tenses_apply) {
        return random_choice(tenses);
    }
    var tenses_allowed = get_current_module(kck_level).universal_indicative_tenses_allowed;
    var pruned_tenses = tenses.filter(function (x) {
        return tenses_allowed.indexOf(x.name) !== -1;
    });
    if (pruned_tenses.length === 0) {
        return random_choice(tenses);
    } else {
        return random_choice(pruned_tenses);
    }
}