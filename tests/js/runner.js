( function(window, UNDEFINED) {

    // @formatter:off
    var queue = [
        'demo'
    ];
    // @formatter:on

    function run() {
        var item = queue.pop();

        if(!item) {
        
            return;
        }
        
        var url = [item,'.html'].join('');
        
        var frame = document.getElementById('TestFrame');
        
        frame.src = url;
    }

    var Runner = {
        
        start : function() {
        
            run();
        
        }

    };

    Runner.start();

}(this));
