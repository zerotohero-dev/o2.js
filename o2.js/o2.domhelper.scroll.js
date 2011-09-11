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
 * @module o2.domhelper.scroll
 * @requires o2
 *
 * <p>A window/div scroll helper.</p>
 */
( function(me, window, UNDEFINED) {

    /**
     * @function {static} o2.DomHelper.scrollWindowToBottom
     *
     * <p>Scrolls window to bottom.</p>
     */
    me.scrollWindowToBottom = function() {

        if(document.documentElement) {
            me.scrollWindowToBottom = function() {

                document.body.scrollTop = document.body.scrollHeight;
                document.documentElement.scrollTop = document.documentElement.scrollHeight;

            };


            me.scrollWindowToBottom();
            return;
        }

        me.scrollWindowToBottom = function() {

            document.body.scrollTop = document.body.scrollHeight;

        };


        me.scrollWindowToBottom();
    };

    /**
     * @function {static} o2.DomHelper.scrollWindowToTop
     *
     * <p>Scrolls window to top.</p>
     */
    me.scrollWindowToTop = function() {

        if(document.documentElement) {
            me.scrollWindowToTop = function() {

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            };


            me.scrollWindowToTop();
            return;

        }

        me.scrollWindowToTop = function() {

            document.body.scrollTop = 0;

        };


        me.scrollWindowToTop();
    };

    /**
     * @function {static} o2.DomHelper.scrollObjectToTop
     *
     * <p>Scrolls an element to top.</p>
     *
     * @param {DomNode} obj - the element to scroll.
     */
    me.scrollObjectToTop = function(obj) {

        obj.scrollTop = 0;

    };

    /**
     * @function {static} o2.DomHelper.scrollObjectToBottom
     *
     * <p>Scrolls an element to bottom.</p>
     *
     * @param {DomNode} obj - the element to scroll.
     */
    me.scrollObjectToBottom = function(obj) {

        obj.scrollTop = obj.scrollHeight;

    };

    /**
     * @function {static} o2.DomHelper.scrollWindowToObject
     *
     * <p>Scrolls the window to the object's offset position..</p>
     *
     * @param {DomNode} obj - the element to scroll to.
     */
    me.scrollWindowToObject = function(obj) {

        var offset = o2.DomHelper.getOffset(obj);
        window.scrollTo(offset.left, offset.top);

    };

    /**
     * @function {static} o2.DomHelper.getWindowScrollOffset
     *
     * <p>Gets the <strong>window</strong>'s scroll offset.</p>
     *
     * @return the the <strong>window</strong>'s scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */
    me.getWindowScrollOffset = function() {

        if(document.documentElement) {
            if(document.body && document.body.scrollLeft !== UNDEFINED) {
                me.getWindowScrollOffset = function() {

                    var left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
                    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

                    return {
                        left : left,
                        top : top
                    };

                };

                return me.getWindowScrollOffset();
            }

            me.getWindowScrollOffset = function() {

                var left = document.documentElement.scrollLeft;
                var top = document.documentElement.scrollTop;

                return {
                    left : left,
                    top : top
                };

            };

            return me.getWindowScrollOffset();
        }

        // IE quirksmode
        me.getWindowScrollOffset = function() {

            var left = document.body.scrollLeft;
            var top = document.body.scrollTop;

            return {
                left : left,
                top : top
            };

        };

        return me.getWindowScrollOffset();

    };

}(o2.DomHelper, this));
