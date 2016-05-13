//submodule_progress = how close you are to getting from 5/10 to 6/10
//module_progress = 5/10 in kangaroo


var quiz = null;


window.onload = start;

// window.onbeforeunload = function () {
//     alert("window close triggered");
//     user_data.logout()
// };

function start(){
    // bootstrap sidebar
    // $("#menu-toggle").click(function(e) {
    //     e.preventDefault();
    //     $("#wrapper").toggleClass("toggled");
    // });
    
    quiz = new Quiz();
    quiz.start();
}


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
Quiz.prototype.start = function(){
    var self = this;
    this.user = new User();
    
    el('logout_button').onclick = function (x) {
        self.user.logout();
        return_to_login();
        // setTimeout(return_to_login, 10000);
    }
   //todo
    //the following line both tests the conditional and actually loads the data
    if (!this.user.load(this.user_loaded.bind(this))) {
        el("header").appendChild(document.createTextNode("In Anonymous Session!"));
        el("return_to_profile_button").parentNode.removeChild(el("return_to_profile_button"));
        el("logout_button").innerHTML = "login";
        this.user_loaded();
    }
    // this.module = ALL_MODULES[this.get_start_module()];
    // This is new, and seems a little hacky.
    this.user.quiz = this;
    
    Sentence.get_all_sentences(function (ss) {
        self.sentences = ss.filter(function (sentence) {
            var language = sentence.language_of_sentence;
            var sentence_levels = self.module.sentence_levels;
            return language in sentence_levels &&
            sentence.difficulty_level <= sentence_levels[language];
        });
        self.next_module();
    });

};

Quiz.prototype.user_loaded = function(){
    // console.log("DEBUG 11-7 entering user_loaded = ");
    //todo var id will change depending on url parameters (given by profile page)
    var id = this.get_start_module();   //gets lowest uncompleted level (ADVANCE) or improving via url paramaters
    
    console.log("DEBUG 11-20 user_loaded id = ", id);
    
    this.module = ALL_MODULES[id];
    
    console.log("DEBUG 11-20 user_loaded this.module = ", this.module);
    
    
    this.user.start_module(id);
    
    // console.log("current module:", this.module);
};

