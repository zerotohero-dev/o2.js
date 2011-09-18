/*global o2 */

/**
 * @module o2.domhelper.traverse
 * @requires o2
 * @requires o2.domhelper.core
 * @requires o2.stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */
( function(o2, window, UNDEFINED) {
    //VMERGE: merge with groups.fw after completing all todos here.

    var me = o2.DomHelper;

    /**
     * @function {static} o2.DomHelper.findParent
     *
     * <p>Finds the first parent element with the given node name.</p>
     *
     * @param {DomNode} target - the current <strong>DOM</strong> node.
     * @param {String} nodeName - the node name to search.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (target) is disregarded while
     * seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */
    me.findParent = function(target, nodeName, shouldExcludeSelf) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if(isExcluded) {
            target = target.parentNode;
        }

        if(!target) {

            return null;
        }

        while(target) {
            if(target.nodeName.toLowerCase() !== nodeName.toLowerCase()) {
                target = target.parentNode;

                continue;
            }

            return target;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findParentByAttribute
     *
     * <p>Finds the first parent with an <strong>attribute</strong> equal to the
     * given <strong>value</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node.
     * @param {String} attribute - the name of the attribute.
     * @param {String} value - the value of the attribute.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */
    me.findParentByAttribute = function(obj, attribute, value, shouldExcludeSelf) {

        var getAttribute = o2.DomHelper.getAttribute;

        if(!obj || typeof obj != 'object') {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if(isExcluded) {
            obj = obj.parentNode;
        }

        if(!obj) {

            return null;
        }

        if(getAttribute(obj, attribute) === value) {

            return obj;
        }

        while(obj) {
            if(getAttribute(obj, attribute) === value) {

                return obj;
            }
            //
            obj = obj.parentNode;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findParentWithAttribute
     *
     * <p>Finds the first parent with a given <strong>attribute</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node.
     * @param {String} attribute - the name of the attribute.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */
    me.findParentWithAttribute = function(obj, attribute, shouldExcludeSelf) {

        var getAttribute = o2.DomHelper.getAttribute;

        if(!obj || typeof obj != 'object') {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if(isExcluded) {
            obj = obj.parentNode;
        }

        if(!obj) {

            return null;
        }

        while(obj) {
            if(getAttribute(obj, attribute) !== null) {

                return obj;
            }
            //
            obj = obj.parentNode;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findParentById
     * <p>This is an alias to</p>
     * <pre>
     * o2.DomHelper.findParentByAttribute(obj, 'id', shouldExcludeSelf)
     * </pre>
     *
     * @see o2.DomHelper.findParentByAttribute
     */
    me.findParentById = function(obj, id, shouldExcludeSelf) {

        if(!obj || typeof obj != 'object') {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        return me.findParentByAttribute(obj, 'id', id, isExcluded);

    };

    /**
     * @function {static} o2.DomHelper.findParentById
     * <p>This is an alias to</p>
     * <pre>
     * o2.DomHelper.findParentWithAttribute(obj, 'id', value, shouldExcludeSelf)
     * </pre>
     *
     * @see o2.DomHelper.findParentWithAttribute
     */
    me.findParentWithId = function(obj, value, shouldExcludeSelf) {

        if(!obj || typeof obj != 'object') {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        return me.findParentWithAttribute(obj, 'id', isExcluded);

    };

    /**
     * @function {static} o2.DomHelper.findFirstChild
     *
     * <p>Finds the first child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} target - the current node.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.findFirstChild = function(target, nodeName) {

        if(!target || typeof target != 'object') {

            return null;

        }

        if(target.querySelector) {
            me.findFirstchild = function(target, nodeName) {

                if(!target || typeof target != 'object') {

                    return null;
                }

                if(!target.id) {
                    target.id = ['o2', o2.StringHelper.generateGuid()].join('');
                }

                var kTextNode = me.nodeType.TEXT;
                var kAll = '*';
                nodeName = nodeName || kAll;
                nodeName = nodeName.toLowerCase();

                return target.querySelector(['#', target.id, ' > ', nodeName].join(''));

            };

            return me.findFirstChild(target, nodeName);
        }

        me.findFirstChild = function(target, nodeName) {

            if(!target || typeof target != 'object') {

                return null;
            }

            var kTextNode = me.nodeType.TEXT;
            var kAll = '*';
            nodeName = nodeName || kAll;
            nodeName = nodeName.toLowerCase();

            var children = target.childNodes;

            if(!children || children.length === 0) {

                return null;
            }

            var node = children[0];

            while(node) {
                if(node.nodeType == kTextNode) {
                    node = node.nextSibling;

                    continue;
                }

                if(nodeName == kAll) {

                    return node;
                }

                if(node.nodeName.toLowerCase() != nodeName) {
                    node = node.nextSibling;

                    continue;
                }

                return node;
            }

            return null;

        };

        return me.findFirstChild(target, nodeName);

    };

    /**
     * @function {static} o2.DomHelper.findFirstChildById
     *
     * <p>Finds the first child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test.
     * @param {String} id - the id of the child.
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.findFirstChildById = function(target, id) {

        if(!target || typeof target != 'object') {

            return null;
        }

        if(target.querySelector) {
            me.findFirstChildById = function(target, id) {

                if(!target || typeof target != 'object') {

                    return null;
                }

                if(!target.id) {
                    target.id = ['o2', o2.StringHelper.generateGuid()].join('');
                }

                return target.querySelector(['#', target.id, ' > #', id].join(''));

            };

            return me.findFirstChildById(target, id);
        }

        me.findFirstChildById = function(target, id) {

            if(!target || typeof target != 'object') {

                return null;
            }

            var children = target.childNodes;

            if(!children || children.length === 0) {

                return null;
            }

            var node = children[0];
            while(node) {
                if(node.id && node.id == id) {

                    return node;
                }
                //
                node = node.nextSibling;
            }

            return null;

        };

        return me.findFirstChildById(target, id);

    };

    /**
     * @function {static} o2.DomHelper.findFirstChildWithId
     *
     * <p>Finds the first child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target to test.
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
     */
    me.findFirstChildWithId = function(target) {

        if(!target || typeof target != 'object') {

            return null;
        }

        //querySelector => IE8+
        if(target.querySelector) {
            me.findFirstChildWithId = function(target) {

                if(!target || typeof target != 'object') {

                    return null;
                }

                if(!target.id) {
                    target.id = ['o2', o2.StringHelper.generateGuid()].join('');
                }

                return target.querySelector(['#', target.id, ' > [id]'].join(''));

            };

            return me.findFirstChildWithId(target);
        }

        me.findFirstChildWithId = function(target) {

            if(!target || typeof target != 'object') {

                return null;
            }

            var children = target.childNodes;

            if(!children || children.length === 0) {

                return null;
            }

            var node = children[0];

            while(node) {
                if(node.id) {

                    return node;
                }
                //
                node = node.nextSibling;
            }

            return null;
        };

        return me.findFirstChildWithId(target);
    };

    /**
     * @function {static} o2.DomHelper.findLastChild
     *
     * <p>Finds the last child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} target - the current node.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.findLastChild = function(target, nodeName) {

        // Although this function may be speeded up using  obj.querySelector and
        // :last-child, the :last-child pseudoclass still cannot be reliably used
        // across browsers.
        // In particular, Internet Explorer (6 and 7 and 8), and Safari
        // definitely don't support it,
        // Although Internet Explorer 7 and Safari 3 do support :first-child,
        // curiously.
        // Your best bet is to explicitly add a last-child (or similar) class to
        // that item, and apply li.last-child instead.

        if(!target || typeof target != 'object') {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;
        var children = target.childNodes;
        var kAll = '*';
        nodeName = nodeName || kAll;
        nodeName = nodeName.toLowerCase();

        if(!children || children.length === 0) {

            return null;
        }

        var node = children[children.length - 1];

        while(node) {
            if(node.nodeType == kTextNode) {
                node = node.previousSibling;

                continue;
            }

            if(nodeName == kAll) {

                return node;
            }

            if(node.nodeName.toLowerCase() != nodeName) {
                node = node.previousSibling;

                continue;
            }

            return node;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findLastChildById
     *
     * <p>Finds the last child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test.
     * @param {String} id - the id of the child.
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    me.findLastChildById = function(target, id) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var children = target.childNodes;

        if(!children || children.length === 0) {

            return null;
        }

        var node = children[children.length - 1];

        while(node) {
            if(node.id && node.id == id) {

                return node;
            }
            //
            node = node.previousSibling;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findLastChildWithId
     *
     * <p>Finds the last child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target to test.
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
     */
    me.findLastChildWithId = function(target) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var children = target.childNodes;

        if(!children || children.length === 0) {

            return null;
        }

        var node = children[children.length - 1];

        while(node) {
            if(node.id) {

                return node;
            }
            //
            node = node.previousSibling;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findPrevious
     *
     * <p>Finds the previous <stronng>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.findPrevious = function(target) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = o2.DomHelper.nodeType.TEXT;

        while(node) {
            if(node.nodeType != kTextNode) {

                return node;
            }
            //
            node = node.previousSibling;
        }

        return null;

    };

    /**
     * @function o2.DomHelper.findPreviousById
     *
     * <p>Finds the previous <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node.
     * @param {String} id - the id to check.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.findPreviousById = function(target, id) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = o2.DomHelper.nodeType.TEXT;

        while(node) {
            if(node.id && node.id == id) {

                return node;
            }
            //
            node = node.previousSibling;
        }

        return null;
    };

    /**
     * @function {static} o2.DomHelper.findPreviousWithId
     *
     * <p>Finds the previous <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.findPreviousWithId = function(target) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.id) {

                return node;
            }
            //
            node = node.previousSibling;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findNext
     *
     * <p>Finds the next <stronng>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.findNext = function(target) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.nextSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.nodeType != kTextNode) {

                return node;
            }
            //
            node = node.nextSibling;
        }

        return null;

    };

    /**
     * @function o2.DomHelper.findNextById
     *
     * <p>Finds the next <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node.
     * @param {String} id - the id to check.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.findNextById = function(target, id) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.nextSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.id && node.id == id) {

                return node;
            }
            //
            node = node.nextSibling;
        }

        return null;

    };

    /**
     * @function {static} o2.DomHelper.findNextWithId
     *
     * <p>Finds the next <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.findNextWithId = function(target) {

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.nextSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.id) {

                return node;
            }
            //
            node = node.nextSibling;
        }

        return null;

    };

}(o2, this));
