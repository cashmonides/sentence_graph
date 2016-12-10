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

//pseudocode
// we're given a list of lists
// for each item (each list)
// we get neighbors
// if it has no neighbors we assume it's water
// get value at index x of neighbors (up, down, left, right)
    // get left_neighbor list[n-1][x]
    
    
// a = column (indexed from 0)
// b = row (indexed from 0)
function get_value_in_matri_oldx (matrix, a, b) {
    if (typeof a != 'number' || typeof b != 'number') {
        console.log("ERROR, indices are not numbers")
    };
    
    return matrix[a][b];
}  

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