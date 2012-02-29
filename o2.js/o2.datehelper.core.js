/**
 * @module   datehelper.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-29 17:18:51.882653
 * -->
 *
 * <p>A <code>Date</code> helper module.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /**
     * @class {static} o2.DateHelper
     *
     * <p>A date/time utilities class.</p>
     */
    var me = create('DateHelper');

    /*
     * Aliases
     */

    var $      = require('$');
    var now    = require('now');

    var format = require('StringHelper', 'format');

    var math  = Math;
    var floor = attr(math, 'floor');
    var abs   = attr(math, 'abs');

    /*
     * i18n
     */

    var kAgo              = 'ago';
    var kCenturies        = 'centuries';
    var kDays             = 'days';
    var kFromNow          = 'from now';
    var kHours            = 'hours';
    var kJustNow          = 'just now';
    var kLastCentury      = 'last century';
    var kLastMonth        = 'last month';
    var kLastWeek         = 'last week';
    var kLastYear         = 'last year';
    var kMinutes          = 'minutes';
    var kMonths           = 'months';
    var kNextCentury      = 'next century';
    var kNextMonth        = 'next month';
    var kNextWeek         = 'next week';
    var kNextYear         = 'next year';
    var kOneHourAgo       = 'an hour ago';
    var kOneHourFromNow   = 'an hour from now';
    var kOneMinuteAgo     = 'a minute ago';
    var kOneMinuteFromNow = 'a minute from now';
    var kSeconds          = 'seconds';
    var kTomorrow         = 'tomorrow';
    var kWeeks            = 'weeks';
    var kYears            = 'years';
    var kYesterday        = 'yesterday';

    var kTokenizedText = '{0} {1} {2}';

    /*
     * Time Formats
     */
    var timeFormats = [
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
    ];

    /*
     * Common Constants
     */
    var kString = 'string';

    /**
     * @function {static} o2.DateHelper.getPrettyDate
     *
     * <p>Prints a human-readable time string, by looking at the difference
     * between two timestamps.</p>
     *
     * @param {Integer} time - the offset time in milliseconds.
     * @param {Integer} currTime - (Optional, default to NOW) the base time
     * in milliseconds.
     */
    def(me, 'getPrettyDate', function(time, currTime) {
        var currentTime = currTime || $.now();
        var seconds = (new Date(currentTime) - new Date(time)) / 1000;
        var token = kAgo;
        var  listChoice = 1;

        if (seconds < 0) {
            seconds = abs(seconds);
            token = kFromNow;
            listChoice = 2;
        }

        var i = 0;
        var currentFormat = timeFormats[i];

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
     * @function {static} o2.DateHelper.getTime
     *
     * <p>An alias to {@link o2.now}.</p>
     *
     * @see o2.now
     */
    def(me, 'getTime', function() {
        return now();
    });

    /**
     * @function {static} o2.DateHelper.now
     *
     * <p>An alias to {@link o2.now}.</p>
     *
     * @see o2.now
     */
    alias(me, 'now', 'getTime');
}(this.o2));
