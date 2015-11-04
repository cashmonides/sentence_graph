
var QuickModeGame = function(){

    this.target_tag = null;
    this.quiz = null;
    
};


QuickModeGame.prototype.attach = function(){
    
    el("answer_choices").style.display = 'none';
    el("submit_button").style.display = 'none';
    // this.quiz.bar_threshold = 10;
    // this.quiz.switch_count = 10;

};

QuickModeGame.prototype.get_mode_name = function() {
    return "Quick";
};

QuickModeGame.region_filter = function(region){
    return region.get_indices().length == 1;
};

QuickModeGame.prototype.next_question = function(state){
    
    var sentence = random_choice(this.quiz.sentences);
    var data = Quiz.pick_question_data(sentence, QuickModeGame.region_filter);  
    this.target_tag = data.target_tag;
    //refresh_score();
    this.quiz.update_display();
    Quiz.set_question_text("Click on the word that matches " + Quiz.wrap_string(this.target_tag));
    this.quiz.set_word_selector(data.sentence);
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);

};

QuickModeGame.prototype.process_answer = function(state) {
    var tag_names = this.quiz.get_selected_region().get_tag_types();
    ////console.log"tag names:", tag_names);
    //console.log"LOG target tag: ", this.target_tag);

    var is_correct = contains(tag_names, this.target_tag);
    if (is_correct) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }

};

QuickModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
QuickModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
QuickModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

QuickModeGame.prototype.process_correct_answer = function() {
    //todo old code below - only rewards if first answer is correct
    //if(this.quiz.incorrect_streak == 0){
    //    set_score(this.quiz.score + SCORE_REWARD);
    //    set_module_score(this.quiz.current_module_progress + this.quiz.current_module_reward);
    //}
    //this.quiz.incorrect_streak = 0;


    //todo new code below, always rewards
    //set_score(this.quiz.score + SCORE_REWARD);
    //set_module_score(this.quiz.current_module_progress + this.quiz.current_module_reward);
    
    // set_bar_count(this.quiz.bar_count + this.quiz.current_module_reward);
    
    
    
    this.quiz.incorrect_streak = 0;
    this.quiz.increment_score();

    var cell_1 = random_choice(QuickModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;

    this.quiz.question_complete();
    this.quiz.next_question();
};


QuickModeGame.prototype.process_incorrect_answer = function() {
    
    var tag_names = this.quiz.get_selected_region().get_tag_types();

    this.quiz.incorrect_streak ++;
    // set_bar_count(this.quiz.bar_count - this.quiz.current_module_penalty);

    //if (this.quiz.incorrect_streak = this.quiz.max_incorrect_streak) {
    //    //set_score(this.quiz.score + SCORE_PENALTIES[this.quiz.incorrect_streak - 1]);
    //    //set_module_score(this.quiz.current_module_progress - this.quiz.current_module_penalty);
    //}


    if (this.quiz.incorrect_streak < this.quiz.max_incorrect_streak) {
        var cell_2;
        if (tag_names.length == 0) {
            cell_2 = "That's not a valid region.";
        } else if (tag_names.length == 1) {
            cell_2 = "That's a " + wrap_string(tag_names[0]);
        } else {
            tag_names = tag_names.map(wrap_string);
            cell_2 = "That matches the following: " + tag_names.join(", ");
        }
        var cell_1 = random_choice(QuickModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(QuickModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
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

    this.quiz.incorrect_streak = 0;
    this.quiz.question_complete();
    this.quiz.next_question();
};