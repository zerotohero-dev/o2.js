/**
 * @module   domhelper.modify
 * @requires core
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-28 13:28:25.384956
 * -->
 *
 * <p>A utility package for additional <strong>DOM</strong> modifications.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     *
     */
    var me = create('DomHelper');

    /*
     * Aliases
     */

    var $ = require('$');

    var kDomHelper   = 'DomHelper';
    var append       = require(kDomHelper, 'append');
    var insertAfter  = require(kDomHelper, 'insertAfter');
    var insertBefore = require(kDomHelper, 'insertBefore');
    var isElement    = require(kDomHelper, 'isElement');
    var remove       = require(kDomHelper, 'remove');

    /**
     * @function {static} o2.DomHelper.replace
     *
     * <p>Replaces one node with another.</p>
     *
     * @param elmTarget - the target node or its <code>String</code> id.
     * @param elmToReplace - the replacement node or its <code>String</code> id.
     */
    def(me, 'replace', function(elmTarget, elmToReplace) {
        var target = $(elmTarget);
        var replace = $(elmToReplace);

        append(target, replace);
        remove(target);
    });

    /**
     * @function {static} o2.DomHelper.unwrap
     *
     * <p>This is like {@link o2.DomHelper.wrap} in reverse.</p>
     * <p>Moves all the elements inside the container to the container's
     * position and removes the container from the <strong>DOM</strong>.</p>
     *
     * @param {Object} elmTarget - the target node or its <code>String</code> id
     * to unwrap.
     */
    def(me, 'unwrap', function(elmTarget) {
        var target = $(elmTarget);

        if (!target) {
            return;
        }

        var child = null;

        while (target.hasChildNodes()) {
            child = remove(target.firstChild);

            if (isElement(child)) {
                insertAfter(child, target);
            }
        }

        remove(target);
    });

    /**
     * @function {public static} o2.DomHelper.wrap
     *
     * <p>Puts the target element into the wrapper element.</p>
     *
     * @param {Object} elmTarget - the node to wrap or its <code>String</code>
     * id.
     * @param {Object} elmWrapper - the wrapper node ot its <code>String</code>
     * id.
     *
     * @return the wrapped node.
     */
    def(me, 'wrap', function(elmTarget, elmWrapper) {
        var target = $(elmTarget);
        var wrapper = $(elmWrapper);

        if (!target) {
            return;
        }

        if (!wrapper) {
            return;
        }

        insertBefore(wrapper, target);
        append(target, wrapper);

        return elmTarget;
    });
}(this.o2));
