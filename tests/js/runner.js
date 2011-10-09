( function(window, UNDEFINED) {

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
        results : {}
    };

    function run() {
        var item = queue.pop();

        state.currentQueueItem = item;

        if(!item) {
            window.o2.Debugger.log('All done!');

            return;
        }

        var url = [item, '.html'].join('');

        var frame = document.getElementById('TestFrame');

        frame.src = url;
    }

    var Runner = window.Runner = {

        /**
         *
         */
        processCompletedSuite : function(unit) {

            window.Runner.next({
                successCount : unit.getGlobalSuccessCount(),
                failureCount : unit.getGlobalFailureCount()
            });

            window.scrollTop = window.scrollHeight;
            
        },

        /**
         *
         */
        next : function(meta) {

            var successCount = meta.successCount;
            var failureCount = meta.failureCount;

            state.results[state.currentQueueItem] = {
                successCount : successCount,
                failureCount : failureCount
            };

            window.o2.Debugger.log('next...');
            window.console.dir(state);

            run();

        },

        start : function() {

            window.o2.Debugger.init('Output', true);
            window.o2.Debugger.log('started...');

            run();

        }

    };

    Runner.start();

}(this));
