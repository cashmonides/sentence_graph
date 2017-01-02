var terms_and_concepts = {
    'semantic versioning'
}


var functional_paradigm = {
    'random quotes': [
        'it was very refreshing to find a front-end language (elm)',
        'that uses signals instead of events and purity instead of mutation.',
        '...',
        'monoids in the category of endofunctors',
        
    ]
}


var coding_curriculum = "the disorganized maps below which need to be mapped into a map of map";



var STATS = {
    'sql': [
        'write a bunch of test sql operations', 
        '(e.g. every student who is in 2nd grade whose initial accuracy is above 80%)',
        'write an etymology word-by-word accuracy recorder'
        ],
        
}
    
var stats_display = {
    'd3': [
        'quick read of d3 tutorials',
        'mini display project, perhaps conquering edge'
        ],
    'p5.js': [
        'explore videos and tutorials', 
        'possibly do a mini project with Dan, e.g. the conquering edge game'
        ]
}

var overall_project_architecture = {
    'level-safety': [
        'build a bulletproof curve-based interface for level setting',
        'e.g. between modules 2 and 3 the etymology level increases by this curve'
        ],
    'unifying mode to a single scalar level': [
        'each mode should have a single number with some metadata'
        ],
    'in-game-level-tweaking': [
        'password protected mode switcher and level switcher'
        ]
}



var gameification = {
    '2-player-mode': [
        'success leads to getting 2 consecutive moves in 4x4 tic tac toe',
        'failure leads to getting only 1 move'
        ],
    'time-limits': [
        'conquering-edge-game'
        ],
    'labyrinth-navigation': [
        'clickable cells',
        'text-based-navigation e.g. turn left'
        ],
    'gain-and-loss': [
        'success leads to acquisition (e.g. of animal pictures, words, books, crystals of inward vision',
        'failure leads to loss (e.g. animal flees, words start to become misspelled, books crumble into dust, the crystal of inward vision develops a crack'
        ]
}

var specific_games = {
    'what is this?': [
        'is this a random string or is it just welsh? Dw i ddim yn gwybod'
        ]
}

var abstraction_to_all_knowledge = {
    'programming_language_<->_natural_language': [
        'syntax vs. semantics has a different but connected meaning',
        'e.g. this quote from stack overflow:',
        'Scheme is great for trying out new language semantics',
        'because it has very simple, powerful primitives',
        'and the uniform syntax lets you concentrate only on the semantics.'
        ],
    'programming_language_<->_natural_taxonomy_of_all_knowledge': [
        'a gamelike matching between programming concepts like list and set',
        'mapped to puzzles in natural language',
        'is the following a list or a set or a map...?'
        ],  
    'mathematical_description <-> etymology': [
        'cycloid <-> cyclops',
        'vector & convex (from veho) != vexed (from vexare)',
        'list all the species of primates who have developed theories of prime numbers'
        ],
    'the mountain of abstraction has no top': [
        'the tower of babel is composed of seeming primitives who populate the bottom',
        'an animal that thinks of itself as unique',
        'but one layer up they call me a cat',
        'and two layers up Ive heard they call me both a cat and chat',
        'but that might just be a misspelling',
        'because after all the scrolls which have made their way down here',
        'are often damaged',
        'or it might be a result of going two layers up',
        'five layers up they call me qat and cat and chat and chatul and mao',
        'some librarians above call me a quadruped',
        'and flatter themselves as bipeds',
        'but another librarian higher than them calls both he and I a tetrapod',
        'and says that bipedalism is merely a technique of locomotion and not an imitation of god',
        ]
}


var extension_beyond_the_classical = {
    'germanic_vs._latin': [
        'click on each word and classify as Germanic or Latin in origin',
        'the color as you see will change'
        ],
        'etymonline founder says': 'I was aiming obsession toward language, mostly sorting out the Germanic and Latin elements in the flow of an English sentence, to feel their different heft and torque.',
}


var data_hoarding = {
    'web-scraping-projects': [
        'etymonline',
        'wikipedia animal articles',
        'some tree of life website',
        'dictionary with synonyms',
        'use this word in a sentence',
        'shakespeare'
        ],
    'pdf-scraping': [
        'scrape through akivas pdf collection',
        'hand-scrape some pdfs to grab interesting puzzles',
        'bibliomancy game',
        'random page finder tool',
        'fixed page finder tool (e.g. page 987 in pdf of Oxford English Dictionary)'
        ]
}


