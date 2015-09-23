
var QuickModeGame = function(){
    
    this.data = null;
    
}


QuickModeGame.prototype.attach = function(){
    
    // make word selector clickable
    // no dropdown or submit button
    
}

// sentence
// target region
// target tag
// available tags

QuickModeGame.prototype.generate_question = function(sentences){

    var region_filter = function(region){ return region.get_indices().length == 1; };
    this.data = pick_question_data(sentences, region_filter);    

};

QuickModeGame.prototype.next_question = function(sentences){
    
    this.generate_question(sentences);
    refresh_score();
    set_question_text("Click on the word that matches " + wrap_string(this.data.target_tag));
    set_word_selector(this.data.sentence);
    state.word_selector.click_callback = process_answer;

};

QuickModeGame.prototype.process_answer = function() {
    
    var answer_indices = state.word_selector.get_selected_indices();
    console.log("answer_indices = ", answer_indices);
    var answer_region = this.data.sentence.get_region(answer_indices);
    var tag_names = answer_region.get_tag_types();

    console.log("tag names:", tag_names);
    console.log("target type: ", this.data.target_tag);

    var is_correct = contains(tag_names, this.data.target_tag);

    if (is_correct) {
        console.log("correct");
        this.process_correct_answer();
    } else {
        console.log("incorrect");
        this.process_incorrect_answer(tag_names);
    }

};

QuickModeGame.prototype.cell_1_feedback_right = ["Correct!", "Excellent!"];
QuickModeGame.prototype.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
QuickModeGame.prototype.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

QuickModeGame.prototype.process_correct_answer = function() {
    
    console.log("answer matches target");        
    state.incorrect_streak = 0;
    if (state.incorrect_streak < state.max_incorrect_streak) {
        state.count_correct ++;
    }
    var cell_1 = random_choice(QuickModeGame.prototype.cell_1_feedback_right);
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = cell_1;
    start_game();

}

QuickModeGame.prototype.process_incorrect_answer = function(tag_names) {
    
    state.incorrect_streak ++;
    state.count_incorrect ++;
    refresh_score();
    state.word_selector.clear();
    
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
        var cell_1 = random_choice(QuickModeGame.prototype.cell_1_feedback_wrong);
        var cell_3 = random_choice(QuickModeGame.prototype.cell_3_feedback_wrong);
        var fbox = document.getElementById("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.give_away_answer();
    }

    
}

QuickModeGame.prototype.give_away_answer = function(){
    
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = "";
    
    for(var ri in this.data.sentence.get_regions()){
        var r = this.data.sentence.get_regions()[ri];
        for(var ti in r.get_tags()){
            var t = r.get_tags()[ti];
            if(t.get_tag_type() == this.data.target_tag) {
                var text = this.data.sentence.get_region_text(r);
                console.log("this was a solution:", text);
                fbox.innerHTML += wrap_string(this.data.target_tag) + " = " + text + "<br>";
            }
        }
    }
    
}