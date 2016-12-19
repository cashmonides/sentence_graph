//submodule_progress = how close you are to getting from 5/10 to 6/10
//module_progress = 5/10 in kangaroo

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



process_slashes_bool = true;

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
    }
    
    
    //the following line tests the conditional
    if (!this.user.load(callback)) {
        el("header").appendChild(document.createTextNode("In Anonymous Session!"));
        el("return_to_profile_button").parentNode.removeChild(el("return_to_profile_button"));
        el("logout_button").innerHTML = "login";
        this.user_loaded();
    }
    
    
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

};

// This should quite possibly be done second.
Quiz.prototype.user_loaded = function() {
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
Quiz.prototype.get_start_module = function() {
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
    } else if ('bee%20' in ups) {
        back.log("ups triggered and bee entered");
        return this.user.get_spelling_training_module();
        // return this.user.get_current_module();
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




Quiz.prototype.next_module = function () {
    console.log("entering next_module");
    this.next_submodule();
};

Quiz.prototype.next_submodule = function() {
    //initializes a default
    this.submodule = {
        score: 0, 
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    
    this.initialize_accuracy_dictionary();
    
    if (!this.user.is_mf()) {
        this.next_submodule_not_mf();
    } else {
        this.next_submodule_mf();
    }
    this.next_question();
};

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
        debug.log("checkpoint 2.1 mode = ", mode);
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
        debug.log("checkpoint 2.5 Quiz.get_mode(game_mode_map[mode]) = ", Quiz.get_mode(game_mode_map[mode]));
        game = Quiz.get_mode(game_mode_map[mode]);
    }
    debug.log("checkpoint 3 game = ", game);
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
        default : throw "no game mode triggered";
    }
    
};





