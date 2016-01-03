var new_sentence = function () {
    // We set the inner html of all of the children of the body
    // (except for the labels and buttons) to the empty string.
    Array.from(document.body.children).forEach(function (x) {
        if (x.nodeName !== "LABEL" && x.nodeName !== "BUTTON") {x.innerHTML = ""}});
    // We get a text from the user.
    var text = '| ' + prompt('Enter your sentence:');
    // We create tag_list (our list of allowed tags)
    // and auto_dict (our dictionary of words that can be tagged automatically).
    // Because auto_dict is huge, we get it by calling
    // a function that returns it.
    var tag_list = ["noun", "verb", "subject", "object", "predicate", "main clause",
        "subordinate clause: relative", "subordinate clause: indirect statement",
        "subordinate clause: indirect question", "subordinate clause: temporal",
        "adjective", "adverb", "antecedent", "definite article", "indefinite article",
        "personal pronoun", "possessive adjective", "subordinating conjunction",
        "coordinating conjunction", "preposition"];
    var auto_dict = create_auto_dict();
    // To access HTML is an expensive operation so we assign
    // our box (which is in the document) to a variable before the for loop
    // implicit in load_sentence_1. We also clear its contents.
    var input_box = document.getElementById("box");
    // We call the load_sentence_1 function, which:
    // 1: puts our text in the input box.
    // 2: returns the words that our text contains
    // (including brackets and slashes as words)
    // in the format of a list of strings.
    var words = load_sentence_1(text, input_box);
    // We call process_bracketed_text, which returns a sentence.
    var sentence = process_bracketed_text(words);
    // We call a special logging function.
    log_relationships(sentence);
    // The function automatic_tag tags words in auto_dict.
    automatic_tag(sentence, word_selector, auto_dict);
    // We create a word selector.
    var word_selector = new WordSelector(words);
    // We give the words of the sentence id and onclick properties.
    load_sentence_2(word_selector, input_box);
    // We create our buttons and tags, after emptying the buttons.
    generate_buttons(sentence, word_selector, tag_list);
    generate_tags(sentence, tag_list);
    // We set the behavior of the all regions box.
    set_all_regions_behavior(sentence, word_selector);
    // We display all regions of the sentence in the all regions box.
    display_all_regions(sentence);
    // We set the behavior of the delete_tags button.
    set_delete_tags_behavior(sentence, word_selector)
};

window.onload = function () {
    document.getElementById('new_sentence').onclick = new_sentence;
};