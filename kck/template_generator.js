var template_generator = function (clause_acts_as, level) {
    var this_module = get_current_module(level);
    var transitivity;
    if (clause_acts_as === 'noun') {
        transitivity = 'transtive';
    } else {
        transitivity = weighted_choice(this_module.transitivity);
    }
    var voice;
    if (transitivity === 'intransitive') {
        voice = 'active';
    } else {
        voice = weighted_choice(this_module.voice);
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
    if (explicitness === 'explicit') {
        // Put 's' at the beginning, because there's a subject.
        template.unshift('subject');
    }
    if (transitivity === 'transitive') {
        if (voice === 'active') {
            template.push('object');
        } else {
            template.push('personal agent');
        }
    }
    return {
        'template': template,
        'voice': voice,
        'transitivity': transitivity,
        'clause_location': clause_location
    }
}