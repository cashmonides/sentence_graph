var make_mock_component = function (x) {
    if (typeof x === 'string') {
        x = JSON.parse(x);
    }
    var c = new Component();
    var i;
    for (i in c) {
        if (c.hasOwnProperty(i)) {
            delete c[i];
        }
    }
    for (i in x) {
        c[i] = x[i];
    }
    return c;
}
