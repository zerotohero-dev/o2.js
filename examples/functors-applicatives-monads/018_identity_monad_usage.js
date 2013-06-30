var monad = Monad.create('Welcome... to the real world!');

// This logs "Welcome... to the real world!".
monad.bind(log);

// newTextNode will be a DOM text node that has
// "Welcome... to the real world!"
// as its value.
var newTextNode = monad.bind(document.createTextNode.bind(document));