var auto_tagging = {
    'tools desperately needed': [
        'english part of speech tagger',
        'english word occurence frequency, e.g. cycloid occurs infrequently so it must be introduced to the innocent youngster with that in mind'
        ]
}


var possible_functional_toy_project = {
    'object tagging game': [
        'rapid, super modular super safe object bulletproof classification game',
        'object enters the game, leaves with properties input by users',
        'its so well designed and modular that everything will work',
        'the html buttons that the user hits are generated super functionally',
        'the worst that will happen is that it gets a human-error mistaken property',
        'but it cant suffer from any code-based errors because the properties are just added as a list',
        'any internal structure the tags might have is encapsulated in the properties themselves',
        'applies to letter, morphological element, word, grammatical element, clause, sentence',
        'it would be fairly easy to come up with a list of objects and a list of properties',
        'the clicks send object + properties to some other function',
        'e.g. we want to check if the user has made a correct choice',
        'so we compare it to an existing map and return a bool if it matches',
        'in another scenario we are actually entering data because were a teacher',
        'so there is no existing map to compare to',
        'so the operation is to actually build the map based on the clicking',
        'or just maps it in the case of a tagging operation',
        'say the object is randomly picked from a list of animals',
        'properties are drawn from taxonomic properties',
        'object enters the box (wolf)',
        'a bunch of buttons get generated underneath',
        'vertebrate athropod carnivore',
        
        'e.g. at the word level',
        'generate 10 random words',
        'like http://www.textfixer.com/tools/random-words.php',
        'click on the words you dont know',
        'generate 10 random words',
        'click on the words with a root meaning X',
        'e.g. at the etymological level',
        'the word quadrupedal enters',
        'user clicks on boundaries between letters',
        'quadrupedal -> quadr.u.ped.al = root.connector.root.formator',
        'e.g. at the latin word level',
        'object enters vorabunt',
        'user clicks on boundaries in the word',
        'vorabant -> vor.aba.nt',
        'somehow connect it to etymonline',
        'random word shows up to super-user, he classifies it as worh including, having classical roots, having germanic or classical origins, too advanced, etc.',
        
        ]
}



OVERALL ARCHITECTURE OF THE PROJECT
building a bulletproof curve-based modeling of the levels

TEST DRIVEN DEVELOPMENT
write a small unit testing 


FUNCTIONAL BABY STEPS
go through current javascript code and rewrite messy stuff as functions in separate files
continue creating modules that are chained together
ultimately send them into unit tests

write functional vs dysfunctional comparisons of leetcode solutions and basic operations like reverse string, does_x_match_y


play clojurescript koans

FUNCTIONAL MEDIUM STEPS
play around with elm and try to create a hexagon based game with dan


FUNCTIONAL BIG STEPS
haskell
a mini haskell project doing string manipulation of latin elements (e.g. aba, abi) and etymological elements (e.g. quadr.u.ped.al = root.connector.root.for




/*
some REBIRTH text below
var rebirth_1 = {
    "id": 1,
    "book_text": "Crossed double vajras bar your exit from this very special hell. This is the destination of those who abuse the tantric path, who break their tantric vows through distraction or selfishness. Here the fierce dharma protectors turn upon one in wrath. This is a hell of the most frightful demonic images, the most fearful hell, for its suffering is paranoia rather than physical pain - difficult for anyone else ot assuage. Fear for oneself makes it almost impossible to see through the images and escape. Milarepa: To become my disciple you must observe the precepts, / Violate not the rules of Vajrayāna, / Debase not the great compassion, / Afflict not the body, word, and mind of Buddhists. / If you ever violaate tyhese rules / You can be assured of plummeting to the Vajra Hell!",
    "outcome_map": {
        "6 times 6": 9
    },
    "look": "Here the fierce dharma protectors turn upon one in wrath. This is a hell of the most frightful demonic images, the most fearful hell, for its suffering is paranoia rather than physical pain - difficult for anyone else ot assuage. Fear for oneself makes it almost impossible to see through the images and escape.",
    "ask": "This is the destination of those who abuse the tantric path, who break their tantric vows through distraction or selfishness."
    "doors": {
        "exit": "Crossed double vajras bar your exit."
    },
    "inscription": "Milarepa: To become my disciple you must observe the precepts, / Violate not the rules of Vajrayāna, / Debase not the great compassion, / Afflict not the body, word, and mind of Buddhists. / If you ever violate these rules / You can be assured of plummeting to the Vajra Hell!"
}


*/