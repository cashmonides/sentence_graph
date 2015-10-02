
var QuickModeGame = function(){
    
    this.target_tag = null;
    
};


QuickModeGame.prototype.attach = function(){
    
    // make word selector clickable
    // no dropdown or submit button
    document.getElementById("answer_choices").style.display = 'none';
    document.getElementById("submit_button").style.display = 'none';
    
};

QuickModeGame.region_filter = function(region){
    return region.get_indices().length == 1;
};

QuickModeGame.prototype.next_question = function(state){
    
    var sentence = random_choice(state.sentences);
    var data = pick_question_data(sentence, QuickModeGame.region_filter);  
    this.target_tag = data.target_tag;
    refresh_score();
    set_question_text("Click on the word that matches " + wrap_string(this.target_tag));
    set_word_selector(data.sentence);
    state.word_selector.click_callback = process_answer;

};

QuickModeGame.prototype.process_answer = function(state) {
    
    var tag_names = get_selected_region().get_tag_types();
    console.log("tag names:", tag_names);
    console.log("target type: ", this.target_tag);

    var is_correct = contains(tag_names, this.target_tag);

    if (is_correct) {
        console.log("correct");
        this.process_correct_answer();
    } else {
        console.log("incorrect");
        this.process_incorrect_answer();
    }

};

QuickModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
QuickModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
QuickModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

QuickModeGame.prototype.process_correct_answer = function() {
    
    console.log("answer matches target");        

    if(state.incorrect_streak == 0){    
        set_score(state.score + SCORE_REWARD);
    }
    state.incorrect_streak = 0;
    
    var cell_1 = random_choice(QuickModeGame.cell_1_feedback_right);
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = cell_1;
    
    if(state.question_count % 10 == 0){
        set_user_data("score", state.score);
        set_user_data("question_count", state.question_count);
    }
    
    next_question();

};

QuickModeGame.prototype.process_incorrect_answer = function() {
    
    var tag_names = get_selected_region().get_tag_types();
    
    state.incorrect_streak ++;
    
    if (state.incorrect_streak <= state.max_incorrect_streak) {
        set_score(state.score + SCORE_PENALTIES[state.incorrect_streak - 1]);
    }

    
    if (state.incorrect_streak < state.max_incorrect_streak) {
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
        var fbox = document.getElementById("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.give_away_answer();
    }
    
    refresh_score();
    state.word_selector.clear();
    
};

QuickModeGame.prototype.give_away_answer = function(){
    
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = "";
    
    var self = this;
    state.sentence.get_regions_with_tag(this.target_tag).forEach(function(r){
        var text = state.sentence.get_region_text(r);
        fbox.innerHTML += wrap_string(self.target_tag) + " = " + text + "<br>";
    });

};
