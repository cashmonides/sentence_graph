
var SCORE_REWARD = 5;
var SCORE_PENALTIES = [0, -1, -3];



var state = {

        user_data: null,

        user: {
            uid: null
        },

        anonymous: true,

        sentences: null,
        game: null,
        word_selector: null,
        sentence: null,

        score: 0,
        count_correct: 0,
        count_incorrect: 0,
        question_count: 0,
        mode_streak: 0,

        correct_streak: 0,
        incorrect_streak: 0,
        max_incorrect_streak: 3,
        switch_count: 10,               //=threshold
        progress_multiplier: 10,        //(a relic from the first implementation of progress bar)

        lightbox_count: 3,              //a relic, replace with threshold


        current_module: "kangaroo",
        current_module_progress: 0,
        current_module_reward: 2,
        current_module_penalty: 1,
        current_module_threshold: 10,

        bar_count: 0,
        bar_threshold: 10




    };


window.onload = start;
window.onbeforeunload = function () {
    alert("window close triggered");
    delete_cookie("quiz_uid", "/", null);
};

function start(){

    set_progress_bar();
    
    load_user_data();
    load(data_loaded);
    
    
}

function set_progress_bar_old() {
    // var x = (state.question_count / state.switch_count) * 100;
    // var x = random_choice([10,20,30,40,50,60,70,80,90,100]);
    //var x = state.mode_streak * state.progress_multiplier;


    console.log("DEBUG 10-26 state.mode_streak", state.mode_streak);

    //var x = (state.mode_streak * state.current_module_reward);
    //x = x / 4;
    //x = x / state.current_module_threshold;
    //x = x * 100;

    //var x = state.mode_streak / state.current_module_threshold;             //this one is giving .1%
    //var x = (state.mode_streak / state.current_module_threshold) * 100;

    var x;
    if (state.current_module_progress === 0) {
        x = 0;
    } else {
        x = (state.current_module_progress / state.current_module_threshold) * 100;
    }

    var e = document.getElementById("progress-bar");
    e.style.width = x + "%";
    document.getElementById("progress-bar").innerHTML = JSON.stringify(x) + "%";
}


function set_progress_bar() {
    //todo make sure mode streak is changed to bar_count
    console.log("DEBUG 10-26 state.mode_streak", state.mode_streak);

    var x;
    if (state.bar_count === 0) {
        x = 0;
    } else {
        x = (state.bar_count / state.bar_threshold) * 100;
    }
    var e = document.getElementById("progress-bar");
    e.style.width = x + "%";
    document.getElementById("progress-bar").innerHTML = JSON.stringify(x) + "%";
}


function reset_progress_bar(){
    var x = 0;
    var e = document.getElementById("progress-bar");
    e.style.width = x + "%";
    document.getElementById("progress-bar").innerHTML = JSON.stringify(x) + "%";
}

function load_user_data(){
    state.user_data = new User();
    //the following line both tests the conditional and actually loads the data
    if (!state.user_data.load(user_data_loaded)) {
        document.getElementById("anonymous_alert").innerHTML = "In Anonymous Session!" + " Click " + "<a href=\"https://sentence-graph-cashmonides.c9.io/lib/login/login.html\">here</a>" + " to login or create an account";
    }

}




function user_data_loaded() {
    //todo should we also load user id??
    //todo should score and question count be used at all?
    state.score = state.user_data.data.score;
    //todo probably eliminate question count
    state.question_count = state.user_data.data.question_count;
}

//data_loaded gets passed the data that comes back to us from firebase
//so we want to deserialize this data
//todo rename to sentence_data_loaded
function data_loaded(data){
    state.sentences = deserialize(data);
    console.log("sentences loaded: ", state.sentences.length);

    //todo generalize this so it doesn't always load a quickmode game
    set_mode(new QuickModeGame());
}

function logout_from_quiz() {
    state.user_data.logout();
    document.location = "../lib/login/login.html";
}


function set_mode(game){
    //todo what is the point of the following if statement
    if(state.game != null){
        // state.game.detach();
    }
    state.game = game;
    state.game.attach();
    next_question();
}


//todo is this used anymore?
function change_mode(){
    state.bar_count = 0;
    reset_progress_bar();


    var random_number;
    var new_mode;
    //todo 4 is an arbitrary parameter below (make it into a global variable updated as new modes get added)
    //todo - refactor while statement - we don't always want it to be a new mode (only infrequent)
    do {
        random_number = Math.floor(Math.random() * 4);
        new_mode = get_mode(random_number);
        console.log("string of game = ", state.game.get_mode_name(), new_mode.get_mode_name());// state.game.prototype.toString(), new_mode.prototype.toString());
    } while (state.game.get_mode_name() == new_mode.get_mode_name());
    set_mode(new_mode);
}

