/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */

//     var _         = framework.protecteds;
//     var alias     = _.alias;
//     var attr      = _.getAttr;
//     var construct = _.construct;
//     var create    = _.create;
//     var def       = _.define;
//     var obj       = _.getObject;
//     var proto     = _.proto;
//     var require   = _.require;

//TODO: complete me.

//     if (document.documentElement &&
//                 document.documentElement.getBoundingClientRect) {

//         /**
//          * @function {static} o2.Dom.getOffset
//          *
//          * <p>Gets the left and top offset of a given element.</p>
//          *
//          * @param {Object} e - the element, or the id of the element, to get
//          * the offsets of.
//          *
//          * @return the offset from the top-left corner of the viewport, in the
//          * form <code>{left: l, top: t}</code>.
//          */
//         def(me, 'getOffset', function(elmItem) {
//             var elm = $(elmItem);

//             if (!elm || !elm.ownerDocument) {
//                 return {top : 0, left : 0};
//             }

//             var box = null;

//             try {
//                 box = elem.getBoundingClientRect();
//             } catch(ignore) {
//             }

//             var doc = elem.ownerDocument;
//             var docElem = getDocumentElement();

//             if (!docElem) {
//                 return {top : 0, left : 0};
//             }

//             if (!box) {
//                 return {top : 0, left : 0};
//             }

//             if(!isParentOrSelf(docElem, elem)) {
//                 return {top : box.top, left : box.left};
//             }

//             var body = doc.body;
//             var win = window;
//             var clientTop = docElem.clientTop || 0;
//             var clientLeft = docElem.clientLeft || 0;
//             var scrollTop = win.pageYOffset || docElem.scrollTop;
//             var scrollLeft = win.pageXOffset || docElem.scrollLeft;

//             return {
//                 top : box.top + scrollTop - clientTop,
//                 left : box.left + scrollLeft - clientLeft
//             };
//         });
//     } else {
//         def(me, 'getOffset', function(elmItem) {
//             var elem = $(elmItem);

//             if (!elem || !elem.ownerDocument ) {
//                 return {top : 0, left : 0};
//             }

//             var docElm = document.documentElement;
//             var computedDocElm = getDocumentElement();
//             var doc = elem.ownerDocument;

//             var top = elem.offsetTop;
//             var left = elem.offsetLeft;
//             var offsetParent = elem.offsetParent;
//             var isPrevFixed = isFixed(elm);

//             while (true) {
//                 elem = elem.parentNode;

//                 if (!elem) {
//                     break;
//                 }

//                 if (elem === docElm) {
//                     break;
//                 }

//                 if (isPrevFixed) {
//                     break;
//                 }

//                 top  -= elem.scrollTop;
//                 left -= elem.scrollLeft;

//                 if (elem === offsetParent) {
//                     top  += elem.offsetTop;
//                     left += elem.offsetLeft;

//                     offsetParent = elem.offsetParent;
//                 }

//                 isPrevFixed = isFixed(elm);
//             }

//             if (isPrevFixed) {
//                 top  += computedDocElm.scrollTop;
//                 left += computedDocElm.scrollLeft;
//             }

//             return {top : top, left : left};
//         });
//     }


//     /**
//      * @function {static} o2.Dom.getOffsetLeft
//      *
//      * <p>An alias to <code>o2.Dom.getOffset(obj).left</code>.</p>
//      *
//      * @see o2.Dom.getOffset
//      */
//     def(me, 'getOffsetLeft', function(obj) {
//         return getOffset(obj).left;
//     });

//     /**
//      * @function {static} o2.Dom.getOffsetTop
//      *
//      * <p>An alias to <code>o2.Dom.getOffset(obj).top</code>.</p>
//      *
//      * @see o2.Dom.getOffset
//      */
//     def(me, 'getOffsetTop', function(obj) {
//         return getOffset(obj).top;
//     });

//     /*
//      * setOffset uses it to compute CSS .top and .left when necessary.
//      */
//     function getPosition() {
//         var elm = $(obj);

//         if (!elm) {
//             return {top : 0, left : 0};
//         }

//         var offsetParent = elm.offsetParent;

//         var offset = getOffset(elm);
//         var parentOffset = getOffest(offsetParent);

//         return {
//             top :
//                 offset.top -
//                 parseFloat(getStyle(elm, 'marginTop')) -
//                 parseFloat(getStyle(offsetParent, 'borderTopWidth')),
//             left :
//                 offset.left -
//                 parseFloat(getStyle(elm, 'marginLeft')) -
//                 parseFloat(getStyle(offsetParent, 'borderLeftWidth'))
//         }
//     }

// };
