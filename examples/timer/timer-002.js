(function() {
    'use strict';

    var container = document.getElementById('Container'),
        i = 0, len, timer;


    function longOperation() {
        var i, len;

        for (i = 0, len = 1000000; i < len; i++) {
            container.setAttribute('foo', Math.sin((Math.random()/(0.1+Math.random()))*len*Math.PI));
        }

        return container.getAttribute('foo');
    }

    function calculateIndex() {
        return (i + 1) + '.' + longOperation();
    }

    timer = setTimeout(function loop() {
        container.innerHTML = '<h1>' + calculateIndex() + '</h1>';

        if (i <= 20) {
            setTimeout(loop, 0);
        }
    }, 0);
}());
