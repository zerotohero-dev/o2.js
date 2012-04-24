/**
 * @module   dom.style
 * @requires core
 * @requires dom.core
 * @requires string.core
 * @requires string.transform
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-24 09:46:03.289550
 * -->
 *
 * <p>A utility package to
 * <strong>add</strong>/<strong>remove</strong>/<strong>modify</strong>
 * styles.</p>
 */
(function(framework, window, document, undefined) {
   'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Dom';

    /*
     * Dom (style)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $      = require('$');
    var t      = require('t');
    var myName = require('name');

    var kString               = 'String';
    var concat                = require(kString, 'concat');
    var toCamelCase           = require(kString, 'toCamelCase');
    var toDashedFromCamelCase = require(kString, 'toDashedFromCamelCase');

    var createElement        = attr(document, 'createElement');
    var getElementsByTagName = attr(document, 'getElementsByTagName');

    /*
     * Common Constants
     */
    var kBackgroundPositionX = 'background-position-x';
    var kBackgroundPositionY = 'background-position-y';
    var kCssFloat            = 'cssFloat';
    var kDisplay             = 'display';
    var kEmpty               = '';
    var kFloat               = 'float';
    var kHead                = 'head';
    var kHidden              = 'hidden';
    var kLeft                = 'left';
    var kLink                = 'link';
    var kM$                  = 'MSIE';
    var kNone                = 'none';
    var kOldDisplay          = '_oldDisplay';
    var kPixels              = 'px';
    var kRel                 = 'rel';
    var kStyle               = 'style';
    var kTextCss             = 'text/css';
    var kTitle               = 'title';
    var kTop                 = 'top';
    var kVisibility          = 'visibility';
    var kZeroPx              = '0px';

    /*
     * Common Regular Expressions
     */
    var kRegNumber      = /^-?\d/;
    var kRegPixelNumber = /^-?\d+(?:px)?$/i;

    /**
     * @function {static} o2.Dom.activateAlternateStylesheet
     *
     * <p>Activates the <strong>alternate stylesheet</strong> with the given
     * <code>title</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.activateAlternateStylesheet('alternateTheme');
     * </pre>
     *
     * @param {String} title - the <code>title</code> of the <strong>alternate
     * stylesheet</strong> to activate.
     */
    def(me, 'activateAlternateStylesheet', function(title) {
        var i             = 0;
        var len           = 0;
        var link          = null;
        var links         = t(kLink);
        var linkTitle     = kEmpty;
        var shouldDisable = false;

        for (i = 0, len = links.length; i < len; i++) {
            link = links[i];
            linkTitle = link.getAttribute(kTitle);
            shouldDisable = link.getAttribute(kRel).indexOf(kStyle) !== -1 &&
                title;
            link.disabled = (linkTitle === title) ? false : shouldDisable;
        }
    });

    /*
     *
     */
    var isCrap = window.navigator.userAgent.indexOf(kM$) > -1 && !window.opera;

    if(isCrap) {

        /**
         * @function {static} o2.Dom.addCssRules
         *
         * <p>Adds the CSS rules given in the <strong>cssText</strong> parameter
         * to the document.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Dom.addCssRules(
         *      'div.warning { background-color:#c00; color:#fff };'
         * );
         * </pre>
         */
        def(me, 'addCssRules', function(cssText) {
            try {
                document.createStyleSheet().cssText = cssText;
            } catch(e) {
                var firstSheet = document.styleSheets[0];

                if(firstSheet) {
                    firstSheet.cssText = concat(firstSheet.cssText, cssText);
                }
            }
        });
    } else {
        def(me, 'addCssRules', function(cssText) {
            var d         = createElement(kStyle);
            d.type        = kTextCss;
            d.textContent = cssText;

            getElementsByTagName(kHead)[0].appendChild(d);
        });
    }

    /**
     * @function {static} o2.Dom.addStyle
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
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.addStyle('container', {color : '#bada55'})
     * </pre>
     *
     * @param {Object} obj - the current <code>DOM</code> node, or the
     * <strong>id</strong> of that node, to add styles to.
     * @param {Object} style - styles in the form <code>{style1:value1,
     * style2:value2}</code>.
     */
    def(me, 'addStyle', function(obj, style) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var key               = null;
        var toCamelCaseCached = toCamelCase;

        var objStyle = obj.style;


        for (key in style) {
            if (style.hasOwnProperty(key)) {
                if (key === kFloat) {
                    objStyle.cssFloat = style[key];
                } else {
                    objStyle[toCamelCaseCached(key)] = style[key];
                }
            }
        }
    });

    /**
     * @function {static} o2.Dom.setCss
     *
     * <p>An alias to {@link o2.Dom.addStyle}.</p>
     *
     * @see o2.Dom.addStyle
     */
    alias(me, 'setCss', 'addStyle');

    /**
     * @function {static} o2.Dom.setStyle
     *
     * <p>An alias to {@link o2.Dom.addStyle}.</p>
     *
     * @see o2.Dom.addStyle
     */
    alias(me, 'setStyle', 'addStyle');


    if (document.defaultView && document.defaultView.getComputedStyle) {

        /**
         * @function {static} o2.Dom.getStyle
         *
         * <p>Gets the <strong>style</strong> of a given property of
         * the element.</p>
         * <p>Tries to parse the <code>currentStyle</code>, if available;
         * otherwise tries to calculate the style using
         * <code>window.getComputedStyle</code>;
         * gets <code>obj.style</code> if everything else fails.
         *
         * <p>Note that adding and removing style attributes to a
         * <strong>DOM</strong> not is considered "bad practice". Do not use
         * inline styles to modify the view;
         * assign <strong>className</strong>'s instead of <strong>style</strong>
         * values.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var color = o2.Dom.getStyle('container', 'color');
         * </pre>
         *
         * @param {Object} obj - the element, or the <strong>id</strong> of it,
         * to check.
         * @param {String} cssProperty - the css property either
         * <strong>dash-separated</strong>
         * or <strong>camelCased</strong> (i.e.: 'border-color' or
         * 'borderColor')
         * @param {Boolean} noForce - (optional; defaults to <code>false</code>)
         * if <code>true</code> inherited values from the CSS files will also be
         * parsed, otherwise, only inline styles will be parsed.
         *
         * @return the calculated <strong>style</strong> value.
         */
        def(me, 'getStyle', function(obj, cssProperty, noForce) {
            noForce = !!noForce;
            obj     = $(obj);

            if (!obj) {
                return null;
            }

            var defaultView = document.defaultView;
            var cssProp = cssProperty;

            if (cssProperty === kFloat) {
                cssProp = kCssFloat;
            } else {
                cssProp = toCamelCase(cssProperty);
            }

            if (noForce) {
                //return the property if set inline.
                var val = obj.style[cssProp];

                if (val) {
                    return val;
                }

                return null;
            }

            var d = defaultView.getComputedStyle(obj, kEmpty
                ).getPropertyValue(toDashedFromCamelCase(cssProp));

            if (cssProp === kBackgroundPositionY ||
                        cssProp === kBackgroundPositionX) {
                if(d === kTop || d === kLeft) {
                    d = kZeroPx;
                }
            }

            return d;
        });
    } else {
        def(me, 'getStyle', function(obj, cssProperty, noForce) {
            noForce = !!noForce;
            obj     = $(obj);

            if (!obj) {
                return;
            }

            var cssProp = cssProperty;

            if (cssProperty === kFloat) {
                cssProp = kCssFloat;
            } else {
                cssProp = toCamelCase(cssProperty);
            }

            var camelizedCss = toCamelCase(cssProp);

            if(noForce) {
                var val = obj.style[cssProp];

                if (val) {
                    return val;
                }

                return null;
            }

            if (obj.currentStyle) {
                var value      = obj.currentStyle[camelizedCss];
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
                    value = concat(obj.style.pixelLeft, kPixels);

                    obj.style.left = left;
                    obj.runtimeStyle.left = runtimeLeft;

                    return value;
                }

                return value;
            }

            return null;
        });
    }

    /**
     * @function {static} o2.Dom.getCss
     *
     * <p>An alias to {@link o2.Dom.getStyle}.</p>
     *
     * @see o2.Dom.getStyle
     */
    alias(me, 'getCss', 'getStyle');

    /**
     * @function {static} o2.Dom.hide
     *
     * <p>Hides the given object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.hide('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOM</strong> node, or the
     * <strong>id</strong> to hide.
     */
    def(me, 'hide', function(elm) {
        var obj = $(elm);

        if (!obj) {
            return;
        }

        if (obj.style.display !== kNone) {
            obj[[myName, kOldDisplay].join(kEmpty)] = obj.style.display;
        }

        obj.style.display = kNone;
    });

    /*
     *
     */
    var hide = require(kModuleName, 'hide');

    /**
     * @function {static} o2.Dom.show
     *
     * <p>Shows the given object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.show('container');
     * </pre>
     *
     * @param {Object} elm - the <strong>DOM</strong> node, or the
     * <strong>id</strong> of it, to show.
     */
    def(me, 'show', function(elm) {
        var obj = $(elm);

        if (!obj) {
            return;
        }

        obj.style.display = obj[[myName, kOldDisplay].join(kEmpty)] || kEmpty;

        delete obj[[myName, kOldDisplay].join(kEmpty)];
    });

    /*
     *
     */
    var show = require(kModuleName, 'show');

    /**
     * @function {static} o2.Dom.isVisible
     *
     * <p>Checks whether the <strong>DOM</strong> node is visible.</p>
     * <p>Note that being visible does not necessarily mean being available
     * inside the <strong>viewport</strong>.</p>
     * <p>If a <strong>DOM</strong> node has <code>display == 'none'</code>
     * or <code>visibility == 'hidden'</code> <strong>CSS</strong> properties,
     * then it's regarded as "invisible", otherwise it is considered to be
     * "visible".</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isContainerVisible = o2.Dom.isVisible('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOM</strong> element, or the
     * <strong>id</strong> of it, to test.
     *
     * @return <code>true</code> if the element is visible, <code>false</code>
     * otherwise.
     */
    def(me, 'isVisible', function(obj) {
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
    });

    /*
     *
     */
    var isVisible = require(kModuleName, 'isVisible');

    /**
     * @function {static} o2.Dom.toggleVisibility
     *
     * <p>Toggles the visibility of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.toggleVisibility('container');
     * </pre>
     *
     * @param {Object} elm - a <strong>DOM</strong> reference or its
     * <code>String</code> id.
     * @param {Boolean} state - (Optional, defaults to <code>undefined</code>)
     * if <code>true</code>, show the item; if <code>false</code> hides the
     * item; if <code>undefined</code> simply toggles the visibility of the
     * item.
     */
    def(me, 'toggleVisibility', function(elm, state) {
        var obj = $(elm);

        if (!obj) {
            return;
        }

        if (state !== undefined) {
            if (state) {
                show(elm);

                return;
            }

            hide(elm);

            return;
        }

        if (isVisible(elm)) {
            hide(elm);

            return;
        }

        show(elm);
    });
}(this.o2, this, this.document));
