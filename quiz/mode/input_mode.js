//todo very important issue
/*
- in mcmode3 we've been careless about the fact that the give away phrase shows up
even though they're on to the next question
- the result was that the give away phrase shows up at the top "the correct answer was...."
  but there was already a new question and the latin sentence was gone
  so it was impossible to compare the give away phrase with the puzzling latin
- but here in input mode if they get it wrong, it's pretty crucial that we get a side by side
  comparison of right and wrong answer
- not crucial for first implementation but crucial for down the road
- i.e. someone is going to type in "teh lion loves the crow" hit return quickly without noticing
  then get told they're wrong without seeing the simple typo
- another possibility: try to detect simple typos
- that's a good idea
    - would be nice to have an alert that says 
    "looks like you've got it pretty close but we've found some things that may be typos"
    "do you want to try and fix them?"
    - that would be a pretty cool, advanced feature
    - not necessary for first iteration but very cool
    - it sort of reads their mind like AI
    - 
    
- I was just stopping here to try to find something in MC mode relating to drop downs.
- I'm going to continue my search
- Ok I'm gonna keep plugging away here. happy hunting!
*/



/*
- another issue
      - input box needs to be wide enough to match the length of the string
      - we could just make it really wide as defaukt
          e.g. size="99" will give 99 character width
         the angry lion knows that the stupid king of the bears attacked the queen of the frogs with the sword of zeus
        = 109 characters including spaces
    - another option would be to make it adapt to the width of the answer
        - so in attach we could set the size=width of the correct answer (+10 or 20 characters for padding)
        - this kind of gives them a clues as to what the answer is but not too much especially if there's padding
*/



var InputModeGame = function(){
    this.data = null;
    this.quiz = null;
};


InputModeGame.prototype.attach = function(){
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'initial');
    set_display("vocab_cheat_button", 'initial');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'initial');
};

InputModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}

InputModeGame.prototype.get_mode_name = function() {
    return "input";
}


////////////
//todo
//above is simple and unproblematic
//below is more complicated


InputModeGame.prototype.next_question = function () {
    
    //since we're not doing drops we don't need drop_level or extra_level
    var types_of_level = ['latin_level'];
    var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    this.set_level(post_sampling_level);
    
    
    
    //sets up our lexicon
    console.log("DEBUG 1/15 this.quiz.module.id =", this.quiz, this.quiz.module, this.quiz.module.id)
    var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    console.log('DEBUG 11-16 lexicon = ', list_of_lexeme_strings)
    var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    console.log("are we ok:", 'make_output' in window);
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
    
    
    this.give_away_phrase = data.give_away_phrase;
    this.give_away_ending_phrase = data.give_away_ending_phrase;
    this.correct_answer = this.drop_downs.map(function (x) {
        return x.correct_answer || x.non_drop_text}).join(' ');
    console.log("DEBUG INPUT 4-9 this.correct_answer = ", this.correct_answer);
    
    console.log("DEBUG entering 1st random_choice");
    this.none_display = random_choice(map_level_to_allowed(
        this.level.latin_extra_level, latin_extra_levels).none_display);
    
    //////////
    //todo all of below was commented out because it seemed to do strictly with drop downs which we wont use in input mode
    
    
    // We now use this to guarantee that our answer choices end up in the right place.
    // remove_element(el("answer_choices"));
    // remove_element_by_id("latin_answer_choices");
    
    // var new_answer_choices = document.createElement('div');
    
    // new_answer_choices.id = "latin_answer_choices";
    
    // el('drop_downs').appendChild(new_answer_choices);
    
    // document.getElementById("answer_choices").removeChild(
    //    document.getElementById('answer_wrapper'));
    
    // var e = document.createElement('div');
    // e.id = 'latin_answer_wrapper';
    // new_answer_choices.appendChild(e);
    //////////////////
    
    Quiz.set_question_text(this.question);
    this.quiz.set_word_selector(this.sentence);
    
   
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    //todo Akiva is confused on this (what is the point of it? do we need it in input mode?)
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }

    //todo Akiva has no idea what to do with this below
    // Hacky way to guarantee a drop down.
    var x = this.make_drop_down(e);
    if (x === 0) {this.next_question()}

};


//todo below is our string cleanup and matcher

InputModeGame.prototype.process_answer = function(){
    var self = this;
    var raw_input_string = el("input_box").value;
    console.log("DEBUG INPUT 4-9 raw input string = ", raw_input_string);
    
    var processed_input_string = clean_input_string(raw_input_string);
    console.log("DEBUG INPUT 4-9 process input string = ", process_input_string);
    
    
    //todo we need the correct english answer - should be stored as a variable somewhere in this.next_question
    var correct_english_translation;
    
    //it might already be stored as this.correct_answer, in which case, we just do this
    var correct_english_translation = this.correct_answer;
    
    if (processed_input_string === correct_english_translation) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};

//todo below is uncomplicated, just like every other mode

InputModeGame.prototype.process_correct_answer = function () {
    this.quiz.increment_score();
    
    console.log("DEBUG entering 2nd random_choice");
    var cell_1 = random_choice(MCMode3Game.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;

    this.quiz.question_complete();
};



InputModeGame.prototype.process_incorrect_answer = function () {
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
        this.give_away_answer();
    }
    this.quiz.update_display();
    // MCMode3 has no real word selector
    // this.quiz.word_selector.clear();
};

InputModeGame.prototype.give_away_answer = function (){
    var fbox = el("feedbackbox");
    fbox.innerHTML = this.give_away_phrase + this.correct_answer + this.give_away_ending_phrase;
    this.quiz.question_complete();
};




////////////////////////////////////////////
