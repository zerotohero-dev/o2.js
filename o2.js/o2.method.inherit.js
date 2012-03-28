/**
 * @module   method.inherit
 * @requires core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-28 21:10:36.975421
 * -->
 *
 * <p>OOP/Inheritance related method helpers.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Method';

    /*
     * Method (inherit)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var format = require('String', 'format');

    /*
     * Common Constants
     */
    var kEmpty                 = '';
    var kArgumentCountMismatch = ['Method: Argument count mismatch. ',
        'Expecting: {0}, provided: {1}'].join(kEmpty);
    var kFunction              = 'function';

    /**
     * @function {static} o2.Method.overload
     *
     * <p>Adds a method to the <code>Object</code>.</p>
     * <p>If parameters count is different but the name is same,
     * adds the method with a different signature, overloading the former
     * one.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} object - the <code>Object</code> to add methods to.
     * @param {String} name - the name of the method.
     * @param {Function} fn - the method reference.
     *
     * @return the overloaded <code>Function</code>.
     */
    def(me, 'overload', function(object, name, fn) {
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
    });

    /**
     * @function {static} o2.Method.requireAllArguments
     *
     * <p>Checks the passed in arguments, and if all arguments are present,
     * executes <code>Function</code>. Otherwise throws an error.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} fn - the <code>Function</code> to check.
     *
     * @return the applied <code>Function</code>.
     *
     * @throws Excpetion if all of the arguments is not provided to the
     * <code>Function</code>.
     */
    def(me, 'requireAllArguments', function(fn) {
        return function() {

            // throw an error if the arguments' length do not match.
            if (arguments.length < fn.length) {
                throw format(kArgumentCountMismatch, fn.length,
                    arguments.length);
            }

            return fn.apply(this, arguments);
        };
    });
}(this.o2));
