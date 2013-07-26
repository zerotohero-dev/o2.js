define([
    '../../core',
    '../../string/core',
    '../../string/submodule/transform'
], function(
    o2,
    StringUtil,
    Transform
) {
   'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = o2.$,
        t = o2.t,
        frameworkName = o2.name,

        /*
         * string.core
         */
        concat = StringUtil.concat,

        /*
         * string.transform
         */
        toCamelCase = Transform.toCamelCase,
        toDashedFromCamelCase = Transform.toDashedFromCamelCase,

        /*
         * # Common Constants
         */

        kBackgroundPositionX = 'background-position-x',
        kBackgroundPositionY = 'background-position-y',
        kCssFloat = 'cssFloat',
        kDisplay = 'display',
        kEmpty = '',
        kFloat = 'float',
        kHead = 'head',
        kHidden = 'hidden',
        kLeft = 'left',
        kLink = 'link',
        kM$ = 'MSIE',
        kNone = 'none',
        kOldDisplay = '_oldDisplay',
        kPixels = 'px',
        kRel = 'rel',
        kStyle = 'style',
        kString = 'string',
        kTextCss = 'text/css',
        kTitle = 'title',
        kTop = 'top',
        kVisibility = 'visibility',
        kZeroPx = '0px',
        kCssText = 'cssText',

        /*
         * # Common Regular Expressions
         */

        kRegNumber = /^-?\d/,
        kRegPixelNumber = /^-?\d+(?:px)?$/i,

        /*
         * # Minimal Browser Detection
         */

        isCrap = window.navigator.userAgent.indexOf(kM$) > -1 && !window.opera,

        /*
         * # To Be Overridden
         */

        hide,
        show,
        isVisible,
        getStyle;

    exports.activateAlternateStylesheet = function(title) {
        var links = t(kLink),
            linkTitle = kEmpty,
            shouldDisable = false,
            i,
            len,
            link;

        for (i = 0, len = links.length; i < len; i++) {
            link = links[i];
            linkTitle = link.getAttribute(kTitle);
            shouldDisable = link.getAttribute(kRel).indexOf(kStyle) !== -1 &&
                title;

            link.disabled = (linkTitle === title) ? false : shouldDisable;
        }
    };

    if(isCrap) {
        exports.addCssRules = function(cssText) {
            try {
                document.createStyleSheet().cssText = cssText;
            } catch(e) {
                var firstSheet = document.styleSheets[0];

                if(firstSheet) {
                    firstSheet.cssText = concat(firstSheet.cssText, cssText);
                }
            }
        };
    } else {
        exports.addCssRules = function(cssText) {
            var d = document.createElement(kStyle);

            d.type = kTextCss;
            d.textContent = cssText;

            document.getElementsByTagName(kHead)[0].appendChild(d);
        };
    }

    exports.addStyle = function(obj, style) {
        obj = $(obj);

        if (!obj) {return;}

        var key = null,
            toCamelCaseCached = toCamelCase,
            objStyle = obj.style;

        if (typeof style === kString) {
            if(objStyle.setAttribute) {
                objStyle.setAttribute(kCssText, style);

                return;
            }

            obj.setAttribute(kStyle, style);

            return;
        }

        for (key in style) {
            if (style.hasOwnProperty(key)) {
                if (key === kFloat) {
                    objStyle.cssFloat = style[key];
                } else {
                    objStyle[toCamelCaseCached(key)] = style[key];
                }
            }
        }
    };

    exports.setCss = exports.addStyle;

    exports.setStyle = exports.addStyle;

    /*
     *
     */
    function getStyleTextFromAttribute(obj) {
        var styleText = obj.getAttribute(kStyle);

        if(!styleText) {return kEmpty;}

        if (typeof styleText === kString) {
            return styleText;
        }

        return kEmpty;
    }

    /*
     *
     */
    function getInlineStyle(obj, cssProp) {

        //return the property if set inline.
        var val = obj.style[cssProp];

        if (val) {return val;}

        return null;
    }

    /*
     *
     */
    function prepareCssProperty(cssProperty) {
        if (cssProperty === kFloat) {
            return kCssFloat;
        }

        return toCamelCase(cssProperty);
    }

    if (document.defaultView && document.defaultView.getComputedStyle) {
        exports.getStyle = function(elm, cssProperty, isNoForce) {
            var noForce = !!isNoForce,
                obj = $(elm),
                defaultView = document.defaultView,
                cssProp = kEmpty,
                d = null;

            if (!obj) {return null;}

            if (!cssProperty) {
                return getStyleTextFromAttribute(obj);
            }

            cssProp = prepareCssProperty(cssProperty);

            if (noForce) {
                return getInlineStyle(obj, cssProp);
            }

            d = defaultView.getComputedStyle(obj, kEmpty).getPropertyValue(
                toDashedFromCamelCase(cssProp));

            if (cssProp === kBackgroundPositionY ||
                        cssProp === kBackgroundPositionX) {
                if(d === kTop || d === kLeft) {
                    d = kZeroPx;
                }
            }

            return d;
        };
    } else {
        exports.getStyle = function(elm, cssProperty, isNoForce) {
            var noForce = !!isNoForce,
                obj = $(elm),
                cssProp = kEmpty,
                camelizedCss = kEmpty,
                value = kEmpty,
                isImproper = false,
                left = kEmpty,
                runtimeLeft = kEmpty;

            if (!obj) {return;}

            if (!cssProperty) {
                return getStyleTextFromAttribute(obj);
            }

            cssProp = prepareCssProperty(cssProperty);

            if(noForce) {
                return getInlineStyle(obj, cssProp);
            }

            //TODO: factor out.
            if (obj.currentStyle) {
                camelizedCss = toCamelCase(cssProp);
                value = obj.currentStyle[camelizedCss];
                isImproper = !kRegPixelNumber.test(value) &&
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
                // we've done the conversion we set everything back to the
                // way it was.
                //
                // ref: http://ajaxian.com/archives/computed-vs-cascaded-style
                //
                if (isImproper) {
                    left = obj.style.left;
                    runtimeLeft = obj.runtimeStyle.left;

                    obj.runtimeStyle.left = obj.currentStyle.left;
                    obj.style.left = (value || 0);

                    value = concat(obj.style.pixelLeft, kPixels);

                    obj.runtimeStyle.left = runtimeLeft;
                    obj.style.left = left;

                    return value;
                }

                return value;
            }

            return null;
        };
    }

    getStyle = exports.getStyle;

    exports.getCss = exports.getStyle;

    exports.hide = function(elm) {
        var obj = $(elm);

        if (!obj) {return;}

        if (obj.style.display !== kNone) {
            obj[[frameworkName, kOldDisplay].join(kEmpty)] = obj.style.display;
        }

        obj.style.display = kNone;
    };

    /*
     *
     */
    hide = exports.hide;

    exports.show = function(elm) {
        var obj = $(elm);

        if (!obj) {return;}

        obj.style.display = obj[
            [frameworkName, kOldDisplay].join(kEmpty)
        ] || kEmpty;

        delete obj[[frameworkName, kOldDisplay].join(kEmpty)];
    };

    /*
     *
     */
    show = exports.show;

    exports.isVisible = function(obj) {
        obj = $(obj);

        if (!obj) {return false;}

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

        var display = getStyle(obj, kDisplay),
            visibility = getStyle(obj, kVisibility);

        if (visibility === kHidden) {return false;}
        if (display === kNone) {return false;}

        return ((obj.offsetWidth !== 0 || obj.offsetHeight !== 0)) ||
            ((display ===  null) && (visibility !== kHidden)) ||
            ((visibility ===  null) && (display !== kNone)) ||
            ((display !== kNone) && (visibility !== kHidden));
    };

    /*
     *
     */
    isVisible = exports.isVisible;

    exports.toggleVisibility = function(elm, state) {
        var obj = $(elm);

        if (!obj) {return;}

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
    };

    return exports;
});
