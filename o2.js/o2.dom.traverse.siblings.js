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
        'dom.traverse.siblings',
    [
        'core',
        'dom.traverse.children'
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
         * Dom (traverse.siblings)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * dom.traverse.children
         */
        getChildren                   = require(kModuleName,
            'getChildren'),
        getChildrenByAttribute        = require(kModuleName,
            'getChildrenByAttribute'),
        getChildrenByAttributeUntil   = require(kModuleName,
            'getChildrenByAttributeUntil'),
        getChildrenByClass            = require(kModuleName,
            'getChildrenByClass'),
        getChildrenByClassUntil       = require(kModuleName,
            'getChildrenByClassUntil'),
        getChildrenWithId             = require(kModuleName,
            'getChildrenWithId'),
        getChildrenWithIdUntil        = require(kModuleName,
            'getChildrenWithIdUntil'),
        getChildrenUntil              = require(kModuleName,
            'getChildrenUntil'),
        getChildrenWithAttribute      = require(kModuleName,
            'getChildrenWithAttribute'),
        getChildrenWithAttributeUntil = require(kModuleName,
            'getChildrenWithAttributeUntil'),
        getChildrenWithClass          = require(kModuleName,
            'getChildrenWithClass'),
        getChildrenWithClassUntil     = require(kModuleName,
            'getChildrenWithClassUntil');

    /**
     * @function {static} o2.Dom.getSiblings
     *
     * <p>Gets the siblings of the element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblings('content', 'li');
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
    exports.getSiblings = def(me, 'getSiblings', function(elm, name) {
        return !elm ? [] : getChildren(elm.parentNode, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsByAttribute
     *
     * <p>Gets the siblings of the element, having a given attribute equals
     * a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByAttribute('content', 'data-id', '42');
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
    exports.getSiblingsByAttribute = def(me, 'getSiblingsByAttribute', function(
                elm, attribute, value, name) {
        return !elm ? [] : getChildrenByAttribute(elm.parentNode,
            attribute, value, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsByAttributeUntil
     *
     * <p>Gets the siblings of the element, having a given attribute equals
     * a given value, until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByAttributeUntil('content', 'data-id',
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
    exports.getSiblingsByAttributeUntil = def(me, 'getSiblingsByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return !elm ? [] : getChildrenByAttributeUntil(elm.parentNode,
            attribute, value, until, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsByClass
     *
     * <p>Gets the siblings of the element, having a given class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByClass('content', 'selected', 'li');
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
    exports.getSiblingsByClass = def(me, 'getSiblingsByClass', function(elm,
                name) {
        return !elm ? [] : getChildrenByClass(elm.parentNode, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsByClassUntil
     *
     * <p>Gets the siblings of the element, having a given class name,
     * until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsByClassUntil('content', 'selected',
     *      'stopper', 'li');
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
    exports.getSiblingsByClassUntil = def(me, 'getSiblingsByClassUntil',
                function(elm, until, name) {
        return !elm ? [] : getChildrenByClassUntil(elm.parentNode, until,
            name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsUntil
     *
     * <p>Gets the siblings of the element until (but not included to) a
     * specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsUntil('content', 'stopper', 'li');
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
    exports.getSiblingsUntil = def(me, 'getSiblingsUntil',  function(elm,
                until, name) {
        return !elm ? [] : getChildrenUntil(elm.parentNode, until, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithAttribute
     *
     * <p>Gets the siblings of the element, having a given attribute
     * defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithAttribute('content', 'dada-id', 'li');
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
    exports.getSiblingsWithAttribute = def(me, 'getSiblingsWithAttribute',
                function(elm, attribute, name) {
        return !elm ? [] : getChildrenWithAttribute(elm.parentNode,
            attribute, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithAttributeUntil
     *
     * <p>Gets the siblings of the element, having a given attribute
     * defined, until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithAttributeUntil('content', 'data-id',
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
    exports.getSiblingsWithAttributeUntil = def(me,
                'getSiblingsWithAttributeUntil',  function(elm, attribute,
                until, name) {
        return !elm ? [] : getChildrenWithAttributeUntil(elm.parentNode,
            attribute, until, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithClass
     *
     * <p>Gets the siblings of the element, having "class" attribute
     * defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithClass('content', 'li');
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
    exports.getSiblingsWithClass = def(me, 'getSiblingsWithClass',  function(
                elm, name) {
        return !elm ? [] : getChildrenWithClass(elm.parentNode, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithClassUntil
     *
     * <p>Gets the siblings of the element, having a "class" attribute
     * defined, until (but not included to) a specific node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithClassUntil('content', 'stopper', 'li');
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
    exports.getSiblingsWithClassUntil = def(me, 'getSiblingsWithClassUntil',
                function(elm, until, name) {
        return !elm ? [] : getChildrenWithClassUntil(elm.parentNode, until,
            name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithId
     *
     * <p>Gets the siblings of the element, having an "id" attribute
     * defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithId('content', 'li');
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
    exports.getSiblingsWithId = def(me, 'getSiblingsWithId',  function(elm,
                name) {
        return !elm ? [] : getChildrenWithId(elm.parentNode, name);
    });

    /**
     * @function {static} o2.Dom.getSiblingsWithIdUntil
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getSiblingsWithIdUntil('content', 'stopper', 'li');
     * </pre>
     *
     * <p>Gets the siblings of the element, having an "id" attribute
     * defined, until (but not included to) a specific node.</p>
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
    exports.getSiblingsWithIdUntil = def(me, 'getSiblingsWithIdUntil',
                function(elm, until, name) {
        return !elm ? [] : getChildrenWithIdUntil(elm.parentNode, until, name);
    });
}(this.o2, this.o2.protecteds));

