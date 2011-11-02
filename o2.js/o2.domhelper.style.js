/**
 * @module domhelper.style
 * @requires domhelper.core
 * @requires stringhelper.transform
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
(function(framework, window, document) {
   'use strict';

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var $ = framework.$;
    var t = framework.t;
    var myName = framework.name;
    var toCamelCase = framework.StringHelper.toCamelCase;
    var toDashedFromCamelCase = framework.StringHelper.toDashedFromCamelCase;

    /*
     * Common strings.
     */
    var kObject = 'object';
    var kOldDisplay = '_oldDisplay';
    var kNone = 'none';
    var kHidden = 'hidden';
    var kEmpty = '';
    var kDisplay = 'display';
    var kVisibility = 'visibility';
    var kTitle = 'title';
    var kLink = 'link';
    var kRel = 'rel';
    var kStyle = 'style';

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
     * @param {Object} obj - the current <code>DOM</code> node, or the
     * <strong>id</strong> of that node, to add styles to.
     * @param {Object} style - styles in the form <code>{style1:value1,
     * style2:value2}</code>.
     */
    me.addStyle = function(obj, style) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var toCamelCaseCached = toCamelCase;
        var key = null;

        for (key in style) {
            if (style.hasOwnProperty(key)) {
                if (key === 'float') {
                    obj.style.cssFloat = style[key];
                } else {
                    obj.style[toCamelCaseCached(key)] = style[key];
                }
            }
        }
    };

    //TODO: add documentation.
    me.setStyle = function(obj, style) {
        me.addStyle(obj, style);
    };



    /**
     * @function {static} o2.DomHelper.getStyle
     *
     * <p>Gets the <strong>style</strong> of a given property of the element.</p>
     * <p>Tries to parse the <code>currentStyle</code>, if available; otherwise
     * tries to calculate the style using <code>window.getComputedStyle</code>;
     * gets <code>obj.style</code> if everything else fails.
     *
     * <p>Note that adding and removing style attributes to a
     * <strong>DOM</strong> not is considered "bad practice". Do not use inline
     * styles to modify the view;
     * assign <strong>className</strong>'s instead of <strong>style</strong>
     * values.</p>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of it, to
     * check.
     * @param {String} cssProperty - the css property either
     * <strong>dash-separated</strong>
     * or <strong>camelCased</strong> (i.e.: 'border-color' or 'borderColor')
     *
     * @return the calculated <strong>style</strong> value.
     */
     //TODO: modify documentation (extra param)
    me.getStyle = function(obj, cssProperty, noForce) {
        obj = $(obj);

        if (!obj) {
            return null;
        }

        if (document.defaultView && document.defaultView.getComputedStyle) {
            me.getStyle = function(obj, cssProperty, noForce) {
                obj = $(obj);
                noForce = !!noForce;

                if (!obj) {
                    return null;
                }

                var defaultView = document.defaultView;

                if(cssProperty === 'float') {
                    cssProperty = 'cssFloat';
                } else {
                    cssProperty = toCamelCase(cssProperty);
                }

                if(noForce) {
                    //return the property if set inline.
                    var val = obj.style[cssProperty];

                    if (val) {
                        return val;
                    }

                    return null;
                }

                return defaultView.getComputedStyle(obj, kEmpty
                    ).getPropertyValue(toDashedFromCamelCase(cssProperty));

            };

            return me.getStyle(obj, cssProperty);
        }

        me.getStyle = function(obj, cssProperty, noForce) {
            obj = $(obj);
            noForce = !!noForce;

            if (!obj) {
                return;
            }

            var defaultView = window;

            if(cssProperty === 'float') {
                cssProperty = 'cssFloat';
            } else {
                cssProperty = toCamelCase(cssProperty);
            }

            var camelizedCss = toCamelCase(cssProperty);

            if(noForce) {
                var val = obj.style[cssProperty];

                if (val) {
                    return val;
                }

                return null;
            }

            if (obj.currentStyle) {
                var value = obj.currentStyle[camelizedCss];
                var kRegPixelNumber = /^-?\d+(?:px)?$/i;
                var kRegNumber = /^-?\d/;
                var isImproper = !kRegPixelNumber.test(value) &&
                    kRegNumber.test(value);

                //
                // Dean Edwards:
                //
                // MSIE6+ has special pixelLeft/Width/Height etc properties.
                // They represent the current pixel value of the equivalent
                // style setting.
                // So, if you have style.width=8em then style.pixelWidth would
                // return the pixel equivalent. MSIE also supports an override
                // style called runtimeStyle.
                //
                // Setting properties on runtimeStyle overrides all other style
                // properties.
                //
                // This trick works by setting style.left and then getting MSIE
                // to convert it by calling style.pixelLeft.
                //
                // To stop the element moving around the screen when we do this,
                // we set runtimeStyle.left with the current left value. After
                // we’ve done the conversion we set everything back to the
                // way it was.
                //
                // ref: http://ajaxian.com/archives/computed-vs-cascaded-style
                //
                if (isImproper) {
                    var left = obj.style.left;
                    var runtimeLeft = obj.runtimeStyle.left;

                    obj.runtimeStyle.left = obj.currentStyle.left;
                    obj.style.left = (value || 0);
                    value = obj.style.pixelLeft + 'px';

                    obj.style.left = left;
                    obj.runtimeStyle.left = runtimeLeft;

                    return value;
                }

                return value;
            }

            return null;
        };

        return me.getStyle(obj, cssProperty, noForce);
    };

    /**
     * @function {static} o2.DomHelper.isVisible
     *
     * <p>Checks whether the <strong>DOM</strong> node is visible.</p>
     * <p>Note that being visible does not necessarily mean being available
     * inside the <strong>viewport</strong>.</p>
     * <p>If a <strong>DOM</strong> node has <code>display == 'none'</code>
     * or <code>visibility == 'hidden'</code> <strong>CSS</strong> properties,
     * then it's regarded as "invisible", otherwise it is considered to be
     * "visible".</p>
     *
     * @param {Object} obj - the <strong>DOM</strong> element, or the
     * <strong>id</strong> of it, to test.
     *
     * @return <code>true</code> if the element is visible, <code>false</code>
     * otherwise.
     */
    me.isVisible = function(obj) {
        obj = $(obj);

        if (!obj) {
            return false;
        }

        // has offset dimensions
        // OR display IN (inline,block,'')
        // OR visibility in ('visible','')
        //
        // getStyle returns null if it cannot
        // reliably determine the style (this happens in archaic
        // browsers).
        //
        // So if there's no inline display/visibility attribute is set
        // and cannot acquire those attributes
        // from the computed style, then the method fails and returns
        // false.

        var display = me.getStyle(obj, kDisplay);
        var visibility = me.getStyle(obj, kVisibility);

        if (visibility === kHidden) {
            return false;
        }

        if (display === kNone) {
            return false;
        }

        return ((obj.offsetWidth !== 0 || obj.offsetHeight !== 0   )) ||
               ((display    ===  null  ) && (visibility !== kHidden)) ||
               ((visibility ===  null  ) && (display    !== kNone  )) ||
               ((display    !== kNone  ) && (visibility !== kHidden));
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
        var links = t(kLink);
        var shouldDisable = false;
        var linkTitle = kEmpty;
        var i = 0;
        var len = 0;

        for (i = 0, len = links.length; i < len; i++) {
            link = links[i];
            linkTitle = link.getAttribute(kTitle);
            shouldDisable = link.getAttribute(kRel).indexOf(kStyle) !== -1 &&
                title;
            link.disabled = (linkTitle === title) ? false : shouldDisable;
        }
    };

    /**
     * @function {static} o2.DomHelper.hide
     *
     * <p>Hides the given object.</p>
     *
     * @param {Object} obj - the <strong>DOM</strong> node, or the
     * <strong>id</strong> to hide.
     */
    me.hide = function(obj) {
        if (!obj || typeof obj !== kObject) {
            return;
        }

        if (obj.style.display !== kNone) {
            obj[[myName, kOldDisplay].join(kEmpty)] = obj.style.display;
        }

        obj.style.display = kNone;
    };

    /**
     * @function {static} o2.DomHelper.show
     *
     * <p>Shows the given object.</p>
     *
     * @param {Object} obj - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of it, to show.
     */
    me.show = function(obj) {
        if (!obj || typeof obj !== kObject) {
            return;
        }

        obj.style.display = obj[[myName, kOldDisplay].join(kEmpty)] || kEmpty;

        delete obj[[myName, kOldDisplay].join(kEmpty)];
    };

}(this.o2, this, this.document));
