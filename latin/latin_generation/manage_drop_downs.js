//argument:
    //template: we need template (latin) so we know what english things to include
    //choice: correct answer
    //output: all options
//returns:
    //map of an intersection of 2 lists
        //map
            //create drop or non-drop for each item in our list intersection
        //2 lists
            //list 1: english word order (an always fixed order SVO)
            //list 2: template (variable, SV SOV VOS..)
                //eg. intersection of SVO & SV -> SV
                //eg intersection of SVO & VOS -> SVO
function manage_drop_downs(choice, output, english_template, language_enum, drop_non_drop_map) {
    var r = concat_arrays(english_template.map(function (x) {return (drop_non_drop_map[x] === 'drop' ?
            create_drop_down_object : create_non_drop_object)
        (x, output, choice, language_enum)}));
    console.log('DEBUG 12-23 manage_drop_downs result = ', r);
    return r
}

function create_drop_down_object(x, output, choice, language_enum) {
    var key_for_word = x + '_in_' + language_enum;
    var r = [{
        'type': 'drop down',
        'parts': sorted_choices(output, key_for_word),
        'heading': heading(x),
        'correct_answer': choice[key_for_word],
        'no_none_display_override': is_none(heading(x))
    }];
    
    final_drop_down_things(x, r);
    return r;
}

function is_none (h) {
    return h[0] === '-';
}

function heading (x) {
    if (['subject', 'object', 'verb'].indexOf(x) !== -1) {
        return x;
    } else {
        return '------';
    }
}

function create_non_drop_object(x, output, choice, language_enum) {
    var r = [{
        'type': 'non_drop',
        'non_drop_text': choice[x + '_in_' + language_enum]
    }];
    
    final_drop_down_things(x, r);
    return r;
}

var add_pre_text = function (role, r) {
    var pre_text = get_pre_text(role);
    
    if (pre_text) {
        r.unshift({
            'type': 'non_drop',
            'non_drop_text': pre_text
        });
    }
}

var get_pre_text = function (role) {
    var parts_of_role = role.split('_');
    
    if (parts_of_role.length > 1 && parts_of_role[1] === 'genitive') {
        return 'of';
    }
}

var final_drop_down_things = function (x, r) {
    var things_to_do_to_output = [add_pre_text];
    
    for (var i = 0; i < things_to_do_to_output.length; i++) {
        things_to_do_to_output[i](x, r);
    }
}