//decides whether we go to current or some other module determined at profile page
Quiz.prototype.get_start_module = function(){
    console.log("DEBUG 11-22 get_start_module entered");
    //todo
    //if (improving)
    var ups = get_url_parameters();
    console.log("quiz url parameters:", ups);
    
    
    console.log("DEBUG 11-23 current module = ", this.user.get_current_module());
    
    if("mod" in ups){
        var selected_mod = ups["mod"];
        console.log("DEBUG 11-23 selected mod = ", selected_mod);
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
        return ups["mod"];
    } else {
        console.log('DEBUG 1-18 mod not in parameters');
        this.advance_improve_status = "advancing";
        console.log("DEBUG 11-22 advance/improve status = ", this.advance_improve_status);
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
    console.log("DEBUG 11-15 next_module entered");
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
    console.log("current module:", this.module);
    // This isn't really helpful
    // console.log("current level:", this.module.level);
    //todo below is old, make sure new version works (in next_question)
    // this.game.set_level(this.module.level);
    //todo important - I commented this out, not sure if it breaks anything - it seems to not do anything
    // console.log('this.game.level = ', this.game.level)
    // todo new ends here
    // this.clear_cheat_sheet();
    
    console.log("DEBUG 1-22 entering log start time");
    
    var start_time =  "test_string_for_start_time"; //new Date();
    
    
    var submodule_id = this.user.get_module(this.module.id).progress;
    
    console.log("DEBUG 1-22 user_id = ", this.user.uid);
    console.log("DEBUG 1-22 module_id = ", this.module.id);
    console.log("DEBUG 1-22 submodule_id = ", submodule_id);
    console.log("DEBUG 1-22 start_time = ", start_time);
    
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
    
    console.log(this.time_data);
    
    
    this.initialize_time_metrics();
    
    this.next_question();
};

Quiz.prototype.initialize_time_metrics = function () {
    var time_data = this.time_data;
    console.log("DEBUG 2-11 entering post #1");
    console.log("DEBUG 2-11 this.time_data = ", time_data);
    
    // todo very important - comment back in when fixed
    
    // used to be: no callback because we don't need one
    // now we need a callback because we're getting a piece of data coming back to us
    // also: 3/27 deleted null_string: list_of_repetitions("null", 17).join(', ')
    if (this.user.uid !== null) {
        console.log('DEBUG 3/4/2016 this.user.uid !== null; about to post');
        var self = this;
        post({data: time_data, type: "insert_time_data"}, function (data) {
            console.log("DEBUG 2-11 data = ", data);
            self.time_data_id = data.id;
        });
    } else {
        console.log('DEBUG 3/4/2016 this.user.uid === null; post refused');
    }
    // todo maybe a good idea later to add an urgent error log here
    
    console.log("DEBUG 2-11 exiting post #1");
}

Quiz.prototype.get_modes = function () {
    return Object.keys(ALL_MODULES[this.module.id].mode_ratio);
}

Quiz.prototype.next_mode = function(){
    console.log("DEBUG 11-28 entering next_mode");
    var allowed = ALL_MODULES[this.module.id].mode_ratio;
    
    console.log("DEBUG 12-23 allowed before = ", allowed);
    
    /*
    originally:
    for (var i in this.sick_modes) {
        delete allowed[i];
    }
    */
    
    for (var i = 0; i < this.sick_modes.length; i++) {
        console.log('sick mode being added = ', this.sick_modes[i])
        delete allowed[this.sick_modes[i]];
        console.log("DEBUG 12-23 sick mode added");
        console.log("DEBUG 12-23 allowed after = ", allowed);
    }
    
    
    if (Object.keys(allowed).length <= 0) {
        console.log("DEBUG 12-23 all modes are sick");
        if (this.urgent_error_count < 5) {
             log_urgent_error("all modes are sick", "quiz.next_mode");
             this.urgent_error_count++;
        }
        throw "modes exhausted";
    }
    
    console.log("DEBUG 5-6 checkpoint 1");
    var mode = weighted(allowed);
    console.log("DEBUG 5-6 checkpoint 2 mode = ", mode);
    console.log("DEBUG 5-6 game_mode_map[mode] = ", game_mode_map[mode]);
    var game = Quiz.get_mode(game_mode_map[mode]);
    console.log("DEBUG 5-6 checkpoint 3 game = ", game);
    this.game = game;
    console.log("DEBUG 5-6 checkpoint 4 this.game = ", this.game);
    
    //todo understand the following
    this.game.quiz = this;
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
        default : throw "no game mode triggered";
    }
    
};



Quiz.prototype.next_question = function (){
    // todo make sure to uncomment this except when necessary (nuclear option)
    // Persist.clear_node(["xxx"]);     put urgent_log  where it says xxx
    
    // Persist.clear_node(["xxx"]);   put users where it says xxx
    
    //todo xxx hack this was a hack, remove 
    el('image_display_box').innerHTML = '';
    
    
    console.log('DEBUG 12-23 entering next_question')
    //previously:
    // this.next_mode();
    // this.game.next_question(this);
    try {
        console.log('DEBUG 12-23 entering try block')
        this.clean_up();
        this.next_mode();
        console.log('still OK, about to call next_question');
        this.game.next_question(this);
        console.log('DEBUG 12-23 no error, everything is fine')
    } catch (e) {
        console.log("DEBUG 12-23 entering catch block error caught");
        
        //todo out of desperation, commented this out
        
        console.log("DEBUG 5-6 this.game = ", this.game);
        // Originally: add not push
        var sick_mode = this.game.get_mode_name();
        //only push if it's not in our list already
        if (this.sick_modes.indexOf(sick_mode) === -1) {this.sick_modes.push(sick_mode)};
        if (this.urgent_error_count < 5) {
            log_urgent_error(e.toString(), "quiz.next_question", "sick mode = " + sick_mode 
            + " module = " + this.module.id + " progress = " +
            this.user.get_module(this.module.id).progress + "/" +
            this.module.threshold + " level = " + this.game.level);
            this.urgent_error_count++;
        }
        
        console.log("URGENT error logged");
        console.log("desperate move triggered");
        
        if (e !== "modes exhausted") {
            console.log("DEBUG 12-23 error handler initiated");
            this.next_question();
        }
    }
};


Quiz.prototype.question_complete = function () {
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
        console.log("DEBUG 4-9 quiz.next_question triggered");
        this.next_question();
    }
};


