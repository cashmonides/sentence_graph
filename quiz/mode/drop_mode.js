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
    // This is useful when non_contradictory_tag_map changes
    // and makes it clear that it's a property of the game.
    // For example, adjective and subject shouldn't overlap
    // until they have a sentence with a substantive, or at least
    // know about it. But this is not built in yet.
    console.log('testing nctm');
    console.log('testing nctm', 'non_contradictory_tag_map' in window)
    console.log(non_contradictory_tag_map);
    this.non_contradictory_tag_map = non_contradictory_tag_map;
};


DropModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup have a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'initial');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'none');
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
    remove_element_by_id("drop_answer_choices");
    //make html elements
    make_drop_down_html(this.get_answer_choices());
    
    //todo new code 11-29 the following avoids drop-downs with only one answer
    if (el("select_element").children.length === 1) {this.next_question()}
};


DropModeGame.prototype.get_answer_choices = function () {
    var target_tag = this.target_tag;
    var original_attempt = map_level_to_allowed(this.level.grammar_level, grammar_levels);
    var order = shuffle(original_attempt.slice(0)).filter(
        function (x) {return x !== target_tag});
    order.unshift(target_tag);
    var conflicting_tags;
    for (var i = 0; i < order.length; i++) {
        if (original_attempt.indexOf(order[i]) !== -1) {
            conflicting_tags = this.non_contradictory_tag_map[order[i]] || [];
            original_attempt = original_attempt.filter(function (x) {
                return conflicting_tags.indexOf(x) === -1;
            })
        }
    }
    return original_attempt;
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
    
    this.quiz.increment_score();
    
    
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
        cell_2 = "";
    
        var cell_1 = random_choice(DropModeGame.cell_1_feedback_wrong);
        var cell_3 = random_choice(DropModeGame.cell_3_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_2 + " " + cell_3;
    } else {
        this.give_away_answer();
        // this.give_away_answer also creates a new question
        //refresh_score();
    }
    this.quiz.update_display();
    // January 16th: Dan thinks this line looks suspicious here.
    // this.quiz.word_selector.clear();
};

DropModeGame.prototype.give_away_answer = function(){
    var fbox = el("feedbackbox");
    //todo add a give away answer when we come up with a good way of generating it
    fbox.innerHTML = "";
    
    // var self = this;
    // this.quiz.sentence.get_regions_with_tag(this.target_tag).forEach(function(r){
    //     var text = this.quiz.sentence.get_region_text(r);
    //     fbox.innerHTML += Quiz.wrap_string(self.target_tag) + " = " + text + "<br>";
    // });

    this.quiz.question_complete();
};


//todo come up with a valid filter
// DropModeGame.region_filter = function(region){
//     return region.get_indices().length == 1;
// };