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
        'dom.traverse.parent',
    [
        'core'
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
         * Dom (traverse.parent)
         */
        me = create(kModuleName);

    /**
     * @function {static} o2.Dom.getParent
     *
     * <p>Gets the parent node of an element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParent('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    //TODO: getParent, getParents, getPrev, getPrevAll, getNext, getNextAll,
    //getParentOrSelf, should also be able to get a filter delegate
    //instead of a String `name` argument.
    exports.getParent = def(me, 'getParent', function(elm, name) {
        return getParents(elm, null, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentByAttribute
     *
     * <p>Gets the parent node of an element, having an attribute with a
     * given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentByAttribute('content', 'data-id', '42', 'li');
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
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentByAttribute = def(me, 'getParentByAttribute', function(elm,
                attribute, value, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentByClass
     *
     * <p>Gets the parent node of an element, having a given
     * <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentByClass('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} className - the <strong>CSS</strong> class name.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentByClass = def(me, 'getParentByClass', function(elm,
                className, name) {
        return getParents(elm, hasClassName, [className],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentWithAttribute
     *
     * <p>Gets the parent node of an element, having a given
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentWithAttribute('content', 'selected', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentWithAttribute = def(me, 'getParentWithAttribute',
                function(elm, attribute, name) {
        return getParents(elm, hasAttribute, [attribute],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentWithClass
     *
     * <p>Gets the parent node of an element, having a "class"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentWithClass('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentWithClass = def(me, 'getParentWithClass', function(elm,
                name) {
        return getParents(elm, hasClassAttribute, [],
            null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParentWithId
     *
     * <p>Gets the parent node of an element, having an "id"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var item = o2.Dom.getParentWithId('content', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return the first parent available with the given criteria,
     * if found; <code>null</code> otherwise.
     */
    exports.getParentWithId = def(me, 'getParentWithId', function(elm, name) {
        return getParents(elm, hasIdAttribute, [], null, [], name, null, 0);
    });

    /**
     * @function {static} o2.Dom.getParents
     *
     * <p>Gets all the parent nodes of an element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParents('content', 'li');
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
    exports.getParents = def(me, 'getParents', function(elm, name) {
        return getParents(elm, null, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByAttribute
     *
     * <p>Gets all the parent nodes of an element, having a given attribute
     * with a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByAttribute('content', 'data-id', '42');
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
    exports.getParentsByAttribute = def(me, 'getParentsByAttribute', function(
                elm, attribute, value, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByAttributeUntil
     *
     * <p>Gets all the parent nodes of an element, having a given attribute
     * with a given value, until (but not included to) a given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByAttributeUntil('content', 'data-id', '42',
     *      'stopper', 'li');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {Object} until - the <strong>DOM</strong> node that the traversal
     * will be made until, or its <code>String</code> id,
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getParentsByAttributeUntil = def(me, 'getParentsByAttributeUntil',
                function(elm, attribute, value, until, name) {
        return getParents(elm, isAttributeEquals, [attribute, value],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByClass
     *
     * <p>Gets all the parent nodes of an element, having a given
     * <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByClass('content', 'selected', 'li');
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
    exports.getParentsByClass = def(me, 'getParentsByClass', function(elm,
                className, name) {
        return getParents(elm, hasClassName, [className], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsByClassUntil
     *
     * <p>Gets all the parent nodes of an element, having a given
     * <strong>CSS</strong> class name, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsByClassUntil('content', 'selected',
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
    exports.getParentsByClassUntil = def(me, 'getParentsByClassUntil',
                function(elm, className, until, name) {
        return getParents(elm, hasClassName, [className],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsUntil
     *
     * <p>Gets all the parent nodes of an element, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsUntil('content', 'stopper', 'li');
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
    exports.getParentsUntil = def(me, 'getParentsUntil', function(elm, until,
                name) {
        return getParents(elm, null, [], isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithAttribute
     *
     * <p>Gets all the parent nodes of an element, having a given
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithAttribute('content', 'data-id', 'li');
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
    exports.getParentsWithAttribute = def(me, 'getParentsWithAttribute',
                function(elm, attribute, name) {
        return getParents(elm, hasAttribute, [attribute], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithAttributeUntil
     *
     * <p>Gets all the parent nodes of an element, having a given
     * attribute defined, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithAttributeUntil('content', 'data-id',
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
    exports.getParentsWithAttributeUntil = def(me,
                'getParentsWithAttributeUntil', function(elm, attribute, until,
                name) {
        return getParents(elm, hasAttribute, [attribute],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithClass
     *
     * <p>Gets all the parent nodes of an element, having a "class"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithClass('content', 'li');
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
    exports.getParentsWithClass = def(me, 'getParentsWithClass', function(elm,
                name) {
        return getParents(elm, hasClassAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithClassUntil
     *
     * <p>Gets all the parent nodes of an element, having a "class"
     * attribute defined, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithClass('content', 'stopper', 'li');
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
    exports.getParentsWithClassUntil = def(me, 'getParentsWithClassUntil',
                function(elm, until, name) {
        return getParents(elm, hasClassAttribute, [],
            isNodeEquals, [until], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithId
     *
     * <p>Gets all the parent nodes of an element, having an "id"
     * attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithId('content', 'li');
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
    exports.getParentsWithId = def(me, 'getParentsWithId', function(elm, name) {
        return getParents(elm, hasIdAttribute, [], null, [], name);
    });

    /**
     * @function {static} o2.Dom.getParentsWithIdUntil
     *
     * <p>Gets all the parent nodes of an element, having an "id"
     * attribute defined, until (but not included to) a
     * given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getParentsWithIdUntil('content', 'stopper', 'li');
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
    exports.getParentsWithIdUntil = def(me, 'getParentsWithIdUntil', function(
                elm, until, name) {
        return getParents(elm, hasIdAttribute, [],
            isNodeEquals, [until], name);
    });
}(this.o2, this.o2.protecteds, this.document));