Quiz.prototype.update_accuracy = function () {
    this.user.update_question_metrics(this.submodule.incorrect_streak, this.module.id);
    this.update_accuracy_dict();
}

Quiz.prototype.update_sentence_log = function (question, chapter, status) {
    this.user.log_sentences(question, chapter, status);
}


Quiz.prototype.log_skipped_question = function () {
    var current_question = this.game.get_current_question();
    var current_chapter = this.game.get_current_chapter();
    this.update_sentence_log(current_chapter, current_question, "skipped");
}

Quiz.prototype.update_accuracy_dict = function () {
    var mode_name = this.game.get_mode_name();
    console.log("DEBUG 4-9 mode_name = ", mode_name);
    var incorrect_streak = this.submodule.incorrect_streak;
    console.log("DEBUG 4-9 incorrect_streak = ", incorrect_streak);
    this.accuracy_dictionary[mode_name][incorrect_streak]++;
    console.log('accuracy dict', incorrect_streak, this.accuracy_dictionary,
    this.convert_accuracy_dict());
}

/*
Obsolete now.
Quiz.prototype.convert_accuracy_dict = function () {
    var csv_list;
    var result = {};
    for (var i in this.accuracy_dictionary) {
        csv_list = [];
        for (var j = 0; j < 4; j++) {
            csv_list.push(this.accuracy_dictionary[i][j]);
        }
        result[i] = csv_list.join('-');
    };
    return result;
}
*/


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


Quiz.prototype.submodule_complete = function () {
    console.log('this.advance_improve_status =', this.advance_improve_status);
    if (this.user.uid !== null) {
        /*
        var accuracy_list = [];
        for (var i = 0; i <= 3; i++) {
            accuracy_list.push(this.accuracy_dictionary[i]);
        }
        */
        console.log("DEBUG 2-11 entering post #2");
        console.log("DEBUG 3-4 accuracy dictionary original (raw) = ", this.accuracy_dictionary);
        // console.log("DEBUG 3-26 accuracy dictionary converted 1 (old) = ", this.convert_accuracy_dict());
        console.log("DEBUG 3-26 accuracy dictionary converted new = ", this.convert_accuracy_dict2());
        console.log("DEBUG 2-11 this.time_data = ", this.time_data);
        post({data: this.time_data_id, type: "update_time_data"});
        console.log("DEBUG 3-4 just finished update_time_data");
        /*
        post({data: this.time_data_id, accuracy_dictionary: this.convert_accuracy_dict(),
        type: "update_accuracy_old"});
        console.log("DEBUG 3-2 just finished update_accuracy_old");
        */
        console.log("DEBUG 3-26 about to enter update_accuracy_new");
        post({data: this.time_data_id, accuracy_dictionary: this.convert_accuracy_dict2(),
        type: "update_accuracy_new"});
        console.log("DEBUG 3-4 just finished update_accuracy_new");
        console.log("DEBUG 2-11 exiting post #2");
    } else {
        // The user was anonymous for the first post, so if this second post continued,
        // it would also fail.
        console.log("DEBUG 3/4/2016AD refusing post #2");
    }
    
    if (this.advance_improve_status === 'advancing') {
        var mod = this.user.get_current_module(this.module.id);
    } else {
        var mod = this.user.get_improving_module(this.module.id);
    }
    
    var submodule_id = this.user.get_module(mod).progress;
    
    //logging the stop time
    // console.log("DEBUG 12-28 submodule_complete, about to call log_submodule_stop_time");
    // console.log("DEBUG 12-28 module_id =", mod);
    // console.log("DEBUG 12-28 submodule_number =", submodule_number);
    // //todo 12-30 akiva moved this to a method in user
    // // this.user.log_submodule_stop_time(mod, submodule_number);
    // console.log("DEBUG 12-28 log stop time passed");
    
    //progress bar
    console.log("DEBUG 11-16 quiz.submodule_complete entered");
    console.log("DEBUG 12-27 this.user.get_module(mod) = ", this.user.get_module(mod));
    // this.old_progress_bars.forEach(function (x) {remove_element(x.progress_bar)});
    // this.user.add_progress_bar(this.progress_bar.past_events, this.module.id);
    
    
    
    //setting up lightbox
    var numerator = this.user.get_module(mod).progress;
    
    var denominator = ALL_MODULES[mod].threshold;
    // console.log("DEBUG 11-16 mod = ", mod);
    // console.log("DEBUG 11-16 numerator = ", numerator);
    // console.log("DEBUG 11-16 threshold = ", denominator);
        
    
    // console.log("DEBUGGING entering problem lightbox area 11-19");
    
    
    console.log("DEBUG 5-12 about to make callback - should be null until submodule is complete");
    //callback is null when submodule is not yet complete
    var callback = this.user.submodule_complete(this.module.id);
    console.log("DEBUG 5-12 callback = ", callback);
    
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
            console.log("DEBUG 11-16 user.submodule_complete is true");
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
        console.log("DEBUG 11-16 user.submodule_complete is false");
        //todo put following into function (encapsulation and information hiding)
        //todo make this less hacky
        this.fill_lightbox("YOUR PROGRESS IS: " + (numerator + 1) + "/" + denominator);
        new_callback = this.next_submodule.bind(this);
        //el('next_level_button').onclick = this.next_submodule.bind(this);
        // $.featherlight($('#pop_up_div'), {afterClose: this.next_submodule.bind(this)});
    }
    set_display("next_level_button", 'initial');
    el('next_level_button').onclick = new_callback;
};




