
/*


// Iteration 2.0
// - what language the root is in (english, latin or both)
// - exclude synonyms (i.e. the coincidence factor)
// - word to synonym  "What is a synonym of QUADRUPED?"
// - word to antonym

// Further away
// - alternate root "What is an alternate root of AQU?"
// - origin language "Is HYDR greek or latin?"



// DESIGN ISSUE
// - two words may be quite close in meaning and by coincidence both words or both definitions
//     - once synonyms are loaded and ready, we could exclude synonyms

// */
// var etymology_question_types = {
//     root_to_word: 0,
//     word_to_root: 1,
//     word_to_word_definition: 2,
//     word_definition_to_word: 3,
//     root_to_root_definition: 4,
//     root_definition_to_root: 5
// }


/*
ISSUE 1 - what data do we pull from module
- option a: pull only roots and we select words that either have all known roots or just 1 known root
- option b: pull roots and known words from module (maybe useful in early stages)

example of data we pull from module:
(a list of usable roots)
(do we have a list of usable words?)

currently have in module:
['BI', 'QUADR', 'PED']

do we want it to look like this in module:
{
    'BI' : [biped, bicycle, binoculaurs],
    'QUADR' : [quadruped, quadrilateral, quadratic],
    'PED' : "all"
}

ISSUE 2: common interface for all etymolgy question types

example of JSON object:
question_type:                              //word to root                          //random choice from allowed
question_template:                          //"What is the root of" + x + "?""      //determined 
what_gets_inserted_into_template:           //QUADRUPED                             //random choice from allowed
choices:                                    //['BI', 'QUADR', 'TERR']               //random choice from allowed
correct_answer:                             //'QUADR'                               //determined



PHILOSOPHICAL CHOICE
- choose root first or word first?
    - if we choose root first, we avoid the biased weighting of the sample with many words that end in -logy
    

STEPS
- deterministic parts
    - map of question_type to the deterministic parts of the JSON object

- random choice from allowed 
    (function we probably already have)
    argument based on root_first or word_first
    all we need to do is get the arguments


function: master function
argument 2: available question types (from level)
argument 3: available roots (from level)
argument 4: available words 
    (default should be a utility extracting all words from available roots)
    (but we should be able to filter words if we want toi)

returns JSON object


function: filter allowed






ISSUE 3 - what does etym level look like
- available roots
- available question types
- available words??

*/

// autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" supposedly turns spellcheck off
// maybe we want to be selective and do this, but presumably only in SpellingModeGame




// @beehack
var global_beehack_level;


var global_beehack_level_persistent;



// @beehack
var global_beehack_counter = 0;

// @beehack


// @beehack
var global_beehack_counter_persistent = 0;

// @beehack

// below might be obsolete




// @beehack
// new variables
// the level we pull from firebase
var initial_bee_counter = 0;

// the level we sometimes increment and persist to firebase
var session_bee_counter;

// the artificial level set by the player
// used to be called global_beehack_counter
var spelling_bee_training_counter = 0;


// a bool that determines whether we increment session_bee_level
// if the clicked level is lower than their session_level we don't increment
// else we do increment
var clicked_spelling_bee_level_lower = false;


// a bool that tells us whether we have a level set by a clicked button
var in_spelling_bee_training_mode = false;
// used to be called this:
var global_beehack_new_level_set = false;


