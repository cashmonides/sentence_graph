/*
Problem 1
If we list all the natural numbers below 10 that are multiples of 3 or 5, 
we get 3, 5, 6 and 9. 
The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
*/
var lower_limit = 1;
var upper_limit = 1000;
var divisor_list = [3, 5];

function sum (a, b) {
    return a + b;
};

function divisible_by (a, b) {
    return a % b === 0;
};

function check_for_divisibility (a, divisor_list) {
    for (var i = 0; i < divisor_list.length; i++) {
        if (divisible_by (a, divisor_list[i])) {
            return true;
        }
    }
}


function iterate_divisibility_check (lower_limit, upper_limit, divisor_list) {
    var output_list = [];
    for (var i = lower_limit; i < upper_limit; i++) {
        if (check_for_divisibility(i, divisor_list)) {
            output_list.push(i);
        }
    };
    return output_list;
}

function sum_list (list) {
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
        sum = sum + list[i];
    };
    return sum;
}

function euler_1_master (lower_limit, upper_limit, divisor_list) {
    var list = iterate_divisibility_check(lower_limit, upper_limit, divisor_list);
    var sum = sum_list(list);
    console.log("EULER 1 solution = ", sum);
    return sum;
}

///FUCNTIONAL VERSION BELOW
function is_divisible_by_3_or_5 (integer) {
    return (integer % 3 == 0 || integer % 5 == 0);
}


// below isn't very functional
// is there some functional way to produce an array from 1 to 1000?


function euler_1_master_2 () {
    var array = make_array (1, 1000);
    var new_array = array.filter(is_divisible_by_3_or_5);
    console.log("EULER 1 new array = ", new_array);
    var sum = new_array.reduce(function (a, b) {return a + b});
    console.log("EULER 1 solution 2 = ", sum);
    return sum;
}


// below is an attempt to abstract away the hard-coded function above
// namely turn 3 and 5 into parameters that can be fed into our function
// this is better but it still has a for loop
function make_array (range) {
    var array = [];
    for (var i = range[0]; i < range[1]; i++) {
        array.push(i);
    };
    return array;
};

function euler_1_master_3 (divisor_list, range) {
    var array = make_array (range);
    console.log("EULER array = ", array);
    console.log("EULER divisor_list = ", divisor_list);
    
    
    var new_array = array.filter(function (item) {
        for (var i = 0; i < divisor_list.length; i++) {
            if (item % divisor_list[i] == 0) {
                return true;
            } else {
                continue;
            }
        }
    });
    
    console.log("EULER 1 new array = ", new_array);
    var sum = new_array.reduce(function (a, b) {return a + b});
    console.log("EULER 1 solution 2 = ", sum);
    return sum;
}