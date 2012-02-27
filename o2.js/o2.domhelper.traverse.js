/**
 * @module   domhelper.traverse
 * @requires core
 * @requires stringhelper.core
 * @requires domhelper.core
 * @requires domhelper.class
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-10 12:56:25.766149
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var create    = _.create;

    function fn() {}

    /*
     * DomHelper (traverse)
     */
    var me = create('DomHelper');


/*
getChildren                   : {MODULE : kDomHelperTraverse},
getChildrenByAttribute        : {MODULE : kDomHelperTraverse},
getChildrenByAttributeUntil   : {MODULE : kDomHelperTraverse},
getChildrenByClass            : {MODULE : kDomHelperTraverse},
getChildrenByClassUntil       : {MODULE : kDomHelperTraverse},
getChildrenById               : {MODULE : kDomHelperTraverse},
getChildrenByIdUntil          : {MODULE : kDomHelperTraverse},
getChildrenUntil              : {MODULE : kDomHelperTraverse},
getChildrenWithAttribute      : {MODULE : kDomHelperTraverse},
getChildrenWithAttributeUntil : {MODULE : kDomHelperTraverse},
getChildrenWithClass          : {MODULE : kDomHelperTraverse},
getChildrenWithClassUntil     : {MODULE : kDomHelperTraverse},
getChildrenWithId             : {MODULE : kDomHelperTraverse},
getChildrenWithIdUntil        : {MODULE : kDomHelperTraverse},

getElements              : {MODULE : kDomHelperTraverse},
getElementsByAttribute   : {MODULE : kDomHelperTraverse},
getElementsByClass       : {MODULE : kDomHelperTraverse},
getElementsWithAttribute : {MODULE : kDomHelperTraverse},
getElementsWithClass     : {MODULE : kDomHelperTraverse},
getElementsWithId        : {MODULE : kDomHelperTraverse},

getFirst              : {MODULE : kDomHelperTraverse},
getFirstByAttribute   : {MODULE : kDomHelperTraverse},
getFirstByClass       : {MODULE : kDomHelperTraverse},
getFirstById          : {MODULE : kDomHelperTraverse},
getFirstWithAttribute : {MODULE : kDomHelperTraverse},
getFirstWithClass     : {MODULE : kDomHelperTraverse},
getFirstWithId        : {MODULE : kDomHelperTraverse},

getFirstChild              : {MODULE : kDomHelperTraverse},
getFirstChildByAttribute   : {MODULE : kDomHelperTraverse},
getFirstChildByClass       : {MODULE : kDomHelperTraverse},
getFirstChildById          : {MODULE : kDomHelperTraverse},
getFirstChildWithAttribute : {MODULE : kDomHelperTraverse},
getFirstChildWithClass     : {MODULE : kDomHelperTraverse},
getFirstChildWithId        : {MODULE : kDomHelperTraverse},

getLast              : {MODULE : kDomHelperTraverse},
getLastByAttribute   : {MODULE : kDomHelperTraverse},
getLastByClass       : {MODULE : kDomHelperTraverse},
getLastById          : {MODULE : kDomHelperTraverse},
getLastWithId        : {MODULE : kDomHelperTraverse},
getLastWithAttribute : {MODULE : kDomHelperTraverse},
getLastWithClass     : {MODULE : kDomHelperTraverse},

getLastChild              : {MODULE : kDomHelperTraverse},
getLastChildByAttribute   : {MODULE : kDomHelperTraverse},
getLastChildByClass       : {MODULE : kDomHelperTraverse},
getLastChildById          : {MODULE : kDomHelperTraverse},
getLastChildWithAttribute : {MODULE : kDomHelperTraverse},
getLastChildWithClass     : {MODULE : kDomHelperTraverse},
getLastChildWithId        : {MODULE : kDomHelperTraverse},

getNext              : {MODULE : kDomHelperTraverse},
getNextByAttribute   : {MODULE : kDomHelperTraverse},
getNextByClass       : {MODULE : kDomHelperTraverse},
getNextById          : {MODULE : kDomHelperTraverse},
getNextWithAttribute : {MODULE : kDomHelperTraverse},
getNextWithClass     : {MODULE : kDomHelperTraverse},
getNextWithId        : {MODULE : kDomHelperTraverse},

getNextAll                   : {MODULE : kDomHelperTraverse},
getNextAllByAttribute        : {MODULE : kDomHelperTraverse},
getNextAllByAttributeUntil   : {MODULE : kDomHelperTraverse},
getNextAllByClass            : {MODULE : kDomHelperTraverse},
getNextAllByClassUntil       : {MODULE : kDomHelperTraverse},
getNextAllById               : {MODULE : kDomHelperTraverse},
getNextAllByIdUntil          : {MODULE : kDomHelperTraverse},
getNextAllUntil              : {MODULE : kDomHelperTraverse},
getNextAllWithAttribute      : {MODULE : kDomHelperTraverse},
getNextAllWithAttributeUntil : {MODULE : kDomHelperTraverse},
getNextAllWithClass          : {MODULE : kDomHelperTraverse},
getNextAllWithClassUntil     : {MODULE : kDomHelperTraverse},
getNextAllWithId             : {MODULE : kDomHelperTraverse},
getNextAllWithIdUntil        : {MODULE : kDomHelperTraverse},

getNth              : {MODULE : kDomHelperTraverse},
getNthByAttribute   : {MODULE : kDomHelperTraverse},
getNthByClass       : {MODULE : kDomHelperTraverse},
getNthWithAttribute : {MODULE : kDomHelperTraverse},
getNthWithClass     : {MODULE : kDomHelperTraverse},
getNthWithId        : {MODULE : kDomHelperTraverse},

getNthChild              : {MODULE : kDomHelperTraverse},
getNthChildByAttribute   : {MODULE : kDomHelperTraverse},
getNthChildByClass       : {MODULE : kDomHelperTraverse},
getNthChildWithAttribute : {MODULE : kDomHelperTraverse},
getNthChildWithClass     : {MODULE : kDomHelperTraverse},
getNthChildWithId        : {MODULE : kDomHelperTraverse},

getNthNext              : {MODULE : kDomHelperTraverse},
getNthNextByAttribute   : {MODULE : kDomHelperTraverse},
getNthNextByClass       : {MODULE : kDomHelperTraverse},
getNthNextWithAttribute : {MODULE : kDomHelperTraverse},
getNthNextWithClass     : {MODULE : kDomHelperTraverse},
getNthNextWithId        : {MODULE : kDomHelperTraverse},

getNthParent              : {MODULE : kDomHelperTraverse},
getNthParentByAttribute   : {MODULE : kDomHelperTraverse},
getNthParentByClass       : {MODULE : kDomHelperTraverse},
getNthParentWithAttribute : {MODULE : kDomHelperTraverse},
getNthParentWithClass     : {MODULE : kDomHelperTraverse},
getNthParentWithId        : {MODULE : kDomHelperTraverse},

getNthPrev              : {MODULE : kDomHelperTraverse},
getNthPrevByAttribute   : {MODULE : kDomHelperTraverse},
getNthPrevByClass       : {MODULE : kDomHelperTraverse},
getNthPrevWithAttribute : {MODULE : kDomHelperTraverse},
getNthPrevWithClass     : {MODULE : kDomHelperTraverse},
getNthPrevWithId        : {MODULE : kDomHelperTraverse},

getParent              : {MODULE : kDomHelperTraverse},
getParentByAttribute   : {MODULE : kDomHelperTraverse},
getParentByClass       : {MODULE : kDomHelperTraverse},
getParentById          : {MODULE : kDomHelperTraverse},
getParentWithAttribute : {MODULE : kDomHelperTraverse},
getParentWithClass     : {MODULE : kDomHelperTraverse},
getParentWithId        : {MODULE : kDomHelperTraverse},

getParentOrSelf              : {MODULE : kDomHelperTraverse},
getParentOrSelfByAttribute   : {MODULE : kDomHelperTraverse},
getParentOrSelfByClass       : {MODULE : kDomHelperTraverse},
getParentOrSelfById          : {MODULE : kDomHelperTraverse},
getParentOrSelfWithAttribute : {MODULE : kDomHelperTraverse},
getParentOrSelfWithClass     : {MODULE : kDomHelperTraverse},
getParentOrSelfWithId        : {MODULE : kDomHelperTraverse},

getParents                   : {MODULE : kDomHelperTraverse},
getParentsByAttribute        : {MODULE : kDomHelperTraverse},
getParentsByAttributeUntil   : {MODULE : kDomHelperTraverse},
getParentsByClass            : {MODULE : kDomHelperTraverse},
getParentsByClassUntil       : {MODULE : kDomHelperTraverse},
getParentsUntil              : {MODULE : kDomHelperTraverse},
getParentsWithAttribute      : {MODULE : kDomHelperTraverse},
getParentsWithAttributeUntil : {MODULE : kDomHelperTraverse},
getParentsWithClass          : {MODULE : kDomHelperTraverse},
getParentsWithClassUntil     : {MODULE : kDomHelperTraverse},
getParentsWithId             : {MODULE : kDomHelperTraverse},
getParentsWithIdUntil        : {MODULE : kDomHelperTraverse},

getParentsAndSelf                   : {MODULE : kDomHelperTraverse},
getParentsAndSelfByAttribute        : {MODULE : kDomHelperTraverse},
getParentsAndSelfByAttributeUntil   : {MODULE : kDomHelperTraverse},
getParentsAndSelfByClass            : {MODULE : kDomHelperTraverse},
getParentsAndSelfByClassUntil       : {MODULE : kDomHelperTraverse},
getParentsAndSelfUntil              : {MODULE : kDomHelperTraverse},
getParentsAndSelfWithAttribute      : {MODULE : kDomHelperTraverse},
getParentsAndSelfWithAttributeUntil : {MODULE : kDomHelperTraverse},
getParentsAndSelfWithClass          : {MODULE : kDomHelperTraverse},
getParentsAndSelfWithClassUntil     : {MODULE : kDomHelperTraverse},
getParentsAndSelfWithId             : {MODULE : kDomHelperTraverse},
getParentsAndSelfWithIdUntil        : {MODULE : kDomHelperTraverse},

getPrev              : {MODULE : kDomHelperTraverse},
getPrevByAttribute   : {MODULE : kDomHelperTraverse},
getPrevByClass       : {MODULE : kDomHelperTraverse},
getPrevById          : {MODULE : kDomHelperTraverse},
getPrevWithAttribute : {MODULE : kDomHelperTraverse},
getPrevWithClass     : {MODULE : kDomHelperTraverse},
getPrevWithId        : {MODULE : kDomHelperTraverse},

getPrevAll                   : {MODULE : kDomHelperTraverse},
getPrevAllByAttribute        : {MODULE : kDomHelperTraverse},
getPrevAllByClass            : {MODULE : kDomHelperTraverse},
getPrevAllByClassUntil       : {MODULE : kDomHelperTraverse},
getPrevAllUntil              : {MODULE : kDomHelperTraverse},
getPrevAllWithAttribute      : {MODULE : kDomHelperTraverse},
getPrevAllWithAttributeUntil : {MODULE : kDomHelperTraverse},
getPrevAllWithClass          : {MODULE : kDomHelperTraverse},
getPrevAllWithClassUntil     : {MODULE : kDomHelperTraverse},
getPrevAllWithId             : {MODULE : kDomHelperTraverse},
getPrevAllWithIdUntil        : {MODULE : kDomHelperTraverse},

getSiblings                   : {MODULE : kDomHelperTraverse},
getSiblingsByAttribute        : {MODULE : kDomHelperTraverse},
getSiblingsByAttributeUntil   : {MODULE : kDomHelperTraverse},
getSiblingsByClass            : {MODULE : kDomHelperTraverse},
getSiblingsByClassUntil       : {MODULE : kDomHelperTraverse},
getSiblingsUntil              : {MODULE : kDomHelperTraverse},
getSiblingsWithAttribute      : {MODULE : kDomHelperTraverse},
getSiblingsWithAttributeUntil : {MODULE : kDomHelperTraverse},
getSiblingsWithClass          : {MODULE : kDomHelperTraverse},
getSiblingsWithClassUntil     : {MODULE : kDomHelperTraverse},
getSiblingsWithId             : {MODULE : kDomHelperTraverse},
getSiblingsWithIdUntil        : {MODULE : kDomHelperTraverse},

isChild              : {MODULE : kDomHelperTraverse},
isChildByAttribute   : {MODULE : kDomHelperTraverse},
isChildByClass       : {MODULE : kDomHelperTraverse},
isChildById          : {MODULE : kDomHelperTraverse},
isChildWithAttribute : {MODULE : kDomHelperTraverse},
isChildWithClass     : {MODULE : kDomHelperTraverse},
isChildWithId        : {MODULE : kDomHelperTraverse},

isNext              : {MODULE : kDomHelperTraverse},
isNextByAttribute   : {MODULE : kDomHelperTraverse},
isNextByClass       : {MODULE : kDomHelperTraverse},
isNextById          : {MODULE : kDomHelperTraverse},
isNextWithAttribute : {MODULE : kDomHelperTraverse},
isNextWithClass     : {MODULE : kDomHelperTraverse},
isNextWithId        : {MODULE : kDomHelperTraverse},

isParent              : {MODULE : kDomHelperTraverse},
isParentByAttribute   : {MODULE : kDomHelperTraverse},
isParentByClass       : {MODULE : kDomHelperTraverse},
isParentById          : {MODULE : kDomHelperTraverse},
isParentWithAttribute : {MODULE : kDomHelperTraverse},
isParentWithClass     : {MODULE : kDomHelperTraverse},
isParentWithId        : {MODULE : kDomHelperTraverse},

isParentOrSelf              : {MODULE : kDomHelperTraverse},
isParentOrSelfByAttribute   : {MODULE : kDomHelperTraverse},
isParentOrSelfByClass       : {MODULE : kDomHelperTraverse},
isParentOrSelfById          : {MODULE : kDomHelperTraverse},
isParentOrSelfWithAttribute : {MODULE : kDomHelperTraverse},
isParentOrSelfWithClass     : {MODULE : kDomHelperTraverse},
isParentOrSelfWithId        : {MODULE : kDomHelperTraverse},

isPrev              : {MODULE : kDomHelperTraverse},
isPrevByAttribute   : {MODULE : kDomHelperTraverse},
isPrevByClass       : {MODULE : kDomHelperTraverse},
isPrevById          : {MODULE : kDomHelperTraverse},
isPrevWithAttribute : {MODULE : kDomHelperTraverse},
isPrevWithClass     : {MODULE : kDomHelperTraverse},
isPrevWithId        : {MODULE : kDomHelperTraverse},

isSibling              : {MODULE : kDomHelperTraverse},
isSiblingByAttribute   : {MODULE : kDomHelperTraverse},
isSiblingByClass       : {MODULE : kDomHelperTraverse},
isSiblingById          : {MODULE : kDomHelperTraverse},
isSiblingWithAttribute : {MODULE : kDomHelperTraverse},
isSiblingWithClass     : {MODULE : kDomHelperTraverse},
isSiblingWithId        : {MODULE : kDomHelperTraverse}

*/