// @beehack
var counter_to_etym_level_map = {
    0: {"etym_level": 10},
    1: {"etym_level": 10},
    2: {"etym_level": 20},
    3: {"etym_level": 20},
    4: {"etym_level": 20},
    5: {"etym_level": 20},
    6: {"etym_level": 30},
    7: {"etym_level": 30},
    8: {"etym_level": 30},
    9: {"etym_level": 30},
    10: {"etym_level": 30},
    

    11: {"etym_level": 40},
    12: {"etym_level": 40},
    13: {"etym_level": 40},
    14: {"etym_level": 50},
    15: {"etym_level": 60},
    16: {"etym_level": 70},
    17: {"etym_level": 80},
    18: {"etym_level": 90},
    19: {"etym_level": 100},
   
    
    20: {"etym_level": 110},
    21: {"etym_level": 120},
    22: {"etym_level": 130},
    23: {"etym_level": 140},
    24: {"etym_level": 150},
    25: {"etym_level": 160},
    26: {"etym_level": 170},
    27: {"etym_level": 180},
    28: {"etym_level": 190},
    29: {"etym_level": 200},
    
    30: {"etym_level": 110},
    31: {"etym_level": 130},
    32: {"etym_level": 150},
    33: {"etym_level": 170},
    34: {"etym_level": 190},
    35: {"etym_level": 210},
    36: {"etym_level": 230},
    37: {"etym_level": 250},
    38: {"etym_level": 270},
    39: {"etym_level": 290},
    
    
    40: {"etym_level": 110},
    41: {"etym_level": 130},
    42: {"etym_level": 150},
    43: {"etym_level": 170},
    44: {"etym_level": 180},
    45: {"etym_level": 200},
    46: {"etym_level": 220},
    47: {"etym_level": 250},
    48: {"etym_level": 270},
    49: {"etym_level": 280},
    
    
    50: {"etym_level": 290},
    51: {"etym_level": 330},
    52: {"etym_level": 320},
    53: {"etym_level": 330},
    54: {"etym_level": 340},
    55: {"etym_level": 350},
    56: {"etym_level": 360},
    57: {"etym_level": 370},
    58: {"etym_level": 380},
    59: {"etym_level": 390},
    
    60: {"etym_level": 100},
    61: {"etym_level": 120},
    62: {"etym_level": 140},
    63: {"etym_level": 160},
    64: {"etym_level": 180},
    65: {"etym_level": 200},
    66: {"etym_level": 220},
    67: {"etym_level": 240},
    68: {"etym_level": 260},
    69: {"etym_level": 280},
    
    70: {"etym_level": 300},
    71: {"etym_level": 320},
    72: {"etym_level": 340},
    73: {"etym_level": 360},
    74: {"etym_level": 380},
    75: {"etym_level": 400},
    76: {"etym_level": 420},
    77: {"etym_level": 440},
    78: {"etym_level": 460},
    79: {"etym_level": 480},
    
    80: {"etym_level": 300},
    81: {"etym_level": 320},
    82: {"etym_level": 340},
    83: {"etym_level": 360},
    84: {"etym_level": 380},
    85: {"etym_level": 400},
    86: {"etym_level": 420},
    87: {"etym_level": 440},
    88: {"etym_level": 460},
    89: {"etym_level": 480},
    
    90: {"etym_level": 100},
    91: {"etym_level": 120},
    92: {"etym_level": 140},
    93: {"etym_level": 160},
    94: {"etym_level": 180},
    95: {"etym_level": 200},
    96: {"etym_level": 220},
    97: {"etym_level": 240},
    98: {"etym_level": 260},
    99: {"etym_level": 280},
    
    100: {"etym_level": 300},
    101: {"etym_level": 320},
    102: {"etym_level": 340},
    103: {"etym_level": 360},
    104: {"etym_level": 380},
    105: {"etym_level": 400},
    106: {"etym_level": 420},
    107: {"etym_level": 440},
    108: {"etym_level": 460},
    109: {"etym_level": 480},
    
    110: {"etym_level": 300},
    111: {"etym_level": 320},
    112: {"etym_level": 340},
    113: {"etym_level": 360},
    114: {"etym_level": 380},
    115: {"etym_level": 400},
    116: {"etym_level": 420},
    117: {"etym_level": 440},
    118: {"etym_level": 460},
    119: {"etym_level": 480},
    
    120: {"etym_level": 300},
    121: {"etym_level": 320},
    122: {"etym_level": 340},
    123: {"etym_level": 360},
    124: {"etym_level": 380},
    125: {"etym_level": 400},
    126: {"etym_level": 420},
    127: {"etym_level": 440},
    128: {"etym_level": 460},
    129: {"etym_level": 480},
    
    130: {"etym_level": 300},
    131: {"etym_level": 320},
    132: {"etym_level": 340},
    133: {"etym_level": 360},
    134: {"etym_level": 380},
    135: {"etym_level": 400},
    136: {"etym_level": 420},
    137: {"etym_level": 440},
    138: {"etym_level": 460},
    139: {"etym_level": 480}, 
    
    140: {"etym_level": 300},
    141: {"etym_level": 320},
    142: {"etym_level": 340},
    143: {"etym_level": 360},
    144: {"etym_level": 380},
    145: {"etym_level": 400},
    146: {"etym_level": 420},
    147: {"etym_level": 440},
    148: {"etym_level": 460},
    149: {"etym_level": 480},
    
    150: {"etym_level": 300},
    151: {"etym_level": 320},
    152: {"etym_level": 340},
    153: {"etym_level": 360},
    154: {"etym_level": 380},
    155: {"etym_level": 400},
    156: {"etym_level": 420},
    157: {"etym_level": 440},
    158: {"etym_level": 460},
    159: {"etym_level": 480}, 
    
    160: {"etym_level": 300},
    161: {"etym_level": 320},
    162: {"etym_level": 340},
    163: {"etym_level": 360},
    164: {"etym_level": 380},
    165: {"etym_level": 400},
    166: {"etym_level": 420},
    167: {"etym_level": 440},
    168: {"etym_level": 460},
    169: {"etym_level": 480}, 
    
    
    170: {"etym_level": 300},
    171: {"etym_level": 320},
    172: {"etym_level": 340},
    173: {"etym_level": 360},
    174: {"etym_level": 380},
    175: {"etym_level": 400},
    176: {"etym_level": 420},
    177: {"etym_level": 440},
    178: {"etym_level": 460},
    179: {"etym_level": 480}, 
    
    180: {"etym_level": 300},
    181: {"etym_level": 320},
    182: {"etym_level": 340},
    183: {"etym_level": 360},
    184: {"etym_level": 380},
    185: {"etym_level": 400},
    186: {"etym_level": 420},
    187: {"etym_level": 440},
    188: {"etym_level": 460},
    189: {"etym_level": 480},
    
    190: {"etym_level": 300},
    191: {"etym_level": 320},
    192: {"etym_level": 340},
    193: {"etym_level": 360},
    194: {"etym_level": 380},
    195: {"etym_level": 400},
    196: {"etym_level": 420},
    197: {"etym_level": 440},
    198: {"etym_level": 460},
    199: {"etym_level": 480}, 
    
    200: {"etym_level": 480}
    

}


