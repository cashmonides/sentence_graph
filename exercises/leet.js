//utilities

function x_divisible_by_y (a, b) {
    if (typeof b === 'number') {
        return a % b == 0;
    } else if (typeof b === 'object') {
        for (var i = 0; i < b.length; i++) {
            if (a % b[i] == 0) {
                return true;
            } else {
                continue;
            }
        }
    }
    return false;
}


// LEETCODE 412 FIZZBUZZ
// Write a program that outputs the string representation of numbers from 1 to n.

// But for multiples of three it should output “Fizz” 
// instead of the number and for the multiples of five output “Buzz”. 
// For numbers which are multiples of both three and five output “FizzBuzz”.

function leet_412 (n) {
    var array = [];
    // we iterate starting at 1, because we are iterating through integers 1-15 not indices which start at 0 
    for (var i = 1; i <= n + 1; i++) {
        if (x_divisible_by_y(i, 3) && x_divisible_by_y(i, 5)) {
            array.push("FizzBuzz");
        } else if (x_divisible_by_y(i, 3)) {
            array.push("Fizz");
        } else if (x_divisible_by_y(i, 5)) {
            array.push("Buzz");
        } else {
            array.push(i);
        }
    }
    console.log("LEET 412 array = ", array);
    return array;
}


// LEETCODE 344 REVERSE STRING
// Write a function that takes a string as input and returns the string reversed.

// Example:
// Given s = "hello", return "olleh".

function leet_344 (string) {
    var output = string.split("").reverse().join("");
    console.log("LEET 344 reversed string = ", output);
    return output;
}

// LEETCODE 463 ISLAND PERIMETER
// You are given a map in form of a two-dimensional integer grid 
// where 1 represents land and 0 represents water. 
// Grid cells are connected horizontally/vertically (not diagonally). 
// The grid is completely surrounded by water, and there is exactly one island 
// (i.e., one or more connected land cells). 
// The island doesn't have "lakes" 
// (water inside that isn't connected to the water around the island). 
// One cell is a square with side length 1. 
// The grid is rectangular, width and height don't exceed 100. 
// Determine the perimeter of the island.

// a cell of type 0 we ignore for perimeter
// a cell of type 1 has perimeter n based on how many of its neighbors are 0

// begin dan

var dan_get_item = function (grid, i, j) {
    if (i < 0 || j < 0 || grid.length <= i || grid.length <= j) {
        return 0;
    } else {
        return grid[i][j];
    }
}

var dan_brute_force_solution = function (grid) {
    var count = 0;
    for (var i = 0; i <= grid.length; i++) {
        for (var j = 0; j <= grid[0].length; j++) {
            if (dan_get_item(grid, i, j) !== dan_get_item(grid, i - 1, j)) {
                count++;
            }
            if (dan_get_item(grid, i, j) !== dan_get_item(grid, i, j - 1)) {
                count++;
            }
        }
    }
    return count;
}

//pseudocode
// we're given a list of lists
// for each item (each list)
// we get neighbors
// if it has no neighbors we assume it's water
// get value at index x of neighbors (up, down, left, right)
    // get left_neighbor list[n-1][x]
    
    


function get_value_in_matrix (matrix, coordinates) {
    if (typeof coordinates[0] != 'number' || typeof coordinates[1] != 'number') {
        console.log("ERROR, indices are not numbers")
    };
    
    return matrix[coordinates[0]][coordinates[1]];
}  

// args
//matrix we're checking
// a column home coordinate 
// b row home coordinate
// direction of neighbor (left, right, up, down)


