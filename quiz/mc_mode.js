

///////////////OBSOLETE BELOW
//var count_correct = 0;
//var count_incorrect = 0;
//var points_for_correct = 7;
//var points_for_incorrect = -3;
//var incorrect_streak = 0;
//var max_incorrect_streak = 4;
///////////////OBSOLETE ABOVE

//function score() {
//    return Math.max(1, count_correct * points_for_correct + count_incorrect * points_for_incorrect)
//}

///////POSSIBLY INCORPORATE ABOVE




//for now we're going to have testlevel, we'll replace it later
var test_level = 1;


var MCModeGame = function(){
    this.data = null;
};

MCModeGame.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false
    document.getElementById("answer_choices").style.display = 'initial';
    document.getElementById("submit_button").style.display = 'initial';
    state.switch_count = 1;
};

MCModeGame.prototype.get_mode_name = function() {
    return "MC";
}

MCModeGame.prototype.next_question = function (){
    console.log("DEBUG 9-29 next_question reached");

    var data = make_output(test_level, null, 'quiz_english');
    this.latin_question = data.latin_question;
    console.log("DEBUG 9-29 data.latin_question", data.latin_question);
    this.english_correct_answer = data.english_correct_answer;
    this.english_choices = data.english_choices;
    console.log(data.english_choices.length);

    //clear answer_choices box
    // while (cbox.options.length > 0) {
    //     cbox.options.remove(0)
    // }
    // for (var i = 0; i < data.english_choices.length; i++) {
    //     var choice = document.createElement('option');
    //     choice.innerHTML = data.english_choices[i];
    //     choice.is_correct = (data.english_choices[i] === data.english_correct_answer);
    //     cbox.add(choice)
    // }
    refresh_score();
    set_question_text("Pick the right translation.");
    set_word_selector(data.latin_question);
    //console.log("DEBUG 9-29 data.latin_question", data.latin_question);
    this.make_drop_down();
    // this.make_submit_button();
};

MCModeGame.prototype.make_drop_down = function(){
    set_dropdown("answer_choices", this.english_choices);
};


// MCModeGame.prototype.make_submit_button = function() {
//     var submitbox = document.getElementById("submitbox");
//     submitbox.innerHTML = "<button onclick=\"process_answer()\">submit</button>";
// };


MCModeGame.prototype.process_answer= function(){
    var dd = document.getElementById('answer_choices');
    var selected_answer = dd.options[dd.selectedIndex].value;
    //old code is below, which exploits the .is_correct property
    //var is_correct = option.is_correct;

    //new code below, could no doubt be improved
    var is_correct;
    if (this.english_correct_answer === selected_answer) {
        is_correct = true;
    } else {
        is_correct = false;
    }
    if (is_correct) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};

MCModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
MCModeGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
MCModeGame.cell_2_feedback_wrong = ["Try again!", "Take another shot."];

MCModeGame.prototype.process_correct_answer = function () {
    console.log("answer matches target");
    state.incorrect_streak = 0;
    if (state.incorrect_streak < state.max_incorrect_streak) {
        state.count_correct ++;
    }
    var cell_1 = random_choice(MCModeGame.cell_1_feedback_right);
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = cell_1;
    this.next_question();
}



MCModeGame.prototype.process_incorrect_answer= function () {
    state.incorrect_streak++;
    state.count_incorrect++;
    refresh_score();
    state.word_selector.clear();

    if (state.incorrect_streak < state.max_incorrect_streak) {
        var cell_1 = random_choice(MCModeGame.cell_1_feedback_wrong);
        var cell_2 = random_choice(MCModeGame.cell_2_feedback_wrong);
        var fbox = document.getElementById("feedbackbox");
        fbox.innerHTML = cell_1 + cell_2;
    } else {
        this.give_away_answer();
    }
}

MCModeGame.prototype.give_away_answer = function (){
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = "The translation is: " + this.english_correct_answer;
}


