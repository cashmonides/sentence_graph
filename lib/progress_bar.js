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

ProgressBar.prototype.keep_progress_within_bounds = function () {
    this.progress = Math.min(Math.max(this.progress, 0), this.size);
};

ProgressBar.prototype.display = function () {
    this.progress_bar.style.width = Math.round((this.progress / this.size) * 100) + "%";
};
