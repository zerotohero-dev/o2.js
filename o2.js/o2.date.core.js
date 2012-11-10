/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   date.core
     *
     * @requires core
     *
     * <p>A <code>Date</code> helper module.</p>
     */
    fp.ensure(
        'date.core',
    [
        'core'
    ]);

    var attr    = fp.getAttr,
        alias   = attr(fp, 'alias'),
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Date',

        /**
         * @class {static} o2.Date
         *
         * <p>A date/time utilities class.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        $   = require('$'),
        now = require('now'),

        /*
         * string.core
         */
        format = require('String', 'format'),

        /*
         * # i18n
         */

        //TODO: parse all "TODO"s and enter as issues to github.

        //TODO: make these configurable in o2.date.config.js.

        kAgo              = 'ago',
        kCenturies        = 'centuries',
        kDays             = 'days',
        kFromNow          = 'from now',
        kHours            = 'hours',
        kJustNow          = 'just now',
        kLastCentury      = 'last century',
        kLastMonth        = 'last month',
        kLastWeek         = 'last week',
        kLastYear         = 'last year',
        kMinutes          = 'minutes',
        kMonths           = 'months',
        kNextCentury      = 'next century',
        kNextMonth        = 'next month',
        kNextWeek         = 'next week',
        kNextYear         = 'next year',
        kOneHourAgo       = 'an hour ago',
        kOneHourFromNow   = 'an hour from now',
        kOneMinuteAgo     = 'a minute ago',
        kOneMinuteFromNow = 'a minute from now',
        kSeconds          = 'seconds',
        kTomorrow         = 'tomorrow',
        kWeeks            = 'weeks',
        kYears            = 'years',
        kYesterday        = 'yesterday',

        /*
         * {15} {days} {ago}.
         */
        kTokenizedText = '{0} {1} {2}',

        /*
         * Time Formats
         */
        timeFormats = [
            [60         , kSeconds     , 1                ],
            [120        , kOneMinuteAgo, kOneMinuteFromNow],
            [3600       , kMinutes     , 60               ],
            [7200       , kOneHourAgo  , kOneHourFromNow  ],
            [86400      , kHours       , 3600             ],
            [172800     , kYesterday   , kTomorrow        ],
            [604800     , kDays        , 86400            ],
            [1209600    , kLastWeek    , kNextWeek        ],
            [2419200    , kWeeks       , 604800           ],
            [4838400    , kLastMonth   , kNextMonth       ],
            [29030400   , kMonths      , 2419200          ],
            [58060800   , kLastYear    , kNextYear        ],
            [2903040000 , kYears       , 29030400         ],
            [5806080000 , kLastCentury , kNextCentury     ],
            [58060800000, kCenturies   , 2903040000       ]
        ],

        /*
         * # Common Constants
         */

        kString = 'string',
        kEmpty  = '';

    /**
     * @function {static} o2.Date.getPrettyDate
     *
     * <p>Prints a human-readable time string, by looking at the difference
     * between two timestamps.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var timeString = o2.Date.getPrettyDate((new Date()).getTime());
     * // timeString is 'just now'
     * </pre>
     *
     * @param {Integer} time - the offset time in milliseconds.
     * @param {Integer} currTime - (Optional, default to NOW) the base time
     * in milliseconds.
     */
    exports.getPrettyDate = def(me, 'getPrettyDate', function(time, currTime) {
        var currentTime   = currTime || $.now(),
            kInThePast    = 1,
            kInTheFuture  = 2,
            listChoice    = kInThePast,
            seconds       = (new Date(currentTime) - new Date(time)) / 1000,
            token         = kAgo,
            i             = 0,
            currentFormat = kEmpty;

        if (seconds < 0) {
            seconds    = abs(seconds);
            token      = kFromNow;
            listChoice = kInTheFuture;
        }

        i             = 0;
        currentFormat = timeFormats[i];

        while (currentFormat) {
            if (seconds < 5) {
                return kJustNow;
            }

            if (seconds < currentFormat[0]) {
                if (typeof currentFormat[2] === kString) {
                    return currentFormat[listChoice];
                }

                return format(kTokenizedText,
                    floor(seconds / currentFormat[2]),
                    currentFormat[1],
                    token
                );
            }

            currentFormat = timeFormats[++i];
        }

        return time;
    });

    /**
     * @function {static} o2.Date.getTime
     *
     * <p>An alias to {@link o2.now}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var linuxTime = o2.Date.getTime();
     * </pre>
     *
     * @see o2.now
     */
    exports.getTime = def(me, 'getTime', function() {
        return now();
    });

    /**
     * @function {static} o2.Date.now
     *
     * <p>An alias to {@link o2.Date.getTime}.</p>
     *
     * @see o2.Date.getTime
     */
    exports.now = alias(me, 'now', 'getTime');
}(this.o2, this.o2.protecteds));
