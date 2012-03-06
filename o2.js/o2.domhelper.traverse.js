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
 *  lastModified: 2012-03-06 09:55:18.134915
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */
(function(framework, document) {
    'use strict';

    //TODO: update documentation after completing this module.

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

    var $      = require('$');
    var myName = require('name');

    var kAll   = '*';
    var kEmpty = '';

    var nodeType  = require('DomHelper', 'nodeType');
    var kTextNode = attr(nodeType, 'TEXT');

    var getAttribute = require('DomHelper', 'getAttribute');

    var kStringHelper = 'StringHelper';
    var format        = require(kStringHelper, 'format');
    var generateGuid  = require(kStringHelper, 'generateGuid');

    /*
     * Selectors
     */
    var kImmediateClassSelector       = '#{0} > .{1}';
    var kImmediateClassAndTagSelector = '#{0} > {1}.{2}';

    /*
     *
     */
    var isNativeQuerySupported = !!document.querySelector;

    /*
     * Checks whether two nodes are equal to one another.
     */
    function isNodeEquals(node, until) {
        return node === until;
    }

    /*
     * Does the node hava that class?
     */
    function hasClassName(node, name) {
        return node && node.className.indexOf(name) > -1;
    }

    /*
     *
     */
    function isAttributeEquals(node, attribute, value) {
        return getAttribute(node, attribute) === value;
    }

    /*
     *
     */
    function hasAttribute(node, attribute) {
        return getAttribute(node, attribute) !== undefined;
    }

    /*
     *
     */
    function hasClassAttribute(node) {
        return node && !!node.className;
    }

    /*
     *
     */
    function hasIdAttribute(node) {
        return node && !!node.id;
    }

    /*
     * Filters a set of nodes into a smaller subset.
     */
    function filter(nodes, filterDelegate, filterArgs,
                breakDelegate, breakArgs) {
        var result = [];
        var i = 0;
        var len = 0;
        var node = null;

        var fArgs = filterArgs;

        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];

            if(breakDelegate) {
                if(breakDelegate.apply(node, breakArgs.unshift(node))) {
                    break;
                }
            }

            if (node.nodeType !== kTextNode) {
                if (filterDelegate) {
                    if(filterDelegate.apply(node, fArgs.unshift(node))) {
                        result.push(node);
                    }
                } else {
                    result.push(node);
                }
            }
        }

        return result;
    }

    /*
     *
     */
    function getChildNodes(elm, name) {
        var items = elm ? elm.childNodes : [];
        var item = null;
        var i = 0;
        var len = 0;
        var result = [];

        if (name) {
            for(i = 0, len = items.length; i < len; i++) {
                item = items[i];

                if (item.nodeName.toLowerCase() === name.toLowerCase()) {
                    result.push(item);
                }
            }
        } else {
            result = items;
        }

        return result;
    }

    /*
     *
     */
    function execFilter(elm, getter, getterParams,
                checker, checkerParams, stopper, stopperParams) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return filter(
            getter.apply(target, getterParams.unshift(target)),
            checker, checkerParams, stopper, stopperParams
        );
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
        return execFilter(
            elm, getChildNodes, [name],
            null, [],
            null, []
        );

        /*return filter(target.childNodes, name || kEmpty,
            returnTrue, [], true);*/
    });

    /*
     *
     */
    var getChildren = require('DomHelper', 'getChildren');

    /**
     * function {static} o2.DomHelper.getChildren
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element, if they have a matching <strong>attribute</strong> with
     * a given <strong>value</strong>.</p>
     *
     * @param {Object} elm - the <strong>DOM</strong> njode, or the
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

        return execFilter(
            elm, getChildNodes, [name],
            isAttributeEquals, [attr, value],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenByAttribute = require('DomHelper', 'getChildrenByAttribute');

    /**
     *
     */
    def(me, 'getChildrenByAttributeUntil', function(elm, attr, value, until,
                name) {
        return execFilter(
            elm, getChildNodes, [name],
            isAttributeEquals, [attr, value],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenByAttributeUntil = require('DomHelper',
        'getChildrenByAttributeUntil');

    if (isNativeQuerySupported) {

        /**
         *
         */
        def(me, 'getChildrenByClass', function(elm, className, name) {
            var el = $(elm);

            // NOTE: IE7+ supports child selector ( > ),
            // IE8+ supports querySelectorAll
            // So it's safe to use the child selector with querySelectorAll:
            // It'll work as expected in IE8+ and it'll degrade gracefully
            // in IE7-

            if (!el.id) {
                el.id = [myName, generateGuid()].join(kEmpty);
            }

            if (name) {
                return el.querySelectorAll(
                    format(kImmediateClassAndTagSelector, el.id, name,
                        className)
                );
            }

            return el.querySelectorAll(
                format(kImmediateClassSelector, el.id, className)
            );
        });
    } else {

        /**
         *
         */
        def(me, 'getChildrenByClass', function(elm, className, name) {
            return execFilter(
                elm, getChildNodes, [name],
                hasClassName, [className],
                null, []
            );
        });
    }

    /*
     *
     */
    var getChildrenByClass = require('DomHelper', 'getChildrenByClass');

    /**
     *
     */
    def(me, 'getChildrenByClassUntil', function(elm, className, until, name) {
        return execFilter(
            elm, getChildrenByClass, [className, name],
            null, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenByClassUntil = require('DomHelper',
        'getChildrenByClassUntil');

    /**
     *
     */
    def(me, 'getChildrenUntil', function(elm, until, name) {
        return execFilter(
            elm, getChildNodes, [name],
            null, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenUntil = require('DomHelper', 'getChildrenUntil');

    /**
     *
     */
    def(me, 'getChildrenWithAttribute', function(elm, attribute, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasAttribute, [attribute],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenWithAttribute = require('DomHelper',
        'getChildrenWithAttribute');

    /**
     *
     */
    def(me, 'getChildrenWithAttributeUntil', function(elm, attribute, until,
                name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasAttribute, [attribute], true,
            isNodeEquals, [until], true
        );
    });

    /*
     *
     */
    var getChildrenWithAttributeUntil = require('DomHelper',
        'getChildrenWithAttributeUntil');

    /**
     *
     */
    def(me, 'getChildrenWithClass', function(elm, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassAttribute, [],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenWithClass = require('DomHelper', 'getChildrenWithClass');

    /**
     *
     */
    def(me, 'getChildrenWithClassUntil', function(elm, until, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassAttribute, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenWithClassUntil = require('DomHelper',
        'getChildrenWithClassUntil');

    /**
     *
     */
    def(me, 'getChildrenWithId', function(elm, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasIdAttribute, [],
            null, []
        );
    });

    /*
     *
     */
    var getChildrenWithId = require('DomHelper', 'getChildrenWithId');

    /**
     *
     */
    def(me, 'getChildrenWithIdUntil', function(elm, until, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasIdAttribute, [],
            isNodeEquals, [until]
        );
    });

    /*
     *
     */
    var getChildrenWithIdUntil = require('DomHelper', 'getChildrenWithIdUntil');

    /**
     *
     */
     def(me, 'getElements', function(elm, name) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return target.getElementsByTagName(name || kAll);
     });

    /*
     *
     */
    var getElements = require('DomHelper', 'getElements');

    /**
     *
     */
    def(me, 'getElementsByAttribute', function(elm, attribute, value, name) {
        return execFilter(
            elm, getElements, [name],
            isAttributeEquals, [attribute, value],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsByAttributeUntil', function(elm, attribute, value,
                until, name) {
        return execFilter(
            elm, getElements, [name],
            isAttributeEquals, [attribute, value],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsByClass', function(elm, className, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassName, [className],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsByClassUntil', function(elm, className, until, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassName, [className],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsUntil', function(elm, until, name) {
        return execFilter(
            elm, getElements, [name],
            null, [],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithAttribute', function(elm, attribute, name) {
        return execFilter(
            elm, getElements, [name],
            hasAttribute, [attribute],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithAttributeUntil', function(elm, attribute, until,
                name) {
        return execFilter(
            elm, getElements, [name],
            hasAttribute, [attribute],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithClass', function(elm, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassAttribute, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithClassUntil', function(elm, until, name) {
        return execFilter(
            elm, getElements, [name],
            hasClassAttribute, [],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithId', function(elm, name) {
        return execFilter(
            elm, getElements, [name],
            hasIdAttribute, [],
            null, []
        );
    });

    /**
     *
     */
    def(me, 'getElementsWithIdUntil', function(elm, until, name) {
        return execFilter(
            elm, getElements, [name],
            hasIdAttribute, [],
            isNodeEquals, [until]
        );
    });

    /**
     *
     */
    def(me, 'getSiblings', function(elm, name) {
        return !elm ? [] : getChildren(elm.parentNode, name);
    });

    /*
     *
     */
    var getSiblings = require('DomHelper', 'getSiblings');

    /**
     *
     */
    def(me, 'getSiblingsByAttribute', function(elm, attribute, value, name) {
        return !elm ? [] : getChildrenByAttribute(elm.parentNode,
            attribute, value, name);
    });

    var getSiblingsByAttribute = require('DomHelper', 'getSiblingsByAttribute');

    /**
     *
     */
    def(me, 'getSiblingsByAttributeUntil', function(elm, attribute, value,
            until, name) {
        return !elm ? [] : getChildrenByAttributeUntil(elm.parentNode,
            attribute, value, until, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsByClass', function(elm, name) {
        return !elm ? [] : getChildrenByClass(elm.parentNode, name);
    });

    /*
     *
     */
    var getSiblingsByClass = require('DomHelper', 'getSiblingsByClass');

    /**
     *
     */
    def(me, 'getSiblingsByClassUntil', function(elm, until, name) {
        return !elm ? [] : getChildrenByClassUntil(elm.parentNode, until,
            name);
    });

    /**
     *
     */
    def(me, 'getSiblingsUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenUntil(elm.parentNode, until, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithAttribute',  function(elm, attribute, name) {
        return !elm ? [] : getChildrenWithAttribute(elm.parentNode,
            attribute, name);
    });

    /*
     *
     */
    var getSiblingsWithAttribute = require('DomHelper',
        'getSiblingsWithAttribute');

    def(me, 'getSiblingsWithAttributeUntil',  function(elm, attribute, until,
                name) {
        return !elm ? [] : getChildrenWithAttributeUntil(elm.parentNode,
            attribute, until, name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithClass',  function(elm, name) {
        return !elm ? [] : getChildrenWithClass(elm.parentNode, name);
    });

    /*
     *
     */
    var getSiblingsWithClass = require('DomHelper', 'getSiblingsWithClass');

    /**
     *
     */
    def(me, 'getSiblingsWithClassUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenWithClassUntil(elm.parentNode, until,
            name);
    });

    /**
     *
     */
    def(me, 'getSiblingsWithId',  function(elm, name) {
        return !elm ? [] : getChildrenWithId(elm.parentNode, name);
    });

    /*
     *
     */
    var getSiblingsWithId = require('DomHelper', 'getSiblingsWithId');

    /**
     *
     */
    def(me, 'getSiblingsWithIdUntil',  function(elm, until, name) {
        return !elm ? [] : getChildrenWithIdUntil(elm.parentNode, until, name);
    });

    /**
     *
     */
    def(me, 'getFirst', function(elm, name) {
        return getSiblings(elm, name)[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstByAttribute', function(elm, attribute, value, name) {
        return getSiblingsByAttribute(elm, attribute, value, name)[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstByClass', function(elm, className, name) {
        return getSiblingsByClass(elm, className, name)[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstWithAttribute', function(elm, attribute, name) {
        return getSiblingsWithAttribute(elm, attribute, name)[0] || null;
    });

    /**
     *
     */
    def(me, 'getFirstWithClass', function(elm, name) {
        return getSiblingsWithClass(elm, name)[0] || null;
    });


    /**
     *
     */
    def(me, 'getFirstWithId', function(elm, name) {
        return getSiblingsWithId(elm, name)[0] || null;
    });

/*
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
}(this.o2, this.document));
