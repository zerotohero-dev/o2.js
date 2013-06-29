// A simple function.
function plusThree(x) {return x + 3;}

// Define a value.
var value = 2;

// Use the value with a function.
var result = plusThree(value);

// Log the result.
log(result); // will log "5".

var justFive = applicative(justPlusThree, justTwo, {});

// This will log "5".
log(
    apply({}, justFive)
);
