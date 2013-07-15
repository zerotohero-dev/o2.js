/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, UNDEFINED) {
    'use strict';

    /**
     * @module   method.core
     *
     * @requires core
     *
     * <p>A <code>Function</code> helper for stuff like
     * <strong>memoization</strong>, <strong>partial functions</strong> and
     * <strong>currying</strong>.</p>
     */
    fp.ensure(
        'method.core',
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
         * Module Definition
         */
        kModuleName = 'Method',

        /**
         * @class {static} o2.Method
         *
         * <p>A method helper class.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * native
         */
        ap     = Array.prototype,
        concat = attr(ap, 'concat'),
        slice  = attr(ap, 'slice'),
        bind   = Function.prototype.bind;

    if (bind) {

        /**
         * @function {static} o2.Method.bind
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
         * var bound = o2.Method.bind(context, test);
         * bound(20,2,10);//gives 60
         * var bound2 = o2.Method.bind(context, test, 20);
         * bound2(2, 10);//gives 60
         * </pre>
         *
         * @param {Object} base - the context of the newly created
         * <code>Function</code>.
         * @param {Function} fn - the <code>Function</code> to modify.
         * @param {Arguments} varargin - variable number of input arguments
         * to be passed as initial set of arguments.
         *
         * @return the modified <code>Function</code>.
         */
        exports.bind = def(me, 'bind', function() {
            var args    = slice.call(arguments),
                context = args.shift(),
                fn      = args.shift();

            return fn.bind(context, args);
        });
    } else {
        exports.bind = def(me, 'bind', function() {
            var args    = slice.call(arguments),
                context = args.shift(),
                 fn     = args.shift();

            return function() {
                return fn.apply(
                    context, concat.call(args, slice.call(arguments))
                );
            };
        });
    }

    /**
     * @function {static} o2.Method.curry
     *
     * <p>Curries the <code>Function</code>.</p>
     * <p>See http://www.dustindiaz.com/javascript-curry/ for a
     * discussion.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function test(a,b,c) { return a+b+c; }
     * var curried = o2.Method.curry(this, test, 1, 2);
     * var result = curried(3);//returns 6;
     * </pre>
     *
     * @return the modified <code>Function</code>.
     */
    exports.curry = def(me, 'curry', function() {
        var args    = slice.call(arguments),
            context = args.shift(),
            fn      = args.shift();

        return function() {
            return fn.apply(context,
                args.concat(
                    slice.call(arguments)
                )
            );
        };
    });

    /**
     * @function {static} o2.Method.identity
     *
     * <p>Just an identity function, that return what it's given without
     * changing it.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var result = o2.identity(4);
     * // result will be 4
     * </pre>
     *
     * @param {Object} value - input.
     * @return the <strong>value</strong> itself.
     */
    exports.identity = def(me, 'identity', function(value) {
        return value;
    });

    /**
     * @function {static} o2.Method.memoize
     *
     * <p><strong>Memoizes</strong> the given <code>Function</code>'s
     * outcome and presents it from cache, instead of recalculating.</p>
     * <p>See http://en.wikipedia.org/wiki/Memoization for details.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function multiply(a,b){return a*b; }
     * var memoized = o2.Method.memoize(multiply);
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
    exports.memoize = def(me, 'memoize', function() {
        var pad  = {},
            args = slice.call(arguments),
            self = args.shift(),
            obj  = args.length > 0 ? args[0] : null,

            memoizedFn = function() {

                // Copy the arguments object into an array:
                // this allows it to be used as a cache key.
                var args = [],
                    i    = 0;

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
     * @function {static} o2.Method.partial
     *
     * <p>Defines a partial <code>Function</code>.</p>
     * <p>See http://ejohn.org/blog/partial-functions-in-javascript/ for a
     * detailed discussion.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function test(a,b,c){ return a*b+c; }
     * var partial = o2.Method.partial(this, test, 10, undefined, 20);
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
    exports.partial = def(me, 'partial', function() {
        var args    = slice.call(arguments),
            context = args.shift(),
            fn      = args.shift();

        return function() {
            var arg = 0,
                i   = 0;

            for (i = 0; i < args.length && arg < arguments.length; i++) {
                if (args[i] === UNDEFINED) {
                    args[i] = arguments[arg++];
                }
            }

            return fn.apply(context, args);
        };
    });
}(this.o2, this.o2.protecteds));

