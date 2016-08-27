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

var make_new_sentence = function () {
    var sentence = main(true);
    var drop_down_language = weighted_choice(
        get_current_module().drop_down_language);
    var drops_and_non_drops = sentence.get_all_drops_and_non_drops(drop_down_language);
    var roles = drops_and_non_drops.map(function (x) {
        return x.role;
    });
    var drop_choices = choose_drops_and_non_drops(roles);
    var used_drops_and_non_drops = [];
    var i;
    var role_num = drops_and_non_drops.length;
    for (i = 0; i < role_num; i++) {
        used_drops_and_non_drops.push(drops_and_non_drops[i][drop_choices[i]]);
    }
    var parent_el = el('drop_down_div');
    remove_all_children(parent_el);
    var e;
    var current_drop;
    for (i = 0; i < role_num; i++) {
        if (i !== 0) {
            e = document.createElement('div');
            e.innerHTML = '&nbsp;';
            e.style.display = 'inline-block';
            parent_el.appendChild(e);
        }
        e = document.createElement('div');
        e.style.display = 'inline-block';
        parent_el.appendChild(e);
        current_drop = used_drops_and_non_drops[i];
        if (!(current_drop instanceof DropDown
        || current_drop instanceof NonDropDown)) {
            throw 'current drop, ' + JSON.stringify(current_drop) +
            ' is of a strange type.';
        }
        used_drops_and_non_drops[i].attach_to(e);
    }
    // Filter out the non-drop downs.
    var actual_drops = used_drops_and_non_drops.filter(function (x) {
        return x instanceof DropDown;
    });
    el('submit_button').onclick = function () {
        submit(actual_drops);
    }
    // Some clean-up.
    var feedback_div = el('feedback_div');
    remove_all_children(feedback_div);
}

var submit = function (actual_drops) {
    drop_downs_statuses = actual_drops.map(function (x) {
        return x.get_status();
    });
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

var set_module = function () {
    var new_module = el('module_input').value;
    if (!(new_module in modules)) {
        alert('There is no module ' + new_module + '!');
    } else {
        alert('module sucessfully set to ' + new_module);
        module_number = new_module;
    }
}