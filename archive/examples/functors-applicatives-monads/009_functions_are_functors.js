Function.prototype.fmap = function(g) {
    var f = this;

    function result() {

        // This is the same as `return f(g())`.
        return apply({}, f, apply({}, g));
    };

    result.fmap = Function.prototype.fmap;

    return result;
}

function justTwo() {return 2;}
function plusThree(x) {return x + 3;}

// This will log "5".
log(
    Function.prototype.fmap.call(plusThree, justTwo)()
);
