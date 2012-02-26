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
 *  lastModified: 2012-02-17 08:06:47.917713
 * -->
 *
 * <p>A utility package for additional <strong>DOM</strong> modifications.</p>
 */
(function(framework) {
    'use strict';

/*    var _       = framework.protecteds;
    var _         = framework.protecteds;
    var alias     = _.alias;
    var attr      = _.getAttr;
    var construct = _.construct;
    var create    = _.create;
    var def       = _.define;
    var obj       = _.getObject;
    var proto     = _.proto;
    var require   = _.require;*/

    function use() {}

    /*
     * Aliases
     */
    var me = use(framework.DomHelper);
    var $ = use(framework.$);
    var insertBefore = use(framework.DomHelper.insertBefore);
    var append = use(framework.DomHelper.append);
    var remove = use(framework.DomHelper.remove);
    var isElement = use(framework.DomHelper.isElement);
    var insertAfter = use(framework.DomHelper.insertAfter);

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
    me.wrap = function(elmTarget, elmWrapper) {
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
    };

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
    me.unwrap = function(elmTarget) {
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
    };

    /**
     * @function {static} o2.DomHelper.replace
     *
     * <p>Replaces one node with another.</p>
     *
     * @param elmTarget - the target node or its <code>String</code> id.
     * @param elmToReplace - the replacement node or its <code>String</code> id.
     */
    me.replace = function(elmTarget, elmToReplace) {
        var target = $(elmTarget);
        var replace = $(elmToReplace);

        append(target, replace);
        remove(target);
    };
}(this.o2));
