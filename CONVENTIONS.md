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

> *Nearly %80 of the development time* in large-scale software projects go
> to **maintenance**, **patching**, and **rewriting** the codebase. 

During their lifetime, these large-scale software projects are not coded 
and maintained by one person, and everyone's coding style and preferences
differ.

In this essence, **coding conventions** constitute a shared language
between the developer team. They increase the readability of the code,
and make the code less error-prone.

## 3. o2.js JAVASCRIPT CODING STANDARDS

Here are the main code conventions, standards, and guidelines used 
within **o2.js** source files:

### 3.1. CODE CLEANLINESS

The code should be kept clean. There should **not** be excessive logs,
debug lines, print statements, or alerts.

There should **not** be commented out code.

> The whole point of using a *version control system* is to eliminate the
> need of leaving commented out code in the source code. Instead of
> leaving the code commented out, one should utilize the version control
> system's *diff&merge* utility.

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

* **Before** *throw*, *break*, *continue*, and *return* statements:

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


* **Before** *any* kind of *comment*:

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

### 3.4. LINE LENGTH

To sustain code readability, limit the line length to **160 characters**.
If the line (*including the indentation*) exceeds **160 characters**, 
continue from the next line.

### 3.5. BRACE POSITIONING

The brace positions should be as follows:

* **Same line**, in blocks (*C-Style*).

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

