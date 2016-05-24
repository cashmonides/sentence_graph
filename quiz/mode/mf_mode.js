var MFModeGame = function(){
    this.data = null;
    this.quiz = null;
    this.match_fraction = null;
    this.student_answer = null;
    // this.current_chapter = null;
    // this.current_question = null;
    this.current_chapter = "1";
    // We have to start here since we increment first.
    this.current_question = "0";
};



var mf_sentences_original = {
	"1.1" : ["Nauta in patriā poenās rēgīnae timet.", "The sailor in-the-country/homeland fears the penalties/punishments of-the-queen."],

	"1.2" : ["Poēta pecūniam fāmamque nōn optat.", "The poet does-not-want/choose money-and-fame."],

	"1.3" : ["Pecūniam poētārum habēmus.", "We-have the money-of-the-poets."],

	"1.4" : ["Poētīsne rēgīna pecūniam dabit?", "Will-the-queen-give the money to-the-poets?"],

	"1.5" : ["Rēgīnam īnsulae cum turbā nautārum vidēre optābāmus.", "We {were-wanting||wanted||were-choosing||chose} to-see the queen-of-the-island with-the-crowd-of-the-sailors."],

	"1.6" : ["Fēminae enim poētās corōnīs corōnābunt.", "Indeed the women will-crown the poets with-crowns."],

	"1.7" : ["Fēminās in viīs vidēbātis, sed dē fōrmā nōn clāmābātis. Poenās dabitis.", "You-(plural)-were-seeing the women in/on-the-roads but concerning/about-their-beauty you-(plural)-were-not-shouting. You-(plural)-will-pay-the-penalty."],

	"1.8" : ["Poētae rēgīnam patriae ē turbā fēminārum optant.", "The poets do-not-want/choose a queen-of/for-the-country/homeland {from||out-of}-the-crowd-of-women."],

	"1.9" : ["Est cūra dē poenā poētae.", "There-is-anxiety/concern about/concerning-the-penalty-of-the-poet."],

	"1.10" : ["Taedās in viā vidēre timēbō.", "I-will-{be-afraid||fear}-to-see the torches-in-the-road."],

	"1.11" : ["Taedamne in īnsulā vidētis?", "Do-you-(plural)-see the torch-in/on-the-island?"],

	"1.12" : ["Turbamne fēminārum in īnsulā vidēs?", "Do-you-see the crowd-of-women on/in-the-island?"],

	"1.13": ["Cum poētā ē portīs in viam ambulō", "I-walk with-the-poet out-of-the-gates into/onto-the-street."],

	"1.14": ["Poētae et poenam et fāmam timent.", "The poets fear both-penalty/punishment-and-fame/glory."],

	"1.15": ["Viās turbā implēbunt.", "They-will-fill the roads with-a-crowd/uproar."],

	"1.16": ["Nautae fēminās taedīs terrēbant", "The sailors were-terrifying/frightening the women with-torches."],

	
	"1.17": ["Et pecūniā et corōnīs poētās dōnābis.", "You-will-present/reward the poets with-both-money-and-crowns."],

	"1.18": ["Erisne in īnsulā cum rēgīnā?", "Will-you-be on/in-the-island with-the-queen?"],

	"1.19": ["Fēminae est fōrma, fāma nautae; fēminīs est fōrma, fāma nautīs.", "To-a-women is beauty, fame (is) to-a-sailor; to-women is beauty, fame (is) to-sailors."],

	"1.20": ["Poena nautārum erat cūra rēgīnae.", "The penalty-of-the-sailors was-anxiety/concern to/of-the-queen."],

	"1.21": ["Rēgīnaene corōnam vidēre optābās?", "Were-you-wanting/choosing to-see the crown of-the-queen?"],

	"1.22": ["Rēgīnae dē patriā cūram habent.", "The queens-have-anxiety concerning/about-the-country/homeland."],

	"1.23": ["Nauta enim poenās dare nōn optat.", "Indeed the sailor does-not-want to pay the penalty."],

	"1.24": ["Ex aquā ambulāmus.", "We walk {from||out-of}-water."],  

	"1.25": ["Patria poētae est īnsula.", "The country/homeland-of-the-poet is-an-island."],

	"1.26": ["Īnsulam esse patriam habēbat.", "He/she/it-was-considering the island to-be-his-country/homeland."],

	"1.27": ["Vidēre taedās patriae est nautīs cūra.", "To-see the-torches-of-the-country/homeland is an anxiety/concern to/for-the-sailors."]

}