var counter_to_threshold_map = {
    0: 10,
    1: 10,
    2: 10,
    3: 10,
    4: 10,
    5: 10,
    6: 10,
    7: 10,
    8: 10,
    9: 10,
    
    10: 10,
    11: 12,
    12: 12,
    13: 12,
    14: 12,
    15: 12,
    16: 12,
    17: 12,
    18: 12,
    19: 12,
    
    20: 10,
    21: 12,
    22: 12,
    23: 12,
    24: 12,
    25: 12,
    26: 12,
    27: 12,
    28: 12,
    29: 12,
    
    30: 10,
    31: 12,
    32: 12,
    33: 12,
    34: 12,
    35: 12,
    36: 12,
    37: 12,
    38: 12,
    39: 12,
    
    40: 10,
    41: 12,
    42: 12,
    43: 12,
    44: 12,
    45: 12,
    46: 60,
    47: 12,
    48: 12,
    49: 12,
    
    50: 10,
    51: 12,
    52: 12,
    53: 12,
    54: 12,
    55: 12,
    56: 12,
    57: 12,
    58: 12,
    59: 12,

    60: 10,
    61: 12,
    62: 12,
    63: 12,
    64: 12,
    65: 12,
    66: 12,
    67: 12,
    68: 12,
    69: 12,
    
    70: 10,
    71: 12,
    72: 12,
    73: 12,
    74: 12,
    75: 12,
    76: 12,
    77: 12,
    78: 12,
    79: 12,
    
    80: 10,
    81: 12,
    82: 12,
    83: 12,
    84: 12,
    85: 12,
    86: 12,
    87: 12,
    88: 12,
    89: 12,

    90: 10,
    91: 12,
    92: 12,
    93: 12,
    94: 12,
    95: 12,
    96: 12,
    97: 12,
    98: 12,
    99: 12,
 
    100: 10,
    101: 10,
    102: 10,
    103: 10,
    104: 10,
    105: 10,
    106: 10,
    107: 10,
    108: 10,
    109: 10,
    
    110: 10,
    111: 12,
    112: 12,
    113: 12,
    114: 12,
    115: 12,
    116: 12,
    117: 12,
    118: 12,
    119: 12,
    
    120: 10,
    121: 12,
    122: 12,
    123: 12,
    124: 12,
    125: 12,
    126: 12,
    127: 12,
    128: 12,
    129: 12,
    
    130: 10,
    131: 12,
    132: 12,
    133: 12,
    134: 12,
    135: 12,
    136: 12,
    137: 12,
    138: 12,
    139: 12,
    
    140: 10,
    141: 12,
    142: 12,
    143: 12,
    144: 12,
    145: 12,
    146: 12,
    147: 12,
    148: 12,
    149: 12,
    
    150: 10,
    151: 12,
    152: 12,
    153: 12,
    154: 12,
    155: 12,
    156: 12,
    157: 12,
    158: 12,
    159: 12,

    160: 10,
    161: 12,
    162: 12,
    163: 12,
    164: 12,
    165: 12,
    166: 12,
    167: 12,
    168: 12,
    169: 12,
    
    170: 10,
    171: 12,
    172: 12,
    173: 12,
    174: 12,
    175: 12,
    176: 12,
    177: 12,
    178: 12,
    179: 12,
    
    180: 10,
    181: 12,
    182: 12,
    183: 12,
    184: 12,
    185: 12,
    186: 12,
    187: 12,
    188: 12,
    189: 12,

    190: 10,
    191: 12,
    192: 12,
    193: 12,
    194: 12,
    195: 12,
    196: 12,
    197: 12,
    198: 12,
    199: 12,
    
    
    200: 12
    

}


// a default lever for safety, hopefully we won't need it
var default_level_for_beehack = {'etym_level': 10};





var SpellingModeGame = function(){
    this.data = null;
    this.quiz = null;
    // todo
    // @beehack the following is found in all modes
    // it seems to be something like just the default for every attach
    // but it seems to reset to 0 every time mode starts
    // this.level = 0;
    
    
    
    
    
    
    // initiating functions
    // PSEUDOCODE: 
    // this.initial_bee_level = this.quiz.get_spelling_bee_level();
    // initial_bee_level = this.quiz.get_spelling_bee_level();
    // this.session_bee_level = this.initial_bee_level
    // // the global for easy testing, change to this.etc. when done testing
    // session_bee_level = initial_bee_level;
    
    // old version 
    // hopefully we can just set level in next question
    // so for a short term solution we just bypass it
    // longer term we should make a more bulletproof bypass
    // if (!global_beehack_new_level_set) {
    //     this.level = 0;
    // } else {
    //     this.level = global_beehack_level;
    // }
};

