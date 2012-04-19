/**
 * @module   method.transpose.
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-19 16:44:38.221515
 * -->
 *
 * <p>flip/fold/merge kind of method helper that ammend/transpose
 * <code>Function</code>s.</p>
 */
(function(framework, undefined) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'Method';

    /*
     * Method (transpose)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var ap     = Array.prototype;
    var slice  = attr(ap, 'slice');

    /**
     * @function {static} o2.Method.compose
     *
     * <p>Create a method that calls the <strong>invoker</strong> with the
     * return value of the evaluated function <strong>fn</strong>. The current
     * arguments are passed to <strong>fn</strong>, and the evaluated result
     * is passed to the <strong>invoker</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function double(a) { return a*2; }
     * var min = Math.min;
     * var doubleMin = o2.Method.compose(double, min);
     * var res = doubleMin(3, 5);
     * // res will be 6
     * </pre>
     *
     * @param {Function} invoker - the invoker.
     * @param {Function} delegate - the invokee.
     *
     * @return the created <code>Function</code>.
     */
    //TODO: pass an optional context parameter.
    def(me, 'compose', function(invoker, delegate) {
        return function() {
            return invoker.apply(this, [delegate.apply(this, arguments)]);
        };
    });

    /**
     * @function {static} o2.Method.flip
     *
     * <p>Flips two arguments of the given <code>Function</code>, and returns a
     * new <code>Function</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function factor(a, b) { return a / b; }
     * var flipped = o2.Method.flip(factor, 0, 1);
     * var result = factor(5, 2) == flipped(2, 5);
     * // result will be true
     * </pre>
     *
     * @param {Function} fn - the delegate to flip arguments of.
     * @param {Integer} index1 - the index of the first argument.
     * @param {Integer} index2 - the index of the second argument.
     *
     * @return the created <code>Function</code>.
     */
    def(me, 'flip', function(fn, index1, index2) {
        return function() {
            var args      = slice.call(arguments);
            var temporary = args[index1];

            args[index1] = args[index2];
            args[index2] = temporary;

            return fn.apply(this, args);
        };
    });

    /**
     * @function {static} o2.Method.wrap
     *
     * <p>Returns the first <strong>delegate</strong> passed as an argument
     * to the second <strong>wrapper</strong> followed by the arguments of
     * the returned <code>Funciton</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function wrapper(fn, a, b) { return fn(a, b) + a + b; }
     * function delegate { return a * b; }
     * var wrapped = o2.Method.wrap(delegate, wrapper);
     *
     * var result = wrapped(3, 5);
     * // result will be 23
     * </pre>
     *
     * @param {Function} delegate - the first <code>Function</code> to pass
     * as parameter.
     * @param {Function} wrapper - the wrapper <code>Function</code>.
     *
     * @return the wrapped <code>Function</code>.
     */
    //TODO: pass an optional context parameter.
    def(me, 'wrap', function(delegate, wrapper) {
        return function() {
            return wrapper.apply(this,
                [delegate].concat(slice.call(arguments)));
        };
    });
}(this.o2));
