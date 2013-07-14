    exports.group = function(obj, delegate) {
        var iterator = isFunction(delegate) ?
                delegate :
                function(obj) {
                    return obj[delegate];
                },
            result = {},
            i
            key,
            ky,
            len,
            value;

        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];
                ky = iterator(value, i);

                if (!result[ky]) {
                    result[ky] = [];
                }

                result[ky].push(value);
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];
                ky    = iterator(value, i);

                if (!result[ky]) {
                    result[ky] = [];
                }

                result[ky].push(value);

                i++;
            }
        }

        return result;
    };

    exports.unique = function(array, delegate) {
        var result = [],
            cache  = [],
            ar,
            elm,
            i,
            len;

        if (!array) {return result;}

        ar = isArray(array) ? array.slice().sort() : toArray(array).sort();

        if (delegate) {
            ar = delegate ? map(array, delegate) : ar;
        }

        for (i = 0, len = ar.length; i < len; i++) {
            elm = ar[i];

            if (i === 0 || cache[cache.length-1] !== elm) {
                cache.push(elm);
                result.push(elm);
            }
        }

        return result;
    };

    /*
     *
     */
    unique = exports.unique;

    exports.intersect = function(ar) {
        var peers = slice.apply(arguments, [1]),
            result = unique(ar),
            i,
            item,
            j,
            jlen,
            len,
            peer;

        if (result.length === 0) {return [];}

        for (i = 0, len = peers.length; i < len; i++) {
            peer = unique(peers[i]);

            if (!isObject(peer)) {return [];}

            for (j = 0, jlen = result.length; j < jlen; j++) {
                item = result[j];

                if (!contains(peer, item)) {
                    result.splice(j, 1);
                }

                if (!result.length) {return [];}
            }
        }

        return result;
    };

    exports.flatten = function(obj) {
        var store = [],
            i,
            key,
            len,
            value;

        if (!obj) {return store;}
        if (!isObject(obj)) {return store;}

        if (isArray(obj)) {
            for(i = 0, len = obj.length; i < len; i++) {
                value = obj[key];

                if (isArray(value)) {
                    store.concat(value);
                } else {
                    store.push(value);
                }
            }

            return store;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (isArray(value)) {
                    store.concat(value);
                } else {
                    store.push(value);
                }
            }
        }

        return store;
    };

    /*
     *
     */
    flatten = exports.flatten;

    exports.union = function() {
        return unique(flatten(arguments));
    };

    exports.zip = function() {
        var args = slice.call(arguments),
            results = [],
            length = getMax(pluck(args, kLength)),
            i;

        for (i = 0; i < length; i++) {
            results[i] = pluck(args, [kEmpty, i].join(kEmpty));
        }

        return results;
    };

    exports.diff = function(collection) {
        var result = [],
            i,
            key,
            len,
            rest,
            value;

        if (!collection) {return result;}
        if (!isObject(collection)) {return result;}

        rest = slice.call(arguments, 1);

        if (isArray(collection)) {
            for(i = 0, len = collection.length; i < len; i++) {
                value = collection[i];

                if (!contains(rest, value)) {
                    result.push(value);
                }
            }

            return result;
        }

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                value = collection[key];

                if (!contains(rest, value)) {
                    result.push(value);
                }
            }
        }

        return result;
    };

    exports.getDifference = exports.diff;

    exports.exclude = function(obj, delegate, context) {
        var results = [],
            counter,
            i,
            key,
            len,
            value;

        if (!obj) {return results;}
        if (!isObject(obj)) {return results;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                if (!delegate.apply(context, value, i, obj)) {
                    results.push(value);
                }
            }

            return results;
        }

        counter = 0;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (!delegate.apply(context, value, counter, obj)) {
                    results.push(value);
                }

                counter++;
            }
        }

        return results;
    };

    exports.reject = exports.exclude;
