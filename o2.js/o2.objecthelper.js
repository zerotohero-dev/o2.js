/**
 * @module   objecthelper
 * @requires collectionhelper
 * @requires stringhelper.core
 * @requires methodhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastUpdate: 2012-02-09 08:52:25.125079
 * -->
 *
 * <p>An object/clone/copy/inheritance helper.</p>
 */

(function(framework, window) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var myName = use(framework.name);
    var format = use(framework.StringHelper.format);
    var concat = use(framework.StringHelper.concat);
    var clone  = use(framework.MethodHelper.bind);
    var toArray = use(framework.CollectionHelper.toArray);

    /*
     * Common Constants
     */
    var kFunction = 'function';
    var kNoJsonSupport = concat(myName, ': {0}: No JSON support. quitting');

    /**
     * @class {static} o2.ObjectHelper
     *
     * <p>A helper class for <strong>JavaScript</strong> <code>object</code>
     * inheritance.</p>
     */
    var me = framework.ObjectHelper = {};

    /**
     * @function {static} o2.ObjectHelper.copyMethods
     * <p>Copies <strong>base</strong>'s methods, to
     * <strong>child</strong></p>.
     *
     * @param {Object} child - the child <strong>object</strong> to copy
     * methods to.
     * @param {Object} base - the base <strong>object</strong> to copy
     * methods from.
     */
    me.copyMethods = function(child, base) {
        var key = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                if (typeof base[key] === kFunction) {
                    child[key] = clone(child, base[key]);
                }
            }
        }
    };

    /**
     * @function {static} o2.ObjectHelper.toArray
     *
     * <p>Converts a given <code>Object</code> to an <code>Array</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to convert to an
     * <code>Array</code>.
     *
     * @return the converted <code>Array</code>.
     *
     * @see o2.CollectionHelper.toArray
     */
    me.toArray = function(obj) {
        return toArray(obj);
    };

    /**
     * o2.ObjectHelper.toJsonString
     *
     * <p>Converts the <code>Object</code> to a <strong>JSON</strong>
     * <code>String</code>, if <strong>JSON</strong> is supported.
     * you can use 3rdparty/json2/json2.js to add cross-browser
     * <strong>JSON</strong> support.</p>
     *
     * @param {Object} obj - the <code>Object</code> to convert to a
     * <strong>JSON</strong> <code>String</code>.
     *
     * @return the converted <strong>JSON</strong> <code>String</code>.
     */

    /**
     * @function {static} o2.MethodHelper.stringify
     *
     * <p>An alias to {@link o2.MethodHelper.toJsonString}.</p>
     *
     * @see o2.MethodHelper.toJsonString
     */
    me.stringify = me.toJsonString = function(obj) {
        if (window.JSON) {
            return JSON.stringify(obj);
        }

        var kMethodName = 'ObjectHelper.toJson';

        throw format(kNoJsonSupport, kMethodName);
    };
}(this.o2, this));
