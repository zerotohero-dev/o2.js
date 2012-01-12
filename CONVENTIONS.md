# o2.js Javascript Conventions & Best Practices

## Introduction

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

## Why Do We Need Conventions?

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

## o2.js Javascript Coding Standards

Here are the main code conventions, standards, and guidelines used
within **o2.js** source files:

### Maintain Existing Coding Style

This is easier to state, and harder to adhere.
Keep your coding habits and behaviors aside.
All code should look like a single person typed it, no matter how many
people contributed.


### Provide Tests for the Codebase

Any module developed SHOULD include some form of unit, reference,
implementation or functional testing. Use case demos DO NOT QUALIFY
as "tests".

### Code Cleanliness

The code should be kept clean. There should **not** be excessive logs,
debug lines, print statements, or alerts.

There should **not** be commented out code.

> The whole point of using a *version control system* is to eliminate the
> need of leaving commented out code in the source code. Instead of
> leaving the code commented out, one should utilize the version control
> system's *diff&merge* utility.

If there is a code piece that you long to keep, save it in an
external file **outside** the project folder.

### Line Length

To sustain code readability, limit the line length to **80 characters**.
If the line (*including the indentation*) exceeds **80 characters**,
continue from the next line.

### Indentation

Code blocks are indented with **4 spaces**. Each `<TAB>` corresponds to 4
spaces, and the actual `<TAB>` character is **NOT USED**. The IDE should be
set up to print **4 spaces** when pressing the `<TAB>` key.

Never mix spaces and tabs.

Indent...

* Statements within **blocks**:

        while (node) {
            if (node.nodeType != kTextNode) {
                return node;
            }

            node = node.nextSibling;
        }