//below is an abbreviated version for testing
var mf_sentences = {
	"1.1" : ["Nauta in patriā poenās rēgīnae timet.", "The sailor in-the-country/homeland fears the penalties/punishments of-the-queen."],

	"1.2": ["Poēta pecūniam fāmamque nōn optat.", "The poet does-not-want/choose money-and-fame."],

	"1.3" : ["Pecūniam poētārum habēmus.", "We-have the money-of-the-poets."],
	
	"1.4" : ["four", "four"],
	
	"1.5" : ["five", "five"],
	
	"1.6" : ["six", "six"],
	
	"1.7" : ["seven", "seven"],
	
	"1.9" : ["nine", "nine"],
	
	"1.10" : ["ten", "ten"],
	
	"1.20" : ["twenty", "twenty"],
	
	"1.21" : ["twenty plus one", "twenty plus one"],
	
    "2.2" : ["Sententiam mūtābit. Sententiam mūtāre dubitat. Sententiam mūtāre incēperat. Sententiam mūtāvit.", "He/she/it-will-change his-opinion. He/she/it-hesitates-to-change his-opinion. He/she/it-had-begun-to-change his-opinion. He/she/it-changed his-opinion."],

    "2.3" : ["Nisi fēminae nautās sententiārum dē incolīs dāmnābunt, incolae in prōvinciā nōn labōrābunt.", "{If-the-women-do-not-condemn||unless-the-women-condemn} the-sailors for-their-opinions, the-inhabitants will-not-labor in-the-province."],

    "2.4" : ["Incolae sī fēminās īnsulae dāmnārent, nautae ad terram venīre nōn dubitārent.", "If-the-inhabitants-were-condemning the-women of-the-island, the-sailors would-not-be-hesitating-to-come to/towards/toward-the-land."],
    
    "2.5" : ["two five", "two five"],
    
    "2.8" : ["two eight", "two eight"],
    
    "3.5" : ["three five", "three five"],
    
    "3.8" : ["three eight", "three eight"],
    
    "3.18" : ["three eighteen", "three eighteen"],
    
}

var mf_sentences_super_abbreviated = {
	1.1: ["1", "1"],

	1.2: ["2", "2"],

	1.3: ["3", "3"],
	
	2.1: ["4", "4"],

 	2.2: ["5", "5"],

 	2.3: ["6", "6"]
}

MFModeGame.cell_1_feedback_right = ["Correct!", "Excellent!"];
// Originally values here were lists with the same item repeated.
// I made them strings because I thought that would be clearer.
// But then it turned out that they weren't ever used.
// So I commented them out.
// MFModeGame.cell_1_feedback_wrong = "That doesn't match the model translation.";
// MFModeGame.cell_3_feedback_wrong = "That doesn't match the model translation.";

// This function is called very often (every question).
// So it is not a good place for one-time things.
MFModeGame.prototype.attach = function() {
    set_display("latin_answer_choices", 'none');
    set_display("drop_answer_choices", 'none');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("etym_cheat_button", 'none');
    set_display("input_box", 'initial');
    set_display("next_button", 'none');
    set_display("skip_button", 'none');
    set_display("next_level_button", 'none');
    // set_display("feedback_for_input", 'none');
};

MFModeGame.prototype.get_current_question = function () {
    // This was said to not be working, but that makes no sense.
    return this.current_question;
}

MFModeGame.prototype.get_current_chapter = function () {
    // This was said to not be working, but that makes no sense.
    return this.current_chapter;
}

// Once the game is attached to the quiz, this is what must be done.
MFModeGame.prototype.do_with_quiz_attachment = function () {
    this.chapter_and_sentence_init();
}

MFModeGame.prototype.chapter_and_sentence_init = function () {
    console.log('WARNING: chapter and sentence initialized ' +
    '(perhaps re-initialized)');
    var sl = this.quiz.user.data.history.sentence_logs;
    console.log('sl =', sl);
    //todo Akiva commented these out for testing, comment back in
    this.current_chapter = sl.frontier_chapter;
    this.current_question = sl[sl.frontier_chapter].frontier;
    // this.current_chapter = 1;
    // this.current_question = 0;
    console.log('this =', this);
}

