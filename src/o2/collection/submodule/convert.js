    exports.toArray = function(obj) {
        var result = [],
            key;

        if (!obj) {return result;}
        if (obj.toArray) {return obj.toArray();}

        if (obj.slice) {
            return obj.slice();
        }

        if (isArguments(obj)) {
            return slice.apply(obj);
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }

        return result;
    };

    /*
     *
     */
    toArray = exports.toArray;
