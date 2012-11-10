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
        'dom.traverse.core',
    [
        'core',
        'dom.constants',
        'dom.core'
    ]);

    var attr    = fp.getAttr,
        alias   = attr(fp, 'alias'),
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        obj     = attr(fp, 'getObject'),
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
         * Dom (traverse.validate)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = require('$'),

        /*
         * dom.core
         */
        getAttribute = require(kModuleName, 'getAttribute'),

        /*
         * dom.constants
         */
        nodeType  = require(kModuleName, 'nodeType'),
        kTextNode = attr(nodeType, 'TEXT'),

        /*
         * # Common Constants
         */

        kAll   = '*',
        kEmpty = '',

        /*
         * # To be Overridden
         */

        execFilter        = null,
        getElements       = null,
        hasAttribute      = null,
        hasClassAttribute = null,
        hasClassName      = null,
        hasIdAttribute    = null,
        isAttributeEquals = null,
        protecteds        = null;

    /*
     * Filters a set of nodes into a smaller subset.
     */
    function filter(nodes, filterDelegate, filterArgs,
                breakDelegate, breakArgs, itemsCountCap, returnSingleItemAt,
                isReverse) {
        var result  = [],
            i       = 0,
            node    = null,
            fArgs   = filterArgs,
            counter = 0,
            len     = 0,
            cache   = [];

        if (!nodes) {return cache;}

        if (!!isReverse) {
            for (i = nodes.length - 1; i >= 0; i--) {
                cache.push(nodes[i]);
            }
        } else {
            cache = nodes;
        }

        for (i = 0, len = cache.length; i < len; i++) {
            node = cache[i];

            if(breakDelegate) {
                breakArgs.unshift(node);

                if(breakDelegate.apply(node, breakArgs)) {break;}
            }

            if (node.nodeType !== kTextNode) {
                if (filterDelegate) {
                    fArgs.unshift(node);

                    if(filterDelegate.apply(node, fArgs)) {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return node;
                        }

                        result.push(node);

                        if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                            break;
                        }
                    }
                } else {
                    counter++;

                    if (!isNaN(returnSingleItemAt) &&
                                returnSingleItemAt === counter) {
                        return node;
                    }

                    result.push(node);

                    if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                        break;
                    }
                }
            }
        }

        if (!isNaN(returnSingleItemAt)) {return null;}

        return result;
    }

    exports.protecteds = def(me, 'protecteds', {

        /*
         * Executes the filter.
         */
        execFilter : function(elm, getter, getterParams,
                    checker, checkerParams, stopper, stopperParams,
                    itemsCountCap, returnSingleItemAt, isReverse) {
            var target = $(elm);

            if (!target) {return [];}

            getterParams.unshift(target);

            return filter(
                getter.apply(target, getterParams),
                checker, checkerParams, stopper, stopperParams,
                itemsCountCap, returnSingleItemAt, isReverse
            );
        }
    });

    protecteds = require(me, 'protecteds');
    execFilter = attr(protecteds, 'execFilter');

    /**
     * @function {static} o2.Dom.getElements
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElements('content', 'li');
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
    exports.getElements = def(me, 'getElements', function(elm, name) {
        var target = $(elm);

        if (!target) {return [];}

        return target.getElementsByTagName(name || kAll);
    });

    /*
     *
     */
    getElements = require(kModuleName, 'getElements');

    /**
     * @function {static} o2.Dom.getElementsByAttribute
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, filtering
     * the nodes having a given attribute equals to a given value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsByAttribute('content', 'data-id', '42');
     * </pre>
     *
     * @param {Object} elm - the element reference, or a <code>String</code>
     * id of it.
     * @param {String} attribute - the name of the attribute to filter.
     * @param {String} value - the value of the attribute.
     * @param {String} name - (Optional; defaults to <code>undefined</code>),
     * if true, only the results with that <strong>node name</strong> (i.e.
     * HTML <strong>Tag Name</strong>) are selected.
     *
     * @return an <code>Array</code> of nodes, if found; and empty
     * <code>Array</code> if nothing is found.
     */
    exports.getElementsByAttribute = def(me, 'getElementsByAttribute',
                function(elm, attribute, value, name) {
        return execFilter(elm, getElements, [name],
            isAttributeEquals, [attribute, value]);
    });

    /**
     * @function {static} o2.Dom.getElementsByClass
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * a given <strong>CSS</strong> <strong>class</strong> name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsByClass('content', 'selected', 'li');
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
    exports.getElementsByClass = def(me, 'getElementsByClass', function(elm,
                className, name) {
        return execFilter(elm, getElements, [name], hasClassName, [className]);
    });

    /**
     * @function {static} o2.Dom.getElementsWithAttribute
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * a given attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsWithAttribute('content', 'data-id', 'li');
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
    exports.getElementsWithAttribute = def(me, 'getElementsWithAttribute',
                function(elm, attribute, name) {
        return execFilter(elm, getElements, [name],
            hasAttribute, [attribute], null, []);
    });

    /**
     * @function {static} o2.Dom.getElementsWithClass
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * a '<strong>class</strong>" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsWithClass('content', 'li');
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
    exports.getElementsWithClass = def(me, 'getElementsWithClass', function(
                elm, name) {
        return execFilter(elm, getElements, [name],
            hasClassAttribute, [], null, []);
    });

    /**
     * @function {static} o2.Dom.getElementsWithId
     *
     * <p>Gets all of the elements of the node <strong>elm</strong>, having
     * an '<strong>id</strong>" attribute defined.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var items = o2.Dom.getElementsWithId('content', 'li');
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
    exports.getElementsWithId = def(me, 'getElementsWithId', function(elm,
                name) {
        return execFilter(elm, getElements, [name], hasIdAttribute, []);
    });
}(this.o2, this.o2.protecteds, this.document));