MFModeGame.prototype.set_question = function () {
    throw 'setting question number is not implemented!!!!';
}

MFModeGame.prototype.set_chapter = function () {
    throw 'setting chapter number is not implemented!!!!';
}

// These functions were added during a period when the writer
// was particularly interested in what someone somewhere
// whom I could not find with a Google search (and whom I agree with)
// calls "OOP crap." As a result, it is at least somewhat readable.

// A helper object. Denotes a location at which a sentence
// may - or may not - be. The only way to find out is to check.
// The internals are rather simple. The arguments are converted
// to numbers so we can easily add to them.
var SentenceFinder = function (chapter_n, question_n) {
    this.chapter_n = Number(chapter_n);
    this.question_n = Number(question_n);
}

// Simply goes to the next sentence, without consideration
// of whether it exists.
SentenceFinder.prototype.next = function () {
    this.question_n++;
}

var sentence_finder_start_chapter = function (n) {
    return new SentenceFinder(n, 0);
}

// Turns the object into a searchable string.
// (I feel like I don't want to override toString here.
// Maybe I should.)
// . is the separator. If it changes, we can just change the dot.
SentenceFinder.prototype.as_string = function () {
    return this.chapter_n + '.' + this.question_n;
}

// Finds the number of questions to try to find.
// This will fail only if a) some section has over 1000 questions,
// and b) it has some complete gap at least 10 times the length
// of the section before the gap. This is hard to imagine.
// (Come back to this, consider if the solution which
// examines all the keys of mf_sentences might be better.)
MFModeGame.prototype.num_of_questions_to_try = function () {
    return Math.max(this.current_question * 10, 100);
}

// Finds whether a sentence (in the form of a SentenceFinder) exists.
// Uses mf_sentences. The goal is for only three methods
// (including this one) to do this.
// (Consider whether this should be a method given that
// it does not use the game object itself.)
MFModeGame.prototype.has_sentence = function (sentence_finder) {
    return sentence_finder.as_string() in mf_sentences;
}

// Checks for a sentence. Throws an error if the sentence does not exist.
// Uses mf_sentences. The goal is for only three methods
// (including this one) to do this.
// (Consider whether the this.has_sentence check would be cleaner
// as a check with mf_sentences directly, since we're not being abstract in
// this method anyway.)
MFModeGame.prototype.get_sentence = function (sentence_finder) {
    // Here is a potential alternative.
    // if (sentence_finder.as_string() in mf_sentences) {
    if (this.has_sentence(sentence_finder)) {
        return mf_sentences[sentence_finder.as_string()];
    } else {
        throw 'trying to get non-existant sentence! (potential solution: ' +
        'check for existance first)';
    }
}

// Gets the current sentence.
// Category theory implication: we can make
// (a -> b) -> (((a, b) -> c) -> (a -> c))
// to be precise (Haskell):
// func f g x = g (x, (f x))
MFModeGame.prototype.get_current_sentence = function () {
    return this.get_sentence(this.sentence_finder());
}

// Returns a SentenceFinder corresponding to the current game state.
// Uses mf_sentences. The goal is for only three methods
// (including this one) to do this. Originally the goal was two,
// but this method changed that.
MFModeGame.prototype.sentence_finder = function () {
    return new SentenceFinder(this.current_chapter, this.current_question);
}

// Sets the sentence to a sentence in the sentence finder.
// This is surprisingly simple. Do we also have to set some text question?
// Something is fishy here.
// Actually, it's fine. It's very possible to get the sentence.
MFModeGame.prototype.use_sentence = function (sentence_finder) {
    this.current_chapter = sentence_finder.chapter_n;
    this.current_question = sentence_finder.question_n;
}

// Gets the next question.
MFModeGame.prototype.get_incremented_question = function () {
    // We find the number of questions to try.
    var num_to_try = this.num_of_questions_to_try();
    // We create our sentence finder.
    var sentence_finder = this.sentence_finder();
    // Loop num_to_try times. (Note: I do not think there is
    // an off-by-one error here, but if there is it is not significant.)
    for (var i = 0; i < num_to_try; i++) {
        // Increment our sentence finder.
        sentence_finder.next();
        if (this.has_sentence(sentence_finder)) {
            // We found a sentence!
            return sentence_finder;
            // We're done.
        }
    }
    // No sentence was found!
    return 'done';
}

