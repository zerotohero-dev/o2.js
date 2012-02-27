/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */
this.o2 = this.o2 || {
    isProduction : false
};

//TODO: cleanup.
//TODO: check all "TODO"s

/**
 * @module core.meta
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-17 21:44:34.259972
 * -->
 *
 * <p>Meta information.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Common Constants
     */
    var kObject = 'object';
//    var kRequirementNotSatisfied = ' : Requirement not satisfied.';
    var kMethodAlreadyDefined = 'Method name is undefined : ';
    var kDelegateNotdefined = 'Delegate is undefined: ';
    var kEmpty = '';

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
     *
     */
    function namespace(root, key) {
        if (!root || typeof root !== kObject) {
            return null;
        }

        return init(root[key], {});
    }

    var fp = init(framework, 'protecteds', {});

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
     init(fp, 'classes', {
        o2 : {
            NAME : 'o2',
            methods : {
                $          : {MODULE : 'core'},
                build      : {MODULE : 'core'},
                load       : {MODULE : 'core'},
                longName   : {MODULE : 'core'},
                name       : {MODULE : 'core'},
                nill       : {MODULE : 'core'},
                noConflict : {MODULE : 'core'},
                now        : {MODULE : 'core'},
                ready      : {MODULE : 'core'},
                url        : {MODULE : 'core'},
                version    : {MODULE : 'core'}
            }
        },
        Ajax : {
            NAME : 'Ajax',
            methods : {
                 abort     : {MODULE : 'ajax.core'},
                 createXhr : {MODULE : 'ajax.core'},
                 get       : {MODULE : 'ajax.core'},
                 post      : {MODULE : 'ajax.core'},

                 getSingle  : {NAME : 'getSingle',  MODULE : 'ajax.extend'},
                 postSingle : {NAME : 'postSingle', MODULE : 'ajax.extend'}
            }
        },
        AjaxController : {
            NAME : 'AjaxController',
            methods : {
                unregister : {NAME : 'unregister', MODULE : 'ajaxcontroller.core'},
                update     : {NAME : 'update',     MODULE : 'ajaxcontroller.core'}
            }
        },
        AjaxState : {
            NAME : 'AjaxState',
            methods : {
                protecteds          : {NAME : 'protecteds', MODULE : 'ajaxstate.core'},

                addObserver         : {NAME : 'addObserver',         MODULE : 'ajaxstate.core'},
                countObservers      : {NAME : 'countObservers',      MODULE : 'ajaxstate.core'},
                deleteObserver      : {NAME : 'deleteObserver',      MODULE : 'ajaxstate.core'},
                deleteObservers     : {NAME : 'deleteObservers',     MODULE : 'ajaxstate.core'},
                init                : {NAME : 'init',                MODULE : 'ajaxstate.core'},
                timeoutObservers    : {NAME : 'timeoutObservers',    MODULE : 'ajaxstate.core'},
                timeoutAllObservers : {NAME : 'timeoutAllObservers', MODULE : 'ajaxstate.core'}
            }
        },
        CollectionHelper : {
            any            : {NAME : 'any',            MODULE : 'collectionhelper.core'},
            clear          : {NAME : 'clear',          MODULE : 'collectionhelper.core'},
            clone          : {NAME : 'clone',          MODULE : 'collectionhelper.core'},
            compact        : {NAME : 'compact',        MODULE : 'collectionhelper.core'},
            contains       : {NAME : 'contains',       MODULE : 'collectionhelper.core'},
            copy           : {NAME : 'copy',           MODULE : 'collectionhelper.core'},
            detect         : {NAME : 'detect',         MODULE : 'collectionhelper.core'},
            getDifference  : {NAME : 'getDifference',  MODULE : 'collectionhelper.core'},
            each           : {NAME : 'each',           MODULE : 'collectionhelper.core'},
            every          : {NAME : 'every',          MODULE : 'collectionhelper.core'},
            exclude        : {NAME : 'exclude',        MODULE : 'collectionhelper.core'},
            extend         : {NAME : 'extend',         MODULE : 'collectionhelper.core'},
            find           : {NAME : 'find',           MODULE : 'collectionhelper.core'},
            flatten        : {NAME : 'flatten',        MODULE : 'collectionhelper.core'},
            fold           : {NAME : 'fold',           MODULE : 'collectionhelper.core'},
            forEach        : {NAME : 'forEach',        MODULE : 'collectionhelper.core'},
            getFirst       : {NAME : 'getFirst',       MODULE : 'collectionhelper.core'},
            getFirstN      : {NAME : 'getFirstN',      MODULE : 'collectionhelper.core'},
            getFunctions   : {NAME : 'getFunctions',   MODULE : 'collectionhelper.core'},
            getKeys        : {NAME : 'getKeys',        MODULE : 'collectionhelper.core'},
            getLast        : {NAME : 'getLast',        MODULE : 'collectionhelper.core'},
            getLastN       : {NAME : 'getLastN',       MODULE : 'collectionhelper.core'},
            getMax         : {NAME : 'getMax',         MODULE : 'collectionhelper.core'},
            getMethods     : {NAME : 'getMethods',     MODULE : 'collectionhelper.core'},
            getMin         : {NAME : 'getMin',         MODULE : 'collectionhelper.core'},
            getRest        : {NAME : 'getRest',        MODULE : 'collectionhelper.core'},
            getSize        : {NAME : 'getSize',        MODULE : 'collectionhelper.core'},
            getSortedIndex : {NAME : 'getSortedIndex', MODULE : 'collectionhelper.core'},
            getValues      : {NAME : 'getValues',      MODULE : 'collectionhelper.core'},
            grep           : {NAME : 'grep',           MODULE : 'collectionhelper.core'},
            group          : {NAME : 'group',          MODULE : 'collectionhelper.core'},
            inArray        : {NAME : 'inArray',        MODULE : 'collectionhelper.core'},
            includes       : {NAME : 'includes',       MODULE : 'collectionhelper.core'},
            indexOf        : {NAME : 'indexOf',        MODULE : 'collectionhelper.core'},
            intersect      : {NAME : 'intersect',      MODULE : 'collectionhelper.core'},
            invoke         : {NAME : 'invoke',         MODULE : 'collectionhelper.core'},
            isEmpty        : {NAME : 'isEmpty',        MODULE : 'collectionhelper.core'},
            lastIndexOf    : {NAME : 'lastIndexOf',    MODULE : 'collectionhelper.core'},
            map            : {NAME : 'map',            MODULE : 'collectionhelper.core'},
            pluck          : {NAME : 'pluck',          MODULE : 'collectionhelper.core'},
            reduce         : {NAME : 'reduce',         MODULE : 'collectionhelper.core'},
            reduceRight    : {NAME : 'reduceRight',    MODULE : 'collectionhelper.core'},
            reject         : {NAME : 'reject',         MODULE : 'collectionhelper.core'},
            removeElement  : {NAME : 'removeElement',  MODULE : 'collectionhelper.core'},
            select         : {NAME : 'select',         MODULE : 'collectionhelper.core'},
            shuffle        : {NAME : 'shuffle',        MODULE : 'collectionhelper.core'},
            some           : {NAME : 'some',           MODULE : 'collectionhelper.core'},
            sort           : {NAME : 'sort',           MODULE : 'collectionhelper.core'},
            tap            : {NAME : 'tap',            MODULE : 'collectionhelper.core'},
            toArray        : {NAME : 'toArray',        MODULE : 'collectionhelper.core'},
            touch          : {NAME : 'touch',          MODULE : 'collectionhelper.core'},
            union          : {NAME : 'union',          MODULE : 'collectionhelper.core'},
            unique         : {NAME : 'unique',         MODULE : 'collectionhelper.core'},
            zip            : {NAME : 'zip',            MODULE : 'collectionhelper.core'}
        },
        Cookie : {
            NAME : 'Cookie',
            methods : {
                read   : {NAME : 'read',   MODULE : 'cookie.core'},
                remove : {NAME : 'remove', MODULE : 'cookie.core'},
                save   : {NAME : 'save',   MODULE : 'cookie.core'}
            }
        },
        Debugger : {
            NAME : 'Debugger',
            methods : {
                assert  : {NAME : 'assert',  MODULE : 'debugger.core'},
                error   : {NAME : 'error',   MODULE : 'debugger.core'},
                info    : {NAME : 'info',    MODULE : 'debugger.core'},
                init    : {NAME : 'init',    MODULE : 'debugger.core'},
                log     : {NAME : 'log',     MODULE : 'debugger.core'},
                println : {NAME : 'println', MODULE : 'debugger.core'},
                warn    : {NAME : 'warn',    MODULE : 'debugger.core'}
            }
        },
        DomHelper : {
            NAME : 'DomHelper',
            methods : {
                nodeType : {NAME : 'nodeType', MODULE : 'domhelper.constants'},

                append                  : {NAME : 'append',                 MODULE : 'domhelper.core'},
                create                  : {NAME : 'create',                 MODULE : 'domhelper.core'},
                createDocumentFragment  : {NAME : 'createDocumentFragment', MODULE : 'domhelper.core'},
                createElement           : {NAME : 'createElement',          MODULE : 'domhelper.core'},
                empty                   : {NAME : 'empty',                  MODULE : 'domhelper.core'},
                getAttribute            : {NAME : 'getAttribute',           MODULE : 'domhelper.core'},
                getHtml                 : {NAME : 'getHtml',                MODULE : 'domhelper.core'},
                getText                 : {NAME : 'getText',                MODULE : 'domhelper.core'},
                insertAfter             : {NAME : 'insertAfter',            MODULE : 'domhelper.core'},
                insertBefore            : {NAME : 'insertBefore',           MODULE : 'domhelper.core'},
                isDocument              : {NAME : 'isDocument',             MODULE : 'domhelper.core'},
                isElement               : {NAME : 'isElement',              MODULE : 'domhelper.core'},
                prepend                 : {NAME : 'prepend',                MODULE : 'domhelper.core'},
                remove                  : {NAME : 'remove',                 MODULE : 'domhelper.core'},
                removeChildren          : {NAME : 'removeChildren',         MODULE : 'domhelper.core'},
                removeEmpty             : {NAME : 'removeEmpty',            MODULE : 'domhelper.core'},
                removeEmptyTextNodes    : {NAME : 'removeEmptyTextNodes',   MODULE : 'domhelper.core'},
                removeNode              : {NAME : 'removeNode',             MODULE : 'domhelper.core'},
                setAttribute            : {NAME : 'setAttribute',           MODULE : 'domhelper.core'},
                setHtml                 : {NAME : 'setHtml',                MODULE : 'domhelper.core'},

                getDimension            : {NAME : 'getDimension',            MODULE : 'domhelper.dimension'},
                getDocumentDimension    : {NAME : 'getDocumentDimension',    MODULE : 'domhelper.dimension'},
                getDocumentHeight       : {NAME : 'getDocumentHeight',       MODULE : 'domhelper.dimension'},
                getDocumentWidth        : {NAME : 'getDocumentWidth',        MODULE : 'domhelper.dimension'},
                getHeight               : {NAME : 'getHeight',               MODULE : 'domhelper.dimension'},
                getViewportInfo         : {NAME : 'getViewportInfo',         MODULE : 'domhelper.dimension'},
                getWidth                : {NAME : 'getWidth',                MODULE : 'domhelper.dimension'},
                getWindowInnerDimension : {NAME : 'getWindowInnerDimension', MODULE : 'domhelper.dimension'},
                getWindowInnerHeight    : {NAME : 'getWindowInnerHeight',    MODULE : 'domhelper.dimension'},
                getWindowInnerWidth     : {NAME : 'getWindowInnerWidth',     MODULE : 'domhelper.dimension'},
                setDimension            : {NAME : 'setDimension',            MODULE : 'domhelper.dimension'},
                setHeight               : {NAME : 'setHeight',               MODULE : 'domhelper.dimension'},
                setWidth                : {NAME : 'setWidth',                MODULE : 'domhelper.dimension'},
                windowInnerDimension    : {NAME : 'windowInnerDimension',    MODULE : 'domhelper.dimension'},
                windowInnerHeight       : {NAME : 'windowInnerHeight',       MODULE : 'domhelper.dimension'},
                windowInnerWidth        : {NAME : 'windowInnerWidth',        MODULE : 'domhelper.dimension'},

                getChildren                         : {NAME : 'getChildren',                         MODULE : 'domhelper.traverse'},
                getChildrenByAttribute              : {NAME : 'getChildrenByAttribute',              MODULE : 'domhelper.traverse'},
                getChildrenByAttributeUntil         : {NAME : 'getChildrenByAttributeUntil',         MODULE : 'domhelper.traverse'},
                getChildrenByClass                  : {NAME : 'getChildrenByClass',                  MODULE : 'domhelper.traverse'},
                getChildrenByClassUntil             : {NAME : 'getChildrenByClassUntil',             MODULE : 'domhelper.traverse'},
                getChildrenById                     : {NAME : 'getChildrenById',                     MODULE : 'domhelper.traverse'},
                getChildrenByIdUntil                : {NAME : 'getChildrenByIdUntil',                MODULE : 'domhelper.traverse'},
                getChildrenUntil                    : {NAME : 'getChildrenUntil',                    MODULE : 'domhelper.traverse'},
                getChildrenWithAttribute            : {NAME : 'getChildrenWithAttribute',            MODULE : 'domhelper.traverse'},
                getChildrenWithAttributeUntil       : {NAME : 'getChildrenWithAttributeUntil',       MODULE : 'domhelper.traverse'},
                getChildrenWithClass                : {NAME : 'getChildrenWithClass',                MODULE : 'domhelper.traverse'},
                getChildrenWithClassUntil           : {NAME : 'getChildrenWithClassUntil',           MODULE : 'domhelper.traverse'},
                getChildrenWithId                   : {NAME : 'getChildrenWithId',                   MODULE : 'domhelper.traverse'},
                getChildrenWithIdUntil              : {NAME : 'getChildrenWithIdUntil',              MODULE : 'domhelper.traverse'},
                getElements                         : {NAME : 'getElements',                         MODULE : 'domhelper.traverse'},
                getElementsByAttribute              : {NAME : 'getElementsByAttribute',              MODULE : 'domhelper.traverse'},
                getElementsByClass                  : {NAME : 'getElementsByClass',                  MODULE : 'domhelper.traverse'},
                getElementsWithAttribute            : {NAME : 'getElementsWithAttribute',            MODULE : 'domhelper.traverse'},
                getElementsWithClass                : {NAME : 'getElementsWithClass',                MODULE : 'domhelper.traverse'},
                getElementsWithId                   : {NAME : 'getElementsWithId',                   MODULE : 'domhelper.traverse'},
                getFirst                            : {NAME : 'getFirst',                            MODULE : 'domhelper.traverse'},
                getFirstByAttribute                 : {NAME : 'getFirstByAttribute',                 MODULE : 'domhelper.traverse'},
                getFirstByClass                     : {NAME : 'getFirstByClass',                     MODULE : 'domhelper.traverse'},
                getFirstById                        : {NAME : 'getFirstById',                        MODULE : 'domhelper.traverse'},
                getFirstChild                       : {NAME : 'getFirstChild',                       MODULE : 'domhelper.traverse'},
                getFirstChildByAttribute            : {NAME : 'getFirstChildByAttribute',            MODULE : 'domhelper.traverse'},
                getFirstChildByClass                : {NAME : 'getFirstChildByClass',                MODULE : 'domhelper.traverse'},
                getFirstChildById                   : {NAME : 'getFirstChildById',                   MODULE : 'domhelper.traverse'},
                getFirstChildWithAttribute          : {NAME : 'getFirstChildWithAttribute',          MODULE : 'domhelper.traverse'},
                getFirstChildWithClass              : {NAME : 'getFirstChildWithClass',              MODULE : 'domhelper.traverse'},
                getFirstChildWithId                 : {NAME : 'getFirstChildWithId',                 MODULE : 'domhelper.traverse'},
                getFirstWithAttribute               : {NAME : 'getFirstWithAttribute',               MODULE : 'domhelper.traverse'},
                getFirstWithClass                   : {NAME : 'getFirstWithClass',                   MODULE : 'domhelper.traverse'},
                getFirstWithId                      : {NAME : 'getFirstWithId',                      MODULE : 'domhelper.traverse'},
                getLast                             : {NAME : 'getLast',                             MODULE : 'domhelper.traverse'},
                getLastByAttribute                  : {NAME : 'getLastByAttribute',                  MODULE : 'domhelper.traverse'},
                getLastByClass                      : {NAME : 'getLastByClass',                      MODULE : 'domhelper.traverse'},
                getLastById                         : {NAME : 'getLastById',                         MODULE : 'domhelper.traverse'},
                getLastChild                        : {NAME : 'getLastChild',                        MODULE : 'domhelper.traverse'},
                getLastChildByAttribute             : {NAME : 'getLastChildByAttribute',             MODULE : 'domhelper.traverse'},
                getLastChildByClass                 : {NAME : 'getLastChildByClass',                 MODULE : 'domhelper.traverse'},
                getLastChildById                    : {NAME : 'getLastChildById',                    MODULE : 'domhelper.traverse'},
                getLastChildWithAttribute           : {NAME : 'getLastChildWithAttribute',           MODULE : 'domhelper.traverse'},
                getLastChildWithClass               : {NAME : 'getLastChildWithClass',               MODULE : 'domhelper.traverse'},
                getLastChildWithId                  : {NAME : 'getLastChildWithId',                  MODULE : 'domhelper.traverse'},
                getLastWithAttribute                : {NAME : 'getLastWithAttribute',                MODULE : 'domhelper.traverse'},
                getLastWithClass                    : {NAME : 'getLastWithClass',                    MODULE : 'domhelper.traverse'},
                getLastWithId                       : {NAME : 'getLastWithId',                       MODULE : 'domhelper.traverse'},
                getNext                             : {NAME : 'getNext',                             MODULE : 'domhelper.traverse'},
                getNextAll                          : {NAME : 'getNextAll',                          MODULE : 'domhelper.traverse'},
                getNextAllByAttribute               : {NAME : 'getNextAllByAttribute',               MODULE : 'domhelper.traverse'},
                getNextAllByAttributeUntil          : {NAME : 'getNextAllByAttributeUntil',          MODULE : 'domhelper.traverse'},
                getNextAllByClass                   : {NAME : 'getNextAllByClass',                   MODULE : 'domhelper.traverse'},
                getNextAllByClassUntil              : {NAME : 'getNextAllByClassUntil',              MODULE : 'domhelper.traverse'},
                getNextAllById                      : {NAME : 'getNextAllById',                      MODULE : 'domhelper.traverse'},
                getNextAllByIdUntil                 : {NAME : 'getNextAllByIdUntil',                 MODULE : 'domhelper.traverse'},
                getNextAllUntil                     : {NAME : 'getNextAllUntil',                     MODULE : 'domhelper.traverse'},
                getNextAllWithAttribute             : {NAME : 'getNextAllWithAttribute',             MODULE : 'domhelper.traverse'},
                getNextAllWithAttributeUntil        : {NAME : 'getNextAllWithAttributeUntil',        MODULE : 'domhelper.traverse'},
                getNextAllWithClass                 : {NAME : 'getNextAllWithClass',                 MODULE : 'domhelper.traverse'},
                getNextAllWithClassUntil            : {NAME : 'getNextAllWithClassUntil',            MODULE : 'domhelper.traverse'},
                getNextAllWithId                    : {NAME : 'getNextAllWithId',                    MODULE : 'domhelper.traverse'},
                getNextAllWithIdUntil               : {NAME : 'getNextAllWithIdUntil',               MODULE : 'domhelper.traverse'},
                getNextByAttribute                  : {NAME : 'getNextByAttribute',                  MODULE : 'domhelper.traverse'},
                getNextByClass                      : {NAME : 'getNextByClass',                      MODULE : 'domhelper.traverse'},
                getNextById                         : {NAME : 'getNextById',                         MODULE : 'domhelper.traverse'},
                getNextWithAttribute                : {NAME : 'getNextWithAttribute',                MODULE : 'domhelper.traverse'},
                getNextWithClass                    : {NAME : 'getNextWithClass',                    MODULE : 'domhelper.traverse'},
                getNextWithId                       : {NAME : 'getNextWithId',                       MODULE : 'domhelper.traverse'},
                getNth                              : {NAME : 'getNth',                              MODULE : 'domhelper.traverse'},
                getNthByAttribute                   : {NAME : 'getNthByAttribute',                   MODULE : 'domhelper.traverse'},
                getNthByClass                       : {NAME : 'getNthByClass',                       MODULE : 'domhelper.traverse'},
                getNthChild                         : {NAME : 'getNthChild',                         MODULE : 'domhelper.traverse'},
                getNthChildByAttribute              : {NAME : 'getNthChildByAttribute',              MODULE : 'domhelper.traverse'},
                getNthChildByClass                  : {NAME : 'getNthChildByClass',                  MODULE : 'domhelper.traverse'},
                getNthChildWithAttribute            : {NAME : 'getNthChildWithAttribute',            MODULE : 'domhelper.traverse'},
                getNthChildWithClass                : {NAME : 'getNthChildWithClass',                MODULE : 'domhelper.traverse'},
                getNthChildWithId                   : {NAME : 'getNthChildWithId',                   MODULE : 'domhelper.traverse'},
                getNthNext                          : {NAME : 'getNthNext',                          MODULE : 'domhelper.traverse'},
                getNthNextByAttribute               : {NAME : 'getNthNextByAttribute',               MODULE : 'domhelper.traverse'},
                getNthNextByClass                   : {NAME : 'getNthNextByClass',                   MODULE : 'domhelper.traverse'},
                getNthNextWithAttribute             : {NAME : 'getNthNextWithAttribute',             MODULE : 'domhelper.traverse'},
                getNthNextWithClass                 : {NAME : 'getNthNextWithClass',                 MODULE : 'domhelper.traverse'},
                getNthNextWithId                    : {NAME : 'getNthNextWithId',                    MODULE : 'domhelper.traverse'},
                getNthParent                        : {NAME : 'getNthParent',                        MODULE : 'domhelper.traverse'},
                getNthParentByAttribute             : {NAME : 'getNthParentByAttribute',             MODULE : 'domhelper.traverse'},
                getNthParentByClass                 : {NAME : 'getNthParentByClass',                 MODULE : 'domhelper.traverse'},
                getNthParentWithAttribute           : {NAME : 'getNthParentWithAttribute',           MODULE : 'domhelper.traverse'},
                getNthParentWithClass               : {NAME : 'getNthParentWithClass',               MODULE : 'domhelper.traverse'},
                getNthParentWithId                  : {NAME : 'getNthParentWithId',                  MODULE : 'domhelper.traverse'},
                getNthPrev                          : {NAME : 'getNthPrev',                          MODULE : 'domhelper.traverse'},
                getNthPrevByAttribute               : {NAME : 'getNthPrevByAttribute',               MODULE : 'domhelper.traverse'},
                getNthPrevByClass                   : {NAME : 'getNthPrevByClass',                   MODULE : 'domhelper.traverse'},
                getNthPrevWithAttribute             : {NAME : 'getNthPrevWithAttribute',             MODULE : 'domhelper.traverse'},
                getNthPrevWithClass                 : {NAME : 'getNthPrevWithClass',                 MODULE : 'domhelper.traverse'},
                getNthPrevWithId                    : {NAME : 'getNthPrevWithId',                    MODULE : 'domhelper.traverse'},
                getNthWithAttribute                 : {NAME : 'getNthWithAttribute',                 MODULE : 'domhelper.traverse'},
                getNthWithClass                     : {NAME : 'getNthWithClass',                     MODULE : 'domhelper.traverse'},
                getNthWithId                        : {NAME : 'getNthWithId',                        MODULE : 'domhelper.traverse'},
                getParent                           : {NAME : 'getParent',                           MODULE : 'domhelper.traverse'},
                getParentByAttribute                : {NAME : 'getParentByAttribute',                MODULE : 'domhelper.traverse'},
                getParentByClass                    : {NAME : 'getParentByClass',                    MODULE : 'domhelper.traverse'},
                getParentById                       : {NAME : 'getParentById',                       MODULE : 'domhelper.traverse'},
                getParentOrSelf                     : {NAME : 'getParentOrSelf',                     MODULE : 'domhelper.traverse'},
                getParentOrSelfByAttribute          : {NAME : 'getParentOrSelfByAttribute',          MODULE : 'domhelper.traverse'},
                getParentOrSelfByClass              : {NAME : 'getParentOrSelfByClass',              MODULE : 'domhelper.traverse'},
                getParentOrSelfById                 : {NAME : 'getParentOrSelfById',                 MODULE : 'domhelper.traverse'},
                getParentOrSelfWithAttribute        : {NAME : 'getParentOrSelfWithAttribute',        MODULE : 'domhelper.traverse'},
                getParentOrSelfWithClass            : {NAME : 'getParentOrSelfWithClass',            MODULE : 'domhelper.traverse'},
                getParentOrSelfWithId               : {NAME : 'getParentOrSelfWithId',               MODULE : 'domhelper.traverse'},
                getParents                          : {NAME : 'getParents',                          MODULE : 'domhelper.traverse'},
                getParentsAndSelf                   : {NAME : 'getParentsAndSelf',                   MODULE : 'domhelper.traverse'},
                getParentsAndSelfByAttribute        : {NAME : 'getParentsAndSelfByAttribute',        MODULE : 'domhelper.traverse'},
                getParentsAndSelfByAttributeUntil   : {NAME : 'getParentsAndSelfByAttributeUntil',   MODULE : 'domhelper.traverse'},
                getParentsAndSelfByClass            : {NAME : 'getParentsAndSelfByClass',            MODULE : 'domhelper.traverse'},
                getParentsAndSelfByClassUntil       : {NAME : 'getParentsAndSelfByClassUntil',       MODULE : 'domhelper.traverse'},
                getParentsAndSelfUntil              : {NAME : 'getParentsAndSelfUntil',              MODULE : 'domhelper.traverse'},
                getParentsAndSelfWithAttribute      : {NAME : 'getParentsAndSelfWithAttribute',      MODULE : 'domhelper.traverse'},
                getParentsAndSelfWithAttributeUntil : {NAME : 'getParentsAndSelfWithAttributeUntil', MODULE : 'domhelper.traverse'},
                getParentsAndSelfWithClass          : {NAME : 'getParentsAndSelfWithClass',          MODULE : 'domhelper.traverse'},
                getParentsAndSelfWithClassUntil     : {NAME : 'getParentsAndSelfWithClassUntil',     MODULE : 'domhelper.traverse'},
                getParentsAndSelfWithId             : {NAME : 'getParentsAndSelfWithId',             MODULE : 'domhelper.traverse'},
                getParentsAndSelfWithIdUntil        : {NAME : 'getParentsAndSelfWithIdUntil',        MODULE : 'domhelper.traverse'},
                getParentsByAttribute               : {NAME : 'getParentsByAttribute',               MODULE : 'domhelper.traverse'},
                getParentsByAttributeUntil          : {NAME : 'getParentsByAttributeUntil',          MODULE : 'domhelper.traverse'},
                getParentsByClass                   : {NAME : 'getParentsByClass',                   MODULE : 'domhelper.traverse'},
                getParentsByClassUntil              : {NAME : 'getParentsByClassUntil',              MODULE : 'domhelper.traverse'},
                getParentsUntil                     : {NAME : 'getParentsUntil',                     MODULE : 'domhelper.traverse'},
                getParentsWithAttribute             : {NAME : 'getParentsWithAttribute',             MODULE : 'domhelper.traverse'},
                getParentsWithAttributeUntil        : {NAME : 'getParentsWithAttributeUntil',        MODULE : 'domhelper.traverse'},
                getParentsWithClass                 : {NAME : 'getParentsWithClass',                 MODULE : 'domhelper.traverse'},
                getParentsWithClassUntil            : {NAME : 'getParentsWithClassUntil',            MODULE : 'domhelper.traverse'},
                getParentsWithId                    : {NAME : 'getParentsWithId',                    MODULE : 'domhelper.traverse'},
                getParentsWithIdUntil               : {NAME : 'getParentsWithIdUntil',               MODULE : 'domhelper.traverse'},
                getParentWithAttribute              : {NAME : 'getParentWithAttribute',              MODULE : 'domhelper.traverse'},
                getParentWithClass                  : {NAME : 'getParentWithClass',                  MODULE : 'domhelper.traverse'},
                getParentWithId                     : {NAME : 'getParentWithId',                     MODULE : 'domhelper.traverse'},
                getPrev                             : {NAME : 'getPrev',                             MODULE : 'domhelper.traverse'},
                getPrevAll                          : {NAME : 'getPrevAll',                          MODULE : 'domhelper.traverse'},
                getPrevAllByAttribute               : {NAME : 'getPrevAllByAttribute',               MODULE : 'domhelper.traverse'},
                getPrevAllByClass                   : {NAME : 'getPrevAllByClass',                   MODULE : 'domhelper.traverse'},
                getPrevAllByClassUntil              : {NAME : 'getPrevAllByClassUntil',              MODULE : 'domhelper.traverse'},
                getPrevAllUntil                     : {NAME : 'getPrevAllUntil',                     MODULE : 'domhelper.traverse'},
                getPrevAllWithAttribute             : {NAME : 'getPrevAllWithAttribute',             MODULE : 'domhelper.traverse'},
                getPrevAllWithAttributeUntil        : {NAME : 'getPrevAllWithAttributeUntil',        MODULE : 'domhelper.traverse'},
                getPrevAllWithClass                 : {NAME : 'getPrevAllWithClass',                 MODULE : 'domhelper.traverse'},
                getPrevAllWithClassUntil            : {NAME : 'getPrevAllWithClassUntil',            MODULE : 'domhelper.traverse'},
                getPrevAllWithId                    : {NAME : 'getPrevAllWithId',                    MODULE : 'domhelper.traverse'},
                getPrevAllWithIdUntil               : {NAME : 'getPrevAllWithIdUntil',               MODULE : 'domhelper.traverse'},
                getPrevByAttribute                  : {NAME : 'getPrevByAttribute',                  MODULE : 'domhelper.traverse'},
                getPrevByClass                      : {NAME : 'getPrevByClass',                      MODULE : 'domhelper.traverse'},
                getPrevById                         : {NAME : 'getPrevById',                         MODULE : 'domhelper.traverse'},
                getPrevWithAttribute                : {NAME : 'getPrevWithAttribute',                MODULE : 'domhelper.traverse'},
                getPrevWithClass                    : {NAME : 'getPrevWithClass',                    MODULE : 'domhelper.traverse'},
                getPrevWithId                       : {NAME : 'getPrevWithId',                       MODULE : 'domhelper.traverse'},
                getSiblings                         : {NAME : 'getSiblings',                         MODULE : 'domhelper.traverse'},
                getSiblingsByAttribute              : {NAME : 'getSiblingsByAttribute',              MODULE : 'domhelper.traverse'},
                getSiblingsByAttributeUntil         : {NAME : 'getSiblingsByAttributeUntil',         MODULE : 'domhelper.traverse'},
                getSiblingsByClass                  : {NAME : 'getSiblingsByClass',                  MODULE : 'domhelper.traverse'},
                getSiblingsByClassUntil             : {NAME : 'getSiblingsByClassUntil',             MODULE : 'domhelper.traverse'},
                getSiblingsUntil                    : {NAME : 'getSiblingsUntil',                    MODULE : 'domhelper.traverse'},
                getSiblingsWithAttribute            : {NAME : 'getSiblingsWithAttribute',            MODULE : 'domhelper.traverse'},
                getSiblingsWithAttributeUntil       : {NAME : 'getSiblingsWithAttributeUntil',       MODULE : 'domhelper.traverse'},
                getSiblingsWithClass                : {NAME : 'getSiblingsWithClass',                MODULE : 'domhelper.traverse'},
                getSiblingsWithClassUntil           : {NAME : 'getSiblingsWithClassUntil',           MODULE : 'domhelper.traverse'},
                getSiblingsWithId                   : {NAME : 'getSiblingsWithId',                   MODULE : 'domhelper.traverse'},
                getSiblingsWithIdUntil              : {NAME : 'getSiblingsWithIdUntil',              MODULE : 'domhelper.traverse'},
                isChild                             : {NAME : 'isChild',                             MODULE : 'domhelper.traverse'},
                isChildByAttribute                  : {NAME : 'isChildByAttribute',                  MODULE : 'domhelper.traverse'},
                isChildByClass                      : {NAME : 'isChildByClass',                      MODULE : 'domhelper.traverse'},
                isChildById                         : {NAME : 'isChildById',                         MODULE : 'domhelper.traverse'},
                isChildWithAttribute                : {NAME : 'isChildWithAttribute',                MODULE : 'domhelper.traverse'},
                isChildWithClass                    : {NAME : 'isChildWithClass',                    MODULE : 'domhelper.traverse'},
                isChildWithId                       : {NAME : 'isChildWithId',                       MODULE : 'domhelper.traverse'},
                isNext                              : {NAME : 'isNext',                              MODULE : 'domhelper.traverse'},
                isNextByAttribute                   : {NAME : 'isNextByAttribute',                   MODULE : 'domhelper.traverse'},
                isNextByClass                       : {NAME : 'isNextByClass',                       MODULE : 'domhelper.traverse'},
                isNextById                          : {NAME : 'isNextById',                          MODULE : 'domhelper.traverse'},
                isNextWithAttribute                 : {NAME : 'isNextWithAttribute',                 MODULE : 'domhelper.traverse'},
                isNextWithClass                     : {NAME : 'isNextWithClass',                     MODULE : 'domhelper.traverse'},
                isNextWithId                        : {NAME : 'isNextWithId',                        MODULE : 'domhelper.traverse'},
                isParent                            : {NAME : 'isParent',                            MODULE : 'domhelper.traverse'},
                isParentByAttribute                 : {NAME : 'isParentByAttribute',                 MODULE : 'domhelper.traverse'},
                isParentByClass                     : {NAME : 'isParentByClass',                     MODULE : 'domhelper.traverse'},
                isParentById                        : {NAME : 'isParentById',                        MODULE : 'domhelper.traverse'},
                isParentOrSelf                      : {NAME : 'isParentOrSelf',                      MODULE : 'domhelper.traverse'},
                isParentOrSelfByAttribute           : {NAME : 'isParentOrSelfByAttribute',           MODULE : 'domhelper.traverse'},
                isParentOrSelfByClass               : {NAME : 'isParentOrSelfByClass',               MODULE : 'domhelper.traverse'},
                isParentOrSelfById                  : {NAME : 'isParentOrSelfById',                  MODULE : 'domhelper.traverse'},
                isParentOrSelfWithAttribute         : {NAME : 'isParentOrSelfWithAttribute',         MODULE : 'domhelper.traverse'},
                isParentOrSelfWithClass             : {NAME : 'isParentOrSelfWithClass',             MODULE : 'domhelper.traverse'},
                isParentOrSelfWithId                : {NAME : 'isParentOrSelfWithId',                MODULE : 'domhelper.traverse'},
                isParentWithAttribute               : {NAME : 'isParentWithAttribute',               MODULE : 'domhelper.traverse'},
                isParentWithClass                   : {NAME : 'isParentWithClass',                   MODULE : 'domhelper.traverse'},
                isParentWithId                      : {NAME : 'isParentWithId',                      MODULE : 'domhelper.traverse'},
                isPrev                              : {NAME : 'isPrev',                              MODULE : 'domhelper.traverse'},
                isPrevByAttribute                   : {NAME : 'isPrevByAttribute',                   MODULE : 'domhelper.traverse'},
                isPrevByClass                       : {NAME : 'isPrevByClass',                       MODULE : 'domhelper.traverse'},
                isPrevById                          : {NAME : 'isPrevById',                          MODULE : 'domhelper.traverse'},
                isPrevWithAttribute                 : {NAME : 'isPrevWithAttribute',                 MODULE : 'domhelper.traverse'},
                isPrevWithClass                     : {NAME : 'isPrevWithClass',                     MODULE : 'domhelper.traverse'},
                isPrevWithId                        : {NAME : 'isPrevWithId',                        MODULE : 'domhelper.traverse'},
                isSibling                           : {NAME : 'isSibling',                           MODULE : 'domhelper.traverse'},
                isSiblingByAttribute                : {NAME : 'isSiblingByAttribute',                MODULE : 'domhelper.traverse'},
                isSiblingByClass                    : {NAME : 'isSiblingByClass',                    MODULE : 'domhelper.traverse'},
                isSiblingById                       : {NAME : 'isSiblingById',                       MODULE : 'domhelper.traverse'},
                isSiblingWithAttribute              : {NAME : 'isSiblingWithAttribute',              MODULE : 'domhelper.traverse'},
                isSiblingWithClass                  : {NAME : 'isSiblingWithClass',                  MODULE : 'domhelper.traverse'},
                isSiblingWithId                     : {NAME : 'isSiblingWithId',                     MODULE : 'domhelper.traverse'}
            }
        },
        EventHandler : {
            addEventListener    : {NAME : 'addEventListener',    MODULE : 'eventhandler.core'},
            addEventListeners   : {NAME : 'addEventListeners',   MODULE : 'eventhandler.core'},
            getEventObject      : {NAME : 'getEventObject',      MODULE : 'eventhandler.core'},
            getKeyCode          : {NAME : 'getKeyCode',          MODULE : 'eventhandler.core'},
            getMouseCoordinates : {NAME : 'getMouseCoordinates', MODULE : 'eventhandler.core'},
            getTarget           : {NAME : 'getTarget',           MODULE : 'eventhandler.core'},
            preventDefault      : {NAME : 'preventDefault',      MODULE : 'eventhandler.core'},
            removeEventListener : {NAME : 'removeEventListener', MODULE : 'eventhandler.core'},
            stopPropagation     : {NAME : 'stopPropagation',     MODULE : 'eventhandler.core'}
        },
        FormHelper : {
            NAME : 'FormHelper',
            methods : {
                preventMultipleSubmit : {NAME : 'preventMultipleSubmit', MODULE : 'formhelper'}
            }
        },
        JsonpState : {
            NAME    : 'JsonpState',
            methods : {
                protecteds : {NAME: 'protecteds', MODULE : 'jsonpstate.core'}
            }
        },
        MethodHelper : {
            NAME : 'MethodHelper',
            methods : {
                bind     : {NAME : 'bind',     MODULE : 'methodhelper.core'},
                curry    : {NAME : 'curry',    MODULE : 'methodhelper.core'},
                identity : {NAME : 'identity', MODULE : 'methodhelper.core'},
                memoize  : {NAME : 'memoize',  MODULE : 'methodhelper.core'},
                partial  : {NAME : 'partial',  MODULE : 'methodhelper.core'},

                bindAsEventListener : {NAME : 'bindAsEventListener', MODULE : 'methodhelper.event'},

                overload            : {NAME : 'overload',             MODULE : 'methodhelper.inherit'},
                requireAllArguments : {NAME : 'requireAllArguments',  MODULE : 'methodhelper.inherit'},

                after : {NAME : 'after', MODULE : 'methodhelper.repeat'},
                once  : {NAME : 'once',  MODULE : 'methodhelper.repeat'},
                times : {NAME : 'times', MODULE : 'methodhelper.repeat'},

                debounce : {NAME : 'debounce', MODULE : 'methodhelper.timer'},
                defer    : {NAME : 'defer',    MODULE : 'methodhelper.timer'},
                delay    : {NAME : 'delay',    MODULE : 'methodhelper.timer'},
                throttle : {NAME : 'throttle', MODULE : 'methodhelper.timer'},

                compose : {NAME : 'compose', MODULE : 'methodhelper.transpose'},
                flip    : {NAME : 'flip',    MODULE : 'methodhelper.transpose'},
                wrap    : {NAME : 'wrap',    MODULE : 'methodhelper.transpose'}
            }
        },
        ObjectHelper : {
            NAME : 'ObjectHelper',
            methods : {
                copy          : {NAME : 'copy',          MODULE : 'objecthelper.core'},
                copyMethods   : {NAME : 'copyMethods',   MODULE : 'objecthelper.core'},
                copyPrototype : {NAME : 'copyPrototype', MODULE : 'objecthelper.core'},
                extend        : {NAME : 'extend',        MODULE : 'objecthelper.core'},
                stringify     : {NAME : 'stringify',     MODULE : 'objecthelper.core'},
                toArray       : {NAME : 'toArray',       MODULE : 'objecthelper.core'},
                toJsonString  : {NAME : 'toJsonString',  MODULE : 'objecthelper.core'}
            }
        },
        QueryParser : {
            NAME : 'QueryParser',
            methods : {
                encode : {NAME : 'encode', MODULE : 'queryparser.core'},
                parse  : {NAME : 'parse',  MODULE : 'queryparser.core'}
            }
        },
        SortDelegate : {
            NAME : 'SortDelegate',
            methods : {
                sort     : {NAME : 'sort',     MODULE : 'objecthelper.core'},
                sortAsc  : {NAME : 'sortAsc',  MODULE : 'objecthelper.core'},
                sortDesc : {NAME : 'sortDesc', MODULE : 'objecthelper.core'}
            }
        },
        StringHelper : {
            NAME : 'StringHelper',
            methods : {
                compact        : {NAME : 'compact',        MODULE : 'stringhelper.core'},
                concat         : {NAME : 'concat',         MODULE : 'stringhelper.core'},
                format         : {NAME : 'format',         MODULE : 'stringhelper.core'},
                generateGuid   : {NAME : 'generateGuid',   MODULE : 'stringhelper.core'},
                generateRandom : {NAME : 'generateRandom', MODULE : 'stringhelper.core'},
                printf         : {NAME : 'printf',         MODULE : 'stringhelper.core'},
                remove         : {NAME : 'remove',         MODULE : 'stringhelper.core'},
                trim           : {NAME : 'trim',           MODULE : 'stringhelper.core'},

                decode         : {NAME : 'decode',         MODULE : 'stringhelper.encode'},
                encode         : {NAME : 'encode',         MODULE : 'stringhelper.encode'},
                encodeSafeHtml : {NAME : 'encodeSafeHtml', MODULE : 'stringhelper.encode'},
                escape         : {NAME : 'escape',         MODULE : 'stringhelper.encode'},
                htmlEncode     : {NAME : 'htmlEncode',     MODULE : 'stringhelper.encode'},
                safeHtmlEncode : {NAME : 'safeHtmlEncode', MODULE : 'stringhelper.encode'},
                unescape       : {NAME : 'unescape',       MODULE : 'stringhelper.encode'},
                xssEncode      : {NAME : 'xssEncode',      MODULE : 'stringhelper.encode'},

                stripNonAlpha        : {NAME : 'stripNonAlpha',        MODULE : 'stringhelper.strip'},
                stripNonAlphanumeric : {NAME : 'stripNonAlphanumeric', MODULE : 'stringhelper.strip'},
                stripTags            : {NAME : 'stripTags',            MODULE : 'stringhelper.strip'},
                stripNonNumeric      : {NAME : 'stripNonNumeric',      MODULE : 'stringhelper.strip'},
                stripNumeric         : {NAME : 'stripNumeric',         MODULE : 'stringhelper.strip'},

                br2nl                     : {NAME : 'br2nl',                     MODULE : 'stringhelper.transform'},
                nl2br                     : {NAME : 'nl2br',                     MODULE : 'stringhelper.transform'},
                removeTags                : {NAME : 'removeTags',                MODULE : 'stringhelper.transform'},
                toCamelCase               : {NAME : 'toCamelCase',               MODULE : 'stringhelper.transform'},
                toDashedFromCamelCase     : {NAME : 'toDashedFromCamelCase',     MODULE : 'stringhelper.transform'},
                toJson                    : {NAME : 'toJson',                    MODULE : 'stringhelper.transform'},
                toUnderscoreFromCamelCase : {NAME : 'toUnderscoreFromCamelCase', MODULE : 'stringhelper.transform'},
                truncate                  : {NAME : 'truncate',                  MODULE : 'stringhelper.transform'}
            }
        },
        Supports : {
            NAME : 'Supports',
            methods : {
                ajax   : {NAME : 'ajax',  MODULE : 'supports.core'},
                cookie : {NAME : 'cooke', MODULE : 'supports.core'},
                dom    : {NAME : 'dom',   MODULE : 'supports.core'}
            }
        },
        Template : {
            NAME : 'Template',
            methods : {
                parse : {NAME : 'parse', MODULE : 'template.core'}
            }
        },
        Timer : {
            NAME : 'Timer',
            methods : {
                set   : {NAME : 'set',   MODULE : 'timer.core'},
                start : {NAME : 'start', MODULE : 'timer.core'},
                stop  : {NAME : 'stop',  MODULE : 'timer.core'}
            }
        },
        Try : {
            NAME : 'Try',
            methods : {
                all   : {NAME : 'all',   MODULE : 'try.core'},
                these : {NAME : 'these', MODULE : 'try.core'}
            }
        },
        Unit : {
            NAME : 'Unit',
            methods : {
                add                   : {NAME : 'add',                   MODULE : 'unit.core'},
                assert                : {NAME : 'assert',                MODULE : 'unit.core'},
                assertEqual           : {NAME : 'assertEqual',           MODULE : 'unit.core'},
                assertNotEqual        : {NAME : 'assertNotEqual',        MODULE : 'unit.core'},
                assertStrictEqual     : {NAME : 'assertStrictEqual',     MODULE : 'unit.core'},
                assertStrictNotEqual  : {NAME : 'assertStrictNotEqual',  MODULE : 'unit.core'},
                getGlobalFailureCount : {NAME : 'getGlobalFailureCount', MODULE : 'unit.core'},
                getGlobalSuccessCount : {NAME : 'getGlobalSuccessCount', MODULE : 'unit.core'},
                isRunning             : {NAME : 'isRunning',             MODULE : 'unit.core'},
                log                   : {NAME : 'log',                   MODULE : 'unit.core'},
                run                   : {NAME : 'run',                   MODULE : 'unit.core'}
            }
        },
        Validator : {
            NAME : 'Validator',
            methods : {
                is          : {MODULE : 'validator.core'},
                isArguments : {MODULE : 'validator.core'},
                isArray     : {MODULE : 'validator.core'},
                isBoolean   : {MODULE : 'validator.core'},
                isDate      : {MODULE : 'validator.core'},
                isFunction  : {MODULE : 'validator.core'},
                isNaN       : {MODULE : 'validator.core'},
                isNull      : {MODULE : 'validator.core'},
                isNumber    : {MODULE : 'validator.core'},
                isNumeric   : {MODULE : 'validator.core'},
                isObject    : {MODULE : 'validator.core'},
                isRegExp    : {MODULE : 'validator.core'},
                isString    : {MODULE : 'validator.core'},
                isUndefined : {MODULE : 'validator.core'},
                isWindow    : {MODULE : 'validator.core'},

                isEmail      : {MODULE : 'validator.regexp'},
                isUrl        : {MODULE : 'validator.regexp'},
                isWhitespace : {MODULE : 'validator.regexp'}
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

    var isProduction = framework.isProduction;

    if (isProduction) {
        // TODO: rewrite

        init();
    } else {
        init(fp, 'require', function(objName, methodName) {
            //var mixed = null;

//            var objName = null;
//            var methodName = null;

            if (arguments.length === 1) {
                objName = '';
                methodName = objName;
            }
//            } else {
                //objName = name;
                //methodName = method;
//            }

            if (typeof objName !== 'string') {
                throw 'fwRequire: objName should be  a String.';
            }

            if (typeof methodName !== 'string') {
                throw 'fwRequire: methodName should be  a String.';
            }

            var meta = null;

            if (objName === '') {
                var classes = fp.classes;
                var result = null;
                var key = null;

                if (classes.hasOwnProperty(methodName)) {
                    result = framework[methodName];

                    if (!result) {
                        throw 'Class ' + key + ' has not been defined yet.';
                    }

                    return result;
                }

                meta = fp.classes.o2;

                if (!meta[methodName]) {
                    throw 'Method or attribute ' + methodName + ' not found in framework meta definition';
                }

                result = framework[methodName];

                if (!result) {
                    throw 'fwRequire: method or attribute "'+ methodName + ' does not exist in framework.';
                }
            }

            meta = framework.classes[objName];

            if (!meta) {
                throw 'fwRequire: Class "'+ objName + '" is not defined in meta definition.';
            }

            var method = meta.methods[methodName];

            if (!method) {
                throw 'fwRequire: Class '+objName+
                    ' does not have a method '+methodName+ ' defined in meta definition.';
            }

            var obj = framework[objName];

            if (!obj) {
                throw 'fwRequire: Class "'+ objName + '" does not currently exist.';
            }

            var theMethod = obj[methodName];

            if (!theMethod) {
                throw 'fwRequire: method '+methodName+' of object '+objName+
                    ' does not exist at this time.';
            }

            return theMethod;
        });

        var require = fp.require;

        init(fp, 'getAttr', function(root, name) {
            if (!root) {
                throw 'getAttr: root not found';
            }

            if (!name) {
                throw 'getAttr: name not provided';
            }

            var elem = root[name];

            if (!elem) {
                throw 'getAttr: root does not have an attribute '+ name;
            }

            return elem;
        });

        init(fp, 'setAttr', function(/*root, name*/) {

        });

        /**
         * @function {protected static} o2.protecteds.create
         *
         * <p>Returns a <strong>mixed</strong> <code>Object</code>, if
         * <strong>name</strong> is defined in
         * <code>o2.protecteds.classes</code>.</p>
         *
         * <p>Creates the object if it does not exist.</p>
         *
         * @param {String} name - the name of the <strong>class</strong>.
         *
         * @return an <code>Array</code>, where the first index is the
         * class-realated <strong>meta</strong> information, and the second index
         * is the <strong>static</strong> classs instance.
         *
         * @throws Exception - if  <code>o2.protecteds.classes</code> does not
         * have a member of name `<strong>name</strong>`.
         */
        init(fp, 'create', function(name) {
            var meta = framework.classes[name];

            if (!meta) {
                throw 'Meta definition not found for class ' + name;
            }

            return [meta, namespace(framework, name)];
        });

        init(fp, 'construct', function(name, delegate) {
            var meta = framework.classes[name];

            if (!meta) {
                throw 'Meta definition not found for class ' + name;
            }

            if (framework[name]) {
                throw 'Constructor "' + name + '" is already defined';
            }

            framework[name] = delegate;

            return [meta, delegate];
        });

        init(fp, 'proto', function(mixed, methodName, fn) {
            var meta = mixed[0];
            var me= mixed[1];

            if (!me) {
                throw 'Object not found in mixed collection';
            }

            if (!fn) {
                throw [kDelegateNotdefined, methodName].join(kEmpty);
            }

            if (!meta.methods) {
                throw 'Meta definition of ' + meta.NAME + 'does not have any defined methods';
            }

            if (!meta.methods[methodName]) {
                throw 'Method or attribute ' + methodName + ' not found in meta definition of ' + meta.NAME;
            }

            if (me.prototype[methodName]) {
                throw [kMethodAlreadyDefined, methodName].join(kEmpty);
            }

            me.prototype[methodName] = fn;
        });

        init(fp, 'getRoot', function() {
            return [fp.classes.o2, framework];
        });

        init(fp, 'define', function(mixed, name, fn) {
            var meta = mixed[0];
            var me= mixed[1];

            if (!me) {
                throw 'Object not found in mixed collection';
            }

            if (!fn) {
                throw [kDelegateNotdefined, name].join(kEmpty);
            }

            if (!meta) {
                throw 'no meta definition';
            }

            if (!meta.methods) {
                throw 'no methods for ' + meta.NAME;
            }

            if (meta.methods[name]) {
                if (me[name]) {
                    throw [kMethodAlreadyDefined, name].join(kEmpty);
                }

                me[name] = fn;
            }
        });

        /*
         * Takes the *mixed* reference and returns the object component of it.
         */
        init(fp, 'getObject', function(mixed) {
            return mixed[1];
        });

    //TODO: add documentation to this all and up
        init(fp, 'alias', function(mixed, aliasName, existingName) {
            fp.addMethod(mixed, aliasName, fp.getObject(mixed)[existingName]);
        });
    }
}(this.o2));

    // init(fp, 'fwEval', function(root, name, attr) {
    //     if (!root) {
    //         throw 'fwEval: root not found';
    //     }

    //     if (!name) {
    //         throw 'fwEval: name not provided';
    //     }

    //     if (!attr) {
    //         throw 'fwEval: attr not provided';
    //     }

    //     var elem = root[name];

    //     if (!elem) {
    //         throw 'fwEval: root does not have an attribute '+ name;
    //     }

    //     var val = elem[attr];

    //     if (!val) {
    //         throw 'fwEval: root does not have an object with name '+  name +
    //             'and value '+ attr;
    //     }

    //     return val;
    // });

    // /*
    //  * Requirement check.
    //  * Throws exception if <strong>obj</strong> is falsy.
    //  */
    // init(fp, 'require', function(obj) {
    //     if (!obj) {
    //         //debugger;

    //         throw [
    //             framework.name,
    //             kRequirementNotSatisfied
    //         ].join(kEmpty);
    //     }

    //     return obj;
    // });