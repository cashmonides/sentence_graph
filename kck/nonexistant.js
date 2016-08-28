// This defines a non-existant object, meant to signify a nonexistant key.
// The problem it is designed to solve is the following.
// Suppose we're accessing a property of a dictionary.
// The value accessed could be anything, including undefined.
// So when we return the value, we cannot have a special value
// unless it's special enough that it will never accidently
// be a value in a dictionary. Thas is what this value is for.

// The nonexistant key constructor.
var NonexistantKey = function () {
    
}