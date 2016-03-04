/* Contains the login status methods. */

/*
// This function may be needed in the future.
User.prototype.check_login_status = function () {
    this.login_status = random_string(16);
    var firebase_profile = this.get_persist_login_status();
    if (this.check_for_string() === "not logged in") {
        this.set_login_status(this.login_status);
    } else {
        this.set_login_status(this.login_status);
        this.alert_two_computers();
    }
}

// A newer version that is also obsolete.
// Function to be called when the user logs in.
User.prototype.check_login_status = function () {
    alert('Checking login status!');
    // We need to access "this" in inner functions.
    var self = this;
    // Set the login status to a random string.
    this.call_necessary_callbacks({
        This callback seemed to cause an infinite loop,
        in which a new user is constantly created,
        so I commented it out.
        'case_two_computers': function () {
            // When we have two computers, we set the login status to
            // that of the one being used, and then alert the user
            // to tell them that they were playing on another computer.
            self.set_login_status(self.login_status);
            self.alert_two_computers();
        },
        'no_matter_what': function () {
            self.set_login_status(self.login_status);
        }
    });
}
*/

// It seems that these two lines are all we need.
User.prototype.check_login_status = function () {
    this.login_status = random_string(16);
    this.set_login_status(this.login_status);
}

User.prototype.alert_two_computers = function () {
    alert("It looks like you've been playing on another computer. "
    + "Go to your profile and check in on your progress.");
    return_to_profile();
}

User.prototype.alert_logged_out = function () {
    alert("It looks like you've already logged out. "
    + "Go back to profile and log back in. (If you are "
    + "trying to play as an anonymous user, unfortunately "
    + "they are not currently supported.)");
    return_to_login();
}

/*
at login: 
generate 16 character string, store as user.login_status
check if firebase profile
if firebase profile is null, persist as profile.login_status
if not null, alert "two computers"
at submodule complete:
check if user.login_status is profile.login_status
user.login_status: asdfghjklxcvbnm (set at login)
If so, fine
if profile.login_status is null, alert (you've been detected as logged out) go back to login
if user.login_status isn't profile.login_status, alert "two computers"
at logout:
persist null to profile.login_status
user logs in on Computer A
user logs in on Computer B
now on Computer A user will get "Two computers"
alert messages:
"It looks like you've already logged out. Go back to profile and log back in."
"It looks like you've been playing on another computer. Go back to profile and check in on your progress."
*/




//login_status = either random 16 character string (=logged in on a computer) or null (=logged out)
//login_status only gets set at login or logout
User.prototype.set_login_status = function (login_status) {
    this.persist(["login_status"], login_status);
}

User.prototype.get_persist_login_status = function (callback) {
    Persist.get_val(["users", this.uid, "login_status"], callback);
}

// These are the conditions for each type of callback.
var types_of_callback = {
    'case_not_logged_in': function (value) {
        return value === null
    },
    'case_two_computers': function (value, self) {
        console.log('two?', self.login_status, value, self.login_status !== value);
        return self.login_status !== value
    },
    'case_OK': function (value, self) {
        return (value !== null) && (self.login_status === value)
    },
    'no_matter_what': function () {
        return true
    }
}

// Function to call necessary callbacks.
User.prototype.call_necessary_callbacks = function (callbacks) {
    // Make sure that the user is still logged in.
    // I'm not entirely sure why this is needed.
    if (this.uid === null) {
        this.alert_logged_out();
        return null;
    }
    
    // We need access to "this" within an anonymous function.
    var self = this;
    
    // Check that all the callbacks are of legal types.
    for (var i in callbacks) {
        if (!(i in types_of_callback)) {
            throw new Error('Illegal type of callback: ' + i);
        }
    }
    this.get_persist_login_status(function (x) {
        // This function is a callback.
        // Note that it is important that we have var i is here
        // because this is an interior function.
        for (var i in types_of_callback) {
           // We check, firstly, that the callback can occur
           // (types_of_callback[i](x, self)) and then that the type exists
           // in the callbacks passed in (callbacks[i]).
           // If so, we call it. This could cause so-far-unseen
           // errors due to the arbitrary (?) order in which
           // the callbacks are called.
           if (types_of_callback[i](x, self) && callbacks[i]) {
               callbacks[i]();
           }
        }
    })
}

// Function to check that everything is OK when an important event happens.
User.prototype.important_event_check_string = function () {
    // We need to be able to access "this" in an inner function.
    var self = this;
    this.call_necessary_callbacks({
        'case_not_logged_in': this.alert_logged_out,
        'case_two_computers': function () {
            self.set_login_status(self.login_status);
            self.alert_two_computers();
        }
    });
}