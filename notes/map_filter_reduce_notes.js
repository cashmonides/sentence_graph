/*
MAP FILTER REDUCE


SOME GENERALITIES:
The amount of input elements is equal to the amount of output elements

map will transform our list of values


Your callbacks shouldn't 'mutate' values

What this means, 
is really just that you shouldn't modify objects or arrays 
directly from within your callbacks - 
if the input value is an object or an array, 
clone it instead, and modify the copy.

This way, there's a guarantee that your callback doesn't cause 'side effects' - 
that is, no matter what happens in your callback, 
it will only affect the specific value you're working with.

You can clone an array in Javascript by doing array.slice(0). Note that this is a 'shallow clone' - if the values in the array are themselves arrays or objects, they will still be the same values in both arrays.

Shallow-cloning an object is a little more complex. If you're using a CommonJS environment (Node.js, Webpack, Browserify, ...), you can simply use the xtend module. Otherwise, using a function like this should suffice:

function cloneObject(obj) {
    var newObj = {};

    for (var key in obj) {
        newObj[key] = obj[key];
    }

    return newObj;
}

var clonedObject = cloneObject(originalObject);



Don't cause side-effects!
You should never do anything in a map call that modifies 'state' elsewhere. For example, while making a HTTP GET request is fine (although not really possible with plain Array.map), changing another array outside of the callback is not. Your callback can only modify the new value you're returning from that callback.


REMOVING DURING MAP
But what if I only want to transform some of the values?

Perhaps your source array has some values that you want to transform, 
and some values that you just want to throw away entirely. 
That's not possible with map alone, 
as the number of input values 
and the number of output values for a map call is always equal.


so a typical code might look like this:
for loop
if loop inside the for loop that removes the elements
//antipattern
var numbers = [1, 2, 3, 4];
var newNumbers = [];

for(var i = 0; i < numbers.length; i++) {
    if(numbers[i] % 2 !== 0) {
        newNumbers[i] = numbers[i] * 2;
    }
}

//better pattern
var numbers = [1, 2, 3, 4];

var newNumbers = numbers.filter(function(number){
    return (number % 2 !== 0);
}).map(function(number){
    return number * 2;
});

console.log("The doubled numbers are", newNumbers); // [2, 6]


in other words:
old_var = x

new_var y = oldvar.filter(FUNCTIONBLOCK).map(FUNCTIONBLOCK);

FILTER-->MAP
The filter callback is subject to the same "don't mutate" and "don't cause side-effects" rules as map, but the mechanics are different.

The return value from the filter callback should be a boolean, 
indicating whether to include the original value in the result (true) or whether to leave it out (false). 
You should not return the value itself, just a boolean - 
you can't modify the value from within the callback. 
The return value just decides whether the value will be included in the result, nothing else.



CHAINING

As you might have noticed, you can chain map and filter calls indefinitely. Each of them just returns an array, and every array has these methods by default, so you can build a jQuery-like chain. There is no limit to how many of these calls you can chain, and it's usually pretty simple to build complex array transformations from just these functions alone.

An array goes in, an array comes out, and the callback operates on each value individually.


ADDING VALUES TO AN ARRAY
If you use Node.js, you may be familiar with transform streams - 
these are kind of like a map callback, 
but besides letting you 'push' (return) 0 or 1 values, 
they also let you push multiple values. 
This can be useful if you are, for example, 
'flattening' an array of arrays down to a single array with all the values.

While this can't be done with map - 
after all, one input element means one output element - 
it can be done with reduce, despite what the name implies. 
It's a slightly unusual trick, 
but you'll occasionally find yourself needing it.

*/




var tmv_list = [a, b, c, d];


var new_tmv_list = tmv_list.map(function(tmv){
    	//compare to some allowed value
	// e.g. secondary sequence, 
	 return output;
});

console.log("The new tmv are", tmv);





// CHAINING MAPS

var tmv_list = [a, b, c, d];

var new_tmv_list = tmv_list.map(function(tmv){
    return _______;
}).map(function(tmv){
    return _____;
});



