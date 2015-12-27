var ALL_TUTORIALS = {
    tutorial_id1 : {
        meta_data: {
            topic: "subject, object, verb",
        },
        "0": {next: 1},
        "1": {
            // A string that describes the tutorial
            heading: "WELCOME TO THE SUBJECT AND OBJECT",
            //A string describing the path to the image
            image: null,
            // The text of the tutorial
            body: "Latin uses ENDINGS to show who is doing the action (the subject) and who is having the action done to him (the object)",
            // The question asked at the end of the tutorial (page)
            // (sometimes a default "none" value)
            question: "Who is the subject in the following sentence?",
            
            sentence: "The dog loves the cat.",
            // The list of answer choice (strings)
            // (sometimes a default "none" value)
            answer_choices: ["dog", "cat", "loves", "the"],
            
            // The correct answer choice (a string)
            // (sometimes a default "none" value)
            // mutually exclusive with advance_button
            correct_answer: "dog",               
            
            
            //optional (bools)
            back_button: false,                     
            
            //advance_button is bool that says whether we need
            // a button that advances to the next page
            //sometimes false because only correct answer advances
            advance_button: false,                      
            
            //pointer to previous tutorial page
            previous: null,
            
            
            //integer or file name as string that points to the next tutorial page
            //or it's something like "finish" if it leads to the quiz
            next: 2
        },
        "2": {
            heading: "WELCOME TO THE VERB",
            //A string describing the path to the image
            image: "",
            // The text of the tutorial
            body: "The verb describes the action being done",
            // The question asked at the end of the tutorial (page)
            // (sometimes a default "none" value)
            question: "what tense is the following verb in?",
            sentence: "The cat loves the dog.",
            // The list of answer choice (strings)
            // (sometimes a default "none" value)
            answer_choices: ["past", "present", "future"],
            
            // The correct answer choice (a string)
            // (sometimes a default "none" value)
            // mutually exclusive with advance_button
            correct_answer: "present",               
            
            
            //optional
            back_button: true,                     
            
            //advance_button is a button that advances to the next page
            //sometimes empty because only correct answer advances
            advance_button: false,                       
            
            //pointer to previous tutorial page
            previous: 1,
            
            
            //integer or file name as string that points to the next tutorial page
            //or it's something like "finish" if it leads to the quiz
            next: "end"    //escapes from tutorial and leads the player to quiz
        },
    },
    tutorial_id2 : {
        meta_data: {
            topic: "coordinating conjunctions and indirect statement - test version",
        },
        "0": {next: 1},
        "1": {
            // A string that describes the tutorial
            heading: "WELCOME TO THE COORDINATING CONJUNCTION",
            //A string describing the path to the image
            image: null,
            // The text of the tutorial
            body: "The coordinating conjunction coordinates two clauses.",
            // The question asked at the end of the tutorial (page)
            // (sometimes a default "none" value)
            question: "Which word in this sentence is the coordinating conjunction?",
            
            sentence: "The dog loves the cat / but the cat loves the rat.",
            // The list of answer choice (strings)
            // (sometimes a default "none" value)
            answer_choices: ["dog", "cat", "loves", "the", "but"],
            
            // The correct answer choice (a string)
            // (sometimes a default "none" value)
            // mutually exclusive with advance_button
            correct_answer: "but",               
            
            
            //optional (bools)
            back_button: false,                     
            
            //advance_button is bool that says whether we need
            // a button that advances to the next page
            //sometimes false because only correct answer advances
            advance_button: false,                      
            
            //pointer to previous tutorial page
            previous: null,
            
            
            //integer or file name as string that points to the next tutorial page
            //or it's something like "finish" if it leads to the quiz
            next: 2
        },
        "2": {
            heading: "HOW INDIRECT STATEMENT WORKS",
            //A string describing the path to the image
            image: "",
            // The text of the tutorial
            body: "Remember that usually the order of words doesn't tell " +
            "you who the subject of the verb is. But in indirect statement " +
            "both words have object ending. So you can ONLY use order " +
            "to help you. The subject is the one that comes first.",
            // The question asked at the end of the tutorial (page)
            // (sometimes a default "none" value)
            question: null,
            sentence: null,
            // The list of answer choice (strings)
            // (sometimes a default "none" value)
            answer_choices: null,
            
            // The correct answer choice (a string)
            // (sometimes a default "none" value)
            // mutually exclusive with advance_button
            correct_answer: null,               
            
            
            //optional
            back_button: true,                     
            
            //advance_button is a button that advances to the next page
            //sometimes empty because only correct answer advances
            advance_button: true,                       
            
            //pointer to previous tutorial page
            previous: 1,
            
            
            //integer or file name as string that points to the next tutorial page
            //or it's something like "finish" if it leads to the quiz
            next: 3    
        },
        "3": {
            heading: "ARE YOU READY TO TEST YOURSELF ON INDIRECT STATEMENT",
            //A string describing the path to the image
            image: "",
            // The text of the tutorial
            body: "Remember that only in indirect statement, the subject comes first.",
            // The question asked at the end of the tutorial (page)
            // (sometimes a default "none" value)
            question: "Who is the subject of the following indirect statement?",
            sentence: "AVIS SCIT (URSOS EQUUM VORARE).",
            // The list of answer choice (strings)
            // (sometimes a default "none" value)
            answer_choices: ["URSOS", "EQUUM"],
            
            // The correct answer choice (a string)
            // (sometimes a default "none" value)
            // mutually exclusive with advance_button
            correct_answer: "URSOS",               
            
            
            //optional
            back_button: true,                     
            
            //advance_button is a button that advances to the next page
            //sometimes empty because only correct answer advances
            advance_button: false,                       
            
            //pointer to previous tutorial page
            previous: 2,
            
            
            //integer or file name as string that points to the next tutorial page
            //or it's something like "finish" if it leads to the quiz
            next: "end"    //escapes from tutorial and leads the player to quiz
        },
    }
}

function get_tutorial_order(tutorial_name) {
    var order = [];
    var m = ALL_TUTORIALS[tutorial_name][0]; // start is always 0
    
    while(m.next){
        m = ALL_TUTORIALS[tutorial_name][m.next];
        order.push(m.id);
    }
    
    return order;
}