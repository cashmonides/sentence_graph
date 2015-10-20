
    var SCORE_REWARD = 5;
    var SCORE_PENALTIES = [0, -1, -3];

    

    var state = {
        
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
        switch_count: 3
        
    };


window.onload = start;
window.onbeforeunload = function () {
    alert("window close triggered");
    delete_cookie("quiz_uid", "/", null);
}

function start(){
    load_user_data();
    load(data_loaded);
}


function load_user_data(){
    
    state.user.uid = get_cookie("quiz_uid");
    console.log("UID in load user data = ", state.user.uid);
    if (state.user.uid != null) {
        state.anonymous = false;
        get_user_data("score", function(data){
            console.log(data.val());
            state.score = data.val();
        });
    
        get_user_data("question_count", function(data){
            console.log(data.val());
            state.question_count = data.val();
        });
    } else {
        document.getElementById("anonymous_alert").innerHTML = "In Anonymous Session!" + " Click " + "<a href=\"https://sentence-graph-cashmonides.c9.io/lib/login/login.html\">here</a>" + " to login or create an account";
    }

}


    //
    //"../../quiz/index.html"



//data_loaded gets passed the data that comes back to us from firebase
//so we want to deserialize this data
function data_loaded(data){
    
    state.sentences = deserialize(data);
    console.log("sentences loaded: ", state.sentences.length);

    //todo uncomment when done testing
    set_mode(new QuickModeGame());



    //todo test below
    //set_mode(new GenericDropGame());

}

function set_mode(game){
    
    if(state.game != null){
        // state.game.detach();
    }
    
    state.game = game;
    state.game.attach();
    next_question();
    
}

function change_mode(){
    var random_number; 
    var new_mode;
    //todo 3 was changed below to accomodate genericdrop game
    do {
        random_number = Math.floor(Math.random() * 4);
        new_mode = get_mode(random_number);
        console.log("string of game = ", state.game.get_mode_name(), new_mode.get_mode_name());// state.game.prototype.toString(), new_mode.prototype.toString());
    } while (state.game.get_mode_name() == new_mode.get_mode_name());
    set_mode(new_mode);
}

function get_mode(mode_number) {
    //todo uncomment when done testing genericdrop mode
    //mode_number = random_choice([0, 2]);
    mode_number = 3;
    console.log('generic mode entered');

    switch(mode_number) {
        case 0 : return new DropModeGame();
        //todo switch back after testing
        //case 1 : return new MCModeGame();
        case 1 : return new MCMode2Game();
        case 2 : return new QuickModeGame();
        case 3 : return new GenericDropGame();
        default : throw "no game mode triggered";
    }
}


function next_question(){
    
    
    if(state.mode_streak == state.switch_count){
        state.mode_streak = 0;
        if (!state.anonymous) {
            set_user_data("score", state.score);
            set_user_data("question_count", state.question_count);
        }
        change_mode();
    } else {
        state.question_count++;
        state.mode_streak++;
        state.game.next_question(state);
    }
    
}

function process_answer(){
    state.game.process_answer(state);
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

function set_score(x){
    state.score = Math.max(0, x);
}

function refresh_score() {
    document.getElementById("scorebox").innerHTML = "Question #" + state.question_count + ", Remaining: " + (state.switch_count - state.mode_streak) + ", Score: " + state.score; //"Correct: " + state.count_correct + ", Incorrect: " + state.count_incorrect;
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