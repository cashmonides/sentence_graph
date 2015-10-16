

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


var MCMode2Game = function(){
    this.data = null;
};

MCMode2Game.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false

    //todo
    document.getElementById("answer_choices").style.display = 'initial';

    document.getElementById("submit_button").style.display = 'initial';
    state.switch_count = 1;
};

MCMode2Game.prototype.get_mode_name = function() {
    return "MC2";
};

MCMode2Game.prototype.next_question = function (){

    var data = make_output2(test_level, null, 'quiz_english');




    this.question = data.question;
    this.sentence = data.sentence;              // text displayed in display box
    this.target_indices = data.target_indices;      //highlighted word if necessary





    //drop_downs is a list of dictionaries
        //each dictionary has 3 properties:
        //heading
        //choices
        //correct answer (string or index?)
    this.drop_downs = data.drop_downs;
    this.give_away_phrase = data.give_away_phrase;

    this.correct_answer = this.drop_downs.map(function (x) {return x.correct_answer}).join(' ');



    console.log("LOG: question = ", this.question);
    console.log("LOG: sentence = ", this.sentence);
    console.log("LOG: target_indices = ", this.target_indices);
    console.log("LOG: drop_downs = ", JSON.stringify(this.drop_downs));
    console.log("LOG: give_away_phrase = ", this.give_away_phrase);
    console.log("LOG: correct_answer = ", this.correct_answer);


    refresh_score();
    set_question_text(this.question);
    set_word_selector(this.sentence);
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }

    this.make_drop_down();

};

MCMode2Game.prototype.make_drop_down = function(){
    this.drop_downs.forEach(function (x) {set_multiple_drop_downs(x, "answer_choices", x.choices, x.heading)})
};





MCMode2Game.prototype.process_answer= function(){
    var is_correct = this.drop_downs.every(function (x) {return selected_option(x.drop_down)=== x.correct_answer});
    if (is_correct) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};

MCMode2Game.cell_1_feedback_right = ["Correct!", "Excellent!"];
MCMode2Game.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
MCMode2Game.cell_2_feedback_wrong = ["Try again!", "Take another shot."];

MCMode2Game.prototype.process_correct_answer = function () {
    console.log("answer matches target");
    state.incorrect_streak = 0;
    if (state.incorrect_streak < state.max_incorrect_streak) {
        state.count_correct++;
    }
    var cell_1 = random_choice(MCMode2Game.cell_1_feedback_right);
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = cell_1;
    this.next_question();
};



MCMode2Game.prototype.process_incorrect_answer= function () {
    state.incorrect_streak++;
    state.count_incorrect++;
    refresh_score();
    state.word_selector.clear();

    if (state.incorrect_streak < state.max_incorrect_streak) {
        var cell_1 = random_choice(MCMode2Game.cell_1_feedback_wrong);
        var cell_2 = random_choice(MCMode2Game.cell_2_feedback_wrong);
        var fbox = document.getElementById("feedbackbox");
        fbox.innerHTML = cell_1 + cell_2;
    } else {
        this.give_away_answer();
    }
};

MCMode2Game.prototype.give_away_answer = function (){
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = this.give_away_phrase + " " + this.correct_answer;
};