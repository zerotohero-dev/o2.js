/**
 * @module   dom.modify
 * @requires core
 * @requires dom.core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package for additional <strong>DOM</strong> modifications.</p>
 */
(function(framework, fp) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('dom.modify', ['core', 'string.core', 'dom.core']);

    var attr      = fp.getAttr,
        create    = attr(fp, 'create'),
        def       = attr(fp, 'define'),
        require   = attr(fp, 'require'),

        /*
         *
         */
        exports = {},

        /*
         * Module Name
         */
        kModuleName = 'Dom',

        /*
         * Dom (modify)
         */
        me = create(kModuleName),

        /*
         * Aliases
         */

        $ = require('$'),

        append       = require(kModuleName, 'append'),
        insertAfter  = require(kModuleName, 'insertAfter'),
        insertBefore = require(kModuleName, 'insertBefore'),
        isElement    = require(kModuleName, 'isElement'),
        remove       = require(kModuleName, 'remove');

    /**
     * @function {static} o2.Dom.replace
     *
     * <p>Replaces one node with another.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.replace('firstContainer', 'secondContainer');
     * </pre>
     *
     * @param elmTarget - the target node or its <code>String</code> id.
     * @param elmToReplace - the replacement node or its <code>String</code> id.
     */
    exports.replace = def(me, 'replace', function(elmTarget, elmToReplace) {
        var target  = $(elmTarget),
            replace = $(elmToReplace);

        append(target, replace);
        remove(target);
    });

    /**
     * @function {static} o2.Dom.unwrap
     *
     * <p>This is like {@link o2.Dom.wrap} in reverse.</p>
     * <p>Moves all the elements inside the container to the container's
     * position and removes the container from the <strong>DOM</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.unwrap('container');
     * </pre>
     *
     * @param {Object} elmTarget - the target node or its <code>String</code> id
     * to unwrap.
     */
    exports.unwrap = def(me, 'unwrap', function(elmTarget) {
        var target = $(elmTarget),
            child  = null;

        if (!target) {return;}

        while (target.hasChildNodes()) {
            child = remove(target.firstChild);

            if (isElement(child)) {
                insertAfter(child, target);
            }
        }

        remove(target);
    });

    /**
     * @function {public static} o2.Dom.wrap
     *
     * <p>Puts the target element into the wrapper element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var wrapper = o2.$('wrapper');
     * var target = o2.$('content');
     * o2.Dom.wrap(target, wrapper);
     * </pre>
     *
     * @param {Object} elmTarget - the node to wrap or its <code>String</code>
     * id.
     * @param {Object} elmWrapper - the wrapper node ot its <code>String</code>
     * id.
     *
     * @return the wrapped node.
     */
    exports.wrap = def(me, 'wrap', function(elmTarget, elmWrapper) {
        var target  = $(elmTarget),
            wrapper = $(elmWrapper);

        if (!target || !wrapper) {return;}

        insertBefore(wrapper, target);
        append(target, wrapper);

        return elmTarget;
    });
}(this.o2, this.o2.protecteds));
