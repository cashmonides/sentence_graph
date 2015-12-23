//for now we're going to have testlevel, we'll replace it later
var test_level = 1;



var test_data_old = {
    'question': "TEST QUESTION",
    'sentence': "TEST SENTENCE",
    'drop_downs': [
        {
        'type': 'drop',
        'heading': 'test heading',
        'choices': ['choice1', 'choice2', 'choice3'],
        'correct_answer': 'choice2'
        },
        {
        'type' : 'non_drop',
        'heading': 'test heading',
        'choices': ['choice1', 'choice2', 'choice3'],
        'correct_answer': 'choice2'
        }],
    'give_away_phrase': "The correct answer was: ",
    'give_away_ending_phrase': ". Now click on the correct answer."
};




var test_data_older = {
    'question': "TEST QUESTION",
    'sentence': "TEST SENTENCE",
    'drop_downs': {
        'DROPDOWN1': {
            'heading': 'test heading1',
            'choices': ['choice1', 'choice2', 'choice3'],
            'correct_answer': 'choice2'
        },
        'DROPDOWN2': {
            'heading': 'test heading2',
            'choices': ['choice1', 'choice2', 'choice3'],
            'correct_answer': 'choice2'
        }
    },
    'give_away_phrase': "The correct answer was: ",
    'give_away_ending_phrase': ". Now click on the correct answer."
};



var test_data = {
    'drop1' : {
        'heading': 'test heading1',
        'choices': ['choice1', 'choice2', 'choice3'],
        'correct_answer': 'choice2'
    },
    'drop2' : {
        'heading': 'test heading1',
        'choices': ['choice1', 'choice2', 'choice3'],
        'correct_answer': 'choice2'
    }
};



var GenericDropGame = function(){
    this.data = null;
    this.drop_downs = test_data;
};



GenericDropGame.prototype.attach = function(){
    el("answer_choices").style.display = 'initial';
    el("submit_button").style.display = 'initial';
    state.switch_count = 20;
};



GenericDropGame.prototype.get_mode_name = function() {
    return "genericdrop";
};

GenericDropGame.prototype.next_question = function (){






    this.question = "TEST QUESTION";
    this.sentence = "TEST SENTENCE";
    //this.target_indices = data.target_indices;      //highlighted word if necessary





    //drop_downs is a list of dictionaries
        //each dictionary has 3 properties:
        //heading
        //choices
        //correct answer (string or index?)
    this.drop_downs = test_data;

    this.give_away_phrase = "TEST GIVE AWAY PHRASE";

    //this.correct_answer = this.drop_downs.map(function (x) {return x.correct_answer}).join(' ');
    this.correct_answer = this.drop_downs.correct_answer;


    //console.log"LOG: question = ", this.question);
    //console.log"LOG: sentence = ", this.sentence);
    //console.log"LOG: target_indices = ", this.target_indices);
    //console.log"LOG: drop_downs = ", JSON.stringify(this.drop_downs));
    //console.log"LOG: give_away_phrase = ", this.give_away_phrase);
    //console.log"LOG: correct_answer = ", this.correct_answer);


    refresh_score();
    set_question_text(this.question);
    set_word_selector(this.sentence);

    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }

    this.make_drop_down();

};

GenericDropGame.prototype.make_drop_down = function(){
    //the arguments for the following are: drop_down, id, list, heading, to_string
    this.drop_downs.forEach(function (x) {set_multiple_drop_downs(x, "answer_choices", x.choices, x.heading)})
};





GenericDropGame.prototype.process_answer= function(){
    var is_correct = this.drop_downs.every(function (x) {return selected_option(x.drop_down)=== x.correct_answer});
    if (is_correct) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};


GenericDropGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
GenericDropGame.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
GenericDropGame.cell_2_feedback_wrong = ["Try again!", "Take another shot."];


GenericDropGame.prototype.process_correct_answer = function () {
    //console.log"answer matches target");
    state.incorrect_streak = 0;
    if (state.incorrect_streak < state.max_incorrect_streak) {
        state.count_correct++;
    }
    var cell_1 = random_choice(GenericDropGame.cell_1_feedback_right);
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    this.next_question();
};



GenericDropGame.prototype.process_incorrect_answer= function () {
    state.incorrect_streak++;
    state.count_incorrect++;
    refresh_score();
    state.word_selector.clear();

    if (state.incorrect_streak < state.max_incorrect_streak) {
        var cell_1 = random_choice(GenericDropGame.cell_1_feedback_wrong);
        var cell_2 = random_choice(GenericDropGame.cell_2_feedback_wrong);
        var fbox = el("feedbackbox");
        fbox.innerHTML = cell_1 + cell_2;
    } else {
        this.give_away_answer();
    }
};

GenericDropGame.prototype.give_away_answer = function (){
    var fbox = el("feedbackbox");
    fbox.innerHTML = this.give_away_phrase + " " + this.correct_answer;
};