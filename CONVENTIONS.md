# o2.js JAVASCRIPT CONVENTIONS & BEST PRACTICES

## 1. INTRODUCTION

This document includes **JavaScript** naming conventions, best practices 
and recommendations to be used within **o2.js** source code, and examples.

If there's a particular **JavaScript** usage that's not mentioned in this
document,

* Either it should be proposed as an exceptional case and added to this
document.
* Or the code should be **re-factored** to adhere **o2.js** **JavaScript**
conventions.

This document is, in particular, the basis for **o2.js** coding standards.
In general, however, it *can* be used as a *guideline* for *any* large-scale 
client-heavy **JavaScript** project.

## 2. WHY DO WE NEED CONVENTIONS?

**Coding Conventions** is a must-have for any large-scale long-lived
software project.

*Nearly %80 of the development time* in large-scale software projects go
to **maintenance**, **patching**, and **rewriting** the codebase. 
During their lifetime, these large-scale software projects are not coded 
and maintained by one person, and everyone's coding style and preferences
differ.

In this essence, **coding conventions** constitute a shared language
between the developer team. It increases the readability of the code,
and makes the code less error-prone.

## 3. o2.js JAVASCRIPT CODING STANDARDS

### 3.1. CODE CLEANLINESS

The code should be kept clean. There should **not** be excessive logs,
debug lines, print statements, or alerts.

There should **not** be commented out code.

The whole point of using a *version control system* is to eliminate the
need of leaving commented out code in the source code. Instead of
leaving the code commented out, one should utilize the version control
system's *diff&merge* utility.

If there is a code piece that you long to keep, save it in an 
external file **outside** the project folder.
    
### 3.2. INDENTATION

Code blocks are indented with **4 spaces**. Each `<TAB>` corresponds to 4
spaces, and the actual `<TAB>` character is **NOT USED**. The IDE should be 
set up to print **4 spaces** when pressing the `<TAB>` key.

Indent...

* Statements within **blocks**:

        while(node) {
            if(node.nodeType != kTextNode) {

                return node;
            }

            //
            node = node.nextSibling;
        }

* Statements within a **function** body:

        me.getNextById = function(target, id) {

            //
            target = $(target);

            if(!target) {

                return null;
            }

            var node = target.nextSibling;

            if(!node) {

                return null;
            }

            var kTextNode = me.nodeType.TEXT;

            while(node) {
                if(node.id && node.id == id) {

                    return node;
                }

                // get the next node.
                node = node.nextSibling;
            }

            return null;

        };

* Statements within a **switch** body:

        switch(className) {
            case ccc.LOG:

                try {
                    console.log(text);

                } catch(ignore1) {

                }

                break;
            case ccc.INFO:

                try {
                    console.info(text);

                } catch(ignore2) {

                }

                break;

                ...

* Statements within a **case** body:
            
            ...

            case ccc.WARN:

                try {
                    console.warn(text);

                } catch(ignore3) {

                }

                break;
            case ccc.ERROR:

                try {
                    console.error(text);

                } catch(ignore4) {

                }

                break;
            default:

                try {
                    console.log(text);

                } catch(ignore5) {

                }

                break;
        }

* Statements **inside** a *closure*:

            me.EventHandler.preventDefault = window.event ? function() {
    
                window.event.returnValue = false;
    
                return false;
    
            } : function(e) {
    
                if(!e) {
    
                    return;
                }
    
                if(e.preventDefault) {
                        e.preventDefault();
                }
    
                return false;
    
            };
    
    
            me.EventHandler.preventDefault(evt);

### 3.3. BLANK LINES

Leave **at most** one blank line.

Insert **one** blank line...

* **Before** *throw*, *break*, *continue*, *return* statements:

        if(!url) {

            return null;
        }

* **After** function declerations:

        me.EventHandler.stopPropagation = window.event ? function() {

            window.event.cancelBubble = true;

        } : function(e) {

            if(!e) {

                return;
            }

            e.stopPropagation();

        };

        // stop event propagation
        me.EventHandler.stopPropagation(evt);

