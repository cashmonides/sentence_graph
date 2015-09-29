
//OBJECTIVE:
//input is a form
//return a Form object with word settings determined




//___________
//MASTER FUNCTION


/*
function wsg_visitor(kernel, form) {
    if (form.word_setting != null || form.word_setting != undefined) {
        console.log("ALERT: form.word_setting is already defined");
        return;
    }
    var word_setting;
    switch (form.element) {
        case Elements.Verb : word_setting = set_word_setting(kernel, form); break;
        case Elements.Subject : word_setting = set_word_setting(kernel, form); break;
        case Elements.Object : word_setting = set_word_setting(kernel, form); break;
    }

    form.word_settings = word_setting;
    console.log("wsg vistor exists! word_setting & form = ", word_setting, form);
}
*/



//todo make a function that sets the kernel settings (then set_word_setting reads directly off the kernel settings)
// kernel.voice     (act.pass.)
// kernel.verb_type   (trans.intrans.)
// kernel.clause_type (but this is language-dependent so presumably it doesn't have much effect on mood or case)


//FUNCTION summary of cartesian setter
//input: property_to_be_set, allowed_options, level
//no return, just side effects: mutates the kernel.states list



//todo rewrite set_word_setting in the following
// takes kernel, level, element as its arguments
// return word_setting
//todo this is mostly noun-centric
function set_word_setting(kernel, level, element, allowed, output_type) {
    console.log('DEBUG 9-14 in set_word_setting');
    var word_settings_map = {};

    if (element === "verb") {
        console.log('DEBUG 9-14 in verb case');
        word_settings_map.conjugation = random_choice(allowed.conjugation);
        //kernel.tense = random_choice(allowed.tense);
        // kernel.set('tense', allowed.tense);
        console.log("DEBUG 9-5 word_settings_map.tense = ", word_settings_map.tense);
        console.log("DEBUG 9-5 allowed.tense = ", allowed.tense);
        //this will need to be fixed below
        kernel.sequence = random_choice([allowed.sequence]);
        console.log("DEBUG 9-5 kernel.sequence in set_word_setting = ", kernel.sequence);

    } else {
        console.log('DEBUG 9-14 in noun case');
        //language-independent
        word_settings_map.number = (element === "subject" ? kernel.number : random_choice(allowed.number));
        //word_settings_map.gender = (element === "subject" ? kernel.gender : random_choice(allowed.gender));

        //todo language-dependent (but is it worth moving)
        //word_settings_map.gender = random_choice(allowed.gender);
        //following prevents a mismatch between
        // word_settings_map.gender of subject & kernel.gender
        var allowed_declensions = allowed.declension;
        if (element === "subject") {
            allowed_declensions = allowed_declensions.filter(
                function (x) {return x[1] === kernel.gender});
        }

        var d = random_choice(allowed_declensions);
        word_settings_map.declension = d[0];
        word_settings_map.gender = d[1];


        //todo form.element should probably just be changed to "function"
        var syntactic_function = element;


        if (syntactic_function === "subject") {
            word_settings_map.function = "subject";
            kernel.gender = word_settings_map.gender;
        } else if (syntactic_function === "object") {
            word_settings_map.function = "object";
        }


        //
        ////todo below is presumably obsolete because we're setting voice and tense at kernel
        //word_settings_map.voice = random_choice(allowed.voice);
        //
        //
        ////todo below is presumably language-dependent so needs to be modified
        //word_settings_map.tense = random_choice(allowed.tense);


        //TESTING below_______________________
        //console.log("TESTING START set_word_settngs");
        //console.log("word_settings_map", word_settings_map);
        //console.log("word_settings_map stringified", JSON.stringify(word_settings_map));
        //console.log("ELEMENT + WORD SETTINGS", form.element + JSON.stringify(word_settings_map));
        //console.log("TESTING END set_word_settngs");
    }

    return word_settings_map;
}





//todo this is gonna be mostly language dependent, so move it

function set_allowed(kernel, language_enum) {
    var allowed = {};

    if (kernel.level < 10) {
        allowed.number = ["singular"];
    } else {
        allowed.number = ["singular", "plural"];
    }
    switch (language_enum) {
        case Language_enum.Latin:
            if (kernel.level < 10) {
                allowed.declension = ["2m"];
            } else if (kernel.level < 20) {
                allowed.declension = ["1f", "2m"];
            } else if (kernel.level < 30) {
                allowed.declension = ["1f", "2m", "2n"];
            } else {
                allowed.declension = ["1f", "2m", "2n", "3m"];
            }

            if (kernel.level < 10) {
                allowed.conjugation = ["1"];
            } else if (kernel.level < 20) {
                allowed.conjugation = ["1", "2"];
            } else {
                allowed.conjugation = ["1", "2", "3", "3i", "4"];
            }


            if (kernel.level < 10) {
                allowed.case = ["nominative", "accusative"];
            } else if (kernel.level < 100) {
                allowed.case = ["nominative", "accusative", "genitive"];
            } else {
                allowed.case = ["nominative", "genitive", "dative", "accusative", "ablative"];
            }






            //todo this is highly language dependent so it needs to be moved
            //QUICK AND DIRTY SEQUENCE TEST
            if (kernel.clause_type !== "main") {
                allowed.sequence = random_choice(["primary", "secondary"]);
            }


            if (kernel.clause_type === "main") {
                allowed.tense = ["present", "imperfect", "future"];
            } else if (kernel.clause_type === "iq") {
                if (allowed.sequence === "primary") {
                    allowed.tense = ["present_subjunctive", "perfect_subjunctive"];
                } else if (allowed.sequence === "secondary") {
                    allowed.tense = ["imperfect_subjunctive", "pluperfect_subjunctive"];
                }
            } else if (kernel.clause_type === "is") {
                allowed.tense = ["present_infinitive", "perfect_infinitive"];
            } else {
                console.log("ALERT: no clause type detected");
            }

            console.log('DEBUG 9-5 in allowed: Allowed tense = ' + JSON.stringify(allowed.tense));







            //todo
            //number and person need to be able to interact
            //if number can only be singular we have to update allowed.person
            //person can control number of subject
            //and allowed.number can control person of object

            //BELOW IS STUFF MOVED TO THE KERNEL function

            //akiva's additions below
            //if (kernel.explicitness === "implicit") {
            //    allowed.person = ["1s", "2s", "3s", "1p", "2p", "3p"];
            //} else if (kernel.explicitness === "explicit") {
            //    allowed.person = ["3s", "3p"];
            //}

            //if (kernel.level < 10) {
                //    allowed.voice = ["active"];
                //} else {
                //    allowed.voice = ["active", "passive"];
                //}

            //TESTING BELOW____________
            //console.log("TESTING START set_allowed");
            //console.log("allowed", allowed);
            //console.log("allowed stringified", JSON.stringify(allowed));
            //console.log("TESTING END set_allowed");
            break
    }
    return allowed
}



