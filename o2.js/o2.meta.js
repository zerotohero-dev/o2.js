/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */
this.o2 = this.o2 || {isProduction : false};

/**
 * @module core.meta
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-01 14:46:49.973159
 * -->
 *
 * <p>Meta information.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Common Constants
     */

    var kAny    = '*';
    var kEmpty  = '';
    var kObject = 'object';
    var kString = 'string';

    /*
     *
     */
    function dbg() {

        // We need to stop execution and observe what went wrong if an invalid
        // assignment happens while construcing the framework. The only way we
        // can achieve this is using the "debugger;" statement. And if we do not
        // encapsulate the "debugger;" statement with "eval", YUICompressor
        // whines about it and does not compress the code.
        //
        // Also JSLint, rightfully, warns about the below eval usage, but
        // there's no other way around.
        //
        // All in all, "eval is 'evil'; and the below ("eval('debugger');")
        // decleration is a rare and legitimate usage of that evil ;)
        eval('debugger');
    }

    /*
     *
     */
    function init(root, key, value) {
        if (!root || typeof root !== kObject) {
            return null;
        }

        if (root[key]) {
            return root[key];
        }

        root[key] = value;

        return root[key];
    }

    /*
     * Creates a namespace if it does not exists and returns it;
     * returns the existing namespace otherwise.
     */
    function namespace(root, key) {
        if (!root || typeof root !== kObject) {
            return null;
        }

        return init(root, key, {});
    }

    var fp = init(framework, 'protecteds', {});

    /*
     *
     */
    var isProduction = framework.isProduction;

    /*
     * @property {protected Object} o2.protecteds.classes
     *
     * <p><storng>Caution:<strong> Highly explosive! Do not mess with it
     * unless you know what you are doing <strong>;)</strong></p>
     *
     * <p>This is a meta-level overview of the <strong>o2.js</strong>
     * framework Any public class and method that <strong>o2.js</storng> uses is
     * listed here.</p>
     *
     * <p>This list is used for constructing classes at script's
     * <strong>evaluation time</strong>, and it's not used afterwards.
     * Therefore, changing the list after the scripts are loaded will have
     * no effect at all.</p>
     *
     * <p>This structure is especially useful while running automated unit
     * tests and checking the consistency of the overall framework.</p>
     */

    var kDelegateNotdefined   = 'framework.protecteds: Delegate is undefined: ';
    var kMethodAlreadyDefined = 'framework.protecteds: Method name is already defined : ';
    var kMethodNameNotString  = 'framework.protecteds: "method" should be  a String.';
    var kNameNotProvided      = 'framework.protecteds: name not provided';
    var kNoMetaDefinition     = 'framework.protecteds: no meta definition.';
    var kObjectNotDefined     = 'framework.protecteds: Object not found in mixed collection';
    var kObjNameNotString     = 'framework.protecteds: "name" should be  a String.';
    var kRootNotFound         = 'framework.protecteds: root not found';

    /*
     *
     */
    function getClassNotDefinedWarning(name) {
        return ['framework.protecteds: Class "', name,
            '" is not defined yet.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodNotDefinedInMetaWarning(name) {
        return ['framework.protecteds: Method"', name,
            '" is not found in framework meta definition'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodNotDefinedInFrameworkWarning(name) {
        return ['framework.protecteds: method  "', name,
            '" does not exist in framework.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getClassNotDefinedInMetaWarning(name) {
        return ['framework.protecteds: Class "', name,
            '" is not defined in meta definition.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodOfClassNotDefinedInMetaWarning(name, method) {
        return ['framework.protecteds: Class "', name,
            '" does not have a method "', method,
            '"" defined in meta definition.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getClassDoesNotExistWarning(name) {
        return ['framework.protecteds: Class "', name,
            '" does not currently exist.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getMethodOfClassDoesNotExistWarning(name, method) {
        return ['framework.protecteds: Class "', name,
            '" does not have a method "', method,
            '"" defined.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getRootDoesNotHaveAttributeWarning(name) {
        return ['framework.protecteds: ',
            'root does not have an attribute "', name, '".'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getConstructorAlreadyDefinedWarning(name) {
        return ['framework.protecteds: Constructor "',
            name, '" is already defined.'
        ].join(kEmpty);
    }

    /*
     *
     */
    function getNoMethodToOverrideWarning(name) {
        return ['framework.protecteds: No method "',
            name, '" to override.'
        ].join(kEmpty);
    }

    function getIncorrectMetaDefinitionWarning(name) {
        return ['framework.protecteds: Incorrect meta definition for "',
            name, '".'
        ].join(kEmpty);
    }

    /*
     * These constants save some space during minification:
     */
     var kAjaxControllerCore    = 'ajaxcontroller.core';
     var kAjaxCore              = 'ajax.core';
     var kAjaxExtend            = 'ajax.extend';
     var kAjaxStateCore         = 'ajaxstate.core';
     var kCollectionCore        = 'collection.core';
     var kCookieCore            = 'cookie.core';
     var kCore                  = 'core';
     var kDebuggerCore          = 'debugger.core';
     var kDateCore              = 'date.core';
     var kDomClass              = 'dom.class';
     var kDomConstants          = 'dom.constants';
     var kDomCore               = 'dom.core';
     var kDomDimension          = 'dom.dimension';
     var kDomForm               = 'dom.form';
     var kDomLoad               = 'dom.load';
     var kDomModify             = 'dom.modify';
     var kDomReady              = 'dom.ready';
     var kDomScroll             = 'dom.scroll';
     var kDomStyle              = 'dom.style';
     var kDomTraverse           = 'dom.traverse';
     var kEventConstants        = 'event.constants';
     var kEventCore             = 'event.core';
     var kEventExtend           = 'event.extend';
     var kExtend                = 'extend';
     var kJsonpCore             = 'jsonp.core';
     var kJsonpControllerCore   = 'jsonpcontroller.core';
     var kJsonpStateCore        = 'jsonpstate.core';
     var kMethodCore            = 'method.core';
     var kMethodEvent           = 'method.event';
     var kMethodInherit         = 'method.inherit';
     var kMethodRepeat          = 'method.repeat';
     var kMethodTimer           = 'method.timer';
     var kMethodTranspose       = 'method.transpose';
     var kObjectCore            = 'object.core';
     var kQueryStringCore       = 'querystring.core';
     var kSortDelegateCore      = 'sortdelegate.core';
     var kStringCore            = 'string.core';
     var kStringEncode          = 'string.encode';
     var kStringStrip           = 'string.strip';
     var kStringTransform       = 'string.transform';
     var kSupportsCore          = 'supports.core';
     var kTemplateCore          = 'template.core';
     var kTimerCore             = 'timer.core';
     var kTryCore               = 'try.core';
     var kUnitCore              = 'unit.core';
     var kValidationCore        = 'validation.core';
     var kValidationRegExp      = 'validation.regexp';

     init(fp, 'classes', {
        o2 : {
            items : {
                $          : {MODULE : kCore},
                build      : {MODULE : kCore},
                load       : {MODULE : kCore},
                longName   : {MODULE : kCore},
                name       : {MODULE : kCore},
                nill       : {MODULE : kCore},
                noConflict : {MODULE : kCore},
                now        : {MODULE : kCore},
                ready      : {MODULE : kCore},
                url        : {MODULE : kCore},
                version    : {MODULE : kCore},

                n  : {MODULE : kExtend},
                nn : {MODULE : kExtend},
                t  : {MODULE : kExtend},
                tt : {MODULE : kExtend}

            }
        },
        Ajax : {
            items : {
                 abort     : {MODULE : kAjaxCore},
                 createXhr : {MODULE : kAjaxCore},
                 get       : {MODULE : kAjaxCore},
                 post      : {MODULE : kAjaxCore},

                 getSingle  : {MODULE : kAjaxExtend},
                 postSingle : {MODULE : kAjaxExtend}
            }
        },
        AjaxController : {
            items : {
                unregister : {MODULE : kAjaxControllerCore},
                update     : {MODULE : kAjaxControllerCore}
            }
        },
        AjaxState : {
            items : {
                protecteds          : {MODULE : kAjaxStateCore},

                addObserver         : {MODULE : kAjaxStateCore},
                countObservers      : {MODULE : kAjaxStateCore},
                deleteObserver      : {MODULE : kAjaxStateCore},
                deleteObservers     : {MODULE : kAjaxStateCore},
                init                : {MODULE : kAjaxStateCore},
                timeoutObservers    : {MODULE : kAjaxStateCore},
                timeoutAllObservers : {MODULE : kAjaxStateCore}
            }
        },
        Collection : {
            items : {
                any                 : {MODULE : kCollectionCore},
                clear               : {MODULE : kCollectionCore},
                clone               : {MODULE : kCollectionCore},
                compact             : {MODULE : kCollectionCore},
                contains            : {MODULE : kCollectionCore},
                copy                : {MODULE : kCollectionCore},
                detect              : {MODULE : kCollectionCore},
                diff                : {MODULE : kCollectionCore},
                each                : {MODULE : kCollectionCore},
                every               : {MODULE : kCollectionCore},
                exclude             : {MODULE : kCollectionCore},
                extend              : {MODULE : kCollectionCore},
                filter              : {MODULE : kCollectionCore},
                find                : {MODULE : kCollectionCore},
                flatten             : {MODULE : kCollectionCore},
                fold                : {MODULE : kCollectionCore},
                foldR               : {MODULE : kCollectionCore},
                forEach             : {MODULE : kCollectionCore},
                getCount            : {MODULE : kCollectionCore},
                getDifference       : {MODULE : kCollectionCore},
                getFirst            : {MODULE : kCollectionCore},
                getFirstN           : {MODULE : kCollectionCore},
                getFunctions        : {MODULE : kCollectionCore},
                getKeys             : {MODULE : kCollectionCore},
                getLast             : {MODULE : kCollectionCore},
                getLastN            : {MODULE : kCollectionCore},
                getLength           : {MODULE : kCollectionCore},
                getMax              : {MODULE : kCollectionCore},
                getMethods          : {MODULE : kCollectionCore},
                getMin              : {MODULE : kCollectionCore},
                getRest             : {MODULE : kCollectionCore},
                getSize             : {MODULE : kCollectionCore},
                getSortedIndex      : {MODULE : kCollectionCore},
                getValues           : {MODULE : kCollectionCore},
                grep                : {MODULE : kCollectionCore},
                group               : {MODULE : kCollectionCore},
                inArray             : {MODULE : kCollectionCore},
                includes            : {MODULE : kCollectionCore},
                indexOf             : {MODULE : kCollectionCore},
                intersect           : {MODULE : kCollectionCore},
                invoke              : {MODULE : kCollectionCore},
                isEmpty             : {MODULE : kCollectionCore},
                lastIndexOf         : {MODULE : kCollectionCore},
                map                 : {MODULE : kCollectionCore},
                merge               : {MODULE : kCollectionCore},
                pluck               : {MODULE : kCollectionCore},
                reduce              : {MODULE : kCollectionCore},
                reduceRight         : {MODULE : kCollectionCore},
                reject              : {MODULE : kCollectionCore},
                removeElement       : {MODULE : kCollectionCore},
                removeElementByValue: {MODULE : kCollectionCore},
                select              : {MODULE : kCollectionCore},
                shuffle             : {MODULE : kCollectionCore},
                some                : {MODULE : kCollectionCore},
                sort                : {MODULE : kCollectionCore},
                touch               : {MODULE : kCollectionCore},
                toArray             : {MODULE : kCollectionCore},
                union               : {MODULE : kCollectionCore},
                unique              : {MODULE : kCollectionCore},
                zip                 : {MODULE : kCollectionCore}
            }
        },
        Cookie : {
            items : {
                read   : {MODULE : kCookieCore},
                remove : {MODULE : kCookieCore},
                save   : {MODULE : kCookieCore}
            }
        },
        Debugger : {
            items : {
                assert  : {MODULE : kDebuggerCore},
                error   : {MODULE : kDebuggerCore},
                info    : {MODULE : kDebuggerCore},
                init    : {MODULE : kDebuggerCore},
                log     : {MODULE : kDebuggerCore},
                println : {MODULE : kDebuggerCore},
                warn    : {MODULE : kDebuggerCore}
            }
        },
        Date : {
            items : {
                getPrettyDate : {MODULE : kDateCore},
                getTime       : {MODULE : kDateCore},
                now           : {MODULE : kDateCore}
            }
        },
        Dom : {
            items : {
                nodeType : {MODULE : kDomConstants},

                append                  : {MODULE : kDomCore},
                create                  : {MODULE : kDomCore},
                createDocumentFragment  : {MODULE : kDomCore},
                createElement           : {MODULE : kDomCore},
                empty                   : {MODULE : kDomCore},
                getAttribute            : {MODULE : kDomCore},
                getHtml                 : {MODULE : kDomCore},
                getText                 : {MODULE : kDomCore},
                insertAfter             : {MODULE : kDomCore},
                insertBefore            : {MODULE : kDomCore},
                isDocument              : {MODULE : kDomCore},
                isElement               : {MODULE : kDomCore},
                prepend                 : {MODULE : kDomCore},
                remove                  : {MODULE : kDomCore},
                removeChildren          : {MODULE : kDomCore},
                removeEmpty             : {MODULE : kDomCore},
                removeEmptyTextNodes    : {MODULE : kDomCore},
                removeNode              : {MODULE : kDomCore},
                setAttribute            : {MODULE : kDomCore},
                setHtml                 : {MODULE : kDomCore},

                addClass              : {MODULE : kDomClass},
                createClassNameRegExp : {MODULE : kDomClass},
                hasClass              : {MODULE : kDomClass},
                removeClass           : {MODULE : kDomClass},
                toggleClass           : {MODULE : kDomClass},

                getDimension            : {MODULE : kDomDimension},
                getDocumentDimension    : {MODULE : kDomDimension},
                getDocumentHeight       : {MODULE : kDomDimension},
                getDocumentWidth        : {MODULE : kDomDimension},
                getHeight               : {MODULE : kDomDimension},
                getViewportInfo         : {MODULE : kDomDimension},
                getWidth                : {MODULE : kDomDimension},
                getWindowInnerDimension : {MODULE : kDomDimension},
                getWindowInnerHeight    : {MODULE : kDomDimension},
                getWindowInnerWidth     : {MODULE : kDomDimension},
                setDimension            : {MODULE : kDomDimension},
                setHeight               : {MODULE : kDomDimension},
                setWidth                : {MODULE : kDomDimension},

                compactField          : {MODULE : kDomForm},
                preventMultipleSubmit : {MODULE : kDomForm},
                trimField             : {MODULE : kDomForm},

                loadCss    : {MODULE : kDomLoad},
                loadImage  : {MODULE : kDomLoad},
                loadScript : {MODULE : kDomLoad},

                replace : {MODULE : kDomModify},
                unwrap  : {MODULE : kDomModify},
                wrap    : {MODULE : kDomModify},

                ready : {MODULE : kDomReady},

                getObjectScrollOfset  : {MODULE : kDomScroll},
                getScrollOffset       : {MODULE : kDomScroll},
                getWindowScrollOffset : {MODULE : kDomScroll},
                scrollObjectToBottom  : {MODULE : kDomScroll},
                scrollObjectToTop     : {MODULE : kDomScroll},
                scrollTo              : {MODULE : kDomScroll},
                scrollToObject        : {MODULE : kDomScroll},
                scrollWindowToBottom  : {MODULE : kDomScroll},
                scrollWindowToObject  : {MODULE : kDomScroll},
                scrollWindowToTop     : {MODULE : kDomScroll},

                activateAlternateStylesheet : {MODULE : kDomStyle},
                addCssRules                 : {MODULE : kDomStyle},
                addStyle                    : {MODULE : kDomStyle},
                getCss                      : {MODULE : kDomStyle},
                getStyle                    : {MODULE : kDomStyle},
                hide                        : {MODULE : kDomStyle},
                isVisible                   : {MODULE : kDomStyle},
                setCss                      : {MODULE : kDomStyle},
                setStyle                    : {MODULE : kDomStyle},
                show                        : {MODULE : kDomStyle},
                toggleVisibility            : {MODULE : kDomStyle},

                getChildren                   : {MODULE : kDomTraverse},
                getChildrenByAttribute        : {MODULE : kDomTraverse},
                getChildrenByAttributeUntil   : {MODULE : kDomTraverse},
                getChildrenByClass            : {MODULE : kDomTraverse},
                getChildrenByClassUntil       : {MODULE : kDomTraverse},
                getChildrenUntil              : {MODULE : kDomTraverse},
                getChildrenWithAttribute      : {MODULE : kDomTraverse},
                getChildrenWithAttributeUntil : {MODULE : kDomTraverse},
                getChildrenWithClass          : {MODULE : kDomTraverse},
                getChildrenWithClassUntil     : {MODULE : kDomTraverse},
                getChildrenWithId             : {MODULE : kDomTraverse},
                getChildrenWithIdUntil        : {MODULE : kDomTraverse},

                getElements                   : {MODULE : kDomTraverse},
                getElementsByAttribute        : {MODULE : kDomTraverse},
                getElementsByClass            : {MODULE : kDomTraverse},
                getElementsWithAttribute      : {MODULE : kDomTraverse},
                getElementsWithClass          : {MODULE : kDomTraverse},
                getElementsWithId             : {MODULE : kDomTraverse},

                getFirst              : {MODULE : kDomTraverse},
                getFirstByAttribute   : {MODULE : kDomTraverse},
                getFirstByClass       : {MODULE : kDomTraverse},
                getFirstWithAttribute : {MODULE : kDomTraverse},
                getFirstWithClass     : {MODULE : kDomTraverse},
                getFirstWithId        : {MODULE : kDomTraverse},

                getFirstChild              : {MODULE : kDomTraverse},
                getFirstChildByAttribute   : {MODULE : kDomTraverse},
                getFirstChildByClass       : {MODULE : kDomTraverse},
                getFirstChildWithAttribute : {MODULE : kDomTraverse},
                getFirstChildWithClass     : {MODULE : kDomTraverse},
                getFirstChildWithId        : {MODULE : kDomTraverse},

                getLast              : {MODULE : kDomTraverse},
                getLastByAttribute   : {MODULE : kDomTraverse},
                getLastByClass       : {MODULE : kDomTraverse},
                getLastWithId        : {MODULE : kDomTraverse},
                getLastWithAttribute : {MODULE : kDomTraverse},
                getLastWithClass     : {MODULE : kDomTraverse},

                getLastChild              : {MODULE : kDomTraverse},
                getLastChildByAttribute   : {MODULE : kDomTraverse},
                getLastChildByClass       : {MODULE : kDomTraverse},
                getLastChildWithAttribute : {MODULE : kDomTraverse},
                getLastChildWithClass     : {MODULE : kDomTraverse},
                getLastChildWithId        : {MODULE : kDomTraverse},

                getNext              : {MODULE : kDomTraverse},
                getNextByAttribute   : {MODULE : kDomTraverse},
                getNextByClass       : {MODULE : kDomTraverse},
                getNextWithAttribute : {MODULE : kDomTraverse},
                getNextWithClass     : {MODULE : kDomTraverse},
                getNextWithId        : {MODULE : kDomTraverse},

                getNextAll                   : {MODULE : kDomTraverse},
                getNextAllByAttribute        : {MODULE : kDomTraverse},
                getNextAllByAttributeUntil   : {MODULE : kDomTraverse},
                getNextAllByClass            : {MODULE : kDomTraverse},
                getNextAllByClassUntil       : {MODULE : kDomTraverse},
                getNextAllUntil              : {MODULE : kDomTraverse},
                getNextAllWithAttribute      : {MODULE : kDomTraverse},
                getNextAllWithAttributeUntil : {MODULE : kDomTraverse},
                getNextAllWithClass          : {MODULE : kDomTraverse},
                getNextAllWithClassUntil     : {MODULE : kDomTraverse},
                getNextAllWithId             : {MODULE : kDomTraverse},
                getNextAllWithIdUntil        : {MODULE : kDomTraverse},

                getNth              : {MODULE : kDomTraverse},
                getNthByAttribute   : {MODULE : kDomTraverse},
                getNthByClass       : {MODULE : kDomTraverse},
                getNthWithAttribute : {MODULE : kDomTraverse},
                getNthWithClass     : {MODULE : kDomTraverse},
                getNthWithId        : {MODULE : kDomTraverse},

                getNthChild              : {MODULE : kDomTraverse},
                getNthChildByAttribute   : {MODULE : kDomTraverse},
                getNthChildByClass       : {MODULE : kDomTraverse},
                getNthChildWithAttribute : {MODULE : kDomTraverse},
                getNthChildWithClass     : {MODULE : kDomTraverse},
                getNthChildWithId        : {MODULE : kDomTraverse},

                getNthNext              : {MODULE : kDomTraverse},
                getNthNextByAttribute   : {MODULE : kDomTraverse},
                getNthNextByClass       : {MODULE : kDomTraverse},
                getNthNextWithAttribute : {MODULE : kDomTraverse},
                getNthNextWithClass     : {MODULE : kDomTraverse},
                getNthNextWithId        : {MODULE : kDomTraverse},

                getNthParent              : {MODULE : kDomTraverse},
                getNthParentByAttribute   : {MODULE : kDomTraverse},
                getNthParentByClass       : {MODULE : kDomTraverse},
                getNthParentWithAttribute : {MODULE : kDomTraverse},
                getNthParentWithClass     : {MODULE : kDomTraverse},
                getNthParentWithId        : {MODULE : kDomTraverse},

                getNthPrev              : {MODULE : kDomTraverse},
                getNthPrevByAttribute   : {MODULE : kDomTraverse},
                getNthPrevByClass       : {MODULE : kDomTraverse},
                getNthPrevWithAttribute : {MODULE : kDomTraverse},
                getNthPrevWithClass     : {MODULE : kDomTraverse},
                getNthPrevWithId        : {MODULE : kDomTraverse},

                getParent              : {MODULE : kDomTraverse},
                getParentByAttribute   : {MODULE : kDomTraverse},
                getParentByClass       : {MODULE : kDomTraverse},
                getParentWithAttribute : {MODULE : kDomTraverse},
                getParentWithClass     : {MODULE : kDomTraverse},
                getParentWithId        : {MODULE : kDomTraverse},

                getParents                   : {MODULE : kDomTraverse},
                getParentsByAttribute        : {MODULE : kDomTraverse},
                getParentsByAttributeUntil   : {MODULE : kDomTraverse},
                getParentsByClass            : {MODULE : kDomTraverse},
                getParentsByClassUntil       : {MODULE : kDomTraverse},
                getParentsUntil              : {MODULE : kDomTraverse},
                getParentsWithAttribute      : {MODULE : kDomTraverse},
                getParentsWithAttributeUntil : {MODULE : kDomTraverse},
                getParentsWithClass          : {MODULE : kDomTraverse},
                getParentsWithClassUntil     : {MODULE : kDomTraverse},
                getParentsWithId             : {MODULE : kDomTraverse},
                getParentsWithIdUntil        : {MODULE : kDomTraverse},

                getPrev              : {MODULE : kDomTraverse},
                getPrevByAttribute   : {MODULE : kDomTraverse},
                getPrevByClass       : {MODULE : kDomTraverse},
                getPrevWithAttribute : {MODULE : kDomTraverse},
                getPrevWithClass     : {MODULE : kDomTraverse},
                getPrevWithId        : {MODULE : kDomTraverse},

                getPrevAll                   : {MODULE : kDomTraverse},
                getPrevAllByAttribute        : {MODULE : kDomTraverse},
                getPrevAllByAttributeUntil   : {MODULE : kDomTraverse},
                getPrevAllByClass            : {MODULE : kDomTraverse},
                getPrevAllByClassUntil       : {MODULE : kDomTraverse},
                getPrevAllUntil              : {MODULE : kDomTraverse},
                getPrevAllWithAttribute      : {MODULE : kDomTraverse},
                getPrevAllWithAttributeUntil : {MODULE : kDomTraverse},
                getPrevAllWithClass          : {MODULE : kDomTraverse},
                getPrevAllWithClassUntil     : {MODULE : kDomTraverse},
                getPrevAllWithId             : {MODULE : kDomTraverse},
                getPrevAllWithIdUntil        : {MODULE : kDomTraverse},

                getSiblings                   : {MODULE : kDomTraverse},
                getSiblingsByAttribute        : {MODULE : kDomTraverse},
                getSiblingsByAttributeUntil   : {MODULE : kDomTraverse},
                getSiblingsByClass            : {MODULE : kDomTraverse},
                getSiblingsByClassUntil       : {MODULE : kDomTraverse},
                getSiblingsUntil              : {MODULE : kDomTraverse},
                getSiblingsWithAttribute      : {MODULE : kDomTraverse},
                getSiblingsWithAttributeUntil : {MODULE : kDomTraverse},
                getSiblingsWithClass          : {MODULE : kDomTraverse},
                getSiblingsWithClassUntil     : {MODULE : kDomTraverse},
                getSiblingsWithId             : {MODULE : kDomTraverse},
                getSiblingsWithIdUntil        : {MODULE : kDomTraverse},

                isChild        : {MODULE : kDomTraverse},
                isNext         : {MODULE : kDomTraverse},
                isParent       : {MODULE : kDomTraverse},
                isParentOrSelf : {MODULE : kDomTraverse},
                isPrev         : {MODULE : kDomTraverse},
                isSibling      : {MODULE : kDomTraverse}
            }
        },
        EventHandler : {
            items : {
                keyCode : {MODULE : kEventConstants},

                addEventListener    : {MODULE : kEventCore},
                addEventListeners   : {MODULE : kEventCore},
                getEventObject      : {MODULE : kEventCore},
                getKeyCode          : {MODULE : kEventCore},
                getMouseCoordinates : {MODULE : kEventCore},
                getTarget           : {MODULE : kEventCore},
                preventDefault      : {MODULE : kEventCore},
                removeEventListener : {MODULE : kEventCore},
                stopPropagation     : {MODULE : kEventCore},

                isArrowKey               : {MODULE : kEventExtend},
                isBackspaceKey           : {MODULE : kEventExtend},
                isCharacterKeypressEvent : {MODULE : kEventExtend},
                isEnterKey               : {MODULE : kEventExtend},
                isEscapeKey              : {MODULE : kEventExtend},
                isRightClick             : {MODULE : kEventExtend},
                isTabKey                 : {MODULE : kEventExtend}
            }
        },
        Jsonp : {
            items : {
                get : {MODULE : kJsonpCore}
            }
        },
        JsonpController : {
            base  : 'AjaxController',
            items : {
                update     : {MODULE : kJsonpControllerCore},
                unregister : {MODULE : kJsonpControllerCore}
            }
        },
        JsonpState : {
            base  : 'AjaxState',
            items : {
                protecteds : {MODULE : kJsonpStateCore},

                // Overrides:
                update     : {MODULE : kJsonpStateCore},
                unregister : {MODULE : kJsonpStateCore}
            }
        },
        Method : {
            items : {
                bind     : {MODULE : kMethodCore},
                curry    : {MODULE : kMethodCore},
                identity : {MODULE : kMethodCore},
                memoize  : {MODULE : kMethodCore},
                partial  : {MODULE : kMethodCore},

                bindAsEventListener : {MODULE : kMethodEvent},

                overload            : {MODULE : kMethodInherit},
                requireAllArguments : {MODULE : kMethodInherit},

                after : {MODULE : kMethodRepeat},
                once  : {MODULE : kMethodRepeat},
                times : {MODULE : kMethodRepeat},

                debounce : {MODULE : kMethodTimer},
                defer    : {MODULE : kMethodTimer},
                delay    : {MODULE : kMethodTimer},
                throttle : {MODULE : kMethodTimer},

                compose : {MODULE : kMethodTranspose},
                flip    : {MODULE : kMethodTranspose},
                wrap    : {MODULE : kMethodTranspose}
            }
        },
        Object : {
            items : {
                copy          : {MODULE : kObjectCore},
                copyMethods   : {MODULE : kObjectCore},
                copyPrototype : {MODULE : kObjectCore},
                extend        : {MODULE : kObjectCore},
                stringify     : {MODULE : kObjectCore},
                toArray       : {MODULE : kObjectCore},
                toJsonString  : {MODULE : kObjectCore},
                touch         : {MODULE : kObjectCore}
            }
        },
        QueryString : {
            items : {
                encode : {MODULE : kQueryStringCore},
                parse  : {MODULE : kQueryStringCore}
            }
        },
        SortDelegate : {
            items : {
                sort     : {MODULE : kSortDelegateCore},
                sortAsc  : {MODULE : kSortDelegateCore},
                sortDesc : {MODULE : kSortDelegateCore}
            }
        },
        String : {
            items : {
                compact        : {MODULE : kStringCore},
                concat         : {MODULE : kStringCore},
                format         : {MODULE : kStringCore},
                generateGuid   : {MODULE : kStringCore},
                generateRandom : {MODULE : kStringCore},
                printf         : {MODULE : kStringCore},
                remove         : {MODULE : kStringCore},
                trim           : {MODULE : kStringCore},

                decode         : {MODULE : kStringEncode},
                encode         : {MODULE : kStringEncode},
                encodeSafeHtml : {MODULE : kStringEncode},
                escape         : {MODULE : kStringEncode},
                htmlEncode     : {MODULE : kStringEncode},
                safeHtmlEncode : {MODULE : kStringEncode},
                unescape       : {MODULE : kStringEncode},
                xssEncode      : {MODULE : kStringEncode},

                stripNonAlpha        : {MODULE : kStringStrip},
                stripNonAlphanumeric : {MODULE : kStringStrip},
                stripTags            : {MODULE : kStringStrip},
                stripNonNumeric      : {MODULE : kStringStrip},
                stripNumeric         : {MODULE : kStringStrip},

                br2nl                     : {MODULE : kStringTransform},
                nl2br                     : {MODULE : kStringTransform},
                removeTags                : {MODULE : kStringTransform},
                toCamelCase               : {MODULE : kStringTransform},
                toDashedFromCamelCase     : {MODULE : kStringTransform},
                toJson                    : {MODULE : kStringTransform},
                toUnderscoreFromCamelCase : {MODULE : kStringTransform},
                truncate                  : {MODULE : kStringTransform}
            }
        },
        Supports : {
            items : {
                ajax   : {MODULE : kSupportsCore},
                cookie : {MODULE : kSupportsCore},
                dom    : {MODULE : kSupportsCore}
            }
        },
        Template : {
            items : {
                parse : {MODULE : kTemplateCore}
            }
        },
        Timer : {
            items : {
                set   : {MODULE : kTimerCore},
                start : {MODULE : kTimerCore},
                stop  : {MODULE : kTimerCore}
            }
        },
        Try : {
            items : {
                all   : {MODULE : kTryCore},
                these : {MODULE : kTryCore}
            }
        },
        Unit : {
            items : {
                add                   : {MODULE : kUnitCore},
                assert                : {MODULE : kUnitCore},
                assertEqual           : {MODULE : kUnitCore},
                assertNotEqual        : {MODULE : kUnitCore},
                assertStrictEqual     : {MODULE : kUnitCore},
                assertStrictNotEqual  : {MODULE : kUnitCore},
                getGlobalFailureCount : {MODULE : kUnitCore},
                getGlobalSuccessCount : {MODULE : kUnitCore},
                isRunning             : {MODULE : kUnitCore},
                log                   : {MODULE : kUnitCore},
                run                   : {MODULE : kUnitCore}
            }
        },
        Validation : {
            items : {
                is          : {MODULE : kValidationCore},
                isArguments : {MODULE : kValidationCore},
                isArray     : {MODULE : kValidationCore},
                isBoolean   : {MODULE : kValidationCore},
                isDate      : {MODULE : kValidationCore},
                isFunction  : {MODULE : kValidationCore},
                isNaN       : {MODULE : kValidationCore},
                isNull      : {MODULE : kValidationCore},
                isNumber    : {MODULE : kValidationCore},
                isNumeric   : {MODULE : kValidationCore},
                isObject    : {MODULE : kValidationCore},
                isRegExp    : {MODULE : kValidationCore},
                isString    : {MODULE : kValidationCore},
                isUndefined : {MODULE : kValidationCore},
                isWindow    : {MODULE : kValidationCore},

                isEmail      : {MODULE : kValidationRegExp},
                isUrl        : {MODULE : kValidationRegExp},
                isWhitespace : {MODULE : kValidationRegExp}
            }
        }
    });

    //TODO: complete me.
    init(fp, 'modules', {
        'core.meta' : {
            depends : []
        },
        'core' : {
            depends : ['core.meta']
        },
        'template.core' : {
            depends : ['core']
        }
    });

    // The methods below are <em>internal</em> methods that are used
    // to ensure consistency within the framework.
    // They are not meant for external use.

    if (isProduction) {

        /*
         *
         */
        init(fp, 'alias', function(mixed, aliasName, existingName) {
            mixed[1][aliasName] = mixed[1][existingName];
        });

        /*
         *
         */
        init(fp, 'create', function(name) {
            var cls = fp.classes[name];

            return [cls.items, namespace(framework, name)];
        });

        /*
         *
         */
        init(fp, 'construct', function(name, delegate) {
            var cls = fp.classes[name];

            framework[name] = delegate;

            return [cls.items, delegate];
        });

        /*
         *
         */
        init(fp, 'define', function(mixed, name, fn) {
            var me = mixed[1];

            me[name] = fn;
        });

        /*
         *
         */
        init(fp, 'getAttr', function(root, name) {
            var elem = root[name];

            return elem;
        });

        /*
         *
         */
        init(fp, 'getObject', function(mixed) {
            return mixed[1];
        });

        /*
         *
         */
        init(fp, 'getRoot', function() {
            return [fp.classes.o2.items, framework];
        });

        /*
         *
         */
        init(fp, 'override', function(mixed, methodName, fn) {
            var me = mixed[1];

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'proto', function(mixed, methodName, fn) {
            var me = mixed[1];

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'require', function(name, method) {
            var methodName = '';
            var objName = '';

            if (arguments.length === 1) {
                methodName = name;
                objName = kEmpty;
            } else {
                methodName = method;
                objName = name;
            }

            var meta = null;
            var classes = fp.classes;

            if (objName === kEmpty) {
                var result = null;

                if (classes.hasOwnProperty(methodName)) {
                    result = framework[methodName];

                    return result;
                }

                meta = classes.o2.items;

                result = framework[methodName];

                return result;
            }

            var obj = framework[objName];
            var theMethod = obj[methodName];

            return theMethod;
        });
    } else {

        /*
         *
         */
        init(fp, 'alias', function(mixed, aliasName, existingName) {
            if (!mixed) {
                dbg();

                throw kNoMetaDefinition;
            }

            if (!mixed[1]) {
                dbg();

                throw kObjectNotDefined;
            }

            if (!mixed[0][existingName]) {
                dbg();

                throw getMethodNotDefinedInMetaWarning(existingName);
            }

            if (!mixed[0][aliasName]) {
                dbg();

                throw getMethodNotDefinedInMetaWarning(aliasName);
            }

            if (mixed[1][aliasName]) {
                dbg();

                throw [kMethodAlreadyDefined, aliasName].join(kEmpty);
            }

            mixed[1][aliasName] = mixed[1][existingName];
        });

        /*
         *
         */
        init(fp, 'create', function(name) {
            var cls = fp.classes[name];

            if (!cls) {
                dbg();

                throw getClassNotDefinedInMetaWarning(name);
            }

            if (!cls.items) {
                throw getIncorrectMetaDefinitionWarning(name);
            }

            return [cls.items, namespace(framework, name)];
        });

        /*
         *
         */
        init(fp, 'construct', function(name, delegate) {
            var cls = fp.classes[name];

            if (!cls) {
                dbg();

                throw getClassNotDefinedInMetaWarning(name);
            }

            if (framework[name]) {
                dbg();

                throw getConstructorAlreadyDefinedWarning(name);
            }

            framework[name] = delegate;

            return [cls.items, delegate];
        });

        /*
         *
         */
        init(fp, 'define', function(mixed, name, fn) {
            var meta = mixed[0];
            var me = mixed[1];

            if (!me) {
                dbg();

                throw kObjectNotDefined;
            }

            if (!fn) {
                dbg();

                throw [kDelegateNotdefined, name].join(kEmpty);
            }

            if (!meta) {
                dbg();

                throw kNoMetaDefinition;
            }

            if (meta[name]) {
                if (me[name]) {
                    dbg();

                    throw [kMethodAlreadyDefined, name].join(kEmpty);
                }

                me[name] = fn;
            }
        });

        /*
         *
         */
        init(fp, 'getAttr', function(root, name) {
            if (!root) {
                dbg();

                throw kRootNotFound;
            }

            if (!name) {
                dbg();

                throw kNameNotProvided;
            }

            var elem = root[name];

            if (!elem) {
                dbg();

                throw getRootDoesNotHaveAttributeWarning(name);
            }

            return elem;
        });

        /*
         *
         */
        init(fp, 'getObject', function(mixed) {
            return mixed[1];
        });

        /*
         *
         */
        init(fp, 'getRoot', function() {
            return [fp.classes.o2.items, framework];
        });

        /*
         *
         */
        init(fp, 'override', function(mixed, methodName, fn) {
            var meta = mixed[0];
            var me = mixed[1];

            if (!me) {
                dbg();

                throw 'Object not found in mixed collection';
            }

            if (!fn) {
                dbg();

                throw [kDelegateNotdefined, methodName].join(kEmpty);
            }

            if (!meta[methodName]) {
                dbg();

                throw getClassNotDefinedInMetaWarning(methodName);
            }

            if (!me.prototype[methodName]) {
                dbg();

                throw getNoMethodToOverrideWarning(methodName);
            }

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'proto', function(mixed, methodName, fn) {
            var meta = mixed[0];
            var me = mixed[1];

            if (!me) {
                dbg();

                throw kObjectNotDefined;
            }

            if (!fn) {
                dbg();

                throw [kDelegateNotdefined, methodName].join(kEmpty);
            }

            if (!meta[methodName]) {
                dbg();

                throw getMethodOfClassNotDefinedInMetaWarning(kAny, methodName);
            }

            if (me.prototype[methodName]) {
                dbg();

                throw [kMethodAlreadyDefined, methodName].join(kEmpty);
            }

            me.prototype[methodName] = fn;
        });

        /*
         *
         */
        init(fp, 'require', function(name, method) {
            var methodName = '';
            var objName = '';

            if (arguments.length === 1) {
                methodName = name;
                objName = kEmpty;
            } else {
                methodName = method;
                objName = name;
            }

            if (typeof objName !== kString) {
                dbg();

                throw kObjNameNotString;
            }

            if (typeof methodName !== kString) {
                dbg();

                throw kMethodNameNotString;
            }

            var meta = null;
            var classes = fp.classes;

            if (objName === kEmpty) {
                var result = null;

                if (classes.hasOwnProperty(methodName)) {
                    result = framework[methodName];

                    if (!result) {
                        dbg();

                        throw getClassNotDefinedWarning(methodName);
                    }

                    return result;
                }

                meta = classes.o2.items;

                if (!meta[methodName]) {
                    dbg();

                    throw getMethodNotDefinedInMetaWarning(methodName);
                }

                result = framework[methodName];

                if (!result) {
                    dbg();

                    throw getMethodNotDefinedInFrameworkWarning(methodName);
                }

                return result;
            }

            var cls = classes[objName];

            if (!cls) {
                dbg();

                throw getClassNotDefinedInMetaWarning(objName);
            }

            var mtd = cls.items[methodName];

            if (!mtd) {
                dbg();

                throw getMethodOfClassNotDefinedInMetaWarning(objName,
                    methodName);
            }

            var obj = framework[objName];

            if (!obj) {
                dbg();

                throw getClassDoesNotExistWarning(objName);
            }

            var theMethod = obj[methodName];

            if (!theMethod) {
                dbg();

                throw getMethodOfClassDoesNotExistWarning(objName, methodName);
            }

            return theMethod;
        });
    }
}(this.o2));
