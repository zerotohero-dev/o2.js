/**
 * @module   sortdelegate.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:32:24.544691
 * -->
 *
 * Custom delegates for <code>Array.sort</code> method.
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'SortDelegate';


    /**
     * @class {static} o2.SortDelegate
     *
     * <p>Custom delegates for <code>Array.sort</code> method.</p>
     */
    var me = create(kModuleName);

    var inf = Infinity;

    /*
     *
     */
    function getSortOrder(a, b) {
        return (a === b) ? 0 : ((a < b) ? -1 : 1);
    }

    /*
     *
     */
    function getNanSortOrder(a, b, isDescending) {
        if (isDescending) {
            return (isNaN(b) ? -inf : b) - (isNaN(a) ? -inf : a);
        }

        return (isNaN(a) ? inf : a) - (isNaN(b) ? inf : b);
    }

    /**
     * @function {static} o2.SortDelegate.sort
     *
     * <p>A generic sort function.</p>
     * <p>If the collecion consists of <code>String</code>s and
     * <code>Number</code>s, <code>String</code>s will be stored
     * alphabeticaly at the bottom, and
     * <code>Number</code>s will be sorted numerically before them.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     */
    def(me, 'sort', function(a, b) {
        if (isNaN(a) && isNaN(b)) {
            return getSortOrder(a, b);
        }

        return getNanSortOrder(a, b);
    });

    /**
     * @function {static} o2.SortDelegate.sortAsc
     *
     * <p>An <strong>alias</strong> to {@link o2.SortDelegate.sort}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @see o2.SortDelegate.sort
     */
    alias(me, 'sortAsc', 'sort');

    var sort = require(kModuleName, 'sort');

    /**
     * @function {static} o2.SortDelegate.sortDesc
     *
     * <p>Works similar to {link o2.SortDelegate.sort}. The only difference
     * is that the items are sorted in a <strong>descending</strong>
     * order.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     */
    def(me, 'sortDesc', function(a, b) {
        return sort(b, a);
    });
}(this.o2, this));
