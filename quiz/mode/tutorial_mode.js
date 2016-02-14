/*
todo:
get & set tutorial level
process_tutorial_click
*/

var TutorialModeGame = function(tutorial_id){
    this.quiz = null;
    this.tutorial_page = ALL_TUTORIALS[tutorial_id][0]; // Is next needed?
};


TutorialModeGame.prototype.attach = function(){
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'none');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
};


TutorialModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}

TutorialModeGame.prototype.get_mode_name = function() {
    return "tutorial";
};




TutorialModeGame.prototype.next_tutorial_page = function(){
    //something like: var level = get_level();
    
    //something like: var text = Quiz.set_tutorial_text(level);
    this.tutorial_page = this.tutorial_page.next; // ???
    var text = this.tutorial_page.sentence;
    this.quiz.set_word_selector(text);
    
    this.quiz.word_selector.click_callback = this.quiz.process_tutorial_click.bind(this.quiz);
};

TutorialModeGame.prototype.process_tutorial_click = function() {
    var is_correct = region_to_text(this.quiz.get_selected_region()).
    split(' = ')[0] === this.tutorial_page.correct_answer;
    if (is_correct) {
         this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
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


TutorialModeGame.prototype.process_incorrect_answer = function() {
    
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
        var cell_1 = random_choice(TutorialModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(TutorialModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
        this.quiz.word_selector.clear();
    } else {
        this.quiz.user.update_question_metrics(this.quiz.submodule.incorrect_streak, this.quiz.module.id);
        this.give_away_answer();
        //refresh_score();
    }
    this.quiz.update_display();
};


TutorialModeGame.prototype.load_tutorial_page = function () {
    
}




// TutorialModeGame.prototype.give_away_answer = function(){
//     //probably never gonna use
// };
