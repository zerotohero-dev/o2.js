require([
    '/o2/core',
    '/o2/string/core'
], function(
    o2,
    StringUtil
) {
    'use strict';

        /*
         * # Module Exports
         */

     var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        $   = o2.$,
        now = o2.now,

        /*
         * string.core
         */
        format = StringUtil.format,

        /*
         * native
         */
        abs   = Math.abs,
        floor = Math.floor,

        /*
         * # i18n
         */

        //TODO: parse all "TODO"s and enter as issues to github.

        //TODO: make these configurable in o2.date.config.js.

        kAgo = 'ago',
        kCenturies = 'centuries',
        kDays = 'days',
        kFromNow = 'from now',
        kHours = 'hours',
        kJustNow = 'just now',
        kLastCentury = 'last century',
        kLastMonth = 'last month',
        kLastWeek = 'last week',
        kLastYear = 'last year',
        kMinutes = 'minutes',
        kMonths = 'months',
        kNextCentury = 'next century',
        kNextMonth = 'next month',
        kNextWeek = 'next week',
        kNextYear = 'next year',
        kOneHourAgo = 'an hour ago',
        kOneHourFromNow = 'an hour from now',
        kOneMinuteAgo = 'a minute ago',
        kOneMinuteFromNow = 'a minute from now',
        kSeconds = 'seconds',
        kTomorrow = 'tomorrow',
        kWeeks = 'weeks',
        kYears = 'years',
        kYesterday = 'yesterday',

        /*
         * {15} {days} {ago}.
         */
        kTokenizedText = '{0} {1} {2}',

        /*
         * Time Formats
         */
        timeFormats = [
            [60, kSeconds, 1],
            [120, kOneMinuteAgo, kOneMinuteFromNow],
            [3600, kMinutes, 60],
            [7200, kOneHourAgo, kOneHourFromNow],
            [86400, kHours, 3600],
            [172800, kYesterday, kTomorrow],
            [604800, kDays, 86400],
            [1209600, kLastWeek, kNextWeek],
            [2419200, kWeeks, 604800],
            [4838400, kLastMonth, kNextMonth],
            [29030400, kMonths, 2419200],
            [58060800, kLastYear, kNextYear],
            [2903040000, kYears, 29030400],
            [5806080000, kLastCentury, kNextCentury],
            [58060800000, kCenturies, 2903040000]
        ],

        /*
         * # Common Constants
         */

        kString = 'string',
        kEmpty  = '';

    exports.getPrettyDate = function(time, currTime) {
        var currentTime = currTime || $.now(),
            kInThePast = 1,
            kInTheFuture = 2,
            listChoice = kInThePast,
            seconds = (new Date(currentTime) - new Date(time)) / 1000,
            token = kAgo,
            i = 0,
            currentFormat = kEmpty;

        if (seconds < 0) {
            seconds = abs(seconds);
            token = kFromNow;
            listChoice = kInTheFuture;
        }

        i = 0;
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
    };

    exports.getTime = def(me, 'getTime', function() {
        return now();
    });

    exports.now = exports.getTime;

    return exports;
});
