
//submodule_progress = how close you are to getting from 5/10 to 6/10
//module_progress = 5/10 in kangaroo

var quiz = null;


window.onload = start;

function start(){
    
    // bootstrap sidebar
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    
    quiz = new Quiz();
    quiz.start();

}





var Quiz = function () {
    
    this.user = null;
    
    this.game = null;
    this.word_selector = null;
    
    this.sentences = null; // TODO - pull into own object
    this.sentence = null;
    
    //quiz object
    this.current_module = null;
    
    
    this.sub_module = {
        score: 0,                   // min(correct*reward - incorrect*penalty, 0) progress towards completing the sub_module (e.g. 75% done with the progress bar)
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    
};

Quiz.prototype.start = function(){
    
    this.user = new User();
    //the following line both tests the conditional and actually loads the data
    if (!this.user.load(this.user_loaded.bind(this))) {
        el("anonymous_alert").innerHTML = "In Anonymous Session!" + " Click " + "<a href=\"https://sentence-graph-cashmonides.c9.io/lib/login/login.html\">here</a>" + " to login or create an account";
    }
    
    var self = this;
    Sentence.get_all_sentences(function(ss){
        self.sentences = ss;
        this.next_module();
    });

};

Quiz.prototype.user_loaded = function(){
    
    this.current_module = ALL_MODULES[this.user.get_current_module()];
    console.log("current module:", this.current_module);
    
};


// window.onbeforeunload = function () {
//     alert("window close triggered");
//     user_data.logout()
// };

Quiz.prototype.set_progress_bar = function () {
    var x = this.sub_module.score === 0 ? 0 : (this.sub_module.score / this.current_module.sub_module.threshold) * 100;
    var e = el("progress-bar");
    
    e.style.width = x + "%";
    el("progress-bar").innerHTML = JSON.stringify(x) + "%";
}

function reset_progress_bar(){
    var x = 0;
    var e = el("progress-bar");
    e.style.width = x + "%";
    el("progress-bar").innerHTML = JSON.stringify(x) + "%";
}




function logout_from_quiz() {
    state.user_data.logout();
    document.location = "../login/";
}


Quiz.prototype.set_mode = function (game) {
    
    //todo what is the point of the following if statement
    // if(this.game != null){
    //     // state.game.detach();
    // }
    
    this.game = game;
    this.game.attach();
};


//todo is this used anymore?
function change_mode(){
    state.bar_count = 0;
    reset_progress_bar();

    //todo forced into quick mode for testing
    var new_mode;
    new_mode = get_mode(2);

    //todo real code below - uncomment when done testing
    //var new_mode;
    //var random_number;

    //todo 4 is an arbitrary parameter below (make it into a global variable updated as new modes get added)
    //todo - refactor while statement - we don't always want it to be a new mode (only infrequent)
    //do {
    //    random_number = Math.floor(Math.random() * 4);
    //    new_mode = get_mode(random_number);
    //    //console.log"string of game = ", state.game.get_mode_name(), new_mode.get_mode_name());// state.game.prototype.toString(), new_mode.prototype.toString());
    //} while (state.game.get_mode_name() == new_mode.get_mode_name());
    
    set_mode(new_mode);
}

function get_mode(mode_number) {
    //todo uncomment when done testing
    //mode_number = random_choice([0, 2]);
    // mode_number = 2;

    switch(mode_number) {
        case 0 : return new DropModeGame();
        case 1 : return new MCMode2Game();
        case 2 : return new QuickModeGame();
        case 3 : return new GenericDropGame();
        default : throw "no game mode triggered";
    }
}


Quiz.prototype.next_module = function () {
    
    this.sub_module.score = 0;                   // min(correct*reward - incorrect*penalty, 0) progress towards completing the sub_module (e.g. 75% done with the progress bar)
    this.sub_module.count_correct = 0;
    this.sub_module.count_incorrect = 0;
    this.sub_module.incorrect_streak = 0;
    
    this.next_sub_module();
    
};

Quiz.prototype.next_sub_module = function(){
    
    var game = this.next_mode();
    this.set_mode(game);
    this.set_progress_bar();
    this.next_question();
    
};

Quiz.prototype.next_mode = function(){
  
    var allowed = ALL_MODULES[this.current_module.id].modes_allowed;
    var mode = random_choice(allowed);
    return get_mode(mode);
    
};

Quiz.prototype.next_question = function (){
    
    this.game.next_question(this);
    
};


Quiz.prototype.question_complete = function(){
    
    if (this.sub_module.score >= this.current_module.threshold) {
        this.sub_module_complete();
    } else {
        next_question();
    }
    
};


Quiz.prototype.sub_module_complete = function () {
    if (this.user.sub_module_complete(this.current_module.id)) {
        this.current_module = ALL_MODULES[this.user.get_current_module()];
        console.log("current module:", this.current_module);
        
        this.fill_lightbox("pop_up_div", "GRADUATED");
        $.featherlight($('#pop_up_div'), {afterClose: next_module});
        
    } else {
        //todo put following into function (encapsulation and information hiding)
        this.fill_lightbox("pop_up_div", this.user.data.history[this.current_module.id].progress);
        $.featherlight($('#pop_up_div'), {afterClose: next_sub_module});
    }
};


Quiz.prototype.process_answer = function(){
    this.game.process_answer(this);
};

Quiz.prototype.fill_lightbox = function(div, score) {
    var name = this.user.profile.name;
    el(div).innerHTML = "CONGRATULATIONS" + name + "! YOU'RE READY FOR THE NEXT STAGE";
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




function set_bar_count(x){
    state.bar_count = Math.max(0, x);
}


//todo rename this to something like set_floor_to_score
function set_module_score(x){
    state.current_module_progress = Math.max(0, x);
}

function refresh_score() {
    el("scorebox").innerHTML = "Question #" + state.question_count + ", Remaining: " + (state.switch_count - state.mode_streak) + ", Score: " + state.score; //"Correct: " + state.count_correct + ", Incorrect: " + state.count_incorrect;
}

function refresh_module_score() {
    el("scorebox").innerHTML = "BAR score" + state.bar_count + "/" + state.bar_threshold + ", MODULE Score: " + state.current_module_progress + "/" + state.current_module_threshold;
}



function set_question_text(question){
    el("questionbox").innerHTML = question;
}

function wrap_string(tag) {
    return "<span class=\"tag_names\">" + tag + "</span>";
}

function set_word_selector(sentence){
    //console.log"DEBUG 9-29 sentence in set_word_selector", sentence);
    el("testbox").innerHTML = "";
    //console.logsentence.text);
    state.sentence = sentence;
    //todo changes here
    var word_sel_input;
    if (sentence.text) {
        word_sel_input = sentence.text;
    } else {
        word_sel_input = sentence;
    }
    var text_data = new Text(word_sel_input);
    text_data.setup();
    state.word_selector = new WordSelector("testbox", text_data);
    state.word_selector.setup();    
    
}

function get_selected_region(){
    
    var answer_indices = state.word_selector.get_selected_indices();
    //console.log"answer_indices = ", answer_indices);
    return state.sentence.get_region(answer_indices);

}


function toggle_cheat_sheet() {
    var button = el("cheat_sheet_button");

    button.onclick = function() {
        var div = el("image_display_box");
        if (div.style.display !== 'none') {
            div.style.display = 'none';
        }
        else {
            div.style.display = 'block';
        }
    };
}



