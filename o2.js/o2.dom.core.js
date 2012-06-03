/**
 * @module   dom.core
 * @requires core
 * @requires dom.constants
 * @requires dom.style
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-06-03 00:12:56.288837
 * -->
 *
 * <p>A cross-browser <strong>DOM</strong> manipulation helper.</p>
 */
(function(framework, document, UNDEFINED) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    var exports = {};

    /*
     * Module Name
     */
    var kModuleName = 'Dom';

    /*
     * Dom (core)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $ = require('$');

    var nt            = require(kModuleName, 'nodeType');
    var kElementNode  = attr(nt, 'ELEMENT');
    var kDocumentNode = attr(nt, 'DOCUMENT');
    var kText         = attr(nt, 'TEXT');

    var createElement          = attr(document,'createElement');
    var createDocumentFragment = attr(document, 'createDocumentFragment');

    /*
     * Common Constants
     */
    var kClass     = 'class';
    var kClassName = 'className';
    var kCss       = 'css';
    var kCssText   = 'cssText';
    var kDiv       = 'div';
    var kEmpty     = '';
    var kFunction  = 'function';
    var kNumber    = 'number';
    var kObject    = 'object';
    var kString    = 'string';
    var kStyle     = 'style';

    /*
     * Common Regular Expression
     */
    var kReturnRegExp = /\r\n|\r/g;
    var kWhiteSpaceRegExp = /^\s*$/;

    /*
     * For creating document fragments.
     */
    var tempFragmentDiv = null;

    /**
     * @function {static} o2.Dom.append
     *
     * <p>Appends the element to the bottom of its parent.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var child = o2.$('childNode');
     * var parent = o2.$('parentNode');
     * o2.Dom.append(child, parent);
     * </pre>
     *
     * @param {Object} elmChild - the child node, or the <strong>id</strong> of
     * the node to append.
     * @param {Object} elmParent - the parent container, or the
     * <strong>id</strong> of the container.
     */
    exports.append = def(me, 'append', function(elmChild, elmParent) {
        var child  = $(elmChild);
        var parent = $(elmParent);
        var temp   = null;

        if (!child || !parent) {
            return;
        }

        if (typeof child === 'string') {
            temp = createElement(kDiv);
            parent.appendChild(temp).innerHTML = child;
            return temp;
        }

        return parent.appendChild(child);
    });

    /**
     * @function {static} o2.Dom.createDocumentFragment
     *
     * <p>Creates a <strong>Document Fragment</strong> from an
     * <strong>HTML</strong> <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var frag = o2.Dom.createDocumentFragment('[div]test[/div]');
     * </pre>
     *
     * @param {String} html - the <strong>HTML</strong> to create a fragment
     * from.
     *
     * @return {HTMLDocumentFragment} - the generated <code>document</code>
     * fragment.
     */
    exports.createDocumentFragment = def(me, 'createDocumentFragment',
                function(html) {
        var result = createDocumentFragment();

        tempFragmentDiv = tempFragmentDiv || createElement(kDiv);

        tempFragmentDiv.innerHTML = html;

        while (tempFragmentDiv.firstChild) {
            result.appendChild(tempFragmentDiv.firstChild);
        }

        tempFragmentDiv = null;

        return result;
    });

    /**
     * @function {static} o2.Dom.createElement
     *
     * <p>Creates an element with given name and attributes.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var el = o2.Dom.createElement(
     *      'div',
     *      {className : 'active', style : 'font-weight : bold'}
     * );
     * </pre>
     *
     * @param {String} name - the node name of the element (i.e. 'div', 'a').
     * @param {Object} attributes - an associative array in the form
     * <code>{att1:value1, att2:value2}</code>.
     *
     * @return the created element.
     */
    exports.createElement = def(me, 'createElement', function(name,
                attributes) {
        var e       = createElement(name);
        var isClass = false;
        var isStyle = false;
        var key     = null;
        var value   = kEmpty;

        // Internet Explorer 7- (and some minor browsers) cannot set values
        // for style, class or event handlers, using setAttribute.
        // Internet Explorer 8 has fixed most of these, but still cannot set
        // event handlers. Internet Explorer 9 can now set these attributes
        // in standards mode. A few more browsers also have trouble reading
        // these attributes using getAttribute.

        for (key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                value = attributes[key];

                isClass = key === kClass || key === kClassName;
                isStyle = key === kStyle || key === kCss ||
                    key === kCssText;

                if (isClass) {
                    e.className = value;
                } else if (isStyle) {

                    // The string value of the style attribute is available
                    // as a read/write string called cssText, which is a
                    // property of the style object, which itself is a
                    // property of the element.
                    //
                    // Note, however, that it is not supported very well;
                    // Safari does not support it up to version 1.1 (reading
                    // it produces the value null)
                    //
                    // ...
                    //
                    // To avoid problems a combination of cssText and
                    // getAttribute/setAttribute can be used.
                    e.style.cssText = value;
                    e.setAttribute(kStyle, value);
                } else {
                    e[key] = attributes[key];
                }
            }
        }

        return e;
    });

    /**
     * @function {static} o2.Dom.create
     *
     * <p>An alias to {@link o2.Dom.createElement}.</p>
     *
     * @see o2.Dom.createElement
     */
    exports.create = alias(me, 'create', 'createElement');

    /**
     * @function {static} o2.Dom.getAttribute
     *
     * <p>Gets the attribute of a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var uid = o2.Dom.getAttribute('container', 'data-user-id');
     * </pre>
     *
     * @param {Object} elm - the node, or the <strong>id</strong> of the
     * node, to get the attribute of.
     * @param {String} attribute - the attribute to gather.
     *
     * @return the value of the attribute if found; <code>null</code>
     * otherwise.
     */
    exports.getAttribute = def(me, 'getAttribute', function(elm, attribute) {
        var obj = $(elm);

        if (!obj || !attribute) {
            return null;
        }

        var value = null;

        if (attribute === kClass || attribute === kClassName) {
            value = obj.className;

            if (value !== UNDEFINED) {
                return value;
            }
        }

        if (attribute === kStyle || attribute === kCss ||
                    attribute === kCssText) {
            value = obj.cssText;

            if (value !== UNDEFINED) {
                return value;
            }
        }

        // The DOM object (obj) may not have a getAttribute method.
        if (typeof obj.getAttribute === kFunction) {
            value = obj.getAttribute(attribute);

            if (value !== UNDEFINED) {
                return value;
            }
        }

        return obj[attribute] || null;
    });

    /**
     * @function {static} o2.Dom.getHtml
     *
     * <p>Gets the <strong>HTML</strong> of a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var html = o2.Dom.getHtml('container');
     * </pre>
     *
     * @param {Object} elm - the <strong>DOM</strong> node or its
     * <code>String</code> id.
     *
     * @return the <code>innerHTML</code> of the given node, if it exists;
     * <code>null</code> otherwise.
     */
    exports.getHtml = def(me, 'getHtml', function(elm) {
        var obj = $(elm);

        if (!obj) {
            return null;
        }

        return obj.innerHTML;
    });

    if (document.innerText !== UNDEFINED) {

        /**
         * @function {static} o2.Dom.getText
         *
         * <p>Gets the textual content of the given node, replacing entities
         * like <code>& amp;</code> with it's corresponding character
         * counterpart (<strong>&</strong> in this example).</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var txt = o2.Dom.getText('container');
         * </pre>
         *
         * @param {Object} elm - the <strong>DOM</strong> node or its
         * <code>String</code> id.
         *
         * @return the textual content of the given node.
         */
        exports.getText = def(me, 'getText', function(elm) {
            var obj = $(elm);

            if (!obj) {
                return null;
            }

            var nodeType = obj.nodeType;

            if (!nodeType) {
                return null;
            }

            if (nodeType !== kElementNode && nodeType !== kDocumentNode) {
                return null;
            }

            if (typeof obj.innerText !== kString) {
                return null;
            }

            return obj.innerText.replace(kReturnRegExp, '');
        });
    } else {
        exports.getText = def(me, 'getText', function(elm) {
            var obj = $(elm);

            if (!obj) {
                return null;
            }

            var nodeType = obj.nodeType;

            if (!nodeType) {
                return null;
            }

            if (nodeType !== kElementNode && nodeType !== kDocumentNode) {
                return null;
            }

            if (typeof obj.textContent !== kString) {
                return null;
            }

            return obj.textContent;
        });
    }

    /**
     * @function {static} o2.Dom.insertAfter
     *
     * <p>Adds the node after the reference node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ref = o2.$('ref');
     * var new = o2.$('new');
     * o2.Dom.insertAfter(new, ref);
     * </pre>
     *
     * @param {Object} elmNewNode - the DOM node, or the <strong>id</strong> of
     * the node, to insert after.
     * @param {Object} elmRefNode - the reference node, or the
     * <strong>id</strong> of the node.
     */
    exports.insertAfter = def(me, 'insertAfter', function(elmNewNode, elmRefNode) {
        var newNode = $(elmNewNode);
        var refNode = $(elmRefNode);

        if (!newNode || !refNode) {
            return;
        }

        var obj = refNode.parentNode;

        if (refNode.nextSibling) {
            obj.insertBefore(newNode, refNode.nextSibling);

            return;
        }

        obj.appendChild(newNode);
    });

    /**
     * @function {static} o2.Dom.insertBefore
     *
     * <p>Adds the node before the reference node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var ref = o2.$('ref');
     * var new = o2.$('new');
     * o2.Dom.insertBefore(new, ref);
     * </pre>
     *
     * @param {Object} elmNewNode - the node, or the <strong>id</strong> of the
     * node, to insert before.
     * @param {Object} elmRefNode - the reference, or the <strong>id</strong> of
     * the node.
     */
    exports.insertBefore = def(me, 'insertBefore', function(elmNewNode,
                elmRefNode) {
        var newNode = $(elmNewNode);
        var refNode = $(elmRefNode);

        if (!newNode || !refNode) {
            return;
        }

        var obj = refNode.parentNode;

        obj.insertBefore(newNode, refNode);
    });

    /**
     * @function {static} o2.Dom.isDocument
     *
     * <p>Checks whether the given node is a <code>document</code> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isDocument = o2.Dom.isDocument(currentNode);
     * </pre>
     *
     * @param {DOMNode} obj - the <strong>node</strong> to test.
     *
     * @return <code>true</code> if the <strong>node</strong> is the
     * <code>document</code> element; <code>false</code> otherwise.
     */
    exports.isDocument = def(me, 'isDocument', function(obj) {
        return !!(obj && obj.nodeType === kElementNode);
    });

    /**
     * @function {static} o2.Dom.isElement
     *
     * <p>Checks whether the given node is an <strong>element</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isElement = o2.Dom.isElement(currentNode);
     * </pre>
     *
     * @param {DOMNode} obj - the <strong>node</strong> to test.
     *
     * @return <code>true</code> if the <strong>node</strong> is an
     * <strong>element</strong> node; <code>false</code> otherwise.
     */
    exports.isElement = def(me, 'isElement', function(obj) {
        return !!(obj && obj.nodeType === kElementNode);
    });

    /**
     *
     */
    //TODO: add documentation.
    exports.isNode = def(me, 'isNode', function(obj) {
        return (
            typeof window.Node === 'object' ?
                // DOM Level 2
                obj instanceof window.Node :
                obj && typeof obj === kObject &&
                typeof obj.nodeType === kNumber &&
                typeof obj.nodeName === kString
        );
    });

    /**
     * @function {static} o2.Dom.prepend
     *
     * <p>Prepends the element to the top of its parent.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var child = o2.$('ChildContainer');
     * var parent = o2.$('MasterContainer');
     * o2.Dom.prepend(child, parent);
     * </pre>
     *
     * @param {Object} elmChild - the child node, or the id of the node to
     * prepend.
     * @param {Object} elmParent - the parent container, or the id of the
     * container.
     */
    exports.prepend = def(me, 'prepend', function(elmChild, elmParent) {
        var child  = $(elmChild);
        var parent = $(elmParent);

        if (!child || !parent) {
            return;
        }

        if (typeof child === kString) {
            var temp = createElement(kDiv);
            temp.innerHTML = child;

            if (parent.childNodes.length === 0) {
                return parent.appendChild(temp);
            }

            return parent.insertBefore(child, parent.childNodes[0]);
        }

        if (parent.childNodes.length === 0) {
            return parent.appendChild(child);
        }

        return parent.insertBefore(child, parent.childNodes[0]);
    });

    /**
     * @function {static} o2.Dom.remove
     *
     * <p>Removes the element from the <strong>DOM</strong> flow.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.remove('nagivation');
     * </pre>
     *
     * @param {Object} e - either the <strong>element</strong>, or the
     * <strong>id</strong> of it, to remove.
     *
     * @return the removed node.
     */
    exports.remove = def(me, 'remove', function(e) {
        var elm = $(e);

        if (!elm) {
            return null;
        }

        elm.parentNode.removeChild(elm);

        return elm;
    });

    /**
     * @function {static} o2.Dom.removeNode
     *
     * <p>An <strong>alias</strong> to {@link o2.Dom.remove}.</p>
     *
     * @see o2.Dom.remove
     */
    exports.removeNode = alias(me, 'removeNode', 'remove');

    /**
     * @function {static} o2.Dom.removeChildren
     *
     * <p>Removes all the children of the element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.removeChildren('container');
     * </pre>
     *
     * @param {Object} e - either the <strong>element</strong>, or the
     * <strong>id</strong> of it to process.
     */
    exports.removeChildren = def(me, 'removeChildren', function(elm) {
        var node = $(elm);

        if (!node) {
            return;
        }

        node.innerHTML = kEmpty;
    });

    /**
     * @function {static} o2.Dom.empty
     *
     * <p>An <strong>alias</strong> to {@link o2.Dom.removeChildren}.</p>
     *
     * @param {Object} elm - either the <strong>element</strong>, or the
     * <strong>id</strong> of it to process.
     */
    exports.empty = alias(me, 'empty', 'removeChildren');

    /**
     * @function {static} o2.Dom.removeEmptyTextNodes
     *
     * <p>Removes empty text nodes from the element.</p>
     * <p>Note that this removal is not recursive; only the first-level empty
     * child nodes of the element will be removed.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.removeEmptyTextNodes('container');
     * </pre>
     *
     * @param {Object} e - either the <strong>element</strong>, or the
     * <strong>id</strong> of it to process.
     */
    exports.removeEmptyTextNodes = def(me, 'removeEmptyTextNodes', function(e) {
        var arRemove     = [];
        var child        = null;
        var elm          = $(e);
        var i            = 0;
        var shouldRemove = false;

        if (!elm) {
            return;
        }

        var children = elm.childNodes;
        var len      = children.length;

        for (i = 0; i < len; i++) {
            child = children[i];

            if (!child.hasChildNodes()) {
                shouldRemove = child.nodeType === kText &&
                    kWhiteSpaceRegExp.test(child.nodeValue);

                if (shouldRemove) {
                    arRemove.push(child);
                }
            }
        }

        for (i = 0, len = arRemove.length; i < len; i++) {
            child = arRemove[i];
            child.parentNode.removeChild(child);
        }
    });

    /**
     * @function {static} o2.Dom.removeEmpty
     *
     * <p>An <strong>alias</strong> to
     * {@link o2.Dom.removeEmptyTextNodes}.</p>
     *
     * @see o2.Dom.removeEmptyTextNodes
     */
    exports.removeEmpty = alias(me, 'removeEmpty', 'removeEmptyTextNodes');

    /**
     * @function {static} o2.Dom.setAttribute
     *
     * <p>Sets the attribute of the given object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setAttribute('container', 'data-user-id', '123');
     * </pre>
     *
     * @param {Object} elm - the object or the <code>String</code> id of it.
     * @param {String} attribute - the name of the attribute.
     * @param {String} value - the value of the attribute.
     */
    exports.setAttribute = def(me, 'setAttribute', function(elm, attribute,
                value) {
        var obj = $(elm);

        if (!obj || !attribute) {
            return;
        }

        if (attribute === kClass  || attribute === kClassName){
            obj.className = value;

            return;
        }

        if (typeof obj.setAttribute === kFunction) {
            obj.setAttribute(attribute, value);

            return;
        }

        obj[attribute] = value;
    });

    /**
     * @function {static} o2.Dom.setHtml
     *
     * <p>Simply sets the <code>innerHTML</code> of the element.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setHtml('container', '[h1]hello[/h1]');
     * </pre>
     *
     * @param {Object} elm - The <strong>DOM</strong> element to set the
     * <strong>HTML</strong> of, or its <code>String</code> id.
     */
    exports.setHtml = def(me, 'setHtml', function(elm, html) {
        var obj = $(elm);

        if (!obj) {
            return;
        }

        obj.innerHTML = html;
    });
}(this.o2, this.document));
