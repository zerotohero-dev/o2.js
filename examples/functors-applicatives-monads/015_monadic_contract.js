is(
    bind(returns(value), fn),
    fn(value)
) === true;

is(
    bind(monad, returns),
    monad
) === true;

is(
    bind(bind(monad, f), g),
    bind(monad, function(value) {
        return bind(f(value), g);
    })
) === true;
