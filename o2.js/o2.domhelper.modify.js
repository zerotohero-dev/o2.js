/**
 * @module   domhelper.modify
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 09:25:15.150130
 * -->
 *
 * <p>A utility package for additional <strong>DOM</strong> modifications.</p>
 */
(function(framework) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var me = use(framework.DomHelper);
    var $ = use(framework.$);
    var insertBefore = use(framework.DomHelper.insertBefore);
    var append = use(framework.DomHelper.append);

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
}(this.o2));
