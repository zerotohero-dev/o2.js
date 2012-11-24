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
        'dom.traverse.parent',
    [
        'core',
        'dom.traverse.parents',
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
         * Dom (traverse.parent)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * dom.traverse.parents
         */
        getParents = require(kModuleName, 'getParents'),

        /*
         * dom.traverse.validate
         */
        isAttributeEquals = require(kModuleName, 'isAttributeEquals'),
        hasClassName      = require(kModuleName, 'hasClassName'),
        hasClassAttribute = require(kModuleName, 'hasClassAttribute'),
        hasIdAttribute    = require(kModuleName, 'hasIdAttribute'),
        hasAttribute      = require(kModuleName, 'hasAttribute');

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
    // TODO: def should also ensure that the method is in the correct module
    // like  the meta should be ({me[0], moduleName }) and create (and construct
    // maybe) should take
    // modulename as a parameter too like
    // var me = create(kModuleName, 'dom.traverse.parent');
    exports.getParentWithId = def(me, 'getParentWithId', function(elm, name) {
        return getParents(elm, hasIdAttribute, [], null, [], name, null, 0);
    });
}(this.o2, this.o2.protecteds));

