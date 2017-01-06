/* @documentation
login is the topmost file / home page
sends the user to profile

- needs access to a few global variables
    - User
    - Persist (for the purpose of updating firebase)
    
- primary loose ends
    - change password
        - change password functionality is available but disabled
        - because current body of users is too young to have access to it
    
end documentation
*/ 


// DOCUMENTATION ON FIREBASE
// https://www.firebase.com/docs/web/guide/login/password.html


// there are multiple modes that a user might want to do upon hitting the home page:
    // 1 logging in
    // 2 creating account
    // 3 forgot password
    // 4 change password (currently disabled)
    // 5 create avatar
// mode map sets up what aspects of the interface will be visible in each mode
var mode_map = {
    "email_row": [[1, 2, 3, 4], "table-row"],
    "password_row": [[1, 2], "table-row"],
    "old_password_row": [[4], "table-row"],
    "new_password_row": [[4], "table-row"],
    //name is shown in choose avatar mode
    "name_row": [[2, 5], "table-row"],
    "school_row": [[2, 5], "table-row"],
    "grade_row": [[2, 5], "table-row"],
    "class_row": [[2, 5], "table-row"],
    "access_code_row": [[2], "table-row"],

    "login_button": [[1], "inline"],
    "create_account_button": [[2], "inline"],
    
    "name_of_avatar_row": [[5], 'table-row'],
    
    
    "submit_avatar_button": [[5], 'inline'],
    "unlock_avatar_button": [[1, 2, 3, 4, 5], 'inline']
    
    //password changing is disabled until a later time, when students use regular email accounts
    // "forgot_password_button": [[1], "inline"],
    // "change_password_button": [[4], "inline"],
    // "reset_password_instructions": [[3], 'inline']          
    
};


// the mode argument is set by user input (radio buttons)
function set_mode(mode){
    back.log("profile set mode entered, mode = ", mode);
    
    for(var id in mode_map) {
        var data = mode_map[id];
        var e = el(id);
        e.style.display = contains(data[0], mode) ? data[1] : "none";
    }
}



function create_account() {
    var e = el("email").value;
    var p = el("password").value;
    var n = el("name").value;
    var s = el("school").value;
    var g = el("grade").value;
    var c = el("class_number").value;
    var ac = el("access_code").value;
    
    // we use a password to prevent users from making their own accounts without Akiva's permission
    var correct_hash = 1327021340; // The correct hash value.
    if (hash(ac) !== correct_hash) {
        alert("Talk to your Latin teacher in class about how to log in.");
        return;
    }
    
    // we need to create a user
    // but because the connection to firebase is asynchronous,
    // we need to use a callback
    var callback = function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
            alert(error);
        } else {
            console.log("Successfully created user account with uid:", userData);
            User.set_initial_data(userData.uid, n, s, g, c, e, login);
        }
    };
    Persist.create_user(e, p, callback);
}

function login() {
    var e = el("email").value;
    var p = el("password").value;
    // console.log"logging in: ", e, p);
    // if (is_team(e)) {
    //     console.log("team user detected");
    //     check_time_stamp();
    // }
    Persist.login_user(e, p, success);
}

function success(authData) {
    //console.log"Success triggered authData= ", authData);
    //console.log"authData.uid = ", authData.auth.uid);
    User.set_cookie(authData.auth.uid);
    

    
    document.location = "../profile/";
}

function enter_anonymous_game() {
    User.remove_cookie();
    document.location = "../quiz/";
}

var is_team = function (email) {
    var email_parts = email.split(/\./)
    var last_part = peek(email_parts);
    return last_part in {
        'team': true
    }
}


var is_special = function (email) {
    var email_parts = email.split(/\./)
    var last_part = peek(email_parts);
    return last_part in {
        'test': true,
        'solo': true,
        'tag': true,
        'lls': true
    }
}

function initiate_change_password() {
    var e = el("email").value;
    var op = el("old_password").value;
    var np = el("new_password").value;
    if (is_special(e)) {
        alert("you are using a special account, see Akiva in class to change your password");
        return;
    }
    var callback = function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_PASSWORD":
                    console.log("The specified user account password is incorrect.");
                    alert("Password is incorrect.");
                    break;
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    alert("Account does not exist.");
                    break;
                default:
                    //console.log"Error changing password:", error);
            }
        } else {
            alert("Congratulations! You've changed your password. Click on \"I already have an account\" and log in.");
            //console.log"User password changed successfully!");
        }
    };
    Persist.change_password(e, op, np, callback);
}

function reset_password() {

    var email = el("email").value;
    if (!email || email.trim().length == 0) {
        alert("PLEASE ENTER A VALID EMAIL");
        return;
    } 
    
    if (is_special(email)) {
        alert("you are using a special account, see Akiva in class to change your password");
        return;
    }

    var callback = function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    alert("The specified user account does not exist");
                    break;
                default:
                    console.log("Error resetting password:", error);
            }
        } else {
            console.log("Password reset email sent successfully!");
            alert("A PASSWORD RESET HAS BEEN SENT TO YOUR EMAIL");
        }
    };

    Persist.reset_password(email, callback);
}



