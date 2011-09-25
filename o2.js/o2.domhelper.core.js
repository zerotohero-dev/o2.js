/*global o2 */

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
( function(framework, window, UNDEFINED) {

    //TODO: update my documentation ($'s added).

    /*
     * Aliases.
     */
    var me = framework;
    var $ = framework.$;

    /**
     * @class {static} DomHelper
     *
     * A cross-browser DOM manipulation helper.
     */
    me.DomHelper = {

        /**
         * @struct {static} DomHelper.nodeType
         *
         * <code>DOM</code> node types.
         */
        nodeType : {

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ELEMENT - element node.
             */
            ELEMENT : 1,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ATTRIBUTE - atribute node.
             */
            ATTRIBUTE : 2,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.TEXT - text node.
             */
            TEXT : 3,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.CDATA - CDATA section.
             */
            CDATA : 4,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ENTITY_REFERENCE - entity reference.
             */
            ENTITY_REFERENCE : 5,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ENTITY - entity.
             */
            ENTITY : 6,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.PROCESSING_INSTRUCTION - processing
             * instruction.
             */
            PROCESSING_INSTRUCTION : 7,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.COMMENT - comment node.
             */
            COMMENT : 8,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.DOCUMENT - document (root) node.
             */
            DOCUMENT : 9,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.DOCUMENT_TYPE - DTD node.
             */
            DOCUMENT_TYPE : 10,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.DOCUMENT_FRAGMENT - document fragment.
             */
            DOCUMENT_FRAGMENT : 11,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.NOTATION - notation.
             */
            NOTATION : 12

        },

        /**
         * @function {static} DomHelper.isChild
         *
         * <p>Checks whether the give node is the child of another node.</p>
         *
         * @param {DomNode} testNode - the node to test.
         * @param {DomNode} parentNode - the parent node.
         * @return <code>true</code> if <strong>testNode</strong> is the child of
         * <strong>parentNode</strong>, <code>false</code> otherwise.
         */
        isChild : function(testNode, parentNode) {

            //
            testNode = $(testNode);
            parentNode = $(parentNode);

            var theNode = testNode;

            if(!testNode || !parentNode) {

                return false;
            }

            if(testNode == parentNode) {

                return false;
            }

            while(theNode.nodeName.toLowerCase() != 'body') {
                if(theNode == parentNode) {

                    return true;
                }

                if(!theNode.parentNode) {

                    return false;
                }
                //
                theNode = theNode.parentNode;
            }

            return false;

        },

        //TODO: add documentation.
        create : function(nodeName) {

            if(!nodeName) {

                return null;
            }
            
            if(typeof nodeName != 'string'){

                return null;
            }
            
            return document.createElement(nodeName);
        
        },

        /**
         * @function {static} DomHelper.removeNode
         *
         * <p>Removes the element from the <strong>DOM</strong> flow.</p>
         *
         * @param {DomNode} elm - the node to remove.
         * @return the removed node.
         */
        removeNode : function(elm) {

            //
            elm = $(elm);

            if(!elm) {

                return null;
            }

            elm.parentNode.removeChild(elm);

            return elm;

        },

        /**
         * @function {static} DomHelper.removeEmptyTextNodes
         *
         * <p>Removes empty text nodes from the element.</p>
         *
         * @param {DomNode} elm - The element to process.
         * @param {Boolean} isRecursive - if <code>true</code> do the same
         * process for
         * the child nodes of <code>elm</code> as well.
         */
        removeEmptyTextNodes : function(elm, isRecursive) {

            //
            elm = $(elm);

            if(!elm) {

                return;
            }

            var children = elm.childNodes;
            var arRemove = [];
            var len = children.length;
            var i = 0;

            //
            isRecursive = !!isRecursive;

            var kText = me.DomHelper.nodeType.TEXT;
            var regWhitespace = /^\s*$/;

            var nodeValue = '';
            var child = null;
            var shouldRemove = false;

            var removeEmptyTextNodes = me.DomHelper.removeEmptyTextNodes;

            for( i = 0; i < len; i++) {
                child = children[i];

                if(child.hasChildNodes()) {
                    if(isRecursive) {
                        removeEmptyTextNodes(child, true);
                    }

                    continue;
                }

                //
                shouldRemove = child.nodeType == kText && regWhitespace.test(child.nodeValue);

                if(shouldRemove) {
                    arRemove.push(child);
                }
            }

            for( i = 0, len = arRemove.length; i < len; i++) {
                child = arRemove[i];
                child.parentNode.removeChild(child);
            }

        },

        //TODO: add documentation.
        removeChildren : function(elm) {

            var node = $(elm);

            if(!node) {

                return;
            }

            node.innerHTML = '';

        },

        /**
         * @function {static} DomHelper.insertAfter
         *
         * <p>Adds the node after the reference node.</p>
         *
         * @param {DomNode} newNode - the node to insert after.
         * @param {DomNode} refNode - the reference node.
         */
        insertAfter : function(newNode, refNode) {

            //
            newNode = $(newNode);
            refNode = $(refNode);

            if(!newNode || !refNode) {

                return;
            }

            var obj = refNode.parentNode;

            return refNode.nextSibling ? obj.insertBefore(newNode, refNode.nextSibling) : obj.appendChild(newNode);

        },

        /**
         * @function {static} DomHelper.insertBefore
         *
         * <p>Adds the node before the reference node.</p>
         *
         * @param {DomNode} newNode - the node to insert before.
         * @param {DomNode} refNode - the reference node.
         */
        insertBefore : function(newNode, refNode) {

            //
            newNode = $(newNode);
            refNode = $(refNode);

            if(!newNode || !refNode) {

                return;
            }

            var obj = refNode.parentNode;

            obj.insertBefore(newNode, refNode);

        },

        /**
         * @function {static} DomHelper.createElement
         *
         * <p>Creates an element with given name and attributes.</p>
         *
         * @param {String} name - the node name of the element (i.e. 'div', 'a').
         * @param {Object} attributes - an associative array in the form
         * <code>{att1:value1, att2:value2}</code>.
         * @return the created element.
         */
        createElement : function(name, attributes) {

            var e = document.createElement(name);

            var value = '';

            // Internet Explorer 7- (and some minor browsers) cannot set values
            // for style, class or event handlers, using setAttribute.
            // Internet Explorer 8 has fixed most of these, but still cannot set
            // event handlers. Internet Explorer 9 can now set these attributes
            // in standards mode. A few more browsers also have trouble reading
            // these attributes using getAttribute.

            for(var key in attributes) {
                if(attributes.hasOwnProperty(key)) {
                    value = attributes[key];

                    if(key == 'class' || key == 'className') {
                        e.className = value;

                        continue;
                    }

                    if(key == 'style' || key == 'css' || key == 'cssText') {

                        // The string value of the style attribute is available
                        // as a read/write string called cssText, which is a
                        // property of the style object, which itself is a
                        // property of the element.
                        // Note, however, that it is not supported very well;
                        // Safari does not support it up to version 1.1 (reading
                        // it produces the value null)
                        //
                        // ...
                        //
                        // To avoid problems a combination of cssText and
                        // getAttribute/setAttribute can be used.

                        e.style.cssText = value;
                        e.setAttribute('style', value);

                        continue;
                    }

                    e[key] = attributes[key];
                }
            }

            return e;

        },

        /**
         * @function {static} DomHelper.prepend
         *
         * <p>Prepends the element to the top of its parent.</p>
         *
         * @param {DomNode} child - the child node to prepend.
         * @param {DomNode} parent - the parent container.
         */
        prepend : function(child, parent) {

            //
            child = $(child);
            parent = $(parent);

            if(!child || !parent) {

                return;
            }

            if(parent.childNodes.length === 0) {
                parent.appendChild(child);

                return;
            }

            parent.insertBefore(child, parent.childNodes[0]);

        },

        /**
         * @function {static} DomHelper.append
         *
         * <p>Appends the element to the bottom of its parent.</p>
         *
         * @param {DomNode} child - the child node to append.
         * @param {DomNode} parent - the parent container.
         */
        append : function(child, parent) {

            //
            child = $(child);
            parent = $(parent);

            if(!child || !parent) {

                return;
            }

            parent.appendChild(child);

        },

        /**
         * @function {static} DomHelper.getOffset
         *
         * <p>Gets the left and top offset of a given element.</p>
         *
         * @param {DomNode} elm - the element to get the offsets of.
         * @return the offset from the top-left corner of the viewport, in the
         * form
         * <code>{left: l, top: t}</code>.
         */
        getOffset : function(elm) {

            //
            elm = $(elm);

            var ol = -1;
            var ot = -1;

            if(!elm) {

                return {
                    left : ol,
                    top : ot
                };
            }

            while(true) {
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
         * @function {static} DomHelper.getAttribute
         *
         * <p>Gets the attribute of a given node.</p>
         *
         * @param {DomNode} obj - the node to get the attribute of.
         * @param {String} attribute - the attribute to gather.
         * @return the value of the attribute if found; <code>null</code>
         * otherwise.
         */
        getAttribute : function(obj, attribute) {

            //
            obj = $(obj);

            if(!obj || !attribute) {

                return null;
            }

            //DOM object (obj) may not have a getAttribute method.
            
            if( typeof obj.getAttribute == 'function') {
                var value = obj.getAttribute(attribute);

                if(value !== UNDEFINED) {

                    return value;
                }
            }

            return obj[attribute] ? obj[attribute] : null;

        }

    };

}(o2, this));