Quiz.prototype.next_question = function (error) {
    
    // @beehack
    if (this.module.id === 0.5) {
        set_display("set_spelling_bee_level_button", 'initial');
    }
    
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
    this.update_accuracy();
    
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
    
    
    //todo merge - below is a hacky way to stop bugs in week 1-2 of institute
    if (!this.user.is_mf()) {
        this.user.update_question_metrics(this.submodule.incorrect_streak, this.module.id);
        this.update_accuracy_dict();
    };
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
    console.log("[quiz.update_accuracy_dict] entering update_accuracy_dict");
    var mode_name = this.game.get_mode_name();
    console.log("[quiz.update_accuracy] mode_name = ", mode_name);
    var incorrect_streak = this.submodule.incorrect_streak;
    console.log("[quiz.update_accuracy] incorrect_streak = ", incorrect_streak);
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
Quiz.prototype.submodule_complete_without_post = function () {
    
    
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
    console.log("BEEHACK global_beehack_counter = ", global_beehack_counter);
    
    this.fill_lightbox_without_post(0.5, global_beehack_counter);
    
    el("fraction_header").innerHTML =  global_beehack_counter + "/100";
    
    
    var dummy_function = this.next_submodule.bind(this);
    
    set_display("next_level_button", 'initial');
    
    
    // el('next_level_button').onclick = this.next_question();
    el('next_level_button').onclick = dummy_function;
}
//end @beehack

Quiz.prototype.submodule_complete = function () {
    
    
    // @beehack
    // if we are in spelling bee mode
    // we want to bypass post so this much simple
    if (this.module.id === 0.5) {
        this.submodule_complete_without_post();
        return;
    }
    
    if (this.user.uid !== null) {
        console.log("[quiz.submodule_complete] entering post #2");
        console.log("[quiz.submodule_complete] accuracy dictionary raw  = ", this.accuracy_dictionary);
        console.log("[quiz.submodule_complete] accuracy dictionary converted = ", this.convert_accuracy_dict2());
        console.log("[quiz.submodule_complete] this.time_data = ", this.time_data);
        
        post({data: this.time_data_id, type: "update_time_data"});
        
        
        console.log("[quiz.submodule_complete] just finished update_time_data");
        
        console.log("[quiz.submodule_complete] about to enter update_accuracy_new");
        
        post({data: this.time_data_id, accuracy_dictionary: this.convert_accuracy_dict2(),
        type: "update_accuracy_new"});
        
        console.log("[quiz.submodule_complete] just finished update_accuracy_new");
        console.log("[quiz.submodule_complete] exiting post #2");
    } else {
        // The user was anonymous for the first post, so if this second post continued,
        // it would also fail.
        // bug.log("[quiz.submodule_complete] PROBLEM refusing post #2");
    }
    
    //we check if we are in advance or improving
    //advance mode returns current module
    //improving returns improving module
    var mod = this.user.get_module_being_played();
    
    console.log("[quiz.submodule_complete] mod being played = ", mod);
    
    var gotten_module = this.user.get_module(mod);
    
    console.log("[quiz.submodule_complete] gotten_module = ", gotten_module);
    
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
    
    
    console.log("[quiz.submodule_complete] about to make callback - should be null until submodule is complete");
    //callback is null when submodule is not yet complete
    var callback = this.user.submodule_complete(this.module.id);
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
    if (this.module.id === 0.5){
        // do nothing
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
Quiz.prototype.increment_score = function() {
    console.log("[quiz.increment_score] entering increment_score");
    console.log("[quiz.increment_score] this.get_reward = ", this.get_reward);
    
    if (!this.user.is_mf()) {
        this.progress_bar.change_number_correct(
            {'change_value': this.get_reward(),
                'time_from_start': new Date() - this.began});
        this.submodule.score += this.get_reward();
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





// @beehack
Quiz.prototype.set_spelling_bee_level_egg = function () {

    var output = {"etym_level": 10}
    
    this.game.set_level(output);
    global_beehack_new_level_set = true;
    global_beehack_level = output;
    
    
    this.next_question();
    var div = el("spelling_level_header");
    div.innerHTML = "level=EGG";
}


// @beehack
Quiz.prototype.set_spelling_bee_level_larva = function () {
    var output = {"etym_level": 40}
    
    this.game.set_level(output);
    global_beehack_new_level_set = true;
    global_beehack_level = output;
    this.next_question();
    var div = el("spelling_level_header");
    div.innerHTML = "level=LARVA";
}


// @beehack
Quiz.prototype.set_spelling_bee_level_pupa = function () {
    var output = {"etym_level": 80}
    
    this.game.set_level(output);
    global_beehack_new_level_set = true;
    global_beehack_level = output;
    this.next_question();
    var div = el("spelling_level_header");
    div.innerHTML = "level=PUPA";
}

// @beehack
Quiz.prototype.set_spelling_bee_level_drone = function () {
    var output = {"etym_level": 200}
    
    this.game.set_level(output);
    global_beehack_new_level_set = true;
    global_beehack_level = output;
    this.next_question();
    var div = el("spelling_level_header");
    div.innerHTML = "level=DRONE";
}



// @beehack
Quiz.prototype.set_spelling_bee_level_worker = function () {
    var output = {"etym_level": 300}
    
    this.game.set_level(output);
    global_beehack_new_level_set = true;
    global_beehack_level = output;
    this.next_question();
    var div = el("spelling_level_header");
    div.innerHTML = "level=WORKER";
}


// @beehack
Quiz.prototype.set_spelling_bee_level_warrior = function () {
    var output = {"etym_level": 400}
    
    this.game.set_level(output);
    global_beehack_new_level_set = true;
    global_beehack_level = output;
    this.next_question();
    var div = el("spelling_level_header");
    div.innerHTML = "level=WARRIOR";
}





// @beehack
Quiz.prototype.set_spelling_bee_level_queen = function () {
    var output = {"etym_level": 470}
    
    this.game.set_level(output);
    global_beehack_new_level_set = true;
    global_beehack_level = output;
    this.next_question();
    var div = el("spelling_level_header");
    div.innerHTML = "level=QUEEN";
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

Quiz.prototype.get_selected_region = function(){
    
    var answer_indices = this.word_selector.get_selected_indices();
    //console.log"answer_indices = ", answer_indices);
    return this.sentence.get_region(answer_indices);

};


Quiz.prototype.clean_up = function() {
    // This is a functiom so that we can add more cleaning-up stuff if needed.
    // The next two lines remove all cheat sheets.
    remove_children(el('image_display_box'));
    remove_children(el('vocab_cheat_sheet_div'));
    remove_children(el('etym_cheat_sheet_div'));
    remove_children(el('etym_cheat_sheet_div'));
    remove_children(el("spelling_hint_box"));
    
    // remove_children(el("spelling_hint_div"));
    // remove_children(el('image_display_box1'));
    el('cheat_sheet_button').onclick = this.initialize_cheat_sheet.bind(this);
    el('vocab_cheat_button').onclick = this.initialize_vocab_cheat_sheet.bind(this);
    el('etym_cheat_button').onclick = this.initialize_etym_cheat_sheet.bind(this);
    el('spelling_hint_button').onclick = this.initialize_spelling_hint.bind(this);
    el('dash_hint_button').onclick = this.initialize_dash_hint.bind(this);
    // el("spelling_hint_button").onclick = this.initialize_spelling_hint.bind(this);
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
 

 
 
//a more advanced version being developed
// goals:
// toggle, not just append
// catch errors
// make sure we're not giving the actual word itself
// make sure we're not producing multiple variations that give away the word
// e.g. pod_____y     & __iatry
Quiz.prototype.initialize_spelling_hint = function () {
    
    // todo see if something like this simple error catcher can work
    //(some games won't have a spelling hint because they're not spelling mode)
    // if (!this.game.make_spelling_hint()) {
    //     console.log("PROBLEM: no spelling hint for this game");
    //     return;
    // } 
    
    
    if (!this.module.submodule.spelling_hint_penalty) {
        // todo when spelling hint penalty is implemented, build a block of code here
        // bug.log("no spelling hint penalty specified");
    } else {
      if (this.module.submodule.spelling_hint_penalty != 0) {
        if (this.game.chosen_question_type == "root_definition_to_root") {
            alert("At this advanced level hints will cost you one point.");
            this.decrement_score_via_hint();
            }
        }  
    }
    
    
    
    
    
    
    back.log("initialize_spelling_hint entered");
    
    var div_to_inspect = el('spelling_hint_box');
    
    var spelling_hint_string = this.game.spelling_hint;
    
    
    console.log("[quiz.initialize_spelling_hint] hint_output = ", spelling_hint_string);
    
    //we first test A SIMPLE VERSION
    // SUMMARY: works but doesn't remove old hint, doesn't give new hint
    // simple because it doesn't use make, it just alters a pre-existing div
    // does this work??
    // yes this works but sometimes (seemingly more than usual)
    // it produces the full word
    var div_string = 'spelling_hint_box'
    var div_name = el('spelling_hint_box');
    div_name.innerHTML = spelling_hint_string;
    //works
    // el('spelling_hint_button').onclick = function () {quiz.toggle_element('spelling_hint_div2')};
    // quiz.toggle_element takes as its argument a string, not the div
    el('spelling_hint_button').onclick = function () {quiz.toggle_element(div_string)};
};    
   
   
   
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
    var name = "etym_cheat_sheet"
    var etym_cheat = this.game.etymology_cheat_sheet;
    
    back.log("this.game.etym_cheat_sheet stringified = ", 
        JSON.stringify(etym_cheat));
    
    // var outer_div = el("image_display_box");
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




