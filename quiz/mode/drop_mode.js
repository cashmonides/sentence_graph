//todo does set_word_selector need to be different - can't be clickable
//todo what is the logic exactly of if state.incorrect_streak < state.max_incorrect_streak in process_correct_answer?

//todo fix region filter, right now it's set at length === 1
    //when I try and cancel out the filter with length >= 1 I get Uncaught TypeError: Cannot read property 'style' of null

//UNDONE
//text still clickable
//available tags not filtered for duplicates
//region filter still set for length == 1
// - give away answer needs to be changed


var DropModeGame = function(){
    //todo should this really be like this
    this.data = null;
    this.quiz = null;

};


DropModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false
    el("answer_choices").style.display = 'initial';
    el("submit_button").style.display = 'initial';
    el("vocab_cheat_button").style.display = 'none';
    el("cheat_sheet_button").style.display = 'none';
};

DropModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}

DropModeGame.prototype.get_mode_name = function() {
    return "drop";
}

DropModeGame.region_filter = function(region){
    return region.get_indices().length == 1;
};

DropModeGame.tag_filter = function (filter) {
    console.log('filter =', filter);
    return function (tag) {
        // var dummy_part_of_speech_filter = ['subject', 'verb', 'object'];
        // var dummy_part_of_speech_filter = ['subject'];
        return filter.indexOf(tag) !== -1;
    }
}


DropModeGame.prototype.next_question = function(sentences){
    var types_of_level = ['grammar_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    
    var sentence = random_choice(this.quiz.sentences);
    // sentence.debug();
    //todo below seems hacky
    var filter = map_level_to_allowed(this.level.grammar_level, grammar_levels);
    console.log('filter = ', filter);
    this.data = Quiz.pick_question_data(sentence, DropModeGame.region_filter,
    DropModeGame.tag_filter(filter));
    console.log('this.data =', this.data);
    
    this.target_tag = this.data.target_tag;
    //todo add a filter onto available tags so that duplicates are eliminated (e.g. for cat we don't want noun & subject to be available tags because it could be both)
    // this.available_tags = data.available_tags;
    // this.target_region = data.target_region;
    this.quiz.update_display();
    
    
    //todo we need to remove child, possibly as below
    // document.getElementById("answer_choices").removeChild(document.getElementById('answer_wrapper'));
    
    
    Quiz.set_question_text("Classify the highlighted word.");
    //todo does the following need to be parameterized with make not clickable and set highlighted
    this.quiz.set_word_selector(this.data.sentence);
    
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);

    var is = this.data.target_region.get_indices();
    for (var i = 0; i < is.length; i++) {
        this.quiz.word_selector.set_highlighted(is[i], true);
    }
    
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


DropModeGame.prototype.make_drop_down = function(){
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
    // Originally, this.get_answer_choices() was effectively
    // array_from(this.data.available_tags), but a current bugfix
    // makes it seem more prudent to have a new method.
    var answer_choices = this.get_answer_choices();
    console.log("DEBUG 11-18 dropdown data inserted = ", answer_choices);
    set_dropdown("select_element", answer_choices);
};

DropModeGame.prototype.get_answer_choices = function () {
    return map_level_to_allowed(this.level.grammar_level, grammar_levels);
} 

DropModeGame.prototype.process_answer = function() {
    var dd = el("select_element");
    var selected_answer = dd.options[dd.selectedIndex].value;
    console.log("selected_answer = ", selected_answer);

    var is_correct = contains(this.data.target_region.get_tag_types(), selected_answer);

    if (is_correct) {
        //console.log("correct");
        this.process_correct_answer();
    } else {
        //console.log"incorrect");
        this.process_incorrect_answer();
    }

};

DropModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
DropModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
DropModeGame.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

DropModeGame.prototype.process_correct_answer = function() {
    //console.log"answer matches target");
    
    this.quiz.user.update_question_metrics(this.quiz.submodule.incorrect_streak, this.quiz.module.id);
    
    
    if (this.quiz.submodule.incorrect_streak == 0) {
        this.quiz.increment_score();
    }
    
    this.quiz.submodule.incorrect_streak = 0;
    
    
    var cell_1 = random_choice(DropModeGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    
    this.quiz.question_complete();
    
    

};


DropModeGame.prototype.process_incorrect_answer = function() {
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
        cell_2 = "DUMMY WRONG FEEDBACK";
    
        var cell_1 = random_choice(DropModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(DropModeGame.cell_3_feedback_wrong);
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

DropModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    fbox.innerHTML = "DUMMY GIVE AWAY ANSWER";
    
    // var self = this;
    // this.quiz.sentence.get_regions_with_tag(this.target_tag).forEach(function(r){
    //     var text = this.quiz.sentence.get_region_text(r);
    //     fbox.innerHTML += Quiz.wrap_string(self.target_tag) + " = " + text + "<br>";
    // });

    this.quiz.submodule.incorrect_streak = 0;
    this.quiz.question_complete();
};


//todo come up with a valid filter
// DropModeGame.region_filter = function(region){
//     return region.get_indices().length == 1;
// };