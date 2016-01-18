// If something doesn't make sense, it's probably from DropMode.

var EtymologyModeGame = function(){
    //todo should this really be like this
    this.data = null;
    this.quiz = null;
    this.level = 0;
    this.words_and_roots = {};
};


EtymologyModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false
    el("answer_choices").style.display = 'initial';
    el("submit_button").style.display = 'initial';
    el("vocab_cheat_button").style.display = 'none';
    el("cheat_sheet_button").style.display = 'none';
};

EtymologyModeGame.prototype.set_level = function (new_level) {
    console.log("DEBUG 11-16 EtymologyModeGame new_level = ", new_level);
    this.level = new_level;
}

EtymologyModeGame.prototype.get_mode_name = function() {
    return "etymology";
}


EtymologyModeGame.prototype.next_question = function(){
    var types_of_level = ['etym_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    this.quiz.update_display();
    if (!(this.quiz.module.id in this.words_and_roots)) {
        this.words_and_roots[this.quiz.module.id] = get_words_and_roots(
            map_level_to_allowed(this.level.etym_level, etym_levels).roots);
    }
    
    var question = create_etymology_question(
        this.level, this.words_and_roots[this.quiz.module.id]);
    this.word_choices = question.word_choices;
    this.correct = question.correct;
    
    
    Quiz.set_question_text('Which of the answer choices has a root meaning "'
    + question.meaning_asked_about + '"?');
    
    
    //todo
    //etymology mode is the only mode without a word selector
    //that leads to a problem: the previous word selector remains on the page
    //the following a hacky solution that can probably be improved on
    
    var empty_word_selector = "";
    this.quiz.set_word_selector(empty_word_selector);
    
    
    //remove all html elements in drop down
    if (document.getElementById("answer_choices")) {
        if (document.getElementById("answer_wrapper")) {
            document.getElementById("answer_choices").removeChild(document.getElementById('answer_wrapper'));
            console.log("DEBUG 11-18 remove html elements triggered");
        }
        
    }
    
    //make html elements
    this.make_drop_down();
    
    //todo new code 11-29 the following avoids drop-downs with only one answer
    if (el("select_element").children.length === 1) {this.next_question()}

};


EtymologyModeGame.prototype.make_drop_down = function(){
    //html elements created here
    var ac = document.createElement("div");
    ac.id = "answer_choices";
    console.log("ac = ", ac);
    document.getElementById("pre_footer").appendChild(ac);
    
    var aw = document.createElement("div");
    aw.id = "answer_wrapper";
    console.log("aw = ", aw);
    document.getElementById("answer_choices").appendChild(aw);
    
    var e = document.createElement("select");
    e.id = "select_element";
    console.log("e = ", e);
    
    
    console.log("DEBUG 11-18 doc.get.el.aw", document.getElementById("answer_wrapper"));
    console.log("DEBUG 11-18 doc.get.el.ac", document.getElementById("answer_choices"));
    
    document.getElementById("answer_wrapper").appendChild(e);
    console.log("DEBUG 11-18 final append reached");
    
    console.log("DEBUG 11-18 dropdown data inserted = ", this.word_choices);
    set_dropdown("select_element", this.word_choices);
};




EtymologyModeGame.prototype.process_answer = function() {
    var dd = el("select_element");
    var selected_answer = dd.options[dd.selectedIndex].value;
    console.log("selected_answer = ", selected_answer);

    var is_correct = selected_answer === this.correct;

    if (is_correct) {
        //console.log"correct");
        this.process_correct_answer();
    } else {
        //console.log"incorrect");
        this.process_incorrect_answer();
    }

};

EtymologyModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
EtymologyModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
EtymologyModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

EtymologyModeGame.prototype.process_correct_answer = function() {
    //console.log"answer matches target");
    
    this.quiz.user.update_question_metrics(this.quiz.submodule.incorrect_streak, this.quiz.module.id);
    
    
    if (this.quiz.submodule.incorrect_streak == 0) {
        this.quiz.increment_score();
    }
    
    this.quiz.submodule.incorrect_streak = 0;
    
    
    var cell_1 = random_choice(EtymologyModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    
    this.quiz.question_complete();
    
    

};


EtymologyModeGame.prototype.process_incorrect_answer = function() {
    this.quiz.submodule.incorrect_streak ++;
    
    
    console.log("Debug 11-8 this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    if (this.quiz.submodule.incorrect_streak === 1) {
        console.log("Debug 11-8 if triggered");
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG 11-8 if not triggered");
    }
    
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        var cell_2;
        cell_2 = "";
    
        var cell_1 = random_choice(EtymologyModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(EtymologyModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.quiz.user.update_question_metrics(this.quiz.submodule.incorrect_streak, this.quiz.module.id);
        this.give_away_answer();
        //refresh_score();
    }
    this.quiz.update_display();
    // Etymology hasd no word selector
    // this.quiz.word_selector.clear();
};

EtymologyModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "The correct answer was \"" + this.correct + '"';
    
    // var self = this;
    // this.quiz.sentence.get_regions_with_tag(this.target_tag).forEach(function(r){
    //     var text = this.quiz.sentence.get_region_text(r);
    //     fbox.innerHTML += Quiz.wrap_string(self.target_tag) + " = " + text + "<br>";
    // });

    this.quiz.submodule.incorrect_streak = 0;
    this.quiz.question_complete();
};