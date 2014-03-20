return value >>= fn   =   fn value
monad >>= return      =   monad
(monad >>= f) >>= g   =   monad >>= (\x -> f x >>= g)
