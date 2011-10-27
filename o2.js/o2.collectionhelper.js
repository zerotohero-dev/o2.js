/**
 * @module collectionhelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility <strong>class</strong> to modify collections.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;

    /*
     * Module configuration.
     */
    var config = {
        constants : {

            /*
             *
             */
            ecmaScriptType : {
                ARRAY : 'Array'
            }

        }
    };

    /*
     * Common numeric constants.
     */
    var kObjectNameStartIndex = 8;
    var kTrimLastBraceIndex = -1;

    /*
     * Common string constants.
     */
    var kObject = 'object';

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

        return is(obj, config.constants.ecmaScriptType.ARRAY);
    }

    /**
     * @class {static} o2.CollectionHelper
     *
     * <p>A <strong>class</strong> to modify collections.</p>
     */
    me.CollectionHelper = {

        /**
         * @function {static} o2.CollectionHelper.merge
         *
         * <p>Merges two objects.</p>
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
        merge : function(toObj, fromObj, isRecursive) {
            var shouldRecurse = !!isRecursive;
            var value = null;
            var key = null;
            var merge = me.CollectionHelper.merge;

            for (key in fromObj) {
                if (fromObj.hasOwnProperty(key)) {
                    value = fromObj[key];

                    if (!shouldRecurse || typeof value !== kObject) {
                        toObj[key] = fromObj[key];
                    }

                    if (typeof toObj[key] !== kObject) {
                        toObj[key] = isArray(value) ? [] : {};
                    }

                    merge(toObj[key], fromObj[key], shouldRecurse);
                }
            }

            return toObj;
        },

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
        indexOf : function(ar, elm) {
            if (Array.prototype.indexOf) {
                me.CollectionHelper.indexOf = function(ar, elm) {
                    var counter = 0;
                    var key = null;

                    if (!ar) {
                        return -1;
                    }

                    if (isArray(ar)) {

                        return ar.indexOf(elm);
                    }

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
                };

                return me.CollectionHelper.indexOf(ar, elm);
            }

            me.CollectionHelper.indexOf = function(ar, elm) {
                var i = 0;
                var len = 0;
                var counter = 0;
                var key = null;

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
            };

            return me.CollectionHelper.indexOf(ar, elm);
        },

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
        contains : function(ar, elm) {
            return me.CollectionHelper.indexOf(ar, elm) > -1;
        },

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
        copy : function(ar, isDeepCopy) {
            var shouldDeepCopy = !!isDeepCopy;
            var theCopy = isArray(ar) ? [] : {};
            var value = null;
            var key = null;

            for(key in ar) {
                if(ar.hasOwnProperty(key)) {
                    value = ar[key];

                    if(!shouldDeepCopy || ( typeof value !== kObject)) {
                        theCopy[key] = value;
                    }

                    theCopy[key] = me.CollectionHelper.copy(value, shouldDeepCopy);
                }
            }

            return theCopy;
        },

        /**
         * @function {static} o2.CollectionHelper.clear
         *
         * <p>Removes all the elements of the <code>Object</code>.</p>
         *
         * @param {Object} ar - the <code>Object</code> to clear.
         *
         * @return a <strong>reference</strong> to the object itself.
         */
        clear : function(ar) {
            var key = null;

            if(!ar) {
                return null;
            }

            if(isArray(ar)) {
                ar.length = 0;

                return ar;
            }

            for(key in ar) {
                if(ar.hasOwnProperty(key)) {
                    delete ar[key];
                }
            }

            return ar;
        },

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
        removeElementByValue : function(collection, name, value, isRecursive) {
            var item = null;
            var isNested = !!isRecursive;
            var removeElementByValue = framework.CollectionHelper.removeElementByValue;
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
        },

        /**
         * @function o2.CollectionHelper.getFirst
         *
         * <p>Gets the first element of the <code>Array</code> or
         * <code>Object</code>.</p>
         *
         * @param {Object} ar - the <code>Object</code> to inspect.
         *
         * @return the first element if exists, <code>null</code> otherwise.
         */
        getFirst : function(ar) {
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
        },

        /**
         * @function o2.CollectionHelper.getLast
         *
         * <p>Gets the last element of the array.</p>
         *
         * @param {Object} ar - the <code>Array</code> or <code>Object</code> to
         * inspect.
         *
         * @return the last element if exists, <code>null</code> otherwise.
         */
        getLast : function(ar) {
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
        },

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
        compact : function(ar, isDeepClean) {
            var compact = me.CollectionHelper.compact;
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
        }
    };
}(this.o2, this));
