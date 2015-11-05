
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

    // a reference to the ALL_MODULES info, not the user history!
    this.module = null;
    
    
    this.submodule = {
        score: 0,                   // min(correct*reward - incorrect*penalty, 0) progress towards completing the submodule (e.g. 75% done with the progress bar)
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
        self.next_module();
    });

};

Quiz.prototype.user_loaded = function(){
    
    this.module = ALL_MODULES[this.user.get_current_module()];
    console.log("current module:", this.module);
    
};


Quiz.prototype.next_module = function () {
    
    
    this.next_submodule();
    
};

Quiz.prototype.next_submodule = function(){
    this.submodule = {
        score: 0, 
        count_correct: 0,
        count_incorrect: 0,
        incorrect_streak: 0
    };
    this.next_mode();
    this.next_question();
};

Quiz.prototype.next_mode = function(){
  
    var allowed = ALL_MODULES[this.module.id].modes_allowed;
    var mode = random_choice(allowed);
    var game = Quiz.get_mode(mode);
    
    this.game = game;
    this.game.quiz = this;
    this.game.attach();
    
};

Quiz.get_mode = function(mode_number) {

    switch(mode_number) {
        case 0 : return new DropModeGame();
        case 1 : return new MCMode2Game();
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
    if (this.user.submodule_complete(this.module.id)) {
        this.module = ALL_MODULES[this.user.get_current_module()];
        console.log("current module:", this.module);
        
        this.fill_lightbox("GRADUATED");
        $.featherlight($('#pop_up_div'), {afterClose: this.next_module.bind(this)});
        
    } else {
        //todo put following into function (encapsulation and information hiding)
        this.fill_lightbox(this.user.get_module(this.module.id).progress);
        $.featherlight($('#pop_up_div'), {afterClose: this.next_submodule.bind(this)});
    }
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

Quiz.logout_from_quiz = function() {
    this.user_data.logout();
    document.location = "../login/";
};





Quiz.prototype.process_answer = function(){
    this.game.process_answer(this);
};

Quiz.prototype.fill_lightbox = function(text) {
    var name = this.user.data.profile.name;
    el("pop_up_div").innerHTML = "CONGRATULATIONS " + name + "!<br>" + "Your module score is: " + text;
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



Quiz.prototype.update_display = function() {
    this.set_progress_bar();
    el("scorebox").innerHTML = 
        "Submodule Score: " + this.submodule.score + "/" + this.module.submodule.threshold + "<br>" + 
        "Module Score: " + this.user.get_module(this.module.id).progress + "/" + this.module.threshold;
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


Quiz.toggle_cheat_sheet = function() {
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
};



