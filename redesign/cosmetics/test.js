var create_menu = function (path, data, callback) {
    var div;
    var li;
    var ul;
    if (typeof data === 'string') {
        div = document.createElement('div');
        div.innerHTML = data;
        div.onclick = function () {
            callback(data, path.concat([data]));
        }
        li = document.createElement('li');
        li.appendChild(div);
        return li;
    } else if (Array.isArray(data)) {
        ul = document.createElement('ul');
        var item;
        for (var i = 0; i < data.length; i++) {
            item = data[i];
            if (typeof item === 'string') {
                ul.appendChild(create_menu(path, item, callback));
            } else if (Array.isArray(item) && item.length === 2) {
                var name = item[0];
                div = document.createElement('div');
                div.innerHTML = name;
                li = document.createElement('li');
                li.appendChild(div);
                li.appendChild(create_menu(
                    path.concat([name]), item[1], callback));
                ul.appendChild(li);
            } else {
                throw 'Bad item: ' + JSON.stringify(item);
            }
        }
        return ul;
    } else {
        throw 'Bad data: ' + JSON.stringify(data);
    }
}

var test_add_drop_down_to_page = function (drop_down) {
    var menu = create_menu([], drop_down, test_callback);
    $(menu).menu();
    document.body.appendChild(menu);
    document.body.appendChild(document.createElement('br'));
}

window.onload = function () {
    var sentence = main(true);
    var drop_down_language = weighted_choice(
        get_current_module().drop_down_language);
    var correct_answers = sentence.get_all_translations_and_paths(
        drop_down_language);
    var drops = sentence.get_all_drop_downs(drop_down_language);
    var parent_el = el('drop_down_div');
    var e;
    for (var i = 0; i < drops.length; i++) {
        if (i !== 0) {
            e = document.createElement('div');
            e.innerHTML = '&nbsp;';
            e.style.display = 'inline-block';
            parent_el.appendChild(e);
        }
        e = document.createElement('div');
        e.style.display = 'inline-block';
        parent_el.appendChild(e);
        drops[i].attach_to(e);
    }
    // Filter out the non-drop downs.
    var actual_drops = drops.filter(function (x) {
        return x instanceof DropDown;
    });
    el('submit_button').onclick = function () {
        submit(actual_drops, correct_answers);
    }
}

var submit = function (actual_drops, correct_answers) {
    var l = actual_drops.length;
    if (l !== correct_answers.length) {
        throw 'There are a different number of drop downs ' +
        'than correct answers: ' + l + ' versus ' + correct_answers.length;
    }
    // Make a list with all drop down statuses.
    var drop_downs_statuses = [];
    // Loop.
    for (var i = 0; i < l; i++) {
        var correct_answer = correct_answers[i];
        if (!(is_object(correct_answer) && 'translation' in correct_answer
        && 'path' in correct_answer)) {
            throw 'Weird correct answer: ' + JSON.stringify(correct_answer);
        }
        var correct_path = correct_answers[i].path;
        var drop_path = actual_drops[i].path;
        // The drop down has not been answered yet so don't even try to check it.
        if (drop_path === null) {
            drop_downs_statuses.push('missed');
            continue;
        }
        var result_of_comparison = compare_path(correct_path, drop_path);
        // Push the status (the result of the comparison).
        drop_downs_statuses.push(result_of_comparison);
    }
    display_statuses(drop_downs_statuses);
}

var display_statuses = function (statuses) {
    var o = el('feedback_div');
    remove_all_children(o);
    var status;
    var e;
    for (var i = 0; i < statuses.length; i++) {
        if (i !== 0 && o.lastChild.tagName.toLowerCase() !== 'div') {
            o.appendChild(document.createElement('br'));
        }
        status = statuses[i];
        if (status === 'missed') {
            var e = document.createElement('font');
            e.style.color = 'gray';
            e.innerHTML = 'You missed this drop down';
        } else {
            var e = display_status(status);
        }
        o.appendChild(e);
    }
}

var display_status = function (status) {
    var red_green_list = status.red_green_list;
    var parent_el = document.createElement('div');
    var e;
    for (var i = 0; i < red_green_list.length; i++) {
        if (i !== 0) {
            e = document.createElement('div');
            e.innerHTML = '&nbsp;';
            e.style.display = 'inline-block';
            parent_el.appendChild(e);
        }
        e = document.createElement('font');
        e.style.color = red_green_list[i][1];
        e.innerHTML = red_green_list[i][0];
        parent_el.appendChild(e);
    }
    return parent_el;
}