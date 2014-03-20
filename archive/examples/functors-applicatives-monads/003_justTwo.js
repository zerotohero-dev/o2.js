/**
 * What `justTwo` returns will be different, depending on the context.
 */
function justTwo() {
    if (this === nothing) {return nothing;}

    return 2;
}
