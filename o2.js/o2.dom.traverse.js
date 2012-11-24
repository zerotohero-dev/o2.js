/*
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 */
/**
 * @module   dom.traverse
 * @requires collection.core
 * @requires core
 * @requires dom.class
 * @requires dom.core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package for traversing the <code>DOM</code>.</p>
 */
(function(framework, fp, document, UNDEFINED) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('dom.traverse', [
        'collection.core',
        'core',
        'dom.class'
        'dom.core',
        'string.core',
    ]);

    var attr      = fp.getAttr,
        create    = attr(fp, 'create'),
        def       = attr(fp, 'define'),
        require   = attr(fp, 'require'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Class Name
         */
        kModuleName = 'Dom',

        /*
         * Dom (traverse)
         */
        me = create(kModuleName),

        /*
         * Aliases
         */

        contains = require('Collection', 'contains'),

        /*
         * To be Overridden
         */
        getChildren                   = null,
        getChildrenByAttribute        = null,
        getChildrenByAttributeUntil   = null,
        getChildrenByClass            = null,
        getChildrenByClassUntil       = null,
        getChildrenUntil              = null,
        getChildrenWithAttribute      = null,
        getChildrenWithAttributeUntil = null,
        getChildrenWithClass          = null,
        getChildrenWithClassUntil     = null,
        getChildrenWithId             = null,
        getChildrenWithIdUntil        = null,
        getElements                   = null,
        getFirst                      = null,
        getFirstByAttribute           = null,
        getFirstByClass               = null,
        getFirstWithAttribute         = null,
        getFirstWithClass             = null,
        getFirstWithId                = null,
        getLast                       = null,
        getLastByAttribute            = null,
        getLastByClass                = null,
        getLastWithAttribute          = null,
        getLastWithClass              = null,
        getLastWithId                 = null,
        getNextAll                    = null,
        getNth                        = null,
        getSiblings                   = null,
        getNthByAttribute             = null,
        getNthByClass                 = null,
        getNthWithAttribute           = null,
        getNthWithClass               = null,
        getNthWithId                  = null,
        getPrevAll                    = null,
        isParent                      = null;

    /*
     * A multipurpose method to get next/previous sibling(s).
     */
    //TODO: this name is misleading, rename
    function getNextSiblings(elm,
                filterDelegate, filterArgs,
                breakDelegate, breakArgs,
                name, itemsCountCap, returnSingleItemAt,
                shouldStartAtFirstSibling, isReverse) {
        if (!elm) {return [];}

        var next    = null,
            result  = [],
            counter = 0;

        while (true) {
            if (!next && !!shouldStartAtFirstSibling) {
                next = !!isReverse ?
                    elm.parentNode.lastChild :
                    elm.parentNode.firstChild;
            } else {
                next = !!isReverse ?
                    elm.getPreviousSibling :
                    elm.getNextSibling;
            }

            if(breakDelegate) {
                breakArgs.unshift(next);

                if(breakDelegate.apply(next, breakArgs)) {break;}
            }

            if (next.nodeType !== kTextNode) {
                if (name) {
                    if (next.nodeName === name) {
                        if (filterDelegate) {
                            filterArgs.unshift(next);

                            if (filterDelegate.apply(next, filterArgs)) {
                                counter++;

                                if (!isNaN(returnSingleItemAt) &&
                                            returnSingleItemAt === counter) {
                                    return next;
                                }

                                result.push(next);


                                if (!isNaN(itemsCountCap) &&
                                            itemsCountCap <= counter) {
                                    break;
                                }
                            }
                        } else {
                            counter++;

                            if (!isNaN(returnSingleItemAt)&&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);


                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    }
                } else {
                    if (filterDelegate) {
                        filterArgs.unshift(next);

                        if (filterDelegate.apply(next, filterArgs)) {
                            counter++;

                            if (!isNaN(returnSingleItemAt) &&
                                        returnSingleItemAt === counter) {
                                return next;
                            }

                            result.push(next);

                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    } else {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return next;
                        }

                        result.push(next);

                        if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                            break;
                        }
                    }
                }
            }

            if (!next) {break;}
        }

        if (returnSingleItemAt !== UNDEFINED) {return null;}

        return result;
    }

    /*
     * A multifunctional method to get next/previous parent(s).
     */
    //TODO: this name is misleading, rename.
    function getParents(elm,
                filterDelegate, filterArgs,
                breakDelegate, breakArgs,
                name, itemsCountCap, returnSingleItemAt
    ) {
        if (!elm) {return [];}

        var result  = [],
            target  = $(elm),
            counter = 0;

        target = target.parentNode;

        while (target) {
            if(breakDelegate) {
                breakArgs.unshift(target);

                if(breakDelegate.apply(target, breakArgs)) {break;}
            }

            if (name) {
                if (target.nodeName.toLowerCase() === name.toLowerCase()) {
                    if (filterDelegate) {
                        filterArgs.unshift(target);

                        if (filterDelegate.apply(target, filterArgs)) {
                            counter++;

                            if (!isNaN(returnSingleItemAt) &&
                                        returnSingleItemAt === counter) {
                                return target;
                            }

                            result.push(target);

                            if (!isNaN(itemsCountCap) &&
                                        itemsCountCap <= counter) {
                                break;
                            }
                        }
                    } else {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return target;
                        }

                        result.push(target);

                        if (!isNaN(itemsCountCap) &&
                                    itemsCountCap <= counter) {
                            break;
                        }
                    }
                }
            } else {
                if (filterDelegate) {
                    filterArgs.unshift(target);

                    if (filterDelegate.apply(target, filterArgs)) {
                        counter++;

                        if (!isNaN(returnSingleItemAt) &&
                                    returnSingleItemAt === counter) {
                            return target;
                        }

                        result.push(target);

                        if (!isNaN(itemsCountCap) &&
                                    itemsCountCap <= counter) {
                            break;
                        }
                    }
                } else {
                    counter++;

                    if (!isNaN(returnSingleItemAt) &&
                                returnSingleItemAt === counter) {
                        return target;
                    }

                    result.push(target);

                    if (!isNaN(itemsCountCap) && itemsCountCap <= counter) {
                        break;
                    }
                }
            }

            target = target.parentNode;
        }

        return result;
    }

}(this.o2, this.o2.protecteds, this.document));
