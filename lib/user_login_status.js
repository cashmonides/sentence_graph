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
*/

User.prototype.check_login_status = function () {
    this.login_status = random_string(16);
    this.check_for_string({
        'case_two_computers': function () {
            self.set_login_status(self.login_status);
            self.alert_two_computers();
        },
        'no_matter_what': function () {
            this.set_login_status(this.login_status);
        }
    });
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

User.prototype.check_for_string = function (callbacks) {
    if (this.uid === null) {
        this.alert_logged_out();
        return null;
    }
    var i;
    var self = this;
    for (i in callbacks) {
        if (!(i in types_of_callback)) {
            throw new Error('Illegal type of callback: ' + i);
        }
    }
    this.get_persist_login_status(function (x) {
        for (i in types_of_callback) {
           if (types_of_callback[i](x, self) && callbacks[i]) {
               callbacks[i]();
           }
        }
    })
}

User.prototype.important_event_check_string = function () {
    var self = this;
    this.check_for_string({
        'case_not_logged_in': this.alert_logged_out,
        'case_two_computers': function () {
            self.set_login_status(self.login_status);
            self.alert_two_computers();
        }
    });
}