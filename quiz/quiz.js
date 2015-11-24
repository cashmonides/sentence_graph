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
    
};



//loads user data
//loads sentences with callback next_module
Quiz.prototype.start = function(){
    this.user = new User();
   
   //todo
    //the following line both tests the conditional and actually loads the data
    if (!this.user.load(this.user_loaded.bind(this))) {
        el("header").innerHTML = "In Anonymous Session!";
        //  + " Click " + "<a href=\"https://sentence-graph-cashmonides.c9.io/lib/login/login.html\">here</a>" + " to login or create an account";
    }
    
    var self = this;
    Sentence.get_all_sentences(function(ss){
        self.sentences = ss;
        self.next_module();
    });

};



//decides whether we go to current or some other module determined at profile page
Quiz.prototype.get_start_module = function(){
    console.log("DEBUG 11-22 get_start_module entered");
    //todo
    //if (improving)
    var ups = get_url_parameters();
    console.log("quiz url parameters:", ups);
    var selected_mod = ups["mod"];
    console.log("DEBUG 11-23 mod = ", selected_mod);
    console.log("DEBUG 11-23 current module = ", this.user.get_current_module());
    
    if("mod" in ups){
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
    this.next_mode();
    // todo new begins here
    console.log("current module:", this.module);
    console.log("current level:", this.module.level);
    this.game.set_level(this.module.level);
    console.log('this.game.level = ', this.game.level)
    // todo new ends here
    this.next_question();
};

Quiz.prototype.next_mode = function(){
    var allowed = ALL_MODULES[this.module.id].modes_allowed;
    var mode = random_choice(allowed);
    var game = Quiz.get_mode(mode);
    
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
        default : throw "no game mode triggered";
    }
    
};



Quiz.prototype.next_question = function (){
    this.game.next_question(this);
};


Quiz.prototype.question_complete = function(){
    
    if (this.submodule.score >= this.module.submodule.threshold) {
        this.submodule_complete();
    } else {
        this.next_question();
    }
};

Quiz.prototype.submodule_complete = function () {
    
    console.log("DEBUG 11-16 quiz.submodule_complete entered");
    var mod = this.user.get_current_module(this.module.id);  //int
    
    var numerator = this.user.data.history[mod].progress;
    
    var denominator = ALL_MODULES[mod].threshold;
    console.log("DEBUG 11-16 mod = ", mod);
    console.log("DEBUG 11-16 numerator = ", numerator);
    console.log("DEBUG 11-16 threshold = ", denominator);
        
    
    console.log("DEBUGGING entering problem lightbox area 11-19");
    if (this.user.submodule_complete(this.module.id)) {
        console.log("DEBUG 11-16 user.submodule_complete is true");
        this.module = ALL_MODULES[this.user.get_current_module()];
        
        
        console.log("DEBUGGING LIGHTBOX: you've beeaten this level");
        this.fill_lightbox("YOU'VE BEATEN THIS LEVEL");
        $.featherlight($('#pop_up_div'), {afterClose: this.next_module.bind(this)});
    } else {
        console.log("DEBUG 11-16 user.submodule_complete is false");
        //todo put following into function (encapsulation and information hiding)
        //todo make this less hacky
        console.log("DEBUGGING LIGHTBOX: YOUR PROGRESS IS:", (numerator + 1) + "/" + denominator);
        this.fill_lightbox("YOUR PROGRESS IS: " + (numerator + 1) + "/" + denominator);
        $.featherlight($('#pop_up_div'), {afterClose: this.next_submodule.bind(this)});
    }
};