// attach is triggered whenever bee button is clicked
SpellingModeGame.prototype.attach = function () {
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    // etym_cheat_sheet is replaced with the incremental hint button
    // so we don't want access to the button
    set_display("etym_cheat_button", 'none');
    //input box will be used
    set_display("input_box", 'initial');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    // @cleanup
    // set_display("spelling_hint_button", 'none');
    set_display("spelling_hint_button_master", "initial");
    set_display("dash_hint_button", 'none');
    set_display("next_level_button", 'none');
    
    if (this.quiz.module.id === 0.5) {
        set_display_of_class("bee_button", 'initial');
    } else {
        set_display_of_class("bee_button", 'none');
    }
    
    
    console.log("BEEHACK789 attach triggered");
    if (this.quiz.module.id === 0.5) {
        this.initialize_bee_level();
    }
    
    
    //current best result for clearing morphology
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("morphology_to_clear", "none");
    set_display_of_class("cleared_in_picture_display", "initial");
    set_display_of_class("cleared_in_picture_display2", "initial");
    //end current best result
    
    
    
    // todo migrate all this business below to something like setup unique game mode data

    
    // todo hack short term solution to accuracy metrics not having enough columns
    // todo a more modular way of resetting incorrect streak would be better here
    // but this is a short-term solution
    // we want to change the max incorrect streak for spelling mode
    // without radically affecting the architecture of the game, 
    // which currently checks for a single max incorrect streak for the whole module, 
    // not for any particular game mode
    
    //so we set a hidden streak which we will compare to the mode-specific max_streak
    // given by module
    this.secret_streak = 0;
    
    
    //we first check whether a  mode-specific max-streak exists
    // if so we set it as our secret triggering point
    if (this.quiz.module.submodule.spelling_mode_max_incorrect_streak) {
        
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.spelling_mode_max_incorrect_streak;
        back.log("temporary max incorrect streak = ", this.temporary_max_incorrect_streak);
        // debug2("test of new console log wrapper");
        // debug2("test of new console log wrapper", this.temporary_max_incorrect_streak);
        
    } else {
        this.temporary_max_incorrect_streak = this.quiz.module.submodule.max_incorrect_streak;
        back.log("PROBLEM: no spelling_mode_max_incorrect_streak specified. spellingmode.attach");
    }
    // the usual max_streak needs to be stored
    this.dummy_limit_to_streak = this.quiz.module.submodule.max_incorrect_streak;
    
    
    
    this.quiz.process_spelling_bee_level_buttons();
};


// @common to all quiz modes
// here it takes the form of e.g. {'etym_level': 50}
SpellingModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
    console.log("BEEHACK999 set_level initiated, this.level = ", this.level);
    back.log("setting level, this.level = ", this.level);
}




// sometimes we want to set level not by usual means (i.e. from module)
// but rather we want to set it by an increment or by training mode
SpellingModeGame.prototype.set_level_by_counter = function (counter) {
    console.log("BEEHACK999 set_level_by_counter, counter = ", counter);
    var output = counter_to_etym_level_map[counter];
    this.set_level(output);
}



// below can be used for initializing or incrementing
// when initializing counter argument will be 0 or absent
SpellingModeGame.prototype.set_beehack_level123 = function (counter) {
    var increment;
    
    
    
    
    ///// adding some flexibility in case we want to change the increment
    if (!counter) {
        increment = 0;
    } else if (counter === "+1") {
        increment = 1;
    } else {
        console.log("PROBLEM: counter should be +1 or null");
        increment = 0;
    }
    
    
    
    // some error-catching
    if (!session_bee_counter) {
        console.log("beehack123 PROBLEM: no session_bee_level");
    }
    if (!spelling_bee_training_counter) {
        console.log("beehack123 PROBLEM: no spelling_bee_training_level");
    }
    
    
    ///////WHETHER WE INCREMENT OR NOT/////
    // if player is on a level equal to or above his real level
    // we increase his session level
    // because session_level is that which persists
    
    // todo @beehack, make into a function
    var temporary_boolean = in_spelling_bee_training_mode && session_bee_counter > spelling_bee_training_counter;
    
    if (!temporary_boolean) {
        console.log("BEEHACK770 boolean is false, incrementing session_bee_counter")
        session_bee_counter = session_bee_counter + increment;
    }
    // we always increment training level to make it progressively harder
    spelling_bee_training_counter = spelling_bee_training_counter + increment;
    
    
    
    
    //////WHAT WE SET LEVEL TO//////
    // the default case, no bee level clicked in quiz
    // so we set to session_bee_level
    if (!in_spelling_bee_training_mode) {
        this.set_level_by_counter(session_bee_counter);
    } 
    // when a bee level is clicked in quiz
    // we set it to that level
    else {
        this.set_level_by_counter(spelling_bee_training_counter);
    }
}


