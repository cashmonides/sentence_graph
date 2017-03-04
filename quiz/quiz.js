var global_spelling_match_score_counter = 0;
var global_hint_counter = 0;
var global_hint_alert_counter = 0;


var quiz = null;

// window.onbeforeunload = function () {
//     alert("window close triggered");
//     user_data.logout()
// };

var start = function () {
    // bootstrap sidebar
    // $("#menu-toggle").click(function(e) {
    //     e.preventDefault();
    //     $("#wrapper").toggleClass("toggled");
    // });
    quiz = new Quiz();
    quiz.start();
}


window.onload = start;



var process_slashes_bool = true;

var Quiz = function () {
    
    this.user = null;
    
    this.game = null;
    this.word_selector = null;
    
    this.sentences = null; // TODO - pull into own object

    // a reference to the ALL_MODULES info, not the user history!
    this.module = null;
    //todo implement this as a bottleneck in profile
    this.advance_improve_status = null;
    
    this.submodule = {
        score: 0,                   // min(correct*reward - incorrect*penalty, 0) progress towards completing the submodule (e.g. 75% done with the progress bar)
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    
    this.time_data_id = null;
    
    
    //todo research internet explorer compatibility with set
    //is it a bad idea to have set since we can't iterate over it
    //old code:
    //this.sick_modes = new Set();
    this.sick_modes = [];
    
    // This will show images from future levels.
    this.urge_users_to_continue = true;
    
    // This counts the number of urgent errors encountered so far.
    this.urgent_error_count = 0;
};


Quiz.prototype.initialize_accuracy_dictionary = function () {
    this.accuracy_dictionary = {};
    var mode;
    for (var i = 0; i < game_mode_list.length; i++) {
        mode = game_mode_list[i];
        this.accuracy_dictionary[mode] = {};
        for (var j = 0; j < 4; j++) {
            this.accuracy_dictionary[mode][j] = 0;
        }
    }
}


//loads user data
//loads sentences with callback next_module
Quiz.prototype.start = function() {
    var self = this;
    this.user = new User();
    
    el('logout_button').onclick = function (x) {
        self.user.logout();
        return_to_login();
        // setTimeout(return_to_login, 10000);
    }
    
    // This stuff seems to depend on the user being loaded.
    var callback = function () {
        // This is new, and seems a little hacky.
        self.user.quiz = self;
        // the next line actually loads the data
        // todo should it go before or after the anonymous stuff?
        self.user_loaded();
        
        Sentence.get_all_sentences(function (ss) {
            self.sentences = ss.filter(function (sentence) {
                var language = sentence.language_of_sentence;
                // console.log("DEBUG 10-9-16 self.module = ", self.module);
                var sentence_levels = self.module.sentence_levels;
                return language in sentence_levels &&
                sentence.difficulty_level <= sentence_levels[language];
            });
            
            if (self.requires_callback_before_starting) {
                self.callback_before_starting(function () {
                    self.next_module();
                });
            } else {
                self.next_module();
            }
        });
    }
    
    
    
    
    //the following line tests the conditional
    if (!this.user.load(callback)) {
        el("header").appendChild(document.createTextNode("In Anonymous Session!"));
        el("return_to_profile_button").parentNode.removeChild(el("return_to_profile_button"));
        el("logout_button").innerHTML = "login";
        this.user_loaded();
    }
    // TODO dan moved this into callback so that next question is
    // clearly guaranteed to happen after user loaded (it has to be afterwards
    // since next question requires level from user loaded, at the very least)
    /*
    Sentence.get_all_sentences(function (ss) {
        self.sentences = ss.filter(function (sentence) {
            var language = sentence.language_of_sentence;
            // console.log("DEBUG 10-9-16 self.module = ", self.module);
            var sentence_levels = self.module.sentence_levels;
            return language in sentence_levels &&
            sentence.difficulty_level <= sentence_levels[language];
        });
        
        self.next_module();
    });
    */
};

// This should quite possibly be done second.
Quiz.prototype.user_loaded = function () {
    // console.log("DEBUG 11-7 entering user_loaded = ");
    //todo var id will change depending on url parameters (given by profile page)
    var id = this.get_start_module();   //gets lowest uncompleted level (ADVANCE) or improving via url paramaters
    // console.log("DEBUG 11-20 user_loaded id = ", id);
    
    this.id = id;
    
    if (this.user.is_mf()) {
        // this.module = MF_MODULES[id.chapter];
        this.module = MF_MODULES[1];
        // and do this while we're at it
        remove_element_by_id('progress-bar-wrapper');
    } else {
        this.module = ALL_MODULES[id];
    }
    
    console.log("LOG: in user_loaded: this.module = ", this.module);
    
    
    
    
    this.user.start_module(id);
    
    // console.log("current module:", this.module);
};








//decides whether we go to current or some other module determined at profile page
Quiz.prototype.get_start_module = function () {
    // console.log("DEBUG 11-22 get_start_module entered");
    //todo
    //if (improving)
    var ups = get_url_parameters();
    
    if ("mod" in ups){
        var selected_mod = ups["mod"];
        
        // Logically, exactly one of these things must happen,
        // (unless the user is an mf user, which overrides everything else),
        // so we could remove the final if in the second else if.
        // But this seems cleaner.
        if (this.user.is_mf()) {
            // todo add to this later.
            this.advance_improve_status = "mf";
        } else {
            //parseInt converts an int to string with the radix of ten here
            if (!this.is_allowed_module(parseInt(selected_mod, 10))) {
                return_to_profile();
                // todo dan check below, Akiva added this
                // the idea was to fix that when malicious children tweaked mod
                // in the url parameters, it was triggering that module, 
                // even if it was way beyond them
                return;
                // end akiva's additions
            } else if (selected_mod == this.user.get_current_module()) {
                this.advance_improve_status = "advancing";
            } else if (selected_mod == this.user.get_improving_module()) {
                this.advance_improve_status = "improving";
            }
        }
        return selected_mod;
        /*
        if (selected_mod > this.user.get_current_module()) {
            console.log("DEBUG 1-27 excessive mod entered as url query");
            return_to_profile();
            return;
            // alert("Go back to profile and start again");
        }
        if (selected_mod == this.user.get_current_module()) {
            console.log("DEBUG 11-23 clicked mod = current mod");
            this.advance_improve_status = "advancing";
        } else {
            console.log("DEBUG 11-23 clicked mod != current mod");
            this.advance_improve_status = "improving";
        }
        console.log("DEBUG 11-22 advance/improve status = ", this.advance_improve_status);
        */
    } else if ('path' in ups) {
        this.advance_improve_status = "mf";
        return ups;
    } else if ('bee' in ups) {
        console.log("ups triggered and bee entered");
        back.log("ups triggered and bee entered");
        return this.user.get_spelling_training_module();
        // return this.user.get_current_module();
    } else if ('bee_match' in ups) {
        var self = this;
        this.pin = ups.pin;
        // below might create collisions if two people have the same name
        // and their data is sent to firebase
        // var user_name = this.user.data.profile.name;
        var user_name = this.user.data.profile.name + "=" + this.user.uid
        this.requires_callback_before_starting = true;
        this.callback_before_starting = function (function_after_callback) {
            Persist.get(['test', self.pin], function (x) {
                var val = x.val();
                // case of invalid pin
                if (val === null) {
                    alert("Your pin " + self.pin + " doesn't match any current games. Try again.")
                    return_to_profile();
                } else {
                    self.spelling_match_level = val.level;
                    self.spelling_match_stopping_time = val.stopping_time;
                    self.total_match_time = val.stopping_time - Date.now();
                    console.log("123456 self.total_match_time = ", self.total_match_time);
                    // original version
                    // start_drone_timer(self.spelling_match_stopping_time);
                    
                    
                    // @666
                    //new version: to avoid a global function
                    self.start_drone_timer(self.spelling_match_stopping_time, self.pin, user_name);
                    
                    
                    // AS: below seems to usually be self.next_module when in spelling match mode
                    function_after_callback();
                }
            });
        }
        return this.user.get_spelling_match_module();
    } else {
        this.advance_improve_status = "advancing";
        return this.user.get_current_module();
    }
    
    
    
    //todo old code below
    // if("mod" in ups){
    //     //todo additions below
    //     if (this.user.is_valid(selected_mod)) {
            
    //         // console.log("returned Boolean: ", this.user.is_valid(selected_mod));
    //         return ups["mod"];
    //     } else {
    //         alert("INVALID MODULE SELECTED");
    //         document.location = document.location = "../profile/";
    //         // return this.user.get_current_module();
    //     }
    // } else {
    //     return this.user.get_current_module();
    // }
    
};

// @666
Quiz.prototype.start_drone_timer = function (stopping_time, pin, user_name) {
    var self = this;
    var callback = function () {
        self.end_drone_game2(pin, user_name);
    }
    return this.start_timer3('countdown', 50, callback, stopping_time);
}


// @666
Quiz.prototype.start_timer3 = function (
    html_element_name, refresh_how_often, end_callback, end_time) {
    // error-checking
    if (el(html_element_name) === null) {
        throw 'Element ' + html_element_name + ' does not exist!';
    }
    // refresh_countdown_to_end_time is a function that, when called,
    // creates a function that will refreshes the countdown 
    // to the amount of time remaining
    // e.g. (if refresh_how_often is 50),
    // clock displays 1000 milliseconds remaining
    // refresh_countdown_to_end_time happens and 
    // clock display is reset to 950
    var refresh_countdown_to_end_time = refresh_clock(
        html_element_name, end_time);
       
       
    
    
    
    // clock_refresh_id is an integer id (not a function),
    // which we can pass to clearInterval to stop the function
    // from continuing to run. We want to do this at the end of the game.
    var clock_refresh_id = setInterval(
        refresh_countdown_to_end_time, refresh_how_often);
    
    
    // the heart of the function    
    setTimeout(function () {
        // Stop the timer.
        // This line cancels the function that runs regularly
        // with id clock_refresh_id.
        // That function is the clock refreshing.
        // We do this since we don't want the clock to continue
        // to refresh after the end of the game.
        clearInterval(clock_refresh_id);
        
        
        

        
        // Clear the timer (the div with the clock).
        el(html_element_name).innerHTML = '';
        // End the game.
        end_callback();
    }, end_time - Date.now());
}


// @666
Quiz.prototype.end_drone_game2 = function (pin, user_name) {
    // persist word scores
    var self = this;
    this.set_word_scores(function () {
        self.end_drone_game_meat(pin, user_name);
    });
}

Quiz.prototype.end_drone_game_meat = function (pin, user_name) {
    // console.log("666 pin as argument = ", pin);
    // console.log("666 user_name as argument = ", user_name);
 
    // firebase can't receive strings with "."
    user_name = user_name.split(".").join("-");
    console.log("PROCESSED user_name 1 = ", user_name);
    
    
    
 
    var path = ["test", pin, "scores", user_name];
    
    // however we get score (this.match_score or something like that) 
    // something like the spelling bee counter
    
    
    var score = get_spelling_match_score();
    
    
    // we seem to jump out of scope so we lose all access to "this."
    // therefore we can't use the below function
    // var callback = this.display_match_score(score);
    // instead we use this one
    var callback = display_match_score(score);
    
    
    
    console.log("WEEZER666 about to persist drone game with the following data");
    console.log("WEEZER666 persisting drone game, path = ", path);
    console.log("WEEZER666 persisting drone game, score = ", score);
    
    
    Persist.set(path, score, callback);
    
    
    //////// here we want to persist the ranking
    
}

/////////////// a mutation of display_match_score which also recovers the rank of each person
var display_match_score2 = function (score) {
    // do everything we normally do
    display_match_score(score);
    
    // but also persist.get the rank and persist.set to the student's firebase account
    
}



//@666
// a perhaps unavoidable global function
// since this.display_match_score is out of the scope of this
var display_match_score = function (score) {
    el("fraction_header").innerHTML = "final score: " + score.toString();
    
    //clear all test boxes (question, hint, feedback, etc)
    
    
    set_display("submit_button", 'none');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    //input box will be used
    set_display("input_box", 'none');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    // @cleanup
    // set_display("spelling_hint_button", 'none');
    set_display("dash_hint_button", 'none');
    set_display("next_level_button", 'none');
    
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("morphology_to_clear", "none");
    // set_display_of_class("cleared_in_picture_display", "none");
    // set_display_of_class("cleared_in_picture_display2", "none");
    
    
    
    
    
    
    
    var message_string = "Match over. Press ok to submit your score. Final score = " + score.toString();
    // Tell the user that the game is over.
    alert(message_string);
}

var get_spelling_match_score = function () {
    return global_spelling_match_score_counter;
}

///////////END AKIVA'S INTERVENTION

Quiz.prototype.next_module = function () {
    console.log("entering next_module");
    
    
    
    
    if (!this.module) {
        console.log("DEBUGGING 999 this.module.id doesn't exist at this stage ");
    } else {
        console.log("DEBUGGING 999 this.module.id = ", this.module.id);
    }
    
   
    this.next_submodule();
};

Quiz.prototype.next_submodule = function () {
    
    console.log("entering next_submodule");
    
    
    if (!this.module) {
        console.log("DEBUGGING 999 this.module.id doesn't exist at this stage ");
    } else {
        console.log("DEBUGGING 999 this.module.id = ", this.module.id);
    }
    
    
    //initializes a default
    this.submodule = {
        score: 0, 
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    
    if (!this.user.is_mf()) {
        this.next_submodule_not_mf();
    } else {
        this.next_submodule_mf();
    }
    
    
    if (this.module.id === 0.5 || this.module.id === 0.25) {
        // callback of this get operation will be next_question
        this.get_word_scores();
        // so we just return
        return;
    }
    
    this.initialize_accuracy_dictionary();
    
    this.next_question();
};


Quiz.prototype.get_word_scores = function () {
    var self = this;
    this.user.get_word_scores(function (x) {
        // standard firebase-required method call
        var data = x.val();
        // initial case - if the user has never answered a question about a word
        if (data === null) {
            data = {};
        }
        // todo set properties
        // finally go to the next question
        self.next_question();
    });
}



/*
// @beehack
Quiz.prototype.next_submodule_without_post = function() {
    
    
    console.log("DEBUGGING 999 entering next_submodule without post, this.module.id = ", this.module.id);
    
    
    if (!this.module) {
        console.log("DEBUGGING 999 this.module.id doesn't exist at this stage ");
    } else {
        console.log("DEBUGGING 999 this.module.id = ", this.module.id);
    }
    
    
    
    //initializes a default
    this.submodule = {
        score: 0, 
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    
    
    this.next_question();
};
*/


Quiz.prototype.next_submodule_not_mf = function () {
    //progress bars below
    this.began = new Date();
    this.progress_bar = new ProgressBar(this.module.submodule.threshold, [], el('progress-bar'));
    // Progress bar currently disabled (i.e., does not show up).
    this.old_progress_bars = [];
    /*this.old_progress_bars = (this.user.data.history[this.module.id].
        progress_bars[this.user.data.history[this.module.id].progress] || []).map(
        function (x) {
            var o = document.createElement('div');
            o.innerHTML = '<div id="progress-bar" class="progress-bar" role="progressbar" ' +
            'aria-valuemin="0" aria-valuemax="100"></div>';
            var e = o.firstChild;
            el('progress-bar-wrapper').appendChild(e);
            return new ProgressBar(self.module.submodule.threshold, x, e)});*/
    //todo the following was moved by akiva to next_question
    // this.next_mode();
    // todo new begins here
    // console.log("current module:", this.module);
    // This isn't really helpful
    // console.log("current level:", this.module.level);
    //todo below is old, make sure new version works (in next_question)
    // this.game.set_level(this.module.level);
    //todo important - I commented this out, not sure if it breaks anything - it seems to not do anything
    // console.log('this.game.level = ', this.game.level)
    // todo new ends here
    // this.clear_cheat_sheet();

    console.log("LOG: entering log start time");
    
    
    var submodule_id = this.user.get_module(this.module.id).progress;
    
    // console.log("DEBUG 1-22 user_id = ", this.user.uid);
    console.log("LOG: about to log start time for module_id = ", this.module.id);
    console.log("LOG: about to log start time for submodule_id = ", submodule_id);
    
    /*
    
    
    every time a submodule is started:
    
    
    step 1)
    create a row:
    user_id, module_id, submodule_id, start_time, stop_time   (& 0123)
    (with stop_time as null)
    
    step 2)
    save data as a state: quiz.time_data [user_id, module_id, submodule_id, start_time]
    
    
    every question modifies a dictionary
    0:
    1:
    2;
    3:
    
    
    every time a submodule is completed:
    step 1)
    update stop_time in the following row:
    user_id, module_id, submodule_id, quiz.start_time, null
    
    write new accuracy dictionary to post statement
    
    step 2)
    clear quiz.start_time
    
    */
    this.time_data = list_of_repetitions(null, 8);
    this.time_data[0] = this.user.uid;
    this.time_data[6] = this.module.id;
    this.time_data[7] = submodule_id;
    
    // Hopefully not needed.
    // this.time_data = [this.user.uid, this.module.id, submodule_id];

    var user_data = this.user.get_personal_data();
    
    for (var i = 0; i < user_data.length; i++) {    
        this.time_data[i + 1] = user_data[i];
    }
    
    // console.log(this.time_data);
    
    
    this.initialize_time_metrics('insert_time_data');
}

Quiz.prototype.process_spelling_bee_level_buttons = function () {
    
    
    var list_of_buttons_to_cut_off = [];
    
    var egg_cutoff = 9;
    var larva_cutoff = 20;
    var pupa_cutoff = 30;
    var drone_cutoff = 40;
    var worker_cutoff = 41;
    var warrior_cutoff = 42;
    var queen_cutoff = 500;
    
    
    
    
    if (session_bee_counter > egg_cutoff) {
        list_of_buttons_to_cut_off.push("egg")
    }
    if (session_bee_counter > larva_cutoff) {
        list_of_buttons_to_cut_off.push("larva")
    }
    if (session_bee_counter > pupa_cutoff) {
        list_of_buttons_to_cut_off.push("pupa")
    }
    if (session_bee_counter > drone_cutoff) {
        list_of_buttons_to_cut_off.push("drone")
    }
    if (session_bee_counter > worker_cutoff) {
        list_of_buttons_to_cut_off.push("worker")
    }
    if (session_bee_counter > warrior_cutoff) {
        list_of_buttons_to_cut_off.push("warrior")
    }
    
    for (var i=0; i < list_of_buttons_to_cut_off.length; i++) {
        var level_to_hide = list_of_buttons_to_cut_off[i];
        var element = el("set_spelling_bee_level_button_" + level_to_hide);
        element.style.backgroundColor = "gray";
        element.style.fontSize = "7px";
        element.style.color = "lightgray";
    }
    
    
    // var test_boolean = session_bee_counter > cutoff;
    // console.log("BEEHACK1999 test_boolean = ", test_boolean);
    
    
    // var level_to_hide = "drone"
    
    // // @beehack
    // // todo
    // // put this somewhere up top
    // if (test_boolean) {
    //     var element = el("set_spelling_bee_level_button_" + level_to_hide);
    //     element.style.backgroundColor = "red";
    //     element.style.fontSize = "6px";
    //     // element.style.color = "6px";
    // }
}


Quiz.prototype.initialize_time_metrics = function (s) {
    var time_data = this.time_data;
    console.log("LOG: entering post #1");
    console.log("LOG: about to post this.time_data = ", time_data);
    
    // todo very important - comment back in when fixed
    
    // used to be: no callback because we don't need one
    // now we need a callback because we're getting a piece of data coming back to us
    // also: 3/27 deleted null_string: list_of_repetitions("null", 17).join(', ')
    if (this.user.uid !== null) {
        console.log('LOG: this.user.uid !== null; about to post');
        var self = this;
        post({data: time_data, type: s}, function (data) {
            console.log("LOG: posting data = ", data);
            self.time_data_id = data.id;
        });
    } else {
        console.log('LOG: this.user.uid === null; post refused');
    }
    // todo maybe a good idea later to add an urgent error log here
    
    console.log("LOG: exiting post #1");
}

Quiz.prototype.next_submodule_mf = function () {
    console.log("DEBUG 1-22 entering log start time");
    
    console.log("DEBUG 1-22 user_id = ", this.user.uid);
    console.log("DEBUG 1-22 module_id = ", this.module.id);
    
    this.time_data = list_of_repetitions(null, 9);
    
    this.time_data[0] = this.user.uid;
    this.time_data[6] = this.id.path;
    this.time_data[7] = 'no longer applicable';
    this.time_data[8] = this.id.mode;

    var user_data = this.user.get_personal_data();
    
    for (var i = 0; i < user_data.length; i++) {    
        this.time_data[i + 1] = user_data[i];
    }
    
    console.log('about to insert mf', this.time_data);
    this.initialize_time_metrics('insert_mf_metrics');
}

Quiz.prototype.get_modes = function () {
    return Object.keys(ALL_MODULES[this.module.id].mode_ratio);
}

// var global_sickness = 0;

Quiz.prototype.next_mode = function (error) {
    
    // pertains only to MF mode
    // shouldn't be triggered
    // its apparent function was to keep the mode the same
    // except if the mode (MF in this case) triggered high levels of global sickness
    if (!error && this.game && this.module.game_change_method === 'one_game') {
        // global_sickness = 0;
        return;
    }
    
    
    
    
    var allowed;
    if (!(this.user.is_mf())) {
        allowed = ALL_MODULES[this.module.id].mode_ratio;
        
        back.log("allowed modes before checking for non-functioning mode = ", allowed);
        
        /*
        originally:
        for (var i in this.sick_modes) {
            delete allowed[i];
        }
        */
        // global_sickness++;
        //todo akiva changed below because it was triggering during a functioning game
        // previously set to 30
        /* if (global_sickness > 1000) {
            alert('Everything is broken!');
            return;
        } */
        
        // console.log("DEBUG 11-18-16 this.sick_modes = ", this.sick_modes);
        
        debug.log("checkpoint 1");
        
        for (var i = 0; i < this.sick_modes.length; i++) {
            this.display_sick_mode_in_header();
            console.log('sick mode being added = ', this.sick_modes[i])
            delete allowed[this.sick_modes[i]];
            console.log("LOG: sick mode added");
            console.log("LOG: allowed after sick mode added = ", allowed);
        }
        
        
        if (Object.keys(allowed).length <= 0) {
            console.log("BIG ERROR: all modes are sick");
            if (this.urgent_error_count < 5) {
                 log_urgent_error("all modes are sick", "quiz.next_mode");
                 this.urgent_error_count++;
            }
            throw "modes exhausted";
        }
        
        // Issue: previously a new game was created every question.
        // This is not a good idea in all cases.
        // Solution: commit the hack of putting in each module a setting
        // of one_game or switch. Assume no setting is switch.
        // We do this via an early return.
        // error is a parameter which is true if next_mode was called due to an error.
        
        debug.log("checkpoint 2");
        var mode = weighted(allowed);
        back.log("checkpoint mode from weighted(allowed) = ", mode);
        // console.log("DEBUG 5-6 game_mode_map[mode] = ", game_mode_map[mode]);
    }
    var game;
    debug.log("checkpoint 2.1");
        
    if (this.user.is_mf()) {
        var modes_map = {
            'translate': MFModeGame,
            'analysis': SyntaxModeGame
        }
        var current_mode = modes_map[this.id.mode];
        debug.log('checkpoint 2.2current mode =', current_mode);
        game = new current_mode(Path.from_url_params(this.id));
    } else {
        debug.log("checkpoint 2.4 mode = ", mode);
        
        
        
        
        // debug.log("checkpoint 2.5 Quiz.get_mode(game_mode_map[mode]) = ", Quiz.get_mode(game_mode_map[mode]));
        // console.log("BIRDBUG checkpoint 2.5 Quiz.get_mode(game_mode_map[mode]) = ", Quiz.get_mode(game_mode_map[mode]));
        ///// BIRDBUG insanity check
        // the following is what it said for a long time and seems to work
        // game = Quiz.get_mode(game_mode_map[mode]);
        // but there's no function called get_mode, only get_modes
        // game = Quiz.get_modes(game_mode_map[mode]);
        
        //but below is what I'm leaving it at to not court disaster
        game = Quiz.get_mode(game_mode_map[mode]);
        back.log("checkpoint game set at: ", game);
    }
    debug.log("checkpoint 3 game = ", game);
    
    // this.game should be an object e.g.
    // MorphologyModeGame {data: ....etc}
    
    this.game = game;
    debug.log("checkpoint 4 this.game = ", this.game);
    
    //todo understand the following
    
    // This gives the game a reference to the quiz.
    this.game.quiz = this;
    
    // Is there anything the game needs to do now that it has access
    // to the quiz (and indirectly the user)?
    // Note: this property currently only exists in mf mode.
    if (this.game.do_with_quiz_attachment) {
        // If so, do it.
        this.game.do_with_quiz_attachment();
    }
    
    this.game.attach();
};

Quiz.get_mode = function(mode_number) {
    switch(mode_number) {
        case 0 : return new DropModeGame();
        case 1 : return new MCMode3Game();
        case 2 : return new QuickModeGame();
        // Programming Tip: The number "3" is cursed. Avoid it.
        // case 3 : return new GenericDropGame();
        case 4 : return new EtymologyModeGame();
        case 5 : return new InputModeGame();
        case 6 : return new MFModeGame();
        case 7 : return new SyntaxModeGame();
        case 8 : return new KCKModeGame();
        case 9 : return new MorphologyModeGame();
        case 10 : return new SpellingModeGame();
        case 11 : return new SpellingMatchModeGame();
        case 12 : return new DefinitionInputModeGame();
        default : throw "no game mode triggered";
    }
    
};


var new_words_list = ['November', 'abbreviation', 'aberrant', 'absolve', 'abstract', 'action', 'active', 'actor', 'adjudicate', 'admire', 'admit', 'admonish', 'advent', 'affirm', 'affirmative', 'aggravation', 'aggregate', 'aggression', 'aggressor', 'alien', 'alienation', 'align', 'alleviate', 'altitude', 'amateur', 'ambient', 'animosity', 'annihilate', 'annul', 'antebellum', 'antecedent', 'apiculture', 'apparent', 'aquaculture', 'aqueous', 'artifice', 'artificial', 'asinine', 'assimilation', 'associate', 'attraction', 'audacious', 'audacity', 'auditory', 'avert', 'benefit', 'benign', 'biennial', 'bilingual', 'billion', 'binary', 'bioluminescence', 'brevity', 'cadence', 'canine', 'cantata', 'capacious', 'capacity', 'capital', 'centigrade', 'cessation', 'chapter', 'circle', 'circumference', 'circumlocution', 'civic', 'civil', 'civilian', 'civilization', 'cogent', 'cogitate', 'compassion', 'component', 'composite', 'compression', 'compulsory', 'compute', 'conductor', 'confidence', 'confirmation', 'congenital', 'congregate', 'congregation', 'conscientious', 'consecrate', 'consecutive', 'consequence', 'conspicuous', 'construction', 'contain', 'container', 'continent', 'contingent', 'contradiction', 'contradictory', 'convene', 'convenience', 'converge', 'convergent', 'corpulent', 'corpuscle', 'credential', 'credit', 'creditor', 'credo', 'current', 'cursory', 'custodian', 'custody', 'decadent', 'deciduous', 'decimal', 'declaim', 'declamation', 'deduct', 'defame', 'default', 'definite', 'deflection', 'degenerate', 'degeneration', 'deification', 'deify', 'dejected', 'dependent', 'deport', 'derogatory', 'desecrate', 'desecration', 'desolate', 'desolation', 'destroy', 'detract', 'devious', 'diction', 'dictionary', 'dignified', 'dignitary', 'dignity', 'diminutive', 'disable', 'discord', 'discordant', 'discredit', 'dissolution', 'dissonance', 'diverge', 'divergent', 'divert', 'divine', 'divulge', 'docile', 'doctor', 'dormant', 'dormitory', 'double', 'dual', 'duplex', 'edict', 'effective', 'efficacious', 'efficacy', 'egregious', 'elevate', 'elevation', 'eliminate', 'emotion', 'enchant', 'endure', 'equable', 'equality', 'equilateral', 'err', 'errant', 'erratic', 'error', 'evidence', 'evolution', 'exclamation', 'exclude', 'excursion', 'expatriot', 'expedite', 'expire', 'explicit', 'extant', 'extinct', 'extinguish', 'fallacious', 'fallacy', 'fallible', 'false', 'famous', 'fault', 'feline', 'feminine', 'fertile', 'fictional', 'fictitious', 'final', 'firmament', 'flexibility', 'floriculture', 'fluency', 'fluent', 'fluid', 'fortify', 'fortitude', 'fratricide', 'frigid', 'furor', 'fury', 'general', 'generate', 'generic', 'genesis', 'genocide', 'genus', 'grace', 'gracious', 'gradation', 'granary', 'grandeur', 'grandiose', 'gratitude', 'grave', 'gravitate', 'gravity', 'gregarious', 'grievance', 'horticulture', 'hostile', 'hostility', 'humid', 'humidity', 'illiterate', 'immoral', 'impediment', 'impel', 'impervious', 'implicit', 'import', 'impose', 'improvise', 'impulse', 'inalienable', 'inanimate', 'inaudible', 'incantation', 'incessant', 'include', 'inclusive', 'inconsequential', 'incorporate', 'incorporeal', 'incumbent', 'incursion', 'indoctrinate', 'inequality', 'inequity', 'infamy', 'infertile', 'infinite', 'infinitesimal', 'infirmary', 'infirmity', 'influence', 'infraction', 'infuriate', 'ingratiate', 'iniquity', 'initial', 'initiant', 'initiate', 'inject', 'injure', 'injury', 'innovative', 'inquiry', 'inquisition', 'insidious', 'inspect', 'insubordinate', 'intangible', 'interdiction', 'interlinear', 'interlude', 'intervention', 'intramural', 'introduce', 'invent', 'invisible', 'invoke', 'irrevocable', 'iteration', 'itinerary', 'jugular', 'junior', 'jury', 'legible', 'legitimate', 'leonine', 'levitation', 'levity', 'librarian', 'library', 'ligament', 'ligature', 'linear', 'liquefy', 'literary', 'literature', 'locator', 'longitude', 'lucidity', 'luminescence', 'luminous', 'magnanimous', 'magnitude', 'malediction', 'maleficent', 'malice', 'malignant', 'malodorous', 'manicure', 'manipulate', 'manufacture', 'matricide', 'matrimony', 'matron', 'mercurial', 'millenium', 'million', 'millipede', 'minimize', 'minor', 'minority', 'minute', 'miracle', 'miraculous', 'monitor', 'monocle', 'monolingual', 'monument', 'mortification', 'mortuary', 'motor', 'movement', 'multilateral', 'multiplicity', 'multiply', 'multitude', 'mundane', 'mutable', 'mutation', 'nascent', 'nature', 'negation', 'negligible', 'nihilism', 'nihilist', 'nomenclature', 'non-sequitur', 'nullify', 'obsession', 'octave', 'octet', 'oppression', 'optimist', 'oration', 'orator', 'pacific', 'pacify', 'partial', 'particle', 'partition', 'passion', 'passive', 'patient', 'patriarchal', 'patrimony', 'patriot', 'patriotism', 'pendulum', 'perjury', 'perspiration', 'perturb', 'pessimism', 'pessimist', 'populace', 'populate', 'populous', 'possibility', 'possible', 'potent', 'potential', 'poularity', 'predict', 'prenatal',
'prepositions', 'prerequisite', 'prevail', 'prevent', 'prevention', 'primal', 'primary', 'primate', 'prime', 'primer', 'primeval', 'primitive', 'primogeniture', 'proceed', 'proclaim', 'produce', 'production', 'progeny', 'projectile', 'projection', 'pronounce', 'propel', 'propulsion', 'prosecute', 'provide', 'provoke', 'quadrangle', 'quadruple', 'quasi', 'query', 'question', 'radial', 'radius', 'reactive', 'recall', 'rectify', 'rectilinear', 'rectitude', 'recumbent', 'recur', 'recursive', 'reduce', 'reduction', 'reflect', 'reflection', 'reflex', 'refraction', 'refrigerate', 'regimen', 'regiment', 'regulare', 'reject', 'remote', 'remotely', 'remove', 'renaissance', 'renew', 'repatriate', 'report', 'repression', 'repressive', 'reproduce', 'reproduction', 'repulsion', 'repulsive', 'reputable', 'reputation', 'require', 'reside', 'resident', 'resonance', 'respiration', 'respiratory', 'revert', 'review', 'revive', 'revoke', 'revolution', 'revolve', 'sacrament', 'sacred', 'sacrifice', 'sacrilege', 'sacrosanct', 'sanctify', 'sanctimonious', 'sanitarium', 'sanity', 'satiety', 'satisfaction', 'satisfy', 'science', 'scribble', 'scripture', 'secant', 'seclusion', 'sedentary', 'sediment', 'segment', 'segregate', 'senate', 'senile', 'senility', 'senior', 'sensation', 'sensual', 'sensuous', 'sequence', 'sessile', 'session', 'sextet', 'simile', 'simulate', 'social', 'society', 'solitary', 'solitude', 'soluble', 'solution', 'sonata', 'spatial', 'species', 'stance', 'station', 'stature', 'subliminal', 'submerge', 'subordinate', 'succumb', 'support', 'suspend', 'tangent', 'tangential', 'tenacious', 'tenant', 'tendon', 'tense', 'tension', 'terminal', 'ternary', 'terrarium', 'terrestrial', 'terrible', 'terrific', 'terrifying', 'terrorize', 'testament', 'testimony', 'titanic', 'torsion', 'torso', 'tortuous', 'torture', 'tractiom', 'traction', 'transgress', 'transgression', 'transient', 'transit', 'transition', 'transitory', 'transmission', 'transmit', 'transparent', 'trillion', 'tripartite', 'triple', 'triplex', 'trisect', 'trivial', 'turbine', 'turbulence', 'turbulent', 'unanimous', 'undulate', 'unicorn', 'uniform', 'valid', 'valorous', 'value', 'variegated', 'various', 'verbal', 'verbatim', 'verbiage', 'verbose', 'verisimillitude', 'veritable', 'vest', 'vestment', 'veteran', 'victor', 'visual', 'vivacity', 'vivid', 'vocal', 'volatile', 'vulgar']


var words_as_list = ["december","november","heptateuch","mesoamerica","paleolithic","september","abbreviate","abbreviation","abduct","aberrant","aberration","abnormal","absent","abyss","accelerate","accessible","accumulate","achromatic","acrobat","acronym","acrophobia","act","activity","admittance","adverb","advocate","aerate","aerial","aerospace","aesthetic","agrarian","agribusiness","agriculture","alexia","alter ego","ambidextrous","ambiguous","ambivalence","amble","ambulance","ambulant","amiable","amity","amorous","amorphous","amphibian","anachronism","analgesic","analogy","analysis","anatomy","androgynous","android","anhydrous","animal","animate","anniversary","annotate","announce","annual","antecede","antemeridian","anteroom","anthology","anthozoan","anthropology","anthropomorphism","anthropophagy","antibody","antipathy","antiseptic","antisocial","apathy","aphorism","apology","apostrophe","aquamarine","aquarium","aquatic","aqueduct","aquifer","arbor","arborist","arborous","archaeology","archaic","archbishop","archenemy","archive","arteriosclerosis","arthritis","arthropod","arthroscope","artifact","artisan","artist","ascend","ascertain","ashore","aside","assist","asterisk","astronaut","astronomer","ataxia","athlete","attract","audible","audience","audiometer","audiovisual","autocrat","autograph","automatic","autopsy","aversion","aviary","aviation","aviator","aviatrix","bankrupt","baric","baryon","bellicose","belligerent","benefactor","beneficial","benevolent","biannual","bibliography","bibliomania","bibliophile","bicentennial","bicycle","bilateral","binoculars","biography","biology","biosphere","biped","bisect","blastoderm","blastula","cacophony","captivating","cardiac","cardiogenic","cardiologist","carnivorous","cataclysm","catalog","catastrophe","caustic","cauterize","celerity","centennial","centimeter","centrifugal","century","cephalic","cephalopod","cerebral","cerebrate","cerebrospinal","certain","certify","chlorophyll","chromatics","chromium","chronic","chronological","chronometer","chrysanthemum","cinematography","circumnavigate","circumscribe","circumspect","circumvent","clamor","clarification","clarify","coauthor","coeducation","cognition","collaborate","collision","colloquial","command","commemorate","commune","compel","composition","compulsion","computer","conclusion","concur","conduct","confer","confide","confusion","conjunction","conscience","conscious","conserve","consonant","constellation","construct","contact","contemporary","contortion","contradict","contrary","controversy","convention","convince","corporal","corporation","corpse","cosmonaut","cosmos","counteract","countermand","counteroffensive","cranial","craniology","cranium","credence","credulous","crescendo","cryptic","cryptography","cumulative","cycle","cyclone","debug","decade","decagon","decathlon","decelerate","decibel","deciliter","decimate","declare","decrypt","deduction","deflect","defunct","delude","demand","democracy","demographic","dendriform","dendrochronology","denounce","dental","dentist","dentures","deposit","deride","dermatitis","dermatologist","descend","describe","destruction","determine","dethrone","detoxification","devour","diagnosis","diagonal","diagram","dialog","dichromatic","dictate","digression","dilemma","diploma","disappear","disjunction","dislocate","dismiss","dispute","dissect","distort","distract","dominate","domineering","donation","donor","duet","duo","duplicate","durable","duration","dynamic","dynamite","dynamo","dyslexia","dyspepsia","dyspnea","dystopia","eccentric","educate","egocentric","egoistic","egomania","eject","elaborate","elocution","eloquent","elucidate","emissary","emit","empathy","empower","encephalitis","enclose","encrypt","endocrine","endogamy","endotherm","enduring","energy","enumerate","enunciate","envision","epicenter","epidemic","epilogue","epiphyte","equanimity","equation","equidistant","equivocate","eradicate","ergonomics","esophagus","esthetician","ethnic","ethnocentric","ethnology","euphemism","euphonious","euphoria","evacuate","evident","excavate","exceed","exclaim","exclusion","exhale","expel","export","expose","expulsion","expurgate","exterminate","extract","extraordinary","extraterrestrial","extrovert","factory","ferry","fibroblast","fidelity","fiduciary","flexible","flora","floral","florist","forebear","forebode","forecast","forfeited","forgiven","forsaken","fraction","fracture","fragile","fragment","fugitive","function","fuse","gastric","gastritis","gastronomy","genealogy","generation","genetic","geography","geology","geoponics","geriatrics","gerontocracy","gerontology","gigabyte","gigahertz","gigawatt","gradual","grammar","granite","granular","graphic","graphology","grateful","gratify","gratuity","hectare","hectoliter","hectometer","helianthus","helichrysum","helicon","helicopter","heliograph","heliotropism","helix","hemicycle","hemisphere","hemistich","hemoglobin","hemorrhage","hepatitis","hepatoma","hepatotoxic","heptagon","heptameter","herbal","herbicide","herbivorous","heterodox","heterogeneous","heteronym","hexagon","hexameter","hexapod","histochemistry","histology","homeopath","homicide","homogeneous","homonym","hydrate","hydraulic","hydrophobia","hydrophyte","hydroponics","hygrograph","hygrometer","hyperactive","hypercritical","hypertension","hypoglycemia","hypothermia","hypothesis","icon","iconoclast","iconology","idiomatic","idiosyncrasy","idiot","illegal","illuminate","illusion","image","imaginative","imagine","immerge or immerse","immigrant","immobilize","immortal","immutable","impossible","impulsive","inappropriate","incarnate","incisor","inclination","incline","incognito","incredible","inflection","infrared","infrastructure","infuse","innate","innovate","innovation","input","inscribe","insect","insecticide","insomnia","inspection","inspire","intact","interaction","intercept","interject",
"international","interrupt","intersection","interstellar","intervene","intoxicated","intrastate","intravenous","introvert","invertebrate","invincible","inwards","irrational","irredeemable","irreformable","irresponsible","isobar","isometric","isothermal","judgment","judicial","judiciary","junction","juvenile","kilobyte","kilogram","kilometer","kinesthesia","kinetics","laborious","lactose","leucine","leukemia","leukocyte","lexicology","liberate","libertine","liberty","linguine","linguist","lipase","lipoid","liposuction","location","logic","loquacious","lucid","lumen","lunar","lunarscape","lunatic","macroeconomics","macroevolution","macromolecule","magnate","magnificent","magnify","malaria","malcontent","malefactor","malfunction","malicious","mandate","maneuver","maniac","manual","manuscript","marina","maritime","maternal","maternity","matriarch","maximal","maximize","maximum","medieval","mediocre","medium","megalopolis","megaphone","megastructure","megaton","melancholy","melanoma","melodrama","memorial","memory","meson","metamorphosis","metaphysics","metastasis","metric","metropolis","microbe","microchip","microcosm","microphone","microscope","midriff","midterm","midway","migrant","migration","millennium","millibar","milliliter","millimeter","mini","minuscule","minutiae","misandry","misbehave","misnomer","misprint","missile","mobile","mobility","monarch","monochrome","monocular","monolith","monologue","monotheism","mortal","mortician","motion","motivate","multicolored","multilingual","multimedia","multiple","multiple sclerosis","multitasking","mutant","mutate","myasthenia","myocardium","myosin","narrate","narrative","narrator","natal","natural","naval","navigate","necrology","necropolis","necrosis","negate","negative","neoclassic","neocolonialism","neonatal","neophyte","nephritis","nephron","nephrostomy","neuralgia","neurologist","neurotic","nominal","nominate","nondescript","nonfiction","nonsense","nostalgia","notable","notarize","novelty","novice","numerology","numerous","object","obscure","octagon","octogenarian","octopus","oculist","omnipotent","omnipresent","omniscient","omnivorous","opponent","opposition","optic","optician","optimal","optimize","optimum","orthodontist","orthodox","orthography","orthopedic","osteoarthritis","osteology","osteopathy","overconfident","overexcited","overstock","oxydize","oxymoron","pachyderm","paleography","paleontology","panacea","pandemic","panorama","pantheism","parachute","paradox","paragraph","parasol","pardon","paternal","paternity","patriarch","pedal","pedestrian","pediatrician","pedicure","pentagon","pentagram","pentathlon","pepsin","peptic","perceive","perennial","perimeter","periodontal","peripheral","periscope","permanent","permeate","persist","philanthropy","philodendron","philology","philosopher","philosophy","phonetic","photocopy","photogenic","photograph","photon","photophobia","phyllite","phyllotaxis","physical","physician","physique","plaster","plastic","pneumatic","pneumonia","podiatrist","podiatry","podium","police","politics","polychrome","polyglot","polygon","polytheism","popular","population","populist","portable","porter","position","posthumous","postpone","postscript","preamble","prediction","predominate","prelude","prepare","preserve","proclamation","prognosis","progress","project","prologue","promote","prophet","protocol","proton","protoplasm","prototype","proverb","pseudonym","pseudoscience","psyche","psychic","psychokinesis","psychology","pugnacious","pungent","purgatory","purge","pyretic","pyrometer","pyrotechnics","quadrant","quadrennium","quadruped","quart","quarter","quartet","quintessence","quintet","quintuple","radical","radioactive","radiologist","radish","ramification","ramify","ramus","react","reaction","rebel","rebound","recede","recline","recognize","refuge","refugee","regent","regime","regulate","rejuvenate","relocate","removable","renege","renovate","repel","repugnant","reservation","resist","retort","retroactive","retrograde","retrogress","retrospective","reverse","revival","rewind","rhinoceros","rhinoplasty","rhinovirus","ridicule","ridiculous","rubella","ruby","rupture","sane","sanitary","sanitation","sclerometer","scribe","secede","seclude","section","seismograph","selfish","semiannual","semicircle","semiconscious","septet","septuagenarian","serum","sexagenarian","sextet","sextuple","solar","solarium","somniloquy","somnolent","sonorous","sophism","sophisticated","spectator","spirit","stable","stagnant","stationary","stellar","structure","submarine","submerge","substandard","suburb","sum","summation","summit","superior","supersonic","symmetry","synchronize","synergy","syntax","tactile","tangible","taxonomy","technocracy","technologically","technology","technophobia","telecommuting","telegram","telekinesis","telephone","telescope","television","temporal","temporary","terminate","terrain","territory","tetrapod","tetrarchy","theology","thermal","thermos","thermostat","toxic","toxicology","tractor","transcontinental","transfer","translucent","transpire","transport","triangle","triathlon","tricycle","tripod","ultramodern","ultrasonic","unabridged","unfair","unfriendly","unicycle","unilateral","unique","unison","urban","urbanology","vacant","vacation","veracious","veracity","verbalize","verify","version","vertebrate","victory","vision","vital","vivacious","vivisection","vocalize","volition","voluntary","voracious","xenogenesis","xenophile","xenophobic","xeric","xerography","xerophyte","xylophagous","xylophone","zooid","zoology","zooplankton","zygomorphic","zygote"]


var find_non_matching_words = function (query_list, master_list) {
    
    var non_matching_list = [];
    
    for (var i = 0; i < query_list.length; i++) {
        if (master_list.indexOf(query_list[i]) === -1) {
            non_matching_list.push(query_list[i]);
        }
    }
    
    back.log("NON_MATCHING_LIST = ", non_matching_list);
    return non_matching_list;
}


Quiz.prototype.next_question = function (error) {
    
    
    
    var new_dictionary_template1 = {
      	'canonical_form': null,
        'component_list': [],
      	'definition': null,
      	'variant_list': null,
        'british_variant_list': null,
       	'irregular_plural_list': null, 
     	'part_of_speech': null,
     	'level': null,
     	'sense_type': null,
     	'field_list': null
    };


    var change_key_map = {
        'meaning': 'definition',
        'part of speech': 'part_of_speech'
    }
    
    // var old_dictionary = {
    //     "cardiology": {
    //         "grade": 12,
    //         "meaning": "the treatment and <span class=\"embedded_root\">study</span> of the <span class=\"embedded_root\">heart</span>",
    //         "part of speech": "noun",
    //         "roots": [
    //             "CARDI",
    //             "LOG"
    //         ],
    //         "type": "none",
    //         "word": "cardiology"
    //     },
    //     "bibliophobia": {
    //         "grade": 12,
    //         "meaning": "the <span class=\"embedded_root\">fear</span> of <span class=\"embedded_root\">books</span>",
    //         "part of speech": "noun",
    //         "roots": [
    //             "BIBLI",
    //             "PHOB"
    //         ],
    //         "type": "none",
    //         "word": "bibliophobia"
    //     }
    // };
    var old_dictionary = {
        "cardiology": {
            "grade": 12,
            "meaning": "the treatment and <span class=\"embedded_root\">study</span> of the <span class=\"embedded_root\">heart</span>",
            "part of speech": "noun",
            "roots": [
                "CARDI",
                "LOG"
            ],
            "type": "none",
            "word": "cardiology"
        },
        "carnivorous": {
            "grade": 12,
            "meaning": "<span class=\"embedded_root\">meat</span>-<span class=\"embedded_root\">eat</span>ing",
            "part of speech": "adjective",
            "roots": [
                "CARN",
                "VOR/VOUR"
            ],
            "type": "none",
            "word": "carnivorous"
        },
    };
    
    
    // var test_dictionary = {
    //     "humpty": {
    //         "grade": 12,
    //         "meaning": "the treatment and <span class=\"embedded_root\">study</span> of the <span class=\"embedded_root\">heart</span>",
    //         "part of speech": "noun",
    //         "roots": [
    //             "CARDI",
    //             "LOG"
    //         ],
    //         "type": "none",
    //         "word": "cardiology"
    //     },
    //     "carnivorous": {
    //         "grade": 12,
    //         "meaning": "<span class=\"embedded_root\">meat</span>-<span class=\"embedded_root\">eat</span>ing",
    //         "part of speech": "adjective",
    //         "roots": [
    //             "CARN",
    //             "VOR/VOUR"
    //         ],
    //         "type": "none",
    //         "word": "carnivorous"
    //     },
    // };

    // master function
    var change_big_dictionary_of_dictionaries = function (big_dictionary, change_map, altered_dictionary_template) {
        // initialize an empty list, to which we will push all changed dictionaries
        var new_list = [];
        // var obj = big_dictionary;
        
        //reboot
        var output_list = [];
        
        
        
        // var dictionary = old_dictionary;
        var dictionary = big_dictionary;
        
        
        
        

        
        var list_of_key_strings = Object.keys(dictionary);
        
        
        // console.log("SANITY obj = ", dictionary);
        // console.log("SANITY obj stringified = ", JSON.stringify(dictionary));
        // console.log('SANITY list_of_key_strings = ', list_of_key_strings);
        
        
        //////// for loop approach
        for (var i=0; i < list_of_key_strings.length; i++) {
            // console.log("BEGIN ITERATION");
            // console.log("INSIDE ITERATION i = ", i);
            var key_string = list_of_key_strings[i];
            // console.log("INSIDE ITERATION key_string = ", key_string);
            var sub_object = dictionary[key_string];
            // console.log("INSIDE ITERATION sub_object = ", sub_object);
            // console.log("INSIDE ITERATION sub_object stringified = ", JSON.stringify(sub_object));
            
            
            //////////////commenting out for sanity check
            // should return new object
            var output = change_dictionary(sub_object, change_map, altered_dictionary_template);
            
            // console.log("INSIDE ITERATION output = ", output);
            // console.log("INSIDE ITERATION output stringified = ", JSON.stringify(output));
            
            
            // should be a list of objects
            output_list.push(output);
            // console.log("INSIDE ITERATION output_list = ", output_list);
            // console.log("INSIDE ITERATION output_list stringified = ", JSON.stringify(output_list));
            // console.log("END ITERATION");
        }
        
        // console.log("SANITY output_list = ", output_list);
        return output_list;
        
        
        
        // a dictionary can't be iterated over
        // turn the keys into something that can be iterated over
        // var list_of_objects = Object.keys(obj);
        // console.log('WELL list_of_objects = ', list_of_objects);
        
        
        // sanity check
        // for (var i = 0; i < list_of_objects.length; i++) {
        //     console.log("i = ", i);
        //     console.log("key = ", list_of_objects[i]);
        //     var key = big_dictionary[list_of_sanity_check_objects[i]];
        //     console.log("object_key = ", object_key);
        //     new_list.push(object_key);
        //     console.log("NEW LIST inside iteration = ", new_list);
        // }
        
        
        // var list_of_sanity_check_objects = ['humpty', 'dumpty'];
        
        // var sanity_check_map = {
        //     'humpty': 'sat on a wall',
        //     'dumpty': 'had a great fall'
        // }
        
        // sanity check
        // for (var i = 0; i < list_of_sanity_check_objects.length; i++) {
        //     console.log("i = ", i);
        //     console.log("obj[i] = ", list_of_sanity_check_objects[i]);
        //     var object_key = sanity_check_map[list_of_sanity_check_objects[i]];
        //     console.log("object_key = ", object_key);
        //     new_list.push(object_key);
        //     console.log("NEW LIST inside iteration = ", new_list);
        // }
        
        // sanity check
        // for (var i = 0; i < list_of_objects.length; i++) {
        //     console.log("i = ", i);
        //     console.log("obj[i] = ", list_of_objects[i]);
        //     var object_key = old_dictionary[list_of_objects[i]];
        //     console.log("object_key = ", object_key);
        //     var sub_dictionary = change_dictionary(object_key, change_map, altered_dictionary_template);
        //     console.log("sub_dictionary = ", sub_dictionary);
        //     new_list.push(sub_dictionary);
        //     console.log("NEW LIST inside iteration = ", new_list);
        // }
        
        
        
        // iterate through keys attempt 2
        // for (var i = 0; i < list_of_objects.length; i++) {
        //     console.log("i = ", i);
        //     console.log("obj[i] = ", list_of_objects[i]);
        //     var object_key = old_dictionary[list_of_objects[i]];
        //     console.log("object_key = ", object_key);
        //     var sub_dictionary = change_dictionary(object_key, change_map, altered_dictionary_template);
        //     console.log("sub_dictionary = ", sub_dictionary);
        //     new_list.push(sub_dictionary);
        //     console.log("NEW LIST inside iteration = ", new_list);
        // }
        
        
        
        // // iterate through keys attempt 1 failed
        // // for (var i = 0; i < list_of_objects.length; i++) {
        // //     console.log("i = ", i);
        // //     console.log("obj[i] = ", list_of_objects[i]);
        // //     var object_key = obj[list_of_objects[i]];
        // //     console.log("object_key = ", object_key);
        // //     var sub_dictionary = change_dictionary(object_key, change_map, altered_dictionary_template);
        // //     console.log("sub_dictionary = ", sub_dictionary);
        // //     new_list.push(sub_dictionary);
        // //     console.log("NEW LIST inside iteration = ", new_list);
        // // }
        
        
        // //////////// for each approach
        // // Object.keys(obj).forEach(function(key) {
        // //     // var little_dictionary = obj[key];
        // //     // console.log("key = ", key);
        // //     // console.log("obj[key] = ", obj[key]);
        // //     // console.log("obj[key] stringified = ", JSON.stringify(obj[key]));
        // //     // var altered_dictionary = change_dictionary(obj[key], change_map, altered_dictionary_template);
        // //     // console.log("altered_little_dictionary = ", altered_dictionary);
            
            
            
        // //     // new_list.push(key);
        // //     // new_list.push(obj[key]);
        // //     // not working
        // //     new_list.push(change_dictionary(obj[key], change_map, altered_dictionary_template));
            
        // //     // new_list.push(change_dictionary(little_dictionary, change_map, altered_dictionary_template));
        // //     console.log("NEW LIST inside iteration = ", new_list);
        // // });
        
        // console.log("NEW LIST = ", new_list);
        // return new_list;
        
    }   
        
        


    var change_dictionary = function (unaltered_dictionary, change_map, altered_dictionary_template) {
  		// a single equals sign
  		// e.g. var altered_dictionary = altered_dictionary_template;
        // produces not a new object
        // but a reference to an existing object
        // the problem with this: 
        // every time we iterate through a loop
        // we're creating a new reference to the existing object
        // when the existing object gets changed (i.e. on the last loop of the iteration)
        // all the previous references now point to that changed object
        // the existing object may have properties already assigned to it
        // e.g. 
        // 
        // rather we want to create a new object, a shallow clone
        // a shallow clone only goes one layer deep
        // a deep clone would go into nested properties
        // and create a new object out of that nested object
        
        // below seemed ot be skipping those properties with a null value
        //  var altered_dictionary = Object.create(altered_dictionary_template);
  		
  		
  		var altered_dictionary = JSON.parse(JSON.stringify(altered_dictionary_template));
  		
  		console.log("ALTERED_DICTIONARY = ", altered_dictionary);
 		for (let old_key in change_map) {
            if (change_map.hasOwnProperty(old_key)) {
                let value = unaltered_dictionary[old_key];
                let new_key = change_map[old_key];
                altered_dictionary[new_key] = value;
            }
        }
        altered_dictionary.canonical_form = unaltered_dictionary.word;
        // console.log("WELL unaltered_dictionary.roots = ", unaltered_dictionary.roots);
  		altered_dictionary.component_list = convert_list_to_list_of_objects(unaltered_dictionary.roots);
        // console.log("WELL altered_dictionary.definition = ", altered_dictionary.definition);
        altered_dictionary.definition = replace_span_with_metacharacter(altered_dictionary.definition, '@');
  
        return altered_dictionary;
    }

    // starting_list ['BIBLI', 'MANI']
    // component_list: [{'_1' : 'bibli'}, {'_2': 'o#'}, {'_3': 'man'}, {'_4': 'ia'}]
    var convert_list_to_list_of_objects = function (list) {
         var output = list.map(function (string, index){
            //  console.log("WELL STRING = ", string);
            //  console.log("WELL INDEX = ", index);
             var obj = {};
             //	var converted_index = '_' + (++index);
             obj['_' + (++index)] = string.toLowerCase();
             return obj;
         });
        //  console.log("WELL OUTPUT of convert list = ", output);
         return output;
    }
    
    
    var replace_span_with_metacharacter = function (string, metacharacter) {
        string = replace_all_substrings(string, '<span class=\"embedded_root\">', metacharacter);
        string = replace_all_substrings(string, '</span>', metacharacter);
        return string;
    }
    
    
    
    
    
    // var test_change_dictionary_output = change_dictionary_key(test_dictionary_to_alter1, 
    // 'meaning', 'definition');
    
    // var test_change_dictionary_output = change_dictionary_keys(test_dictionary_to_alter1, 
    // change_key_map, new_dictionary_template1);
    
    
    
    
    
    
    // var test_change_dictionary_output = change_big_dictionary_of_dictionaries(old_dictionary, change_key_map, new_dictionary_template1);
    var test_change_dictionary_output = change_big_dictionary_of_dictionaries(words, change_key_map, new_dictionary_template1);
    
    // console.log("WELL output = ", test_change_dictionary_output);
    console.log("WELL output stringified = ", JSON.stringify(test_change_dictionary_output));
    
    
    
    
    
    ////// RESET THE HINT BUTTON AND ITS COUNTER
    // the global_hint_counter needs to be reset to 0
    // this counter inspects how many times the hint button has been pressed per question
    // to control things like how many points are deducted and what kind of hint appears
    global_hint_counter = 0;
    el("spelling_hint_button_master").disabled = false;
    el("spelling_hint_button_master").innerHTML = "get a HINT";
    
    
    
    
    back.log("this.module.id = ", this.module.id);
    // @beehack
    if (this.module.id === 0.5 || this.module.id === 0.25) {
        
        console.log("entering short term beehack interceptor");
        
        set_display("set_spelling_bee_level_button", 'initial');
        
        
        // todo @999 fix, this is hacky
        // what we really want to do is initialize the spelling_level
        // at the time of the creation of the user
        // but older users need to initialize at 0
        // if (!this.user.data.spelling_level) {
        //     this.user.intialize_spelling_bee_counter_if_it_does_not_already_exist();
        //     this.user.data.spelling_level = 0;
        // }
        
        
        // todo this is also hacky
        back.log('LOG: entering try block in next question')
        this.clean_up();
        this.next_mode(error);
        back.log('LOG: about to call next_question');
        this.game.next_question(this);
        back.log('LOG: no error after calling next_question')
        
        
        // todo very important: need to figure out how to clear this box
        // without calling some ad hoc step
        // remove_children(el('spelling_hint_box'));
        var div_to_clear_ad_hoc = el('spelling_hint_box');
        div_to_clear_ad_hoc.innerHTML = "";
        
        
        var div_to_clear_ad_hoc2 = el('dash_hint_box');
        div_to_clear_ad_hoc2.innerHTML = "";
        
        return;
        
    }
    
    
    // console.log("999 post bee interceptor")
    
    // todo very important: need to figure out how to clear this box
    // without calling some ad hoc step
    // remove_children(el('spelling_hint_box'));
    var div_to_clear_ad_hoc = el('spelling_hint_box');
    div_to_clear_ad_hoc.innerHTML = "";
    
    
    var div_to_clear_ad_hoc2 = el('dash_hint_box');
    div_to_clear_ad_hoc2.innerHTML = "";
   
   
   
    
    
    
    // horrible hack fix
    el('spelling_hint_div2').innerHTML = '';
    
    //todo xxx hack this was a hack, remove 
    el('image_display_box').innerHTML = '';
    // console.log('LOG: entering next_question')
    //previously:
    // this.next_mode();
    // this.game.next_question(this);
    
    try {
        back.log('LOG: entering try block in next question')
        this.clean_up();
        this.next_mode(error);
        back.log('LOG: about to call next_question');
        this.game.next_question(this);
        back.log('LOG: no error after calling next_question')
    } catch (e) {
        if (this.user.is_mf()) {
            throw 'Complete crash with ' + JSON.stringify(e) + ' , look at log to find issues.';
        }
        back.log("PROBLEM: entering catch block error caught");
        
        back.log("PROBLEM: this.game = ", this.game);
        // Originally: add not push
        
        var sick_mode = (this.game || {'get_mode_name': function () {
           return 'no_game';
        }}).get_mode_name();
        //only push if it's not in our list already
        if (this.sick_modes.indexOf(sick_mode) === -1) {this.sick_modes.push(sick_mode)};
        if (this.urgent_error_count < 5) {
            if (!this.user.is_mf()) {
                log_urgent_error(e.toString(), "quiz.next_question", "sick mode = " + sick_mode 
                + " module = " + this.module.id + " progress = " +
                this.user.get_module(this.module.id).progress + "/" +
                this.module.threshold + " level = " + this.game.level);
            } else {
                log_urgent_error(e.toString(), "quiz.next_question", "sick mode = " + sick_mode);
            }
            this.urgent_error_count++;
        }
        
        // bug.log("PROBLEM: URGENT error logged");
        back.log("PROBLEM: URGENT error logged");
        back.log("PROBLEM: desperate move triggered");
        
        if (e !== "modes exhausted") {
            back.log("PROBLEM: error handler initiated");
            this.next_question(true);
        }
    }
};

Quiz.prototype.mf_sql_completed_log = function (ajax_callback) {
    var total = this.game.metrics.completed + this.game.metrics.skipped;
    var data = [
        'completed: ' + this.game.metrics.completed + ' of ' + total,
        'skipped: ' + this.game.metrics.skipped + ' of ' + total,
        this.get_mf_game_status(),
        this.time_data_id
    ];
    back.log('about to update mf', data);
    post({data: data, type: "update_mf_metrics"}, ajax_callback);
}


Quiz.prototype.question_complete = function (button_name) {
    set_display("skip_button", 'none');
    
    
    /*
    // Not currently needed, put back in later.
    // A bit of a hack.
    if (this.game instanceof MFModeGame) {
        // Increment the question.
        var internal_chapter = this.game.current_chapter;
        this.game.increment_question();
        console.log('about to test', this.game.current_chapter, internal_chapter);
        if (this.game.current_chapter !== internal_chapter) {
            console.log('return to profile triggered');
            return_to_profile();
        }
    }
    */
    //todo comment this back in when done testing
    // clear_input_feedback_box("feedback_for_input");
    
    set_display("feedback_for_input", 'none');
    
    // anti- @beehack
    if (this.module.id !== .25 && this.module.id !== .5) {
        this.update_accuracy();
    }
    
    this.submodule.incorrect_streak = 0;
    // We reset the incorrect streak
    // due to the fact that there is a new question.
    if (this.submodule.score >= this.module.submodule.threshold) {
        this.submodule_complete();
    } else {
        if (this.game.get_mode_name() === 'mf' ||
        (this.game.get_mode_name() === 'syntax' && this.game.on_last_region())) {
            var general_callback;
            if (button_name === "skip_button") {
                general_callback = function () {return_to_profile()};
            } else {
                general_callback = function () {};
                el('submit_button').innerHTML = 'back to profile';
                el('submit_button').onclick = return_to_profile;
            }
            var self = this;
            var count = 0;
            var callbacks_created = 0;
            var working_callback = function () {
                count++;
                if (count === callbacks_created) {
                    general_callback();
                }
            }
            var make_callback = function (method) {
                callbacks_created++;
                self[method](working_callback);
            }
            make_callback('log_sentence');
            if (IN_PRODUCTION_SWITCH) {
                make_callback('mf_sql_completed_log');
            }
        } else {
            this.next_question();
        }
    }
};


// below is a super hacky short term solution to the more than 3 attempts problem (see)
// converts incorrect_streak 2-3 to 2 and incorrect_streak 8 to 3
// the problem is our accuracy_metrics table only goes up to attempt 0-3
// so when we post spelling mode (which will allow a bunch of attempts, 8 or more)
// we will end up sending data the table can't understand
Quiz.prototype.regularize_accuracy_dictionary_input = function (accuracy_dictionary) {
    //pseudo-code
    //iterate through keys
    //if key = 3-7
    //sum the value to key 2
    // if key = 8
    // sum the value to key 3
    // e.g.   0: 1, 2: 1, 3: 5, 4: 6, 5: 1, 6: 0, 7: 1, 8: 9
    // we sum all the values in 3: 5, 4: 6, 5: 1, 6: 0, 7: 1,
    // sum = 5 + 6 + 1 + 0 + 1 = 13
    // we add that sum to the original value for 2 (originally 2: 1)
    // 2 is now 2:14
    // moving on the 8th item (8: 9)
    // we add that value to original value for 3 (originally 3: 5)
    // 3 is now 3: 14
};

Quiz.prototype.update_accuracy = function () {
    //todo super hacky short-term intervention for spelling mode, converts all incorrect_streak greater than 3 to 3
    
    back.log("entering update_accuracy");
    back.log("this.submodule.incorrect_streak = ", this.submodule.incorrect_streak);
    
    // below would be an option very hacky
    // this.submodule.incorrect_streak = this.regularize_accuracy_dictionary_input(this.submodule.incorrect_streak);
    
    console.log("FEBRUARY BUG checkpoint 5");
    
    
    //todo merge - below is a hacky way to stop bugs in week 1-2 of institute
    if (!this.user.is_mf()) {
        this.user.update_question_metrics(this.submodule.incorrect_streak, this.module.id);
        this.update_accuracy_dict();
    };
    
    console.log("FEBRUARY BUG checkpoint 9");
}

Quiz.prototype.get_mf_game_status = function () {
    if (this.game.metrics.skipped === 0) {
        return 'completed';
    } else {
        return 'skipped';
    }
}

Quiz.prototype.log_sentence = function (callback) {
    var current_path = this.game.current_path;
    var status = this.get_mf_game_status();
    back.log("current_path = ", current_path);
    this.user.log_sentences(current_path, status, this.game.get_mode_name(), callback);
}

// we update the accuracy_dict by incrementing the incorrect_streak property
// for each mode name
// e.g. accuracy_dictionary.etymology.4 ---> 5
Quiz.prototype.update_accuracy_dict = function () {
    back.log("[quiz.update_accuracy_dict] entering update_accuracy_dict");
    var mode_name = this.game.get_mode_name();
    back.log("[quiz.update_accuracy] mode_name = ", mode_name);
    var incorrect_streak = this.submodule.incorrect_streak;
    back.log("[quiz.update_accuracy] incorrect_streak = ", incorrect_streak);
    // update the accuracy dictionary 
    this.accuracy_dictionary[mode_name][incorrect_streak]++;
    
    
    // console.log('accuracy dict', incorrect_streak, this.accuracy_dictionary, this.convert_accuracy_dict());
}


Quiz.prototype.convert_accuracy_dict = function () {
    var result = {};
    for (var i in this.accuracy_dictionary) {
        for (var j = 0; j < 4; j++) {
            // i.e., accuracy_drop_mode_3
            result["accuracy_" + i + "_mode_" + j] = this.accuracy_dictionary[i][j];
        }
    };
    return result;
}

Quiz.prototype.convert_accuracy_dict2 = function () {
    var result = {};
    for (var i in this.accuracy_dictionary) {
        var value = this.accuracy_dictionary[i];
        for (var j in value) {
            if (value[j] !== 0) {
                result[i] = value;
                break;
            }
        }
    };
    return result;
}


// @beehack
// when a user sets spelling bee level it needs to reset the progress bar
// if not, users can keep clicking a level until they get an easy question
Quiz.prototype.reset_submodule_without_post = function () {
    if (this.module.id === 0.25) {
        console.log("DEBUGGING all is well");
        el("fraction_header").innerHTML =  global_spelling_match_score_counter;
    } else {
        console.log("DEBUGGING shouldn't be triggered in bee match mode");
       el("fraction_header").innerHTML =  global_beehack_counter + "/100"; 
    }
    
    
    
    
    
    
    
    this.progress_bar.change_number_correct(
            {'change_value': -this.submodule.score,
                'time_from_start': new Date() - this.began});
    
    // we reset the score to 0
    this.submodule = {
        score: 0, 
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    
    this.next_question();
};
    

// end @beehack

// @beehack
Quiz.prototype.set_word_scores = function (callback) {
    // commented out for testing (pending testing whether firebase can handle the traffic)
    // dummy data
    // this.word_scores_update_list = [
    //     {item: "arthropod", type: "word", correct: true, used_all_attempts: false, hints: 2, attempts: 2},
    //     {item: "amoeba", type: "word", correct: false, used_all_attempts: true, hints: 3, attempts: 10},
    //     {item: "biped", type: "word", correct: true, used_all_attempts: false, hints: 0, attempts: 2},
    // ];
    // commented out for testing (pending testing whether firebase can handle the traffic)
    // this.user.persist_word_scores(this.word_scores_update_list, callback);
}
// end @beehack


// @beehack
Quiz.prototype.submodule_complete_without_post = function () {
    
    if (this.module.id === 0.25) {
        return;
    }
    
    
    // don't think we need these below
    // var mod = this.user.get_module_being_played();
    // back.log("mod being played = ", mod);
    // var gotten_module = this.user.get_module(mod);
    // back.log("gotten_module = ", gotten_module);
    // var submodule_id = gotten_module.progress;
    
   
    
    
    //setting up lightbox
    // var numerator = this.user.get_module(mod).progress;
    
    // var denominator = ALL_MODULES[mod].threshold;
    
    // we need mod and counter,
    
    ++global_beehack_counter;
    // console.log("BEEHACK global_beehack_counter = ", global_beehack_counter);
    
    
    // above works
    // below is more modular
    // increments level of the game
    
    
    this.game.set_beehack_level123("+1");
    
    
    // add
    // persist level here
    // console.log("BEEHACK999 about to persist session_bee_counter as: ", session_bee_counter);
    
    
    
    // @beehack
    // todo turn into a function
    var at_a_lower_level_boolean = session_bee_counter > spelling_bee_training_counter;
    
    // console.log("BEEHACK707 in_spelling_bee_training_mode = ", in_spelling_bee_training_mode);
    // console.log("BEEHACK707 at_a_lower_level_boolean = ", at_a_lower_level_boolean);
    
    // this is our persistence step
    if (!in_spelling_bee_training_mode) {
        // console.log("BEEHACK707 not in spelling bee training mode, about to persist with counter = ", session_bee_counter);
        this.set_spelling_bee_counter(session_bee_counter);
    }
    if (!at_a_lower_level_boolean) {
        // console.log("BEEHACK707 not at a lower level, about to persist with counter = ", session_bee_counter);
        // this.user.persist_spelling_bee_counter(session_bee_counter);
        
        // session_bee_counter++;
        
        this.set_spelling_bee_counter(session_bee_counter);
    }
    
    // old
    // if (!test_boolean) {
    //     console.log("BEEHACK707 about to persist with counter = ", session_bee_counter);
    //     // this.user.persist_spelling_bee_counter(session_bee_counter);
        
    //     // session_bee_counter++;
        
    //     this.set_spelling_bee_counter(session_bee_counter);
    // }
    
    
    // @beehack
    // todo
    // put this somewhere up top
    // generalize to all levels (egg, larva, etc.)
    // if (test_boolean) {
    //     var element = el("set_spelling_bee_level_button_egg");
    //     element.style.backgroundColor = "red";
    //     element.style.fontSize = "6px";
    //     // element.style.color = "6px";
    // }
    
    
    
    
    
    
    
    
    
    this.fill_lightbox_without_post(0.5, session_bee_counter);
    
    // old version
    // el("fraction_header").innerHTML =  progress_to_display + "/100";
    
    
    this.display_progress_fraction_bee_mode();
    
    
    
    var dummy_function = this.next_submodule.bind(this);
    
    set_display("next_level_button", 'initial');
    
    
    // el('next_level_button').onclick = this.next_question();
    el('next_level_button').onclick = dummy_function;
}
//end @beehack


Quiz.prototype.display_progress_fraction_bee_mode = function () {
    
    var intro_string;
    var progress;
    var separator;
    var denominator;
    
    if (in_spelling_bee_training_mode && session_bee_counter > spelling_bee_training_counter) {
        intro_string = "in training: score = ";
        progress = global_beehack_counter;
        separator = "";
        denominator = "";
    } else {
        intro_string = "progress = ";
        progress = session_bee_counter;
        separator = "/";
        denominator = "200";
    }
    
    
    
    // todo hacky, make this more modular
    
    // Originally:
    // if (this.module.id = 0.25) {
    // bug!!! Do not use = in if!!!
    
    if (this.module.id === 0.25) {
        console.log("DEBUGGING all is well");
        el("fraction_header").innerHTML =  global_spelling_match_score_counter;
    } else {
        console.log("DEBUGGING shouldn't be triggered in bee match mode");
        el("fraction_header").innerHTML =  intro_string + progress + separator + denominator;

    }
    
}


Quiz.prototype.submodule_complete = function () {
    
    
    console.log("FEBRUARY BUG checkpoint 1");
    
    // @beehack
    // if we are in spelling bee mode
    // we want to bypass post so this is much simpler
    // we also want to set some spelling bee data
    if (this.module.id === 0.5 || this.module.id === 0.25) {
        var self = this;
        this.set_word_scores(function () {
            self.submodule_complete_without_post();
        });
        return;
    }
    
    
    console.log("FEBRUARY BUG checkpoint 2");
    
    if (this.user.uid !== null) {
        back.log("[quiz.submodule_complete] entering post #2");
        back.log("[quiz.submodule_complete] accuracy dictionary raw  = ", this.accuracy_dictionary);
        back.log("[quiz.submodule_complete] accuracy dictionary converted = ", this.convert_accuracy_dict2());
        back.log("[quiz.submodule_complete] this.time_data = ", this.time_data);
        
        console.log("[quiz.submodule_complete] entering post #2");
        console.log("[quiz.submodule_complete] accuracy dictionary raw  = ", this.accuracy_dictionary);
        console.log("[quiz.submodule_complete] accuracy dictionary converted = ", this.convert_accuracy_dict2());
        console.log("[quiz.submodule_complete] this.time_data = ", this.time_data);
        
        
        
        
        
        
        post({data: this.time_data_id, type: "update_time_data"});
        
        
        back.log("[quiz.submodule_complete] just finished update_time_data");
        
        back.log("[quiz.submodule_complete] about to enter update_accuracy_new");
        
        post({data: this.time_data_id, accuracy_dictionary: this.convert_accuracy_dict2(),
        type: "update_accuracy_new"});
        
        back.log("[quiz.submodule_complete] just finished update_accuracy_new");
        back.log("[quiz.submodule_complete] exiting post #2");
    } else {
        // The user was anonymous for the first post, so if this second post continued,
        // it would also fail.
        // bug.log("[quiz.submodule_complete] PROBLEM refusing post #2");
    }
    
    //we check if we are in advance or improving
    //advance mode returns current module
    //improving returns improving module
    var mod = this.user.get_module_being_played();
    
    back.log("[quiz.submodule_complete] mod being played = ", mod);
    
    var gotten_module = this.user.get_module(mod);
    
    back.log("[quiz.submodule_complete] gotten_module = ", gotten_module);
    
    var submodule_id = gotten_module.progress;
    
    
    //logging the stop time
    // console.log("DEBUG 12-28 submodule_complete, about to call log_submodule_stop_time");
    // console.log("DEBUG 12-28 module_id =", mod);
    // console.log("DEBUG 12-28 submodule_number =", submodule_number);
    // //todo 12-30 akiva moved this to a method in user
    // // this.user.log_submodule_stop_time(mod, submodule_number);
    // console.log("DEBUG 12-28 log stop time passed");
    
    //progress bar
    // this.old_progress_bars.forEach(function (x) {remove_element(x.progress_bar)});
    // this.user.add_progress_bar(this.progress_bar.past_events, this.module.id);
    
    
    
    //setting up lightbox
    var numerator = this.user.get_module(mod).progress;
    
    var denominator = ALL_MODULES[mod].threshold;
    // console.log("DEBUG 11-16 mod = ", mod);
    // console.log("DEBUG 11-16 numerator = ", numerator);
    // console.log("DEBUG 11-16 threshold = ", denominator);
        
    
    // console.log("DEBUGGING entering problem lightbox area 11-19");
    
    
    back.log("[quiz.submodule_complete] about to make callback - should be null until submodule is complete");
    //callback is null when submodule is not yet complete
    var callback = this.user.submodule_complete(this.module.id);
    back.log("[quiz.submodule_complete] this.module.id = ", this.module.id);
    back.log("[quiz.submodule_complete] is submodule complete? = ", callback);
    back.log("[quiz.submodule_complete] callback = ", callback);
    
    
    console.log("[quiz.submodule_complete] this.module.id = ", this.module.id);
    console.log("[quiz.submodule_complete] is submodule complete? = ", callback);
    console.log("[quiz.submodule_complete] callback = ", callback);
    
    
    
    var new_callback = debug_via_log(callback, 'callback');
    
    new_callback = do_all(function () {
        el('next_level_button').display = 'none';
        el('image_display_box').innerHTML = '';
    }, new_callback);
    //if submodule complete
    if (callback !== null) {
        if (this.advance_improve_status === 'improving') {
            //we do everything what we normally do, increment progress, persist
            new_callback();
            return; // in case this somehow stays in scope.
        } else {
            console.log("[quiz.submodule_complete] user.submodule_complete is true");
            // console.log("DEBUG 1-29 this.module before change  = ", this.module);
            //todo might not be necessary so we comment it out
            // this.module = ALL_MODULES[this.user.get_current_module()];
            // console.log("DEBUG 1-29 this.module after change  = ", this.module);
            
            // console.log("DEBUGGING LIGHTBOX: you've beaten this level");
            if (this.urge_users_to_continue) {
                this.fill_lightbox("YOU'VE BEATEN THIS LEVEL! EXCELSIOR!!\nGET READY TO CONQUER:", 1, 0);
            } else {
                this.fill_lightbox("YOU'VE BEATEN THIS LEVEL! EXCELSIOR!!");
            }
            // $.featherlight($('#pop_up_div'), {afterClose: callback});
        }
    } 
    //else if submodule is not complete
    else {
        console.log("[quiz.submodule_complete] user.submodule_complete is false");
        //todo put following into function (encapsulation and information hiding)
        //todo make this less hacky
        this.fill_lightbox("YOUR PROGRESS IS: " + (numerator + 1) + "/" + denominator);
        new_callback = this.next_submodule.bind(this);
        //el('next_level_button').onclick = this.next_submodule.bind(this);
        // $.featherlight($('#pop_up_div'), {afterClose: this.next_submodule.bind(this)});
    }
    set_display("next_level_button", 'initial');
    
    // todo this is probably the source of the bug
    el('next_level_button').onclick = new_callback;
};


// DAMAGE CONTROL
//todo akiva added this, perhaps ill founded
//old version below, seemed to perhaps not allow for the following case:
// user clicks on a completed module and no improving module yet exists
Quiz.prototype.is_allowed_module_old = function (mod) {
    return mod === this.user.get_improving_module()
    || mod === this.user.get_current_module();
}


// new version below
Quiz.prototype.is_allowed_module = function (mod) {
    return mod === this.user.get_improving_module()
    || mod === this.user.get_current_module()
    || this.user.get_improving_module() === null;
}

//END DAMAGE CONTROL

Quiz.prototype.display_sick_mode_in_header = function () {
    el("sick_mode_header").innerHTML = '\u25AA';
}

Quiz.prototype.update_display = function() {
    
    back.log("quiz: update_display entered");
    
    // todo - update-todo:
    // todo in improve mode the following will break
    // var mod = this.user.get_current_module();
    // end update-todo:
    
    var mod = this.module.id;
    var module_icon = ALL_MODULES[mod].icon_url;
    
    var module_name = ALL_MODULES[mod].icon_name;
    
    
    back.log("quiz: update_display mod = ", mod);
    back.log("quiz: this.user.mod.progress = ", this.user.get_module(mod).progress);
    
    
    //todo - update-todo
    /*Progress bar is reset somewhere else.
    console.log("Still ok before progress bar");
    this.set_progress_bar();
    console.log("Still ok after progress bar");*/
    //end update-todo
    
    
    
    
    el("name_header").innerHTML = this.user.data.profile.name;
    el("class_header").innerHTML = this.user.data.profile.class_number;
    el("level_header").innerHTML = "<img src=" + module_icon + ">";
    
    
    // @beehack
    if (this.module.id === 0.5) {
        // do nothing
        // we don't display progress in header
        this.display_progress_fraction_bee_mode();
    } else if (this.module.id === 0.25) {
        el("fraction_header").innerHTML = global_spelling_match_score_counter;
    } else {
        el("fraction_header").innerHTML = module_name + ": " + this.user.get_module(mod).progress + "/" + this.module.threshold;
    }
    
    
    back.log("leaving update display");
};


/*This is now the progress bar's job.
Quiz.prototype.set_progress_bar = function () {
    var x = this.submodule.score === 0 ? 0 : (this.submodule.score / this.module.submodule.threshold) * 100;
    // console.log("x:", x, this.submodule.score, this.module.submodule.threshold);
    var e = el("progress-bar");
    
    e.style.width = x + "%";
    // el("progress-bar").innerHTML = JSON.stringify(x) + "%";
};*/

// Quiz.reset_progress_bar = function(){
//     var x = 0;
//     var e = el("progress-bar");
//     e.style.width = x + "%";
//     el("progress-bar").innerHTML = JSON.stringify(x) + "%";
// };











Quiz.prototype.process_answer = function(){
    // console.log("quiz.process_answer triggered");
    this.game.process_answer(this);
};


Quiz.prototype.get_lightbox_image = function(mod_id, progress) {
    var image_list = safe_lookup(ALL_MODULES, mod_id, 'lightbox_images');
    if (image_list) {
        // console.log("DEBUG 5-12 image_list = ", image_list);
        // console.log("DEBUG 5-12 entering image picking");
        var true_progress;
        if (mod_id in this.user.data.history) {
            if (progress === undefined) {
                true_progress = this.user.data.history[mod_id].progress;
            } else {
                true_progress = progress;
            }
        } else {
            true_progress = 0;
        }
        
        var index = (true_progress - 1) % image_list.length;
        
        if (index === -1) {index++};
        
        // console.log("DEBUG 5-12 index = ", index);
        var image = image_list[index];
    } else {
        // console.log('image list does not exist');
        var image = null;
    }
    // console.log('DEBUG 5-12 ')
    // console.log('DEBUG 5-12 image =', image);
    return image;
}


Quiz.prototype.process_lightbox_image = function (offset, progress) {
    //todo 1-17 following is Akiva's additions, check if OK
    // This line is Dan's addition.
    this.user.check_not_mf();
    var mod;
    if (this.advance_improve_status === "advancing") {
        mod = this.user.get_current_module();
    } else if (this.advance_improve_status === "improving") {
        mod = this.user.get_improving_module();
    } else {
        console.log("LOG weird status triggered, namely ",
        this.advance_improve_status);
        if (this.advance_improve_status === null) {
            console.log('PROBLEM the status is null!!!');
        }
    }
    
    if (offset !== undefined) {mod += offset}
  
    var image = this.get_lightbox_image(mod, progress);
    
    return image ? ('<img style="max-height: 100%; max-width: 100%" src="' + image +'" />') : ''; 
}

Quiz.prototype.fill_lightbox = function(text, offset, progress) {
    var name = this.user.data.profile.name;
    
    var image = this.process_lightbox_image(offset, progress);
    
    set_display("submit_button", 'none');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("cleared_in_picture_display", "none");
    set_display_of_class("cleared_in_picture_display2", "none");
    set_display_of_class("morphology_to_clear", "none");
    el('image_display_box').innerHTML = "CONGRATULATIONS " + name + "!<br>" + text + image;
};




// @beehack
// below are some more modular versions of lightbox filling for spelling bee mode
// they don't check user at all
Quiz.prototype.get_lightbox_image_without_post = function(mod_id, counter) {
    var image_list = safe_lookup(ALL_MODULES, mod_id, 'lightbox_images');
    
    if (image_list) {
        // console.log("DEBUG 5-12 image_list = ", image_list);
        // console.log("DEBUG 5-12 entering image picking");
        var true_progress = 0;
        true_progress = counter;
        // if (mod_id in this.user.data.history) {
        //     if (progress === undefined) {
        //         true_progress = this.user.data.history[mod_id].progress;
        //     } else {
        //         true_progress = progress;
        //     }
        // } else {
        //     true_progress = 0;
        // }
        
        var index = (true_progress - 1) % image_list.length;
        
        
        if (index === -1) {index++};
        
        // console.log("DEBUG 5-12 index = ", index);
        var image = image_list[index];
    } else {
        var image = null;
    }
    // console.log('DEBUG 5-12 ')
    // console.log('DEBUG 5-12 image =', image);
    return image;
}

// @beehack
// below are some more modular versions of lightbox filling for spelling bee mode
// they don't check user at all
Quiz.prototype.return_lightbox_image_without_post = function (mod, counter) {
    var image = this.get_lightbox_image_without_post(mod, counter);
    return image ? ('<img style="max-height: 100%; max-width: 100%" src="' + image +'" />') : '';
}


// @beehack
// below are some more modular versions of lightbox filling for spelling bee mode
// they don't check user at all
Quiz.prototype.fill_lightbox_without_post = function(mod, counter) {
    
    var image = this.return_lightbox_image_without_post(mod, counter);
    
    set_display("submit_button", 'none');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    
    set_display_of_class("cleared_in_etymology", "none");
    set_display_of_class("cleared_in_picture_display", "none");
    set_display_of_class("cleared_in_picture_display2", "none");
    set_display_of_class("morphology_to_clear", "none");
    el('image_display_box').innerHTML = "CONGRATULATIONS " + "!<br>" + image;
};

// end @beehack


Quiz.pick_question_data = function(sentence, region_filter, tag_filter){
    var available_tags = sentence.get_all_tag_types(region_filter, tag_filter);
    if (available_tags.length === 0) {
        throw new Error("no tags are available in the sentence "
        + sentence.text + "!");
    } else {
        console.log('[quiz.pick_question_data] All is fine, and the number of available tags is',
        available_tags.length);
    }
    console.log('available_tags, a =', available_tags, available_tags);
    var target_tag = random_choice(available_tags);
    
    var tag_to_region = sentence.get_regions_for_tags(region_filter);
    var available_regions = tag_to_region[target_tag];
    console.log('target_tag, available_regions =',
    target_tag, available_regions);
    var target_region = random_choice(available_regions);
    
    return {
        sentence: sentence,
        available_tags: available_tags,
        target_tag: target_tag,
        target_region: target_region
    };
    
};


Quiz.prototype.get_number_of_tries = function () {
    return this.submodule.incorrect_streak + 1;
}


Quiz.prototype.get_reward = function () {
    if ('reward' in this.module.submodule) {
        return this.module.submodule['reward'];
    } else {
        return this.module.submodule['reward' + this.get_number_of_tries()];
    }
}


// todo this is an older function based on progress bars, check if it's useful or should be scrapped
Quiz.prototype.increment_score = function () {
    console.log("[quiz.increment_score] entering increment_score");
    console.log("[quiz.increment_score] this.get_reward = ", this.get_reward);
    console.log("[quiz.increment_score] this.module = ", this.module);
    console.log("[quiz.increment_score] this.module.submodule = ", this.module.submodule);
    
    
    
    // todo implement decrement countdown bar when ready
    // todo @12345
    if (this.module.id === 0.25) {
        console.log("12345 this.stopping_time = ", this.spelling_match_stopping_time);
        // this.progress_bar.decrement_as_countdown(this.spelling_match_stopping_time, this.total_match_time);
    }
    
    
    if (!this.user.is_mf()) {
        console.log("FEBRUARY BUG checkpoint 0.1");
        console.log("FEBRUARY BUG checkpoint 0.2");
        this.progress_bar.change_number_correct(
            {'change_value': this.get_reward(),
                'time_from_start': new Date() - this.began});
        console.log("FEBRUARY BUG: entering problem area");
        this.submodule.score += this.get_reward();
        console.log("FEBRUARY BUG: this.submodule.score = ", this.submodule.score);
    }
};

// todo this is an older function based on progress bars, check if it's useful or should be scrapped
Quiz.prototype.decrement_score = function() {
    if (!this.user.is_mf()) {
        this.progress_bar.change_number_correct(
            {'change_value': -this.module.submodule.penalty,
                'time_from_start': new Date() - this.began});
        this.submodule.score -= this.module.submodule.penalty;
        this.submodule.score = Math.max(0, this.submodule.score);
    }
};

// todo this is an older function based on progress bars, check if it's useful or should be scrapped
Quiz.prototype.decrement_score_via_hint = function() {
    if (!this.user.is_mf()) {
        this.progress_bar.change_number_correct(
            {'change_value': -this.module.submodule.spelling_hint_penalty,
                'time_from_start': new Date() - this.began});
        this.submodule.score -= this.module.submodule.spelling_hint_penalty;
        this.submodule.score = Math.max(0, this.submodule.score);
    }
};


// todo clean and optimize the beehack
// @beehack


/////////////NEW VERSIONS BELOW/////////
// @beehack
Quiz.prototype.set_spelling_bee_level = function (new_level) {
    // console.log("BEEHACK789 setting spelling bee level to " + new_level);
    // console.log("BEEHACK789 counter should be set to: ",
    //    level_name_to_counter_value[new_level]);
    
    
    // we alter globals
    
    // the old version get rid of
    global_beehack_new_level_set = true;
    
    // the new version to keep
    in_spelling_bee_training_mode = true;
    
    spelling_bee_training_counter = level_name_to_counter_value[new_level];
    
    
    // we call the method to change level in the game
    this.game.set_level_by_counter(spelling_bee_training_counter);
    // this.game.set_level_by_counter(21);
    
    // we reset the submodule with the new level
    // in order to clear the progress bar and generate a new question
    this.reset_submodule_without_post();
    var div = el("spelling_level_header");
    div.innerHTML = "level=" + new_level;
}

// @beehack
var level_name_to_counter_value = {
    'egg': 1,
    'larva': 20,
    'pupa': 30,
    'drone': 40,
    'worker': 41,
    'warrior': 42,
    'queen': 43
}

// @beehack
Quiz.prototype.get_spelling_bee_level = function () {
    var output = this.user.get_spelling_bee_level();
    console.log("BEEHACK123 persistent level = ", output);
    // global_beehack_level_persistent = output;
    return output;
}


// @beehack
Quiz.prototype.get_initial_spelling_bee_counter = function () {
    console.log("BEEHACK123 entering quiz.get_initial_spelling_bee_counter");
    var output = this.user.get_initial_spelling_bee_counter();
    console.log("BEEHACK123 initial_bee_level from firebase = ", output);
    // global_beehack_level_persistent = output;
    return output;
}


Quiz.prototype.set_spelling_bee_counter = function (level) {
    // level = 66666;
    this.user.persist_spelling_bee_counter(level);
    // this.user.persist_spelling_bee_level(level);
}


Quiz.set_question_text = function(question){
    el("questionbox").innerHTML = question;
};

Quiz.wrap_string = function(tag) {
    return "<span class=\"tag_names\">" + tag + "</span>";
};

Quiz.prototype.set_word_selector = function(sentence){
    el("testbox").innerHTML = "";
    
    this.sentence = sentence;
    
    var word_sel_input = sentence.text ? sentence.text : sentence;

    var text_data = new Text(word_sel_input);
    text_data.setup();
    this.word_selector = new WordSelector("testbox", text_data);
    this.word_selector.setup();    
};

// todo new check that this works
Quiz.prototype.add_question_text = function(sentence){
    //console.log"DEBUG 9-29 sentence in set_word_selector", sentence);
    el("testbox").innerHTML = sentence;
    //console.logsentence.text);
    this.sentence = sentence;
};

Quiz.prototype.get_selected_region = function() {
    var answer_indices = this.word_selector.get_selected_indices();
    //console.log"answer_indices = ", answer_indices);
    return this.sentence.get_region(answer_indices);

};


Quiz.prototype.clean_up = function() {
    // This is a function so that we can add more cleaning-up stuff if needed.
    // The next two lines remove all cheat sheets.
    // remove_children(el('image_display_box'));
    
    // bugfix: clear text from image_display_box element
    // replaced this line:
    // remove_children(el('image_display_box'));
    // with this one:
    
    
    el('image_display_box').innerHTML = '';
    
    
    remove_children(el('vocab_cheat_sheet_div'));
    remove_children(el('etym_cheat_sheet_div'));
    remove_children(el('etym_cheat_sheet_div'));
    remove_children(el("spelling_hint_box"));
    
    // remove_children(el("spelling_hint_div"));
    // remove_children(el('image_display_box1'));
    el('cheat_sheet_button').onclick = this.initialize_cheat_sheet.bind(this);
    el('vocab_cheat_button').onclick = this.initialize_vocab_cheat_sheet.bind(this);
    
    
    
    // this seems to be bugging out
    el('etym_cheat_button').onclick = this.initialize_etym_cheat_sheet.bind(this);
    
    
    // @cleanup   below has been replaced by spelling_hint_button_master
    // el('spelling_hint_button').onclick = this.initialize_spelling_hint.bind(this);
    

    
    el('dash_hint_button').onclick = this.initialize_dash_hint.bind(this);
    
    

    
    //@GRIMES
    el('spelling_hint_button_master').onclick = this.initialize_spelling_hint_master.bind(this);
    
    
    
    // el('spelling_hint_button2').onclick = this.initialize_spelling_hint2.bind(this);
    
    // el("spelling_hint_button").onclick = this.initialize_spelling_hint.bind(this);


    //@GRIMES do we need to do these binding steps? they don't seem to work
    // el('spelling_hint_button1').onclick = this.initialize_spelling_hint_master.bind(this)
    // el('spelling_hint_button2').onclick = this.initialize_spelling_hint_master.bind(this)
    // el('spelling_hint_button3').onclick = this.initialize_spelling_hint_master.bind(this)
    
    
}


Quiz.prototype.get_cheat_sheet = function(mod_id) {
    var cheat_sheet = ALL_MODULES[mod_id].cheat_sheet;
    return cheat_sheet;
}

Quiz.prototype.get_cheat_sheet_image = function () {
    var mod = this.user.get_module_being_played();
    image = this.get_cheat_sheet(mod);
    return image;
}

Quiz.prototype.clear_cheat_sheet = function () {
    //quick hacky solution for the time being, we want vocabulary cheat sheet to be above any image based cheat sheet, so we'll throw it in the div "image_display_box1"
    // var div1 = el("image_display_box1");
    // div1.style.display = 'none';
    
    
    //image-cheat sheet is here
    var div = el("image_display_box");
    div.style.display = 'none';
}

Quiz.prototype.get_vocab_cheat_sheet_map = function () {
    return this.game.cheat_sheet || 'no cheat sheet for this mode';
};



// @GRIMES
// the final version
Quiz.prototype.initialize_spelling_hint_master = function () {
    
    
    // increment the counters
    
    global_hint_counter++;
    global_hint_alert_counter++;
    
    
    console.log("GRIMES666 hint master has been pressed");
    console.log("GRIMES666 global_hint_counter = ", global_hint_counter);
    console.log("GRIMES666 global_hint_alert_counter = ", global_hint_alert_counter);
    
    
    
    // manage the behavior of hint penalties
    
    var level_at_which_hints_inflict_a_penalty = 10;
    
    if (session_bee_counter > level_at_which_hints_inflict_a_penalty) {
        // reduce the progress bar slightly
    } else {
        // do nothing
    }
     
    
    // manage the behavior of alerts
    // ready to be implemented, just set the integer to whatever
    
    // must be greater than 4
    var maximum_number_of_spelling_hint_alerts = 5;
    
    
    if (session_bee_counter > level_at_which_hints_inflict_a_penalty) {
        if (global_hint_alert_counter === 1 || global_hint_alert_counter === 4) {
            alert("At this advanced level, a hint will cost you one point");
        } else if (global_hint_alert_counter === maximum_number_of_spelling_hint_alerts) {
            alert("You won't see this message anymore but remember that from here on, hints will cost you one point");
        } else if (global_hint_alert_counter > maximum_number_of_spelling_hint_alerts) {
            //do nothing
        }
    }
    
    
    // manage the appearance and function of the buttons
    
    if (global_hint_counter === 1) {
        el("spelling_hint_button_master").innerHTML = "another HINT";
    } else if (global_hint_counter === 2) {
        el("spelling_hint_button_master").innerHTML = "another HINT";
    } else if (global_hint_counter === 3) {
        el("spelling_hint_button_master").innerHTML = "no more HINTs";
        el("spelling_hint_button_master").disabled = true;
    } else if (global_hint_counter > 3) {
        // should never be reached
        // todo clean up into a real error catcher
        alert("global hint counter > 3");
    } else {
        // should never be reached
        // todo clean up into a real error catcher
        alert("global hint counter is null or zero");
    }
    
    
    
    // manage the behavior of the hint
    
    if (global_hint_counter === 1) {
        // a word question makes words bold on step 1
        if (this.game.chosen_question_type === "word_definition_to_word") {
            // console.log("GRIMES999 word 1 triggered");
            // this.initialize_spelling_hint_subfunction_bold();
            set_font_weight_of_class("embedded_root", "900");
            set_case_of_class("embedded_root", "uppercase");
        }
        // a root question skips the bold stage
        else if (this.game.chosen_question_type === "root_definition_to_root") {
            // console.log("GRIMES999 root 1 triggered");
            this.initialize_spelling_hint_master();
        } 
    }
    else if (global_hint_counter === 2) {
        // a word question makes words bold on step 1
        if (this.game.chosen_question_type === "word_definition_to_word") {
            // console.log("GRIMES999 word 2 triggered");
            this.display_etym_cheat_sheet();
        }
        // a root question skips the bold stage
        else if (this.game.chosen_question_type === "root_definition_to_root") {
            // console.log("GRIMES999 root 2 triggered");
            this.display_etym_cheat_sheet();
        } 
    } else if (global_hint_counter === 3) {
        if (this.game.chosen_question_type === "word_definition_to_word") {
            this.display_spelling_hint_underscore_or_first_letter();
        } else if (this.game.chosen_question_type === "root_definition_to_root") {
            this.display_spelling_hint_underscore_or_first_letter();
        }
    }
    
    
    
    
}


Quiz.prototype.display_etym_cheat_sheet = function () {
    
    var name = "etym_cheat_sheet"
    var etym_cheat = this.game.etymology_cheat_sheet;
    
    
    // @beehack
    // the mystery: <span ... etc. occurs on the html page
    // below is the short term removal
    // ideally we want the words to be able to be made bold in the cheat sheet as well


    console.log("SPANBUG entering problem area");
    
    var test_string = "to <span class=\"embedded_root\">shout</span> loudly";
    var test_output = test_string.replace("<span class=\"embedded_root\">", "");
    console.log("SPANBUG test_string = ", test_string);
    console.log("SPANBUG test_output = ", test_output);
    
    // todo why isn't this working when the identical function is called from string_utils.js?????
    var replace_all_substrings = function (string, substring, replacement) {
        return string.split(substring).join(replacement);
    };
    
    
    
    var new_list = [];
    for (var i = 0; i < etym_cheat.length; i++) {
        var sublist = etym_cheat[i];
        
        var new_sublist = [];
        
        
        for (var j = 0; j < sublist.length; j++) {
            var item = sublist[j];
            
            
            item = replace_all_substrings(item, "<span class=\"embedded_root\">", "");
            
            item = replace_all_substrings(item, "</span>", "");
            
            // item = sublist[j].replace("<span class=\"embedded_root\">", "");
            // console.log("SPANBUG item step 2 = ", item);
            // // item = item.replace("</span>", "");
            // console.log("SPANBUG item step 3 = ", item);
            new_sublist.push(item);
        }
        new_list.push(new_sublist);
    } 
    
    
    etym_cheat = new_list;
    
    
        
    
    
    
    back.log("this.game.etym_cheat_sheet stringified = ", 
        JSON.stringify(etym_cheat));
    
    var outer_div = el(name + "_div");
    
    create_cheat_sheet_table(outer_div, name, null, null, etym_cheat, 2);
}




Quiz.prototype.display_spelling_hint_underscore_or_first_letter = function () {
    back.log("display_spelling_hint_underscore_or_first_letter entered");
    
    var div_to_inspect = el('spelling_hint_box');
    
    // var spelling_hint_string = this.game.spelling_hint;
    
    
    
    var spelling_hint_string = this.game.spelling_hint;
    
    
    
    
    back.log("underscore_hint_output = ", spelling_hint_string);
    
    var div_string = 'spelling_hint_box'
    var div_name = el('spelling_hint_box');
    div_name.innerHTML = spelling_hint_string;
    
    // el('spelling_hint_button' + n).onclick = function () {quiz.toggle_element(div_string)};
};    
  







  
// end @GRIMES  
  
   
Quiz.prototype.initialize_dash_hint = function () {
    
    // todo see if something like this simple error catcher can work
    //(some games won't have a dash hint because they're not latin)
    // if (!this.game.make_dash_hint()) {
    //     console.log("PROBLEM: no dash hint for this game");
    //     return;
    // } 
    
    
    
    
    
    
    
    back.log("initialize_dash_hint entered");
    
    var div_to_inspect = el('dash_hint_box');
    
    
    var dash_hint_string;
    
    // todo improve the crude error detection
    if (this.game.dash_hint) {
        dash_hint_string = this.game.dash_hint;
    } else {
        dash_hint_string = "NO DASH HINT FOR THIS GAME";    
    }
    
    if (this.game.dash_hint) {
        dash_hint_list = this.game.dash_hint;
    } else {
        dash_hint_list = ["NO DASH HINT FOR THIS GAME"];    
    }
    
    
    back.log("dash_hint_string = ", dash_hint_string);
    back.log("dash_hint_list = ", dash_hint_list);
    
    //we first test A SIMPLE VERSION
    // SUMMARY: works but doesn't remove old hint, doesn't give new hint
    // simple because it doesn't use make, it just alters a pre-existing div
    // does this work??
    // yes this works but sometimes (seemingly more than usual)
    // it produces the full word
    var div_string = 'dash_hint_box'
    var div_name = el('dash_hint_box');
    div_name.innerHTML = "DASH REMOVAL RULES";
    
    var node = document.createElement("LI");
    

    for (var i = 0; i < dash_hint_list.length; i++) {
        // document.getElementById("id").appendChild(element);
        
        var textnode = document.createTextNode(dash_hint_list[i]);         // Create a text node
        node.appendChild(textnode);  
        var linebreak = document.createElement("br");
        node.appendChild(linebreak);
        // document.getElementById("dash_hint_box").appendChild(dash_hint_list[i]);
        // for some reason the below didn't work
        div_name.appendChild(node);
        // div_name.innerHTML = dash_hint_string[i];
    };
        

    
    
    
    //works
    // el('spelling_hint_button').onclick = function () {quiz.toggle_element('spelling_hint_div2')};
    // quiz.toggle_element takes as its argument a string, not the div
    el('dash_hint_button').onclick = function () {quiz.toggle_element(div_string)};
};    
     
    
Quiz.prototype.initialize_cheat_sheet = function() {
    // var button = el("cheat_sheet_button");
    // // var wrapper = el("cheat_sheet_wrapper");
    // // wrapper.src = "../resources/cheat_h.jpg";
    // document.createElement("div");
    // document.getElementById("cheat_sheet_wrapper").setAttribute("src", "../resources/cheat_h.jpg");
    
    // var box = el("image_display_box");
    // document.getElementById("image_display_box").appendChild("cheat_sheet_wrapper");
    
    
    // button.onclick = function() {
    //     var div = el("image_display_box");
    //     console.log("cheat sheet button clicked");
    //     if (div.style.display == 'none') {
    //         div.innerHTML = '<img src="'+ image_source +'" />'; 
    //         div.style.display = 'block';
    //     }
    //     else {
    //         div.style.display = 'none';
    //     }
    // };
    
    //button.onclick = function() {
    var name = 'cheat_sheet_image';
    var image_source = this.get_cheat_sheet_image();
    var div = make({'tag': 'div', 'id': name,
    'style': {'display': 'block'}}, el("image_display_box"));
    div.innerHTML = '<img src="'+ image_source +'" id=\'image_of_cheat_sheet\'/>';
    el('cheat_sheet_button').onclick = function () {quiz.toggle_element(name)};
    //};
};



Quiz.prototype.initialize_vocab_cheat_sheet = function () {
    var name = "vocab_cheat_sheet"
    var vocabulary_items = this.get_vocab_cheat_sheet_map();
    // var outer_div = el("image_display_box");
    var outer_div = el(name + "_div");
    // var e = el('vocab_cheat_sheet');
    
    // the arguments here are
    // o = outer div
    // table_id = nqme
    // classes = ['latin_cheat_sheet_item', 'english_cheat_sheet_item']
    // funcs = [latin_cheat_sheet_display, function (x) {
        // return [[x, {'font-style': 'italic'}]]}]
    // list_of_rows = vocabulary_items
    // items_per_row = 2
    create_cheat_sheet_table(outer_div, name,
    ['latin_cheat_sheet_item', 'english_cheat_sheet_item'],
    [latin_cheat_sheet_display, function (x) {
        return [[x, {'font-style': 'italic'}]]}], vocabulary_items, 2);
    /*
    make({'tag': 'table', 'id': 'vocab_cheat_sheet', 'style': {'display': 'block'}}, outer_div);
    var e = el('vocab_cheat_sheet');
    for (var i = 0; i < vocabulary_items.length; i++) {
        var latin_word = vocabulary_items[i][0];
        var english_word = vocabulary_items[i][1];
        var stem = latin_word.split('-')[0];
        var ending = latin_word.split('-')[1] ? '-' + latin_word.split('-')[1] : '';
        var row = make({'tag': 'tr'}, e);
        var latin_word_el = make({'tag': 'td', 'class': 'latin_cheat_sheet_item'}, row);
        make({'tag': 'b', 'text': stem, 'style' : {'font-weight': 'bold'}}, latin_word_el)
        make({'tag': 'b', 'text': ending, 'style' : {'font-size': '50%'}}, latin_word_el)
        make({'tag': 'td', 'class': 'english_cheat_sheet_item', 'style': {'font-style': 'italic'}, 'text': english_word}, row);
    };
    */
    el('vocab_cheat_button').onclick = function () {quiz.toggle_element(name)};
}

Quiz.prototype.initialize_etym_cheat_sheet = function () {
    
    // @beehack
    
    
    // var embedded_root = document.getElementsByClassName("embedded_root");
    
    // set_font_weight_of_class("embedded_root", "bold");
    // set_font_color_of_class("embedded_root", "red");
    set_font_weight_of_class("embedded_root", "900");
    set_case_of_class("embedded_root", "uppercase");
    
    // end beehack
    
    
    
    var name = "etym_cheat_sheet"
    var etym_cheat = this.game.etymology_cheat_sheet;
    
    
    // @beehack
    // the mystery: <span ... etc. occurs on the html page
    // below is the short term removal
    // ideally we want the words to be able to be made bold in the cheat sheet as well

    
    var new_list = [];
    for (var i = 0; i < etym_cheat.length; i++) {
        var sublist = etym_cheat[i];
        
        var new_sublist = [];
        
        
        for (var j = 0; j < sublist.length; j++) {
            var item = sublist[j].replace("<span class=\"embedded_root\">", "");
            item = item.replace("</span>", "");
            new_sublist.push(item);
        }
        new_list.push(new_sublist);
    } 
    
    
    etym_cheat = new_list;
    
    // console.log("this.game.etym_cheat_sheet stringified = ", 
    //     JSON.stringify(etym_cheat));
        
    
    //end beehack
        
    back.log("this.game.etym_cheat_sheet stringified = ", 
        JSON.stringify(etym_cheat));
    
    var outer_div = el(name + "_div");
    create_cheat_sheet_table(outer_div, name,
    null, null, etym_cheat, 2);
    el('etym_cheat_button').onclick = function () {quiz.toggle_element(name)};
}

// argument is a string
Quiz.prototype.toggle_element = function(id) {
    // var button = el("cheat_sheet_button");
    // // var wrapper = el("cheat_sheet_wrapper");
    // // wrapper.src = "../resources/cheat_h.jpg";
    // document.createElement("div");
    // document.getElementById("cheat_sheet_wrapper").setAttribute("src", "../resources/cheat_h.jpg");
    
    // var box = el("image_display_box");
    // document.getElementById("image_display_box").appendChild("cheat_sheet_wrapper");
    
    
    // button.onclick = function() {
    //     var div = el("image_display_box");
    //     console.log("cheat sheet button clicked");
    //     if (div.style.display == 'none') {
    //         div.innerHTML = '<img src="'+ image_source +'" />'; 
    //         div.style.display = 'block';
    //     }
    //     else {
    //         div.style.display = 'none';
    //     }
    // };
    
    //button.onclick = function() {
    // console.log('image display box = ', el("image_display_box"));
    
    
    var element = el(id);
    if (!element) {
        throw "no element with id: " + id;
    }
    if (element.style.display !== 'none') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
};

