
function sort_numbers(list){
    return list.sort(function(a, b){return a-b;});
}

function peek(list){
    return list[list.length - 1];
}



function random_choice(list) {
    return list[Math.floor(list.length * Math.random())];
}
