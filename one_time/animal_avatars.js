var main = function (school_name) {
    // get the path from firebase
    Persist.get(['avatars_all'], function (x) {
        var data = x.val();
        console.log(data);
        var sorted_list_of_values_without_test_users = get_sorted_list_of_values_without_test_users(data, school_name);
        var sorted_list_of_users = sorted_list_of_values_without_test_users.map(get_user_from_value);
        var choices_from_each_value = sorted_list_of_values_without_test_users.map(get_choices);
        var utilty_result_1 = maximise_utility_1(choices_from_each_value);
        var utilty_result_2 = maximise_utility_2(choices_from_each_value);
        // The first item of a utilty result contains the actual animals.
        // The second contains the rankings given.
        write_utility_result(sorted_list_of_users, utilty_result_1[0],
        utilty_result_1[1], 'utilty_result_1');
        write_utility_result(sorted_list_of_users, utilty_result_2[0],
        utilty_result_2[1], 'utilty_result_2');
    });
}

var get_user_from_value = function (value) {
    return value[0];
}

var get_choices = function (value) {
    var a = [];
    for (var i in value[1]) {
        if (i !== 'grade') {
            // Automatic array expansion, plus the equivalence of
            // string keys and number keys.
            a[i] = value[1][i];
        }
    }
    return a;
}

var get_sorted_list_of_values_without_test_users = function (data, school_name) {
    return key_value_pairs(data).filter(function (pair) {
        return is_not_test_user(pair[0]) && pair[1].school === school_name; // test for school here too
    }).sort(compare_values);
}

var compare_values = function (item_1, item_2) {
    var grade_1 = get_grade(item_1);
    var grade_2 = get_grade(item_2);
    var grade_compare = cmp(grade_1, grade_2);
    if (grade_compare !== 0) {
        return grade_compare;
    } else {
        return cmp(item_1[0], item_2[0]);
    }
}

var exceptional_grades = {
    'auden sorensen': 4,
    'georgia hoseman': 4,
    'Jasharat Bhuiyan': 3,
    'Riley Ruiz': 5,
    'jacob gutierrez': 2
}

var get_grade = function (item) {
    if (item[0] in exceptional_grades) {
        return exceptional_grades[item[0]];
    }
    var grade = item[1].grade;
    if (grade === 'no match') {
        throw 'no grade (no match) for ' + item[0] + '!';
    } else if (typeof grade !== 'number') {
        throw 'no grade (maybe not there at all, much worse) for ' + item[0] + '!';
    } else {
        return grade;
    }
}

var exceptional_test_users = ['joe johnson', 'john johnson', 'john dixon', 'john dumont'];

var broken_duplicate_users = ['lopen', 'teymur', 'Juan-Diego Castro', 'Torosa', 'Marilyn Shi ', 'janiyah c'];

var kid_created_fake_users = ['bsjk'];

var users_that_are_scientific_establishment_hoaxes = []; // global warming is bsjk

var is_not_test_user = function (user) {
    // test is not in the user's name
    return !is_test_user(user);
}

// Lump the broken duplicate users with the test users.
var is_test_user = function (user) {
    return starts_with(user, 'test') || starts_with(user, 'john doe') ||
    exceptional_test_users.indexOf(user) !== -1 ||
    broken_duplicate_users.indexOf(user) !== -1 ||
    kid_created_fake_users.indexOf(user) !== -1 ||
    users_that_are_scientific_establishment_hoaxes.indexOf(user) !== -1;
}

var write_utility_result = function (users, choices, rankings, name) {
    write_text('Results from: ' + name);
    write_text('Average ranking: ' + (average(rankings) + 1));
    write_text('Worst ranking: ' + (math_max(rankings) + 1));
    // -1 indicates no avatar was found. Note that this skews the average.
    write_text('How many users without an avatar: ' + count_occurrences(rankings, -1));
    // Some functional programming.
    // What this does is combines the users and choices and puts them in the function.
    // So user 1 + ': ' + choice 1, user 2 + ': ' + choice 2, ...
    write_text(zip_with(users, choices, rankings, function (user, choice, ranking) {
        return user + ': ' + choice + ' (' + (ranking + 1) + ')';
    }).join('<br>'));
    // Empty line.
    write_text('');
}

var clear = function () {
    document.getElementById('write_here').innerHTML = '';
}

var write_text = function (text) {
    document.getElementById('write_here').innerHTML += text + '<br>';
}

var run_algorithm = function () {
    clear();
    main(document.getElementById('firebase_key_input').value);
}