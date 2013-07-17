require([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},


        /*
         * # To be Overridden
         */

        sort;

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
            return (isNaN(b) ? -Infinity : b) - (isNaN(a) ? -Infinity : a);
        }

        return (isNaN(a) ? Infinity : a) - (isNaN(b) ? Infinity : b);
    }

    exports.sort = function(a, b) {
        if (isNaN(a) && isNaN(b)) {
            return getSortOrder(a, b);
        }

        return getNanSortOrder(a, b);
    };


    exports.sortAsc = exports.sort;

    sort = exports.sort;

    exports.sortDesc = function(a, b) {
        return sort(b, a);
    };

    return exports;
});
