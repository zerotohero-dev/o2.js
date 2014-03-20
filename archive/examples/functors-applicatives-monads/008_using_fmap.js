var justFive = justTwo.fmap(plusThree);
var justEight = justFive.fmap(plusThree);

// This will log "5".
log(
    apply({}, justFive)
);

// This will log "8".
log(
    apply({}, justEight)
);

var nothingy = justTwo.fmap(nothing);

// Will log "true".
log(
    nothingy === nothing
);
