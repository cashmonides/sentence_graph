var avatars_all_setup = function () {
    Persist.get(['avatars'], function (x) {
        Persist.get(['avatars_lls'], function (y) {
            console.log('starting');
            Persist.set(['avatars_all'], make_avatars_all(x.val(), y.val()), function () {
                console.log('in callback');
            });
        });
    });
}

var lls_users = ['test2', 'Pearce Marinis', 'dylan zaslow', 'teja virdi', 'gabrielle', 'Juliette Cardinali', 'Samuel Stone', 'Ryan Bess', 'daniel schoenwald', 'Sheldon Liu', 'Madison Zhan', 'Charles Wong', 'steven weiss', 'gabrielle hakim', 'Ruby Oriol', 'Lucas Mak', 'santiago efron', 'Ava Franciscovich', 'Jonah Peirez', 'Emilia', 'Elizabeth Perry', 'Lukas Skalsky', 'Sam Weinick', 'Daria Gural', 'bob spinna', 'michael lieberman', 'georgia hoseman', 'Ella McKiernan', 'Ella Nejat', 'otto braun', 'Julia Conrad', 'justin katayama', 'Mark Kovrizhkin', 'Nishtha roy', 'sophia straus', 'Mackenzie Greene', 'Emily Kim', 'maxwell hawkins-lipman', 'Kylee Philips', 'simon kaminer', 'Luacs Mak ', 'Arden Robert Joon Barnwell', 'Isabella Capole-Chung', 'kai russell', 'mia mandorla', 'teddy landa', 'alexander powers', 'Rachel Chance', 'Luna Helm', 'Lila Hertzberg', 'Samantha Xie ', 'mira bieber', 'Natasha Kometz', 'Justin Pyun', 'Emily Kim ', 'emilio', 'Yashna Patel', 'Maeve Resk', 'Triton oh', 'Stanley Zhang', 'auden sorensen', 'Bridget', 'Nancy Bao', 'john johnson', 'nina mansfield', 'Sophie Sands', 'lookie breskin', 'Ethan leonard', 'test dont-use', 'Ella Plotko', 'Daniel Kim', 'Holly Borg', 'Karen Ono', 'Christopher Lee', 'Amanda Gao', 'Hannah Bess', 'Jonathan Pae', 'Thomas Hansen', 'Chase Teichholz', 'Sadie Berk', 'emilia hrazanek', 'Zora kuehne', 'Andrew Chen', 'Lilian Kim', 'Ethan Klein', 'Violet Plotko', 'olivia belin', 'john doe 3', 'aidan johnson', 'Anna Eliasson', 'Parthiv patel', 'dalia levanon', 'Andrew Giventer-Braff', 'William Zhou', 'Josh', 'Benjamin Rjavinski', 'Ellyssan Park', 'Amaya Mackie', 'Alexa Cohen', 'Nathan Markman', 'aidan blanco', 'joe johnson', 'brian pae', 'samuel carmel', 'Adam Relis ', 'test', 'Mira iyer', 'Sophia Mayer', 'Diogo Hayes', 'Saige Hocke', 'Ian Buchanan', 'Vincent Bruckner', 'Sasha ', 'Carly Weiss', 'Phoebe Ellis Horowitz Yates', 'Andrey Karpovich '];

var make_avatars_all = function (a, b) {
    var d = {};
    var i;
    for (i in a) {
        d[i] = a[i];
    }
    for (i in b) {
        if (i in a) {
            console.log('Duplicate: ' + i);
            console.log(a[i], b[i], Math.max(Object.keys(a[i]).length, Object.keys(b[i]).length));
            if (Object.keys(a[i]).length < Object.keys(b[i]).length) {
                d[i] = b[i];
            }
        } else {
            d[i] = b[i];
        }
    }
    console.log('almost done');
    var lls_students = 0;
    for (i in d) {
        d[i].school = get_school(i);
        if (d[i].school === 'lls') {
            lls_students++;
        }
    }
    console.log(lls_students);
    alert('Here!');
    return d;
}

var get_school = function (name) {
    if (lls_users.indexOf(name) !== -1) {
        return 'lls';
    } else {
        return 'tag';
    }
}