var avatar_selection_count = 0;

var avatar_choices = {};

var global_avatar_permission = false;

function unlock_avatar_selection () {
    var input = prompt('Enter the avatar unlock code given by your teacher.');
    if (input === "orange") {
        global_avatar_permission = true;
    } else {
        alert("Invalid unlock code. Try again.");
    }
}

function submit_avatar_choice () {
    
    if (!global_avatar_permission) {
        alert("avatar creation not permitted at this time. Wait until next Latin class to make an avatar.")
        return;
    }
    
    var name = el("name").value;
    var avatar_choice = el("avatar_choice").value;
    
    var path = ["avatars", name, avatar_selection_count];
    
    if (!is_valid_avatar(avatar_choice)) {
        alert("Not a valid avatar name. Must be a COLOR from the list + SPACE + ANIMAL from the list");
    } else if (avatar_choice in avatar_choices) {
        alert('Not a valid avatar name. Cannot repeat previous avatar choices.');
    } else {
        // actually do a persist and increment
        if (avatar_selection_count === 0) {
            // persist grade
            Persist.set(["avatars", name, 'grade'], convert_string_to_number(el('grade').value));
        
            set_display('name_row', 'none');
            set_display('grade_row', 'none');
            set_display('class_row', 'none');
            set_display('school_row', 'none');
        }
        Persist.set(path, avatar_choice);
        /*
        if (avatar_selection_count === 0) {
            Persist.set(path, [avatar_choice]);
        } else if (avatar_selection_count > 0 && avatar_selection_count <= 11) {
            Persist.push_value(path, avatar_choice);
        }
        */
        // avatar_selection_count++;
        // increment_avatar_choice_display(avatar_selection_count);
        clear_input_box("avatar_choice");
        if (avatar_selection_count >= 9) {
            set_display('name_of_avatar_row', 'none');
            set_display('submit_avatar_button', 'none');
            alert("YOU'VE MADE TEN CHOICES, YOU'RE DONE, START TRAINING ON THE SPELLING BEE");
        } else {
            // Add the avatar choice.
            avatar_choices[avatar_choice] = true;
            avatar_selection_count++;
            increment_avatar_choice_display(avatar_selection_count);
            clear_input_box("avatar_choice");
        }
    }
}



var increment_avatar_choice_display = function (avatar_selection_count) {
    var ordinal = generate_ranking_from_int(avatar_selection_count + 1);
    el('avatar_choice_text').innerHTML = ordinal + " choice for Avatar name";
    
}



var valid_avatar_colors = ['red', 'blue', 'green', 'silver', 'gold', 'orange', 'pink', 'purple'];

var valid_avatar_animals = [
    'aardvark', 'albatross', 'ant',
    'baboon', 'badger', 'bear', 'bee', 'beetle', 'boar', 'buffalo',
    'camel', 'cat', 'caterpillar', 'centipede', 'chameleon', 'cheetah', 'chicken',
    'cobra', 'coyote', 'crab', 'crocodile',
    'deer', 'dog', 'donkey', 'dove', 'dragonfly', 'duck',
    'eel', 'elephant', 'elk',
    'ferret', 'flamingo', 'fly', 'gibbon',
    'giraffe', 'gnat', 'goose', 'gorilla', 'grasshopper',
    'hamster', 'hawk', 'hedgehog', 'heron', 'hippopotamus',
    'hummingbird', 'hyena',
    'ibex', 'ibis', 'jaguar', 'jellyfish', 'kangaroo', 'koala', 'lizard', 
    'lemur', 'leopard', 'lobster',
    'manatee', 'millipede', 'mole', 'mongoose', 'monkey', 'moose',
    'narwhal', 'newt', 'nightingale',
    'octopus', 'orangutan', 'ostrich', 'otter', 'otter', 'oyster',
    'panda', 'panther', 'parrot', 'partridge', 'penguin', 'pheasant',
    'pigeon', 'porcupine', 'possum',
    'quail', 'raccoon', 'ram', 'rhinoceros',
    'salamander', 'salmon', 'sardine', 'scorpion', 'seahorse', 'seal',
    'shark', 'sheep', 'shrew', 'skunk', 'sloth', 'snail',
    'sparrow', 'spider', 'squirrel', 'starling', 'swan',
    'tapir', 'tarsier', 'termite', 'tiger', 'toad', 'turkey', 'turtle',
    'vulture', 'walrus', 'wasp', 'weasel', 'whale',
    'wolverine', 'wombat', 'worm', 'yak', 'zebra'
];


var is_valid_avatar = function (input) {
    return fits_format(input, [valid_avatar_colors, valid_avatar_animals]);
}




