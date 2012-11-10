/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: add header and documentation
(function(framework, fp, document, UNDEFINED) {
    'use strict';

    fp.ensure('dom.traverse.ends', [
        'core',
        'dom.traverse.next',
        'dom.traverse.validate'
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
         * Dom (traverse.ends)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * dom.traverse.next
         */
        getNextSiblings = require(me, 'getNextSiblings'),

        /*
         * dom.traverse.validate
         */
        isAttributeEquals = require(me, 'isAttributeEquals');

    /**
     * @function {static} o2.Dom.getFirst
     *
     * <p>Gets the first sibling of the element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirst('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirst = def(me, 'getFirst', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, 0, true);
    });

    /*
     *
     */
    getFirst = require(kModuleName, 'getFirst');

    /**
     * @function {static} o2.Dom.getFirstByAttribute
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having an attibute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstByAttribute('content', 'data-id', '42');
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
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstByAttribute = def(me, 'getFirstByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    getFirstByAttribute = require(kModuleName, 'getFirstByAttribute');

    /**
     * @function {static} o2.Dom.getFirstByClass
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstByClass = def(me, 'getFirstByClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    getFirstByClass = require(kModuleName, 'getFirstByClass');

    /**
     * @function {static} o2.Dom.getFirstWithAttribute
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstWithAttribute = def(me, 'getFirstWithAttribute', function(
                elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    getFirstWithAttribute = require(kModuleName, 'getFirstWithAttribute');

    /**
     * @function {static} o2.Dom.getFirstWithClass
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstWithClass = def(me, 'getFirstWithClass', function(elm,
                name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    getFirstWithClass = require(kModuleName, 'getFirstWithClass');

    /**
     * @function {static} o2.Dom.getFirstWithId
     *
     * <p>Gets the first sibling of the element that's not a text node, and
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getFirstWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getFirstWithId = def(me, 'getFirstWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true);
    });

    /*
     *
     */
    getFirstWithId = require(kModuleName, 'getFirstWithId');


    /**
     * @function {static} o2.Dom.getLast
     *
     * <p>Gets the last sibling of the element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLast('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLast = def(me, 'getLast', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name,
            null, 0, true, true);
    });

    /*
     *
     */
    getLast = require(kModuleName, 'getLast');

    /**
     * @function {static} o2.Dom.getLastByAttribute
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastByAttribute('content', 'data-id', '42');
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
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastByAttribute = def(me, 'getLastByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    getLastByAttribute = require(kModuleName, 'getLastByAttribute');

    /**
     * @function {static} o2.Dom.getLastByClass
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has a given class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastByClass = def(me, 'getLastByClass', function(elm, className,
                name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    getLastByClass = require(kModuleName, 'getLastByClass');

    /**
     * @function {static} o2.Dom.getLastWithId
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastWithId = def(me, 'getLastWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    getLastWithId = require(kModuleName, 'getLastWithId');

    /**
     * @function {static} o2.Dom.getLastWithAttribute
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastWithAttribute = def(me, 'getLastWithAttribute', function(
                elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    getLastWithAttribute = require(kModuleName, 'getLastWithAttribute');

    /**
     * @function {static} o2.Dom.getLastWithClass
     *
     * <p>Gets the last sibling of the element that's not a text node, and
     * has a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getLastWithClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the last sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getLastWithClass = def(me, 'getLastWithClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, true, true);
    });

    /*
     *
     */
    getLastWithClass = require(kModuleName, 'getLastWithClass');
}(this.o2, this.o2.protecteds, this.document));







