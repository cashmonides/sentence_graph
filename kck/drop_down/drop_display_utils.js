// Creates a menu.
var create_menu = function (path, data, callback) {
    var div;
    var li;
    var ul;
    if (typeof data === 'string') {
        div = document.createElement('div');
        //todo Akiva damage control AKiva added this for cosmetic reasons check if ok
        div.className = 'kck_string';
        //end Akiva damage control
        div.innerHTML = data;
        div.onclick = function () {
            callback(data, path.concat([data]));
        }
        li = document.createElement('li');
        li.appendChild(div);
        return li;
    } else if (Array.isArray(data)) {
        ul = document.createElement('ul');
        //todo Akiva damage control AKiva added this for cosmetic reasons check if ok
        ul.className = 'kck_drop';
        //end Akiva damage control
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

var attach_all_to = function (used_drops_and_non_drops, parent_el) {
    var current_drop;
    var e;
    for (var i = 0; i < used_drops_and_non_drops.length; i++) {
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

var get_correct_status = function (statuses) {
    var index = Math.min.apply(null, statuses.map(function (status, index) {
        if (status === 'missing') {
            return 0;
        } else if (status.correct) {
            return 2;
        } else if (status.ambiguous) {
            return 3;
        } else {
            return 1;
        }
    }));
    return ['missing', 'incorrect', 'correct', 'ambiguous'][index];
}