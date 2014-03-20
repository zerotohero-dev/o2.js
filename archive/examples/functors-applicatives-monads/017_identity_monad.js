var Monad = {};

/**
 * This is a factory function that ceates `Monad`s.
 */
Monad.create = function(value) {

    // This is the actual concreate `Monad`.
    var monad = {};

    monad.bind = function(fn) {

        //
        // We're using apply here to give th possibility
        // to use `bind` function with different contexts,
        // after some minor modifications.
        //
        // The below code is equivalent to
        //
        //     return fn(value);
        //
        return apply({}, fn, value);
    };

    monad.returns = function(newValue) {

        // If values are identical, no need to create a new computation;
        // use the existing one instead.
        if (is(newValue, value)) {return monad;}

        return Monad.create(newValue);
    };

    return monad;
};