function check_time_stamp() {
    var d = new Date();
    console.log("DATE DEBUG pre-adjusted date = ", d);
    var time = d.getTime();
    console.log("DATE DEBUG pre-adjusted time = ", time);
    var hour = d.getHours();
    console.log("DATE DEBUG pre-adjusted hour = ", hour);
    var local_day = d.getDay();

    if (local_day == 2 || local_day == 4 || local_day == 5) {
        if (hour == 9 || hour == 10 || hour == 11 || hour == 12 || hour == 13 || hour == 14 || hour == 15) {
            console.log("success triggered, hour = ", hour);
            alert("SUCCESS team play is allowed because it is within school hours");
        } else {
            console.log('failure triggered at hour level, hour = ', hour);
            alert("FAILURE team play is only allowed within school hours");
            location.reload();
        }  
    } else {
        console.log('failure triggered at the day level, local_day = ', local_day);
        location.reload();
    }
    
    //below is the hour block
    // if (hour == 9 || hour == 10 || hour == 11 || hour == 12 || hour == 13 || hour == 14 || hour == 15) {
    //     console.log("success triggered, hour = ", hour);
    //     alert("SUCCESS team play is allowed because it is within school hours");
    // } else {
    //     console.log('failure triggered, hour = ', hour);
    //     alert("FAILURE team play is only allowed within school hours");
    // }
    
    //this attempts the offset which doesn't seem needed
    // d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
    // console.log("DATE DEBUG post-adjusted time = ", d);
    
    // if (hour == (9 || 10 || 11 || 12 || 13 || 14 || 15)) {
    //     console.log("success triggered, hour = ", hour);
    //     alert("SUCCESS team play is allowed because it is within school hours");
    // } else if (hour == (0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 16 || 17 || 18 || 19 || 20 || 21 || 22 || 23)) {
    //     console.log("failure triggered, hour = ", hour);
    //     alert("FAILURE team play is not allowed except within school hours");
    // }
    
    
    // if (hour === (9 || 10 || 11 || 12 || 13 || 14 || 15)) {
    //     console.log("success triggered, hour = ", hour);
    //     alert("SUCCESS team play is allowed because it is within school hours");
    // } else if (hour === (1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 16 || 17 || 18 || 19 || 20 || 21 || 22 || 23)) {
    //     console.log("failure triggered, hour = ", hour);
    //     alert("FAILURE team play is not allowed except within school hours");
    // } else {
    //     console.log("bad data, hour = ", hour);
    // }
    
    // if (local_day === (2|| 4 || 5)) {
    //     if (hour === (9 || 10 || 11 || 12 || 13 || 14 || 15)) {
    //         console.log("success triggered, hour = ", hour);
    //         alert("SUCCESS team play is allowed because it is within team hours");
    //     } else if (hour === (1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 16 || 17 || 18 || 19 || 20 || 21 || 22 || 23)) {
    //         console.log("failure triggered, hour = ", hour);
    //         alert("FAILURE team play is not allowed except within team hours");
    //     } else {
    //         console.log("bad data, hour = ", hour);
    //     }
    // } else if (local_day === (0 || 1 || 3 || 6)) {
    //     alert("FAILURE team play only allowed during latin class");
    // } else {
    //     alert("SERIOUS PROBLEM today is not sunday-saturday")
    // }
    
    
    
    
    
    
    // if (local_day === (2 || 4 || 5)) {
    //     alert("SUCCESS today is allowed for team-play because today is ");
    // } else if (local_day === (0 || 1 || 3 || 6)) {
    //     alert("FAILURE today is not a day allowed for team-play beause today is");
    // } else {
        
    // }
    
    
    // var utc_date = new Date();
    // console.log("DATE DEBUG utc_date = ", utc_date);
    // var utc_day = utc_date.getDay();
    // console.log("DEBUG DATE utc_day = ", utc_day);
    
    // var local_date = utc_date.getTimezoneOffset();
    // console.log("DEBUG DATE local_date = ", local_date);
    // console.log("DEBUG DATE local_day = ", local_day);
    
    // var utc_date = new Date();
    // console.log("DATE DEBUG utc_date = ", utc_date);
    // var utc_day = utc_date.getDay();
    // var local_date = utc_date.getTimezoneOffset();
    // var local_day = local_date.getDay();
    // console.log("DATE DEBUG utc_date = ", utc_date);
    // console.log("DATE DEBUG utc_day = ", utc_day);
    // console.log("DATE DEBUG local_date = ", local_date);
    // console.log("DATE DEBUG local_day = ", local_day);
    
    // if (local_day === (2 || 4 || 5)) {
    //     alert("SUCCESS today is allowed for team-play because today is ");
    // } else if (local_day === (0 || 1 || 3 || 6)) {
    //     alert("FAILURE today is not a day allowed for team-play beause today is");
    // } else {
    //     alert("SERIOUS PROBLEM today is not sunday-saturday")
    // }
}