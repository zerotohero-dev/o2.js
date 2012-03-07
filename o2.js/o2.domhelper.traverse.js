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
 *  lastModified: 2012-03-07 09:00:50.982507
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
                breakDelegate, breakArgs, itemsCountCap, returnSingleItemAt,
                isReverse) {
        var result = [];
        var i = 0;
        var node = null;
        var fArgs = filterArgs;
        var counter = 0;
        var len = 0;

        if (!nodes) {
            return [];
        }

       var cache = [];

        if (!!isReverse) {
            for (i = nodes.length - 1; i >= 0; i--) {
                cache.push(nodes[i]);
            }
        } else {
            cache = nodes;
        }

        for (i = 0, len = cache.length; i < len; i++) {
            node = cache[i];

            if(breakDelegate) {
                if(breakDelegate.apply(node, breakArgs.unshift(node))) {
                    break;
                }
            }

            if (node.nodeType !== kTextNode) {
                if (filterDelegate) {
                    if(filterDelegate.apply(node, fArgs.unshift(node))) {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return node;
                        }

                        result.push(node);

                        if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                            break;
                        }
                    }
                } else {
                    counter++;

                    if (!isNaN(returnSingleItemAt) &&
                                returnSingleItemAt === counter) {
                        return node;
                    }

                    result.push(node);

                    if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                        break;
                    }
                }
            }
        }

        if (!isNaN(returnSingleItemAt)) {
            return null;
        }

        return result;
    }

    /*
     *
     */
    function getNextSiblings(elm,
                filterDelegate, filterArgs,
                breakDelegate, breakArgs,
                name, itemsCountCap, returnSingleItemAt,
                shouldStartAtFirstSibling, isReverse) {
        if (!elm) {
            return [];
        }

        var next = null;
        var result = [];
        var counter = 0;

        while (true) {
            if (!next && !!shouldStartAtFirstSibling) {
                next = !!isReverse ?
                    elm.parentNode.lastChild :
                    elm.parentNode.firstChild;
            } else {
                next = !!isReverse ?
                    elm.getPreviousSibling :
                    elm.getNextSibling;
            }

            if(breakDelegate) {
                if(breakDelegate.apply(next, breakArgs.unshift(next))) {
                    break;
                }
            }

            if (next.nodeType !== kTextNode) {
                if (name) {
                    if (next.nodeName === name) {
                        if (filterDelegate) {
                            if (filterDelegate.apply(next,
                                        filterArgs.unshift(next))) {
                                counter++;

                                if (!isNaN(returnSingleItemAt) &&
                                            returnSingleItemAt === counter) {
                                    return next;
                                }

                                result.push(next);


                                if (!isNaN(itemsCountCap) &&
                                            itemsCountCap <= counter) {
                                    break;
                                }
                            }
                        } else {
                            counter++;

                            if (!isNaN(returnSingleItemAt)&&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);


                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    }
                } else {
                    if (filterDelegate) {
                        if (filterDelegate.apply(next,
                                    filterArgs.unshift(next))) {
                            counter++;

                            if (!isNaN(returnSingleItemAt) &&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);

                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    } else {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return next;
                        }

                        result.push(next);

                        if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                            break;
                        }
                    }
                }
            }

            if (!next) {
                break;
            }
        }

        if (returnSingleItemAt !== undefined) {
            return null;
        }

        return result;
    }

    /*
     *
     */
    function getParents(elm,
                filterDelegate, filterArgs,
                breakDelegate, breakArgs,
                name, itemsCountCap, returnSingleItemAt
    ) {
        if (!elm) {
            return [];
        }

        var result = [];
        var target = $(elm);
        var counter = 0;

        target = target.parentNode;

        while (target) {
            if(breakDelegate) {
                if(breakDelegate.apply(target, breakArgs.unshift(target))) {
                    break;
                }
            }

            if (name) {
                if (target.nodeName.toLowerCase() === name.toLowerCase()) {
                    if (filterDelegate) {
                        if (filterDelegate.apply(target,
                                    filterArgs.unshift(target))) {
                            counter++;

                            if (!isNaN(returnSingleItemAt) &&
                                        returnSingleItemAt === counter) {
                                return target;
                            }

                            results.push(target);

                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    } else {
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
                }
            } else {
                if (filterDelegate) {
                    if (filterDelegate.apply(target,
                                filterArgs.unshift(target))) {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return target;
                        }

                        results.push(target);

                        if (!isNaN(itemsCountCap) &&
                                    itemsCountCap <= counter) {
                            break;
                        }
                    }
                } else {
                    counter++;

                    if (!isNaN(returnSingleItemAt) &&
                                returnSingleItemAt === counter) {
                        return target;
                    }

                    result.push(target);

                    if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                        break;
                    }
                }
            }

            target = target.parentNode;
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

        if (!elm) {
            return [];
        }

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
                checker, checkerParams, stopper, stopperParams, itemsCountCap,
                returnSingleItemAt, isReverse) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return filter(
            getter.apply(target, getterParams.unshift(target)),
            checker, checkerParams, stopper, stopperParams, itemsCountCap,
            returnSingleItemAt, isReverse
        );
    }

    /*
     *
     */
    function getLastItem(items) {
        var len = items.length;

        return len ? items[len - 1] : null;
    }

    /*
     *
     */
    function getLastItemExecFilter() {
       getLastItem(execFilter.apply(null, arguments));
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
        return execFilter(elm, getChildNodes, [name]);
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

        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attr, value]);
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
        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attr, value], isNodeEquals, [until]);
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
            return execFilter(elm, getChildNodes, [name],
                hasClassName, [className]);
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
        return execFilter(elm, getChildNodes, [name],
            hasClassName, [className], isNodeEquals, [until]);
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
        return execFilter(elm, getChildNodes, [name],
            null, [], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenUntil = require('DomHelper', 'getChildrenUntil');

    /**
     *
     */
    def(me, 'getChildrenWithAttribute', function(elm, attribute, name) {
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute]);
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
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute], isNodeEquals, [until]);
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
        return execFilter(elm, getChildNodes, [name], hasClassAttribute, []);
    });

    /*
     *
     */
    var getChildrenWithClass = require('DomHelper', 'getChildrenWithClass');

    /**
     *
     */
    def(me, 'getChildrenWithClassUntil', function(elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasClassAttribute, [], isNodeEquals, [until]);
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
        return execFilter(elm, getChildNodes, [name], hasIdAttribute, []);
    });

    /*
     *
     */
    var getChildrenWithId = require('DomHelper', 'getChildrenWithId');

    /**
     *
     */
    def(me, 'getChildrenWithIdUntil', function(elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasIdAttribute, [], isNodeEquals, [until]);
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
        return execFilter(elm, getElements, [name],
            isAttributeEquals, [attribute, value]);
    });

    /**
     *
     */
    def(me, 'getElementsByClass', function(elm, className, name) {
        return execFilter(elm, getElements, [name], hasClassName, [className]);
    });

    /**
     *
     */
    def(me, 'getElementsWithAttribute', function(elm, attribute, name) {
        return execFilter(elm, getElements, [name],
            hasAttribute, [attribute], null, []);
    });

    /**
     *
     */
    def(me, 'getElementsWithClass', function(elm, name) {
        return execFilter(elm, getElements, [name],
            hasClassAttribute, [], null, []);
    });

    /**
     *
     */
    def(me, 'getElementsWithId', function(elm, name) {
        return execFilter(elm, getElements, [name], hasIdAttribute, []);
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

    /**
     *
     */
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
        return getNextSiblings(elm, null, [], null, [], name, null, 0, true);
    });

    /**
     *
     */
    def(me, 'getFirstByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true);
    });

    /**
     *
     */
    def(me, 'getFirstByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true);
    });

    /**
     *
     */
    def(me, 'getFirstWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true);
    });

    /**
     *
     */
    def(me, 'getFirstWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, 0, true);
    });

    /**
     *
     */
    def(me, 'getFirstWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true);
    });

    /**
     *
     */
    def(me, 'getFirstChild', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getFirst(elm.firstChild, name);
    });

    /**
     *
     */
    def(me, 'getFirstChildByAttribute', function(elm, attribute, value, name) {
        if (!elm) {
            return null;
        }

        return getFirstByAttribute(elm.firstChild, attribute, value, name);
    });

    /**
     *
     */
    def(me, 'getFirstChildByClass', function(elm, className, name) {
        if (!elm) {
            return null;
        }

        return getFirstByClass(elm.firstChild, className, name);
    });

    /**
     *
     */
    def(me, 'getFirstChildWithAttribute', function(elm, attribute, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithAttribute(elm.firstChild, atribute, name);
    });

    /**
     *
     */
    def(me, 'getFirstChildWithClass', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithClass(elm.firstChild, name);
    });

    /**
     *
     */
    def(me, 'getFirstChildWithId', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithId(elm.firstChild, name);
    });

    /**
     *
     */
    def(me, 'getLast', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name,
            null, 0, true, true);
    });

    /**
     *
     */
    def(me, 'getLastByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true, true);
    });

    /**
     *
     */
    def(me, 'getLastByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /**
     *
     */
    def(me, 'getLastWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true, true);
    });

    /**
     *
     */
    def(me, 'getLastWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true, true);
    });

    /**
     *
     */
    def(me, 'getLastWithClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /**
     *
     */
    def(me, 'getLastChild', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getLast(elm.lastChild, name);
    });

    /**
     *
     */
    def(me, 'getLastChildByAttribute', function(elm, attribute, value, name) {
        if (!elm) {
            return null;
        }

        return getLastByAttribute(elm.lastChild, attribute, value, name);
    });

    /**
     *
     */
    def(me, 'getLastChildByClass', function(elm, className, name) {
        if (!elm) {
            return null;
        }

        return getLastByClass(elm.lastChild, className, name);
    });

    /**
     *
     */
    def(me, 'getLastChildWithAttribute', function(elm, attribute, name) {
        if (!elm) {
            return null;
        }

        return getLastWithAttribute(elm.lastChild, attribute, name);
    });

    /**
     *
     */
    def(me, 'getLastChildWithClass', function(elm, className, name) {
        if (!elm) {
            return null;
        }

        return getLastWithClass(elm.lastChild, className, name);
    });

    /**
     *
     */
    def(me, 'getLastChildWithId', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getLastWithId(elm.lastChild, name);
    });

    /**
     *
     */
    def(me, 'getNext', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, 0);
    });

    /**
     *
     */
    def(me, 'getNextByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0);
    });

    /**
     *
     */
    def(me, 'getNextByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0);
    });

    /**
     *
     */
    def(me, 'getNextWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0);
    });

    /**
     *
     */
    def(me, 'getNextWithClass', function(elm, name) {
        return getNextSiblings(elm,hasClassAttribute, [],
            null, [], name, null, 0);
    });

    /**
     *
     */
    def(me, 'getNextWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0);
    });

    /**
     *
     */
    def(me, 'getNextAll', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name);
    });

    /**
     *
     */
    def(me, 'getNextAllByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name);
    });

    /**
     *
     */
    def(me, 'getNextAllByAttributeUntil', function(elm, attribute, value, until,
                name) {
        return getNextSiblings(elm,
            isAttributeEquals, [attribute, value], isNodeEquals, [until], name);
    });

    /**
     *
     */
    def(me, 'getNextAllByClass', function(elm, className, name) {
        return getNextSiblings(elm, hasClassName, [className], null, [], name);
    });

    /**
     *
     */
    def(me, 'getNextAllByClassUntil', function(elm, className, until, name) {
        return getNextSiblings(elm, hasClassName, [className],
            isNodeEquals, [until], name);
    });


    /**
     *
     */
    def(me, 'getNextAllUntil', function(elm, until, name) {
        return getNextSiblings(elm, null, [], isNodeEquals, [until], name);
    });

    /**
     *
     */
    def(me, 'getNextAllWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute], null, [], name);
    });

    /**
     *
     */
    def(me, 'getNextAllWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name);
    });

    /**
     *
     */
    def(me, 'getNextAllWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [], null, [], name);
    });

    /**
     *
     */
    def(me, 'getNextAllWithClassUntil', function(elm, until, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     *
     */
    def(me, 'getNextAllWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [], null, [], name);
    });

    /**
     *
     */
    def(me, 'getNextAllWithIdUntil', function(elm, until, name) {
        return getNextSiblings(elm, hasIdAttribute, [], isNodeEquals, [until],
            name);
    });


    /**
     *
     */
    def(me, 'getNth', function(elm, n, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, n, true);
    });

    /**
     *
     */
    def(me, 'getNthByAttribute', function(elm, attribute, value, n, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n, true);
    });

    /**
     *
     */
    def(me, 'getNthByClass', function(elm, className, n, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, n, true);
    });

    /**
     *
     */
    def(me, 'getNthWithAttribute', function(elm, attribute, n, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, n, true);
    });

    /**
     *
     */
    def(me, 'getNthWithClass', function(elm, n, name) {
        return getNextSiblings(elm, hasClassAttribute, [], null, [],
            name, null, n, true);
    });

    /**
     *
     */
    def(me, 'getNthWithId', function(elm, n, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, n, true);
    });

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


    /**
     *
     */
    def(me, 'getNthChild', function(elm, n, name) {
        if (!elm) {
            return null;
        }

        return getNth(elm.firstChild, n, name);
    });

    /**
     *
     */
    def(me, 'getNthChildByAttribute', function(elm, attribute, value, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            isAttributeEquals, [attribute, value],
            null, [],
            null, n
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNthChildByClass', function(elm, className, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassName, [className],
            null, [],
            null, n
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNthChildWithAttribute', function(elm, attribute, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasAttribute, [attribute],
            null, [],
            null, n
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNthChildWithClass', function(elm, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasClassAttribute, [],
            null, [],
            null, n
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNthChildWithId', function(elm, n, name) {
        return execFilter(
            elm, getChildNodes, [name],
            hasIdAttribute, [],
            null, [],
            null, n
        )[0] || null;
    });

    /**
     *
     */
    def(me, 'getNthNext', function(elm, n, name) {
        return getNextSiblings(
            elm,
            null, [],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthNextByAttribute', function(elm, attribute, value, n, name) {
        return getNextSiblings(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthNextByClass', function(elm, className, n, name) {
        return getNextSiblings(
            elm,
            hasClassName, [className],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthNextWithAttribute', function(elm, attribute, n, name) {
        return getNextSiblings(
            elm,
            hasAttribute, [attribute],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthNextWithClass', function(elm, n, name) {
        return getNextSiblings(
            elm,
            hasClassAttribute, [],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthNextWithId', function(elm, n, name) {
        return getNextSiblings(
            elm,
            hasIdAttribute, [],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthParent', function(elm n, name) {
        return getParents(
            elm,
            null, [],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthParentByAttribute', function(elm, attribute, value, n,
                name) {
        return getParents(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthParentByClass', function(elm, className, n, name) {
        return getParents(
            elm,
            hasClassName, [className],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthParentWithAttribute', function(elm, attribute, n, name) {
        return getParents(
            elm,
            hasAttribute, [attribute],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthParentWithClass', function(elm, n, name) {
        return getParents(
            elm,
            hasClassAttribute, [],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthParentWithId', function(elm, n, name) {
       return getParents(
            elm,
            hasIdAttribute, [],
            null, [],
            name, null, n
        );
    });

    /**
     *
     */
    def(me, 'getNthPrev', function(elm, n, name) {
        return getNextSiblings(elm,
            null, [],
            null, [],
            name, null, n,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getNthPrevByAttribute', function(elm, attribute, value, n, name) {
        return getNextSiblings(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null, n,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getNthPrevByClass', function(elm, className, n, name) {
        return getNextSiblings(
            elm,
            hasClassName, [className],
            null, [],
            name, null, n,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getNthPrevWithAttribute', function(elm, attribute, n, name) {
       return getNextSiblings(
            elm,
            hasAttribute, [attribute],
            null, [],
            name, null, n,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getNthPrevWithClass', function(elm, n, name) {
       return getNextSiblings(
            elm,
            hasClassAttribute, [],
            null, [],
            name, null, n,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getNthPrevWithId', function(elm, n, name) {
       return getNextSiblings(
            elm,
            hasIdAttribute, [],
            null, [],
            name, null, n,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getParent', function(elm, name) {
        return getParents(
            elm,
            null, [],
            null, [],
            name, null, 0
        );
    });

    /**
     *
     */
    def(me, 'getParentByAttribute', function(elm, attribute, value, name) {
        return getParents(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null, 0
        );
    });

    /**
     *
     */
    def(me, 'getParentByClass', function(elm, className, name) {
        return getParents(
            elm,
            hasClassName, [className],
            null, [],
            name, null, 0
        );
    });

    /**
     *
     */
    def(me, 'getParentWithAttribute', function(elm, attribute, name) {
        return getParents(
            elm,
            hasAttribute, [attribute],
            null, [],
            name, null, 0
        );
    });

    /**
     *
     */
    def(me, 'getParentWithClass', function(elm, name) {
        return getParents(
            elm,
            hasClassAttribute, [],
            null, [],
            name, null, 0
        );
    });

    /**
     *
     */
    def(me, 'getParentWithId', function(elm, name) {
        return getParents(
            elm,
            hasIdAttribute, [],
            null, [],
            name, null, 0
        );
    });


    /**
     *
     */
    def(me, 'getParents', function(elm, name) {
        return getParents(
            elm,
            null, [],
            null, [],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsByAttribute', function(elm, attribute, value, name) {
        return getParents(
            elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsByAttributeUntil', function(elm, attribute, value,
                until, name) {
        return getParents(
            elm,
            isAttributeEquals, [attribute, value],
            isNodeEquals, [until],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsByClass', function(elm, className, name) {
        return getParents(
            elm,
            hasClassName, [className],
            null, [],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsByClassUntil', function(elm, className, until, name) {
        return getParents(
            elm,
            hasClassName, [className],
            isNodeEquals, [until],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsUntil', function(elm, until, name) {
        return getParents(
            elm,
            null, [],
            isNodeEquals, [until],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsWithAttribute', function(elm, attribute, name) {
        return getParents(
            elm,
            hasAttribute, [attribute],
            null, [],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getParents(
            elm,
            hasAttribute, [attribute],
            isNodeEquals, [until],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsWithClass', function(elm, name) {
        return getParents(
            elm,
            hasClassAttribute, [],
            null, [],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsWithClassUntil', function(elm, until, name) {
        return getParents(
            elm,
            hasClassAttribute, [],
            isNodeEquals, [until],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsWithId', function(elm, name) {
        return getParents(
            elm,
            hasIdAttribute, [],
            null, [],
            name
        );
    });

    /**
     *
     */
    def(me, 'getParentsWithIdUntil', function(elm, until, name) {
        return getParents(
            elm,
            hasIdAttribute, [],
            isNodeEquals, [until],
            name
        );
    });


    /**
     *
     */
    def(me, 'getParentsAndSelf', function(elm, name) {
        if (elm) {
            return getParents(
                elm,
                null, [],
                null, [],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByAttribute', function(elm, attribute, value,
                name) {
        if (elm) {
            return getParents(
                elm,
                hasAttribute, [attribute, value],
                null, [],
                name
            ).unshift(elm);
        }

        return [];

    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByAttributeUntil', function(elm, attribute, value,
                until, name) {
        if (elm) {
            return getParents(
                elm,
                hasAttribute, [attribute, value],
                isNodeEquals, [until],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByClass', function(elm, className, name) {
        if (elm) {
            return getParents(
                elm,
                hasClassName, [className],
                null, [],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfByClassUntil', function(elm, className, until,
                name) {
        if (elm) {
            return getParents(
                elm,
                hasClassName, [className],
                isNodeEquals, [until],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfUntil', function(elm, until, name) {
        if (elm) {
            return getParents(
                elm,
                null, [],
                isNodeEquals, [until],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithAttribute', function(elm, attribute, name) {
        if (elm) {
            return getParents(
                elm,
                hasAttribute, [attribute],
                null, [],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithAttributeUntil', function(elm, attribute,
                until, name) {
        if (elm) {
            return getParents(
                elm,
                hasAttribute, [attribute],
                isNodeEquals, [until],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithClass', function(elm, name) {
        if (elm) {
            return getParents(
                elm,
                hasClassAttribute, [],
                null, [],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithClassUntil', function(elm, until, name) {
        if (elm) {
            return getParents(
                elm,
                hasClassAttribute, [],
                isNodeEquals, [until],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithId', function(elm, name) {
        if (elm) {
            return getParents(
                elm,
                hasIdAttribute, [],
                null, [],
                name
            ).unshift(elm);
        }

        return [];
    });

    /**
     *
     */
    def(me, 'getParentsAndSelfWithIdUntil', function(elm, until, name) {
        if (elm) {
            return getParents(
                elm,
                hasIdAttribute, [],
                isNodeEquals, [until],
                name
            ).unshift(elm);
        }

        return [];
    });


    /**
     *
     */
    def(me, 'getPrev', function(elm, name) {
        return getNextSiblings(elm,
            null, [],
            null, [],
            name, null, 0,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getPrevByAttribute', function(elm, attribute, value, name) {
        return getNextSiblings(elm,
            isAttributeEquals, [attribute, value],
            null, [],
            name, null, 0,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getPrevByClass', function(elm, className, name) {
       return getNextSiblings(elm,
            hasClassName, [className],
            null, [],
            name, null, 0,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getPrevWithAttribute', function(elm, attribute, name) {
        return getNextSiblings(elm,
            hasAttribute, [attribute],
            null, [],
            name, null, 0,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getPrevWithClass', function(elm, name) {
        return getNextSiblings(elm,
            hasClassAttribute, [],
            null, [],
            name, null, 0,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getPrevWithId', function(elm, name) {
        return getNextSiblings(elm,
            hasIdAttribute, [],
            null, [],
            name, null, 0,
            false, true
        );
    });


    /**
     *
     */
    def(me, 'getPrevAll', function(elm, name) {
        return getNextSiblings(
            elm,
            null, [],
            null, [],
            name, null, null,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getPrevAllByAttribute', function() {
        return getNextSiblings(
            elm,
            null, [],
            null, [],
            name, null, null,
            false, true
        );
    });

    /**
     *
     */
    def(me, 'getPrevAllByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllByClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithAttributeUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithClassUntil', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithId', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'getPrevAllWithIdUntil', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isChild', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isChildWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isNext', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isNextWithId', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParent', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isParentOrSelf', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isParentOrSelfWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isPrev', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isPrevWithId', function() {
        throw 'implement me!';
    });


    /**
     *
     */
    def(me, 'isSibling', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingByAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingByClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingWithAttribute', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingWithClass', function() {
        throw 'implement me!';
    });

    /**
     *
     */
    def(me, 'isSiblingWithId', function() {
        throw 'implement me!';
    });
}(this.o2, this.document));
