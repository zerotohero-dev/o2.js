/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: add header and documentation
(function(framework, fp, document) {
    'use strict';

    /**
     * @module   dom.traverse.children
     *
     * @requires core
     * @requires dom.traverse.core
     * @requires dom.traverse.validate
     * @requires string.core
     *
     * //TODO: add documentation
     */
    fp.ensure(
        'dom.traverse.children',
    [
        'core',
        'dom.traverse.core',
        'dom.traverse.validate',
        'string.core'
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
         * Dom (traverse.children)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        frameworkName = require('name'),
        $             = require('$'),

        /*
         * string.core
         */
        kString       = 'String',
        format        = require(kString, 'format'),
        generateGuid  = require(kString, 'generateGuid'),

        /*
         * dom.traverse.validate
         */
        hasAttribute      = require(kModuleName, 'hasAttribute'),
        hasClassAttribute = require(kModuleName, 'hasClassAttribute'),
        hasClassName      = require(kModuleName, 'hasClassName'),
        hasIdAttribute    = require(kModuleName, 'hasIdAttribute'),
        isAttributeEquals = require(kModuleName, 'isAttributeEquals'),
        isNodeEquals      = require(kModuleName, 'isNodeEquals'),

        /*
         * (o2.dom.traverse.core) Protecteds
         */
        protecteds = require(kModuleName, 'protecteds'),
        execFilter = attr(protecteds, 'execFilter'),

        /*
         * # Constants
         */

        kEmpty = '',

        /*
         * # Selectors
         */

        kImmediateClassSelector       = '#{0} > .{1}',
        kImmediateClassAndTagSelector = '#{0} > {1}.{2}',

        /*
         * # Feature Detection
         */

        /*
         * Checks document.querySelector support.
         * Using document.documentMode for IE, since the compatMode property is
         * deprecated in IE8+ in favor of the documentMode property, and IE7-
         * does not suppory document.querySelector anyway.
         * ref: http://msdn.microsoft.com/en-us/library/cc196988(v=vs.85).aspx
         */
        isNativeQuerySupported =
            (document.documentMode && document.documentMode >= 8) ||
            (!!document.querySelector);

    /*
     * Gets child nodes of the elm.
     */
    function getChildNodes(elm, name) {
        var items  = elm ? elm.childNodes : [],
            item   = null,
            i      = 0,
            len    = 0,
            result = [];

        if (!elm) {return result;}

        if (name) {
            for(i = 0, len = items.length; i < len; i++) {
                item = items[i];

                if (item.nodeName.toLowerCase() === name.toLowerCase()) {
                    result.push(item);
                }
            }
        } else {
            result = items;
        }

        return result;
    }

    /**
     * function {static} o2.Dom.getChildren
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildren('container', 'li');
     * </pre>
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of that node.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildren = def(me, 'getChildren', function(elm, name) {
        return execFilter(elm, getChildNodes, [name]);
    });

    /**
     * function {static} o2.Dom.getChildrenByAttribute
     *
     * <p>Gets the immediate children (that are not text nodes) of the
     * element, if they have a matching <strong>attribute</strong> with
     * a given <strong>value</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenByAttribute('container',
     *      'data-user-id', '42');
     * </pre>
     *
     * @param {Object} elm - the <strong>DOM</strong> njode, or the
     * <strong>id</strong> of that node.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getChildrenByAttribute = def(me, 'getChildrenByAttribute', function(
                elm, attribute, value, name) {
        // TODO: this comment will be irrelevant after fixing
        // https://github.com/v0lkan/o2.js/issues/58
        //
        // IE7 and IE8 support attribute selectors only if a
        // !DOCTYPE is specified. To maintain compatibility we implement
        // attribute selector without using document.querySelector

        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attribute, value]);
    });

    /**
     * @function {static} o2.Dom.getChildrenByAttributeUntil
     *
     * <p>Gets the children of the element until a given node (exclusive).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenByAttributeUntil('container',
     *      'data-user-id', '42', o2.$('stopper'), 'li');
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
    exports.getChildrenByAttributeUntil = def(me, 'getChildrenByAttributeUntil',
            function(elm, attribute, value, until, name) {
        return execFilter(elm, getChildNodes, [name],
            isAttributeEquals, [attribute, value], isNodeEquals, [until]);
    });

    if (isNativeQuerySupported) {

        /**
         * @function {static} o2.Dom.getChildrenByClass
         *
         * <p>Gets the children of the element having a specific class.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var items = o2.Dom.getChildrenByClass('container', 'active', 'li');
         * </pre>
         *
         * @param {Object} elm - the element reference, or a <code>String</code>
         * id of it.
         * @param {String} className - the <strong>CSS</strong> class name.
         * @param {String} name - (Optional; defaults to
         * <code>undefined</code>),
         * if true, only the results with that <strong>node name</strong> (i.e.
         * <strong>HTML</strong> <strong>Tag Name</strong>) are selected.
         *
         * @return an <code>Array</code> of nodes, if found; and empty
         * <code>Array</code> if nothing is found.
         */
        exports.getChildrenByClass = def(me, 'getChildrenByClass', function(
                    elm, className, name) {
            var el = $(elm);

            // NOTE: IE7+ supports child selector ( > ),
            // IE8+ supports querySelectorAll
            // So it's safe to use the child selector with querySelectorAll:
            // It'll work as expected in IE8+ (when document mode is 8)
            // and it'll degrade gracefully in IE7-

            if (!el.id) {
                el.id = [frameworkName, generateGuid()].join(kEmpty);
            }

            if (name) {
                return el.querySelectorAll(
                    format(kImmediateClassAndTagSelector, el.id, name,
                        className)
                );
            }

            return el.querySelectorAll(
                format(kImmediateClassSelector, el.id, className)
            );
        });
    } else {
        exports.getChildrenByClass = def(me, 'getChildrenByClass', function(elm,
                    className, name) {
            return execFilter(elm, getChildNodes, [name],
                hasClassName, [className]);
        });
    }

    /**
     * @function {static} o2.Dom.getChildrenByClassUntil
     *
     * <p>Gets the children of the element having a specific class, and until
     * (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenByClassUntil('container', 'active',
     *      o2.$('stopper'), 'li');
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
    exports.getChildrenByClassUntil = def(me, 'getChildrenByClassUntil',
                function(elm, className, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasClassName, [className], isNodeEquals, [until]);
    });

    /**
     * @function {static} o2.Dom.getChildrenUntil
     *
     * <p>Gets the children of the element until
     * (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenUntil('container', o2.$('stopper'), 'li');
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
    exports.getChildrenUntil = def(me, 'getChildrenUntil', function(elm, until,
                name) {
        return execFilter(elm, getChildNodes, [name],
            null, [], isNodeEquals, [until]);
    });

    /**
     * @function {static} o2.Dom.getChildrenWithAttribute
     *
     * <p>Gets the children of the element having a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithAttribute('container', 'data-user-id',
     * 'li');
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
    exports.getChildrenWithAttribute = def(me, 'getChildrenWithAttribute',
                function(elm, attribute, name) {
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute]);
    });

    /**
     * @function {static} o2.Dom.getChildrenWithAttributeUntil
     *
     * <p>Gets the children of the element with a given attribute defined,
     * and until (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithAttributeUntil('content',
     *      'data-user-id', o2.$('stopper'), 'li');
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
    exports.getChildrenWithAttributeUntil = def(me,
                'getChildrenWithAttributeUntil', function(elm, attribute, until,
                name) {
        return execFilter(elm, getChildNodes, [name],
            hasAttribute, [attribute], isNodeEquals, [until]);
    });

    /**
     * @function {static} o2.Dom.getChildrenWithClass
     *
     * <p>Gets the children of the element with a "class" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithClass('content', 'selected', 'li');
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
    exports.getChildrenWithClass = def(me, 'getChildrenWithClass', function(elm,
                name) {
        return execFilter(elm, getChildNodes, [name], hasClassAttribute, []);
    });

    /**
     * @function {static} o2.Dom.getChildrenWithClassUntil
     *
     * <p>Gets the children of the element with a "class" attribute defined,
     * and until (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithClassUntil('content', 'stopper', 'li');
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
    exports.getChildrenWithClassUntil = def(me, 'getChildrenWithClassUntil',
                function(elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasClassAttribute, [], isNodeEquals, [until]);
    });

    /**
     * @function {static} o2.Dom.getChildrenWithId
     *
     * <p>Gets the children of the element with an "id" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithId('content', 'li');
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
    exports.getChildrenWithId = def(me, 'getChildrenWithId', function(elm,
                name) {
        return execFilter(elm, getChildNodes, [name], hasIdAttribute, []);
    });

    /**
     * @function {static} o2.Dom.getChildrenWithIdUntil
     *
     * <p>Gets the children of the element with an "id" attribute defined,
     * and until (but not included to) a given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getChildrenWithIdUntil('content', 'stopper', 'li');
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
    exports.getChildrenWithIdUntil = def(me, 'getChildrenWithIdUntil', function(
                elm, until, name) {
        return execFilter(elm, getChildNodes, [name],
            hasIdAttribute, [], isNodeEquals, [until]);
    });

}(this.o2, this.o2.protecteds, this.document));