* **After** inline functions:

        function isArray(obj) {

            return is(obj, config.constants.ecmaScriptType.ARRAY);

        }
        
        function is(obj, type) {

            var objectNameStartIndex = 8;
            var trimLastBraceIndex = -1;
            var klass = Object.prototype.toString.call(obj).slice(objectNameStartIndex, trimLastBraceIndex);

            return obj !== UNDEFINED && obj !== null && klass === type;

        }        

* **After** the beginning of and **before** the ending of a **function** body:

        me.loadImage = function(url, succesCallback, failureCallback) {

            var succesCallbackCached = succesCallback || nill;
            var failureCallbackCached = failureCallback || nill;

            var testImg = new Image();

            testImg.onload = succesCallbackCached;
            testImg.onerror = failureCallbackCached;
            testImg.onabort = failureCallbackCached;
            testImg.src = url;

            return testImg;

        };

* **Between** two **if** blocks:

        if(!ar) {

            return -1;
        }

        if(isArray(ar)) {
            for(var i = 0, len = ar.length; i < len; i++) {
                if(elm == ar[i]) {

                    return i;
                }
            }

            return -1;
        }

* **After** variable declerations:

        var nodeName = 'div';

        if(config.isUsingConsole && config.outputElement) {

            return function(value, className) {

                println(value, className);

                var debugContent = document.createElement(nodeName);

                debugContent.className = className;
                debugContent.innerHTML = value;
                config.outputElement.appendChild(debugContent);

            };
            
            ...

* **Before**, **after**, and **inside** a *try/catch/finally* construct:

        function processCallbacks(xhr, callbacks) {
    
            var nillCached = nill;
            var constants = config.constants;
    
            var kComplete = constants.readystate.COMPLETE;
            var kOk = constants.status.OK;
            var kCached = constants.status.CACHED;
    
            //
            callbacks = callbacks || {};
    
            var oncomplete = callbacks.oncomplete || nillCached;
            var onerror = callbacks.onerror || nillCached;
            var onexception = callbacks.onexception || nillCached;
    
            var status = xhr.status;
            var isSuccess = status == kOk || status == kCached;
    
            try {
    
                if(isSuccess) {
                    oncomplete(xhr.responseText, xhr.responseXML, xhr);
    
                    return;
                }
    
                onerror(xhr.status, xhr.statusText, xhr);
    
            } catch(ex) {
    
                onexception(xhr, ex);
    
            } finally {
    
                finalizeXhr(xhr);
    
            }
    
        }


* **Before** *any* kind of *comment*s:

        ...
    
        }

        /*
         * <p>Processes callbacks and finalizes the <code>Xhr</code>.</p>
         *
         * @param {XmlHttpRequest} xhr - the current <code>Xhr</code> instance.
         * @param {Object} callbacks - oncomplete, onerror and onexception callbacks.
         */
        function processCallbacks(xhr, callbacks) {

        ...
    
        //
        parameters = parameters || {};
        callbacks = callbacks || {};
        isSync = !!isSync;

        var isAsync = !isSync;

        var kRandom = config.constants.prefix.RANDOM;
        var kGet = config.constants.verb.GET;
        var isPost = verb != kGet;

        // name1=value1&name2=value2&name3=value3
        var parametrizedQuery = generateParametrizeQueryString(parameters);

        // &name1=value1&name2=value2&name3=value3 (for GET requests)
        var query = isPost ? '' : ['&', parametrizedQuery].join('');

        // name1=value1&name2=value2&name3=value3 (for POST requests)
        var postQuery = isPost ? parametrizedQuery : '';

        // A unique string to prevent caching.
        var guid = generateGuid();
    
        // http://example.com + ?rnd= + {guid} + &name1=value1
        url = concat(url, kRandom, guid, query);

        // Create a cross-browse XmlHttpRequest.
        var xhr = createXhr();

        // Open the connection.
        xhr.open(verb, url, isAsync);

        // Add headers.
        addCommonRequestHeaders(xhr);

        if(isPost) {

            // Add more headers.
            addPostRequestHeaders(xhr);
        }

        // Register callbacks.
        registerCallbacks(xhr, callbacks);

        // Send the request.
        try {

            xhr.send(postQuery);

        } catch(exception) {

            callbacks.onexception(xhr, exception);

        }

        if(isSync) {

            // If the request is sync, process response immediately.
            processCallbacks(xhr, callbacks);
        }

        return xhr;    

### 3.3. LINE LENGTH

To sustain code readability, limit the line length to **160 characters**.
If the line (*including the indentation*) exceeds **160 characters**, 
continue from the next line.

### 3.4. BRACE POSITIONING

The brace positions should be as follows:

* **Same line**, in blocks (C-Style).

        for(var key in ar) {
            if(ar.hasOwnProperty(key)) {
                value = ar[key];

                if(shouldDeepCopy && ( typeof value == 'object')) {
                    theCopy[key] = me.CollectionHelper.copy(value, shouldDeepCopy);

                    continue; 
                }

                theCopy[key] = value;
            }
        }

* **Same line**, in function declarations (C-Style).

        removeElementByValue : function(collection, name, value, isRecursive) {

            var item = null;
            var isNested = !!isRecursive;

            var removeElementByValue = o2.CollectionHelper.removeElementByValue;
            
            ...

* **Same line**, in switch statements (C-Style).
 
        switch(className) {
            case ccc.LOG:

                try {
                    console.log(text);

                } catch(ignore1) {

                }

                break;
            case ccc.INFO:

                try {
                    console.info(text);

                } catch(ignore2) {

                }

                break;
                
                ...

### 3.5  SPACES

The spacing should be as follows:

* Commas: **before**: 0, **after**: 1
* Parentheses: **before**: 0, **after**: 0
* Semicolons in for statements: **before**: 0, **after**: 1
* Arithmetic operators: **before**: 1, **after**: 1
* Relational operators: **before**: 1, **after**: 1
* Unary (*++, --*) operators: **before**: 0, **after**: 0
* Assignments: **before**: 1, **after**: 1
* Conditional operators: before: 1, after: 1
* Key-value (*{'a':'b'}*) operators: **before**: 1, **after**: 1

### 3.5  NEW LINES

* *DO NOT* insert a new line *before* else statement.
* *DO NOT* insert a new line *before* if and else-if statement.
* *DO NOT* insert a new line *before* catch statement.
* *DO NOT* insert a new line *before* finally statement.
* *DO NOT* insert a new line *before* while in a do statement.
* **DO** insert a new line *before* ' name : value ' pairs.
* **DO** separate *logical code fragments* from each other *with a new line*.

Example:

        // Functions
        function foo() {
        
            do {
            
            } while(true);
            
            try {
            
                alert('hello');
            
            } catch(e) {
            
            
            } finally {
            
            
            }
            
        }
    
        function bar(a) {
            
            if(true) {
            
                return;
            }
            
            // If-Else
            if(false) { 
                alert('hello');
            } else if(a > 0) {
                alert(a);
            } else {
                alert(0);
            }
        
        }
    
        // Switch-Case
        switch (a) {
            case 1:
                alert('1');
                
                break;
            case 2:
            
                break;
            default:
                alert('none');
        }
    
        // Closures
        (function fooInGroup(a, b) {
    
        }(a, b));
    
        // Associative Objects
        var associative = {
           name1: 'value1',
           name2: 'value2',
           name3: 10,
           
           //float is a keyword and thus it's escaped.
           'float': 'left 
        };


### 3.6  STRINGS

Use single quotes ( `'` ) for string literals.

Example:

        //Incorrect:
        var test = "lorem ipsum dolor sit amet";
    
        //Correct:
        var test = 'lorem ipsum dolor sit amet';

### 3.7  COMMENTS

Use [jsDoc syntax][1] for documenting modules, functions, objects, and
structs. 

Use **only** line comments ( `//` ) for in-line comments.

You *MUST* comment critical or tricky parts of the code, or important
changes you've made to the code, or anything that's not easy to grasp
at a first glance.

Feel free to **write descriptive comments**; your production **shall** be 
*minified* and *obfuscated* anyway; and therefore your comments will not 
have  any negative impact on *performance* or *file size*.

[1]: http://code.google.com/p/jsdoc-toolkit/w/list  "jsDoc syntax"

### 3.8  VARIABLE & METHOD NAMING

### 3.9  FILE HEADERS

### 3.10 CURLY LOVE

### 3.11 DEFAULT FALLBACKS

### 3.12 BOOLEAN COMPARISONS

### 3.13 VARIABLE ACCESS

### 3.14 STATEMENT TERMINATION

## 4. o2.js JAVASCRIPT CODING BEST-PRACTICES

### 4.1.  JSLINT YOUR CODE
### 4.2.  SHOW LOVE TO THE MODULE PATTERN
### 4.3.  DO NOT POLLUTE THE GLOBAL NAMESPACE
### 4.4.  AVOID GOD OBJECTS and GOD METHODS
### 4.5.  DO NOT INCLUDE TYPE INFORMATION WHILE NAMING VARIABLES
### 4.6.  DO NOT MIX HTML AND JAVASCRIPT
### 4.7.  DO NOT USE INLNE JAVASCRIPT EVENTS
### 4.8.  USE EVENT-DELEGATION
### 4.9.  USE EVENT-DRIVEN PROGRAMMING
### 4.10.  AVOID MAGIC STRINGS AND MAGIC NUMBERS
### 4.11. DECOUPLE OBJECTS & MINIMIZE VARIABLE SCOPE
### 4.12. REPLACE TEMPORARY VARIABLES WITH QUERY METHODS
### 4.13. PROGRAM DEFENSIVELY
### 4.14. EXCEPTIONS ARE FOR EXCEPTIONAL CASES

## 5. PERFORMANCE AND MEMORY CONSIDEARATIONS

### 5.1 KEY PERFORMANCE INDICATORS
### 5.2. CONSIDER USING NATIVE METHODS WHENEVER POSSIBLE
### 5.3. MINIMIZE SCOPE CHAIN AND NAMESPACE LOOKUP
### 5.4. USE ARRAY JOINS INSTEAD OF STRING CONCATENATION
### 5.5. USE FUNCTION POINTERS
### 5.6. ADD COMPLEX DOM SUBTREES OFFLINE
### 5.7. EDIT COMPLEX DOM SUBTREES OFFLINE
### 5.8. CACHE DOM COLLECTION LENGTH
### 5.9. USE MEMOIZATION FOR COMPUTATION-INTENSIVE FUNCTIONS
### 5.10. CACHE FREQUENTLY USED GLOBAL METHODS AND OBJECTS FOR SPEED

## 6. CODE SMELLS

### 6.1.  COMMENTS
### 6.2   EXCESSIVELY LONG METHOD NAMES
### 6.3.  METHODS HAVING TOO MUCH PARAMETERS
### 6.4.  CODE REPETITION (COPY / PASTE CODE)
### 6.5.  CONDITIONAL COMPLEXITY
### 6.6.  CODES DOING "ALMOST" THE SAME THING
### 6.7.  A VERY LARGE MODULE / FUNCTION
### 6.8.  FUNCTION AND VARIABLES THAT ARE NOT TELLING WHAT THEY DO
### 6.9.  INCOHERENT NAMING
### 6.10. DEAD CODE
### 6.11. SPECULATIVE GENERALIZATION
### 6.12. "I DID IT, and IT WORKED" STYLE OF APPROACH
### 6.13. TEMPORARY VARIABLES
### 6.14. GLOBAL VARIABLES
### 6.15. DATA CLUSTERS
### 6.16. CROSS-MODULE-INTIMACY
### 6.17. ATTRIBUTE ENVY
### 6.18. LAZY CLASS
### 6.19. SHOTGUN SURGERY
### 6.20. INCOMPLETE LIBRARY CLASS


------ draft ---

NEVER CHECK-IN INCOMPLETE/UNTESTED CODE

The source code in the repository, at any given time, should not contain
any build errors, syntax errors, runtime errors, or logic errors. This
is only possible if *DO NOT* check-in garbage code.

The Source Code Repository is not your FTP backup place. Only check in
the code that you've *TESTED* (yes testing is *your* responsibility) and
you are %100 sure that it works. Keep in mind that the checked in code
should be "ready for release" *AT ANY TIME*.


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

---
documentation
