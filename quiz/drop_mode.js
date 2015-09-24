//todo does set_word_selector need to be different - can't be clickable
//todo what is the logic exactly of if state.incorrect_streak < state.max_incorrect_streak in process_correct_answer?

//todo fix region filter, right now it's set at length === 1
    //when I try and cancel out the filter with length >= 1 I get Uncaught TypeError: Cannot read property 'style' of null

//UNDONE
//text still clickable
//available tags not filtered for duplicates
//region filter still set for length == 1


var DropModeGame = function(){

    this.data = null;

};


DropModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false


};




DropModeGame.prototype.next_question = function(sentences){
    var sentence = random_choice(state.sentences);
    var data = pick_question_data(sentence, DropModeGame.region_filter);
    this.target_tag = data.target_tag;
    //todo add a filter onto available tags so that duplicates are eliminated (e.g. for cat we don't want noun & subject to be available tags because it could be both)
    this.available_tags = data.available_tags;
    this.target_region = data.target_region;
    //junk code below
    this.available_tags_as_list =  Array.from(this.available_tags);
    refresh_score();
    set_question_text("Classify the highlighted word.");
    //todo does the following need to be parameterized with make not clickable and set highlighted
    set_word_selector(data.sentence);
    state.word_selector.set_highlighted(data.target_region.get_indices(), true);
    this.make_drop_down();
    this.make_submit_button();
    // we want to call make_drop_down
    // we want to generate a submit button with process answer
    //this is the html:
    // <button onclick="process_answer()">submit</button>
};


DropModeGame.prototype.make_drop_down = function(){
    set_dropdown("answer_choices", this.available_tags_as_list);
};


DropModeGame.prototype.make_submit_button = function() {
    var submitbox = document.getElementById("submitbox");
    submitbox.innerHTML = "<button onclick=\"process_answer()\">submit</button>";
};

DropModeGame.prototype.process_answer = function() {
    var dd = document.getElementById("answer_choices");
    var selected_answer = dd.options[dd.selectedIndex].value;
    console.log("selected_answer = ", selected_answer);

    var is_correct = contains(this.target_region.get_tag_types(), selected_answer);

    if (is_correct) {
        console.log("correct");
        this.process_correct_answer();
    } else {
        console.log("incorrect");
        this.process_incorrect_answer();
    }

};

DropModeGame.prototype.cell_1_feedback_right = ["Correct!", "Excellent!"];
DropModeGame.prototype.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
DropModeGame.prototype.cell_2_feedback_wrong = ["Try again!", "Take another shot."];

DropModeGame.prototype.process_correct_answer = function() {
    console.log("answer matches target");
    state.incorrect_streak = 0;
    if (state.incorrect_streak < state.max_incorrect_streak) {
        state.count_correct ++;
    }
    var cell_1 = random_choice(DropModeGame.prototype.cell_1_feedback_right);
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = cell_1;
    this.next_question();
};


DropModeGame.prototype.process_incorrect_answer = function() {
    state.incorrect_streak ++;
    state.count_incorrect ++;
    refresh_score();
    state.word_selector.clear();

    if (state.incorrect_streak < state.max_incorrect_streak) {
        var cell_1 = random_choice(DropModeGame.prototype.cell_1_feedback_wrong);
        var cell_2 = random_choice(DropModeGame.prototype.cell_2_feedback_wrong);
        var fbox = document.getElementById("feedbackbox");
        fbox.innerHTML = cell_1 + cell_2;
    } else {
        this.give_away_answer();
    }
};

DropModeGame.prototype.give_away_answer = function(){
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = "The highlighted word is: " + this.target_tag;
};


//todo come up with a valid filter
DropModeGame.region_filter = function(region){
    return region.get_indices().length == 1;
};