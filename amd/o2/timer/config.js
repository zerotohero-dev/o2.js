'use strict';

/**
 * @module o2.timer
 */

/**
 * Default configuration.
 *
 * This can be overridden during
 * {{#crossLink "o2.timer.core/initialize:method"}}{{/crossLink}} call.
 *
 * @class o2.timer.config
 * @static
 */
module.exports = {

    /**
     * @property multiplexThreshold
     * @type Integer
     */
    multiplexThreshold: 20,

    /**
     * @property batchSizeDecreaseThreshold
     * @type Integer
     */
    batchSizeDecreaseThreshold: 3
};

