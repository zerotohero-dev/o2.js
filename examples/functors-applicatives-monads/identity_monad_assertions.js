assert(
    is(
        monad.returns("testValue").bind(fn),
        fn("testValue")
    ),
    "1. returns(value) bound to fn SHOULD be identical to fn(value)."
);

assert(
    is(
        monad.bind(monad.returns),
        monad
    ),
    "2. Binding a monad's returns function to a monad SHOULD give the monad itself."
);

assert(
    is(
        monad.bind(returnsMonad).bind(fn),
        monad.bind(function(value) {
            return returnsMonad(value).bind(fn)
        })
    ),
    "3. Bind function of a monad SHOULD be nestable."
);

// Output:
// PASS: 1. returns(value) bound to fn SHOULD be identical to fn(value).
// PASS: 2. Binding a monad's returns function to a monad SHOULD give the monad itself.
// PASS: 3. Bind function of a monad SHOULD be nestable.
