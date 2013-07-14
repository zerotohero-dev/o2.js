    exports.clear = function(ar) {
        var key = null;

        if (!ar) {return ar;}

        if (isArray(ar)) {
            ar.length = 0;

            return ar;
        }

        if (!isObject(ar)) {return ar;}

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                delete ar[key];
            }
        }

        return ar;
    };

    exports.compact = function(ar) {
        var value,
            i,
            len,
            key;

        if (!ar) {return ar;}
        if (!isObject(ar)) {return ar;}

        if (ar.splice) {
            for (i = 0, len = ar.length; i < len; i++) {
                value = ar[i];

                if (value === null || value === UNDEFINED) {
                    ar.splice(i, 1);

                    i = i - 1;
                    len = ar.length;
                }
            }

            return ar;
        }

        for (key in ar) {
            if (ar.hasOwnProperty(key)) {
                value = ar[key];

                if (value === null || value === UNDEFINED) {
                    delete ar[key];
                }
            }
        }

        return ar;
    };
