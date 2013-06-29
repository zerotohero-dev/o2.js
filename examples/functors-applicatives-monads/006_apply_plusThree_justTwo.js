// This will log the String representation of `justTwo`
// followed by the number `3`.
log(
    apply({}, plusThree, justTwo)
);

// This will log "5", as expectd.
log(
    apply({}, plusThree, justTwo())
);
