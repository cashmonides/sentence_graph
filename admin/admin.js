window.onload = start;

var user = new User();

function start() {
    //console.log"start triggered");
    if (!user.load(callback)) {
        alert("Not logged in!");
    } 
}


function callback() {
    //console.log"callback triggered");
    Persist.get(["users"], callback2);
}

function callback2(data) {
    //console.log"callback2 triggered");
    var users = data.val();
    //console.logusers);
    var e = el("score_report");
    // make({tag:"tr", children: [{tag: "td"}]}, e);
    for (var key in users) {
        make({
            tag:"tr",
            children: [
                {tag: "td", text: users[key].profile.name},
                {tag: "td", text: max_module(users[key])}
            ]
        }, e)
    }
}


function max_module(user) {
    var c = [];
    for (var key in user.history) {
        if (user.history[key].completed) {
            c.push(key);
        }
    }
    return JSON.stringify(c);
}