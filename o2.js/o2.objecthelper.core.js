/**
 * @module   objecthelper.core
 * @requires collectionhelper.core
 * @requires core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-28 18:29:23.830081
 * -->
 *
 * <p>An object/clone/copy/inheritance helper.</p>
 */
(function(framework, window) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /**
     * @class {static} o2.ObjectHelper
     *
     * <p>A helper class for <strong>JavaScript</strong> <code>Object</code>
     * inheritance.</p>
     */
    var me = create('ObjectHelper');

    /*
     * Aliases
     */

    var myName = require('name');

    var kStringHelper = 'StringHelper';
    var format        = require(kStringHelper, 'format');
    var concat        = require(kStringHelper, 'concat');

    var toArray = require('CollectionHelper', 'toArray');

    var JSON = window.JSON;

    /*
     * Common Constants
     */
    var kNoJsonSupport = concat(myName, ': {0}: No JSON support. quitting');
    var kFunction      = 'function';

    /**
     * @function {static} o2.ObjectHelper.copy
     *
     * <p>Copies members from <strong>base</strong> to
     * <strong>child</strong>.</p>
     *
     * @param {Object} child
     * @param {Object} base
     */
    def(me, 'copy', function(child, base) {
        var key = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                child[key] = base[key];
            }
        }
    });

    /**
     * @function {static} o2.ObjectHelper.copyMethods
     * <p>Copies <strong>base</strong>'s methods, to
     * <strong>child</strong></p>.
     * <p>Note that the methods are copied by ref. Therefore any change in
     * <strong>base</strong> object's methods will be directly reflected to
     * the <strong>child</strong> object.</p>
     *
     * @param {Object} child - the child <strong>object</strong> to copy
     * methods to.
     * @param {Object} base - the base <strong>object</strong> to copy
     * methods from.
     */
    def(me, 'copyMethods', function(child, base) {
        var key = null;
        var value = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                value = base[key];
                if (typeof value === kFunction) {
                    child[key] = value;
                }
            }
        }
    });

    /**
     * @function {static} o2.ObjectHelper.copyPrototype
     *
     * <p>Copies every propery in <strong>base.prototype</strong>, to
     * <strong>child.prototype</strong>.</p>
     * <p>This is similar to extending <strong>child</strong>
     * to <strong>base</strong></p>.
     * <p>Note that the methods are copied by ref. Therefore any change in
     * <strong>base</strong> object's prototype methods will be directly
     * reflected to the <strong>child</strong> object's protoype.</p>
     *
     * @param {Object} child - the child <strong>object</strong> to copy
     * methods to.
     * @param {Object} base - the base <strong>object</strong> to copy
     * methods from.
     */
    def(me, 'copyPrototype', function(child, base) {
        var key = null;
        var childProto = child.prototype;
        var baseProto = base.prototype;

        for (key in baseProto) {
            if (baseProto.hasOwnProperty(key)) {
                childProto[key] = baseProto[key];
            }
        }
    });

    /**
     * @function {static} o2.ObjectHelper.extend
     *
     * <p>A simple way of extending objects.<p>
     * <p>Although the so called "object-oriented <strong>JavaScript</strong>"
     * is rarely useful and is against the <strong>functional</strong> nature of
     * the language, this helper method may be handy at times.</p>
     *
     * <p>Usage Example:</p>
     *
     * <pre>
     * function Fruit() {}
     * Fruit.prototype.grow = function() {};
     * Fruit.prototype.name = 'fruit';
     *
     * function Apple() {}
     * Apple.prototype.name = 'Steve';
     *
     * o2.ObjectHelper.inherit(Apple, Fruit, new Fruit());
     *
     * var fruit = new Fruit();
     * var apple = new Apple();
     *
     * log(typeof apple.grow); // function
     * log(apple.constructor); // Apple
     * log(apple.parent);      // {grow: function(){}, name : 'fruit'}
     * log(apple.name);        // 'Steve'
     * log(apple.parent.name); // 'fruit'
     * </pre>
     *
     * @param {Function} childConstructor - the child object.
     * @param {Function} baseConstructor - the <code>Object</code> to extend.
     * @param {Object} baseConstructed - base object initialized to a default
     * state.
     */
    def(me, 'extend', function(childConstructor, baseConstructor,
                baseConstructed) {
        var Junction = function(){};
        childConstructor.prototype = new Junction();
        Junction.prototype = baseConstructed;
        childConstructor.prototype.constructor = childConstructor;
        childConstructor.prototype.parent = baseConstructor.prototype;
    });

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
    def(me, 'toArray', function(obj) {
        return toArray(obj);
    });

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
    def(me, 'toJsonString', function(obj) {
        var kMethodName = 'ObjectHelper.toJsonString';

        if (JSON) {
            return JSON.stringify(obj);
        }

        throw format(kNoJsonSupport, kMethodName);
    });

    /**
     * @function {static} o2.ObjectHelper.stringify
     *
     * <p>An <strong>alias</strong> to {@link o2.ObjectHelper.toJsonString}.</p>
     *
     * @see o2.ObjectHelper.toJsonString
     */
    alias(me, 'stringify', 'toJsonString');
}(this.o2, this));
