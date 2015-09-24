
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
    
    set_mode(new QuickModeGame());

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

function pick_question_data(sentences, region_filter){
    
    var sentence = random_choice(sentences);
    var available_tags = new Set();
    var tag_to_region = {};

    for (var i in sentence.regions) {
        var r = sentence.regions[i];
        
        if(region_filter(r)){
            
            var tags = r.get_tag_types();
            console.log("DEBUG 9-3 region/tags = ", sentence.get_region_text(r), tags);
            
            for (var i = 0; i < tags.length; i++) {
                available_tags.add(tags[i]);
                var rs = tag_to_region[tags[i]];
                if (rs == null) {
                    rs = [];
                    tag_to_region[tags[i]] = rs;
                }
                rs.push(r);
            }

        }
    }

    var target_tag = random_choice(Array.from(available_tags));
    var available_regions = tag_to_region[target_tag];
    var target_region = random_choice(available_regions);
    
    return {
        sentence: sentence,
        target_tag: target_tag,
        target_region: target_region,
        available_tags: available_tags
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
    
    document.getElementById("testbox").innerHTML = "";
    console.log(sentence.text);
    state.sentence = sentence;
    var text_data = new Text(sentence.text);
    text_data.setup();
    state.word_selector = new WordSelector("testbox", text_data);
    text_data.word_selector = state.word_selector;
    state.word_selector.setup();    
    
}

function get_selected_region(){
    
    var answer_indices = state.word_selector.get_selected_indices();
    console.log("answer_indices = ", answer_indices);
    return state.sentence.get_region(answer_indices);

}

function get_regions_with_tag(tag_type){

    return state.sentence.get_regions().filter(function(r){
        return contains(r.get_tag_types(), tag_type);
    });
    
}

