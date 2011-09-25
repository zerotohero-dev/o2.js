/*global o2 */

/**
 * @module sortdelegate
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * Custom delegates for <code>Array.sort</code> method.
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;

    /**
     * @class {static} SortDelegate
     *
     * <p>Custom delegates for <code>Array.sort</code> method.</p>
     */
    me.SortDelegate = {

        /**
         * @function SortDelegate.sort
         *
         * <p>A generic sort function.</p>
         * <p>If the collecion consists of <code>String</code>s and
         * <code>Number</code>s,
         * <code>String</code>s will be stored alphabeticaly at the bottom, and
         * <code>Number</code>s will be sorted numerically before them.</p>
         */
        sort : function(a, b, isDesc) {

            var isDescending = !!isDesc;

            if(isNaN(a) && isNaN(b)) {
                if(a < b) {

                    return isDescending ? 1 : -1;
                } else if(a > b) {

                    return isDescending ? -1 : 1;
                }

                return 0;
            }

            if(isDescending) {

                return (isNaN(b) ? -1 / 0 : b) - (isNaN(a) ? -1 / 0 : a);
            }

            return (isNaN(a) ? 1 / 0 : a) - (isNaN(b) ? 1 / 0 : b);

        },

        /**
         * @function SortDelegate.sortDesc
         *
         * <p>Works similar to {link SortDelegate.sort}. The only difference
         * is that
         * the items are sorted in a <strong>descending</strong> order.</p>
         */
        sortDesc : function(a, b) {

            return me.SortDelegate.sort(a, b, true);

        }

    };

}(o2, this));