* **Same line**, in function declarations (*C-Style*).

        removeElementByValue : function(collection, name, value, isRecursive) {

            var item = null;
            var isNested = !!isRecursive;

            var removeElementByValue = o2.CollectionHelper.removeElementByValue;
            
            ...

* **Same line**, in switch statements (*C-Style*).
 
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

### 3.6.  SPACES

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
* Inside a line comment: **after**: 1
 
        //this is incoorrect

        // This is correct with a space.

### 3.7.  NEW LINES

* **DO NOT** insert a new line *before* else statement.
* **DO NOT** insert a new line *before* if and else-if statement.
* **DO NOT** insert a new line *before* catch statement.
* **DO NOT** insert a new line *before* finally statement.
* **DO NOT** insert a new line *before* while in a do statement.
* **DO** insert a new line *before* ' name : value ' pairs.
* **DO** separate *logical code fragments* from each other *with a new line

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


### 3.8.  STRINGS

Use single quotes ( `'` ) for string literals.

Example:

        //Incorrect:
        var test = "lorem ipsum dolor sit amet";
    
        //Correct:
        var test = 'lorem ipsum dolor sit amet';

### 3.9. COMMENTS

Use [jsDoc syntax][1] for documenting modules, functions, objects, and
structs. 

Use **only** line comments ( `//` ) for in-line comments.

You **MUST** comment critical or tricky parts of the code, or important
changes you've made to the code, or anything that's not easy to grasp
at a first glance.

Feel free to **write descriptive comments**; your production **shall** be 
*minified* and *obfuscated* anyway; and therefore your comments will not 
have  any negative impact on *performance* or *file size*.

Use **full sentences** in both **documentation** and **inline** comments.
Start each comment with **capital** letter, and it with a **full stop** as
you'd do in a normal sentence.

    Incorrect:
        // sync request -- process response
        processCallbacks(xhr, callbacks);

    Correct:
        // If the request is sync, then process the response immediately.
        processCallbacks(xhr, callbacks);        

[1]: http://code.google.com/p/jsdoc-toolkit/w/list  "jsDoc syntax"

### 3.10.  VARIABLE & METHOD NAMING

* Use meaningful variable (and function) names:

        var kSixteen = 16; // incorrect.
    
        var kNumberOfBits = 16; // better.

* Use **long and descriptive** variable (*and function*) names.

        usrAvail = true;//incorrect.

        isUserAvailable = true; // better.

* Choose readable variable names:

        var b001 = (lo == l0) ? (I1 == 11) : (lOl != 101); //WTF?

* **Do not use Hungarian Notation**:

        var dblIncome = 100.12; // incorrect.
        var income = 100.12; // correct -- no prefix.

    Exception:
    It's okay to prefix form elements with txt, btn and the like.

        var txtLogin = document.getElementById('loginInput'); // OK
        var btnAction = document.getElementById('submitForm'); / /OK
        var optCountry = document.getElementById('countrySelection'); // OK

* Use **verbs** for **function names**.

* Use **nouns** for **members**, **constants** and **variables**.

* Use **is**, **has**, **should**... prefixes for methods that return a **boolean**.
        
        // Incorrect:
            if(statusToState(user.status) == kLoggedIn) { // Status is a "noun".
                userLogin(); // User is a "noun".
            }
    
            if(loggedIn()) {
                stuff();// Stuff is a "noun".
            }
    
            if(goToNextPage()) { // this method returns a boolean.
                nextPage(); // next is a "noun".
            }
    
        // Correct:
            if(mapUserStatusToState(user.status) == kLoggedIn) {
                logUserIn();
            }
    
            if(isLoggedIn) {
                doStuff();
            }
    
            if(shouldGoToNextPage()) {
                goToNextPage();
            }

* Use **singular** names for **namespaces**:

        var kFullName = config.constants.member.FULL_NAME // "member", not "members"

    **Exception**:
    
    One exception to this rule is the use of **constants** (*as above*), and **enums**, 
    in order to differentiate them from *constant* and *enum* keywords.

* Use **plural** names for **collections**:

        var members = getOnlineMembers(); // "members", not "member".


* Use **camelCase** for **method names** and **member names**, use **ALL_CAPS** for **constants**.

        function getUserInfo(){
        }
    
        function renderNewLoginForm(){
        }
    
        var config = {
            constants: {
                memberRegistrationStatus: {
                    REGISTERED: 3,
                    WAITING_APPROVAL: 1,
                    NOT_INITIALIZED: 0
                }
            }
        };

    **Exception:**

    Event-handler callbacks is an exception to this naming convention:

        var EventCallback = {
            // Not in camelCase.
            // Format: domobject_eventname (all lowercase)
            document_mousedown: function(evt){
    
            }
        };
    
        o2.addEventListener(document, 'mousedown', EventCallback.document_mousedown);

* Use *camelCase* for acronyms:

        config.constants.methodName.wcf.INSERT;// correct
    
        config.constants.methodName.WCF.INSERT;// incorrect
        
        getDOMNode() // incorrect
        
        getDomNode() // correct
    
        o2.StringHelper.htmlEncode() // correct
        o2.StringHelper.HTMLEncode() // incorrect

* **Be consistent** in naming your methods; do not give different names to 
two methods which are essentially doing the same thing.

**Summary:**

    variables, object, functions       : camelCase ( getStatusRecord() )
    private variables, private methods : camelCase
    public variables, public methods   : camelCase
    enums and global constants         : ALL_CAPS
    local/global constants             : prefix with k ( kPipeTimeout )
    Parameters                         : camelCase
    Objects and Constructors           : PascalCase
    Packages/Namespaces                : lowercase
    Methods                            : camelCase

Some more examples:

    // Local constant:
    var kActiveProvider = enums.ProviderType.TWITTER;

    // Do not start functions other than constructors with UpperCase.
    function user(){}
    var john = new user(); // incorrect

    function User(){}
    var john = new User(); // correct

    function GetAccountDetails(){} // incorrect        
    function getAccountDetails(){} // correct

### 3.11.  FILE HEADERS

Each file (*module*) should have a descriptive header.
The *module* header should also be in [JSDoc Format][1].

    /**
     * @module domhelper.dimension
     * @requires domhelper.core
     *
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     * -->
     *
     * <p>Includes dimension (<strong>i.e. width-height related</strong>) helper
     * methods.</p>
     */

### 3.12. CURLY LOVE

Use curly braces, even when they are not strictly necessary.

    // Which 'if' belongs to which 'else' ?!
    if (b1) if (b2) foo(); else bar();

    // This is better:
    if (b1) {
        if (b2) {
            foo();
        } else {
            bar();
        }
    }

    // Incorrect:
    function method() {
        for(int i = 0; i < 10; i++)
            if(i != 0)
                foo();
    }

    // Correct:
    function method() {
        for(int i = 0; i < 10; i++) {
            if(i != 0) {
                foo();
            }
        }
    }

### 3.13. DEFAULT FALLBACKS

All switch-case's should have a `default:` exit point. 
That last fallback should at least have a log statement.

All if-else chains should have an `else` in the end. 
That last else should at least have a log statement.

        if ('no' == answer) {
            alert('You said no');
        } else if ('yes' == answer) {
            alert('You said yes');
        } else {

            // This block should be here, even if we do not
            // care about any outcome other than 'yes' or 'no
            assert('I should not be here');
        }

*Exception*:

A single `if` statement may not be regarded as an if-else *"chain"*, so it's okay to leave single if's without an else.

        if(controller.isLoadingTemplates()) { 
        
            return; 
        } /*else { 
            log('controller has more templates'); 
        } -- not required -- */

### 3.14. BOOLEAN COMPARISONS

**DO NOT** directly compare with **true**, or **false**.

    // Incorrect:
    while(condition == false) 
    
    // Incorrect:
    while(condition != true) 
    
    // You got the point:
    While(((condition == true) == true) == true) 
    
    // Correct:
    while(condition)

### 3.15. VARIABLE ACCESS

* **DO NOT** access the same variable more than once:

    v[i] = ++c;  // OK
    v[i] = ++i;  // Incorrect. Misleading.
    i = i + 1;   // OK
    i = ++i + 1; // Incorrect an unnecessary;
                 // i += 2 should have been better.
                 
* Aim to minimize the scope of variables. Use as little global variables, global configuration data,
and global functions as possible. Use **modules** and **namespaces** to achieve that.

### 3.16. STATEMENT TERMINATION

Always terminate statements with a semicolon (`;`):

    // Incorrect:
    var i = 10 
    
    // Correct:
    var i = 01;
    
    // Incorrect:
    var test = function(){
    }

    // Correct:
    var test = function(){
    };
    
### 3.17.  VARIABLE DECLERATIONS

Declare every variable on a new line:

    // Incorrect:
    var a, b;

    // Correct.
    var a;
    var b;

## 4. o2.js JAVASCRIPT CODING BEST-PRACTICES

### 4.1.  JSLINT YOUR CODE

[JSLint][2] is a **must-have** great tool written in **JavaScript** that allows you to validate your 
**JavaScript** code against a **strict** and **rigrous** set of best practises. 

Written by [Douglas Crockford][2] it is a must have for anyone keep theier code-base ship shape.

[JSLint][2] your code to prevent bugs and surprises creep into it.

Automate the usage of **JsLint** by integrating, **JSLint** validation to your web application's
build & deployment cycle.

[2]: http://www.crockford.com/  "Douglas Crockford to JavaScript is Obi-Wan Kenobi to Star Wars"
[3]: hhttp://www.jslint.com/ "JSLint - the JavaScript Code Quality Tool"

### 4.2.  SHOW LOVE TO THE MODULE PATTERN

[Modules][4] are simply self-executing function literals. 
They create their own *private* **static** context, and encapsulate the business
logic inside. This will (*in theory*) enable developers safely write their own code,
without effecting the code that others have been developing.

**o2.js** files are organized in modules using the [module pattern][4]

Each o2.js module has the following basic structure.

    ( function(framework, window, UNDEFINED) {

        ... module code goes here ...

    }(o2, this));

[4]: http://o2js.com/2011/04/24/the-module-pattern/ "The module pattern"

### 4.3.  DO NOT POLLUTE THE GLOBAL NAMESPACE

This is a corollary to 4.2. 

**Avoid using public variables and public functions at all costs**.

Global variables and functions are rarely, if ever, required.

Using globals cause naming conflicts between JavaScript source files
and cause code  to break unexpectedly. For this reason, it is a good
practice to encapsulate functionality within *namespaces*.

Use namespaces and break code into modules.

> Modules, *modules*, **modules**. **NOT** functions, *functions*, **functions**!

### 4.4.  AVOID GOD OBJECTS and GOD METHODS

Each method **SHOULD** have one, and only one, clearly defined task.
If a method is doing more than one thing, it should be **divided** into **subroutines**.

Program your functions atomically. Aim to reduce [cyclomatic complexity][5].

While writing a method the following should be taken into consideration:

* The accepted input ranges, and data types,
* Return values and their meanings,
* Error conditions, exceptional cases, and how they are handled.
* Whether the method has any [side effects[6]

> A function with no side effects is a function that always returns the same value 
> given the same arguments, and never changes the internal global state (MODEL), 
> or the application's look & feel (VIEW). It takes some arguments, returns a value 
> based on these arguments, and do not monkey around with anything else.

[5]: http://en.wikipedia.org/wiki/Cyclomatic_complexity "Cyclomatic Complexity"
[6]: http://en.wikipedia.org/wiki/Functional_programming#Pure_functions "Functional Programming: Pure Functions"

### 4.5.  DO NOT INCLUDE TYPE INFORMATION WHILE NAMING VARIABLES

**DO NOT** include type information in variables. 

Variables should be understandable by their behavior (*semantics*), **NOT** by their type.

    // Incorrect:    
        var eventType = framework.EventType;
        var kAddBuddyEventType = eventType.ADD_BUDDY;

    // Correct:    
        /* eventType is an alias to type "framework.EventType" */
        var eventType = framework.EventType;    
        
        /* kAddBuddy is of type "framework.Eventype" (when we think in non-strict terms) */
        var kAddBuddy = eventType.ADD_BUDDY;

### 4.6.  DO NOT MIX HTML AND JAVASCRIPT

Use a templating engine. Don't mix HTML markup within JavaScript code.

### 4.7.  DO NOT USE INLNE JAVASCRIPT EVENTS

Using inline JavaScript events and server-side templating (e.g. *Smarty*),
is a dangerous mix that may leave your code prone to **"script injection"** 
attacks.

**Event overriding** is yet another reason to avoid using inline JavaScript
(i.e. *onclick=""*s). The way inline event handlers work is called
**"DOM Level 0 Events"** 
(`<a href="javascript:void()" onclick="foo();return false">...</a>` ... yuck!).  

The issue with DOM Level 0 events is that you can only assign one event 
handler to a node, using them.  With [unobtrusive JavaScript][7] and
[behavioral separation][8] you actually assign event handlers to a higher 
level (DOM Level 2 to be exact). This level allows for multiple event 
handlers to be assigned to one event.

[behavioral separation][8], is actually far more than that, but that's the
topic of another story.

[7]: http://en.wikipedia.org/wiki/Unobtrusive_JavaScript "Unobtrusive JavaScript"
[8]: http://www.alistapart.com/articles/behavioralseparation "Behavioral Separation"

One of the big powers of JavaScript is that it comes in a seperate file.
Much like CSS, this means you can apply one collection of functions to
every page of the site, and if you need to change the functionality,
you can do that in one document rather than going through and replacing
each **onclick** event on every single template.

> Don't be a lazy `b****`, and **decouple** your JavaScript!

 **Coupling is bad**, and we know it. 
 
* We **decouple** our data access from our views,
* We **decouple** our services from each other

We try to keep coupling to a minimum in every piece of code we write... 
except our JavaScript.

Coupling of our JavaScript tto markup prevents you from changing your
markup without addressing your JavaScript as well.

In short;

* Separate CSS from HTML (no `<style></style>` tags, no `style=""` attributes).
* Separate JavaScript from HTML (no `<script>...</script>`s, no `onclick=""`s, 
* no `onkeydown=""`s, or God forbid, no `href:"javascript:"`s ... you get the point.)
* Separate HTML from JavaScript (no **HTML tagsoup** within JavaScript; use 
* *templates** instead)
* Separate PHP (or the server-side language of your choice) from JavaScript
(PHP should not spit out thousands of lines of of server-generated JavaScript)

### 4.8.  USE EVENT-DELEGATION

**Do not** register every single click event, on every single object. 

When there are large numbers of objects, which the application has to listen
and respond to, hanging around, adding an event handler to each and every
single one of those objects will have a **huge** impact on **performance** and
**memory utilization**.

Use [event delegation][9] instead.

[Event delegation][9] is **faster**, **scalable**, and **easier to maintain**.

[9]: http://icant.co.uk/sandbox/eventdelegation/ "Event Delegation"

### 4.9.  USE EVENT-DRIVEN PROGRAMMING

Use [event-driven programming][10]. Web apps will **always** be event driven.

You're either responding to a **user event**, or a **system event**.

Architect and program your components as such.

[10]: http://en.wikipedia.org/wiki/Event-driven_programming "Event-Driven Programming"

### 4.10.  AVOID MAGIC STRINGS AND MAGIC NUMBERS LIKE PLAGUE

Use **symbolic constants** for **numeric literals** and **string literals**.

    // Incorrect:
    
    var j = 0;
    for(var i=0, len=52, i<len; i++){
        j = i + getRandomInt(53 - i) - 1;
        swapDeck(i, j);
    }


What if we wish to use a deck size of 114 (2 decks).
You can say that we can find/replace all "52"si with "114"s and
we're done. But even a mass find/replace will not be able to catch
the number 53 in the 3rd line, and it will pop-up as a logic error
which we will hardly be able to find out.

> The **rule-of-thumb** should be to store anything that's prone to change
> (**numbers**, **parameters**, **strings**) in either symbolic constants 
> or in **shared static public configuration structs** as constant members.

Here's the correct way of doing the above deck shuffling:

    var kDeckSize = 52;
    var j = 0;
    
    for(var i=0, len=kDeckSize, i<len; i++){
        j = i + getRandomInt(kDeckSize + 1 - i) - 1;
        swapDeck(i, j);
    }

Moreover, if there's a relation between two symbolic constants, this
relation should be **explicitly indicated**:

    var kMaxItems = 32;
    var kHighWaterRank = (3 * kMaxItems) / 4; //instead of 24.

### 4.11. DECOUPLE OBJECTS & MINIMIZE VARIABLE SCOPE

Objects and methods should have as little information about each other as possible.
That's the major motivator behind **object-oriented programming*.

Minimize variable scopes. Use the [module pattern][11].

> The larger the scope of the variables, the harder it is to maintain the code.

*Avoid* global variables and global methods at all costs.

[11]: http://o2js.com/2011/04/24/the-module-pattern/ "The JavaScript Module Pattern"

### 4.12. REPLACE TEMPORARY VARIABLES WITH QUERY METHODS

Chaining temp variables with query functions, **reduces** the number of
variables used in the code, and **decreases** the possibility to make an error.

This usage might have a slight performance impact, which can be overcome by [memoization][12].

[12]: http://o2js.com/2011/05/03/javascript-function-kung-fu/ "JavaScript Function Kung-Fu"

Compare this:

    var basePrice = quantity * itemPrice;

    ...

    // base price can be overridden anywhere in the code.

    if (basePrice > 1000) {
        return basePrice * 0.95;
    } else {
        return basePrice * 0.98;
    }

against this:

    // Instead...
    
    function getBasePrice(){
        return quantity * itemPrice;
    }

    // There's no risk in overriding the base price.

    ...

    if (getBasePrice() > 1000) {
        return getBasePrice() * 0.95;
    } else {
        return getBasePrice() * 0.98;
    }

### 4.13. PROGRAM DEFENSIVELY

Adhere [defensive programming][13] best-practices. 

[13]: http://en.wikipedia.org/wiki/Defensive_programming "Defensive Programming"

All functions should work according to a given [contract][14].

[14]: http://en.wikipedia.org/wiki/Design_by_Contract "Design by Contract"

Their **in/out parameters**, exepected and unexpected **value ranges**,
**side-effects**, **error** and **exception** situtaions etc. **SHALL** 
be designed **before** writing the code.

Use [guard-clauses][15] to avoid unexpected conditions.

[15]: http://c2.com/cgi/wiki?GuardClause "Guard Clauses"

### 4.14. EXCEPTIONS ARE FOR EXCEPTIONAL CASES

Exceptions are expensive. Using a nested structure of `try/catch`s 
will increase the depth of the execution scope, which may slow down your
code.

Throw exceptions only in exceptional cases.
If you know what's going on ("operation completed", "connection error",
"end of stream"... etc) use return codes instead of throwing exceptions.

Besides, hiding surprises inside `try { stuff() } catch(ignore){ }` kind
of constructs, will result in logic errors that are hard to find.

> `try/catch` != **CYA**

Use `try/catch`s only if there's something out of your control 
(a plugin, a custom user code that's late-bound and delegated, a queue structure
where all the items should be processed even if some of the items do generate errors)

These cases are rare and **exceptional**.

And when you do use `try/catch` blocks, remember to log the 
errors in `catch` and cleanup state and resources in `finally`.

Functions shall not throw exceptions; they
should return meaningful error-codes instead.

Summary:

* `try { } catch { }` is an expensive construct in JavaScript. 
* *DO NOT* use `try/catch`s within loops. 
* *DO NOT* use nested `try/catch`es: Use one try-catch
at the topmost level. 
* **AVOID** using `try/catch`es unless it's absolutely necessary.

### 4.15. USE THE FORCE WISELY

Your application shall function degrade gracefully, when Javascript 
is not available or when Javascript has been disabled. 

JavaScript is for **enhancing** existing functionality.

[Enhance progressively][16], and ensure tha your application
is usable at all times.

[16]: http://en.wikipedia.org/wiki/Progressive_enhancement "Progressive Ehnancement"

## 5. PERFORMANCE AND MEMORY CONSIDEARATIONS

Here are certain performance considerations, and guidelines to keep in mind 
when designing a highly interactive, mostly single-page, client-heavy, 
long-lasting (i.e. users will be on the same page for more than several hours) 
web application:

### 5.1 KEY PERFORMANCE INDICATORS

While coding try to **minimize** the following:

* **Vertical complexity**: How deeply nested the code is.
* **Horizontal complexity**: Number of lines per module/method.
* **Token count**
* **Variable count**
* **Loop count**
* **Conditional count** (i.e. if/else/switch count)
* **Variable scope**

Also note that using arrays excessively can degrade performance, 
and leak memory.

To avoid memory leaks:

* **Use** the [delete operator][17] to deallocate members,
* **Avoid** [closures][18] between DOM World and the JS World,
* And **minimize** JS / DOM interaction.

[17]: http://o2js.com/2011/04/24/javascript-objects/ "JavaScript Objects"
[18]: http://o2js.com/2011/04/26/functions-and-closures-in-javascript/ "Functions and Closures in JavaScript"
[19]: http://www.codeproject.com/KB/scripting/leakpatterns.aspx "JavaScript Memory Leak Patterns"

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
