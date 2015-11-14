///////POSSIBLY INCORPORATE ABOVE




//for now we're going to have testlevel, we'll replace it later


var MCMode2Game = function(){
    this.data = null;
};

MCMode2Game.prototype.attach = function(){
    // make word selector nonclickable (somewhere in set word selector)
    //(should word_selector.setup bave a flag for clickable or not clickable?
    //maybe something like in setup, if clickable is false then it just sets r[0] to false

    //todo
    //document.getElementById("answer_choices").style.display = 'initial';

    //document.getElementById("submit_button").style.display = 'initial';
    state.switch_count = 1;
    state.points_for_correct = 0;
    state.points_for_incorrect = 0;
};

MCMode2Game.prototype.get_mode_name = function() {
    return "MC2";
};

MCMode2Game.prototype.next_question = function (){
    //var test_level = Math.max(state.score(state), 1);
    //todo uncomment test level when done testing
    var test_level = 1;
    // todo change this for modular structure
    var list_of_lexeme_strings = return_lexicon_from_module(test_level);
    var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    var data = make_output(test_level, current_lexicon);
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
    this.give_away_ending_phrase = data.give_away_ending_phrase;

    this.correct_answer = this.drop_downs.map(function (x) {return x.correct_answer || x.non_drop_text}).join(' ');
    this.none_display = random_choice(map_level_to_allowed(test_level).none_display);

    refresh_score();
    document.getElementById("answer_choices").removeChild(document.getElementById('answer_wrapper'));
    var e = document.createElement('div');
    e.id = 'answer_wrapper';
    document.getElementById("answer_choices").appendChild(e);
    //remove_children(document.getElementById("answer_choices"));
    set_question_text(this.question);
    set_word_selector(this.sentence);
    state.word_selector.is_clickable = false;
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }

    // Hacky way to guarantee a drop down.
    var x = this.make_drop_down();
    if (x === 0) {this.next_question()}
};

MCMode2Game.prototype.display = function (x) {
    return x.type === 'non_drop' || x.correct_answer || this.none_display
};

MCMode2Game.prototype.make_drop_down = function(){
    var drops = 0;
    var self = this;
    var e = document.getElementById("answer_wrapper");
    this.drop_downs.forEach(function (x) {
        if (self.display(x)) {
            switch (x.type) {
                case 'non_drop':
                    // todo make sure this fix works
                    var e1 = document.createTextNode(x.non_drop_text || '');
                    e.appendChild(e1);
                    break;
                case 'drop down':
                    set_multiple_drop_downs(x, e, x.choices, x.heading, self.none_display);
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





MCMode2Game.prototype.process_answer= function(){
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

MCMode2Game.cell_1_feedback_right = ["Correct!", "Excellent!"];
MCMode2Game.cell_1_feedback_wrong = ["Whoops!", "Not exactly."];
MCMode2Game.cell_2_feedback_wrong = ["Try again!", "Take another shot."];

MCMode2Game.prototype.process_correct_answer = function () {
    //~`console.log("answer matches target");
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
        fbox.innerHTML = cell_1 + ' ' + cell_2;
    } else {
        this.give_away_answer();
    }
};

MCMode2Game.prototype.give_away_answer = function (){
    var fbox = document.getElementById("feedbackbox");
    fbox.innerHTML = this.give_away_phrase + this.correct_answer + this.give_away_ending_phrase;
};