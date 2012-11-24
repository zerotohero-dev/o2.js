/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: add header and documentation
(function(framework, fp) {
    'use strict';

    fp.ensure(
        'dom.traverse.prev',
    [
        'core',
        'dom.traverse.siblings',
        'dom.traverse.validate'
    ]);

    var attr    = fp.getAttr,
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
         * Dom (traverse.prev)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * (dom.traverse.core Protecteds
         */
        protecteds      = require(kModuleName, 'protecteds'),
        getNextSiblings = attr(protecteds, 'getNextSiblings'),

        /*
         * dom.traverse.validate
         */
        isAttributeEquals = require(kModuleName, 'isAttributeEquals'),
        hasClassName      = require(kModuleName, 'hasClassName'),
        hasAttribute      = require(kModuleName, 'hasAttribute'),
        hasClassAttribute = require(kModuleName, 'hasClassAttribute'),
        hasIdAttribute    = require(kModuleName, 'hasIdAttribute'),
        isNodeEquals      = require(kModuleName, 'isNodeEquals');

    /**
     * @function {static} o2.Dom.getPrev
     *
     * <p>Gets the previous sibling of an element that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrev('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrev = def(me, 'getPrev', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevByAttribute
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevByAttribute('content', 'data-id', '42', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - i the value of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevByAttribute = def(me, 'getPrevByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevByClass
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevByClass = def(me, 'getPrevByClass', function(elm, className,
                name) {
       return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevWithAttribute
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevWithAttribute = def(me, 'getPrevWithAttribute', function(elm,
                attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevWithClass
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevWithClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevWithClass = def(me, 'getPrevWithClass', function(elm, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevWithId
     *
     * <p>Gets the previous sibling of an element that's not a text node,
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getPrevWithId('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first previous sibling available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getPrevWithId = def(me, 'getPrevWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAll
     *
     * <p>Gets all previous sibling of an element, that are not text nodes.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAll('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAll = def(me, 'getPrevAll', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [],
            name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllByAttribute
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByAttribute('content', 'data-id', '42');
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
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByAttribute = def(me, 'getPrevAllByAttribute', function(
                elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllByAttributeUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute with a given value, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByAttributeUntil('content', 'data-id',
     *      '42', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByAttributeUntil = def(me, 'getPrevAllByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllByClass
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByClass = def(me, 'getPrevAllByClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllByClassUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given <strong>CSS</strong> class name, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllByClassUntil('content', 'selected',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllByClassUntil = def(me, 'getPrevAllByClassUntil',
                function(elm, className, until, name) {
        return getNextSiblings(elm, hasClassName, [className],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * until (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllUntil = def(me, 'getPrevAllUntil', function(elm, until,
                name) {
        return getNextSiblings(elm, null, [], isNodeEquals, [until],
            name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithAttribute
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithAttribute = def(me, 'getPrevAllWithAttribute',
                function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute], null, [],
            name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithAttributeUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a given attribute defined, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithAttributeUntil('content', 'data-id',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithAttributeUntil = def(me,
                'getPrevAllWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithClass
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithClass = def(me, 'getPrevAllWithClass', function(elm,
                name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithClassUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having a "class" attribute defined, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithClassUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithClassUntil = def(me, 'getPrevAllWithClassUntil',
                function(elm, until, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            isNodeEquals, [until], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithId
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithId = def(me, 'getPrevAllWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, null, false, true);
    });

    /**
     * @function {static} o2.Dom.getPrevAllWithIdUntil
     *
     * <p>Gets all previous sibling of an element, that are not text nodes,
     * having an "id" attribute defined, until
     * (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getPrevAllWithIdUntil('content', 'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {Object} until - the <strong>DOM</strong> to search until (but
     * not included to), or its <code>String</code> id.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getPrevAllWithIdUntil = def(me, 'getPrevAllWithIdUntil', function(
                elm, until, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            isNodeEquals, [until], name, null, null, false, true);
    });
}(this.o2, this.o2.protecteds));

