// Wrap an array in a context.
function list() {return [1,2,3,4,5];}

//
// fmap simply uses Array.prototype.map to do the mapping.
// If this was Haskell, we could have defined it as:
//
//     instance Functor [] where
//         fmap = map
//
list.fmap = function(fn) {
    var functor = this;

    function newFunctor() {
        return apply(this, functor).map(fn);
    }

    newFunctor.fmap = list.fmap;

    return newFunctor;
};

function timesTwo() {return x*2;}

var doubledList = list.fmap(timesTwo);
var quadrupledList = doubledList.fmap(timesTwo);

// This will log "[2, 4, 6, 8, 10]".
log(
   apply({}, doubledList)
);

// This will log "[4, 8, 12, 16, 20]".
log(
   apply({}, quadrupledList)
);
