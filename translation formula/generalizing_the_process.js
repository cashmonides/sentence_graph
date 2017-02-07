----------------STAGE 0--------------------------------------
STARTING STATE
metainformation
    - a name for the question type (e.g. latin morphology, etymology, spelling-by-block)
    - a set of information about how correct and incorrect answers are processed
        - e.g. rewards, penalties, hints, timer, etc.
        - e.g. whether buttons replace other buttons or not
core information
    - n sets of X (usually maps of the form category: option, option, option, option)
    - order in which X is processed
    - sets 
    - allowed and some choosing constraints (weighing ratios, etc.)
    
(possibly, an additional structure sets the feedback for incorrect answers as well
e.g. #1 if they click on perfect, it might say "wrong principal part!!!"
e.g. #2 if for arthropod they click on "root = man" they will get a hint like "arthr = joint")     



----------------STAGE 1--------------------------------------

PRODUCE AN INSTANCE
- usually a map of the form:
    - id_ref: {
        type_1: option_x,
        type_2: option_y,
        type_3: option_z,
    }



PRODUCE A SET OF INCORRECT OPTIONS
incorrect choices must be either ALL or SOME of the total options
ALL - e.g. verb syntax questions, animal taxonomy
SOME - e.g. etymological questions



ADD ALL THE INCORRECT OPTIONS TO THE INSTANCE
marking the corrrect answer with metacharacter, indicating correct




----------------STAGE 2------JSON COMPLETE BUT RAW--------------------------------
WE NOW HAVE: JSON = path + correct and incorrect answers
- this is entirely self-contained, i.e. requires no matching with an entity outside the JSON
- cuts down on chance for errors like mismatching upper and lower case or spelling mistakes




FILTER
filter that sets the display for each element (simplified, abbreviated, cosmeticized)
e.g. we may have different names at different levels of difficulty ("you" at easy level, "2s" at harder level)
or abbreviations to save space ("indic." in cramped scenarios, "indicative" in uncramped scenarios)





----------------STAGE 3--------JSON COMPLETE AND FILTERED----------------

we now have a JSON object that indicates path and correct answer

prep for display, matching and logging
- produce a scrubbed version with metacharacters indicating correct scrubbed

matching
- we need the correct sequence, i.e. a clean piece of data that the user's input can be matched with
- e.g. if they click on 1, 7, 9 and the correct answer is 1, 7, 9

display
- we need something scrubbed of all metacharacters for display on screen

storage and logging
- scrubbed object is logged in console log for debugging
- unscrubbed object is prepped for storage in sql (to be compared with their answer for backstage analytics)

 


----------------STAGE 4--------FEEDS INTO BUTTON GENERATOR----------------


buttons are generated, each one has a specific on click behavior
correct --> points increment + next layer of JSON buttons
incorrect --> points decrement + hint (if applicable)


buttons in general have a behavior when clicked
- crowd out old buttons
or
- stay and get smaller
or
- change color



whole system, including buttons, interacts with a timer
- when timer approaches 0, the correct answer button starts to pulse or change color
- when timer hits 0, the correct buttons slowly turn color while timer goes negative





-----------------THE MOST BASIC TEST----------------------------------

1) build a dummy space

2) produce a dummy instance

3) merge dummy instance with dummy space, adding a metacharacter

4) set some of the fundamental parameters (e.g. buttons replace vs stay, basic vs advanced display)

dummy space
letter: [a, b, c, d]
number: [1, 2, 3, 4]
symbols: [!, @, #, $]

dummy instance
item_1: {
    letter: a,
    number: 1,
    symbol: !
}


dummy object

object_1: {
    letter: [a*, b, c, d],
    number: [1*, 2, 3, 4],
    symbols: [!*, @, #, $]
}



settings: 
buttons_replace: true,
display: upper_case,
reward: 3,
penalty: 1,
scramble_order_of_options: true,
timer: off













