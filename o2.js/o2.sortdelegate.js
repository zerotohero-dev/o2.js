/**
 * @module sortdelegate
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-22 20:07:21.679595
 * -->
 *
 * Custom delegates for <code>Array.sort</code> method.
 */

(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;

    /*
     *
     */
    function getSortOrder(a, b, isDescending) {
        if (a === b) {
            return 0;
        }

        if (a < b) {
            return isDescending ? 1 : -1;
        }

        if (a > b) {
            return isDescending ? -1 : 1;
        }
    }

    /*
     *
     */
    function getNanSortOrder(a, b, isDescending) {
        if (isDescending) {
            return (isNaN(b) ? -Infinity : b) - (isNaN(a) ? -Infinity : a);
        }

        return (isNaN(a) ? Infinity : a) - (isNaN(b) ? Infinity : b);
    }

    /**
     * @class {static} o2.SortDelegate
     *
     * <p>Custom delegates for <code>Array.sort</code> method.</p>
     */
    me.SortDelegate = {

        /**
         * @function o2.SortDelegate.sort
         *
         * <p>A generic sort function.</p>
         * <p>If the collecion consists of <strong>String</strong>s and
         * <strong>Number</strong>s,
         * <strong>String</strong>s will be stored alphabeticaly at the bottom,
         * and
         * <strong>Number</strong>s will be sorted numerically before them.</p>
         */
        sort : function(a, b, isDesc) {
            var isDescending = !!isDesc;

            if (isNaN(a) && isNaN(b)) {
                return getSortOrder(a, b, isDescending);
            }

            return getNanSortOrder(a, b, isDescending);
        },

        /**
         * @function o2.SortDelegate.sortDesc
         *
         * <p>Works similar to {link o2.SortDelegate.sort}. The only difference
         * is that the items are sorted in a <strong>descending</strong>
         * order.</p>
         */
        sortDesc : function(a, b) {
            return me.SortDelegate.sort(a, b, true);
        }
    };
}(this.o2, this));