SpellingModeGame.prototype.initialize_bee_level = function () {
    console.log("BEEHACK789 initialize_bee_level entered")
    // below gets from firebase, should be an integer
    
    var counter_to_set;

    var counter_from_firebase = this.quiz.get_initial_spelling_bee_counter();
    
    // console.log('counter from firebase =', counter_from_firebase);
    // console.log("BEEHACK666 about to compare session to firebase");
    // console.log("BEEHACK666 session_bee_counter = ", session_bee_counter);
    // console.log("BEEHACK666 counter_from_firebase = ", counter_from_firebase);
    // console.log("BEEHACK666 equality comparison = ", session_bee_counter > counter_from_firebase);
    
    
    
    
    
    if (session_bee_counter > counter_from_firebase) {
        counter_to_set = session_bee_counter;
        // console.log("BEEHACK666 greater than,  level initialized at = ", session_bee_counter);
        
    } else {
        session_bee_counter = counter_from_firebase;
        counter_to_set = counter_from_firebase;
        // console.log("BEEHACK666 less than, level initialized at = ", counter_from_firebase);
        
    }
    
    
    
    
    
    
    if (in_spelling_bee_training_mode) {
        // console.log("BEEHACK 666 training mode, level initialized at: ", spelling_bee_training_counter);
        counter_to_set = spelling_bee_training_counter;
    }
    
    
    // console.log("BEEHACK666 counter_from_firebase = ", counter_from_firebase);
    // console.log("BEEHACK666 session_bee_counter = ", session_bee_counter);
    // console.log("BEEHACK666 spelling_bee_training_counter = ", spelling_bee_training_counter);
    // console.log("BEEHACK666 setting counter as  = ", counter_to_set);
    
    
    this.set_level_by_counter(counter_to_set);
}


// @! hopefully obsolete soon, get rid of
// @beehack 
// short term version to connect counter to level
SpellingModeGame.prototype.set_default_beehack_level = function (counter) {
    var output = counter_to_etym_level_map[counter];
    
    if (output) {
        this.level = output;
    } else {
        this.level = {'etym_level': 50}
    }
}






// @common to all quiz modes
SpellingModeGame.prototype.get_mode_name = function() {
    return "spelling";
}


 

SpellingModeGame.prototype.adjust_threshold = function () {
    
    // console.log("session_bee_counter = ", session_bee_counter);
    
    
    
    // console.log("1234 session_bee_counter = ", session_bee_counter);
    // this.quiz.module.submodule.threshold = counter_to_threshold_map[session_bee_counter];
    // console.log("RESET threshold = ", this.quiz.module.submodule.threshold);
    
    
}