Quiz.prototype.update_display = function() {
    
    console.log("DEBUG 11-15 update_display entered");
    console.log("DEBUG 11-24 this.user.data.profile.name = ", this.user.data.profile.name);
    console.log("DEBUG 11-24 this.user.data.profile.class_number = ", this.user.data.profile.class_number);
    console.log("DEBUG 11-24 this.module.id = ", this.module.id);
    //todo in improve mode the following will break
    // var mod = this.user.get_current_module();
    
    var mod = this.module.id;
    var module_icon = ALL_MODULES[mod].icon_url;
    //todo uncomment when testing
    var module_name = ALL_MODULES[mod].icon_name;
    // console.log("DEBUG 11-8 mod = ", mod);
    // console.log("DEBUG 11-8 this.user.mod.progress = ", this.user.get_module(mod).progress);
    /*Progress bar is reset somewhere else.
    console.log("Still ok before progress bar");
    this.set_progress_bar();
    console.log("Still ok after progress bar");*/
    
    console.log("Still ok before innerhtml");
    console.log(el("name_header") === null);
    console.log(el("class_header") === null);
    console.log(el("level_header") === null);
    console.log(el("fraction_header") === null);
    el("name_header").innerHTML = this.user.data.profile.name;
    el("class_header").innerHTML = this.user.data.profile.class_number;
    el("level_header").innerHTML = "<img src=" + module_icon + ">";
    el("fraction_header").innerHTML = module_name + ": " + this.user.get_module(mod).progress + "/" + this.module.threshold;
    
    console.log("Still ok after innerhtml");
    
    
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
    console.log("quiz.process_answer triggered");
    this.game.process_answer(this);
};


Quiz.prototype.get_lightbox_image = function(mod_id, progress) {
    var image_list = ALL_MODULES[mod_id].lightbox_images;
    if (image_list) {
        console.log("DEBUG 5-12 image_list = ", image_list);
        console.log("DEBUG 5-12 entering image picking");
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
        
        console.log("DEBUG 5-12 index = ", index);
        var image = image_list[index];
    } else {
        console.log('image list does not exist');
        var image = null;
    }
    console.log('DEBUG 5-12 ')
    console.log('DEBUG 5-12 image =', image);
    return image;
}


