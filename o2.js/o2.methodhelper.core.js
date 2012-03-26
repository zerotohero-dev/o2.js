/**
 * @module   methodhelper.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:38:58.812812
 * -->
 *
 * <p>A <code>Function</code> helper for stuff like
 * <strong>memoization</strong>, <strong>partial functions</strong> and
 * <strong>currying</strong>.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'MethodHelper';

    /**
     * @class {static} o2.MethodHelper
     *
     * <p>A method helper class.</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var ap     = Array.prototype;
    var concat = attr(ap, 'concat');
    var slice  = attr(ap, 'slice');

    var bind = Function.prototype.bind;

    if (bind) {

        /**
         * @function {static} o2.MethodHelper.bind
         *
         * <p>Creates a <code>Function</code> that uses <strong>base</strong> as
         * the "<code>this</code>" reference.</p>
         *
         * <p><strong>bind</strong> can often be used to bind a different
         * context to a <strong>curried</strong> function.
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * function test(a,b,c){ return this.number + (a*b+c); };
         * var context = {number:10};
         * var bound = o2.MethodHelper.bind(context, test);
         * bound(20,2,10);//gives 60
         * var bound2 = o2.MethodHelper.bind(context, test, 20);
         * bound2(2, 10);//gives 60
         * </pre>
         *
         * @param {Object} base - the context of the newly created
         * <code>Function</code>.
         * @param {Function} fn - the <code>Function</code> to modify.
         * @param {Arguments} varargin - variable number of input arguments to be
         * passed as initial set of arguments.
         *
         * @return the modified <code>Function</code>.
         */
        def(me, 'bind', function() {
            var args = slice.call(arguments);
            var context = args.shift();
            var fn = args.shift();

            return fn.bind(context, args);
        });
    } else {
        def(me, 'bind', function() {
            var args = slice.call(arguments);
            var context = args.shift();
            var fn = args.shift();

            return function() {
                return fn.apply(
                    context, concat.call(args, slice.call(arguments))
                );
            };
        });
    }

    /**
     * @function {static} o2.MethodHelper.curry
     *
     * <p>Curries the <code>Function</code>.</p>
     * <p>See http://www.dustindiaz.com/javascript-curry/ for a
     * discussion.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function test(a,b,c) { return a+b+c; }
     * var curried = o2.MethodHelper.curry(this, test, 1, 2);
     * var result = curried(3);//returns 6;
     * </pre>
     *
     * @return the modified <code>Function</code>.
     */
    def(me, 'curry', function() {
        var args = slice.call(arguments);
        var context = args.shift();
        var fn = args.shift();

        return function() {
            return fn.apply(context,
                args.concat(
                    slice.call(arguments)
                )
            );
        };
    });

    /**
     * @function {static} o2.MethodHelper.identity
     *
     * <p>Just an identity function, that return what it's given without
     * changing it.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} value - input.
     * @return the <strong>value</strong> itself.
     */
    def(me, 'identity', function(value) {
        return value;
    });

    /**
     * @function {static} o2.MethodHelper.memoize
     *
     * <p><strong>Memoizes</strong> the given <code>Function</code>'s
     * outcome and presents it from cache, instead of recalculating.</p>
     * <p>See http://en.wikipedia.org/wiki/Memoization for details.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function multiply(a,b){return a*b; }
     * var memoized = o2.MethodHelper.memoize(multiply);
     * var result = memoized(2,3);//fresh calculation.
     * result = memoized(4,2);//fresh calculation.
     * result = memoized(2,3);//retrieve from cache.
     * </pre>
     *
     * @param {Function} fn - the <code>Function</code> to memoize.
     * @param {Object} context - what should "this" refer to.
     * @param {...} ... - variable number of input arguments to pass
     * arguments to fn.
     *
     * @return a reference to the memoized <code>Function</code>.
     */
    def(me, 'memoize', function() {
        var pad = {};
        var args = slice.call(arguments);
        var self = args.shift();
        var obj = args.length > 0 ? args[0] : null;

        var memoizedFn = function() {

            // Copy the arguments object into an array:
            // this allows it to be used as a cache key.
            var args = [];
            var i = 0;

            for (i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            // Evaluate the memoized function if it hasn't
            // been evaluated with these arguments before.
            if (!pad.hasOwnProperty(args)) {
                pad[args] = self.apply(obj, arguments);
            }

            return pad[args];
        };

        return memoizedFn;
    });

    /**
     * @function {static} o2.MethodHelper.partial
     *
     * <p>Defines a partial <code>Function</code>.</p>
     * <p>See http://ejohn.org/blog/partial-functions-in-javascript/ for a
     * detailed discussion.</p>
     * <p><strong>Usage example:</strong></p>
     * <pre>
     * function test(a,b,c){ return a*b+c; }
     * var partial = o2.MethodHelper.partial(this, test, 10, undefined, 20);
     * var result = partial(3);//returns 50;
     * </pre>
     *
     * @param {Object} base - the context of the newly created
     * <code>Function</code>.
     * @param {Function} fn - the <code>Function</code> to modify.
     * @param {Arguments} varargin - variable number of input arguments to
     * be passed as initial set of arguments.
     *
     * @return the modified <code>Function</code>.
     */
    def(me, 'partial', function() {
        var args = slice.call(arguments);
        var context = args.shift();
        var fn = args.shift();

        return function() {
            var arg = 0;
            var i = 0;

            for (i = 0; i < args.length && arg < arguments.length; i++) {
                if (args[i] === undefined) {
                    args[i] = arguments[arg++];
                }
            }

            return fn.apply(context, args);
        };
    });
}(this.o2));