Quiz.prototype.update_display = function() {
    
    console.log("DEBUG 11-15 update_display entered");
    
    //todo in improve mode the following will break
    // var mod = this.user.get_current_module();
    
    var mod = this.module.id;
    var module_icon = ALL_MODULES[mod].icon_url;
    //todo uncomment when testing
    var module_name = ALL_MODULES[mod].icon_name;
    // console.log("DEBUG 11-8 mod = ", mod);
    // console.log("DEBUG 11-8 this.user.mod.progress = ", this.user.data.history[mod].progress);
    

    this.set_progress_bar();
    
    el("name_header").innerHTML = this.user.data.profile.name;
    el("class_header").innerHTML = this.user.data.profile.class_number;
    el("level_header").innerHTML = "<img src=" + module_icon + ">";
    el("fraction_header").innerHTML = module_name + ": " + this.user.data.history[mod].progress + "/" + this.module.threshold;
    
    
    
    
};


Quiz.prototype.set_progress_bar = function () {
    var x = this.submodule.score === 0 ? 0 : (this.submodule.score / this.module.submodule.threshold) * 100;
    // console.log("x:", x, this.submodule.score, this.module.submodule.threshold);
    var e = el("progress-bar");
    
    e.style.width = x + "%";
    // el("progress-bar").innerHTML = JSON.stringify(x) + "%";
};

// Quiz.reset_progress_bar = function(){
//     var x = 0;
//     var e = el("progress-bar");
//     e.style.width = x + "%";
//     el("progress-bar").innerHTML = JSON.stringify(x) + "%";
// };



//todo not yet working
// Quiz.logout_from_quiz = function() {
//     this.user.logout();
//     // document.location = "../login/";
//     // document.location = "../login/login/";
// };


Quiz.return_to_profile = function() {
    // document.location = "../login/";
    // document.location = "https://sentence-graph-cashmonides.c9.io/login/"
    // document.location = "../profile/";
};





Quiz.prototype.process_answer = function(){
    console.log("quiz.process_answer triggered");
    this.game.process_answer(this);
};

Quiz.prototype.fill_lightbox = function(text, lightbox) {
    var name = this.user.data.profile.name;
    el('pop_up_div').innerHTML = "CONGRATULATIONS " + name + "!<br>" + text;
};



Quiz.pick_question_data = function(sentence, region_filter){
    
    var available_tags = sentence.get_all_tag_types(region_filter);
    var target_tag = random_choice(Array.from(available_tags));
    
    var tag_to_region = sentence.get_regions_for_tags(region_filter);
    var available_regions = tag_to_region[target_tag];
    var target_region = random_choice(available_regions);
    
    return {
        sentence: sentence,
        available_tags: available_tags,
        target_tag: target_tag,
        target_region: target_region
    };
    
};



Quiz.prototype.increment_score = function() {
    this.submodule.score += this.module.submodule.reward;
}


Quiz.prototype.decrement_score = function() {
    this.submodule.score -= this.module.submodule.penalty;
    this.submodule.score = Math.max(0, this.submodule.score);
}






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


Quiz.prototype.get_cheat_sheet = function(mod_id) {
    var cheat_sheet = ALL_MODULES[mod_id].cheat_sheet;
    return cheat_sheet;
}

Quiz.prototype.toggle_cheat_sheet = function() {
    var button = el("cheat_sheet_button");
    
    
    
    var mod;
    
    if (this.advance_improve_status === "advancing") {
        mod = this.user.get_current_module();
    } else if (this.advance_improve_status === "improving") {
        mod = this.user.get_improving_module();
    }
    
    console.log("DEBUG 11-23 advance/improve status = ", this.advance_improve_status);
    console.log("DEBUG 11-23 mod = ", mod);
    var image_source = this.get_cheat_sheet(mod);
    console.log("DEBUG 11-23 mod = ", image_source);
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
    
    button.onclick = function() {
        var div = el("image_display_box");
        console.log("cheat sheet button clicked");
        if (div.style.display !== 'none') {
            div.style.display = 'none';
        }
        else {
            div.innerHTML = '<img src="'+ image_source +'" />'; 
            div.style.display = 'block';
        }
    };
    
    
};




//todo wasn't working as Quiz.logout_from_quiz

function logout_from_quiz() {
    document.location = "../login/";
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


