var template_generator = function (clause_acts_as, level) {
    var this_module = get_current_module(level);
    var noun_switch = this_module.noun_switch;
    var voice = weighted_choice(this_module.voice);
    // If the subordinate clause acts as a noun or the voice is passive,
    // the verb must be transitive.
    // If the noun switch is off and the voice is active and there is
    // no subordinate clause object to save the day, due to the lack
    // of possible objects we have to choose intransitive.
    // Otherwise the choice is free.
    var transitivity;
    if (clause_acts_as === 'noun' || voice === 'passive') {
        transitivity = 'transitive';
    } else if (clause_acts_as !== 'noun'
    && voice === 'active' && !noun_switch) {
        transitivity = 'intransitive';
    } else {
        transitivity = weighted_choice(this_module.transitivity);
    }
    var clause_location;
    if (clause_acts_as !== 'noun') {
        clause_location = null;
    } else if (voice === 'active') {
        clause_location = 'object';
    } else {
        clause_location = 'subject';
    }
    var explicitness = weighted_choice(this_module.explicitness);
    var template = ['verb'];
    if (noun_switch) {
        if (explicitness === 'explicit') {
            // Put 'subject' at the beginning, because there's a subject.
            template.unshift('subject');
        }
        if (transitivity === 'transitive') {
            if (voice === 'active') {
                template.push('object');
            } else {
                template.push('personal agent');
            }
        }
    }
    var maximal_role_to_role_for_verb_restrictions = {};
    if (voice === 'active') {
        maximal_role_to_role_for_verb_restrictions = {
            'subject': 'subject',
            'object': 'object'
        }
    } else {
        maximal_role_to_role_for_verb_restrictions = {
            'subject': 'object',
            'personal agent': 'subject'
        }
    }
    var role_to_role_for_verb_restrictions = {};
    for (var i = 0; i < template.length; i++) {
        if (template[i] in maximal_role_to_role_for_verb_restrictions) {
            role_to_role_for_verb_restrictions[template[i]] =
            maximal_role_to_role_for_verb_restrictions[template[i]];
        }
    }
    return {
        'template': template,
        'voice': voice,
        'transitivity': transitivity,
        'clause_location': clause_location,
        'role_to_role_for_verb_restrictions':
        role_to_role_for_verb_restrictions
    }
}