SpellingModeGame.prototype.next_question = function(){
    
    
    
    
    
    // console.log("BEEHACK999 entering next_question with this.level = ", this.level);
    // console.log("BEEHACK123 this.level = ", this.level);
    
    //  console.log("BEEHACK123 global_beehack_counter = ", global_beehack_counter);
    
    // old, for testing
    // var level_to_persist = 123456;
    // var level_to_persist = global_beehack_counter;
    // this.quiz.set_spelling_bee_level(level_to_persist);
    

    
    clear_input_box("input_box");
    
    
    // @beehack
    

    // todo separate spelling level from etymology level
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
        
    
    
    
    // todo
    // @beehack
    // this is the short term solution
    if (this.quiz.module.id === 0.5) {
        // console.log("BEEHACK BEE MODE DETECTED, initiating beecatcher");
        
        
        // an attempt to make threshold higher as score increases
        this.adjust_threshold();
        
        /// @999 this was commented out, see if it's working via counter
        // we set our beehack level with no increment
        // this.set_beehack_level123();
        
        // here's where we call our persist
        // global_beehack_level_persistent = this.quiz.get_spelling_bee_level();
        // console.log("global_beehack_level_persistent = ", global_beehack_level_persistent);
    
        
        if (!global_beehack_new_level_set) {
            // console.log("BEEHACK beehack bool is false, setting to default");
            // old version that didn't connect counter to level
            // this.set_level(default_level_for_beehack);
            // end old version
            
            // new version
            // this.set_default_beehack_level(global_beehack_counter);
            
            // console.log("BEEHACK level should be default", this.level);
        } else {
            // we skip the usual set level operation
            // console.log("BEEHACK beehack bool is true, skipping set level");
            // console.log("BEEHACK level should be user-input", this.level);
        }
        
    } else {
        this.set_level(post_sampling_level);
    }
    
    
    
    // @beehack
    console.log("BEEHACK FINAL LEVEL = ", this.level);
    console.log("BEEHACK FINAL BOOL = ", global_beehack_new_level_set);
    
    // // @beehack
    // if (this.quiz.module.id === 0.5) {
    //     //skip update display
    // } else {
    //     this.quiz.update_display(); 
    // }
    
    this.quiz.update_display(); 
    
    
    // todo below is the typical way of getting legal question types
    // the problem is: it accesses etym_levels
    // when what we really want a separate spelling level
    // so for now we'll comment this out
    // this.legal_question_types = map_level_to_allowed(
    //     this.level.etym_level, etym_levels).question_types;
    // and instead hard code the question types, as below
    
    
    // we have a few options for hard-coding
    // this.legal_question_types = {'word_definition_to_word': 0.00000005,
    //     'root_definition_to_root': 0.5};
    // // this.legal_question_types = {'word_definition_to_word': 0.5,
    //     'root_definition_to_root': 0.5};
    this.legal_question_types = {'word_definition_to_word': 0.5, 'root_definition_to_root': 0.5};
    // this.legal_question_types = {'word_definition_to_word': 0.5};
    
    this.chosen_question_type = weighted(this.legal_question_types);
    
    
    
    back.log("this.chosen_question_type = ", this.chosen_question_type);
    
    
    var spelling_intro_question;
    if (this.chosen_question_type == 'root_definition_to_root') {
        spelling_intro_question = "Spell the ROOT that means: "
    } else if (this.chosen_question_type == 'word_definition_to_word') {
        spelling_intro_question = "Spell the WORD that means: "
    } else {
        spelling_intro_question = "Type the closest match to: "
        bug.log("PROBLEM: invalid question type in spelling mode");
    }
    
    
    // @999
    if (this.level) {
        console.log("DEBUGGING 999 this.level = ", this.level);
    } else {
        console.log("DEBUGGING 999 this.level doesn't exist");
    }
    
    
    
    //the parameters for the following function is:
    // etym_level, question_type, number_of_answer_choices, number_of_dummies, number_of_mandatory)
    // so the numbers are number_of_answer_choices, number_of_dummies, number_of_mandatory
    //1,0,1 gives good results
    //2,0,1 gives a dummy
    // 2,0,1 mysteriously gives good results, usually 3 answers with one dummy and two relevant ones
    
    // for root-definition-to-root we must have the number of answer choice set to 0
    
    if (this.chosen_question_type == 'root_definition_to_root') {
        var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 0, this.quiz.module.spell_root_cheat_sheet_dummies, 3);
        // console.log(question_with_cheat_sheet['question_data']);
        var question = question_with_cheat_sheet['question_data'];
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    } else {
        var question_with_cheat_sheet = make_etymology_question_with_cheat_sheet(
        this.level.etym_level, this.chosen_question_type, 2, this.quiz.module.spell_word_cheat_sheet_dummies, 1);
        // console.log(question_with_cheat_sheet['question_data']);
        var question = question_with_cheat_sheet['question_data'];
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    }
    
    
    
    
    this.correct = question.correct_answer;
    this.clue = question.clue;
    back.log("this.clue = ", this.clue);
    back.log("this.correct = ", this.correct);
    
    
    
    
    if (this.chosen_question_type == 'root_definition_to_root') {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    } else {
        this.etymology_cheat_sheet = alphabetize_dict(
            question_with_cheat_sheet['cheat_sheet']);
    };
    
    
    this.spelling_hint = "HINT: " + this.give_underscore_hint(this.correct);
    back.log("this.spelling_hint = ", this.spelling_hint);
    
    
    Quiz.set_question_text(spelling_intro_question + '"' + question.clue + '".');
    
   
    
    
    //todo
    //etymology mode and spelling mode is the only mode without a word selector
    //that leads to a problem: the previous word selector remains on the page
    //the following is a hacky solution that can probably be improved on
    var empty_word_selector = "";
    this.quiz.set_word_selector(empty_word_selector);
    
};




SpellingModeGame.prototype.process_answer = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    back.log("raw input string = ", raw_input_string);
    
    
    // todo clean_input_string creates objects (aka dictionaries)
    // which is a little more complicated than we really need
    // also some of the objects are called strings in their variable name so they should be changed
    // we want just a basic lower case string
    // like this
    // var user_input_string = raw_input_string.toLowerCase();
    var processed_input_string = raw_input_string.toLowerCase();
    
    
    
    back.log("processed input string = ", processed_input_string);
    
    
    
    
    
    
    
    // here we don't want to remove slashes
    // so instead we just convert to lower case
    var correct_english_string = this.correct;
    correct_english_string = correct_english_string.toLowerCase();
    back.log("correct_english_string = ", correct_english_string);
    
    
    // todo below seems a little ad hoc
    // submit...with_slash processes strings of the form (x/y) and matches to either x or y
    // regular submit without slash processes regular input
    // better would be to just have the processing take a consistent input 
    // and process the slash downstream
    var comparison_result;
    if (this.chosen_question_type == 'root_definition_to_root') {
        this.comparison_result = this.submit_to_green_red_master_with_slash(this.correct, raw_input_string, true);
        back.log("red-green comparison_result = ", comparison_result);
    } else {
        this.comparison_result = this.submit_string_to_green_and_red(this.correct, raw_input_string);
        back.log("red-green comparison_result = ", comparison_result);
    }
    
    this.display_red_green_result(this.comparison_result);
    
    
    if (correct_english_string.indexOf("/") !== -1) {
        // we convert a slashed-string to a list
        var boolean_result = string_matches_slashed_string(processed_input_string, correct_english_string);
        if (boolean_result) {
            this.process_correct_answer();
        } else {
            this.process_incorrect_answer();
        }
    } else {
        if (processed_input_string === correct_english_string) {
            this.process_correct_answer();
        } else {
            this.process_incorrect_answer();
        }
    }
};





SpellingModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
SpellingModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
SpellingModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];







SpellingModeGame.prototype.process_correct_answer = function() {
    
    this.quiz.increment_score();
    
    var spelling_feedback = this.clue + " = " + this.correct;
    
    
    
    spelling_feedback = replace_all_substrings(spelling_feedback, "<span class=\"embedded_root\">", "");
    spelling_feedback = replace_all_substrings(spelling_feedback, "</span>", "");
    
    
    
    var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_right) + " " + spelling_feedback;
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    clear_input_box("input_box");
    
    this.quiz.question_complete();
};



SpellingModeGame.prototype.process_incorrect_answer = function() {
    back.log("entering process_incorrect_answer");
    this.quiz.submodule.incorrect_streak ++;
    
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        // // todo should anything go here?
        // console.log("if not triggered");
    }
    
    
    ///////BEGIN HACKY INTERVENTION
    back.log("HACK entering hacky intervention for secret incorrect streak");
    // console.log("HACK before change this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    // console.log("HACK 8 before change this.quiz.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    // console.log("HACK before change this.dummy_limit_to_streak = ", this.dummy_limit_to_streak);
    // console.log("HACK before change this.temporary_max_incorrect_streak = ", this.temporary_max_incorrect_streak);
    
    if (this.secret_streak >= this.temporary_max_incorrect_streak) {
        //we have hit our temporary max so we trigger give away answer
        this.quiz.submodule.incorrect_streak = this.dummy_limit_to_streak;
    } else {
        // we haven't hit our temporary max so we want to continue allowing answers
        // so we increment secret_streak 
        this.secret_streak++;
        // and if we trigger our dummy limit
        // we decrement our incorrect streak to 1 beneath the limit
        if (this.quiz.submodule.incorrect_streak >= this.dummy_limit_to_streak) {
            this.quiz.submodule.incorrect_streak = this.dummy_limit_to_streak - 1;
            // console.log("HACK above usual max but under secret max, so resetting to usual max - 1");
            // console.log("HACK this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
        }
    }
        
    // console.log("HACK this.quiz.submodule.max_incorrect_streak = ", this.quiz.module.submodule.max_incorrect_streak);
    // console.log("HACK after change this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    // console.log("HACK leaving hacky intervention");
    ///end the hacky section, the rest is as usual in other modes
    
    
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        var cell_2;
        cell_2 = "";
        var cell_1 = random_choice(SpellingModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(SpellingModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.give_away_answer();
    }
    
    // @beehack
    // if (this.quiz.module.id === 0.5) {
    //     //skip update display
    // } else {
    //     this.quiz.update_display(); 
    // }
    //old version
    this.quiz.update_display();
};






SpellingModeGame.prototype.make_spelling_hint = function () {
    if (this.chosen_question_type === 'root_definition_to_root') {
        this.spelling_hint = "STARTS WITH THE LETTER: " + this.correct.charAt(0);
    } else {
        var underscore_hint = "HINT: " + this.give_underscore_hint(this.correct);
        this.spelling_hint = underscore_hint; 
    }
    // @GRIMES
    return this.spelling_hint;
};




// todo convert the following into a global function in etymology mode
// probably going to be of general usage later, not just in spelling mode
// below is a hackily hacked together version which basically does the job
// but it needs to be redesigned to be:
// modular
// iterate through all the roots until it finds one

SpellingModeGame.prototype.give_underscore_hint = function (word) {
    if (this.chosen_question_type == "root_definition_to_root") {
        return "starts with the letter: " + this.correct.charAt(0);
    } else {
        
        
        // todo tolowercase should be way upstream somewhere
        word = word.toLowerCase();
        
        // we extract all possible roots
        // e.g. quadruped ---> ['QUAD/QUADR', 'PED/POD']
        var roots_extracted = get_roots(word);
        
        // we need to remove metadata such as "root 2"
        // e.g. ['POS/POT root 2'] ---> ['POS/POT']
        roots_extracted = remove_metadata_from_roots(roots_extracted);
        
        // pick a random root from that list
        var random_root_to_replace = random_choice(roots_extracted);
        
        
        // todo here's where we should put the error catching
        var is_there_a_match = false;
        is_there_a_match = test_match_from_slash_options(random_root_to_replace, word);
        if (!is_there_a_match) {
            bug.log("PROBLEM [spellingmode.give_underscore_hint] NO MATCH DISCOVERED where there should be a match, i.e. word should have root");
        } else {
            // console.log("spelling hint match detected");
        }
        
        
        // we find the substring that matches
        // ped, quadruped ---> ped
        random_root_to_replace = return_match_from_slash_options(random_root_to_replace, word);
        
        //we need to convert to lower case
        random_root_to_replace = random_root_to_replace.toLowerCase();
        
        
        // we need an underscore line to match the length of the word
        var length_of_root_to_replace = random_root_to_replace.length;
        
        var underscore_string = new Array(length_of_root_to_replace + 1).join("_");
        
        
        
        // we replace our matched substring with an underscore line
        var word_with_root_replaced = word.replace(random_root_to_replace, underscore_string);
        
        return word_with_root_replaced;
    }
};


