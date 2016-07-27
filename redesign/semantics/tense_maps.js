var tense_maps = {
    'english': {
        'simultaneous indicative': [
            'present indicative'
        ],
        'subsequent indicative': [
            'future indicative',
            'future perfect indicative'
        ],
        'prior indicative': [
            'imperfect indicative',
            'perfect indicative',
            'pluperfect indicative'
        ],
        'simultaneous subjunctive primary': [],
        'simultaneous subjunctive secondary': [],
        'prior subjunctive primary': [],
        'prior subjunctive secondary': [],
        'subsequent subjunctive primary': [],
        'subsequent subjunctive secondary': []
    },
    'latin': {
        'simultaneous indicative': [
            'present indicative'
        ],
        'subsequent indicative': [
            'future indicative',
            'future perfect indicative'
        ],
        'prior indicative': [
            'imperfect indicative',
            'perfect indicative',
            'pluperfect indicative'
        ],
        'simultaneous subjunctive primary': [
            'present subjunctive'
        ],
        'simultaneous subjunctive secondary': [
            'imperfect subjunctive'
        ],
        'prior subjunctive primary': [
            'perfect subjunctive'
        ],
        'prior subjunctive secondary': [
            'pluperfect subjunctive'
        ],
        'subsequent subjunctive primary': [
            'present subjunctive of the active periphrastic'
        ],
        'subsequent subjunctive secondary': [
            'imperfect subjunctive of the active periphrastic'
        ]
    },
    'ssslatin': {
        'simultaneous indicative': [
            'present indicative'
        ],
        'subsequent indicative': [
            'future indicative',
            'future perfect indicative'
        ],
        'prior indicative': [
            'imperfect indicative',
            'perfect indicative',
            'pluperfect indicative'
        ],
        'simultaneous subjunctive primary': [
            'present subjunctive'
        ],
        'simultaneous subjunctive secondary': [
            'imperfect subjunctive'
        ],
        'prior subjunctive primary': [
            'perfect subjunctive'
        ],
        'prior subjunctive secondary': [
            'pluperfect subjunctive'
        ],
        'subsequent subjunctive primary': [
            'present subjunctive of the active periphrastic'
        ],
        'subsequent subjunctive secondary': [
            'imperfect subjunctive of the active periphrastic'
        ]
    }
}

var tense_taxonomy = {
    'simultaneous indicative': [
        'present indicative'
    ],
    'subsequent indicative': [
        'future indicative',
        'future perfect indicative'
    ],
    'prior indicative': [
        'imperfect indicative',
        ['perfect indicative', [
            'greek perfect indicative',
            'aorist indicative'
        ]],
        'pluperfect indicative'
    ],
    'simultaneous subjunctive primary': [
        'present subjunctive'
    ],
    'simultaneous subjunctive secondary': [
        'imperfect subjunctive'
    ],
    'prior subjunctive primary': [
        'perfect subjunctive'
    ],
    'prior subjunctive secondary': [
        'pluperfect subjunctive'
    ],
    'subsequent subjunctive primary': [
        'present subjunctive of the active periphrastic'
    ],
    'subsequent subjunctive secondary': [
        'imperfect subjunctive of the active periphrastic'
    ]
}

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
var random_tense_from = function (tense_obj) {
    return random_choice(list_tenses_in(tense_obj));
}