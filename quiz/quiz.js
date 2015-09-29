
    var state = {
        
        sentences: null,
        game: null,
        word_selector: null,
        sentence: null,
        
        count_correct: 0, 
        count_incorrect: 0,
        
        correct_streak: 0,
        incorrect_streak: 0,
        max_incorrect_streak: 3
        
    };


window.onload = start;

function start(){
    load(data_loaded);
}

//data_loaded gets passed the data that comes back to us from firebase
//so we want to deserialize this data
function data_loaded(data){
    
    state.sentences = deserialize(data);
    console.log("sentences loaded: ", state.sentences.length);
    
    set_mode(new MCModeGame());

}

function set_mode(game){
    
    if(state.game != null){
        // state.game.detach();
    }
    
    state.game = game;
    state.game.attach();
    next_question();
    
}

function next_question(){
    state.game.next_question(state);
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

function refresh_score() {
    document.getElementById("scorebox").innerHTML = "Correct: " + state.count_correct + ", Incorrect: " + state.count_incorrect;
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


