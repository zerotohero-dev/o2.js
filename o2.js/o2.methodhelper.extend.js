/**
 * @module   methodhelper.extend
 * @requires methodhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 08:54:31.999794
 * -->
 *
 * <p>A <code>Function</code> helper for stuff like
 * <strong>memoization</strong>, <strong>partial functions</strong>
 * an <strong>currying</strong>.</p>
 */
(function(framework, window) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var me = use(framework.MethodHelper);
    var format = use(framework.StringHelper.format);

    var slice = Array.prototype.slice;
    var splice = Array.prototype.splice;
    var setTimeout = window.setTimeout;

    /*
     * Common Error Messages
     */
    var kArgumentCountMismatch = 'Expected {0} arguments but found {1}';

    /*
     * Common Constants
     */
    var kFunction = 'function';

    /**
     * @function {static} o2.MethodHelper.overload
     *
     * <p>Adds a method to the <code>Object</code>.</p>
     * <p>If parameters count is different but the name is same,
     * adds the method with a different signature, overloading the former
     * one.</p>
     *
     * @param {Object} object - the <code>Object</code> to add methods to.
     * @param {String} name - the name of the method.
     * @param {Function} fn - the method reference.
     *
     * @return the overloaded <code>Function</code>.
     */
    me.overload = function(object, name, fn) {
        var old = object[name];

        object[name] = function() {

            // If both functions have identical # of arguments,
            // then call the cached function.
            if (fn.length === arguments.length) {
                return fn.apply(this, arguments);
            }

            // Otherwise try to call the old function, if any.
            if (typeof old === kFunction) {
                return old.apply(this, arguments);
            }
        };
    };

    /**
     * @function {static} o2.MethodHelper.requireAllArguments
     *
     * <p>Checks the passed in arguments, and if all arguments are present,
     * executes <code>Function</code>. Otherwise throws an error.</p>
     *
     * @param {Function} fn - the <code>function</code> to check.
     *
     * @return the applied <code>Function</code>.
     *
     * @throws excpetion if all of the arguments is not provided to the
     * <code>Function</code>.
     */
    me.requireAllArguments = function(fn) {
        return function() {

            // throw an error if the arguments' length do not match.
            if (arguments.length < fn.length) {
                throw format(kArgumentCountMismatch, fn.length,
                    arguments.length);
            }

            return fn.apply(this, arguments);
        };
    };

    /**
     * @function {static} o2.MethodHelper.defer
     *
     * <p>Defers a <code>Function</code> for a specified amount of time.</p>
     *
     * @param {Function} fn - the <code>function</code> to defer.
     * @param {Integer} interval - the interval to defer in milliseconds.
     * @param {Object} context - the context (this reference) to bind.
     * @param {Array} args - arguments to pass to the function.
     */
    me.defer = function(fn, interval, context, args) {
        setTimeout(function() {
            return fn.apply(context, args);
        }, interval);
    };

    /**
     * @function {static} o2.MethodHelper.flip
     *
     * <p>Flips two arguments of the given <code>function</code>, and returns a
     * new <code>function</code>.</p>
     *
     * @param {Function} fn - the delegate to flip arguments of.
     * @param {Integer} index1 - the index of the first argument.
     * @param {Integer} index2 - the index of the second argument.
     *
     * @return the created <code>Function</code>.
     */
    me.flip = function(fn, index1, index2) {
        return function() {
            var args = slice.call(arguments);
            var temporary = args[index1];
            args[index1] = args[index2];
            args[index2] = temporary;

            return fn.apply(this, args);
        };
    };

    /**
     * @function {static} o2.MethodHelper.compose
     *
     * <p>Create a method that calls the <strong>invoker</strong> with the
     * return value of the evaluated function <strong>fn</strong>. The current
     * arguments are passed to <strong>fn</strong>, and the evaluated result
     * is passed to the <strong>invoker</strong>.
     *
     * @param {Function} invoker - the invoker.
     * @param {Function} fn - the invokee.
     *
     * @return the created <code>Function</code>.
     */
    me.compose = function(invoker, fn) {
        return function() {
            return invoker.call(this, fn.apply(this, arguments));
        };
    };

    /**
     * @function {static} o2.MethodHelper.fold
     *
     * <p>Runs through the collection, accumulating the reuslts by executing
     * <code>result = fn(result, currentItem)</code>, where <strong>currentItem</strong>
     * is the item of the collection at the current index.
     *
     * @param {Object} collection - The collection to iterate.
     * @param {Function} fn - the <code>Function</code> to map.
     * @param {Object} initial - the initial seed.
     */
    me.fold = function(collection, fn, initial) {
        var args = splice.call(collection, 0);
        var result = initial;
        var i = 0;
        var len = 0;

        for(i = 0, len = args.length; i < len; i++) {
            result = fn(result, args[i]);
        }

        return result;
    };

    /**
     * @function {static} o2.MethodHelper.bindAseventlistenerventListener
     *
     * <p>Binds the given function as an event listener, ensuring that
     * the first parameter is always the event object.</p>
     *
     * <p>This method is generally used in conjunction with
     * {@link o2.EventHandler.addEventListener}.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * var $ = o2.$;
     * var listen = o2.EventHandler.addEventListener;
     * var getTarget = o2.EventHandler.getTarget;
     * var bind = o2.MethodHelper.bindAsEventListener;
     *
     * var context = {id : 1, description : 'hello world.'};
     * var kClick = 'click';
     * var menu = $('mainMenu');
     *
     * function test(evt, a, b) {
     *      console.log( getTarget(evt) );
     *      console.log( this.id );
     *      console.log( this.description );
     *      console.log( a );
     *      console.log( b );
     * }
     *
     * var delegate = bind(context, test, 20, 30);
     * listen(menu, kClick, delegate);
     *
     * // When mainMenu element is clicked the output will be as follows:
     * //
     * // [DOM Element]
     * // 1
     * // hello world
     * // 20
     * // 30
     * </pre>
     *
     * @return the bound <code>Function</code>.
     *
     * @see o2.EventHandler.addEventListener
     */
    me.bindAsEventListener = function() {
        var args = slice.call(arguments);
        var context = args.shift();
        var fn = args.shift();

        return function(e) {
            args.unshift(e);
            return fn.apply(context, args);
        };
    };
}(this.o2, this));
