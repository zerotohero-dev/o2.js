/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   try.core
     *
     * @requires core
     *
     * <p>Used for consequentially executing a set of <code>Function</code>s.</p>
     * <p>The functions are guaranteed to be called.</p>
     * <p>Even if an error occurs when calling a <code>Function</code>, the next
     * function will be tried, disregarding the error.</p>
     */
    fp.ensure(
        'try.core',
    [
        'core'
    ]);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Try',

        /**
         * @class {static} o2.Try
         *
         * <p>Used for consequentially executing a set of
         * <code>Function</code>s.</p>
         * <p>The <strong>function</strong>s are guaranteed to be called.</p>
         * <p>Even if an error occurs when calling a <code>Function</code>, the next
         * <code>Function</code> will be tried, disregarding the error.</p>
         */
        me = create(kModuleName);

    /**
     * @function {static} o2.Try.all
     *
     * <p>Executes all the given delegates one by one.</p>
     * <p>If an exception occurs while executing the argument, the next one
     * will be tried.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Try.all(fn1, fn2, fn3);
     * </pre>
     *
     * @param {Arguments} ... - each argument as a function.
     */
    exports.all = def(me, 'all', function() {
        var i   = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            try {
                arguments[i]();
            } catch(ignore) {}
        }
    });

    /**
     * @function {static} o2.Try.these
     *
     * <p>Tries all the given delegates, will stop at the first successful
     * execution.</p>
     * <p>If an exception occurs while executing the argument, the next one
     * will be tried.</p>
     * <p>But after the first successful execution, with no error,
     * no further functions will be executed.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Try.these(fn1, fn2, fn3);
     * </pre>
     *
     * @param {Arguments} ... - each argument as a function.
     */
    exports.these = def(me, 'these', function() {
        var i   = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            try {
                arguments[i]();

                return;
            } catch(ignore) {}
        }
    });
}(this.o2, this.o2.protecteds));
