/**
 * For simple logging.
 */
function log(stuff) {window.console && window.console.log(stuff);}

/**
 * A helper function to apply a context to a function.
 */
function apply(context, fn) {
    return fn.apply(context,
        Array.prototype.slice.call(arguments).splice(2)
    );
}

/**
 * A simple function that does nothing.
 * You can think of it as the functional counterpart of the
 * variable `undefined`.
 */
function nothing() {return nothing;}
nothing.fmap = nothing;

/*
 * ES6 object.is shim.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
if (!Object.is) {
    Object.is = function(v1, v2) {
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }

        if (v1 !== v1) {
            return v2 !== v2;
        }

        return v1 === v2;
    };
}

/**
 * Returns true if the two values are the same value,
 * or the same object.
 */
function is(a, b) {
    return Object.is(a, b);
}

/**
 * A simple assertion.
 * @param  {Object} expression - the expression to test.
 * @param  {String} description - the description for the assertion.
 * @return <code>true</code> if assertion passes; <code>false</code>
 * if assertion fails.
 */
function assert(expression, description) {
    var result = !!expression;

    log((result ? 'PASS: ' : 'FAIL: ') + description);

    return result;
}
