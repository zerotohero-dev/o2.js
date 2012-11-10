/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: add header and documentation
(function(framework, fp, document, UNDEFINED) {
    'use strict';

    /**
     * @module dom.traverse.child
     *
     * @requires dom.traverse.ends
     * @requires dom.traverse.nth
     *
     * //TODO: add documentation
     */
    fp.ensure(
        'dom.traverse.child',
    [
        'dom.traverse.ends',
        'dom.traverse.nth'
    ]);

    var attr    = fp.getAttr,
        alias   = attr(fp, 'alias'),
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * Module Definition
         */

        kModuleName = 'Dom',

        /*
         * Dom (traverse.child)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * dom.traverse.ends
         */

         //TODO: this require can make a module lookup too and throw errors like
         // 'getFirst' is not defined, include `o2.dom.traverse.ends`.
         getFirst              = require(me, 'getFirst'),
         getFirstByAttribute   = require(me, 'getFirstByAttribute'),
         getFirstByClass       = require(me, 'getFirstByClass'),
         getFirstWithAttribute = require(me, 'getFirstWithAtttribute'),
         getFirstWithClass     = require(me, 'getFirstWithClass'),
         getFirstWithId        = require(me, 'getFirstWithId'),
         getLast               = require(me, 'getLast'),
         getLastByAttribute    = require(me, 'getLastByAttribute'),
         getLastByClass        = require(me, 'getLastByClass'),
         getLastWithAttribute  = require(me, 'getLastWithAttribute'),
         getLastWithClass      = require(me, 'getLastWithClass'),
         getLastWithId         = require(me, 'getLastWithId'),

        /*
         * dom.traverse.nth
         */
         getNth              = require(me, 'getNth'),
         getNthByAttribute   = require(me, 'getNthByAttribute'),
         getNthByClass       = require(me, 'getNthByClass'),
         getNthWithAttribute = require(me, 'getNthWithAttribute'),
         getNthWithClass     = require(me, 'getNthWithClass'),
         getNthWithId        = require(me, 'getNthWithId');

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

        return getFirstWithId(elm.firstChild, name);
    });

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

        return getLastWithId(elm.lastChild, name);
    });

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

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
        if (!elm) {return null;}

        return getNthWithId(elm.firstChild, n, name);
    });
}(this.o2, this.o2.protecteds, this.document));
