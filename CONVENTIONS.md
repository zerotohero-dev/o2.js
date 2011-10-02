### o2.js MODULES ###

o2.js files are organized in modules using the module pattern [1]
[1] http://o2js.com/2011/04/24/the-module-pattern/

Each o2.js module has the following basic structure.

( function(o2, window, UNDEFINED) {
    ... module code goes here ...
}(o2, this));

### Heading ###

//TODO: there are a lots of things add to this document.

//jsDoc references to method parameters shall be bold.
* @throws {Exception} if <strong>fn</strong> callback is not defined.

//enclose JavaScript objects in <code>...</coce>
* @param {DomNode} node - the DOM object (or its <code>String</code>
* reference) the evet shall be removed.

comment // and a space after -- proper sentence.
        // Open the connection.
        xhr.open(verb, url, isAsync);
