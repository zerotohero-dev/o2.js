/**
 * @module datehelper
 * 
 * <p>A <code>Date</code> helper module.</p>
 */
(function(framework){
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

    framework.DateHelper = {

        //TODO: add documentation.
        getPrettyDate : function(time, currentTime) {

            var seconds = (new Date(currentTime) - new Date(time)) / 1000;
            var token = kAgo;
            var  listChoice = 1;

            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = kFromNow;
                listChoice = 2;
            }

            var i = 0;
            var format = '';

            while (format = timeFormats[i++]) {
                if(seconds < 5) {
                    return kJustNow;
                }

                if (seconds < format[0]) {
                    if (typeof format[2] === 'string') {
                        return format[listChoice];
                    }

                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                }
            }

            return time;
        }
    };
}(window.o2));
