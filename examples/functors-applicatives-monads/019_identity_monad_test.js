var monad = Monad.create('aValue');

function fn(value) {
    return "fn('" + value + "')";
}

function returnsMonad(value) {
    return Monad.create("returnsMonad('"+ value + "')");
}

// This will log "fn('testValue')".
log(
    monad.returns('testValue').bind(fn)
);

// This will log "fn('testValue')".
log(
    fn('testValue')
);

// This will log "fn('returnsMonad('aValue')')".
log(
   monad.bind(returnsMonad).bind(fn)
);

// This will log "fn('returnsMonad('aValue')')".
log(
    monad.bind(function(value) {
        return returnsMonad(value).bind(fn)
    })
);
