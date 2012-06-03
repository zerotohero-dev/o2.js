/**
 * @module   dom.traverse
 * @requires collection.core
 * @requires core
 * @requires dom.class
 * @requires dom.core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-06-03 00:12:56.288837
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */
(function(framework, document, UNDEFINED) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    var exports = {};

    /*
     * Class Name
     */
    var kModuleName = 'Dom';

    /*
     * Dom (traverse)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $      = require('$');
    var myName = require('name');

    var kAll   = '*';
    var kEmpty = '';

    var nodeType  = require(kModuleName, 'nodeType');
    var kTextNode = attr(nodeType, 'TEXT');

    var getAttribute = require(kModuleName, 'getAttribute');

    var kString       = 'String';
    var format        = require(kString, 'format');
    var generateGuid  = require(kString, 'generateGuid');

    var contains = require('Collection', 'contains');

    /*
     * Selectors
     */
    var kImmediateClassSelector       = '#{0} > .{1}';
    var kImmediateClassAndTagSelector = '#{0} > {1}.{2}';

    /*
     * Checks document.querySelector support.
     * Using document.documentMode for IE, since the compatMode property is
     * deprecated in IE8+ in favor of the documentMode property, and IE7-
     * does not suppory document.querySelector anyway.
     * ref: http://msdn.microsoft.com/en-us/library/cc196988(v=vs.85).aspx
     */
    var isNativeQuerySupported =
        (document.documentMode && document.documentMode >= 8) ||
        (!!document.querySelector);

    /*
     * Checks whether two nodes are equal to one another.
     */
    function isNodeEquals(node, until) {
        if (!node) {
            return false;
        }

        if (!until) {
            return false;
        }

        return $(node) === $(until);
    }

    /*
     * Does the node hava that class?
     */
    function hasClassName(node, name) {
        return node && node.className.indexOf(name) > -1;
    }

    /*
     * Does the node have a given `attribute = value` pair?
     */
    function isAttributeEquals(node, attribute, value) {
        return getAttribute(node, attribute) === value;
    }

    /*
     * Does the node have a given attribute.
     */
    function hasAttribute(node, attribute) {
        return getAttribute(node, attribute) !== UNDEFINED;
    }

    /*
     * Does the node have a class?
     */
    function hasClassAttribute(node) {
        return node && !!node.className;
    }

    /*
     * Does the node have an id?
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
                breakArgs.unshift(node);

                if(breakDelegate.apply(node, breakArgs)) {
                    break;
                }
            }

            if (node.nodeType !== kTextNode) {
                if (filterDelegate) {
                    fArgs.unshift(node);

                    if(filterDelegate.apply(node, fArgs)) {
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
     * A multipurpose method to get next/previous sibling(s).
     */
    //TODO: this name is misleading, rename
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
                breakArgs.unshift(next);

                if(breakDelegate.apply(next, breakArgs)) {
                    break;
                }
            }

            if (next.nodeType !== kTextNode) {
                if (name) {
                    if (next.nodeName === name) {
                        if (filterDelegate) {
                            filterArgs.unshift(next);

                            if (filterDelegate.apply(next, filterArgs)) {
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
                        filterArgs.unshift(next);

                        if (filterDelegate.apply(next, filterArgs)) {
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

        if (returnSingleItemAt !== UNDEFINED) {
            return null;
        }

        return result;
    }

    /*
     * A multifunctional method to get next/previous parent(s).
     */
    //TODO: this name is misleading, rename.
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
                breakArgs.unshift(target);

                if(breakDelegate.apply(target, breakArgs)) {
                    break;
                }
            }

            if (name) {
                if (target.nodeName.toLowerCase() === name.toLowerCase()) {
                    if (filterDelegate) {
                        filterArgs.unshift(target);

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
                    filterArgs.unshift(target);

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
     * Gets child nodes of the elm.
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
     * Executes the filter.
     */
    function execFilter(elm, getter, getterParams,
                checker, checkerParams, stopper, stopperParams, itemsCountCap,
                returnSingleItemAt, isReverse) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        getterParams.unshift(target);

        return filter(
            getter.apply(target, getterParams),
            checker, checkerParams, stopper, stopperParams, itemsCountCap,
            returnSingleItemAt, isReverse
        );
    }

    /**
     * function {static} o2.Dom.getChildren
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildren('container', 'li');
     * </pre>
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of that node.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildren = def(me, 'getChildren', function(elm, name) {
        return execFilter(elm, getChildNodes, [name]);
    });

    /*
     *
     */
    var getChildren = require(me, 'getChildren');

    /**
     * function {static} o2.Dom.getChildrenByAttribute
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element, if they have a matching <strong>attribute</strong> with
     * a given <strong>value</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenByAttribute('container',
     *      'data-user-id', '42');
     * </pre>
     *
     * @param {Object} elm - the <strong>DOM</strong> njode, or the
     * <strong>id</strong> of that node.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenByAttribute = def(me, 'getChildrenByAttribute', function(
                elm, attribute, value, name) {
        // TODO: this comment will be irrelevant after fixing
        // https://github.com/v0lkan/o2.js/issues/58
        //
        // IE7 and IE8 support attribute selectors only if a
        // !DOCTYPE is specified. To maintain compatibility we implement
        // attribute selector without using document.querySelector

        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attribute, value]);
    });

    /*
     *
     */
    var getChildrenByAttribute = require(me, 'getChildrenByAttribute');

    /**
     * @function {static} o2.Dom.getChildrenByAttributeUntil
     *
     * <p>Gets the children of the element until a given node (exclusive).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenByAttributeUntil('container',
     *      'data-user-id', '42', o2.$('stopper'), 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenByAttributeUntil = def(me, 'getChildrenByAttributeUntil',
            function(elm, attribute, value, until, name) {
        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attribute, value], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenByAttributeUntil = require(me,
        'getChildrenByAttributeUntil');

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.Dom.getChildrenByClass
         *
         * <p>Gets the children of the element having a specific class.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var items = o2.Dom.getChildrenByClass('container', 'active', 'li');
         * </pre>
         *
         * @param {Object} elm - the element reference, or a <code>String</code>
         * id of it.
         * @param {String} className - the <strong>CSS</strong> class name.
         * @param {String} name - (Optional; defaults to
         * <code>undefined</code>),
         * if true, only the results with that <strong>node name</strong> (i.e.
         * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
         *
         * @return an <code>Array</code> of nodes, if found; and empty
         * <code>Array</code> if nothing is found.
         */
        exports.getChildrenByClass = def(me, 'getChildrenByClass', function(
                    elm, className, name) {
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
        exports.getChildrenByClass = def(me, 'getChildrenByClass', function(elm,
                    className, name) {
            return execFilter(elm, getChildNodes, [name],
                hasClassName, [className]);
        });
    }

    /*
     *
     */
    var getChildrenByClass = require(me, 'getChildrenByClass');

    /**
     * @function {static} o2.Dom.getChildrenByClassUntil
     *
     * <p>Gets the children of the element having a specific class, and until
     * (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenByClassUntil('container', 'active',
     *      o2.$('stopper'), 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenByClassUntil = def(me, 'getChildrenByClassUntil',
                function(elm, className, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasClassName, [className], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenByClassUntil = require(me, 'getChildrenByClassUntil');

    /**
     * @function {static} o2.Dom.getChildrenUntil
     *
     * <p>Gets the children of the element until
     * (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenUntil('container', o2.$('stopper'), 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenUntil = def(me, 'getChildrenUntil', function(elm, until,
                name) {
        return execFilter(elm, getChildNodes, [name],
            null, [], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenUntil = require(me, 'getChildrenUntil');

    /**
     * @function {static} o2.Dom.getChildrenWithAttribute
     *
     * <p>Gets the children of the element having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithAttribute('container', 'data-user-id',
     * 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenWithAttribute = def(me, 'getChildrenWithAttribute',
                function(elm, attribute, name) {
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute]);
    });

    /*
     *
     */
    var getChildrenWithAttribute = require(me, 'getChildrenWithAttribute');

    /**
     * @function {static} o2.Dom.getChildrenWithAttributeUntil
     *
     * <p>Gets the children of the element with a given attribute defined,
     * and until (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithAttributeUntil('content',
     *      'data-user-id', o2.$('stopper'), 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenWithAttributeUntil = def(me,
                'getChildrenWithAttributeUntil', function(elm, attribute, until,
                name) {
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute], isNodeEquals, [until]);
    });

    var getChildrenWithAttributeUntil = require(me,
        'getChildrenWithAttributeUntil');

    /**
     * @function {static} o2.Dom.getChildrenWithClass
     *
     * <p>Gets the children of the element with a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenWithClass = def(me, 'getChildrenWithClass', function(elm,
                name) {
        return execFilter(elm, getChildNodes, [name], hasClassAttribute, []);
    });

    /*
     *
     */
    var getChildrenWithClass = require(me, 'getChildrenWithClass');

    /**
     * @function {static} o2.Dom.getChildrenWithClassUntil
     *
     * <p>Gets the children of the element with a "class" attribute defined,
     * and until (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithClassUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenWithClassUntil = def(me, 'getChildrenWithClassUntil',
                function(elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasClassAttribute, [], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenWithClassUntil = require(me, 'getChildrenWithClassUntil');

    /**
     * @function {static} o2.Dom.getChildrenWithId
     *
     * <p>Gets the children of the element with an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenWithId = def(me, 'getChildrenWithId', function(elm,
                name) {
        return execFilter(elm, getChildNodes, [name], hasIdAttribute, []);
    });

    /*
     *
     */
    var getChildrenWithId = require(me, 'getChildrenWithId');

    /**
     * @function {static} o2.Dom.getChildrenWithIdUntil
     *
     * <p>Gets the children of the element with an "id" attribute defined,
     * and until (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithIdUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenWithIdUntil = def(me, 'getChildrenWithIdUntil', function(
                elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasIdAttribute, [], isNodeEquals, [until]);
    });

    /*
     *
     */
    var getChildrenWithIdUntil = require(me, 'getCHildrenWithIdUntil');

    /**
     * @function {static} o2.Dom.getElements
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElements('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getElements = def(me, 'getElements', function(elm, name) {
        var target = $(elm);

        if (!target) {
            return [];
        }

        return target.getElementsByTagName(name || kAll);
    });

    /*
     *
     */
    var getElements = require(me, 'getElements');

    /**
     * @function {static} o2.Dom.getElementsByAttribute
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, filtering
     * the nodes having a given attribute equals to a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * HTML <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getElementsByAttribute = def(me, 'getElementsByAttribute',
                function(elm, attribute, value, name) {
        return execFilter(elm, getElements, [name],
            isAttributeEquals, [attribute, value]);
    });

    /**
     * @function {static} o2.Dom.getElementsByClass
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * a given <strong>CSS</strong> <strong>class</strong> name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getElementsByClass = def(me, 'getElementsByClass', function(elm,
                className, name) {
        return execFilter(elm, getElements, [name], hasClassName, [className]);
    });

    /**
     * @function {static} o2.Dom.getElementsWithAttribute
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getElementsWithAttribute = def(me, 'getElementsWithAttribute',
                function(elm, attribute, name) {
        return execFilter(elm, getElements, [name],
            hasAttribute, [attribute], null, []);
    });

    /**
     * @function {static} o2.Dom.getElementsWithClass
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * a '<strong>class</strong>" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getElementsWithClass = def(me, 'getElementsWithClass', function(
                elm, name) {
        return execFilter(elm, getElements, [name],
            hasClassAttribute, [], null, []);
    });

    /**
     * @function {static} o2.Dom.getElementsWithId
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * an '<strong>id</strong>" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getElementsWithId = def(me, 'getElementsWithId', function(elm,
                name) {
        return execFilter(elm, getElements, [name], hasIdAttribute, []);
    });

    /**
     * @function {static} o2.Dom.getSiblings
     *
     * <p>Gets the siblings of the element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblings('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblings = def(me, 'getSiblings', function(elm, name) {
        return !elm ? [] : getChildren(elm.parentNode, name);
    });

    /*
     *
     */
    var getSiblings = require(me, 'getSiblings');

    /**
     * @function {static} o2.Dom.getSiblingsByAttribute
     *
     * <p>Gets the siblings of the element, having a given attribute equals
     * a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsByAttribute = def(me, 'getSiblingsByAttribute', function(
                elm, attribute, value, name) {
        return !elm ? [] : getChildrenByAttribute(elm.parentNode,
            attribute, value, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsByAttributeUntil
     *
     * <p>Gets the siblings of the element, having a given attribute equals
     * a given value, until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByAttributeUntil('content', 'data-id',
     *      '42', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsByAttributeUntil = def(me, 'getSiblingsByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return !elm ? [] : getChildrenByAttributeUntil(elm.parentNode,
            attribute, value, until, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsByClass
     *
     * <p>Gets the siblings of the element, having a given class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsByClass = def(me, 'getSiblingsByClass', function(elm,
                name) {
        return !elm ? [] : getChildrenByClass(elm.parentNode, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsByClassUntil
     *
     * <p>Gets the siblings of the element, having a given class name,
     * until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByClassUntil('content', 'selected',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsByClassUntil = def(me, 'getSiblingsByClassUntil',
                function(elm, until, name) {
        return !elm ? [] : getChildrenByClassUntil(elm.parentNode, until,
            name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsUntil
     *
     * <p>Gets the siblings of the element until (but not included to) a
     * specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsUntil = def(me, 'getSiblingsUntil',  function(elm,
                until, name) {
        return !elm ? [] : getChildrenUntil(elm.parentNode, until, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithAttribute
     *
     * <p>Gets the siblings of the element, having a given attribute
     * defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithAttribute('content', 'dada-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsWithAttribute = def(me, 'getSiblingsWithAttribute',
                function(elm, attribute, name) {
        return !elm ? [] : getChildrenWithAttribute(elm.parentNode,
            attribute, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithAttributeUntil
     *
     * <p>Gets the siblings of the element, having a given attribute
     * defined, until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithAttributeUntil('content', 'data-id',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsWithAttributeUntil = def(me,
                'getSiblingsWithAttributeUntil',  function(elm, attribute,
                until, name) {
        return !elm ? [] : getChildrenWithAttributeUntil(elm.parentNode,
            attribute, until, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithClass
     *
     * <p>Gets the siblings of the element, having "class" attribute
     * defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsWithClass = def(me, 'getSiblingsWithClass',  function(
                elm, name) {
        return !elm ? [] : getChildrenWithClass(elm.parentNode, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithClassUntil
     *
     * <p>Gets the siblings of the element, having a "class" attribute
     * defined, until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithClassUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsWithClassUntil = def(me, 'getSiblingsWithClassUntil',
                function(elm, until, name) {
        return !elm ? [] : getChildrenWithClassUntil(elm.parentNode, until,
            name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithId
     *
     * <p>Gets the siblings of the element, having an "id" attribute
     * defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsWithId = def(me, 'getSiblingsWithId',  function(elm,
                name) {
        return !elm ? [] : getChildrenWithId(elm.parentNode, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithIdUntil
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithIdUntil('content', 'stopper', 'li');
     * </pre>
     *
     * <p>Gets the siblings of the element, having an "id" attribute
     * defined, until (but not included to) a specific node.</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getSiblingsWithIdUntil = def(me, 'getSiblingsWithIdUntil',
                function(elm, until, name) {
        return !elm ? [] : getChildrenWithIdUntil(elm.parentNode, until, name);
    });

    /**
     * @function {static} o2.Dom.getFirst
     *
     * <p>Gets the first sibling of the element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirst('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirst = def(me, 'getFirst', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirst = require(me, 'getFirst');

    /**
     * @function {static} o2.Dom.getFirstByAttribute
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having an attibute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstByAttribute = def(me, 'getFirstByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstByAttribute = require(me, 'getFirstByAttribute');

    /**
     * @function {static} o2.Dom.getFirstByClass
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstByClass = def(me, 'getFirstByClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstByClass = require(kModuleName, 'getFirstByClass');

    /**
     * @function {static} o2.Dom.getFirstWithAttribute
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstWithAttribute = def(me, 'getFirstWithAttribute', function(
                elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstWithAttribute = require(kModuleName, 'getFirstWithAttribute');

    /**
     * @function {static} o2.Dom.getFirstWithClass
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstWithClass = def(me, 'getFirstWithClass', function(elm,
                name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstWithClass = require(kModuleName, 'getFirstWithClass');

    /**
     * @function {static} o2.Dom.getFirstWithId
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstWithId = def(me, 'getFirstWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    var getFirstWithId = require(kModuleName, 'getFirstWithId');

    /**
     * @function {static} o2.Dom.getFirstChild
     *
     * <p>Gets the first child of the element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstChild('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstChild = def(me, 'getFirstChild', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getFirst(elm.firstChild, name);
    });

    /**
     * @function {static} o2.Dom.getFirstChildByAttribute
     *
     * <p>Gets the first child of the element that's not a text node, and
     * having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstChildByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstChildByAttribute = def(me, 'getFirstChildByAttribute',
                function(elm, attribute, value, name) {
        if (!elm) {
            return null;
        }

        return getFirstByAttribute(elm.firstChild, attribute, value, name);
    });

    /**
     * @function {static} o2.Dom.getFirstChildByClass
     *
     * <p>Gets the first child of the element that's not a text node, and
     * having a given class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstChildByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstChildByClass = def(me, 'getFirstChildByClass', function(elm,
                className, name) {
        if (!elm) {
            return null;
        }

        return getFirstByClass(elm.firstChild, className, name);
    });

    /**
     * @function {static} o2.Dom.getFirstChildWithAttribute
     *
     * <p>Gets the first child of the element that's not a text node, and
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstChildWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstChildWithAttribute = def(me, 'getFirstChildWithAttribute',
                function(elm, attribute, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithAttribute(elm.firstChild, attribute, name);
    });

    /**
     * @function {static} o2.Dom.getFirstChildWithClass
     *
     * <p>Gets the first child of the element that's not a text node, and
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstChildWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstChildWithClass = def(me, 'getFirstChildWithClass', function(
                elm, name) {
        if (!elm) {
            return null;
        }

        return getFirstWithClass(elm.firstChild, name);
    });

    /**
     * @function {static} o2.Dom.getFirstChildWithId
     *
     * <p>Gets the first child of the element that's not a text node, and
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstChildWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstChildWithId = def(me, 'getFirstChildWithId', function(elm,
                name) {
        if (!elm) {
            return null;
        }

        return getFirstWithId(elm.firstChild, name);
    });

    /**
     * @function {static} o2.Dom.getLast
     *
     * <p>Gets the last sibling of the element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLast('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLast = def(me, 'getLast', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name,
            null, 0, true, true);
    });

    /*
     *
     */
    var getLast = require(kModuleName, 'getLast');

    /**
     * @function {static} o2.Dom.getLastByAttribute
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastByAttribute = def(me, 'getLastByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastByAttribute = require(kModuleName, 'getLastByAttribute');

    /**
     * @function {static} o2.Dom.getLastByClass
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has a given class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastByClass = def(me, 'getLastByClass', function(elm, className,
                name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastByClass = require(kModuleName, 'getLastByClass');

    /**
     * @function {static} o2.Dom.getLastWithId
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastWithId = def(me, 'getLastWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastWithId = require(kModuleName, 'getLastWithId');

    /**
     * @function {static} o2.Dom.getLastWithAttribute
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastWithAttribute = def(me, 'getLastWithAttribute', function(
                elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastWithAttribute = require(kModuleName, 'getLastWithAttribute');

    /**
     * @function {static} o2.Dom.getLastWithClass
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastWithClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastWithClass = def(me, 'getLastWithClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    var getLastWithClass = require(kModuleName, 'getLastWithClass');

    /**
     * @function {static} o2.Dom.getLastChild
     *
     * <p>Gets the last child of the element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastChild('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastChild = def(me, 'getLastChild', function(elm, name) {
        if (!elm) {
            return null;
        }

        return getLast(elm.lastChild, name);
    });

    /**
     * @function {static} o2.Dom.getLastChildByAttribute
     *
     * <p>Gets the last child of the element that's not a text node, and
     * having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastChildByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastChildByAttribute = def(me, 'getLastChildByAttribute',
                function(elm, attribute, value, name) {
        if (!elm) {
            return null;
        }

        return getLastByAttribute(elm.lastChild, attribute, value, name);
    });

    /**
     * @function {static} o2.Dom.getLastChildByClass
     *
     * <p>Gets the last child of the element that's not a text node, and
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastChildByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastChildByClass = def(me, 'getLastChildByClass', function(elm,
                className, name) {
        if (!elm) {
            return null;
        }

        return getLastByClass(elm.lastChild, className, name);
    });

    /**
     * @function {static} o2.Dom.getLastChildWithAttribute
     *
     * <p>Gets the last child of the element that's not a text node, and
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastChildWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastChildWithAttribute = def(me, 'getLastChildWithAttribute',
                function(elm, attribute, name) {
        if (!elm) {
            return null;
        }

        return getLastWithAttribute(elm.lastChild, attribute, name);
    });

    /**
     * @function {static} o2.Dom.getLastChildWithClass
     *
     * <p>Gets the last child of the element that's not a text node, and
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastChildWithClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastChildWithClass = def(me, 'getLastChildWithClass', function(
                elm, className, name) {
        if (!elm) {
            return null;
        }

        return getLastWithClass(elm.lastChild, className, name);
    });

    /**
     * @function {static} o2.Dom.getLastChildWithId
     *
     * <p>Gets the last child of the element that's not a text node, and
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastChildWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last child available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastChildWithId = def(me, 'getLastChildWithId', function(elm,
                name) {
        if (!elm) {
            return null;
        }

        return getLastWithId(elm.lastChild, name);
    });

    /**
     * @function {static} o2.Dom.getNext
     *
     * <p>Gets the next sibling of the element, that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNext('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNext = def(me, 'getNext', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextByAttribute
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextByAttribute('content', 'data-id', '42', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextByAttribute = def(me, 'getNextByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextByClass
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextByClass('content', 'selected', 'li');
     * </pre>
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having a given <strong>CSS</strong> class name.</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextByClass = def(me, 'getNextByClass', function(elm, className,
                name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextWithAttribute
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextWithAttribute = def(me, 'getNextWithAttribute', function(
                elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextWithClass
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextWithClass = def(me, 'getNextWithClass', function(elm, name) {
        return getNextSiblings(elm,hasClassAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextWithId
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextWithId = def(me, 'getNextWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextAll
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAll('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAll = def(me, 'getNextAll', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name);
    });

    /*
     *
     */
    var getNextAll = require(kModuleName, 'getNextAll');

    /**
     * @function {static} o2.Dom.getNextAllByAttribute
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllByAttribute = def(me, 'getNextAllByAttribute', function(
                elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllByAttributeUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an attribute with a given value, until (but not included
     * to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByAttributeUntil('content', 'data-id', '42',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllByAttributeUntil = def(me, 'getNextAllByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return getNextSiblings(elm,
            isAttributeEquals, [attribute, value], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllByClass
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllByClass = def(me, 'getNextAllByClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllByClassUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given <strong>CSS</strong> class name, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByClassUntil('content', 'selected',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllByClassUntil = def(me, 'getNextAllByClassUntil', function(
                elm, className, until, name) {
        return getNextSiblings(elm, hasClassName, [className],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, until (but not included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllUntil = def(me, 'getNextAllUntil', function(elm, until,
                name) {
        return getNextSiblings(elm, null, [], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithAttribute
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllWithAttribute = def(me, 'getNextAllWithAttribute',
                function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithAttributeUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given attribute defined, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithAttributeUntil('content', 'data-id',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllWithAttributeUntil = def(me,
                'getNextAllWithAttributeUntil',
                function(elm, attribute, until, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithClass
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllWithClass = def(me, 'getNextAllWithClass', function(elm,
                name) {
        return getNextSiblings(elm, hasClassAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithClassUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a "class" attribute defined, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithClassUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllWithClassUntil = def(me, 'getNextAllWithClassUntil',
                function(elm, until, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithId
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllWithId = def(me, 'getNextAllWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithIdUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an "id" attribute defined, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithIdUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getNextAllWithIdUntil = def(me, 'getNextAllWithIdUntil', function(
                elm, until, name) {
        return getNextSiblings(elm, hasIdAttribute, [], isNodeEquals, [until],
            name);
    });

    /**
     * @function {static} o2.Dom.getNth
     *
     * <p>Gets n<sup>th</sup> non-text-node sibling of an element, starting
     * from the first sibling.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNth('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNth = def(me, 'getNth', function(elm, n, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, n, true);
    });

    var getNth = require(kModuleName, 'getNth');

    /**
     * @function {static} o2.Dom.getNthByAttribute
     *
     * <p>Gets n<sup>th</sup> non-text-node sibling of an element, starting
     * from the first sibling, having a given attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthByAttribute('content', 'data-id', '42', 42);
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthByAttribute = def(me, 'getNthByAttribute', function(elm,
                attribute, value, n, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthByAttribute = require(kModuleName, 'getNthByAttribute');

    /**
     * @function {static} o2.Dom.getNthByClass
     *
     * <p>Gets n<sup>th</sup> non-text-node sibling of an element, starting
     * from the first sibling, having a given <strong>CSS</strong>
     * class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthByAttribute('content', 'selected', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthByClass = def(me, 'getNthByClass', function(elm, className,
                n, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthByClass = require(kModuleName, 'getNthByClass');

    /**
     * @function {static} o2.Dom.getNthWithAttribute
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthWithAttribute('content', 'data-id', 42, 'li');
     * </pre>
     *
     * <p>Gets n<sup>th</sup> non-text-node sibling of an element, starting
     * from the first sibling, having a given attribute defined.</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthWithAttribute = def(me, 'getNthWithAttribute', function(elm,
                attribute, n, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthWithAttribute = require(kModuleName, 'getNthWithAttribute');

    /**
     * @function {static} o2.Dom.getNthWithClass
     *
     * <p>Gets n<sup>th</sup> non-text-node sibling of an element, starting
     * from the first sibling, having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthWithClass('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthWithClass = def(me, 'getNthWithClass', function(elm, n,
                name) {
        return getNextSiblings(elm, hasClassAttribute, [], null, [],
            name, null, n, true);
    });

    /*
     *
     */
    var getNthWithClass = require(kModuleName, 'getNthWithClass');

    /**
     * @function {static} o2.Dom.getNthWithId
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthWithId('content', 42, 'li');
     * </pre>
     *
     * <p>Gets n<sup>th</sup> non-text-node sibling of an element, starting
     * from the first sibling, having an "id" attribute defined.</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthWithId = def(me, 'getNthWithId', function(elm, n, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, n, true);
    });

    /*
     *
     */
    var getNthWithId = require(kModuleName, 'getNthWithId');

    /**
     * @function {static} o2.Dom.getNthChild
     *
     * <p>Gets n<sup>th</sup> non-text-node child of an element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthChild('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> child available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthChild = def(me, 'getNthChild', function(elm, n, name) {
        if (!elm) {
            return null;
        }

        return getNth(elm.firstChild, n, name);
    });

    /**
     * @function {static} o2.Dom.getNthChildByAttribute
     *
     * <p>Gets n<sup>th</sup> non-text-node child of an element, having
     * a given attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthChildByAttribute('content', 'data-id', '42', 42);
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> child available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthChildByAttribute = def(me, 'getNthChildByAttribute', function(
                elm, attribute, value, n, name) {
        if (!elm) {
            return null;
        }

        return getNthByAttribute(elm.firstChild, attribute, value, n, name);
    });

    /**
     * @function {static} o2.Dom.getNthChildByClass
     *
     * <p>Gets n<sup>th</sup> non-text-node child of an element, having a
     * given attribute with a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthChildByClass('content', 'selected', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> child available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthChildByClass = def(me, 'getNthChildByClass', function(elm,
                className, n, name) {
        if (!elm) {
            return null;
        }

        return getNthByClass(elm.firstChild, className, n, name);
    });

    /**
     * @function {static} o2.Dom.getNthChildWithAttribute
     *
     * <p>Gets n<sup>th</sup> non-text-node child of an element,
     * with a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthChildWithAttribute('content', 'data-id', 42);
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> child available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthChildWithAttribute = def(me, 'getNthChildWithAttribute',
                function(elm, attribute, n, name) {
        if (!elm) {
            return null;
        }

        return getNthWithAttribute(elm.firstChild, attribute, n, name);
    });

    /**
     * @function {static} o2.Dom.getNthChildWithClass
     *
     * <p>Gets n<sup>th</sup> non-text-node child of an element,
     * with a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthChildWithClass('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> child available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthChildWithClass = def(me, 'getNthChildWithClass', function(
                elm, n, name) {
        if (!elm) {
            return null;
        }

        return getNthWithClass(elm.firstChild, n, name);
    });

    /**
     * @function {static} o2.Dom.getNthChildWithId
     *
     * <p>Gets n<sup>th</sup> non-text-node child of an element,
     * with a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthChildWithId('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> child available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthChildWithId = def(me, 'getNthChildWithId', function(elm, n,
                name) {
        if (!elm) {
            return null;
        }

        return getNthWithId(elm.firstChild, n, name);
    });

    /**
     * @function {static} o2.Dom.getNthNext
     *
     * <p>Gets n<sup>th</sup> non-text-node next sibling of an element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthNext('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> next sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthNext = def(me, 'getNthNext', function(elm, n, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthNextByAttribute
     *
     * <p>Gets n<sup>th</sup> non-text-node next sibling of an element,
     * having a given attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthNextByAttribute('content', 'data-id', '42', 42);
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> next sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthNextByAttribute = def(me, 'getNthNextByAttribute', function(
                elm, attribute, value, n, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthNextByClass
     *
     * <p>Gets n<sup>th</sup> non-text-node next sibling of an element,
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthNextByClass('content', 'selected', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> next sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthNextByClass = def(me, 'getNthNextByClass', function(elm,
                className, n, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthNextWithAttribute
     *
     * <p>Gets n<sup>th</sup> non-text-node next sibling of an element,
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthNextWithAttribute('content', 'data-id', 42);
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> next sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthNextWithAttribute = def(me, 'getNthNextWithAttribute',
                function(elm, attribute, n, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthNextWithClass
     *
     * <p>Gets n<sup>th</sup> non-text-node next sibling of an element,
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthNextWithClass('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> next sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthNextWithClass = def(me, 'getNthNextWithClass', function(elm,
                n, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthNextWithId
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthNextWithId('content', 42, 'li');
     * </pre>
     *
     * <p>Gets n<sup>th</sup> non-text-node next sibling of an element,
     * having an "id" attribute defined.</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> next sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthNextWithId = def(me, 'getNthNextWithId', function(elm, n,
                name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthParent
     *
     * <p>Gets n<sup>th</sup> parent node of an element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthParent('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthParent = def(me, 'getNthParent', function(elm, n, name) {
        return getParents(elm, null, [], null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthParentByAttribute
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthParentByAttribute('content', 'data-id', '42',
     *      42, 'li');
     * </pre>
     *
     * <p>Gets n<sup>th</sup> parent node of an element, having a given
     * attribute with a given value.</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthParentByAttribute = def(me, 'getNthParentByAttribute',
                function(elm, attribute, value, n, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthParentByClass
     *
     * <p>Gets n<sup>th</sup> parent node of an element, having a given
     * class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthParentByClass('content', 'selected', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthParentByClass = def(me, 'getNthParentByClass', function(elm,
                className, n, name) {
        return getParents(elm, hasClassName, [className],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthParentWithAttribute
     *
     * <p>Gets n<sup>th</sup> parent node of an element, having a given
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthParentWithAttribute('content', 'data-id', 42);
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthParentWithAttribute = def(me, 'getNthParentWithAttribute',
                function(elm, attribute, n, name) {
        return getParents(elm, hasAttribute, [attribute],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthParentWithClass
     *
     * <p>Gets n<sup>th</sup> parent node of an element, having a "class"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthParentWithClass('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthParentWithClass = def(me, 'getNthParentWithClass',
                function(elm, n, name) {
        return getParents(elm, hasClassAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthParentWithId
     *
     * <p>Gets n<sup>th</sup> parent node of an element, having an "id"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthParentWithId('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getNthParentWithId = def(me, 'getNthParentWithId', function(elm,
                n, name) {
       return getParents(elm, hasIdAttribute, [],
            null, [], name, null, n);
    });

    /**
     * @function {static} o2.Dom.getNthPrev
     *
     * <p>Gets n<sup>th</sup> previous sibling of an element that's not a
     * text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthPrev('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> previous sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthPrev = def(me, 'getNthPrev', function(elm, n, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, n, false, true);
    });

    /**
     * @function {static} o2.Dom.getNthPrevByAttribute
     *
     * <p>Gets n<sup>th</sup> previous sibling of an element that's not a
     * text node, having a given attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthPrevByAttribute('content', 'data-id', '42',
     *      42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> previous sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthPrevByAttribute = def(me, 'getNthPrevByAttribute', function(
                elm, attribute, value, n, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.Dom.getNthPrevByClass
     *
     * <p>Gets n<sup>th</sup> previous sibling of an element that's not a
     * text node, having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthPrevByClass('content', 'selected', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> previous sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthPrevByClass = def(me, 'getNthPrevByClass', function(elm,
                className, n, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.Dom.getNthPrevWithAttribute
     *
     * <p>Gets n<sup>th</sup> previous sibling of an element that's not a
     * text node, having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthPrevWithAttribute('content', 'data-id', 42);
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> previous sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthPrevWithAttribute = def(me, 'getNthPrevWithAttribute',
                function(elm, attribute, n, name) {
       return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.Dom.getNthPrevWithClass
     *
     * <p>Gets n<sup>th</sup> previous sibling of an element that's not a
     * text node, having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthPrevWithClass('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> previous sibling available with the given
     * criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthPrevWithClass = def(me, 'getNthPrevWithClass', function(elm,
                n, name) {
       return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.Dom.getNthPrevWithId
     *
     * <p>Gets n<sup>th</sup> previous sibling of an element that's not a
     * text node, having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNthPrevWithId('content', 42, 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Integer} n - the element index.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the n<sup>th</sup> previous sibling available with the
     * given criteria, if found; <code>null</code> otherwise.
     */
    exports.getNthPrevWithId = def(me, 'getNthPrevWithId', function(elm, n,
                name) {
       return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, n, false, true);
    });

    /**
     * @function {static} o2.Dom.getParent
     *
     * <p>Gets the parent node of an element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParent('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    //TODO: getParent, getParents, getPrev, getPrevAll, getNext, getNextAll,
    //getParentOrSelf, should also be able to get a filter delegate
    //instead of a String `name` argument.
    exports.getParent = def(me, 'getParent', function(elm, name) {
        return getParents(elm, null, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentByAttribute
     *
     * <p>Gets the parent node of an element, having an attribute with a
     * given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentByAttribute('content', 'data-id', '42', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentByAttribute = def(me, 'getParentByAttribute', function(elm,
                attribute, value, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentByClass
     *
     * <p>Gets the parent node of an element, having a given
     * <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentByClass = def(me, 'getParentByClass', function(elm,
                className, name) {
        return getParents(elm, hasClassName, [className],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentWithAttribute
     *
     * <p>Gets the parent node of an element, having a given
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentWithAttribute('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentWithAttribute = def(me, 'getParentWithAttribute',
                function(elm, attribute, name) {
        return getParents(elm, hasAttribute, [attribute],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentWithClass
     *
     * <p>Gets the parent node of an element, having a "class"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentWithClass = def(me, 'getParentWithClass', function(elm,
                name) {
        return getParents(elm, hasClassAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentWithId
     *
     * <p>Gets the parent node of an element, having an "id"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentWithId = def(me, 'getParentWithId', function(elm, name) {
        return getParents(elm, hasIdAttribute, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParents
     *
     * <p>Gets all the parent nodes of an element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParents('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParents = def(me, 'getParents', function(elm, name) {
        return getParents(elm, null, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByAttribute
     *
     * <p>Gets all the parent nodes of an element, having a given attribute
     * with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsByAttribute = def(me, 'getParentsByAttribute', function(
                elm, attribute, value, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByAttributeUntil
     *
     * <p>Gets all the parent nodes of an element, having a given attribute
     * with a given value, until (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByAttributeUntil('content', 'data-id', '42',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Object} until - the <strong>DOM</strong> node that the traversal
     * will be made until, or its <code>String</code> id,
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsByAttributeUntil = def(me, 'getParentsByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByClass
     *
     * <p>Gets all the parent nodes of an element, having a given
     * <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsByClass = def(me, 'getParentsByClass', function(elm,
                className, name) {
        return getParents(elm, hasClassName, [className], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByClassUntil
     *
     * <p>Gets all the parent nodes of an element, having a given
     * <strong>CSS</strong> class name, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByClassUntil('content', 'selected',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsByClassUntil = def(me, 'getParentsByClassUntil',
                function(elm, className, until, name) {
        return getParents(elm, hasClassName, [className],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsUntil
     *
     * <p>Gets all the parent nodes of an element, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsUntil = def(me, 'getParentsUntil', function(elm, until,
                name) {
        return getParents(elm, null, [], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithAttribute
     *
     * <p>Gets all the parent nodes of an element, having a given
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsWithAttribute = def(me, 'getParentsWithAttribute',
                function(elm, attribute, name) {
        return getParents(elm, hasAttribute, [attribute], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithAttributeUntil
     *
     * <p>Gets all the parent nodes of an element, having a given
     * attribute defined, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithAttributeUntil('content', 'data-id',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsWithAttributeUntil = def(me,
                'getParentsWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getParents(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithClass
     *
     * <p>Gets all the parent nodes of an element, having a "class"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsWithClass = def(me, 'getParentsWithClass', function(elm,
                name) {
        return getParents(elm, hasClassAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithClassUntil
     *
     * <p>Gets all the parent nodes of an element, having a "class"
     * attribute defined, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithClass('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsWithClassUntil = def(me, 'getParentsWithClassUntil',
                function(elm, until, name) {
        return getParents(elm, hasClassAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithId
     *
     * <p>Gets all the parent nodes of an element, having an "id"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsWithId = def(me, 'getParentsWithId', function(elm, name) {
        return getParents(elm, hasIdAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithIdUntil
     *
     * <p>Gets all the parent nodes of an element, having an "id"
     * attribute defined, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithIdUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsWithIdUntil = def(me, 'getParentsWithIdUntil', function(
                elm, until, name) {
        return getParents(elm, hasIdAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getPrev
     *
     * <p>Gets the previous sibling of an element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrev('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrev = def(me, 'getPrev', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevByAttribute
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevByAttribute('content', 'data-id', '42', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - i the value of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevByAttribute = def(me, 'getPrevByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevByClass
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevByClass = def(me, 'getPrevByClass', function(elm, className,
                name) {
       return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevWithAttribute
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevWithAttribute = def(me, 'getPrevWithAttribute', function(elm,
                attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevWithClass
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevWithClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevWithClass = def(me, 'getPrevWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevWithId
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevWithId('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevWithId = def(me, 'getPrevWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAll
     *
     * <p>Gets all previous sibling of an element, that are not text nodes.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAll('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAll = def(me, 'getPrevAll', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, null, false, true);
    });

    /*
     *
     */
    var getPrevAll = require(kModuleName, 'getPrevAll');

    /**
     * @function {static} o2.Dom.getPrevAllByAttribute
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByAttribute = def(me, 'getPrevAllByAttribute', function(
                elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllByAttributeUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute with a given value, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByAttributeUntil('content', 'data-id',
     *      '42', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByAttributeUntil = def(me, 'getPrevAllByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllByClass
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByClass = def(me, 'getPrevAllByClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllByClassUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given <strong>CSS</strong> class name, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByClassUntil('content', 'selected',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByClassUntil = def(me, 'getPrevAllByClassUntil',
                function(elm, className, until, name) {
        return getNextSiblings(elm, hasClassName, [className],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * until (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllUntil = def(me, 'getPrevAllUntil', function(elm, until,
                name) {
        return getNextSiblings(elm, null, [], isNodeEquals, [until],
            name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithAttribute
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithAttribute = def(me, 'getPrevAllWithAttribute',
                function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute], null, [],
            name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithAttributeUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute defined, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithAttributeUntil('content', 'data-id',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithAttributeUntil = def(me,
                'getPrevAllWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithClass
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithClass = def(me, 'getPrevAllWithClass', function(elm,
                name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithClassUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a "class" attribute defined, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithClassUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithClassUntil = def(me, 'getPrevAllWithClassUntil',
                function(elm, until, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithId
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithId = def(me, 'getPrevAllWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithIdUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having an "id" attribute defined, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithIdUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithIdUntil = def(me, 'getPrevAllWithIdUntil', function(
                elm, until, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.isChild
     *
     * <p>Checks whether <strong>elm</strong> is the child of
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isChild = o2.Dom.isChild('child', 'parent');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a child of
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isChild = def(me, 'isChild', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getChildren(ref), elm);
    });

    /**
     * @function {static} o2.Dom.isNext
     *
     * <p>Checks whether <strong>elm</strong> is a sibling after
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNext = o2.Dom.isNext('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a sibling after
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isNext = def(me, 'isNext', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getNextAll(ref), elm);
    });

    /**
     * @function {static} o2.Dom.isParent
     *
     * <p>Checks whether <strong>elm</strong> is a parent of
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isParent = o2.Dom.isParent('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a parent of
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isParent = def(me, 'isParent', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getParents(ref), elm);
    });

    /*
     *
     */
    var isParent = require(kModuleName, 'isParent');

    /**
     * @function {static} o2.Dom.isParentOrSelf
     *
     * <p>Checks whether <strong>elm</strong> is parent of
     * <strong>ref</strong>, or it's the <strong>ref</strong> itself.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isParent = o2.Dom.isParentOrSelf('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a parent of
     * <strong>ref</strong>, or the node itself; <code>false</code> otherwise.
     */
    exports.isParentOrSelf = def(me, 'isParentOrSelf', function(elm, ref) {
        if (!ref) {
            return false;
        }

        if (ref === elm) {
            return true;
        }

        return isParent(elm, ref);
    });

    /**
     * @function {static} o2.Dom.isPrev
     *
     * <p>Checks whether <strong>elm</strong> is a sibling before
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isParent = o2.Dom.isPrev('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a sibling before
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isPrev = def(me, 'isPrev', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getPrevAll(ref), elm);
    });

    /**
     * @function {static} o2.Dom.isSibling
     *
     * <p>Checks whether <strong>elm</strong> is a sibling of
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isSibling = o2.Dom.isSibling('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a sibling of
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isSibling = def(me, 'isSibling', function(elm, ref) {
        if (!ref) {
            return false;
        }

        return contains(getSiblings(ref), elm);
    });
}(this.o2, this.document));
