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

Indent

* Statements within **blocks**.
* Statements within a **function** body.
* Statements within a **switch** body.
* Statements within a **case** body.
* Statements inside a **closure**.

### 3.3. BLANK LINES

Leave **at most 1** blank lines.

Insert a blank line

* **After** function declarations.

        function isArray(obj) {

            return is(obj, config.constants.ecmaScriptType.ARRAY);

        }
        
        function is(obj, type) {

            var objectNameStartIndex = 8;
            var trimLastBraceIndex = -1;
            var klass = Object.prototype.toString.call(obj).slice(objectNameStartIndex, trimLastBraceIndex);

            return obj !== UNDEFINED && obj !== null && klass === type;

        }        

* **After** the beginning of and **before** the ending of a **function** body.

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

### 3.3. LINE LENGTH

To sustain code readability, limit the line length to **160 characters**.
If the line (*including the indentation*) exceeds **160 characters**, 
continue from the next line.

### 3.4. BRACE POSITIONING

### 3.5  NEW LINES

### 3.6  STRINGS

### 3.7  COMMENTS

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
