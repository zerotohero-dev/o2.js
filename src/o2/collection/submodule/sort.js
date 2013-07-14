    exports.shuffle = function(obj) {
        var result = [],
            collection,
            i,
            index,
            len,
            value;

        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}

        collection = isArray(obj) ? obj : toArray(obj);

        for (i = 0, len = collection.length; i < len; i++) {
            value = collection[i];

            if (i === 0) {
                result.push(value);
            } else {
                index = floor(random() * (i + 1));
                result[i] = result[index];
                result[index] = value;
            }
        }

        return result;
    };

    exports.sort = function(obj, delegate, context) {
        var meta = [],
            iterator = delegate || identity,
            i,
            key,
            len,
            result,
            value;

        if (!obj) {return meta;}
        if (!isObject(obj)) {return meta;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                meta.push({
                    value : value,
                    order : iterator.apply(context, value, i, obj)
                });
            }
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    meta.push({
                        value: obj[key],
                        order: iterator.apply(context, value, i, obj)
                    });

                    i++;
                }
            }
        }

        meta.sort(function(left, right) {
            var l = left.order,
                r = right.order;

            if (l < r) {
                return -1;
            }

            if (l > r) {
                return 1;
            }

            return 0;
        });

        result = [];

        for(i = 0, len = meta.length; i < len; i++) {
            result.push(meta[i].value);
        }

        return result;
    };
