define([
    '../core',
    './submodule/constants'
], function(
    o2,
    Constants
) {
    'use strict';

        /*
         * #Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = o2.$,

        /*
         * dom.constants
         */
        nt = Constants.nodeType,
        kElementNode = nt.ELEMENT,
        kDocumentNode = nt.DOCUMENT,
        kText = nt.TEXT,

        /*
         * # Common Constants
         */

        kClass = 'class',
        kClassName = 'className',
        kCss = 'css',
        kCssText = 'cssText',
        kDiv = 'div',
        kEmpty = '',
        kFunction = 'function',
        kNumber = 'number',
        kObject = 'object',
        kString = 'string',
        kStyle = 'style',

        /*
         * # Common Regular Expressions
         */

        kReturnRegExp = /\r\n|\r/g,
        kWhiteSpaceRegExp = /^\s*$/,

        /*
         * # Static State
         */

        /*
         * For creating document fragments.
         */
        tempFragmentDiv;

    exports.append = function(elmChild, elmParent) {
        var child  = $(elmChild),
            parent = $(elmParent),
            temp   = null;

        if (!child || !parent) {return;}

        if (typeof child === 'string') {
            temp = document.createElement(kDiv);
            parent.appendChild(temp).innerHTML = child;
            return temp;
        }

        return parent.appendChild(child);
    };

    exports.createDocumentFragment = function(html) {
        var result = document.createDocumentFragment();

        tempFragmentDiv = tempFragmentDiv || document.createElement(kDiv);

        tempFragmentDiv.innerHTML = html;

        while (tempFragmentDiv.firstChild) {
            result.appendChild(tempFragmentDiv.firstChild);
        }

        tempFragmentDiv = null;

        return result;
    };

    exports.createElement = function(name, attributes) {
        var e = document.createElement(name),
            isClass,
            isStyle,
            key,
            value;

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
                    // To avoid problems the following combination of cssText
                    // and getAttribute/setAttribute can be used.
                    e.style.cssText = value;
                    e.setAttribute(kStyle, value);
                } else {
                    e[key] = attributes[key];
                }
            }
        }

        return e;
    };

    // TODO: after AMDfiying everything, go over all the modules to clean them
    // up; remove code for unsupported browsers.

    exports.create = exports.createElement;

    exports.getAttribute = function(elm, attribute) {
        var obj = $(elm),
            value = null;

        if (!obj || !attribute) {return null;}

        if (attribute === kClass || attribute === kClassName) {
            value = obj.className;

            if (value !== undefined) {return value;}
        }

        if (attribute === kStyle || attribute === kCss ||
                    attribute === kCssText) {
            value = obj.cssText;

            if (value !== undefined) {return value;}
        }

        // The DOM object (obj) may not have a getAttribute method.
        if (typeof obj.getAttribute === kFunction) {
            value = obj.getAttribute(attribute);

            if (value !== undefined) {return value;}
        }

        return obj[attribute] || null;
    };

    exports.getHtml = function(elm) {
        var obj = $(elm);

        if (!obj) {return null;}

        return obj.innerHTML;
    };

    if (document.innerText !== undefined) {
        exports.getText = function(elm) {
            var obj = $(elm),
                nodeType = null;

            if (!obj) {return null;}

            nodeType = obj.nodeType;

            if (!nodeType) {return null;}

            if (nodeType !== kElementNode &&
                        nodeType !== kDocumentNode) {return null;}

            if (typeof obj.innerText !== kString) {return null;}

            return obj.innerText.replace(kReturnRegExp, '');
        };
    } else {
        exports.getText = function(elm) {
            var obj = $(elm),
                nodeType = null;

            if (!obj) {return null;}

            nodeType = obj.nodeType;

            if (!nodeType) {return null;}

            if (nodeType !== kElementNode &&
                        nodeType !== kDocumentNode) {return null;}

            if (typeof obj.textContent !== kString) {return null;}

            return obj.textContent;
        };
    }

    exports.insertAfter = function(elmNewNode, elmRefNode) {
        var newNode = $(elmNewNode),
            refNode = $(elmRefNode),
            obj = null;

        if (!newNode || !refNode) {return;}

        obj = refNode.parentNode;

        if (refNode.nextSibling) {
            obj.insertBefore(newNode, refNode.nextSibling);

            return;
        }

        obj.appendChild(newNode);
    };

    exports.insertBefore = function(elmNewNode, elmRefNode) {
        var newNode = $(elmNewNode),
            refNode = $(elmRefNode),
            obj = null;

        if (!newNode || !refNode) {return;}

        obj = refNode.parentNode;

        obj.insertBefore(newNode, refNode);
    };

    exports.isDocument = function(obj) {
        return !!(obj && obj.nodeType === kElementNode);
    };

    exports.isElement = function(obj) {
        return !!(obj && obj.nodeType === kElementNode);
    };

    /**
     *
     */
    //TODO: add documentation.
    exports.isNode = function(obj) {
        return (
            typeof window.Node === kObject ?

                // DOM Level 2
                obj instanceof window.Node :

                // Legacy
                obj && typeof obj === kObject &&
                    typeof obj.nodeType === kNumber &&
                    typeof obj.nodeName === kString
        );
    };


    exports.prepend = function(elmChild, elmParent) {
        var child  = $(elmChild),
            parent = $(elmParent),
            temp   = null;

        if (!child || !parent) {return;}

        if (typeof child === kString) {
            temp           = document.createElement(kDiv);
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
    };

    exports.remove = function(e) {
        var elm = $(e);

        if (!elm) {return null;}

        elm.parentNode.removeChild(elm);

        return elm;
    };

    exports.removeNode = exports.remove;

    exports.removeChildren = function(elm) {
        var node = $(elm);

        if (!node) {return;}

        node.innerHTML = kEmpty;
    };

    exports.empty = exports.removeChildren;

    exports.removeEmptyTextNodes = function(e) {
        var arRemove = [],
            elm = $(e),
            shouldRemove = false,
            child,
            i,
            children,
            len;

        if (!elm) {return;}

        children = elm.childNodes;
        len = children.length;

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
    };

    exports.removeEmpty = exports.removeEmptyTextNodes;

    exports.setAttribute = function(elm, attribute, value) {
        var obj = $(elm);

        if (!obj || !attribute) {return;}

        if (attribute === kClass  || attribute === kClassName) {
            obj.className = value;

            return;
        }

        if (typeof obj.setAttribute === kFunction) {
            obj.setAttribute(attribute, value);

            return;
        }

        obj[attribute] = value;
    };

    exports.setHtml = function(elm, html) {
        var obj = $(elm);

        if (!obj) {return;}

        obj.innerHTML = html;
    };
});
