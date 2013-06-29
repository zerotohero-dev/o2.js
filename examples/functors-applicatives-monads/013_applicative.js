function justPlusThree() {return function(x) {return x+3;}}

var result = apply({}, justTwo.fmap(plusThree, justTwo));

function applicative(wrappedFn, wrappedValue, context) {
    return function() {
        return apply(
            context,
            apply(context, wrappedFn),
            apply(context, wrappedValue)
        );
    }
}
