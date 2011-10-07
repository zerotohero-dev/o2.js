( function(window, UNDEFINED) {

    // @formatter:off
    var queue = [
        'demo'
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

            return;
        }

        var url = [item, '.html'].join('');

        var frame = document.getElementById('TestFrame');

        frame.src = url;
    }

    var Runner = window.Runner = {

        next : function(meta) {

            var successCount = meta.successCount;
            var failureCount = meta.failureCount;

            state.results[state.currentQueueItem] = {
                successCount : successCount,
                failureCount : failureCount
            };
            
            o2.Debugger.log('next...');
            console.dir(state);
            
            run();
        },

        start : function() {
            o2.Debugger.init('Output', true);
            o2.Debugger.log('started...');
            run();

        }

    };

    Runner.start();

}(this));
