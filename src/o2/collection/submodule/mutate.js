    exports.removeElement = function(obj, elm) {
        var i,
            item,
            key,
            len;

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                item = obj[i];

                if(item === elm) {
                    obj.splice(i, 1);
                    i--;
                    len = obj.length;
                }
            }

            return;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                item = obj[key];

                if(item === elm) {
                    delete obj[key];
                }
            }
        }
    };

    exports.removeElementByValue = function(obj, name, value) {
        var i,
            item,
            key,
            len;

        if (obj.splice) {
            for (i = 0, len = obj.length; i < len; i++) {
                item = obj[i];

                if(item[name] === value) {
                    obj.splice(i, 1);
                    i--;
                    len = obj.length;
                }
            }

            return obj;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                item = obj[key];

                if(item[name] === value) {
                    delete obj[key];
                }
            }
        }

        return obj;
    };