// todo development of below got interrupted
// develop it later
SpellingModeGame.prototype.inflict_spelling_hint_penalty = function () {
    if (this.chosen_question_type === "word_definition_to_word") {
        
    } else {
        
    }
}



// todo below should be set up as a global function
// i.e. some kind of mode-agnostic string processing function
// todo slash processing seemed a little buggy, debug and get rid of these logs
    // bug behavior: if you enter bi/bin as your answer you get a bad result

SpellingModeGame.prototype.submit_to_green_red_master_with_slash = function(correct_answer_string, input_string, process_slashes_bool) {
    // new version, on the assumption that we always process slashes
    back.log("entering process slash block")
    // console.log("correct_answer_string pre-mutation = ", correct_answer_string);
    correct_answer_string = correct_answer_string.toLowerCase();
    // console.log("correct_answer_string in lower case = ", correct_answer_string);
    var red_green_result_list = [];
    // console.log("red_green_result_list pre-addition = ", red_green_result_list);
    var list_of_slash_options_to_process = correct_answer_string.split("/");
    back.log("list_of_slash_options_to_process = ", list_of_slash_options_to_process);
    for (var i = 0; i < list_of_slash_options_to_process.length; i++) {
        debug.log("list_of_slash_options_to_process[i] = ", list_of_slash_options_to_process[i]);
        var type_test = typeof list_of_slash_options_to_process[i];
        debug.log("typeOf.list_of_slash_options_to_process[i] = ", type_test);
        var result = this.submit_string_to_green_and_red(list_of_slash_options_to_process[i], input_string);
        debug.log("result pre-slash addition = ", result);
        debug.log("stringified result pre-slash addition = ", JSON.stringify(result));
        red_green_result_list.push(result);
        red_green_result_list.push(["/"]);
        debug.log("red_green_result_list post-addition = ", red_green_result_list);
    }
    //we drop the last slash
    red_green_result_list.pop();
    // we need to flatten the list
    debug.log("red_green_result_list at end of loop = ", red_green_result_list);
    var flattened_red_green_result_list = [].concat.apply([], red_green_result_list);
    debug.log("flattened_red_green_result_list = ", flattened_red_green_result_list);
    // return red_green_result_list;
    return flattened_red_green_result_list;
}


// todo below should be set up as a global function
// some kind of mode-agnostic string processing function
SpellingModeGame.prototype.submit_string_to_green_and_red = function (correct_answer_string, input_string) {
    
    var levenshtein_result = levenshtein(correct_answer_string, input_string)
    var red_green_result;
    if ('feedback' in levenshtein_result) {
        red_green_result = levenshtein_result.feedback;
    } else {
        red_green_result = levenshtein_result.error.split('').map(function (x) {
            return [x, 'yellow'];
        });
    }
    back.log("red_green_result of submit string = ", red_green_result);
    return red_green_result;
};




SpellingModeGame.prototype.display_red_green_result = function (list) {
    
    
    
    
    var parent_el = document.createElement('div');
    var e;
    
    
    
    
    for (var i = 0; i < list.length; i++) {
        e = document.createElement('font');
        e.style.color = list[i][1];
        e.innerHTML = list[i][0];
        parent_el.appendChild(e);
    }
    var fbox = el("image_display_box");
    fbox.appendChild(parent_el);
    
    return parent_el;
    
    // todo very important below was an attempt to replace the red/green feedback
    // so it wouldn't clog up the screen
    // but it seemed to be producing a bug
    // 
    
    
    // console.log("HAIL MARY ENTERING");

    // // todo convert below into a parameter set module by module
    // var max_number_of_red_green_display = 4

    // if (fbox.childNodes[max_number_of_red_green_display]) {
    //     // @currentchanges
    //     console.log("HAIL MARY TRIGGERED");
    //     console.log("fbox.childNodes[0] = ", fbox.childNodes[0]);
    //     fbox.removeChild(fbox.childNodes[0]); 
    // }
    
    
    // return parent_el;
    
}




SpellingModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    // todo
    this.clue = replace_all_substrings(this.clue, "<span class=\"embedded_root\">", "");
    this.clue = replace_all_substrings(this.clue, "</span>", "");
    
    this.correct = replace_all_substrings(this.correct, "<span class=\"embedded_root\">", "");
    this.correct = replace_all_substrings(this.correct, "</span>", "");
    
    
    
    fbox.innerHTML = "The correct answer is \"" + this.clue + " = " + this.correct + '"';
    
    this.quiz.question_complete();
};



