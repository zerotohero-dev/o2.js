(function(require) {
    'use strict';

    require.onError = function(error) {
        var message = error.requireType + ': ';

        if (error.requireType === 'scripterror' || error.requireType === 'notloaded' && error.requireModules) {
            message += 'Illegal path or script error: ' + '[\'' + error.requireModules.join("', '") + '\']';
        } else {
            message += error.message;
        }

        throw new Error(message);
    };

    require.config({});
}(require));