* Statements within a **function** body:

        me.getNextById = function(target, id) {
            target = $(target);

            if (!target) {
                return null;
            }

            var node = target.nextSibling;

            if (!node) {
                return null;
            }

            var kTextNode = me.nodeType.TEXT;

            while (node) {
                if (node.id && node.id == id) {
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
                } catch (ignore1) {
                }

                break;
            case ccc.INFO:
                try {
                    console.info(text);
                } catch (ignore2) {
                }

                break;

                ...

* Statements within a **case** body:

        ...

        case ccc.WARN:
            try {
                console.warn(text);
            } catch (ignore3) {
            }

            break;
        case ccc.ERROR:
            try {
                console.error(text);
            } catch (ignore4) {
            }

            break;
        default:
            try {
                console.log(text);
            } catch (ignore5) {
            }

            break;

* Statements **inside** a *closure*:

    Technically speaking, *any function* is also a *closure*. Therefore statements
    inside **any function** should be indented one level with respect to that
    *function*'s body.

        me.EventHandler.preventDefault = window.event ? function() {
            window.event.returnValue = false;

            return false;
        } : function(e) {
            if (!e) {
                return;
            }

            if (e.preventDefault) {
                e.preventDefault();
            }

            return false;
        };

        me.EventHandler.preventDefault(evt);

* Parts of the statement that are folded to the next line because they exceed
the 80-character line length limit:

        application.RenderController.repaintUserInfo(messageId, userId,
            options, callback); //<-- 1x indented.

Triple indent...

* Method parameters that are folded to the next line because they exceed the
80-character line length limit.

    This will clearly indicate that those parameters are **not** a part of the
    function's body.

        var InstantChatMessageRenderer = {

            /*
             *
             */
            render : function(conversation, chatListItem, message,
                        timeStamp, messageId, userId) { //<-- 3x indented.
                prepareChatListItem(chatListItem, message,
                    (new Date()).getTime());

                conversation.appendChild(chatListItem);

                application.RenderController.repaintUserInfo(messageId,
                    userId); //<-- 1x indented.

                scrollToBottom(conversation);

            }

        };


### Blank Lines

Leave **at most** one blank line.

Insert **one** blank line...

* **Before** *throw*, *break*, and *return* statements:

        if (!url) {
            stuff();

            return null;
        }


    **Exception**:

    If the *return*, *throw*, *break*... statement is the **only**
    statement within its block, then do not insert a blank line.

        if (!url) {
            return;
        }

* **After** function declerations:

        me.EventHandler.stopPropagation = function(e) {
            if (!e) {
                return;
            }

            e.stopPropagation();
        };

        me.EventHandler.stopPropagation(evt);

* **After** inline functions:

        function isArray(obj) {
            return is(obj, config.constants.ecmaScriptType.ARRAY);
        }

        function is(obj, type) {
            var objectNameStartIndex = 8;
            var trimLastBraceIndex = -1;
            var klass = Object.prototype.toString.call(obj).slice(
                objectNameStartIndex, trimLastBraceIndex);

            return (obj !== undefined) && (obj !== null) && (klass === type);
        }

* **Between** two **if** blocks:

        if (!ar) {
            return -1;
        }

        if (isArray(ar)) {
            for (var i = 0, len = ar.length; i < len; i++) {
                if (elm == ar[i]) {
                    return i;
                }
            }

            return -1;
        }

* **After** variable declerations:

        var nodeName = 'div';

        if (config.isUsingConsole && config.outputElement) {

            return function(value, className) {
                println(value, className);

                var debugContent = document.createElement(nodeName);

                debugContent.className = className;
                debugContent.innerHTML = value;
                config.outputElement.appendChild(debugContent);
            };

            ...

* **After** variable assignments:

        var test = null;

        if (someCondition()) {
            test = getTestValue();

            doStuff();
        }

* **Before** a *try/catch/finally* construct:

        function processCallbacks(xhr, callbacks) {
            doStuff();

            try {
                if (isSuccess) {
                    oncomplete(xhr.responseText, xhr.responseXML, xhr);

                    return;
                }

                onerror(xhr.status, xhr.statusText, xhr);
            } catch (ex) {
                onexception(xhr, ex);
            } finally {
                finalizeXhr(xhr);
            }
        }


    **Exception**:

    Do not insert a blank linke if that try/catch/finally is the only
    thing inside the block:

        function processCallbacks(xhr, callbacks) {
            try {
                if (isSuccess) {
                    oncomplete(xhr.responseText, xhr.responseXML, xhr);

                    return;
                }

                onerror(xhr.status, xhr.statusText, xhr);
            } catch (ex) {
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

        if (isPost) {

            // Add more headers.
            addPostRequestHeaders(xhr);
        }

        // Register callbacks.
        registerCallbacks(xhr, callbacks);

        // Send the request.
        try {
            xhr.send(postQuery);
        } catch (exception) {
            callbacks.onexception(xhr, exception);
        }

        if (isSync) {

            // If the request is sync, process response immediately.
            processCallbacks(xhr, callbacks);
        }

        return xhr;

**DO NOT** insert blank lines...

* **After** the beginning of and **before** the ending of
**function**, **try**, **catch**, **finally**, **switch**, **if**, **else**,
**case**, **do**, and **while** blocks:

        // Incorrect:
        if (condition) {

            stuff();
            someOtherStuff();

        } else {

            anotherStuff();

        }

        // Correct:
        if (condition) {
            stuff();
            someOtherStuff();
        } else {
            anotherStuff();
        }

### Trailing Spaces And File Endings

* Trim trailing spaces in every source file.
* Put an extra blank line at the end of each source file.

### Brace Positioning

The brace positions should be as follows:

* **Same line**, in blocks (*C-Style*).

        for (var key in ar) {
            if (ar.hasOwnProperty(key)) {
                value = ar[key];

                if (shouldDeepCopy && ( typeof value == 'object')) {
                    theCopy[key] = me.CollectionHelper.copy(value,
                        shouldDeepCopy);

                    continue;
                }

                theCopy[key] = value;
            }
        }

* **Same line**, in function declarations (*C-Style*).

        removeElementByValue : function (collection, name, value, isRecursive) {
            var item = null;
            var isNested = !!isRecursive;

            var removeElementByValue = o2.CollectionHelper.removeElementByValue;

            ...

* **Same line**, in switch statements (*C-Style*).

        switch (className) {
            case ccc.LOG:
                try {
                    console.log(text);
                } catch (ignore1) {
                }

                break;
            case ccc.INFO:
                try {
                    console.info(text);
                } catch (ignore2) {
                }

                break;

                ...

### Spaces

The spacing should be as follows:

* Commas: **before**: 0, **after**: 1
* Parentheses: **before**: 0, **after**: 0
* Semicolons in for statements: **before**: 0, **after**: 1
* Arithmetic operators: **before**: 1, **after**: 1
* Relational operators: **before**: 1, **after**: 1
* Unary (*++, --*) operators: **before**: 0, **after**: 0
* Assignments (**=**): **before**: 1, **after**: 1
* Conditional operators (**&&, ||**): before: 1, after: 1
* Key-value (*{'a':'b'}*) operators: **before**: 1, **after**: 1
* Inside a line comment: **after**: 1

        //this is incorrect

        // This is correct with a space.

* Negation: **after**: 0

        // Incorrect:
        if (! stuff && ! otherStuff) {
            doAction();
        }

        // Correct:
        if (!stuff && !otherStuff) {
            doAction();
        }

### New Lines

* **DO NOT** insert a new line *before* else statement.
* **DO NOT** insert a new line *before* if and else-if statement.
* **DO NOT** insert a new line *before* catch statement.
* **DO NOT** insert a new line *before* finally statement.
* **DO NOT** insert a new line *before* while in a do statement.
* **DO** insert a new line *before* ' name : value ' pairs.
* **DO** separate *logical code fragments* from each other *with a new line*.

Example:

        // Functions

        function foo() {

            ...

            do {
            } while(true);

            try {
                alert('hello');
            } catch (e) {
                ...
            } finally {
                ...
            }

        }

        function bar(a) {
            if (true) {
                return;
            }

            // If-Else

            if (false) {
                alert('hello');
            } else if (a > 0) {
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


### **Object** and **Array** Creation

Use literal notation. It takes less space and it's sligthly faster:

        // Incorrect:
        var obj = new Object();
        var ar = new Array();

        // Correct:
        var obj = {};
        var ar = [];

### Strings

Use single quotes ( `'` ) for string literals.

Using double quotes (") for HTML attributes and single quotes (') for JavaScript
string literals will make writing HTML template code in JavaScript easier.

Example:

        // Correct:
        var kImageTemplate = '<img src="picture.gif" width="4" height="4" />';

        // Incorrect:
        var test = "lorem ipsum dolor sit amet";

        // Correct:
        var test = 'lorem ipsum dolor sit amet';

### Comments

Use [jsDoc syntax][1] for documenting modules, functions, objects, and
structs.

* [jsDoc][1] references to method parameters shall be bold.

        * @throws exception if <strong>fn</strong> callback is not defined.

* [jsDoc][1] JavaScript objects should be enclosed in `<code></code>`.

        * @param {DomNode} node - the DOM object (or its <code>String</code>.

Use **only** line comments ( `//` ) for in-line comments.
Do not use c-style comments (`/*..*/`) inside functions.
Use c-style comments (`/**/`) only for *documentation*.

Put your inline comments on top of the part that the comment is explaining:

This is correct:

        // Cache the global function.
        var fnDo = doStuff;

This is not:

        var fnDo = doStuff; // Cache the global function.

This is even worse:

        var fnDo = doStuff;
        // Cache the global function.

You **MUST** comment critical or tricky parts of the code, or important
changes you've made to the code, or anything that's not easy to grasp
at a first glance.

> Keep in mind that using, or having a need to use, lots of inline comments
> may be an indicator that you need to split your code into subroutines.

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

### Variable and Method Naming

You are not a human code compiler/compressor, so don't try to be one.

* Use meaningful variable (and function) names:

        // Incorrect:
        var kSixteen = 16;

        // Better:
        var kNumberOfBits = 16;

* Use **long and descriptive** variable (*and function*) names.

Trying to determine what a variable contains, or what a method does should be as
straightforward as possible. It is an all too common practice to use
abbreviations, single letters or seemingly random names for variables,
functions and class names.

Using abbreviated names doesn't make sense in almost any practical programming
languages (and there are usually minifiers for those where it does).
This should be avoided at all costs.

* Establish a naming convention based on **real names** that mean something.
* Avoid any abbreviations unless they are part of your target industry's every-day lingo.
* In method names, try to use a name that describes what the method really does.
* Variables and classes should be **nouns** or **noun phrases**.
* Class names are like **collective nouns**.
* Variable names are like **proper nouns**.
* Procedure names should be **verbs** or **verb phrases**.
* Booleans should be **adjectives**.
* For compound names, retain conventional English syntax.
* Try to make names **pronounceable**.
* **Try to be obvious**.

### Store Your Code in Meaningful Folder Structures

The naming conventions should also apply to your folders. Split up your code
in **logical groups** and store it in folders that describe **what they contain**.

This will make it much easier to keep your code-tree organized and scale it
to thousands of files without hindering your ability to get to specific files quickly.

* Group your source files in logical groups
* Keep your folder names consistent throughout the project.
* use your naming convention recursively inside of your sub-folders.


        // Incorrect:
        usrAvail = true;

        // Better:
        isUserAvailable = true;

* Choose readable variable names:

        // WTF?!
        var b001 = (lo == l0) ? (I1 == 11) : (lOl != 101);

* **Do not use Hungarian Notation**:

        // Incorrect:
        var dblIncome = 100.12;

        // Correct -- no prefix:
        var income = 100.12;


    **Exception**:

    It's okay to prefix form elements with txt, btn and the like.

        // These are all OK:
        var txtLogin = document.getElementById('loginInput');
        var btnAction = document.getElementById('submitForm');
        var optCountry = document.getElementById('countrySelection');

* Use **verbs** for **function names**.

* Use **nouns** for **members**, **constants** and **variables**.

* Use **is**, **has**, **should**... prefixes for methods that return a
**boolean**.

        // Incorrect:
            if (statusToState(user.status) == kLoggedIn) { // Status is a "noun".
                userLogin(); // User is a "noun".
            }

            if (loggedIn()) {
                stuff();// Stuff is a "noun".
            }

            if (goToNextPage()) { // this method returns a boolean.
                nextPage(); // next is a "noun".
            }

        // Correct:
            if (mapUserStatusToState(user.status) == kLoggedIn) {
                logUserIn();
            }

            if (isLoggedIn) {
                doStuff();
            }

            if (shouldGoToNextPage()) {
                goToNextPage();
            }

* Use **singular** names for **namespaces**:

        // "member", not "members"
        var kFullName = config.constants.member.FULL_NAME


    **Exception**:

    One exception to this rule is the use of **constants** (*as above*),
    and **enums**, in order to differentiate them from *constant* and *enum*
    keywords.


* Use **plural** names for **collections**:

        var members = getOnlineMembers(); // "members", not "member".


* Use **camelCase** for **method names** and **member names**, use
**ALL_CAPS** for **constants**.

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


    **Exception**:

    Event-handler callbacks is an exception to this naming convention:

        var EventCallback = {
            // Not in camelCase.
            // Format: domobject_eventname (all lowercase)
            document_mousedown: function(evt){

            }
        };

        o2.addEventListener(document, 'mousedown',
            EventCallback.document_mousedown);

* Use **camelCase** for acronyms:

        config.constants.methodName.wcf.INSERT;// Correct

        config.constants.methodName.WCF.INSERT;// Incorrect

        getDOMNode() // Incorrect

        getDomNode() // Correct

        o2.StringHelper.htmlEncode() // Correct
        o2.StringHelper.HTMLEncode() // Incorrect

* Use **lowercase** for event handler references:

        // Incorrect:
        var onComplete = globalCompletionCallback || o2.nill;

        // Correct:
        var oncomplete = globalCompletionCallback || o2.nill;

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

### Avoid Using The **continue** Statement

Avoid using **continue** statement. It tends to obscure the control flow of the
function.

        // Incorrect:
        for (i = 0; i < len, i++) {
            if (i === maxLength) {
                doAction();

                continue;
            }

            doStuff();
        }

        // Correct:
        for (i = 0; i < len, i++) {
            if (i === maxLength) {
                doAction();
            } else {
                doStuff();
            }
        }

### Return Early

Early returns promote code readability with negligible performance impact, if any.

        // Instead of this:

        function returnLate(foo) {
            var ret;

            if (foo) {
                ret = 'foo';
            } else {
                ret = 'bar';
            }

            return ret;
        }

        // Do this:

        function returnEarly(foo) {
            if (foo) {
                return 'foo';
            }

            return 'bar';
        }

### Group Related Statements Together Using Parentheses (`( )`)

Although `&&` has precedence over `||`, mixing them together without grouping
may decrease readability.

        // Incorrect:
        return obj !== undefined && obj !== null && klass === type;

        // Correct:
        return (obj !== undefined) && (obj !== null) && (klass === type);

### Always Use Strict Comparison

Strong-typed languages such as Java and C# considers two values to be equal
if and only if they are equal both by value and by type. JavaScript equality
operator (`==`), however, enables *type coercion* when comaring different types.
Although the rules of coercion are deterministic and strictly defined, the
issue creates some [confusion][21], at least.

              [0] == true   // gives true.
            !![0] == true   // gives true.
        'Samurai' == false  // gives false.
        'Samurai' == true   // gives false.

To avoid confusion and logic errors, always use strict equality and unequality
operators:

        // Incorrect:
        if (a == b && c != d) {
            doStuff();
        }

        // Correct:
        if (a === b && c !== d) {
            doStuff();
        }


[21]: http://o2js.com/2011/04/27/to-equal-or-not-to-equal-thats-the-problem/ "To equal, or not to equal -- that's the problem."

### File, Folder and Path Naming

Use **lowercase** for *files*, *folders* and *paths*.

                // Incorrect:
                /wwwRoot/Script/mainController.js

                // Correct:
                /wwwroot/script/maincontroller.js

### File Headers

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

### Curly Love

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
                if (i != 0)
                    foo();
        }

        // Correct:
        function method() {
            for (int i = 0; i < 10; i++) {
                if (i != 0) {
                    foo();
                }
            }
        }

### Default Fallbacks

All switch-case's should have a `default:` exit point.
That last fallback should at least have a log statement.

All if-else chains should have an `else` in the end.
That last else should at least have a log statement.

        if (answer == 'no') {
            alert('You said no');
        } else if (answer == 'yes') {
            alert('You said yes');
        } else {

            // This block should be here, even if we do not
            // care about any outcome other than 'yes' or 'no
            assert('I should not be here');
        }


**Exception**:

A single `if` statement may not be regarded as an if-else *"chain"*, so it's
okay to leave single if's without an else.

        if (controller.isLoadingTemplates()) {
            return;
        } /*else {
            log('controller has more templates');
        } -- not required -- */

### Boolean Comparisons

**DO NOT** directly compare with **true**, or **false**.

        // Incorrect:
        while(condition === false)

        // Incorrect:
        while(condition !== true)

        // You got the point:
        While(((condition === true) === true) === true)

        // Correct:
        while(condition)

### Variable Access

* **DO NOT** access the same variable more than once:

        v[i] = ++c;  // OK
        v[i] = ++i;  // Incorrect. Misleading.
        i = i + 1;   // OK
        i = ++i + 1; // Incorrect an unnecessary;
                     // i += 2 should have been better.

* Aim to minimize the scope of variables. Use as little global variables,
global configuration data, and global functions as possible.
Use **modules** and **namespaces** to achieve that.

### Statement Termination

Always terminate statements with a semicolon (`;`):

        // Incorrect:
        var i = 10

        // Correct:
        var i = 10;

        // Incorrect:
        var test = function() {
        }

        // Correct:
        var test = function() {
        };

### Variable Declerations

Declare every variable on a new line:

        // Incorrect:
        var a, b;

        // Correct.
        var a;
        var b;

## o2.js Javascript Coding Best-practices

### JsLint Your Code

[JSLint][2] is a **must-have** great tool written in **JavaScript** that allows
you to validate your **JavaScript** code against a **strict** and **rigorous**
set of best practises.

Written by [Douglas Crockford][2] it is a must have for anyone keep theier
code-base *ship shape*.

[JSLint][2] your code to prevent bugs and surprises creep into it.

Automate the usage of **JsLint** by integrating, **JSLint** validation to your
web application's build & deployment cycle.

[2]: http://www.crockford.com/  "Douglas Crockford to JavaScript is Obi-Wan Kenobi to Star Wars"
[3]: hhttp://www.jslint.com/ "JSLint - the JavaScript Code Quality Tool"

The version of **JSLint** used to validate **o2.js** modules can be found at:

        ./3rdparty/jslint/jslint.js

folder of this bundle.

The **JSLint** validation preferences used are as follows:

        var JSLINT_PREFS = {
            browser:true,
            evil:false,
            laxbreak:true,
            maxerr: 1000,
            newcap: true,
            nomen: true,
            passfail:false,
            plusplus: true,
            rhino: true,
            undef:true,
            vars: true,
            white: true,
            regexp: true
        };

### Event-Handler Naming Convention

User elementName_eventname format for event handlers.

        function confirmButton_click(evt) {

        }

        functions tester_readystatechange(evt) {

        }


        o2.EventHandler.addEventListener(
            tester,
            'readystatechange',
            tester_readystatechange
        );

        o2.EventHandler.addEventListener(
            confirmButton,
            'click',
            confirmButton_click
        );

Event handlers, when used as a function pointers start
with "on", and they are camelCased.

        var onDocumentMouseDown = callback.document_mousedown;

        ...

        onDocumentMouseDown.apply(this, [evt]);

Any custom events are defined all lowercase.

    var Selectable = function(params){
        ... stuff ...

        // We register the handler on constructor.
        // Note that the assigned method name (this.onselectionchange)
        // and the parameter name (params.onselectionchange)
        // are both all lowercase.
        this.onselectionchange = params.onselectionchange;
    };

    Selectable.prototype.someAction = function() {
        ...

        this.onselectionchange.apply(this, [source, eventArgs]);
    };

### Show Love To the [Module Pattern][4]

[Modules][4] are simply self-executing function literals.
They create their own *private* **static** context, and encapsulate the business
logic inside. This will (*in theory*) enable developers safely write their own
code, without effecting the code that others have been developing.

**o2.js** files are organized in modules using the [module pattern][4]

Each o2.js module has the following basic structure.

        (function(framework, window) {

            ... module code goes here ...

        }(this.o2, this));

[4]: http://o2js.com/2011/04/24/the-module-pattern/ "The module pattern"

### Do Not Pollute The Global Namespace

**Avoid using public variables and public functions at all costs**.

Global variables and functions are rarely, if ever, required.

Using globals cause naming conflicts between JavaScript source files
and cause code  to break unexpectedly. For this reason, it is a good
practice to encapsulate functionality within *namespaces*.

Use namespaces and break code into modules.

> Modules, *modules*, **modules**.
> **NOT**
> functions, *functions*, **functions**!

### Avoid God Objects And God Methods

Each method **SHOULD** have one, and only one, clearly defined task.
If a method is doing more than one thing, it should be **divided**
into **subroutines**.

Program your functions atomically. Aim to reduce [cyclomatic complexity][5].

While writing a method the following should be taken into consideration:

* The accepted input ranges, and data types,
* Return values and their meanings,
* Error conditions, exceptional cases, and how they are handled.
* Whether the method has any [side effects[6]

> A function with no side effects is a function that always returns the same
> value given the same arguments, and never changes the internal global state
> (MODEL), or the application's look & feel (VIEW). It takes some arguments,
> returns a value based on these arguments, and do not monkey around with
> anything else.

[5]: http://en.wikipedia.org/wiki/Cyclomatic_complexity "Cyclomatic Complexity"
[6]: http://en.wikipedia.org/wiki/Functional_programming#Pure_functions "Functional Programming: Pure Functions"

### **DO NOT** Rely On Type Information While Naming Variables

Strive **NOT TO** include type information in variables.

Variables should be understandable by their behavior (*semantics*),
**NOT** by their type.

        // Incorrect:

            var eventType = framework.EventType;
            var kAddBuddyEventType = eventType.ADD_BUDDY;

            var itemArrayList = new ArrayList();
        // Correct:

            /* eventType is an alias to type "framework.EventType" */
            var eventType = framework.EventType;

            /* kAddBuddy is of type "framework.Eventype"
               (when we think in non-strict terms) */
            var kAddBuddy = eventType.ADD_BUDDY;

            var items = new ArrayList();


**Exception**:

If there are two similar constants, we may want to include type information
instead of renaming those constants, as in the following case:

        var kDomLoaded = 'domloaded';
        var kDomLoadedRegExp = /domloaded/g;

        var kUsername = 'user name';
        var kUsernameFieldId = 'txtUsername';

Also, if adding type information conveys an additional meaning which decreases
ambiguity, clarifies meaning, and makes the code easier to follow, its okay
to include type information in variable names. So use your own judgement.

Variable names for UI elements are generally examples for this:

        // It's not clear what "cancel" refers to. A method, a boolen flag?
        var cancel = document.getElementById('btnCancel');

        // this is better: more explanatory, easier to follow.
        var cancelButton = document.getElementById('btnCancel');

### Always Respect Type

**JavaScript** is a dynamically typed language - which can be your
best friend or worst enemy, so: Always respect type.

Always use equality with type ( `===` and `!==` ) when comparing
variables and statements.

If you know the type of an input variable beforehand explicitly cast
it before using it. Here's an example:

        var userCount = document.getElementById('uc').value;

        // 1. defensively parse the value using parseInt
        // 2. use === for comparison.
        if (parseInt(userCount, 10) === MAX_ALLOWED_USER_COUNT) {
            doStuff();
        }

        // Or...

        // The unary operator + will convert its rigth-side operand
        // into a number.
        if (+userCount === MAX_ALLOWED_USER_COUNT) {
            doStuff();
        }


### **DO NOT** Mix HTML and Javascript

Use a templating engine. Don't mix HTML markup within JavaScript code.

### **DO NOT** Use Inlne Javascript Events

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
* no `onkeydown=""`s, or God forbid, no `href:"javascript:"`s ...)
* Separate HTML from JavaScript (no **HTML tagsoup** within JavaScript; use
 **templates** instead)
* Separate PHP (or the server-side language of your choice) from JavaScript
(PHP should not spit out thousands of lines of of server-generated JavaScript)

### Use Event-delegation

**DO NOT** register every single click event, on every single object.

When there are large numbers of objects, which the application has to listen
and respond to, hanging around, adding an event handler to each and every
single one of those objects will have a **huge** impact on **performance** and
**memory utilization**.

Use [event delegation][9] instead.

[Event delegation][9] is **faster**, **scalable**, and **easier to maintain**.

[9]: http://icant.co.uk/sandbox/eventdelegation/ "Event Delegation"

### Use Event-driven Programming

Use [event-driven programming][10]. Web apps will **always** be event driven.

You're either responding to a **user event**, or a **system event**.

Architect and program your components as such.

[10]: http://en.wikipedia.org/wiki/Event-driven_programming "Event-Driven Programming"

### Avoid **Magic Strings** And **Magic Numbers** Like Plague

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

        for (var i=0, len=kDeckSize, i<len; i++){
            j = i + getRandomInt(kDeckSize + 1 - i) - 1;
            swapDeck(i, j);
        }

Moreover, if there's a relation between two symbolic constants, this
relation should be **explicitly indicated**:

    var kMaxItems = 32;
    var kHighWaterRank = (3 * kMaxItems) / 4; //instead of 24.

### Decouple Objects and Minimize Variable Scope

Objects and methods should have as little information about each other as possible.
That's the major motivator behind **object-oriented programming*.

Minimize variable scopes. Use the [module pattern][11].

> The larger the scope of the variables, the harder it is to maintain the code.

*Avoid* global variables and global methods at all costs.

[11]: http://o2js.com/2011/04/24/the-module-pattern/ "The JavaScript Module Pattern"

### Replace **Temporary Variables** with **Query Methods**

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

### Program Defensively

Adhere [defensive programming][13] best-practices.

[13]: http://en.wikipedia.org/wiki/Defensive_programming "Defensive Programming"

All functions should work according to a given [contract][14].

[14]: http://en.wikipedia.org/wiki/Design_by_Contract "Design by Contract"

Their **in/out parameters**, exepected and unexpected **value ranges**,
**side-effects**, **error** and **exception** situtaions etc. **SHALL**
be designed **before** writing the code.

Use [guard-clauses][15] to avoid unexpected conditions.

[15]: http://c2.com/cgi/wiki?GuardClause "Guard Clauses"

### **Exception**s Are For **Exceptional** Cases

Exceptions are expensive. Using a nested structure of `try/catch`s
will increase the depth of the execution scope, which may slow down your
code.

Throw exceptions only in exceptional cases.
If you know what's going on ("operation completed", "connection error",
"end of stream"... etc) use return codes instead of throwing exceptions.

Besides, hiding surprises inside `try { stuff() } catch (ignore){ }` kind
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

### Use The Force Wisely

Your application shall function degrade gracefully, when Javascript
is not available or when Javascript has been disabled.

JavaScript is for **enhancing** existing functionality.

[Enhance progressively][16], and ensure tha your application
is usable at all times.

[16]: http://en.wikipedia.org/wiki/Progressive_enhancement "Progressive Ehnancement"

## Performance and Memory Considearations

Here are certain performance considerations, and guidelines to keep in mind
when designing a highly interactive, mostly single-page, client-heavy,
long-lasting (i.e. users will be on the same page for more than several hours)
web application:

### Key Performance Indicators

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

### Consider Using **Native** Methods Whenever Possible

`for(...)` is around 3 times faster than, take for example, jQuery's
`$(this).each` (depending of the selector complexity, and the
collection size). There's no faster selector than
`document.getElementById()`. `Function.call` and `Function.apply`
are definitely faster than Prototype.js's `bind` method.

The fact that you have a framework at hand, does not mean you
should excessively use it. Know (and learn) adequate JavaScript,
to use native methods in performance-and-memory-critical
parts of your code.

### Minimize **Scope Chain** And **Namespace Lookup**

Instead of this...

        var lSide = collection.subcollection.items.all.left;
        var rSide = collection.subcollection.items.all.right;

Do this:

        var all = collection.subcollection.items.all;
        var lSide = all.left; /*each dot is a namespace lookup.*/
        var rSide = all.right;

Things get worse, if the **collection** variable above is a **DOM Node**
and the assignments are repeated in a `for` loop (both of which are not
uncommon situtations).

### Use **Array Joins** Instead Of String Concatenation

        // Instead of this...
        var result = 'a' + 'b' + 'c' + 'd';

        // This is much faster:
        var result = ['a','b','c','d'].join('');

### Use **Function Pointers**

Instead of this...

        function iterateOverMe(){
            for (var i = 0; i < 1000; i++) {
                lorem.ipsum.dolor.sit(i);
            }
        }

This is much faster:

        function iterateOverMe() {
            var sit = lorem.ipsum.dolor.sit;

            for(var i = 0; i < 1000; i++) {
                sit(i);
            }
        }

As a sidenote, the first time a **function** is declared is more
expensive than its consecutive declerations, because the initial
decleration both involves **namespace lookup** and **creation**;
while the latter only involves **creation**:

        //namespace lookup & creation;
        var fnPtr = lorem.ipsum.dolor.sit;

        //second decleration is faster -- just namespace lookup.
        var fnPtr2 = lorem.ipsum.dolor.sit;

The more you reduce namespace lookups, the faster is your code.

### Add Complex DOM Subtrees Offline

Instead of this:

        function tableTest() {
            var tableEl = null;
            var rowEl = null;
            var cellEl = null;
            var numRows = 10;
            var numCells = 5;

            tableEl = document.createElement('TABLE');
            tableEl = document.body.appendChild(tableEl);

            for (i = 0; i < numRows; i++) {
                rowEl = document.createElement('TR');

                for (j = 0; j < numCells;j++) {
                    cellEl = document.createElement('TD');
                    cellEl.appendChild(
                    document.createTextNode('[row '+i+' cell '+j+ ']''));
                    rowEl.appendChild(cellEl);
                }

                tableEl.appendChild(rowEl);
            }
        }

This is much faster:

        function tableTest() {
            var tableEl = null;
            var rowEl = null;
            var cellEl = null;
            var numRows = 10;
            var numCells = 5;

            tableEl = document.createElement('TABLE');

            for (i = 0; i < numRows; i++) {
                rowEl = document.createElement('TR');

                for (j = 0; j < numCells; j++) {
                    cellEl = document.createElement('TD');
                    cellEl.appendChild(document.createTextNode(
                    [row +i+' cell '+j+ ']'));
                    rowEl.appendChild(cellEl);
                }

                tableEl.appendChild(rowEl);
            }

            tableEl = document.body.appendChild(tableEl);
        }

### Edit Complex DOM Subtrees Offline

Instead of this...

        function subTrees() {
            var ul = document.getElementById('myUL');

            for (var i = 0; i < 200; i++) {
                ul.appendChild(document.createElement('LI'));
            }
        }

This is much faster:

        function subTrees(){
            var ul = document.getElementById('myUL');
            var li = document.createElement('LI');
            var parentNode = ul.parentNode;

            parentNode.removeChild(ul);

            for (var i = 0; i < 200; i++) {
                ul.appendChild(li.cloneNode(true));
            }

            parentNode.appendChild(ul);
        }


### Cache DOM Collection Length

Instead of this...

        function nodeJam(){
            nodes = document.getElementsByTagName('P');

            for (var i = 0; i < nodes.length; i++) {
                nodes[i].innerHTML += 'test';
            }
        }

This is faster:

        function nodeJam(){
            nodes = document.getElementsByTagName('P');

            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].innerHTML += 'test';
            }
        }

### Use Memoization for Computation-Intensive Functions

If your functions are deterministic, you can use [memoization][20],
so that you don't need to do the same computations over and over again.

[20]: http://o2js.com/2011/05/03/javascript-function-kung-fu/ "Memoization"

### Cache Frequently Used Global Methods And Objects For Speed

Last, but not the least, **always cache** global methods and object that you
use within loops:

So instead of this...

        function loopMePlease(){
            for (var i=0; i<1000; i++) {
                doStuff();

                if (n===12) {
                    someBlock();
                } else if (n===26) {
                    someOtherBlock();
                }
            }

        }

This is faster:

        function loopMePlease(){

            // Cache the global function.
            var fnDo = doStuff;

            for(var i=0; i<1000; i++){
                fnDo();

                // Also, a switch/case is (negligibly) faster than an if-else chain
                switch(n){
                    case 12:
                        someBlock();
                        break;
                    case 26:
                        someOtherBlock();
                        break;
                }
            }
        }

Also it's a good practice to **cache DOM object collections**,
because executing the same selectors over and over again
to reach the same collection is resource intensive.

> The less you mess up with DOM, the better.

Instead of this...

        select('div > li > a').show();
        select('div > li > a').addClass('test');
        select('div > li > a').click(function(){});

This is much faster:

        var collection = select('div > li > a');

        collection.show();
        collection.addClass('test');
        collection.click(function(){});

## Code Smells

Constantly follow these indicators, as they often show the quality
(or lack thereof) of the code you're writing.

### Comments

There's a slight difference between comments that are explaining
what's being done and comments that are overly confusing.

Comments should answer the question **"why?"**, not the question **"what?"**.

If the number of "caveat" comments inside a code block is increasing,
it may show that the code block is becoming more complicated.

If possible, the code should be refactored, so that those "caveat"
comments are not necessary anymore.

### Excessively Long Method Names

Explanatory method names are good.

Keeping everything constant, a shorter method name is easier to read and
understand. Method names should be shortened, without losing their
meanings. Method names should be shorter enough, but not too sort.

Besides a very long method name may be the indicator of a
**God Function**, which should be avoided anyway.

If your function is named `doThisAndThatAndSomethingElse`, most probably
you can split it into `doThis`, `doThat`, and `doSomethingElse` parts.

### Methods Having Too Much Parameters

* The more parameters a method has, the more complex it is.
* The more complex a method is, the more possible that it has more than
one functionality.
* The more functionality a method has, the closer it is to a **God Function**.

And God Functions are bad.

If a method has too much parameters:

* Either reduce the number of method parameters,
* Or merge those parameters under a configuration object.

### Code Repetition (Copy & Paste Code)

Seeing the same code over and over again is a clear indication of low code
quality.

Repeating code, should be consolidated in **helper methods**. If the code
is duplicated in different modules, then **a new helper module** should be
created and both of the modules should the the new module's helper
method instead.

### Conditional Complexity

If the code has a lot of `if/else` chains, nested `for`s `switch`es etc and
it makes it harder to read the code; then it's time to **refactor** it.

### Codes Doing "almost" the Same Thing

Codes doing almost the same thing should be regarded as code repetition,
and should be **refactored** accordingly.

### A Very Large Module / Function

If a module has grown too large, then it's most probably doing more than
it's supposed to do.

If you have a swiss army knife module, then it's time to split it into
sub-modules to make your code more manageable and less error prone.

### Function And Variables That Are Not Telling What They Do

Or worse, functions that are giving a message that's totally unrelated to what
they do.

Let's say we have a fictitious "executeIframeAjaxProxy" method which neither
uses an iframe, nor makes an ajax call, and is not a proxy to something.
It's not uncommon to see these badly-named methods, if the project is
more than a few years old.

Those methods should immediately be **renamed*, in order to relieve the
frustration that the next poor developer working on the code will have.
Otherwise she'll be spending hours of valuable development time to figure out
what the code does, or worse she'll be using the code with incorrect assumptions
out of hassle.

If a method has a misleading name, **rename it**.

### Incoherent Naming

> Don't look at the thesaurus,
> and use a different synonym of "get" each time
> you use a getter metod.
> You are not a linguist, you are a "developer".
> And part of your job is to give **boring**
> and **consistent** names to your methods.

Have a standard terminology in naming your methods and adhere to it.

Do not give different names to similar-behaving functions.

### Dead Code

If there's a code that's not working and not used anywhere; it should
be removed from the code-base immediately. Fear is the enemy of code
stability.

### Speculative Generalization

> Optimization without measurement is merely a waste of time.

Do not try to solve the problem of 5 months later, now.

First create a running prototype. Then test, optimize and benchmark
your code.

### "I Did It, and It Worked" Style Of Approach

If you've solved a problem, you should clearly understand
**why** and **how** you did it.

> For instance if a parameter is happening to be "null" then adding an
> "if not null" control is equivalent to sweeping the dust under the rug.

If the parameter is null or undefined, then you should find out
**"why"** it's that way.

If you devise a solution without going to the bottom of the problem;
sooner or later your so-called "solution" will stab you in the back.

### Temporary Variables

The more temporary variables in the code, the harder to manage it.
Temporary variables should be replaced with query methods when possible.

### Global Variables

The more the number of global state variables in the code, the more
dependent the modules are. And dependency means error-prone, and
hard-to-manage code.

### Data Clusters

If you observe certain kind of data, variables, method etc, loosely
lumping together in various parts of the code; then may be its better
to take them and create a separate class.

### Cross-Module-Intimacy

Modules should now the least information possible about each other.
Modules' public interface should be kept at a minimum.

**If you don't have a reason to keep a method public, than you had better
make that method private.**

### Attribute Envy

If some methods of module A calls a lot of methods from module B, then
may be those methods of module A should actually belong to module B.
Consider a refactoring.

### Lazy Class

Any newly added class, adds to the complexity of the project. If a class
is unable to hold its weight, i.e. it's not used enough, then it should
be merged with other classes.

### Shotgun Surgery

If adding a single line of code, or extracting a single method requires
changes in tens of unrelated methods and classes then the code needs
some serious refactoring.

### Incomplete Library Class

The method should belong to a library, but it's currently the private
method of an unrelated class. This is a **clear invitation to code
repetition** in other classes.

The method should be taken out of the class and put into a library.

### Existence of Incomplete Code Blocks

**Never check-in incomplete/untested code**.

The source code in the repository, at any given time, **SHOULD NOT** contain
any build errors, syntax errors, runtime errors, or logic errors.

This is only possible if **DO NOT** check-in garbage code.

The Source Code Repository is not your FTP backup place.

Only check in the code that you've **tested** (yes testing is *your*
responsibility) and you are %100 sure that it works.

Keep in mind that the checked in code should be "ready for release"
**at any time**.

## Conflicting Situations

Even the strictest set of rules and coventions may be vague under certain
boundary conditions. Although coding has a lot of science and rules behind it,
it is also a form of *art*.

To take this one step further, we'll consider code more like a *poem*, than a
*newspaper article*. **Use your own judgement** for the vague boundary cases.
It's your **art**, more than anybody else's.

While using your judgmenet though, keep in mind that this document is mainly
based on [K&R Style Coding][22]. So you can safely follow [K&R Indent Style][22]
for situations that are not covered in this document.

[22]: http://en.wikipedia.org/wiki/Indent_style "Indent Styles"

--------------------------------------------

That's the end of this conventions document.

Feel free to contribute.
