/*
ideal:
    - module gives level
    - level gives multiclause_type
            var allowed_multiclause =
            [
            ['main', 'main'],
            ['protasis_past_ctf', 'apodosis_past_ctf'],
            ['protasis_present_ctf', 'apodosis_present_ctf'],
            ['protasis_past_ctf', 'apodosis_present_ctf'],
            ['protasis_flv', 'apodosis_flv'],
            ['protasis_fmv', 'apodosis_fmv']
            ]
            
            at some point we make a random choice from this list
            
    - make_output_wrapper (level, current_lexicon, none_display)    (just like make_output)
        - calls make_output several times (with multiclause_type fixed upstream)
        - returns something of the same format as make_output

    - only changing inflect_latin to reflect verb sensitivity
    
    - seems like we must change make_output to take at the very least an optional argument of what clause type to be forced on it

*/


/*
step-by-step version:
- produce two clauses next to each other (of any type)
- produce six drop downs
- upstream force a clause type (by fiat, e.g. in module allowed_multiclause_types)
- build a forced multiclause_type sensitivity into inflect latin
- produce two clauses of forced multiclause_type next to teach other
- check drop downs for coherence
- produce a conjunction between the two(ideally et & si)
- produce a conjunction before the two
- ...
- produce self-seeding generated forms like kck or k(ck)
- produce a tree structure that's fully ramified and spreadable
*/



/*
var allowed_master_clause =
    [['main', 'main'],
    ['protasis_past_ctf', 'apodosis_past_ctf'],
    ['protasis_present_ctf', 'apodosis_present_ctf'],
    ['protasis_past_ctf', 'apodosis_present_ctf'],
    ['protasis_flv', 'apodosis_flv'],
    ['protasis_fmv', 'apodosis_fmv'],
    
    var clause_list = random(allowed_master_clause);
    
    var clause_type : ["cond_past_ctf", "cond_pres_ctf"],
        sequence: {
            main: ['none'],
            is: ['primary'],
            iq: ['primary']
        },
        tense : {
            main: ["present", "imperfect", "future"],
            is :["present_infinitive", 'perfect_infinitive'],
            iq : {
                primary: ["present_subjunctive", "perfect_subjunctive"],
                secondary: ["imperfect_subjunctive", "pluperfect_subjunctive"]
            },
            cond: 
                pres_ctf: ["imperfect_subjunctive"],
                past_ctf: ["pluperfect_subjunctive"],
                flv: ["present_subjunctive"],
                fmv: ["future_indicative"],
                mixed_ctf: ["imperfect_subjunctive", "pluperfect_subjunctive"]
                
        },


*/






