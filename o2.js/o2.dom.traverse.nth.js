/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: add header and documentation
(function(framework, fp, document, UNDEFINED) {
    'use strict';

    fp.ensure(
        'dom.traverse.nth',
    [
        'core',
        'dom.constants'
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
         * # Module Definition
         */

        kModuleName = 'Dom',

        /*
         * Dom (traverse.nth)
         */
        me = create(kModuleName);

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

    /*
     *
     */
    getNth = require(kModuleName, 'getNth');

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
    getNthByAttribute = require(kModuleName, 'getNthByAttribute');

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
    getNthByClass = require(kModuleName, 'getNthByClass');

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
    getNthWithAttribute = require(kModuleName, 'getNthWithAttribute');

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
    getNthWithClass = require(kModuleName, 'getNthWithClass');

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
    getNthWithId = require(kModuleName, 'getNthWithId');

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

      'getNth', 'getNthByAttribute', 'getNthByClass',
      'getNthWithAttribute', 'getNthWithClass', 'getNthWithId',

      'getNthNext', 'getNthNextByAttribute', 'getNthNextByClass',
      'getNthNextWithAttribute', 'getNthNextWithClass',
      'getNthNextWithId',

      'getNthPrev', 'getNthPrevByAttribute', 'getNthPrevByClass',
      'getNthPrevWithAttribute', 'getNthPrevWithClass',
      'getNthPrevWithId',

      'getNthParent', 'getNthParentByAttribute', 'getNthParentByClass',
      'getNthParentWithAttribute', 'getNthParentWithClass',
      'getNthParentWithId'
}(this.o2, this.o2.protecteds, this.document));

