var ProgressBar = function (size, future_events, progress_bar) {
    var self = this;
    this.progress_bar = progress_bar;
    this.progress = 0;
    this.size = size;
    future_events.forEach(function (x) {setTimeout(function () {
        self.change_number_correct(x)}, x['time_from_start'])
    });
    this.past_events = [];
    this.display();
};

ProgressBar.prototype.change_number_correct = function (x, add_to_past) {
    this.progress += x['change_value'];
    this.keep_progress_within_bounds();
    this.display();
    this.past_events.push(x);
};


ProgressBar.prototype.decrement_as_countdown = function (stopping_time, total_match_time) {
    
    console.log("entering decrement_as_countdown");
    
    var current_time = Date.now();
    var difference = stopping_time - current_time;
    
    
    console.log('123456 stopping_time = ', stopping_time);
    console.log('123456 current_time = ', current_time);
    console.log('123456 total_match_time = ', total_match_time);
    console.log('123456 time remaining, i.e. difference = ', difference);
    
    
    
    var percentage_remaining = (difference / total_match_time) * 100;
    console.log("1234556 percentage left, i.e. difference/total * 100 = ", percentage_remaining);
    
    
    
    this.progress = difference;
    this.size = total_match_time;
    
    
    
    
    // this will be number of seconds left
    // e.g. 10
    // var seconds_left = difference / 1000;
    
    // console.log('123456 this.progress = ', this.progress);
    
    
    // // this will be the total length of the game in seconds
    // // currently we don't have a way of getting at it 
    // // but perhaps we can initialize it when we set the countdown
    // // for now, just as proof of concept, we'll set it to 60 seconds
    // // this.size = 60;
    // this.size = total_match_time;
    // console.log('123456 this.size = ', this.size);
    // // the result should be something like 10 seconds left out of 60 seconds
    
    // var fraction_left = seconds_left / this.size;
    
    // var fraction_done = 1 - fraction_left;
    
    // this.progress = fraction_done;
    
    
    
    
    this.keep_progress_within_bounds();
    
    this.display();
};


ProgressBar.prototype.keep_progress_within_bounds = function () {
    this.progress = Math.min(Math.max(this.progress, 0), this.size);
};

ProgressBar.prototype.display = function () {
    // this.progress_bar.style.width = Math.round((this.progress / this.size) * 100) + "%";
    this.progress_bar.style.width = Math.round((this.progress / this.size) * 100) + "%";
};

// when we want to specify a particular percentage for the progress bar
// ProgressBar.prototype.display_with_input = function (input) {
//     // this.progress_bar.style.width = Math.round((this.progress / this.size) * 100) + "%";
//     this.progress_bar.style.width = Math.round(input) + "%";
// };