function get_mode(mode_number) {
    //todo uncomment when done testing
    mode_number = random_choice([0, 2]);
    //mode_number = 2;

    switch(mode_number) {
        case 0 : return new DropModeGame();
        case 1 : return new MCMode2Game();
        case 2 : return new QuickModeGame();
        case 3 : return new GenericDropGame();
        default : throw "no game mode triggered";
    }
}


function next_question(){
    set_progress_bar();
    if (state.bar_count >= state.bar_threshold) {
        fill_lightbox("pop_up_div", state.score);
        $.featherlight($('#pop_up_div'), {afterClose: next_question_2});
    } else {
        next_question_2();
    }
}

function next_question_2 () {

    //todo old code below
    //if(((state.current_module_progress * state.current_module_reward) / state.current_module_threshold) / state.current_module_reward >= 1){
    //    state.mode_streak = 0;
    //    if (!state.anonymous) {
    //        set_user_data("score", state.score);
    //        set_user_data("question_count", state.question_count);
    //    }
    //    //todo we really want this to be change module but we will improve later
    //    change_mode();state.incorrect_streak = 0;
    //} else {
    //    state.question_count++;
    //    state.mode_streak++;
    //    state.game.next_question(state);
    //}


    //todo new code below
    //todo should the following be changed to: if (state.bar_count >= state.bar_threshold)???
    if(((state.bar_count * state.current_module_reward) / state.bar_threshold) / state.current_module_reward >= 1){
        //todo akiva commented this out check that it works //state.bar_count = 0;
        if (!state.anonymous) {
            set_user_data("score", state.score);
            set_user_data("question_count", state.question_count);
            //todo add module progress here to user data
        }


        state.current_module_progress++;
        //todo we really want this to be change module but we will improve later
        change_mode();
    } else {
        //// we don't want to increase mode_streak here right? only if they get it right
        //state.question_count++;  // otiose??
        //state.mode_streak++;    // otiose??
        state.game.next_question(state);
    }
    
}


function fill_lightbox(div, score) {
    //todo how to do the following???
    // var name_of_player = user_data.profile.name;
    // document.getElementById(div).innerHTML = "CONGRATULATIONS " + name_of_player +"! YOU'RE READY FOR THE NEXT STAGE";
    document.getElementById(div).innerHTML = "CONGRATULATIONS [YOUR NAME HERE]! YOU'RE READY FOR THE NEXT STAGE";
}


function process_answer(){
    state.game.process_answer(state);
    //set_progress_bar(); (this is probably otiose here since it's called in next question)
}

function pick_question_data(sentence, region_filter){
    
    var available_tags = sentence.get_all_tag_types(region_filter);
    var target_tag = random_choice(Array.from(available_tags));
    
    var tag_to_region = sentence.get_regions_for_tags(region_filter);
    var available_regions = tag_to_region[target_tag];
    var target_region = random_choice(available_regions);
    
    return {
        sentence: sentence,
        available_tags: available_tags,
        target_tag: target_tag,
        target_region: target_region
    };
    
}

//todo rename this to something like set_floor_to_score
function set_score(x){
    state.score = Math.max(0, x);
}


function set_bar_count(x){
    state.bar_count = Math.max(0, x);
}

function set_module_score(x){
    state.current_module_progress = Math.max(0, x);
}

function refresh_score() {
    document.getElementById("scorebox").innerHTML = "Question #" + state.question_count + ", Remaining: " + (state.switch_count - state.mode_streak) + ", Score: " + state.score; //"Correct: " + state.count_correct + ", Incorrect: " + state.count_incorrect;
}

function refresh_module_score() {
    document.getElementById("scorebox").innerHTML = "BAR score" + state.bar_count + "/" + state.bar_threshold + ", MODULE Score: " + state.current_module_progress + "/" + state.current_module_threshold;
}



function set_question_text(question){
    document.getElementById("questionbox").innerHTML = question;
}

function wrap_string(tag) {
    return "<span class=\"tag_names\">" + tag + "</span>";
}

function set_word_selector(sentence){
    console.log("DEBUG 9-29 sentence in set_word_selector", sentence);
    document.getElementById("testbox").innerHTML = "";
    console.log(sentence.text);
    state.sentence = sentence;
    //todo changes here
    var word_sel_input;
    if (sentence.text) {
        word_sel_input = sentence.text;
    } else {
        word_sel_input = sentence;
    }
    var text_data = new Text(word_sel_input);
    text_data.setup();
    state.word_selector = new WordSelector("testbox", text_data);
    state.word_selector.setup();    
    
}

function get_selected_region(){
    
    var answer_indices = state.word_selector.get_selected_indices();
    console.log("answer_indices = ", answer_indices);
    return state.sentence.get_region(answer_indices);

}


function toggle_cheat_sheet() {
    var button = document.getElementById("cheat_sheet_button");

    button.onclick = function() {
        var div = document.getElementById("image_display_box");
        if (div.style.display !== 'none') {
            div.style.display = 'none';
        }
        else {
            div.style.display = 'block';
        }
    };
}