// Gets the first question in a chapter.
MFModeGame.prototype.get_first_question_in_chapter = function (chapter) {
    // We find the number of questions to try.
    var num_to_try = 1000;
    // We create our sentence finder.
    var sentence_finder = sentence_finder_start_chapter(chapter);
    console.log('sentence_finder =', sentence_finder);
    // Loop num_to_try times. (Note: I do not think there is
    // an off-by-one error here, but if there is it is not significant.)
    for (var i = 0; i < num_to_try; i++) {
        // Increment our sentence finder.
        sentence_finder.next();
        if (this.has_sentence(sentence_finder)) {
            // We found a sentence!
            return sentence_finder;
            // We're done.
        }
    }
    // No sentence was found!
    return 'done';
}

MFModeGame.prototype.get_sentence_finder_to_use = function (
    sentence_finder, chapter) {
    if (sentence_finder instanceof SentenceFinder) {
        return sentence_finder;
    } else {
        return this.get_sentence_finder_to_use(
            this.get_first_question_in_chapter(chapter + 1), chapter + 1);
    }
}

MFModeGame.prototype.get_next_sentence = function () {
    return this.get_sentence_finder_to_use(
        this.get_incremented_question(), this.current_chapter);
}

MFModeGame.prototype.increment_question = function () {
    var sentence_finder = this.get_next_sentence();
    this.use_sentence(sentence_finder);
}

MFModeGame.prototype.finish_chapter = function () {
    // Remove when fixed.
    alert('Finishing the chapter!!! Currently this leads to an endless loop!');
    throw 'finishing a chapter is not implemented!!!!';
}

MFModeGame.prototype.set_level = function (new_level) {
    this.level = new_level;
}

MFModeGame.prototype.get_mode_name = function() {
    return "mf";
}





MFModeGame.prototype.next_question = function () {
    console.log("DEBUG 4-9 starting next_question in mf mode");
    
    
    clear_input_box("input_box");
    
    //todo since we're not doing drops we don't need drop_level or extra_level
    // var types_of_level = ['latin_drop_level', 'latin_extra_level', 'latin_level'];
    // var post_sampling_level = range_sampler(this.quiz.module.id, types_of_level);
    // this.set_level(post_sampling_level);
    
    
    
    //sets up our lexicon
    // console.log("DEBUG 1/15 this.quiz.module.id =", this.quiz, this.quiz.module, this.quiz.module.id)
    // var list_of_lexeme_strings = return_lexicon_from_module(this.quiz.module.id);
    // console.log('DEBUG 11-16 lexicon = ', list_of_lexeme_strings)
    // var current_lexicon = generate_current_lexicon(list_of_lexeme_strings);
    console.log('this =', this);
    var data = this.get_current_sentence()
    
    console.log('data, search, mf_sentences =', data,
    this.current_chapter + '.' + this.current_question, mf_sentences);
    
    
    //this.question = data.question;
    //todo is the following otiose?
    this.sentence = data[0];
    this.model_translation = data[1];
    
    console.log(data, this.sentence, this.model_translation);
    
    // this.target_indices = data.target_indices;      //highlighted word if necessary

    // console.log("DEBUG 4-9 data.sentence = ", data.sentence);
    
    //changes the score, progress bar, etc.
    this.quiz.update_display();

    Quiz.set_question_text("Translate the following sentence:");
    this.quiz.set_word_selector(data[0]);
    this.correct_answer = data[1];
    
    this.data = data;
    
    
    
    this.give_away_phrase = 'If you\'d like to skip this question and move on, click "SKIP". If you\'d like to keep trying, click "SUBMIT".';
    //this.give_away_ending_phrase = "dummy give away ending phrase";
    
    
    
    
    // console.log("DEBUG entering 1st random_choice");
    // this.none_display = random_choice(map_level_to_allowed(
    //     this.level.latin_extra_level, latin_extra_levels).none_display);
    
    //////////
    //todo all of below was commented out because it seemed to do strictly with drop downs which we wont use in input mode
    
    // We now use this to guarantee that our answer choices end up in the right place.
    // remove_element(el("answer_choices"));
    // remove_element_by_id("latin_answer_choices");
    
    // var new_answer_choices = document.createElement('div');
    
    // new_answer_choices.id = "latin_answer_choices";
    
    // el('drop_downs').appendChild(new_answer_choices);
    
    // document.getElementById("answer_choices").removeChild(
    //     document.getElementById('answer_wrapper'));
    
    // var e = document.createElement('div');
    // e.id = 'latin_answer_wrapper';
    // new_answer_choices.appendChild(e);
    //////////////////
    
    
    
    
   
    this.quiz.word_selector.is_clickable = false;
    this.quiz.word_selector.click_callback = this.quiz.process_answer.bind(this.quiz);
    
    //todo Akiva is confused on this (what is the point of it? do we need it in input mode?)
    if (this.target_indices) {
        this.target_indices.forEach(function (x) {state.word_selector.set_highlighted(x, true)});
    }

    //todo Akiva has no idea what to do with this below
    // Hacky way to guarantee a drop down.
    // var x = this.make_drop_down(e);
    // if (x === 0) {this.next_question()}
    
};


