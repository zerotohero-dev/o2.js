function justTwo() {return this === nothing ? undefined : 2;}

justTwo.fmap = function(fn) {
	var functor = this;

    // If there's nothing to do; then do nothing.
    if (functor === nothing) {return nothing;}

    function newFunctor() {
        if (this === nothing) {return nothing;}

        return fn.apply(this, [
            functor.apply(this, arguments)
        ]);
    }

    newFunctor.fmap = justTwo.fmap;

    return newFunctor;
}