function get_neighbor_value_in_matrix (matrix, coordinates, direction) {
    var output;
    var altered_coordinates;
    var a = coordinates[0];
    var b = coordinates[1];
    
    if (direction === 'left') {
        altered_coordinates = [a, b - 1]; 
    } else if (direction === 'right') {
        altered_coordinates = [a, b + 1];
    } else if (direction === 'top') {
        altered_coordinates = [a - 1, b];
    } else if (direction === 'bottom') {
        altered_coordinates = [a + 1, b];
    } else {
        console.log("LEET 463 problem, no change in coordinates")
        altered_coordinate = [a, b];
    }
    
    if ((altered_coordinates[0] < 0) || (altered_coordinates[1] < 0)) {
        output = 0; //out of range, so counts as water
        console.log("LEET 463 coordinate < 0 out of range, output = ", output);
        return output;
    } else if ((altered_coordinates[0] > matrix.length) || (altered_coordinates[1] > matrix.length)) {
        output = 0; // out of range so counts as water
        console.log("LEET 463 coordinate > length out of range, output = ", output);
        return output;
    }
    
    var output = get_value_in_matrix(matrix, altered_coordinates)
    console.log("LEET 463 output = ", output);
    return output;
}


function get_all_neighbor_values_in_matrix (matrix, coordinates) {
    console.log("LEET 463 entering get all neighbor values");
    console.log("LEET 463 coordinates = ", coordinates);
    var array = [];
    array.push(get_neighbor_value_in_matrix(matrix, coordinates, 'top'));
    array.push(get_neighbor_value_in_matrix(matrix, coordinates, 'bottom'));
    array.push(get_neighbor_value_in_matrix(matrix, coordinates, 'right'));
    array.push(get_neighbor_value_in_matrix(matrix, coordinates, 'left'));
    console.log("LEET 463 array of all neighbors = ", array);
    return array;
}
            
            
            
// iterate through each item in the list of lists
// if we hit the value of 0 (water) we continue
// for each value 1 (land), we check the value of its four neighbords
// if the value is 0 (water) or 'out of range' we increment the counter
// we add up all the 0s and all the out of ranges and that adds up to the perimeter            
                
function leet_463 (matrix) {
    var array = [];
    var counter = 0;
    // first iteration loop is the outer loop goes over each list in the list of lists
    for (var i = 0; i < matrix.length; i++){
        //inner iteration, looping through each sub-list
        for (var j = 0; j < matrix[i].length; j++) {
            var output = get_all_neighbor_values_in_matrix(matrix, [i, j]);
            console.log("LEET 463 output pushed to array = ", output);
            array.push(output);
        }
    }
    
    
    console.log("LEET 463 array = ", array);
    
    var flattened_array = array.reduce(function (a, b) {
        return a.concat(b);
    })
   
   console.log("LEET 463 flattened_array = ", flattened_array);
    
    var sum = flattened_array.reduce(function (a, b) {
        return a + b;
    })
    
    console.log("LEET 463 sum = ", sum);
    return sum;
}




// LEET 292 NIM GAME

// You are playing the following Nim Game with your friend: 
// There is a heap of stones on the table, each time one of you take turns to remove 1 to 3 stones. 
// The one who removes the last stone will be the winner. You will take the first turn to remove the stones.
// Both of you are very clever and have optimal strategies for the game. 
// Write a function to determine whether you can win the game given the number of stones in the heap.
// For example, if there are 4 stones in the heap, then you will never win the game: 
// no matter 1, 2, or 3 stones you remove, the last stone will always be removed by your friend.


function leet_292 (n) {
    return n % 4 != 0;
}



// LEET 136 SINGLE NUMBER
// Given an array of integers, every element appears twice except for one. Find that single one.
// 
// Note:
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?


// one option
// iterate through array, hit an int, temporarily store the int,
// remove that int, check for multiple occurrences of that int, 
// if no occurrences, return that int
// if occurrences
// remove those occurrences
// continue iteration


// function leet_136 (array) {
//     var current_item;
//     var sliced_array = [];
//     var filtered_array = [];
//     for (var i = 0; i < array.length; i++) {
//         console.log("starting array = ", array);
//         current_item = array[i];
//         sliced_array = array.slice(i + 1);

