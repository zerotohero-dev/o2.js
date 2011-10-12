/*global o2*/
( function(window, UNDEFINED) {

    /*
     * Aliases.
     */
    var init = o2.Debugger.init;
    var log = o2.Debugger.log;
    var assert = o2.Debugger.assert;
    var scrollToBottom = o2.DomHelper.scrollWindowToBottom;

    // @formatter:off
    var queue = [
        'o2.ajaxcontroller',
        'o2.ajax',
        'o2.ajaxstate',
        'o2.collectionhelper',
        'o2.cookie',
        'o2.debugger',
        'o2.domhelper.class',
        'o2.domhelper.core',
        'o2.domhelper.dimension',
        'o2.domhelper.form',
        'o2.domhelper.load',
        'o2.domhelper.ready',
        'o2.domhelper.scroll',
        'o2.domhelper.style',
        'o2.domhelper.traverse',
        'o2.effect',
        'o2.eventhandler.core',
        'o2.eventhandler.extend',
        'o2.extend',
        'o2',
        'o2.jsonpcontroller',
        'o2.jsonp',
        'o2.jsonpstate',
        'o2.methodhelper.core',
        'o2.methodhelper.extend',
        'o2.objecthelper',
        'o2.queryparser',
        'o2.sortdelegate',
        'o2.stringhelper.core',
        'o2.stringhelper.encode',
        'o2.stringhelper.strip',
        'o2.stringhelper.transform',
        'o2.supports',
        'o2.template',
        'o2.try',
        'o2.unit',
        'o2.validator.core',
        'o2.validator.regexp'      
    ];
    // @formatter:on

    var state = {
        currentQueueItem : null,
        totalSuccessCount : 0,
        totalFailureCount : 0,
        results : {}
    };

    function run() {

        var item = queue.pop();
        
        var kFrameId = 'TestFrame';
        var kFileExtension = '.html';

        state.currentQueueItem = item;

        if(!item) {
            // @formatter:off
            assert(state.totalFailureCount === 0, [
                '<p><b>All done!</b> ',
                'Total failure count: <b>', state.totalFailureCount, '</b>, ',
                'Total success count: <b>', state.totalSuccessCount, '</b>.</p>'
            ].join(''));
            // @formatter:on

            return;
        }

        var url = [item, kFileExtension].join('');

        var frame = document.getElementById(kFrameId);

        frame.src = url;

    }

    /**
     *
     */
    function next(meta) {

        var successCount = meta.successCount;
        var failureCount = meta.failureCount;

        state.results[state.currentQueueItem] = {
            successCount : successCount,
            failureCount : failureCount
        };

        run();

    }

    var Runner = window.Runner = {

        /**
         *
         */
        processCompletedSuite : function(unit) {

            var successCount = unit.getGlobalSuccessCount();
            var failureCount = unit.getGlobalFailureCount();

            //
            state.totalSuccessCount += successCount;
            state.totalFailureCount += failureCount;

            // @formatter:off
            assert(failureCount===0, [
                '<p>Test suite <b>"<a href="', 
                state.currentQueueItem,
                '.html">', state.currentQueueItem, '</a>"</b> has been completed. ', 
                'Succes count: <b>', successCount, '</b> failure count: <b>', failureCount, '</b>.</p>'
            ].join(''));
            // @formatter:on

            scrollToBottom();

            next({
                successCount : unit.getGlobalSuccessCount(),
                failureCount : unit.getGlobalFailureCount()
            });

        },

        start : function() {
            
            var kOutputContainerId = 'Output';

            init(kOutputContainerId, true);
            log('<p>Started <b>"Test Suite Runner"</b>.</p>');

            run();

        }

    };

    Runner.start();

}(this));
