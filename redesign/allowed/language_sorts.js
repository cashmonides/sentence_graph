var language_sorts = (function () {
    var language_sorts = {};
    for (var i = 0; i < languages.length; i++) {
        language_sorts[languages[i].toLowerCase()] = sort_functions_from_orders(
            ordering_preference_within_categories, languages[i].toLowerCase());
    }
    return language_sorts;
})();