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

if(!o2.DomHelper) {
    o2.DomHelper = {};
}

/**
 * @module o2.domhelper.dimension
 * @requires o2
 *
 * <p>Includes dimension (<strong>i.e. width-height related</strong>) helper
 * methods.</p>
 */
( function(me, window, UNDEFINED) {

    /**
     * @function {static} o2.DomHelper.getDocumentDimension
     *
     * <p>Gets the dimension of the document in the form <code>{width: w, height:
     * h}</code>. If the visible (i.e. <code>clientHeight</code>) is greater than
     * the
     * document's height returns the height of the visible area as the height
     * portion.
     *
     * @return the dimension of the document in the form <code>{width: w, height:
     * h}</code>.
     */
    me.getDocumentDimension = function() {

        if(document.documentElement) {
            me.getDocumentDimension = function() {

                var d = document;

                // d.body can be null when refreshing.
                if(!d || !d.body) {
                    return {
                        width : 0,
                        height : 0
                    };
                }

                var height = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight, d.body.offsetHeight, d.documentElement.offsetHeight, d.body.clientHeight, d.documentElement.clientHeight);
                var width = Math.max(d.body.scrollWidth, d.documentElement.scrollWidth, d.body.offsetWidth, d.documentElement.offsetWidth, d.body.clientWidth, d.documentElement.clientWidth);

                return {
                    width : width,
                    height : height
                };

            };

            return me.getDocumentDimension();
        }

        me.getDocumentDimension = function() {

            var d = document;

            if(!d || !d.body) {
                return {
                    width : 0,
                    height : 0
                };
            }

            var height = Math.max(d.body.scrollHeight, d.body.offsetHeight, d.body.clientHeight);
            var width = Math.max(d.body.scrollWidth, d.body.offsetWidth, d.body.clientWidth);

            return {
                width : width,
                height : height
            };

        };

        return me.getDocumentDimension();

    };

    /**
     * @function {static} o2.DomHelper.getWindowInnerDimension
     *
     * <p>Gets the dimension of the visible area of the browser in the form
     * <code>{width: w, height: h}</code>.
     *
     * @return the dimension of the visible area of the browser in the form
     * <code>{width: w, height: h}</code>.
     */
    me.getWindowInnerDimension = function() {
        if(window.innerWidth !== UNDEFINED) {
            me.getWindowInnerDimension = function() {

                if(!window) {
                    return {
                        width : 0,
                        height : 0
                    };
                }

                return {
                    width : window.innerWidth,
                    height : window.innerHeight
                };

            };

            return me.getWindowInnerDimension();
        }

        if(document.documentElement && document.documentElement.clientWidth) {
            me.getWindowInnerDimensions = function() {

                var d = document.documentElement;

                if(!d) {
                    return {
                        width : 0,
                        height : 0
                    };
                }

                return {
                    width : d.clientWidth,
                    height : d.clientHeight
                };

            };

            return me.getWindowInnerDimension();
        }

        me.getWindowInnerDimension = function() {

            var d = document.body;

            if(!d) {
                return {
                    width : 0,
                    height : 0
                };
            }

            return {
                width : d.clientWidth,
                height : d.clientHeight
            };

        };

        return me.getWindowInnerDimension();
    };

}(o2.DomHelper, this));
