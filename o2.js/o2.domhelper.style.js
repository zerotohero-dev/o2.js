/*global o2 */

if(!o2.DomHelper) {
    o2.DomHelper = {};
}

/**
 * @module o2.domhelper.style
 * @requires o2
 * @requires o2.stringhelper.transform
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package to
 * <strong>add</strong>/<strong>remove</strong>/<strong>modify</strong>
 * styles.</p>
 */
( function(me, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var toCamelCase = o2.StringHelper.toCamelCase;
    var toDashedFromCamelCase = o2.StringHelper.toDashedFromCamelCase;

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            regExp : {
                CAMEL_CASE : /(\-[a-z])/g,
                ALL_CAPS : /([A-Z])/g
            },
            text : {
                DASH : '-'
            }
        }
    };

    /**
     * @function {static} o2.DomHelper.addStyle
     *
     * <p>Adds style attributes to a <code>DOM</code> node.</p>
     *
     * <p>Note that adding and removing style attributes to a
     * <strong>DOM</strong>
     * not is considered "bad practice". Do not use inline styles to modify the
     * view;
     * assign <strong>className</strong>'s instead of <strong>style</strong>
     * values.</p>
     *
     * @param {DomNode} obj - the current <code>DOM</code> node to add styles to.
     * @param {Object} style - styles in the form <code>{style1:value1,
     * style2:value2}</code>.
     */
    me.addStyle = function(obj, style) {

        var toCamelCaseCached = toCamelCase;

        if(!obj || typeof obj != 'object') {
            
            return;
        }

        for(var key in style) {
            if(style.hasOwnProperty(key)) {
                obj.style[toCamelCaseCached(key)] = style[key];
            }
        }

    };

    /**
     * @function {static} o2.DomHelper.getStyle
     *
     * <p>Gets the <strong>style</strong> of a given property of the element.</p>
     * <p>Tries to parse the <code>currentStyle</code>, if available; otherwise
     * tries
     * to calculate the style using <code>window.getComputedStyle</code>; gets
     * <code>obj.style</code> if everything else fails.
     *
     * <p>Note that adding and removing style attributes to a
     * <strong>DOM</strong>
     * not is considered "bad practice". Do not use inline styles to modify the
     * view;
     * assign <strong>className</strong>'s instead of <strong>style</strong>
     * values.</p>
     *
     * @param {DomNode} obj - the element to check.
     * @param {String} cssProperty - the css property either
     * <strong>dash-separated</strong>
     * or <strong>camelCased</strong> (i.e.: 'border-color' or 'borderColor')
     * @return the calculated <strong>style</strong> value.
     */
    me.getStyle = function(obj, cssProperty) {

        if(document.defaultView) {
            me.getStyle = function(obj, cssProperty) {

                var defaultView = document.defaultView;
                cssProperty = toCamelCase(cssProperty);

                if(!obj || typeof obj != 'object') {
                    
                    return null;
                }

                //return the property if set inline.
                var val = obj.style[cssProperty];

                if(val) {
                    
                    return val;
                }

                if(obj.currentStyle) {
                    
                    return obj.currentStyle[cssProperty];
                }

                if(defaultView.getComputedStyle) {
                    
                    return defaultView.getComputedStyle(obj, '').getPropertyValue(toDashedFromCamelCase(cssProperty));
                }

                return null;

            };

            return me.getStyle(obj, cssProperty);
        }

        me.getStyle = function(obj, cssProperty) {

            var defaultView = window;
            cssProperty = toCamelCase(cssProperty);

            if(!obj || typeof obj != 'object') {
                
                return null;
            }

            var val = obj.style[cssProperty];

            if(val) {
                
                return val;
            }

            if(obj.currentStyle) {
                
                return obj.currentStyle[cssProperty];
            }

            if(defaultView.getComputedStyle) {
                
                return defaultView.getComputedStyle(obj, '').getPropertyValue(toDashedFromCamelCase(cssProperty));
            }

            return null;

        };

        return me.getStyle(obj, cssProperty);
    };

    /**
     * @function {static} o2.DomHelper.isVisible
     *
     * <p>Checks whether the <strong>DOM</strong> node is visible.</p>
     * <p>Note that being visible does not necessarily mean being available
     * inside
     * the <strong>viewport</strong>.</p>
     * <p>If a <strong>DOM</strong> node has <code>display == 'none'</code>
     * <strong>CSS</strong> property, then it's
     * regarded as "invisible", otherwise it is considered to be "visible".</p>
     *
     * @param {DomNode} obj - the <strong>DOM</strong> element to test.
     * @return <code>true</code> if the element is visible, <code>false</code>
     * otherwise.
     */
    me.isVisible = function(obj) {

        if(!obj || typeof obj != 'object') {
            
            return false;
        }

        return (obj.offsetWidth !== 0 || obj.offsetHeight !== 0) || (o2.DomHelper.getStyle(obj, 'display') != 'none');
        // even if it's not visible; it takes up space -- && getStyle(obj,
        // 'visibility') == 'visible');

    };

    /**
     * @function {static} o2.DomHelper.activateAlternateStylesheet
     *
     * <p>Activates the <strong>alternate stylesheet</strong> with the given
     * <code>title</code>.</p>
     *
     * @param {String} title - the <code>title</code> of the <strong>alternate
     * stylesheet</strong> to activate.
     */
    me.activateAlternateStylesheet = function(title) {

        var link = null;
        var t = o2.t;
        var links = t('link');
        var shouldDisable = false;
        var linkTitle = '';

        for(var i = 0, len = links.length; i < len; i++) {
            link = links[i];
            linkTitle = link.getAttribute('title');
            shouldDisable = link.getAttribute('rel').indexOf('style') != -1 && title;
            link.disabled = (linkTitle == title) ? false : shouldDisable;
        }

    };

    /**
     * @function {static}
     * <p>Hides the given object.</p>
     * @param {DomNode} obj - the <strong>DOM</strong> node to hide.
     */
    me.hide = function(obj) {

        if(!obj || typeof obj != 'object') {
            
            return;
        }

        if(obj.style.display != 'none') {
            obj.o2_oldDisplay = obj.style.display;
        }

        obj.style.display = 'none';

    };

    /**
     * @function {static} o2.DomHelper.show
     * <p>Shows the given object.</p>
     * @param {DomNode} obj - the <strong>DOM</strong> node to hide.
     */
    me.show = function(obj) {

        if(!obj || typeof obj != 'object') {
            
            return;
        }

        obj.style.display = obj.o2_oldDisplay ? obj.o2_oldDisplay : '';
        //
        delete obj.o2_oldDisplay;

    };

}(o2.DomHelper, this));
