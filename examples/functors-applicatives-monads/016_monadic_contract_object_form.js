is(
    returns(value).bind(fn),
    fn(value)
) === true;

is(
    monad.bind(returns),
    monad
) === true;

is(
    moand.bind(f).bind(g),
    monad.bind(function(value) {
        return f(value).bind(g);
    })
) === true;
