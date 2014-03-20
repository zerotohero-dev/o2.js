-- var justFive = justTwo.fmap(plusThree, justTwo);
--
-- becomes this:

> fmap (+3) (Just 2)
Just 5

-- ------------------------------------------------------
--  fmap func (Just val) is defined as  `Just (func val)`
--  therefore `fmap (+3) (Just 2)` becomes
-- `Just (+3)2`,
--  which becomes `Just 5`.
-- ------------------------------------------------------
