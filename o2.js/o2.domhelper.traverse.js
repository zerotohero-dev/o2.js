/**
 * @module domhelper.traverse
 * @requires domhelper.core
 * @requires domhelper.class
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */
( function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var getAttribute = me.getAttribute;
    var generateGuid = framework.StringHelper.generateGuid;
    var $ = framework.$;
    var myName = framework.name;
    var createClassNameRegExp = framework.DomHelper.createClassNameRegExp;

    /*
     * Common constants.
     */
    var kTextNode = me.nodeType.TEXT;
    var kAll = '*';
    var kObject = 'object';
    var kEmpty = '';
    var kId = 'id';

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
    me.getParent = function(target, nodeName, shouldExcludeSelf) {
        var nodes = null;
        var hasParent = false;
        var targetNodeName = kEmpty;
        var currentNodeName = kEmpty;
        var i = 0;
        var len = 0;

        target = $(target);

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
            nodes = nodeName.split(',');
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

    //TODO: add documentation
    me.parent = me.closest = me.findParent = function(elm, nodeName,
                shouldExcludeSelf) {
        return me.getParent(elm, nodeName, shouldExcludeSelf);
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
    me.getParentByAttribute = function(obj, attribute, value,
                shouldExcludeSelf) {
        var isExcluded = !!shouldExcludeSelf;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        if (isExcluded) {
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

    //TODO: add documentation.
    me.findParentByAttribute = function(obj, attribute, value,
                shouldExcludeSelf) {
        return me.getParentByAttribute(obj, attribute, value, shouldExcludeSelf);
    };

    /**
     * @function {static} o2.DomHelper.getParentWithAttribute
     *
     * <p>Gets the first parent with a given <strong>attribute</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node, or its
     * <strong>id</strong>.
     * @param {String} attribute - the name of the attribute.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     *
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */
    me.getParentWithAttribute = function(obj, attribute, shouldExcludeSelf) {
        var isExcluded = !!shouldExcludeSelf;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        if (isExcluded) {
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

    //TODO: add documentation.
    me.findParentWithAttribute = function(obj, attribute, shouldExcludeSelf) {
        return me.getParentWithAttribute(obj, attribute, shouldExcludeSelf);
    };

    /**
     * @function {static} o2.DomHelper.getParentById
     * <p>This is an alias to</p>
     * <pre>
     * o2.DomHelper.getParentByAttribute(obj, 'id', id, shouldExcludeSelf)
     * </pre>
     *
     * @see DomHelper.getParentByAttribute
     */
    me.getParentById = function(obj, id, shouldExcludeSelf) {
        var isExcluded = !!shouldExcludeSelf;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        return me.getParentByAttribute(obj, kId, id, isExcluded);
    };

    //TODO: add documentation.
    me.findParentById = function(obj, id, shouldExcludeSelf) {
        return me.getParentById(obj, id, shouldExcludeSelf);
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
    me.getParentWithId = function(obj, shouldExcludeSelf) {
        var isExcluded = !!shouldExcludeSelf;

        obj = $(obj);

        if (!obj) {
            return null;
        }

        return me.getParentWithAttribute(obj, kId, isExcluded);
    };

    //TODO: add documentation.
    me.findParentWithId = function(obj, shouldExcludeSelf) {
        return me.getParentWithId(obj, shouldExcludeSelf);
    };

    /**
     * @function {static} o2.DomHelper.getFirstChild
     *
     * <p>gets the first child that is not a text-node, and has the given node
     * name.</p>
     *
     * @param {DomNode} target - the current node, or the <strong>id</strong> of
     * it.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     *
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.getFirstChild = function(target, nodeName) {
        target = $(target);

        if (!target) {
            return null;
        }

        if (target.querySelector) {
            me.getFirstChild = function(target, nodeName) {
                target = $(target);

                if (!target) {
                    return null;
                }

                if (!target.id) {
                    target.id = [myName, generateGuid()].join(kEmpty);
                }

                nodeName = nodeName || kAll;
                nodeName = nodeName.toLowerCase();

                return target.querySelector(['#', target.id, ' > ',
                    nodeName].join(kEmpty));
            };

            return me.getFirstChild(target, nodeName);
        }

        me.getFirstChild = function(target, nodeName) {
            target = $(target);

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

        return me.getFirstChild(target, nodeName);
    };

    //TODO: add documentation.
    me.first = me.findFirstChild = function(target, nodeName) {
        return me.getFirstChild(target, nodeName);
    };

    /**
     * @function {static} o2.DomHelper.getFirstChildById
     *
     * <p>gets the first child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test, or the <strong>id</strong>
     * of it.
     * @param {String} id - the id of the child.
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.getFirstChildById = function(target, id) {
        target = $(target);

        if (!target) {
            return null;
        }

        if (target.querySelector) {
            me.getFirstChildById = function(target, id) {
                target = $(target);

                if (!target) {
                    return null;
                }

                if (!target.id) {
                    target.id = [myName, generateGuid()].join(kEmpty);
                }

                return target.querySelector(['#', target.id, ' > #', id
                    ].join(kEmpty));
            };

            return me.getFirstChildById(target, id);
        }

        me.getFirstChildById = function(target, id) {
            target = $(target);

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

        return me.getFirstChildById(target, id);
    };

    //TODO: add documentation.
    me.findFirstChildById = function(target, id) {
        return me.getFirstChildById(target, id);
    };

    /**
     * @function {static} o2.DomHelper.getFirstChildWithId
     *
     * <p>Gets the first child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target, or the <strong>id</strong> of the
     * target to test.
     *
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
     */
    me.getFirstChildWithId = function(target) {
        target = $(target);

        if (!target) {
            return null;
        }

        //querySelector => IE8+
        if(target.querySelector) {
            me.getFirstChildWithId = function(target) {
                target = $(target);

                if(!target) {
                    return null;
                }

                if (!target.id) {
                    target.id = [myName, generateGuid()].join(kEmpty);
                }

                return target.querySelector(['#', target.id, ' > [id]'
                    ].join(kEmpty));
            };

            return me.getFirstChildWithId(target);
        }

        me.getFirstChildWithId = function(target) {
            target = $(target);

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

        return me.getFirstChildWithId(target);
    };

    //TODO: add documentation.
    me.findFirstChildWithId = function(target) {
        return me.getFirstChildWithId(target);
    };

    /**
     * @function {static} o2.DomHelper.getLastChild
     *
     * <p>gets the last child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} target - the current node, or the <strong>id</strong> of
     * it.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     *
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.getLastChild = function(target, nodeName) {
        target = $(target);

        if (!target) {
            return null;
        }

        // Although this function may be speeded up using  obj.querySelector and
        // :last-child, the :last-child pseudoclass still cannot be reliably used
        // across browsers.
        // In particular, Internet Explorer (6 and 7 and 8), and Safari
        // definitely don't support it,
        // Although Internet Explorer 7 and Safari 3 do support :first-child,
        // curiously.
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

    //TODO: add documentation.
    me.last = me.findLastChild = function(target, nodeName) {
        return me.getLastChild(target, nodeName);
    };

    /**
     * @function {static} o2.DomHelper.getLastChildById
     *
     * <p>gets the last child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test, or the <strong>id</strong>
     * of it.
     * @param {String} id - the id of the child.
     *
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.getLastChildById = function(target, id) {
        target = $(target);

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

    //TODO: add documentation.
    me.findLastChildById = function(target, id) {
        return me.getLastChildById(target, id);
    };

    /**
     * @function {static} o2.DomHelper.getLastChildWithId
     *
     * <p>gets the last child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target to test, or the <strong>id</strong>
     * of the target.
     *
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
     */
    me.getLastChildWithId = function(target) {
        target = $(target);

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

    //TODO: add documentation.
    me.findLastChildWithId = function(target) {
        return me.getLastChildWithId(target);
    };

    /**
     * function {static} o2.DomHelper.getChildren
     *
     * <p>Gets the immediate children of the element.</p>
     *
     * @param {Object} elem - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of that node.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    me.getChildren = function(elem, nodeName) {
        var target = $(elem);

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
                    if (node.nodeName.toLowerCase() === nodeName.toLowerCase()) {
                        result.push(node);
                    }
                } else {
                    result.push(node);
                }

            }
        }

        return result;
    };

    //TODO: add documentation.
    me.children = me.findChildren = function(elm) {
        return me.getChildren(elm);
    };

    /**
     * @function {static} o2.DomHelper.getChildrenByClassName
     *
     * <p>Gets immediate descendants, with a given class name, of the
     * element.</p>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the className to test.
     *
     * @return the immediate descendants with the given class name.
     */
    me.getChildrenByClassName = function(el, c) {
        el = $(el);

        if (!el) {
            return null;
        }

        //NOTE: IE7+ supports child selector ( > ), IE8+ supports
        // querySelectorAll

        if(el.querySelectorAll) {
            me.getChildrenByClassName = function(el, c) {
                el = $(el);

                if (!el) {
                    return null;
                }

                if (!el.id) {
                    el.id = [myName, generateGuid()].join(kEmpty);
                }

                return el.querySelectorAll(['#', el.id, ' > .', c
                    ].join(kEmpty));
            };

            return me.getChildrenByClassName(el, c);
        }

        me.getChildrenByClassName = function(el, c) {
            el = $(el);

            if (!el) {
                return null;
            }

            var children = el.childNodes;

            return filterChildren(children, createClassNameRegExp(c));
        };

        return me.getChildrenByClassName(el, c);
    };

    //TODO: add documentation.
    me.findChildrenByClassName = function(el, c) {
        return me.getLastChildWithId(el, c);
    };

    /**
     * @function {static} o2.DomHelper.getPrevious
     *
     * <p>Gets the previous <strong>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start, or the <strong>id</strong> of
     * it.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getPrevious = function(target) {
        target = $(target);

        if (!target || typeof target !== kObject) {
            return null;
        }

        var node = target.previousSibling;

        if (!node) {
            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while (node) {
            if (node.nodeType !== kTextNode) {
                return node;
            }

            node = node.previousSibling;
        }

        return null;
    };

    //TODO: add documentation.
    me.prev = me.findPrevious = function(elm) {
        return me.getPrevious(elm);
    };

    /**
     * @function o2.DomHelper.getPreviousById
     *
     * <p>gets the previous <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node, or the <strong>id</strong> of
     * it.
     * @param {String} id - the id to check.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getPreviousById = function(target, id) {
        target = $(target);

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

    //TODO: add documentation.
    me.findPreviousById = function(target, id) {
        return me.getPreviousById(target, id);
    };

    /**
     * @function {static} o2.DomHelper.getPreviousWithId
     *
     * <p>gets the previous <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start, or the <strong>id</strong> of
     * it.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getPreviousWithId = function(target) {
        target = $(target);

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

    //TODO: add documentation.
    me.findPreviousWithId = function(target, id) {
        return me.getPreviousWithId(target, id);
    };

    /**
     * @function {static} o2.DomHelper.getNext
     *
     * <p>Gets the next <strong>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getNext = function(target) {
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
            if (node.nodeType !== kTextNode) {
                return node;
            }

            node = node.nextSibling;
        }

        return null;
    };

    //TODO: add documentation.
    me.next = me.findNext = function(elm) {
        return me.getNext(elm);
    };

    /**
     * @function o2.DomHelper.getNextById
     *
     * <p>gets the next <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node, or the <strong>id</strong> of
     * it.
     * @param {String} id - the id to check.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getNextById = function(target, id) {
        target = $(target);

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

    //TODO: add documentation.
    me.findNextById = function(target, id) {
        return me.getNextById(target, id);
    };

    /**
     * @function {static} o2.DomHelper.getNextWithId
     *
     * <p>gets the next <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start, or the <strong>id</strong> of
     * it.
     *
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getNextWithId = function(target) {
        target = $(target);

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

    //TODO: add documentation.
    me.findNextWithId = function(target) {
        return me.getNextWithId(target);
    };

    /**
     * @function {static} o2.DomHelper.getElementsByClassName
     *
     * <p>Gets all children, with a given class name, of the element.</p>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to test.
     *
     * @return all of the <strong>element</strong>s with the given <strong>class
     * name</strong>.
     */
    me.getElementsByClassName = function(el, c) {
        el = $(el);

        if (!el) {
            return null;
        }

        if (el.querySelectorAll) {
            me.getElementsByClassName = function(el, c) {
                el = $(el);

                if (!el) {
                    return null;
                }

                return el.querySelectorAll(['.', c].join(kEmpty));
            };

            return me.getElementsByClassName(el, c);
        }

        me.getElementsByClassName = function(el, c) {
            el = $(el);

            if (!el) {

                return null;
            }

            var children = el.getElementsByTagName(kAll);

            return filterChildren(children, createClassNameRegExp(c));
        };

        return me.getElementsByClassName(el, c);
    };

    //TODO: add documentation
    me.prevAll = function(el) {
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

    //TODO: add documentation.
    me.getAllPrevious = function(elm) {
        return me.prevAll(elm);
    };

    //TODO: add documentation
    me.nextAll = function(el) {
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

    //TODO: add documentation.
    me.getAllNext = function(elm) {
        return me.nextAll(elm);
    };
}(this.o2, this));