//         console.log("item we're searching for = ", current_item);
//         console.log("sliced_array we're searching in = ", sliced_array);
//         if (sliced_array.indexOf(current_item) === -1) {
//             console.log("LEET 136 unique item = ", current_item)
//             return current_item;
//         } else {
//             console.log("match found")
            
//             continue;
//         }
//     }
//     return "no unique item";
// }

function leet_136 (array) {
    var current_item;
    var sliced_array = [];
    var filtered_array = [];
    for (var i = 0; i < array.length; i++) {
        console.log("starting array = ", array);
        current_item = array[i];
        sliced_array = array.slice(i + 1);
        console.log("item we're searching for = ", current_item);
        console.log("sliced_array we're searching in = ", sliced_array);
        if ((sliced_array.indexOf(current_item) === -1) && (current_item != 'x')) {
            console.log("LEET 136 unique item = ", current_item)
            return current_item;
        } else {
          for (var j = 0; j < array.length; j++) {
                if (current_item === array[j]) {
                    array[j] ="x";
                } else {
                    continue;
                }
            }
            continue;
        }
    }
    return "no unique item";
}

// function leet_136 (array) {
//     console.log("Entering function");
//     var current_item;
//     var sliced_array = array;
//     var filtered_array = [];
//     var i = 0;
//     while (i < array.length) {
//         current_item = sliced_array[0];
//         console.log("current_item = ", current_item)
//         sliced_array = sliced_array.slice(1);
//         console.log("array we're searching = ", sliced_array);
//         if (sliced_array.indexOf(current_item) === -1) {
//             console.log("LEET 136 unique item = ", current_item)
//             return current_item;
//         } else {
//             sliced_array = sliced_array.slice(1);
//             console.log("match found reslicing array, new array = ", sliced_array);
//         }
//         i++;
//     }
// }


// function leet_136 (array) {
//     var current_item;
//     for (var i = 0; i < array.length; i++) {
//         current_item = array[i];
//         var filtered_array = remove_item_from_array(array, current_item);
//         console.log("item we're searching for = ", current_item);
//         console.log("filtered_array = ", filtered_array);
//         if (filtered_array.indexOf(current_item) === -1) {
//             console.log("LEET 136 unique item = ", current_item)
//             return current_item;
//         } else {
//             console.log("no match found");
//             continue;
//         }
//     }
//     return "no unique item";
// }


function remove_item_from_array (array, item) {
    return array.filter(function(el){return el !== item});
}








//////DAN PUZZLE 1///////

// write a function that counts the number of occurences of an item in a list

function count_item_in_list (list, item) {
    var counter = 0;
    for (var i = 0; i < list.length; i++) {
        if (item === list[i]) {
            counter++;
        }
    }
    return counter;
}


function count_item_in_list_functional (list, item) {
    return list.reduce(function(accumulator, item_from_list) {
        if (item_from_list === item) {
            return accumulator + 1;
        } else {
            return accumulator;
        }
    }, 0);
} 

function count_item_in_list_functional2 (list, query_item) {
    var filtered_list = list.filter(function(item) {
        return  item === query_item;
    });
    return filtered_list.length;
}



//////DAN PUZZLE 2//////

// write a function that returns the factorial of a number

function factorial (n) {
    var list = [];
    
    for (var i = 0; i < n; i++) {
        list.push(i+1);
    }
    
    return list.reduce(function(item1, item2) {
        return item1 * item2;
    });
}


/////DAN PUZZLE 3///////////

// write a function that detects whether a list is its own reverse


function detect_palindrome (query_item) {
    var input;
    
    if (typeof query_item === 'string') {
        input = query_item.split("");
    } else {
        input = query_item;
    }
    
    var reversed_input = input.reverse();
    
    compare_lists(input, reversed_input);
}



function compare_lists (list1, list2) {
    for (var i; i < list1.length; i++) {
        if (list1[i] != list2[i]) {
            return false;
        }
    }
    return true;
}


