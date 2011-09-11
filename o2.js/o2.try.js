/*global o2, window*/

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
 * @module o2.try
 * @requires o2
 *
 * <p>Used for consequentially executing a set of <code>function</code>s.</p>
 * <p>The functions are guaranteed to be called.</p>
 * <p>Even if an error occurs when calling a <code>function</code>, the next
 * function
 * will be tried, disregarding the error.</p>
 */
( function(o2, window, UNDEFINED) {

    /**
     * @class {static} o2.Try
     *
     * <p>Used for consequentially executing a set of <code>function</code>s.</p>
     * <p>The <strong>function</strong>s are guaranteed to be called.</p>
     * <p>Even if an error occurs when calling a <code>function</code>, the next
     * <code>function</code>
     * will be tried, disregarding the error.</p>
     */
    o2.Try = {

        /**
         * @function {static} o2.Try.all
         *
         * <p>Executes all the given delegates one by one.</p>
         * <p>If an exception occurs while executing the argument, the next one
         * will be
         * tried.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Try.all(fn1, fn2, fn3);
         * </pre>
         *
         * @param {...} ... - each argument as a function.
         */
        all : function() {

            for(var i = 0, len = arguments.length; i < len; i++) {
                try {
                    arguments[i]();
                } catch(ignore) {
                }
            }

        },

        /**
         * @function {static} o2.Try.these
         *
         * <p>Tries all the given delegates, will stop at the first successful
         * execution.</p>
         * <p>If an exception occurs while executing the argument, the next one
         * will be
         * tried.</p>
         * <p>But after the first successful execution, with no error, no further
         * functions will be executed.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Try.these(fn1, fn2, fn3);
         * </pre>
         *
         * @param {...} ... - each argument as a function.
         */
        these : function() {

            for(var i = 0, len = arguments.length; i < len; i++) {
                try {
                    arguments[i]();
                    return;
                } catch(ignore) {
                }
            }

        }

    };

}(o2, this));
