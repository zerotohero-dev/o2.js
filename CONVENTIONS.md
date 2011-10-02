# o2.js JAVASCRIPT CONVENTIONS & BEST PRACTICES

## 1. INTRODUCTION

This document includes **JavaScript** naming conventions, best practices 
and recommendations to be used within **o2.js** source code, and examples.

If there's a particular **JavaScript** usage that's not mentioned in this
document

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
to **maintenance**, **patching**, and **rewriting** the codebase. During their
lifetime, these large-scale software projects are not coded and
maintained by one person, and everyone's coding style and preferences
differ.

In this essence, **coding conventions** constitute a shared language
between the developer team. It increases the readability of the code,
and makes the code less error-prone.

## 3. o2.js JAVASCRIPT CODING STANDARDS

### 3.1. CODE CLEANLINESS
    
### 3.2. INDENTATION

### 3.3. LINE LENGTH

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


------


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
