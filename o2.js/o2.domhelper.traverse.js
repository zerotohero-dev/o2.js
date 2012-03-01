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
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * DomHelper (traverse)
     */
    var me = create('DomHelper');

    /*
     * Aliases
     */

    var $ = require('$');

    var kEmpty = '';

    var nodeType  = require('DomHelper', 'nodeType');
    var kTextNode = attr(nodeType, 'TEXT');

    var getAttribute = require('DomHelper', 'getAttribute');

    /*
     * Selectors
     */
    var kImmediateClassSelector       = '#{0} > .{1}'
    var kImmediateClassAndTagSelector = '#{0} > {1}.{2}'

    function returnTrue() {
        return true;
    }

    function filter(nodes, name, filterDelegate, filterArgs, filterResult,
                breakDelegate, breakArgs) {
        var nodeName = name || kEmpty;
        var result = [];
        var i = 0;
        var len = 0;
        var node = null;

        var fArgs = filterArgs;

        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];

            if(breakDelegate &&
                breakDelegate.apply(node, breakArgs.unshift(node))) {
                break;
            }

            if (node.nodeType !== kTextNode) {
                if (nodeName) {
                    if (
                        node.nodeName.toLowerCase() === nodeName.toLowerCase()
                    ) {
                        if(filterDelegate.apply(
                            node, fArgs.unshift(node)) === filterResult
                    ) {
                            result.push(node);
                        }
                    }
                } else {
                    if(filterDelegate.apply(
                            node, fArgs.unshift(node)) === filterResult
                    ) {
                            result.push(node);
                        }
                }
            }
        }

        return result;
    }

    /**
     * function {static} o2.DomHelper.getChildren
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element.</p>
     *
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of that node.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    def(me, 'getChildren', function(elm, name) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return filter(target.childNodes, name || kEmpty,
            returnTrue, [], true);
    });

    /**
     * function {static} o2.DomHelper.getChildren
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element, if they have a matching <strong>attribute</strong> with
     * a given <strong>value</strong>.</p>
     *
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of that node.
     * @param {String} attr - the name of the attribute.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (optional, defaults to <code>undefined</code>)
     * if given, the result is filtered by the given node name as well.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    def(me, 'getChildrenByAttribute', function(elm, attr, value, name) {
        // IE7 and IE8 support attribute selectors only if a
        // !DOCTYPE is specified. To maintain compatibility we implement
        // attribute selector without using document.querySelector

        var target = $(elm);

        if (!target) {
            return [];
        }

        return filter(target.childNodes, name || kEmpty,
            getAttribute, [attr], value);
    });

    /**
     *
     */
    def(me, 'getChildrenByAttributeUntil', function(elm, attr, value, until,
                name) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return filter(target.childNodes, name || kEmpty,
            getAttribute, [attr], value, isNodeEquals, [until]);
    });

    if (isNativeQuerySupported) {

        /**
         *
         */
        def(me, 'getChildrenByClass', function(elm, className, nodeName) {
            var el = $(elm);

            // NOTE: IE7+ supports child selector ( > ),
            // IE8+ supports querySelectorAll
            // So it's safe to use the child selector with querySelectorAll:
            // It'll work as expected in IE8+ and it'll degrade gracefully
            // in IE7-

            if (!el.id) {
                el.id = [myName, generateGuid()].join(kEmpty);
            }

            if (nodeName) {
                return el.querySelectorAll(
                    format(kImmediateClassAndTagSelector, el.id, nodeName, c)
                );
            }

            return el.querySelectorAll(
                format(kImmediateClassSelector, el.id, c)
            );
        });
    } else {

        /**
         *
         */
        def(me, 'getChildrenByClass', function(elm, className, nodeName) {
            var target = $(elm);

            if (!target) {
                return [];
            }

            return filter(target.childNodes, nodeName || kEmpty,
                hasClassName, [], className);
        });
    }

    var getChildrenByClass = require('DomHelper', 'getChildrenByClass');

    /**
     *
     */
    def(me, 'getChildrenByClassUntil', function(elm, className, until,
            nodeName) {

        var items = getChildrenByClass(elm, classname, nodeName);

        var result = [];

        return filter(items, nodeName || kEmpty,
            hasClassName, [], className, isNodeEquals, [until]);

    });


/*
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
def(me, 'getChildrenByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenByIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getChildrenWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getElements', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getElementsByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getElementsByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getElementsWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getElementsWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getElementsWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirst', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstChildById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getFirstWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLast', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastChildById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getLastWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNext', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAll', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllByIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextAllWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNextWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNth', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthNext', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthNextByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthNextByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthNextWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthNextWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthNextWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthParent', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthParentByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthParentByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthParentWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthParentWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthParentWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthPrev', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthPrevByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthPrevByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthPrevWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthPrevWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthPrevWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getNthWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParent', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentOrSelf', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentOrSelfByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentOrSelfByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentOrSelfById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentOrSelfWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentOrSelfWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentOrSelfWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParents', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelf', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsAndSelfWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentsWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getParentWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrev', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAll', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevAllWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getPrevWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblings', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsByAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsByClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsWithAttributeUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsWithClassUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'getSiblingsWithIdUntil', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isChild', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isChildByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isChildByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isChildById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isChildWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isChildWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isChildWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isNext', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isNextByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isNextByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isNextById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isNextWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isNextWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isNextWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParent', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentOrSelf', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentOrSelfByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentOrSelfByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentOrSelfById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentOrSelfWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentOrSelfWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentOrSelfWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isParentWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isPrev', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isPrevByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isPrevByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isPrevById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isPrevWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isPrevWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isPrevWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isSibling', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isSiblingByAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isSiblingByClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isSiblingById', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isSiblingWithAttribute', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isSiblingWithClass', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

/**
 *
 */
def(me, 'isSiblingWithId', function() {
    //TODO: implement me!
    throw 'NOT implemented!';
});

}(this.o2));
