var go_to_stats = function () {
    document.location = "/stats/";
}

var history_data_list = function (uid,e) {
    console.log('in history data list')
    Persist.get(['word_scores', this.user.uid], function (x) {
        var data = x.val();
        if (!data || (typeof data !== 'object')) {
            console.log('no')
            return;
        }

        return data;
        console.log("ABOUT TO AVERAGE");
        var aggregate_word_score_accuracy = generate_word_score_avg_accuracy(data);
   
        aggregate_word_score_accuracy = Math.round(aggregate_word_score_accuracy * 100);
        console.log("FINISHED AVERAGING");
        
        var data_list = values(data).filter(function (x) {
            return typeof x === 'object'
        })
        
        console.log('returning')
        return data_list;
    })}
        
var get_word_scores = function () {
    var uid = this.user.uid;
    console.log("UID in word_score display = ", uid);
    var element = el('profile_display');
    d = history_data_list(uid,element);
    return d 
}

var generate_word_score_avg_accuracy = function (data) {
    var accuracy_list = values(data).filter(function (x) {
            return typeof x === 'object'
        }).map(function (data_item) {
            console.log("AVERAGE WORD SCORE ACCURACY = ", data_item.correct / data_item.total);
            return data_item.correct / data_item.total;
        });
    console.log("accuracy list = ", accuracy_list);
    var average_accuracy = calculate_word_score_aggregate_accuracy(accuracy_list);
    console.log("average accuracy = ", average_accuracy);
    return average_accuracy;
}

var calculate_word_score_aggregate_accuracy = function (accuracy_list) {
    var sum = accuracy_list.reduce(add, 0);
    return sum / accuracy_list.length;
}
