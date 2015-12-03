/*
todo:
get & set tutorial level
process_tutorial_click
*/

var TutorialModeGame = function(){

    
    this.quiz = null;
    
};


TutorialModeGame.prototype.attach = function(){
    el("answer_choices").style.display = 'none';
    el("submit_button").style.display = 'none';
    el("vocab_cheat_button").style.display = 'none';
    el("cheat_sheet_button").style.display = 'none';
};


TutorialModeGame.prototype.set_level = function () {
    //todo
}

TutorialModeGame.prototype.get_mode_name = function() {
    return "Tutorial";
};




TutorialModeGame.prototype.next_tutorial_page = function(state){
    //something like: var level = get_level();
    
    //something like: var text = Quiz.set_tutorial_text(level);
     
    this.quiz.set_word_selector(text);
    
    this.quiz.word_selector.click_callback = this.quiz.process_tutorial_click.bind(this.quiz);
};

TutorialModeGame.prototype.process_tutorial_click = function(state) {
    
    // var is_correct = contains(tag_names, this.target_tag);
    // if (is_correct) {
    //     this.process_correct_answer();
    // } else {
    //     this.process_incorrect_answer();
    // }

};

TutorialModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
TutorialModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
TutorialModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

TutorialModeGame.prototype.process_correct_answer = function() {
    var cell_1 = random_choice(TutorialModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;

    this.quiz.tutorial_page_complete();
};


QuickModeGame.prototype.process_incorrect_answer = function() {
    
    
    var tag_names = this.quiz.get_selected_region().get_tag_types();

    this.quiz.submodule.incorrect_streak ++;
    
    
    console.log("Debug 11-8 this.quiz.submodule.incorrect_streak = ", this.quiz.submodule.incorrect_streak);
    if (this.quiz.submodule.incorrect_streak === 1) {
        console.log("Debug 11-8 if triggered");
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG 11-8 if not triggered");
    }

    
    // set_bar_count(this.quiz.bar_count - this.quiz.current_module_penalty);

    //if (this.quiz.incorrect_streak = this.quiz.max_incorrect_streak) {
    //    //set_score(this.quiz.score + SCORE_PENALTIES[this.quiz.incorrect_streak - 1]);
    //    //set_module_score(this.quiz.current_module_progress - this.quiz.current_module_penalty);
    //}


    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        var cell_2;
        if (tag_names.length == 0) {
            cell_2 = "That's not a valid region.";
        } else if (tag_names.length == 1) {
            cell_2 = "That's a " + Quiz.wrap_string(tag_names[0]);
        } else {
            tag_names = tag_names.map(Quiz.wrap_string);
            cell_2 = "That matches the following: " + tag_names.join(", ");
        }
        var cell_1 = random_choice(QuickModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(QuickModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.quiz.user.update_question_metrics(this.quiz.submodule.incorrect_streak, this.quiz.module.id);
        this.give_away_answer();
        //refresh_score();
    }
    this.quiz.update_display();
    this.quiz.word_selector.clear();

};

QuickModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "";
    var self = this;
    this.quiz.sentence.get_regions_with_tag(this.target_tag).forEach(function(r){
        var text = this.quiz.sentence.get_region_text(r);
        fbox.innerHTML += Quiz.wrap_string(self.target_tag) + " = " + text + "<br>";
    });

    this.quiz.submodule.incorrect_streak = 0;
    this.quiz.question_complete();
    
};
