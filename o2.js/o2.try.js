/**
 * @module try
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>Used for consequentially executing a set of <code>function</code>s.</p>
 * <p>The functions are guaranteed to be called.</p>
 * <p>Even if an error occurs when calling a <code>function</code>, the next
 * function will be tried, disregarding the error.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;

    /**
     * @class {static} o2.Try
     *
     * <p>Used for consequentially executing a set of <code>function</code>s.</p>
     * <p>The <strong>function</strong>s are guaranteed to be called.</p>
     * <p>Even if an error occurs when calling a <code>function</code>, the next
     * <code>function</code> will be tried, disregarding the error.</p>
     */
    me.Try = {

        /**
         * @function {static} o2.Try.all
         *
         * <p>Executes all the given delegates one by one.</p>
         * <p>If an exception occurs while executing the argument, the next one
         * will be tried.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Try.all(fn1, fn2, fn3);
         * </pre>
         *
         * @param {Arguments} ... - each argument as a function.
         */
        all : function() {
            var i = 0;
            var len = 0;

            for (i = 0, len = arguments.length; i < len; i++) {
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
         * will be tried.</p>
         * <p>But after the first successful execution, with no error, no further
         * functions will be executed.</p>
         * <p>Usage Example:</p>
         * <pre>
         * o2.Try.these(fn1, fn2, fn3);
         * </pre>
         *
         * @param {Arguments} ... - each argument as a function.
         */
        these : function() {
            var i = 0;
            var len = 0;

            for(i = 0, len = arguments.length; i < len; i++) {
                try {
                    arguments[i]();

                    return;
                } catch(ignore) {
                }
            }
        }
    };
}(this.o2));
