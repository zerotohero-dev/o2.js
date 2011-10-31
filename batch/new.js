/**
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <b>o2.js</b>
 * @project o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 * @author Volkan Ozcelik
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
comments
( function(window, UNDEFINED) {

    /**
     * Root namespace &ndash; magic goes here ;)
     * @namespace o2
    comments
    var framework = window.o2 = {

        /**
         * @function nill
         *
         * <p>An empty function.</p>
        comments
        nill : function() {
        },
        
        //TODO: add documentation.
        name : 'o2js',
        
        //TODO: add documentation.
        url : 'http://o2js.com',
        
        //TODO: add documentation.
        longName: 'o2.js JavaScript Framework',

        /**
         * @property {String} version
         *
         * <p>Project version.</p>
        comments
        version : '0.23',

        /**
         * <p>Project build number.</p>
         *
         * @property {String} build
        comments
        build : '201109251548',

        /**
         * @function {static} $
         *
         * <p>An alias for <code>document.getElementById</code>.</p>
         *
         * @param {Object} obj - the id to check.
         * @return document.getElementById(obj) if obj is a <code>String</code>;
         * obj itself otherwise.
         * @throws {Exception} if obj is <code>undefined</code>.
        comments
        $ : function(obj, UNDEFINED) {

            if(obj === UNDEFINED) {
                //TODO: to config.
                throw '$: Object is not defined';
            }

            if( typeof obj == 'string') {
                return document.getElementById(obj);
            }

            return obj ? obj : null;

        },

        /**
         * @function {static} t
         *
         * <p>A <code>getElementsByTagName</code> wrapper.</p>
         *
         * @param {String} tagName - the name of the tag to search.
         * @param {DOMNode} parent - (optional defaults to <code>document</code>)
         * the
         * parent container to search.
         * @return a collection of matching elements.
        comments
        t : function(tagName, parent) {
            
            //
            parent = framework.$(parent);

            var p = parent || document;

            return p.getElementsByTagName(tagName);

        },

        /**
         * @function {static} tt
         * <p>Acts similar to {link t} -- with one exception: The method
         * returns the first matched node, instead of returning a node
         * collection.</p>
         * @param {String} tagName - the name of the tag to search.
         * @param {DOMNode} parent - (optional defaults to <code>document</code>)
         * the
         * parent container to search.
         * @return the first matched element if found; <code>null</code>
         * otherwise.
        comments
        tt : function(tagName, parent) {
            
            //
            parent = framework.$(parent);            

            var result = framework.t(tagName, parent);

            return result ? result[0] : null;

        },

        /**
         * @function {static} ready
         *
         * <p>An alias for <code>DomHelper.ready</code>.</p>
         *
         * @param {Function} callback - The callback to execute when DOM is
         * ready.
        comments
        ready : function(callback) {

            framework.DomHelper.ready(callback);

        },

        /**
         * @function {static} load
         *
         * <p>An alias for <code>EventHandler.addEventListener(window, 'load',
         * callback)</code>.</p>
         *
         * @param {Function} callback - The callback to execute when window is
         * loaded.
        comments
        load : function(callback) {

            framework.EventHandler.addEventListener(window, 'load', callback);

        }

    };
}(this));
/*global ocomments

/**
 * @module stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <code>String</code> helper.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework;

    /*
     * Module Configuration
    comments
    var config = {

        /*
         *
        comments
        constants : {

            /*
             * @property {private const Integer}
             * StringHelper.config.constants.DEFAULT_RANDOM_LENGTH - default
             * length for
             * generating a random String.
            comments
            DEFAULT_RANDOM_LENGTH : 8,

            /*
             *
            comments
            RANDOM_CHAR_FEED : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',

            /*
             *
            comments
            GUID_MULTIPLIER : 10000,

            /*
             *
            comments
            regExp : {
                TRIM : /^\s+|\s+$/g,
                WHITESPACE : /\s+/g
            }

        }

    };

    /**
     * @class {static} StringHelper
     *
     * <p>A <code>String</code> helper <strong>class</strong>.</p>
    comments
    me.StringHelper = {

        /**
         * @function {static} StringHelper.generateGuid
         *
         * <p>Creates a globally unique identifier (i.e. <strong>GUID</strong>),
         * for that
         * browsing session.</p>
         *
         * @return a <strong>GUID</strong>.
        comments
        generateGuid : function() {

            return [(new Date()).getTime(), Math.floor(config.constants.GUID_MULTIPLIER * Math.random())].join('');

        },

        /**
         * @function {static} StringHelper.generateRandom
         *
         * <p>Generates a random <code>String</code>.</p>
         *
         * @param {Integer} length - (optional - default: {@link
         * StringHelper.config.constants.DEFAULT_RANDOM_LENGTH})
         *     length of the <code>String</code> to be generated.
         * @return the generated <code>String</code>.
        comments
        generateRandom : function(length) {

            var chars = config.constants.RANDOM_CHAR_FEED;

            var len = length || config.constants.DEFAULT_RANDOM_LENGTH;
            var charsLength = chars.length;
            var randomString = '';
            var randomNumber = 0;

            var buffer = [];

            for(var i = 0; i < len; i++) {
                randomNumber = Math.floor(Math.random() * charsLength);
                buffer.push(chars.substring(randomNumber, randomNumber + 1));
            }

            return buffer.join('');

        },

        /**
         * @function {static} StringHelper.concat
         *
         * <p>Concatanes all its arguments into a single <code>String</code>.
         * This is faster than adding those <code>String</code>s with
         * <code>+</code>.</p>
         *
         * @return the concataneted <code>String</code>.
        comments
        concat : function() {

            return Array.prototype.slice.call(arguments).join('');

        },

        /**
         * @function {static} StringHelper.format
         *
         * <p>Works similar to <strong>C#</strong>'s
         * <code>String.Format</code>.</p>
         * <p>Usage Example:<p>
         * <pre>
         * StrinHelper.format("Hello {0}. What's going on in {1}?", 'Ninja',
         * 'California');
         * //will return "Hello Ninja. What's going on in California"
         * </pre>
         *
         * @return the formated <code>String</code>.
        comments
        format : function(string) {

            var args = arguments;

            if(args.length === 0) {
            
                return null;
            }

            if(args.length == 1) {
            
                return args[0];
            }

            var pattern = RegExp(['{', '([0-', (args.length - 2), '])', '}'].join(''), 'g');

            return args[0].replace(pattern, function(match, index) {
            
                return args[+index + 1];
            
            });

        },

        /**
         * @function {static} StringHelper.remove
         *
         * <p>Simply removes the phrases that match the <code>RegExp</code> from
         * the
         * <code>String</code>.</p>
         *
         * @param {String} str - the <code>String</code> to process.
         * @param {RegExp} regExp - the <code>RegExp</code> to process agains.
         * @return the processed <code>String</code>.
        comments
        remove : function(str, regExp) {

            return str.replace(regExp, '');

        },

        /**
         * @function {static} StringHelper.trim
         *
         * <p>Trims white space from beginning and end of the
         * <code>String</code>.</p>
         *
         * @param {String} str - the <code>String</code> to process.
         * @param {Boolean} shouldCompact - Optional (default:
         * <code>false</code>)
         *     if <code>true</code>, multiple whitespace is compacted into single
         * whitespace.
         * @return the processed <code>String</code>.
        comments
        trim : function(str, shouldCompact) {
            
            //
            shouldCompact = shouldCompact || false;
            
            var constants = config.constants;
            var regExp = constants.regExp;

            return shouldCompact ? str.replace(regExp.WHITESPACE, ' ').replace(regExp.TRIM, '') : str.replace(regExp.TRIM, '');

        },

        //TODO: add documentation.
        strip : function(str) {

            return me.StringHelper.trim(str, false);

        },

        /**
         * @function {static} StringHelper.compact
         *
         * <p>Works identical to <code>StringHelper.trim(str,
         * true)</code>.</p>
         *
         * @param {String} str - the <code>String</code> to process.
         * @return the processed <code>String</code>.
         * @see StringHelper.trim
        comments
        compact : function(str) {

            return me.StringHelper.trim(str, true);

        }

    };

}(o2, this));
/*global o2comments

/**
 * @module stringhelper.encode
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>Responsible for encoding and decoding <code>String</code>s.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.StringHelper;

    /*
     * Module configuration.
    comments
    var config = {
        
        /*
         *
        comments
        map : {
            xssEncodeNoAmp : [{
                regExp : /</g,
                replace : '&#60;'
            }, {
                regExp : />/g,
                replace : '&#62;'
            }, {
                regExp : /"/g,
                replace : '&#34;'
            }, {
                regExp : /\'/g,
                replace : '&#34;'
            }],

            xssEncode : [{
                regExp : /&/g,
                replace : '&amp;'
            }, {
                regExp : /</g,
                replace : '&#60;'
            }, {
                regExp : />/g,
                replace : '&#62;'
            }, {
                regExp : /"/g,
                replace : '&#34;'
            }, {
                regExp : /\'/g,
                replace : '&#34;'
            }],

            encode : [{
                regExp : /&/g,
                replace : '&amp;'
            }, {
                regExp : /</g,
                replace : '&#60;'
            }, {
                regExp : />/g,
                replace : '&#62;'
            }, {
                regExp : /"/g,
                replace : '&#34;'
            }, {
                regExp : /\'/g,
                replace : '&#34;'
            }, {
                regExp : / /g,
                replace : '&nbsp;'
            }],

            decode : [{
                regExp : /&#60;|&lt;/g,
                replace : '<'
            }, {
                regExp : /&#62;|&gt;/g,
                replace : '>'
            }, {
                regExp : /&#34;|&quot;|&quott;/g,
                replace : '"'
            }, {
                regExp : /&#39;|&apos;|&aposs;/g,
                replace : "'"
            }, {
                regExp : /&#32;|&nbsp;/g,
                replace : ' '
            }, {
                regExp : /&#38;|&amp;/g,
                replace : '&'
            }]
        }
    };

    /*
     *
    comments
    var state = {
        tempDiv : null
    };

    /**
     * @function {static} StringHelper.xssEncode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities. Works similar to {link StringHelper.encode}, with an
     * exception that it does not encode whitespace characters.</p>
     * <p>This method is specially designed to prevent cross-site script
     * injection attacks.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @param {Boolean} shouldPreserveAmpersands - (Optional. Defaults to
     * <code>false</code>). If <code>true</code> & characters will not be
     * encoded, otherwise they will be.
     * @return the processed <code>String</code>.
    comments
    me.xssEncode = function(str, shouldPreserveAmpersands) {

        shouldPreserveAmpersands = !!shouldPreserveAmpersands;
        str = ['', str].join('');
        
        var map = shouldPreserveAmpersands ? config.map.xssEncodeNoAmp : config.map.xssEncode;
        var mapItem = null;

        for(var i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            str = str.replace(mapItem.regExp, mapItem.replace);
        }

        return str;

    };

    /**
     * @function {static} StringHelper.encode
     *
     * <p>Encodes special charaters to their corresponding <strong>HTML</strong>
     * entities.</p>
     * <p>If possible try using standard encoding methods like
     * <code>encodeURIComponent</code>,
     * instead of using this method.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @return the processed <code>String</code>.
    comments
    me.encode = function(str) {

        var map = config.map.encode;
        var mapItem = null;

        for(var i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            str = str.replace(mapItem.regExp, mapItem.replace);
        }

        return str;

    };

    /**
     * @function {static} StringHelper.decode
     *
     * <p>Decodes <strong>HTML</strong> entities back to normal characters.</p>
     * <p>If possible try using standard decoding methods like
     * <code>decodeURIComponent</code>, instead of using this method.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @return the processed <code>String</code>.
    comments
    me.decode = function(str) {

        var map = config.map.decode;
        var mapItem = null;

        for(var i = 0, len = map.length; i < len; i++) {
            mapItem = map[i];
            str = str.replace(mapItem.regExp, mapItem.replace);
        }

        return str;

    };

    /**
     * @function {static} StringHelper.escape
     *
     * <p>An <strong>alias</strong> to <code>encodeURIComponent</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process
     * @return the processed <code>String</code>.
    comments
    me.escape = function(str) {

        return encodeURIComponent(str);

    };

    /**
     * @function {static} StringHelper.encodeSafeHtml
     *
     * <p>Encodes the <code>String</code> by converting it into a text node and
     * returning the node's value.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @return the processed <code>String</code>.
    comments
    me.encodeSafeHtml = function(str) {

        var tmp = state.tempDiv;

        if(!tmp) {
            state.tempDiv = document.createElement('div');
        }

        tmp.innerHTML = '';
        tmp.appendChild(document.createTextNode(str));

        return tmp.innerHTML;

    };

}(o2, this));
/*global o2comments

/**
 * @module stringhelper.strip
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> stripping
 * operations.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.StringHelper;

    /*
     * Module configuration.
    comments
    var config = {

        /*
         *
        comments
        constants : {

            /*
             *
            comments
            regExp : {
                NON_ALPHA : /[^A-Za-z ]+/g,
                NON_ALPHANUMERIC : /[^A-Za-z0-9 ]+/g,
                NON_NUMERIC : /[^0-9-.]/g,
                NUMERIC : /[0-9]/g,
                TAG : /<[\/]?([a-zA-Z0-9]+)[^>\^<]*>/ig
            }

        }

    };

    /**
     * @function {static} StringHelper.stripNonAlpha
     *
     * <p>Removes non alphabetical characters from the <code>String</code>
     * (excluding
     * numbers).</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
    comments
    me.stripNonAlpha = function(str) {

        return str.replace(config.constants.regExp.NON_ALPHA, '');

    };

    /**
     * @function {static} StringHelper.stripNonAlphanumeric
     *
     * <p>Removes alpha numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
    comments
    me.stripNonAlphanumeric = function(str) {

        return str.replace(config.constants.regExp.NON_ALPHANUMERIC, '');

    };

    /**
     * @function {static} StringHelper.stripNonNumeric
     *
     * <p>Removes non numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
    comments
    me.stripNonNumeric = function(str) {

        return str.replace(config.constants.regExp.NON_NUMERIC, '');

    };

    /**
     * @function {static} StringHelper.stripNumeric
     *
     * <p>Removes numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
    comments
    me.stripNumeric = function(str) {

        return str.replace(config.constants.regExp.NUMERIC, '');

    };

    /**
     * @function {static} StringHelper.stripTags
     *
     * <p>Removes tags from the <code>String</code>.
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
    comments
    me.stripTags = function(str) {

        return str.replace(config.constants.regExp.TAG, '');

    };

}(o2, this));
/*global o2comments

/**
 * @module stringhelper.transform
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> transformation
 * operations.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.StringHelper;

    /**
     * @struct {private} StringHelper.config
     *
     * <p>Module configuration.</p>
    comments
    var config = {
        
        /**
         *
        comments
        constants : {
            
            /**
             * @property {private const Integer}
             * StringHelper.config.constants.TRUNCATION_LENGTH
             *
             * <p>Maximum length, after which the string is truncated with an
             * ellipsis
             * (...)</p>
            comments
            TRUNCATION_LENGTH : 100,
            
            /*
             *
            comments
            regExp : {
                BR_2_NL : /<br\s*\/?>/g,
                NL_2_BR : /\r\n|\n|\r/g,
                REMOVE_TAGS : /<[\/]?([a-zA-Z0-9]+)[^><]*>/ig,
                CAMEL_CASE : /(\-[a-z])/g,
                ALL_CAPS : /([A-Z])/g
            },
            
            /*
             *
            comments
            text : {
                ELLIPSIS : '&hellip;',
                DASH : '-',
                UNDERSCORE : '_',
                NEW_LINE : '\n',
                BR : '<br />'
            }
        }
    };

    /**
     * @function {static} StringHelper.br2nl
     *
     * <p>Replaces HTML [br /] tags with new line.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
    comments
    me.br2nl = function(str) {

        var constants = config.constants;

        return str.replace(constants.regExp.BR_2_NL, constants.text.NEW_LINE);

    };

    /**
     * @function {static} StringHelper.nl2br
     *
     * <p>Replaces new lines [\n] with HTML [br /] tags.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
    comments
    me.nl2br = function(str) {

        var constants = config.constants;

        return str.replace(constants.regExp.NL_2_BR, constants.text.BR);

    };

    /**
     * @function {static} StringHelper.removeTags
     *
     * <p>Removes all the <strong>HTML</strong> tags in the
     * <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @return the cleaned output.
    comments
    me.removeTags = function(str) {

        return str.replace(config.constants.regExp.REMOVE_TAGS, '');

    };

    /**
     * @function {static} StringHelper.truncate
     *
     * <p>Adds an ellipsis (&hellip;), if the length of the <code>String</code>
     * is
     * greater
     * than <code>maxLength</code>.</p>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {Integer} maxLen - Optional (defaults to
     * {@link StringHelper.config.constants.TRUNCATION_LENGTH},
     * maximum <code>String</code> length that's allowed without truncation.
     * @return the processed <code>String</code>.
    comments
    me.truncate = function(str, maxLen) {

        var ellipsis = config.constants.text.ELLIPSIS;
        var eLen = ellipsis.length;
        var maxLength = maxLen ? maxLen : config.constants.TRUNCATION_LENGTH;

        if(str.length > maxLength) {
        
            return [str.substr(0, maxLength - eLen), ellipsis].join('');
        }

        return str;

    };

    /**
     * @function {static} StringHelper.toCamelCase
     *
     * <p>Converts the input to camel case.</p>
     * <p>i.e. if input is 'lorem-ipsum', the output is 'loremIpsum'.</p>
     * <p>This is especially useful for converting <code>CSS</code> classes
     * to their <strong>DOM</strong> style representations.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     * @return the formatted String.
    comments
    me.toCamelCase = function(input) {

        var constants = config.constants;

        return input.replace(constants.regExp.CAMEL_CASE, function(match) {
            
            return match.toUpperCase().replace(constants.text.DASH, '');
        
        });

    };

    /**
     * @function {static} StringHelper.toDashedFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem-ipsum'.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     * @return the formatted <code>String</code>.
    comments
    me.toDashedFromCamelCase = function(input) {

        var constants = config.constants;

        return input.replace(constants.regExp.ALL_CAPS, function(match) {
            
            return [constants.text.DASH, match.toLowerCase()].join('');
        
        });

    };

    /**
     * @function {static} StringHelper.toUnderscoreFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem_ipsum'.</p>
     *
     * @param {String} input - the <code>String</code> to convert.
     * @return the formatted <code>String</code>.
    comments
    me.toUnderscoreFromCamelCase = function(input) {

        var constants = config.constants;

        return input.replace(constants.regExp.ALL_CAPS, function(match) {
            
            return [constants.text.UNDERSCORE, match.toLowerCase()].join('');
        
        });

    };

}(o2, this));
/*global o2comments

/**
 * @module methodhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <code>function</code> helper for stuff like <strong>memoization</strong>,
 * <strong>partial functions</strong> an <strong>currying</strong>.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework;

    /**
     * @class {static} MethodHelper
     * A method helper class.
    comments
    me.MethodHelper = {

        /**
         * @function {static} MethodHelper.memoize
         *
         * <p><strong>Memoizes</strong> the given <code>function</code>'s outcome
         * and
         * presents it from cache, instead of recalculating.</p>
         * <p>See http://en.wikipedia.org/wiki/Memoization for details.</p>
         * <p>Sample Usage:</p>
         * <pre>
         * function multiply(a,b){return a*b; }
         * var memoized = MethodHelper.memoize(multiply);
         * var result = memoized(2,3);//fresh calculation.
         * result = memoized(4,2);//fresh calculation.
         * result = memoized(2,3);//retrieve from cache.
         * </pre>
         *
         * @param {Function} fn - the <code>function</code> to memoize.
         * @param {Object} context - what should "this" refer to.
         * @param {...} ... - variable number of input arguments to pass
         * arguments to fn.
         * @return a reference to the memoized <code>function</code>.
        comments
        memoize : function() {

            var pad = {};
            var args = Array.prototype.slice.call(arguments);
            var self = args.shift();
            var obj = args.length > 0 ? args[0] : null;

            var memoizedFn = function() {

                // Copy the arguments object into an array:
                // this allows it to be used as a cache key.
                var args = [];

                for(var i = 0; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }

                // Evaluate the memoized function if it hasn't
                // been evaluated with these arguments before.
                if(!( args in pad)) {
                    pad[args] = self.apply(obj, arguments);
                }

                return pad[args];

            };

            return memoizedFn;

        },

        /**
         * @function {static} MethodHelper.curry
         *
         * <p>Curries the <code>function</code>.</p>
         * <p>See http://www.dustindiaz.com/javascript-curry/ for a
         * discussion.</p>
         * <p>Example usage:</p>
         * <pre>
         * function test(a,b,c) { return a+b+c; }
         * var curried = MethodHelper.curry(this, test, 1, 2);
         * var result = curried(3);//returns 6;
         * </pre>
         *
         * @return the modified <code>function</code>.
        comments
        curry : function() {

            var args = [].slice.call(arguments);

            var context = args.shift();
            var fn = args.shift();

            return function() {

                return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));

            };

        },

        /**
         * @function {static} MethodHelper.partial
         *
         * <p>Defines a partial <code>function</code>.</p>
         * <p>See http://ejohn.org/blog/partial-functions-in-javascript/ for a
         * detailed
         * discussion.</p>
         * <p>Usage Example:</p>
         * <pre>
         * function test(a,b,c){ return a*b+c; }
         * var partial = MethodHelper.partial(test, 10, undefined, 20);
         * var result = partial(3);//returns 50;
         * </pre>
         *
         * @return the modified <code>function</code>.
        comments
        partial : function() {

            var args = Array.prototype.slice.call(arguments);

            var context = args.shift();
            var fn = args.shift();

            return function() {

                var arg = 0;

                for(var i = 0; i < args.length && arg < arguments.length; i++) {
                    if(args[i] === UNDEFINED) {
                        args[i] = arguments[arg++];
                    }
                }

                return fn.apply(context, args);

            };

        },

        /**
         * @function MethodHelper.bind
         *
         * <p>Creates a <code>Function</code> that uses <strong>base</strong> as
         * the
         * "<code>this</code>" reference.</p>
         *
         * @param {Object} base - the context of the newly created
         * <code>function</code>.
         * @param {Function} fn - the <code>function</code> to modify.
         * @return the modified <code>function</code>.
        comments
        bind : function(base, fn /*, argcomments) {

            var concat = Array.prototype.concat;
            var slice = Array.prototype.slice;
            var passedArguments = slice.call(arguments, 2);

            // @formatter:off
            return function(/*argcomments) {

                var params = concat.call(passedArguments, slice.call(arguments, 0));

                return fn.apply(base, params);

            };
            // @formatter:on
        }

    };

}(o2, this));
/*global o2comments

/**
 * @module methodhelper.extend
 * @requires methodhelper
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>A <code>Function</code> helper for stuff like <strong>memoization</strong>,
 * <strong>partial functions</strong> an <strong>currying</strong>.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.MethodHelper;
    var format = framework.StringHelper.format;

    /*
     * Module configuration.
    comments
    var config = {
        constants : {
            error : {
                ARGUMENT_COUNT_MISMATCH : 'Expected {0} arguments but found {1}'
            }
        }
    };

    /**
     * @function {static} MethodHelper.overload
     *
     * <p>Adds a method to the <code>Object</code>.</p>
     * <p>If parameters count is different but the name is same,
     * adds the method with a different signature, overloading the former
     * one.</p>
     *
     * @param {Object} object - the <code>Object</code> to add methods to.
     * @param {String} name - the name of the method.
     * @param {Function} fn - the method reference.
    comments
    me.overload = function(object, name, fn) {

        var old = object[name];

        object[name] = function() {

            // If both function have identical # of arguments,
            // then call the cached function.
            if(fn.length == arguments.length) {
                
                return fn.apply(this, arguments);
            }

            // Otherwise try to call the old function, if any.
            if( typeof old == 'function') {
                
                return old.apply(this, arguments);
            }

        };

    };

    /**
     * @function {static} MethodHelper.requireAllArguments
     *
     * <p>Checks the passed in arguments, and if all arguments are present,
     * executes
     * the <code>function</code>. Otherwise throws an error.</p>
     *
     * @param {Function} fn - the <code>function</code> to check.
     * @return the applied <code>function</code>.
     * @throws excpetion if all of the arguments is not provided to the
     * <code>function</code>.
    comments
    me.requireAllArguments = function(fn) {

        return function() {

            // throw an error if the arguments' length do not match.
            if(arguments.length < fn.length) {
                
                throw format(config.constants.error.ARGUMENT_COUNT_MISMATCH, fn.length, arguments.length);
            }

            return fn.apply(this, arguments);

        };

    };

    /**
     * @function {static} MethodHelper.defer
     *
     * <p>Defers a <code>function</code> for a specified amount of time.</p>
     *
     * @param {Function} fn - the <code>function</code> to defer.
     * @param {Integer} interval - the interval to defer in milliseconds.
     * @param {Object} context - the context (this reference) to bind.
     * @param {Array} args - arguments to pass to the function.
    comments
    me.defer = function(fn, interval, context, args) {

        setTimeout(function() {

            return fn.apply(context, args);

        }, interval);

    };

}(o2, this));
/*global o2comments

/**
 * @module collectionhelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility <strong>class</strong> to modify collections.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework;

    /*
     * Module configuration.
    comments
    var config = {
        constants : {

            /*
             *
            comments
            ecmaScriptType : {
                ARRAY : 'Array'
            }

        }
    };

    /*
     *
    comments
    function is(obj, type) {

        var objectNameStartIndex = 8;
        var trimLastBraceIndex = -1;
        var klass = Object.prototype.toString.call(obj).slice(objectNameStartIndex, trimLastBraceIndex);

        return obj !== UNDEFINED && obj !== null && klass === type;

    }

    /*
     *
    comments
    function isArray(obj) {

        return is(obj, config.constants.ecmaScriptType.ARRAY);

    }

    /**
     * @class {static} CollectionHelper
     *
     * <p>A <strong>class</strong> to modify collections.</p>
    comments
    me.CollectionHelper = {

        /**
         * @function {static} CollectionHelper.merge
         *
         * <p>Merges two objects.</p>
         *
         * @param {Object} toObj - the <code>Object</code> to copy values to.
         * @param {Object} fromObj - the <code>Object</code> to copy values from.
         * @param {Boolean} isRecursive - (Optional, defaults to
         * <code>false</code>) true
         * if the merge is nested into child objects as well.
         * @return a <strong>reference</strong> to the modified
         * <code>toObj</code>.
        comments
        merge : function(toObj, fromObj, isRecursive) {

            var shouldRecurse = !!isRecursive;

            var value = null;

            var merge = me.CollectionHelper.merge;

            for(var key in fromObj) {
                if(fromObj.hasOwnProperty(key)) {
                    value = fromObj[key];

                    if(shouldRecurse && typeof value == 'object') {
                        if( typeof toObj[key] != 'object') {
                            toObj[key] = {};
                        }

                        merge(toObj[key], fromObj[key], shouldRecurse);

                        continue;
                    }

                    toObj[key] = fromObj[key];
                }
            }

            return toObj;

        },

        /**
         * @function {static} CollectionHelper.indexOf
         *
         * <p>Gets the index of the element in the given <code>Array</code>.</p>
         *
         * @param {Array} ar - the <code>Array</code> to search.
         * @param {Object} elm - the <code>Object</code> to match.
         * @return the index of the element if found, <code>-1</code> otherwise.
        comments
        indexOf : function(ar, elm) {

            if(Array.prototype.indexOf) {
                me.CollectionHelper.indexOf = function(ar, elm) {

                    if(!ar) {

                        return -1;
                    }

                    if(!isArray(ar)) {

                        return -1;
                    }

                    return ar.indexOf(elm);

                };

                return me.CollectionHelper.indexOf(ar, elm);
            }

            me.CollectionHelper.indexOf = function(ar, elm) {

                if(!ar) {

                    return -1;
                }

                if(!isArray(ar)) {

                    return -1;
                }

                for(var i = 0, len = ar.length; i < len; i++) {
                    if(elm == ar[i]) {

                        return i;
                    }
                }

                return -1;

            };

            return me.CollectionHelper.indexOf(ar, elm);

        },

        /**
         * @function {static} CollectionHelper.contains
         *
         * <p>An <strong>alias</strong> to <code>CollectionHelper.indexOf(ar,
         * elm)
         * &gt;
         * -1</code>.</p>
         *
         * @param {Array} ar - the <code>Array</code> to search.
         * @param {Object} elm - the <code>Object</code> to match.
         * @return <code>true</code> if the <code>Array</code> contains the item,
         * <code>false</code> otherwise.
        comments
        contains : function(ar, elm) {

            return me.CollectionHelper.indexOf(ar, elm) > -1;

        },

        /**
         * @function {static} CollectionHelper.copy
         *
         * <p>Creates a clone of the given <code>Object</code>, and returns it;
         * leaving
         * the original intact.</p>
         *
         * @param {Object} ar - the object to clone.
         * @param {Boolean} isDeepCopy - (Optional; defaults to
         * <code>false</code>) - if
         * <code>true</code> and the object contains other <code>Object</code>s,
         * these
         * <code>Object</code>s will be cloned as well; non-primitive values will
         * not be
         * copied otherwise.
         * @return the copied <code>Object</code>.
        comments
        copy : function(ar, isDeepCopy) {

            var shouldDeepCopy = !!isDeepCopy;

            var theCopy = isArray(ar) ? [] : {};

            var value = null;

            for(var key in ar) {
                if(ar.hasOwnProperty(key)) {
                    value = ar[key];

                    if(shouldDeepCopy && ( typeof value == 'object')) {
                        theCopy[key] = me.CollectionHelper.copy(value, shouldDeepCopy);

                        continue;
                    }

                    theCopy[key] = value;
                }
            }

            return theCopy;

        },

        /**
         * @function {static} CollectionHelper.clear
         *
         * <p>Removes all the elements of the <code>Object</code>.</p>
         *
         * @param {Object} ar - the <code>Object</code> to clear.
         * @return a <strong>reference</strong> to the object itself.
        comments
        clear : function(ar) {

            if(!ar) {

                return null;
            }

            if(isArray(ar)) {
                ar.length = 0;

                return ar;
            }

            for(var key in ar) {
                if(ar.hasOwnProperty(key)) {

                    //
                    delete ar[key];
                }
            }

            return ar;

        },

        removeElementByValue : function(collection, name, value) {

            var item = null;

            if(isArray(collection)) {
                for(var i = 0, len = collection.length; i < len; i++) {
                    item = collection[i];

                    if(item[name] != value) {

                        continue;
                    }

                    collection.splice(i, 1);

                    //
                    i--;

                    //
                    len = collection.length;
                }

                return;
            }

            for(var key in collection) {
                if(collection.hasOwnProperty(key)) {
                    item = collection[key];

                    if(item[name] != value) {

                        continue;
                    }

                    //
                    delete collection[key];
                }
            }

        },

        /**
         * @function CollectionHelper.getFirst
         *
         * <p>Gets the first element of the array.</p>
         *
         * @param {Object} ar - the <code>Object</code> to inspect.
         * @return the first element if exists, <code>null</code> otherwise.
        comments
        getFirst : function(ar) {

            if(!ar) {

                return null;
            }

            if(!isArray(ar)) {

                return null;
            }

            return ar[0];

        },

        /**
         * @function CollectionHelper.getLast
         *
         * <p>Gets the last element of the array.</p>
         *
         * @param {Object} ar - the <code>Object</code> to inspect.
         * @return the last element if exists, <code>null</code> otherwise.
        comments
        getLast : function(ar) {

            if(!ar) {

                return null;
            }

            if(!isArray(ar)) {

                return null;
            }

            return ar[ar.length - 1];

        },

        /**
         * @function {static} CollectionHelper.compact
         *
         * <p>Remove <code>null</code>, and <code>undefined</code> members from
         * the
         * <code>Object</code>.
         * This function alters the actual <code>Object</code>.</p>
         *
         * @param {Object} ar - the <code>Object</code> to clean.
         * @param {Boolean} isDeepClean - (Optional; defaults to
         * <code>false</code>) - if
         * <code>true</code> and the object contains other <code>Object</code>s,
         * these
         * <code>Object</code>s will be cleaned as well; non-primitive values
         * will not be
         * cleaned otherwise.
         * @return a reference to the <code>Object</code> itself.
        comments
        compact : function(ar, isDeepClean) {

            //
            isDeepClean = !!isDeepClean;

            if(!ar) {

                return null;
            }

            var value = null;
            var compact = me.CollectionHelper.compact;

            if(isArray(ar)) {
                for(var i = 0, len = ar.length; i < len; i++) {
                    value = ar[i];

                    if(value === null || value === UNDEFINED) {
                        ar.splice(i, 1);
                        i = i - 1;
                        len = ar.length;

                        continue;
                    }

                    if(isArray(value) && isDeepClean) {
                        compact(value, isDeepClean);

                        continue;
                    }
                }

                return ar;
            }

            for(var key in ar) {
                if(ar.hasOwnProperty(key)) {
                    value = ar[key];

                    if(value === null || value === UNDEFINED) {

                        //
                        delete ar[key];
                    }

                    if( typeof value == 'object' && isDeepClean) {
                        compact(value);

                        continue;
                    }
                }
            }

            return ar;

        }

    };

}(o2, this));
/*global o2comments

/**
 * @module eventhandler.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser event management object.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework;
    var $ = framework.$;
    var nill = framework.nill;
    var format = framework.StringHelper.format;

    /*
     * Module configuration.
    comments
    var config = {
        constants : {
            text : {
                err : {
                    CALLBACK_NOT_DEFINED : '{0}: Callback is not defined!'
                }
            }
        }
    };

    /**
     * @class {static} EventHandler
     *
     * <p>A cross-browser event handling and event utilities class.</p>
    comments
    me.EventHandler = {

        /**
         * @struct {static} EventHandler.keyCode
        comments
        keyCode : {

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.ENTER - enter key.
            comments
            ENTER : 13,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.LEFT - left arrow key.
            comments
            LEFT : 37,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.RIGHT - right arrow key.
            comments
            RIGHT : 39,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.TOP - top arrow key.
            comments
            TOP : 38,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.BOTTOM - bottom arrow key.
            comments
            BOTTOM : 40,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.BACKSPACE - backspace key.
            comments
            BACKSPACE : 8,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.TAB - TAB key.
            comments
            TAB : 9,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.SHIFT - shift key.
            comments
            SHIFT : 16,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.CTRL - CTRL key.
            comments
            CTRL : 17,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.ALT - ALT key.
            comments
            ALT : 18,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.CAPS_LOCK - caps lock key.
            comments
            CAPS_LOCK : 20,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.ESCAPE - ESC key.
            comments
            ESCAPE : 27,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.DELETE - DEL key.
            comments
            DELETE : 46
        },

        /**
         * @function {static} EventHandler.addEventListener
         *
         * <p>Adds a new event listener to the <strong>DOM</strong> Node.</p>
         *
         * @param {DomNode} node - the <strong>DOM</strong> object (or its
         * <code>String</code> id) the evet shall be attached.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         * @throws {Exception} if <strong>fn</strong> callback is not defined.
        comments
        addEventListener : function(node, evt, fn) {

            var kCallbackTemplate = config.constants.text.err.CALLBACK_NOT_DEFINED;
            var kCallbackNotDefined = format(kCallbackTemplate, 'addEventListener');

            var obj = $(node);

            if(!obj) {

                return;
            }

            if(obj.addEventListener) {
                me.EventHandler.addEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    // 'false' is for not to use event capturing.
                    // Event capturing is not very useful, since its
                    // implementation vastly deviates among vendors'
                    // implementations.
                    //
                    // See:
                    // http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow

                    obj.addEventListener(evt, fn, false);

                };


                me.EventHandler.addEventListener(obj, evt, fn);

                return;
            }

            if(obj.attachEvent) {
                me.EventHandler.addEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    var onEvent = ['on', evt].join('');
                    obj.attachEvent(onEvent, fn);

                };


                me.EventHandler.addEventListener(obj, evt, fn);

                return;
            }

            me.EventHandler.addEventListener = function(node, evt, fn) {

                var obj = $(node);

                if(!obj) {
                    return;
                }

                if(!fn) {
                    throw kCallbackNotDefined;
                }

                var onEvent = ['on', evt].join('');
                obj[onEvent] = fn;

            };


            me.EventHandler.addEventListener(obj, evt, fn);

        },

        //TODO: add documentation.
        addEventListeners : function(collection, eventName, handler) {

            if(!collection) {

                return;
            }

            var listen = me.EventHandler.addEventListener;

            for(var key in collection) {
                if(collection.hasOwnProperty(key)) {
                    listen(collection[key], eventName, handler);
                }
            }

        },

        /**
         * @function {static} EventHandler.removeEventListener
         *
         * <p>Removes an already-added new event listener from the DOM Node.</p>
         *
         * @param {DomNode} node - the DOM object (or its <code>String</code>
         * reference) the evet shall be removed.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         * @throws {Exception} if <strong>fn</strong> callback is not defined.
        comments
        removeEventListener : function(node, evt, fn) {

            var kCallbackTemplate = config.constants.text.err.CALLBACK_NOT_DEFINED;
            var kCallbackNotDefined = format(kCallbackTemplate, 'removeEventListener');

            var obj = $(node);

            if(!obj) {

                return;
            }

            if(obj.removeEventListener) {
                me.EventHandler.removeEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    obj.removeEventListener(evt, fn, false);

                };


                me.EventHandler.removeEventListener(obj, evt, fn);

                return;
            }

            if(obj.detachEvent) {
                me.EventHandler.removeEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    var onEvent = ['on', evt].join('');
                    obj.detachEvent(onEvent, fn);

                };


                me.EventHandler.removeEventListener(obj, evt, fn);

                return;
            }

            me.EventHandler.removeEventListener = function(node, evt, fn) {

                var obj = $(node);

                if(!obj) {

                    return;
                }

                if(!fn) {

                    throw kCallbackNotDefined;
                }

                var onEvent = ['on', evt].join('');
                obj[onEvent] = nill;

            };


            me.EventHandler.removeEventListener(obj, evt, fn);

        },

        //TODO: removeAllEventListeners (obj)
        //TODO: removeAllEventListeners (obj, eventName)
        //TODO: removeAllEventListeners (eventName)
        //TODO: removeAllEventListeners ()

        /**
         * @function {static} EventHandler.getEventObject
         *
         * <p>Gets the actual event object.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
         * @return the actual <code>DOM Event</code> object.
        comments
        getEventObject : function(evt) {

            me.EventHandler.getEventObject = window.event ? function() {

                return window.event;

            } : function(e) {

                return e;

            };

            return me.EventHandler.getEventObject(evt);

        },

        /**
         * @function {static} EventHandler.getTarget
         *
         * <p>Gets the originating source of the event.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
         * @return the actual DOM target of the event object.
        comments
        getTarget : function(evt) {

            var target = window.event ? me.EventHandler.getTarget = function() {

                return window.event.srcElement;

            } : me.EventHandler.getTarget = function(e) {

                return e ? e.target : null;

            };

            return me.EventHandler.getTarget(evt);

        },

        /**
         * @function {static} EventHandler.preventDefault
         *
         * <p>Prevents the default action. When this method is called inside an
         * even
         * handling
         * callback, the default action associated with that event is not
         * triggered.
         * Like, if it is an <code>onclick</code> event on a link, then the
         * browser does
         * not go to the <code>href</code> of that link.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
        comments
        preventDefault : function(evt) {

            me.EventHandler.preventDefault = window.event ? function() {

                window.event.returnValue = false;

                return false;

            } : function(e) {

                if(!e) {

                    return;
                }

                if(e.preventDefault) {
                    e.preventDefault();
                }

                return false;

            };


            me.EventHandler.preventDefault(evt);

        },

        /**
         * @function {static} EventHandler.stopPropagation
         *
         * <p>Stops the propagation of the event upwards in the DOM
         * hierarchy.</p>
         * <p>See {@link
         * http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow}
         * for details.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
        comments
        stopPropagation : function(evt) {

            me.EventHandler.stopPropagation = window.event ? function() {

                window.event.cancelBubble = true;

            } : function(e) {

                if(!e) {

                    return;
                }

                e.stopPropagation();

            };


            me.EventHandler.stopPropagation(evt);

        }

    };

}(o2, this));
/*global o2comments

/**
 * @module eventhandler.extend
 * @requires eventhandler.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>Extension methods for the {@link EventHandler} object.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.EventHandler;

    /*
     * @function {static} getEventObject
     *
     * <p>Copied from eventhandler.core.js, to eliminate cross-dependency.</p>
     *
     * <p>Gets the actual event object.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally
     * in {@link EventHandler.addEventListener}
     * @return the actual <code>DOM Event</code> object.
    comments
    var getEventObject = function(evt) {
        
        //
        getEventObject = window.event ? function() {

            return window.event;

        } : function(e) {

            return e;

        };

        return getEventObject(evt);

    };

    /**
     * @function {static} EventHandler.getMouseCoordinates
     *
     * <p>Gets the current mouse coordinates.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally
     * in {@link EventHandler.addEventListener}
     * @return the coordinates in the form of <code>{x: mouseX, y: mouseY}</code>
     * where <code>x</code> is the distance from the top of the screen, and
     * <code>y</code> is the distance from the left of the screen.
    comments
    me.getMouseCoordinates = function(evt) {

        var e = getEventObject(evt);

        if(!e) {

            return {
                x : 0,
                y : 0
            };
        }

        var posx = 0;
        var posy = 0;

        if(e.pageX) {
            me.getMouseCoordinates = function(e) {

                if(!e) {

                    return {
                        x : 0,
                        y : 0
                    };
                }
                posx = e.pageX || 0;
                posy = e.pageY || 0;

                return {
                    x : posx,
                    y : posy
                };

            };

            return me.getMouseCoordinates(evt);
        }

        if(e.clientX) {
            me.getMouseCoordinates = function(e) {

                if(!e) {

                    return {
                        x : 0,
                        y : 0
                    };
                }

                var clientX = e.clientX || 0;
                var clientY = e.clientY || 0;
                
                //
                posx = clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = clientY + document.body.scrollTop + document.documentElement.scrollTop;

                return {
                    x : posx,
                    y : posy
                };

            };

            return me.getMouseCoordinates(evt);
        }

        // The current event object neither has pageX, nor clientX defined.
        return {
            x : 0,
            y : 0
        };

    };

    /**
     * @function {static} EventHandler.getKeyCode
     *
     * <p>Gets the key code of the key-related event (keydown, keyup, keypress
     * etc.).</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally
     * in {@link EventHandler.addEventListener}
     * @return the <code>keyCode</code> associated with the event as an
     * <code>Integer</code>
    comments
    me.getKeyCode = function(evt) {

        var e = getEventObject(evt);

        if(!e) {

            return null;
        }

        if(e.charCode) {

            me.getKeyCode = function(e) {

                return e.charCode;

            };

            return me.getKeyCode(evt);
        }

        if(e.keyCode) {
            me.getKeyCode = function(e) {

                return e.keyCode;

            };

            return me.getKeyCode(evt);
        }

        if(e.which) {
            me.getKeyCode = function(e) {

                return e.which;

            };

            return me.getKeyCode(evt);
        }

        return null;

    };

    /**
     * @function {static} EventHandler.isRightClick
     *
     * <p>Checks whether or not the curent action is a right click action.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally
     * in {@link EventHandler.addEventListener}
     * @return <code>true</code> if the event is a right click event,
     * <code>false</code> otherwise.
    comments
    me.isRightClick = function(evt) {

        var e = getEventObject(evt);

        //
        // According to W3C
        //     Left Button: 0
        //     Middle Button: 1
        //     Right Button: 2 (!)
        //
        // According to M$
        //     Lef Button: 1
        //     Middle Button: 4
        //     Right Button: 2 (!)
        //     Left and Right: 3
        //     Left and Middle: 5
        //     Right and Middle: 6
        //     All three: 7
        //
        // http://msdn.microsoft.com/en-us/library/ms533544(v=vs.85).aspx
        //

        if(!e) {

            return false;
        }

        if(e.which) {
            me.isRightClick = function(e) {

                return e.which == 3;
            };

            return me.isRightClick(evt);
        }

        if(e.button) {
            me.isRightClick = function(e) {

                return e.button == 2;
            };

            return me.isRightClick(evt);
        }

        return false;

    };

}(o2, this));
/*global o2comments

/**
 * @module domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser <strong>DOM</strong> manipulation helper.</p>
comments
( function(framework, window, UNDEFINED) {

    //TODO: update my documentation ($'s added).

    /*
     * Aliases.
    comments
    var me = framework;
    var $ = framework.$;

    /**
     * @class {static} DomHelper
     *
     * A cross-browser DOM manipulation helper.
    comments
    me.DomHelper = {

        /**
         * @struct {static} DomHelper.nodeType
         *
         * <code>DOM</code> node types.
        comments
        nodeType : {

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ELEMENT - element node.
            comments
            ELEMENT : 1,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ATTRIBUTE - atribute node.
            comments
            ATTRIBUTE : 2,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.TEXT - text node.
            comments
            TEXT : 3,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.CDATA - CDATA section.
            comments
            CDATA : 4,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ENTITY_REFERENCE - entity reference.
            comments
            ENTITY_REFERENCE : 5,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.ENTITY - entity.
            comments
            ENTITY : 6,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.PROCESSING_INSTRUCTION - processing
             * instruction.
            comments
            PROCESSING_INSTRUCTION : 7,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.COMMENT - comment node.
            comments
            COMMENT : 8,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.DOCUMENT - document (root) node.
            comments
            DOCUMENT : 9,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.DOCUMENT_TYPE - DTD node.
            comments
            DOCUMENT_TYPE : 10,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.DOCUMENT_FRAGMENT - document fragment.
            comments
            DOCUMENT_FRAGMENT : 11,

            /**
             * @property {static const Integer}
             * DomHelper.nodeType.NOTATION - notation.
            comments
            NOTATION : 12

        },

        /**
         * @function {static} DomHelper.isChild
         *
         * <p>Checks whether the give node is the child of another node.</p>
         *
         * @param {DomNode} testNode - the node to test.
         * @param {DomNode} parentNode - the parent node.
         * @return <code>true</code> if <strong>testNode</strong> is the child of
         * <strong>parentNode</strong>, <code>false</code> otherwise.
        comments
        isChild : function(testNode, parentNode) {

            //
            testNode = $(testNode);
            parentNode = $(parentNode);

            var theNode = testNode;

            if(!testNode || !parentNode) {

                return false;
            }

            if(testNode == parentNode) {

                return false;
            }

            while(theNode.nodeName.toLowerCase() != 'body') {
                if(theNode == parentNode) {

                    return true;
                }

                if(!theNode.parentNode) {

                    return false;
                }
                //
                theNode = theNode.parentNode;
            }

            return false;

        },

        //TODO: add documentation.
        create : function(nodeName) {

            if(!nodeName) {

                return null;
            }

            if(typeof nodeName != 'string'){

                return null;
            }

            return document.createElement(nodeName);

        },

        /**
         * @function {static} DomHelper.removeNode
         *
         * <p>Removes the element from the <strong>DOM</strong> flow.</p>
         *
         * @param {DomNode} elm - the node to remove.
         * @return the removed node.
        comments
        removeNode : function(elm) {

            //
            elm = $(elm);

            if(!elm) {

                return null;
            }

            elm.parentNode.removeChild(elm);

            return elm;

        },

        /**
         * @function {static} DomHelper.removeEmptyTextNodes
         *
         * <p>Removes empty text nodes from the element.</p>
         *
         * @param {DomNode} elm - The element to process.
         * @param {Boolean} isRecursive - if <code>true</code> do the same
         * process for
         * the child nodes of <code>elm</code> as well.
        comments
        removeEmptyTextNodes : function(elm, isRecursive) {

            //
            elm = $(elm);

            if(!elm) {

                return;
            }

            var children = elm.childNodes;
            var arRemove = [];
            var len = children.length;
            var i = 0;

            //
            isRecursive = !!isRecursive;

            var kText = me.DomHelper.nodeType.TEXT;
            var regWhitespace = /^\s*$/;

            var nodeValue = '';
            var child = null;
            var shouldRemove = false;

            var removeEmptyTextNodes = me.DomHelper.removeEmptyTextNodes;

            for( i = 0; i < len; i++) {
                child = children[i];

                if(child.hasChildNodes()) {
                    if(isRecursive) {
                        removeEmptyTextNodes(child, true);
                    }

                    continue;
                }

                //
                shouldRemove = child.nodeType == kText && regWhitespace.test(child.nodeValue);

                if(shouldRemove) {
                    arRemove.push(child);
                }
            }

            for( i = 0, len = arRemove.length; i < len; i++) {
                child = arRemove[i];
                child.parentNode.removeChild(child);
            }

        },

        //TODO: add documentation.
        removeChildren : function(elm) {

            var node = $(elm);

            if(!node) {

                return;
            }

            node.innerHTML = '';

        },

        /**
         * @function {static} DomHelper.insertAfter
         *
         * <p>Adds the node after the reference node.</p>
         *
         * @param {DomNode} newNode - the node to insert after.
         * @param {DomNode} refNode - the reference node.
        comments
        insertAfter : function(newNode, refNode) {

            //
            newNode = $(newNode);
            refNode = $(refNode);

            if(!newNode || !refNode) {

                return;
            }

            var obj = refNode.parentNode;

            return refNode.nextSibling ? obj.insertBefore(newNode, refNode.nextSibling) : obj.appendChild(newNode);

        },

        /**
         * @function {static} DomHelper.insertBefore
         *
         * <p>Adds the node before the reference node.</p>
         *
         * @param {DomNode} newNode - the node to insert before.
         * @param {DomNode} refNode - the reference node.
        comments
        insertBefore : function(newNode, refNode) {

            //
            newNode = $(newNode);
            refNode = $(refNode);

            if(!newNode || !refNode) {

                return;
            }

            var obj = refNode.parentNode;

            obj.insertBefore(newNode, refNode);

        },

        /**
         * @function {static} DomHelper.createElement
         *
         * <p>Creates an element with given name and attributes.</p>
         *
         * @param {String} name - the node name of the element (i.e. 'div', 'a').
         * @param {Object} attributes - an associative array in the form
         * <code>{att1:value1, att2:value2}</code>.
         * @return the created element.
        comments
        createElement : function(name, attributes) {

            var e = document.createElement(name);

            var value = '';

            // Internet Explorer 7- (and some minor browsers) cannot set values
            // for style, class or event handlers, using setAttribute.
            // Internet Explorer 8 has fixed most of these, but still cannot set
            // event handlers. Internet Explorer 9 can now set these attributes
            // in standards mode. A few more browsers also have trouble reading
            // these attributes using getAttribute.

            for(var key in attributes) {
                if(attributes.hasOwnProperty(key)) {
                    value = attributes[key];

                    if(key == 'class' || key == 'className') {
                        e.className = value;

                        continue;
                    }

                    if(key == 'style' || key == 'css' || key == 'cssText') {

                        // The string value of the style attribute is available
                        // as a read/write string called cssText, which is a
                        // property of the style object, which itself is a
                        // property of the element.
                        // Note, however, that it is not supported very well;
                        // Safari does not support it up to version 1.1 (reading
                        // it produces the value null)
                        //
                        // ...
                        //
                        // To avoid problems a combination of cssText and
                        // getAttribute/setAttribute can be used.

                        e.style.cssText = value;
                        e.setAttribute('style', value);

                        continue;
                    }

                    e[key] = attributes[key];
                }
            }

            return e;

        },

        /**
         * @function {static} DomHelper.prepend
         *
         * <p>Prepends the element to the top of its parent.</p>
         *
         * @param {DomNode} child - the child node to prepend.
         * @param {DomNode} parent - the parent container.
        comments
        prepend : function(child, parent) {

            //
            child = $(child);
            parent = $(parent);

            if(!child || !parent) {

                return;
            }

            if(parent.childNodes.length === 0) {
                parent.appendChild(child);

                return;
            }

            parent.insertBefore(child, parent.childNodes[0]);

        },

        /**
         * @function {static} DomHelper.append
         *
         * <p>Appends the element to the bottom of its parent.</p>
         *
         * @param {DomNode} child - the child node to append.
         * @param {DomNode} parent - the parent container.
        comments
        append : function(child, parent) {

            //
            child = $(child);
            parent = $(parent);

            if(!child || !parent) {

                return;
            }

            parent.appendChild(child);

        },

        /**
         * @function {static} DomHelper.getOffset
         *
         * <p>Gets the left and top offset of a given element.</p>
         *
         * @param {DomNode} elm - the element to get the offsets of.
         * @return the offset from the top-left corner of the viewport, in the
         * form
         * <code>{left: l, top: t}</code>.
        comments
        getOffset : function(elm) {

            //
            elm = $(elm);

            var ol = -1;
            var ot = -1;

            if(!elm) {

                return {
                    left : ol,
                    top : ot
                };
            }

            while(true) {
                ol += elm.offsetLeft;
                ot += elm.offsetTop;
                elm = elm.offsetParent;

                if(!elm) {

                    break;
                }
            }

            return {
                left : ol,
                top : ot
            };

        },

        /**
         * @function {static} DomHelper.getAttribute
         *
         * <p>Gets the attribute of a given node.</p>
         *
         * @param {DomNode} obj - the node to get the attribute of.
         * @param {String} attribute - the attribute to gather.
         * @return the value of the attribute if found; <code>null</code>
         * otherwise.
        comments
        getAttribute : function(obj, attribute) {

            //
            obj = $(obj);

            if(!obj || !attribute) {

                return null;
            }

            //DOM object (obj) may not have a getAttribute method.

            if( typeof obj.getAttribute == 'function') {
                var value = obj.getAttribute(attribute);

                if(value !== UNDEFINED) {

                    return value;
                }
            }

            return obj[attribute] ? obj[attribute] : null;

        }

    };

}(o2, this));
/*global o2comments

/**
 * @module domhelper.ready
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A helper to fire events when the <code>DOM</code> content is loaded.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.DomHelper;
    var nill = framework.nill;

    /*
     * Module configuration.
    comments
    var config = {

        /*
         *
        comments
        constants : {

            /*
             *
            comments
            regExp : {
                REG_DOM_LOADED : /^loade|c/
            }

        }

    };

    /*
     *
    comments
    function isDomContentReady() {

        return (config.constants.regExp.REG_DOM_LOADED).test(window.document.readyState);

    }

    /*
     * State.
    comments
    var state = {
        isApplicationReady : isDomContentReady(),
        readyQueue : []
    };

    /*
     *
    comments
    function flushReadyQueue() {

        state.isApplicationReady = true;

        var queue = state.readyQueue;

        while(queue.length > 0) {
            queue.pop()();
        }

    }

    /*
     * DOM Content ready check for MSIE.
     * http://javascript.nwbox.com/IEContentLoaded/
    comments
    var checkScrollLeft = function() {

        try {

            window.document.documentElement.doScroll('left');

        } catch(e) {

            setTimeout(checkScrollLeft, 50);

            return;

        }

        flushReadyQueue();

        //
        checkScrollLeft = nill;

    };

    var onMozDomContentLoaded = function(evt) {

        window.document.removeEventListener('DOMContentLoaded', onMozDomContentLoaded, false);

        //
        flushReadyQueue();

        //
        onMozDomContentLoaded = nill;

    };

    var onMozWindowLoad = function(evt) {

        window.document.removeEventListener('load', onMozWindowLoad, false);

        //
        flushReadyQueue();

        //
        onMozWindowLoad = nill;

    };

    var onIEDomContentLoaded = function(evt) {

        if(!isDomContentReady()) {

            return;
        }

        //
        window.document.detachEvent('onreadystatechange', onIEDomContentLoaded);

        //
        flushReadyQueue();

        //
        onIEDomContentLoaded = nill;

    };

    var onIEWindowLoaded = function(evt) {

        window.detachEvent('onload', onIEWindowLoaded);

        //
        flushReadyQueue();

        //
        onIEDomContentLoaded = nill;

    };

    var bindReadyListeners = function() {

        var doc = window.document;

        // Mozilla, Opera, webkit
        if(doc.addEventListener) {

            //Listen to native on dom conten loaded event.
            doc.addEventListener('DOMContentLoaded', onMozDomContentLoaded, false);

            //Worst-case fallback
            window.addEventListener('load', onMozWindowLoad, false);

            //Do not process further calls.
            bindReadyListeners = nill;

            return;
        }

        // MSIE
        if(doc.attachEvent) {

            // Listen to ready state change.
            doc.attachEvent('onreadystatechange', onIEDomContentLoaded);

            // Worst-case fallback
            window.attachEvent('onload', onIEWindowLoaded);

            // If the document is not an IFRAME then ready state has no use,
            var isIframe = window.self != window.top;

            // so apply an alternative trick.
            if(!isIframe) {
                checkScrollLeft();
            }

            // Do not process further calls.
            bindReadyListeners = nill;

            return;
        }

    };

    /**
     * @function {static} DomHelper.ready
     *
     * <p>Fires when the <code>HTML DOM</code> is ready.</p>
     *
     * @param {Function} delegate - the callback that's called when the DOM is
     * ready.
    comments
    me.ready = function(delegate) {

        // if DOM is ready, execute the delegate immediately.
        if(state.isApplicationReady) {
            delegate();

            return;
        }

        // Otherwise, check for the DOM's ready state.
        bindReadyListeners();

        // this queue will be processed "only once" after DOM is ready.
        state.readyQueue.push(delegate);

    };

}(o2, this));
/*global o2comments

/**
 * @module domhelper.traverse
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.DomHelper;
    var getAttribute = me.getAttribute;
    var generateGuid = framework.StringHelper.generateGuid;
    var $ = framework.$;
    var myName = framework.name;

    /**
     * @function {static} DomHelper.getParent
     *
     * <p>gets the first parent element with the given node name.</p>
     *
     * @param {DomNode} target - the current <strong>DOM</strong> node.
     * @param {String} nodeName - the node name to search.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (target) is disregarded while
     * seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
    comments
    //TODO: update documentation.
    me.getParent = function(target, nodeName, shouldExcludeSelf) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if(isExcluded) {
            target = target.parentNode;
        }

        if(!target) {

            return null;
        }

        var nodes = null;
        var hasParent = false;
        var targetNodeName = '';
        var currentNodeName = '';

        while(target) {
            nodes = nodeName.split(',');
            targetNodeName = target.nodeName.toLowerCase();

            for(var i = 0, len = nodes.length; i < len; i++) {
                currentNodeName = nodes[i].toLowerCase();

                if(!currentNodeName) {

                    continue;
                }

                if(targetNodeName === currentNodeName) {
                    hasParent = true;

                    break;
                }
            }

            if(!hasParent) {
                target = target.parentNode;

                continue;
            }

            return target;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getParentByAttribute
     *
     * <p>gets the first parent with an <strong>attribute</strong> equal to the
     * given <strong>value</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node.
     * @param {String} attribute - the name of the attribute.
     * @param {String} value - the value of the attribute.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
    comments
    me.getParentByAttribute = function(obj, attribute, value, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if(isExcluded) {
            obj = obj.parentNode;
        }

        if(!obj) {

            return null;
        }

        if(getAttribute(obj, attribute) === value) {

            return obj;
        }

        while(obj) {
            if(getAttribute(obj, attribute) === value) {

                return obj;
            }

            //
            obj = obj.parentNode;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getParentWithAttribute
     *
     * <p>gets the first parent with a given <strong>attribute</strong>.</p>
     *
     * @param {DomNode} obj - the current <strong>DOM</strong> node.
     * @param {String} attribute - the name of the attribute.
     * @param {Boolean} shouldExcludeSelf - (optional: defaults to false).
     * If <code>true</code>, the current node (obj) is disregarded while seeking.
     * @return the <strong>DOM</strong> node if found, <code>null</code>
     * otherwise.
    comments
    //TODO: I can have a space delimeted list of attributes.  (OR)
    //TODO: I can also have a comma delimeted list of attributes. (AND) or a
    // combination of two 'attr1,attr2 attr3 attr4,attr5 attr6' (comma is OR space is AND)
    me.getParentWithAttribute = function(obj, attribute, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        if(isExcluded) {
            obj = obj.parentNode;
        }

        if(!obj) {

            return null;
        }

        while(obj) {
            if(getAttribute(obj, attribute) !== null) {

                return obj;
            }

            //
            obj = obj.parentNode;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getParentById
     * <p>This is an alias to</p>
     * <pre>
     * DomHelper.getParentByAttribute(obj, 'id', shouldExcludeSelf)
     * </pre>
     *
     * @see DomHelper.getParentByAttribute
    comments
    //TODO: I can have a comma delimeted list of ids.
    me.getParentById = function(obj, id, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        return me.getParentByAttribute(obj, 'id', id, isExcluded);

    };

    /**
     * @function {static} DomHelper.getParentById
     * <p>This is an alias to</p>
     * <pre>
     * DomHelper.getParentWithAttribute(obj, 'id', value, shouldExcludeSelf)
     * </pre>
     *
     * @see DomHelper.getParentWithAttribute
    comments
    //TODO: I can have a comma delimeted list of ids.
    me.getParentWithId = function(obj, value, shouldExcludeSelf) {

        //
        obj = $(obj);

        if(!obj) {

            return null;
        }

        var isExcluded = !!shouldExcludeSelf;

        return me.getParentWithAttribute(obj, 'id', isExcluded);

    };

    /**
     * @function {static} DomHelper.getFirstChild
     *
     * <p>gets the first child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} target - the current node.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
    comments
    //TODO: I can have a space comma delimeted list of node names.
    me.getFirstChild = function(target, nodeName) {

        //
        target = $(target);

        if(!target) {

            return null;

        }

        if(target.querySelector) {
            me.getFirstChild = function(target, nodeName) {
                target = $(target);

                if(!target) {

                    return null;
                }

                if(!target.id) {
                    target.id = [myName, generateGuid()].join('');
                }

                var kTextNode = me.nodeType.TEXT;
                var kAll = '*';
                nodeName = nodeName || kAll;
                nodeName = nodeName.toLowerCase();

                return target.querySelector(['#', target.id, ' > ', nodeName].join(''));

            };

            return me.getFirstChild(target, nodeName);
        }

        me.getFirstChild = function(target, nodeName) {
            target = $(target);

            if(!target) {

                return null;
            }

            var kTextNode = me.nodeType.TEXT;
            var kAll = '*';

            //
            nodeName = nodeName || kAll;
            nodeName = nodeName.toLowerCase();

            var children = target.childNodes;

            if(!children || children.length === 0) {

                return null;
            }

            var node = children[0];

            while(node) {
                if(node.nodeType == kTextNode) {
                    node = node.nextSibling;

                    continue;
                }

                if(nodeName == kAll) {

                    return node;
                }

                if(node.nodeName.toLowerCase() != nodeName) {
                    node = node.nextSibling;

                    continue;
                }

                return node;
            }

            return null;

        };

        return me.getFirstChild(target, nodeName);

    };

    /**
     * @function {static} DomHelper.getFirstChildById
     *
     * <p>gets the first child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test.
     * @param {String} id - the id of the child.
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
    comments
    //TODO: I can have a comma delimeted list of ids.
    me.getFirstChildById = function(target, id) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        if(target.querySelector) {
            me.getFirstChildById = function(target, id) {

                //
                target = $(target);

                if(!target) {

                    return null;
                }

                if(!target.id) {
                    target.id = [myName, generateGuid()].join('');
                }

                return target.querySelector(['#', target.id, ' > #', id].join(''));

            };

            return me.getFirstChildById(target, id);
        }

        me.getFirstChildById = function(target, id) {

            //
            target = $(target);

            if(!target) {

                return null;
            }

            var children = target.childNodes;

            if(!children || children.length === 0) {

                return null;
            }

            var node = children[0];
            while(node) {
                if(node.id && node.id == id) {

                    return node;
                }

                //
                node = node.nextSibling;
            }

            return null;

        };

        return me.getFirstChildById(target, id);

    };

    /**
     * @function {static} DomHelper.getFirstChildWithId
     *
     * <p>gets the first child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target to test.
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
    comments
    me.getFirstChildWithId = function(target) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        //querySelector => IE8+
        if(target.querySelector) {
            me.getFirstChildWithId = function(target) {
                target = $(target);

                if(!target) {

                    return null;
                }

                if(!target.id) {
                    target.id = [myName, generateGuid()].join('');
                }

                return target.querySelector(['#', target.id, ' > [id]'].join(''));

            };

            return me.getFirstChildWithId(target);
        }

        me.getFirstChildWithId = function(target) {
            target = $(target);

            if(!target) {

                return null;
            }

            var children = target.childNodes;

            if(!children || children.length === 0) {

                return null;
            }

            var node = children[0];

            while(node) {
                if(node.id) {

                    return node;
                }

                //
                node = node.nextSibling;
            }

            return null;
        };

        return me.getFirstChildWithId(target);
    };

    /**
     * @function {static} DomHelper.getLastChild
     *
     * <p>gets the last child, which is not a text-node, with a given node
     * name.</p>
     *
     * @param {DomNode} target - the current node.
     * @param {String} nodeName - the node name to seek. (This parameters is
     * optional. It defaults to '*', which will match any node name.)
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
    comments
    //TODO: I can have a comma delimeted list of node names.
    me.getLastChild = function(target, nodeName) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        // Although this function may be speeded up using  obj.querySelector and
        // :last-child, the :last-child pseudoclass still cannot be reliably used
        // across browsers.
        // In particular, Internet Explorer (6 and 7 and 8), and Safari
        // definitely don't support it,
        // Although Internet Explorer 7 and Safari 3 do support :first-child,
        // curiously.
        // Your best bet is to explicitly add a last-child (or similar) class to
        // that item, and apply li.last-child instead.

        var kTextNode = me.nodeType.TEXT;
        var kAll = '*';

        var children = target.childNodes;

        //
        nodeName = nodeName || kAll;
        nodeName = nodeName.toLowerCase();

        if(!children || children.length === 0) {

            return null;
        }

        var node = children[children.length - 1];

        while(node) {
            if(node.nodeType == kTextNode) {
                node = node.previousSibling;

                continue;
            }

            if(nodeName == kAll) {

                return node;
            }

            if(node.nodeName.toLowerCase() != nodeName) {
                node = node.previousSibling;

                continue;
            }

            return node;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getLastChildById
     *
     * <p>gets the last child that has the given id.</p>
     *
     * @param {DomNode} target - the target to test.
     * @param {String} id - the id of the child.
     * @return the <code>DOM</code> node if found, <code>null</code> otherwise.
    comments
    //TODO: I can have a comma delimeted list of ids.
    me.getLastChildById = function(target, id) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var children = target.childNodes;

        if(!children || children.length === 0) {

            return null;
        }

        var node = children[children.length - 1];

        while(node) {
            if(node.id && node.id == id) {

                return node;
            }

            //
            node = node.previousSibling;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getLastChildWithId
     *
     * <p>gets the last child with an <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the target to test.
     * @return the first child with <strong>id</strong> if any, <code>null</code>
     * otherwise.
    comments
    me.getLastChildWithId = function(target) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var children = target.childNodes;

        if(!children || children.length === 0) {

            return null;
        }

        var node = children[children.length - 1];

        while(node) {
            if(node.id) {

                return node;
            }

            //
            node = node.previousSibling;
        }

        return null;

    };

    //TODO: add documentation.
    me.getChildren = function(elem) {

        var target = $(elem);

        var nodes = target.childNodes;

        var kTextNode = me.nodeType.TEXT;

        var result = [];

        var node = null;

        for(var i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];

            if(nodes.nodeType != kTextNode) {
                result.push(node);
            }
        }

        return result;

    };

    //TODO: getChildrenById & comma delim

    //TODO: getChildrenWithId & comma delim

    //TODO: getElementsById & comma delim

    //TODO: getElementsWithId & comma delim

    //TODO: getElementsByAttribute & comma delim & space delim

    //TODO: getElementsWithAttribute & comma delim & space delim

    //TODO: getElementsByClassName belongs here & comma delim & space delim

    //TODO: getElementsWithClassName & comma delim & space delim

    //TODO: getFirstChildById

    //TODO: getFirstChildWithId

    //TODO: getLastChildById

    //TODO: getLastChildWithID

    //TODO: getFirstChildByClassName

    //TODO: getFirstChildWithClassName

    //TODO: getFirstChildByAttribute

    //TODO: getFirstChildWithAttribute

    //TODO: getLastChildByAttribute

    //TODO: getLastChildWithAttribute

    /**
     * @function {static} DomHelper.getPrevious
     *
     * <p>gets the previous <stronng>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
    comments
    //TODO: update ALL documentation of this file. for $(target)
    me.getPrevious = function(target) {

        //
        target = $(target);

        if(!target || typeof target != 'object') {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.nodeType != kTextNode) {

                return node;
            }

            //
            node = node.previousSibling;
        }

        return null;

    };

    /**
     * @function DomHelper.getPreviousById
     *
     * <p>gets the previous <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node.
     * @param {String} id - the id to check.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
    comments
    //TODO: I can have a comma delimeted list of ids.
    me.getPreviousById = function(target, id) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.id && node.id == id) {

                return node;
            }

            //
            node = node.previousSibling;
        }

        return null;
    };

    /**
     * @function {static} DomHelper.getPreviousWithId
     *
     * <p>gets the previous <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
    comments
    me.getPreviousWithId = function(target) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var node = target.previousSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.id) {

                return node;
            }

            //
            node = node.previousSibling;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getNext
     *
     * <p>gets the next <stronng>DOM</strong> node sibling that's not a text
     * node.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
    comments
    me.getNext = function(target) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var node = target.nextSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.nodeType != kTextNode) {

                return node;
            }

            //
            node = node.nextSibling;
        }

        return null;

    };

    /**
     * @function DomHelper.getNextById
     *
     * <p>gets the next <strong>DOM</strong> node sibling by its id.</p>
     *
     * @param {DomNode} target - the original node.
     * @param {String} id - the id to check.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
    comments
    //TODO: I can have a comma delimeted list of ids.
    me.getNextById = function(target, id) {

        //
        target = $(target);

        if(!target) {

            return null;
        }

        var node = target.nextSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.id && node.id == id) {

                return node;
            }

            //
            node = node.nextSibling;
        }

        return null;

    };

    /**
     * @function {static} DomHelper.getNextWithId
     *
     * <p>gets the next <strong>DOM</strong> node that has a defined
     * <strong>id</strong> attribute.</p>
     *
     * @param {DomNode} target - the node to start.
     * @return the found <strong>DOM</strong> node if any, <code>null</code>
     * otherwise.
    comments
    me.getNextWithId = function(target) {
        target = $(target);

        if(!target) {

            return null;
        }

        var node = target.nextSibling;

        if(!node) {

            return null;
        }

        var kTextNode = me.nodeType.TEXT;

        while(node) {
            if(node.id) {

                return node;
            }

            //
            node = node.nextSibling;
        }

        return null;

    };

}(o2, this));
/*global o2comments

/**
 * @module domhelper.style
 * @required domhelper.core
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
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.DomHelper;
    var $ = framework.$;
    var myName = framework.name;
    var toCamelCase = framework.StringHelper.toCamelCase;
    var toDashedFromCamelCase = framework.StringHelper.toDashedFromCamelCase;

    /*
     * Module configuration.
    comments
    var config = {

        /*
         *
        comments
        constants : {

            /*
             *
            comments
            regExp : {
                CAMEL_CASE : /(\-[a-z])/g,
                ALL_CAPS : /([A-Z])/g
            },

            /*
             *
            comments
            text : {
                DASH : '-'
            }

        }

    };

    /**
     * @function {static} DomHelper.addStyle
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
    comments
    me.addStyle = function(obj, style) {

        //
        obj = $(obj);

        if(!obj) {

            return;
        }

        var toCamelCaseCached = toCamelCase;

        for(var key in style) {
            if(style.hasOwnProperty(key)) {
                obj.style[toCamelCaseCached(key)] = style[key];
            }
        }

    };

    /**
     * @function {static} DomHelper.getStyle
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
    comments
    me.getStyle = function(obj, cssProperty) {

        //
        obj = $(obj);

        if(!obj) {

            return null;
        }

        if(document.defaultView) {
            me.getStyle = function(obj, cssProperty) {

                //
                obj = $(obj);

                if(!obj) {

                    return null;
                }

                var defaultView = document.defaultView;

                //
                cssProperty = toCamelCase(cssProperty);

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

            //
            obj = $(obj);

            if(!obj) {

                return;
            }

            var defaultView = window;

            //
            cssProperty = toCamelCase(cssProperty);

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
     * @function {static} DomHelper.isVisible
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
    comments
    me.isVisible = function(obj) {

        //
        obj = $(obj);

        if(!obj) {

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

        var display = me.getStyle(obj, 'display');
        var visibility = me.getStyle(obj, 'visibility');

        if(visibility == 'hidden') {

            return false;
        }

        if(display == 'none') {

            return false;
        }

        // @formatter:off
        return ((obj.offsetWidth !== 0 || obj.offsetHeight !== 0   )) ||
               ((display    === null   ) && (visibility != 'hidden')) ||
               ((visibility === null   ) && (display    != 'none'  )) ||
               ((display    != 'none'  ) && (visibility != 'hidden'));
        // @formtatter:on

    };

    /**
     * @function {static} DomHelper.activateAlternateStylesheet
     *
     * <p>Activates the <strong>alternate stylesheet</strong> with the given
     * <code>title</code>.</p>
     *
     * @param {String} title - the <code>title</code> of the <strong>alternate
     * stylesheet</strong> to activate.
    comments
    me.activateAlternateStylesheet = function(title) {

        var link = null;
        var t = t;
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
    comments
    me.hide = function(obj) {

        if(!obj || typeof obj != 'object') {

            return;
        }

        if(obj.style.display != 'none') {
            obj[[myName, '_oldDisplay'].join('')] = obj.style.display;
        }

        obj.style.display = 'none';

    };

    /**
     * @function {static} DomHelper.show
     * <p>Shows the given object.</p>
     * @param {DomNode} obj - the <strong>DOM</strong> node to hide.
    comments
    me.show = function(obj) {

        if(!obj || typeof obj != 'object') {

            return;
        }

        obj.style.display = obj[[myName, '_oldDisplay'].join('')] ? obj[[myName, '_oldDisplay'].join('')] : '';

        //
        delete obj[[myName, '_oldDisplay'].join('')];

    };

}(o2, this));
/*global o2comments

/**
 * @module domhelper.scroll
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A window/div scroll helper.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.DomHelper;

    /**
     * @function {static} DomHelper.scrollWindowToBottom
     *
     * <p>Scrolls window to bottom.</p>
    comments
    me.scrollWindowToBottom = function() {

        if(document.documentElement) {
            me.scrollWindowToBottom = function() {

                document.body.scrollTop = document.body.scrollHeight;
                document.documentElement.scrollTop = document.documentElement.scrollHeight;

            };


            me.scrollWindowToBottom();

            return;
        }

        me.scrollWindowToBottom = function() {

            document.body.scrollTop = document.body.scrollHeight;

        };


        me.scrollWindowToBottom();
    };

    /**
     * @function {static} DomHelper.scrollWindowToTop
     *
     * <p>Scrolls window to top.</p>
    comments
    me.scrollWindowToTop = function() {

        if(document.documentElement) {
            me.scrollWindowToTop = function() {

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            };


            me.scrollWindowToTop();

            return;

        }

        me.scrollWindowToTop = function() {

            document.body.scrollTop = 0;

        };


        me.scrollWindowToTop();
    };

    /**
     * @function {static} DomHelper.scrollObjectToTop
     *
     * <p>Scrolls an element to top.</p>
     *
     * @param {DomNode} obj - the element to scroll.
    comments
    me.scrollObjectToTop = function(obj) {

        obj.scrollTop = 0;

    };

    /**
     * @function {static} DomHelper.scrollObjectToBottom
     *
     * <p>Scrolls an element to bottom.</p>
     *
     * @param {DomNode} obj - the element to scroll.
    comments
    me.scrollObjectToBottom = function(obj) {

        obj.scrollTop = obj.scrollHeight;

    };

    /**
     * @function {static} DomHelper.scrollWindowToObject
     *
     * <p>Scrolls the window to the object's offset position..</p>
     *
     * @param {DomNode} obj - the element to scroll to.
    comments
    me.scrollWindowToObject = function(obj) {

        var offset = me.getOffset(obj);
        window.scrollTo(offset.left, offset.top);

    };

    /**
     * @function {static} DomHelper.getWindowScrollOffset
     *
     * <p>Gets the <strong>window</strong>'s scroll offset.</p>
     *
     * @return the the <strong>window</strong>'s scroll offset in the form
     * <code>{left: l, top: t}</code>.
    comments
    me.getWindowScrollOffset = function() {

        if(document.documentElement) {
            if(document.body && document.body.scrollLeft !== UNDEFINED) {
                me.getWindowScrollOffset = function() {

                    var left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
                    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

                    return {
                        left : left,
                        top : top
                    };

                };

                return me.getWindowScrollOffset();
            }

            me.getWindowScrollOffset = function() {

                var left = document.documentElement.scrollLeft;
                var top = document.documentElement.scrollTop;

                return {
                    left : left,
                    top : top
                };

            };

            return me.getWindowScrollOffset();
        }

        // IE quirksmode
        me.getWindowScrollOffset = function() {

            var left = document.body.scrollLeft;
            var top = document.body.scrollTop;

            return {
                left : left,
                top : top
            };

        };

        return me.getWindowScrollOffset();

    };

}(o2, this));
/*global o2comments


/**
 * @module domhelper.image
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>Includes image-related <strong>DOM</strong> helper methods.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.DomHelper;
    var nill = framework.nill;

    /**
     * @funciton {static} DomHelper.loadImage
     *
     * <p>Tries to load the image into a <strong>JavaScript</strong>
     * <code>Image</code> object; then triggers
     * <code>successCallback</code> or <code>failureCallback</code> depending on
     * the
     * result of the load attempt.</p>
     * <p>This function can be used for pre-loading or post-loading images.</p>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>image</strong>.
     * @param {Function} successCallback - gets called when the
     * <strong>image</strong> is loaded successfully.
     * @param {Function} failureCallback - gets called when the
     * <strong>image</strong> can <strong>not</strong> be loaded successfully.
    comments
    me.loadImage = function(url, succesCallback, failureCallback) {

        var succesCallbackCached = succesCallback || nill;
        var failureCallbackCached = failureCallback || nill;

        var testImg = new Image();

        testImg.onload = succesCallbackCached;
        testImg.onerror = failureCallbackCached;
        testImg.onabort = failureCallbackCached;
        testImg.src = url;

        return testImg;

    };

}(o2, this));
/*global o2comments

//TODO: add documentation.
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.DomHelper;

    me.trimField = function(field){

        //
        field = o2.$(field);

        if(!field){

            return null;
        }

        field.value = o2.StringHelper.trim(field.value);

        return field.value;
    };

    me.compactField = function(field){

        //
        field = o2.$(field);

        if(!field){

            return null;
        }

        field.value = o2.StringHelper.compact(field.value);

        return field.value;
    };

}(o2, this));
/*global o2comments

/**
 * @module domhelper.dimension
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>Includes dimension (<strong>i.e. width-height related</strong>) helper
 * methods.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases
    comments
    var me = framework.DomHelper;

    /**
     * @function {static} DomHelper.getDocumentDimension
     *
     * <p>Gets the dimension of the document in the form <code>{width: w, height:
     * h}</code>. If the visible (i.e. <code>clientHeight</code>) is greater than
     * the
     * document's height returns the height of the visible area as the height
     * portion.
     *
     * @return the dimension of the document in the form <code>{width: w, height:
     * h}</code>.
    comments
    me.getDocumentDimension = function() {

        if(document.documentElement) {
            me.getDocumentDimension = function() {

                var d = document;

                // d.body can be null when refreshing.
                if(!d || !d.body) {

                    return {
                        width : 0,
                        height : 0
                    };
                }

                // @formatter:off
                var height = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight,
                    d.body.offsetHeight, d.documentElement.offsetHeight,
                    d.body.clientHeight, d.documentElement.clientHeight);
                var width = Math.max(d.body.scrollWidth, d.documentElement.scrollWidth,
                       d.body.offsetWidth, d.documentElement.offsetWidth,
                       d.body.clientWidth, d.documentElement.clientWidth);
                // @formatter:on

                return {
                    width : width,
                    height : height
                };

            };

            return me.getDocumentDimension();
        }

        me.getDocumentDimension = function() {

            var d = document;

            if(!d || !d.body) {

                return {
                    width : 0,
                    height : 0
                };
            }

            var height = Math.max(d.body.scrollHeight, d.body.offsetHeight, d.body.clientHeight);
            var width = Math.max(d.body.scrollWidth, d.body.offsetWidth, d.body.clientWidth);

            return {
                width : width,
                height : height
            };

        };

        return me.getDocumentDimension();

    };

    /**
     * @function {static} DomHelper.getWindowInnerDimension
     *
     * <p>Gets the dimension of the visible area of the browser in the form
     * <code>{width: w, height: h}</code>.
     *
     * @return the dimension of the visible area of the browser in the form
     * <code>{width: w, height: h}</code>.
    comments
    me.getWindowInnerDimension = function() {

        if(window.innerWidth !== UNDEFINED) {
            me.getWindowInnerDimension = function() {

                if(!window) {

                    return {
                        width : 0,
                        height : 0
                    };
                }

                return {
                    width : window.innerWidth,
                    height : window.innerHeight
                };

            };

            return me.getWindowInnerDimension();
        }

        if(document.documentElement && document.documentElement.clientWidth) {
            me.getWindowInnerDimensions = function() {

                var d = document.documentElement;

                if(!d) {

                    return {
                        width : 0,
                        height : 0
                    };
                }

                return {
                    width : d.clientWidth,
                    height : d.clientHeight
                };

            };

            return me.getWindowInnerDimension();
        }

        me.getWindowInnerDimension = function() {

            var d = document.body;

            if(!d) {

                return {
                    width : 0,
                    height : 0
                };
            }

            return {
                width : d.clientWidth,
                height : d.clientHeight
            };

        };

        return me.getWindowInnerDimension();

    };

}(o2, this));
/*global o2comments

/**
 * @module domhelper.class
 * @requires stringhelper.core
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package to add/remove/modify <code>class</code>es.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework.DomHelper;
    var myName = framework.name;
    var $ = framework.$;
    var generateGuid = framework.StringHelper.generateGuid;


    /*
     *
    comments
    function createClassNameRegExp(c) {

        return new RegExp(['(\\s|^)', c, '(\\s|$)'].join(''));

    }

    /*
     *
    comments
    function filterChildren(children, regClassName) {

        var child = null;
        var result = [];

        for(var i = 0, len = children.length; i < len; i++) {
            child = children[i];
            if(regClassName.test(child.className)) {
                result.push(children[i]);
            }
        }

        return result;

    }

    /**
     * @function {static} DomHelper.hasClass
     *
     * <p>Checks whether an element has the given className.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return <code>true</code> if <strong>el</strong> has the
     * <code>className</code> <strong>c</strong>, <code>false</code> otherwise.
    comments
    me.hasClass = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return false;
        }

        return createClassNameRegExp(c).test(el.className);

    };

    /**
     * @function {static} DomHelper.addClass
     *
     * <p>Add a class to the given node.</p>
     *
     * @param {DomNode} el - the element to add.
     * @param {String} c - the className to add.
    comments
    me.addClass = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return;
        }

        if(me.hasClass(el, c)) {

            return;
        }

        el.className += [' ', c].join('');

    };

    /**
     * @function {static} DomHelper.removeClass
     *
     * <p>Removes a class from the given node.</p>
     *
     * @param {DomNode} el - the element to remove the class of.
     * @param {String} c - the className to remove.
    comments
    me.removeClass = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return;
        }

        if(!me.hasClass(el, c)) {

            return;
        }

        el.className = el.className.replace(createClassNameRegExp(c), ' ');

    };

    /**
     * @function {static} DomHelper.getChildrenByClassName
     *
     * <p>Gets immediate descendants, with a given class name, of the
     * element.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return the immediate descendants with the given class name.
    comments
    //TODO: add space delimited multiple classes.
    me.getChildrenByClassName = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return null;
        }

        //NOTE: IE7+ supports child selector ( > ), IE8+ supports
        // querySelectorAll

        if(el.querySelectorAll) {
            me.getChildrenByClassName = function(el, c) {

                //
                el = $(el);

                if(!el) {

                    return null;
                }

                var children = el.childNodes;

                if(!el.id) {
                    el.id = [myName, generateGuid()].join('');
                }

                return el.querySelectorAll(['#', el.id, ' > .', c].join(''));

            };

            return me.getChildrenByClassName(el, c);
        }

        me.getChildrenByClassName = function(el, c) {

            //
            el = $(el);

            if(!el) {

                return null;
            }

            var children = el.childNodes;

            return filterChildren(children, createClassNameRegExp(c));

        };

        return me.getChildrenByClassName(el, c);

    };

    /**
     * @function {static} DomHelper.getElementsByClassName
     *
     * <p>Gets all children, with a given class name, of the element.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return all of the elements with the given class name.
    comments
    //TODO: add space delimeted multiple classes
    me.getElementsByClassName = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return null;
        }

        if(el.querySelectorAll) {
            me.getElementsByClassName = function(el, c) {

                //
                el = $(el);

                if(!el) {

                    return null;
                }

                var children = el.getElementsByTagName('*');

                return el.querySelectorAll(['.', c].join(''));

            };

            return me.getElementsByClassName(el, c);
        }

        me.getElementsByClassName = function(el, c) {

            //
            el = $(el);

            if(!el) {

                return null;
            }

            var children = el.getElementsByTagName('*');

            return filterChildren(children, createClassNameRegExp(c));

        };

        return me.getElementsByClassName(el, c);

    };

}(o2, this));
/*global o2comments

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
/*global o2, escapecomments

/**
 * @module cookie.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>Cookie</strong> helper.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework;

    /**
     * @class {static} Cookie
     *
     * <p>A <strong>cookie</strong> helper class.</p>
    comments
    me.Cookie = {

        /**
         * @function {static} Cookie.save
         *
         * <p>Saves a <strong>cookie</strong>.
         *
         * @param {String} name - the name of the <strong>cookie</strong>.
         * @param {String} value - the value of the <strong>cookie</strong>.
         * @param {Integer} days - how many days should the
         * <strong>cookie</strong>
         * persist.
        comments
        save : function(name, value, days, path, domain, isSecure) {

            var ex = '';

            if(days) {
                var d = new Date();
                d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
                ex = '; expires=' + d.toGMTString();
            } else {
                ex = '';
            }

            var cookiePath = path ? path : '/';

            // Do not use encodeURICompoent for paths as it replaces / with
            // %2F
            var cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ex + '; path=' + escape(cookiePath);

            if(domain) {
                cookieString += '; domain=' + escape(domain);
            }

            if(isSecure) {
                cookieString += '; secure';
            }

            document.cookie = cookieString;

        },

        /**
         * @function {static} Cookie.read
         *
         * <p>Reads the value of the <strong>cookie</strong> with the given
         * name.</p>
         *
         * @param {String} name - the name of the <strong>cookie</strong> to
         * read.
         * @return the value of the <strong>cookie</strong>; or <code>null</code>
         * if the
         * <strong>cookie</strong> is not found.
        comments
        read : function(name) {

            var eq = [decodeURIComponent(name), '='].join('');
            var ca = document.cookie.split(';');

            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while(c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }

                if(c.indexOf(eq) === 0) {

                    return c.substring(eq.length, c.length);
                }
            }

            return null;

        },

        /**
         * @function {static} Cookie.remove
         *
         * <p>Removes a <strong>cookie</strong>.</p>
         *
         * @param {String} name - the name of the <strong>cookie</strong> to
         * remove.
        comments
        //TODO: update all documentation of this file.
        remove : function(name, path, domain, isSecure) {

            var cookiePath = path ? path : '/';
            var cookieDomain = domain ? domain : null;
            var isCookieSecure = !!isSecure;

            me.Cookie.save(name, '', -1, cookiePath, cookieDomain, isCookieSecure);

        },

        /**
         * @function {static} Cookie.removeAll
         *
         * <p>Removes all the <strong>HttpOnly</strong> cookies the belong the
         * the current domain
         * and all paths (i.e. "... <code>domain=example.com path=/;</code>"). If
         * the cookie is set for a specific subdomain,
         * or if it has a specific path other than "/", then it won't be deleted.
         * Similarly, if the cookie is not marked with <strong>HttpOnly</strong>
         * flag, it won't be deleted.</p>
        comments
        removeAll : function() {

            var cookies = document.cookie.split(";");

            // document.cookie = name + "=; expires=" + +new Date + "; domain=" +
            // domain + "; path=" + path;
            var remove = me.Cookie.remove;

            for(var i = 0, len = cookies.length; i < len; i++) {
                remove(cookies[i].split('=')[0]);
            }

        }

    };

}(o2, this));
/*global o2, ActiveXObjectcomments

/**
 * @module ajax.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser <strong>AJAX</strong> Wrapper.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework;
    var generateGuid = framework.StringHelper.generateGuid;
    var concat =framework.StringHelper.concat;
    var nill = framework.nill;

    /*
     * Module configuration.
    comments
    var config = {
        constants : {

            /*
             *
            comments
            prefix : {
                RANDOM : '?rnd='
            },

            /*
             *
            comments
            verb : {
                GET : 'GET',
                POST : 'POST'
            },

            /*
             *
            comments
            error : {
                NO_XHR : 'Failed to create an XHR instance'
            },

            /*
             *
            comments
            readystate : {
                COMPLETE : 4
            },

            /*
             *
            comments
            status : {
                OK : 200,
                CACHED : 304
            },

            /*
             *
            comments
            header : {

                /*
                 *
                comments
                common : [{
                    //setting X-Requested-With header causes problem in ejabberd
                    // requests.
                    //'X-Requested-With': 'XmlHTTPRequest',
                    'Accept' : 'text/javascript, text/html, application/xml, text/xml,comments*'
                }],

                /*
                 *
                comments
                post : [{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }]

            },

            /*
             *
            comments
            GUID_MULTIPLIER : 10000

        },

        // @formatter:off
        progId : [
            'Msxml2.XMLHTTP',
            'Microsoft.XMLHTTP',
            'Msxml2.XMLHTTP.7.0',
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.5.0',
            'Msxml2.XMLHTTP.3.0'
       ]
       // @formatter:on

    };

    /*
     * <p>Creates a brand new <code>XmlHttpRequest</code> object.</p>
    comments
    var createXhr = function() {

        var request = null;

        var constants = config.constants;

        var kNoXhr = constants.error.NO_XHR;

        if(window.XMLHttpRequest) {
            createXhr = function() {

                return new XMLHttpRequest();

            };

            request = createXhr();

            if(!request) {

                throw kNoXhr;
            }

            return request;

        }

        var progId = null;
        var progIds = config.progId;

        while(progIds.length > 0) {
            progId = progIds.shift();

            try {

                request = new ActiveXObject(progId);

                break;

            } catch(ignore) {

            }
        }

        if(!request) {

            throw kNoXhr;
        }

        //
        createXhr = function() {

            return new ActiveXObject(progId);

        };

        return request;

    };

    /*
     * <p>Good boys clean their mess ;)</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
    comments
    function finalizeXhr(xhr) {

        if(!xhr) {

            return;
        }

        // To avoid memory leaks.
        xhr.onreadystatechange = nill;

    }

    /*
     * <p>Processes callbacks and finalizes the <code>Xhr</code>.</p>
     *
     * @param {XmlHttpRequest} xhr - the current <code>Xhr</code> instance.
     * @param {Object} callbacks - oncomplete, onerror and onexception callbacks.
    comments
    function processCallbacks(xhr, callbacks) {

        var nillCached = nill;
        var constants = config.constants;

        var kComplete = constants.readystate.COMPLETE;
        var kOk = constants.status.OK;
        var kCached = constants.status.CACHED;
        
        //
        callbacks = callbacks || {};

        var oncomplete = callbacks.oncomplete || nillCached;
        var onerror = callbacks.onerror || nillCached;
        var onexception = callbacks.onexception || nillCached;

        var status = xhr.status;
        var isSuccess = status == kOk || status == kCached;

        try {

            if(isSuccess) {
                oncomplete(xhr.responseText, xhr.responseXML, xhr);

                return;
            }

            onerror(xhr.status, xhr.statusText, xhr);

        } catch(ex) {

            onexception(xhr, ex);

        } finally {

            finalizeXhr(xhr);

        }

    }

    /*
     * <p>Registers the callbacks to the XmlHttpRequest instance.</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
     * @param {Object} callbacks - An object of the form
     * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
     * statusText),
     * onexception: fn(originalXhr, exception)}. Any of these callbacks are
     * optional.
    comments
    function registerCallbacks(xhr, callbacks) {

        if(!xhr) {

            return;
        }

        if(xhr.isInitialized) {

            return;
        }

        var nillCached = nill;

        var oncomplete = callbacks.oncomplete ? callbacks.oncomplete : nillCached;
        var onerror = callbacks.onerror ? callbacks.onerror : nillCached;
        var onexception = callbacks.onexception ? callbacks.onexception : nillCached;

        xhr.onreadystatechange = function() {

            var status = null;
            var isSuccess = false;

            var constants = config.constants;

            var kComplete = constants.readystate.COMPLETE;
            var kOk = constants.status.OK;
            var kCached = constants.status.CACHED;

            if(xhr.readyState == kComplete) {
                processCallbacks(xhr, callbacks);
            }

        };


        xhr.isInitialized = true;

    }

    /*
     * <p>Adds headers.</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
     * @param {Object} headers - a config.constants.headers.* collection.
    comments
    function addHeaders(xhr, headers) {

        var header = null;

        for(var i = 0, len = headers.length; i < len; i++) {
            header = headers[i];

            for(var key in header) {
                if(header.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, header[key]);
                }
            }
        }

    }

    /*
     * <p>Adds common request headers.</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
    comments
    function addCommonRequestHeaders(xhr) {

        addHeaders(xhr, config.constants.header.common);

    }

    /*
     * <p>Adds request headers specific to <code>POST</code> requests.</p>
     *
     * @param {XmlHttpRequest} xhr - the original <code>XmlHttpRequest</code>
     * object.
    comments
    function addPostRequestHeaders(xhr) {

        addHeaders(xhr, config.constants.header.post);

    }

    /*
     * <p>Parses the params JSON and returns a <code>String</code> of
     * the form "&name1=value1&name2=value2"</p>
    comments
    function generateParametrizeQueryString(params) {

        var name = '';
        var value = '';
        var buffer = [];

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                buffer.push([encodeURIComponent(key), '=', encodeURIComponent(params[key])].join(''));
            }
        }

        return buffer.join('&').replace(/%20/g, '+');

    }

    /*
     * <p>Sends the request.</p>
     *
     * @see {@link Ajax.get} and {@link Ajax.post} for details.
     * @return the original <code>XmlHttpRequest</code>
    comments
    function send(url, verb, parameters, callbacks, isSync) {

        if(!url) {

            return null;
        }
        
        //
        parameters = parameters || {};
        callbacks = callbacks || {};
        isSync = !!isSync;
        
        var isAsync = !isSync;

        var kRandom = config.constants.prefix.RANDOM;
        var kGet = config.constants.verb.GET;
        var isPost = verb != kGet;

        // name1=value1&name2=value2&name3=value3
        var parametrizedQuery = generateParametrizeQueryString(parameters);

        // &name1=value1&name2=value2&name3=value3 (for GET requests)
        var query = isPost ? '' : ['&', parametrizedQuery].join('');

        // name1=value1&name2=value2&name3=value3 (for POST requests)
        var postQuery = isPost ? parametrizedQuery : '';

        // A unique string to prevent caching.
        var guid = generateGuid();

        // http://example.com + ?rnd= + {guid} + &name1=value1
        url = concat(url, kRandom, guid, query);

        // Create a cross-browse XmlHttpRequest.
        var xhr = createXhr();

        // Open the connection.
        xhr.open(verb, url, isAsync);

        // Add headers.
        addCommonRequestHeaders(xhr);

        if(isPost) {
        
            // Add more headers.
            addPostRequestHeaders(xhr);
        }

        // Register callbacks.
        registerCallbacks(xhr, callbacks);

        // Send the request.
        try {

            xhr.send(postQuery);

        } catch(exception) {

            callbacks.onexception(xhr, exception);

        }

        if(isSync) {
        
            // If the request is sync, process response immediately.
            processCallbacks(xhr, callbacks);
        }

        return xhr;

    }

    /**
     * @class {static} Ajax
     *
     * <p>A <strong>static</strong> class for making <strong>AJAX</strong>
     * <strong>GET</strong> and
     * <strong>POST</strong> requests.</p>
    comments
    me.Ajax = {

        /**
         * @function {static} Ajax.post
         *
         * <p>Sends an <strong>AJAX POST</strong> request.</p>
         *
         * @param {String} url - the <strong>URL</strong> to send the request.
         * @param {Object} parameters - parameters collection as a
         * <strong>name/value</strong> pair object ({}).
         * @param {Object} callbacks - An object of the form
         * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
         * statusText),
         * onexception: fn(originalXhr, exception)}.
         * Any of these callbacks are optional.
         * @param {Boolean} isSync - (optional defaults to <code>false</code>).
         * Set this
         * <code>true</code> for sending a <strong>snychronous</strong> request.
         * @return the original <code>XmlHttpRequest</code> object.
        comments
        post : function(url, parameters, callbacks, isSync) {

            return send(url, config.constants.verb.POST, parameters, callbacks, isSync);

        },

        /**
         * @function {static} Ajax.get
         *
         * <p>Sends and <strong>AJAX GET</strong> request.</p>
         *
         * @param {String} url - the URL to send the request.
         * @param {Object} parameters - parameters collection as a name/value
         * pair object
         * ({}).
         * @param {Object} callbacks - An object of the form
         * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
         * statusText),
         * onexception: fn(originalXhr, exception)}.
         * Any of these callbacks are optional.
         * @param {Boolean} isSync - (optional defaults to <code>false</code>).
         * Set this
         * <code>true</code> for sending a snychronous request.
         * @return the original <code>XmlHttpRequest</code> object.
        comments
        get : function(url, parameters, callbacks, isSync) {

            return send(url, config.constants.verb.GET, parameters, callbacks, isSync);

        },

        /**
         * @function {static} Ajax.createXhr
         *
         * <p>Creates a native <code>XmlHttpRequest</code> object.
         * <p>This is a <strong>low-level</strong> function; it simply returns
         * the
         * browser's
         * native object.
         * You may most probably want to use {@link Ajax.get} or {@link
         * Ajax.post}
         * instead, for more functionality.
         *
         * @return the created <code>XmlHttpRequest</code> object.
        comments
        createXhr : function() {

            return createXhr();

        }

    };

}(o2, this));
/*global o2comments

/**
 * @module ajaxstate
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A Model for controlling AJAX timeouts etc.</p>
 * <p>An {@link AjaxController} should be registered to this model.</p>
comments
( function(framework, window, UNDEFINED) {
    //*

    /*
     * Aliases.
    comments
    var me = framework;

    /**
     * @class {static} AjaxState
     * @implements Observable
     *
     * <p>A <code>Model</code> for the available <code>AjaxController</code>
     * objects.</p>
     * <p>Implements the <code>Observable</code> interface.</p>
     *
     * <p>See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observable.html</p>
    comments
    me.AjaxState = {

        /**
         * @function {static} AjaxState.init
         *
         * <p>Initializes the <strong>object</strong> and starts notifying
         * registered
         * <strong>observer</strong>s.</p>
        comments
        init : function() {

            var listen = this.protecteds.listen;

            listen(this);

        },

        /**
         * @function {static} AjaxState.addObserver
         *
         * <p>An implementation of the <code>Observer.addObserver</code>
         * method.</p>
         * <p>Registers an <code>Observer</code>.</p>
         *
         * @param {Object} observer - the <code>Observer</code> to register.
        comments
        addObserver : function(observer) {

            var hasObserver = this.protecteds.hasObserver;

            //!
            if(hasObserver.apply(this.protecteds, [observer])) {

                return;
            }

            var observers = this.protecteds.observers;

            observers.push({
                object : observer,
                meta : {
                    registrationTime : (new Date()).getTime(),
                    timeout : (observer.timeout || null)
                }
            });

        },

        /**
         * @function {static} AjaxState.deleteObserver
         *
         * <p>An implementation of the <code>Observer.deleteObserver</code>
         * method.</p>
         * <p>Removes an <code>Observer</code>.</p>
         *
         * @param {Object} observer - the <code>Observer</code> to remove.
        comments
        deleteObserver : function(observer) {

            // This is an already-deleted zombie object.
            // No need for further processing.
            if(observer.isDeleted) {

                return true;
            }

            var observers = this.protecteds.observers;

            for(var i = 0, len = observers.length; i < len; i++) {
                if(observer == observers[i].object) {
                    observers.splice(i, 1).isDeleted = true;

                    return true;
                }
            }

            return false;

        },

        /**
         * @function {static} AjaxState.countObservers
         *
         * <p>An implementation of the <code>Observer.countObservers</code>
         * method.</p>
         * <p>Gets the <code>Observer</code> count.</p>
         *
         * @return the number of registered <code>Observer</code>s.
        comments
        countObservers : function() {

            return this.protecteds.observers.length;

        },

        /**
         * @function {static} AjaxState.deleteObservers
         *
         * <p>An implementation of the <code>Observer.deleteObservers</code>
         * method.</p>
         * <p>Unregisteres all of the registered <code>Observer</code>s.</p>
        comments
        deleteObservers : function() {

            this.protecteds.observers.length = 0;

        },

        /**
         * @function {static} AjaxState.timeoutObservers
         *
         * <p>Sends a timeout request and unregisters the given
         * <code>Observer</code>s.</p>
         *
         * @param {Array} observers - A collection of {link AjaxController}
         * objects.
         * @param {Object} data - the data to pass to the <code>Observer</code>s.
        comments
        timeoutObservers : function(observers, data) {

            var observer = null;

            for(var i = 0, len = observers.length; i < len; i++) {
                observer = observers[i].object;
                observer.update(this, {
                    isTimedOut : true,
                    data : data
                });
                observer.unregister(this);
            }

        },

        /**
         * @function {static} AjaxState.timeoutAllObservers
         *
         * <p>Sends a timeout request and unregisters all registered
         * <code>Observer</code>s.</p>
         *
         * @param {Object} data - the data to pass to the <code>Observer</code>s.
        comments
        timeoutAllObservers : function(data) {

            this.timeoutObservers(this.protecteds.observers, data);

        },

        protecteds : {

            /**
             * @struct {protected readonly} AjaxState.protecteds.config
             *
             * <p>Module configuration.</p>
            comments
            config : {
                LISTEN_TIMEOUT : 1000
            },

            /**
             * @struct {protected readonly} AjaxState.state
             *
             * <p>Internal state.</p>
            comments
            state : {
                listenTimeoutId : null
            },

            /**
             * @property {protected readonly Array}
             * AjaxState.observers
             *
             * <p>A collection of the registered <code>Observer</code>s.</p>
            comments
            observers : [],

            /**
             * @function {static protected} AjaxState.protecteds.hasObserver
             *
             * <p>This method is protected, don't call it from outside.</p>
            comments
            hasObserver : function(observer) {

                // static scope:*
                //
                // That is to say, this method (and all other static methods in
                // here) will see the scope of this closure ( ( function(...,
                // window, UNDEFINED) { ... ) when they are extended via
                //
                // NewClass.hasObserver = AjaxState.hasObserver
                //
                // even using
                //
                // NewClass.hasObserver = MethodHelper.clone(NewClass,
                // AjaxState.hasObserver);
                //
                // will not change this fact.

                var observers = this.observers;

                for(var i = 0, len = observers.length; i < len; i++) {
                    if(observer.object === observers[i]) {

                        return true;
                    }
                }

                return false;

            },

            /**
             * @function {static protected} AjaxState.protecteds.listen
             *
             * <p>This method is protected, don't call it from outside.</p>
             *
             * Works somewhat similar to the <code>notifyObservers</code>
             * method in the <code>Observer</code> pattern.
            comments
            listen : function(stateObject) {

                var now = (new Date()).getTime();
                var i = 0;
                var observers = stateObject.protecteds.observers;
                var config = stateObject.protecteds.config;
                var state = stateObject.protecteds.state;
                var len = observers.length;
                var observer = null;
                var meta = null;
                var timeout = null;
                var registrationTime = null;
                var shouldNotifyObserver = false;

                var listen = stateObject.protecteds.listen;

                if(!len) {
                    clearTimeout(state.listenTimeoutId);
                    state.listenTimeoutId = setTimeout(function() {
                        listen(stateObject);
                    }, config.LISTEN_TIMEOUT);

                    return;
                }

                var unregisterQueue = [];

                for( i = 0, len = observers.length; i < len; i++) {
                    observer = observers[i];
                    meta = observer.meta;
                    timeout = meta.timeout;
                    registrationTime = meta.registrationTime;

                    if(!timeout) {

                        throw 'Please specify timeout meta data for the observer';
                    }
                    shouldNotifyObserver = (now - registrationTime > timeout);

                    if(!shouldNotifyObserver) {

                        continue;
                    }

                    // "These are not the droids you're looking for."; unregister
                    // 'em.
                    unregisterQueue.push(observer);
                }

                stateObject.timeoutObservers(unregisterQueue);

                clearTimeout(state.listenTimeoutId);

                state.listenTimeoutId = setTimeout(function() {
                    stateObject.protecteds.listen(stateObject);
                }, config.LISTEN_TIMEOUT);

            }

        }
    };

}(o2, this));
/*global o2comments

/**
 * @module ajaxcontroller
 * @requires AjaxState
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
comments
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
    comments
    var me = framework;
    var nill = framework.nill;
    var addObserver = framework.AjaxState.addObserver;

    /**
     * @class AjaxController
     * @implements Observer
     *
     * <p>An AJAX <code>Controller</code>. Registers itself to {@link
     * AjaxState}
     * <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
    comments

    /**
     * @constructor AjaxController.AjaxController
     *
     * See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
    comments
    me.AjaxController = function(xhr, args) {

        this.xhr = xhr;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || nill;

        // Register self.
        addObserver(this);

    };

    var apt = me.AjaxController.prototype;

    /**
     * @function AjaxController.update
     *
     * <p>Implementation of the <code>Observer.update</code> interface
     * method.</p>
     *
     * @param {Observable} observable - the responsible <code>Observable</code>.
     * @param {Object} data - parameters passed from the <code>Observable</code>
     * to
     * this <code>Observer</code>.
    comments
    apt.update = function(observable, data) {

        if(!data.isTimedOut) {

            return;
        }

        // Unregister self from the observable.
        this.unregister(observable);

        // Abort the request.
        this.xhr.abort();

        // Execute callback.
        this.ontimeout();

    };

    /**
     * @function AjaxController.unregister
     *
     * <p>Unregisters the object from the observer.</p>
     * <p>Call this when the <strong>AJAX</strong> request completes.</p>
     *
     * @param {Observable} observable - the responsible <code>Observable</code>.
    comments
    apt.unregister = function(observable) {

        if(this.isDeleted) {

            return;
        }

        observable.deleteObserver(this);

    };

}(o2, this));
