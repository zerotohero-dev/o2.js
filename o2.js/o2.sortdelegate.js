/*global window, o2*/

/*
* Copyright © by Volkan Özçelik - http://o2js.com/
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

/**
 * @module o2.sortdelegate
 * @requires o2
 *
 * Custom delegates for <code>Array.sort</code> method.
 */
( function(o2, window, UNDEFINED) {

    /**
     * @class {static} o2.SortDelegate
     *
     * <p>Custom delegates for <code>Array.sort</code> method.</p>
     */
    o2.SortDelegate = {

        /**
         * @function o2.SortDelegate.sort
         *
         * <p>A generic sort function.</p>
         * <p>If the collecion consists of <code>String</code>s and
         * <code>Number</code>s,
         * <code>String</code>s will be stored alphabeticaly at the bottom, and
         * <code>Number</code>s will be sorted numerically before them.</p>
         */
        sort : function(a, b, isDescending) {
            isDescending = !!isDescending;

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
         * @function o2.SortDelegate.sortDesc
         *
         * <p>Works similar to {link o2.SortDelegate.sort}. The only difference
         * is that
         * the items are sorted in a <strong>descending</strong> order.</p>
         */
        sortDesc : function(a, b) {

            return o2.SortDelegate.sort(a, b, true);

        }

    };

}(o2, this));
