/**
 * @module domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser <strong>DOM</strong> manipulation helper.</p>
 */
(function(framework, document) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;
    var $ = framework.$;

    /*
     * Common constants.
     */
    var kFunction = 'function';
    var kClass = 'class';
    var kClassName = 'className';
    var kStyle = 'style';
    var kCss = 'css';
    var kCssText = 'cssText';
    var kEmpty = '';

    /*
     * Common regular expressions.
     */
    var kWhiteSpaceRegExp = /^\s*$/;

    /**
     * @class {static} o2.DomHelper
     *
     * A cross-browser DOM manipulation helper.
     */
    me.DomHelper = {

        /**
         * @struct {static} o2.DomHelper.nodeType
         *
         * <code>DOM</code> node types.
         */
        nodeType : {

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.ELEMENT - element node.
             */
            ELEMENT : 1,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.ATTRIBUTE - atribute node.
             */
            ATTRIBUTE : 2,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.TEXT - text node.
             */
            TEXT : 3,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.CDATA - CDATA section.
             */
            CDATA : 4,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.ENTITY_REFERENCE - entity reference.
             */
            ENTITY_REFERENCE : 5,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.ENTITY - entity.
             */
            ENTITY : 6,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.PROCESSING_INSTRUCTION - processing
             * instruction.
             */
            PROCESSING_INSTRUCTION : 7,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.COMMENT - comment node.
             */
            COMMENT : 8,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.DOCUMENT - document (root) node.
             */
            DOCUMENT : 9,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.DOCUMENT_TYPE - DTD node.
             */
            DOCUMENT_TYPE : 10,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.DOCUMENT_FRAGMENT - document fragment.
             */
            DOCUMENT_FRAGMENT : 11,

            /**
             * @property {static const Integer}
             * o2.DomHelper.nodeType.NOTATION - notation.
             */
            NOTATION : 12
        },

        /**
         * @function {static} o2.DomHelper.isChild
         *
         * <p>Checks whether the give node is the child of another node.</p>
         *
         * @param {Object} testNode - either the <strong>element</strong>, or
         * the <strong>id</strong> of the node to test.
         * @param {Object} parentNode - either the <strong>element</strong>, or
         * the <strong>id</strong> of the parent node.
         *
         * @return <code>true</code> if <strong>testNode</strong> is the child of
         * <strong>parentNode</strong>, <code>false</code> otherwise.
         */
        isChild : function(testNode, parentNode) {
            testNode = $(testNode);
            parentNode = $(parentNode);

            var theNode = testNode;

            if (!testNode || !parentNode) {
                return false;
            }

            if (testNode === parentNode) {
                return false;
            }

            while (theNode) {
                if (theNode === parentNode) {
                    return true;
                }

                if (!theNode.parentNode) {
                    return false;
                }

                theNode = theNode.parentNode;
            }

            return false;
        },

        /**
         * @function {static} o2.DomHelper.removeNode
         *
         * <p>An alias to {@link o2.DomHelper.remove}.</p>
         *
         * @see o2.DomHelper.remove
         */
        removeNode : function(elm) {
            return framework.DomHelper.remove(elm);
        },

        /**
         * @function {static} o2.DomHelper.remove
         *
         * <p>Removes the element from the <strong>DOM</strong> flow.</p>
         *
         * @param {Object} elm - either the <strong>element</strong>, or the
         * <strong>id</strong> of it, to remove.
         *
         * @return the removed node.
         */
        remove : function(elm) {
            elm = $(elm);

            if (!elm) {
                return null;
            }

            elm.parentNode.removeChild(elm);

            return elm;
        },

        /**
         * @function {static} o2.DomHelper.removeEmptyTextNodes
         *
         * <p>Removes empty text nodes from the element.</p>
         *
         * @param {Object} elm - either the <strong>element</strong>, or the
         * <strong>id</strong> of it to process.
         * @param {Boolean} isRecursive - (Optional, default to
         * <code>true</code>) if <code>true</code> do the same
         * process for the child nodes of <code>elm</code> as well.
         */
        removeEmptyTextNodes : function(elm, isRecursive) {
            var kText = me.DomHelper.nodeType.TEXT;
            var arRemove = [];
            var i = 0;
            var child = null;
            var shouldRemove = false;

            elm = $(elm);

            if (!elm) {
                return;
            }

            var children = elm.childNodes;
            var len = children.length;

            if (isRecursive === undefined) {
                isRecursive = true;
            }

            isRecursive = !!isRecursive;

            var removeEmptyTextNodes = me.DomHelper.removeEmptyTextNodes;

            for (i = 0; i < len; i++) {
                child = children[i];

                if (!child.hasChildNodes()) {
                    shouldRemove = child.nodeType === kText &&
                        kWhiteSpaceRegExp.test(child.nodeValue);

                    if (shouldRemove) {
                        arRemove.push(child);
                    }
                }

                if (isRecursive) {
                    removeEmptyTextNodes(child, true);
                }
            }

            for (i = 0, len = arRemove.length; i < len; i++) {
                child = arRemove[i];
                child.parentNode.removeChild(child);
            }
        },

        /**
         * @function {static} o2.DomHelper.removeChildren
         *
         * <p>Removes all the children of the element.</p>
         *
         * @param {Object} elm - either the <strong>element</strong>, or the
         * <strong>id</strong> of it to process.
         */
        removeChildren : function(elm) {
            var node = $(elm);

            if (!node) {
                return;
            }

            node.innerHTML = kEmpty;
        },

        /**
         * @function {static} o2.DomHelper.empty
         *
         * <p>An alias to {@link o2.DomHelper.removeChildren}.</p>
         *
         * @param {Object} elm - either the <strong>element</strong>, or the
         * <strong>id</strong> of it to process.
         */
        empty : function(elm) {
            framework.DomHelper.removeChildren(elm);
        },

        /**
         * @function {static} o2.DomHelper.insertAfter
         *
         * <p>Adds the node after the reference node.</p>
         *
         * @param {Object} newNode - the DOM node, or the <strong>id</strong> of
         * the node, to insert after.
         * @param {Object} refNode - the reference node, or the
         * <strong>id</strong> of the node.
         */
        insertAfter : function(newNode, refNode) {
            newNode = $(newNode);
            refNode = $(refNode);

            if (!newNode || !refNode) {
                return;
            }

            var obj = refNode.parentNode;

            if (refNode.nextSibling) {
                obj.insertBefore(newNode, refNode.nextSibling);

                return;
            }

            obj.appendChild(newNode);
        },

        /**
         * @function {static} o2.DomHelper.insertBefore
         *
         * <p>Adds the node before the reference node.</p>
         *
         * @param {Object} newNode - the node, or the <strong>id</strong> of the
         * node, to insert before.
         * @param {Object} refNode - the reference, or the <strong>id</strong> of
         * the node.
         */
        insertBefore : function(newNode, refNode) {
            newNode = $(newNode);
            refNode = $(refNode);

            if (!newNode || !refNode) {
                return;
            }

            var obj = refNode.parentNode;

            obj.insertBefore(newNode, refNode);
        },

        /**
         * @function {static} o2.DomHelper.create
         *
         * <p>Creates an element with given name and attributes.</p>
         *
         * @param {String} name - the node name of the element (i.e. 'div', 'a').
         * @param {Object} attributes - an associative array in the form
         * <code>{att1:value1, att2:value2}</code>.
         *
         * @return the created element.
         */
        create : function(name, attributes) {
            var e = document.createElement(name);
            var value = kEmpty;
            var key = null;
            var isClass = false;
            var isStyle = false;

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
        },

        /**
         * @function {static} o2.DomHelper.createElement
         *
         * <p>An alias to {@link o2.DomHelper.create}.</p>
         *
         * @see o2.DomHelper.create
         */
        createElement : function(name, attributes) {
            return framework.DomHelper.create(name, attributes);
        },

        /**
         * @function {static} o2.DomHelper.prepend
         *
         * <p>Prepends the element to the top of its parent.</p>
         *
         * @param {Object} child - the child node, or the id of the node to
         * prepend.
         * @param {Object} parent - the parent container, or the id of the
         * container.
         */
        prepend : function(child, parent) {
            child = $(child);
            parent = $(parent);

            if (!child || !parent) {
                return;
            }

            if (parent.childNodes.length === 0) {
                parent.appendChild(child);

                return;
            }

            parent.insertBefore(child, parent.childNodes[0]);
        },

        /**
         * @function {static} o2.DomHelper.append
         *
         * <p>Appends the element to the bottom of its parent.</p>
         *
         * @param {Object} child - the child node, or the <strong>id</strong> of
         * the node to append.
         * @param {Object} parent - the parent container, or the
         * <strong>id</strong> of the container.
         */
        append : function(child, parent) {
            child = $(child);
            parent = $(parent);

            if (!child || !parent) {
                return;
            }

            parent.appendChild(child);

        },

        /**
         * @function {static} o2.DomHelper.getOffset
         *
         * <p>Gets the left and top offset of a given element.</p>
         *
         * @param {Object} elm - the element, or the id of the element, to get
         * the offsets of.
         *
         * @return the offset from the top-left corner of the viewport, in the
         * form <code>{left: l, top: t}</code>.
         */
        getOffset : function(elm) {
            elm = $(elm);

            var ol = -1;
            var ot = -1;

            if (!elm) {
                return {
                    left : ol,
                    top : ot
                };
            }

            while (true) {
                ol += elm.offsetLeft;
                ot += elm.offsetTop;
                elm = elm.offsetParent;

                if(!elm) {
                    break;
                }
            }

            return {
                left : ol,
                top : ot
            };

        },

        /**
         * @function {static} o2.DomHelper.offset
         *
         * <p>An alias to {@link o2.DomHelper.getOffset}
         *
         * @see o2.DomHelper.getOffset
         */
        offset : function(obj) {
            return me.getOffset(obj);
        },

        /**
         * @function {static} o2.DomHelper.getOffsetLeft
         *
         * <p>An alias to <code>o2.DomHelper.getOffset(obj).left</code>.</p>
         *
         * @see o2.DomHelper.getOffset
         */
        getOffsetLeft : function(obj) {
            return me.getOffset(obj).left;
        },

        /**
         * @function {static} o2.DomHelper.offsetLeft
         *
         * <p>An alias to <code>o2.DomHelper.getOffset(obj).left</code>.</p>
         *
         * @see o2.DomHelper.getOffset
         */
        offsetLeft : function(obj) {
            return me.getOffset(obj).left;
        },

        /**
         * @function {static} o2.DomHelper.getOffsetTop
         *
         * <p>An alias to <code>o2.DomHelper.getOffset(obj).top</code>.</p>
         *
         * @see o2.DomHelper.getOffset
         */
        getOffsetTop : function(obj) {
            return me.getOffset(obj).top;
        },

        /**
         * @function {static} o2.DomHelper.offsetTop
         *
         * <p>An alias to <code>o2.DomHelper.getOffset(obj).top</code>.</p>
         *
         * @see o2.DomHelper.getOffset
         */
        offsetTop : function(obj) {
            return me.getOffset(obj).top;
        },

        /**
         * @function {static} o2.DomHelper.getAttribute
         *
         * <p>Gets the attribute of a given node.</p>
         *
         * @param {Object} obj - the node, or the <strong>id</strong> of the
         * node, to get the attribute of.
         * @param {String} attribute - the attribute to gather.
         * @return the value of the attribute if found; <code>null</code>
         * otherwise.
         */
        getAttribute : function(obj, attribute) {
            obj = $(obj);

            if (!obj || !attribute) {
                return null;
            }

            var value = null;

            if (attribute === kClass || attribute === kClassName) {
                value = obj.className;

                if (value !== undefined) {
                    return value;
                }
            }

            if (attribute === kStyle || attribute === kCss ||
                        attribute === kCssText) {
                value = obj.cssText;

                if (value !== undefined) {
                    return value;
                }
            }

            //DOM object (obj) may not have a getAttribute method.
            if (typeof obj.getAttribute === kFunction) {
                value = obj.getAttribute(attribute);

                if (value !== undefined) {
                    return value;
                }
            }

            return obj[attribute] || null;
        },

        /**
         * @function {static} o2.DomHelper.setAttribute
         *
         * <p>Sets the attribute of the given object.</p>
         *
         * @param {Object} obj - the object or the <code>String</code> id of it.
         * @param {String} attribute - the name of the attribute.
         * @param {String} value - the value of the attribute.
         */
        setAttribute : function(obj, attribute, value) {
            obj = $(obj);

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
        }
    };
}(this.o2, this.document));
