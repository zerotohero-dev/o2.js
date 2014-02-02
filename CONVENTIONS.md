            ___       _
      ____ |__ \     (_)____
     / __ \__/ /    / / ___/
    / /_/ / __/_   / (__  )    A Coherent Solution
    \____/____(_)_/ /____/  to Your JavaScript Dilemma ;)
               /___/

**Table of Contents**

// TODO: regenerate TOC.

- [o2.js JavaScript Conventions & Best Practices](#o2js-javascript-conventions--best-practices)
    - [An All-in-One Guide to Writing Efficient JavaScript ;)](#an-all-in-one-guide-to-writing-efficient-javascript-)
    - [Bottom Line Up Front](#bottom-line-up-front)
    - [Introduction](#introduction)
    - [Why Do We Need Conventions?](#why-do-we-need-conventions)
    - [o2.js JavaScript Coding Standards](#o2js-javascript-coding-standards)
        - [Maintain Existing Coding Style](#maintain-existing-coding-style)
        - [Provide Tests for the Codebase](#provide-tests-for-the-codebase)
        - [Code Cleanliness](#code-cleanliness)
        - [Line Length](#line-length)
        - [Indentation](#indentation)
        - [End of File](#end-of-file)
            - [Indent…](#indent)
            - [Triple indent…](#triple-indent)
        - [Indenting Chained Methods](#indenting-chained-methods)
        - [Object Literals](#object-literals)
        - [Method Length](#method-length)
        - [Aligning Code](#aligning-code)
        - [Blank Lines](#blank-lines)
        - [Trailing Spaces And File Endings](#trailing-spaces-and-file-endings)
        - [Brace Positioning](#brace-positioning)
        - [Spaces](#spaces)
        - [New Lines](#new-lines)
        - [Always Use var](#always-use-var)
        - [Feature-Detect Rather Than Browser-Detect](#feature-detect-rather-than-browser-detect)
        - [eval is evil](#eval-is-evil)
        - [Feel free to use undefined](#feel-free-to-use-undefined)
        - [Object and Array Creation](#object-and-array-creation)
        - [Strings](#strings)
        - [Private Methods and Properties](#private-methods-and-properties)
        - [Saving A Reference to this](#saving-a-reference-to-this)
        - [Accessor Methods](#accessor-methods)
        - [Prototypal Inheritance](#prototypal-inheritance)
        - [Modules](#modules)
        - [Comments](#comments)
            - [Documentation Comments](#documentation-comments)
            - [Block-level and Inline Comments](#block-level-and-inline-comments)
            - [Task Comments](#task-comments)
            - [When to Comment](#when-to-comment)
        - [Variable and Method Naming](#variable-and-method-naming)
        - [Method Parameters](#method-parameters)
        - [Avoid Using continue Statement](#avoid-using-continue-statement)
        - [Return Early, Return Often](#return-early-return-often)
        - [Group Related Statements Together Using Parentheses ((…))](#group-related-statements-together-using-parentheses-hellip)
        - [Variable Initialization](#variable-initialization)
        - [Avoid "Yoda Conditions"](#avoid-yoda-conditions)
        - [Avoid "Stringly Typed" Code](#avoid-stringly-typed-code)
        - [Always Use Strict Comparison](#always-use-strict-comparison)
        - [Prefer Delegation Over switch\case](#prefer-delegation-over-switchcase)
        - [File, Folder and Path Naming](#file-folder-and-path-naming)
        - [File Headers](#file-headers)
        - [Show Love to Your Curly Braces](#show-love-to-your-curly-braces)
        - [Function Headers](#function-headers)
        - [Default Fallbacks](#default-fallbacks)
        - [Boolean Comparisons](#boolean-comparisons)
        - [Variable Access](#variable-access)
        - [Statement Termination](#statement-termination)
    - [o2.js JavaScript Coding Best Practices](#o2js-javascript-coding-best-practices)
        - [JSHint Your Code](#jshint-your-code)
        - [Event Handler Naming Convention](#event-handler-naming-convention)
        - [Store Your Code in Meaningful Folder Structures](#store-your-code-in-meaningful-folder-structures)
        - [Show Love To the Module Pattern](#show-love-to-the-module-pattern)
        - [Do Not Pollute The Global Namespace](#do-not-pollute-the-global-namespace)
        - [Avoid sync AJAX Calls](#avoid-sync-ajax-calls)
        - [Show Love to JSON](#show-love-to-json)
        - [Use Namespaces and Break Code Into Modules](#use-namespaces-and-break-code-into-modules)
        - [Avoid "God Objects" And "God Methods"](#avoid-god-objects-and-god-methods)
        - [Strive for Harmony and Symmetry in Your Code](#strive-for-harmony-and-symmetry-in-your-code)
        - [DO NOT Rely on Type Information While Naming Variables](#do-not-rely-on-type-information-while-naming-variables)
        - [Always Respect Type](#always-respect-type)
        - [DO NOT Mix HTML and JavaScript](#do-not-mix-html-and-javascript)
        - [DO NOT Use Inline JavaScript Events](#do-not-use-inline-javascript-events)
        - [Use Event Delegation](#use-event-delegation)
        - [Use Event-Driven Programming](#use-event-driven-programming)
        - [Avoid Magic Strings And Magic Numbers Like Plague](#avoid-magic-strings-and-magic-numbers-like-plague)
        - [Use Event Constants](#use-event-constants)
        - [Decouple Objects and Minimize Variable Scope](#decouple-objects-and-minimize-variable-scope)
        - [Replace Temporary Variables with Query Methods](#replace-temporary-variables-with-query-methods)
        - [Keep it DRY](#keep-it-dry)
        - [Program Defensively](#program-defensively)
        - [Exceptions Are For "Exceptional" Cases](#exceptions-are-for-exceptional-cases)
            - [DO NOT Manage Your Business Logic With Exceptions](#do-not-manage-your-business-logic-with-exceptions)
        - [Avoid try/catch Within a Loop](#avoid-trycatch-within-a-loop)
            - [DO NOT Ignore Exceptions](#do-not-ignore-exceptions)
            - [DO NOT Use try/catch Within Loops](#do-not-use-trycatch-within-loops)
            - [Clearly Document Exceptional Cases](#clearly-document-exceptional-cases)
            - [Good Boys Clean Their Mess](#good-boys-clean-their-mess)
        - [Use The Force Wisely](#use-the-force-wisely)
    - [Performance and Memory Considerations](#performance-and-memory-considerations)
        - [Key Performance Indicators](#key-performance-indicators)
        - [Consider Using Plain Old JavaScript Methods Whenever Possible](#consider-using-plain-old-javascript-methods-whenever-possible)
        - [Use Array.prototype.slice to copy an Array](#use-arrayprototypeslice-to-copy-an-array)
        - [Use Array.prototype.join for string concatenation](#use-arrayprototypejoin-for-string-concatenation)
        - [Minimize Scope Chain And Namespace Lookup](#minimize-scope-chain-and-namespace-lookup)
        - [Use Function Pointers](#use-function-pointers)
        - [Add Complex DOM Subtrees Offline](#add-complex-dom-subtrees-offline)
        - [Edit Complex DOM Subtrees Offline](#edit-complex-dom-subtrees-offline)
        - [Cache the DOM Collection Length](#cache-the-dom-collection-length)
        - [Use Memoization for Computation-Intensive Functions](#use-memoization-for-computation-intensive-functions)
        - [Cache Frequently Used Global Methods And Objects For Speed](#cache-frequently-used-global-methods-and-objects-for-speed)
        - [Always Test Your Assumptions](#always-test-your-assumptions)
    - [Code Smells](#code-smells)
        - [Comments](#comments-1)
        - [Excessively Long Method Names](#excessively-long-method-names)
        - [Methods Having Too Much Parameters](#methods-having-too-much-parameters)
        - [Code Repetition (Copy & Paste Code)](#code-repetition-copy--paste-code)
        - [Conditional Complexity](#conditional-complexity)
        - [Codes Doing "almost" the Same Thing](#codes-doing-almost-the-same-thing)
        - [A Very Large Module / Function](#a-very-large-module--function)
        - [Function And Variables That Are Not Telling What They Do](#function-and-variables-that-are-not-telling-what-they-do)
        - [Incoherent Naming](#incoherent-naming)
        - [Dead Code](#dead-code)
        - [Speculative Generalization](#speculative-generalization)
        - ["I Did It, and It Worked" Style Of Approach](#i-did-it-and-it-worked-style-of-approach)
        - [Temporary Variables](#temporary-variables)
        - [Global Variables](#global-variables)
        - [Data Clusters](#data-clusters)
        - [Cross-Module-Intimacy](#cross-module-intimacy)
        - [Attribute Envy](#attribute-envy)
        - [Lazy Class](#lazy-class)
        - [Shotgun Surgery](#shotgun-surgery)
        - [Incomplete Library Class](#incomplete-library-class)
        - [Existence of Incomplete Code Blocks](#existence-of-incomplete-code-blocks)
        - [Code Grouping](#code-grouping)
    - [Conflicting Situations](#conflicting-situations)
    - [Other Conventions and Guidelines to Check Out](#other-conventions-and-guidelines-to-check-out)
    - [References and Further Reading](#references-and-further-reading)


# o2.js **JavaScript** Conventions & Best Practices

## An **All-in-One** Guide to Writing Efficient **JavaScript** *;)*

---

## Bottom Line Up Front

Just carve this into your mind if you forget everything else you read in this document:

> You should write your code that it can be read as good book.

---

## Introduction

This document includes **JavaScript** usage and naming conventions, best practices, and recommendations.

These conventions and recommendations are constantly being used within **o2.js** source code, and examples.

If there's a particular **JavaScript** usage that's not mentioned in this document:

* Either it should be proposed as an *exceptional case* and added to this document;
* Or the code should be **re-factored** to adhere **o2.js** **JavaScript** conventions.

> This document is, in particular, the basis for **o2.js** coding standards. In general, however, it *can* be used as a *guideline* for *any* large-scale client-heavy **JavaScript** project.

---

## Why Do We Need Conventions?

**Coding Conventions** are a must-have for any large-scale long-lived software project.

> *Nearly %80 of the development time* in large-scale software projects go to **maintenance**, **patching**, and **rewriting** the codebase.

During their lifetime, these large-scale software projects are coded and maintained by more than a single individual, and everyone's coding style and preferences differ.

In this essence, **coding conventions** constitute a **shared language** between the developer team. They increase the readability of the code, and make the code less error-prone.

---

## o2.js **JavaScript** Coding Standards

This section includes the main code conventions, standards, and guidelines used within **o2.js** source files.

### Maintain Existing Coding Style

This is easier to state, and harder to adhere:

* Keep your coding habits and behaviors aside;
* Don't be a **[cowboy coder][cowboy-coding]**;
* All code should look like a single person typed it, no matter how many people contributed.

### Provide Tests for the Codebase

Any module developed **SHOULD** include some form of unit, reference, implementation or functional testing. Use case demos **DO NOT QUALIFY** as "tests".

> Any code checked in **SHOULD** have **documentation** and **unit tests** to be accepted.

Integrate your **unit tests** to a **[CI Server][ci]**.

> **o2.js** uses [Travis][travis] as its **continuous integration** system. After each `git push`, all **unit tests** and other **custom tasks** are run and validated. &ndash; This ensures **o2.js** code to be always in good shape.

### Code Cleanliness

The code should be kept clean. There should **not** be excessive logs, debug lines, print statements, or alerts.

There should **not** be commented out code.

> The whole point of using a *version control system* is to eliminate the need of leaving commented out code in the source code. Instead of leaving the code commented out, one should utilize the version control system's *diff&amp;merge* utility.

If there is a code piece that you long to keep, save it in an external file **outside** the project folder.

### Line Length

To sustain code readability, limit the line length to **80 characters**. If the line (*including the indentation*) exceeds **80 characters**, continue from the next line.

### End of File

Place an empty newline at the end of the file.

### Indentation

* Code blocks are indented with **4 spaces**.
* The IDE should be set up to print **4 spaces** when pressing the `<TAB>` key (*i.e., use "soft tabs"*).
* Never mix spaces and tabs.

#### Indent&hellip;

* Statements within **blocks**.

~~~
while (node) {
    if (node.nodeType !== kTextNode) {
        return node;
    }

    node = node.nextSibling;
}
~~~

* Statements within a **function** body.

~~~
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

        // Get the next node.
        node = node.nextSibling;
    }

    return null;
};
~~~

* Statements within a **switch** body.

~~~
switch (className) {
    case ccc.LOG:
        try {
           process(text);
        } catch (ignore1) {
            log(ignore1);
        }

        break;
    case ccc.INFO:
        try {
            console.info(text);
        } catch (ignore2) {
            log(ignore2);
        }

        break;

        ...
}
~~~

* Statements within a **case** body.

~~~
...

case ccc.WARN:
    try {
        console.warn(text);
    } catch (ignore3) {
        log(ignore3);
    }

    break;
case ccc.ERROR:
    try {
        console.error(text);
    } catch (ignore4) {
        log(ignore4);
    }

    break;
default:
    try {
        process(text);
    } catch (ignore5) {
        log(ignore5);
    }

    break;
~~~

* Statements **inside** a *closure*:

> Technically speaking, *any function* is also a *closure*; therefore statements inside **any function** should be indented one level with respect to that *function*'s body.

~~~
me.eventHandler.preventDefault = window.event ? function() {
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

me.eventHandler.preventDefault(evt);
~~~

* Parts of the statements that are folded to the next line because they exceed the **80 characters** line length limit.

~~~
application.renderController.repaintUserInfo(messageId, userId,
    options, callback); //<-- 1x indented.
~~~

* Variable declarations.

~~~
function test() {
    var x = 10,
        y = 20,
        z, t;

    ...
}
~~~

> `var` statements should always be in the beginning of their respective scope (**function**). Same goes for `const` and `let` from [ECMAScript 6][es6].

> For complex variable, and function declerations that need to be wrapped to the next line, a single indentation can make the code harder to read because the indented line can seem to preceed the following statement. In that cases (instead of double indenting) **triple indentattion** can make the distinction more clear.

#### Triple indent&hellip;

* Method parameters that are folded to the next line, and **triple indented** if they exceed the **80 characters** line length limit.

> This will clearly indicate that those parameters are **not** a part of the function's body.

~~~
var instantChatMessageView = {

    /*
     *
     */
    render: function(conversation, chatListItem, message,
                timeStamp, messageId, userId) { // <-- 3x indented.
        prepareChatListItem(chatListItem, message,
            (new Date()).getTime()); // <-- 1x indented.

        conversation.appendChild(chatListItem);

        application.RenderController.repaintUserInfo(messageId,
            userId); // <-- 1x indented.

        scrollToBottom(conversation);
    }
};
~~~

The above code may alternatively be written as follows:

~~~
var instantChatMessageView = {

    /*
     *
     */
    render: function(
        conversation, chatListItem, message, timeStamp, messageId, userId, foo,
        bar, baz, bat // 1x indent wrapped parameters.
     ) { // <-- No indentation.
        prepareChatListItem(
            chatListItem, message, (new Date()).getTime() // <-- 1x indent.
        ); // <-- No indentation.

        conversation.appendChild(chatListItem);

        application.RenderController.repaintUserInfo(
            messageId, userId // <-- 1x indent.
        ); //<-- No indentation.

        scrollToBottom(conversation);
    }
};
~~~

* Similarly the conditional or expressional sections (i.e., the parts that are evaluated) of `if`, `else`, `while`, `for`, `switch` statements are folded to the next line and triple indent if they exceed the **80 characters** line length limit.

~~~
...

if(src.nodeName.toLowerCase() === kTextarea &&
            src.getAttribute(kDataInput)) { //<-- 3x indented.
    self = mentionsInputs[i];
    delegateClickAction(self);

    return;
}

...
~~~

~~~
if (filterDelegate.apply(target, filterArgs)) {
    counter++;

    if (!isNaN(returnSingleItemAt) &&
                returnSingleItemAt === counter) {
        return target;
    }

    result.push(target);

    if (!isNaN(itemsCountCap) &&
                itemsCountCap <= counter) {
        break;
    }
}
~~~

The above code example may alternatively be written as follows:

~~~
...

if(
    src.nodeName.toLowerCase() === kTextarea &&
    src.getAttribute(kDataInput)
) {
    self = mentionsInputs[i];
    delegateClickAction(self);

    return;
}

...
~~~

~~~
if (filterDelegate.apply(target, filterArgs)) {
    counter++;

    if (
        !isNaN(returnSingleItemAt) &&
        returnSingleItemAt === counter
    ) {
        return target;
    }

    result.push(target);

    if (
        !isNaN(itemsCountCap) &&
        itemsCountCap <= counter
    ) {
        break;
    }
}
~~~

* If the variable declaration involves a function call, and that function call need to be wrapped to the next line.

~~~
// Incorrect.
var followButton = view.dom.findActionElement(
        placePageView.$el, 'place-follow'),
    unfollowButton = view.dom.findActionElement(
        placePageView.$el, 'place-unfollow');

// Correct.
var followButton = view.dom.findActionElement(
            placePageView.$el, 'place-follow'),// <-- Triple indent.
    unfollowButton = view.dom.findActionElement(
            placePageView.$el, 'place-unfollow');// <-- Triple indent.

// Use single indent if the assignment is **not** a declaration.

theCopy[key] = me.CollectionHelper.copy(value,
    shouldDeepCopy); // <-- Single indent.
~~~

The above code may also be written as follows:

~~~
var followButton = view.dom.findActionElement(
        placePageView.$el, 'place-follow' // <-- 2x indent.
    ),// <-- 1x indent.
    unfollowButton = view.dom.findActionElement(
        placePageView.$el, 'place-unfollow' // <-- 2x indent.
    );// <-- 1x indent.

theCopy[key] = me.CollectionHelper.copy(
    value, shouldDeepCopy // <-- 1x indent.
); // <-- Zero indent.
~~~

### Indenting Chained Methods

Use indentation when making long method chains.

~~~
// Bad.
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// Good.
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();
~~~

### Object Literals

Use `attrName: value` format. Keep each attribute value pair on its own line.

~~~
// Incorrect.
var ingredientDictionary = {potato: 10, pepper: 11, cucumber: 12};

// Incorrect.
var ingredientDictionary = {
    potato : 10,
    pepper : 11,
    cucumber : 12
};

// Correct.
var ingredientDictionary = {
    potato: 10,
    peper: 11,
    cucumber: 12
};
~~~

**Exception**:

Group related items on their own line, if it increases readability.

~~~
var xssEncodeNoAmpMap = [
    {regExp: /"/g, replace: '&#34;'},
    {regExp: /</g, replace: '&#60;'},
    {regExp: />/g, replace: '&#62;'},
    {regExp: /\'/g, replace: '&#39;'}
],
~~~

**Exception**:

Using an object literal as a **parameter object**:

~~~
replacementHelper.replace(testData, {regExp: /\'/g, replace: '&#39;'});
~~~

**Exception**:

Returning a **parameter object**:

~~~
return {foo: "bar", baz: "bat"];
~~~

### Method Length

Ideally each method should have **at most 10 lines of code**. Any method that has more than 10 lines of code should be split into sub-methods.

Sometimes, for performance reasons, or for structural reasons, refactoring a method into smaller methods might not be possible. In that case *use your own judgement*.

> Split larger methods into smaller sub-methods, whenever you can.

### Aligning Code

Do not align `:` and `=` keys.

Although this may create a more readable code, the code looks bloated, and it might be more prone to merge conflicts. The aesthetics, and the productivity gain you get out of this is *marginal*, if any.

~~~
//Incorrect.
var veggies = {
    tomato    : 1,
    cucumber  : 2,
    waterMelon: 3,
    melon     : 4
};

//Correct.
var veggies = {
    tomato: 1,
    cucumber: 2,
    waterMelon: 3,
    melon: 4
};

// Incorrect.
foo     = getFoo();
bazinga = getBazinga();
magnet  = getMagnet();

// Correct.
foo = getFoo();
bazinga = getBazinga();
magnet = getMagnet();
~~~

### Blank Lines

Blank lines may be used for separating  code lines or line groups semantically for readability.

> Leave **at most** one blank line.

Insert **one** blank line&hellip;

* **Before** *throw*, *break*, and *return* statements:

~~~
if (!url) {
    stuff();

    return null;
}
~~~

**Exception**:

If the *return*, *throw*, *break*&hellip; statement is the **only** statement within its block, then do not insert a blank line.

~~~
if (!url) {return;}
~~~

* **After** function declarations:

~~~
me.eventHandler.stopPropagation = function(e) {
    if (!e) {return;}

    e.stopPropagation();
};

me.eventHandler.stopPropagation(evt);
~~~

* **After** inline functions:

~~~
function isArray(obj) {
    return is(obj, config.constants.ecmaScriptType.ARRAY);
}

function is(obj, type) {
    var objectNameStartIndex = 8,
        trimLastBraceIndex = -1,
        klass = Object.prototype.toString.call(obj).slice(
            objectNameStartIndex, trimLastBraceIndex
        );

    return (obj !== undefined) && (obj !== null) && (klass === type);
}
~~~

* **Between** two `if` blocks:

~~~
var i;

if (!ar) {return -1;}

if (isArray(ar)) {
    for (i = 0, len = ar.length; i < len; i++) {
        if (elm == ar[i]) {return i;}
    }

    return -1;
}
~~~

* **After** variable declarations:

~~~
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
~~~

* **After** variable assignments:

~~~
var test = null;

if (someCondition()) {
    test = getTestValue();

    doStuff();
}

// Incorrect.
for (key in base) {
    if (base.hasOwnProperty(key)) {
        value = base[key];
        if (typeof value === kFunction) {
            child[key] = value;
        }
    }
}

// Correct.
for (key in base) {
    if (base.hasOwnProperty(key)) {
        value = base[key];

        if (typeof value === kFunction) {
            child[key] = value;
        }
    }
}
~~~

* **Before** a `try/catch/finally` construct:

~~~
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
~~~

**Exception**:

Do not insert a blank line if that try/catch/finally is the only thing inside the block:

~~~
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
~~~

* **Before** *any* kind of *comment*:

~~~
...

}

/*
 * Processes callbacks and finalizes the `Xhr`.
 *
 * @param {XmlHttpRequest} xhr - the current `Xhr` instance.
 * @param {Object} callbacks - **oncomplete**, **onerror** and **onexception**
 * callbacks.
 */
function processCallbacks(xhr, callbacks) {

...

//
parameters = parameters || {};
callbacks = callbacks || {};
isSync = !!isSync;

var isAsync = !isSync,
    kRandom = config.constants.prefix.RANDOM,
       kGet = config.constants.verb.GET,
       isPost = verb != kGet,
       parametrizedQuery, query, postQuery, guid;

// name1=value1&name2=value2&name3=value3
parametrizedQuery = generateParametrizeQueryString(parameters);

// &name1=value1&name2=value2&name3=value3 (for GET requests)
query = isPost ? '' : ['&', parametrizedQuery].join('');

// name1=value1&name2=value2&name3=value3 (for POST requests)
postQuery = isPost ? parametrizedQuery : '';

// A unique string to prevent caching.
guid = generateGuid();

// http://example.com + ?rnd= + {guid} + &name1=value1
url = concat(url, kRandom, guid, query);

// Create a cross-browser `XmlHttpRequest` insatance.
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
~~~

**DO NOT** insert blank lines&hellip;

* **After** the beginning of and **before** the ending of `function`, `try`, `catch`, `finally`, `switch`, `if`, `else`, `case`, `do`, and `while` blocks:

~~~
// Incorrect.
if (condition) {

    stuff();
    someOtherStuff();

} else {

    anotherStuff();

}

// Correct.
if (condition) {
    stuff();
    someOtherStuff();
} else {
    anotherStuff();
}
~~~

### Trailing Spaces And File Endings

* Trim trailing spaces in every source file.
* Put an extra blank line at the end of each source file.

### Brace Positioning

The brace positions should be as follows:

* **Same line**, in blocks (*C-Style*).

~~~
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
~~~

* **Same line**, in function declarations (*C-Style*).

~~~
removeElementByValue: function (collection, name, value,
            isRecursive) {
    var item = null;
    var isNested = !!isRecursive;

    var removeElementByValue = o2.CollectionHelper.removeElementByValue;

    ...
~~~

* **Same line**, in switch statements (*C-Style*).

~~~
switch (className) {
    case ccc.LOG:
        try {
            process(text);
        } catch (ignore1) {
            log(ignore1);
        }

        break;
    case ccc.INFO:
        try {
            console.info(text);
        } catch (ignore2) {
            log(ignore2);
        }

        break;

        ...
~~~

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
* Key-value (*{'a':'b'}*) operators: **before**: 0, **after**: 1
* Inside a line comment: **after**: 1

~~~
//This is incorrect.

// This is correct with a space.

//TODO: This is incorrect.

// TODO: This is correct.
~~~

* Put one blank space after `switch/if/else/try/catch/finally/for/while/do` keywords:

~~~
switch (state) {
    ...
}

if (foo) {
    ...
}

try {

}

for (;;) {

}

if (foo) {
    ...
} else if {
    ...
} else {
    ...
}

while (statement) {

}

do {

} while (statement);
~~~

* Anonymous Functions

Do not insert space before the `(` of anonymous functions:

~~~
// Incorrect.
var test = function () {
};

// Correct.
var test = function() {
};
~~~

* Empty Function (*noop*), and Empty Object

It is okay to have `{`, and `}` on the same line.

~~~
function noop() {}

var nil = function() {};

var obj = {};
~~~

It is **NOT** okay to put `}` on the same line in any other empty blocks (`try/catch/finally/if/else`):

~~~
// Incorrect.
try {
    doStuff();
} catch (e) {}
finally {}

// Correct.
try {
    doStuff();
} catch (e) {
} finally {
}

// Even better.
try (statement) {
    doStuff();
} catch (e) {
    log(e);
} finally {
    log('finally');
}
~~~

* Negation: **after**: 0

~~~
// Incorrect.
if (! stuff && ! otherStuff) {
    doAction();
}

// Correct.
if (!stuff && !otherStuff) {
    doAction();
}
~~~

### New Lines

* **DO NOT** insert a new line *before* else statement.
* **DO NOT** insert a new line *before* if and else-if statement.
* **DO NOT** insert a new line *before* catch statement.
* **DO NOT** insert a new line *before* finally statement.
* **DO NOT** insert a new line *before* while in a do statement.
* **DO** insert a new line *before* `name: value` pairs.
* **DO** separate *logical code fragments* from each other *with a new line*.

Example:

~~~
// Functions

function foo() {

    ...

    do {
        stuff();
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

    // # If-Else

    if (false) {
        alert('hello');
    } else if (a > 0) {
        alert(a);
    } else {
        alert(0);
    }

}

// # Switch-Case

switch (a) {
    case 1:
        alert('1');

        break;
    case 2:

        break;
    default:
        alert('none');
}

// # Closures

(function fooInGroup(a, b) {

}(a, b));

// # Associative Objects

var associative = {
   name1: 'value1',
   name2: 'value2',
   name3: 10,

   // "float" is a keyword and thus it's escaped.
   'float': 'left'
};
~~~

### Always Use `var`

Variables in **JavaScript** either have **global scope** or **function scope**, and using  the `var` keyword is vital to keeping them straight.

When declaring a variable for use either as a global variable or as a function-level variable, always prefix the declaration with the `var` keyword.

### Feature-Detect Rather Than Browser-Detect

**DO NOT** write your code to detect browser versions and to take different action based on the user agent being used. This, most of the time, is a very bad practice (there are **rarely**, if ever, any exceptions to this).

> Any code which even looks at the global `navigator` object is a suspect.

The better approach is to use **feature detection**. That is, before using any advanced feature that an older browser may not support, check to see if function the or property exists first, then use it.

### `eval` is **evil**

The `eval()` function in **JavaScript** is a way to run arbitrary code at run-time.

In almost all cases, `eval` should never be used. If it exists in your code, there is almost always a more correct way to accomplish what you are doing.

Note that using `Function` constructor is also a form of `eval` and should be avoided.

### Feel free to use `undefined`

In **JavaScript**, it is possible to override the `undefined` variable unintentionally, that's why some of the libraries pass `undefined` as a parameter to their factory method. You don't need to, and here's why:

* No one is "that" dumb to override `undefined`;
* Using "strict mode" prevents overriding `undefined` at all;
* And **[JSHint][jshint]** will detect such an issue and [will raise an error][lint-errors].

### **Object** and **Array** Creation

Use literal notations. It takes less space and it's slightly faster:

~~~
// Incorrect.
var obj = new Object();
var ar = new Array();

// Correct:
var obj = {};
var ar = [];
~~~

### Strings

Always use single quotes ( `'` ) for string literals.

Single quotes play well with **HTML** inside strings, and always using the same quoting scheme makes searching for strings easier.

~~~
'this is correct';

"this is NOT correct";
~~~

### Private Methods and Properties

First of all [show love to the **module pattern**][module-pattern] any function and variable local to the module, is, in deed, private to your module.

In case that you need to expose your private methods (*to be used in unit tests, for example*) put them in a **privates** namespace.

~~~
// Not this.
exports._findSamurai = function() {

};

// This is even worse.
exports.__findSamurai__ = function() {

};

// Prefer the following, instead.

var privates = {
    findSamurai: function() {
        ...
    }
};

exports.privates = privates;
~~~

### Saving A Reference to `this`

Use `that`.

~~~
function scopeTest() {
    var that = this;

    ajax.get(function() {
        that.doStuff();
    });
}
~~~

Or even better, use a **proxy function**:

~~~
var bind = require('./node_modules/o2.method').bind;

function scopeTest() {
    ajax.get(bind(function() {
        this.doStuff();
    }, this);
}
~~~

### Accessor Methods

Accessor methods for properties are **NOT** required.

~~~
// Bad.
var age = ninja.getAge();

// Even worse.
var age = ninja.age();

// Good.
var age = ninja.age;
~~~

The only time you need an accessor is when you want to disable getting, or setting the member:

~~~
var age;

exports.setAge = function(newAge) {
    age = newAge;
};

// There is no way to get the private static `age` variable inside this module.
// We explicitly disable that by providing a public **setter** only.
~~~

### Prototypal Inheritance

Assign methods to the prototype object, instead of overwriting the prototype with a new object. Overwriting the prototype makes inheritance impossible:

> By resetting the prototype you also overwrite the base!

function Jedi() {
    process('new jedi');
}

// Bad.
Jedi.prototype = {
    fight: function fight() {
        process('fighting');
    }
};

// Good.
Jedi.prototype.fight = function fight() {
    process('fighting');
};

### Modules

* **o2.js** modules are separate **[NPM][npm]** modules.
* Each module lives in its own folder under the **src* directory.
* Each module has a **core.js** file which is also the **main entry point** to the module.
* If a module has a wide spectrum of functionality, each functional group might be split into its own file too.
* File names are all **lowercase**.

> These **[NPM][npm]** modules are also converted to [CommonJS][commonjs] module during publish process.
>
> This is done with executing `grunt publish` from the console.
>
> See **Gruntfile.js** in the **project root directory** for details.

### Comments

#### Documentation Comments

* You don't need to put your names, or aliases in the comments. That's the task of the version control system.

* For documentation comments, each root module is regarded as a **static** class.

* Use [YUIDoc syntax][yuidoc] for documenting modules, functions, objects, and structs.

Read [o2.js documentation][o2doc] for examples of this.

* References to method parameters shall be bold:

~~~
* @throws Exception if **fn** callback is not defined.
~~~


* **JavaScript** objects should be enclosed in back ticks (\`&hellip;\`):

~~~
* @param {DomNode} node - the DOM object (or its `String` equivalent).
~~~

**Exception**:

Words like "*string*", "*array*", "*object*" might sometimes be used to indicate a generic class of entities (*i.e., **string** versus **String***). In those cases, since the emphasis is not on the word, we do not treat them as keywords.

> If the "*string/array/etc.*" in the documentation is not a parameter to a method, or a return value from the method, then it's generally not necessary to enclose it in backticks.

Correct:

~~~
/*
 * The **res** folder contains all external resources used by the application such
 * as **images**, **layout files**, **strings**, **menus**, and any other
 * **auxiliary** information.
 * &hellip;
 */
~~~

Correct:

~~~
* @param {Object} context - Might be a `String`, or an `Array`.
*
* @return {Boolean} A new `Object` that contains the configuration.
~~~

#### Block-level and Inline Comments

* Use **only** line comments ( `//` ) for in-line comments.

* Use C-style comments (`/**/`) **only** for *documentation*.

* Do not use C-style comments (`/*&hellip;*/`) inside functions.

* Place single line comments on a newline above the subject of the comment; and put an empty line before the comment.

This is correct:

~~~
// Cache the global function.
var fnDo = doStuff;
~~~

This is not:

~~~
var fnDo = doStuff; // Cache the global function.
~~~

This is even worse:

~~~
var fnDo = doStuff;
// Cache the global function.
~~~

* **Always** end comments with a period (.)

This will force you construct meaningful sentences in your comments.

**Exception**:

Comments that denote certain code sections don't end with a period. They should also be in the "*Title Case*".

Correct:

~~~
// # Data Abstraction Methods
~~~

Incorrect:

~~~
// # Data Abstraction Methods.
~~~

* Use **C-Style** comments for documentation, line comments for inline comments only.

add example -- and move these stylistic comment things to their own section.
they don't belong here since this section describes a more philosophical approach.

#### Task Comments

Prefixing your comments with **FIXME** or **TODO** helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable.

#### When to Comment

You **MUST** comment critical or tricky parts of the code, or important changes you've made to the code, or anything that's not easy to grasp at a first glance.

> Keep in mind that using, or having a need to use, lots of inline comments may be an indicator that you need to split your code into subroutines.

Feel free to **write descriptive comments**; your production **shall** be *minified* and *obfuscated* anyway; and therefore your comments will not have  any negative impact on *performance* or *file size*.

Use **full sentences** in both **documentation** and **inline** comments. Start each comment with a *Capital** letter, and end it with a **period** as you would do in a normal sentence.

Incorrect:

~~~
// sync request -- process response
processCallbacks(xhr, callbacks);
~~~

Correct:

~~~
// If the request is sync, then process the response immediately.
processCallbacks(xhr, callbacks);
~~~

### Variable and Method Naming

* Use meaningful variable (and function) names:

~~~
// Incorrect.
var kSixteen = 16;

// Better.
var kNumberOfBits = 16;
~~~

* Use **long and descriptive** variable (*and function*) names.

> Using abbreviated names doesn't make sense in almost any practical situation, and there are [minifiers][grunt-uglify] for this.

Trying to determine what a variable contains, or what a method does, should be as straightforward as possible.

It is an all too common practice to use abbreviations, single letters or seemingly random names for variables, functions and class names.

~~~
// Incorrect.
usrAvail = true;

// Better.
isUserAvailable = true;
~~~

* Assign aliases for complex conditionals. Consider [replacing temp with query][replace-temp] in your variable assignments.

For instance&hellip;

~~~
if (person.getGender() === kMale && person.getAge() >= kValidAge &&
            person.getNationality() !== kDefaultNationality ||
            person.getGender() === kFemale && person.getAge < kValidAge &&
            person.getNationality() === kDefaultNationality) {
    doStuff();
}
~~~

Can be better expressed as:

~~~
var isMaleAlienWithValidAge = person.getGender() === kMale &&
    person.getAge() >= kValidAge &&
    person.getNationality() !== kDefaultNationality;

var isFemaleCitizenWithInvalidAge = person.getGender() === kFemale &&
    person.getAge < kValidAge &&
    person.getNationality() === kDefaultNationality;

if (isMaleAlienWithValidAge || isFemaleCitizenWithInvalidAge) {
    doStuff();
}
~~~

Or even better:

~~~
function isEligibleToEnterTheParty(person) {
    var isMaleAlienWithValidAge = person.getGender() === kMale &&
        person.getAge() >= kValidAge &&
        person.getNationality() !== kDefaultNationality;

    var isFemaleCitizenWithInvalidAge = person.getGender() ===
        kFemale &&
        person.getAge < kValidAge &&
        person.getNationality() === kDefaultNationality;

    return isMaleAlienWithValidAge || isFemaleCitizenWithInvalidAge;
}

if (isEligibleToEnterTheParty(person)) {
    doStuff();
}
~~~

* Establish a naming convention based on **real names** that mean something.

* Avoid any abbreviations unless they are part of your target industry's every-day lingo.

* In method names, try to use a name that describes what the method **really does**.

* Variables and classes should be **nouns** or **noun phrases**.

* Class names are like **collective nouns**.

* Variable names are like **proper nouns**.

* Procedure names should be **verbs** or **verb phrases**.

* Booleans should be **adjectives**.

* For compound names, retain conventional English syntax.

* Try to make names **pronounceable**.

* **Try to be obvious**.

### Method Parameters

* **DO NOT** override parameters.

~~~
// Incorrect.
function doStuff(target) {
    target = $(target); //<-- target parameter has been overridden.
}

// Correct.
function doStuff(targetElm) {
    var target = $(targetElm); // <-- safer: Original targetElm
                               //            has not changed.
}
~~~

* Choose readable variable names:

~~~
// WTF?!
var b001 = (lo == l0) ? (I1 == 11) : (lOl != 101);
~~~

* Use short enough and long enough variable names in each scope of code.

> As a rule of thumb, length may be 1 char for loop counters, 1 word for condition/loop variables, 1-2 words for methods, 2-3 words for classes, 3-4 words for globals.

* A variable name must define the exact explanation of its content.

* A variable or a method that has an "and" or "or" in it, is a **code smell** that the method is doing too much.

~~~
// Smelly.
createModuleAndInitializeContext();

// Better.
createModules();
initializeContext();

// Smelly.
var content = getSelectionOrDefaultValue();

// Better.
var selection = getSelection(),
    value = selection || getDefaultValue();
~~~

* Don't use non-ASCII chars in variable names.

* **Do not use [Hungarian Notation][hungarian]**.

~~~
// Incorrect:
var dblIncome = 100.12;

// Correct -- no prefix:
var income = 100.12;
~~~

This is true for **DOM** node aliases too.

~~~
// Incorrect.
var txtLogin = document.getElementById('loginInput');
var btnAction = document.getElementById('submitForm');
var optCountry = document.getElementById('countrySelection');

// Correct.
var loginText = document.getElementById('loginInput');
var actionButton = document.getElementById('submitForm');
var countrySelection = document.getElementById('countrySelection');
~~~

* Use **verbs** for **method names**.

Use meaningful names for methods. The name must specify the exact action of the method and must start with a verb. (*e.g., *createPasswordHash**)

* Use meaningful names for method parameters.

You should be able to understand what the parameter is for without documentation. And this should **NOT** be an excuse for not having properly documented code.

* Use **nouns** for **members**, **constants** and **variables**.

* Use **is**, **has**, **should**&hellip; prefixes for methods that return a **boolean**.

~~~
// # Incorrect

    // Status is a "noun".
    if (statusToState(user.status) == kLoggedIn) {

        // User is a "noun".
        userLogin();
    }

    if (loggedIn()) {

        // Stuff is a "noun".
        stuff();
    }

    // this method returns a boolean.
    if (goToNextPage()) {

        // next is a "noun".
        nextPage();
    }

    if (stage.active) {
        raiseTheCurtain();
    }

// # Correct

    if (mapUserStatusToState(user.status) == kLoggedIn) {
        logUserIn();
    }

    if (isLoggedIn()) {
        doStuff();
    }

    if (shouldGoToNextPage()) {
        goToNextPage();
    }

    // The same rule applies to both methods, members, and variables.
    if (stage.isActive) {
        raiseTheCurtain();
    }
~~~

* Avoid double negatives.

~~~
// Bad.
isNotError, isNotFound are unaccept

// Good
isError, isFound, accept
~~~

* Use **singular** names for **namespaces**.

~~~
// "member", not "members"
var kFullName = config.constants.member.FULL_NAME;
~~~

**Exception**:

One exception to this rule is the use of **constants** (*as above*), and **enums**, in order to differentiate them from *constant* and *enum* keywords.

* Use **plural** names for **collections**.

~~~
// "members", not "member".
var members = getOnlineMembers();
~~~

~~~
// Any variable that refers to a **Dictionary** or a **Collection** is plural.
var suites = new foo.bar.baz.SuiteCollection();

suites.add(new Bat());

// If the variable is a single representative of that **Dictionary/Collection**,
// then it is singular.
var suite = suiteFactory.create();
~~~

* Use **camelCase** for **method names** and **member names**, use **ALL_CAPS** for **constants**.

~~~
function getUserInfo(){}

function renderNewLoginForm(){}

var config = {
    constants: {
        memberRegistrationStatus: {
            REGISTERED: 3,
            WAITING_APPROVAL: 1,
            NOT_INITIALIZED: 0
        }
    }
};
~~~

* Use **camelCase** for **acronyms**.

~~~
// Incorrect.
config.constants.methodName.WCF.INSERT;

// Correct.
config.constants.methodName.wcf.INSERT;

// Incorrect.
getDOMNode();

// Correct.
getDomNode();

// Incorrect.
stringHelper.HTMLEncode();

// Correct.
stringHelper.htmlEncode();
~~~

* Use **lowercase** for **event handler** references.

~~~
// Incorrect.
var onComplete = globalCompletionCallback || o2.nill;

// Correct.
var oncomplete = globalCompletionCallback || o2.nill;
~~~

* Use **PascalCase** for constructors, **camelCase** for static **object literals**.

~~~

// Incorrect.
o2.ConnectionPool = {
    isActive: function() {}
};

log(o2.ConnectionPool.isActive());

// Correct.
o2.connectionPool = {
    isActive: function() {}
};

log(o2.connectionPool.isActive());

// Incorrect
o2.connectionPool = function(state) {
    this.state = state;
};

var pool = new o2.connectionPool();

// Correct.
o2.ConnectionPool = function(state) {
    this.state = state;
};

var pool = new o2.ConnectionPool();
~~~

* Use **lowercase** for **module** names, **camelCase** for **namespaces**.

~~~
// 'excellentmodulename' all lowercase.
var excellentModule = import('o2.excellentmodulename');

// Namespaces are camelCase.
var dataTypes = excllentModule.config.constants.applicationState.dataTypes;
~~~

* **Be consistent** in naming your methods; do not give different names to two methods which are essentially doing the same thing.

* Abbreviations and acronyms **SHOULD NOT** be UPPERCASE when used as a name.

~~~
getInnerHtml(), getXml(), XmlDocument
~~~

**Summary**:

~~~
variables, objects, functions      : camelCase ( getStatusRecord() )
private variables, private methods : camelCase
public variables, public methods   : camelCase
enums and global constants         : ALL_CAPS
local/global constants             : prefix with k ( kPipeTimeout )
Parameters                         : camelCase
Objects and Constructors           : PascalCase
Modules/Packages/Namespaces        : lowercase
Methods                            : camelCase
~~~

Some more examples:

~~~
// Local constant.
var kActiveProvider = enums.providerType.TWITTER;

// Do not start functions other than constructors with UpperCase.
function user(){}

// Incorrect.
var john = new user();

function User(){}

// Correct.
var john = new User();

// Incorrect.
function GetAccountDetails() {
    ...
}

// Correct.
function getAccountDetails() {
    ...
}
~~~

### Avoid Using `continue` Statement

Avoid using `continue` statement. It tends to obscure the control flow of the function.

~~~
// Incorrect.
for (i = 0; i < len, i++) {
    if (i === maxLength) {
        doAction();

        continue;
    }

    doStuff();
}

// Correct.
for (i = 0; i < len, i++) {
    if (i === maxLength) {
        doAction();
    } else {
        doStuff();
    }
}
~~~

### Return Early, Return Often

Early returns promote code readability with negligible performance impact, if any.

Instead of this&hellip;

~~~
function returnLate(foo) {
    var ret;

    if (foo) {
        ret = 'foo';
    } else {
        ret = 'bar';
    }

    return ret;
}
~~~

do this:

~~~
function returnEarly(foo) {
    if (foo) {
        return 'foo';
    }

    return 'bar';
}
~~~

### Group Related Statements Together Using Parentheses (`(&hellip;)`)

Although `&&` has precedence over `||`, mixing them together without grouping may decrease readability.

~~~
// Incorrect.
return obj !== undefined && obj !== null && klass === type;

// Correct.
return (obj !== undefined) && (obj !== null) && (klass === type);
~~~

### Variable Initialization

* **Do not** assign default values to variables that are initialized later in the code.

~~~
// Incorrect.

    var cache = [];

    ...

    cache = o2.Array.copy(jsonResponse.list);

// Correct.

    var cache;

    ...

    cache = o2.Array.copy(jsonResponse.list);
~~~

* Use a single `var` statement for variable declarations; write initialized variables first, then uninitialized variables. Keep uninitialized variables in a **single line**.

~~~
var kArguments = 'Arguments',
    now = (new Date()).getTime(),
    i, j, counter;
~~~

Also, declare unassigned variables last. This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

* Do Not Align Equals For Anything

~~~
// Incorrect.

    /*
     * EcmaScript Types
     */
    var kArguments = 'Arguments';
    var kArray     = 'Array';
    var kBoolean   = 'Boolean';
    var kDate      = 'Date';
    var kFunction  = 'Function';
    var kNumber    = 'Number';
    var kObject    = 'Object';
    var kRegExp    = 'RegExp';
    var kString    = 'String';

// Correct.

    /*
     * EcmaScript Types
     */
    var kArguments = 'Arguments',
        kArray = 'Array',
        kBoolean = 'Boolean',
        kDate = 'Date',
        kFunction = 'Function',
        kNumber = 'Number',
        kObject = 'Object',
        kRegExp = 'RegExp',
        kString = 'String';
~~~

* Declare logically and functionally related variables and methods close to each other.

> Related chunks of code should be grouped together.

### Avoid "Yoda Conditions"

> [Yoda][yoda] was a great teacher except for his word sequence.

**Yoda conditions** is basically using `if (constant === variable)` instead of `if(variable == constant)`. Because it's like saying "Much to learn, you still have."

The main reason of using **Yoda conditions**, is to avoid mistaken left hand side assignments like `if (value = 42)` (instead of `if (value == 42)`). However, [JSHint][jshint] already checks your code against these (and many other) errors.

So you need not make your code harder to read. Avoid Yoda conditions and integrate [JSHint][jshint] into your build process &ndash; that's enough.

Instead of this&hellip;

~~~
// "If connected is result's status" (harder to read and follow).
if (CONNECTED === result.status) {
    ...
}
~~

do this:

// "If result's status is connected" (much easier).
if (result.status === CONNECTED) {
    ...
}
~~~

### Avoid **"Stringly Typed"** Code

Your code should not needlessly rely on **String**s, when there are programmer and refactor friendly options are available:

Pass numeric literals, or enums as method parameters, rather than strings.

> Excessively **stringly typed** code is usually a pain to understand, and detonates at production with errors that [JSHint][jshint] would normally find.

It is also darn hard to refactor a **stringly typed** codebase.

A starting point may be creating constants for commonly used string literals and use those constants instead of the strings themselves.

### Always Use Strict Comparison

Strongly-typed languages such as Java and C# consider two values to be equal if and only if they are equal both by *value* and by *type*. **JavaScript** equality operator (`==`), however, enables *type coercion* when comparing different types. Although the rules of coercion are deterministic and strictly defined, the issue creates some [confusion][equal-or-not], to say the least.

~~~
// This evaluates to `false`.
'Samurai' == false;

// This evaluates to `false`, too.
'Samurai' == true;
~~~

To avoid confusion and logic errors, always use strict equality and inequality operators.

~~~
// Incorrect.
if (a == b && c != d) {
    doStuff();
}

// Correct.
if (a === b && c !== d) {
    doStuff();
}
~~~

**Exception**:

You can use `==` to compare for "null or undefined".

~~~
// This works.
if (a === null && a === undefined) {
    doStuff();
}

// This is equivalent, and better.
if (a == null) {
    doStuff();
}
~~~

### Prefer Delegation Over `switch\case`

Instead of this&hellip;

~~~
switch (state) {
    case 'alpha':
        doAlphaStuff();

        break;
    case 'beta:
        doBetaStuff();

        break;
    default:
        doDefaultStuff();
        break;
}
~~~

do this:

~~~
var cases = {
    alpha: function() {
        ...
    },

    beta: function() {
        ...
    },

    fallback: function() {
        ...
    }
};

if (cases[type]) {
    cases[type]();
} else {
    cases.fallback();
}
~~~

This will promote code reuse; and it will be optimized for speed in modern browsers, too.

### File, Folder and Path Naming

Use **lowercase** for *files*, *folders* and *paths*.

~~~
// Incorrect.
/wwwRoot/Script/mainController.js

// Correct.
/wwwroot/script/maincontroller.js
~~~

### File Headers

Each file (*module*) should have a descriptive header.

The *module* header should also be in [YUIDoc Format][yuidoc]:

~~~
'use strict';

/*
 *  This program is distributed under the terms of the MIT license.
 *  Please see the **LICENSE.md** file for details.
 */

/**
 *  An `XMLHttpRequest` helper module.
 *
 * @module o2.ajax
 * @requires o2.string
 */
~~~

### Show Love to Your Curly Braces

* Use curly braces, even when they are not strictly necessary.

~~~
// It's not clear which 'if' belongs to which 'else'.
if (b1) if (b2) foo(); else bar();

// This is better.
if (b1) {
    if (b2) {
        foo();
    } else {
        bar();
    }
}

// Incorrect.
function method() {
    for(int i = 0; i < 10; i++)
        if (i != 0)
            foo();
}

// Correct.
function method() {
    for (int i = 0; i < 10; i++) {
        if (i != 0) {
            foo();
        }
    }
}
~~~

* Put statements' curly braces to a new line, even if the block is empty.

> Ideally you should put **audit logs** inside those empty blocks.

~~~
// Incorrect.
try {
    process(text);
} catch (ignore1) {}

// Correct.
try {
    process(text);
} catch (ignore1) {
}

// Much better.
try {
    process(text);
} catch (ignore1) {
    log(ignore1);
}
~~~

**Exception**:

Keep `return`s from [guard clauses][guard] on the same line.

~~~
// Incorrect.
function transform(text) {
    if (!text) {return false;}

    if (typeof text !== 'string') {return false;}

    return text.toUpperCase();
}

// Correct.
function transform(text) {
    if (!text) {return false;}

    if (typeof text !== 'string') {return false;}

    return text.toUpperCase();
}
~~~

### Function Headers

Each function declaration should have a documentation header. If the function is publicly accessible it should have a [YUIDoc][yuidoc] header; if the function is private to the module it should also have a header.

~~~
// # Private Function

/*
 * Checks whether two nodes are equal to one another.
 */
function isNodeEquals(node, until) {
    if (!node) {return false;}

    if (!until) {return false;}

    return $(node) === $(until);
}

// # Public Function

/**
 * An implementation of the `Observer.addObserver` method.
 *
 * Registers an `Observer`.
 *
 * This method is **protected**, in a sense that it's not
 * meant to be called directly. {@link o2.ajaxcontroller} and
 * {@link o2.jsonpcontroller} use it indirectly to register themselves.
 *
 * @method {protected static} o2.ajaxState.addObserver
 *
 * @param {Object} observer - the `Observer` to register.
 */
exports.addObserver = def(me, 'addObserver', function(observer) {
    if (hasObserver(this, observer)) {return;}

    var observers = getObservers(this);

    observers.push({
        object: observer,
        meta: {
            registrationTime: (new Date()).getTime(),
            timeout: (observer.timeout || null)
        }
    });
});
~~~

### Default Fallbacks

All `switch/case`s should have a `default:` exit point. That last fallback should at least have a log statement.

> Additionally, you should [prefer delegation over switch/case][delegation-over-switch].

All `if/else` chains should have an `else` in the end. That last else should at least have a log statement.

~~~
if (answer == 'no') {
    alert('You said no');
} else if (answer == 'yes') {
    alert('You said yes');
} else {

    // This block should be here, even if we do not
    // care about any outcome other than 'yes' or 'no'.
    assert('I should not be here');
}
~~~

> The `if/else` chains can, too, be [converted to a delegator][delegation-over-switch].

**Exception**:

A single `if` statement may not be regarded as an if-else *"chain"*, so it's okay to leave single `if`s without an `else`.

~~~
if (controller.isLoadingTemplates()) {
    return;
} /*else {
    log('controller has more templates');
} -- not required -- */
~~~

### Boolean Comparisons

**DO NOT** directly compare with **true**, or **false**.

~~~
// Incorrect.
while(condition === false)

// Incorrect.
while(condition !== true)

// You got the point.
while(((condition === true) === true) === true)

// Correct.
while(condition)
~~~

### Variable Access

* **DO NOT** access the same variable more than once.

~~~
v[i] = ++c;  // OK.
v[i] = ++i;  // Incorrect. Misleading.
i = i + 1;   // OK.
i = ++i + 1; // Incorrect an unnecessary;
             // i += 2 should have been better.
~~~

* Aim to minimize the scope of variables. Use as little global variables, global configuration data, and global functions as possible. Use **modules** and **namespaces** to achieve that.

### Statement Termination

* Always terminate statements with a semicolon (`;`).

~~~
// Incorrect.
var i = 10

// Correct.
var i = 10;

// Incorrect.
var test = function() {
}

// Correct.
var test = function() {
};
~~~

---

## o2.js **JavaScript** Coding Best Practices

### **[JSHint][jshint]** Your Code

**[JSHint][jshint]** is a **must-have** great tool written in **JavaScript** that allows you to validate your **JavaScript** code against a set of best practises.

> [JSHint][jshint] is a *less* opinionated, more flexible, **JavaScript** static code analysis tool, which is far more open future enhancements, suggestions, comments, and recommendations.

[JSHint][jshint] your code to prevent bugs and surprises creep into it.

Automate the usage of **[JSHint][jshint]** by integrating, **[JSHint][jshint]** validation to your web application's build & deployment cycle.

The **[JSHint][jshint]** validation preferences used in **o2.js** are as follows:

~~~
{
    "bitwise": false,
    "curly": true,
    "eqeqeq": true,
    "forin": true,
    "immed": true,
    "indent": 4,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "noempty": true,
    "nomen": true,
    "nonew": true,
    "onevar": true,
    "plusplus": false,
    "quotmark": "single",
    "regexp": true,
    "strict": true,
    "undef": true,
    "unused": true,
    "white": true,
    "trailing": true,
    "node": true,
    "maxlen": 80
}
~~~

See also [.jshintrc][jshint-docs].

### **Event Handler** Naming Convention

User **handleTargetNameEventName** format for event handlers.

~~~
function handleConfirmButtonClick(evt) {
    ...
}

functions handleMasterContainerReadyStateChange(evt) {
    ...
}

eventHandler.addEventListener(
    item,
    'readystatechange',
    handleTesterReadyStateChange
);

eventHandler.addEventListener(
    confirmButton,
    'click',
    handleConfirmButtonClick
);
~~~

The same convention is true for custom events, too.

~~~
DemoWidget.on('init', handleDemoWidgetInit);
~~~

or&hellip;

~~~
DemoWidget.on('init', widgetCallback.handleDemoWidgetInit);
~~~

When used as function pointers event handlers start with **on**, and they should be **all lowercase**.

~~~
var ondocumentmousedown = EventCallback.handleDocumentMouseDown;

...

ondocumentmousedown.apply(this, [evt]);
~~~

Any custom event of an object also starts with **on** on and is **all lowercase**.

~~~
var Selectable = function(params) {
    ... stuff ...

    // We register the handler on constructor.
    // Note that the assigned method name (this.onselectionchange)
    // and the parameter name (params.onselectionchange)
    // are both all lowercase.
    this.onselectionchange = params.onselectionchange;
};

Selectable.prototype.doSomeAction = function() {
    ...

    // Also note that we send the even source and additional event
    // arguments to the event handling delegate as parameters.
    // This is also a nice convention to stick with.
    this.onselectionchange.apply(this, [source, eventArgs]);
};

// Note that we still use **handleEventName** when we attach the
// event handler to an **instance** of this object.
var venueSelection = new Selectable({container : 'venueListDiv'});
venueSelection.onselectionchange =
    WidgetCallback.handleVenueSelection;
~~~

The same is true for **AJAX/JSONP/CORS&hellip;** callbacks.

~~~
// "user deletion" is an "action", not an "object", so its callback is
// handleUserDeleteSuccess and NOT userDelete_success
jsonp.get('/server/api/v1', {params}, ApiCallback.handleUserDeleteSuccess);
~~~

### Store Your Code in Meaningful Folder Structures

The naming conventions should also apply to your folders. Split up your code in **logical groups** and store it in folders that describe **what they contain**.

This will make it much easier to keep your code-tree organized and scale it to thousands of files without hindering your ability to get to specific files quickly.

* Group your source files in **logical groups**.

* Keep your folder names **consistent** throughout the project.

* Use your naming convention recursively inside of your sub-folders.

### Show Love To the **[Module Pattern][module-pattern]**

[Modules][module-pattern] are simply self-executing function literals. They create their own *private* **static** context, and encapsulate the business logic inside. This will (*in theory*) enable developers safely write their own code, without affecting the code that others have been developing.

> **o2.js** sources are **[CommonJS][commonjs]** modules, which are converted to **[AMD][amd]** modules for client-side use.

### Do Not Pollute The Global Namespace

**Avoid using public variables and public functions at all costs**.

Global variables and functions are rarely, if ever, required.

Using globals cause naming conflicts between **JavaScript** source files and cause code  to break unexpectedly. For this reason, it is a good practice to encapsulate functionality within **[modules][amd]**.

### **Avoid** *sync* AJAX Calls

When making **AJAX** requests, you may choose either async or sync mode.

Async mode runs the request in the background while other browser activities can continue to process.

Sync mode will wait for the request to return before continuing.

**Requests made with sync mode should be avoided**. These requests will cause the browser to lock up for the user until the request returns. In cases where the server is busy and the response takes a while, the user's browser will not allow anything else to be done. In cases where a response is never properly received, the browser may continue to block until the request is timed out.

If you think that your situation requires sync mode, it is most likely time to re-think your design. Very few (if any) situations actually require AJAX requests in sync mode.

### Show Love to **[JSON][json]**

**[JSON][json]** (**JavaScript** Object Notation) is compact and efficient data format, and is language-neutral.

When storing data structures as plain text or sending/retrieving data structures via AJAX, use **[JSON][json]** (instead of XML or other formats) whenever possible.

### Use Namespaces and Break Code Into Modules

> Modules, *modules*, **modules**.
> **NOT**
> functions, *functions*, **functions**!

### Avoid "God Objects" And "God Methods"

Each method **SHOULD** have one, and only one, clearly defined task. If a method is doing more than one thing, it should be **divided** into **subroutines**.

Program your functions atomically. Aim to reduce [cyclomatic complexity][complexity].

While writing a method the following should be taken into consideration:

* The accepted input ranges, and data types;
* Return values and their meanings;
* Error conditions, exceptional cases, and how they are handled;
* And whether the method has any [side effects][pure-functions].

> A function with no side effects is a function that always returns the same value given the same arguments, and never changes the internal global state (*MODEL*), or the application's look & feel (*VIEW*). It takes some arguments, returns a value based on these arguments, and do not monkey around with anything else.

### Strive for **Harmony** and **Symmetry** in Your Code

This is hard to demonstrate as it's more of a conceptual thing.

Let us try to explain it with a few bullet points:

* It should be easy to identify a method name, which folder a module resides in;
* It should take no more than a few seconds to identify where to write a piece of code;
* If a module registers an object, that very same module should unregister it.

This intuition can only be gained in time, with patience and tireless practice.

> Use the force, and find harmony you will.

### **DO NOT** Rely on Type Information While Naming Variables

Strive **NOT TO** include type information in variables.

Variables should be understandable by their behavior (*semantics*), **NOT** by their type.

Incorrect:

~~~
var eventType = framework.EventType;
var kAddBuddyEventType = eventType.ADD_BUDDY;

var itemArrayList = new ArrayList();

o2.events.mouse.MouseEventHandler;
~~~

Correct:

~~~
var eventType = framework.EventType;

// `kAddBuddy` "is an" eventType, no need to repeat that information. Be DRY.
var kAddBuddy = eventType.ADD_BUDDY;

// `items` "is an" array list, no need to repeat the information. Be DRY.
var items = new ArrayList();

// Type of the event handler is implied in the module name, or namespace. Be DRY.
o2.events.mouse.Handler;
~~~

Similarly don't start variables with `o_`, `obj_`, `m_` etc.

> A variable does not need tags which states it is a&hellip; well&hellip; "variable".

**Exception**:

If there are two similar variables, we may want to include type information instead of renaming those variables, as in the following case:

~~~
var kDomLoaded = 'domloaded';
var kDomLoadedRegExp = /domloaded/g;

var kUsername = 'user name';
var kUsernameFieldId = 'txtUsername';
~~~

Also, if adding type information conveys an additional meaning which decreases ambiguity, clarifies meaning, and makes the code *easier to follow*, then it's okay to include type information in variable names. &ndash; So, **use your own judgement**.

Variable names for UI elements are generally good examples for this.

~~~
// It's not clear what "cancel" refers to. A method, or a boolean flag?
var cancel = document.getElementById('btnCancel');

// This is better: more explanatory, and easier to follow.
var cancelButton = document.getElementById('btnCancel');
~~~

**Exception**:

Classes/constructors **MAY** be named based on their inheritance pattern, with the base class to the right of the name.

Instances of these classes/constructors **SHOULD NOT** have the type information in them.

~~~
// Acceptable.
EventHandler;
UiEventHandler;
MouseEventHandler;

// Incorrect.
var uiEventHandler = new UiEventHandler();

// Correct.
var handler = new UiEventHandler();
~~~

### Always Respect Type

**JavaScript** is a dynamically typed language, which can be your best friend or worst enemy, so **always respect type**.

Always use equality with type ( `===` and `!==` ) when comparing variables and statements.

If you know the type of an input variable beforehand explicitly cast it before using it.

Here's an example:

~~~
var userCount = document.getElementById('uc').value;
~~~

~~~
// 1. Defensively parse the value using parseInt
// 2. use === for comparison.
if (parseInt(userCount, 10) === MAX_ALLOWED_USER_COUNT) {
    doStuff();
}

// Or...

// The unary operator + will convert its rigth-side operand into a number.
if (+userCount === MAX_ALLOWED_USER_COUNT) {
    doStuff();
}
~~~

### **DO NOT** Mix **HTML** and **JavaScript**

Use a template engine. Don't mix **HTML** markup within **JavaScript** code.

### **DO NOT** Use Inline **JavaScript** Events

Using inline **JavaScript** events along with a server-side template (like *[smarty][smarty]*, for instance), is a dangerous mix that may leave your code prone to "**script injection**" attacks.

**Event overriding** is yet another reason to avoid using inline **JavaScript** (i.e., `onclick=""`s):

The way inline event handlers work is called **"DOM Level 0 Events"** (`<a href="javascript:void()" onclick="foo();return false">...</a>` ... yuck!).

The issue with *DOM Level 0* events is that you can only assign a single event handler to a node. &ndash; With [unobtrusive **JavaScript**][unobtrusive] and [behavioral separation][separation], however, you actually assign event handlers to a higher level (**DOM Level 2** to be exact). This allows for multiple event handlers to be assigned to one event.

> [Behavioral separation][separation], is actually far more than that, but that's the topic of another story.

One of the big powers of **JavaScript** is that it can be isolated in a separate file. Much like CSS, this means you can apply one collection of functions to every page of the site, and if you need to change the functionality, you can do that in one document rather than going through and replacing each **onclick** event on every single template.

> Don't be a lazy `b****`, and **decouple** your **JavaScript**!

 **Coupling is bad**, and we know it.

* We **decouple** our data access from our views;
* And we **decouple** our services from each other.

We try to keep coupling to a minimum in every piece of code we write&hellip;

This should be same for **JavaScript**, too.

Coupling of our **JavaScript** to markup prevents you from changing your markup without addressing your **JavaScript** as well.

In short;

* Separate **CSS** from **HTML** (no `<style></style>` tags, no `style=""` attributes).
* Separate **JavaScript** from **HTML** (no `<script>...</script>`s, no `onclick=""`s, no `onkeydown=""`s, or God forbid, no `href=javascript:"`s ...)
* Separate **HTML** from **JavaScript** (no **HTML tag soup** within **JavaScript**; use **templates** instead).
* Separate **PHP** (*or the server-side language of your choice*) from **JavaScript** (**PHP** should not spit out thousands of lines of server-generated **JavaScript**).

### Use Event Delegation

**DO NOT** register every single click event, on every single object.

When there are large numbers of objects, which the application has to listen and respond to, hanging around, adding an event handler to each and every single one of those objects will have a **huge** impact on **performance** and **memory utilization**.

Use [event delegation][delegation] instead.

[Event delegation][delegation] is **faster**, **scalable**, and **easier to maintain**.

### Use Event-Driven Programming

Use [event-driven programming][event-driven]. Web apps will **always** be event driven.

You're either responding to a **user event**, or a **system event**.

Architect and program your components as such.

### Avoid **Magic Strings** And **Magic Numbers** Like Plague

Use **symbolic constants** for **numeric literals** and **string literals**.

The below example is problematic.

~~~
var j = 0;

for(var i=0, len=52, i<len; i++){
    j = i + getRandomInt(53 - i) - 1;

    swapDeck(i, j);
}
~~~

Here's why:

What if we wish to use a deck size of 114 (2 decks). You can say that we can find/replace all "52"si with "114"s and we're done. But even a mass find/replace will not be able to catch the number 53 in the 3<sup>rd</sup> line, and it will pop-up as a logic error which we will hardly be able to find out.

> The **rule-of-thumb** should be to store anything that's prone to change (**numbers**, **parameters**, **strings**) in either symbolic constants or in **shared static public configuration "struct"s** as constant members.

Here's the correct way of doing the above deck shuffling:

~~~
var kDeckSize = 52,
    i, j;

for (i=0, len=kDeckSize, i<len; i++){
    j = i + getRandomInt(kDeckSize + 1 - i) - 1;

    swapDeck(i, j);
}
~~~

Moreover, if there's a relation between two symbolic constants, this relation should be **explicitly indicated**.

~~~
var kMaxItems = 32,
    kHighWaterRank = (3 * kMaxItems) / 4; //instead of 24.
~~~

### Use **Event Constants**

Related to the above item, instead of using string literals for registering events.

Instead of this&hellip;

~~~
listen(document, 'click', function(evt)) {
    ...
});
~~~

prefer to use a event constant as follows:

~~~
var kClick = 'click';

... other initialization ...

listen(document, kClick, function(evt) {

});
~~~

**Event constants** provide an easy way to refer to specific event types. Using a constant instead of the String value helps us identify typographical errors more quickly. If we misspell a constant name in our code, the **JavaScript **parser will catch the mistake.

On the other hand, if we misspell the event String as in `listen(document, ‘click1‘, function(evt) {`, the event handler will be registered for a type of event that will never be dispatched (*i.e., "click1"). And we’ll spend hours of your development time, trying to debug what went wrong.

In addition to that, assigning commonly-used strings to constants will help in **minification** and **obfuscation** of our **JavaScript** code.

### Decouple Objects and Minimize Variable Scope

Objects and methods should have as little information about each other as possible. That's the major motivator behind **object-oriented programming**.

Minimize variable scopes. Use the [module pattern][module-pattern].

> The larger the scope of the variables, the harder it is to maintain the code.

*Avoid* global variables and global methods at all costs.

### Replace **Temporary Variables** with **Query Methods**

Chaining temp variables with query functions, **reduces** the number of variables used in the code, and **decreases** the possibility to make an error.

> This usage might have a slight performance impact, which can be overcome by [memoization][kung-fu].

Compare this&hellip;

~~~
var basePrice = quantity * itemPrice;

...

// base price can be overridden anywhere in the code.

if (basePrice > 1000) {
    return basePrice * 0.95;
} else {
    return basePrice * 0.98;
}
~~~

Against this:

~~~
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
~~~

### Keep it **DRY**

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

Don't Repeat Yourself (DRY) is a principle of software development aimed at reducing repetition of information of all kinds.

The principle has been formulated by Andy Hunt and Dave Thomas in their book [The Pragmatic Programmer][pragprog].

When the **DRY** principle is applied successfully, a modification of any single element of a system does not require a change in other logically-unrelated elements. Additionally, elements that are logically related all change predictably and uniformly, and are thus kept in sync. This also means [favoring **high cohesion** over **low coupling**][cohesion].

### Program Defensively

Adhere [defensive programming][defensive] best-practices.

All functions should work according to a given [contract][contract].

Their **in/out parameters**, expected and unexpected **value ranges**, **side-effects**, **error** and **exception** situations etc. **SHALL** be designed **before** writing the code.

Use [guard-clauses][guard] to avoid unexpected conditions.

> Return early, return often.

### **Exception**s Are For "**Exceptional**" Cases

Exceptions are expensive. Using a nested structure of `try/catch`s will increase the depth of the execution scope, which may slow down your code.

Throw exceptions only in exceptional cases. If you know what's going on ("operation completed", "connection error", "end of stream"... etc) use return codes instead of throwing exceptions.

Besides, hiding surprises inside `try { stuff() } catch (ignore){ }` kind of constructs, will result in logic errors that are hard to find.

> `try/catch` !== **CYA**

Use `try/catch`s only if there's something out of your control (a plugin, a custom user code that's late-bound and delegated, a queue structure where all the items should be processed even if some of the items do generate errors).

These cases are rare and **exceptional**.

> Functions shall not throw exceptions; they should return meaningful error-codes instead.

#### **DO NOT** Manage Your Business Logic With Exceptions

This is a corollary to the above topic.

Don't manage business logic with exceptions. Use **conditional statements** instead.

> Each `try/catch` block comes with it's own scope of execution. And increasing the depth of execution scope will make your application slower. If a control can be done with if-else statement clearly (e.g., null control, divide by zero control), don't use exceptions because it reduces performance and readability.

### Avoid `try/catch` Within a Loop

This is a corollary to the former topic

~~~
// Bad.
while(check()) {
    try {
        foo();
    } catch (e) {
        log(e);
    }
}

// Better.
try {
    while(check()) {
        foo();
    }
} catch (e) {
    log(e);
}

// Best
var result;
while(check()) {
    result = foo();

    if (!result) {
        log(result);

        break;
    }
}
~~~

#### **DO NOT** Ignore Exceptions

Don't absorb exceptions with no logging and operation. That is to say, **do not** use something similar to this:

~~~
try {
    doStuff();
} catch (ignore) {
    // Do nothing, just ignore.
}
~~~

Instead do this:

~~~
try {
    doStuff();
} catch (ignore) {
    log(ignore);
}
~~~

There are *very* rare exceptions to this.

Here is a code from **o2.ajax.js** that does not log an exception on purpose:

~~~
// In the below code sample, the flow exits after
// the first successful initialization of the `request` object.

while (progIds.length > 0) {
    progId = progIds.shift();

    try {
        request = new ActiveXObject(progId);

        break;
    } catch (ignore) {
    }
}

if (!request) {
    throw kNoXhr;
}
~~~

99% of the time, your code is not *that* exceptional.

**Log your exceptions whenever you can**.

Ignoring exceptions will save that moment but will create a chaos for maintainability later.

> When you do use `try/catch` blocks, remember to log the errors in `catch` and clean up state and resources in `finally`.

#### **DO NOT** Use `try/catch` Within Loops

This is a corollary to the above topic. Exception handling inside a loop is not recommended for most cases. Surround the loop with a `try` block instead.

So instead of this&hellip;

~~~
while(condition) {
    try {
        stuff();
    } catch (e) {
        log(e);
    }
}
~~~

do this:

~~~
try {
    while(condition) {
        stuff();
    }
} catch (e) {
    log(e);
}
~~~

#### Clearly Document Exceptional Cases

Produce enough [documentation][yuidoc] for your exceptions. Giving a **number/code** for each different exception message is a good practice for **ease of maintenance**.

#### Good Boys Clean Their Mess

When you use exceptions always clean up resources and perform this in `finally` blocks.

Summary:

* `try { } catch { }` is an expensive construct in **JavaScript**.
* *DO NOT* use `try/catch`s within loops.
* *DO NOT* use nested `try/catch`es: Use one try-catch
at the topmost level.
* **AVOID** using `try/catch`es unless it's absolutely necessary.
* Always **clean up** & **deallocate** your resources & **reset** your state
in the `finally` block.

### Use The Force Wisely

**JavaScript** is for **enhancing** existing functionality.

[Enhance progressively][progressive], and ensure tha your application is usable at all times.

---

## Performance and Memory Considerations

Here are certain performance considerations, and guidelines to keep in mind when designing a highly interactive, mostly single-page, client-heavy, long-lasting (i.e., users will be on the same page for more than several hours) web application:

### Key Performance Indicators

While coding try to **minimize** the following:

* **Vertical complexity** (*i.e., how deeply nested the code is*)
* **Horizontal complexity** (*i.e., the number of lines per module/method*)
* **Token count**
* **Variable count**
* **Loop count**
* **Conditional count** (i.e., if/else/switch count)
* **Variable scope**

### Consider Using **Plain Old JavaScript** Methods Whenever Possible

`for(...)` is around 3 times faster than, take for example, jQuery's `$(this).each` (depending of the selector complexity, and the
collection size). There's no faster selector than `document.getElementById()`. `Function.call` and `Function.apply` are definitely faster than Prototype.js's `bind` method.

The fact that you have a framework at hand, does not mean you should excessively use it. Know (and learn) adequate **JavaScript**, to use native methods in performance-and-memory-critical parts of your code.

### Use `Array.prototype.slice` to copy an Array

~~~
// Bad
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// Good
itemsCopy = items.slice();
~~~

Same is true to convert an Array-like object to an `Array`.

~~~
function trigger() {
  var args = Array.prototype.slice.call(arguments);
  ...
}
~~~

### Use `Array.prototype.join` for string concatenation

This is an optimization targeted for **IE** only, [other user agents perform faster][concat-test] using good old string concatenation too. Even newer versions of IE and do array joins faster than adding strings together. And other browsers are pretty fast with array joins as well, so there is nothing to lose.

Here is an example of using `Array.prototype.join` to concatenate `String`s.

~~~
function inbox(messages) {
  items = [];

  for (i = 0; i < length; i++) {
    items[i] = messages[i].message;
  }

  return ['<ul><li>', items.join('</li><li>'), '</li></ul>'].join('');
}
~~~

### Minimize **Scope Chain** And **Namespace Lookup**

Instead of this&hellip;

~~~
var lSide = collection.subcollection.items.all.left,
    rSide = collection.subcollection.items.all.right;
~~~

do this:

~~~
// Each dot is an additional namespace lookup.
var all = collection.subcollection.items.all,
    lSide = all.left,
    rSide = all.right;
~~~

Things get worse, if the **collection** variable above is a **DOM Node** and the assignments are repeated in a `for` loop (both of which are not uncommon situations).

### Use **Function Pointers**

Instead of this&hellip;

~~~
function iterateOverMe(){
    for (var i = 0; i < 1000; i++) {
        lorem.ipsum.dolor.sit(i);
    }
}
~~~

this is much faster:

~~~
function iterateOverMe() {
    var sit = lorem.ipsum.dolor.sit;

    for(var i = 0; i < 1000; i++) {
        sit(i);
    }
}
~~~

As a side note, the first time a **function** is declared is more expensive than its consecutive declarations, because the initial declaration both involves **namespace lookup** and **creation**; while the latter only involves **creation**.

~~~
//namespace lookup & creation;
var fnPtr = lorem.ipsum.dolor.sit;

//second decleration is faster -- just namespace lookup.
var fnPtr2 = lorem.ipsum.dolor.sit;
~~~

The more you reduce namespace lookups, the faster your code will be.

### Add Complex DOM Subtrees Offline

Instead of this&hellip;

~~~
function tableTest() {
    var numRows = 10,
        numCells = 5,
        tableEl, rowEl, cellEl;

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
~~~

this is much faster:

~~~
function tableTest() {
    var numRows = 10,
        numCells = 5,
        tableEl, rowEl, cellEl;

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
~~~

### Edit Complex DOM Subtrees Offline

Instead of this&hellip;

~~~
function subTrees() {
    var ul = document.getElementById('myUL');

    for (var i = 0; i < 200; i++) {
        ul.appendChild(document.createElement('LI'));
    }
}
~~~

this is much faster:

~~~
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
~~~

### Cache the DOM Collection Length

Instead of this&hellip;

~~~
function nodeJam(){
    nodes = document.getElementsByTagName('P');

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].innerHTML += 'test';
    }
}
~~~

this is faster:

~~~
function nodeJam(){
    nodes = document.getElementsByTagName('P');

    for (var i = 0, len = nodes.length; i < len; i++) {
        nodes[i].innerHTML += 'test';
    }
}
~~~

### Use [Memoization][kung-fu] for Computation-Intensive Functions

If your functions are deterministic, you can use [memoization][kung-fu], so that you don't need to do the same computations over and over again.

### Cache Frequently Used Global Methods And Objects For Speed

Last, but not the least, **always cache** global methods and object that you use within loops.

So instead of this:

~~~
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
~~~

This is faster:

~~~
function loopMePlease(){

    // Cache the global function.
    var fnDo = doStuff;

    for(var i=0; i<1000; i++){
        fnDo();

        // Also, a switch/case is (negligibly) faster
        // than an if-else chain
        switch (n) {
            case 12:
                someBlock();
                break;
            case 26:
                someOtherBlock();
                break;
        }
    }
}
~~~

Also it's a good practice to **cache DOM object collections**, because executing the same selectors over and over again to reach the same collection is resource intensive.

> The less you mess up with DOM, the better.

Instead of this&hellip;

~~~
select('div > li > a').show();
select('div > li > a').addClass('test');
select('div > li > a').click(function(){});
~~~

this is much faster:

~~~
var collection = select('div > li > a');

collection
    .show();
    .addClass('test');
    .click(function(){});
~~~

### Always Test Your Assumptions

This final remark is the most important of all:

Back in old days, it was preferred to use `Array.prototype.join` to build a template. And [it's not true for modern user agents][join-test] right now.

There are many examples similar to this.

> Always question your intuition; benchmark your assumption in several different platforms and take the most optimal solution.

Moreover, micro optimizations like might not be your actual performance bottleneck at all.

---

## Code Smells

Constantly follow these indicators, as they often show the quality (or lack thereof) of the code you're writing.

### Comments

There's a slight difference between comments that are explaining what's being done and comments that are overly confusing.

Comments should answer the question **"why?"**, not the question **"what?"** or **how?**.

If the number of "caveat" comments inside a code block is increasing, it may show that the code block is becoming more complicated.

If possible, the code should be refactored, so that those "caveat" comments are not necessary anymore.

Instead of explaining when to use comments, it would be better to show when not to use comments.

* Comments are **NOT** for stating the obvious.

Don't do this:

~~~
// Set the value of cache.
cache = value;
~~~

Another example of stating the obvious:

~~~
while(doStuff()) {
    // Do nothing.
    ;
}
~~~

* Comments are **NOT** for helping reader learn the language.

Don't do this:

~~~
// Iterate through collection.
for(var key in collection) {

    // Checks if the collection really has a property `key`.
    if(collection.hasOwnProperty(key)) {

        // Store the value into the cache.
        cache[key] = collection[key];
    }
}
~~~

**JavaScript** is the common denominator between the reader and the author. There are many references the reader can refer to to learn **JavaScript** &ndash; Let them do that. Assume that the reader knows **JavaScript** and let the code clearly describe **HOW**.

Use of comments is often a form of religion; people are very opinionated about them in one way or another. [Robert Martin][robert-martin] expresses his opinion in [Clean Code][clean-code] by saying:

> The proper use of comments is to compensate for our failure to express yourself in code. Note that I used the word failure. I meant it. **Comments are always failures**.

Robert Martin had previous described comments as **apologies** for **making the code unmaintainable**.

* Any comment is better than no comment at all

None the less comments **are** an integral part of the code, so they are really important.

A commentless code library will be useless in a short time with high probability. Even though there are approaches that suggest self-explanatory code over documentation, you should use both (self-explanatory code AND documentation).

* Use comments "as required".

Unnecessarily over-commenting in each line will reduce readability. Whereas lack of commenting will increase maintenance time.

* Write comments (e.g., **[YUIDoc][yuidoc]** declaration) for all public methods.

* Comment **HACKS** and **TODO**'s while you are writing the code.

Document "gotcha"s and "todo"s instantly when detected. These items may be remembered for that instant but may not for tomorrow when not documented.

> Do you remember what you ate for lunch 3 days ago? So don't be lazy and write those inline comments.

### Excessively Long Method Names

Explanatory method names are good.

Keeping everything constant, a shorter method name is easier to read and understand. Method names should be shortened, without losing their meanings. Method names should be shorter enough, but not too sort.

Besides a very long method name may be the indicator of a **God Function**, which should be avoided anyway.

If your function is named `doThisAndThatAndSomethingElse`, most probably you can split it into `doThis`, `doThat`, and `doSomethingElse` parts.

### Methods Having Too Much Parameters

* The more parameters a method has, the more complex it is.
* The more complex a method is, the more possible that it has more than one functionality.
* The more functionality a method has, the closer it is to a **God Function**.

And God Functions are **bad**.

If a method has too much parameters:

* Either reduce the number of method parameters,
* Or merge those parameters into a configuration object.

### Code Repetition (Copy &amp; Paste Code)

Seeing the same code over and over again is a clear indication of low code quality.

Repeating code, should be consolidated in **helper methods**. If the code is duplicated in different modules, then **a new helper module** should be created and both of the modules should the the new module's helper method instead.

### Conditional Complexity

If the code has a lot of `if/else` chains, nested `for`s `switch`es etc and it makes it harder to read the code; then it's time to **refactor** it.

### Codes Doing "almost" the Same Thing

Codes doing almost the same thing should be regarded as code repetition, and should be **refactored** accordingly.

### A Very Large Module / Function

If a module has grown too large, then it's most probably doing more than it's supposed to do.

If you have a swiss army knife module, then it's time to split it into sub-modules to make your code more manageable and less error prone.

### Function And Variables That Are Not Telling What They Do

Or worse, functions that are giving a message that's totally unrelated to what they do.

> Let's say we have a fictitious "executeIframeAjaxProxy" method which neither uses an iframe, nor makes an ajax call, and is not a proxy to something. It's not uncommon to see these badly-named methods, if the project is more than a few years old.

Those methods should immediately be **renamed*, in order to relieve the frustration that the next poor developer working on the code will have. Otherwise she'll be spending hours of valuable development time to figure out what the code does, or worse she'll be using the code with incorrect assumptions out of hassle.

If a method has a misleading name, **rename it**.

### Incoherent Naming

> Don't look at the thesaurus, and use a different synonym of "get" each time you use a getter method. You are not a linguist, you are a "developer". And part of your job is to give **boring** and **consistent** names to your methods.

Have a standard terminology in naming your methods and adhere to it.

Do not give different names to similar-behaving functions.

Here are a few examples:

* **createFoo**: Deterministic outcome.
* **generateFoo**: Probabilistic outcome.
* **renderFoo**: A complex visual change, usually involving some extra logic, or a rountrip to the server, to decide what to render.
* **showFoo/hideFoo**: a simpler visual change
* **processFoo/doFoo**: a batch (Façade) method that does several sub-tasks together.
* **getFoo**: gets a (usually primitive) value.
* **setFoo**: sets a (usually primitive) value.
* **computeFoo**: Something is computed.
* **findFoo**: Something is being looked up.
* **initializeFoo**: Something is created/conceptualized/established.

### Dead Code

If there's a code that's not working and not used anywhere; it should be removed from the code-base immediately. **Fear is the enemy of code stability**.

### Speculative Generalization

> Optimization without measurement is merely a waste of time.

First create a running prototype. Then test, optimize and benchmark your code **over and over again**.

### "I Did It, and It Worked" Style Of Approach

If you've solved a problem, you should clearly understand **why** and **how** you did it.

> For instance if a parameter is happening to be "null" then adding an "if not null" control is equivalent to sweeping the dust under the rug.

If the parameter is null or undefined, then you should find out **"why"** it's that way.

If you devise a solution without going to the bottom of the problem; sooner or later your so-called "solution" will stab you in the back.

### Temporary Variables

The more temporary variables in the code, the harder to manage it. Temporary variables should be replaced with query methods when possible.

### Global Variables

The more the number of global state variables in the code, the more dependent the modules are. And dependency means error-prone, and hard-to-manage code.

### Data Clusters

If you observe certain kind of data, variables, method etc, loosely lumping together in various parts of the code; then may be its better to take them and create a separate class.

### Cross-Module-Intimacy

Modules should now the least information possible about each other. Modules' public interface should be kept at a minimum.

**If you don't have a reason to keep a method public, than you had better make that method private.**

### Attribute Envy

If some methods of module A calls a lot of methods from module B, then may be those methods of module A should actually belong to module B. Consider a refactoring.

### Lazy Class

Any newly added class, adds to the complexity of the project. If a class is unable to hold its weight, i.e., it's not used enough, then it should be merged with other classes.

### Shotgun Surgery

If adding a single line of code, or extracting a single method requires changes in tens of unrelated methods and classes then the code needs some serious refactoring.

### Incomplete Library Class

The method should belong to a library, but it's currently the private method of an unrelated class. This is a **clear invitation to code repetition** in other classes.

The method should be taken out of the class and put into a library.

### Existence of Incomplete Code Blocks

**Never check-in incomplete/untested code**.

The source code in the repository, at any given time, **SHOULD NOT** contain any build errors, syntax errors, runtime errors, or logic errors.

This is only possible if **DO NOT** check-in garbage code.

> The source code repository is not your FTP backup place.

Only check in the code that you've **tested** (yes testing is *your* responsibility) and you are %100 sure that it works.

Keep in mind that the checked in code should be "ready for release" **at any time**.

### Code Grouping

When you see groups of code (usually denoted with a comment just before them), it's a smell that these code chunks belong to their own functions.

Instead of this&hellip;

~~~
// get list of forums
var forums = [];
r = getForumsSync();
while (r.hasMore()) {
    forums.push(r.next());
}

// load the templates
loadTemplate('header');
loadTemplate('forum_list', forums);
loadTemplate('footer');
~~~

do this:

~~~
function prepareForumList() {
    var forums = [];

    r = getForumsSync();

    while (r.hasMore()) {
        forums.push(r.next());
    }

    return forums;
}

function loadTemplates(forums) {
    loadTemplate('header');
    loadTemplate('forum_list', forums);
    loadTemplate('footer');
}

loadTemplates(prepareForumList());
~~~

---

## Conflicting Situations

Even the strictest set of rules and coventions may be vague under certain boundary conditions. Although coding has a lot of science and rules behind it, it is also a form of *art*.

To take this one step further, we'll consider code more like a *poem*, than a *newspaper article*. **Use your own judgement** for the vague boundary cases. It's your **art**, more than anybody else's.

## Other Conventions and Guidelines to Check Out

Here are a few well laid out **JavaScript** guidelines that you might want to have a look at:

* [idiomatic.js](https://github.com/rwaldron/idiomatic.js/)
* [jQuery **JavaScript** Style Guide](http://contribute.jquery.org/style-guide/js/)
* [AirBnB **JavaScript** Style Guide](https://github.com/airbnb/javascript)
* [DoJo **JavaScript** Style Guide](http://dojotoolkit.org/community/styleGuide)
* [Google **JavaScript** Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
* [Tait Brown's Front-End Dev Guidelines](http://taitems.github.io/Front-End-Development-Guidelines/)
* [Popular **JavaScript** Conventions on **GitHub**](http://sideeffect.kr/popularconvention/#javascript)
* [Aloha Editor Style Guide](http://aloha-editor.org/guides/style_guide.html)
* [Pragmatic.js Code Style Guidelines](https://github.com/madrobby/pragmatic.js)

---

## References and Further Reading

* [**o2js.com** &ndash; a Coherent Solution to your **JavaScript** Dilemma][o2js-com]
* [**JavaScript** the Good Parts][js-doug]
* [**JavaScript** Patterns][js-pattern]
* [Pro **JavaScript** Patterns][pro-js-pattern]
* [Pro **JavaScript** Techniques][pro-js]
* [High Performance Web Site Essentials][js-perf]
* [Maintainable **JavaScript**][maintainable-js]
* [**JavaScript** Web Applications][js-web-apps]
* [Smashing Node.JS][smash-node]
* [The Secrets of the **JavaScript** Ninja][js-ninja]
* [Human **JavaScript**][humanjs]
* [SuperHero JS][superhero]
* [**JavaScript** Books][js-books]
* [Travis][travis]
* [JSHint][jshint]
* [Lint Errrors][lint-errors]
* [**JavaScript** Module Pattern][module-pattern]
* [NPM][npm]
* [YUIDoc][yuidoc]
* [Behavioral Separation][separation]
* [**JavaScript** Event Delegation][delegation]
* [Event-Driven Programming][event-driven]
* [**JavaScript** Function Kung-Fu][kung-fu]
* [The Pragmatic Programmer][pragprog]
* [Cohesion and Coupling][cohesion]
* [Defensive Programming][defensive]
* [Design By Contract][contract]
* [Progressive Enhancement][progressive]
* [Clean Code][clean-code]

---

That's the end of this conventions document.

[Feel free to contribute][contribute].

[o2js-com]: http://o2js.com/
[contribute]: https://github.com/v0lkan/o2.js/blob/master/CONTRIBUTE.md
[js-doug]: http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742
[js-pattern]: http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752
[pro-js-pattern]: http://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X
[js-perf]: http://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309
[maintainable-js]: http://www.amazon.com/Maintainable-JavaScript-Nicholas-C-Zakas/dp/1449327680
[js-web-apps]: http://www.amazon.com/JavaScript-Web-Applications-Alex-MacCaw/dp/144930351X
[pro-js]: http://www.amazon.com/Pro-JavaScript-Techniques-John-Resig/dp/1590597273
[smash-node]: http://www.amazon.com/Smashing-Node-js-JavaScript-Everywhere-Magazine/dp/1119962595
[js-ninja]: http://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X
[humanjs]: http://humanjavascript.com/
[superhero]: http://superherojs.com/
[js-books]: http://jsbooks.revolunet.com/
[cowboy-coding]: http://c2.com/cgi/wiki?CowboyCoding
[ci]: http://en.wikipedia.org/wiki/Continuous_integration
[travis]: https://travis-ci.org/
[jshint]: http://jshint.com/
[lint-errors]: http://jslinterrors.com/
[module-pattern]: http://o2js.com/2011/04/24/the-module-pattern/
[npm]: http://npmjs.org/
[commonjs]: http://requirejs.org/docs/commonjs.html
[es6]: http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts
[yuidoc]: http://yui.github.io/yuidoc/
[o2doc]: http://o2js.com/documentation
[grunt-uglify]: https://github.com/gruntjs/grunt-contrib-uglify
[replace-temp]: http://martinfowler.com/refactoring/catalog/replaceTempWithQuery.html
[yoda]: http://en.wikipedia.org/wiki/Yoda
[equal-or-not]: http://o2js.com/2011/04/27/to-equal-or-not-to-equal-thats-the-problem/
[guard]: http://c2.com/cgi/wiki?GuardClause
[delegation-over-switch]: #prefer-delegation-over-switchcase
[jshint-docs]: http://www.jshint.com/docs/
[amd]: http://requirejs.org/docs/whyamd.html
[json]: http://www.json.org/
[complexity]: http://en.wikipedia.org/wiki/Cyclomatic_complexity
[pure-functions]: http://en.wikipedia.org/wiki/Functional_programming#Pure_functions
[smarty]: http://www.smarty.net/
[unobtrusive]: http://en.wikipedia.org/wiki/Unobtrusive_JavaScript
[separation]: http://www.alistapart.com/articles/behavioralseparation
[delegation]: http://icant.co.uk/sandbox/eventdelegation/
[event-driven]: http://en.wikipedia.org/wiki/Event-driven_programming
[kung-fu]: http://o2js.com/2011/05/03/javascript-function-kung-fu/
[pragprog]: http://pragprog.com/the-pragmatic-programmer
[cohesion]: http://msdn.microsoft.com/en-us/magazine/cc947917.aspx
[defensive]: http://en.wikipedia.org/wiki/Defensive_programming
[contract]: http://en.wikipedia.org/wiki/Design_by_Contract
[progressive]: ttp://en.wikipedia.org/wiki/Progressive_enhancement
[concat-test]: http://jsperf.com/string-vs-array-concat/2
[join-test]: http://jsperf.com/string-concat-vs-array-join-10000/15
[clean-code]: http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882
[rober-martin]: http://www.objectmentor.com/omTeam/martin_r.html
[hungarian]: http://en.wikipedia.org/wiki/Hungarian_notation
