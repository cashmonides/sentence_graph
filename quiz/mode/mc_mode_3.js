var MCMode3Game = function(){
    this.data = null;
    this.quiz = null;
    // todo we here assume that 1 is the initial level
    this.level = 1;
};

MCMode3Game.cell_1_feedback_right = ["Correct!", "Excellent!"];
MCMode3Game.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
MCMode3Game.cell_3_feedback_wrong = ["Try again!", "Take another shot."];

MCMode3Game.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false

    //todo
    el("answer_choices").style.display = 'initial';

    el("submit_button").style.display = 'initial';
    el("vocab_cheat_button").style.display = 'initial';
    el("cheat_sheet_button").style.display = 'initial';
    // state.switch_count = 1
    
    //this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    //make_element( <button .....onclick = this.process_answer()>  )
};

// set_level now moved up
MCMode3Game.prototype.set_level = function (new_level) {
    this.level = new_level;
}


MCMode3Game.prototype.get_mode_name = function() {
    return "latin";
};



MCMode3Game.prototype.next_question = function () {
    var types_of_level = ['latin_drop_level', 'latin_extra_level', 'latin_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    //sets up our lexicon
    console.log("DEBUG 1/15 this.quiz.module.id =", this.quiz, this.quiz.module, this.quiz.module.id)
    var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    console.log('DEBUG 11-16 lexicon = ', list_of_lexeme_strings)
    var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    
    var data = make_output(this.level, current_lexicon);
    this.cheat_sheet = data.cheat_sheet;
    //sets data
    // var data = make_output(this.level, null, 'quiz_english');
    this.question = data.question;
    //todo is the following otiose?
    this.sentence = data.sentence;              // text displayed in display box
    this.target_indices = data.target_indices;      //highlighted word if necessary

    
    
    //changes the score, progress bar, etc.
    this.quiz.update_display();

    Quiz.set_question_text("Translate the following sentence:");
    this.quiz.set_word_selector(data.sentence);
    //todo check if this works
    
    //drop_downs is a list of dictionaries
        //each dictionary has 3 properties:
        //heading
        //choices
        //correct answer (string or index?)
    //is the following formulation otiose? should we just do data.drop_downs?
    this.drop_downs = data.drop_downs;
    
    this.give_away_phrase = data.give_away_phrase;
    this.give_away_ending_phrase = data.give_away_ending_phrase;
    this.correct_answer = this.drop_downs.map(function (x) {
        return x.correct_answer || x.non_drop_text}).join(' ');
    
    
    console.log("DEBUG entering 1st random_choice");
    this.none_display = random_choice(map_level_to_allowed(
        this.level.latin_extra_level, latin_extra_levels).none_display);
    
    
    document.getElementById("answer_choices").removeChild(
        document.getElementById('answer_wrapper'));
    
    var e = document.createElement('div');
    e.id = 'answer_wrapper';
    document.getElementById("answer_choices").appendChild(e);
    
    //todo - I found this in the code - what is the point of it?
    // remove_children(document.getElementById("answer_choices"));
    //todo why is this capitalized
    Quiz.set_question_text(this.question);
    this.quiz.set_word_selector(this.sentence);
    
   
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }

    // Hacky way to guarantee a drop down.
    var x = this.make_drop_down();
    if (x === 0) {this.next_question()}

};

MCMode3Game.prototype.display = function (x) {
    return x.type === 'non_drop' || x.correct_answer || this.none_display
};

//master function makes all the drops and non-drops
MCMode3Game.prototype.make_drop_down = function(){
    //initialize a count of how many drop down menus we'll have
    // if it remains 0 we start all over again
    var drops = 0;
    var self = this;
    var e = document.getElementById("answer_wrapper");
    
    //this.drop_downs is a list of drops and non-drops
    //each item in the list is a dictionary and has a type
    // type = drop or non-drop
    // dictionary for drop = heading, choices
    // dictionary for non-drop = non-drop text
    this.drop_downs.forEach(function (x) {
        if (self.display(x)) {
            switch (x.type) {
                case 'non_drop':
                    // todo make sure this fix works
                    var e1 = document.createTextNode(x.non_drop_text || '');
                    e.appendChild(e1);
                    break;
                case 'drop down':
                    // e = element we're appending to
                    // x = dictionary with the following properties
                    //x.choices = ['bear', 'bears']
                    //x.heading = "subject"
                    //self.none_display = bool
                    set_multiple_drop_downs(x, e, self.none_display);
                    drops++
                    break;
                default:
                    throw new Error('Drop downs should have a type.')
            }
            e.appendChild(document.createTextNode(' '))
        }
    });
    return drops
};



MCMode3Game.prototype.process_answer = function(){
    
    
    
    var self = this;
    var is_correct = this.drop_downs.every(function (x) {
        return (x.type === 'non_drop') || (!self.display(x)) ||
            (selected_option(x.HTML_element) === strip(x.correct_answer || 'none'))});
    if (is_correct) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};









MCMode3Game.prototype.process_correct_answer = function () {
    this.quiz.user.update_question_metrics(this.quiz.submodule.incorrect_streak, this.quiz.module.id);
    if (this.quiz.submodule.incorrect_streak == 0) {
        this.quiz.increment_score();
    }
    this.quiz.submodule.incorrect_streak = 0;
    
    console.log("DEBUG entering 2nd random_choice");
    var cell_1 = random_choice(MCMode3Game.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;

    this.quiz.question_complete();
};



MCMode3Game.prototype.process_incorrect_answer = function () {
    this.quiz.submodule.incorrect_streak ++;
    if (this.quiz.submodule.incorrect_streak === 1) {
        this.quiz.decrement_score();
    } else {
        console.log("DEBUG if not triggered");
    }
    
    if (this.quiz.submodule.incorrect_streak < this.quiz.module.submodule.max_incorrect_streak) {
        console.log("DEBUG entering 3rd random_choice");
        
        var cell_1 = random_choice(MCMode3Game.cell_1_feedback_wrong);
        var cell_3 = random_choice(MCMode3Game.cell_3_feedback_wrong);
        
        
        
        console.log("DEBUG leaving 3rd random_choice");
        
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + " " + cell_3;
    } else {
        this.quiz.user.update_question_metrics(this.quiz.submodule.incorrect_streak, this.quiz.module.id);
        this.give_away_answer();
    }
    this.quiz.update_display();
    // MCMode3 has no real word selector
    // this.quiz.word_selector.clear();
};

MCMode3Game.prototype.give_away_answer = function (){
    var fbox = el("feedbackbox");
    fbox.innerHTML = this.give_away_phrase + this.correct_answer + this.give_away_ending_phrase;
    this.quiz.submodule.incorrect_streak = 0;
    this.quiz.question_complete();
};


