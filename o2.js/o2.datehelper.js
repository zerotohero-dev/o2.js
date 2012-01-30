/**
 * @module datehelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-30 11:20:30.667904
 * -->
 *
 * <p>A <code>Date</code> helper module.</p>
 */
(function(framework){
    'use strict';

    /*
     * i18n
     */
    var kSeconds = 'seconds';
    var kOneMinuteAgo = 'a minute ago';
    var kMinutes = 'minutes';
    var kOneMinuteFromNow = 'a minute from now';
    var kOneHourAgo = 'an hour ago';
    var kOneHourFromNow = 'an hour from now';
    var kHours = 'hours';
    var kYesterday = 'yesterday';
    var kTomorrow = 'tomorrow';
    var kDays = 'days';
    var kLastWeek = 'last week';
    var kNextWeek = 'next week';
    var kWeeks = 'weeks';
    var kLastMonth = 'last month';
    var kNextMonth = 'next month';
    var kMonths = 'months';
    var kLastYear = 'last year';
    var kNextYear = 'next year';
    var kYears = 'years';
    var kLastCentury = 'last century';
    var kNextCentury = 'next century';
    var kCenturies = 'centuries';
    var kAgo = 'ago';
    var kFromNow = 'from now';
    var kJustNow = 'just now';

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
    var kEmpty = '';
    var kBlank = ' ';
    var kString = 'string';

    /**
     * @class {static} o2.DateHelper
     *
     * <p>A date/time utilities class.</p>
     */
    var me = framework.DateHelper = {};

    /**
     * @function {static} o2.DateHelper.getPrettyDate
     *
     * <p>Prints a human-readable time string, by looking at the difference
     * between two timestamps.</p>
     *
     * @param {Integer} time - the offset time in milliseconds.
     * @param {Integer} currentTime - the base time in milliseconds.
     */
    me.getPrettyDate = function(time, currentTime) {
        var seconds = (new Date(currentTime) - new Date(time)) / 1000;
        var token = kAgo;
        var  listChoice = 1;

        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = kFromNow;
            listChoice = 2;
        }

        var i = 0;
        var format = timeFormats[i];

        while (format) {
            if (seconds < 5) {
                return kJustNow;
            }

            if (seconds < format[0]) {
                if (typeof format[2] === kString) {
                    return format[listChoice];
                }

                return [
                    Math.floor(seconds / format[2]),
                    kBlank,
                    format[1],
                    kBlank,
                    token
                ].join(kEmpty);
            }

            format = timeFormats[++i];
        }

        return time;
    };
}(this.o2));
