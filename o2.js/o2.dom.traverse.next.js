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
        'dom.traverse.next',
    [
        'core',
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
         * Dom (traverse.next)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * dom.traverse.validate
         */
        isAttributeEquals = require(kModuleName, 'isAttributeEquals'),
        hasClassName      = require(kModuleName, 'hasClassName'),
        hasAttribute      = require(kModuleName, 'hasAttribute'),
        hasClassAttribute = require(kModuleName, 'hasClassAttribute'),
        hasIdAttribute    = require(kModuleName, 'hasIdAttribute'),
        isNodeEquals      = require(kModuleName, 'isNodeEquals'),

        /*
         * (o2.dom.traverse.core) Protecteds
         */
        protecteds      = require(kModuleName, 'protecteds'),
        getNextSiblings = attr(protecteds, 'getNextSiblings');


    /**
     *
     * @function {static} o2.Dom.getNext
     *
     * <p>Gets the next sibling of the element, that's not a text node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNext('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNext = def(me, 'getNext', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextByAttribute
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextByAttribute('content', 'data-id', '42', 'li');
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
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextByAttribute = def(me, 'getNextByAttribute', function(elm,
                attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextByClass
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextByClass('content', 'selected', 'li');
     * </pre>
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having a given <strong>CSS</strong> class name.</p>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextByClass = def(me, 'getNextByClass', function(elm, className,
                name) {
        return getNextSiblings(elm, hasClassName, [className],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextWithAttribute
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextWithAttribute('content', 'data-id', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextWithAttribute = def(me, 'getNextWithAttribute', function(
                elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextWithClass
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextWithClass = def(me, 'getNextWithClass', function(elm, name) {
        return getNextSiblings(elm,hasClassAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextWithId
     *
     * <p>Gets the next sibling of the element, that's not a text node, and
     * having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the next sibling available with the given criteria, if found;
     * <code>null</code> otherwise.
     */
    exports.getNextWithId = def(me, 'getNextWithId', function(elm, name) {
        return getNextSiblings(elm, hasIdAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getNextAll
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAll('content', 'li');
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
    exports.getNextAll = def(me, 'getNextAll', function(elm, name) {
        return getNextSiblings(elm, null, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllByAttribute
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an attribute with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByAttribute('content', 'data-id', '42');
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
    exports.getNextAllByAttribute = def(me, 'getNextAllByAttribute', function(
                elm, attribute, value, name) {
        return getNextSiblings(elm, isAttributeEquals, [attribute, value],
            null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllByAttributeUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an attribute with a given value, until (but not included
     * to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByAttributeUntil('content', 'data-id', '42',
     *      'stopper', 'li');
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
    exports.getNextAllByAttributeUntil = def(me, 'getNextAllByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return getNextSiblings(elm,
            isAttributeEquals, [attribute, value], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllByClass
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByClass('content', 'selected', 'li');
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
    exports.getNextAllByClass = def(me, 'getNextAllByClass', function(elm,
                className, name) {
        return getNextSiblings(elm, hasClassName, [className], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllByClassUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given <strong>CSS</strong> class name, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllByClassUntil('content', 'selected',
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
    exports.getNextAllByClassUntil = def(me, 'getNextAllByClassUntil', function(
                elm, className, until, name) {
        return getNextSiblings(elm, hasClassName, [className],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, until (but not included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllUntil('content', 'stopper', 'li');
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
    exports.getNextAllUntil = def(me, 'getNextAllUntil', function(elm, until,
                name) {
        return getNextSiblings(elm, null, [], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithAttribute
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithAttribute('content', 'data-id', 'li');
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
    exports.getNextAllWithAttribute = def(me, 'getNextAllWithAttribute',
                function(elm, attribute, name) {
        return getNextSiblings(elm, hasAttribute, [attribute], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithAttributeUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a given attribute defined, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithAttributeUntil('content', 'data-id',
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
    exports.getNextAllWithAttributeUntil = def(me,
                'getNextAllWithAttributeUntil',
                function(elm, attribute, until, name) {
        return getNextSiblings(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithClass
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithClass('content', 'li');
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
    exports.getNextAllWithClass = def(me, 'getNextAllWithClass', function(elm,
                name) {
        return getNextSiblings(elm, hasClassAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithClassUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having a "class" attribute defined, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithClassUntil('content', 'stopper', 'li');
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
    exports.getNextAllWithClassUntil = def(me, 'getNextAllWithClassUntil',
                function(elm, until, name) {
        return getNextSiblings(elm, hasClassAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithId
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithId('content', 'li');
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
    exports.getNextAllWithId = def(me, 'getNextAllWithId', function(elm,
                name) {
        return getNextSiblings(elm, hasIdAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getNextAllWithIdUntil
     *
     * <p>Gets all the following siblings of the element that are not text
     * nodes, having an "id" attribute defined, until (but not
     * included to) a given <strong>DOM</strong> node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getNextAllWithIdUntil('content', 'stopper', 'li');
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
    exports.getNextAllWithIdUntil = def(me, 'getNextAllWithIdUntil', function(
                elm, until, name) {
        return getNextSiblings(elm, hasIdAttribute, [], isNodeEquals, [until],
            name);
    });
}(this.o2, this.o2.protecteds));

