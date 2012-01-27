/**
 * @module collectionhelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-26 09:40:00.405325
 * -->
 *
 * <p>A utility <strong>class</strong> to modify collections.</p>
 */

(function(framework) {
    'use strict';

    /**
     * @class {static} o2.CollectionHelper
     *
     * <p>A <strong>class</strong> to modify collections.</p>
     */
    framework.CollectionHelper = {};

    /*
     * Aliases
     */
    var me = framework.CollectionHelper;

    /*
     * Common Constants
     */
    var kObjectNameStartIndex = 8;
    var kTrimLastBraceIndex   = -1;
    var kObject               = 'object';

    /*
     * EcmaScript Types
     */
    var kArray = 'Array';

    /*
     *
     */
    function is(obj, type) {
        var klass = Object.prototype.toString.call(obj).slice(
            kObjectNameStartIndex, kTrimLastBraceIndex);

        return obj !== undefined && obj !== null && klass === type;
    }

    /*
     *
     */
    function isArray(obj) {
        return is(obj, kArray);
    }

    /**
     * @function {static} o2.CollectionHelper.merge
     *
     * <p>Merges two <code>Object</code>s or <code>Array</code>s.</p>
     *
     * @param {Object} toObj - the <code>Object</code> to copy values to.
     * @param {Object} fromObj - the <code>Object</code> to copy values from.
     * @param {Boolean} isRecursive - (Optional, defaults to
     * <code>false</code>) <code>true</code> if the merge is nested into
     * child objects as well.
     *
     * @return a <strong>reference</strong> to the modified
     * <code>toObj</code>.
     */
    me.merge = function(toObj, fromObj, isRecursive) {
        var shouldRecurse = !!isRecursive;
        var value = null;
        var key = null;
        var merge = me.merge;
        var indexOf = me.indexOf;
        var i = 0;
        var len = 0;

        if (isArray(toObj)) {
            if(!isArray(fromObj)) {
                return toObj;
            }

            i = 0;
            len = fromObj.length;

            for (i = 0; i < len; i++) {
                value = fromObj[i];

                if (!shouldRecurse || typeof value !== kObject) {
                    if(indexOf(toObj, value) === -1) {
                        toObj.push(value);
                    }
                } else {
                    if (typeof toObj[i] !== kObject) {
                        toObj[key] = [];
                    }

                    merge(toObj[i], value, shouldRecurse);
                }
            }

            return toObj;
        }

        for (key in fromObj) {
            if (fromObj.hasOwnProperty(key)) {
                value = fromObj[key];

                if (!shouldRecurse || typeof value !== kObject) {
                    toObj[key] = value;
                } else {
                    if (typeof toObj[key] !== kObject) {
                        toObj[key] = {};
                    }

                    merge(toObj[key], value, shouldRecurse);
                }
            }
        }

        return toObj;
    };

    /**
     * @function {static} o2.CollectionHelper.filter
     *
     * <p>Filters a <strong>collection</strong> and returns an
     * <code>Array</code> containing the filtered items.
     *
     * @param {Object} collection - the <strong>collection</strong> to filter.
     * @param {Function} fnFilter - the filtering function, that takes each
     * item of the filter as a parameter and returns a boolean value. If the
     * function returns a falsy value, the item will not be included in
     * the result array, if it returns a truthy value, the item will be included
     * in the result array.
     */
    me.filter = function(collection, fnFilter) {
        var result = [];

        var item = null;
        var key = null;
        var len = 0;
        var i = 0;

        if (!collection) {
            return result;
        }

        if (isArray(collection)) {
            for (i = 0, len = collection.length; i < len; i++) {
                item = collection[i];

                if(fnFilter(item)) {
                    result.push(item);
                }
            }

            return result;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                item = collection[key];

                if (collection.hasOwnProperty(key)) {
                    if(fnFilter(item)) {
                        result.push(item);
                    }
                }
            }
        }

        return result;
    };

    /**
     * @function {static} o2.CollectionHelper.getKeys
     *
     * <p>Gets all the keys of a <strong>collection</strong>.
     *
     * @param {Object} collection - An associative array of key-value pairs.
     *
     * @return an <code>Array</code> of the keys of the
     * <strong>collection</strong>.
     */

    /**
     * @function {static} o2.CollectionHelper.keys
     *
     * <p>An alias to {@link o2.CollectionHelper.getKeys}
     *
     * @see o2.CollectionHelper.getKeys
     */
    me.keys = me.getKeys = function(collection) {
        var result = [];
        var key = null;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                result.push(key);
            }
        }

        return result;
    };

    /*
     *
     */
    function getIndexFromObject(ar, elm) {
        var key = null;
        var counter = 0;

        if (typeof ar === kObject) {
            for (key in ar) {
                if (ar.hasOwnProperty(key)) {
                    if (ar[key] === elm) {
                        return counter;
                    }

                    counter++;
                }
            }

            return -1;
        }

        return -1;
    }

    if (Array.prototype.indexOf) {
        /**
         * @function {static} o2.CollectionHelper.indexOf
         *
         * <p>Gets the index of the element in the given <code>Array</code>.</p>
         *
         * @param {Object} ar - the <code>Array</code> or <code>Object</code> to
         * search.
         * @param {Object} elm - the <code>Object</code> to match.
         *
         * @return the index of the element if found, <code>-1</code> otherwise.
         */
        me.indexOf = function(ar, elm) {
            if (!ar) {
                return -1;
            }

            if (isArray(ar)) {
                return ar.indexOf(elm);
            }

            return getIndexFromObject(ar, elm);
        };
    } else {
        me.indexOf = function(ar, elm) {
            var i = 0;
            var len = 0;

            if (!ar) {
                return -1;
            }

            if (isArray(ar)) {
                for (i = 0, len = ar.length; i < len; i++) {
                    if (elm === ar[i]) {
                        return i;
                    }
                }

                return -1;
            }

            return getIndexFromObject(ar, elm);
        };
    }

    /**
     * @function {static} o2.CollectionHelper.contains
     *
     * <p>An <strong>alias</strong> to <code>o2.CollectionHelper.indexOf(ar,
     * elm) &gt; -1</code>.</p>
     *
     * @param {Array} ar - the <code>Array</code> to search.
     * @param {Object} elm - the <code>Object</code> to match.
     *
     * @return <code>true</code> if the <code>Array</code> contains the item,
     * <code>false</code> otherwise.
     */
    me.contains = function(ar, elm) {
        return me.indexOf(ar, elm) > -1;
    };

    /**
     * @function {static} o2.CollectionHelper.copy
     *
     * <p>Creates a clone of the given <code>Object</code>, and returns it;
     * leaving the original intact.</p>
     *
     * @param {Object} ar - the object to clone.
     * @param {Boolean} isDeepCopy - (Optional; defaults to
     * <code>false</code>) - if <code>true</code> and the object contains
     * other <code>Object</code>s, these <code>Object</code>s will be cloned
     * as well; non-primitive values will not be copied otherwise.
     *
     * @return the copied <code>Object</code>.
     */
    me.copy = function(ar, isDeepCopy) {
        var shouldDeepCopy = !!isDeepCopy;
        var theCopy = isArray(ar) ? [] : {};
        var value = null;
        var key = null;

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                value = ar[key];

                if (!shouldDeepCopy || (typeof value !== kObject)) {
                    theCopy[key] = value;
                } else {
                    theCopy[key] = me.CollectionHelper.copy(value,
                        shouldDeepCopy);
                }
            }
        }

        return theCopy;
    };

    /**
     * @function {static} o2.CollectionHelper.clear
     *
     * <p>Removes all the elements of the <code>Object</code>.</p>
     *
     * @param {Object} ar - the <code>Object</code> to clear.
     *
     * @return a <strong>reference</strong> to the object itself.
     */
    me.clear = function(ar) {
        var key = null;

        if (!ar) {
            return null;
        }

        if (isArray(ar)) {
            ar.length = 0;

            return ar;
        }

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                delete ar[key];
            }
        }

        return ar;
    };

    /**
     * @function {static} o2.CollectionHelper.removeElementByValue
     *
     * <p>Removes and element from the collection if it has a property named
     * <strong>name</strong> with a value <strong>value</strong>.</p>
     *
     * @param {Object} collection - an <code>Object</code> or an
     * <code>Array</code> to update.
     * @param {String} name - the name of the property.
     * @param {Object} value - the value to compare.
     * @param {Boolean} isRecursive - (optionak; defaults to
     * <code>false</code>) If <code>true</code> a nesterd search will be
     * issued; otherwise the search will be single level.
     */
    me.removeElementByValue = function(collection, name, value, isRecursive) {
        var item = null;
        var isNested = !!isRecursive;
        var removeElementByValue = me.removeElementByValue;
        var i = 0;
        var len = 0;
        var key = null;

        if (isArray(collection)) {
            for (i = 0, len = collection.length; i < len; i++) {
                item = collection[i];

                if (typeof item === kObject && isNested) {
                    removeElementByValue(item, name, value, isNested);
                } else if(item[name] === value) {
                    collection.splice(i, 1);
                    i--;
                    len = collection.length;
                }
            }

            return;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                item = collection[key];

                if (typeof item === kObject && isNested) {
                    removeElementByValue(item, name, value, isNested);
                } else if(item[name] === value) {
                    delete collection[key];
                }
            }
        }
    };

    /**
     * @function {static} o2.CollectionHelper.getFirst
     *
     * <p>Gets the first element of the <code>Array</code> or
     * <code>Object</code>.</p>
     *
     * @param {Object} ar - the <code>Object</code> to inspect.
     *
     * @return the first element if exists, <code>null</code> otherwise.
     */

    /**
     * @function {static} o2.CollectionHelper.first
     *
     * <p>An alias to {@link o2.CollectionHelper.getFirst}.</p>
     *
     * @see o2.CollectionHelper.getFirst
     */
    me.first = me.getFirst = function(ar) {
        var key = null;

        if (!ar) {
            return null;
        }

        if (!isArray(ar)) {
            if (typeof ar === kObject) {
                for (key in ar) {
                    if (ar.hasOwnProperty(key)) {
                        return ar[key];
                    }
                }
            }

            return null;
        }

        return ar[0];
    };

    /**
     * @function {static} o2.CollectionHelper.getLast
     *
     * <p>Gets the last element of the array.</p>
     *
     * @param {Object} ar - the <code>Array</code> or <code>Object</code> to
     * inspect.
     *
     * @return the last element if exists, <code>null</code> otherwise.
     */

    /**
     * @function {static} o2.CollectionHelper.last
     *
     * <p>An alias to {@link o2.CollectionHelper.getLast}</p>
     *
     * @see o2.CollectionHelper.getLast
     */
    me.last = me.getLast = function(ar) {
        var key = null;
        var lastItem = null;

        if (!ar) {
            return null;
        }

        if (!isArray(ar)) {
            if (typeof ar === kObject) {
                for (key in ar) {
                    if (ar.hasOwnProperty(key)) {
                        lastItem = ar[key];
                    }
                }

                return lastItem;
            }

            return null;
        }

        return ar[ar.length - 1];
    };

    /**
     * @function {static} o2.CollectionHelper.compact
     *
     * <p>Remove <code>null</code>, and <code>undefined</code> members from
     * the <code>Object</code>.
     * This function alters the actual <code>Object</code>.</p>
     *
     * @param {Object} ar - the <code>Object</code> to clean.
     * @param {Boolean} isDeepClean - (Optional; defaults to
     * <code>false</code>) - if <code>true</code> and the object contains
     * other <code>Object</code>s,
     * these <code>Object</code>s will be cleaned as well; non-primitive
     * values will not be cleaned otherwise.
     *
     * @return a reference to the <code>Object</code> itself.
     */
    me.compact = function(ar, isDeepClean) {
        var compact = me.compact;
        var value = null;
        var i = 0;
        var len = 0;
        var key = null;
        var shouldRecurse = !!isDeepClean;

        if (!ar) {
            return null;
        }

        if (isArray(ar)) {
            for (i = 0, len = ar.length; i < len; i++) {
                value = ar[i];

                if (value === null || value === undefined) {
                    ar.splice(i, 1);

                    i = i - 1;
                    len = ar.length;
                } else if (isArray(value) && shouldRecurse) {
                    compact(value, shouldRecurse);
                }
            }

            return ar;
        }

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                value = ar[key];

                if (value === null || value === undefined) {
                    delete ar[key];
                }

                if (typeof value === kObject && shouldRecurse) {
                    compact(value);
                }
            }
        }

        return ar;
    };

    /**
     * @function {static} o2.CollectionHelper.map
     *
     * <p>Executes the <strong>evaluator</strong> over every element of the
     * <strong>collection</strong> and returns an <code>Array</code> of
     * mapped elements</p>
     *
     * @param {Object} collection - The collection to map.
     * @param {Function} evaluator - A <code>Function</code> reference in the
     * form fn(currentItem, itemIndex, selfRef).
     * @param {Object} selfRef - A reference to the collection itself.
     *
     * @return an <code>Array</code> of mapped items.
     */
    me.map = function(collection, evaluator, selfRef) {
        var result = [];
        var evaluated = null;
        var key = null;
        var arrayIndex = 0;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                evaluated = evaluator(collection[key], arrayIndex++, selfRef);

                if (evaluated) {
                    result.push(evaluated);
                }

            }
        }

        return result;
    };

    /*
     *
     */
    function forEachObject(collection, delegate) {
        var key = null;

        for (key in collection) {
            if(collection.hasOwnProperty(key)) {
                delegate(collection[key], key, collection);
            }
        }
    }

    if (Array.prototype.forEach) {
        /**
         * @function {static} o2.CollectionHelper.forEach
         *
         * <p>Executes a delegate of the form
         * <code>fn(item, currentIndex, collection)</code> for each element
         * of the <strong>collection</strong>.</p>
         *
         * @param {Object} collection - the current object to iterate.
         * @param {Function} delegate - the iterator.
         */
        me.forEach = function(collection, delegate) {
            if (!collection) {
                return;
            }

            if (isArray(collection)) {
                collection.forEach(delegate);

                return;
            }

            forEachObject(collection, delegate);
        };
    } else {
        me.forEach = function(collection, delegate) {
            var i = 0;
            var len = 0;

            if (!collection) {
                return;
            }

            if (isArray(collection)) {
                for (i = 0, len = collection.length; i < len; i++) {
                    delegate(collection[i], i, collection);
                }

                return;
            }

            forEachObject(collection, delegate);
        };
    }

    /**
     * @function {static} o2.CollectionHelper.each
     *
     * <p>An alias to {@link o2.CollectionHelper.forEach}.</p>
     *
     * @see o2.CollectionHelper.forEach
     */
    me.each = me.forEach;

    /**
     * @function {static} o2.CollectionHelper.toArray
     *
     * <p>Converts the <strong>collection</strong> into an <code>Array</code>.
     *
     * @param {Object} collection - the <strong>collection</strong> to convert.
     * @param {Boolean} shouldRecurse - (Optional, defaults to
     * <code>false</code>), if <code>true</code> nested items that are
     * <code>Object</code>s will also be processed.
     *
     * @return the converted <code>Array</code>.
     */
    me.toArray = function(collection, shouldRecurse) {
        var isRecursive = !!shouldRecurse;

        var key = null;
        var result = [];

        var toArray = me.toArray;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                if (!isRecursive || typeof collection[key] !== kObject) {
                    result.push(collection[key]);
                } else {
                    result.push(toArray(collection[key], isRecursive));
                }
            }
        }

        return result;
    };
}(this.o2, this));
