/*
var test_data = [
    'Lorum',
    'Dolor',
    'Ipsus',
    ['Sit', ['Amet', 'Consecutur']],
    'Adipsing',
    ['Tibi', [
        ['Arma', ['Virumque', 'Cano']],
        ['At', ['Regina', 'Gravi', 'Iamdudem']],
        'Saucia',
        'Cura'
    ]]
];
*/



var test_callback = function (answer, path) {
    alert('You answered ' + answer);
    alert('You took the path ' + path.join(' -> '));
}

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
    var drops = sentence.get_all_drop_downs('latin');
    var e;
    for (var i = 0; i < drops.length; i++) {
        if (i !== 0) {
            e = document.createElement('div');
            e.innerHTML = '&nbsp;';
            e.style.display = 'inline-block';
            document.body.appendChild(e);
        }
        e = document.createElement('div');
        e.style.display = 'inline-block';
        document.body.appendChild(e);
        drops[i].attach_to(e);
    }
}