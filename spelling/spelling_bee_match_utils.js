var end_drone_game = function (clock_refresh_id_to_cancel, element_name) {
    // Tell the user that the game is over.
    alert('game over!!!');
    // Tell the user what their score was.
    display_match_score();
}

var start_drone_timer = function (n) {
    return start_timer('countdown', 50, end_drone_game, n);
}

var end_home_game = function (n) {
    alert('game ' + n + ' over!');
}

var start_home_timer = function (n, end_time) {
    return start_timer('spelling_match_timer_cell' + n, 50, function () {
        end_home_game(n)
    }, end_time);
}