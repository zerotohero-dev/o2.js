/*global o2 */

( function(framework, window, UNDEFINED) {
    //TODO: add documentation.
    
    var me = framework.DomHelper;

    me.loadScript = function(src) {

        var s = document.createElement('script');

        s.type = 'text/javascript';
        s.async = true;
        s.src = src;

        var x = document.getElementsByTagName('script')[0] || document.getElementsByTagName('head')[0];

        x.parentNode.insertBefore(s, x);

    };


    me.loadCss = function(src) {

        var s = document.createElement('link');

        s.setAttribute('rel', 'stylesheet');
        s.type = 'text/css';
        s.href = src;

        var x = document.getElementsByTagName('head')[0];

        x.appendChild(s);

    };

}(o2, this));
