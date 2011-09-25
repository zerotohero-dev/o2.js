/*global o2 */

/**
 * @module domhelper.traverse
 * @requires domhelper.core
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
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var getAttribute = me.getAttribute;
    var generateGuid = framework.StringHelper.generateGuid;
    var $ = framework.$;
    var myName = framework.name;

    /**
     * @function {static} DomHelper.getParent
     *
     * <p>gets the first parent element with the given node name.</p>
     *
     * @param {DomNode} target - the current <strong>DOM</strong> node.
     * @param {String} nodeName - the node name to search.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (target) is disregarded while
     * seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */
    //TODO: update documentation.
    me.getParent = function(target, nodeName, shouldExcludeSelf) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if(isExcluded) {
            target = target.parentNode;
        }

        if(!target) {

            return null;
        }

        var nodes = null;
        var hasParent = false;
        var targetNodeName = '';
        var currentNodeName = '';

        while(target) {
            nodes = nodeName.split(',');
            targetNodeName = target.nodeName.toLowerCase();

            for(var i = 0, len = nodes.length; i < len; i++) {
                currentNodeName = nodes[i].toLowerCase();

                if(!currentNodeName) {

                    continue;
                }

                if(targetNodeName === currentNodeName) {
                    hasParent = true;

                    break;
                }
            }

            if(!hasParent) {
                target = target.parentNode;
                
                continue;
            }

            return target;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getParentByAttribute
     *
     * <p>gets the first parent with an <strong>attribute</strong> equal to the
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
    me.getParentByAttribute = function(obj, attribute, value, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

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
     * @function {static} DomHelper.getParentWithAttribute
     *
     * <p>gets the first parent with a given <strong>attribute</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node.
     * @param {String} attribute - the name of the attribute.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
     */
    //TODO: I can have a space delimeted list of attributes.  (OR)
    //TODO: I can also have a comma delimeted list of attributes. (AND) or a
    // combination of two 'attr1,attr2 attr3 attr4,attr5 attr6' (comma is OR space is AND)
    me.getParentWithAttribute = function(obj, attribute, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

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
     * @function {static} DomHelper.getParentById
     * <p>This is an alias to</p>
     * <pre>
     * DomHelper.getParentByAttribute(obj, 'id', shouldExcludeSelf)
     * </pre>
     *
     * @see DomHelper.getParentByAttribute
     */
    //TODO: I can have a comma delimeted list of ids.
    me.getParentById = function(obj, id, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        return me.getParentByAttribute(obj, 'id', id, isExcluded);

    };

    /**
     * @function {static} DomHelper.getParentById
     * <p>This is an alias to</p>
     * <pre>
     * DomHelper.getParentWithAttribute(obj, 'id', value, shouldExcludeSelf)
     * </pre>
     *
     * @see DomHelper.getParentWithAttribute
     */
    //TODO: I can have a comma delimeted list of ids.
    me.getParentWithId = function(obj, value, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        return me.getParentWithAttribute(obj, 'id', isExcluded);

    };

    /**
     * @function {static} DomHelper.getFirstChild
     *
     * <p>gets the first child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} target - the current node.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    //TODO: I can have a space comma delimeted list of node names.
    me.getFirstChild = function(target, nodeName) {

        //
        target = $(target);

        if(!target) {

            return null;

        }

        if(target.querySelector) {
            me.getFirstChild = function(target, nodeName) {
                target = $(target);

                if(!target) {

                    return null;
                }

                if(!target.id) {
                    target.id = [myName, generateGuid()].join('');
                }

                var kTextNode = me.nodeType.TEXT;
                var kAll = '*';
                nodeName = nodeName || kAll;
                nodeName = nodeName.toLowerCase();

                return target.querySelector(['#', target.id, ' > ', nodeName].join(''));

            };

            return me.getFirstChild(target, nodeName);
        }

        me.getFirstChild = function(target, nodeName) {
            target = $(target);

            if(!target) {

                return null;
            }

            var kTextNode = me.nodeType.TEXT;
            var kAll = '*';
            
            //
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

        return me.getFirstChild(target, nodeName);

    };

    /**
     * @function {static} DomHelper.getFirstChildById
     *
     * <p>gets the first child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test.
     * @param {String} id - the id of the child.
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    //TODO: I can have a comma delimeted list of ids.
    me.getFirstChildById = function(target, id) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        if(target.querySelector) {
            me.getFirstChildById = function(target, id) {

                //
                target = $(target);

                if(!target) {

                    return null;
                }

                if(!target.id) {
                    target.id = [myName, generateGuid()].join('');
                }

                return target.querySelector(['#', target.id, ' > #', id].join(''));

            };

            return me.getFirstChildById(target, id);
        }

        me.getFirstChildById = function(target, id) {

            //
            target = $(target);

            if(!target) {

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

        return me.getFirstChildById(target, id);

    };

    /**
     * @function {static} DomHelper.getFirstChildWithId
     *
     * <p>gets the first child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target to test.
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
     */
    me.getFirstChildWithId = function(target) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        //querySelector => IE8+
        if(target.querySelector) {
            me.getFirstChildWithId = function(target) {
                target = $(target);

                if(!target) {

                    return null;
                }

                if(!target.id) {
                    target.id = [myName, generateGuid()].join('');
                }

                return target.querySelector(['#', target.id, ' > [id]'].join(''));

            };

            return me.getFirstChildWithId(target);
        }

        me.getFirstChildWithId = function(target) {
            target = $(target);

            if(!target) {

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

        return me.getFirstChildWithId(target);
    };

    /**
     * @function {static} DomHelper.getLastChild
     *
     * <p>gets the last child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} target - the current node.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    //TODO: I can have a comma delimeted list of node names.
    me.getLastChild = function(target, nodeName) {

        //
        target = $(target);

        if(!target) {

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

        var kTextNode = me.nodeType.TEXT;
        var kAll = '*';
        
        var children = target.childNodes;
        
        //
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
     * @function {static} DomHelper.getLastChildById
     *
     * <p>gets the last child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test.
     * @param {String} id - the id of the child.
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
     */
    //TODO: I can have a comma delimeted list of ids.
    me.getLastChildById = function(target, id) {
        
        //
        target = $(target);

        if(!target) {

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
     * @function {static} DomHelper.getLastChildWithId
     *
     * <p>gets the last child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target to test.
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
     */
    me.getLastChildWithId = function(target) {

        //
        target = $(target);

        if(!target) {

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

    //TODO: add documentation.
    me.getChildren = function(elem) {

        var target = $(elem);

        var nodes = target.childNodes;

        var kTextNode = me.nodeType.TEXT;

        var result = [];

        var node = null;

        for(var i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];

            if(nodes.nodeType != kTextNode) {
                result.push(node);
            }
        }

        return result;

    };

    //TODO: getChildrenById & comma delim

    //TODO: getChildrenWithId & comma delim

    //TODO: getElementsById & comma delim

    //TODO: getElementsWithId & comma delim

    //TODO: getElementsByAttribute & comma delim & space delim

    //TODO: getElementsWithAttribute & comma delim & space delim
    
    //TODO: getElementsByClassName belongs here & comma delim & space delim
    
    //TODO: getElementsWithClassName & comma delim & space delim
    
    //TODO: getFirstChildById
    
    //TODO: getFirstChildWithId
    
    //TODO: getLastChildById
    
    //TODO: getLastChildWithID
    
    //TODO: getFirstChildByClassName
    
    //TODO: getFirstChildWithClassName
    
    //TODO: getFirstChildByAttribute
    
    //TODO: getFirstChildWithAttribute
    
    //TODO: getLastChildByAttribute
    
    //TODO: getLastChildWithAttribute

    /**
     * @function {static} DomHelper.getPrevious
     *
     * <p>gets the previous <stronng>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    //TODO: update ALL documentation of this file. for $(target)
    me.getPrevious = function(target) {

        //
        target = $(target);

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

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
     * @function DomHelper.getPreviousById
     *
     * <p>gets the previous <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node.
     * @param {String} id - the id to check.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    //TODO: I can have a comma delimeted list of ids.
    me.getPreviousById = function(target, id) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

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
     * @function {static} DomHelper.getPreviousWithId
     *
     * <p>gets the previous <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getPreviousWithId = function(target) {

        //
        target = $(target);

        if(!target) {

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
     * @function {static} DomHelper.getNext
     *
     * <p>gets the next <stronng>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getNext = function(target) {

        //
        target = $(target);

        if(!target) {

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
     * @function DomHelper.getNextById
     *
     * <p>gets the next <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node.
     * @param {String} id - the id to check.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    //TODO: I can have a comma delimeted list of ids.
    me.getNextById = function(target, id) {

        //
        target = $(target);

        if(!target) {

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
     * @function {static} DomHelper.getNextWithId
     *
     * <p>gets the next <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
     */
    me.getNextWithId = function(target) {
        target = $(target);

        if(!target) {

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
