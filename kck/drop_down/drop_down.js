

// A drop down object.
var DropDown = function (header, data, correct_path) {
    // The header of the drop down.
    this.header = header;
    // The data of the drop down.
    this.data = data;
    // The mode: "text" or "drop down".
    this.mode = 'text';
    // The path and element, both initially null.
    this.path = null;
    this.elem = null;
    // The special correct path.
    this.correct_path = correct_path;
    
}

// We sometimes want the element in the document the dropdown is attached to
// to not be null. Given that, this function is rather self-explanatory.
DropDown.prototype.elem_should_not_be_null = function () {
    if (this.elem === null) {
        throw 'this.elem is null!';
    }
}

DropDown.prototype.clear_all_current_children = function () {
    // Check that the element is not null.
    this.elem_should_not_be_null();
    // Remove all the children from this.elem.
    remove_all_children(this.elem);
}

DropDown.prototype.display_drop_down = function () {
    var h = this.header;
    var drop_down = [h].concat(this.data);
    var self = this;
    var menu = create_menu([], drop_down, function (string, path) {
        if (path.length !== 1 || path[0] !== h) {
            self.path = path;
            self.header = string;
        }
        self.display_header();
    });
    var timeout_function;
    $(menu).menu();
    $(menu).mouseleave(function() {
        // below will make an immediate collapse of the drop down, makes it hard to navigate
        // self.display_header();
        //gives a delay - 1700 seems about right, not too fast not too slow
        //but this doesn't work because it always closes even if you hover back in
        timeout_function = setTimeout(function () {self.display_header();}, 1700);
    });
    $(menu).mouseenter(function () {
            // timeout_function = setTimeout(function () {self.display_header();}, 3000);
            // console.log("MOUSEENTER TRIGGERED");
            clearTimeout(timeout_function);
        })
    // Clear all the current children.
    this.clear_all_current_children();
    this.elem.appendChild(menu);
}

DropDown.prototype.create_text_div_from = function (string) {
    // Clear all the current children.
    this.clear_all_current_children();
    // Create a text element with the needed content.
    // Make it blue, to be more distinct from the non drop-downs.
    var e = document.createElement('font');
    e.style.color = 'blue';
    e.onmouseover = this.display_drop_down.bind(this);
    // Give it the correct content, and put it in.
    e.innerHTML = string;
    this.elem.appendChild(e);
}

DropDown.prototype.display_header = function () {
    this.elem_should_not_be_null();
    this.mode = 'text';
    this.create_text_div_from(this.header);
}


//ideally we create a function like the following
// but not yet implemented
DropDown.prototype.display_header_with_delay = function () {
    this.elem_should_not_be_null();
    this.mode = 'text';
    this.create_text_div_from(this.header);
    
    //some logic like this
    // if mouseover happens again we cancel the timeout
    
}




DropDown.prototype.attach_to = function (elem) {
    this.elem = elem;
    this.display_header(this.header);
}

DropDown.prototype.get_status = function () {
    var correct_path = this.correct_path;
    var drop_path = this.path;
    console.log("DEBUG 11-5 correct_path = ", this.correct_path);
    console.log("DEBUG 11-5 drop_path = ", this.path);
    // The drop down has not been answered yet so don't even try to check it.
    if (drop_path === null) {
        return 'missed';
    }
    var result_of_comparison = compare_path(correct_path, drop_path);
    console.log("DEBUG 11-5 result_of_comparison = ", result_of_comparison);
    // Return the status (the result of the comparison).
    return result_of_comparison;
}

// A non-drop down object.
var NonDropDown = function (text) {
    this.text = text;
}

// All attaching a non-drop down to an element does is make the element's
// text the text of the non-drop down.
NonDropDown.prototype.attach_to = function (elem) {
    elem.innerHTML = this.text;
}