//todo below is our string cleanup and matcher

MFModeGame.prototype.process_answer = function(){
    // var self = this;
    var raw_input_string = el("input_box").value;
    this.student_answer = raw_input_string;
    console.log("DEBUG INPUT 4-9 raw input string = ", raw_input_string);
    
    /*
    var processed_input_string = clean_mf_input_string(raw_input_string);
    console.log("DEBUG INPUT 4-9 process input string = ", processed_input_string);
    
    var processed_model_translation = clean_mf_model_string(this.correct_answer)
    */
    
    this.match_fraction = percentage(get_match_fraction(this.correct_answer, raw_input_string), 1);
   
   
   
   
    if (this.match_fraction >= 75) {
        this.process_correct_answer();
    } else {
        this.process_incorrect_answer();
    }
};





//todo below is uncomplicated, just like every other mode

MFModeGame.prototype.process_correct_answer = function () {
    
    console.log("DEBUG 5/23 checkpoint 1");
    this.quiz.update_sentence_log(
        this.sentence_finder(), this.get_next_sentence(), "completed");
    console.log("this.current_chapter = ", this.current_chapter);
    console.log("this.current_question = ", this.current_question);
    console.log("DEBUG 5/23 checkpoint 2");
    
    
    
    
    this.quiz.increment_score();
    
    
    
    
    var cell_1 = "Excellent, your match score was: " + this.match_fraction + "%" + "<br\/>" 
    + "The sentence was: " + this.sentence + "<br\/>" 
    + "The model translation is: " + display_model_translation(this.correct_answer) + "<br\/>"
    + "Your answer was: " + this.student_answer;
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1;
    
    clear_input_box("input_box");
    
    console.log("DEBUG 4-9 entering question_complete");
    this.quiz.question_complete();
};



MFModeGame.prototype.process_incorrect_answer = function () {
    this.quiz.submodule.incorrect_streak ++;
    
    var cell_1 = "Not exactly. Your match fraction is: " + this.match_fraction + "%";
    var cell_3 = "Try to get above 75%.";
    var fbox = el("feedbackbox");
    fbox.innerHTML = cell_1 + " " + cell_3;
    if (this.quiz.submodule.incorrect_streak >=
    this.quiz.module.submodule.max_incorrect_streak)  {
        this.give_away_answer();
        // clear_input_box("input_box");
    }
    this.quiz.update_display();
    
    
    
    
    // akiva tried uncommenting the following as an experiment (but that didn't work) (the following isn't used in mcmode)
    // this.quiz.word_selector.clear();
    
    
    
};

// mf mode is special in regard to the "give away" option
// we want the feedback box to remain operational
// so we change some if statements
MFModeGame.prototype.give_away_answer = function (){
    set_display("next_button", 'none');
    set_display("feedback_for_input", 'initial');
    set_display("submit_button", 'initial');
    set_display("cheat_sheet_button", 'none');
    set_display("vocab_cheat_button", 'none');
    set_display("skip_button", 'initial');
    var fbox_for_input = el("feedback_for_input");
    fbox_for_input.innerHTML = this.give_away_phrase;
    // var fbox = el("feedbackbox");
    // fbox.innerHTML = "";
    //todo very important: write to firebase that they skipped this question
    //todo very important
    //write to firebase using a function like   log_skipped_sentence(this.current_question)
    
    
    
    console.log("DEBUG 5/23 checkpoint #3 - give away answer triggered");
};




////////////////////////////////////////////
