/*global window, o2*/

/**
 * @module o2.methodhelper.core
 * @requires o2
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>A <code>function</code> helper for stuff like <strong>memoization</strong>,
 * <strong>partial functions</strong> an <strong>currying</strong>.</p>
 */
( function(o2, window, UNDEFINED) {

    /**
     * @class {static} o2.MethodHelper
     * A method helper class.
     */
    o2.MethodHelper = {

        /**
         * @function {static} o2.MethodHelper.memoize
         *
         * <p><strong>Memoizes</strong> the given <code>function</code>'s outcome
         * and
         * presents it from cache, instead of recalculating.</p>
         * <p>See http://en.wikipedia.org/wiki/Memoization for details.</p>
         * <p>Sample Usage:</p>
         * <pre>
         * function multiply(a,b){return a*b; }
         * var memoized = o2.MethodHelper.memoize(multiply);
         * var result = memoized(2,3);//fresh calculation.
         * result = memoized(4,2);//fresh calculation.
         * result = memoized(2,3);//retrieve from cache.
         * </pre>
         *
         * @param {Function} fn - the <code>function</code> to memoize.
         * @param {Object} context - what should "this" refer to.
         * @param {...} ... - variable number of input arguments to pass
         * arguments to fn.
         * @return a reference to the memoized <code>function</code>.
         */
        memoize : function() {

            var pad = {};
            var args = Array.prototype.slice.call(arguments);
            var self = args.shift();
            var obj = args.length > 0 ? args[0] : null;

            var memoizedFn = function() {

                // Copy the arguments object into an array:
                // this allows it to be used as a cache key.
                var args = [];

                for(var i = 0; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }

                // Evaluate the memoized function if it hasn't
                // been evaluated with these arguments before.
                if(!( args in pad)) {
                    pad[args] = self.apply(obj, arguments);
                }

                return pad[args];

            };

            return memoizedFn;

        },

        /**
         * @function {static} o2.MethodHelper.curry
         *
         * <p>Curries the <code>function</code>.</p>
         * <p>See http://www.dustindiaz.com/javascript-curry/ for a
         * discussion.</p>
         * <p>Example usage:</p>
         * <pre>
         * function test(a,b,c) { return a+b+c; }
         * var curried = o2.MethodHelper.curry(this, test, 1, 2);
         * var result = curried(3);//returns 6;
         * </pre>
         *
         * @return the modified <code>function</code>.
         */
        curry : function() {

            var args = [].slice.call(arguments);

            var context = args.shift();
            var fn = args.shift();

            return function() {
                return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
            };

        },

        /**
         * @function {static} o2.MethodHelper.partial
         *
         * <p>Defines a partial <code>function</code>.</p>
         * <p>See http://ejohn.org/blog/partial-functions-in-javascript/ for a
         * detailed
         * discussion.</p>
         * <p>Usage Example:</p>
         * <pre>
         * function test(a,b,c){ return a*b+c; }
         * var partial = o2.MethodHelper.partial(test, 10, undefined, 20);
         * var result = partial(3);//returns 50;
         * </pre>
         *
         * @return the modified <code>function</code>.
         */
        partial : function() {

            var args = Array.prototype.slice.call(arguments);

            var context = args.shift();
            var fn = args.shift();

            return function() {

                var arg = 0;

                for(var i = 0; i < args.length && arg < arguments.length; i++) {
                    if(args[i] === UNDEFINED) {
                        args[i] = arguments[arg++];
                    }
                }

                return fn.apply(context, args);

            };

        },

        /**
         * @function o2.MethodHelper.bind
         *
         * <p>Creates a <code>Function</code> that uses <strong>base</strong> as
         * the
         * "<code>this</code>" reference.</p>
         *
         * @param {Object} base - the context of the newly created
         * <code>function</code>.
         * @param {Function} fn - the <code>function</code> to modify.
         * @return the modified <code>function</code>.
         */
        bind : function(base, fn) {
            
            return function(/*args*/) {
            
                return fn.apply(base, arguments);
            
            };

        }

    };

}(o2, this));