Quiz.prototype.process_lightbox_image = function (offset, progress) {
    //todo 1-17 following is Akiva's additions, check if OK
    var mod;
    if (this.advance_improve_status === "advancing") {
        mod = this.user.get_current_module();
        console.log("DEBUG 1-17 advancing status triggered, mod = ", mod);
    } else if (this.advance_improve_status === "improving") {
        mod = this.user.get_improving_module();
        console.log("DEBUG 1-17 improving status triggered, mod = ", mod);
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
    
    el('image_display_box').innerHTML = "CONGRATULATIONS " + name + "!<br>" + text + image;
};



Quiz.pick_question_data = function(sentence, region_filter, tag_filter){
    var available_tags = sentence.get_all_tag_types(region_filter, tag_filter);
    if (available_tags.length === 0) {
        throw new Error("no tags are available in the sentence "
        + sentence.text + "!");
    } else {
        console.log('All is fine, and the number of available tags is',
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



Quiz.prototype.increment_score = function() {
    this.progress_bar.change_number_correct(
        {'change_value': this.get_reward(),
            'time_from_start': new Date() - this.began});
    this.submodule.score += this.get_reward();
};


Quiz.prototype.decrement_score = function() {
    this.progress_bar.change_number_correct(
        {'change_value': -this.module.submodule.penalty,
            'time_from_start': new Date() - this.began});
    this.submodule.score -= this.module.submodule.penalty;
    this.submodule.score = Math.max(0, this.submodule.score);
};






Quiz.set_question_text = function(question){
    el("questionbox").innerHTML = question;
};

Quiz.wrap_string = function(tag) {
    return "<span class=\"tag_names\">" + tag + "</span>";
};

Quiz.prototype.set_word_selector = function(sentence){
    
    //console.log"DEBUG 9-29 sentence in set_word_selector", sentence);
    el("testbox").innerHTML = "";
    //console.logsentence.text);
    this.sentence = sentence;
    //todo changes here
    
    var word_sel_input = sentence.text ? sentence.text : sentence;

    var text_data = new Text(word_sel_input);
    text_data.setup();
    this.word_selector = new WordSelector("testbox", text_data);
    this.word_selector.setup();    
    
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
    // remove_children(el('image_display_box1'));
    el('cheat_sheet_button').onclick = this.initialize_cheat_sheet.bind(this);
    el('vocab_cheat_button').onclick = this.initialize_vocab_cheat_sheet.bind(this);
    el('etym_cheat_button').onclick = this.initialize_etym_cheat_sheet.bind(this);
}


Quiz.prototype.get_cheat_sheet = function(mod_id) {
    var cheat_sheet = ALL_MODULES[mod_id].cheat_sheet;
    return cheat_sheet;
}

Quiz.prototype.get_cheat_sheet_image = function () {
    var mod;
    
    if (this.advance_improve_status === "advancing") {
        mod = this.user.get_current_module();
    } else if (this.advance_improve_status === "improving") {
        mod = this.user.get_improving_module();
    }
    
    console.log("DEBUG 11-23 advance/improve status = ", this.advance_improve_status);
    console.log("DEBUG 11-23 mod = ", mod);
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
    
    console.log("cheat sheet cleared");
    
    
}

Quiz.prototype.get_vocab_cheat_sheet_map = function () {
    /*var map = {};
    
    //todo uncomment when done testing
    map["noun"] = {
        "CUCULLUS" : "cuckoo",
        "DRACO" : "dragon"
    };
    map["verb"] = {
        "VOR" : "love",
        "PORT" : "carry"
    };
    return map*/
    
    return this.game.cheat_sheet || 'no cheat sheet for this mode';
}
    
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
    // console.log("cheat sheet button clicked");
    el('cheat_sheet_button').onclick = function () {quiz.toggle_element(name)};
    //};
    
};

Quiz.prototype.initialize_vocab_cheat_sheet = function () {
    var name = "vocab_cheat_sheet"
    var vocabulary_items = this.get_vocab_cheat_sheet_map();
    // var outer_div = el("image_display_box");
    var outer_div = el(name + "_div");
    // var e = el('vocab_cheat_sheet');
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
    // var outer_div = el("image_display_box");
    var outer_div = el(name + "_div");
    create_cheat_sheet_table(outer_div, name,
    null, null, etym_cheat, 2);
    el('etym_cheat_button').onclick = function () {quiz.toggle_element(name)};
}

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
    console.log('image display box = ', el("image_display_box"));
    
    console.log("DEBUG 2-6 ID in toggle_element = ", id);
    var element = el(id);
    if (!element) {
        throw "no cheat sheet with name " + id;
    }
    console.log("cheat sheet button clicked");
    if (element.style.display !== 'none') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
    //};
};



//todo some of the global functions below are hacky and need to be integrated





// function process_answer_hack () {
//     // alert("process_answer_hack triggered");
//     // alert(Quiz.process_answer) = undefined
//     // alert(Quiz.game); = undefined
//     // alert(Quiz) = function with default properties (null)
//     // alert(MCMode3game.process_answer)  = MCMode3game is not defined
//     alert(this);
//     console.log(this);
    
// }


