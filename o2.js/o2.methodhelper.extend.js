/*global window, o2*/

if(!o2.MethodHelper) {
    o2.MethodHelper = {};
}

/**
 * @module o2.methodhelper.extend
 * @requires o2
 * @required o2.stringhelper.core
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>A <code>Function</code> helper for stuff like <strong>memoization</strong>,
 * <strong>partial functions</strong> an <strong>currying</strong>.</p>
 */
( function(me, window, UNDEFINED) {

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            error : {
                ARGUMENT_COUNT_MISMATCH : 'Expected {0} arguments but found {1}'
            }
        }
    };

    /*
     * Aliases.
     */
    var format = o2.StringHelper.format;

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
     */
    me.overload = function(object, name, fn) {

        var old = object[name];

        object[name] = function() {

            // If both function have identical # of arguments,
            // then call the cached function.
            if(fn.length == arguments.length) {
                return fn.apply(this, arguments);
            }

            // Otherwise try to call the old function, if any.
            if( typeof old == 'function') {
                return old.apply(this, arguments);
            }

        };

    };

    /**
     * @function {static} o2.MethodHelper.requireAllArguments
     *
     * <p>Checks the passed in arguments, and if all arguments are present,
     * executes
     * the <code>function</code>. Otherwise throws an error.</p>
     *
     * @param {Function} fn - the <code>function</code> to check.
     * @return the applied <code>function</code>.
     * @throws excpetion if all of the arguments is not provided to the
     * <code>function</code>.
     */
    me.requireAllArguments = function(fn) {

        return function() {

            // throw an error if the arguments' length do not match.
            if(arguments.length < fn.length) {
                throw format(config.constants.error.ARGUMENT_COUNT_MISMATCH, fn.length, arguments.length);
            }

            return fn.apply(this, arguments);

        };

    };

    /**
     * @function {static} o2.MethodHelper.defer
     *
     * <p>Defers a <code>function</code> for a specified amount of time.</p>
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

}(o2.MethodHelper, this));
