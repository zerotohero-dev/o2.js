/**
 * @module   domhelper.traverse
 * @requires stringhelper.core
 * @requires domhelper.core
 * @requires domhelper.class
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-24 09:08:45.043620
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */

(function(framework) {
    'use strict';

    /*
     * Aliases
     */
    var me                    = framework.DomHelper;
    var $                     = framework.$;
    var myName                = framework.name;
    var getAttribute          = me.getAttribute;
    var generateGuid          = framework.StringHelper.generateGuid;
    var format                = framework.StringHelper.format;
    var createClassNameRegExp = framework.DomHelper.createClassNameRegExp;

    /*
     * Common Constants
     */
    var kTextNode = me.nodeType.TEXT;
    var kAll      = '*';
    var kObject   = 'object';
    var kEmpty    = '';
    var kId       = 'id';
    var kComma    = ',';

    /*
     * Query Selector Templates
     */
    var kClassSelector                = '.{0}';
    var kImmediateClassSelector       = '#{0} > .{1}';
    var kImmediateIdAttributeSelector = '#{0} > [id]';
    var kImmediateIdSelector          = '#{0} > #{1}';
    var kImmediateNodeSelector        = '#{0} > {1}';

    var isNativeQuerySupported = !!document.querySelector;

    /*
     *
     */
    function filterChildren(children, regClassName) {
        var child = null;
        var result = [];
        var i = 0;
        var len = 0;

        for (i = 0, len = children.length; i < len; i++) {
            child = children[i];

            if (regClassName.test(child.className)) {
                result.push(children[i]);
            }
        }

        return result;
    }

    /**
     * @function {static} o2.DomHelper.getParent
     *
     * <p>gets the first parent element with the given node name.</p>
     *
     * @param {DomNode} target - the current <strong>DOM</strong> node, it its
     * <strong>String</strong> id.
     * @param {String} nodeName - the node name to search.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (target) is disregarded while
     * seeking.
     *
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.DomHelper.parent
     *
     * <p>An alias to {@link o2.DomHelper.getParent}.</p>
     *
     * @see o2.DomHelper.getParent
     */

    /**
     * @function {static} o2.DomHelper.closest
     *
     * <p>An alias to {@link o2.DomHelper.getParent}.</p>
     *
     * @see o2.DomHelper.getParent
     */

    /**
     * @function {static} o2.DomHelper.findParent
     *
     * <p>An alias to {@link o2.DomHelper.getParent}.</p>
     *
     * @see o2.DomHelper.getParent
     */
    me.findParent = me.closest = me.parent = me.getParent = function(targetElm,
                nodeName, shouldExcludeSelf) {
        var nodes = null;
        var hasParent = false;
        var targetNodeName = kEmpty;
        var currentNodeName = kEmpty;
        var i = 0;
        var len = 0;

        var target = $(targetElm);

        if (!target) {
            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if (isExcluded) {
            target = target.parentNode;
        }

        if (!target) {
            return null;
        }

        while (target) {
            nodes = nodeName.split(kComma);
            targetNodeName = target.nodeName.toLowerCase();

            for (i = 0, len = nodes.length; i < len; i++) {
                currentNodeName = nodes[i].toLowerCase();

                if (currentNodeName) {
                    if (targetNodeName === currentNodeName) {
                        hasParent = true;

                        break;
                    }
                }
            }

            if (hasParent) {
                return target;
            }

            target = target.parentNode;
        }

        return null;
    };

    /**
     * @function o2.DomHelper.isChild
     *
     * <p>Checks whether the given item is a descendant of
     * the parent node.</p>
     *
     * @param {Object} child - the child node to test, or its
     * <strong>DOM</strong> ID.
     * @param {Object} parent - the parent node to test, or its
     * <strong>DOM</strong> ID.
     * @param {Boolean} isSelfExcluded - (optional;
     * defaults to <code>false</code>) if <code>true</code> the method does
     * <strong>NOT</strong> return <code>true</code>, if child and parent are
     * the same; if <code>false</code> the method will return <code>true</code>,
     * if child and parent are the same.
     *
     * @return <code>true</code> if <strong>child</strong> is a child of
     * <strong>parent</strong>, <code>false</code> otherwise.
     */
    me.isChild = function(child, parent, isSelfExcluded) {
        var shouldExcludeSelf = !!isSelfExcluded;

        child = $(child);
        parent = $(parent);

        if (!child || !parent) {
            return false;
        }

        if (!shouldExcludeSelf && child === parent) {
            return true;
        }

        var node = child.parentNode;

        while (node) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    };

    /**
     * @function {static} o2.DomHelper.isParent
     *
     * <p>An alias to
     * <code>o2.DomHelper.isChild(child, parent, shouldExcludeSelf)</code>.</p>
     *
     * @see o2.DomHelper.isChild
     */
    me.isParent = function(parent, child, isSelfExcluded) {
        return me.isChild(child, parent, isSelfExcluded);
    };

    /**
     * @function {static} o2.DomHelper.getParentByAttribute
     *
     * <p>gets the first parent with an <strong>attribute</strong> equal to the
     * given <strong>value</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node, or its
     * <strong>String</strong> id.
     * @param {String} attribute - the name of the attribute.
     * @param {String} value - the value of the attribute.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     *
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */

    /**
     * @function o2.DomHelper.findParentByAttribute
     *
     * <p>An alias to {@link o2.DomHelper.getParentByAttribute}.</p>
     *
     * @see o2.DomHelper.getParentByAttribute
     */
    me.findParentByAttribute = me.getParentByAttribute = function(obj,
            attribute, value, isSelfExcluded) {
        var shouldExcludeSelf = !!isSelfExcluded;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        if (shouldExcludeSelf) {
            obj = obj.parentNode;
        }

        if (!obj) {
            return null;
        }

        if (getAttribute(obj, attribute) === value) {
            return obj;
        }

        while (obj) {
            if (getAttribute(obj, attribute) === value) {
                return obj;
            }

            obj = obj.parentNode;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.getParentWithAttribute
     *
     * <p>Gets the first parent with a given <strong>attribute</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node, or its
     * <strong>id</strong>.
     * @param {String} attribute - the name of the attribute.
     * @param {Boolean} isSelfExcluded - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     *
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.DomHelper.findParentWithAttribute
     *
     * <p>An alias to {@link o2.DomHelper.getParentWithAttribute}.</p>
     *
     * @see o2.DomHelper.getParentWithAttribute
     */
    me.findParentWithAttribute = me.getParentWithAttribute = function(obj,
                attribute, isSelfExcluded) {
        var shouldExcludeSelf = !!isSelfExcluded;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        if (shouldExcludeSelf) {
            obj = obj.parentNode;
        }

        if(!obj) {
            return null;
        }

        while (obj) {
            if (getAttribute(obj, attribute) !== null) {
                return obj;
            }

            obj = obj.parentNode;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.getParentById
     * <p>This is an alias to</p>
     * <pre>
     * o2.DomHelper.getParentByAttribute(obj, 'id', id, isSelfExcluded)
     * </pre>
     *
     * @see DomHelper.getParentByAttribute
     */

    /**
     * @function {static} o2.DomHelper.findParentById
     *
     * <p>An alias to {@link o2.DomHelper.getParentById}.</p>
     *
     * @see o2.Domhelper.getParentById
     */
    me.findParentById = me.getParentById = function(obj, id, isSelfExcluded) {
        var shouldExcludeSelf = !!isSelfExcluded;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        return me.getParentByAttribute(obj, kId, id, shouldExcludeSelf);
    };

    /**
     * @function {static} o2.DomHelper.getParentWithId
     * <p>This is an alias to</p>
     * <pre>
     * o2.DomHelper.getParentWithAttribute(obj, 'id', value, shouldExcludeSelf)
     * </pre>
     *
     * @see o2.DomHelper.getParentWithAttribute
     */

    /**
     * @function {static} o2.DomHelper.findParentWithId
     *
     * <p>An alias to {@link o2.DomHelper.getParentWithId}.</p>
     *
     * @see o2.DomHelper.getParentWithId
     */
     me.findParentWithId = me.getParentWithId = function(obj, isSelfExcluded) {
        var shouldExcludeSelf = !!isSelfExcluded;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        return me.getParentWithAttribute(obj, kId, shouldExcludeSelf);
    };

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.DomHelper.getFirstChild
         *
         * <p>gets the first child that is not a text-node, and has the given
         * node name.</p>
         *
         * @param {DomNode} targetElm - the current node, or the
         * <strong>id</strong> of it.
         * @param {String} nodeName - the node name to seek. (This parameters is
         * optional. It defaults to '*', which will match any node name.)
         *
         * @return the <code>DOM</code> node if found, <code>null</code>
         * otherwise.
         */
        me.getFirstChild = function(targetElm, nodeName) {
            var target = $(targetElm);

            if (!target) {
                return null;
            }

            if (!target.id) {
                target.id = [myName, generateGuid()].join(kEmpty);
            }

            nodeName = nodeName || kAll;
            nodeName = nodeName.toLowerCase();

            return target.querySelector(
                format(kImmediateNodeSelector, target.id, nodeName)
            );
        };
    } else {
        me.getFirstChild = function(targetElm, nodeName) {
            var target = $(targetElm);

            if (!target) {
                return null;
            }

            nodeName = nodeName || kAll;
            nodeName = nodeName.toLowerCase();

            var children = target.childNodes;

            if (!children || children.length === 0) {
                return null;
            }

            var node = children[0];

            while (node) {
                if (node.nodeType !== kTextNode) {
                    if (nodeName === kAll) {
                        return node;
                    }

                    if (node.nodeName.toLowerCase() === nodeName) {
                        return node;
                    }
                }

                node = node.nextSibling;
            }

            return null;
        };
    }

    /**
     * @function {static} o2.DomHelper.first
     *
     * <p>An alias to {@link o2.DomHelper.getFirstChild}.</p>
     *
     * @see o2.DomHelper.getFirstChild
     */

    /**
     * @function {static} o2.DomHelper.findFirstChild
     *
     * <p>An alias to {@link o2.DomHelper.getFirstChild}.</p>
     *
     * @see o2.DomHelper.getFirstChild
     */
    me.findFirstChild = me.first = me.getFirstChild;

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.DomHelper.getFirstChildById
         *
         * <p>gets the first child that has the given id.</p>
         *
         * @param {DomNode} targetElm - the target to test,
         * or the <strong>id</strong> of it.
         * @param {String} id - the id of the child.
         * @return the <code>DOM</code> node if found,
         * <code>null</code> otherwise.
         */
        me.getFirstChildById = function(targetElm, id) {
            var target = $(targetElm);

            if (!target) {
                return null;
            }

            if (!target.id) {
                target.id = [myName, generateGuid()].join(kEmpty);
            }

            return target.querySelector(
                format(kImmediateIdSelector, target.id, id)
            );
        };
    } else {
        me.getFirstChildById = function(targetElm, id) {
            var target = $(targetElm);

            if (!target) {
                return null;
            }

            var children = target.childNodes;

            if (!children || children.length === 0) {
                return null;
            }

            var node = children[0];

            while (node) {
                if (node.id && node.id === id) {
                    return node;
                }

                node = node.nextSibling;
            }

            return null;
        };
    }

    /**
     * @function {static} o2.DomHelper.firstById
     *
     * <p>An alias to {@link o2.DomHelper.getFirstChildById}.</p>
     *
     * @see o2.DomHelper.getFirstChildById
     */

    /**
     * @function {static} o2.DomHelper.findFirstChildById
     *
     * <p>An alias to {@link o2.DomHelper.getFirstChildById}.</p>
     *
     * @see o2.DomHelper.getFirstChildById
     */
    me.findFirstChildById = me.firstById =  me.getFirstChildById;

    /**
     * @function {static} o2.DomHelper.getSiblings
     *
     * <p>Gets the same-level siblings.</p>
     *
     * @param {DomNode} targetElm - the target, or the <strong>id</strong>
     * of the target to test.
     *
     * @return the same-level siblings if any, an empty <code>Array</code>
     * otherwise.
     */
    me.getSiblings = function(targetElm, parentNodeName) {
        var target = $(targetElm);

        if (!target) {
            return null;
        }

        var nodeName = parentNodeName || kAll;

        var i = 0;
        var len = 0;
        var parent = target.parentNode;

        var children = me.getChildren(parent, nodeName);
        var child = null;

        for (i = 0, len = children.length; i < len; i++) {
            child = children[i];

            if (child === target) {
                children.splice(i, 1);

                return children;
            }
        }

        return children;
    };

    /**
     * @function {static} o2.DomHelper.siblings
     *
     * <p>An alias to {@link o2.DomHelper.getSiblings}.</p>
     *
     * @see o2.DomHelper.getSiblings
     */

    /**
     * @function {static} o2.DomHelper.findSiblings
     *
     * <p>An alias to {@link o2.DomHelper.getSiblings}.</p>
     *
     * @see o2.DomHelper.getSiblings
     */
    me.findSiblings = me.siblings = me.getSiblings;

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.DomHelper.getFirstChildWithId
         *
         * <p>Gets the first child with an <strong>id</strong> attribute.</p>
         *
         * @param {DomNode} targetElm - the target, or the <strong>id</strong>
         * of the target to test.
         *
         * @return the first child with <strong>id</strong> if any,
         * <code>null</code> otherwise.
         */
        me.getFirstChildWithId = function(targetElm) {
            var target = $(targetElm);

            if (!target) {
                return null;
            }

            if (!target.id) {
                target.id = [myName, generateGuid()].join(kEmpty);
            }

            return target.querySelector(
                format(kImmediateIdAttributeSelector, target.id)
            );
        };
    } else {
        me.getFirstChildWithId = function(targetElm) {
            var target = $(targetElm);

            if (!target) {
                return null;
            }

            var children = target.childNodes;

            if (!children || children.length === 0) {
                return null;
            }

            var node = children[0];

            while (node) {
                if (node.id) {
                    return node;
                }

                node = node.nextSibling;
            }

            return null;
        };
    }

    /**
     * @function {static} o2.DomHelper.firstWithId
     *
     * <p>An alias to {@link o2.DomHelper.getFirstChildWithId}.</p>
     *
     * @see o2.DomHelper.getFirstChildWithId
     */

    /**
     * @function o2.DomHelper.findFirstChildWithId
     *
     * <p>An alias to {@link o2.DomHelper.getFirstChildWithId}.</p>
     *
     * @see o2.DomHelper.getFirstChildWithId
     */
    me.findFirstChildWithId = me.firstWithId = me.getFirstChildWithId;

    /**
     * @function {static} o2.DomHelper.getLastChild
     *
     * <p>gets the last child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} targetElm - the current node, or the
     * <strong>id</strong> of it.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     *
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */

    /**
     * @function {static} o2.DomHelper.last
     *
     * <p>An alias to {@link o2.DomHelper.getLastChild}.</p>
     *
     * @see o2.DomHelper.getLastChild
     */

    /**
     * @function {static} o2.DomHelper.findLastChild
     *
     * <p>An alias to {@link o2.DomHelper.getLastChild}.</p>
     *
     * @see o2.DomHelper.getLastChild
     */
    me.findLastChild = me.last = me.getLastChild = function(targetElm,
                nodeName) {
        var target = $(targetElm);

        if (!target) {
            return null;
        }

        // Although this function may be speeded up using  obj.querySelector and
        // :last-child, the :last-child pseudoclass still cannot be reliably
        // used across browsers.
        // In particular, Internet Explorer (6 and 7 and 8), and Safari
        // definitely don't support it, Although Internet Explorer 7 and
        // Safari 3 do support :first-child, curiously.
        // Your best bet is to explicitly add a last-child (or similar) class to
        // that item, and apply li.last-child instead.

        var children = target.childNodes;

        nodeName = nodeName || kAll;
        nodeName = nodeName.toLowerCase();

        if (!children || children.length === 0) {
            return null;
        }

        var node = children[children.length - 1];

        while (node) {
            if (node.nodeType !== kTextNode) {
                if (nodeName === kAll) {
                    return node;
                }

                if (node.nodeName.toLowerCase() === nodeName) {
                    return node;
                }
            }

            node = node.previousSibling;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.getLastChildById
     *
     * <p>gets the last child that has the given id.</p>
     *
     * @param {DomNode} targetElm - the target to test, or the
     * <strong>id</strong> of it.
     * @param {String} id - the id of the child.
     *
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */

    /**
     * @function {static} o2.DomHelper.lastById
     *
     * <p>An alias to {@link o2.DomHelper.getLastChildById}.</p>
     *
     * @see o2.DomHelper.getLastChildById
     */

    /**
     * @function {static} o2.DomHelper.findLastChildById
     *
     * <p>An alias to {@link o2.DomHelper.getLastChildById}.</p>
     *
     * @see o2.DomHelper.getLastChildById
     */
    me.findLastChildById = me.lastById = me.getLastChildById = function(
                targetElm, id) {
        var target = $(targetElm);

        if (!target) {
            return null;
        }

        var children = target.childNodes;

        if (!children || children.length === 0) {
            return null;
        }

        var node = children[children.length - 1];

        while (node) {
            if (node.id && node.id === id) {
                return node;
            }

            node = node.previousSibling;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.getLastChildWithId
     *
     * <p>gets the last child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} targetElm - the target to test, or the
     * <strong>id</strong> of the target.
     *
     * @return the first child with <strong>id</strong> if any,
     * <code>null</code> otherwise.
     */

    /**
     * @function {static} o2.DomHelper.lastWithId
     *
     * <p>An alias to {@link o2.DomHelper.getLastChildWithId}.</p>
     *
     * @see o2.DomHelper.getLastChildWithId
     */

    /**
     * @function {static} o2.DomHelper.findLastChildWithId
     *
     * <p>An alias to {@link o2.DomHelper.getLastChildWithId}.</p>
     *
     * @see o2.DomHelper.getLastChildWithId
     */
    me.findLastChildWithId = me.lastWithId = me.getLastChildWithId = function(
                targetElm) {
        var target = $(targetElm);

        if (!target) {
            return null;
        }

        var children = target.childNodes;

        if (!children || children.length === 0) {
            return null;
        }

        var node = children[children.length - 1];

        while (node) {
            if (node.id) {
                return node;
            }

            node = node.previousSibling;
        }

        return null;
    };

    /**
     * function {static} o2.DomHelper.getChildren
     *
     * <p>Gets the immediate children of the element.</p>
     *
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of that node.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */

    /**
     * @function {static} o2.DomHelper.children
     *
     * <p>An alias to {@link o2.DomHelper.getChildren}.</p>
     *
     * @see o2.DomHelper.getChildren
     */

    /**
     * @function {static} o2.DomHelper.findChildren
     *
     * <p>An alias to {@link o2.DomHelper.getChildren}.</p>
     *
     * @see o2.DomHelper.getChildren
     */
    me.findChildren = me.children = me.descendants = me.getChildren = function(
                elm, nodeName) {
        var target = $(elm);

        nodeName = nodeName || kEmpty;

        var nodes = target.childNodes;
        var result = [];
        var i = 0;
        var len = 0;
        var node = null;

        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];

            if (node.nodeType !== kTextNode) {
                if (nodeName) {
                    if (node.nodeName.toLowerCase() === nodeName.toLowerCase()
                    ) {
                        result.push(node);
                    }
                } else {
                    result.push(node);
                }
            }
        }

        return result;
    };

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.DomHelper.getChildrenByClassName
         *
         * <p>Gets immediate descendants, with a given class name, of the
         * element.</p>
         *
         * @param {DomNode} elm - either the <strong>element</strong>, or the
         * <strong>id</strong> of it.
         * @param {String} c - the className to test.
         *
         * @return the immediate descendants with the given class name.
         */
        me.getChildrenByClassName = function(elm, c) {
            var el = $(elm);

            // NOTE: IE7+ supports child selector ( > ),
            // IE8+ supports querySelectorAll
            // So it's safe to use the child selector with querySelectorAll:
            // It'll work as expected in IE8+ and it'll degrade gracefully
            // in IE7-

            if (!el) {
                return null;
            }

            if (!el.id) {
                el.id = [myName, generateGuid()].join(kEmpty);
            }

            return el.querySelectorAll(
                format(kImmediateClassSelector, el.id, c)
            );
        };
    } else {
        me.getChildrenByClassName = function(elm, c) {
            var el = $(elm);

            if (!el) {
                return null;
            }

            var children = el.childNodes;

            return filterChildren(children, createClassNameRegExp(c));
        };
    }

    /**
     * @function {static} o2.DomHelper.childrenByClassName
     *
     * <p>An alias to {@link o2.DomHelper.getChildrenByClassName}.</p>
     *
     * @see o2.DomHelper.getChildrenByClassName
     */

    /**
     * @function {static} o2.DomHelper.findChildrenByClassName
     *
     * <p>An alias to {@link o2.DomHelper.getChildrenByClassName}.</p>
     *
     * @see o2.DomHelper.getChildrenByClassName
     */
    me.findChildrenByClassName = me.childrenByClassName = me.getChildrenByClassName;

    /**
     * @function {static} o2.DomHelper.getPrevious
     *
     * <p>Gets the previous <strong>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start, or the <strong>id</strong>
     * of it.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.DomHelper.prev
     *
     * <p>An alias to {@link o2.DomHelper.getPrevious}.</p>
     *
     * @see o2.DomHelper.getPrevious
     */

    /**
     * @function {static} o2.DomHelper.findPrevious
     *
     * <p>An alias to {@link o2.DomHelper.getPrevious}.</p>
     *
     * @see o2.DomHelper.getPrevious
     */
    me.findPrevious = me.prev = me.getPrevious = function(target) {
        target = $(target);

        if (!target || typeof target !== kObject) {
            return null;
        }

        var node = target.previousSibling;

        if (!node) {
            return null;
        }

        while (node) {
            if (node.nodeType !== kTextNode) {
                return node;
            }

            node = node.previousSibling;
        }

        return null;
    };

    /**
     * @function o2.DomHelper.getPreviousById
     *
     * <p>gets the previous <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} elmTarget - the original node, or the
     * <strong>id</strong> of it.
     * @param {String} id - the id to check.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.DomHelper.prevById
     *
     * <p>An alias to {@link o2.DomHelper.getPreviousById}.</p>
     *
     * @see o2.DomHelper.getPreviousById
     */

    /**
     * @function {static} o2.DomHelper.findPreviousById
     *
     * <p>An alias to {@link o2.DomHelper.getPreviousById}.</p>
     *
     * @see o2.DomHelper.getPreviousById
     */
    me.findPreviousById = me.prevById = me.getPreviousById = function(
                elmTarget, id) {
        var target = $(elmTarget);

        if (!target) {
            return null;
        }

        var node = target.previousSibling;

        if (!node) {
            return null;
        }

        while(node) {
            if (node.id && node.id === id) {
                return node;
            }

            node = node.previousSibling;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.getPreviousWithId
     *
     * <p>gets the previous <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} elmTarget - the node to start, or the
     * <strong>id</strong> of it.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */

    /**
     * @function o2.DomHelper.prevWithId
     *
     * <p>An alias to {@link o2.DomHelper.getPreviousWithId}.</p>
     *
     * @see o2.DomHelper.getPreviousWithId
     */

    /**
     * @function o2.DomHelper.findPreviousWithId
     *
     * <p>An alias to {@link o2.DomHelper.getPreviousWithId}.</p>
     *
     * @see o2.DomHelper.getPreviousWithId
     */
    me.findPreviousWithId = me.prevWithId = me.getPreviousWithId = function(
                elmTarget) {
        var target = $(elmTarget);

        if (!target) {
            return null;
        }

        var node = target.previousSibling;

        if (!node) {
            return null;
        }

        while (node) {
            if (node.id) {
                return node;
            }

            node = node.previousSibling;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.getNext
     *
     * <p>Gets the next <strong>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} elmTarget - the node to start.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.DomHelper.next
     *
     * <p>An alias to {@link o2.DomHelper.getNext}.</p>
     *
     * @see o2.DomHelper.getNext
     */

    /**
     * @function {static} o2.DomHelper.findNext
     *
     * <p>An alias to {@link o2.DomHelper.getNext}.</p>
     *
     * @see o2.DomHelper.getNext
     */
    me.findNext = me.next = me.getNext = function(elmTarget) {
        var target = $(elmTarget);

        if (!target) {
            return null;
        }

        var node = target.nextSibling;

        if (!node) {
            return null;
        }

        while (node) {
            if (node.nodeType !== kTextNode) {
                return node;
            }

            node = node.nextSibling;
        }

        return null;
    };

    /**
     * @function o2.DomHelper.getNextById
     *
     * <p>gets the next <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} elmTarget - the original node, or the
     * <strong>id</strong> of it.
     * @param {String} id - the id to check.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.DomHelper.findNextById
     *
     * <p>An alias to {@link o2.DomHelper.getNextById}.</p>
     *
     * @see o2.DomHelper.getNextById
     */
    me.findNextById = me.nextById = me.getNextById = function(elmTarget, id) {
        var target = $(elmTarget);

        if (!target) {
            return null;
        }

        var node = target.nextSibling;

        if (!node) {
            return null;
        }

        while (node) {
            if (node.id && node.id === id) {
                return node;
            }

            node = node.nextSibling;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.getNextWithId
     *
     * <p>gets the next <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} elmTarget - the node to start, or the
     * <strong>id</strong> of it.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */

    /**
     * @function {static} o2.DomHelper.nextWithId
     *
     * <p>An alias to {@link o2.DomHelper.getNextWithId}.</p>
     *
     * @see o2.DomHelper.getNextWithId
     */

    /**
     * @function {static} o2.DomHelper.findNextWithId
     *
     * <p>An alias to {@link o2.DomHelper.getNextWithId}.</p>
     *
     * @see o2.DomHelper.getNextWithId
     */
    me.findNextWithId = me.nextWithId = me.getNextWithId = function(elmTarget) {
        var target = $(elmTarget);

        if (!target) {
            return null;
        }

        var node = target.nextSibling;

        if (!node) {
            return null;
        }

        while (node) {
            if (node.id) {
                return node;
            }

            node = node.nextSibling;
        }

        return null;
    };

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.DomHelper.getElementsByClassName
         *
         * <p>Gets all children, with a given class name, of the element.</p>
         *
         * @param {DomNode} elm - either the <strong>element</strong>, or the
         * <strong>id</strong> of it.
         * @param {String} c - the <strong>className</strong> to test.
         *
         * @return all of the <strong>element</strong>s with the given
         * <strong>class name</strong>.
         */
        me.getElementsByClassName = function(elm, c) {
            var el = $(elm);

            if (!el) {
                return null;
            }

            return el.querySelectorAll(format(kClassSelector, c));
        };
    } else {
        me.getElementsByClassName = function(elm, c) {
            var el = $(elm);

            if (!el) {
                return null;
            }

            var children = el.getElementsByTagName(kAll);

            return filterChildren(children, createClassNameRegExp(c));
        };
    }

    /**
     * @function {static} o2.DomHelper.prevAll
     *
     * <p>Gets all of the previous siblings.</p>
     *
     * @param {Object} el - a <strong>DOM</strong> node reference or its
     * <code>String</code> id.
     */

    /**
     * @function {static} o2.DomHelper.getAllPrevious
     *
     * <p>An alias to {@link o2.DomHelper.prevAll}.</p>
     *
     * @see o2.DomHelper.prevAll
     */
    me.getAllPrevious = me.prevAll = function(el) {
        var result = [];
        var node = $(el);

        if (!node) {
            return [];
        }

        node = node.previousSibling;

        while (node) {
            if (node.nodeType !== kTextNode) {
                result.push(node);
                node = node.previousSibling;
            }
        }

        return result;
    };

    /**
     * @function {static} o2.DomHelper.nextAll
     *
     * <p>Gets all of the next siblings.</p>
     *
     * @param {Object} el - a <strong>DOM</strong> node reference or its
     * <code>String</code> id.
     */

    /**
     * @function {static} o2.DomHelper.getAllNext
     *
     * <p>An alias to {@link o2.DomHelper.nextAll}.</p>
     *
     * @see o2.DomHelper.nextAll
     */
    me.getAllNext = me.nextAll = function(el) {
        var result = [];
        var node = $(el);

        if (!node) {
            return [];
        }

        node = node.nextSibling;

        while (node) {
            if (node.nodeType !== kTextNode) {
                result.push(node);
                node = node.nextSibling;
            }
        }

        return result;
    };
}(this.o2, this));