/**
 *
 */
fn(me, 'getChildren', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenByIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getChildrenWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getElements', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getElementsByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getElementsByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getElementsWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getElementsWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getElementsWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirst', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstChildById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getFirstWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLast', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastChildById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getLastWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNext', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAll', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllByIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextAllWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNextWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNth', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthNext', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthNextByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthNextByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthNextWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthNextWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthNextWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthParent', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthParentByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthParentByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthParentWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthParentWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthParentWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthPrev', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthPrevByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthPrevByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthPrevWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthPrevWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthPrevWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getNthWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParent', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentOrSelf', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentOrSelfByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentOrSelfByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentOrSelfById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentOrSelfWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentOrSelfWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentOrSelfWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParents', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelf', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsAndSelfWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentsWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getParentWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrev', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAll', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevAllWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getPrevWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblings', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'getSiblingsWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isChildById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isNext', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isNextByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isNextByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isNextById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isNextWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isNextWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isNextWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParent', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentOrSelf', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentOrSelfByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentOrSelfByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentOrSelfById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentOrSelfWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentOrSelfWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentOrSelfWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isParentWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isPrev', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isPrevByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isPrevByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isPrevById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isPrevWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isPrevWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isPrevWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isSibling', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isSiblingByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isSiblingByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isSiblingById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isSiblingWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isSiblingWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
fn(me, 'isSiblingWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

}(this.o2));
