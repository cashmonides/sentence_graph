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
    
    this.time_data = null;
    
    
    //todo research internet explorer compatibility with set
    //is it a bad idea to have set since we can't iterate over it
    //old code:
    //this.sick_modes = new Set();
    this.sick_modes = [];
    
    // This will show images from future levels.
    this.urge_users_to_continue = true;
};



//loads user data
//loads sentences with callback next_module
Quiz.prototype.start = function(){
    this.user = new User();
   
   //todo
    //the following line both tests the conditional and actually loads the data
    if (!this.user.load(this.user_loaded.bind(this))) {
        el("header").appendChild(document.createTextNode("In Anonymous Session!"));
        el("return_to_profile_button").parentNode.removeChild(el("return_to_profile_button"));
        el("logout_button").innerHTML = "login";
        this.user_loaded();
    }
    
    // This is new, and seems a little hacky.
    this.user.quiz = this;
    
    var self = this;
    Sentence.get_all_sentences(function(ss){
        self.sentences = ss;
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
            alert("Go back to profile and start again");
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

Quiz.prototype.next_submodule = function(){
    //initializes a default
    this.submodule = {
        score: 0, 
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    

    
    
    
    
    
    
    /*
    
    
    every time a submodule is started:
    
    
    step 1)
    create a row:
    user_id, module_id, submodule_id, start_time, stop_time
    (with stop_time as null)
    
    step 2)
    save data as a state: quiz.time_data [user_id, module_id, submodule_id, start_time]
    
    
    
    every time a submodule is completed:
    step 1)
    update stop_time in the following row:
    user_id, module_id, submodule_id, quiz.start_time, null
    step 2)
    clear quiz.start_time
    
    */
    
    
    
    
    
    
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
    
    
    
    this.time_data = [this.user.uid, this.module.id, submodule_id, start_time, null];
    
    
    console.log("DEBUG 1-22 this.time_data = ", this.time_data);
    
    
    console.log("DEBUG 1-22 entering post");
    
    //no callback because we don't need one
    post({data: this.time_data, type: "insert_time_data"});
    //todo maybe a good idea later to add an urgent error log
    
    console.log("DEBUG 1-22 exiting post");
    
    console.log("DEBUG 1-22 log start time passed");
    
    
    
    
    
    this.next_question();
};

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
        log_urgent_error("all modes are sick", "quiz.next_mode");
        throw "modes exhausted";
    }
    
    
    var mode = weighted(allowed);
    var game = Quiz.get_mode(game_mode_map[mode]);
    this.game = game;
    //todo understand the following
    this.game.quiz = this;
    this.game.attach();
};

Quiz.get_mode = function(mode_number) {
    switch(mode_number) {
        case 0 : return new DropModeGame();
        case 1 : return new MCMode3Game();
        case 2 : return new QuickModeGame();
        case 3 : return new GenericDropGame();
        case 4 : return new EtymologyModeGame();
        default : throw "no game mode triggered";
    }
    
};



Quiz.prototype.next_question = function (){
    //todo make sure to uncomment this except when necessary (nuclear option)
    // Persist.clear_node(["urgent_log"]);
    
    // Persist.clear_node(["users"]);
    
    
    
    
    console.log('DEBUG 12-23 entering next_question')
    //previously:
    // this.next_mode();
    // this.game.next_question(this);
    try {
        console.log('DEBUG 12-23 entering try block')
        this.clean_up();
        this.next_mode();
        this.game.next_question(this);
        console.log('DEBUG 12-23 no error, everything is fine')
    } catch (e) {
        console.log("DEBUG 12-23 entering catch block error caught");
        
        //todo out of desperation, commented this out
        
        // Originally: add not push
        var sick_mode = this.game.get_mode_name();
        //only push if it's not in our list already
        if (this.sick_modes.indexOf(sick_mode) === -1) {this.sick_modes.push(sick_mode)};
        log_urgent_error(e.toString(), "quiz.next_question", "sick mode = " + sick_mode 
        + " module = " + this.module.id + " progress = " +
        this.user.get_module(this.module.id).progress + "/" +
        this.module.threshold + " level = " + this.game.level);
        
        console.log("URGENT error logged");
        console.log("desperate move triggered");
        
        if (e != "modes exhausted") {
            console.log("DEBUG 12-23 error handler initiated");
            this.next_question();
        }
    }
};


Quiz.prototype.question_complete = function(){
    
    if (this.submodule.score >= this.module.submodule.threshold) {
        this.submodule_complete();
    } else {
        this.next_question();
    }
};




Quiz.prototype.submodule_complete = function () {
    console.log('this.advance_improve_status =', this.advance_improve_status);
    //the module_id (int) - a variable used a lot below by a number of functions
    if (this.advance_improve_status === 'advancing') {
        var mod = this.user.get_current_module(this.module.id);
    } else {
        var mod = this.user.get_improving_module(this.module.id);
    }
    
    var submodule_number = this.user.get_module(mod).progress;
    
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
    this.old_progress_bars.forEach(function (x) {remove_element(x.progress_bar)});
    this.user.add_progress_bar(this.progress_bar.past_events, this.module.id);
    
    
    
    //setting up lightbox
    var numerator = this.user.get_module(mod).progress;
    
    var denominator = ALL_MODULES[mod].threshold;
    // console.log("DEBUG 11-16 mod = ", mod);
    // console.log("DEBUG 11-16 numerator = ", numerator);
    // console.log("DEBUG 11-16 threshold = ", denominator);
        
    
    // console.log("DEBUGGING entering problem lightbox area 11-19");
    var callback = this.user.submodule_complete(this.module.id);
    if (callback) {
        if (this.advance_improve_status === 'improving') {
            callback();
        } else {
            console.log("DEBUG 11-16 user.submodule_complete is true");
            this.module = ALL_MODULES[this.user.get_current_module()];
            
            console.log("DEBUGGING LIGHTBOX: you've beaten this level");
            if (this.urge_users_to_continue) {
                this.fill_lightbox("YOU'VE BEATEN THIS LEVEL! EXCELSIOR!! GET READY TO CONQUER:", 1, 0);
            } else {
                this.fill_lightbox("YOU'VE BEATEN THIS LEVEL! EXCELSIOR!!");
            }
            $.featherlight($('#pop_up_div'), {afterClose: callback});
        }
    } else {
        console.log("DEBUG 11-16 user.submodule_complete is false");
        //todo put following into function (encapsulation and information hiding)
        //todo make this less hacky
        //console.log("DEBUGGING LIGHTBOX: YOUR PROGRESS IS:", (numerator + 1) + "/" + denominator);
        this.fill_lightbox("YOUR PROGRESS IS: " + (numerator + 1) + "/" + denominator);
        $.featherlight($('#pop_up_div'), {afterClose: this.next_submodule.bind(this)});
    }
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
        console.log("DEBUG 1-13 image_list = ", image_list);
        console.log("DEBUG 1-13 entering image picking");
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
        
        console.log("DEBUG 1-13 index = ", index);
        var image = image_list[index];
    } else {
        console.log('image list does not exist');
        var image = null;
    }
    console.log('image =', image);
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
    
    el('pop_up_div').innerHTML = "CONGRATULATIONS " + name + "!<br>" + text + image;
};



Quiz.pick_question_data = function(sentence, region_filter, tag_filter){
    var available_tags = sentence.get_all_tag_types(region_filter, tag_filter);
    var a = array_from(available_tags);
    if (a.length === 0) {
        throw new Error("no tags are available!");
    } else {
        console.log('All is fine, and the number of available tags is', a.length);
    }
    console.log('available_tags, a =', available_tags, a);
    var target_tag = random_choice(a);
    
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



Quiz.prototype.increment_score = function() {
    this.progress_bar.change_number_correct(
        {'change_value': this.module.submodule.reward,
            'time_from_start': new Date() - this.began});
    this.submodule.score += this.module.submodule.reward;
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
    // This line removes all cheat sheets.
    remove_children(el('image_display_box'));
    el('cheat_sheet_button').onclick = this.initialize_cheat_sheet.bind(this);
    el('vocab_cheat_button').onclick = this.initialize_vocab_cheat_sheet.bind(this);
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
    var div = el("image_display_box");
    console.log("cheat sheet cleared");
    div.style.display = 'none';
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
    var image_source = this.get_cheat_sheet_image();
    var div = make({'tag': 'div', 'id': 'image_cheat_sheet',
    'style': {'display': 'block'}}, el("image_display_box"));
    div.innerHTML = '<img src="'+ image_source +'" />';
    // console.log("cheat sheet button clicked");
    el('cheat_sheet_button').onclick = function () {quiz.toggle_element('image_cheat_sheet')};
    //};
    
};

Quiz.prototype.initialize_vocab_cheat_sheet = function () {
    var vocab_cheat_sheet_map = this.get_vocab_cheat_sheet_map();
    var outer_div = el("image_display_box");
    make({'tag': 'table', 'id': 'vocab_cheat_sheet', 'style': {'display': 'block'}}, outer_div);
    var e = el('vocab_cheat_sheet');
    var vocabulary_items = Object.keys(vocab_cheat_sheet_map);
    
    for (var i = 0; i < vocabulary_items.length; i++) {
        var latin_word = vocabulary_items[i];
        var english_word = vocab_cheat_sheet_map[latin_word];
        var stem = latin_word.split('-')[0];
        var ending = latin_word.split('-')[1] ? '-' + latin_word.split('-')[1] : '';
        var row = make({'tag': 'tr'}, e);
        var latin_word_el = make({'tag': 'td', 'class': 'latin_cheat_sheet_item'}, row);
        make({'tag': 'b', 'text': stem, 'style' : {'font-weight': 'bold'}}, latin_word_el)
        make({'tag': 'b', 'text': ending, 'style' : {'font-size': '50%'}}, latin_word_el)
        make({'tag': 'td', 'class': 'english_cheat_sheet_item', 'style': {'font-style': 'italic'}, 'text': english_word}, row);
    };
    el('vocab_cheat_button').onclick = function () {quiz.toggle_element('vocab_cheat_sheet')};
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
    
    var element = el(id);
    console.log("cheat sheet button clicked");
    if (element.style.display !== 'none') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
    //};
};


//todo wasn't working as Quiz.logout_from_quiz

function logout_from_quiz() {
    document.location = "..";
}

function return_to_profile() {
    document.location = "../profile/";
}



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


